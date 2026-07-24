# Conceptos enseñados

| Concepto/herramienta | Clase donde se enseñó | Profundidad alcanzada | Notas |
|------------------------|------------------------|------------------------|-------|
| React y componentes (K10) | Clase 01 | Qué es / para qué sirve / mecanismo real (Trigger-Render-Commit) / props como entrada / JSX y su compilación a `React.createElement` / buenas prácticas y errores comunes / ejecución real verificada | Estado (`useState`) queda fuera a propósito — se enseña en la Clase 02 (formulario controlado) |
| Formulario controlado en React — `useState` + input controlado (K11) | Clase 02 | Qué es el estado y por qué existe / sintaxis y regla de `useState` / value+onChange como input controlado / buenas prácticas y errores comunes / ejecución real verificada (mitad "value viene del estado"; el `onChange` real se verifica recién en la Clase 03, requiere navegador) | — |
| Express, rutas HTTP, JSON, códigos de estado (K1, K3, K4, K5) | Clase 04 | Qué es un servidor/petición/respuesta / rutas con app.get·app.post / middleware express.json() y req.body / códigos de estado 200-201-204-400-401-403-404 / cambios de rutas en Express 5 (path-to-regexp v8) / ejecución real verificada (GET 200, POST 201, POST inválido 400) | — |
| Persistencia simulada — crear/leer (K6) | Clase 05 | Qué es persistencia y por qué el servidor solo no alcanza / simulación con array en memoria + contador de ids / límite real (se pierde al reiniciar, verificado ejecutando dos veces) / por qué no es apta para producción | Se retoma y extiende en clases posteriores (eliminar, usuarios) |
