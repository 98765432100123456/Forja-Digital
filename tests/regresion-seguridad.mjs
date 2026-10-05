// Pruebas de regresión de seguridad y resiliencia en un navegador real.
// Corre con el resto de pruebas: npm run build && npm test (ver tests/run.mjs).
import { chromium } from 'playwright';

const BASE = process.env.BASE_URL || 'http://localhost:4174';
const browser = await chromium.launch();
let failed = 0;
const check = (ok, name) => { console.log(`${ok ? '✔' : '✖'} ${name}`); if (!ok) failed++; };

async function open(path, init) {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('dialog', (d) => { errors.push('dialog: ' + d.message()); d.dismiss(); });
  if (init) await page.addInitScript(init);
  await page.goto(BASE + path);
  await page.waitForTimeout(1000);
  return { page, errors };
}

// R1 (hallazgo H1): un hash mal formado dejaba la página en blanco.
{
  const { page, errors } = await open('/#%E0%A4%A');
  check((await page.locator('h1').count()) === 1 && errors.length === 0, 'R1 · hash mal formado no rompe la página');
  await page.close();
}
// R2: un hash con HTML no se ejecuta ni se inserta.
{
  const { page, errors } = await open('/#%3Cimg%20src%3Dx%20onerror%3Dalert(1)%3E');
  check(errors.length === 0 && (await page.locator('img[src="x"]').count()) === 0, 'R2 · hash con HTML no se ejecuta');
  await page.close();
}
// R3: si un componente falla, el visitante ve una salida (no una pantalla en blanco).
{
  const { page } = await open('/', () => { window.IntersectionObserver = function () { throw new Error('falla simulada'); }; });
  const h1 = await page.locator('h1').textContent();
  const wa = await page.locator('main a[href^="https://wa.me/"]').count();
  check(h1 === 'No pudimos cargar la página' && wa === 1, 'R3 · error inesperado muestra salida a WhatsApp');
  await page.close();
}
// R4: el nombre escrito en el simulador viaja codificado en el enlace y no se interpreta como HTML.
{
  const { page, errors } = await open('/');
  const boldBefore = await page.locator('#simulador b').count();
  await page.locator('#simulador input[type="text"], #simulador input:not([type])').first().fill('<b>x</b>&a=1');
  const href = await page.locator('#simulador a[href^="https://wa.me/"]').getAttribute('href');
  check(!href.includes('<') && !href.includes('&a=1') && errors.length === 0 && (await page.locator('#simulador b').count()) === boldBefore,
    'R4 · texto del simulador codificado y escapado');
  await page.close();
}

await browser.close();
console.log(failed ? `\n${failed} prueba(s) fallaron` : '\nTodas las pruebas pasaron');
process.exit(failed ? 1 : 0);
