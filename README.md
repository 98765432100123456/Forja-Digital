# Forja Digital · Sitio web

Landing de Forja Digital hecha con **React + Vite + TypeScript**.
Sin dependencias externas en tiempo de ejecución: las fuentes van incluidas en el proyecto y no hay scripts de terceros.
El HTML de cada página se prerenderiza al compilar (`src/entry-server.tsx` + `scripts/prerender.mjs`), así Google y las redes leen el contenido sin JavaScript.

## Requisitos
- Node.js 20 o superior

## Correr en tu computador
```bash
npm install
npm run dev        # abre http://localhost:5173
```

## Generar la versión final
```bash
npm run build      # compila, prerenderiza el HTML de cada página y crea dist/
npm run preview    # revisa la versión final en http://localhost:4173
```

## Dónde se cambian las cosas
| Qué | Archivo |
|---|---|
| Número de WhatsApp, Facebook, Instagram | `src/config.ts` |
| Textos, servicios, precios, preguntas, portafolio | `src/data.ts` |
| Colores y estilos | `src/index.css` (tokens al inicio; ver `docs/SISTEMA-DE-DISENO.md`) |
| Título, descripción e imagen al compartir | cada `.html` de la raíz y `public/og-image.jpg` |
| Imágenes del portafolio | `src/assets/portfolio/` (formato .webp) |

## Páginas del sitio
| Página | Archivo HTML | Contenido |
|---|---|---|
| `/` | `index.html` | Página principal |
| `/gracias` | `gracias.html` | Agradecimiento después del formulario (no se indexa en Google) |
| `/privacidad` | `privacidad.html` | Política de privacidad (Ley 1581 de 2012) |
| cualquier ruta que no exista | `404.html` | Página 404 personalizada |

Cada página tiene su propio título, metadescripción, ruta de navegación (breadcrumbs) y datos estructurados.

## Pendientes que debes completar tú
- **Google Analytics:** crea una propiedad GA4 en https://analytics.google.com, copia el ID `G-XXXXXXX` y en Vercel ve a
  **Settings → Environment Variables** → agrega `VITE_GA_ID` con ese valor → vuelve a desplegar. Sin el ID no se carga nada de Google.
  Cada clic a WhatsApp se registra como evento `generate_lead`.
- **Foto del equipo:** guarda tu foto cuadrada como `src/assets/equipo/juanes.webp` (o `.jpg`). Mientras no esté, salen tus iniciales.
- **Opiniones reales:** agrégalas en `REVIEWS` dentro de `src/data.ts` (solo reseñas verdaderas y con permiso del cliente).
- **Casos de éxito:** cuando tengas clientes, edita `WORKS` en `src/data.ts` con `demo: false` y un resultado real.
- **Mapa y dirección:** si atiendes en un lugar físico, llena `address` y `mapEmbedUrl` en `src/config.ts`.
- **Redes:** pon los enlaces en `facebook` e `instagram` en `src/config.ts`. Vacíos no se muestran.

## Publicar gratis en Vercel (recomendado)
1. Sube esta carpeta a un repositorio de GitHub.
2. Entra a https://vercel.com, inicia sesión con GitHub → **Add New → Project** → elige el repositorio.
3. Vercel detecta Vite solo (Build: `npm run build`, Output: `dist`). Dale **Deploy**.
4. Te queda una dirección tipo `forja-digital-mlid.vercel.app`. Esa es la que pones en tu página de Facebook (Editar información → Sitio web).
5. Si cambia la dirección, actualízala en `index.html`, `public/robots.txt` y `public/sitemap.xml`.

**Alternativa Netlify:** arrastra la carpeta `dist/` a https://app.netlify.com/drop, o conecta el repositorio (Build `npm run build`, Publish `dist`).

## Seguridad incluida
- Cabeceras de seguridad en `vercel.json` (Vercel) y `public/_headers` (Netlify):
  Content-Security-Policy, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy y Permissions-Policy.
- Todos los enlaces externos usan `rel="noopener noreferrer"`.
- Fuentes autoalojadas: no se carga nada de Google ni de terceros, y no se rastrea a los visitantes.
- No hay formularios ni claves en el código. El contacto se hace por WhatsApp.

## Dominio propio (opcional)
Compra el dominio (por ejemplo `forjadigital.co`) y en Vercel ve a **Settings → Domains** para conectarlo. El certificado HTTPS se genera automáticamente.

## Documentación de diseño
- `docs/AUDITORIA.md`: auditoría UX y visual, cambios hechos y pruebas.
- `docs/SISTEMA-DE-DISENO.md`: paleta, tipografía, espaciado, estados y movimiento.
- `docs/ESTRATEGIA.md`: producto, competencia, recorrido del usuario, World-Class Gate y pendientes.
