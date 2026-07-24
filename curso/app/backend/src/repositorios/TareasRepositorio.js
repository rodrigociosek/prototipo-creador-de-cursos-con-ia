// Persistencia simulada de tareas (Clase 05), organizada como clase
// de programación: agrupa el array, el contador de ids, y las
// operaciones que los usan, en un solo lugar -- nadie fuera de esta
// clase toca el array directamente.
class TareasRepositorio {
  #tareas = [];
  #siguienteId = 1;

  // Entra: los campos de una tarea nueva (sin id).
  // Sale: el registro creado, con su id ya asignado.
  crear(datos) {
    const tarea = { id: this.#siguienteId++, ...datos };
    this.#tareas.push(tarea);
    return tarea;
  }

  // Entra: nada.
  // Sale: el array completo de tareas guardadas hasta ahora.
  listar() {
    return this.#tareas;
  }
}

export default TareasRepositorio;
