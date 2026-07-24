# RF — Requisitos funcionales

Extraídos de `funcionalidades.md`. Numeración correlativa a lo largo de todo el documento (identifica cada RF, no indica importancia — el orden de construcción se decide en la Fase 1.5). Los encabezados de sección se conservan como agrupación visual del documento original.

Los bullets de la sección "Interfaz de usuario" del documento original no se convirtieron en RF aparte: cada uno es la interfaz de un RF ya listado en otra sección (login, crear tarea, listar tareas, etc.), y el motor construye cada RF con sus propias capas (interfaz, backend, persistencia) de punta a punta — separarlos habría creado un RF de interfaz que depende de varios RF de backend a la vez, rompiendo esa unidad de construcción. La única excepción es "Feedback visual de carga y errores", que no pertenece a un RF puntual sino a todos por igual — ese sí queda como RF transversal propio (RF-12).

## Autenticación de usuarios

- **RF-01** — Registro de usuario con email y contraseña, incluida su pantalla de registro en la interfaz.
- **RF-02** — Inicio de sesión que devuelve un token de acceso, incluida su pantalla de inicio de sesión y el indicador de sesión activa en la interfaz.
- **RF-03** — Cierre de sesión (elimina el token del lado del cliente), incluido el botón de cerrar sesión en la interfaz.
- **RF-04** — Aislamiento por usuario: cada usuario solo puede ver y gestionar sus propias tareas (restricción transversal a RF-05–RF-10, no tiene interfaz propia).

## Gestión de tareas

- **RF-05** — Ver una lista de todas las tareas del usuario, incluida esa lista en la interfaz.
- **RF-06** — Añadir una nueva tarea (título obligatorio; descripción y fecha de vencimiento opcionales), incluido el formulario correspondiente en la interfaz.
- **RF-07** — Marcar una tarea como completada / pendiente, incluida la acción correspondiente en la lista de la interfaz.
- **RF-08** — Editar el texto de una tarea existente, incluida la acción correspondiente en la lista de la interfaz.
- **RF-09** — Eliminar una tarea, incluida la acción correspondiente en la lista de la interfaz.

## Recordatorios por SMS

- **RF-10** — Añadir, opcionalmente, un número de teléfono y una fecha/hora de recordatorio a una tarea, al crearla o editarla — incluidos esos campos en el formulario y la acción de añadir/quitar recordatorio en la lista de la interfaz.
- **RF-11** — Envío automático de SMS de recordatorio en la fecha programada, mediante una tarea en segundo plano que revisa los recordatorios pendientes cada minuto. Sin interfaz propia (proceso de servidor). El documento original ya fija Twilio para el envío — se traslada como decisión tomada a `curso/stack.md` en la Fase 2, sujeta solo a confirmación de una línea.

## Interfaz de usuario (transversal)

- **RF-12** — Feedback visual de carga y errores, aplicable a toda acción de la interfaz (no a un RF puntual).

El documento original ya fija React + Vite para el frontend — se traslada como decisión tomada a `curso/stack.md` en la Fase 2, sujeta solo a confirmación de una línea.

## Notas de extracción

- **RF-04** se mantiene como RF propio (no fusionado con RF-05) porque es una restricción transversal que una auditoría de cobertura necesita poder verificar por separado contra cada operación de tareas.
- Los bullets de interfaz del documento original ("Pantalla de registro/login", "Formulario de nueva tarea", "Lista de tareas con acciones", "Indicador de sesión") se incorporaron como parte del alcance de RF-01, RF-02, RF-03, RF-05, RF-06, RF-07, RF-08, RF-09 y RF-10 respectivamente, no como RF aparte — ver nota al principio de este documento.
- Ningún bullet del documento original quedó fuera de un RF — no hubo contenido puramente decorativo que descartar.
