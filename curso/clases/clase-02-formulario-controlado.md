# Clase 02 — Formulario controlado: cómo un componente recuerda lo que el usuario escribe

## 1. Qué necesita un campo de texto que un componente simple no ofrece

El componente de la clase anterior siempre mostraba lo mismo — recibía props y las mostraba, sin cambiar nunca por sí solo, y eso le alcanzaba para lo que hacía. Un campo de texto necesita algo distinto: recordar lo que el usuario va escribiendo, letra por letra, y mostrarlo actualizado. Es un requisito nuevo, no una falla de lo que ya se vio.

Una variable común de JavaScript — la forma habitual de guardar un dato en cualquier programa — no alcanza para este caso puntual: React vuelve a llamar a la función del componente en cada render (visto en la clase anterior, punto 5), y que cualquier variable declarada adentro **se reinicie** con ese llamado es el comportamiento esperado de una función normal, no un error suyo. Y aunque ese valor se guardara en otro lado, cambiar una variable común tampoco le avisa nada a React — nada dispararía un nuevo render, así que no habría motivo para que la pantalla se actualice.

```js
// Una variable común cumple su función en la mayoría de los casos --
// acá se usa solo para mostrar por qué no alcanza para ESTE
// propósito puntual: recordar algo entre un render y el siguiente.
function Campo() {
  let texto = ''; // se reinicia cada vez que la función se ejecuta de nuevo
  function alEscribir(valor) {
    texto = valor; // React no se entera de este cambio
  }
  // la pantalla no reflejaría lo que el usuario escribió, porque
  // nada le pidió a React que la actualizara
}
```

## 2. Qué usa React para este caso: estado, con `useState`

Para esto existe el **estado**: una forma de que un componente recuerde un valor entre renders, y de que cambiar ese valor dispare automáticamente un nuevo render — el mismo mecanismo Trigger → Render → Commit de la clase anterior, ahora disparado por un cambio de datos en vez de por el arranque inicial ([react.dev — State: A Component's Memory](https://react.dev/learn/state-a-components-memory)).

```js
import { useState } from 'react';

// useState(valorInicial) devuelve siempre un array de 2 posiciones:
// - la primera es el valor actual del estado.
// - la segunda es la función para cambiarlo.
// Entra: el valor con el que arranca la primera vez (acá, '').
// Sale: [valor actual, función para actualizarlo].
const [titulo, setTitulo] = useState('');
```

Llamar a `setTitulo('algo nuevo')` hace dos cosas a la vez: guarda ese nuevo valor, y le avisa a React que tiene que volver a ejecutar el componente (Render) para reflejarlo (Commit) — a diferencia de la variable común del punto 1, que no avisaba nada.

**Regla que no se puede romper**: `useState` (y cualquier Hook de React) se llama siempre en el nivel superior del componente — nunca adentro de un `if`, un bucle o una función anidada. React identifica cada estado por el orden en que se llama, no por su nombre; si esa llamada apareciera solo a veces (por ejemplo, adentro de un `if`), React perdería la cuenta de cuál estado es cuál.

## 3. Cómo se conecta el estado con un input — formulario controlado

Un `<input>` de HTML, por defecto, guarda lo que se escribe **por su cuenta**, en el propio DOM del navegador — React ni se entera. Un **input controlado** invierte eso: el valor que se muestra sale siempre del estado, nunca de lo que el navegador decida por su cuenta.

```js
function FormularioTitulo() {
  const [titulo, setTitulo] = useState('');

  // Entra: el evento del navegador cuando el usuario escribe.
  // Sale: nada — su efecto es actualizar el estado, lo cual dispara
  // un nuevo render que va a mostrar el valor ya actualizado.
  function alCambiar(evento) {
    setTitulo(evento.target.value);
  }

  return (
    <input
      type="text"
      value={titulo}
      onChange={alCambiar}
    />
  );
}
```

Las dos piezas son inseparables: `value={titulo}` le dice al input qué mostrar (siempre lo que diga el estado), y `onChange={alCambiar}` es lo único que puede cambiar ese estado. Sin el `onChange`, el input mostraría siempre `titulo` sin que el usuario pudiera escribir nada — React lo trataría como de solo lectura y avisaría con una advertencia en la consola ([react.dev — `<input>`](https://react.dev/reference/react-dom/components/input)).

## 4. Vamos a comprobar que el valor sale siempre del estado

En este entorno no hay navegador, así que no se puede disparar un evento de teclado real — eso se verifica de verdad recién en la Clase 3, cuando el formulario viva en una página real. Lo que sí se puede comprobar acá, ejecutando código real, es la otra mitad de la regla: que el input **muestra exactamente lo que diga el estado**, sin importar qué sea.

```js
// demo-estado.mjs
import React, { useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

function CampoTitulo({ valorInicial }) {
  const [titulo] = useState(valorInicial);
  return React.createElement('input', {
    type: 'text',
    value: titulo,
    onChange: () => {},
  });
}

console.log(renderToStaticMarkup(React.createElement(CampoTitulo, { valorInicial: 'Comprar leche' })));
console.log(renderToStaticMarkup(React.createElement(CampoTitulo, { valorInicial: 'Llamar al dentista' })));
```

Resultado real de ejecutarlo (Node.js v22.14.0, React 19.2.8 — mismas versiones que la Clase 01):

```
$ node demo-estado.mjs
<input type="text" value="Comprar leche"/>
<input type="text" value="Llamar al dentista"/>
```

El mismo componente, con distinto estado inicial, produce un `value` distinto — exactamente lo que el punto 3 explicó: el input nunca decide su propio valor, siempre refleja el estado. Cuando este formulario viva en el navegador real (Clase 3), `setTitulo` va a ser lo que actualice ese estado en cada tecla — el mecanismo es el mismo que acá, solo que disparado por un evento real en vez de por un valor inicial distinto.

## 5. Buenas prácticas vigentes y errores comunes

- **Nunca pases `value` sin `onChange`.** Un input así queda de solo lectura y React lo marca como probable error — si de verdad se quiere un valor fijo no editable, se usa `readOnly`, no se omite el `onChange`.
- **El estado inicial de un campo de texto nunca es `undefined` o `null`** — se usa `''` (string vacío). Pasar `undefined` al principio y después un texto real hace que React trate el input como si hubiera cambiado de "no controlado" a "controlado" a mitad de camino, lo cual genera una advertencia y comportamiento inconsistente.
- **Actualizar el estado siempre debe ser inmediato (síncrono) dentro del `onChange`** — si se retrasa (por ejemplo con un `setTimeout`), el cursor del input puede saltar de lugar mientras se escribe, porque el navegador ya movió el cursor pero React todavía no actualizó el valor.

## 6. Lo que hay que poder responder sobre esto

- ¿Por qué una variable común no sirve como memoria de un componente? Porque se reinicia en cada render y cambiarla no dispara un nuevo render.
- ¿Qué devuelve `useState`? Un array de dos posiciones: el valor actual y la función para cambiarlo.
- ¿Qué hace un input controlado distinto de uno normal? Su valor sale siempre del estado (`value`), y solo cambia a través de una función explícita (`onChange`) — nunca por su cuenta.
- ¿Qué pasa si falta el `onChange`? El input queda de solo lectura.

## Control de versiones de esta clase

1. Rama `clase-02-formulario-controlado`, creada desde `main`.
2. No modifica `curso/app/` — es una clase de conocimiento; el ejemplo ejecutado vive en el mismo entorno de prueba descartable de la Clase 01, fuera del repositorio del proyecto.
