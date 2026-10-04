// Inserta el HTML prerenderizado de cada página dentro de <div id="root"> en dist/.
import { readFile, writeFile, rm } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const { render, files } = await import(pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href);

for (const file of files) {
  const path = resolve(root, 'dist', file);
  const html = await readFile(path, 'utf8');
  if (!html.includes('<div id="root"></div>')) throw new Error(`No se encontró el contenedor en ${file}`);
  await writeFile(path, html.replace('<div id="root"></div>', `<div id="root">${render(file)}</div>`));
  console.log(`prerenderizado: ${file}`);
}
await rm(resolve(root, 'dist-ssr'), { recursive: true, force: true });
