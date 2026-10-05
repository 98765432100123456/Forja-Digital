// Utilidades comunes de las pruebas. Todas usan el build servido por `vite preview` (ver tests/run.mjs).
export const BASE = process.env.BASE_URL || 'http://localhost:4174';
let fails = 0;
export const ok = (cond, name) => {
  console.log((cond ? 'PASS ' : 'FAIL ') + name);
  if (!cond) fails++;
};
export const done = (label) => {
  console.log(fails ? `✖ ${label}: ${fails} fallaron` : `✔ ${label}: todas pasaron`);
  process.exit(fails ? 1 : 0);
};
