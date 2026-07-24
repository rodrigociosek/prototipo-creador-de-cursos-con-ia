# Clase 01 — Qué es un componente de React y cómo React lo convierte en pantalla

## 1. Qué es un componente, y por qué existe

Un **componente** de React es una función de JavaScript que describe un pedazo de interfaz — qué se tiene que ver, no cómo dibujarlo píxel a píxel.

¿Por qué se escribe así, en vez de HTML y JavaScript en archivos separados? Esa separación funciona, y todavía se usa en muchos proyectos: el HTML define qué se muestra, y un archivo de JavaScript aparte decide cuándo cambiarlo. React propone juntar las dos cosas en un mismo lugar, el componente — más cómodo para interfaces que cambian seguido, porque no hace falta acordarse de actualizar dos archivos distintos cada vez que algo cambia ([react.dev — Writing Markup with JSX](https://react.dev/learn/writing-markup-with-jsx)).

## 2. Cómo se escribe un componente, demostrado

Un componente es, literalmente, una función con dos reglas: **su nombre empieza con mayúscula**, y **devuelve una descripción de interfaz**.

```js
// demo1.mjs
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

function Bienvenida() {
  return React.createElement(
    'section',
    null,
    React.createElement('h1', null, 'Hola'),
    React.createElement('p', null, 'Bienvenido al curso.')
  );
}

console.log(renderToStaticMarkup(React.createElement(Bienvenida)));
```
```
$ node demo1.mjs
<section><h1>Hola</h1><p>Bienvenido al curso.</p></section>
```

`Bienvenida` no imprimió nada ni tocó ninguna pantalla — devolvió una descripción, y algo externo (acá, `renderToStaticMarkup`) la convirtió en el HTML final. Ese "algo externo" es exactamente lo que hace React, y el próximo bloque muestra cómo distingue esta función de una etiqueta HTML común.

¿Por qué importa la mayúscula inicial? Es la señal que React usa para decidir si `<Bienvenida />` es tu componente o una etiqueta HTML nativa:

```js
// demo2.mjs
function Bienvenida() {
  return React.createElement('h1', null, 'Hola');
}

console.log('createElement(Bienvenida):  ', renderToStaticMarkup(React.createElement(Bienvenida)));
console.log('createElement("bienvenida"):', renderToStaticMarkup(React.createElement('bienvenida', null, 'Hola')));
```
```
$ node demo2.mjs
createElement(Bienvenida):   <h1>Hola</h1>
createElement("bienvenida"): <bienvenida>Hola</bienvenida>
```

Con el nombre de la función, React la **invoca** — el resultado es el `<h1>` que `Bienvenida` devuelve. Con el string en minúscula, React nunca llama a ninguna función: lo trata directo como el nombre de una etiqueta HTML, y como `<bienvenida>` no es una etiqueta real, el navegador la deja pasar como una etiqueta desconocida, sin aplicarle ningún estilo ni comportamiento — **y sin ningún error visible**. Por eso la mayúscula no es una convención de estilo: es la señal que evita justamente este resultado silenciosamente equivocado ([react.dev — Your First Component](https://react.dev/learn/your-first-component)).

## 3. Qué es JSX, y qué reglas tiene que HTML no exige

Lo que un componente devuelve normalmente se escribe con **JSX**: una sintaxis que se parece a HTML pero que en realidad es JavaScript por detrás (el punto 4 lo prueba). JSX exige tres reglas que HTML no exige: un único elemento raíz, toda etiqueta cerrada (incluso las que en HTML se dejan abiertas), y los atributos en camelCase (`className`, no `class`).

De esas tres, la del elemento raíz es la que tiene un efecto real, visible en el resultado. React necesita que el componente devuelva **una** cosa, no dos sueltas — envolver en un `<div>` cumple la regla, pero agrega una etiqueta al HTML final que quizás no hacía falta. Para eso existe el *Fragment* (`<>...</>`), que agrupa sin dejar rastro en el resultado:

```js
// demo3.mjs
const conDiv = React.createElement('div', null,
  React.createElement('h1', null, 'Hola'),
  React.createElement('p', null, 'Texto'));
console.log('con <div> envolviendo:', renderToStaticMarkup(conDiv));

const conFragment = React.createElement(React.Fragment, null,
  React.createElement('h1', null, 'Hola'),
  React.createElement('p', null, 'Texto'));
console.log('con Fragment:         ', renderToStaticMarkup(conFragment));
```
```
$ node demo3.mjs
con <div> envolviendo: <div><h1>Hola</h1><p>Texto</p></div>
con Fragment:          <h1>Hola</h1><p>Texto</p>
```

El `<div>` queda en el HTML final porque es un elemento real que se pidió explícitamente; el Fragment cumple la misma regla (un único elemento raíz) pero no agrega nada al resultado — la diferencia entre las dos líneas de arriba es exactamente esa etiqueta de más ([react.dev — Writing Markup with JSX](https://react.dev/learn/writing-markup-with-jsx)).

## 4. Qué entra y qué sale de un componente — props, demostrado

Un componente puede recibir datos desde afuera — se llaman **props**, y llegan como un único objeto:

```js
// demo4.mjs
function Greeting(props) {
  return React.createElement('section', { className: 'greeting' },
    React.createElement('h1', null, `Hola, ${props.name}`),
    React.createElement('p', null, 'Bienvenido al curso.'));
}
console.log(renderToStaticMarkup(React.createElement(Greeting, { name: 'Rodrigo' })));
console.log(renderToStaticMarkup(React.createElement(Greeting, { name: 'Ana' })));
```
```
$ node demo4.mjs
<section class="greeting"><h1>Hola, Rodrigo</h1><p>Bienvenido al curso.</p></section>
<section class="greeting"><h1>Hola, Ana</h1><p>Bienvenido al curso.</p></section>
```

Mismo componente, mismo código — lo único que cambió fue el prop `name`, y el resultado cambió con él. Esto también confirma dos cosas del punto 3: `className: 'greeting'` se convirtió en `class="greeting"` en el HTML (React traduce el atributo camelCase al nombre real del DOM), y la salida de `Greeting` **no es HTML todavía** cuando la función termina — es una descripción que otra cosa (acá, `renderToStaticMarkup`) convierte en HTML real.

Un componente vale la pena si sirve para más de un caso — reutilizarlo dos veces con datos distintos, en un mismo árbol, es exactamente eso:

```js
// demo5.mjs
const lista = React.createElement('div', null,
  React.createElement(Greeting, { name: 'Ana' }),
  React.createElement(Greeting, { name: 'Luis' }));
console.log(renderToStaticMarkup(lista));
```
```
$ node demo5.mjs
<div><section class="greeting"><h1>Hola, Ana</h1><p>Bienvenido al curso.</p></section><section class="greeting"><h1>Hola, Luis</h1><p>Bienvenido al curso.</p></section></div>
```

`Greeting` se ejecutó dos veces dentro del mismo `<div>` — una por cada uso, cada vez con su propio prop. Esto es justo lo que el próximo punto llama "Render en cascada".

## 5. Qué hace React con esa descripción — el mecanismo real

React convierte esa descripción en pantalla real en tres pasos, siempre en el mismo orden ([react.dev — Render and Commit](https://react.dev/learn/render-and-commit)):

1. **Trigger (disparo)** — algo pide que se dibuje: la primera vez que arranca la app, o (más adelante, cuando se enseñe estado, Clase 02) un cambio de datos.
2. **Render** — React **llama a la función** del componente para obtener su descripción. Si esa descripción incluye otros componentes adentro, React los llama también, en cascada — es exactamente lo que acaba de pasar en la demo anterior: `Greeting` se ejecutó dos veces, una por cada instancia dentro de `lista`.
3. **Commit** — React aplica esa descripción al DOM real del navegador. En la primera vez, agrega todo. En una actualización, compara la descripción nueva contra la anterior y toca solo lo que cambió.

El paso Commit necesita un DOM real del navegador para comparar una versión contra la siguiente. Acá, sin navegador, `renderToStaticMarkup` solo hace la conversión final a HTML de una sola vez — no hay una versión "anterior" con la cual comparar. Esa comparación en vivo (que React solo toque lo que cambió) se verifica de verdad recién en la Clase 03, cuando el formulario corra en un navegador real.

## 6. Buenas prácticas vigentes y errores comunes

- **El nombre con mayúscula no es opcional.** Ya se vio en el punto 2: con minúscula, React no llama a la función — la trata como una etiqueta HTML que no existe, y el navegador la ignora sin ningún aviso. Es el error más común al empezar, y el más difícil de notar porque no tira ningún error.
- **Nunca definas un componente adentro de otro componente.** Es válido en JavaScript, pero cada vez que el componente exterior se vuelve a ejecutar, la definición de adentro se vuelve a evaluar — y en JavaScript, una función definida de nuevo nunca es la misma función, aunque el código sea idéntico:
  ```js
  // demo6.mjs -- no hace falta React para ver esto, es JavaScript puro
  function Padre() {
    function Hijo() {}
    return Hijo;
  }
  const hijo1 = Padre();
  const hijo2 = Padre();
  console.log('¿misma función?', hijo1 === hijo2);
  ```
  ```
  $ node demo6.mjs
  ¿misma función? false
  ```
  React identifica a un componente por su función, no por su nombre — si en cada Render la función es "nueva" (como acá), React trata al componente como si fuera otro completamente distinto: lo desmonta y lo vuelve a montar de cero en vez de actualizarlo. Por eso los componentes se definen siempre al nivel superior del archivo, nunca adentro de otro.
- **El código nuevo de React ya no se escribe con "class components"** (una forma antigua de definir componentes usando clases de JavaScript en vez de funciones). Sigue existiendo en proyectos viejos, pero la documentación oficial y la comunidad usan funciones — es lo que se usa en este curso.

## 7. Lo que hay que poder responder sobre esto

- ¿Qué es un componente? Una función de JavaScript que describe un pedazo de interfaz.
- ¿Qué recibe? Props, como un único objeto — el punto 4 lo mostró: mismo componente, distinto `name`, distinto resultado.
- ¿Qué devuelve? Una descripción de qué mostrar (JSX, que se traduce a `React.createElement`) — no HTML directo: el punto 2 lo mostró, `Bienvenida` no imprimió nada por su cuenta.
- ¿Qué hace React con eso? Lo ejecuta (Render, en cascada si hay componentes adentro — punto 4), y aplica el resultado al DOM real tocando solo lo necesario (Commit, verificado con navegador real recién en la Clase 03).

## Control de versiones de esta clase

1. Se creó la rama `clase-01-react-componentes` a partir de `main` — es la primera clase de construcción real del curso (aunque `main` ya tenía historial previo del propio desarrollo del motor, así que no correspondía `git init`).
2. Esta clase no modifica `curso/app/` — es una clase de conocimiento puro, no construye ningún RF todavía. Los seis fragmentos ejecutados (`demo1.mjs` a `demo6.mjs`) viven fuera del repositorio del proyecto, en un entorno de prueba descartable, porque no son código del proyecto real.
3. El commit de esta clase incluye el archivo de la clase (`curso/clases/clase-01-react-y-componentes.md`) y la actualización de `curso/conceptos-enseñados.md` y `curso/PROGRESS.md`.
4. **Revisión**: contenido reescrito para aplicar la Regla 6 de `references/reglas-de-clase.md` (cada afirmación se demuestra en el momento en que se hace, no se deja para un bloque consolidado al final) — mismo concepto enseñado (K10), ahora con seis demostraciones ejecutadas intercaladas en vez de una sola al final.
