# Clase 04 — Express: cómo un servidor recibe una petición y responde

## 1. Qué es un servidor y qué es una petición, en simple

Hasta ahora todo el código construido vivía en el navegador. Un **servidor** es un programa aparte, corriendo en otra parte (en desarrollo, en la misma computadora, en otro proceso), cuyo trabajo es esperar a que alguien le pida algo y responder. El navegador (o cualquier otro programa) le manda una **petición** — un mensaje con una dirección, un método (qué quiere hacer: leer algo, crear algo, borrar algo) y, a veces, datos — y el servidor le devuelve una **respuesta**.

Esta relación (quien pide, quien responde) es la que va a permitir que el formulario de la Clase 03 termine guardando una tarea de verdad, en vez de solo imprimirla en la consola del navegador.

## 2. Qué es Express, demostrado con una ruta real

Node.js ya trae, de por sí, la capacidad de crear un servidor con su módulo nativo `http` — funciona, y hay proyectos que lo usan así directamente. Manejar varias rutas, parsear los datos de una petición y armar cada respuesta con ese módulo pide escribir más código propio por cada ruta nueva. **Express** es una librería que se pone encima de esa capacidad nativa y da una forma más corta y ordenada de decir "cuando llegue una petición a tal dirección, con tal método, hacé esto" ([expressjs.com — Routing](https://expressjs.com/en/guide/routing.html)):

```js
// s1_get.mjs
import express from 'express';
const app = express();

app.get('/saludo', (req, res) => {
  res.json({ mensaje: 'hola' });
});

app.listen(4001, () => console.log('escuchando en http://localhost:4001'));
```

Servidor arrancado de verdad (Node.js v22.14.0, `express@5.2.1` — coincide exacto con `curso/auditoria-stack.md`) y probado con una petición real desde otra terminal:

```
$ node s1_get.mjs &
$ curl -s -w "\nstatus: %{http_code}\n" http://localhost:4001/saludo
{"mensaje":"hola"}
status: 200
```

`app.get('/saludo', handler)` funcionó exactamente como se describe: cuando llegó una petición GET a esa dirección, Express ejecutó el `handler` y este respondió. Express tiene el mismo patrón para cada método: `app.post()` para crear algo, `app.put()` para reemplazar algo, `app.delete()` para borrar algo — el método le dice al servidor qué intención tiene la petición, antes incluso de mirar los datos.

## 3. Cómo recibe datos una petición — JSON y `express.json()`, demostrado con la falla y con la solución

Cuando el formulario de la Clase 03 mande la tarea nueva, no la va a mandar como texto suelto — la va a mandar en **JSON**, el mismo formato de datos que ya se usó en las clases anteriores (un objeto con llaves y valores, como `{"nombre": "Rodrigo"}`).

Por defecto, Express **no** convierte automáticamente el cuerpo de una petición a un objeto usable. Antes de agregar la solución, se comprueba el problema real:

```js
// s2_sinjson.mjs -- a propósito, SIN app.use(express.json())
import express from 'express';
const app = express();

app.post('/saludo', (req, res) => {
  console.log('req.body:', req.body);
  res.json({ recibido: req.body });
});

app.listen(4002, () => console.log('escuchando'));
```
```
$ curl -s -X POST http://localhost:4002/saludo -H "Content-Type: application/json" -d '{"nombre":"Rodrigo"}'
{}

--- en la terminal del servidor ---
req.body: undefined
```

El envío llegó — Express no tiró ningún error — pero `req.body` quedó `undefined`, y como `JSON.stringify` descarta los valores `undefined`, el cliente ni siquiera nota que faltó nada: recibió `{}` en vez de un error. Esto es exactamente lo que se corrige con el middleware:

```js
// se agrega ANTES de la ruta que necesita leer req.body
app.use(express.json());
```
```
$ curl -s -X POST http://localhost:4003/saludo -H "Content-Type: application/json" -d '{"nombre":"Rodrigo"}'
--- en la terminal del servidor, ahora sí ---
req.body: { nombre: 'Rodrigo' }
```

`app.use(...)` registra algo que se ejecuta **antes** que las rutas — por eso `express.json()` tiene que registrarse antes de cualquier ruta que necesite leer `req.body` ([expressjs.com — express.json()](https://expressjs.com/en/api.html#express.json)).

## 4. Cómo responde un servidor — códigos de estado, demostrados

Toda respuesta HTTP lleva un **código de estado**: un número que dice, sin tener que leer el cuerpo de la respuesta, si algo salió bien o mal, y de qué tipo. Los que va a usar este proyecto:

- **200** — la petición se cumplió (ya se vio en el punto 2: el GET respondió 200 sin pedirlo explícitamente — es el valor por defecto).
- **201** — se creó algo nuevo (por ejemplo, al guardar una tarea).
- **204** — se cumplió, pero no hay nada que devolver (por ejemplo, al borrar algo).
- **400** — el cliente mandó datos inválidos (por ejemplo, falta un campo obligatorio).
- **401** — hace falta estar autenticado y no lo está.
- **403** — está autenticado, pero no tiene permiso para esto puntual.
- **404** — lo que pidió no existe.

```js
// s3_completo.mjs -- junta las piezas de los puntos 2 y 3, más el código de estado
import express from 'express';
const app = express();
app.use(express.json());

app.get('/saludo', (req, res) => {
  res.json({ mensaje: 'hola' });
});

let siguienteId = 1;
app.post('/saludo', (req, res) => {
  if (!req.body.nombre) {
    res.status(400).json({ error: 'nombre es obligatorio' });
    return;
  }
  const registro = { id: siguienteId++, nombre: req.body.nombre };
  res.status(201).json(registro);
});

app.listen(4003, () => console.log('escuchando en http://localhost:4003'));
```

Probado con `curl`, dos peticiones más:

```
$ curl -s -w "\nstatus: %{http_code}\n" -X POST http://localhost:4003/saludo \
    -H "Content-Type: application/json" -d '{"nombre":"Rodrigo"}'
{"id":1,"nombre":"Rodrigo"}
status: 201

$ curl -s -w "\nstatus: %{http_code}\n" -X POST http://localhost:4003/saludo \
    -H "Content-Type: application/json" -d '{}'
{"error":"nombre es obligatorio"}
status: 400
```

POST con un dato válido respondió 201 con el registro creado (incluido el `id` que el servidor le asignó); POST sin el campo obligatorio respondió 400 con el error, sin crear nada. `res.json(...)` sin `res.status(...)` antes responde con 200 por defecto (visto en el punto 2) — por eso, para cualquier otro código, hay que pedirlo explícitamente con `res.status(N)` antes de `.json(...)`.

## 5. Buenas prácticas vigentes y errores comunes

- **Olvidar `app.use(express.json())`** es el error más común al recibir datos — el punto 3 lo acaba de mostrar ejecutado: `req.body` queda `undefined` en silencio, sin ningún error visible, y el cliente recibe una respuesta vacía en vez de un aviso.
- **Un código de estado ya enviado no se puede volver a cambiar** — pero el matiz real, comprobado ejecutando el caso, no es donde se esperaría:
  ```js
  // s5_dobleenvio.mjs
  app.get('/doble', (req, res) => {
    res.status(200).json({ ok: true });      // la respuesta ya se manda acá
    res.status(400).json({ error: '...' });  // segundo intento
  });
  ```
  ```
  $ curl -s -w "\nstatus real recibido: %{http_code}\n" http://localhost:4005/doble
  {"ok":true}
  status real recibido: 200

  --- en la terminal del servidor ---
  Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
  ```
  El cliente recibió la primera respuesta (200) tal cual, sin errores de su lado — el error real ocurrió del lado del servidor, al intentar mandar una segunda respuesta sobre una petición que ya había terminado. La regla práctica: nunca se llama a `.json()`/`.send()` más de una vez para la misma petición — `return` después de la primera (como ya hace el punto 4) evita justamente este error.
- **Express 5 requiere Node.js 18 o superior** — no es retrocompatible con versiones de Node más viejas que eso; no es un problema para este proyecto (Node v24 LTS confirmado), pero es una limitación real a tener en cuenta.
- **Express 5 cambió cómo se escriben las rutas con comodines** respecto a versiones anteriores (usa `path-to-regexp` v8) — por ejemplo, un comodín ahora se escribe `/files/*filepath` en vez de la sintaxis vieja. Este proyecto no usa rutas con comodines por ahora, pero es una diferencia real si se busca documentación vieja de Express 4 y las rutas no coinciden.

## 6. Lo que hay que poder responder sobre esto

- ¿Qué hace `app.get('/ruta', handler)`? Define qué ejecutar cuando llega una petición GET a esa ruta — el punto 2 lo mostró respondiendo de verdad.
- ¿Por qué hace falta `express.json()`? Porque sin él, el cuerpo JSON de una petición no se convierte a objeto — `req.body` queda `undefined` en silencio, comprobado en el punto 3 comparando el servidor con y sin el middleware.
- ¿Qué significan 200, 201 y 400? Éxito al leer, éxito al crear, y error del cliente (dato inválido) — los tres, vistos con una respuesta real en los puntos 2 y 4.
- ¿Cómo se fija el código de estado de una respuesta? Con `res.status(código)`, antes de `.json()`/`.send()` — y solo una vez por petición (punto 5).

## Control de versiones de esta clase

1. Rama `clase-04-express-http-json`, creada desde `main`.
2. No modifica `curso/app/` — es una clase de conocimiento; los servidores de ejemplo se ejecutaron en el mismo entorno de prueba descartable de las clases anteriores, fuera del repositorio del proyecto. El primer código real del backend se escribe en la Clase 06.
3. **Revisión**: contenido reescrito para aplicar la Regla 6 de `references/reglas-de-clase.md` (cada afirmación se demuestra en el momento en que se hace). Se ejecutaron cinco servidores Express reales en vez de uno solo al final, incluyendo dos casos que la versión anterior solo describía en prosa sin ejecutar: `req.body` quedando `undefined` sin el middleware, y el error real (`ERR_HTTP_HEADERS_SENT`) al intentar mandar una segunda respuesta — este último reveló que la afirmación original ("`res.status()` va siempre antes de `.json()`, nunca después") no era exactamente el matiz correcto: el error real ocurre al llamar a `.json()`/`.send()` dos veces, no por el orden de `.status()` en soledad.
