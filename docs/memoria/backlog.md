# Tablero de pendientes (backlog)

Una sola lista con lo que falta, quién lo hace y el estado (video de @sebas.soto222: "sin un sistema claro se te olvidan bugs, ideas y tareas").
Se actualiza en cada ciclo. La versión visual está en el tablero de Claude (artifact "Tablero Forja").
**Linear** o **GitHub Issues** son opciones para cuando haya clientes o más personas: hoy una sola persona y esta lista alcanzan. Para pasarse a Linear hace falta que Juanes cree la cuenta.

Estados: Por hacer · En curso · Bloqueado (depende de alguien) · Hecho.

| # | Tarea | Tipo | Responsable | Estado | Nota |
|---|---|---|---|---|---|
| 1 | Aprobar y publicar: logo del martillo, vitrinas sin cuadros, DESIGN.md, pruebas en CI | Lanzamiento | Juanes | Bloqueado | Rama `marca/logo-martillo` |
| 2 | Vercel Hobby es "solo para uso personal, no comercial" (normas de uso de Vercel). Elegir: pasar a Pro (US$20 al mes) o mudar a un hosting gratuito que permita uso comercial | Riesgo | Juanes | Bloqueado | `seguridad.md`, sección de costos |
| 3 | NIT (sacar el RUT) y dirección de notificación judicial (Ley 1480, art. 50) | Legal | Juanes | Bloqueado | `legal.md` |
| 4 | Confirmar las 4 reglas de cancelación y reembolso redactadas por Claude | Legal | Juanes | Bloqueado | `legal.md` |
| 5 | Revisión de un abogado (retracto de plantillas y términos) | Legal | Juanes | Por hacer | |
| 6 | Search Console y Bing: crear la propiedad, poner el código y enviar `sitemap.xml` | SEO | Juanes + Claude | Bloqueado | `lanzamiento.md`, puntos 2 y 3 |
| 7 | Revisar GA4 en tiempo real y marcar `generate_lead` como evento clave | Analítica | Juanes | Por hacer | `analitica.md` |
| 8 | Probar en un iPhone (Safari) y en un Android reales | Calidad | Juanes | Por hacer | Solo hay Chromium en este entorno |
| 9 | Proteger la rama `main` en GitHub (no publicar si las pruebas fallan) | Seguridad | Juanes | Por hacer | Ahora las pruebas corren en CI; falta exigirlas |
| 10 | Cerrar el PR #1 de Copilot y borrar la rama `claude-prueba-acceso` | Limpieza | Juanes | Por hacer | |
| 11 | Primer cliente real con permiso para mostrar su trabajo y su opinión | Negocio | Juanes | Por hacer | Lo que más subiría la confianza (`gates.md`) |
| 12 | Registro de errores con Sentry: hoy los errores llegan a GA4 solo si la persona acepta cookies | Operación | Juanes (cuenta) + Claude | Por hacer | Opcional para el sitio; obligatorio en las apps (`apps.md`) |
| 13 | Revisar si el martillo se parece a una marca registrada antes de registrar la marca en la SIC | Marca | Juanes | Por hacer | D21 |
