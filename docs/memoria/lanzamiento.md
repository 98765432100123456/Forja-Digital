# Checklist de lanzamiento, parte 2 (20 puntos)

Fuente: video de @luisalvarezweb ("Otras 20 cosas antes de lanzar tu web"). Revisado el 4 de octubre de 2026.
La parte 1 (20 puntos) se aplicó el 3 de octubre de 2026 (commit `8c42aab`).

| # | Punto | Estado | Evidencia o lo que falta |
|---|---|---|---|
| 1 | Quitar el noindex | VERIFIED | `index, follow` en inicio, plantillas, privacidad y términos; `noindex` solo en /gracias y /404, a propósito |
| 2 | Alta en Search Console | Preparado, **depende de Juanes** | Variable `VITE_GSC_VERIFICATION`: el build inserta la etiqueta meta en el inicio (probado con un código de prueba). Falta crear la propiedad y enviar `sitemap.xml` |
| 3 | Alta en Bing Webmaster Tools | Preparado, **depende de Juanes** | Variable `VITE_BING_VERIFICATION`, o importar directamente desde Search Console |
| 4 | Teléfono y correo tocables | VERIFIED | WhatsApp, llamada (`tel:`) y correo (`mailto:forjadigital7@gmail.com`) tocables en contacto, privacidad y términos |
| 5 | Íconos de redes a cuentas reales | VERIFIED | Facebook enlazado a la página real (enlace para compartir que dio Juanes); Instagram oculto hasta que exista |
| 6 | Redirecciones 301 | VERIFIED en producción (`/plantillas` → `/plantillas-canva`) | `vercel.json`: /plantillas, /privacy, /politica-de-privacidad, /terms, /terminos-y-condiciones, /contacto, /planes. `.html` → URL limpia lo hace `cleanUrls` (308). Se verifica en el preview de Vercel, no en local |
| 7 | Una sola versión del dominio | VERIFIED en producción (`forja-digital.vercel.app/terminos` redirige a `-mlid`) / **Juanes puede preferir la corta** | Se encontraron **dos sitios públicos iguales**: `forja-digital.vercel.app` y `forja-digital-mlid.vercel.app` (dos proyectos de Vercel conectados al mismo repositorio). Se agregó una 301 de `forja-digital.vercel.app` → `forja-digital-mlid.vercel.app`, que es la URL canónica actual |
| 8 | URL canónicas | VERIFIED | Una por página indexable; se quitó la canónica de /404 |
| 9 | URLs limpias | VERIFIED | `/terminos`, `/plantillas-canva`, `/privacidad` (sin `.html`) |
| 10 | Jerarquía de enlaces internos | PASSED | Inicio → secciones; pie con columnas Sitio, Ayuda y Legal; la sección de plantillas enlaza a su página; migas de pan en las páginas internas |
| 11 | Una página por intención de búsqueda | PASSED | Nueva `/plantillas-canva` (intención: comprar plantillas). Inicio = contratar diseño o web. Se decidió **no** crear páginas por cada servicio: sin tráfico ni datos de búsqueda sería contenido duplicado (sec. 3: saber qué no hacer) |
| 12 | Vista previa al compartir | VERIFIED | `og.jpg` nuevo con la identidad actual, 1200×630, en las 6 páginas. El anterior tenía la identidad vieja |
| 13 | Caché configurada | VERIFIED | `/assets/*` con caché de 1 año inmutable; HTML con revalidación (cabeceras de producción observadas) |
| 14 | SSL con renovación automática | VERIFIED | Vercel lo gestiona; HSTS de 2 años |
| 15 | Copias de seguridad automáticas | PASSED | El código completo está versionado en GitHub y cada despliegue queda guardado en Vercel (se puede volver a cualquiera). No hay base de datos que respaldar |
| 16 | Aviso si la web se cae | Activo en GitHub Actions; primera ejecución: NOT YET VALIDATED | `.github/workflows/disponibilidad.yml`: revisa cada 30 minutos y abre un issue en GitHub si falla 2 veces seguidas. No se ha visto funcionar en GitHub todavía |
| 17 | Borrar el contenido de prueba | VERIFIED | Sin lorem, TODO, localhost ni IDs de prueba en el build. Pendiente (Juanes): rama `claude-prueba-acceso` y PR #1 de Copilot |
| 18 | Probarla en varios navegadores | Parcial | Chromium probado (escritorio y móvil emulado). **Firefox y Safari: NOT TESTED**: este entorno solo tiene Chromium y no puede descargar otros. Falta abrirla en un iPhone (Safari) y en un Android |
| 19 | Página de gracias tras el formulario | VERIFIED | `/gracias` desde el 3 de octubre de 2026 |
| 20 | Medir conversiones | Activado (ID `G-XKHGRSYFDP`) | `generate_lead` y el embudo del simulador, solo con consentimiento. Datos reales: NOT YET AVAILABLE. Falta marcar `generate_lead` como evento clave en GA4 cuando aparezca |

# Checklist "15 cosas para ser real" (@sebas.soto222)

Revisado el 4 de octubre de 2026 con `quince.mjs` (47 comprobaciones automáticas sobre el build local, todas pasaron).

| # | Punto | Estado | Evidencia |
|---|---|---|---|
| 1 | Página de política de privacidad | VERIFIED | `/privacidad` (Decreto 1074) enlazada en el pie |
| 2 | Compresión de imágenes | VERIFIED (nuevo) | Versiones reducidas `-s.webp` (360/450/320 px) con `srcset` y `sizes`. En celular se descargan 61 KB de imágenes y ninguna versión grande. Peso total de la página: 188 KiB. Lighthouse móvil: rendimiento 99 (antes 98), LCP 1,7 s (antes 2,1 s); la auditoría "imágenes del tamaño adecuado" pasa |
| 3 | Términos y condiciones | VERIFIED | `/terminos` enlazada en el pie |
| 4 | sitemap.xml | VERIFIED | 4 URLs indexables y las 4 responden 200 |
| 5 | Meta título en cada página | VERIFIED | 6 títulos únicos, cada uno con su meta descripción |
| 6 | Estado de error en los formularios | VERIFIED | Al enviar vacío: campos con `aria-invalid`, mensaje por campo y foco en el primero con error |
| 7 | Dirección de contacto real | VERIFIED (ajustado) | "Estamos en Bogotá…", teléfono, WhatsApp y correo tocables; `addressLocality: Bogotá` en los datos estructurados. **No se publica la dirección de la casa** (riesgo de privacidad sin beneficio para un servicio remoto) |
| 8 | Banner de cookies | VERIFIED | Aparece en la primera visita; aceptar y rechazar |
| 9 | Texto alternativo en cada imagen | VERIFIED | Todas las `<img>` de las 6 páginas tienen `alt` (vacío solo en las decorativas dentro de una figura descrita) |
| 10 | Página 404 personalizada | VERIFIED | `/404` con salidas a inicio, trabajos, planes y contacto |
| 11 | Página de "Gracias" | VERIFIED | `/gracias` |
| 12 | Breakpoints para móvil | VERIFIED (corregido) | 6 páginas × 5 anchos (320, 390, 768, 1024 y 1440 px). **A 320 px desbordaban** el título del inicio y un botón de la página de plantillas: corregido |
| 13 | Analíticas | VERIFIED | GA4 `G-XKHGRSYFDP` tras aceptar cookies |
| 14 | Favicon personalizado | VERIFIED (corregido) | El favicon tenía los colores y la forma de la marca vieja. Ahora es igual al logo, con versiones PNG de 32 px, `apple-touch-icon` de 180 px (iPhone) e ícono de 512 px para el logo en Google |
| 15 | Imagen de Open Graph | VERIFIED | `og.jpg` 1200×630 en las 6 páginas |

# Videos del 4 de octubre (noche): @sebas.soto222 ×2, @soyenriquerocha y @ulisesdesarrolladorweb

Fuente: 10 capturas y 2 videos enviados por Juanes. Los videos no tienen transcripción de audio (este entorno no puede transcribir). Los puntos se leyeron de los subtítulos cuadro por cuadro.

| # | Punto | Aplica a | Estado | Evidencia o lo que falta |
|---|---|---|---|---|
| A1 | Sin analíticas: medir qué usan y dónde se van (PostHog) | Sitio | VERIFIED | GA4 con consentimiento desde el 4 oct; nuevo evento `view_section` por sección (`analitica.md`) |
| A2 | Sin límite de solicitudes (Upstash, Cloudflare) | Sitio / apps | Sitio: NO APLICA (sin API ni funciones de servidor). Apps: obligatorio | `seguridad.md`; `apps.md` "Operación antes de producción"; ficha de `/apps` |
| A3 | Sin pruebas (componentes, integración y de principio a fin) | Sitio | VERIFIED | `npm test`: 5 suites, 183 comprobaciones; corren en GitHub Actions en cada cambio (`.github/workflows/pruebas.yml`) |
| A4 | Sin registro de errores (Sentry) | Sitio | PARCIAL | Errores de JavaScript a GA4 (`exception`) solo con consentimiento, más una pantalla de rescate. Sentry: requiere la cuenta de Juanes (backlog #12). En apps: obligatorio |
| A5 | Trabajar desorganizado (Linear) | Proceso | VERIFIED con alternativa | `docs/memoria/backlog.md` con responsable y estado, más el tablero de Claude. Linear: opcional, requiere cuenta |
| A6 | Sin tope de gastos | Sitio / apps | Sitio: VERIFIED, todo es gratis y Vercel Hobby no cobra. **Riesgo nuevo:** Hobby es solo para uso no comercial | `seguridad.md`; backlog #2 |
| B1 | No guardar en caché los datos | Sitio / apps | Sitio: VERIFIED (archivos con caché de 1 año inmutable). Apps: obligatorio | Cabeceras de producción; `apps.md` |
| B2 | Sin límite de solicitudes | — | = A2 | |
| B3 | No indexar las tablas | Apps y bases de datos | Obligatorio en apps (`EXPLAIN` con miles de filas) | `apps.md`; ficha de `/apps` ("Rápida aunque crezca") |
| B4 | No hacer pruebas | — | = A3 | |
| C1 | Diseñar con un DESIGN.md: colores, letras, espacios y botones; partir de una página de referencia (Refero Styles) y de UI UX Pro Max | Sitio | VERIFIED | `DESIGN.md` en la raíz, con el sistema de Apple de Refero y la lista de UI UX Pro Max. Cambios aplicados: sin sombras en el contenido, titulares en 700, menú que marca la sección visible |
| D1 | Certificado SSL (candado) | Sitio | VERIFIED | HTTPS y HSTS de 2 años (punto 14 de la parte 2) |
| D2 | Reducir el tamaño de las imágenes (Squoosh) y su formato | Sitio | VERIFIED | WebP con versiones de 320–450 px; 61 KB de imágenes en celular |
| D3 | Medir la velocidad (PageSpeed Insights) | Sitio | VERIFIED con Lighthouse | Lighthouse móvil local (el mismo motor de PageSpeed). PageSpeed en línea devolvió 429 antes: se mide de nuevo en producción |
| D4 | SEO local y palabras clave (Rank Math en WordPress) | Sitio | VERIFIED | Rank Math no aplica (no es WordPress). Equivalente: título y descripción con "Bogotá" y los servicios; datos estructurados con `areaServed` Bogotá y Colombia; sitemap y canónicas |
