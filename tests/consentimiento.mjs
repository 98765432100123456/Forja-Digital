// Pruebas del aviso de cookies. Requiere dos servidores: el build normal en :4174 y uno con VITE_GA_ID=G-TEST123 en :4175.
// Uso: npm i --no-save playwright && node tests/consentimiento.mjs
import { chromium } from 'playwright';
const b=await chromium.launch();let fail=0;const ok=(c,n)=>{console.log((c?'PASS ':'FAIL ')+n);if(!c)fail++;};
const gtm=(p)=>p.evaluate(()=>!!document.querySelector('script[src*="googletagmanager"]'));
// Sin GA configurado
{const p=await b.newPage();await p.goto('http://localhost:4174/');await p.waitForTimeout(800);
ok(await p.locator('.cookies').count()===0,'sin GA: no hay aviso');ok(!(await gtm(p)),'sin GA: no carga script');
ok(await p.getByRole('button',{name:'Preferencias de cookies'}).count()===0,'sin GA: no hay enlace de preferencias');await p.close();}
// Con GA
const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('**/googletagmanager.com/**',r=>r.fulfill({status:200,contentType:'text/javascript',body:''}));
await p.goto('http://localhost:4175/');await p.waitForTimeout(800);
ok(await p.locator('.cookies').isVisible(),'con GA: aviso visible');ok(!(await gtm(p)),'antes de decidir: GA no se carga');
ok(!(await p.evaluate(()=>'gtag' in window && !!window.gtag)),'antes de decidir: sin gtag');
ok(!(await p.locator('.mobile-cta').isVisible()),'móvil: barra de WhatsApp oculta mientras está el aviso');
const [rb,ab]=[p.getByRole('button',{name:'Rechazar'}),p.getByRole('button',{name:'Aceptar'})];
const cls=[await rb.getAttribute('class'),await ab.getAttribute('class')];ok(cls[0]===cls[1],'Aceptar y Rechazar con el mismo estilo');
await p.screenshot({path:'cookies-390.png'});
await rb.click();await p.waitForTimeout(300);
ok(await p.locator('.cookies').count()===0,'rechazar: aviso se cierra');ok(!(await gtm(p)),'rechazar: GA no se carga');
ok(await p.evaluate(()=>localStorage.getItem('forja:cookies'))==='denied','rechazar: decisión guardada');
await p.reload();await p.waitForTimeout(800);ok(await p.locator('.cookies').count()===0,'recarga: no vuelve a preguntar');
// simular eventos sin consentimiento
await p.locator('#simulador input:not([type=radio])').first().fill('Prueba');
ok(!(await p.evaluate(()=>Array.isArray(window.dataLayer)&&window.dataLayer.length>0)),'sin consentimiento: no se envían eventos');
const pref=p.getByRole('button',{name:'Preferencias de cookies'});ok(await pref.count()===1,'pie: enlace de preferencias');
await pref.click();await p.waitForTimeout(300);ok(await p.locator('.cookies').isVisible(),'preferencias: reabre el aviso');
ok((await p.locator('.cookies').textContent()).includes('Ahora: rechazadas'),'preferencias: muestra la decisión actual');
ok(await p.evaluate(()=>document.activeElement?.classList.contains('cookies')),'preferencias: el foco va al aviso');
await p.getByRole('button',{name:'Aceptar'}).click();await p.waitForTimeout(400);
ok(await gtm(p),'aceptar: GA se carga');ok(await p.evaluate(()=>window.dataLayer.some(a=>a[0]==='config'&&a[1]==='G-TEST123')),'aceptar: GA configurado');
await ctx.route('https://wa.me/**',r=>r.abort());
await p.locator('#simulador a[href^="https://wa.me/"]').click();await p.waitForTimeout(300);
ok(await p.evaluate(()=>window.dataLayer.some(a=>a[0]==='event'&&a[1]==='sim_cta')&&window.dataLayer.some(a=>a[0]==='event'&&a[1]==='generate_lead')),'aceptar: eventos se envían (sim_cta, generate_lead)');
await p.evaluate(()=>{document.cookie='_ga=GA1.1.123; path=/';});
await p.getByRole('button',{name:'Preferencias de cookies'}).click();await p.getByRole('button',{name:'Rechazar'}).click();await p.waitForTimeout(200);
ok(!(await p.evaluate(()=>document.cookie.includes('_ga='))),'retirar consentimiento: borra la cookie _ga');
ok(await p.evaluate(()=>window['ga-disable-G-TEST123']===true),'retirar consentimiento: GA desactivado');
ok(errs.length===0,'sin errores de JavaScript '+errs.join(';'));
await b.close();console.log(fail?fail+' fallaron':'todas pasaron');
