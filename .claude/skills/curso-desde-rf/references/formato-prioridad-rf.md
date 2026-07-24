# Formato de `curso/prioridad-rf.md` (Fase 1.5)

Este documento fija el **Nivel 1** del plan de construcción: el orden real en el que se va a construir el proyecto, RF por RF, según cuánto valor aporta cada uno al software terminado. Todo lo que viene después (tareas, conocimientos, índice, clases) hereda este orden — es la primera decisión de secuencia de todo el curso, y se toma antes de preguntar nada de tecnología.

## Propósito

Darle a la IA, y al usuario, una respuesta clara a "¿qué construimos primero?" basada en valor de producto — no en qué tecnología resulta más cómoda de enseñar primero. Cuando el RF más importante necesita algo que se enseña más adelante en el curso, esa pieza se resuelve con una simulación (ver `curso/dependencias.md`, Fase 6/6.1) en vez de mover ese RF a un lugar más tardío del orden.

## Estructura

```markdown
# Prioridad de RF

Orden propuesto por la IA, pendiente de confirmación del usuario.

| Orden | RF | Por qué va en esta posición |
|-------|----|------------------------------|
| 1 | RF-03 | Es el núcleo del producto: sin esto no hay software que mostrar — todo lo demás es soporte o mejora sobre esta funcionalidad. |
| 2 | RF-01 | Segunda funcionalidad más visible para el usuario final. |
| 3 | RF-07 | ... |
...
```

Columnas:
- **Orden**: posición 1..N, sin huecos ni empates — si dos RF parecen empatar en importancia, decide un criterio de desempate explícito (p. ej. cuál es prerrequisito conceptual del otro) y dilo en la columna de justificación.
- **RF**: el ID de `curso/rf.md`, no se reformula el RF aquí.
- **Por qué va en esta posición**: una razón real de valor/impacto para el software terminado (qué tan central es para el propósito del proyecto, qué tan visible es para quien lo use, qué tanto desbloquea o habilita otras funcionalidades).

## Criterio para ordenar (qué hace que un RF sea "más importante")

En este orden, salvo que el propio documento de funcionalidades ya indique explícitamente una prioridad distinta:
1. Funcionalidad núcleo sin la cual el software no cumple su propósito básico (el "camino feliz" principal).
2. Funcionalidad que el usuario final del software notaría de inmediato si faltara.
3. Funcionalidad que habilita o da sentido a otras (p. ej. sin poder crear un recurso, no tiene sentido poder editarlo o eliminarlo).
4. Funcionalidad de soporte, configuración o robustez (validaciones, manejo de errores más fino, mejoras de experiencia) — casi siempre al final, salvo que el documento de funcionalidades diga lo contrario.

**Qué NO hacer**: no ordenes por facilidad técnica de implementación ("este RF usa algo que ya sé explicar, lo pongo primero") — el criterio es siempre valor de producto, nunca comodidad de enseñanza. Si el documento de funcionalidades ya trae una numeración o un orden implícito de importancia (p. ej. una sección "Núcleo" antes de una sección "Extras"), respétalo como punto de partida y ajusta solo si hay una razón real para discrepar, dejándola explícita.

## Checkpoint

Muestra la tabla completa al usuario y espera confirmación antes de pasar a la Fase 2. El usuario puede reordenar libremente. Si el usuario reordena, actualiza la tabla y vuelve a mostrarla completa (no solo el cambio) antes de seguir.

## Relación con el resto del curso

- `curso/tareas.md` (Fase 4) hereda este orden: las tareas de un RF se agrupan y ordenan según la posición de su RF aquí.
- `curso/indice.md` (Fase 7) sigue este mismo orden en su primera iteración (RF+tareas por valor).
- Si en cualquier fase posterior se descubre que el orden aquí es inviable de verdad (ni siquiera simulando se puede avanzar un RF antes que otro — caso raro), se vuelve a este documento, se reporta el hallazgo y se ajusta con el usuario en un checkpoint — no se resuelve en silencio en una fase posterior.
