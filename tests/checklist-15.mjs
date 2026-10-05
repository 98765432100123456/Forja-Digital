// Comprueba los 15 puntos del checklist "15 cosas para ser real" en todas las páginas. Corre con npm test (tests/run.mjs).
import { chromium } from 'playwright';
const B=process.env.BASE_URL||'http://localhost:4174';const PAGES=['/','/paginas-web','/diseno-para-redes','/bases-de-datos','/seguridad-y-soporte','/apps','/plantillas-canva','/cookies','/reembolsos','/privacidad','/terminos','/gracias','/404'];
let fail=0;const ok=(c,n)=>{console.log((c?'PASS ':'FAIL ')+n);if(!c)fail++;};
const b=await chromium.launch();const ctx=await b.newContext();
await ctx.addInitScript(()=>{try{localStorage.setItem('forja:cookies','denied')}catch{}});
const get=async(u)=>{const r=await fetch(B+u);return {s:r.status,t:await r.text()}};
// 1,3,10,11
for (const [n,u] of [['1 privacidad','/privacidad'],['3 términos','/terminos'],['10 404 personalizada','/404'],['11 gracias','/gracias']]){const r=await get(u);ok(r.s===200&&r.t.includes('<h1'),n+' responde con contenido');}
const home=(await get('/')).t;ok(home.includes('href="/privacidad"')&&home.includes('href="/terminos"'),'1/3 enlaces visibles en el pie');
// 4
const sm=(await get('/sitemap.xml')).t;const locs=[...sm.matchAll(/<loc>([^<]+)/g)].map(m=>m[1].replace('https://forja-digital-mlid.vercel.app',''));
ok(locs.length===11,'4 sitemap con '+locs.length+' URLs');for(const l of locs){ok((await get(l==='/'?'/':l)).s===200,'4 sitemap URL '+l+' responde 200');}
// 5,14,15
const titles=new Set();
for (const u of PAGES){const t=(await get(u)).t;const ti=t.match(/<title>([^<]+)/)?.[1];titles.add(ti);
 ok(ti&&/<meta name="description" content="[^"]{50,}/.test(t),'5 título y descripción en '+u);
 ok(t.includes('apple-touch-icon')&&t.includes('favicon.svg'),'14 favicon en '+u);
 ok(/og:image" content="https:\/\/forja-digital-mlid\.vercel\.app\/og\.jpg/.test(t),'15 og:image en '+u);}
ok(titles.size===PAGES.length,'5 títulos únicos ('+titles.size+')');
for (const f of ['/favicon.svg','/favicon-32.png','/apple-touch-icon.png','/icon-512.png','/og.jpg']) ok((await fetch(B+f)).status===200,'14/15 '+f+' existe');
// 9,12,2
for (const u of PAGES){for (const w of [320,390,768,1024,1440]){const p=await ctx.newPage();await p.setViewportSize({width:w,height:900});await p.goto(B+u);await p.waitForTimeout(300);
 const sw=await p.evaluate(()=>document.documentElement.scrollWidth);if(sw>w)ok(false,`12 desborde en ${u} a ${w}px`);
 if(w===390){const noalt=await p.$$eval('img',im=>im.filter(i=>!i.hasAttribute('alt')).length);ok(noalt===0,'9 todas las imágenes con alt en '+u);}
 await p.close();}}
ok(true,'12 sin desbordes revisado en 6 páginas × 5 anchos (fallas arriba si hubo)');
{const p=await ctx.newPage();await p.setViewportSize({width:390,height:844});let bytes=0;const seen=new Set();
 p.on('response',async r=>{if(r.request().resourceType()==='image'&&!seen.has(r.url())){seen.add(r.url());try{bytes+=(await r.body()).length}catch{}}});
 await p.goto(B+'/');await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=500){scrollTo(0,y);await new Promise(r=>setTimeout(r,80))}});await p.waitForTimeout(800);
 const big=[...seen].filter(u=>!/-s-|favicon|icon/.test(u.split('/').pop())).map(u=>u.split('/').pop());
 console.log('   imágenes descargadas en celular:',seen.size,'·',Math.round(bytes/1024),'KB · versiones grandes:',big.length);ok(bytes<300*1024,'2 imágenes comprimidas: menos de 300 KB en celular');await p.close();}
// 6
{const p=await ctx.newPage();await p.goto(B+'/#contacto');await p.waitForTimeout(500);await p.click('.form button[type=submit]');await p.waitForTimeout(300);
 const inv=await p.$$eval('[aria-invalid="true"]',e=>e.length);const msg=await p.locator('.form [role=alert], .form .field__error').count();
 const focus=await p.evaluate(()=>document.activeElement?.getAttribute('aria-invalid'));
 ok(inv>0&&msg>0&&focus==='true','6 estado de error: '+inv+' campos marcados, '+msg+' mensajes, foco en el primero');await p.close();}
// 7
{const p=await ctx.newPage();await p.goto(B+'/#contacto');const t=await p.locator('#contacto').innerText();
 ok(t.includes('Bogotá')&&t.includes('forjadigital7@gmail.com')&&t.includes('313 381 8294'),'7 contacto real: Bogotá, correo y teléfono');
 ok(await p.locator('#contacto a[href^="tel:"]').count()===1&&await p.locator('#contacto a[href^="mailto:"]').count()===1,'7 teléfono y correo tocables');await p.close();}
// 8,13
{const c2=await b.newContext();const p=await c2.newPage();await p.route('**/googletagmanager.com/**',r=>r.fulfill({body:''}));await p.goto(B+'/');await p.waitForTimeout(600);
 ok(await p.locator('.cookies').isVisible(),'8 banner de cookies visible en la primera visita');
 await p.getByRole('button',{name:'Aceptar'}).click();await p.waitForTimeout(300);
 ok(await p.evaluate(()=>window.dataLayer?.some(a=>a[0]==='config'&&a[1]==='G-XKHGRSYFDP')),'13 analítica G-XKHGRSYFDP tras aceptar');await c2.close();}
await b.close();console.log(fail?'✖ checklist-15: '+fail+' fallaron':'✔ checklist-15: todas pasaron');process.exit(fail?1:0);
