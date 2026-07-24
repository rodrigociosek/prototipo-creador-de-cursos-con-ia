# Índice de construcción — TodoList con login y recordatorios por SMS

**Objetivo del proyecto:** gestionar tareas personales por usuario autenticado, con recordatorios opcionales por SMS.

Secuencia única de clases: se copian las 51 tareas de `curso/tareas.md` tal cual, agrupadas en clases de **construcción**, y se intercalan clases de **conocimiento** justo antes de la construcción que las necesita por primera vez — nunca antes de tiempo, nunca agrupando dos conocimientos que hacen falta en momentos distintos. El orden dentro de cada RF sigue interfaz → backend → conexión (§4 de `SKILL.md`).

**Transversal (no ocupa clase propia):** Git — uso mecánico desde la Clase 1.

## RF-06 — Añadir una nueva tarea (prioridad 1)

- **Clase 1** — [Conocimiento] React y componentes (K10).
- **Clase 2** — [Conocimiento] Formulario controlado en React (K11).
- **Clase 3** — [Construcción — interfaz] T-03 (formulario de nueva tarea).
- **Clase 4** — [Conocimiento] Express y rutas HTTP; formato JSON; códigos de estado de éxito y error (K1, K3, K4, K5) *(agrupados: piezas chicas del primer endpoint)*.
- **Clase 5** — [Conocimiento] Persistencia simulada — crear/leer un registro (K6).
- **Clase 6** — [Construcción — backend] T-01, T-02 (endpoint de crear tarea + validar título obligatorio).
- **Clase 7** — [Conocimiento] Peticiones HTTP desde el frontend y actualización de estado tras la respuesta (K12, K13).
- **Clase 8** — [Construcción — conexión] T-04 (conectar el formulario con el backend).

## RF-05 — Ver la lista de tareas del usuario (prioridad 2)

- **Clase 9** — [Conocimiento] Renderizado de listas en React (K14).
- **Clase 10** — [Construcción — interfaz] T-06 (componente de lista de tareas).
- **Clase 11** — [Construcción — backend] T-05 (endpoint que devuelve la lista) — reutiliza Clases 4–5.
- **Clase 12** — [Conocimiento] Efectos en React para cargar datos al abrir una pantalla (K15).
- **Clase 13** — [Construcción — conexión] T-07 (conectar la lista con el backend).

## RF-07 — Marcar tarea como completada / pendiente (prioridad 3)

- **Clase 14** — [Conocimiento] Manejo de eventos en React (K16).
- **Clase 15** — [Construcción — interfaz] T-09 (acción de marcar completada/pendiente).
- **Clase 16** — [Conocimiento] Rutas con parámetros dinámicos en Express; persistencia simulada — actualizar (K2, K7).
- **Clase 17** — [Construcción — backend] T-08 (endpoint para alternar el estado).
- **Clase 18** — [Conocimiento] Peticiones HTTP con parámetros dinámicos desde el frontend (K17).
- **Clase 19** — [Construcción — conexión] T-10 (conectar esa acción con el backend).

## RF-08 — Editar una tarea existente (prioridad 4)

Sin conocimientos nuevos — reutiliza Clase 2 (formulario controlado), Clase 16 (rutas dinámicas + actualizar), Clase 18 (peticiones con parámetros dinámicos).

- **Clase 20** — [Construcción — interfaz] T-12 (formulario de edición).
- **Clase 21** — [Construcción — backend] T-11 (endpoint para editar).
- **Clase 22** — [Construcción — conexión] T-13 (conectar la edición con el backend).

## RF-09 — Eliminar una tarea (prioridad 5)

- **Clase 23** — [Construcción — interfaz] T-15 (acción de eliminar) — reutiliza Clase 14.
- **Clase 24** — [Conocimiento] Persistencia simulada — eliminar un registro (K8).
- **Clase 25** — [Construcción — backend] T-14 (endpoint para eliminar).
- **Clase 26** — [Conocimiento] Quitar un elemento de una lista en el estado de React (K18).
- **Clase 27** — [Construcción — conexión] T-16 (conectar la acción de eliminar).

## RF-01 — Registro de usuario (prioridad 6)

- **Clase 28** — [Construcción — interfaz] T-22 (pantalla de registro) — reutiliza Clase 2.
- **Clase 29** — [Conocimiento] Persistencia simulada de usuarios; validar formato de entrada; evitar duplicados (K9, K19, K20) *(agrupados: piezas del mismo endpoint de registro)*.
- **Clase 30** — [Construcción — backend] T-17, T-18, T-19, T-20 (endpoint de registro + validaciones + email único).
- **Clase 31** — [Conocimiento] Hashing de contraseñas (K21).
- **Clase 32** — [Construcción — backend] T-21 (guardar la contraseña con hash).
- **Clase 33** — [Construcción — conexión] T-23 (conectar la pantalla de registro) — reutiliza Clase 7.

## RF-02 — Inicio de sesión (prioridad 7)

- **Clase 34** — [Construcción — interfaz] T-27 (pantalla de login) — reutiliza Clase 2.
- **Clase 35** — [Construcción — backend] T-24, T-25 (endpoint de login + validar credenciales) — reutiliza Clase 31 (hashing, extendido a comparar).
- **Clase 36** — [Conocimiento] JWT — qué es y cómo se genera un token (K22).
- **Clase 37** — [Construcción — backend] T-26 (generar el token de acceso).
- **Clase 38** — [Construcción — conexión] T-28 (conectar la pantalla de login) — reutiliza Clase 7.
- **Clase 39** — [Conocimiento] Almacenamiento del lado del cliente; estado compartido entre componentes (K23, K24) *(agrupados: ambos resuelven "recordar que hay sesión activa")*.
- **Clase 40** — [Construcción] T-29, T-30 (guardar el token recibido + indicador de sesión activa).

## RF-04 — Aislamiento por usuario (prioridad 8)

- **Clase 41** — [Conocimiento] Middleware en Express; verificar un JWT recibido (K25, K26) *(agrupados: el middleware es la aplicación práctica de verificar el token)*.
- **Clase 42** — [Construcción] T-31 (middleware de autenticación).
- **Clase 43** — [Construcción] T-32, T-33, T-34, T-35, T-36 (asociar tareas al usuario, filtrar listado, validar dueño al editar/completar/eliminar) — reutiliza Clase 5 (persistencia).

## RF-03 — Cierre de sesión (prioridad 9)

Sin conocimientos nuevos — reutiliza Clase 14 (eventos), Clase 39 (almacenamiento del cliente).

- **Clase 44** — [Construcción] T-37, T-38 (botón de cerrar sesión + eliminar el token guardado).

## RF-10 — Teléfono y recordatorio en una tarea (prioridad 10)

- **Clase 45** — [Construcción — interfaz] T-43 (campo de teléfono en el formulario) — reutiliza Clase 2.
- **Clase 46** — [Conocimiento] Selector de fecha/hora nativo del navegador (K27).
- **Clase 47** — [Construcción — interfaz] T-44 (campo de fecha/hora de recordatorio).
- **Clase 48** — [Construcción — backend] T-39, T-40, T-41, T-42 (extender crear/editar tarea con teléfono y recordatorio) — reutiliza Clase 4 y Clase 16.
- **Clase 49** — [Construcción — conexión] T-45 (acción de añadir/quitar recordatorio en la lista) — reutiliza Clase 14 y Clase 18.

## RF-11 — Envío automático de SMS de recordatorio (prioridad 11)

- **Clase 50** — [Conocimiento] Tarea programada (cron) — qué es y cómo se define (K28).
- **Clase 51** — [Construcción] T-46 (job en segundo plano que se ejecuta cada minuto).
- **Clase 52** — [Construcción] T-47 (consultar recordatorios pendientes) — reutiliza Clase 5.
- **Clase 53** — [Conocimiento] Twilio — qué es y cómo se envía un SMS con su SDK (K29).
- **Clase 54** — [Construcción] T-48 (enviar el SMS).
- **Clase 55** — [Construcción] T-49 (marcar el recordatorio como enviado) — reutiliza Clase 16.

## RF-12 — Feedback visual de carga y errores (prioridad 12)

- **Clase 56** — [Conocimiento] Estado de carga y manejo de errores en peticiones asíncronas (K30, K31) *(agrupados: ambos resuelven "qué mostrar mientras/si falla una petición")*.
- **Clase 57** — [Construcción] T-50, T-51 (estado de carga + mensaje de error).

## Bloque final — Integración de base de datos real (Fase 9)

Cuando las 12 RF ya están construidas (Clases 1–57), se abre este bloque: enseña PostgreSQL (elegido en `curso/stack.md`) y refactoriza, RF por RF, cada uso de persistencia simulada (Clases 5, 16, 24) para reemplazarlo por la base de datos real. No se numera junto a las Clases 1–57 — se detalla al llegar a la Fase 9, siguiendo `SKILL.md` § Fase 9.
