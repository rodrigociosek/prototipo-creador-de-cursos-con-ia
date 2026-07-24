# Clase 05 — Persistencia simulada: guardar datos mientras el servidor está corriendo

## 1. Qué es "persistencia" y por qué el servidor solo no alcanza

Un servidor Express, por sí solo (Clase 04), no recuerda nada entre una petición y otra — cada función de ruta hace su trabajo y termina. Para que crear una tarea (T-01) sirva de algo, esa tarea tiene que quedar guardada en algún lado, disponible para cuando después se pida la lista completa (otra tarea, otra petición). A eso se le llama **persistencia**: que un dato sobreviva más allá del momento puntual en que se creó.

La forma real y definitiva de persistencia para este proyecto es una base de datos (PostgreSQL, ya elegida en `curso/stack.md`) — pero esa pieza se enseña recién al final del curso, después de cubrir todos los RF (`SKILL.md` § Fase 9). Mientras tanto, el proyecto necesita algo que se comporte igual desde afuera (guardar, leer) sin necesitar todavía nada de eso.

## 2. La simulación: guardar en la memoria del propio proceso — y por qué la ubicación importa, demostrado

La solución es la más simple posible: un array de JavaScript, guardado en una variable del programa, más un contador para asignar un id a cada registro nuevo — exactamente el criterio ya fijado en `curso/tareas.md` § Decisiones técnicas transversales.

Antes de mostrar la ubicación correcta, se comprueba qué pasa con la incorrecta — el array **adentro** de la función que lo usa:

```js
// p1_adentro.mjs -- a propósito, mal ubicado, para comprobar el problema
function crearTareaMal(datos) {
  const tareas = []; // se recrea vacío cada vez que la función se llama
  let siguienteId = 1;
  const registro = { id: siguienteId++, ...datos };
  tareas.push(registro);
  return { registro, tareasEnEsteMomento: tareas };
}

console.log(crearTareaMal({ titulo: 'Comprar leche' }));
console.log(crearTareaMal({ titulo: 'Llamar al dentista' }));
```
```
$ node p1_adentro.mjs
{ registro: { id: 1, titulo: 'Comprar leche' }, tareasEnEsteMomento: [ { id: 1, titulo: 'Comprar leche' } ] }
{ registro: { id: 1, titulo: 'Llamar al dentista' }, tareasEnEsteMomento: [ { id: 1, titulo: 'Llamar al dentista' } ] }
```

Confirmado: la segunda tarea también recibió `id: 1`, y `tareasEnEsteMomento` nunca tiene más de un elemento — el array se recreó vacío en cada llamada, exactamente como una variable común dentro de una función (mismo mecanismo que ya se vio con los componentes de React en la Clase 01/02, aplicado ahora a un servidor). La solución es sacar el array afuera de cualquier función, al nivel superior del archivo, para que todas las rutas (crear, leer, editar, borrar) accedan al mismo:

```js
// p2_afuera.mjs
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
```

`{ id: siguienteId++, ...datos }` arma el registro completo: primero el id (usando el valor actual de `siguienteId`, y recién después incrementándolo, por el orden del operador `++` después de la variable), y con `...datos` copia adentro todos los campos que llegaron (título, descripción, fecha).

## 3. Crear y leer, demostrado de punta a punta

```js
// se agrega debajo de p2_afuera.mjs
console.log('creando #1:', crearTarea({ titulo: 'Comprar leche' }));
console.log('creando #2:', crearTarea({ titulo: 'Llamar al dentista' }));
console.log('listado completo:', listarTareas());
```
```
$ node p2_afuera.mjs
creando #1: { id: 1, titulo: 'Comprar leche' }
creando #2: { id: 2, titulo: 'Llamar al dentista' }
listado completo: [
  { id: 1, titulo: 'Comprar leche' },
  { id: 2, titulo: 'Llamar al dentista' }
]
```

Ahora sí: los dos registros quedaron guardados, cada uno con su id correlativo (`1`, después `2`), y `listarTareas()` devuelve ambos — a diferencia del punto 2, acá `tareas` es el mismo array para las tres llamadas, porque vive afuera de las funciones que lo tocan. Actualizar y eliminar (que se enseñan en clases futuras) siguen el mismo patrón: buscar el registro por `id` dentro del array, y modificarlo o sacarlo.

## 4. El límite real de esta simulación, demostrado reiniciando el proceso

El resultado del punto 3 se ve completo y correcto — pero solo mientras el mismo proceso de Node siga corriendo. Se corre exactamente el mismo archivo (`p2_afuera.mjs`) una segunda vez, como un proceso nuevo — equivalente a reiniciar el servidor:

```
$ node p2_afuera.mjs   # primera ejecución
creando #1: { id: 1, titulo: 'Comprar leche' }
creando #2: { id: 2, titulo: 'Llamar al dentista' }
listado completo: [ { id: 1, ... }, { id: 2, ... } ]

$ node p2_afuera.mjs   # segunda ejecución -- proceso nuevo
creando #1: { id: 1, titulo: 'Comprar leche' }
creando #2: { id: 2, titulo: 'Llamar al dentista' }
listado completo: [ { id: 1, ... }, { id: 2, ... } ]
```

El resultado es idéntico — no porque los datos de la primera ejecución siguieran ahí, sino porque **no quedó nada de ella**: el array volvió a arrancar vacío, y por eso los ids volvieron a empezar en 1. Esto es exactamente lo que la Fase 9 va a resolver reemplazando este array por PostgreSQL: hasta entonces, cada vez que el servidor se reinicie durante el desarrollo, las tareas guardadas se pierden.

## 5. Buenas prácticas vigentes y errores comunes

- **El array vive en un solo lugar, y las rutas lo usan a través de funciones** (`crearTarea`, `listarTareas`), no accediéndolo directamente desde cada ruta — el punto 2 ya lo demostró: si el array quedara mal ubicado, ni siquiera acumula datos dentro del mismo proceso. Esto es lo que en la Clase 06 va a permitir organizar esto como una clase de programación (un repositorio).
- **El contador de ids nunca se reinicia manualmente ni se reutiliza un id ya usado** — aunque se borre una tarea, su id no se vuelve a asignar a una tarea nueva; evita confundir un registro viejo con uno nuevo que por casualidad comparta id.
- **Esta simulación no es apta para producción bajo ningún concepto** — no es solo que se pierda al reiniciar (punto 4): tampoco funciona si el servidor corre en más de un proceso a la vez, porque cada proceso tendría su propio array, sin compartir nada entre sí — es la misma limitación del punto 4, pero entre dos procesos corriendo al mismo tiempo en vez de uno después del otro. Es una herramienta de aprendizaje para este punto del curso, no un atajo a mantener después de la Fase 9.

## 6. Lo que hay que poder responder sobre esto

- ¿Por qué un servidor no puede simplemente "recordar" entre peticiones? Porque cada petición ejecuta la función de la ruta y termina — nada persiste ahí por sí solo.
- ¿Cómo se simula la persistencia mientras no hay base de datos real? Con un array en memoria, en el nivel superior del archivo del servidor (punto 2: se comprobó que adentro de una función no funciona), más un contador de ids.
- ¿Qué se pierde con esta simulación, exactamente? Todo, cada vez que el proceso del servidor se reinicia — demostrado en el punto 4 corriendo el mismo script dos veces.
- ¿Cuándo deja de usarse esta simulación? En el bloque de integración de base de datos real, después de cubrir todos los RF (Fase 9).

## Control de versiones de esta clase

1. Rama `clase-05-persistencia-simulada`, creada desde `main`.
2. No modifica `curso/app/` — es una clase de conocimiento; los ejemplos ejecutados viven en el mismo entorno de prueba descartable de las clases anteriores. El primer uso real de esta simulación, dentro del backend del proyecto, es la Clase 06.
3. **Revisión**: contenido reescrito para aplicar la Regla 6 de `references/reglas-de-clase.md` (cada afirmación se demuestra en el momento en que se hace). Se agregó una demostración nueva que la versión anterior no tenía: el array ubicado *adentro* de la función, ejecutado de verdad, para probar por qué la ubicación afuera es necesaria — antes esa afirmación solo estaba en prosa, sin ejecutar el caso contrario.
