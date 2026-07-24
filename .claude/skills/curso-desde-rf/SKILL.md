---
name: curso-desde-rf
description: Genera un curso de aprendizaje progresivo y completo a partir de un documento de requisitos funcionales/funcionalidades (RF) de un software y una guía pedagógica que define qué información investigar para enseñar cada concepto de forma completa. Orquesta el proceso completo — analiza los RF y los ordena por importancia real para el proyecto, pregunta el stack tecnológico, audita su viabilidad y versiones actuales, desglosa cada RF en tareas y las especifica hasta el cómo, extrae de esas tareas el listado completo de conocimientos necesarios y lo encadena hasta lo básico de programación, genera un índice de construcción que asigna cada conocimiento nuevo a su clase, y genera las clases una por una (conocimiento y construcción, con persistencia simulada hasta que todos los RF están cubiertos y recién ahí se integra la base de datos real, si el proyecto la necesita), llevando un registro de qué se enseñó y auditando el procedimiento completo al final. Usa este Skill SIEMPRE que el usuario tenga (o mencione) un documento de funcionalidades/RF junto a una guía de aprendizaje y quiera convertirlos en un curso, temario, índice de clases, desglose de tareas o plan de aprendizaje para construir ese software desde cero — incluso si no dice literalmente "curso" o "skill", por ejemplo "quiero aprender a construir esto", "genera el temario del proyecto", "desglosa las tareas del RF", "crea las clases", "audita el índice" o "sigue con el curso donde lo dejamos".
---

# Curso desde RF

Convierte un documento de funcionalidades (RF) y una guía de aprendizaje en un curso completo, progresivo, con teoría investigada de verdad y un proyecto real que se construye clase a clase. Es un proceso largo (probablemente varias sesiones): tu trabajo es orquestarlo con checkpoints claros, no intentar generarlo todo de una sentada.

## Por qué está diseñado así

Generar un curso completo de cero implica decenas de clases con investigación real, código de ejemplo y auditorías cruzadas. Eso no cabe en un solo turno ni en una sola ventana de contexto sin degradar la calidad. Por eso el flujo se apoya en estas ideas:

1. **Estado persistido en disco** (`curso/PROGRESS.md`), no en la conversación — así una sesión nueva puede retomar exactamente donde quedó la anterior.
2. **Checkpoints con el usuario** en cada auditoría — existen para detectar huecos antes de construir sobre ellos.
3. **Subagentes para investigación y para escribir cada clase**, para que el hilo principal se quede como orquestador ligero en vez de acumular en su propio contexto el resultado de treinta búsquedas web y treinta clases de código.
4. **El curso se construye por importancia de RF, no por tecnología.** El RF de más valor para el software se construye primero (Fase 1.5); cuando necesita algo que técnicamente se enseñaría más adelante, esa pieza se simula en vez de esperar su turno.
5. **Si el proyecto incluye persistencia real, es siempre lo último.** Todos los RF se construyen con persistencia simulada (datos en memoria); recién cuando todos están cubiertos se enseña la base de datos real y se refactoriza el proyecto entero de una sola vez.
6. **Ningún concepto se enseña sin confirmar antes que su propio prerrequisito también se enseñó** — el chequeo es recursivo y se apoya en un registro persistido (`curso/conceptos-enseñados.md`), no en la memoria de la conversación.

## Reglas de checkpoint (aplican a todo el Skill, no se repiten fase por fase)

Cada vez que una fase dice **"Checkpoint"**, es una barrera dura, no un aviso informativo:

- **Qué hacer**: mostrar el resumen relevante y esperar una confirmación explícita del usuario antes de tocar el archivo de la fase siguiente.
- **Qué NO hacer**: no avances a la fase siguiente por silencio del usuario, porque cambió de tema, porque preguntó otra cosa sin mencionar el checkpoint, o porque "parece obvio que está bien". Ninguna de esas cosas es una confirmación.
- **Cómo reconocer una confirmación válida**: una respuesta afirmativa directa a lo que se le mostró ("sí", "confirmo", "dale", "adelante", o una corrección puntual seguida de aprobación del resto).
- **Cómo NO reconocerla**: si el usuario corrige algo del checkpoint, eso no aprueba el resto — corrige lo señalado y vuelve a presentar el checkpoint completo.
- Si tienes dudas sobre si algo cuenta como confirmación, no la des por buena — pregunta explícitamente antes de avanzar.

## Fase 0 — Verificar requisitos, localizar entradas y retomar progreso

### 0.1 — Verificar que existen todos los documentos necesarios

El proceso completo depende de dos grupos de documentos distintos. Verifica ambos **antes de hacer cualquier otra cosa**.

**Entradas que provee el usuario (sin ellas, no hay nada que procesar):**
- `funcionalidades.md` (o equivalente) — debe tener contenido real: al menos una funcionalidad reconocible.
- `guia_aprendizaje.md` — debe describir de verdad qué información hay que investigar y recolectar para enseñar cada concepto de forma completa (no es una plantilla de secciones de clase — ver `references/reglas-de-clase.md`).

Si alguno de los dos falta, o existe pero está vacío / es claramente insuficiente: **detente y dilo explícitamente al usuario** — "este proceso no puede funcionar sin `<archivo>` completo; indícame dónde está, o complétalo/créalo, antes de que pueda continuar".

**Qué NO hacer nunca en esta fase**: no inventes ni completes tú el contenido de `funcionalidades.md` o `guia_aprendizaje.md` porque "es fácil de inferir" — son entradas del usuario, no tuyas.

**Archivos del motor (parte de la instalación del Skill, no del proyecto del usuario):**
`references/checklists-auditoria.md`, `references/estado-progreso.md`, `references/simulaciones.md`, `references/orquestador-curso.md`, `references/formato-indice.md`, `references/formato-dependencias.md`, `references/formato-prioridad-rf.md`, `references/formato-conceptos-ensenados.md`, `references/formato-tareas.md`, `references/reglas-de-clase.md`. Son obligatorios — cada uno lo cita una fase concreta más adelante. Si falta alguno, **detente y dilo al usuario de forma distinta al caso anterior**: la instalación del Skill en este proyecto está incompleta — indícale exactamente qué archivo falta.

### 0.2 — Localizar entradas y retomar progreso

1. Comprueba si ya existe `curso/PROGRESS.md`. Si existe, léelo: te dice en qué fase se quedó el proceso la última vez (ver `references/estado-progreso.md`). **Retoma desde ahí en vez de volver a empezar.**
2. Si no existe, créalo de inmediato con el esqueleto de `references/estado-progreso.md`, crea `curso/00-orquestador.md` con el contenido de `references/orquestador-curso.md`, y crea el esqueleto vacío de `curso/conceptos-enseñados.md` (solo el encabezado de tabla) — todo antes de tocar la Fase 1. Si `curso/00-orquestador.md` ya existe de una sesión anterior, no lo regeneres salvo que la estructura de fases/archivos del Skill haya cambiado.

**Qué NO hacer**: si `curso/PROGRESS.md` ya existe, no lo sobrescribas ni lo recrees desde cero — actualízalo in place. No asumas que una fase con checkpoint está confirmada porque el archivo existe en disco; si `PROGRESS.md` no dice explícitamente que el usuario confirmó, trátala como pendiente.

## Fase 1 — Analizar `funcionalidades.md`

Lee el documento completo. Extrae cada funcionalidad como un ítem con ID estable `RF-01`, `RF-02`... Numera de forma correlativa a lo largo de todo el documento (no reinicies por sección). Conserva los encabezados de sección como agrupación visual dentro de `curso/rf.md`. **Esta numeración es de identificación, no de importancia** — el orden real de construcción se decide en la Fase 1.5.

Si un bullet trae sub-bullets, sepáralos en RF independientes cuando cada sub-punto sea algo que una auditoría de cobertura pueda necesitar verificar por separado. Si son solo detalle de un mismo requisito indivisible, mantenlos como un único RF.

Escribe `curso/rf.md` con la lista numerada. No reformules el alcance de cada RF — transcribe fielmente lo que pide el documento.

**Qué NO hacer**: no inventes ningún RF que no esté, explícita o implícitamente, en `funcionalidades.md`. No omitas ningún bullet sin justificar por qué no se convirtió en RF. No cambies el alcance de un RF para que "encaje mejor" con un stack que todavía no se ha elegido.

## Fase 1.5 — Ordenar los RF por importancia (Nivel 1 del plan de construcción)

Antes de preguntar nada de tecnología, decide el orden en el que se va a **construir** el proyecto: qué RF importa más para el software terminado, no qué RF es más fácil de enseñar primero. Sigue `references/formato-prioridad-rf.md` para el criterio completo (funcionalidad núcleo del producto, visibilidad para el usuario final, qué tanto habilita a otras funcionalidades, y al final lo que es puro soporte/robustez) y el formato exacto de la tabla.

Escribe `curso/prioridad-rf.md`. Este orden es el que heredan `curso/tareas.md` (Fase 4) y `curso/indice.md` (Fase 7).

**Qué NO hacer**: no ordenes por lo que resulte más cómodo de secuenciar técnicamente. No decidas el orden en silencio sin mostrárselo al usuario.

**Checkpoint:** muestra la tabla completa al usuario y espera confirmación (o su propio reordenamiento) antes de pasar a la Fase 2.

## Fase 2 — Preguntar el stack tecnológico

Ya sabes, por la Fase 1, qué capas necesita el proyecto (¿backend?, ¿frontend?, ¿persistencia?, ¿autenticación?, ¿integraciones externas?, ¿tareas en segundo plano?). Pregunta el stack **desglosado por esas capas de alto nivel**, no de forma genérica.

Dos reglas para no sobre-preguntar:

- **Una pregunta por capa de alto nivel, no por cada librería secundaria dentro de ella.** Decisiones finas se resuelven más adelante, al generar el índice (Fase 7) o la clase correspondiente (Fase 8).
- **Si un RF ya nombra una tecnología explícita**, no la conviertas en pregunta abierta — trátala como decisión ya tomada y pásala directo a `curso/stack.md`, con confirmación de una línea.

Usa AskUserQuestion cuando haya opciones discretas razonables. Registra la respuesta en `curso/stack.md`.

**Qué NO hacer**: no elijas tú el stack sin preguntar. No sigas a la Fase 3 sin haber registrado la respuesta en `curso/stack.md`.

## Fase 3 — Auditar viabilidad y versiones

Para cada RF de `curso/rf.md`, evalúa si el stack elegido puede implementarlo.

- Si **no es viable**: investiga (WebSearch/WebFetch, o un subagente si son varias tecnologías) alternativas **gratuitas** y preséntaselas al usuario como recomendación, no como decisión tomada.
- Para cada tecnología, **investiga la versión estable más actual real** — nunca de memoria. Anota versión + fecha + fuente.

Escribe `curso/auditoria-stack.md`: tabla RF → tecnología → viable (sí/no/con matiz) → detalle del matiz → alternativa si aplica → versión verificada → fuente. Usa `references/checklists-auditoria.md` § Auditoría de viabilidad y versiones.

- **Viable con matiz:** cuando algo funciona pero con una limitación real que el usuario debería conocer — no lo redondees a "sí", explica la limitación y súbela al checkpoint.
- **Fuentes que se contradicen:** documenta la contradicción explícitamente; si hay una opción donde coinciden sin ambigüedad, recomiéndala por eso.

**Checkpoint:** muestra el resumen y espera confirmación antes de continuar.

## Fase 4 — Desglosar tareas (Nivel 2)

Para cada RF, **en el orden fijado por `curso/prioridad-rf.md`**, desglosa las tareas necesarias para realizarlo — el **qué**, todavía no el cómo. Etiqueta cada tarea con el/los `RF-XX` que satisface. Escribe `curso/tareas.md` con IDs `T-01`, `T-02`... **en el mismo orden de prioridad**.

**Cada tarea es una responsabilidad única, aplicando el criterio de división de `references/formato-tareas.md` desde la primera pasada** — no un desglose grueso a refinar después. Antes de dar la Fase 4 por terminada, relee cada tarea buscando conjunciones ("y", "/", comas) que unan dos reglas o comportamientos distintos, y sepáralas. Esto es obligatorio en todo proyecto, no una corrección puntual que dependa de que el usuario lo pida.

### 4.1 — Auditar huecos de tareas

Verifica que todo `RF-XX` tenga al menos una tarea. Revisa que ninguna tarea esconda varios RF sin desglosar, que ninguna dependa de una tecnología que no aparece en `curso/stack.md`, y que ninguna tarea siga bundled (una conjunción uniendo dos reglas) — ver `references/formato-tareas.md` § Criterio de división. Reporta huecos en `curso/auditoria-tareas.md`. Usa `references/checklists-auditoria.md`.

**Checkpoint:** corrige huecos, confirma con el usuario.

## Fase 5 — Especificar tareas hasta el cómo (Nivel 3)

Expande cada tarea con el detalle necesario para que sea accionable en una clase concreta: qué archivos/piezas toca, qué decisiones técnicas implica, y **qué necesita** para poder hacerse — este campo es el que alimenta el listado global de conocimientos de la Fase 6. Sigue siendo texto de especificación, no código todavía.

Esta expansión **actualiza las tareas ya existentes en `curso/tareas.md`** — no crea un archivo separado.

### 5.1 — Auditar especificación completa

Verifica que toda tarea tenga su especificación hasta el cómo, con el campo "qué necesita" en formato consistente. Reporta en `curso/auditoria-tareas.md` (sección aparte). Usa `references/checklists-auditoria.md`.

**Checkpoint:** corrige lo que falte, confirma con el usuario antes de pasar a la Fase 6.

## Fase 6 — Listado global de conocimientos

Recorre **todas** las tareas Nivel 3, en su orden de prioridad, y anota, sin repetir, cada conocimiento/herramienta concreto que alguna necesita — un mismo conocimiento usado por varias tareas aparece una sola vez, con la lista de qué tareas lo usan. Sigue `references/formato-dependencias.md`.

### 6.1 — Encadenamiento recursivo

Cada conocimiento del listado se descompone en lo que hace falta saber para tenerlo, y eso a su vez en lo que le hace falta a *eso*, encadenando hacia atrás (`←`) hasta llegar a una noción básica de programación (variables, funciones, condicionales, bucles) o a un punto sin más prerrequisitos dentro del curso. Para cada eslabón todavía no cubierto en ese punto del curso, decide si se puede simular y cómo.

Escribe `curso/dependencias.md` con el listado completo y sus cadenas.

### 6.2 — Auditar el listado

Verifica que cada conocimiento esté descrito de forma singular y completa (investigado con fuente real cuando haga falta precisión), que toda cadena llegue a un punto de corte válido, y que todo eslabón no cubierto tenga una respuesta explícita de simulación. Escribe `curso/auditoria-dependencias.md`. Usa `references/checklists-auditoria.md`.

**Checkpoint:** muestra el resumen al usuario. Si algún conocimiento genuinamente no se puede simular (caso raro), preséntalo como hallazgo explícito para que el usuario decida — nunca lo resuelvas moviendo `curso/prioridad-rf.md` en silencio.

## Fase 7 — Generar el índice de construcción

Con el listado de conocimientos ya auditado, genera `curso/indice.md` siguiendo `references/formato-indice.md`: una **secuencia única y numerada de clases** (Clase 1, Clase 2...), nunca dos secciones separadas de "RF+tareas" y "conocimientos". El método para llegar ahí tiene dos pasos, pero el documento final es una sola lista:

1. **Copiar las tareas de `curso/tareas.md` tal cual y dividirlas en clases de construcción**, respetando dentro de cada RF el orden interfaz → backend → conexión (la conexión siempre va al final porque depende de que ambas existan).
2. **Intercalar clases de conocimiento inmediatamente antes de la construcción que las necesita por primera vez** — nunca antes de tiempo, nunca agrupando dos conocimientos que hacen falta para construcciones distintas y no consecutivas, aunque estén relacionados temáticamente. Un conocimiento ya enseñado se marca "reutiliza Clase N" en vez de repetirse. La persistencia real nunca ocupa una clase numerada — todo el curso usa persistencia simulada hasta el bloque final de la Fase 9.

El índice es el **resultado** de este análisis, no una transcripción del razonamiento que lo produjo — nunca se redacta como diálogo de preguntas y respuestas, ni como dos listas separadas.

**Qué NO hacer**: no escribas código, teoría ni explicación dentro del índice. No repitas una clase de conocimiento ya dictada. No agrupes conocimientos que hacen falta en momentos de construcción distintos solo porque son del mismo tema — ver `references/formato-indice.md` § Regla de agrupación de conocimientos.

### 7.1 — Auditar el índice de punta a punta

Verifica, usando el checklist completo de `references/formato-indice.md` § Fase 7.1: que las 51 (o las que correspondan) tareas aparecen exactamente una vez sin alterar su texto; que cada clase de construcción respeta el orden interfaz→backend→conexión; que **ninguna clase de conocimiento agrupa dos conocimientos que hacen falta para construcciones distintas**; que para cada clase de construcción, todo lo que necesita ya se enseñó en una clase anterior o está marcado "reutiliza Clase N" — se parte de cero, pero cero relativo a lo que hace falta para la próxima construcción, ni más ni menos (puede hacer falta enseñar varias cosas antes de poder construir un RF, eso es esperado); y que la persistencia real aparece únicamente después de la última clase numerada.

Escribe el resultado en `curso/auditoria-indice.md`. Si no hay hallazgos, dilo explícitamente. Si hay un hueco, corrígelo en `curso/indice.md` antes del checkpoint.

**Checkpoint:** confirma con el usuario antes de pasar a la Fase 8 — el índice confirmado es lo que la generación de clases sigue directamente, sin volver a validarlo después.

## Fase 8 — Generar las clases

Recorre `curso/indice.md` en el orden **estricto** en que quedó confirmado — cada clase parte del estado de código que dejó la anterior en `curso/app/`, así que no se generan en paralelo ni fuera de orden. Las clases **no se agrupan en bloques cerrados por RF**: hay clases de **conocimiento** (enseñan una pieza necesaria, sin construir un RF completo ahí mismo, y a veces sirven para varios RF futuros a la vez) intercaladas con clases de **construcción** (usan lo ya enseñado para construir la tarea/RF correspondiente, siguiendo dentro de esa construcción el orden de capas que tenga el proyecto real — típicamente interfaz, luego lógica de servidor, luego persistencia simulada si el proyecto las tiene).

Para cada clase pendiente (consulta `curso/PROGRESS.md` para saber cuál sigue), sigue **todas** las reglas de `references/reglas-de-clase.md`: arranca directo en el tema (sin bloque de metadatos ni justificar su lugar en el curso citando RF-XX/T-XX/número de Clase — esa trazabilidad ya vive en `curso/indice.md` y `curso/PROGRESS.md`), git antes de generar código, chequeo recursivo de conocimiento contra `curso/conceptos-enseñados.md` en cada paso que lo necesite, modelo de clases (POO) para el código nuevo, patrones de diseño solo si son eficientes, pasos conectados que declaran qué/cómo/dónde, ejecución real (nunca fabricada), git después de codear.

**La línea del índice es solo un rótulo — nunca la única fuente para escribir una clase.** Antes de escribir el contenido de cualquier clase:
- Si es una clase de **construcción**, lee la especificación Nivel 3 completa de cada `T-XX` que va a construir en `curso/tareas.md` (Dónde/Implica/Necesita, más el Modelo de datos y las Decisiones técnicas transversales del mismo archivo) — el código de estado HTTP, la forma exacta del dato y los nombres de campo salen de ahí, nunca se inventan ni se reconstruyen de memoria a partir del rótulo del índice.
- Toda clase (conocimiento o construcción) que use una tecnología del stack confirma su versión exacta contra `curso/stack.md`/`curso/auditoria-stack.md` antes de escribir código — no asumas ni una versión ni una API de memoria.
- **Qué NO hacer**: no generes el contenido de una clase leyendo solo su línea en `curso/indice.md` — esa línea alcanza para saber qué toca enseñar/construir y en qué orden, no para saber el código de estado, la forma del dato o la versión exacta de la tecnología.

Además, en cada clase:
- Escribe el archivo en `curso/clases/clase-NN-slug.md`.
- Si la clase construye algo, integra el avance directamente en `curso/app/` (con persistencia simulada si la tarea todavía no llegó al bloque de BD real), avanzando la(s) tarea(s) correspondientes de `curso/tareas.md`.
- Si la clase enseña algo por primera vez, agrega la fila correspondiente a `curso/conceptos-enseñados.md` antes de cerrarla.
- Si la clase introduce una simulación (de construcción o de explicación), regístrala en `curso/simulaciones.md` en el momento en que se introduce.
- Actualiza `curso/PROGRESS.md` marcando esta clase como hecha, con su tipo (conocimiento/construcción), antes de pasar a la siguiente.

Puedes delegar la redacción completa de una clase a un subagente si el contexto principal se está cargando, pero hazlo de una clase en una llamada, en primer plano, esperando su resultado antes de lanzar la siguiente.

**Checkpoint ligero:** cada 3-5 clases, o cuando se introduzca una tecnología o patrón nuevo importante, muestra al usuario un resumen breve de lo generado.

## Fase 9 — Bloque de integración de base de datos real

Cuando todos los RF ya completaron su ciclo con persistencia simulada (si el proyecto incluye persistencia — no todo software la necesita), se abre este bloque: enseña la tecnología de persistencia elegida en `curso/stack.md` (con el mismo nivel de profundidad que cualquier conocimiento nuevo, siguiendo `references/reglas-de-clase.md`), y luego recorre **RF por RF**, refactorizando cada uno para reemplazar la simulación en memoria por la implementación real.

Cada clase de este bloque:
- Sigue las mismas reglas de clase (§ `references/reglas-de-clase.md`) y el mismo chequeo recursivo de conocimiento.
- Al reemplazar una simulación, marca la fila correspondiente en `curso/simulaciones.md` como `Resuelta en clase NN` en el momento exacto en que el reemplazo real queda en el código (idealmente verificado con ejecución real).
- Actualiza `curso/PROGRESS.md` igual que en la Fase 8.

**Qué NO hacer**: no cierres este bloque con alguna simulación de persistencia todavía `Pendiente` en `curso/simulaciones.md` — si eso pasa, es un hueco que hay que resolver antes de dar la Fase 9 por terminada, no una nota para la auditoría final.

## Fase 10 — Auditoría final del procedimiento

Cuando el bloque de la Fase 9 esté completo, audita el procedimiento entero contra `references/checklists-auditoria.md` § Auditoría final del procedimiento: ¿todo RF tiene tarea y quedó reflejado en el índice? ¿toda clase generada cumple `references/reglas-de-clase.md`? ¿las versiones de `curso/auditoria-stack.md` se investigaron de verdad? ¿`curso/PROGRESS.md` refleja fielmente lo que hay en disco? ¿toda simulación de `curso/simulaciones.md` terminó resuelta o quedó explícitamente justificado por qué no? ¿`curso/conceptos-enseñados.md` tiene una fila por cada concepto realmente enseñado, sin huecos ni repeticiones sin marcar como profundización?

Escribe `curso/auditoria-final.md` con el resultado y cualquier acción pendiente.

## Notas de comportamiento

- **Que el usuario entienda es la regla fundamental de todo el Skill, nunca se rompe.** Tiene una definición operativa (no una aspiración vaga): explicar el porqué, no solo el qué; nunca usar un término técnico antes de definirlo en simple; todo concepto nuevo con un ejemplo aplicado; conectar con lo ya sabido; aplicar el test de Feynman antes de dar una explicación por cerrada; priorizar la transferencia (qué pasaría si cambiara algo) sobre la repetición. Ver `references/reglas-de-clase.md` § Regla fundamental para el detalle completo y las fuentes.
- Todo el contenido generado va en español, igual que los documentos de entrada.
- No inventes versiones, APIs o comportamiento de librerías que no hayas verificado — cuando no puedas verificar algo con investigación real, dilo explícitamente en vez de rellenar.
- **Todo el código generado (en clases y en `curso/app/`) lleva comentarios que identifican qué hace, qué entra y qué sale.**
- El código del proyecto se organiza con **modelo de clases (POO)** para cada entidad o responsabilidad real — no con funciones sueltas mezcladas sin estructura.
- No se construye un proyecto de práctica separado — el avance real en `curso/app/` es la única práctica.
- Si el usuario pide "sigue con el curso" o similar sin más contexto, empieza siempre por la Fase 0 (leer `curso/PROGRESS.md`) antes de preguntar nada.
- **El curso se construye por importancia de RF, nunca por comodidad técnica de enseñanza.** Cuando algo no se puede enseñar todavía porque le toca más adelante, se simula — nunca se reordena `curso/prioridad-rf.md` en silencio. La única excepción es un hallazgo genuino de "no se puede simular" (Fase 6.2), que siempre se lleva al usuario en checkpoint.
- **Si el proyecto incluye persistencia real, es siempre el último bloque del curso (Fase 9)** — ningún RF individual introduce persistencia real antes de que todos los RF estén cubiertos con persistencia simulada.
- **Este Skill es un motor de comportamiento, no está hecho para ningún stack, dominio o tipo de proyecto en particular.** No asumas nunca que el proyecto en curso usa alguna tecnología, lenguaje o arquitectura concreta salvo que `curso/stack.md` (Fase 2, ya confirmado con el usuario) lo diga. Cualquier nombre de tecnología concreto que aparezca en `references/` (un framework, un lenguaje, una librería) es siempre un ejemplo ilustrativo del formato de un documento — nunca una dependencia real del motor ni algo que debas copiar a un proyecto real. Esto aplica igual de fuerte a un proyecto de línea de comandos, una librería, un juego o un sistema embebido que a una aplicación web — no fuerces la forma de "interfaz + servidor + persistencia" si el proyecto real no la tiene.
- **Ningún concepto se da por sabido sin confirmarlo contra `curso/conceptos-enseñados.md`.** El chequeo es recursivo: si lo que se va a enseñar depende de algo que tampoco está registrado, se enseña primero eso, y así hacia atrás, hasta conocimiento básico de programación (que se asume siempre, nunca se enseña ni se registra).
- **No hay plantilla fija de clase.** Cada clase sigue las reglas de `references/reglas-de-clase.md`: git antes/después del código, modelo de clases, patrones de diseño solo si son eficientes, pasos conectados con propósito/acción/ubicación explícitos.
- **Toda tarea Nivel 2 es una responsabilidad única, desde la primera pasada.** Aplica siempre el criterio de división de `references/formato-tareas.md` (¿esta tarea describe más de una regla/comportamiento que podría faltar de forma independiente?) — no entregues un desglose grueso a la espera de que el usuario pida que lo refines.
- Referencias disponibles: `references/reglas-de-clase.md` (reglas de cada clase), `references/checklists-auditoria.md` (checklists de cada auditoría), `references/estado-progreso.md` (formato de `curso/PROGRESS.md`), `references/simulaciones.md` (formato de `curso/simulaciones.md`), `references/orquestador-curso.md` (formato de `curso/00-orquestador.md`), `references/formato-indice.md` (formato de `curso/indice.md`, Fases 7 y 7.1), `references/formato-dependencias.md` (formato de `curso/dependencias.md`, Fases 6/6.1/6.2), `references/formato-prioridad-rf.md` (formato de `curso/prioridad-rf.md`, Fase 1.5), `references/formato-conceptos-ensenados.md` (formato de `curso/conceptos-enseñados.md`), `references/formato-tareas.md` (formato y criterio de división de `curso/tareas.md`, Fases 4/4.1/5/5.1).
- Cada fase tiene un archivo de salida explícito (ver la tabla de `curso/00-orquestador.md`) — si generas contenido de una fase y no tienes claro en qué archivo va, pregunta/definilo consistentemente en vez de improvisar sesión a sesión.
- **Sobre Git (Fase 8, y Fase 9):** el hábito de rama nueva + commit es automático en cada clase. Publicar en GitHub como remoto (crear repositorio, hacer `push`, abrir un pull request) siempre requiere permiso explícito del usuario en el momento — no es parte del flujo automático de una clase. Antes de cualquier operación de git que pueda descartar trabajo, revisa `git status` primero.
- **Nunca fabriques un resultado de ejecución.** Si en algún punto no pudiste verificar algo con una acción real, dilo explícitamente en el documento correspondiente.
