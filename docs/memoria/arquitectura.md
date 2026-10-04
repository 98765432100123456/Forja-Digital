# Arquitectura técnica

Estado al 4 de octubre de 2026 (observado en el código).

## Stack
- **React 19 + TypeScript + Vite 8**, multipágina: `index.html`, `gracias.html`, `privacidad.html` y `404.html`.
- **Prerenderizado en la compilación:** `src/entry-server.tsx` + `scripts/prerender.mjs`. El navegador hidrata con `hydrateRoot` (`src/mount.tsx`).
- **Hosting:** Vercel, desplegado desde GitHub (`98765432100123456/forja-digital`).
  - `main` → producción (`forja-digital-mlid.vercel.app`).
  - Otras ramas → previews protegidas con inicio de sesión de Vercel.
- **Sin backend, sin base de datos y sin cuentas de usuario.** El contacto se resuelve con enlaces a WhatsApp.

## Organización
| Capa | Archivos |
|---|---|
| Datos del negocio | `src/config.ts` (contacto, horario, ID de GA vía `VITE_GA_ID`) |
| Contenido | `src/data.ts` (trabajos, servicios, planes, kits, preguntas, opiniones y equipo) |
| Componentes | `src/components/` (Layout, Navbar, Hero, Works, Simulator, Sections, Extra, Icons) |
| Páginas | `src/pages/` |
| Estilos | `src/index.css` (tokens al inicio) |
| Analítica | `src/analytics.ts` (GA4 opcional; diccionario en [`analitica.md`](./analitica.md)) |
| Seguridad | `vercel.json` y `public/_headers` (CSP, HSTS, X-Frame-Options y otras) |

## Calidad medida (laboratorio, servidor local, Lighthouse 12)
| | Rendimiento | Accesibilidad | Buenas prácticas | SEO | LCP | CLS |
|---|---|---|---|---|---|---|
| Móvil | 98 | 100 | 100 | 100 | 2,1 s | 0,015 |
| Escritorio | 100 | 100 | 100 | 100 | 0,5 s | 0,001 |

Son datos de laboratorio. La experiencia real (Core Web Vitals de campo) se desconoce hasta que haya tráfico.
Mejoras técnicas pendientes que señala Lighthouse:
- Imágenes del portafolio con `srcset` (se sirven a 720 px aunque se muestran más pequeñas).
- CSS que bloquea el renderizado.

Su impacto es bajo frente al de la confianza y la medición.

## Escalabilidad (sección 47) sin construir de más (sección 46)
- **Hoy:** 1 persona, 1 proyecto. No hacen falta cuentas, roles, facturación ni planes, así que no se construyen.
- **Aislamiento por cliente:** cada sitio de cliente va en su propio repositorio, con su propio `docs/memoria/`. Nunca se mezclan datos de clientes.
- **Cuando haya varios clientes:** se reutiliza el *método* y los componentes genéricos (un paquete o plantilla), no el contenido ni los datos.
- **Cuándo agregar backend:** cuando un cliente necesite datos persistentes, como pedidos o inventario. Para Forja Digital mismo no hace falta todavía.
