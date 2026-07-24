# Tareas — Nivel 2 (el qué) y Nivel 3 (el cómo)

En el orden de `curso/prioridad-rf.md`. Cada tarea es una responsabilidad única (ver `references/formato-tareas.md` § Criterio de división). Nivel 3 (Fase 5) amplía cada una con: **Dónde** (archivos/piezas que toca), **Implica** (decisión técnica completa, sin código), **Necesita** (qué hay que saber antes — alimenta el listado global de conocimientos de la Fase 6).

**Criterio de completitud del Nivel 3**: una tarea está completa cuando nadie tendría que inventar una decisión técnica al construirla (qué código de estado devuelve, qué forma tiene el dato, cómo se genera un id). Se detiene cuando seguir detallando ya exigiría escribir sintaxis de código real — eso es la clase (Fase 8). Las decisiones que se repiten en varias tareas se definen **una sola vez** abajo y se referencian, no se repiten.

## Modelo de datos (persistencia simulada, vigente hasta la Fase 9)

- **Tarea**: `{ id, usuarioId, titulo, descripcion (opcional), fecha (opcional), completada (booleano, default false), telefono (opcional), recordatorioFechaHora (opcional), recordatorioEnviado (booleano, default false) }`
- **Usuario**: `{ id, email, contrasenaHash }`

## Decisiones técnicas transversales

- **Generación de IDs**: contador incremental en memoria (empieza en 1, se incrementa por cada registro nuevo), uno para tareas y otro para usuarios. Es la forma más simple compatible con persistencia simulada; se reemplaza por el id autogenerado de la base de datos real en la Fase 9.
- **Formato de error**: toda respuesta de error del backend devuelve `{ error: "mensaje descriptivo" }`, con el código de estado HTTP que corresponda: `400` validación de entrada, `401` no autenticado, `403` autenticado pero no autorizado (no es el dueño), `404` recurso no encontrado.
- **Formato de éxito**: creación devuelve el recurso creado con `201`; lectura y actualización devuelven el recurso con `200`; eliminación devuelve `204` sin cuerpo.
- **Envío del token**: el cliente manda el token en la cabecera `Authorization` de cada petición protegida; el middleware de T-31 es el único lugar que lo lee.

## RF-06 — Añadir una nueva tarea

- **T-01** — Endpoint de backend para crear una tarea.
  - *Dónde:* backend — ruta `POST /tasks` y su controlador.
  - *Implica:* recibe título, descripción y fecha (estos dos últimos opcionales) en el cuerpo; crea el registro con id autogenerado (ver Decisiones transversales); responde `201` con la tarea creada, en la forma definida en Modelo de datos.
  - *Necesita:* Express y rutas HTTP; persistencia simulada (guardar en una estructura en memoria); qué es una petición/respuesta HTTP en formato JSON; qué son los códigos de estado HTTP de éxito.
- **T-02** — Validar que el título sea obligatorio al crear una tarea.
  - *Dónde:* mismo controlador que T-01.
  - *Implica:* si el título falta o está vacío, responde `400` con el formato de error transversal, sin crear la tarea.
  - *Necesita:* qué son los códigos de estado HTTP de error.
- **T-03** — Formulario de nueva tarea en la interfaz (título, descripción, fecha).
  - *Dónde:* frontend — componente de formulario.
  - *Implica:* campos controlados para título, descripción y fecha.
  - *Necesita:* React y componentes; qué es un formulario controlado en React.
- **T-04** — Conectar el formulario de nueva tarea con el backend.
  - *Dónde:* frontend — handler que llama al endpoint de T-01.
  - *Implica:* al enviar el formulario, hace una petición POST; si la respuesta es `201`, agrega la tarea recibida a la lista mostrada; si es `400`, muestra el mensaje de error recibido.
  - *Necesita:* cómo hacer peticiones HTTP desde el frontend; actualización de estado en React tras una respuesta asíncrona.

## RF-05 — Ver la lista de tareas del usuario

- **T-05** — Endpoint de backend que devuelve la lista de tareas.
  - *Dónde:* backend — ruta `GET /tasks`.
  - *Implica:* responde `200` con el arreglo de tareas guardadas (el filtro por usuario llega en T-33; hasta entonces, devuelve todas).
  - *Necesita:* Express y rutas (ya visto en T-01); persistencia simulada — lectura (ya visto en T-01).
- **T-06** — Componente de lista de tareas en la interfaz.
  - *Dónde:* frontend — componente de lista.
  - *Implica:* recibe un arreglo de tareas (forma del Modelo de datos) y las renderiza.
  - *Necesita:* React y componentes (ya visto); renderizado de listas en React.
- **T-07** — Conectar la lista de la interfaz con el backend.
  - *Dónde:* frontend — carga de datos al entrar a la pantalla principal.
  - *Implica:* pide la lista al backend (`GET /tasks`) y la pasa al componente de T-06.
  - *Necesita:* peticiones HTTP (ya visto en T-04); manejo de efectos en React para cargar datos al abrir una pantalla.

## RF-07 — Marcar tarea como completada / pendiente

- **T-08** — Endpoint de backend para alternar el estado.
  - *Dónde:* backend — ruta `PATCH /tasks/:id/toggle`.
  - *Implica:* invierte el campo `completada` (booleano) de la tarea con ese id; responde `200` con la tarea actualizada, o `404` si el id no existe.
  - *Necesita:* rutas con parámetros dinámicos en Express; persistencia simulada — actualización de un registro existente.
- **T-09** — Acción de marcar completada/pendiente en la interfaz.
  - *Dónde:* frontend — elemento interactivo (checkbox) en cada ítem de la lista.
  - *Implica:* al interactuar, dispara el cambio de estado de esa tarea puntual.
  - *Necesita:* manejo de eventos en React.
- **T-10** — Conectar esa acción con el backend.
  - *Dónde:* frontend — handler que llama al endpoint de T-08.
  - *Implica:* hace la petición con el id de la tarea; actualiza esa tarea en la lista con la respuesta `200`.
  - *Necesita:* peticiones HTTP con parámetros dinámicos (ya visto); actualización de estado en React (ya visto).

## RF-08 — Editar una tarea existente

- **T-11** — Endpoint de backend para editar una tarea.
  - *Dónde:* backend — ruta `PUT /tasks/:id`.
  - *Implica:* recibe título/descripción/fecha a modificar, actualiza el registro; responde `200` con la tarea actualizada, o `404` si no existe.
  - *Necesita:* rutas con parámetros dinámicos (ya visto en T-08); persistencia simulada — actualización (ya visto en T-08).
- **T-12** — Acción/formulario de edición en la interfaz.
  - *Dónde:* frontend — formulario de T-03, reutilizado y precargado con los datos existentes.
  - *Implica:* muestra los datos actuales de la tarea y permite modificarlos.
  - *Necesita:* formularios controlados en React precargados con datos existentes (extiende lo visto en T-03).
- **T-13** — Conectar la edición con el backend.
  - *Dónde:* frontend — handler que llama al endpoint de T-11.
  - *Implica:* envía los campos modificados; actualiza esa tarea en la lista con la respuesta `200`.
  - *Necesita:* peticiones HTTP tipo actualización (ya visto).

## RF-09 — Eliminar una tarea

- **T-14** — Endpoint de backend para eliminar.
  - *Dónde:* backend — ruta `DELETE /tasks/:id`.
  - *Implica:* elimina el registro con ese id; responde `204` sin cuerpo, o `404` si no existe.
  - *Necesita:* rutas con parámetros dinámicos (ya visto); persistencia simulada — eliminación de un registro.
- **T-15** — Acción de eliminar en la interfaz.
  - *Dónde:* frontend — botón de eliminar en cada ítem de la lista.
  - *Implica:* al interactuar, dispara la eliminación de esa tarea puntual.
  - *Necesita:* manejo de eventos en React (ya visto).
- **T-16** — Conectar la acción de eliminar con el backend.
  - *Dónde:* frontend — handler que llama al endpoint de T-14.
  - *Implica:* hace la petición; si la respuesta es `204`, quita esa tarea de la lista mostrada.
  - *Necesita:* peticiones HTTP tipo eliminación (ya visto); quitar un elemento de una lista en el estado de React.

## RF-01 — Registro de usuario

- **T-17** — Endpoint de backend de registro.
  - *Dónde:* backend — ruta `POST /auth/register`.
  - *Implica:* recibe email y contraseña; crea el usuario con id autogenerado; responde `201` confirmando (el cuerpo de la respuesta nunca incluye `contrasenaHash`).
  - *Necesita:* Express y rutas (ya visto); persistencia simulada de usuarios — una estructura en memoria separada de las tareas.
- **T-18** — Validar formato de email al registrar.
  - *Dónde:* mismo controlador que T-17.
  - *Implica:* si el email no tiene formato válido, responde `400` con el formato de error transversal, sin crear el usuario.
  - *Necesita:* qué es validar el formato de un dato de entrada.
- **T-19** — Validar requisitos mínimos de la contraseña al registrar.
  - *Dónde:* mismo controlador que T-17.
  - *Implica:* si la contraseña tiene menos de 8 caracteres, responde `400`.
  - *Necesita:* mismo conocimiento que T-18 (validación de entrada).
- **T-20** — Evitar registrar un email que ya existe.
  - *Dónde:* mismo controlador que T-17.
  - *Implica:* antes de crear el usuario, busca si ya existe uno con ese email; si existe, responde `400`.
  - *Necesita:* consultar la estructura de usuarios en memoria antes de escribir en ella (extiende T-17).
- **T-21** — Guardar la contraseña de forma segura, no en texto plano.
  - *Dónde:* mismo controlador que T-17.
  - *Implica:* la contraseña se transforma en `contrasenaHash` antes de guardarse; el valor en texto plano no se guarda en ningún campo.
  - *Necesita:* qué es el hashing de contraseñas y por qué no se guardan en texto plano — **concepto nuevo**.
- **T-22** — Pantalla de registro en la interfaz.
  - *Dónde:* frontend — componente de pantalla de registro.
  - *Implica:* formulario con email y contraseña.
  - *Necesita:* formularios controlados (ya visto en T-03).
- **T-23** — Conectar la pantalla de registro con el backend.
  - *Dónde:* frontend — handler que llama al endpoint de T-17.
  - *Implica:* envía email/contraseña; si la respuesta es `201`, redirige a la pantalla de login; si es `400`, muestra el mensaje de error recibido.
  - *Necesita:* peticiones HTTP (ya visto).

## RF-02 — Inicio de sesión

- **T-24** — Endpoint de backend de login.
  - *Dónde:* backend — ruta `POST /auth/login`.
  - *Implica:* recibe email y contraseña.
  - *Necesita:* Express y rutas (ya visto).
- **T-25** — Validar las credenciales contra las guardadas.
  - *Dónde:* mismo controlador que T-24.
  - *Implica:* busca el usuario por email, compara la contraseña ingresada contra `contrasenaHash`; si el usuario no existe o la contraseña no coincide, responde `401` con el mismo mensaje genérico en ambos casos (para no revelar si el email está registrado).
  - *Necesita:* cómo comparar una contraseña ingresada contra un hash guardado (extiende el concepto de hashing de T-21).
- **T-26** — Generar el token de acceso al loguearse correctamente.
  - *Dónde:* mismo controlador que T-24.
  - *Implica:* si las credenciales son válidas, genera un JWT cuyo payload mínimo es el id del usuario; responde `200` con el token.
  - *Necesita:* qué es JWT y cómo se genera un token — **concepto nuevo**.
- **T-27** — Pantalla de inicio de sesión en la interfaz.
  - *Dónde:* frontend — componente de pantalla de login.
  - *Implica:* formulario con email y contraseña.
  - *Necesita:* formularios controlados (ya visto).
- **T-28** — Conectar la pantalla de login con el backend.
  - *Dónde:* frontend — handler que llama al endpoint de T-24.
  - *Implica:* envía las credenciales; si la respuesta es `200`, sigue en T-29; si es `401`, muestra el mensaje de error recibido.
  - *Necesita:* peticiones HTTP (ya visto).
- **T-29** — Guardar el token recibido en el cliente.
  - *Dónde:* frontend — tras el login exitoso (continúa T-28).
  - *Implica:* guarda el token en el navegador para adjuntarlo como cabecera `Authorization` en futuras peticiones (ver Decisiones transversales), y redirige a la pantalla principal.
  - *Necesita:* qué es el almacenamiento del lado del cliente en el navegador — **concepto nuevo**.
- **T-30** — Indicador de sesión activa en la interfaz.
  - *Dónde:* frontend — layout/cabecera de la pantalla principal.
  - *Implica:* muestra que hay una sesión iniciada (el email del usuario, leído del token o guardado junto con él).
  - *Necesita:* React y estado compartido entre componentes (ya visto).

## RF-04 — Aislamiento por usuario

- **T-31** — Middleware de backend que verifica el token en cada petición protegida.
  - *Dónde:* backend — middleware de autenticación, aplicado a las rutas de tareas.
  - *Implica:* lee el token de la cabecera `Authorization`; si falta o es inválido, responde `401`; si es válido, extrae el id del usuario del token y lo deja disponible para el resto de la petición.
  - *Necesita:* qué es un middleware en Express — **concepto nuevo**; cómo verificar un JWT recibido (extiende T-26).
- **T-32** — Asociar cada tarea guardada con el usuario que la creó.
  - *Dónde:* backend — endpoint de T-01.
  - *Implica:* al crear una tarea, guarda `usuarioId` con el id que dejó disponible el middleware de T-31 (campo ya previsto en el Modelo de datos).
  - *Necesita:* persistencia simulada ya vista (T-01); el middleware de T-31.
- **T-33** — Filtrar el listado para mostrar solo las tareas del usuario autenticado.
  - *Dónde:* backend — endpoint de T-05.
  - *Implica:* filtra el arreglo de tareas por `usuarioId` igual al del usuario identificado por el middleware, antes de responder `200`.
  - *Necesita:* el middleware de T-31, ya resuelto.
- **T-34** — Validar dueño al editar una tarea.
  - *Dónde:* backend — endpoint de T-11.
  - *Implica:* si la tarea encontrada tiene `usuarioId` distinto al del usuario autenticado, responde `403` sin aplicar el cambio.
  - *Necesita:* el middleware de T-31.
- **T-35** — Validar dueño al marcar completada/pendiente.
  - *Dónde:* backend — endpoint de T-08.
  - *Implica:* mismo chequeo que T-34 (`403` si no coincide `usuarioId`), aplicado a este endpoint.
  - *Necesita:* el middleware de T-31 (ya reutilizado en T-34).
- **T-36** — Validar dueño al eliminar.
  - *Dónde:* backend — endpoint de T-14.
  - *Implica:* mismo chequeo (`403` si no coincide `usuarioId`), aplicado a este endpoint.
  - *Necesita:* el middleware de T-31.

## RF-03 — Cierre de sesión

- **T-37** — Botón de cerrar sesión en la interfaz.
  - *Dónde:* frontend — junto al indicador de sesión (T-30).
  - *Implica:* al presionarlo, dispara la acción de cerrar sesión.
  - *Necesita:* manejo de eventos en React (ya visto).
- **T-38** — Eliminar el token guardado localmente al cerrar sesión.
  - *Dónde:* frontend — handler del botón de T-37.
  - *Implica:* borra el token del almacenamiento del cliente (mismo mecanismo de T-29) y redirige a la pantalla de login.
  - *Necesita:* almacenamiento del lado del cliente (ya visto en T-29).

## RF-10 — Teléfono y recordatorio en una tarea

- **T-39** — Extender crear tarea para aceptar teléfono opcional.
  - *Dónde:* backend — endpoint de T-01.
  - *Implica:* acepta `telefono` (opcional, campo ya previsto en el Modelo de datos) en el cuerpo de la petición.
  - *Necesita:* lo mismo que T-01 (campo adicional opcional).
- **T-40** — Extender crear tarea para aceptar fecha/hora de recordatorio opcional.
  - *Dónde:* backend — endpoint de T-01.
  - *Implica:* acepta `recordatorioFechaHora` (opcional) en el cuerpo; si viene, `recordatorioEnviado` se inicializa en `false`.
  - *Necesita:* lo mismo que T-01; qué es una fecha/hora como dato (nociones básicas).
- **T-41** — Extender editar tarea para aceptar/actualizar el teléfono.
  - *Dónde:* backend — endpoint de T-11.
  - *Implica:* permite modificar `telefono` de una tarea existente.
  - *Necesita:* lo mismo que T-39.
- **T-42** — Extender editar tarea para aceptar/actualizar fecha/hora de recordatorio.
  - *Dónde:* backend — endpoint de T-11.
  - *Implica:* permite modificar `recordatorioFechaHora`; si cambia, `recordatorioEnviado` vuelve a `false`.
  - *Necesita:* lo mismo que T-40.
- **T-43** — Campo de teléfono en el formulario de la interfaz.
  - *Dónde:* frontend — formulario de T-03/T-12.
  - *Implica:* input de teléfono, opcional.
  - *Necesita:* formularios controlados (ya visto).
- **T-44** — Campo de fecha/hora de recordatorio en el formulario.
  - *Dónde:* frontend — formulario de T-03/T-12.
  - *Implica:* input de fecha/hora, opcional.
  - *Necesita:* formularios controlados (ya visto); selector de fecha/hora nativo del navegador.
- **T-45** — Acción de añadir/quitar recordatorio en la lista.
  - *Dónde:* frontend — componente de lista (T-06).
  - *Implica:* muestra si `recordatorioFechaHora` está definido; "quitar" llama a T-13 enviando `telefono` y `recordatorioFechaHora` vacíos.
  - *Necesita:* manejo de eventos en React (ya visto); conexión con el backend de edición (ya visto en T-13).

## RF-11 — Envío automático de SMS de recordatorio

- **T-46** — Job en segundo plano que se ejecuta cada minuto.
  - *Dónde:* backend — configuración del job programado, arrancado junto con el servidor.
  - *Implica:* usa la librería de cron ya elegida en `curso/stack.md`, configurada con la expresión "cada minuto".
  - *Necesita:* qué es una tarea programada (cron) y cómo se define — **concepto nuevo**.
- **T-47** — Consultar, en cada ejecución, las tareas cuyo recordatorio corresponde enviarse ahora.
  - *Dónde:* backend — dentro del job de T-46.
  - *Implica:* filtra las tareas con `recordatorioFechaHora` definido y `recordatorioEnviado` en `false`, cuya fecha/hora ya llegó (es menor o igual al momento actual).
  - *Necesita:* persistencia simulada ya vista (lectura); comparar fechas/horas (nociones básicas).
- **T-48** — Enviar el SMS al número indicado.
  - *Dónde:* backend — dentro del job, para cada tarea que T-47 detecta.
  - *Implica:* llama al SDK de Twilio (ya fijado en `curso/stack.md`) con el `telefono` de la tarea y un mensaje que incluye el título de la tarea.
  - *Necesita:* qué es Twilio y cómo se envía un SMS con su SDK — **concepto nuevo**.
- **T-49** — Marcar el recordatorio como enviado.
  - *Dónde:* backend — dentro del job, inmediatamente después de que T-48 confirma el envío.
  - *Implica:* pone `recordatorioEnviado` en `true` en esa tarea, para que T-47 no vuelva a seleccionarla.
  - *Necesita:* persistencia simulada ya vista — actualización (igual que T-08/T-11).

## RF-12 — Feedback visual de carga y errores

- **T-50** — Estado de carga en cada acción de la interfaz.
  - *Dónde:* frontend — transversal a los handlers que hacen peticiones al backend (T-04, T-07, T-10, T-13, T-16, T-23, T-28...).
  - *Implica:* mientras la petición está en curso, la interfaz muestra un indicador de carga; se oculta al recibir cualquier respuesta (éxito o error).
  - *Necesita:* manejo de estado asíncrono en React, aplicado explícitamente al estado de "cargando" (extiende lo ya usado en las conexiones con el backend).
- **T-51** — Mensaje de error cuando una llamada al backend falla.
  - *Dónde:* frontend — mismo alcance transversal que T-50.
  - *Implica:* si la respuesta trae el formato de error transversal (`{ error }`) o la petición falla por red, la interfaz muestra ese mensaje (o uno genérico en el caso de fallo de red) en vez de fallar en silencio.
  - *Necesita:* manejo de la rama de error en peticiones asíncronas (extiende lo mismo que T-50).
