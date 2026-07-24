# Clase 04 — Express: cómo un servidor recibe una petición y responde

## 1. Qué es un servidor y qué es una petición, en simple

Hasta ahora todo el código construido vivía en el navegador. Un **servidor** es un programa aparte, corriendo en otra parte (en desarrollo, en la misma computadora, en otro proceso), cuyo trabajo es esperar a que alguien le pida algo y responder. El navegador (o cualquier otro programa) le manda una **petición** — un mensaje con una dirección, un método (qué quiere hacer: leer algo, crear algo, borrar algo) y, a veces, datos — y el servidor le devuelve una **respuesta**.

Esta relación (quien pide, quien responde) es la que va a permitir que el formulario de la Clase 03 termine guardando una tarea de verdad, en vez de solo imprimirla en la consola del navegador.

## 2. Qué es Express, y qué aporta sobre el módulo nativo de Node

Node.js ya trae, de por sí, la capacidad de crear un servidor con su módulo nativo `http` — funciona, y hay proyectos que lo usan así directamente. Manejar varias rutas, parsear los datos de una petición y armar cada respuesta con ese módulo pide escribir más código propio por cada ruta nueva. **Express** es una librería que se pone encima de esa capacidad nativa y da una forma más corta y ordenada de decir "cuando llegue una petición a tal dirección, con tal método, hacé esto" ([expressjs.com — Routing](https://expressjs.com/en/guide/routing.html)).

```js
// Un servidor Express mínimo.
import express from 'express';

const app = express(); // crea la aplicación

// Cuando llegue una petición GET a "/saludo", ejecutar esta función.
// Entra: req (la petición), res (para construir la respuesta).
// Sale: nada — el efecto es la respuesta que se envía con res.json().
app.get('/saludo', (req, res) => {
  res.json({ mensaje: 'hola' });
});

app.listen(4000); // empieza a escuchar peticiones en el puerto 4000
```

`app.get(...)` define una ruta para el método GET (pedir/leer algo). Express tiene el mismo patrón para cada método: `app.post()` para crear algo, `app.put()` para reemplazar algo, `app.delete()` para borrar algo — el método le dice al servidor qué intención tiene la petición, antes incluso de mirar los datos.

## 3. Cómo recibe datos una petición — JSON y `express.json()`

Cuando el formulario de la Clase 03 mande la tarea nueva, no la va a mandar como texto suelto — la va a mandar en **JSON**, el mismo formato de datos que ya se usó en las clases anteriores (un objeto con llaves y valores, como `{"nombre": "Rodrigo"}`).

Por defecto, Express **no** convierte automáticamente el cuerpo de una petición a un objeto usable — hay que decírselo explícitamente con un middleware:

```js
// Sin esto, req.body queda undefined aunque la peticion traiga JSON.
app.use(express.json());

app.post('/saludo', (req, res) => {
  console.log(req.body); // ahora sí es un objeto JS: { nombre: "Rodrigo" }
});
```

`app.use(...)` registra algo que se ejecuta **antes** que las rutas — por eso `express.json()` tiene que registrarse antes de cualquier ruta que necesite leer `req.body` ([expressjs.com — express.json()](https://expressjs.com/en/api.html#express.json)).

## 4. Cómo responde un servidor — códigos de estado

Toda respuesta HTTP lleva un **código de estado**: un número que dice, sin tener que leer el cuerpo de la respuesta, si algo salió bien o mal, y de qué tipo. Los que va a usar este proyecto:

- **200** — la petición se cumplió (por ejemplo, al leer datos).
- **201** — se creó algo nuevo (por ejemplo, al guardar una tarea).
- **204** — se cumplió, pero no hay nada que devolver (por ejemplo, al borrar algo).
- **400** — el cliente mandó datos inválidos (por ejemplo, falta un campo obligatorio).
- **401** — hace falta estar autenticado y no lo está.
- **403** — está autenticado, pero no tiene permiso para esto puntual.
- **404** — lo que pidió no existe.

```js
// Ejemplo: 201 al crear algo, 400 si falta un dato obligatorio.
app.post('/saludo', (req, res) => {
  if (!req.body.nombre) {
    res.status(400).json({ error: 'nombre es obligatorio' });
    return;
  }
  res.status(201).json({ id: 1, nombre: req.body.nombre });
});
```

`res.json(...)` sin `res.status(...)` antes responde con 200 por defecto — por eso, para cualquier otro código, hay que pedirlo explícitamente con `res.status(N)` antes de `.json(...)`.

## 5. Vamos a probar esto de verdad

```js
// server.mjs
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

app.listen(4000, () => console.log('escuchando en http://localhost:4000'));
```

Servidor arrancado (Node.js v22.14.0, `express@5.2.1` — coincide exacto con la versión confirmada en `curso/auditoria-stack.md`) y probado con `curl`, simulando tres peticiones reales:

```
$ curl -s -w "\nstatus: %{http_code}\n" http://localhost:4000/saludo
{"mensaje":"hola"}
status: 200

$ curl -s -w "\nstatus: %{http_code}\n" -X POST http://localhost:4000/saludo \
    -H "Content-Type: application/json" -d '{"nombre":"Rodrigo"}'
{"id":1,"nombre":"Rodrigo"}
status: 201

$ curl -s -w "\nstatus: %{http_code}\n" -X POST http://localhost:4000/saludo \
    -H "Content-Type: application/json" -d '{}'
{"error":"nombre es obligatorio"}
status: 400
```

Los tres casos confirman lo explicado: GET responde 200 con los datos pedidos; POST con un dato válido responde 201 con el registro creado (incluido el `id` que el servidor le asignó); POST sin el campo obligatorio responde 400 con el error, sin crear nada.

## 6. Buenas prácticas vigentes y errores comunes

- **Express 5 requiere Node.js 18 o superior** — no es retrocompatible con versiones de Node más viejas que eso; no es un problema para este proyecto (Node v24 LTS confirmado), pero es una limitación real a tener en cuenta.
- **Olvidar `app.use(express.json())`** es el error más común al recibir datos: `req.body` queda `undefined` en silencio, sin ningún error visible, y cuesta detectar por qué "no llegan los datos".
- **Express 5 cambió cómo se escriben las rutas con comodines** respecto a versiones anteriores (usa `path-to-regexp` v8) — por ejemplo, un comodín ahora se escribe `/files/*filepath` en vez de la sintaxis vieja. Este proyecto no usa rutas con comodines por ahora, pero es una diferencia real si se busca documentación vieja de Express 4 y las rutas no coinciden.
- **`res.status(código)` va siempre antes de `.json(...)` o `.send(...)`**, nunca después — una vez que la respuesta se envía, el código de estado ya quedó fijado.

## 7. Lo que hay que poder responder sobre esto

- ¿Qué hace `app.get('/ruta', handler)`? Define qué ejecutar cuando llega una petición GET a esa ruta.
- ¿Por qué hace falta `express.json()`? Porque sin él, el cuerpo JSON de una petición no se convierte a objeto — `req.body` queda `undefined`.
- ¿Qué significan 200, 201 y 400? Éxito al leer, éxito al crear, y error del cliente (dato inválido), respectivamente.
- ¿Cómo se fija el código de estado de una respuesta? Con `res.status(código)`, antes de `.json()`/`.send()`.

## Control de versiones de esta clase

1. Rama `clase-04-express-http-json`, creada desde `main`.
2. No modifica `curso/app/` — es una clase de conocimiento; el servidor de ejemplo se ejecutó en el mismo entorno de prueba descartable de las clases anteriores, fuera del repositorio del proyecto. El primer código real del backend se escribe en la Clase 06.
