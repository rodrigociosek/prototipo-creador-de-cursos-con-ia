# Tareas — Nivel 2 (el qué)

En el orden de `curso/prioridad-rf.md`. Cada tarea es una responsabilidad única (ver `references/formato-tareas.md` § Criterio de división).

## RF-06 — Añadir una nueva tarea

- **T-01** — Endpoint de backend para crear una tarea.
- **T-02** — Validar que el título sea obligatorio al crear una tarea.
- **T-03** — Formulario de nueva tarea en la interfaz (título, descripción, fecha).
- **T-04** — Conectar el formulario de nueva tarea con el backend.

## RF-05 — Ver la lista de tareas del usuario

- **T-05** — Endpoint de backend que devuelve la lista de tareas.
- **T-06** — Componente de lista de tareas en la interfaz.
- **T-07** — Conectar la lista de la interfaz con el backend.

## RF-07 — Marcar tarea como completada / pendiente

- **T-08** — Endpoint de backend para alternar el estado.
- **T-09** — Acción de marcar completada/pendiente en la interfaz.
- **T-10** — Conectar esa acción con el backend.

## RF-08 — Editar una tarea existente

- **T-11** — Endpoint de backend para editar una tarea.
- **T-12** — Acción/formulario de edición en la interfaz.
- **T-13** — Conectar la edición con el backend.

## RF-09 — Eliminar una tarea

- **T-14** — Endpoint de backend para eliminar.
- **T-15** — Acción de eliminar en la interfaz.
- **T-16** — Conectar la acción de eliminar con el backend.

## RF-01 — Registro de usuario

- **T-17** — Endpoint de backend de registro.
- **T-18** — Validar formato de email al registrar.
- **T-19** — Validar requisitos mínimos de la contraseña al registrar.
- **T-20** — Evitar registrar un email que ya existe.
- **T-21** — Guardar la contraseña de forma segura, no en texto plano.
- **T-22** — Pantalla de registro en la interfaz.
- **T-23** — Conectar la pantalla de registro con el backend.

## RF-02 — Inicio de sesión

- **T-24** — Endpoint de backend de login.
- **T-25** — Validar las credenciales contra las guardadas.
- **T-26** — Generar el token de acceso al loguearse correctamente.
- **T-27** — Pantalla de inicio de sesión en la interfaz.
- **T-28** — Conectar la pantalla de login con el backend.
- **T-29** — Guardar el token recibido en el cliente.
- **T-30** — Indicador de sesión activa en la interfaz.

## RF-04 — Aislamiento por usuario

- **T-31** — Middleware de backend que verifica el token en cada petición protegida.
- **T-32** — Asociar cada tarea guardada con el usuario que la creó.
- **T-33** — Filtrar el listado para mostrar solo las tareas del usuario autenticado.
- **T-34** — Validar dueño al editar una tarea.
- **T-35** — Validar dueño al marcar completada/pendiente.
- **T-36** — Validar dueño al eliminar.

## RF-03 — Cierre de sesión

- **T-37** — Botón de cerrar sesión en la interfaz.
- **T-38** — Eliminar el token guardado localmente al cerrar sesión.

## RF-10 — Teléfono y recordatorio en una tarea

- **T-39** — Extender crear tarea para aceptar teléfono opcional.
- **T-40** — Extender crear tarea para aceptar fecha/hora de recordatorio opcional.
- **T-41** — Extender editar tarea para aceptar/actualizar el teléfono.
- **T-42** — Extender editar tarea para aceptar/actualizar fecha/hora de recordatorio.
- **T-43** — Campo de teléfono en el formulario de la interfaz.
- **T-44** — Campo de fecha/hora de recordatorio en el formulario.
- **T-45** — Acción de añadir/quitar recordatorio en la lista.

## RF-11 — Envío automático de SMS de recordatorio

- **T-46** — Job en segundo plano que se ejecuta cada minuto.
- **T-47** — Consultar, en cada ejecución, las tareas cuyo recordatorio corresponde enviarse ahora.
- **T-48** — Enviar el SMS al número indicado.
- **T-49** — Marcar el recordatorio como enviado.

## RF-12 — Feedback visual de carga y errores

- **T-50** — Estado de carga en cada acción de la interfaz.
- **T-51** — Mensaje de error cuando una llamada al backend falla.
