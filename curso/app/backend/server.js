import express from 'express';
import TareasRepositorio from './src/repositorios/TareasRepositorio.js';

const app = express();
app.use(express.json());

const tareasRepositorio = new TareasRepositorio();

// POST /tasks (T-01 + T-02): crea una tarea nueva.
// Por ahora la tarea solo tiene titulo/descripcion/fecha/completada
// -- usuarioId (RF-04), telefono y recordatorio (RF-10) se agregan
// en clases futuras, cuando esos RF les toque construirse.
app.post('/tasks', (req, res) => {
  const { titulo, descripcion, fecha } = req.body;

  // T-02: el título es obligatorio -- sin él, no se crea nada.
  if (!titulo) {
    res.status(400).json({ error: 'titulo es obligatorio' });
    return;
  }

  const tarea = tareasRepositorio.crear({
    titulo,
    descripcion,
    fecha,
    completada: false,
  });

  res.status(201).json(tarea);
});

app.listen(3000, () => {
  console.log('backend escuchando en http://localhost:3000');
});
