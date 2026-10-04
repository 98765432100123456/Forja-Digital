# Estrategia de producto de Forja Digital

Documento de las fases 01 a 05, 16 y 17 del proceso "World-Class Digital Product Engine". Complementa
[`AUDITORIA.md`](./AUDITORIA.md) (estado y pruebas) y [`SISTEMA-DE-DISENO.md`](./SISTEMA-DE-DISENO.md) (lenguaje visual).

---

## 01 · Discover

| Aspecto | Lo que sabemos | Supuesto explícito (sin dato todavía) |
|---|---|---|
| Propósito | Conseguir conversaciones de venta por WhatsApp para un servicio de diseño y desarrollo de una sola persona. | — |
| Propuesta de valor | Diseño para redes, páginas web, bases de datos y seguridad, a precio de estudiante y con trato directo. | — |
| Usuarios | Dueños de salones de belleza, restaurantes, inmobiliarias y emprendimientos en Colombia. | Llegan sobre todo desde el celular, por Facebook o Instagram. |
| Necesidad | Verse profesionales y vender más sin entender de tecnología. | Su mayor miedo es pagar y recibir algo genérico, o quedarse sin soporte. |
| Contexto de uso | Celular, entre tareas del negocio, con poca paciencia. | Comparan con "lo hago yo con Canva o con IA". |
| Modelo de negocio | Proyectos por precio fijo "desde", mantenimiento mensual y venta de kits de plantillas. | — |
| Acción principal | Escribir por WhatsApp. | — |
| Tecnología | React + Vite + TypeScript, multipágina, desplegado en Vercel desde GitHub. | — |
| Limitaciones | Sin clientes ni opiniones reales todavía, sin foto del fundador y sin dominio propio. | — |

**Qué debe permanecer:** la frase de marca, el banco de trabajo del hero, las pestañas de trabajos, los precios visibles, el
formulario a WhatsApp y las páginas del checklist.

**Qué debe evolucionar:** la confianza (hoy solo hay piezas de muestra) y la indexación (el HTML llega vacío a los buscadores).

**Qué debe desaparecer:** nada grande; solo fricción puntual (ver Gate).

**Qué falta:** una forma de que el visitante vea *su propio* negocio antes de pagar, y un HTML legible sin JavaScript.

**Ventaja competitiva posible:** ser el único que deja "probarse" el resultado en 20 segundos y lo convierte en una
cotización concreta por WhatsApp.

---

## 02 · Inteligencia competitiva

| Competidor | Tipo | Qué hace bien | Qué hace mal (oportunidad) |
|---|---|---|---|
| Agencias y estudios web en Colombia | Directo | Portafolios cuidados, procesos claros. Tarifas de referencia publicadas: landing desde $500.000–$1.500.000 y webs corporativas desde $1.500.000–$4.000.000 COP. | Precio alto para un negocio pequeño, formularios largos y respuesta lenta. |
| Freelancers locales | Directo | Precio bajo, trato por WhatsApp. | Portafolios genéricos, sin precios, sin garantía ni soporte visible. |
| Constructores con IA (Hostinger, Wix y similares) | Indirecto | Muy baratos (menos de 3 € al mes en algunos planes) y rápidos. | El dueño hace todo solo; el resultado se parece al de todos; nadie responde por el negocio. |
| Plantillas de Canva, Etsy o Hotmart | Indirecto | Baratas e inmediatas. | Sin identidad propia, sin web, sin datos. |
| "El sobrino que sabe de sistemas" | Indirecto | Confianza personal, casi gratis. | Sin continuidad ni seguridad. |

### Matriz categoría → estándar → oportunidad → diferenciación

| Categoría | Estándar del sector | Oportunidad | Diferenciación de Forja Digital |
|---|---|---|---|
| Precio | "Cotiza con nosotros", sin cifras | Transparencia reduce el miedo | Precios "desde" visibles y tiempos de entrega por plan |
| Prueba | Capturas de portafolio | El cliente no se imagina *su* negocio | Simulador "Mira tu negocio": nombre, tipo y color en vivo |
| Contacto | Formulario largo o WhatsApp genérico | Llegar al chat con contexto ahorra una vuelta | Mensajes prellenados con lo que el visitante eligió |
| Confianza | Testimonios genéricos (a veces inventados) | La honestidad es escasa | Casos marcados como demostrativos, opiniones solo reales, una persona visible |
| IA | Venderla como magia o ignorarla | Explicar qué hace y qué no | "La IA genera. Nosotros construimos." como postura |

**Qué hacen todos:** portafolio, servicios, formulario y botón de WhatsApp.
**Qué hacen excepcionalmente bien algunos:** procesos claros y precios publicados (en artículos, rara vez en la oferta).
**Qué nadie resuelve bien:** que un dueño de negocio *vea su propio resultado* antes de hablar de dinero. Esa es la apuesta.

---

## 03 · Estrategia

- **Propuesta central:** tu negocio, bien hecho, sin pagar precio de agencia y sin hacerlo tú solo.
- **Promesa:** "Mira cómo se vería tu negocio en 20 segundos. Si te gusta, lo construimos contigo."
- **Posicionamiento:** entre la herramienta de IA (barata, pero haces todo tú) y la agencia (completa, pero cara y lejana).
- **Personalidad:** un taller. Directo, cuidadoso y sin humo.
- **Diferenciador:** el simulador + precios visibles + una persona real que responde.
- **Acción principal:** escribir por WhatsApp con contexto. Las acciones secundarias son ver trabajos y probar el simulador.
- **Prioridades:** 1) confianza, 2) claridad de precio, 3) velocidad para llegar al chat, 4) encontrabilidad en Google.
- **Principios de producto:**
  1. Mostrar antes de prometer.
  2. Cada clic acerca a una conversación con contexto.
  3. Nunca inventar datos.
  4. Rápido en un celular de gama media.

---

## 04 · Arquitectura de la experiencia

| Etapa | Pregunta del usuario | Respuesta en el producto |
|---|---|---|
| Entrada | ¿Llegué al lugar correcto? | Hero: qué es, para qué negocios, y el banco de trabajo con piezas reales. |
| Orientación | ¿Qué puedo hacer aquí? | Dos caminos claros: "Cotizar por WhatsApp" o "Ver trabajos". |
| Descubrimiento | ¿Qué han hecho? | Trabajos por tipo de negocio, con el reto y lo entregado. |
| Comprensión | ¿Cómo se vería lo mío? | Simulador "Mira tu negocio" (nuevo). |
| Decisión | ¿Cuánto cuesta y cuánto tarda? | Servicios, comparación con la IA, planes con precio y tiempo. |
| Acción | ¿Cómo empiezo? | WhatsApp con un mensaje que ya dice el plan, el kit o el estilo elegido. |
| Feedback | ¿Funcionó? | Estado "Abriendo WhatsApp…", /gracias con el mensaje recuperado. |
| Continuidad | ¿Y después? | Proceso en 4 pasos, acompañamiento mensual y preguntas frecuentes. |

---

## 16 · Conversión y negocio

- **Acción de mayor valor:** iniciar el chat con contexto (plan, kit o estilo simulado). Se mide como `generate_lead` en GA4.
- **Sin dark patterns:**
  - Sin contadores falsos de urgencia ni "quedan 2 cupos".
  - Sin opiniones inventadas.
  - Sin ocultar que el dominio y el hosting se pagan aparte.

---

## 17 · Simulación de usuarios

| Usuario | Fricción | Causa | Solución |
|---|---|---|---|
| Nuevo | No sabe si esto es para su tipo de negocio. | — | Hero nombra los 4 tipos; pestañas de trabajos por tipo. |
| Recurrente | Quiere escribir de una vez. | El CTA puede quedar lejos. | Botón en el menú y barra fija en móvil. |
| Indeciso | "¿Y si no me gusta lo que hacen?" | Solo ve trabajos de otros. | Simulador con su nombre y su color; casos honestos; precios visibles. |
| Móvil | Poca atención, pantalla pequeña. | Tablas anchas y páginas largas. | Comparación apilada, pasos en lista, simulador vertical, barra fija. |
| Experto | Quiere saber qué tecnología y qué seguridad. | Se menciona poco. | Preguntas frecuentes sobre seguridad; detalle de HTTPS y roles. |
| Accesibilidad | Lector de pantalla o teclado. | Componentes personalizados. | Radios nativos en el simulador, pestañas ARIA, foco visible, axe sin violaciones. |

---

## Fuentes del análisis competitivo

- Precios de referencia en Colombia: [Novux Studio](https://novuxstudio.com/diseno-y-desarrollo-web/cuanto-cuesta-una-pagina-web-en-colombia/), [BigRedes](https://bigredes.com/precio-de-diseno-de-paginas-web-en-colombia/), [Stiven Ramírez](https://stivenramirez.com/blog/cuanto-cobra-disenador-web-colombia/), [Juan C. Támara](https://juanctamara.com/cuanto-cuesta-una-pagina-web-en-colombia-2026/).
- Constructores con IA: [Hostinger AI Builder](https://www.hostinger.com/ai-website-builder), [Xataka](https://www.xataka.com/seleccion/hostinger-tiene-ia-para-crear-proyectos-paginas-web-utilizando-solo-lenguaje-natural-no-llega-a-3-euros-al-mes), [HostAdvice](https://es.hostadvice.com/website-builders/ai/).

---

## 19 · World-Class Gate

Revisión como director creativo exigente. ✔ = corregido en esta iteración; ⏳ = pendiente, con la razón.

### 10 decisiones visuales más débiles

1. ✔ El hero quedaba "en blanco" para un dueño de negocio que no se ve reflejado en las piezas de otros: ahora puede simular las suyas.
2. ✔ El simulador en móvil dejaba la vista previa debajo de los controles: ahora queda fija arriba mientras se elige.
3. ⏳ Las portadas de los kits son oscuras y con texto incrustado; chocan un poco con la página clara. Rehacerlas cuando haya fotos reales.
4. ⏳ La sección "Quién está detrás" usa iniciales en lugar de una foto. Necesita tu foto.
5. ⏳ El botón flotante verde de WhatsApp en escritorio es un patrón muy común. Se mantiene porque ayuda a convertir; habrá que evaluarlo con datos.
6. ✔ Los planes no decían cuánto tarda cada uno: se agregó el tiempo de entrega (tomado de las preguntas frecuentes).
7. ⏳ El banco de trabajo repite el mismo salón de belleza en todas las visitas. Se podría rotar el tipo de negocio.
8. ⏳ Las piezas de muestra tienen precios y nombres de ejemplo; con clientes reales se reemplazan.
9. ⏳ El 404 es correcto pero sobrio; podría incluir una búsqueda o el simulador.
10. ⏳ No hay modo oscuro. No es prioritario para este público.

### 10 decisiones UX más débiles

1. ✔ Los buscadores recibían el HTML vacío (todo dependía de JavaScript): ahora cada página se prerenderiza en la compilación.
2. ✔ El visitante indeciso no tenía cómo imaginar su resultado: simulador con nombre, tipo y color.
3. ✔ El mensaje de WhatsApp no llevaba contexto desde el simulador: ahora incluye tipo, nombre y color.
4. ✔ La barra fija del celular repetía la acción cuando ya había otro botón principal a la vista (simulador, formulario): ahora se oculta.
5. ✔ "Preguntas" ocupaba un lugar del menú con poco valor de decisión; el menú ahora lleva al simulador y las preguntas siguen en el pie.
6. ✔ La página de gracias leía el mensaje durante el render (podía no coincidir con el HTML prerenderizado): ahora lo lee después de montar.
7. ⏳ Los kits no muestran precio ("Pedir este kit"). Falta definir el precio.
8. ⏳ No hay forma de pago explicada (anticipo, medios). No se inventa: hay que definir la política.
9. ⏳ No hay un sitio real de ejemplo para abrir; todo son vistas simuladas. El primer cliente debería convertirse en un caso enlazable.
10. ⏳ Sin dominio propio (`.vercel.app` resta confianza). Comprar `forjadigital.co` o similar.

### 10 oportunidades de diferenciación desaprovechadas

1. ✔ Simulador "Mira tu negocio" (nadie en la competencia revisada lo ofrece).
2. ✔ Precio y tiempo visibles por plan.
3. ⏳ Que el simulador genere una imagen descargable del post para compartir (viralidad).
4. ⏳ Garantía explícita (por ejemplo, rondas de cambios hasta la aprobación). Necesita una decisión de negocio.
5. ⏳ Diagnóstico gratuito de la presencia digital actual del negocio (revisar su Instagram o su web).
6. ⏳ Mostrar el proceso real con fotos del trabajo en curso.
7. ⏳ Paquete combinado kit + landing con la misma identidad.
8. ⏳ Versión en inglés del sitio para vender los kits en Etsy.
9. ⏳ Casos con métricas reales (pedidos, mensajes, visitas).
10. ⏳ Contenido educativo corto (guías para dueños de negocio) que traiga tráfico de Google.

### 10 señales de producto genérico (revisión final)

| Señal | Estado |
|---|---|
| Exceso de tarjetas | Sin problema: solo el plan destacado, el formulario y la vista previa. |
| Repetición visual | Sin problema: cada sección tiene una forma propia. |
| Gradientes arbitrarios | Ninguno. El único degradado es la muestra de dos colores del selector, que explica la paleta. |
| Bordes redondeados excesivos | Tres radios según la jerarquía. |
| Sombras innecesarias | Una sola elevación, solo en objetos que flotan. |
| Iconografía inconsistente | Un solo estilo de trazo y pocos iconos. |
| Layout predecible | Lo rompen el banco de trabajo, las pestañas y el simulador. |
| Copy genérico | Revisado: concreto y sin superlativos. |
| Exceso de centrado | Solo en las páginas de estado. |
| Animaciones gratuitas | Una entrada en el hero; el resto responde a acciones. |

---

## 20 · Revisión final en cinco perspectivas

| Perspectiva | Pregunta | Veredicto |
|---|---|---|
| Producto | ¿Resuelve el problema? | Sí: explica la oferta, muestra trabajo, deja probar y lleva al chat con contexto. |
| Usuario | ¿Es intuitivo y agradable? | Sí: 0 violaciones de axe, móvil rediseñado y feedback en cada acción. |
| Marca | ¿Tiene identidad? | Sí: el taller (banco de trabajo, grafito y brasa naranja) se reconoce sin el logo. |
| Negocio | ¿Produce valor? | Sí, con un límite: la confianza tiene techo hasta que haya foto, casos reales y dominio propio. |
| Ingeniería | ¿Puede evolucionar? | Sí: contenido en datos, tokens en CSS, prerenderizado y pruebas automatizables. |
