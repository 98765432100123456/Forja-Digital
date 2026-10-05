// Corre todas las pruebas sobre el build de producción (dist/): `npm run build && npm test`.
// Levanta `vite preview`, ejecuta cada archivo y termina con código 1 si alguno falla (así lo usa la CI de GitHub).
import { spawn } from 'node:child_process';

const PORT = 4174;
const BASE = `http://localhost:${PORT}`;
const SUITES = ['funcional.mjs', 'accesibilidad.mjs', 'consentimiento.mjs', 'checklist-15.mjs', 'veinte-puntos.mjs', 'regresion-seguridad.mjs'];

const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], { stdio: 'ignore', detached: true });
const stop = () => { try { process.kill(-server.pid); } catch { /* ya terminó */ } };
process.on('exit', stop);

for (let i = 0; i < 60; i++) {
  try { if ((await fetch(BASE)).ok) break; } catch { /* aún no responde */ }
  await new Promise((r) => setTimeout(r, 500));
}

const results = [];
for (const s of SUITES) {
  console.log(`\n=== ${s} ===`);
  const code = await new Promise((resolve) => {
    const c = spawn(process.execPath, [`tests/${s}`], { stdio: 'inherit', env: { ...process.env, BASE_URL: BASE } });
    c.on('exit', resolve);
  });
  results.push([s, code]);
}
console.log('\nResumen:');
for (const [s, c] of results) console.log(`${c === 0 ? '✔' : '✖'} ${s}`);
stop();
process.exit(results.some(([, c]) => c !== 0) ? 1 : 0);
