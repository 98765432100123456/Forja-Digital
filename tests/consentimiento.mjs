// Aviso de cookies y Google Analytics: nada se carga ni se envía sin consentimiento (Ley 1581 de 2012).
import { chromium } from 'playwright';
import { BASE, ok as check, done } from './lib.mjs';
const ok=(c,n)=>check(c,n);
const b=await chromium.launch();
const gtm=(p)=>p.evaluate(()=>!!document.querySelector('script[src*="googletagmanager"]'));
// Con GA
const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('**/googletagmanager.com/**',r=>r.fulfill({status:200,contentType:'text/javascript',body:''}));
await p.goto(BASE+'/');await p.waitForTimeout(800);
ok(await p.locator('.cookies').isVisible(),'con GA: aviso visible');ok(!(await gtm(p)),'antes de decidir: GA no se carga');
ok(!(await p.evaluate(()=>'gtag' in window && !!window.gtag)),'antes de decidir: sin gtag');
ok(!(await p.locator('.mobile-cta').isVisible()),'móvil: barra de WhatsApp oculta mientras está el aviso');
const [rb,ab]=[p.getByRole('button',{name:'Rechazar'}),p.getByRole('button',{name:'Aceptar'})];
const cls=[await rb.getAttribute('class'),await ab.getAttribute('class')];ok(cls[0]===cls[1],'Aceptar y Rechazar con el mismo estilo');
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
ok(await gtm(p),'aceptar: GA se carga');ok(await p.evaluate(()=>window.dataLayer.some(a=>a[0]==='config'&&a[1]==='G-XKHGRSYFDP')),'aceptar: GA configurado');
await ctx.route('https://wa.me/**',r=>r.abort());
await p.locator('#simulador a[href^="https://wa.me/"]').click();await p.waitForTimeout(300);
ok(await p.evaluate(()=>window.dataLayer.some(a=>a[0]==='event'&&a[1]==='sim_cta')&&window.dataLayer.some(a=>a[0]==='event'&&a[1]==='generate_lead')),'aceptar: eventos se envían (sim_cta, generate_lead)');
await p.evaluate(()=>{document.cookie='_ga=GA1.1.123; path=/';});
await p.getByRole('button',{name:'Preferencias de cookies'}).click();await p.getByRole('button',{name:'Rechazar'}).click();await p.waitForTimeout(200);
ok(!(await p.evaluate(()=>document.cookie.includes('_ga='))),'retirar consentimiento: borra la cookie _ga');
ok(await p.evaluate(()=>window['ga-disable-G-XKHGRSYFDP']===true),'retirar consentimiento: GA desactivado');
await p.evaluate(()=>document.getElementById('planes').scrollIntoView());await p.waitForTimeout(500);
ok(await p.evaluate(()=>window.dataLayer.some(a=>a[0]==='event'&&a[1]==='view_section'&&a[2]?.section==='planes')),'aceptar: mide las secciones vistas (view_section)');
ok(errs.length===0,'sin errores de JavaScript '+errs.join(';'));
await b.close();done('consentimiento');
