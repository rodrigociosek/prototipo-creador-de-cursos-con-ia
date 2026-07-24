# Clase 03 — Construcción: el formulario para agregar una tarea

Esta clase usa lo que ya se enseñó sobre componentes, JSX, props y formularios controlados para construir la primera pieza real del proyecto: la pantalla donde se escribe una tarea nueva. Todavía no habla con ningún servidor — eso es trabajo de una clase posterior; acá el formulario existe, guarda lo que se escribe, y lo muestra al enviarlo.

## 1. Preparar el proyecto: scaffold de Vite

Hasta ahora no existía ningún código real del proyecto — todo lo enseñado se probó en un entorno de prueba aparte. El primer paso de esta clase es crear el proyecto de verdad, con la herramienta que ya arma toda la configuración necesaria (Vite):

```
$ npm create vite@latest frontend -- --template react
Scaffolding project in .../curso/app/frontend...
Done.
```

Esto crea la carpeta `curso/app/frontend/` con la estructura mínima de un proyecto React: `src/App.jsx` (el componente raíz), `src/main.jsx` (lo que arranca la app en el navegador), configuración de Vite, y algunos archivos de ejemplo que se limpian en el paso 4.

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

## 3. El componente del formulario

Tres campos controlados — título, descripción y fecha, la misma forma que define el Modelo de datos de `curso/tareas.md` para una tarea. El título es obligatorio (atributo `required`, validación nativa del navegador); descripción y fecha quedan opcionales, sin restricción.

```jsx
// curso/app/frontend/src/components/FormularioNuevaTarea.jsx
import { useState } from 'react';

function FormularioNuevaTarea() {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');

  function alEnviar(evento) {
    evento.preventDefault(); // evita que el navegador recargue la página
    console.log({ titulo, descripcion, fecha });
  }

  return (
    <form onSubmit={alEnviar}>
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

      <button type="submit">Añadir tarea</button>
    </form>
  );
}

export default FormularioNuevaTarea;
```

`alEnviar` todavía no manda nada a ningún servidor — por ahora solo imprime los datos en la consola. Conectar este formulario con un backend real es una pieza aparte (una clase futura), y ese backend ni siquiera existe todavía en el proyecto — no tiene sentido llamarlo antes de que esté construido.

## 4. Usar el componente y limpiar el scaffold de ejemplo

`App.jsx` reemplaza el contenido de ejemplo que trae Vite por defecto (un contador, logos de React/Vite) y monta el formulario:

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

Se eliminaron `src/App.css` y los archivos de `src/assets/` (logos, imagen de ejemplo) porque ya no los usa nada — dejarlos habría sido código muerto desde el primer commit del proyecto.

## 5. Levantar el servidor y probar de verdad, en un navegador real

```
$ npm run dev
VITE v8.1.5  ready in 359 ms
➜  Local: http://localhost:5180/
```

Con la página abierta, se interactuó de verdad — esto es lo que en las Clases 01 y 02 había quedado pendiente por no tener navegador disponible:

1. Clic en el campo Título, se escribió "Comprar leche". Verificado en el DOM real: `document.getElementById('titulo').value` → `"Comprar leche"` — el input controlado refleja lo que se tipeó, confirmando en un navegador real lo que la Clase 02 solo pudo probar a medias.
2. Clic en Descripción, se escribió "2% para el desayuno".
3. Clic en "Añadir tarea". La consola del navegador mostró el objeto enviado por `alEnviar`:
   ```
   { titulo: "Comprar leche", descripcion: "2% para el desayuno", fecha: "" }
   ```
   (la fecha quedó vacía porque no se completó ese campo en esta prueba — es válido, es un campo opcional).

Esto confirma que las tres piezas funcionan juntas: cada tecla actualiza el estado (Clase 02), el estado se refleja en el input (mismo mecanismo), y al enviar el formulario se junta todo en un solo objeto con la forma esperada.

También se verificó que el proyecto compila para producción sin errores:

```
$ npm run build
17 modules transformed.
dist/index.html                   0.45 kB
dist/assets/index-nqMpL4T3.css    1.78 kB
dist/assets/index-BSPbJ26-.js   191.34 kB
✓ built in 359ms
```

## 6. Qué queda pendiente, a propósito

El botón "Añadir tarea" no guarda la tarea en ningún lado todavía — solo la imprime en la consola. Eso es correcto en este punto: el backend que la recibiría (`POST /tasks`) todavía no se construyó, y conectar el formulario con él es una tarea aparte que le sigue a la construcción del propio backend. Forzar esa conexión ahora habría significado inventar un servidor que no existe.

## Control de versiones de esta clase

1. Rama `clase-03-formulario-nueva-tarea`, creada desde `main`.
2. Primer código real del proyecto: `curso/app/frontend/` completo (scaffold de Vite + `FormularioNuevaTarea.jsx` + `App.jsx` limpio), más `.claude/launch.json` para poder previsualizar el servidor de desarrollo.
3. Verificado con ejecución real: `npm run dev` + interacción real en el navegador (tipeo, envío, lectura del objeto resultante) + `npm run build` sin errores.
