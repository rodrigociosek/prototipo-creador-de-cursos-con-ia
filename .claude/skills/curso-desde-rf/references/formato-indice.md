# Formato de `curso/indice.md` (Fase 7)

Este documento es una **secuencia única y numerada de clases** — no dos listas separadas. Es el resultado final de todo el análisis previo (prioridad de RF, tareas, listado de conocimientos): en qué orden exacto se enseña y se construye cada cosa. Es lo que la Fase 8 sigue directamente, clase por clase — cumple la función de plan de clases sin que exista un documento aparte con ese nombre.

## Propósito

Reunir en un solo lugar, ya resuelto, el paso a paso completo de construcción y aprendizaje: qué clase enseña qué, qué clase construye qué, y en qué orden exacto. La IA no razona esto de nuevo al leer el índice — el razonamiento (qué RF importa más, en qué tareas se descompone, qué conocimiento requiere cada una, cómo se encadenan) ya ocurrió en `curso/prioridad-rf.md`, `curso/tareas.md` y `curso/dependencias.md`; acá se muestra únicamente el resultado, en el orden en que se va a ejecutar.

## Construcción en dos pasos (el resultado es una única secuencia, no dos secciones)

Los "dos pasos" de abajo son el **método** para llegar al resultado — no se muestran como dos secciones separadas en el documento final. El documento final es una sola lista de clases numeradas correlativamente (Clase 1, Clase 2, Clase 3...), cada una marcada `[Conocimiento]` o `[Construcción — interfaz/backend/conexión]`.

### Paso 1 — Copiar las tareas y dividirlas en clases de construcción

Toma las 51 (o las que correspondan) tareas de `curso/tareas.md` **tal cual están** — no se reformulan, no se resumen, no se inventan — y agrúpalas en clases de construcción, respetando el orden de capas dentro de cada RF: **interfaz primero, backend después, conexión al final** (la conexión siempre depende de que interfaz y backend ya existan, así que nunca puede ir antes de ninguno de los dos). Agrupa varias tareas en una misma clase de construcción cuando son del mismo tipo/capa y siguen naturalmente una a la otra (p. ej. varias validaciones del mismo endpoint); usa una clase de construcción separada cuando una tarea puntual necesita un conocimiento nuevo que las demás tareas del grupo no necesitan (ver Paso 2).

**Auditoría de este paso (parte de la Fase 7.1)**: verificar que **todas** las tareas de `curso/tareas.md` aparecen en el índice exactamente una vez, sin alterar su texto, y que quedaron agrupadas en clases de construcción coherentes con el orden de capas.

### Paso 2 — Intercalar las clases de conocimiento entre las de construcción

Para cada clase de construcción, revisa qué conocimientos de `curso/dependencias.md` necesitan sus tareas. Si algún conocimiento todavía no se enseñó, inserta una (o más) clase de conocimiento **inmediatamente antes** de esa clase de construcción — nunca antes de tiempo (no se enseña nada que no haga falta para la construcción que sigue de inmediato), nunca después (todo lo que una construcción necesita ya está enseñado cuando le toca).

**Regla de agrupación de conocimientos — la más importante de esta fase**: agrupa dos conocimientos en la misma clase **solo si ambos hacen falta para la misma construcción inmediatamente siguiente**. Si dos conocimientos del listado de `curso/dependencias.md` parecen relacionados pero uno hace falta para una construcción y el otro recién para una construcción posterior (p. ej. uno para la interfaz y el otro recién para la conexión con el backend, varias clases después), **van en clases de conocimiento separadas**, cada una justo antes de la construcción que realmente la necesita — agruparlos porque "son del mismo tema" sin fijarse en cuándo hace falta cada uno es el error más común de esta fase.

Cuando un conocimiento ya se enseñó para una construcción anterior y una construcción posterior lo vuelve a necesitar, no se repite la clase — se anota "reutiliza Clase N".

## Formato

Este es el formato del motor — aplica igual sin importar el dominio o el stack del proyecto real. Genera siempre el contenido a partir de `curso/prioridad-rf.md`, `curso/tareas.md` y `curso/dependencias.md` del proyecto en curso.

**Ejemplo ilustrativo** (dominio y stack ficticios, solo para mostrar el formato):

```markdown
# Índice de construcción — [nombre del proyecto]

**Objetivo del proyecto:** [una frase]

**Transversal (no ocupa clase propia):** Git — uso mecánico desde la Clase 1.

## RF-03 — [funcionalidad núcleo, ejemplo ficticio] (prioridad 1)

- **Clase 1** — [Conocimiento] Framework de interfaz elegido y sus componentes.
- **Clase 2** — [Conocimiento] Formulario controlado en el framework de interfaz.
- **Clase 3** — [Construcción — interfaz] T-03 (formulario de nueva entidad).
- **Clase 4** — [Conocimiento] Framework de servidor elegido y sus rutas.
- **Clase 5** — [Conocimiento] Persistencia simulada — crear/leer un registro.
- **Clase 6** — [Construcción — backend] T-01, T-02 (endpoint de creación + validación).
- **Clase 7** — [Conocimiento] Peticiones HTTP desde el frontend.
- **Clase 8** — [Construcción — conexión] T-04 (conectar el formulario con el backend).

## RF-01 — [funcionalidad secundaria, ejemplo ficticio] (prioridad 2)

Sin conocimientos nuevos — reutiliza Clase 2 y Clase 4.

- **Clase 9** — [Construcción — interfaz] T-08.
- **Clase 10** — [Construcción — backend] T-07.
```

## Qué NO hacer

- No muestres "Iteración 1" / "Iteración 2" (o cualquier nombre equivalente) como secciones del documento final — eso es el método, el resultado es una sola secuencia de clases numeradas.
- No agrupes dos conocimientos en la misma clase si hacen falta para construcciones distintas y no consecutivas — cada uno va justo antes de la construcción que lo necesita, aunque estén relacionados temáticamente.
- No reordenes ni reformules una tarea de `curso/tareas.md` al copiarla al índice.
- No asignes una clase de construcción de "conexión" antes de que existan sus clases de construcción de interfaz y de backend correspondientes.
- No escribas teoría, código ni explicación dentro del índice — eso pertenece a la clase misma (Fase 8); acá solo va qué se enseña/construye y en qué orden.
- No asignes persistencia real a ninguna clase numerada — siempre es persistencia simulada hasta el bloque final de integración de BD (sin numerar junto al resto, se detalla recién en la Fase 9).
- No repitas una clase de conocimiento ya dictada — cuando una construcción posterior reutiliza un conocimiento, anota "reutiliza Clase N", no vuelvas a enseñarlo.

## Fase 7.1 — Auditoría de punta a punta

Con el índice ya escrito, verifica:

- [ ] **Todas** las tareas de `curso/tareas.md` aparecen en el índice, exactamente una vez cada una, sin alterar su texto (Paso 1).
- [ ] Toda tarea quedó agrupada en una clase de construcción marcada `interfaz`, `backend` o `conexión`, respetando ese orden dentro de cada RF.
- [ ] Todo conocimiento de `curso/dependencias.md` tiene su clase asignada, **inmediatamente antes** de la primera construcción que lo necesita — no antes de tiempo, no después.
- [ ] **Ninguna clase de conocimiento agrupa dos conocimientos que hacen falta para construcciones distintas** — revisar una por una las clases de conocimiento agrupadas (con más de un conocimiento) y confirmar que ambos preceden a la misma clase de construcción inmediata siguiente.
- [ ] Para cada clase de construcción, todo lo que sus tareas necesitan (según `curso/dependencias.md`) ya fue enseñado en una clase de número menor, o está marcado explícitamente "reutiliza Clase N" — se parte de cero al principio del curso, pero "cero" significa exactamente lo que hace falta para la próxima construcción, ni más ni menos; puede hacer falta enseñar varias cosas antes de poder construir un RF, y eso está bien — lo que no puede pasar es que una construcción llegue sin que algo que necesita ya se haya enseñado.
- [ ] Ningún conocimiento se repite en una clase nueva si ya se enseñó antes — las reapariciones dicen "reutiliza Clase N".
- [ ] La persistencia real aparece únicamente en el bloque final, después de la última clase numerada, cuando todos los RF ya completaron su ciclo con persistencia simulada.

Si no hay hallazgos, dilo explícitamente ("sin hallazgos, índice validado de punta a punta"). Si hay un hueco, corrígelo en `curso/indice.md` antes del checkpoint. Escribe el resultado en `curso/auditoria-indice.md`.

**Checkpoint:** muestra el resultado de esta auditoría al usuario y espera confirmación antes de pasar a la Fase 8 — el índice confirmado es lo que la generación de clases sigue directamente, sin volver a validarlo después.
