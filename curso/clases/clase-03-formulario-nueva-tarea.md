# Clase 03 — Construcción: el formulario para agregar una tarea

Esta clase usa lo que ya se enseñó sobre componentes, JSX, props y formularios controlados para construir la primera pieza real del proyecto: la pantalla donde se escribe una tarea nueva. Todavía no habla con ningún servidor — eso es trabajo de una tarea posterior; acá el formulario existe, guarda lo que se escribe, y lo muestra al enviarlo.

## 1. Preparar el proyecto: scaffold de Vite

Hasta ahora no existía ningún código real del proyecto — todo lo enseñado se probó en un entorno de prueba aparte. El primer paso de esta clase es crear el proyecto de verdad, con la herramienta que ya arma toda la configuración necesaria (Vite):

```
$ npm create vite@latest frontend -- --template react
Scaffolding project in .../curso/app/frontend...
Done.
```

Esto crea la carpeta `curso/app/frontend/` con la estructura mínima de un proyecto React: `src/App.jsx` (el componente raíz), `src/main.jsx` (lo que arranca la app en el navegador), configuración de Vite, y algunos archivos de ejemplo que se limpian en el paso 6.

## 2. Instalar las dependencias y confirmar versiones

```
$ cd curso/app/frontend
$ npm install
added 24 packages, and audited 25 packages in 12s
found 0 vulnerabilities
```

Antes de seguir, se confirma que lo instalado coincide con lo que `curso/auditoria-stack.md` ya verificó — nunca se asume:

```
$ npm ls react react-dom vite --depth=0
frontend@0.0.0
+-- react-dom@19.2.8
+-- react@19.2.8
`-- vite@8.1.5
```

Coincide exacto: `react@19.2.8`, `react-dom@19.2.8`, `vite@8.1.5`.

## 3. El campo de título, solo, verificado en un navegador real antes de seguir

Se arranca por el campo obligatorio, el título — un input controlado (Clase 02), campo `titulo` del Modelo de datos de `curso/tareas.md`:

```jsx
// curso/app/frontend/src/components/FormularioNuevaTarea.jsx (versión parcial, solo título)
import { useState } from 'react';

function FormularioNuevaTarea() {
  const [titulo, setTitulo] = useState('');

  return (
    <form>
      <div>
        <label htmlFor="titulo">Título</label>
        <input
          id="titulo"
          type="text"
          value={titulo}
          onChange={(evento) => setTitulo(evento.target.value)}
          required
        />
      </div>
    </form>
  );
}

export default FormularioNuevaTarea;
```

Con `npm run dev` corriendo de verdad y la página abierta en el navegador, se hizo clic en el campo y se tipeó "Comprar leche", y se leyó el valor real del input directamente del DOM:

```
> document.getElementById('titulo').value
"Comprar leche"
```

El input controlado funciona de punta a punta con datos reales, tal cual se enseñó en la Clase 02 — recién ahora se agregan los campos que faltan.

## 4. Se agregan descripción y fecha, verificados juntos

```jsx
// se agrega debajo del bloque de título, dentro del mismo <form>
const [descripcion, setDescripcion] = useState('');
const [fecha, setFecha] = useState('');
```
```jsx
<div>
  <label htmlFor="descripcion">Descripción</label>
  <input
    id="descripcion"
    type="text"
    value={descripcion}
    onChange={(evento) => setDescripcion(evento.target.value)}
  />
</div>

<div>
  <label htmlFor="fecha">Fecha de vencimiento</label>
  <input
    id="fecha"
    type="date"
    value={fecha}
    onChange={(evento) => setFecha(evento.target.value)}
  />
</div>
```

Descripción y fecha quedan **opcionales** (sin `required`) — a diferencia del título, ninguna validación los exige. Con los tres campos ya en la página, se repitió la interacción real: título "Comprar leche", descripción "2% para el desayuno", y la fecha fijada en `2026-07-30` a través de su propio input. Se leyeron los tres valores juntos desde el DOM real:

```
> JSON.stringify({titulo: ..., descripcion: ..., fecha: ...})
{"titulo":"Comprar leche","descripcion":"2% para el desayuno","fecha":"2026-07-30"}
```

Los tres campos, cada uno con su propio `useState`, se actualizan de forma independiente y en simultáneo — escribir en uno no afecta el valor de los otros.

## 5. Se agrega el envío, verificado con los tres campos juntos

```jsx
function alEnviar(evento) {
  evento.preventDefault(); // evita que el navegador recargue la página
  console.log({ titulo, descripcion, fecha });
}
```
```jsx
<form onSubmit={alEnviar}>
  {/* ...los tres campos de los pasos 3 y 4... */}
  <button type="submit">Añadir tarea</button>
</form>
```

`alEnviar` todavía no manda nada a ningún servidor — por ahora solo imprime los datos en la consola. Conectar este formulario con un backend real es una tarea aparte (T-04), y ese backend ni siquiera existe todavía en el proyecto — no tiene sentido llamarlo antes de que esté construido.

Se repitió la interacción una vez más, esta vez dejando la fecha vacía a propósito (es un campo opcional) y haciendo clic en "Añadir tarea". La consola real del navegador mostró el objeto que `alEnviar` construyó:

```
{ titulo: "Comprar leche", descripcion: "2% para el desayuno", fecha: "" }
```

Y la página **no se recargó** — se confirmó leyendo el campo título inmediatamente después del envío: seguía mostrando `"Comprar leche"` en vez de haberse vaciado por una recarga. Eso es lo que hace `evento.preventDefault()`: sin esa línea, el navegador recargaría la página al enviar el formulario (comportamiento por defecto de cualquier `<form>` HTML) y se perdería todo lo escrito.

## 6. Usar el componente en la app y limpiar el scaffold de ejemplo

`App.jsx` reemplaza el contenido de ejemplo que trae Vite por defecto (un contador, logos de React/Vite) y monta el formulario ya completo de los pasos 3 a 5:

```jsx
// curso/app/frontend/src/App.jsx
import FormularioNuevaTarea from './components/FormularioNuevaTarea';

function App() {
  return (
    <main>
      <h1>TodoList</h1>
      <FormularioNuevaTarea />
    </main>
  );
}

export default App;
```

Esto es, de hecho, lo que ya estaba montado durante todas las verificaciones de los pasos 3 a 5 — no hizo falta un paso aparte para comprobarlo, cada interacción anterior ya ocurrió dentro de esta misma página. Se eliminaron `src/App.css` y los archivos de `src/assets/` (logos, imagen de ejemplo) porque ya no los usa nada — dejarlos habría sido código muerto desde el primer commit del proyecto.

## 7. El proyecto compila para producción, verificado

```
$ npm run build
17 modules transformed.
dist/index.html                   0.47 kB
dist/assets/index-nqMpL4T3.css    1.78 kB
dist/assets/index-BSPbJ26-.js   191.34 kB
✓ built in 1.53s
```

Esto se corrió con el componente ya completo (los tres campos + el envío), no con las versiones parciales de los pasos 3 o 4 — confirma que la versión final, la que queda commiteada, compila sin errores.

## 8. Qué queda pendiente, a propósito

El botón "Añadir tarea" no guarda la tarea en ningún lado todavía — solo la imprime en la consola, como se vio en el paso 5. Eso es correcto en este punto: el backend que la recibiría (`POST /tasks`) todavía no se construyó, y conectar el formulario con él es una tarea aparte que le sigue a la construcción del propio backend. Forzar esa conexión ahora habría significado inventar un servidor que no existe.

## Control de versiones de esta clase

1. Rama `clase-03-formulario-nueva-tarea`, creada desde `main`.
2. Primer código real del proyecto: `curso/app/frontend/` completo (scaffold de Vite + `FormularioNuevaTarea.jsx` + `App.jsx` limpio), más `.claude/launch.json` para poder previsualizar el servidor de desarrollo.
3. Verificado con ejecución real, en tres etapas (pasos 3, 4 y 5), cada una con el servidor de desarrollo corriendo e interacción real en el navegador — no una única prueba consolidada al final — más `npm run build` sin errores sobre la versión final completa.
4. **Revisión**: contenido reescrito para aplicar la Regla 6 de `references/reglas-de-clase.md` (cada pieza de código nueva se demuestra apenas se agrega). El componente se reconstruyó de verdad en el entorno de desarrollo en tres etapas incrementales (solo título → los tres campos → con envío), cada una verificada en el navegador antes de agregar la siguiente, y se restauró a su versión final completa (idéntica a la que ya estaba commiteada) al terminar.
