# Auditoría del índice de punta a punta (Fase 7.1)

**Reescrito tras corregir el formato**: el índice pasó de mostrar dos secciones separadas ("iteración 1"/"iteración 2") a una secuencia única de 57 clases numeradas, con las clases de conocimiento intercaladas justo antes de la construcción que las necesita. Se auditó la versión corregida.

- [x] Las 51 tareas de `curso/tareas.md` aparecen en el índice **exactamente una vez cada una** — verificado programáticamente (comparación de IDs T-01 a T-51 entre ambos archivos: 51 definidas, 51 referenciadas, sin faltantes ni duplicados). Se referencian por ID + descripción corta, no se duplica el texto completo del Nivel 3 (que vive en `curso/tareas.md`).
- [x] Toda tarea quedó agrupada en una clase de construcción marcada `interfaz`, `backend` o `conexión`, y ese orden se respeta dentro de cada RF (verificado RF por RF: interfaz siempre antes que backend, conexión siempre al final).
- [x] Los 31 conocimientos de `curso/dependencias.md` tienen su clase asignada, cada uno inmediatamente antes de la primera construcción que lo necesita.
- [x] **Ninguna clase de conocimiento agrupa dos conocimientos que hacen falta para construcciones distintas.** Esto obligó a corregir la primera versión: K14 (renderizado de listas, necesario para la Clase de interfaz) y K15 (efectos para cargar datos, necesario recién para la Clase de conexión) estaban agrupados en una sola clase — se separaron en Clase 9 y Clase 12. Se revisaron una por una las demás clases agrupadas (Clase 4, 29, 39, 41, 56) y en esos casos sí corresponde agruparlas: ambos conocimientos de cada grupo preceden a la misma construcción inmediata siguiente.
- [x] Para cada clase de construcción, todo lo que sus tareas necesitan ya fue enseñado en una clase de número menor, o está marcado "reutiliza Clase N" — verificado uno por uno (61 referencias de reutilización revisadas contra el número de clase real donde se enseñó por primera vez, ninguna reutiliza algo de una clase posterior).
- [x] Ningún conocimiento se repite en una clase nueva — cada uno tiene una única clase de origen.
- [x] La persistencia real no aparece en ninguna de las 57 clases numeradas — solo en el bloque final, después de la Clase 57.

**Sin hallazgos tras la corrección. Índice validado de punta a punta: 57 clases (21 de conocimiento, 36 de construcción) + bloque final de integración de BD real (Fase 9).**
