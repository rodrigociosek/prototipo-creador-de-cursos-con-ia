# Auditoría de viabilidad y versiones del stack

Investigación real hecha el 2026-07-22 (búsquedas web, cruzando registro de npm y fuentes oficiales).

## Viabilidad por RF

| RF | Tecnología | Viable | Detalle del matiz | Alternativa |
|----|-----------|--------|--------------------|-------------|
| RF-01, RF-02, RF-03 | Node.js + Express + jsonwebtoken | Con matiz | `jsonwebtoken` no está deprecado, pero está "feature-frozen": la recomendación consistente para proyectos nuevos en 2026 es `jose` (usa Web Crypto API, soporta JWKS/rotación de claves, funciona en cualquier runtime). Para un curso introductorio, `jsonwebtoken` sigue siendo pedagógicamente válido por su API más simple. | `jose`, si se prefiere la opción más moderna desde el principio. |
| RF-04 | Lógica de autorización en Express (sin librería externa) | Sí | — | — |
| RF-05–RF-09 | Express + PostgreSQL (vía `pg`) | Sí | — | — |
| RF-10 | Express + PostgreSQL | Sí | — | — |
| RF-11 | node-cron + SDK de Twilio | Con matiz | Twilio funciona con una cuenta de prueba (trial) gratuita, pero esa cuenta **solo puede enviar SMS a números de teléfono verificados manualmente** y antepone "Sent from your Twilio trial account" al mensaje — suficiente para aprender y probar, no para un uso real sin verificar cada destinatario. Confirmar los términos vigentes al crear la cuenta, pueden cambiar. | Ninguna alternativa evaluada — el documento de funcionalidades ya fija Twilio explícitamente. |
| RF-12 | React (estados de carga/error en componentes) | Sí | — | — |

## Versiones verificadas

| Tecnología | Versión estable | Fecha | Fuente |
|---|---|---|---|
| Node.js | v24.18.0 (LTS activa) | LTS desde oct. 2025, última minor 23-jun-2026 | [nodejs.org/en/about/previous-releases](https://nodejs.org/en/about/previous-releases) |
| React | 19.2.8 | jul-2026 (registro npm) | [registry.npmjs.org/react](https://registry.npmjs.org/react), [react.dev/versions](https://react.dev/versions) |
| Vite | 8.1.5 | 16-jul-2026 | [github.com/vitejs/vite/releases/tag/v8.1.5](https://github.com/vitejs/vite/releases/tag/v8.1.5) |
| Express | 5.2.1 | dic-2025 | [npmjs.com/package/express](https://www.npmjs.com/package/express), [herodevs.com](https://www.herodevs.com/blog-posts/express-3-is-eol-express-4-is-next-the-2026-support-reference) |
| pg (node-postgres) | 8.22.0 | jun-2026 (aprox.) | [npmjs.com/package/pg](https://www.npmjs.com/package/pg) |
| PostgreSQL | 18.4 | 14-may-2026 | [postgresql.org — anuncio de versiones](https://www.postgresql.org/about/news/postgresql-184-1710-1614-1518-and-1423-released-3297/) |
| jsonwebtoken | 9.0.3 | 4-dic-2025 | [npmjs.com/package/jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) |
| twilio (SDK Node) | 6.0.2 | 7-may-2026 | [npmjs.com/package/twilio](https://www.npmjs.com/package/twilio) |
| node-cron | 4.6.0 | jul-2026 (aprox.) | [npmjs.com/package/node-cron](https://www.npmjs.com/package/node-cron) |

Todas las versiones son estables (no beta/RC). PostgreSQL 19 está en beta al momento de esta auditoría — se descarta a favor de 18.4, la mayor estable vigente.

## Notas relevantes por tecnología

- **Node.js**: Node 22 pasa a fin de soporte (EOL) entre el 22 y 30 de junio de 2026 — v24 es la elección correcta para un curso que arranca ahora.
- **Express 5.x** es ahora la versión endorsada por el comité técnico del proyecto (Express 3 ya es EOL) — se usa 5.x, no 4.x.
- **twilio (SDK)** v6 requiere Node.js >= 20 — compatible sin problema con Node 24 LTS.
- **node-cron** sigue activamente mantenido (releases frecuentes en 2026, +220.000 repos lo usan) — suficiente para el caso de este proyecto (revisar recordatorios cada minuto). No hace falta una cola persistente (BullMQ) para este alcance.

## Checkpoint — confirmado por el usuario el 2026-07-22

1. **JWT**: se mantiene `jsonwebtoken` (9.0.3) — elegido por su API más simple para un curso introductorio, con conocimiento de que `jose` es la alternativa moderna recomendada si el proyecto evoluciona más allá del curso.
2. **Twilio trial**: aceptado — se sabe que la cuenta de prueba solo envía SMS a números verificados manualmente y antepone un aviso al mensaje.

Todo el stack queda confirmado: Node.js v24.18.0, React 19.2.8, Vite 8.1.5, Express 5.2.1, pg 8.22.0, PostgreSQL 18.4, jsonwebtoken 9.0.3, Twilio SDK 6.0.2, node-cron 4.6.0.
