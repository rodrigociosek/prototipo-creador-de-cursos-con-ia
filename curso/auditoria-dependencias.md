# Auditoría del listado de conocimientos (Fase 6.2)

- [x] Todo conocimiento usado por alguna tarea de `curso/tareas.md` aparece una vez en el listado (K1–K31), con sus tareas asociadas — verificado recorriendo las 51 tareas una por una contra la tabla.
- [x] Toda cadena de la Fase 6.1 llega hasta un punto de corte válido (nociones básicas de programación, o uso básico de terminal) o hasta otro conocimiento ya listado — ninguna se corta a medio camino.
- [x] Ningún conocimiento mezcla varios conceptos distintos en una sola entrada — cada `K` es una pieza singular (p. ej. K21 "hashing" y K22 "JWT" quedaron separados aunque ambos son parte de autenticación, porque son técnicas distintas que podrían faltar una sin la otra).
- [x] Las nociones básicas de programación (condicionales, arrays/objetos, terminal) no aparecen como entradas del listado — solo como puntos de corte dentro de las cadenas, consistente con que nunca se enseñan en el curso.
- [x] Ningún eslabón queda sin cubrir: como las 51 tareas ya fueron especificadas con persistencia simulada (Fase 5), la persistencia real (PostgreSQL) no aparece en ninguna cadena — no hay ninguna dependencia pendiente de simular.
- [x] Los 6 conceptos genuinamente nuevos identificados en la Fase 5 (hashing, JWT, almacenamiento del cliente, middleware, cron, Twilio) están todos en el listado (K21, K22, K23, K25, K28, K29) con su propia cadena.

**Resultado: sin hallazgos. 31 conocimientos (K1–K31), ninguno requiere simulación.**
