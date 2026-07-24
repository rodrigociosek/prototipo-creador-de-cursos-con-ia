# Formato de `curso/PROGRESS.md`

Este archivo es lo primero que se lee en cada invocación del Skill (Fase 0). Debe ser suficiente por sí solo para que una sesión nueva, sin memoria de la conversación anterior, sepa exactamente qué falta.

Mantenlo actualizado **al terminar cada fase y al terminar cada clase individual** — si la sesión se corta a mitad del proceso, este archivo es la única forma de retomar sin repetir trabajo ni perderlo.

```markdown
# Progreso del curso

Última actualización: [fecha]

## Fases
- [x] Fase 0 — Estado inicial creado (curso/PROGRESS.md, curso/00-orquestador.md, curso/conceptos-enseñados.md vacío)
- [x] Fase 1 — RF analizados (curso/rf.md)
- [x] Fase 1.5 — RF ordenados por importancia (curso/prioridad-rf.md) — confirmada por el usuario el [fecha]
- [x] Fase 2 — Stack acordado (curso/stack.md)
- [x] Fase 3 — Auditoría stack/versiones (curso/auditoria-stack.md) — confirmada por el usuario el [fecha]
- [x] Fase 4 — Tareas desglosadas, Nivel 2 (curso/tareas.md)
- [x] Fase 4.1 — Huecos de tareas auditados (curso/auditoria-tareas.md) — confirmada por el usuario el [fecha]
- [x] Fase 5 — Tareas especificadas hasta el cómo, Nivel 3
- [x] Fase 5.1 — Especificación auditada (curso/auditoria-tareas.md) — confirmada por el usuario el [fecha]
- [x] Fase 6 — Listado global de conocimientos (curso/dependencias.md)
- [x] Fase 6.1 — Conocimientos encadenados recursivamente
- [x] Fase 6.2 — Listado auditado (curso/auditoria-dependencias.md) — confirmada por el usuario el [fecha]
- [x] Fase 7 — Índice generado, dos iteraciones (curso/indice.md)
- [x] Fase 7.1 — Índice auditado de punta a punta (curso/auditoria-indice.md) — confirmada por el usuario el [fecha]
- [ ] Fase 8 — Clases de construcción generadas (ver detalle abajo)
- [ ] Fase 9 — Bloque de integración de BD real *(omitir esta fase, marcándola N/A con el motivo, si el proyecto no incluye persistencia real)*
- [ ] Fase 10 — Auditoría final (curso/auditoria-final.md)

## Clases (Fases 8 y 9)
- [x] Clase 01 — [título] — [conocimiento|construcción] — hecha el [fecha]
- [x] Clase 02 — [título] — [conocimiento|construcción] — hecha el [fecha]
- [ ] Clase 03 — [título] — [conocimiento|construcción] — SIGUIENTE
- [ ] Clase 04 — [título] — [conocimiento|construcción]
...
- [ ] Clase NN — Integración de BD real: [RF] — [construcción] *(marca así el inicio del bloque de la Fase 9)*
...

## Notas para retomar
[Cualquier decisión pendiente, duda abierta, o desviación del plan original que la siguiente sesión necesita conocer antes de continuar.]
```

Reglas (qué hacer):
- Una fase con checkpoint (1.5, 3, 4.1, 5.1, 6.2, 7, 7.1) no se marca `[x]` hasta que el usuario la confirmó explícitamente — si se generó pero no se confirmó, anótalo como `[~] generada, pendiente de confirmación`.
- La lista de clases se escribe completa (todas, incluso las no empezadas) en cuanto termina la Fase 7.1, con estado `[ ]` — así cualquier sesión ve de un vistazo cuánto queda.
- Marca con **SIGUIENTE** la clase que toca generar ahora.
- Cada clase indica si es de **conocimiento** o **construcción** (ver `references/reglas-de-clase.md`), para que se note a simple vista que no están agrupadas en bloques cerrados por RF.
- Marca claramente dónde empieza el bloque de la Fase 9 (integración de BD real) dentro de la lista de clases.
- "Notas para retomar" debe ser específico y accionable — una sesión nueva debe poder actuar solo con esto, sin releer la conversación.

Qué NO hacer:
- No marques `[x]` una fase con checkpoint por haberla generado — generar no es lo mismo que confirmar.
- No sobrescribas ni recrees este archivo desde cero si ya existe — actualízalo in place, fase por fase.
- No dejes "Notas para retomar" vacío, genérico o desactualizado.
- No marques una clase como hecha si su código no se probó con ejecución real (o si no se pudo, sin que quede dicho explícitamente por qué) — ver `references/reglas-de-clase.md`.
