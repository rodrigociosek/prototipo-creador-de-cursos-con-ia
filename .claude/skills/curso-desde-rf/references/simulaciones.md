# Formato de `curso/simulaciones.md`

Registro de toda simulación (stub) introducida durante el curso, tanto de construcción como de explicación. Se crea/actualiza desde la Fase 8 (generación de clases) y se revisa por completo en la Fase 10 (auditoría final).

## Propósito

La guía de aprendizaje permite simular una pieza no aprendida para no bloquear el avance — pero una simulación que nadie recuerda reemplazar se convierte en deuda silenciosa: el proyecto real termina con stubs permanentes y el usuario nunca aprende la pieza de verdad. Este archivo es lo que evita que eso pase.

**Ejemplo ilustrativo** (dominio y stack ficticios, solo para mostrar el formato):

```markdown
# Simulaciones abiertas y resueltas

| ID | Pieza simulada | Tipo | Introducida en | Motivo | Prevista para resolverse en | Estado |
|----|-----------------|------|-----------------|--------|------------------------------|--------|
| S-01 | Persistencia del recurso principal (memoria) | Construcción | Clase 02 (T-01) | Persistencia real todavía no se enseña — todos los RF usan memoria hasta el bloque de integración de BD | Bloque de integración de BD real (RF-03) | Pendiente |
| S-02 | Cómo verifica el backend el mecanismo de autenticación elegido | Explicación | Clase 03 | La clase de frontend necesita mencionar que "el backend valida la sesión", sin enseñar todavía cómo | Clase 06 (autenticación en el backend) | Resuelta en clase 06 |
```

Columnas:
- **Tipo:** `Construcción` (stub en código dentro de `curso/app/`) o `Explicación` (dependencia tratada como caja negra en el texto de una clase, sin stub de código necesariamente).
- **Motivo:** por qué no se podía enseñar/implementar la pieza real todavía en ese punto — para persistencia, siempre porque la base de datos real es un bloque que se enseña al final (ver `SKILL.md` § Fase 9); para otros conocimientos, porque su propia clase todavía no llegó según `curso/indice.md` (ver `curso/dependencias.md`, Fase 6/6.1).
- **Estado:** `Pendiente` mientras el stub sigue en pie, `Resuelta en clase NN` en cuanto esa clase reemplaza el stub por la implementación real.

## Qué hacer

- Añade una fila apenas se introduzca una simulación real en una clase (Fase 8, no antes) — no esperes a "acumular varias" para registrarlas juntas.
- Toda simulación de **persistencia** se resuelve durante el bloque de integración de BD real (Fase 9), RF por RF — actualiza el Estado de cada una a `Resuelta en clase NN` en el momento exacto en que esa clase del bloque reemplaza el stub por la implementación real.
- Las simulaciones de **explicación** (caja negra) se resuelven cuando llega la clase que enseña esa pieza de verdad, según `curso/indice.md` — no esperan al bloque de BD real salvo que la pieza simulada sea justamente persistencia.

## Qué NO hacer

- No borres una fila una vez creada, ni siquiera después de resolverla — cambia su `Estado`, no la elimines.
- No marques `Estado` como `Resuelta en clase NN` sin haber verificado que el reemplazo real ya está efectivamente en el código de `curso/app/` (idealmente con ejecución real).
- No dejes una fila `Pendiente` al cerrar el curso (Fase 10) sin una nota explícita de por qué.

Regla para la Fase 10: ninguna fila puede quedar `Pendiente` al cerrar el curso sin una nota explícita de por qué, y ninguna simulación de persistencia puede quedar `Pendiente` si el bloque de integración de BD real (Fase 9) ya se completó.
