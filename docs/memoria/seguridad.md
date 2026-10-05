# Seguridad

Informe de seguridad (secciones 27–72, 85, 87 y 90 del motor). **Alcance:** el sitio `forja-digital-mlid.vercel.app`,
su código (`main` en `01aa065` y la rama `mejora/seguridad-y-madurez`), sus dependencias y su despliegue.
**Fecha:** 4 de octubre de 2026. **Hecho por:** Claude, revisión estática del código, pruebas en navegador (Playwright),
`npm audit`, consulta al registro de npm y escaneo de cabeceras de securityheaders.com.

> No se identificaron vulnerabilidades críticas ni altas en las pruebas realizadas bajo este alcance. Eso **no** significa
> que el sitio sea "100 % seguro": significa que lo que se probó, pasó. Lo que no se probó está listado abajo.

## 1. Arquitectura y fronteras de confianza

```
Visitante (navegador) ──► HTML/JS estático en Vercel (sin servidor propio, sin base de datos, sin cuentas)
        │
        ├──► wa.me (WhatsApp)       el mensaje lo escribe el visitante y lo envía él mismo
        └──► Google Analytics 4     solo si existe VITE_GA_ID (hoy no existe)
```

| Frontera | Qué cruza | Confianza | Control |
|---|---|---|---|
| URL → página | `#hash` | No confiable | Se decodifica dentro de `try/catch` y solo se usa para buscar un `id` (H1) |
| Formulario → WhatsApp | nombre, negocio, servicio, mensaje | No confiable | `maxLength`, validación en el navegador, `encodeURIComponent`; React escapa al pintar |
| Simulador → vista previa y WhatsApp | nombre del negocio | No confiable | `maxLength=28`, limpieza de espacios, escapado de React, `encodeURIComponent` (R4) |
| `sessionStorage` → /gracias | el mismo mensaje | Escrito por la misma página | Se lee con `try/catch`; solo se usa codificado en un enlace |
| Variable `VITE_GA_ID` → `<script src>` | ID de GA4 | Configuración | Se valida con `/^G-[A-Z0-9]+$/` antes de insertarse |
| Precio en el mensaje de WhatsApp | texto del plan | No confiable | **No es vinculante**: el precio final se confirma por escrito en la propuesta (paso 2 del proceso) |

**Datos personales:** el sitio no guarda nada en un servidor. El mensaje del formulario queda en `sessionStorage` de la pestaña
hasta cerrarla, para el botón "Abrir WhatsApp de nuevo" en /gracias. A GA4 nunca se envía el contenido del formulario ni el
nombre del simulador; solo `con_nombre: true/false`.

## 2. Hallazgos (formato de auditor)

### H1 · Un enlace con `%` mal formado dejaba la página en blanco
- **Vulnerability:** denegación de servicio del lado del cliente por entrada no validada (sec. 43).
- **Evidence:** `/#%E0%A4%A` → `URIError: URI malformed` en `decodeURIComponent`. React desmontaba todo y el contenido
  prerenderizado desaparecía: 0 encabezados, 0 caracteres de texto. Reproducido en Chromium el 4 de octubre de 2026.
- **Affected component:** `src/components/Layout.tsx` (desplazamiento al ancla).
- **Severity:** LOW. **Exploitability:** alta (basta compartir un enlace). **Impact:** quien abre ese enlace ve una página
  en blanco; no hay acceso a datos. **Exposición:** pública.
- **Root cause:** se confió en que el hash siempre es UTF-8 válido.
- **Recommended fix / aplicado:** `try/catch` alrededor de `decodeURIComponent`; además, un límite de errores
  (`ErrorBoundary`) para que cualquier fallo futuro muestre una salida a WhatsApp en lugar de una pantalla en blanco.
- **Regression test:** `tests/regresion-seguridad.mjs` → R1 y R3.
- **Status:** **VERIFIED** (falla reproducida antes; prueba pasa después).

### H2 · Riesgo de suplantación del precio en el mensaje prellenado
- **Evidence:** el texto que se envía por WhatsApp se arma en el navegador y el visitante puede editarlo.
- **Severity:** INFORMATIONAL. No hay pago en línea ni precio que el sistema acepte automáticamente.
- **Control:** operativo: los precios y alcances se confirman por escrito antes de cobrar.
- **Status:** RESIDUAL RISK aceptado (depende de un proceso humano).

### H3 · `main` sin protección de rama
- **Evidence:** la API de GitHub responde "Branch not protected" (4 de octubre de 2026).
- **Impact:** cualquier cuenta con permiso de escritura, incluido un agente, puede publicar en producción sin revisión.
- **Severity:** LOW (hoy solo hay un dueño con acceso). **Recommended fix:** en GitHub → Settings → Branches, exigir un pull
  request para `main`. **Requiere al dueño** (permiso administrativo; este agente no lo tiene).
- **Status:** NOT YET VALIDATED, pendiente de Juanes.

### H4 · La CSP permite estilos en línea (`style-src 'unsafe-inline'`)
- **Evidence:** el simulador y algunas vistas previas usan `style={…}` para los colores elegidos.
- **Severity:** INFORMATIONAL. Los scripts sí están restringidos (`script-src 'self'` + Google Tag Manager), así que no
  permite ejecutar JavaScript.
- **Status:** RESIDUAL RISK aceptado. Quitarlo exigiría reescribir el simulador sin aportar una mejora de riesgo
  proporcional.

### H5 · `Access-Control-Allow-Origin: *` en las respuestas
- **Evidence:** cabecera que agrega Vercel a los archivos estáticos (securityheaders.com).
- **Severity:** INFORMATIONAL. Todo el contenido es público y no hay cookies ni sesiones.
- **Status:** NOT APPLICABLE como riesgo mientras no exista contenido privado.

### H6 · Archivos `.env` no estaban ignorados
- **Evidence:** `.gitignore` solo ignoraba `*.local`. Un `.env` creado por error se habría subido a GitHub (repositorio público).
- **Severity:** LOW (hoy no existe ningún `.env` ni secreto). **Fix aplicado:** `.env` y `.env.*` ignorados; `.env.example`
  documenta que `VITE_GA_ID` es configuración pública, no un secreto.
- **Status:** VERIFIED (búsqueda en todo el historial de Git: 0 secretos).

## 3. Postura de los controles

| Control | Estado | Evidencia |
|---|---|---|
| Secretos en código, historial, build y bundle | **VERIFIED** (ninguno) | Búsqueda en `git log --all -p` y en `dist/`; regla automática en el build |
| Dependencias con vulnerabilidades conocidas | **PASSED** | `npm audit`: 0 (72 paquetes) |
| Dependencias existen, son las esperadas y están mantenidas | **VERIFIED** | Registro de npm: react 19.3, vite 8.3, fontsource, oxlint y typescript publicados en las últimas semanas, con repositorio oficial |
| Integridad del lockfile | **VERIFIED** | 72 de 72 paquetes con `integrity` y servidos desde `registry.npmjs.org` |
| Scripts de instalación | **VERIFIED** | Solo `fsevents` (macOS, opcional, de desarrollo) |
| Licencias | **VERIFIED** | MIT, MPL-2.0, Apache-2.0, ISC, BSD-3 y OFL-1.1 (fuentes); todas permiten uso comercial |
| Typosquatting | **PASSED** | Los nombres coinciden con los paquetes oficiales |
| XSS (reflejado, almacenado, DOM) | **PASSED** | Sin `dangerouslySetInnerHTML`, `eval`, `innerHTML` ni `document.write`; pruebas R2 y R4 |
| Validación de entradas | **PASSED** después del fix H1 | Pruebas R1, R2 y R4 |
| Cabeceras de seguridad | **VERIFIED** en producción | securityheaders.com: A+ (CSP, HSTS, nosniff, X-Frame-Options, Referrer-Policy, Permissions-Policy, COOP) |
| HTTPS / TLS | **VERIFIED** | Vercel; HSTS de 2 años |
| Resiliencia ante errores | **VERIFIED** | Prueba R3 (fallo simulado → pantalla de salida) |
| Protección de `main` | **FAILED** | H3 |
| Abuso real, ataques reales, carga real | **NOT YET AVAILABLE** | Etapa 0: no hay tráfico ni registros que observar |
| Revisión por un auditor humano | **NOT TESTED** | — |

## 4. Secciones que no aplican hoy (y cuándo empezarán a aplicar)

| Sección | Por qué no aplica | Se activa cuando… |
|---|---|---|
| 32 Autenticación, 33 Autorización | No hay cuentas ni inicio de sesión | Un proyecto tenga usuarios (p. ej., el panel del plan Catálogo) |
| 34 BOLA/IDOR | No hay URLs con IDs de recursos privados | Haya rutas como `/pedido/123` |
| 35–36 Multi-tenant | Un solo sitio, sin datos de clientes | Forja aloje datos de varios clientes en un mismo sistema |
| 37 PostgreSQL, 38 MongoDB, 45–46 Inyección | No hay base de datos | Se venda el servicio de bases de datos |
| 39–40 Firebase | No se usa | Un proyecto use Firebase |
| 41 Node ↔ Python, 42 API, 53 SSRF, 54 Rate limiting | No hay backend ni API | Exista cualquier endpoint |
| 48 Plantillas personalizadas, 49 Subida de archivos | El visitante no sube archivos ni código; las plantillas de Canva se entregan como archivos | Se permita subir logos o plantillas |
| 51 Criptografía propia, contraseñas | No se manejan | Haya cuentas |
| 55–58 Seguridad de IA en el producto | El sitio no usa IA | Se agregue un asistente o generación con IA |

**Regla para proyectos de clientes** (bases de datos, catálogos con panel): antes de entregar, se aplica esta lista con
las secciones 31–54 completas, y cualquier acceso de CLIENTE A a datos de CLIENTE B se trata como CRÍTICO (sec. 93).
Cada cliente va en su propio repositorio, base de datos y proyecto de Vercel.

## 5. Seguridad del proceso con agentes (secciones 55–62, 66 y 92)

| Control | Estado |
|---|---|
| Contenido externo (páginas de competidores, documentos, este mismo repositorio) tratado como datos, no como instrucciones | Aplicado en todas las lecturas web |
| Mínimo privilegio | El agente tiene permiso de escritura en el repositorio; **no** tiene tokens de Vercel, de GA ni de borrado de ramas (verificado: `gh api` DELETE → 403) |
| Aprobación humana para producción | Aplicada: los cambios van a una rama, y `main` solo se actualizó con el "sí" de Juanes (registrado en `registro.md`) |
| Ejecución aislada | Builds y pruebas corren en un contenedor efímero, no en el computador de Juanes |
| Rastro de auditoría | `registro.md`: fecha, commit, rama, quién aprobó, archivos, pruebas y despliegue |
| PR #1 de Copilot (otro agente) | No se fusiona sin revisión: lo abrió un agente distinto y no está revisado |

## 6. Security gate automático

`scripts/security-check.mjs` corre al final de `npm run build`. Si encuentra un secreto en `dist/`, un patrón que ejecute
texto como código, cabeceras faltantes o diferentes entre `vercel.json` y `public/_headers`, o que se quitó la validación de
`VITE_GA_ID`, **la compilación falla y Vercel no publica** (veto de la sec. 69).
Se probó plantando un token falso y quitando una directiva de la CSP: en ambos casos bloqueó (4 de octubre de 2026).

## 7. Crítica de seguridad (sec. 85)

- **¿Qué podría romper un atacante?** Antes del fix, la página, con un enlace. Hoy, nada de lo probado.
- **¿Qué pasa si cambia un ID o un tenantId, o manipula JSON?** No hay IDs, tenants ni JSON que el servidor acepte.
- **¿Y si encuentra una API interna?** No existe.
- **¿Y si encuentra un secreto?** No hay ninguno en el código ni en el historial, y el build bloquea nuevos.
- **¿Y si una dependencia es maliciosa?** Riesgo residual: 72 paquetes, 6 de producción. Mitigación: lockfile con
  integridad y `npm audit` en cada ciclo. No hay escaneo automático continuo (no hay GitHub Actions).
- **¿Y si alguien compromete un agente?** Puede escribir en el repositorio y, como `main` no está protegida, publicar. Por
  eso H3 es la acción de seguridad con más valor.
- **¿Y si inyecta instrucciones en un documento?** El agente no las obedece; aun así, sin protección de rama el control
  depende del agente y no de la plataforma.
- **¿Y si alguien se hace pasar por Forja?** Riesgo residual de marca: el dominio es `.vercel.app`. Un dominio propio lo reduce.

## 8. Madurez de la seguridad (sec. 90)

Etapa 0 → **verificar controles** (hecho para este alcance). Observar ataques y errores reales empieza cuando haya
tráfico y GA4 (el evento `exception` ya está preparado).

## 8b. Cambios del 4 de octubre (tarde)
| Superficie nueva | Riesgo | Control | Estado |
|---|---|---|---|
| Decisión de cookies en `localStorage` | Un script podría cambiarla | Solo acepta los valores `granted` o `denied`; cualquier otro equivale a "sin decisión" | PASSED |
| Workflow de disponibilidad en GitHub Actions | Permisos excesivos o acciones de terceros comprometidas | `permissions: contents: read, issues: write`; sin acciones de terceros (usa la CLI `gh` del ejecutor) | PASSED (revisión) |
| Redirección por host | Redirigir previews por error | Condición exacta `host = forja-digital.vercel.app`; las previews tienen otros hosts | PASSED (revisión); en Vercel: NOT YET VALIDATED |
| Etiquetas de verificación de buscadores | Inyección de HTML desde variables | Solo se aceptan `[A-Za-z0-9_-]{10,100}` | VERIFIED |
| Veto del build | — | Nueva regla: falla si `analytics.ts` deja de exigir el consentimiento | VERIFIED |

## 9. Próximas acciones de seguridad
1. Proteger `main` en GitHub (Juanes, 2 minutos).
2. Cerrar el PR #1 de Copilot y borrar la rama `claude-prueba-acceso` (Juanes).
3. Correr `npm audit` y `tests/regresion-seguridad.mjs` en cada ciclo.
4. Repetir esta revisión completa en cada proyecto de cliente con datos.

## Límite de solicitudes, costos y topes de gasto (4 oct 2026, videos de @sebas.soto222)

**Límite de solicitudes (rate limiting):** el sitio **no tiene API ni funciones de servidor**: no hay carpeta `api/` ni `functions` en `vercel.json`, y el formulario abre WhatsApp sin pasar por un servidor. No hay nada propio que alguien pueda saturar con solicitudes. Lo estático lo sirve la CDN de Vercel, que trae mitigación de DDoS activada por defecto en todos los planes ([documentación de Vercel](https://vercel.com/docs/plans/hobby)). Estado: NO APLICA al sitio, VERIFIED. Para las apps es obligatorio (`apps.md`, "Operación antes de producción").

**Servicios y costos:**
| Servicio | Plan | ¿Puede llegar un cobro sorpresa? | Evidencia |
|---|---|---|---|
| Vercel (2 proyectos) | Hobby, gratis | **No.** "Como es gratis, no hay ciclos de cobro". Si se pasa del uso incluido, la función se pausa hasta por 30 días | [Vercel Hobby](https://vercel.com/docs/plans/hobby), consultado el 4 oct 2026 |
| GitHub (repositorio y Actions) | Gratis, repositorio público | No. Actions es gratis en repositorios públicos | Repositorio público (API de GitHub) |
| Google Analytics 4 | Gratis | No | — |
| Fuentes e imágenes | Alojadas en el sitio | No | — |

Uso incluido en Hobby: 100 GB de transferencia y 1 000 000 de solicitudes a la CDN al mes. La página de inicio pesa unos 190 KB, así que alcanza para cientos de miles de visitas al mes (inferido). **Riesgo de disponibilidad:** si se superara, Vercel pausaría el sitio en lugar de cobrar.

**RIESGO NUEVO (alto, de negocio):** las normas de uso de Vercel dicen que el plan Hobby "restringe a uso personal, no comercial" ([fuente](https://vercel.com/docs/plans/hobby)). Forja Digital es un negocio. Opciones, que decide Juanes:
1. Pasar a Pro (US$20 al mes por persona), que además permite topes de gasto configurables.
2. Mudar el sitio a un hosting gratuito que permita uso comercial. Las condiciones del otro proveedor habría que verificarlas antes de mudarse: NOT VERIFIED.

Hasta que decida, queda en el backlog (#2).
