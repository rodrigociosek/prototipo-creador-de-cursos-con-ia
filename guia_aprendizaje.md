

---

## 📘 Guía Oficial de Aprendizaje del Curso

*Qué información recolectar antes de enseñar cada herramienta o concepto*

Este documento **no es una plantilla de secciones para una clase** — no dicta que cada clase tenga 9 títulos fijos ni un orden de párrafos obligatorio. Es una guía de **investigación**: antes de escribir una clase de conocimiento, se recolecta información en estas categorías, y con eso ya recolectado se escribe la clase como una narración de pasos conectados (eso lo definen las reglas de la clase, no este documento). El objetivo es que el contenido final sea rico y completo — con contexto real, no solo la definición de manual — sin caer en relleno ni repetición.

### 🧩 Principios adicionales

- **Simulación para desacoplar el aprendizaje**
  Cuando una parte del sistema aún no se ha aprendido, se reemplaza temporalmente por una simulación (datos falsos, funciones vacías, stubs). Así se puede avanzar sin dependencias y sin bloqueos, hasta que llegue el momento de implementar la pieza real.

- **No se aprende ninguna herramienta antes de que sea necesaria**
  Cada tecnología, librería o patrón se introduce exclusivamente cuando el proyecto lo exige. Nunca se acumula teoría por adelantado.

- **Flexibilidad**
  No todas las categorías de información de abajo tienen contenido real para todo concepto. Se usan las que aplican — un concepto simple puede quedarse en 3 o 4 categorías; uno con más peso real (seguridad, protocolos, mecanismos internos) puede necesitar todas. Forzar una categoría sin contenido real es peor que omitirla.

- **Profundización progresiva**
  Cuando el proyecto vuelve a necesitar un concepto ya enseñado, pero ahora con más exigencia, se investiga y se recolecta información nueva sobre las mismas categorías, con más detalle — no se re-explica desde cero lo que ya se enseñó.

---

### 🔍 Categorías de información a recolectar (aplicable a cualquier herramienta o concepto)

No es una secuencia obligatoria ni un temario — es un checklist de investigación. Antes de escribir la clase, revisa cuáles de estas aportan algo real para el concepto puntual:

1. **Qué es** — definición directa, en una o dos frases, sin tecnicismos innecesarios.

2. **Para qué sirve / qué necesidad atiende** — por qué existe, no solo qué hace. Cuando exista un enfoque anterior (otra herramienta, escribirlo a mano, una forma más manual de lograr lo mismo), se lo presenta con honestidad: **ese enfoque funciona y probablemente se sigue usando** — la herramienta nueva no lo reemplaza por estar roto, sino porque resulta más cómoda, más práctica o más eficiente para este caso puntual. No se dramatiza una limitación menor del enfoque anterior para justificar la herramienta nueva — ver `references/reglas-de-clase.md` § Regla fundamental, punto 7.

3. **Cómo funciona por detrás** — el mecanismo real: qué hace la máquina, el runtime o el motor cuando esto se ejecuta. No es obligatorio en todo concepto (una función de una librería simple puede no necesitarlo), pero cuando el concepto tiene un mecanismo real detrás (un event loop, un protocolo, un ciclo de vida), se investiga y se explica — no se da por sentado que "simplemente funciona".

4. **Entradas y salidas** — qué recibe, qué produce, qué efecto tiene. Aplica tanto a una función concreta como a un concepto más abstracto (qué información necesita para operar, qué resultado deja).

5. **Cómo se usa en la práctica real** — patrones de uso cotidiano, no solo el ejemplo mínimo de un manual. Cómo lo usa alguien que ya lo maneja en el día a día, no solo la sintaxis de introducción.

6. **Buenas prácticas vigentes** — qué recomienda hoy la documentación oficial o la comunidad (investigado, no de memoria) — y, si corresponde, qué convención quedó obsoleta y por qué ya no se recomienda.

7. **Tips y detalles no obvios** — atajos, comportamientos poco conocidos, matices que alguien con experiencia real sabe y que un tutorial básico suele omitir.

8. **Errores comunes y cómo reconocerlos** — qué suele fallar cuando esto se usa mal, y la señal que permite reconocer ese error si aparece más adelante en el proyecto.

9. **Alternativas conocidas** — que existan otras opciones, y en qué se diferencia esta — sin desviar el foco de la clase hacia esas alternativas.

### ✍️ Cómo se redacta esta información (obligatorio)

- **Simple y directo** — sin tecnicismos que no aporten, sin inflar una idea corta con palabras de más.
- **Sin redundancia** — cada categoría aporta información nueva; si dos categorías terminarían diciendo lo mismo con otras palabras, se fusionan o se recorta una.
- **Nunca se explica lo que algo NO es** — salvo que sea la forma más clara de evitar una confusión real y frecuente (p. ej. distinguir dos conceptos que se confunden mucho entre sí), no se dedica espacio a describir por la negativa; se explica qué es y punto.
- **Cada categoría que sí aplica se completa entera** — no se corta a la porción que se va a usar en el próximo paso de construcción; si un detalle es relevante para entender el concepto, se incluye aunque no se use de inmediato.

---
