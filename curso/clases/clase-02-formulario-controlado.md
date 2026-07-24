# Clase 02 — Formulario controlado: cómo un componente recuerda lo que el usuario escribe

## 1. Qué necesita un campo de texto que un componente simple no ofrece

El componente de la clase anterior siempre mostraba lo mismo — recibía props y las mostraba, sin cambiar nunca por sí solo, y eso le alcanzaba para lo que hacía.

```js
// demo1.mjs
function Titulo() {
  return React.createElement('h1', null, 'Mi lista de tareas');
}
console.log('primera llamada: ', renderToStaticMarkup(React.createElement(Titulo)));
console.log('segunda llamada:', renderToStaticMarkup(React.createElement(Titulo)));
```
```
$ node demo1.mjs
primera llamada:  <h1>Mi lista de tareas</h1>
segunda llamada: <h1>Mi lista de tareas</h1>
```

Dos llamadas, mismo resultado — nada cambia por sí solo, porque nada le dijo que tenía que cambiar.

Un campo de texto necesita algo distinto: recordar lo que el usuario va escribiendo, letra por letra, y mostrarlo actualizado. Es un requisito nuevo, no una falla de lo que ya se vio.

Una variable común de JavaScript — la forma habitual de guardar un dato en cualquier programa — no alcanza para este caso puntual: React vuelve a llamar a la función del componente en cada render (visto en la Clase 01, punto 5), y cualquier variable declarada adentro se reinicia con ese llamado:

```js
// demo2.mjs
function Campo() {
  let texto = '';
  console.log('texto al entrar a esta llamada:', JSON.stringify(texto));
  texto = 'Comprar leche'; // simula lo que el usuario escribió
  console.log('texto después de "escribir":   ', JSON.stringify(texto));
}
Campo(); // primer "render"
Campo(); // React vuelve a llamar a la función -- segundo "render"
```
```
$ node demo2.mjs
texto al entrar a esta llamada: ""
texto después de "escribir":    "Comprar leche"
texto al entrar a esta llamada: ""
texto después de "escribir":    "Comprar leche"
```

La segunda llamada vuelve a arrancar en `''`, sin memoria de que la primera había terminado en `'Comprar leche'` — que la variable se reinicie con cada llamado es el comportamiento esperado de una función normal de JavaScript, no un error suyo. Y aunque ese valor se guardara en otro lado (por ejemplo, afuera de la función), cambiar una variable común tampoco le avisa nada a React — nada dispararía un nuevo render, así que no habría motivo para que la pantalla se actualice.

## 2. Qué usa React para este caso: estado, con `useState`

Para esto existe el **estado**: una forma de que un componente recuerde un valor entre renders, y de que cambiar ese valor dispare automáticamente un nuevo render — el mismo mecanismo Trigger → Render → Commit de la Clase 01, ahora disparado por un cambio de datos en vez de por el arranque inicial ([react.dev — State: A Component's Memory](https://react.dev/learn/state-a-components-memory)).

```js
// demo3.mjs
import { useState } from 'react';

function CampoTitulo() {
  const resultado = useState('');
  console.log('useState devuelve:', resultado);
  console.log('¿es un array?', Array.isArray(resultado), '-- longitud:', resultado.length);
  const [titulo, setTitulo] = resultado;
  console.log('typeof del segundo elemento:', typeof setTitulo);
  return React.createElement('input', { type: 'text', value: titulo, onChange: () => {} });
}
renderToStaticMarkup(React.createElement(CampoTitulo));
```
```
$ node demo3.mjs
useState devuelve: [ '', [Function: bound dispatchAction] ]
¿es un array? true -- longitud: 2
typeof del segundo elemento: function
```

`useState('')` — el valor entre paréntesis es con el que arranca la primera vez — devolvió, en este render real, exactamente un array de dos posiciones: el valor actual (acá, `''`, el mismo que se le pasó) y una función interna de React (`dispatchAction`) que es la que hay que llamar para cambiarlo. Se desestructura como `const [titulo, setTitulo] = useState('')` porque eso es, literalmente, lo que devuelve.

Llamar a `setTitulo('algo nuevo')` hace dos cosas a la vez: guarda ese nuevo valor, y le avisa a React que tiene que volver a ejecutar el componente (Render) para reflejarlo (Commit) — a diferencia de la variable común del punto 1, que no avisaba nada:

```js
// ilustrativo -- necesita una instancia de React ya montada en un
// navegador para verse ejecutado de verdad (Clase 03); acá se muestra
// el patrón, no un resultado corrido.
function CampoTitulo() {
  const [titulo, setTitulo] = useState('');
  // ...
  setTitulo('Comprar leche');
  // ambas cosas pasan en esta misma llamada, no son dos pasos separados:
  // 1. guarda 'Comprar leche' como el nuevo valor de titulo
  // 2. le avisa a React "este componente necesita un nuevo Render"
}
```

Esto necesita una instancia de React montada de verdad (que actualice y vuelva a renderizar la misma llamada), algo que este entorno sin navegador no tiene — se verifica de forma real recién en la Clase 03.

**Regla que no se puede romper**: `useState` (y cualquier Hook de React) se llama siempre en el nivel superior del componente — nunca adentro de un `if`, un bucle o una función anidada. React identifica cada estado por el orden en que se llama, no por su nombre; si esa llamada apareciera solo a veces (por ejemplo, adentro de un `if`), React perdería la cuenta de cuál estado es cuál entre un render y el siguiente:

```js
// PATRÓN QUE ROMPE LA REGLA -- no se ejecuta, es solo para verlo:
function Campo({ mostrarDescripcion }) {
  const [titulo, setTitulo] = useState('');       // Hook #1, siempre
  if (mostrarDescripcion) {
    const [descripcion, setDescripcion] = useState(''); // Hook #2 -- A VECES
  }
  // en el render donde mostrarDescripcion es false, React solo ve 1 Hook;
  // en el render donde es true, ve 2 -- pierde la cuenta de cuál es cuál.
}
```

Comprobar el error real que esto produce necesita una instancia ya montada que se vuelva a renderizar con la condición cambiada — algo que este entorno sin navegador no tiene; se verifica de forma real recién en la Clase 03. El código de arriba no se corrió: es la representación del patrón prohibido, no una ejecución.

## 3. Cómo se conecta el estado con un input — formulario controlado, demostrado

Un `<input>` de HTML, por defecto, guarda lo que se escribe **por su cuenta**, en el propio DOM del navegador — React ni se entera. Un **input controlado** invierte eso: el valor que se muestra sale siempre del estado, nunca de lo que el navegador decida por su cuenta.

```js
// demo4.mjs
function CampoTitulo({ valorInicial }) {
  const [titulo] = useState(valorInicial); // el estado arranca con lo que llegó por prop
  return React.createElement('input', { type: 'text', value: titulo, onChange: () => {} }); // value sale siempre de titulo
}
console.log(renderToStaticMarkup(React.createElement(CampoTitulo, { valorInicial: 'Comprar leche' })));
console.log(renderToStaticMarkup(React.createElement(CampoTitulo, { valorInicial: 'Llamar al dentista' })));
```
```
$ node demo4.mjs
<input type="text" value="Comprar leche"/>
<input type="text" value="Llamar al dentista"/>
```

El mismo componente, con distinto estado inicial, produce un `value` distinto — el input nunca decide su propio valor, siempre refleja el estado. Cuando este formulario viva en el navegador real (Clase 03), `setTitulo` va a ser lo que actualice ese estado en cada tecla — el mecanismo es el mismo que acá, solo que disparado por un evento real en vez de por un valor inicial distinto.

Las dos piezas (`value` y `onChange`) son inseparables — y esto sí se puede comprobar ahora mismo, sin navegador, porque React valida esto al armar la descripción del elemento, no al interactuar con él:

```js
// demo5.mjs
console.log('--- caso 1: value sin onChange ---');
renderToStaticMarkup(React.createElement('input', { type: 'text', value: 'fijo' }));

console.log('--- caso 2: value con onChange, todo bien ---');
renderToStaticMarkup(React.createElement('input', { type: 'text', value: '', onChange: () => {} }));
console.log('(sin ningún warning arriba de este caso)');
```
```
$ node demo5.mjs
--- caso 1: value sin onChange ---
You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.
--- caso 2: value con onChange, todo bien ---
(sin ningún warning arriba de este caso)
```

Ese warning es real, generado por React mismo apenas arma el elemento — no hizo falta ningún navegador ni ninguna interacción del usuario para verlo. Confirma exactamente lo que dice: sin `onChange`, React trata el input como de solo lectura y avisa ([react.dev — `<input>`](https://react.dev/reference/react-dom/components/input)).

## 4. Buenas prácticas vigentes y errores comunes

- **Nunca pases `value` sin `onChange`** — el punto 3 lo acaba de mostrar ejecutado: React tira ese warning apenas arma el elemento. Si de verdad se quiere un valor fijo no editable, se usa `readOnly`, no se omite el `onChange`.
- **El estado inicial de un campo de texto nunca es `undefined` o `null`** — se usa `''` (string vacío):
  ```js
  const [titulo, setTitulo] = useState(undefined); // MAL -- arranca sin valor
  const [titulo, setTitulo] = useState('');         // BIEN -- arranca en string vacío
  ```
  El warning real que produce el primer caso ("a component is changing an uncontrolled input to be controlled") aparece recién cuando el **mismo** input pasa de `undefined` a un texto real *entre dos renders de una instancia ya montada* — algo que necesita una página real corriendo, no una llamada aislada de `renderToStaticMarkup`. Se verifica de verdad en la Clase 03.
- **Actualizar el estado siempre debe ser inmediato (síncrono) dentro del `onChange`**:
  ```js
  function alCambiar(evento) {
    const valor = evento.target.value;
    setTimeout(() => setTitulo(valor), 0); // MAL -- retrasa la actualización
    // setTitulo(valor);                   // BIEN -- inmediato, sin retraso
  }
  ```
  Si se retrasa (como en la línea marcada MAL), el cursor del input puede saltar de lugar mientras se escribe, porque el navegador ya movió el cursor pero React todavía no actualizó el valor. Por la misma razón que el punto anterior, esto solo se puede observar con una interacción de teclado real — se verifica en la Clase 03.

## 5. Lo que hay que poder responder sobre esto

- ¿Por qué una variable común no sirve como memoria de un componente? Porque se reinicia en cada render (punto 1, demo2.mjs) y cambiarla no dispara un nuevo render.
- ¿Qué devuelve `useState`? Un array de dos posiciones: el valor actual y la función para cambiarlo — visto de verdad en el punto 2 (demo3.mjs), no solo enunciado.
- ¿Qué hace un input controlado distinto de uno normal? Su valor sale siempre del estado (`value`), nunca de lo que el navegador decida — el punto 3 lo mostró con dos estados iniciales distintos, dos resultados distintos.
- ¿Qué pasa si falta el `onChange`? React lo marca como de solo lectura y avisa con un warning real — el mismo que se generó en el punto 3.

## Control de versiones de esta clase

1. Rama `clase-02-formulario-controlado`, creada desde `main`.
2. No modifica `curso/app/` — es una clase de conocimiento; los cinco fragmentos ejecutados (`demo1.mjs` a `demo5.mjs`) viven en el mismo entorno de prueba descartable de la Clase 01, fuera del repositorio del proyecto.
3. **Revisión**: contenido reescrito para aplicar la Regla 6 de `references/reglas-de-clase.md` (cada afirmación se demuestra en el momento en que se hace) — mismo concepto enseñado (K11), ahora con cinco demostraciones ejecutadas intercaladas, incluido un warning real de React capturado en el punto 3 que la versión anterior no mostraba ejecutado.
