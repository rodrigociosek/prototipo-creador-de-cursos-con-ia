# Clase 01 — Qué es un componente de React y cómo React lo convierte en pantalla

## 1. Qué es un componente, y por qué existe

Un **componente** de React es una función de JavaScript que describe un pedazo de interfaz — qué se tiene que ver, no cómo dibujarlo píxel a píxel.

¿Por qué se escribe así, en vez de HTML y JavaScript en archivos separados? Esa separación funciona, y todavía se usa en muchos proyectos: el HTML define qué se muestra, y un archivo de JavaScript aparte decide cuándo cambiarlo. React propone juntar las dos cosas en un mismo lugar, el componente — más cómodo para interfaces que cambian seguido, porque no hace falta acordarse de actualizar dos archivos distintos cada vez que algo cambia ([react.dev — Writing Markup with JSX](https://react.dev/learn/writing-markup-with-jsx)).

## 2. Cómo se escribe un componente

Un componente es, literalmente, una función con dos reglas: **su nombre empieza con mayúscula**, y **devuelve una descripción de interfaz** (lo que se ve en el punto 3).

```js
// Un componente de React: función normal de JavaScript, con nombre
// en mayúscula (React lo distingue así de una etiqueta HTML nativa
// como <section> o <img>).
// Entra: nada en este caso (más adelante, en el punto 4, entran props).
// Sale: una descripción de qué mostrar (acá, una sección con título y texto).
function Bienvenida() {
  return (
    <section>
      <h1>Hola</h1>
      <p>Bienvenido al curso.</p>
    </section>
  );
}
```

La mayúscula inicial no es una convención de estilo — es lo que React usa para decidir si `<Bienvenida />` es tu componente o una etiqueta HTML nativa. Si el nombre empezara con minúscula, React lo trataría como una etiqueta HTML real, buscaría una etiqueta `<bienvenida>` que no existe, y fallaría ([react.dev — Your First Component](https://react.dev/learn/your-first-component)).

## 3. Qué es ese `<section>...</section>` de adentro — JSX, y por qué no es HTML

Lo que el componente devuelve se escribe con **JSX**: una sintaxis que se parece a HTML pero que en realidad es JavaScript por detrás (el punto 6 muestra la prueba). JSX tiene tres reglas que HTML no exige:

```js
// Regla 1: un único elemento raíz (acá, el <div> envuelve todo).
// Regla 2: toda etiqueta se cierra, incluso las que en HTML se dejan abiertas.
// Regla 3: los atributos van en camelCase (className, no class).
function Ejemplo() {
  return (
    <div>
      <img src="foto.png" alt="ejemplo" className="foto" />
      <p>Texto</p>
    </div>
  );
}
```

Sin la regla 1 (un único elemento raíz), React no sabría cómo devolver "dos cosas sueltas" a la vez — por eso, si hacen falta dos elementos sin agregar una etiqueta visible de más, se usa un *Fragment* (`<>...</>`) en vez de forzar un `<div>` extra ([react.dev — Writing Markup with JSX](https://react.dev/learn/writing-markup-with-jsx)).

## 4. Qué entra y qué sale de un componente

Un componente puede recibir datos desde afuera — se llaman **props**, y llegan como un único objeto:

```js
// Entra: props, un objeto — acá se usa props.name.
// Sale: la misma descripción de interfaz de antes, pero con el dato insertado.
function Greeting(props) {
  return (
    <section className="greeting">
      <h1>Hola, {props.name}</h1>
      <p>Bienvenido al curso.</p>
    </section>
  );
}

// Uso: se llama como una etiqueta, pasando el prop como si fuera un
// atributo HTML.
// <Greeting name="Rodrigo" />
```

La salida de un componente **no es HTML todavía** — es una descripción de qué debería verse, que React interpreta después (punto 5). Esa distinción importa: el componente no "dibuja" nada directamente, solo dice qué tendría que dibujarse.

## 5. Qué hace React con esa descripción — el mecanismo real

React convierte esa descripción en pantalla real en tres pasos, siempre en el mismo orden ([react.dev — Render and Commit](https://react.dev/learn/render-and-commit)):

1. **Trigger (disparo)** — algo pide que se dibuje: la primera vez que arranca la app, o (más adelante, cuando se enseñe estado) un cambio de datos.
2. **Render** — React **llama a la función** del componente (la de los puntos 2 y 4) para obtener su descripción. Si esa descripción incluye otros componentes adentro, React los llama también, en cascada.
3. **Commit** — React aplica esa descripción al DOM real del navegador. En la primera vez, agrega todo. En una actualización, **compara** la descripción nueva contra la anterior y toca solo lo que cambió — si solo cambió un texto, no vuelve a tocar el resto de la página.

Después del commit, el navegador pinta la pantalla con esos cambios. Esto es lo que hace que React sea eficiente: la función del componente se ejecuta pensando "esto es lo que debería verse", pero React se encarga de tocar el DOM real lo menos posible.

## 6. Vamos a ejecutar esto de verdad y ver qué produce

El código de los puntos anteriores usa JSX, que necesita un paso de compilación (a cargo de Vite, que se configura más adelante cuando se arma el proyecto real). Para poder ejecutar algo *ahora mismo*, sin esperar a esa configuración, hay un atajo útil: **JSX se compila exactamente a llamadas a `React.createElement`** — es la forma real, sin azúcar sintáctico, de lo mismo que escribiste en el punto 4. Ver esto en código es, en sí mismo, un dato importante del mecanismo interno.

```js
// demo.mjs — mismo componente Greeting del punto 4, escrito con
// React.createElement en vez de JSX, para poder ejecutarlo sin
// compilador. JSX (punto 4) se traduce exactamente a este código.
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

function Greeting(props) {
  return React.createElement(
    'section',
    { className: 'greeting' },
    React.createElement('h1', null, `Hola, ${props.name}`),
    React.createElement('p', null, 'Bienvenido al curso.')
  );
}

// React.createElement(Componente, props) es la llamada equivalente
// a escribir <Greeting name="Rodrigo" /> en JSX.
const elemento = React.createElement(Greeting, { name: 'Rodrigo' });

// renderToStaticMarkup hace, sin navegador, lo mismo que el paso
// "Commit" del punto 5: convierte la descripción en HTML real.
const html = renderToStaticMarkup(elemento);
console.log(html);
```

Ejecutado de verdad (Node.js v22.14.0 — la versión disponible en este entorno; el proyecto usa Node v24.18.0 LTS confirmado en `curso/auditoria-stack.md`, pero el comportamiento de React acá no depende de esa diferencia de versión de Node — ambas son compatibles con React 19; ver `package.json` del scratch de esta clase para las versiones exactas instaladas: `react@19.2.8`, `react-dom@19.2.8`, las mismas confirmadas para el proyecto):

```
$ node demo.mjs
<section class="greeting"><h1>Hola, Rodrigo</h1><p>Bienvenido al curso.</p></section>
```

Esto confirma el punto 5: la función `Greeting` nunca tocó el DOM ni imprimió HTML directamente — solo describió una estructura, y algo externo (acá, `renderToStaticMarkup`; en el navegador real, el paso Commit) la convirtió en el resultado final. Nota también que `class="greeting"` en la salida viene de `className: 'greeting'` en el código — React lo traduce de vuelta al atributo HTML real, que sí se llama `class`.

## 7. Qué pasa si cambian los datos — el mismo componente, usado distinto

Un componente vale la pena si sirve para más de un caso. Se ejecuta el mismo `Greeting`, dos veces, con props distintos:

```js
// Mismo componente Greeting de antes. Se reutiliza dos veces con
// datos distintos — esta es la razón de ser de un componente: una
// sola definición, muchos usos.
const lista = React.createElement(
  'div',
  null,
  React.createElement(Greeting, { name: 'Ana' }),
  React.createElement(Greeting, { name: 'Luis' })
);
console.log(renderToStaticMarkup(lista));
```

Resultado real de ejecutarlo:

```
$ node demo-variacion.mjs
<div><section class="greeting"><h1>Hola, Ana</h1><p>Bienvenido al curso.</p></section><section class="greeting"><h1>Hola, Luis</h1><p>Bienvenido al curso.</p></section></div>
```

La función `Greeting` no cambió entre un caso y otro — lo único que cambió fue el prop `name` que se le pasó. Esto es lo que más adelante va a permitir mostrar, por ejemplo, un formulario que reacciona a lo que el usuario escribe: mismo componente, distinto dato de entrada, distinto resultado.

## 8. Buenas prácticas vigentes y errores comunes

- **El nombre con mayúscula no es opcional.** Si escribís `function greeting()` (minúscula) y lo usás como `<greeting />`, React lo va a tratar como una etiqueta HTML nativa inexistente y va a fallar — es el error más común al empezar.
- **Nunca definas un componente adentro de otro componente.** Es válido en JavaScript, pero React lo recrea desde cero en cada ejecución, lo cual es lento y provoca comportamientos inesperados apenas el componente empiece a manejar datos propios (eso se ve en la próxima clase) — los componentes se definen siempre al nivel superior del archivo.
- **El código nuevo de React ya no se escribe con "class components"** (una forma antigua de definir componentes usando clases de JavaScript en vez de funciones). Sigue existiendo en proyectos viejos, pero la documentación oficial y la comunidad usan funciones — es lo que se usa en este curso.

## 9. Lo que hay que poder responder sobre esto

- ¿Qué es un componente? Una función de JavaScript que describe un pedazo de interfaz.
- ¿Qué recibe? Props, como un único objeto.
- ¿Qué devuelve? Una descripción de qué mostrar (JSX, que se traduce a `React.createElement`) — no HTML directo.
- ¿Qué hace React con eso? Lo ejecuta (Render), y aplica el resultado al DOM real tocando solo lo necesario (Commit).

## Control de versiones de esta clase

1. Se creó la rama `clase-01-react-componentes` a partir de `main` — es la primera clase de construcción real del curso (aunque `main` ya tenía historial previo del propio desarrollo del motor, así que no correspondía `git init`).
2. Esta clase no modifica `curso/app/` — es una clase de conocimiento puro, no construye ningún RF todavía. El ejemplo ejecutado (`demo.mjs`, `demo-variacion.mjs`) vive fuera del repositorio del proyecto, en un entorno de prueba descartable, porque no es código del proyecto real.
3. El commit de esta clase incluye el archivo de la clase (`curso/clases/clase-01-react-y-componentes.md`) y la actualización de `curso/conceptos-enseñados.md` y `curso/PROGRESS.md`.
