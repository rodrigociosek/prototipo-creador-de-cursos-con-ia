# Clase 06 — Construcción: el endpoint que crea una tarea

Esta clase junta lo enseñado en las Clases 04 y 05 para construir la primera pieza real del backend: el endpoint que recibe una tarea nueva desde el formulario (Clase 03) y la guarda.

## 1. Preparar el proyecto del backend

Igual que en la Clase 03 con el frontend, primero hace falta el proyecto en sí — hasta ahora no existía ningún código de backend real.

```
$ mkdir -p curso/app/backend/src/repositorios
$ cd curso/app/backend
$ npm init -y
$ npm pkg set type=module
$ npm install express@5.2.1
```

Se confirma la versión instalada contra `curso/auditoria-stack.md`:

```
$ npm ls express --depth=0
backend@1.0.0
`-- express@5.2.1
```

Coincide exacto.

## 2. La persistencia simulada, como una clase, probada sola antes de conectarla a nada

La Clase 05 guardó las tareas en un array con funciones sueltas (`crearTarea`, `listarTareas`). Ahora que ese array va a tener varias operaciones relacionadas usándolo, se organiza como una clase de programación — el criterio por defecto de este curso para agrupar una responsabilidad real del proyecto:

```js
// curso/app/backend/src/repositorios/TareasRepositorio.js
class TareasRepositorio {
  #tareas = [];        // privado -- ver más abajo por qué importa
  #siguienteId = 1;

  crear(datos) {
    // toma el id ACTUAL de #siguienteId, recién DESPUÉS lo incrementa
    // (por el ++ después de la variable) -- y con ...datos copia adentro
    // todos los campos que llegaron (título, descripción, fecha...)
    const tarea = { id: this.#siguienteId++, ...datos };
    this.#tareas.push(tarea); // se guarda en el array interno
    return tarea;              // ← salida: el registro ya con su id
  }

  listar() {
    return this.#tareas; // ← salida: todo lo guardado hasta el momento
  }
}

export default TareasRepositorio;
```

Antes de conectar esto a ninguna ruta HTTP, se prueba la clase sola, sin Express de por medio:

```js
// t1_repositorio_solo.mjs
import TareasRepositorio from './TareasRepositorio.js';

const repo = new TareasRepositorio();
console.log('crear #1:', repo.crear({ titulo: 'Comprar leche' }));
console.log('crear #2:', repo.crear({ titulo: 'Llamar al dentista' }));
console.log('listar():', repo.listar());
```
```
$ node t1_repositorio_solo.mjs
crear #1: { id: 1, titulo: 'Comprar leche' }
crear #2: { id: 2, titulo: 'Llamar al dentista' }
listar(): [
  { id: 1, titulo: 'Comprar leche' },
  { id: 2, titulo: 'Llamar al dentista' }
]
```

Funciona igual que la versión con funciones sueltas de la Clase 05, ahora agrupada en un objeto. Los campos que empiezan con `#` (`#tareas`, `#siguienteId`) son **privados de la clase** — nadie fuera de sus propios métodos puede tocarlos directamente. Esto también se comprueba, no solo se afirma:

```js
console.log('¿repo.tareas existe desde afuera?', repo.tareas);
```
```
¿repo.tareas existe desde afuera? undefined
```

Intentar leer `repo.tareas` (sin el `#`) devuelve `undefined` — ni siquiera existe esa propiedad pública. La única forma de leer o modificar las tareas guardadas es a través de los métodos que la propia clase expone (`crear`, `listar`) — exactamente lo que impide que, más adelante, otra parte del código del backend termine tocando el array directamente y salteándose la lógica de la clase.

## 3. El endpoint sin validación todavía, para ver por qué hace falta T-02

Se conecta primero la ruta más simple posible — crear una tarea, sin validar nada — para comprobar en carne propia el problema que T-02 va a resolver:

```js
// server.js (versión parcial, sin validación)
import express from 'express';
import TareasRepositorio from './src/repositorios/TareasRepositorio.js';

const app = express();
app.use(express.json());
const tareasRepositorio = new TareasRepositorio();

app.post('/tasks', (req, res) => {
  const { titulo, descripcion, fecha } = req.body;               // entra: el cuerpo JSON de la petición
  const tarea = tareasRepositorio.crear({ titulo, descripcion, fecha, completada: false }); // se guarda
  res.status(201).json(tarea);                                    // sale: el registro creado, con 201
});

app.listen(3000, () => console.log('escuchando'));
```
```
$ curl -s -w "\nstatus: %{http_code}\n" -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{"titulo":"Comprar leche"}'
{"id":1,"titulo":"Comprar leche","completada":false}
status: 201

$ curl -s -w "\nstatus: %{http_code}\n" -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{"descripcion":"sin titulo"}'
{"id":2,"descripcion":"sin titulo","completada":false}
status: 201
```

Ahí está el problema, confirmado con una petición real: la segunda petición no traía `titulo`, y aun así el servidor la aceptó y creó una "tarea" sin título, con `201`. Eso es exactamente lo que T-02 tiene que evitar.

## 4. T-02: validar el título, verificado con el caso que acaba de fallar

```js
// se agrega adentro de app.post('/tasks', ...), antes de crear la tarea
if (!titulo) {
  res.status(400).json({ error: 'titulo es obligatorio' });
  return;
}
```

Se repite exactamente la misma petición del punto 3 que antes se había aceptado mal, más una tercera para confirmar que el título válido sigue funcionando y que el contador de ids sigue el hilo:

```
$ curl -s -w "\nstatus: %{http_code}\n" -X POST http://localhost:3000/tasks \
    -H "Content-Type: application/json" -d '{"titulo":"Comprar leche","descripcion":"2% para el desayuno"}'
{"id":1,"titulo":"Comprar leche","descripcion":"2% para el desayuno","completada":false}
status: 201

$ curl -s -w "\nstatus: %{http_code}\n" -X POST http://localhost:3000/tasks \
    -H "Content-Type: application/json" -d '{"descripcion":"sin titulo"}'
{"error":"titulo es obligatorio"}
status: 400

$ curl -s -w "\nstatus: %{http_code}\n" -X POST http://localhost:3000/tasks \
    -H "Content-Type: application/json" -d '{"titulo":"Llamar al dentista"}'
{"id":2,"titulo":"Llamar al dentista","completada":false}
status: 201
```

Ahora sí: la petición sin título respondió `400` con el error, **sin crear nada** (a diferencia del punto 3) — y la tercera petición válida recibió `id: 2`, no `id: 1`, porque las tres peticiones le llegaron al mismo proceso del servidor, y `TareasRepositorio` mantuvo su estado entre una y otra. Esto sigue exactamente el contrato fijado en `curso/tareas.md`: `201` con el registro creado si el título vino, `400` con `{ error: "..." }` si no vino — nada de esto se inventó al escribir la clase, salió de esa especificación.

## 5. Qué queda pendiente, a propósito

Este endpoint todavía no lo llama nadie desde la interfaz — el formulario de la Clase 03 sigue imprimiendo en la consola del navegador en vez de mandar la petición acá. Conectar las dos puntas es una tarea aparte (T-04). Tampoco hay todavía forma de leer la lista de tareas guardadas (T-05, la próxima tarea del plan) — por ahora, el único modo de comprobar que algo se guardó es lo que ya se hizo en el punto 4: mirar la respuesta de cada `POST`.

## Control de versiones de esta clase

1. Rama `clase-06-backend-crear-tarea`, creada desde `main`.
2. Primer código real del backend: `curso/app/backend/` completo (`server.js`, `src/repositorios/TareasRepositorio.js`, `package.json`, `.gitignore`).
3. Verificado con ejecución real, en etapas (puntos 2, 3 y 4): el repositorio probado solo antes de conectarlo a Express, el endpoint sin validación mostrando el problema real que causa, y recién después T-02 resolviéndolo — no una única prueba consolidada al final.
4. **Revisión**: contenido reescrito para aplicar la Regla 6 de `references/reglas-de-clase.md` (cada pieza de código nueva se demuestra apenas se agrega). Se agregaron dos demostraciones que la versión anterior no tenía: la comprobación real de que los campos privados (`#tareas`) son inaccesibles desde afuera de la clase, y el endpoint sin validar corriendo primero para mostrar el problema concreto antes de aplicar la solución.
