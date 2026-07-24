# Dependencias — listado global de conocimientos (Fase 6) y cadenas recursivas (Fase 6.1)

Extraído de los campos "Necesita" de las 51 tareas de `curso/tareas.md`, sin repetir. Ningún conocimiento de este listado depende de un RF de menor prioridad ni de persistencia real — todas las tareas T-01 a T-51 fueron especificadas con persistencia simulada, así que PostgreSQL no aparece acá: se resuelve aparte, en el bloque de integración de BD real (Fase 9), fuera del análisis de este documento.

## Fase 6 — Listado global

| # | Conocimiento | Usado por |
|---|---|---|
| K1 | Express y rutas HTTP básicas | T-01, T-05, T-17, T-24 |
| K2 | Rutas con parámetros dinámicos en Express | T-08, T-11, T-14 |
| K3 | Petición/respuesta HTTP en formato JSON | T-01 |
| K4 | Códigos de estado HTTP de éxito | T-01 |
| K5 | Códigos de estado HTTP de error | T-02 |
| K6 | Persistencia simulada — crear/leer un registro en memoria | T-01, T-05 |
| K7 | Persistencia simulada — actualizar un registro | T-08, T-11, T-49 |
| K8 | Persistencia simulada — eliminar un registro | T-14 |
| K9 | Persistencia simulada — estructura separada para usuarios | T-17 |
| K10 | React y componentes | T-03, T-06 |
| K11 | Formulario controlado en React | T-03, T-12, T-22, T-27, T-43, T-44 |
| K12 | Peticiones HTTP desde el frontend | T-04 |
| K13 | Actualización de estado en React tras una respuesta asíncrona | T-04, T-10 |
| K14 | Renderizado de listas en React | T-06 |
| K15 | Efectos en React para cargar datos al abrir una pantalla | T-07 |
| K16 | Manejo de eventos en React | T-09, T-15, T-37, T-45 |
| K17 | Peticiones HTTP con parámetros dinámicos (frontend) | T-10, T-13, T-16 |
| K18 | Quitar un elemento de una lista en el estado de React | T-16 |
| K19 | Validar el formato de un dato de entrada | T-18, T-19 |
| K20 | Consultar una estructura en memoria antes de escribir (evitar duplicados) | T-20 |
| K21 | Hashing de contraseñas | T-21, T-25 |
| K22 | JWT — qué es y cómo se genera un token | T-26 |
| K23 | Almacenamiento del lado del cliente en el navegador | T-29, T-38 |
| K24 | Estado compartido entre componentes en React | T-30 |
| K25 | Middleware en Express | T-31 |
| K26 | Verificar un JWT recibido | T-31 |
| K27 | Selector de fecha/hora nativo del navegador | T-44 |
| K28 | Tarea programada (cron) — qué es y cómo se define | T-46 |
| K29 | Twilio — qué es y cómo se envía un SMS con su SDK | T-48 |
| K30 | Estado asíncrono de carga (loading) en React | T-50 |
| K31 | Manejo de la rama de error en peticiones asíncronas | T-51 |

## Fase 6.1 — Cadenas recursivas

```markdown
K1 — Express y rutas HTTP básicas
← Qué es un servidor y cómo recibe/responde peticiones
  ← Qué es un cliente y un servidor
    ← Nociones básicas de programación — **punto de corte**
← Node.js y npm instalados
  ← Uso básico de una terminal — **punto de corte**

K2 — Rutas con parámetros dinámicos en Express
← Rutas y handlers básicos — cubierto por K1

K3 — Petición/respuesta HTTP en formato JSON
← Qué es HTTP (petición/respuesta) — mismo concepto base de K1
← Qué es JSON como formato de datos
  ← Nociones básicas de estructuras de datos (objetos/arrays) — **punto de corte**

K4 — Códigos de estado HTTP de éxito
← Qué es HTTP — mismo concepto base de K1/K3

K5 — Códigos de estado HTTP de error
← Qué es HTTP — mismo concepto base de K1/K3

K6 — Persistencia simulada (crear/leer)
← Qué es guardar datos en memoria durante la ejecución de un programa
  ← Nociones básicas de arrays/objetos — **punto de corte**

K7 — Persistencia simulada (actualizar)
← cubierto por K6, extendido

K8 — Persistencia simulada (eliminar)
← cubierto por K6, extendido

K9 — Persistencia simulada (usuarios, estructura separada)
← cubierto por K6, extendido

K10 — React y componentes
← Qué es una interfaz de usuario en el navegador
  ← Qué es HTML/DOM básico
    ← Nociones básicas de programación — **punto de corte**

K11 — Formulario controlado en React
← cubierto por K10, extendido (estado + inputs)

K12 — Peticiones HTTP desde el frontend
← Qué es HTTP — mismo concepto base de K1/K3
← Qué es un cliente HTTP en el navegador (fetch)
  ← Nociones básicas de programación — **punto de corte**

K13 — Actualización de estado en React tras respuesta asíncrona
← cubierto por K10 (estado) y K12 (peticiones)

K14 — Renderizado de listas en React
← cubierto por K10

K15 — Efectos en React para cargar datos al abrir una pantalla
← cubierto por K10 y K12

K16 — Manejo de eventos en React
← cubierto por K10

K17 — Peticiones HTTP con parámetros dinámicos (frontend)
← cubierto por K12 y K2

K18 — Quitar un elemento de una lista en el estado de React
← cubierto por K14 y K13

K19 — Validar el formato de un dato de entrada
← Nociones básicas de programación (condicionales, strings) — **punto de corte**

K20 — Consultar una estructura en memoria antes de escribir
← cubierto por K6

K21 — Hashing de contraseñas
← Qué es una función hash aplicada a contraseñas
  ← Nociones básicas de programación — **punto de corte**

K22 — JWT (qué es y cómo se genera)
← Qué es un token de autenticación
  ← Nociones básicas de programación — **punto de corte**

K23 — Almacenamiento del lado del cliente en el navegador
← Qué es el navegador como entorno de ejecución del frontend — mismo concepto base de K10
  ← Nociones básicas de programación — **punto de corte**

K24 — Estado compartido entre componentes en React
← cubierto por K10, extendido

K25 — Middleware en Express
← cubierto por K1
← también usa K22/K26 (verificar el token dentro del middleware)

K26 — Verificar un JWT recibido
← cubierto por K22, extendido (verificación en vez de generación)

K27 — Selector de fecha/hora nativo del navegador
← cubierto por K11

K28 — Tarea programada (cron)
← Node.js ejecutándose de forma continua — mismo concepto base de K1 (Node.js y npm)
  ← Uso básico de una terminal — **punto de corte**

K29 — Twilio (SDK de envío de SMS)
← Llamar a un servicio externo desde el backend — mismo concepto base de K12, aplicado del lado del servidor
  ← Nociones básicas de programación — **punto de corte**

K30 — Estado asíncrono de carga (loading) en React
← cubierto por K12 y K13

K31 — Manejo de la rama de error en peticiones asíncronas
← cubierto por K12, K13 y K30
```

## ¿Se puede simular alguna dependencia faltante?

Ninguna cadena depende de un conocimiento que todavía no se pueda cubrir en algún punto del curso — todas terminan en un punto de corte válido (nociones básicas de programación o uso de terminal) o en otro conocimiento de este mismo listado. **No hace falta simular nada** en este análisis: la persistencia real, que sí requeriría simulación si apareciera acá, no aparece porque las 51 tareas ya fueron especificadas con persistencia simulada desde el Nivel 3 — la base de datos real es un bloque aparte (Fase 9), no parte de este árbol.
