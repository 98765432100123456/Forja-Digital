// axe-core (WCAG 2 A/AA y buenas prácticas), desbordes horizontales, errores de consola y un solo h1, en las 9 páginas.
import { chromium } from 'playwright';
import fs from 'node:fs';
import { BASE, ok, done } from './lib.mjs';

const axe = fs.readFileSync('node_modules/axe-core/axe.min.js', 'utf8');
const PAGES = ['/', '/apps', '/plantillas-canva', '/cookies', '/reembolsos', '/privacidad', '/terminos', '/gracias', '/404'];
const b = await chromium.launch();
for (const w of [390, 1440]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' });
  for (const path of PAGES) {
    const p = await ctx.newPage(); const errs = [];
    p.on('pageerror', (e) => errs.push(e.message));
    p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
    await p.goto(BASE + path, { waitUntil: 'load' }); await p.waitForTimeout(500);
    await p.addScriptTag({ content: axe });
    const v = await p.evaluate(async () => (await window.axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'best-practice'] })).violations.map((x) => `${x.id} (${x.nodes.length})`));
    ok(v.length === 0, `axe ${path} a ${w}px ${v.join(', ')}`);
    const sw = await p.evaluate(() => document.documentElement.scrollWidth);
    ok(sw <= w, `sin desborde horizontal ${path} a ${w}px (${sw})`);
    ok(errs.length === 0, `sin errores de JavaScript ${path} a ${w}px ${errs.join('; ').slice(0, 160)}`);
    ok((await p.locator('h1').count()) === 1, `un solo h1 en ${path}`);
    await p.close();
  }
  await ctx.close();
}
await b.close();
done('accesibilidad');
