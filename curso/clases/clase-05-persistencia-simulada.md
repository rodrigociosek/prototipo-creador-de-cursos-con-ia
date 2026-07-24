# Clase 05 — Persistencia simulada: guardar datos mientras el servidor está corriendo

## 1. Qué es "persistencia" y por qué el servidor solo no alcanza

Un servidor Express, por sí solo (Clase 04), no recuerda nada entre una petición y otra — cada función de ruta hace su trabajo y termina. Para que crear una tarea (T-01) sirva de algo, esa tarea tiene que quedar guardada en algún lado, disponible para cuando después se pida la lista completa (otra tarea, otra petición). A eso se le llama **persistencia**: que un dato sobreviva más allá del momento puntual en que se creó.

La forma real y definitiva de persistencia para este proyecto es una base de datos (PostgreSQL, ya elegida en `curso/stack.md`) — pero esa pieza se enseña recién al final del curso, después de cubrir todos los RF (`SKILL.md` § Fase 9). Mientras tanto, el proyecto necesita algo que se comporte igual desde afuera (guardar, leer) sin necesitar todavía nada de eso.

## 2. La simulación: guardar en la memoria del propio proceso

La solución es la más simple posible: un array de JavaScript, guardado en una variable del programa, más un contador para asignar un id a cada registro nuevo — exactamente el criterio ya fijado en `curso/tareas.md` § Decisiones técnicas transversales.

```js
// "Base de datos" simulada: un array en memoria, más un contador de
// ids. Vive mientras el proceso de Node siga corriendo.
const tareas = [];
let siguienteId = 1;
```

Esto no es una base de datos — es una variable común, del mismo tipo que ya se usó en clases anteriores. Lo que la hace funcionar como una "base de datos" simulada es dónde vive: fuera de cualquier función de ruta, en el nivel superior del archivo del servidor, para que todas las rutas (crear, leer, editar, borrar) accedan al mismo array — si viviera adentro de una función, se recrearía vacía en cada petición.

## 3. Crear y leer — las dos operaciones de esta clase

```js
// Entra: los campos de una tarea nueva (sin id todavía).
// Sale: el registro creado, ya con su id asignado.
function crearTarea(datos) {
  const registro = { id: siguienteId++, ...datos };
  tareas.push(registro);
  return registro;
}

// Entra: nada.
// Sale: el array completo de tareas guardadas hasta ahora.
function listarTareas() {
  return tareas;
}
```

`{ id: siguienteId++, ...datos }` arma el registro completo: primero el id (usando el valor actual de `siguienteId`, y recién después incrementándolo, por el orden del operador `++` después de la variable), y con `...datos` copia adentro todos los campos que llegaron (título, descripción, fecha). Actualizar y eliminar (que se enseñan en clases futuras) siguen el mismo patrón: buscar el registro por `id` dentro del array, y modificarlo o sacarlo.

## 4. Vamos a comprobarlo, y a ver también su límite real

```js
// persistencia.mjs
const tareas = [];
let siguienteId = 1;

function crearTarea(datos) {
  const registro = { id: siguienteId++, ...datos };
  tareas.push(registro);
  return registro;
}

function listarTareas() {
  return tareas;
}

crearTarea({ titulo: 'Comprar leche' });
crearTarea({ titulo: 'Llamar al dentista' });

console.log(listarTareas());
```

Ejecutado de verdad:

```
$ node persistencia.mjs
[
  { id: 1, titulo: 'Comprar leche' },
  { id: 2, titulo: 'Llamar al dentista' }
]
```

Los dos registros quedaron guardados, cada uno con su id correlativo — hasta acá, se comporta como se espera. Pero el límite real de esta simulación aparece al correrlo de nuevo, como un proceso nuevo (equivalente a reiniciar el servidor):

```
$ node persistencia.mjs
[
  { id: 1, titulo: 'Comprar leche' },
  { id: 2, titulo: 'Llamar al dentista' }
]
```

El resultado es idéntico — no porque los datos anteriores siguieran ahí, sino porque **no quedó nada de la ejecución anterior**: el array volvió a arrancar vacío, y por eso los ids volvieron a empezar en 1. Esto es exactamente lo que la Fase 9 va a resolver reemplazando este array por PostgreSQL: hasta entonces, cada vez que el servidor se reinicie durante el desarrollo, las tareas guardadas se pierden.

## 5. Buenas prácticas vigentes y errores comunes

- **El array vive en un solo lugar, y las rutas lo usan a través de funciones** (`crearTarea`, `listarTareas`), no accediéndolo directamente desde cada ruta — esto es lo que en la Clase 06 va a permitir organizar esto como una clase de programación (un repositorio), en vez de tener el array disperso por todo el archivo del servidor.
- **El contador de ids nunca se reinicia manualmente ni se reutiliza un id ya usado** — aunque se borre una tarea, su id no se vuelve a asignar a una tarea nueva; evita confundir un registro viejo con uno nuevo que por casualidad comparta id.
- **Esta simulación no es apta para producción bajo ningún concepto** — no es solo que se pierda al reiniciar: tampoco funciona si el servidor corre en más de un proceso a la vez, porque cada proceso tendría su propio array, sin compartir nada entre sí. Es una herramienta de aprendizaje para este punto del curso, no un atajo a mantener después de la Fase 9.

## 6. Lo que hay que poder responder sobre esto

- ¿Por qué un servidor no puede simplemente "recordar" entre peticiones? Porque cada petición ejecuta la función de la ruta y termina — nada persiste ahí por sí solo.
- ¿Cómo se simula la persistencia mientras no hay base de datos real? Con un array en memoria, en el nivel superior del archivo del servidor, más un contador de ids.
- ¿Qué se pierde con esta simulación, exactamente? Todo, cada vez que el proceso del servidor se reinicia.
- ¿Cuándo deja de usarse esta simulación? En el bloque de integración de base de datos real, después de cubrir todos los RF (Fase 9).

## Control de versiones de esta clase

1. Rama `clase-05-persistencia-simulada`, creada desde `main`.
2. No modifica `curso/app/` — es una clase de conocimiento; el ejemplo ejecutado vive en el mismo entorno de prueba descartable de las clases anteriores. El primer uso real de esta simulación, dentro del backend del proyecto, es la Clase 06.
