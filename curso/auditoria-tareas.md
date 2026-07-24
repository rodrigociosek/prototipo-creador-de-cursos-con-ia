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
