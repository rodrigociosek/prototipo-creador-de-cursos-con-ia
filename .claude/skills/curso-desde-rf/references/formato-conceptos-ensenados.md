# Formato de `curso/conceptos-enseñados.md`

Registra, **concepto por concepto** (no por tema grande — cada herramienta/patrón/API concreta por separado), en qué clase se enseñó por primera vez y con qué profundidad. Es lo que le permite a cada clase de la Fase 8 decidir, antes de explicar algo, si toca enseñarlo en profundidad o solo referenciarlo — sin releer todas las clases anteriores.

## Propósito

El chequeo recursivo de conocimiento (ver `SKILL.md` § Fase 8 y `references/reglas-de-clase.md`) necesita una fuente de verdad persistida sobre qué ya sabe el usuario, para no depender de que la IA recuerde correctamente el contenido de treinta clases anteriores dentro de su propio contexto de conversación. Con el registro en disco, cualquier sesión (nueva o no) puede consultar en un archivo corto si un concepto puntual ya se enseñó, en qué clase y con qué profundidad.

## Estructura

El nombre de cada fila sale siempre de `curso/dependencias.md`/`curso/indice.md` del proyecto en curso — el ejemplo de abajo usa un stack ficticio solo para mostrar el formato.

```markdown
# Conceptos enseñados

| Concepto/herramienta | Clase donde se enseñó | Profundidad alcanzada | Notas |
|------------------------|------------------------|------------------------|-------|
| [Entorno de ejecución del lenguaje elegido] | Clase 01 | Qué es / para qué sirve / instalación | — |
| Git (uso mecánico: rama + commit) | Clase 01 | Solo el cómo operativo (comandos), sin explicar internamente qué es un commit todavía | Profundización conceptual completa en Clase 03 |
| Git (concepto completo) | Clase 03 | Profundo — qué es un repositorio, commit, rama, mecanismo interno | — |
| [Framework de servidor elegido] — servidor y rutas básicas | Clase 05 | Mínima implementación + prueba real | — |
| Middleware de [framework de servidor elegido] | Clase 05 | Solo qué es (mencionado como concepto, sin profundizar el mecanismo) | Profundización pendiente si una clase futura lo exige |
```

Columnas:
- **Concepto/herramienta**: lo más específico posible — no "autenticación" como bloque, sino cada mecanismo concreto que la componga (el token elegido, el algoritmo de hashing, el middleware que lo aplica) en su propia fila. Si el mismo concepto se enseña dos veces con distinta profundidad (primero superficial, luego a fondo), son **dos filas**, no se sobrescribe la primera — la segunda fila deja explícito que profundiza la anterior (columna Notas).
- **Clase donde se enseñó**: número y, opcionalmente, título corto.
- **Profundidad alcanzada**: qué tanto se cubrió para este concepto en esa clase (desde "solo se mencionó como caja negra" hasta "implementación real con prueba"), en una frase.
- **Notas**: cualquier aclaración relevante — sobre todo, si quedó una profundización pendiente para una clase futura.

## Cómo se usa (Fase 8, dentro de cada clase)

Antes de cualquier paso de una clase que vaya a explicar o usar un concepto/herramienta concreto:
1. Busca el concepto exacto en este archivo.
2. **No está** → se investiga y se enseña en profundidad (las categorías de información de `guia_aprendizaje.md` que apliquen a este concepto puntual — no todas aplican siempre), y al cerrar la clase se agrega la fila nueva aquí.
3. **Ya está, con suficiente profundidad para lo que este paso necesita** → no se repite la investigación; se da una explicación corta (qué es / para qué se usa aquí / por qué toca ahora) más la referencia a la clase donde se enseñó, y se sigue directo a construir.
4. **Ya está, pero con menos profundidad de la que este paso necesita** → se enseña la profundización que falta, apoyándose en lo ya visto, y se agrega una fila nueva que referencia a la anterior en la columna Notas.

## Qué NO hacer

- No agrupes conceptos distintos en una sola fila "para no tener una tabla larga" — cada pieza que una clase futura podría necesitar referenciar por separado necesita su propia fila.
- No marques un concepto como enseñado antes de que la clase correspondiente exista realmente en `curso/clases/` — este registro documenta lo que ya pasó, no lo planeado.
- No lo uses como sustituto de `curso/simulaciones.md`: este archivo registra qué se **enseñó** (teoría/uso real), `simulaciones.md` registra qué se **simuló** (stub en construcción o caja negra en explicación) — un concepto puede estar simulado en construcción y aun así aparecer aquí si su teoría ya se explicó.
- No borres ni sobrescribas filas — si una clase corrige o profundiza algo, se suma una fila nueva, la anterior queda como estaba.

## Se crea en

Fase 0, vacío (solo el encabezado de tabla), junto a `curso/PROGRESS.md` — así la primera clase de la Fase 8 ya tiene dónde escribir su primera fila.
