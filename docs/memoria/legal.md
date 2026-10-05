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
| Foto del equipo | Aún no existe | — | Pendiente (Juanes) |

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
