import { useState } from 'react';

// Formulario de nueva tarea (T-03). Tres campos controlados: título
// (obligatorio), descripción y fecha (ambos opcionales) -- misma
// forma que el Modelo de datos de curso/tareas.md.
// Entra: nada (formulario propio, sin props todavía).
// Sale: por ahora, solo imprime los datos en la consola al enviar --
// conectar esto con el backend real es T-04 (clase aparte), que
// todavía no se construyó.
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
