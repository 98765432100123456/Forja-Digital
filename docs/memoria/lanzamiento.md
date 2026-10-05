# Checklist de lanzamiento, parte 2 (20 puntos)

Fuente: video de @luisalvarezweb ("Otras 20 cosas antes de lanzar tu web"). Revisado el 4 de octubre de 2026.
La parte 1 (20 puntos) se aplicó el 3 de octubre de 2026 (commit `8c42aab`).

| # | Punto | Estado | Evidencia o lo que falta |
|---|---|---|---|
| 1 | Quitar el noindex | VERIFIED | `index, follow` en inicio, plantillas, privacidad y términos; `noindex` solo en /gracias y /404, a propósito |
| 2 | Alta en Search Console | Preparado, **depende de Juanes** | Variable `VITE_GSC_VERIFICATION`: el build inserta la etiqueta meta en el inicio (probado con un código de prueba). Falta crear la propiedad y enviar `sitemap.xml` |
| 3 | Alta en Bing Webmaster Tools | Preparado, **depende de Juanes** | Variable `VITE_BING_VERIFICATION`, o importar directamente desde Search Console |
| 4 | Teléfono y correo tocables | VERIFIED | WhatsApp, llamada (`tel:`) y correo (`mailto:forjadigital7@gmail.com`) tocables en contacto, privacidad y términos |
| 5 | Íconos de redes a cuentas reales | PASSED | No se muestra ningún ícono sin enlace real. Falta el enlace de la página de Facebook (Juanes) |
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
| 20 | Medir conversiones | Preparado, **depende de Juanes** | `generate_lead` y el embudo del simulador; ahora solo con consentimiento de cookies. Falta `VITE_GA_ID` |
