# Stack tecnológico

## Frontend
**React + Vite** — fijado por `funcionalidades.md`, confirmado por el usuario sin evaluar alternativas.

## Backend
**Node.js + Express** — elegido por el usuario. Mismo lenguaje que el frontend (JavaScript/TypeScript), reduce el contexto nuevo a aprender.

## Persistencia (base de datos)
**PostgreSQL** — elegido por el usuario. Se enseña e integra recién en el bloque final del curso (Fase 9); hasta entonces, todos los RF usan persistencia simulada en memoria.

## Autenticación
**JWT (JSON Web Token)** — elegido por el usuario, coincide con la descripción del documento ("inicio de sesión que devuelve un token de acceso").

## Integración SMS
**Twilio** — fijado por `funcionalidades.md`. Pendiente de confirmación de una línea con el usuario (ver nota abajo).

## Tareas en segundo plano (cron)
Se implementa con una librería de programación de tareas periódicas para Node.js (la concreta se fija con investigación real de versión estable en la Fase 3) — resuelto de forma implícita al elegir Node.js + Express como backend, sin necesitar una pregunta propia en la Fase 2.

## Notas
- La viabilidad y las versiones estables reales de cada tecnología (Express, PostgreSQL, JWT, Twilio, la librería de cron) se auditan en la Fase 3, con investigación real — no se asume ninguna versión de memoria.
- Twilio requiere una cuenta (con capa gratuita/trial) — su viabilidad gratuita concreta y las limitaciones de esa cuenta se evalúan en la Fase 3, no aquí.
