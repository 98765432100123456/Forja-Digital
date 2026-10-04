# Registro de cambios (trazabilidad)

| Fecha | Versión (commit) | Rama | Quién decidió | Herramienta | Archivos | Qué cambió | Pruebas | Despliegue | Decisión |
|---|---|---|---|---|---|---|---|---|---|
| 2026-10-03 | `8c42aab` | main | Juanes (checklist en video) + Claude | Claude (código) | Varios | Checklist de lanzamiento: 404, gracias, privacidad, esquema, GA opcional | Playwright + axe | Producción | — |
| 2026-10-03 | `b65b8d6` | main | Juanes (brief) + Claude | Claude | `src/**`, `docs/` | Rediseño de taller | Playwright + axe (0 violaciones) | Producción | D1, D2 |
| 2026-10-04 | `327818b` | main | Juanes (brief) + Claude | Claude | `Simulator.tsx`, `entry-server.tsx`, `scripts/prerender.mjs`… | Simulador y prerenderizado | Playwright + axe; lectura del sitio publicado | Producción | D3, D4 |
| 2026-10-04 | este commit | `mejora/evidencia-y-medicion` | Claude (autónomo, reversible) | Claude | `Simulator.tsx`, `data.ts`, `Gracias.tsx`, `docs/**` | Eventos del embudo del simulador; corrección de textos sin evidencia; lectura del mensaje en /gracias sin efectos; memoria del proyecto | 25 pruebas OK; axe 0 violaciones en 4 páginas; sin desbordamiento a 390/820/1440 px; eventos verificados con un ID de GA de prueba | Preview de Vercel (pendiente de aprobación para producción) | D3, D6 |

Notas:
- Las 3 "fallas" de área táctil que reporta la prueba son enlaces dentro de una frase (`Pregúntanos por WhatsApp`, el número en la lista de contacto, `Política de privacidad` en la nota del formulario). WCAG 2.5.8 los exceptúa.
- Las URL de preview de Vercel piden iniciar sesión en Vercel. La inspección visual se hizo sobre la misma compilación, servida localmente.
