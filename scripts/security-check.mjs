// Control de seguridad automático (corre al final de `npm run build`).
// Si encuentra un problema, la compilación falla y Vercel NO publica: es el "security gate" del proyecto.
// Detalle de cada regla y por qué existe: docs/memoria/seguridad.md
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const fails = [];
const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

// 1. Ningún secreto en lo que llega al navegador (sec. 50).
const SECRET_PATTERNS = [
  [/sk-[A-Za-z0-9_-]{20,}/, 'clave tipo sk-'],
  [/sk_live_[A-Za-z0-9]{10,}/, 'clave secreta de Stripe'],
  [/gh[pousr]_[A-Za-z0-9]{30,}/, 'token de GitHub'],
  [/AKIA[0-9A-Z]{16}/, 'clave de AWS'],
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----/, 'llave privada'],
  [/"private_key"\s*:/, 'credencial de servicio (Firebase/Google)'],
  [/(postgres|mongodb(\+srv)?|mysql):\/\/[^\s"']+:[^\s"']+@/, 'cadena de conexión con contraseña'],
];
for (const file of walk('dist').filter((f) => ['.js', '.html', '.css', '.json', '.txt', '.xml'].includes(extname(f)))) {
  const text = readFileSync(file, 'utf8');
  for (const [re, label] of SECRET_PATTERNS) if (re.test(text)) fails.push(`${label} en ${file}`);
}

// 2. Sin APIs que ejecuten texto como código o HTML (sec. 47).
const DANGEROUS = [/dangerouslySetInnerHTML/, /\beval\s*\(/, /new Function\s*\(/, /\.innerHTML\s*=/, /document\.write\s*\(/];
for (const file of walk('src').filter((f) => /\.(tsx?|jsx?)$/.test(f))) {
  const text = readFileSync(file, 'utf8');
  for (const re of DANGEROUS) if (re.test(text)) fails.push(`patrón peligroso ${re} en ${file}`);
}

// 3. Cabeceras de seguridad presentes y iguales en vercel.json y public/_headers (sec. 52).
const vercel = JSON.parse(readFileSync('vercel.json', 'utf8'));
const vh = Object.fromEntries(vercel.headers.find((h) => h.source === '/(.*)').headers.map((h) => [h.key.toLowerCase(), h.value]));
const REQUIRED = ['content-security-policy', 'strict-transport-security', 'x-content-type-options', 'x-frame-options', 'referrer-policy', 'permissions-policy'];
for (const k of REQUIRED) if (!vh[k]) fails.push(`falta la cabecera ${k} en vercel.json`);
const netlify = readFileSync('public/_headers', 'utf8');
const csp = netlify.match(/Content-Security-Policy:\s*(.+)/)?.[1]?.trim();
if (csp !== vh['content-security-policy']) fails.push('la CSP de public/_headers no coincide con la de vercel.json');
if (!/frame-ancestors 'none'/.test(vh['content-security-policy'] ?? '')) fails.push("la CSP no impide incrustar el sitio (frame-ancestors 'none')");
if (/script-src[^;]*'unsafe-(inline|eval)'/.test(vh['content-security-policy'] ?? '')) fails.push('la CSP permite scripts en línea o eval');

// 4. El ID de analítica se valida antes de insertarse en una URL de script (sec. 43).
if (!/\^G-\[A-Z0-9\]\+\$/.test(readFileSync('src/analytics.ts', 'utf8'))) fails.push('analytics.ts ya no valida el formato de VITE_GA_ID');

if (fails.length) {
  console.error('\n✖ Control de seguridad: la compilación se detiene.\n  - ' + fails.join('\n  - ') + '\n');
  process.exit(1);
}
console.log('✔ Control de seguridad: sin secretos, sin patrones peligrosos y cabeceras completas.');
