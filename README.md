# Forja Digital · Sitio web

Landing de Forja Digital hecha con **React + Vite + TypeScript**.
Sin dependencias externas en tiempo de ejecución: las fuentes van incluidas en el proyecto y no hay scripts de terceros.

## Requisitos
- Node.js 20 o superior

## Correr en tu computador
```bash
npm install
npm run dev        # abre http://localhost:5173
```

## Generar la versión final
```bash
npm run build      # crea la carpeta dist/
npm run preview    # revisa la versión final en http://localhost:4173
```

## Dónde se cambian las cosas
| Qué | Archivo |
|---|---|
| Número de WhatsApp, Facebook, Instagram | `src/config.ts` |
| Textos, servicios, precios, preguntas, portafolio | `src/data.ts` |
| Colores y estilos | `src/index.css` (variables al inicio) |
| Título, descripción e imagen al compartir | `index.html` y `public/og-image.jpg` |
| Imágenes del portafolio | `src/assets/portfolio/` (formato .webp) |

## Publicar gratis en Vercel (recomendado)
1. Sube esta carpeta a un repositorio de GitHub.
2. Entra a https://vercel.com, inicia sesión con GitHub → **Add New → Project** → elige el repositorio.
3. Vercel detecta Vite solo (Build: `npm run build`, Output: `dist`). Dale **Deploy**.
4. Te queda una dirección tipo `forja-digital.vercel.app`. Esa es la que pones en tu página de Facebook (Editar información → Sitio web).
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
