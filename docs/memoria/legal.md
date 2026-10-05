# Legal: privacidad, cookies, términos y derechos de autor

Estado al 4 de octubre de 2026. **Esto no reemplaza la revisión de un abogado** (uno de los videos fuente lo dice explícitamente
y es correcto). Lo que sigue es lo que se implementó, en qué norma se apoya y qué quedó pendiente.

## Fuentes consultadas
- Decreto 1074 de 2015, art. 2.2.2.25.3.1 (antes art. 13 del Decreto 1377 de 2013): contenido mínimo de la política de
  tratamiento. Consultado en [normativa.colpensiones.gov.co](https://normativa.colpensiones.gov.co/colpens/docs/decreto_1074_2015_pr026.htm).
- Ley 1480 de 2011, art. 47 (retracto): 5 días, excepciones para servicios ya iniciados y bienes a la medida; reembolso en
  30 días calendario. Consultado en [Asuntos Legales](https://www.asuntoslegales.com.co/consumidor/todo-lo-que-debe-saber-sobre-el-derecho-al-retracto-y-mire-en-que-situaciones-aplica-3785770).
- Cookies en Colombia: no hay ley específica; aplica la Ley 1581 cuando las cookies recogen datos personales, con
  autorización previa, expresa e informada. Consultado en [Asuntos Legales](https://www.asuntoslegales.com.co/consumidor/conozca-los-aspectos-legales-que-debe-tener-en-cuenta-al-usar-cookies-en-sitios-web-3375211).
- Ley 1581 de 2012, arts. 14–15 (plazos de consultas y reclamos) y art. 17 (deber de informar incidentes a la SIC): de
  conocimiento general, **no se volvieron a consultar en este ciclo** (inferido).

## Lo implementado

| Requisito (fuente) | Dónde | Estado |
|---|---|---|
| Política de privacidad con enlace visible en el pie (imagen 1) | `/privacidad`, pie → "Legal" | VERIFIED |
| Contenido mínimo del Decreto 1074: responsable, domicilio, teléfono, correo, finalidad, derechos, quién atiende, procedimiento, vigencia | `/privacidad` puntos 1–12 | PASSED (correo `forjadigital7@gmail.com` agregado el 4 oct 2026) |
| Autorización informada en el formulario | Nota bajo el botón "Enviar por WhatsApp" | PASSED |
| Uso de IA declarado (video 2) | `/privacidad` punto 5: se usa IA para diseñar; no se ingresan datos personales sin autorización expresa | Aprobado por Juanes |
| Derecho a borrar datos y cómo pedirlo (video 2) | `/privacidad` puntos 9–10 | PASSED |
| No enviar mensajes no pedidos / dejar de escribir si lo piden (video 2) | `/privacidad` punto 3 | PASSED (compromiso operativo de Juanes) |
| Aviso de cookies con aceptar y rechazar (imagen 3) | `CookieBanner.tsx` + `consent.ts` | VERIFIED: 23 pruebas en navegador |
| GA4 no se carga ni instala cookies sin aceptar | `analytics.ts` + regla en el veto del build | VERIFIED |
| Cambiar la decisión después y borrar cookies `_ga` | Pie → "Preferencias de cookies" | VERIFIED |
| Términos y condiciones: compra, pagos, garantías, entregas, devoluciones (imagen 4) | `/terminos` | PASSED; 50/50 aprobado por Juanes |
| Retracto según la Ley 1480 | `/terminos` punto 7 | PASSED (texto basado en la fuente citada) |
| No usar testimonios falsos (video 2) | Sitio: 0 opiniones inventadas (D5); `/terminos` punto 9 lo declara | VERIFIED |
| Maqueta del hero marcada como ejemplo | "Ejemplo ilustrativo" visible | VERIFIED |

## Inventario de derechos de autor (imagen 2)

| Recurso | Origen | Licencia | Estado |
|---|---|---|---|
| Tipografías del sitio (Unbounded, Manrope) | @fontsource, alojadas en el propio sitio | SIL OFL 1.1 | VERIFIED (registro de npm) |
| Tipografías de los kits (Bebas Neue, DM Serif Display, Montserrat, Playfair Display, Poppins) | Google Fonts | SIL OFL 1.1 | Inferido (son fuentes de Google Fonts; el archivo de licencia no se revisó uno por uno) |
| Íconos de los kits | Font Awesome Free 6 (`react-icons/fa6`) | Íconos CC BY 4.0: **exige atribución** | Atribución agregada en `/terminos` punto 11 |
| Piezas de portafolio y kits (16 + 4 imágenes) | Generadas por código para este proyecto (`/home/claude/kits/build.js`): formas, texto e íconos; las "fotos" son marcadores con un ícono de cámara | Propias | VERIFIED: ninguna foto de terceros |
| Íconos del sitio (`Icons.tsx`) | Dibujados a mano (los trazos no coinciden con Lucide ni Feather) | Propios | Inferido |
| Logotipos de WhatsApp, Facebook e Instagram | Marcas de Meta | Uso para indicar el canal de contacto | Declarado en `/terminos` |
| Imagen para compartir (`og.jpg`) | Regenerada con la identidad actual (antes tenía la identidad vieja: degradado y Poppins) | Propia | VERIFIED |
| Foto del equipo (`juanes.webp`) | Foto propia de Juanes (4 oct 2026), recortada a 640×640 y sin metadatos | Propia | VERIFIED |

**Regla para clientes:** fotos propias o de bancos con licencia comercial (Unsplash, Pexels); nunca imágenes de Google. Está
en `/terminos` punto 9 y en la página de plantillas. **Freepik** no se recomienda por defecto: buena parte de su contenido
gratuito exige atribución, y algunos recursos son solo para suscriptores.

## Pendiente o con riesgo residual
- **Retracto de las plantillas digitales:** la redacción ("el retracto aplica mientras no te hayamos enviado el enlace") es
  una interpretación de la excepción de bienes que no pueden devolverse. HYPOTHESIS legal: **validarla con un abogado**.
- **Cancelación con el trabajo empezado y acompañamiento sin permanencia:** son decisiones de negocio redactadas con un
  criterio razonable, pendientes de que Juanes las confirme.
- **Registro Nacional de Bases de Datos (RNBD):** solo es obligatorio para sociedades y entidades con activos superiores a
  100 000 UVT (inferido; no se verificó en este ciclo). Una persona natural que empieza probablemente no está obligada. Hay que confirmarlo.
- **Retención de datos:** la política dice "mientras sean necesarios y lo que exijan las normas contables". No define un plazo exacto.

## Revisión "que no me demanden" (video de Félix G., 4 de octubre de 2026, noche)

| Punto del video | Estado | Qué se hizo o qué falta |
|---|---|---|
| Política de privacidad | VERIFIED | Se agregó la Ley 2300 de 2023: horarios de contacto y solo por el canal que usó la persona |
| Términos y condiciones | VERIFIED | Se agregaron los medios de pago (Nequi, Daviplata, transferencia y Bre-B) y la nota de impuestos ("no se cobra IVA") |
| Política de cookies | VERIFIED (nueva) | `/cookies` con la tabla de lo que se guarda: `_ga` y `_ga_<ID>` 2 años según la [documentación de Google](https://support.google.com/analytics/answer/11397207?hl=es), más `forja:cookies` y `forja:mensaje` |
| Consentimiento de cookies | VERIFIED | El aviso enlaza ahora a `/cookies`; la página tiene un botón para cambiar la decisión |
| Política de reembolsos (¿la necesito?) | **Sí**: Ley 1480 (retracto y garantía). VERIFIED (nueva) | `/reembolsos`: pagos, retracto, tabla de casos y canal de PQR con radicado (fecha del correo o chat), respuesta en 15 días hábiles y reembolso en 30 días calendario |
| Consentimiento en los formularios | VERIFIED (nuevo) | Casilla obligatoria **sin marcar** por defecto; sin ella el formulario no se envía, muestra el error y enfoca la casilla |
| Enlazar todo | VERIFIED | Pie → Legal: privacidad, términos, reembolsos, cookies y preferencias |
| Datos mínimos necesarios | VERIFIED | Formulario: nombre y servicio obligatorios; negocio y mensaje opcionales; nada se guarda en un servidor. GA4: IP anonimizada, sin señales de Google ni personalización de anuncios |
| Revisar las analíticas | VERIFIED | Solo GA4, solo con consentimiento; eventos sin datos personales (`con_nombre` es sí/no) |
| Widgets externos | VERIFIED | Ninguno incrustado. La CSP cambió a `frame-src 'none'` (antes permitía Google Maps sin usarlo) |
| Accesibilidad, texto alternativo y contraste | VERIFIED | axe 0 violaciones en 9 páginas (incluye contraste); tablas desplazables ahora accesibles con teclado |
| Botones claros | VERIFIED | 65 etiquetas revisadas en 9 páginas, ninguna genérica ni vacía; los botones repetidos ("Pedir este kit", "Cotizar este plan") ahora dicen a qué kit o plan van, sin perder el texto visible (WCAG 2.5.3) |
| Sin reseñas falsas ni afirmaciones sin respaldo | VERIFIED | 0 opiniones inventadas. Se suavizaron absolutos en `/apps` ("nunca ve" → "no puede ver"; "Funciona para todos" → "Pensada para todos") |
| Datos del negocio | PARCIAL | Pie: nombre comercial, responsable, Bogotá, correo y teléfono. **Falta el NIT** (Juanes no tiene RUT) y una **dirección de notificación judicial** (Juanes decidió publicar solo la ciudad por privacidad). La Ley 1480, art. 50, exige ambos en comercio electrónico: RESIDUAL RISK |
| Copyright | VERIFIED | Inventario arriba |
| Leyes locales | VERIFIED con pendientes | Ley 1581, Decreto 1074, Ley 1480 (arts. 47 y 50), Ley 2300. Accesibilidad web obligatoria (Resolución 1519 de 2020): aplica a entidades públicas, no a Forja (inferido) |

### Ley 1480, art. 50 (comercio electrónico)
Fuente: [Guía de comercio electrónico](https://www.supertransporte.gov.co/documentos/2024/Mayo/DelegaturaPU_28/Guia_sobre_comercio_electronico.pdf).

| Exige | Estado |
|---|---|
| Nombre | Cumple |
| NIT | Pendiente: sin RUT |
| Dirección de notificación judicial | Pendiente: solo ciudad |
| Teléfono y correo | Cumple |
| Características y precio total | Cumple ("no se cobra IVA") |
| Retracto | Cumple |
| Condiciones generales | Cumple (`/terminos`) |
| Medios de pago | Cumple |
| Mecanismo de PQR | Cumple (`/reembolsos`) |
| Reversión del pago | No aplica: no se reciben pagos con tarjeta en el sitio (inferido) |

**Nuevas reglas redactadas por Claude, pendientes de que Juanes las confirme:**
- El mes de acompañamiento ya pagado no se devuelve.
- Si un defecto no se puede corregir, se devuelve lo pagado por esa parte.
