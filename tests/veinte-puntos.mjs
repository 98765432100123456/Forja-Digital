// "20 cosas que reviso cuando una web no trae clientes" (@luisalvarezweb), en lo que se puede comprobar con código.
// Los puntos que dependen de personas (reseñas reales, aparecer al buscar la marca, responder en 5 minutos) están en
// docs/memoria/lanzamiento.md con su estado.
import { chromium } from 'playwright';
import { BASE, ok, done } from './lib.mjs';

const PAGES = ['/', '/paginas-web', '/diseno-para-redes', '/bases-de-datos', '/seguridad-y-soporte', '/apps', '/plantillas-canva', '/cookies', '/reembolsos', '/privacidad', '/terminos', '/gracias', '/404'];
const SERVICIOS = ['/paginas-web', '/diseno-para-redes', '/bases-de-datos', '/seguridad-y-soporte', '/apps', '/plantillas-canva'];
const get = async (u) => { const r = await fetch(BASE + u); return { s: r.status, t: await r.text() }; };

// 1 y 2: título y descripción únicos en cada página
const titles = new Set(); const descs = new Set();
for (const u of PAGES) {
  const t = (await get(u)).t;
  titles.add(t.match(/<title>([^<]+)/)?.[1]);
  descs.add(t.match(/<meta name="description" content="([^"]+)/)?.[1]);
}
ok(titles.size === PAGES.length, `01 título único en cada página (${titles.size}/${PAGES.length})`);
ok(descs.size === PAGES.length, `02 descripción propia en cada página (${descs.size}/${PAGES.length})`);

// 4 y 9: una página por servicio, con precio o con "se cotiza" visible
const sitemap = (await get('/sitemap.xml')).t;
for (const u of SERVICIOS) {
  const r = await get(u);
  ok(r.s === 200 && /<h1/.test(r.t) && sitemap.includes(u + '<'), `04 página propia del servicio ${u} (en el sitemap)`);
  ok(/\$[0-9]|[Ss]e cotiza/.test(r.t.replace(/<head>[\s\S]*<\/head>/, '')), `09 precio o "se cotiza" visible en ${u}`);
}

const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
await ctx.addInitScript(() => { try { localStorage.setItem('forja:cookies', 'denied'); } catch { /* sin almacenamiento */ } });
await ctx.route(/googletagmanager/, (r) => r.fulfill({ body: '' }));

// 8: se entiende en 3 segundos: el título principal dice qué se ofrece, y el botón de contacto está en la primera pantalla
{
  const p = await ctx.newPage(); await p.goto(BASE + '/'); await p.waitForTimeout(400);
  const h1 = await p.textContent('h1');
  ok(/páginas web/i.test(h1) && /apps/i.test(h1), `08 el título dice qué se ofrece: "${h1.trim()}"`);
  const box = await p.locator('[data-hero-cta]').boundingBox();
  ok(box && box.y + box.height <= 844, '08 el botón de contacto se ve sin bajar (celular)');
  await p.close();
}

// 11, 15 y 18 en todas las páginas
for (const u of PAGES) {
  const p = await ctx.newPage(); await p.goto(BASE + u); await p.waitForTimeout(300);
  await p.evaluate(() => window.scrollTo(0, Math.min(1600, document.body.scrollHeight - innerHeight))); await p.waitForTimeout(500);
  const contacto = await p.evaluate(() => {
    const bar = document.querySelector('.mobile-cta');
    const visible = (el) => { if (!el) return false; const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return r.height > 0 && r.bottom > 0 && r.top < innerHeight && cs.visibility !== 'hidden' && !el.classList.contains('is-hidden'); };
    return visible(bar) || [...document.querySelectorAll('a[href^="https://wa.me/"]')].some(visible);
  });
  ok(contacto, `11 botón de contacto visible al bajar en ${u}`);
  const primarios = await p.$$eval('main section', (ss) => ss.map((s) => s.querySelectorAll('.btn--primary').length).filter((n) => n > 1).length);
  ok(primarios === 0, `15 una sola acción principal por sección en ${u}`);
  const tapa = await p.evaluate(() => [...document.querySelectorAll('body *')].filter((e) => {
    const cs = getComputedStyle(e); if (cs.position !== 'fixed' || cs.display === 'none' || cs.visibility === 'hidden') return false;
    const r = e.getBoundingClientRect(); return (r.width * r.height) / (innerWidth * innerHeight) > 0.3;
  }).map((e) => e.className));
  ok(tapa.length === 0, `18 ninguna ventana tapa más del 30 % de la pantalla en ${u} ${tapa.join(',')}`);
  await p.close();
}

// 18: el aviso de cookies de la primera visita tampoco tapa la página
{
  const c2 = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true });
  await c2.route(/googletagmanager/, (r) => r.fulfill({ body: '' }));
  const p = await c2.newPage(); await p.goto(BASE + '/'); await p.waitForTimeout(600);
  const r = await p.locator('.cookies').boundingBox();
  ok(r && r.height / 844 <= 0.35, `18 el aviso de cookies ocupa ${r ? Math.round((r.height / 844) * 100) : '?'} % de la pantalla (máximo 35 %)`);
  await c2.close();
}

// 12: formulario de máximo 5 campos
{
  const p = await ctx.newPage(); await p.goto(BASE + '/#contacto'); await p.waitForTimeout(300);
  const n = await p.$$eval('form.form input, form.form select, form.form textarea', (els) => els.filter((e) => e.type !== 'hidden').length);
  ok(n <= 5, `12 el formulario tiene ${n} campos (máximo 5)`);
  await p.close();
}

// 17: todos los enlaces internos de todas las páginas llevan a una página que existe y, si tienen #, a una sección que existe
const enlaces = new Set();
for (const u of PAGES) {
  const p = await ctx.newPage(); await p.goto(BASE + u); await p.waitForTimeout(200);
  (await p.$$eval('a[href^="/"], a[href^="#"]', (as) => as.map((a) => a.getAttribute('href')))).forEach((h) => enlaces.add(h.startsWith('#') ? u + h : h));
  await p.close();
}
const malos = [];
for (const h of enlaces) {
  const [path, hash] = h.split('#');
  const r = await get(path || '/');
  if (r.s !== 200) { malos.push(`${h} (${r.s})`); continue; }
  if (hash && !new RegExp(`id="${hash}"`).test(r.t)) malos.push(`${h} (sin la sección #${hash})`);
}
ok(malos.length === 0, `17 ${enlaces.size} enlaces internos comprobados ${malos.join(', ')}`);

await b.close();
done('20 puntos');
