# Reglas de cada clase (Fase 8 y Fase 9)

Cada archivo `curso/clases/clase-NN-slug.md` es distinto en estructura del anterior — una clase que enseña "qué es una API" no se parece en forma a una clase que refactoriza el modelo de datos del proyecto para usar clases de programación. Por eso no hay una plantilla de secciones fijas: hay reglas que toda clase cumple, sin importar su tema, dominio o stack.

## Regla fundamental — que el usuario entienda (nunca se rompe, es la base de todas las demás)

"Que el usuario entienda" no es una aspiración vaga — tiene un significado operativo, tomado de tres marcos reales sobre qué distingue entender de haber leído:

- **Taxonomía de Bloom, nivel "Comprender"**: entender significa poder explicar con las propias palabras, dar un ejemplo propio, comparar, clasificar o predecir un resultado — no solo repetir una definición ([Bloom's Taxonomy verbs — Teachfloor](https://www.teachfloor.com/elearning-glossary/blooms-taxonomy-verbs), [Valamis](https://www.valamis.com/hub/blooms-taxonomy)).
- **Wiggins & McTighe, *Understanding by Design* (los seis aspectos de la comprensión)**: comprender de verdad incluye poder **explicar** (justificar con razones, no solo afirmar), **interpretar** (conectar con algo relevante y propio) y **aplicar** (usarlo en un contexto distinto al del ejemplo dado) — no alcanza con reconocer la respuesta correcta ([Understanding by Design — resumen](https://teaching.uic.edu/cate-teaching-guides/syllabus-course-design/backward-design/)).
- **Técnica Feynman**: si un concepto no se puede explicar en términos simples a alguien sin conocimiento previo, es señal de que todavía no se entendió del todo — la simplicidad de la explicación es la prueba, no un lujo de estilo ([The Feynman Technique — Farnam Street](https://fs.blog/feynman-learning-technique/)).

De estos tres marcos, esta es la regla operativa que toda clase cumple, sin excepción:

1. **Todo concepto se explica con su porqué, nunca solo con su qué.** No alcanza con decir qué hace algo — hay que justificar por qué existe y por qué se resuelve así y no de otra forma.
2. **Ningún término técnico se usa antes de definirse en lenguaje simple.** Si hace falta una palabra nueva, se define primero con palabras que el lector ya conoce — nunca se asume que ya la sabe.
3. **Todo concepto nuevo se acompaña de al menos un ejemplo aplicado**, no solo la definición de manual — ver algo en uso es lo que lo vuelve concreto (Bloom: *exemplify*). La mecánica exacta de cómo y cuándo se muestra ese ejemplo — inmediatamente, afirmación por afirmación — está en la Regla 6 más abajo.
4. **Todo concepto se conecta explícitamente con algo que el lector ya sabe** (ver el chequeo recursivo, regla 7 más abajo) — entender es enlazar lo nuevo con lo ya sabido, no memorizar un dato aislado (Wiggins & McTighe: *interpretación*).
5. **Antes de dar una explicación por cerrada, se le aplica el test de Feynman**: ¿esta explicación se entendería sin haber leído nada más de la clase, sin ningún término sin definir? Si la respuesta es no, hay un hueco que se llena antes de seguir.
6. **Se prioriza la transferencia sobre la repetición.** Al razonar el resultado de un ejemplo o una ejecución real, se plantea qué pasaría con una variación (otro dato de entrada, otro caso) en vez de solo confirmar que el ejemplo dado funcionó — eso es lo que distingue haber entendido de haber memorizado un resultado puntual (Bloom: *predecir/inferir*).
7. **Lo que existía antes no se presenta como un problema, un error o algo roto.** Cuando una clase explica por qué se usa una herramienta nueva, el enfoque de por qué (regla 1) compara con honestidad: la forma anterior **funciona** y **se sigue usando** para lo suyo — la herramienta nueva no la reemplaza por estar rota, sino porque resulta más cómoda, más práctica o más eficiente para el caso puntual que esta clase está resolviendo. Nunca se dramatiza una limitación menor para justificar que valga la pena aprender algo nuevo — eso es contenido falso disfrazado de motivación, exactamente lo que la regla fundamental (comprensión real) prohíbe.

**Qué NO hacer**: no des una explicación por completa porque "suena bien" o porque cubre los puntos formales de una regla — si aplicando el test de Feynman (punto 5) la explicación no se sostiene sin términos sin definir, corregila antes de seguir. No sacrifiques esta regla por brevedad ni por avanzar más rápido — es la base de todas las demás reglas de este documento, no una regla más entre iguales. No titules una sección "El problema..." ni nombres un ejemplo de código de forma que ya prejuzgue el enfoque anterior (p. ej. `CampoRoto`, `FormularioViejo`) — nombralo neutral, y dejá que la explicación (no el nombre) sea la que muestre la diferencia real.

## La clase empieza directo en el tema — sin encabezado de metadatos ni justificación interna

El archivo de la clase abre con el título (`# Clase NN — [título del tema]`) y pasa directo al contenido — **no lleva un bloque de metadatos** (Tipo, Depende de, Introduce, Tareas que avanza, RF relacionados) antes de empezar a enseñar. Esa trazabilidad (qué RF, qué tareas, qué tipo de clase, de qué depende) **ya vive en `curso/indice.md` y `curso/PROGRESS.md`** — repetirla dentro del contenido de la clase es para el proceso, no para quien está aprendiendo, y no aporta nada a la regla fundamental de comprensión.

Por la misma razón, **la clase no abre justificando "por qué esta clase toca ahora" citando IDs internos del motor** (RF-XX, T-XX, el número de otra Clase, nombres de archivo como `curso/prioridad-rf.md` o `curso/indice.md`). Si hace falta motivar el tema al empezar, se motiva en términos del propio tema (qué problema resuelve, para qué sirve — ver la Regla fundamental, puntos 1 y siguientes), nunca citando el andamiaje interno del curso.

**Qué NO hacer**: no agregues un bloque `**Tipo:**`/`**Depende de:**`/`**Introduce:**`/`**Tareas que avanza:**`/`**RF relacionados:**` al principio de la clase. No abras una clase con un párrafo tipo "esta clase toca ahora porque RF-XX tiene prioridad Y y su tarea T-ZZ se construye en la Clase N" — eso es jerga de proceso, no contenido para el usuario.

(La distinción **conocimiento** vs. **construcción** que usan las reglas de abajo sigue existiendo — una clase de conocimiento enseña algo necesario sin construir un RF completo en esa misma clase; una de construcción usa lo ya enseñado para construir efectivamente una tarea/RF — pero es una categoría interna para saber qué reglas aplican, no algo que la clase tenga que declarar en su propio texto.)

## Qué aplica a cada tipo de clase

| Regla | Conocimiento | Construcción |
|---|---|---|
| Investigar y recolectar `guia_aprendizaje.md` (regla 7/8) | Sí — es su propósito central | No — reutiliza lo ya enseñado |
| Leer la especificación Nivel 3 en `curso/tareas.md` | No | Sí — siempre, antes de escribir código |
| Actualizar `curso/conceptos-enseñados.md` | Sí, si enseña algo por primera vez | No, salvo caso raro donde también introduce un concepto nuevo |
| Integrar avance en `curso/app/` | No | Sí — es lo que la define |
| Modelo de clases (POO) | Rara vez (el ejemplo es ilustrativo, no necesariamente entra al proyecto) | Sí — todo código nuevo del proyecto |
| Registrar en `curso/simulaciones.md` | Solo si trata una dependencia no enseñada como caja negra | Sí, si introduce un stub |
| Git (rama al empezar, commit al terminar) | Sí — el archivo de la clase es parte del repo igual | Sí |
| Confirmar versión en `curso/stack.md`/`auditoria-stack.md` | Sí, si menciona una tecnología del stack | Sí, siempre que escribe código con esa tecnología |
| Pasos numerados con qué/cómo/dónde | Sí — normalmente pocos pasos conceptuales | Sí — normalmente muchos pasos de código |
| Ejecución real, nunca fabricada | Sí — se corre el ejemplo mínimo que demuestra el concepto | Sí — se corre el avance real del proyecto |
| Patrones de diseño | Rara vez aplica | Se evalúa siempre, se aplica solo si resuelve algo real |
| Regla fundamental de comprensión (arriba) | Sí, sin excepción | Sí, sin excepción |

## La línea del índice es un rótulo, no la fuente

`curso/indice.md` dice **qué** clase toca y **en qué orden** — deliberadamente no lleva código de estado, forma del dato ni versión de tecnología (ver `references/formato-indice.md`). Antes de escribir una sola línea de contenido:

- **Toda clase de construcción** abre `curso/tareas.md` y lee la especificación Nivel 3 completa de cada `T-XX` que va a construir (Dónde/Implica/Necesita, más el Modelo de datos y las Decisiones técnicas transversales de ese mismo archivo). El código de estado HTTP, los nombres de campo y el criterio de generación de ids salen de ahí — nunca se inventan ni se reconstruyen de memoria a partir del rótulo del índice.
- **Toda clase que use una tecnología del stack** confirma su versión exacta contra `curso/stack.md`/`curso/auditoria-stack.md` antes de escribir código o ejemplos con esa tecnología.

**Qué NO hacer**: no generes una clase leyendo solo su línea de `curso/indice.md` — esa línea existe para decidir el orden del curso, no para escribir la clase. Si al construir una tarea te encontrás inventando un código de estado, un nombre de campo o una versión que no verificaste en `tareas.md`/`stack.md`, deteneте y andá a buscarlo, no lo completes a criterio propio.

## Las 8 reglas

### 1. Git, antes de generar cualquier código

Al empezar la clase, antes de escribir una sola línea de código del proyecto, se prepara el control de versiones: rama nueva a partir de la principal (o `git init` + `.gitignore` + primer commit si es la primera clase de todo el curso — ahí no hay rama todavía). Se narra el comando real usado, no solo el resultado.

### 2. Git, después de codear

Al terminar el código de la clase, se commitea el trabajo en la rama de esa clase y se integra a la rama principal antes de pasar a la siguiente. Publicar en GitHub como remoto (crear el repositorio, hacer `push`, abrir un pull request) es una acción aparte que requiere permiso explícito del usuario en el momento — el hábito automático de cada clase es el commit local, no la sincronización remota.

**Qué NO hacer**: no trabajes ni commitees directamente sobre la rama principal saltándote la creación de rama (salvo la primera clase). No reescribas ni hagas `--amend` sobre commits de clases anteriores — si algo quedó mal, se corrige con un commit nuevo en la clase actual.

### 3. Modelo de clases (POO) para mantener el código ordenado

Cada entidad o responsabilidad real del proyecto (un registro del dominio, un usuario, un servicio, un repositorio de datos) se modela con una clase de programación — no con funciones sueltas mezcladas sin estructura. Cuando el lenguaje/stack del proyecto lo permite, este es el criterio por defecto de organización del código, no una opción entre varias.

### 4. Patrones de diseño solo cuando son eficientes

Se evalúan clase a clase. Se aplican únicamente si resuelven un problema real de esa clase concreta (código repetido, acoplamiento que ya duele, una variación que se repetirá). Si ninguno aporta valor real en esa clase, no se menciona ninguno — la mayoría de las clases no van a tener un patrón aplicado, y eso es lo esperado.

### 5. La clase es un recorrido de pasos conectados, no secciones sueltas

El cuerpo de la clase es una secuencia de pasos numerados, de punta a punta, sin omitir ninguno. Cada paso parte de donde dejó el paso anterior — nunca es una lista de puntos inconexos. El número de pasos varía libremente según el tema: una clase de conocimiento puro puede tener pocos pasos conceptuales; una clase de construcción puede tener muchos pasos de código.

### 6. Cada afirmación se demuestra ahí mismo, no se deja para el final

Todo paso dice explícitamente, antes o junto con el contenido:
- **Qué queremos generar/lograr** — el propósito de ese paso puntual.
- **Qué estamos haciendo** — la acción concreta (explicar un concepto, escribir una función, correr un comando).
- **Dónde** — el archivo/carpeta/ubicación exacta cuando el paso toca el proyecto real.

Además, de forma obligatoria y sin excepción: **toda afirmación sobre cómo se comporta algo se corta ahí mismo para demostrarse, ejecutada, con su entrada y su salida reales** — nunca se deja la demostración para un bloque de ejemplo consolidado más abajo o para el final del paso/la clase. Quien escribe la clase actúa como un tutor que, a medida que explica, va tipeando y corriendo cada pieza en el momento en que la menciona — la prosa nunca avanza a la siguiente afirmación sin haber mostrado la anterior funcionando.

Esto aplica igual a clases de conocimiento y de construcción:
- **En una clase de conocimiento**, cada afirmación sobre el comportamiento de un concepto (qué se reinicia, qué dispara, qué devuelve, qué cambia) se corta ahí mismo con el fragmento ejecutable mínimo que la demuestra — no hace falta el ejemplo completo del concepto, alcanza con lo mínimo para ver esa afirmación puntual en acción.
- **En una clase de construcción**, cada pieza de código nueva que cambia el comportamiento observable (una ruta nueva, una validación nueva, un campo nuevo) se demuestra apenas se agrega — nunca se escribe el archivo completo primero y se prueba todo junto recién al final. Si una pieza todavía no es ejecutable de forma aislada (por ejemplo, una función que solo tiene sentido dentro de una ruta ya completa), se demuestra con el fragmento mínimo que sí puede correr por su cuenta (una llamada directa a la función, un caso suelto) antes de integrarla a la pieza mayor.

**Ejemplo de la mecánica** (afirmación → corte → demostración ejecutada → recién ahí se retoma la explicación):

> El componente de la clase anterior siempre mostraba lo mismo — recibía props y las mostraba, sin cambiar nunca por sí solo.
>
> ```js
> function Greeting(props) {
>   return React.createElement('h1', null, `Hola, ${props.name}`);
> }
> console.log(renderToStaticMarkup(React.createElement(Greeting, { name: 'Ana' })));
> ```
> ```
> $ node demo.mjs
> <h1>Hola, Ana</h1>
> ```
> Le pasamos `name: 'Ana'` una vez — esa fue toda la información que usó. Volver a llamarlo con el mismo prop da exactamente lo mismo, siempre.
>
> Un campo de texto necesita algo distinto: recordar lo que el usuario va escribiendo. Una variable común no alcanza, porque React vuelve a llamar a la función en cada render y cualquier variable declarada adentro se reinicia con ese llamado.
>
> ```js
> function Campo() {
>   let texto = '';
>   console.log('texto al entrar:', JSON.stringify(texto));
>   texto = 'Comprar leche';
>   console.log('texto tras "escribir":', JSON.stringify(texto));
> }
> Campo(); // primer "render"
> Campo(); // React vuelve a llamar -- segundo "render"
> ```
> ```
> $ node demo-reinicio.mjs
> texto al entrar: ""
> texto tras "escribir": "Comprar leche"
> texto al entrar: ""              ← se reinició, sin memoria de la llamada anterior
> texto tras "escribir": "Comprar leche"
> ```

Ningún paso muestra código o una acción sin decir antes para qué es y dónde va. Todo código incluido lleva comentarios que identifican qué hace, qué entra y qué sale.

**Qué NO hacer**: no expliques dos o más afirmaciones de comportamiento seguidas en prosa y recién después las demuestres juntas — cada una se corta y se muestra por separado, en el momento exacto en que se afirma. No dejes la única demostración de un paso para un bloque "vamos a probar esto" al final del paso o de la clase — eso es exactamente el patrón que esta regla reemplaza. No uses una demostración grande como sustituto de las chicas — las demostraciones puntuales por afirmación son obligatorias aunque más adelante también haya una demostración mayor que integre varias piezas (eso sigue aplicando, ver "Ejecución real, siempre").

### 7. El chequeo recursivo de conocimiento va entretejido en cada paso, no aparte

Cuando un paso introduce o usa un concepto/herramienta concreto, sigue el chequeo recursivo (ver `SKILL.md` § Fase 8 y `curso/conceptos-enseñados.md`) ahí mismo, en el paso donde ese concepto hace falta — no existe un bloque separado al principio de la clase tipo "prerrequisitos". Si el concepto ya se enseñó, el paso lo referencia en una frase corta (qué es / para qué se usa aquí / en qué clase se enseñó) y sigue; si es nuevo, antes de enseñarlo **investiga y recolecta la información que pide `guia_aprendizaje.md`** (las categorías que apliquen a este concepto puntual) y enséñalo con eso ya reunido.

### 8. `guia_aprendizaje.md` es una guía de investigación, no una plantilla de secciones

`guia_aprendizaje.md` no dicta títulos ni orden de párrafos dentro de una clase — dicta **qué información hay que haber investigado antes de escribir**. Antes de enseñar un concepto nuevo, recorré sus categorías (qué es, para qué sirve, cómo funciona por detrás, entradas/salidas, uso cotidiano, buenas prácticas vigentes, tips no obvios, errores comunes, alternativas) y quedate con las que de verdad aportan algo a **este** concepto puntual — después escribís la clase como el recorrido de pasos conectados de la regla 5/6, no como una lista de esas categorías con su propio título cada una.

Una clase de conocimiento enseña el concepto con la profundidad real que tiene, no lo recorta a únicamente el fragmento que la próxima construcción va a usar de inmediato. Si aparece un detalle importante (una opción común, una limitación real, un error habitual, una alternativa conocida) que no se va a usar en la construcción inmediata pero es información que cualquiera que aprenda esto debería tener, **se menciona igual** — no se omite solo porque "todavía no hace falta".

**Cómo se redacta esa información** (ver `guia_aprendizaje.md` § Cómo se redacta): simple y directa, sin redundancia entre categorías, y sin dedicar espacio a explicar qué NO es algo salvo que sea la forma más clara de evitar una confusión real y frecuente.

**Qué NO hacer**: no conviertas las categorías de `guia_aprendizaje.md` en subtítulos literales de la clase ("Qué es", "Buenas prácticas", "Tips"...) — eso es exactamente la plantilla fija que este Skill no usa; son una guía de qué investigar, no una estructura a copiar. No reduzcas una clase de conocimiento a un tutorial de la única función/opción que se va a usar en el próximo paso — eso dejaría al estudiante sin poder reconocer o usar el resto del concepto más adelante. Tampoco te vayas al extremo opuesto de explicar tecnología no relacionada que no aporta a este concepto — el criterio es relevancia real para entender el concepto que se está enseñando, no exhaustividad sin límite. No repitas la misma idea con otras palabras entre dos categorías distintas.

## Ejecución real, siempre

Todo resultado de ejecutar código (un comando, un servidor, una prueba) que aparece en la clase se ejecutó de verdad en el entorno disponible — nunca se describe un resultado como si se hubiera corrido sin haberlo hecho. Esto vale igual para las demostraciones puntuales y chicas que exige la Regla 6 (una por cada afirmación) como para una demostración mayor que integre varias piezas al final de un paso — ninguna de las dos se fabrica ni se reconstruye de memoria. Si algo genuinamente no se puede ejecutar en este entorno (credencial real no disponible, servicio de pago, hardware ausente), la clase lo dice explícitamente y explica qué haría falta para que el usuario lo verifique él mismo.

## Investigación real, siempre

Antes de escribir el contenido de una clase de conocimiento (o la parte teórica de una de construcción), se investiga información real sobre el tema (documentación oficial, changelog, guías reconocidas) — no se reconstruye de memoria. Si algo no se pudo verificar, la clase lo dice explícitamente en vez de inventarlo.

## Qué NO hacer (resumen transversal)

- No fuerces una estructura de secciones igual entre clases distintas — las reglas de arriba son el contrato, no una plantilla de títulos.
- No agregues un bloque de metadatos (Tipo/Depende de/Introduce/Tareas que avanza/RF relacionados) antes del contenido, ni abras la clase justificando su lugar en el curso con IDs internos (RF-XX, T-XX, número de Clase) — ver "La clase empieza directo en el tema" más arriba.
- No escribas un paso sin su qué/cómo/dónde.
- No expliques dos o más afirmaciones de comportamiento seguidas y las demuestres recién después, juntas — cada afirmación se corta ahí mismo con su propia demostración ejecutada (Regla 6), sea clase de conocimiento o de construcción.
- No introduzcas un patrón de diseño que no resuelve nada real en esa clase.
- No modifiques la rama principal fuera del punto 2, ni publiques en un remoto sin permiso explícito en el momento.
- No des un concepto por sabido sin haberlo confirmado contra `curso/conceptos-enseñados.md`.
- No recortes una clase de conocimiento a solo lo que la próxima construcción usa — los detalles importantes del concepto se mencionan igual, aunque no se vayan a usar todavía.
