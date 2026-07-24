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
- [ ] Fase 8 — Clases de construcción generadas (ver detalle abajo) — EN CURSO (Clase 01 de 57 hecha)
- [ ] Fase 9 — Bloque de integración de BD real
- [ ] Fase 10 — Auditoría final (curso/auditoria-final.md)

## Clases (Fases 8 y 9)
- [x] Clase 01 — Qué es un componente de React y cómo React lo convierte en pantalla — [conocimiento] — hecha el 2026-07-22 (K10)
- [ ] Clase 02 — Formulario controlado en React (K11) — [conocimiento] — SIGUIENTE
... (Clases 03 a 57 según curso/indice.md, se van agregando a esta lista a medida que se acercan — ver curso/indice.md para el detalle completo de las 57)

## Notas para retomar
Arranque del curso (2026-07-22). Proyecto: TodoList con login, recordatorios por SMS y frontend React+Vite (según `funcionalidades.md`). `curso/` y `app/` no existían antes de esta sesión — se parte de cero.

Fase 1: se extrajeron 12 RF. Los bullets de la sección "Interfaz de usuario" del documento original NO se convirtieron en RF aparte — se incorporaron como parte del alcance de cada RF de backend que ya los necesita (login, crear tarea, listar tareas, etc.), salvo "Feedback visual de carga y errores" que sí quedó como RF transversal propio (RF-12). Ver `curso/rf.md` § Notas de extracción para el detalle completo de esta decisión.

Fase 1.5: tabla de prioridad confirmada. Fases 2-7.1 completas y confirmadas (ver checklist arriba). Índice final: 57 clases (`curso/indice.md`).

Fase 8 en curso. Clase 01 (React y componentes, K10) hecha el 2026-07-22, en su rama, commiteada.

Próximo paso: Clase 02 (formulario controlado, K11).
