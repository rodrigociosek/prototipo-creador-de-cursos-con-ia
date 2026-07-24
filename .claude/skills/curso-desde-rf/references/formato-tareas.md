# Formato de `curso/tareas.md` (Fases 4, 4.1, 5 y 5.1)

Un solo archivo cubre los dos niveles: Nivel 2 (el qué, Fase 4) y su especificación Nivel 3 (el cómo, Fase 5) — la Fase 5 amplía este mismo archivo in place, nunca crea uno nuevo.

## Nivel 2 — El qué (Fase 4)

### Propósito

Cada RF se descompone en tareas atómicas — responsabilidades únicas que, si faltaran, una auditoría de cobertura pudiera señalar como un hueco concreto y aislado. Esta atomicidad es la que después permite: auditar huecos con precisión (Fase 4.1), extraer un listado de conocimientos sin ambigüedad (Fase 6), y asignar cada pieza a la clase que le corresponde en el índice (Fase 7).

### Criterio de división (obligatorio, no opcional)

Para cada tarea que escribas, hacé siempre la misma pregunta de corte:

> ¿Esta tarea, tal como está redactada, describe **más de una** regla o comportamiento que podrían faltar de forma independiente uno del otro?

- **Sí** → sepárala en tantas tareas como reglas/comportamientos distintos contenga.
- **No, pero seguir dividiendo exigiría nombrar una técnica, librería o estructura de código concreta** → detente ahí, eso ya es Nivel 3 (Fase 5), no Nivel 2.
- **No, y dividir más solo partiría un mismo campo/acción en fragmentos sin ninguna regla propia** (p. ej. separar "el campo título" de "el campo descripción" de un mismo formulario, cuando ninguno tiene una regla de validación distinta) → detente ahí también, es sobre-fragmentación, no aporta nada a la auditoría.

### Qué hacer

- **Escribe la primera versión ya con este criterio aplicado.** No generes un desglose grueso "para ir rápido" con la intención de refinarlo si el usuario se queja — el resultado de la primera pasada debe ser el mismo que el de una pasada final. Aplicar este criterio no es opcional ni depende de que el usuario lo pida.
- **Antes de cerrar la Fase 4, relee cada tarea una por una buscando conjunciones** ("y", "/", comas que unen conceptos distintos dentro del mismo texto) — es la señal más confiable de que hay dos reglas escondidas en una tarea.
- **Separa por operación cuando una misma regla aplica a varias acciones distintas.** Si "validar que la tarea pertenece al usuario dueño" aplica a editar, completar y eliminar, son tres tareas — una por operación — porque cada una es un endpoint/acción distinto que podría implementarse sin esa validación sin que se note en las otras.
- **Separa la validación de la operación que valida.** "Crear el recurso" y "rechazar la entrada si falta un campo obligatorio" son dos comportamientos distintos — el segundo puede faltar sin que falte el primero.
- **Separa campos opcionales distintos entre sí cuando cada uno tiene su propio propósito.** Dos campos que disparan comportamientos distintos (uno es un dato de contacto, el otro programa un recordatorio) van en tareas separadas, aunque el documento de funcionalidades los mencione en la misma frase.

### Qué NO hacer

- No redactes una tarea con "y" uniendo dos verbos de acción o dos reglas distintas.
- No agrupes "crear/exponer algo" con "validar algo sobre eso" en una sola tarea.
- No fragmentes un mismo campo o acción en varias tareas si no tienen ninguna regla o comportamiento distinto entre ellas — eso no ayuda a ninguna auditoría, solo infla el conteo.
- No nombres una librería, función, patrón de diseño o estructura de código dentro de una tarea Nivel 2 — en cuanto una tarea menciona "usando tal librería" o "con una función que hace tal cosa", se pasó de nivel; eso pertenece a la Fase 5.
- No entregues un desglose Nivel 2 al checkpoint de la Fase 4.1 sin haber pasado vos mismo el chequeo de "¿hay una conjunción escondiendo dos reglas?" sobre cada tarea — no dependas de que el usuario lo detecte y te lo pida de nuevo.

### Ejemplo (antes/después de aplicar el criterio)

Antes — tarea bundled, incorrecta:

> T-XX — Endpoint de backend de registro (valida email/contraseña, hashea la contraseña, guarda el usuario).

Después — aplicando el criterio, correcta:

> T-17 — Endpoint de backend de registro.
> T-18 — Validar formato de email al registrar.
> T-19 — Validar requisitos mínimos de la contraseña al registrar.
> T-20 — Evitar registrar un email que ya existe (email único).
> T-21 — Guardar la contraseña de forma segura, no en texto plano.

Cada una de las cinco puede faltar en la implementación real sin que falten las otras cuatro — por eso son cinco tareas, no una. Ninguna nombra una librería concreta (el "cómo" de "guardar la contraseña de forma segura" es trabajo de la Fase 5).

### Formato

```markdown
# Tareas — Nivel 2 (el qué)

En el orden de curso/prioridad-rf.md. Cada tarea es una responsabilidad única.

## RF-XX — [nombre del RF]

- **T-01** — [una responsabilidad única]
- **T-02** — [otra responsabilidad única]
...
```

## Fase 4.1 — Auditoría de huecos

Ver `references/checklists-auditoria.md` § Auditoría de huecos de tareas — incluye, además de la cobertura de RF, el chequeo explícito de que ninguna tarea quedó bundled (con una conjunción escondiendo dos reglas).

## Nivel 3 — El cómo (Fase 5)

Con el Nivel 2 ya atómico y auditado, cada tarea se expande con el detalle técnico necesario para construirla en una clase: **Dónde** (archivos/piezas que toca), **Implica** (decisión técnica completa) y **Necesita** (qué hay que saber antes — alimenta el listado global de conocimientos, Fase 6). Esta expansión actualiza `curso/tareas.md` in place — no crea un archivo nuevo.

### Criterio de completitud (obligatorio, no opcional)

Para cada tarea, hacé siempre la misma pregunta de corte:

> ¿Dos personas distintas, leyendo esta especificación, podrían implementarla de formas incompatibles entre sí porque quedó una decisión técnica sin resolver?

- **Sí** → falta especificar esa decisión: nómbrala explícitamente (código de estado HTTP, forma exacta del dato que se lee/escribe, criterio de generación de ids, formato de una respuesta de error, nombre de un campo). Esto **no** es escribir código — es fijar el contrato que cualquier implementación debe cumplir.
- **No, y seguir detallando ya exigiría escribir sintaxis real** (una línea de código, el nombre de una variable, la forma exacta de una función) → detente ahí, eso es la clase (Fase 8).

**Decisiones que casi siempre hace falta fijar** en un proyecto con backend HTTP: el modelo de datos de cada entidad (qué campos tiene, cuáles son opcionales), el código de estado de cada respuesta (éxito y error), el formato de una respuesta de error, y el criterio de generación de ids mientras la persistencia es simulada. **No las repitas tarea por tarea** — defínelas una vez en secciones propias al principio de `curso/tareas.md` (`## Modelo de datos`, `## Decisiones técnicas transversales`) y referéncialas desde cada tarea afectada ("responde `201` con la tarea creada", no "responde con la tarea creada").

### Qué hacer

- **Aplica este criterio desde la primera pasada**, igual que en el Nivel 2 — no entregues una especificación incompleta a la espera de que el usuario señale el hueco.
- **Antes de cerrar la Fase 5, relee cada tarea que crea, lee, actualiza o borra un dato** y verificá que su código de estado y la forma del dato estén dichos explícitamente o referenciados a la sección transversal correspondiente.
- **Cuando la misma decisión aplica a varias tareas** (p. ej. el formato de error, el criterio de ids), definila una sola vez y referenciala — no la repitas con palabras distintas en cada tarea, eso generaría inconsistencias entre clases más adelante.

### Qué NO hacer

- No fusiones en la Fase 5 tareas que la Fase 4 ya separó "para simplificar la especificación" — cada tarea de Nivel 3 corresponde 1 a 1 con su tarea de Nivel 2.
- No dejes una tarea de backend sin decir qué código de estado devuelve en éxito y en error.
- No dejes que la forma de un dato (qué campos tiene un recurso) quede implícita o se pueda inferir distinto en dos tareas distintas — si dos tareas tocan el mismo recurso, tienen que estar usando la misma forma, definida una sola vez.
- No escribas sintaxis de código real (nombres de variables, la forma exacta de una función, una línea ejecutable) — en cuanto aparece eso, la tarea se pasó a la Fase 8.

### Ejemplo (antes/después de aplicar el criterio)

Antes — incompleta, dos implementaciones podrían diferir:

> T-01 — Endpoint de backend para crear una tarea.
> *Implica:* recibe el cuerpo de la petición, crea el registro, responde con la tarea creada.

Después — aplicando el criterio, completa:

> ## Modelo de datos
> **Tarea**: `{ id, titulo, descripcion (opcional), fecha (opcional), completada (booleano, default false) }`
>
> ## Decisiones técnicas transversales
> **Generación de ids**: contador incremental en memoria. **Formato de éxito**: creación devuelve el recurso con `201`.
>
> T-01 — Endpoint de backend para crear una tarea.
> *Implica:* recibe título, descripción y fecha (opcionales) en el cuerpo; crea el registro con id autogenerado (ver Decisiones transversales); responde `201` con la tarea creada, en la forma del Modelo de datos.

La segunda versión fija el código de estado y la forma exacta del dato — nadie tiene que adivinar esas dos cosas al construir la clase. Ninguna de las dos frases es código real: siguen siendo decisiones, no sintaxis.
