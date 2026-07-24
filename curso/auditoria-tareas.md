# Auditoría de tareas — Nivel 2 (Fase 4.1)

## Cobertura de RF

| RF | Tareas asociadas |
|----|-------------------|
| RF-01 | T-17 a T-23 |
| RF-02 | T-24 a T-30 |
| RF-03 | T-37, T-38 |
| RF-04 | T-31 a T-36 |
| RF-05 | T-05, T-06, T-07 |
| RF-06 | T-01 a T-04 |
| RF-07 | T-08, T-09, T-10 |
| RF-08 | T-11, T-12, T-13 |
| RF-09 | T-14, T-15, T-16 |
| RF-10 | T-39 a T-45 |
| RF-11 | T-46 a T-49 |
| RF-12 | T-50, T-51 |

Los 12 RF tienen tarea(s) asociada(s). Sin hallazgos.

## Otros chequeos

- [x] Ninguna tarea esconde varios RF sin desglosar.
- [x] Ninguna tarea depende de una tecnología fuera de `curso/stack.md`.
- [x] El orden de `curso/tareas.md` respeta `curso/prioridad-rf.md`.
- [x] Ninguna tarea mezcla dos reglas/comportamientos distintos con "y" — se revisó texto por texto y se separaron las que quedaban: validación de registro (email/contraseña), conexión+guardado de token en login, validación de dueño por operación (editar/completar/eliminar), y aceptación de teléfono/fecha de recordatorio (por campo, en crear y en editar).
- [x] Ninguna tarea describe el cómo (una librería concreta, una estructura de código).

**Resultado: sin hallazgos. Desglose final: 51 tareas (T-01 a T-51).**

## Auditoría de especificación — Nivel 3 (Fase 5.1)

**Primera pasada** — encontró un hallazgo: varias tareas dejaban decisiones técnicas sin resolver (códigos de estado HTTP, forma exacta del dato guardado, criterio de generación de ids) que dos implementaciones distintas podrían resolver de forma distinta. Se corrigió agregando una sección de Modelo de datos y Decisiones técnicas transversales al principio de `curso/tareas.md`, y referenciándolas desde cada tarea afectada (T-01, T-02, T-05, T-08, T-11, T-14, T-17 a T-21, T-24 a T-33, T-39 a T-42, T-46 a T-49).

**Segunda pasada, sobre la versión corregida:**

- [x] Las 51 tareas tienen su especificación completa: Dónde, Implica, Necesita.
- [x] Ninguna tarea de backend deja sin resolver el código de estado HTTP de sus respuestas (éxito y error).
- [x] Toda tarea que crea, lee, actualiza o borra un dato referencia el Modelo de datos o las Decisiones técnicas transversales en vez de dejarlo implícito.
- [x] El campo "Necesita" está en formato consistente — nombra el conocimiento concreto y dice si ya se vio en una tarea anterior o si es concepto nuevo (marcado explícitamente: hashing de contraseñas, JWT, almacenamiento del cliente, middleware, cron, Twilio).
- [x] Ninguna especificación quedó a medio camino.
- [x] Las especificaciones siguen sin nombrar sintaxis de código real — nombran decisiones (códigos de estado, forma del dato, nombre de campos), no implementación.
- [x] Los conceptos nuevos identificados son consistentes entre sí y quedan disponibles para que la Fase 6 arme el listado global sin ambigüedad.

**Resultado: sin hallazgos tras la corrección.**
