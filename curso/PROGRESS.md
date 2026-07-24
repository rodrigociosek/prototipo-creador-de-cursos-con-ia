# Progreso del curso

Última actualización: 2026-07-22

## Fases
- [x] Fase 0 — Estado inicial creado (curso/PROGRESS.md, curso/00-orquestador.md, curso/conceptos-enseñados.md vacío)
- [x] Fase 1 — RF analizados (curso/rf.md) — 12 RF (RF-01 a RF-12)
- [x] Fase 1.5 — RF ordenados por importancia (curso/prioridad-rf.md) — confirmada por el usuario el 2026-07-22
- [x] Fase 2 — Stack acordado (curso/stack.md) — React+Vite (frontend), Node.js+Express (backend), PostgreSQL (persistencia, Fase 9), JWT (auth), Twilio (SMS)
- [x] Fase 3 — Auditoría stack/versiones (curso/auditoria-stack.md) — confirmada por el usuario el 2026-07-22 (jsonwebtoken sobre jose; Twilio trial aceptado con sus límites)
- [x] Fase 4 — Tareas desglosadas, Nivel 2 (curso/tareas.md) — 51 tareas (T-01 a T-51). Pasó por 2 rondas de mayor granularidad a pedido del usuario (25 → 44 → 51), separando toda tarea que todavía juntara dos reglas/comportamientos con "y".
- [x] Fase 4.1 — Huecos de tareas auditados (curso/auditoria-tareas.md) — confirmada por el usuario el 2026-07-22
- [x] Fase 5 — Tareas especificadas hasta el cómo, Nivel 3 (curso/tareas.md ampliado, 51 tareas + Modelo de datos + Decisiones técnicas transversales)
- [x] Fase 5.1 — Especificación auditada (curso/auditoria-tareas.md) — confirmada por el usuario el 2026-07-22
- [x] Fase 6 — Listado global de conocimientos (curso/dependencias.md) — 31 conocimientos (K1–K31)
- [x] Fase 6.1 — Conocimientos encadenados recursivamente — todas las cadenas llegan a punto de corte, sin simulación necesaria
- [x] Fase 6.2 — Listado auditado (curso/auditoria-dependencias.md) — confirmada por el usuario el 2026-07-22
- [x] Fase 7 — Índice generado como secuencia única (curso/indice.md) — 57 clases (21 conocimiento + 36 construcción); reescrito tras corrección de formato (ya no son 2 secciones separadas)
- [x] Fase 7.1 — Índice auditado de punta a punta (curso/auditoria-indice.md) — corrigió agrupación indebida (K14/K15); confirmada por el usuario el 2026-07-22
- [ ] Fase 8 — Clases de construcción generadas (ver detalle abajo) — EN CURSO (Clase 06 de 57 hecha)
- [ ] Fase 9 — Bloque de integración de BD real
- [ ] Fase 10 — Auditoría final (curso/auditoria-final.md)

## Clases (Fases 8 y 9)
- [x] Clase 01 — Qué es un componente de React y cómo React lo convierte en pantalla — [conocimiento] — hecha el 2026-07-22 (K10)
- [x] Clase 02 — Formulario controlado en React (K11) — [conocimiento] — hecha el 2026-07-22
- [x] Clase 03 — [Construcción — interfaz] T-03 — hecha el 2026-07-22 (scaffold de curso/app/frontend con Vite, FormularioNuevaTarea.jsx)
- [x] Clase 04 — Express, rutas, JSON, códigos de estado (K1,K3,K4,K5) — [conocimiento] — hecha el 2026-07-22
- [x] Clase 05 — Persistencia simulada crear/leer (K6) — [conocimiento] — hecha el 2026-07-22
- [x] Clase 06 — [Construcción — backend] T-01, T-02 — hecha el 2026-07-22 (curso/app/backend, endpoint POST /tasks)
- [ ] Clase 07 — Peticiones HTTP frontend + actualización de estado (K12,K13) — [conocimiento] — SIGUIENTE
- [ ] Clase 08 — [Construcción — conexión] T-04
... (Clases 09 a 57 según curso/indice.md, se van agregando a esta lista a medida que se acercan — ver curso/indice.md para el detalle completo de las 57)

## Notas para retomar
Arranque del curso (2026-07-22). Proyecto: TodoList con login, recordatorios por SMS y frontend React+Vite (según `funcionalidades.md`). `curso/` y `app/` no existían antes de esta sesión — se parte de cero.

Fase 1: se extrajeron 12 RF. Los bullets de la sección "Interfaz de usuario" del documento original NO se convirtieron en RF aparte — se incorporaron como parte del alcance de cada RF de backend que ya los necesita (login, crear tarea, listar tareas, etc.), salvo "Feedback visual de carga y errores" que sí quedó como RF transversal propio (RF-12). Ver `curso/rf.md` § Notas de extracción para el detalle completo de esta decisión.

Fase 1.5: tabla de prioridad confirmada. Fases 2-7.1 completas y confirmadas (ver checklist arriba). Índice final: 57 clases (`curso/indice.md`).

Fase 8 en curso. Clase 01 (React y componentes, K10), Clase 02 (formulario controlado, K11), Clase 03 (construcción — interfaz, T-03), Clase 04 (Express, HTTP, JSON, códigos de estado, K1/K3/K4/K5) y Clase 05 (persistencia simulada, K6) hechas el 2026-07-22, cada una en su rama, commiteadas.

Clase 03: primer código real del proyecto. Se scaffoldeó `curso/app/frontend/` con Vite (React 19.2.8, Vite 8.1.5 — coinciden exacto con `curso/auditoria-stack.md`), se construyó `FormularioNuevaTarea.jsx` (T-03) y se verificó con interacción real en navegador (`.claude/launch.json` agregado para poder previsualizarlo) — se pudo confirmar ahí lo que las Clases 01/02 habían dejado pendiente por falta de navegador (el `onChange` real de un input controlado). El envío del formulario todavía no llama a ningún backend — eso es una tarea posterior, después de que el backend exista.

Clase 04: primer paso del lado del backend. Servidor Express de ejemplo probado con `curl` real (GET 200, POST 201, POST inválido 400) en un entorno descartable — el backend real del proyecto arranca recién en la Clase 06.

Clase 05: persistencia simulada demostrada ejecutando el mismo script dos veces como procesos separados — los ids se reinician ambas veces, mostrando el límite real (se pierde todo al reiniciar).

Clase 06: primer código real del backend. Se scaffoldeó `curso/app/backend/` (`npm init` + `express@5.2.1`, coincide exacto con `curso/auditoria-stack.md`), se organizó la persistencia simulada como clase (`TareasRepositorio`, campos privados `#tareas`/`#siguienteId`) y se construyó `POST /tasks` (T-01+T-02) siguiendo el contrato de `curso/tareas.md`. Verificado con `curl` real: 201, 400, y 201 con id correlativo (2) — confirmando que el estado persiste entre peticiones dentro de un mismo proceso, a diferencia de la Clase 05.

Próximo paso: Clase 07 (conocimiento — peticiones HTTP desde el frontend + actualización de estado tras una respuesta asíncrona, K12/K13), para poder conectar el formulario de la Clase 03 con este endpoint en la Clase 08.
