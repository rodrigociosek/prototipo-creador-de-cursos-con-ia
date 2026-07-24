# Formato de `curso/dependencias.md` (Fases 6, 6.1 y 6.2)

Este documento es el listado completo de todo lo que hace falta saber para poder ejecutar las tareas del curso, encadenado hacia atrás hasta el conocimiento previo asumido. Se construye en tres pasos sobre `curso/tareas.md` ya especificado hasta el cómo (Nivel 3).

Este formato es del motor: aplica igual sin importar el stack, el dominio o el tipo de proyecto real. Los nombres de tecnología concreta que aparecen abajo (entre corchetes o en los bloques de ejemplo) son ilustrativos — sirven para mostrar la forma que debe tener el documento, nunca son un supuesto sobre qué tecnología va a usar el proyecto real. Genera siempre el contenido real a partir de `curso/stack.md` y `curso/tareas.md` del proyecto en curso, no a partir de estos ejemplos.

## Propósito

Las tareas Nivel 3 dicen, cada una, qué necesita para hacerse. Este documento junta esas necesidades en un solo listado sin duplicados, y para cada una resuelve **de dónde sale** ese conocimiento: si ya se puede enseñar en este punto del curso, o si hace falta simular la pieza que todavía no se enseñó. Es la base que usa la Fase 7 (índice) para decidir qué conocimiento va en qué clase, y la base que usa la Fase 8 (generación de clases) para el chequeo recursivo de conocimiento.

## Fase 6 — Listado global de conocimientos

Recorre **todas** las tareas de `curso/tareas.md`, en su orden de `curso/prioridad-rf.md`, y anota, sin repetir, cada conocimiento/herramienta concreto que alguna tarea necesita — usando los nombres reales de `curso/stack.md`, no placeholders. Un mismo conocimiento que varias tareas necesitan aparece **una sola vez** en el listado, con la lista de qué tareas lo usan.

**Ejemplo ilustrativo** (con un stack y dominio ficticios, solo para mostrar el formato — el listado real usa las tecnologías que el proyecto en curso eligió en `curso/stack.md`):

```markdown
# Listado de conocimientos

- [Framework de interfaz elegido] y sus componentes — usado por: T-01, T-04, T-07
- [Framework de servidor elegido] y sus rutas — usado por: T-01, T-02
- Persistencia simulada (estructura de datos en memoria) — usado por: T-01, T-02, T-04
- Git — usado por: todas (transversal)
```

## Fase 6.1 — Encadenamiento recursivo

Cada conocimiento del listado se descompone en lo que hace falta saber para tenerlo — y eso a su vez en lo que le hace falta a *eso* — repitiendo hacia atrás (`←`) tantas veces como haga falta, hasta llegar a:
1. Una **noción básica de programación** (variables, funciones, condicionales, bucles, arrays/objetos, qué es ejecutar un programa) — conocimiento previo asumido del estudiante, no se enseña en el curso y no se sigue desglosando.
2. Algo que **ya no tiene ningún prerrequisito adicional dentro del alcance del curso** (p. ej. "abrir una terminal y escribir un comando").

No pares antes de estos dos casos solo porque la cadena "ya se ve larga" — una cadena corta cortada de más es exactamente el hueco que este paso existe para detectar.

**Ejemplo ilustrativo** (mismo stack ficticio de arriba):

```markdown
## [Framework de interfaz elegido] y sus componentes
← Qué es una interfaz de usuario para quien usa el software
  ← Nociones básicas de la plataforma sobre la que corre esa interfaz
    ← Nociones básicas de programación — **punto de corte**

## [Framework de servidor elegido] y sus rutas
← Qué es una petición y una respuesta entre cliente y servidor
  ← Qué es un cliente y un servidor
    ← Nociones básicas de programación — **punto de corte**
← Entorno de ejecución del lenguaje elegido, ya instalado
  ← Uso básico de una terminal — **punto de corte**
```

Para cada conocimiento del listado, distingue si cada eslabón de su cadena **ya se puede enseñar en este punto del curso** o si **todavía no** (porque su propio prerrequisito tiene menor prioridad y le toca más adelante). Cuando un eslabón todavía no se puede cubrir, decide si se puede simular con lo que el estudiante ya conoce, y cómo. Si el proyecto incluye persistencia real (la mayoría de los software con datos que el usuario ingresa la necesitan), su entrada siempre queda así hasta el bloque de integración de BD:

```markdown
## Persistencia real (la tecnología de base de datos elegida en curso/stack.md)
← Cómo modelar y consultar los datos con esa tecnología — no se enseña hasta el bloque de integración de BD (después de cubrir todos los RF)
**¿Se puede simular mientras tanto?** Sí — persistencia simulada: una estructura de datos en memoria (array, objeto, diccionario, según el lenguaje) dentro del backend, se pierde al reiniciar el proceso pero se comporta igual desde la perspectiva del resto del código (mismo contrato de funciones para guardar/leer).
```

## Fase 6.2 — Auditoría del listado

Antes del checkpoint, revisa:
- Que cada conocimiento del listado esté descrito de forma **singular** (un concepto por entrada, nada de bultos que mezclan varios — p. ej. un framework de servidor no puede tapar adentro "rutas", "middleware" y "manejo de errores" sin desglosar, si distintas tareas los necesitan por separado).
- Que cada conocimiento esté descrito de forma **completa** — con la investigación real necesaria (documentación oficial, fuente citada) cuando haga falta precisión sobre cómo funciona ese conocimiento puntual, no una suposición de memoria.
- Que toda cadena llegue a un punto de corte válido (nunca cortada a medio camino).
- Que todo eslabón no cubierto tenga una respuesta explícita de simulación (sí + cómo, o no + motivo reportado como hallazgo).

Escribe el resultado en `curso/auditoria-dependencias.md`.

**Checkpoint:** muestra el resumen al usuario y espera confirmación antes de pasar a la Fase 7. Si algún conocimiento genuinamente no se puede simular (caso raro), preséntalo como hallazgo explícito para que el usuario decida — nunca lo resuelvas moviendo `curso/prioridad-rf.md` en silencio.

## Checklist antes de cerrar la Fase 6.2

- [ ] Todo conocimiento usado por alguna tarea de `curso/tareas.md` aparece una vez en el listado (Fase 6), con sus tareas asociadas.
- [ ] Toda cadena (Fase 6.1) llega hasta un punto de corte válido — ninguna se corta a medio camino sin justificación.
- [ ] Ningún conocimiento mezcla varios conceptos distintos en una sola entrada.
- [ ] Todo eslabón no cubierto en este punto del curso tiene una respuesta explícita de simulación (sí + cómo, o no + reportado como hallazgo).
- [ ] Si el proyecto incluye persistencia real, está marcada explícitamente como no disponible hasta el bloque de integración de BD (después de cubrir todos los RF), con su simulación (memoria) ya definida.
