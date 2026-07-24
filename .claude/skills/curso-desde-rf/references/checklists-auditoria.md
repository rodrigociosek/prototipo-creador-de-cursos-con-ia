# Checklists de auditoría

Usa estas listas literalmente al escribir cada archivo de auditoría — no las resumas de memoria, complétalas punto por punto contra el contenido real generado.

**Qué hacer en cada ítem**: marca `[x]` solo después de haber comparado el ítem contra el archivo real, y añade la evidencia concreta — qué archivo, qué sección o fila demuestra que se cumple. **Qué NO hacer**: no marques un ítem como cumplido sin esa evidencia. Si un ítem no se cumple, repórtalo tal cual, con qué falta exactamente y en qué archivo/fila.

## § Checkpoint de prioridad de RF (Fase 1.5 → `curso/prioridad-rf.md`)

- [ ] Todo RF de `curso/rf.md` aparece en la tabla, sin huecos ni duplicados.
- [ ] El orden se justifica por valor real para el software (funcionalidad núcleo, visibilidad para el usuario final, qué tanto habilita otras funcionalidades) — ninguna fila justifica su posición por facilidad técnica de enseñanza.
- [ ] Si el propio `funcionalidades.md` ya sugería una prioridad, el orden la respeta o explica por qué se desvía.
- [ ] El usuario confirmó la tabla completa (o su propio reordenamiento) explícitamente, no por silencio.

## § Auditoría de viabilidad y versiones (Fase 3 → `curso/auditoria-stack.md`)

Por cada RF:
- [ ] ¿El stack elegido cubre este RF sin rodeos artificiales?
- [ ] Si no lo cubre: ¿se investigó una alternativa gratuita real (no solo se asumió)?
- [ ] ¿La alternativa se presentó al usuario como recomendación, no como decisión ya tomada?
- [ ] ¿Se distinguió "viable con matiz" de un simple "sí", cuando existía una limitación real que el usuario debería conocer para decidir?
- [ ] Si dos fuentes se contradecían entre sí sobre algo relevante, ¿quedó la contradicción documentada en vez de resuelta en silencio?

Por cada tecnología del stack final:
- [ ] ¿Se verificó la versión estable actual con una búsqueda real (no memoria del modelo)?
- [ ] ¿Se registró la fuente y la fecha de verificación?
- [ ] ¿Es una versión estable (no beta/RC) salvo que el usuario haya pedido explícitamente lo contrario?

## § Auditoría de huecos de tareas — Nivel 2 (Fase 4.1 → `curso/auditoria-tareas.md`)

- [ ] Todo `RF-XX` tiene al menos una tarea `T-XX` asociada.
- [ ] Ninguna tarea es tan grande que en realidad esconde varios RF distintos sin desglosar.
- [ ] Ninguna tarea depende de una tecnología que no aparece en `curso/stack.md`.
- [ ] El orden de `curso/tareas.md` respeta el orden de `curso/prioridad-rf.md` (las tareas del RF de mayor prioridad aparecen primero en el archivo).
- [ ] **Ninguna tarea contiene una conjunción ("y", "/", una coma) que una dos reglas o comportamientos distintos** — revisar el texto de cada `T-XX` una por una, no solo a simple vista; ver `references/formato-tareas.md` § Criterio de división. Si aparece una, es un hallazgo: hay que separarla antes de este checkpoint, no dejarla para que el usuario la pida de nuevo.
- [ ] Ninguna tarea nombra una técnica, librería o estructura de código concreta (eso es Nivel 3, Fase 5) — si aparece, es señal de que se saltó de nivel.
- [ ] Ninguna tarea fragmenta un mismo campo/acción en partes sin ninguna regla de validación o comportamiento distinto entre ellas (sobre-fragmentación).

## § Auditoría de especificación completa — Nivel 3 (Fase 5.1 → `curso/auditoria-tareas.md`, sección aparte)

- [ ] Toda tarea tiene su especificación hasta el cómo: archivos/piezas que toca, decisiones técnicas, y qué necesita para poder hacerse.
- [ ] El campo "qué necesita" de cada tarea está en un formato consistente, listo para alimentar el listado global de conocimientos (Fase 6).
- [ ] Ninguna tarea quedó a medio especificar (con el qué pero sin el cómo).
- [ ] **Ninguna tarea de backend deja sin decir su código de estado HTTP de éxito y de error** — ver `references/formato-tareas.md` § Criterio de completitud.
- [ ] **Ninguna tarea deja implícita la forma de un dato que lee o escribe** — si el proyecto tiene un modelo de datos, cada tarea que toca una entidad referencia su forma definida una sola vez, no la reinventa.
- [ ] Las decisiones que se repiten entre tareas (formato de error, criterio de generación de ids, formato de éxito) están definidas una sola vez en una sección transversal y referenciadas, no repetidas con palabras distintas tarea por tarea.
- [ ] Ninguna especificación escribe sintaxis de código real (eso ya sería Fase 8).

## § Auditoría del listado de conocimientos (Fase 6.2 → `curso/auditoria-dependencias.md`)

- [ ] Todo conocimiento usado por alguna tarea de `curso/tareas.md` aparece en el listado (Fase 6), con sus tareas asociadas.
- [ ] Toda cadena (Fase 6.1) llega hasta un punto de corte válido (noción básica de programación, o "sin más prerrequisitos") — ninguna se corta a medio camino.
- [ ] Ningún conocimiento mezcla varios conceptos distintos en una sola entrada — cada uno está descrito de forma singular.
- [ ] Todo conocimiento investigado con fuente real cuando hacía falta precisión sobre su funcionamiento.
- [ ] Todo eslabón no cubierto en ese punto del curso tiene una respuesta explícita de simulación (sí + cómo, o no + reportado como hallazgo).
- [ ] La persistencia real está marcada como no disponible hasta el bloque de integración de BD, con su simulación (memoria) ya definida.

## § Auditoría del índice (Fase 7 y Fase 7.1 → `curso/auditoria-indice.md`)

Ver `references/formato-indice.md` § Fase 7.1 para el checklist completo de cobertura de punta a punta. Además:
- [ ] El índice es una **única secuencia numerada de clases** — no dos secciones separadas ("RF+tareas" por un lado, "conocimientos" por otro), y no un diálogo de preguntas y respuestas.
- [ ] Ningún bloque de RF contiene teoría, código o explicación — solo qué clase enseña qué y qué clase construye qué.
- [ ] Cada "conocimiento nuevo" es realmente nuevo en el punto del curso donde aparece — ninguno ya enseñado antes se repite sin decir "reutiliza Clase N".
- [ ] Ninguna clase de conocimiento agrupada mezcla dos conocimientos que hacen falta para construcciones distintas y no consecutivas (el error más común de esta fase — ver `references/formato-indice.md` § Regla de agrupación de conocimientos).
- [ ] Toda tarea de construcción respeta, dentro de su RF, el orden interfaz → backend → conexión.

## § Auditoría final del procedimiento (→ `curso/auditoria-final.md`)

- [ ] Todo RF de `curso/rf.md` tiene tarea(s) asociada(s), y toda tarea quedó reflejada en el índice con su clase (o clases) correspondiente.
- [ ] El orden real de las clases generadas respeta `curso/prioridad-rf.md` e `curso/indice.md` de punta a punta; cualquier desviación quedó justificada y confirmada por el usuario.
- [ ] Toda clase generada en `curso/clases/` cumple las reglas de `references/reglas-de-clase.md`: arranca directo en el tema (sin bloque de metadatos, sin justificar su lugar en el curso citando RF-XX/T-XX/número de Clase), git antes y después del código, pasos conectados con qué/cómo/dónde explícitos, ningún patrón de diseño forzado sin resolver algo real.
- [ ] **Toda clase pasa la auditoría de Regla 6** (mismo estatus que la Regla fundamental — ver `references/reglas-de-clase.md` § Regla 6): cada párrafo que explica una funcionalidad tiene su representación pegada, verificado aislado de sus vecinos (no alcanza con que la sección "se vea" demostrada); los casos de buena práctica, mala práctica y error están representados cuando existen para ese concepto; los comentarios del código siguen la secuencia de la explicación, línea por línea, nunca en un bloque único al principio. Si una clase ya generada tiene un hueco, es un hallazgo a corregir ahí mismo, no una nota para más adelante.
- [ ] **Toda clase de construcción coincide con la especificación Nivel 3 de `curso/tareas.md`** — mismo código de estado HTTP, mismos nombres de campo del Modelo de datos, mismo criterio de generación de ids que el definido ahí. Si una clase ya generada se desvía (inventó un código de estado o una forma de dato distinta a la especificada), es un hallazgo a corregir, no una variación aceptable.
- [ ] Toda clase que usa una tecnología del stack usa la versión confirmada en `curso/auditoria-stack.md`, no una distinta asumida de memoria.
- [ ] `curso/conceptos-enseñados.md` tiene una fila por cada concepto/herramienta realmente enseñado a lo largo de las clases generadas — ningún concepto enseñado en una clase quedó sin su fila.
- [ ] Ninguna clase repitió el ciclo completo de un concepto que ya tenía fila en `curso/conceptos-enseñados.md` con suficiente profundidad, sin justificar por qué hacía falta repetirlo.
- [ ] Ninguna clase reutilizó un concepto ya enseñado sin al menos una mención corta de qué es / para qué se usa aquí / por qué toca ahora.
- [ ] Toda fila de `curso/simulaciones.md` terminó en "Resuelta en clase NN" (durante el bloque de integración de BD real, si el proyecto la incluye), o quedó explícitamente justificado por qué sigue pendiente.
- [ ] Si el proyecto incluye persistencia real, el bloque de integración de BD cubrió, RF por RF, el reemplazo completo de la persistencia simulada — ningún RF quedó con datos en memoria sin refactorizar.
- [ ] `curso/app/` refleja el estado acumulado de todas las tareas integradas hasta la última clase generada.
- [ ] Las versiones en `curso/auditoria-stack.md` tienen fuente y fecha, ninguna quedó sin verificar.
- [ ] `curso/PROGRESS.md` refleja exactamente lo que existe en disco.
- [ ] `curso/00-orquestador.md` existe y su tabla de fases coincide con lo que realmente hay en disco.
- [ ] Todo el flujo quedó registrado en documentos dentro de `curso/` — ninguna decisión de fondo vive solo en la conversación.
- [ ] Cualquier punto de esta lista que no se cumpla queda listado como acción pendiente explícita, no se omite en silencio.
