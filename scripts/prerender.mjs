// Inserta el HTML prerenderizado de cada página dentro de <div id="root"> en dist/.
import { readFile, writeFile, rm } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const { render, files } = await import(pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href);

// Verificación de propiedad en Google Search Console y Bing Webmaster Tools (códigos públicos, no secretos).
// Se configuran en Vercel como variables de entorno; si no existen, no se agrega nada.
const verify = [
  ['google-site-verification', process.env.VITE_GSC_VERIFICATION],
  ['msvalidate.01', process.env.VITE_BING_VERIFICATION],
]
  .filter(([, v]) => v && /^[A-Za-z0-9_-]{10,100}$/.test(v))
  .map(([name, v]) => `<meta name="${name}" content="${v}" />`)
  .join('\n    ');

for (const file of files) {
  const path = resolve(root, 'dist', file);
  const html = await readFile(path, 'utf8');
  if (!html.includes('<div id="root"></div>')) throw new Error(`No se encontró el contenedor en ${file}`);
  let out = html.replace('<div id="root"></div>', `<div id="root">${render(file)}</div>`);
  if (verify && file === 'index.html') out = out.replace('</head>', `  ${verify}\n  </head>`);
  await writeFile(path, out);
  console.log(`prerenderizado: ${file}`);
}
await rm(resolve(root, 'dist-ssr'), { recursive: true, force: true });
