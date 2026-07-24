# Orquestador del curso

Esta carpeta es la salida del Skill de Claude Code `curso-desde-rf`, que convierte un documento de funcionalidades (RF) y una guía de aprendizaje en un curso completo con un proyecto real construido clase a clase.

**La definición completa y autoritativa de cómo se ejecuta cada fase está en:**
`.claude/skills/curso-desde-rf/SKILL.md` (y su carpeta `references/`).
Este archivo es solo el mapa de qué contiene `curso/` y en qué fase se genera cada cosa.

**Para saber en qué fase va el curso ahora mismo:** `curso/PROGRESS.md`.

## Documentos obligatorios para que el proceso funcione

**Entradas que provee el usuario:**
- `funcionalidades.md` (los RF del software)
- `guia_aprendizaje.md` (el ciclo pedagógico a seguir)

**Archivos del motor (parte de la instalación del Skill en `.claude/skills/curso-desde-rf/references/`, no del proyecto):**
- `checklists-auditoria.md`, `estado-progreso.md`, `simulaciones.md`, `orquestador-curso.md`, `formato-indice.md`, `formato-dependencias.md`, `formato-prioridad-rf.md`, `formato-conceptos-ensenados.md`, `reglas-de-clase.md`

Si falta una entrada del usuario, se le pide que la provea o complete. Si falta un archivo del motor, es un problema de instalación del Skill — se le indica cuál falta para restaurarlo.

## Cómo reutilizar el motor en un proyecto distinto

Todo lo que hay fuera de `.claude/skills/curso-desde-rf/` en la raíz del repositorio es específico de **este** proyecto:

- Los dos documentos de entrada (`funcionalidades.md`, `guia_aprendizaje.md`).
- **Toda la carpeta `curso/` completa** — `rf.md`, `prioridad-rf.md`, `stack.md`, `auditoria-stack.md`, `tareas.md`, `auditoria-tareas.md`, `dependencias.md`, `auditoria-dependencias.md`, `indice.md`, `auditoria-indice.md`, `simulaciones.md`, `conceptos-enseñados.md`, `PROGRESS.md`, `auditoria-final.md`, `clases/` y `app/` (el software real construido) — todos contienen RF, decisiones de stack, prioridades, clases o código reales de este proyecto concreto.

**Por diseño, `app/` vive dentro de `curso/` (`curso/app/`), no en la raíz del proyecto** — así todo el progreso generado (documentos y código) queda bajo una única carpeta. Borrar `curso/` completa reinicia el curso de punta a punta; no hace falta borrar una segunda carpeta aparte. Para empezar un curso distinto en el mismo repositorio, basta con borrar `curso/` y reemplazar `funcionalidades.md` (conservando o ajustando `guia_aprendizaje.md` según el nuevo proyecto).

La única excepción dentro de `curso/` es este mismo archivo (`00-orquestador.md`): es una copia de esta plantilla, se regenera solo si falta.

Lo único que se conserva y se reutiliza tal cual es `.claude/skills/curso-desde-rf/` (`SKILL.md` + `references/`) — es un motor de comportamiento, no está hecho para ningún stack, dominio o tipo de proyecto en particular. Ningún archivo ahí depende de una tecnología, un lenguaje o un dominio de negocio real: donde un archivo de `references/` muestra un nombre de tecnología concreto (un framework, un lenguaje, una librería) es siempre un ejemplo ilustrativo del formato, marcado como tal — nunca una tecnología que el motor asuma o requiera. El contenido real de cada RF, tarea, conocimiento y clase sale siempre de `funcionalidades.md`, `guia_aprendizaje.md` y de las decisiones que tome el usuario en la Fase 2, nunca de los ejemplos del motor.

## Mapa de fases → qué lee cada una → qué produce

| Fase | Qué hace | Lee | Genera / actualiza |
|------|----------|-----|---------------------|
| 0 | Localizar entradas y crear el estado inicial | `funcionalidades.md`, `guia_aprendizaje.md`, `curso/PROGRESS.md` (si ya existe, para retomar) | `curso/PROGRESS.md`, `curso/00-orquestador.md`, `curso/conceptos-enseñados.md` (vacío) |
| 1 | Extraer los RF con ID estable | `funcionalidades.md` | `curso/rf.md` |
| 1.5 | Ordenar los RF por importancia real para el software — Nivel 1 (checkpoint) | `curso/rf.md`, `references/formato-prioridad-rf.md` | `curso/prioridad-rf.md` |
| 2 | Preguntar el stack tecnológico por capas | `curso/rf.md` + respuesta del usuario | `curso/stack.md` |
| 3 | Auditar viabilidad y versiones reales del stack (checkpoint) | `curso/rf.md`, `curso/stack.md` + investigación real | `curso/auditoria-stack.md` |
| 4 | Desglosar cada RF en tareas concretas, el qué — Nivel 2, en orden de prioridad | `curso/rf.md`, `curso/prioridad-rf.md` | `curso/tareas.md` |
| 4.1 | Auditar huecos de tareas (checkpoint) | `curso/tareas.md`, `curso/rf.md` | `curso/auditoria-tareas.md` |
| 5 | Especificar cada tarea hasta el cómo, incluyendo qué necesita — Nivel 3 | `curso/tareas.md` | actualiza `curso/tareas.md` |
| 5.1 | Auditar que la especificación quede completa (checkpoint) | `curso/tareas.md` | `curso/auditoria-tareas.md` (sección aparte) |
| 6 | Recorrer las tareas Nivel 3 y armar el listado global de conocimientos | `curso/tareas.md` | `curso/dependencias.md` (listado) |
| 6.1 | Encadenar cada conocimiento recursivamente hasta lo básico | `curso/dependencias.md` | `curso/dependencias.md` (cadenas completas) |
| 6.2 | Auditar el listado de conocimientos (checkpoint) | `curso/dependencias.md`, `references/checklists-auditoria.md` | `curso/auditoria-dependencias.md` |
| 7 | Generar el índice en dos iteraciones: RF+tareas por valor, y conocimientos nuevos por RF agrupados en clases | `curso/prioridad-rf.md`, `curso/tareas.md`, `curso/dependencias.md`, `references/formato-indice.md` | `curso/indice.md` |
| 7.1 | Auditar que el índice llegue de punta a punta, sin huecos, con la BD real solo al final (checkpoint) | `curso/indice.md`, `curso/dependencias.md` | `curso/auditoria-indice.md` |
| 8 | Generar las clases de conocimiento y de construcción, una por una, siguiendo `curso/indice.md` | `curso/indice.md`, `curso/PROGRESS.md`, `curso/conceptos-enseñados.md`, `curso/dependencias.md`, `references/reglas-de-clase.md`, `guia_aprendizaje.md`, estado actual de `curso/app/` + investigación real por tema | `curso/clases/clase-NN-slug.md`, `curso/app/`, actualiza `curso/simulaciones.md`, `curso/conceptos-enseñados.md` y `curso/PROGRESS.md` |
| 9 | Bloque de integración de BD real: enseña la tecnología de persistencia y refactoriza cada RF, reemplazando la simulación | igual que la Fase 8, más `curso/simulaciones.md` (qué simulaciones resolver) | `curso/clases/clase-NN-slug.md`, `curso/app/` (refactor), actualiza `curso/simulaciones.md` |
| 10 | Auditoría final de todo el procedimiento | Todos los documentos de `curso/`, `references/checklists-auditoria.md` | `curso/auditoria-final.md` |

## Reglas transversales que aplican en varias fases a la vez

- **El curso se construye por importancia de RF** (`curso/prioridad-rf.md`), y las piezas de cada RF que compongan interfaz, lógica de servidor y persistencia (cuando el proyecto tiene esas capas) siguen ese orden cuando les toca construirse — pero las clases no se agrupan en bloques cerrados por RF: hay clases de conocimiento intercaladas.
- **Si el proyecto incluye persistencia real, es siempre lo último**: un bloque propio (Fase 9) que refactoriza todo lo ya construido para reemplazar la persistencia simulada.
- **Simulación:** cuando algo no se ha enseñado todavía pero hace falta para construir, se simula (dato falso, función vacía) en vez de bloquear. Análisis previo en `curso/dependencias.md` (Fase 6/6.1); registro operativo en `curso/simulaciones.md` (desde la Fase 8).
- **Chequeo recursivo de conocimiento:** ningún concepto se da por sabido sin confirmarlo contra `curso/conceptos-enseñados.md`; solo se detiene en conocimiento básico de programación. Ver `references/reglas-de-clase.md`.
- **Git:** proceso transversal desde la Clase 01 (init si es la primera, rama nueva + commit en el resto); publicar en GitHub requiere permiso explícito del usuario en el momento.
- **Patrones de diseño:** se aplican solo cuando resuelven un problema real de esa clase concreta.
- **Modelo de clases (POO):** el código del proyecto organiza sus entidades y responsabilidades en clases de programación, no en funciones sueltas.
- **Versiones de tecnologías:** siempre investigadas de verdad (con fuente y fecha).
- **Comentarios en el código:** todo código generado identifica con comentarios qué hace, qué entra y qué sale.
- **Sin proyecto de práctica separado:** el avance real en `curso/app/` es la única práctica de cada clase.

## Estructura de carpetas del repositorio

```
<raíz del proyecto>/
├── .claude/skills/curso-desde-rf/   ← el motor (SKILL.md + references/)
├── funcionalidades.md               ← entrada: RF originales
├── guia_aprendizaje.md              ← entrada: ciclo pedagógico
├── curso/                           ← esta carpeta: todo lo generado por el proceso
│   ├── 00-orquestador.md            ← este archivo
│   ├── PROGRESS.md
│   ├── rf.md
│   ├── prioridad-rf.md              ← Nivel 1
│   ├── stack.md
│   ├── auditoria-stack.md
│   ├── tareas.md                    ← Nivel 2/3
│   ├── auditoria-tareas.md
│   ├── dependencias.md
│   ├── auditoria-dependencias.md
│   ├── indice.md                    ← RF+tareas por valor + conocimientos por RF en clases
│   ├── auditoria-indice.md
│   ├── simulaciones.md
│   ├── conceptos-enseñados.md
│   ├── auditoria-final.md
│   ├── clases/
│   └── app/                         ← el software real, construido clase a clase (una rama de git por clase)
```

Borrar `curso/` completa reinicia el curso de punta a punta — documentos y código construido quedan bajo la misma carpeta, no hay una segunda carpeta que borrar aparte.
