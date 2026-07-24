

---

## 📋 Listado de funcionalidades del TodoList con Login

### 🔐 Autenticación de usuarios

- Registro con email y contraseña.
- Inicio de sesión que devuelve un token de acceso.
- Cierre de sesión (eliminar token del frontend).
- Cada usuario solo puede ver y gestionar sus propias tareas.

### ✅ Gestión de tareas

- Ver una lista de todas las tareas del usuario.
- Añadir una nueva tarea (con título obligatorio y opcionalmente descripción y fecha de vencimiento).
- Marcar una tarea como completada / pendiente.
- Editar el texto de una tarea existente.
- Eliminar una tarea.

### ⏰ Recordatorios por SMS

- Al crear o editar una tarea, el usuario puede (opcionalmente) añadir un número de teléfono y una fecha/hora de recordatorio.
- El sistema envía automáticamente un SMS al número indicado en la fecha programada.
- Se usa Twilio para el envío y una tarea en segundo plano (cron) que revisa recordatorios cada minuto.

### 🎨 Interfaz de usuario (React + Vite)

- Pantalla de registro / inicio de sesión.
- Pantalla principal con:
  - Formulario para nueva tarea (título, descripción, fecha, teléfono opcional).
  - Lista de tareas con acciones (completar, editar, eliminar, añadir/quitar recordatorio).
  - Indicador de sesión activa y botón de cerrar sesión.
- Feedback visual de carga y errores.

---


