// Pruebas de principio a fin de los flujos principales del inicio (escritorio y celular).
import { chromium } from 'playwright';
import { BASE as B, ok, done } from './lib.mjs';

const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1280, height: 860 } });
await ctx.addInitScript(() => { try { localStorage.setItem('forja:cookies', 'denied'); } catch { /* sin almacenamiento */ } });
await ctx.route(/wa\.me|whatsapp/, (r) => r.fulfill({ status: 200, body: 'wa' }));
const p = await ctx.newPage();
const logs = [];
p.on('console', (m) => (m.type() === 'error' || m.type() === 'warning') && logs.push(m.text()));
p.on('pageerror', (e) => logs.push(e.message));
await p.goto(B + '/', { waitUntil: 'load' }); await p.waitForTimeout(800);
ok((await (await fetch(B + '/')).text()).includes('Planes y precios'), 'HTML prerenderizado (sin JS ya trae contenido)');
ok(logs.length === 0, 'sin errores de hidratación ni de consola ' + logs.join(' | ').slice(0, 200));

// Simulador
await p.locator('#simulador').scrollIntoViewIfNeeded();
await p.check('#simulador input[value=restaurante]');
await p.fill('#simulador input[type=text], #simulador input:not([type])', 'Donde Rosa');
await p.check('#simulador input[value=bosque]');
ok((await p.textContent('.sim__nav b')) === 'Donde Rosa', 'simulador: la vista previa usa el nombre');
const href = decodeURIComponent(await p.getAttribute('.sim__cta', 'href'));
ok(href.includes('restaurante') && href.includes('Donde Rosa') && href.includes('bosque'), 'simulador: el mensaje lleva tipo, nombre y color');

// Menú: la sección visible queda marcada
await p.locator('#planes').scrollIntoViewIfNeeded(); await p.evaluate(() => document.getElementById('planes').scrollIntoView({ block: 'center' })); await p.waitForTimeout(400);
ok(await p.getAttribute('.nav__links a[href="/#planes"]', 'aria-current') === 'location', 'menú: marca "Planes" al verlo');

// Trabajos: pestañas y visor
await p.click('#tab-restaurante');
ok(await p.isVisible('#panel-restaurante'), 'trabajos: la pestaña cambia el panel');
await p.focus('#tab-restaurante'); await p.keyboard.press('ArrowRight');
ok(await p.getAttribute('#tab-inmobiliaria', 'aria-selected') === 'true', 'trabajos: la flecha derecha pasa a la siguiente pestaña');
await p.click('.piece-thumb >> nth=0');
ok(await p.isVisible('dialog.viewer[open]'), 'visor: abre');
const c1 = await p.textContent('.viewer__count'); await p.keyboard.press('ArrowRight');
ok(c1 !== (await p.textContent('.viewer__count')), 'visor: avanza con la flecha');
await p.keyboard.press('Escape');
ok(!(await p.isVisible('dialog.viewer[open]')), 'visor: cierra con Escape');

// Preguntas
await p.click('.faq__item >> nth=0 >> summary');
ok(await p.$eval('.faq__item', (d) => d.open), 'preguntas: abre');

// Tira de piezas: todas las imágenes cargan al recorrerla
await p.locator('#servicios .reel').scrollIntoViewIfNeeded();
await p.$eval('#servicios .reel', (r) => { r.scrollLeft = r.scrollWidth; }); await p.waitForTimeout(1000);
const kw = await p.$$eval('#servicios img', (ims) => ims.map((i) => i.naturalWidth));
ok(kw.length > 0 && kw.every((w) => w > 0), 'vitrinas: cargan las ' + kw.length + ' imágenes');

// Formulario
await p.locator('#contacto').scrollIntoViewIfNeeded();
await p.click('form.form button[type=submit]');
ok((await p.$$('.field__error')).length === 3, 'formulario: errores en nombre, servicio y autorización');
ok(await p.evaluate(() => document.activeElement?.id === 'f-nombre'), 'formulario: foco en el primer campo con error');
await p.fill('#f-nombre', 'Laura');
ok((await p.$$('#e-nombre')).length === 0, 'formulario: el error se limpia al escribir');
await p.selectOption('#f-servicio', 'Página web');
await p.fill('#f-mensaje', 'Tengo un salón');
await p.click('form.form button[type=submit]');
ok(await p.evaluate(() => document.activeElement?.id === 'f-autorizacion') && (await p.$$('#e-autorizacion')).length === 1, 'formulario: sin autorización no envía');
await p.check('#f-autorizacion');
const [popup] = await Promise.all([ctx.waitForEvent('page'), p.click('form.form button[type=submit]')]);
await popup.waitForLoadState('commit').catch(() => {});
ok(popup.url().includes('wa.me/573133818294') || popup.url().includes('whatsapp'), 'formulario: abre WhatsApp con el mensaje');
await p.waitForURL(/gracias/, { timeout: 5000 }).catch(() => {});
ok(p.url().includes('gracias'), 'formulario: lleva a /gracias');
ok(decodeURIComponent((await p.getAttribute('.status__actions a', 'href')) || '').includes('Laura'), 'gracias: reusa el mensaje');
await popup.close();

// Recargar: la página empieza arriba (pedido de Juanes); un enlace con #ancla que llega de afuera sigue funcionando
for (const [w, h] of [[1280, 860], [390, 844]]) {
  const r = await b.newPage({ viewport: { width: w, height: h } });
  await r.addInitScript(() => { try { localStorage.setItem('forja:cookies', 'denied'); } catch { /* sin almacenamiento */ } });
  await r.goto(B + '/', { waitUntil: 'load' }); await r.evaluate(() => window.scrollTo(0, 3000)); await r.waitForTimeout(300);
  await r.reload({ waitUntil: 'load' }); await r.waitForTimeout(800);
  ok(await r.evaluate(() => window.scrollY) === 0, `recargar a ${w}px: empieza arriba`);
  await r.goto(B + '/#planes', { waitUntil: 'load' }); await r.waitForTimeout(800);
  await r.reload({ waitUntil: 'load' }); await r.waitForTimeout(800);
  ok(await r.evaluate(() => window.scrollY) === 0, `recargar con #planes a ${w}px: empieza arriba`);
  await r.goto(B + '/apps', { waitUntil: 'load' }); await r.goto(B + '/#planes', { waitUntil: 'load' }); await r.waitForTimeout(800);
  ok(await r.evaluate(() => window.scrollY) > 500, `enlace con #planes a ${w}px: sí lleva a la sección`);
  await r.close();
}

// Celular: menú, barra fija y tamaño de lo tocable
const m = await b.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
await m.addInitScript(() => { try { localStorage.setItem('forja:cookies', 'denied'); } catch { /* sin almacenamiento */ } });
await m.goto(B + '/', { waitUntil: 'load' }); await m.waitForTimeout(400);
ok(await m.$eval('.mobile-cta', (e) => e.classList.contains('is-hidden')), 'celular: la barra de WhatsApp no tapa el inicio');
await m.evaluate(() => window.scrollTo(0, 1600)); await m.waitForTimeout(500);
ok(await m.$eval('.mobile-cta', (e) => !e.classList.contains('is-hidden')), 'celular: la barra aparece al bajar');
await m.evaluate(() => window.scrollTo(0, 0)); await m.waitForTimeout(200);
await m.click('.nav__toggle');
ok(await m.$eval('#menu-principal', (e) => e.classList.contains('is-open')), 'celular: el menú abre');
await m.keyboard.press('Escape');
ok(!(await m.$eval('#menu-principal', (e) => e.classList.contains('is-open'))), 'celular: el menú cierra con Escape');
// WCAG 2.5.8: los enlaces dentro de una frase (display inline) están exceptuados
const small = await m.$$eval('a, button, select, input, textarea, summary', (els) => els.filter((e) => {
  const r = e.getBoundingClientRect(); const cs = getComputedStyle(e);
  return r.width > 0 && r.height > 0 && r.height < 40 && cs.position !== 'absolute' && cs.display !== 'inline' && !e.closest('.bench');
}).map((e) => (e.textContent || e.tagName).trim().slice(0, 30) + ' ' + Math.round(e.getBoundingClientRect().height)));
ok(small.length === 0, 'celular: todo lo tocable mide 40 px o más ' + small.join(', '));
await b.close();
done('funcionales');
