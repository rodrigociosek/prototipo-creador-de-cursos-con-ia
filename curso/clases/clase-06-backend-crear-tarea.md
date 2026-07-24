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

## 2. La persistencia simulada, ahora como una clase

La Clase 05 guardó las tareas en un array con funciones sueltas (`crearTarea`, `listarTareas`). Ahora que ese array va a tener varias operaciones relacionadas usándolo, se organiza como una clase de programación — el criterio por defecto de este curso para agrupar una responsabilidad real del proyecto:

```js
// curso/app/backend/src/repositorios/TareasRepositorio.js
//
// Persistencia simulada de tareas, organizada como clase: agrupa el
// array, el contador de ids, y las operaciones que los usan, en un
// solo lugar -- nadie fuera de esta clase toca el array directamente
// (los campos que empiezan con # son privados de la clase).
class TareasRepositorio {
  #tareas = [];
  #siguienteId = 1;

  // Entra: los campos de una tarea nueva (sin id).
  // Sale: el registro creado, con su id ya asignado.
  crear(datos) {
    const tarea = { id: this.#siguienteId++, ...datos };
    this.#tareas.push(tarea);
    return tarea;
  }

  // Entra: nada.
  // Sale: el array completo de tareas guardadas hasta ahora.
  listar() {
    return this.#tareas;
  }
}

export default TareasRepositorio;
```

## 3. El endpoint: crear tarea (T-01) y validar el título (T-02)

```js
// curso/app/backend/server.js
import express from 'express';
import TareasRepositorio from './src/repositorios/TareasRepositorio.js';

const app = express();
app.use(express.json());

const tareasRepositorio = new TareasRepositorio();

// POST /tasks (T-01 + T-02): crea una tarea nueva.
// Por ahora la tarea solo tiene titulo/descripcion/fecha/completada
// -- usuarioId (RF-04), telefono y recordatorio (RF-10) se agregan
// en clases futuras, cuando a esos RF les toque construirse.
app.post('/tasks', (req, res) => {
  const { titulo, descripcion, fecha } = req.body;

  // T-02: el título es obligatorio -- sin él, no se crea nada.
  if (!titulo) {
    res.status(400).json({ error: 'titulo es obligatorio' });
    return;
  }

  const tarea = tareasRepositorio.crear({
    titulo,
    descripcion,
    fecha,
    completada: false,
  });

  res.status(201).json(tarea);
});

app.listen(3000, () => {
  console.log('backend escuchando en http://localhost:3000');
});
```

Esto sigue exactamente el contrato fijado en `curso/tareas.md`: `201` con el registro creado si el título vino, `400` con `{ error: "..." }` si no vino — nada de esto se inventó al escribir la clase, salió de esa especificación.

## 4. Vamos a probarlo de verdad

```
$ node server.js
backend escuchando en http://localhost:3000
```

Tres peticiones reales, contra el servidor corriendo:

```
$ curl -s -w "\nstatus: %{http_code}\n" -X POST http://localhost:3000/tasks \
    -H "Content-Type: application/json" \
    -d '{"titulo":"Comprar leche","descripcion":"2% para el desayuno"}'
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

La segunda tarea válida recibió `id: 2` — a diferencia de la Clase 05, donde cada ejecución era un proceso nuevo y el contador siempre volvía a arrancar en 1, acá **las tres peticiones le llegaron al mismo proceso del servidor**, así que `TareasRepositorio` mantuvo su estado entre una y otra: esto es, en la práctica, la diferencia entre "un script que corre y termina" y "un servidor que queda escuchando".

## 5. Qué queda pendiente, a propósito

Este endpoint todavía no lo llama nadie desde la interfaz — el formulario de la Clase 03 sigue imprimiendo en la consola del navegador en vez de mandar la petición acá. Conectar las dos puntas es la Clase 08 (T-04). Tampoco hay todavía forma de leer la lista de tareas guardadas (eso es T-03 del backend... en realidad T-05, la próxima tarea del plan, no de esta clase) — por ahora, el único jeito de comprobar que algo se guardó es lo que ya se hizo: mirar la respuesta de cada `POST`.

## Control de versiones de esta clase

1. Rama `clase-06-backend-crear-tarea`, creada desde `main`.
2. Primer código real del backend: `curso/app/backend/` completo (`server.js`, `src/repositorios/TareasRepositorio.js`, `package.json`, `.gitignore`).
3. Verificado con ejecución real: servidor levantado de verdad, tres peticiones con `curl` (201, 400, 201 con id correlativo).
