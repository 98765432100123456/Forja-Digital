# Registro de decisiones

Cada decisión importante, con su evidencia. Ninguna tiene todavía un resultado medido, porque no hay datos de analítica.

---

### D1 · Rediseño con identidad de "taller"
- **Problema:** la versión oscura con resplandores y tarjetas se parecía a cualquier plantilla.
- **Evidencia:** auditoría visual del sitio anterior (observado, `AUDITORIA.md`).
- **Hipótesis:** una identidad propia y clara aumenta la confianza percibida.
- **Cambio:** fondo claro, un solo punto oscuro (el banco de trabajo), naranja solo en acciones.
- **Métrica:** tasa de clic en "Cotizar" por sesión.
- **Resultado:** pendiente de datos reales.
- **Aprendizaje:** pendiente.
- **Siguiente experimento:** ninguno; no conviene volver a la versión anterior sin evidencia.

### D2 · Unir portafolio y casos en "Trabajos" y bajar de 13 a 10 secciones
- **Problema:** contenido repetido y página larga.
- **Evidencia:** portafolio y casos mostraban las mismas imágenes (observado).
- **Hipótesis:** menos repetición mantiene a más personas hasta el contacto.
- **Cambio:** pestañas por tipo de negocio, con el caso y las piezas juntos.
- **Métrica:** profundidad de scroll y clics en las pestañas.
- **Resultado:** pendiente.

### D3 · Simulador "Mira cómo se vería tu negocio"
- **Problema:** el visitante no puede imaginar su propio resultado.
- **Evidencia:**
  - Observaciones del producto: solo había trabajos de otros.
  - Ninguno de los 4 competidores revisados ofrece una vista previa personalizada (observado).
  - Simulación de usuarios (hipótesis).
- **Hipótesis:** ver su propio nombre en la vista previa reduce la incertidumbre y aumenta la intención de contacto.
- **Cambio:** simulador con tipo de negocio, nombre y color; CTA con mensaje prellenado.
- **Métrica:** `sim_start` → `sim_name` → `sim_cta` → `generate_lead` (eventos instrumentados el 4 de octubre de 2026 y verificados con un ID de prueba).
- **Resultado:** pendiente de datos reales.
- **Siguiente experimento:** E1 (simulador frente a vista estática).

### D4 · Prerenderizar el HTML
- **Problema:** el HTML llegaba vacío sin JavaScript.
- **Evidencia:** al leer el sitio publicado, solo aparecía el mensaje "Activa JavaScript" (observado el 3 de octubre de 2026).
- **Hipótesis:** mejora la indexación y la vista previa al compartir.
- **Cambio:** renderizado en la compilación + hidratación.
- **Métrica:** páginas indexadas en Google Search Console; clics orgánicos.
- **Resultado:** **verificado técnicamente** (el sitio publicado entrega el contenido sin JavaScript). Impacto en tráfico: pendiente.

### D5 · Casos marcados como "Proyecto demostrativo" y opiniones vacías
- **Problema:** no hay clientes reales.
- **Evidencia:** observado.
- **Decisión:** no inventar casos ni opiniones; mostrarlo de forma honesta.
- **Costo aceptado:** menos prueba social que la competencia (observado en `competencia.md`).
- **Métrica:** cuando haya clientes, comparar la conversión antes y después de publicar opiniones reales (E3).

### D6 · Corregir textos sin evidencia (4 de octubre de 2026)
- **Problema:** la tabla comparativa decía que la IA da "plantillas que usan miles de negocios" y que "nadie responde". Son afirmaciones que no se pueden respaldar.
- **Evidencia:** revisión de los textos (observado).
- **Cambio:** "Las mismas plantillas que puede usar cualquier negocio" y "Lo resuelves tú solo".
- **Métrica:** no aplica; es una corrección de veracidad.

### D7 · Promesas operativas pendientes de confirmar con el dueño
- **Problema:**
  - "Respondemos en menos de 24 horas" y los tiempos de entrega (1–2 semanas para landing, 2–4 para web) se definieron durante el desarrollo.
  - No los confirmó el dueño.
- **Estado:** **aprobado por Juanes el 4 de octubre de 2026.** Son compromisos del dueño; si se incumplen, se corrigen en la página.
- **Métrica:** tiempo real de respuesta y de entrega por proyecto (anotarlo a mano en cada cliente). **Resultado:** no disponible aún.

### D8 · Validar el hash de la URL (seguridad + producto)
- **Problem:** un enlace con `%` mal formado dejaba la página en blanco.
- **Evidence:** reproducido en Chromium: `URIError`, 0 encabezados visibles (observado, 4 oct 2026).
- **Risk:** cualquiera puede compartir ese enlace; quien lo abre ve una marca "rota".
- **Decision:** tratar el hash como entrada no confiable.
- **Change:** `try/catch` en `Layout.tsx`.
- **Test:** R1 y R2 en `tests/regresion-seguridad.mjs`.
- **Result:** la página carga completa con el enlace malicioso. **Status:** VERIFIED.
- **Next:** la prueba queda como regresión permanente.

### D9 · Límite de errores con salida a WhatsApp
- **Problem:** cualquier error de JavaScript desmontaba toda la página.
- **Evidence:** el mismo caso D8 (observado).
- **Hypothesis:** si algo falla, ofrecer WhatsApp conserva contactos que hoy se perderían.
- **Change:** `ErrorBoundary.tsx` + evento `exception` a GA4.
- **Test:** R3 (fallo simulado → pantalla con botón de WhatsApp). **Status:** VERIFIED (técnico).
- **Metric:** eventos `exception` en GA4. **Result:** NOT YET AVAILABLE.

### D10 · Quitar afirmaciones que no se pueden defender
- **Problem:** "El más pedido" (no hay pedidos) y "Aparece en Google" (nadie lo puede garantizar).
- **Evidence:** 0 clientes (observado); la indexación depende de Google (hecho conocido).
- **Decision:** "Recomendado" y "Lista para Google"; el plan Web dice "preparado para que Google lo lea bien".
- **Metric:** no aplica; es una corrección de veracidad (sec. 19). **Status:** VERIFIED en el build.
- **Learning:** las etiquetas de plantilla ("el más popular") son afirmaciones, aunque parezcan diseño.

### D11 · Veto de seguridad automático en el build
- **Problem:** sin un control automático, un secreto o una cabecera rota podría publicarse sin que nadie lo note.
- **Decision:** `scripts/security-check.mjs` al final de `npm run build`; si falla, Vercel no publica.
- **Test:** se plantó un token falso y se quitó una directiva de la CSP: bloqueó en ambos casos. **Status:** VERIFIED.
- **Risk accepted:** detecta patrones conocidos; no reemplaza una revisión (sec. 91).

### D12 · Analítica solo con consentimiento previo
- **Problem:** GA4 se cargaba apenas existiera `VITE_GA_ID`, sin preguntar. La Ley 1581 exige autorización previa, expresa e informada cuando las cookies recogen datos personales.
- **Evidence:** fuente citada en `legal.md`; código de `analytics.ts` (observado).
- **Decision:** aviso con "Aceptar" y "Rechazar" del mismo peso; sin decisión no se carga nada; la decisión se puede cambiar desde el pie.
- **Trade-off aceptado:** se medirá menos tráfico (solo quien acepte). La tasa de aceptación pasa a ser una métrica: NOT YET AVAILABLE.
- **Test:** 23 comprobaciones en `tests/consentimiento.mjs`. **Status:** VERIFIED.

### D13 · Términos y condiciones y política de privacidad completas
- **Problem:** no había términos; a la política le faltaban domicilio, procedimiento, vigencia, IA, terceros y borrado.
- **Decision:** `/terminos` con 50 % de anticipo y 50 % al entregar (aprobado por Juanes), retracto según la Ley 1480, garantía legal, licencia de plantillas y créditos. Política reescrita según el Decreto 1074.
- **Pending:** correo del responsable; validación de un abogado (`legal.md`). **Status:** PASSED (contenido), NOT YET VALIDATED (legal).

### D14 · Una página por intención: `/plantillas-canva`
- **Problem:** quien busca plantillas para Canva tiene otra intención que quien busca contratar una web; las dos estaban en la misma página.
- **Hypothesis:** una página propia puede posicionarse para búsquedas de plantillas. **Metric:** impresiones en Search Console. **Result:** NOT YET AVAILABLE.
- **No se hizo:** páginas por servicio (sin datos de búsqueda, serían contenido duplicado).

### D15 · Un solo dominio público
- **Problem:** `forja-digital.vercel.app` y `forja-digital-mlid.vercel.app` servían el mismo sitio (dos proyectos de Vercel).
- **Decision:** 301 hacia la URL canónica actual (`-mlid`), para no romper enlaces ya compartidos. **Open question:** Juanes puede preferir la URL más corta; cambiarla toma minutos.

### D16 · Movimiento revisado con criterios de Emil Kowalski
- **Change:** curva ease-out más fuerte, presión en botones y opciones, hover solo con mouse, movimiento reducido con fundidos. Tabla en `SISTEMA-DE-DISENO.md`.
- **Metric:** no medible con datos; es calidad percibida. **Status:** PASSED en Chromium; en un celular real: NOT TESTED.

### D17 · Activar GA4 con el ID en el código
- **Decision:** `G-XKHGRSYFDP` como valor por defecto en `config.ts` (la variable `VITE_GA_ID` de Vercel tiene prioridad). Es un identificador público, no un secreto, y así no hay que configurarlo en los dos proyectos de Vercel. Aprobado por Juanes ("Ponlo tú").
- **No se usó el fragmento de Google tal cual:** cargaría GA sin consentimiento y la CSP bloquea scripts en línea.
- **Test:** 20 comprobaciones del aviso con el ID real; 25 pruebas funcionales. **Status:** VERIFIED (técnico). Datos: NOT YET AVAILABLE.
- **Next:** en 48 horas, revisar en GA4 → Tiempo real que lleguen visitas; marcar `generate_lead` como evento clave.

### D18 · Servicio de apps y micro apps
- **Problem:** Juanes quiere ofrecer apps; la página no las mencionaba.
- **Decision (Juanes):** micro app desde $800.000 (2–4 semanas) y app desde $2.500.000 (6–10 semanas), PWA primero y tiendas aparte.
- **Change:** página `/apps`, enlace en el menú y el pie, fila destacada en "Lo que hacemos", opción en el formulario, nota en Planes, sección 8b en los términos, redirecciones y datos estructurados.
- **Evidence:** requisitos de tiendas verificados en fuentes oficiales (`apps.md`). Demanda: UNKNOWN.
- **Metric:** clics en "Cotizar una micro app" o "Cotizar una app" (`generate_lead` con su etiqueta) y visitas a `/apps`. **Result:** NOT YET AVAILABLE.
- **Risk:** prometer apps sin una entregada; la página no muestra casos inventados.

### D19 · Blindaje legal ("que no me demanden")
- **Problem:** faltaban la política de cookies, la de reembolsos, la autorización explícita en el formulario y los datos del negocio. Además, la CSP permitía marcos de Google que no se usan.
- **Evidence:** Ley 1480, art. 50 (comercio electrónico) y art. 47; Ley 2300 de 2023; Ley 1581 (fuentes en `legal.md`).
- **Decision:** casilla obligatoria sin marcar; `/cookies` y `/reembolsos`; GA4 con datos mínimos; `frame-src 'none'`; datos del negocio en el pie.
- **Trade-off:** la casilla agrega un paso al formulario y puede bajar los envíos. Métrica: `generate_lead` con método formulario. Resultado: NOT YET AVAILABLE.
- **Residual risk:** NIT y dirección de notificación pendientes (decisión de Juanes).

### D20 · Rediseño "vitrina" del inicio
- **Problem:** Juanes percibe el diseño como genérico, "se nota que tiene IA". Usó como referencia el sitio de Apple (grabación de pantalla, 4 oct 2026).
- **Evidence:** opinión del dueño (observado). Crítica propia: rejillas de tarjetas con listas de ✓ y titulares a la izquierda iguales en cada sección; producto pequeño; patrón que repiten los competidores revisados (`gates.md`). Comportamiento de usuarios: NOT YET AVAILABLE.
- **Decision:** tomar los **principios**, no la apariencia de Apple (sec. 0: no copiar visualmente a ninguna empresa):
  - una idea por pantalla;
  - el producto como protagonista (dispositivos grandes con ejemplos);
  - titulares cortos y centrados;
  - dos acciones por vitrina;
  - fondos que alternan oscuro y claro;
  - notas al pie honestas.
  Se mantienen el naranja, el logo y el tono de Forja.
- **Change:**
  - El héroe pasa a ser una vitrina oscura centrada.
  - "Lo que hacemos" se reemplaza por vitrinas: páginas web, apps, y 4 medianas (plantillas, redes, datos y seguridad).
  - Los titulares cambian a Manrope 800; Unbounded queda solo para el logo.
  - Botones en píldora y menú translúcido.
  - Aparición suave al desplazarse, solo donde el navegador lo soporta y sin JavaScript; respeta el movimiento reducido.
  - Notas al pie: precios y ejemplos ilustrativos.
  - La sección "Plantillas" sale del inicio porque ya tiene vitrina y página propia.
- **Test:** 27 funcionales, checklist de 15 en 9 páginas, axe 0, consentimiento 20/20, R1–R4. Lighthouse móvil 98/100/100/100 (LCP 1,7 s); escritorio 100 en todo.
- **Metric:** tasa de contacto (`generate_lead` / sesiones) y clics por vitrina. **Result:** NOT YET AVAILABLE: no hay línea base, así que no se podrá atribuir un cambio de conversión al rediseño. Hipótesis: mejora la confianza percibida.
- **Risk:** un rediseño sin datos es una apuesta estética. Es reversible: rama `rediseno/vitrina`.

---

## Matriz de evidencia

| Cambio | Problema | Evidencia | Hipótesis | Solución | Métrica | Resultado | Confianza | Próximo paso |
|---|---|---|---|---|---|---|---|---|
| D1 Rediseño | Identificado | Parcial (auditoría) | Definida | Implementada | Definida | Pendiente | Media | Activar GA4 |
| D2 Trabajos | Identificado | Disponible | Definida | Implementada | Definida | Pendiente | Media | Medir clics en pestañas |
| D3 Simulador | Identificado | Parcial | Definida | Implementada | Definida e instrumentada | Pendiente | Baja–media | E1 |
| D4 Prerenderizado | Identificado | Disponible | Definida | Implementada y verificada | Definida | Técnica: verificada; tráfico: pendiente | Alta (técnica) | Search Console |
| D5 Honestidad | Identificado | Disponible | — | Implementada | Definida | Pendiente | Alta (ética) / baja (efecto) | Conseguir opiniones reales |
| D6 Textos | Identificado | Disponible | — | Implementada | No aplica | — | Alta | — |
| D7 Promesas | Identificado | Disponible | — | Aprobada por el dueño | Tiempo real de respuesta/entrega | No disponible aún | Media | Anotar tiempos de los primeros clientes |
| D8 Hash | Identificado | Reproducido | — | Implementada | Prueba R1/R2 | VERIFIED | Alta | Regresión permanente |
| D9 Errores | Identificado | Reproducido | Definida | Implementada | `exception` | Técnico: VERIFIED; negocio: pendiente | Media | Activar GA4 |
| D10 Veracidad | Identificado | Disponible | — | Implementada | No aplica | VERIFIED | Alta | — |
| D11 Veto | Identificado | Disponible | — | Implementada | Bloqueo probado | VERIFIED | Alta (alcance limitado) | Revisar reglas cada ciclo |

### D21 · Logo nuevo: martillo y golpe (opción C)
- **Problem:** Juanes propuso como logo una imagen generada con IA (estilo ciberpunk). Crítica de Claude: demasiado detalle, no se lee a 16 px y se parece a muchos logos de IA.
- **Evidence:** hoja comparativa con 3 opciones (yunque y cursor, F de dos piezas, martillo y golpe), probadas en negro, blanco y naranja, a 32 y 16 px reales. Juanes eligió la **C** (4 oct 2026, 23:19). Claude recomendaba la B por legibilidad a 16 px; la C también se lee a ese tamaño. Opinión de clientes: NOT YET AVAILABLE.
- **Decision:** martillo inclinado en el momento del golpe con tres chispas, dentro del cuadro naranja de siempre (martillo grafito, chispas blancas). Se mantienen el naranja, Unbounded para el nombre y el cuadro de 32 px.
- **Change:** `Navbar.tsx` (componente `Logo`, usado en el menú y en el pie), `index.css` (`.logo__fondo`, `.logo__martillo`, `.logo__chispas`), `public/favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `icon-512.png` y `og.jpg` regenerados.
- **Riesgo residual:** el martillo es un símbolo común; no se hizo búsqueda de marcas registradas parecidas (NOT TESTED). Antes de registrar la marca en la SIC conviene revisarlo.

### D22 · Quitar el "mismo cuadro para todo"
- **Problem:** Juanes (captura del celular, 4 oct 2026, 23:23): "el mismo tipo de tarjeta que encierra la información es la misma para toda la página, se nota hecha por IA".
- **Evidence:** auditoría de capturas a 1440 y 390 px. Las 6 vitrinas repetían la misma fórmula: etiqueta naranja centrada, titular centrado, subtítulo, dos botones en píldora y una imagen abajo. 4 de ellas, además, dentro del mismo cuadro gris redondeado. Todos los títulos de sección también iban centrados.
- **Decision:** cada servicio tiene su propia composición y ninguna usa cuadros:
  - Web: texto a la izquierda con una ficha técnica de precio y tiempo, y el portátil saliéndose por la derecha.
  - Apps: fondo oscuro, los celulares primero y el texto a la derecha.
  - Plantillas y redes: una sola sección con dos ofertas separadas por líneas y una tira de piezas reales que cruza la pantalla.
  - Datos y seguridad: dos columnas con líneas, como un libro de cuentas.
  - Numeración 01–05 en lugar de la etiqueta naranja; títulos de sección alineados a la izquierda; solo el héroe queda centrado.
- **Change:** `Vitrinas.tsx` reescrito; `index.css` (se quitan `.tiles-grid`, `.tile--half`, `.fan`, `.data-card`, `.secure-card`; se agregan `.feat`, `.specs`, `.strip`, `.reel`, `.ledger`, `.link-arrow`).
- **Validación:** build con veto OK; lint y tipos OK; 27 funcionales (el enlace dentro de una frase está exento); axe 0 en 9 páginas; checklist de 15 OK; S1–S4 OK; Lighthouse móvil 98/100/100/100, LCP 2,0 s, CLS 0,012. Opinión de clientes: NOT YET AVAILABLE.

### D23 · Operación, pruebas automáticas y DESIGN.md (videos del 4 oct, noche)
- **Problem:** Juanes pidió aplicar sin excepción 10 capturas y 2 videos: 6 y 4 errores al lanzar una app, cómo diseñar con un DESIGN.md y qué hacer antes de publicar una web. Pidió además llevar la página al nivel de Apple y superarlo.
- **Evidence:** matriz punto por punto en `lanzamiento.md` (A1–D4). Los videos no tienen transcripción: se leyeron los subtítulos cuadro por cuadro.
- **Decision:**
  - Aplicar al sitio lo que le corresponde y llevar a `apps.md` lo que solo existe en una app: límite de solicitudes, índices, caché de datos, topes de gasto y Sentry.
  - No agregar PostHog ni Sentry al sitio: duplicarían terceros y el aviso de cookies sin responder una pregunta nueva. Sentry queda en el backlog porque requiere la cuenta de Juanes.
  - Del sistema de Apple (Refero) se toman los principios: sin sombras, capas con color y líneas, un solo color de acción y titulares de peso medio.
  - La recomendación automática de UI UX Pro Max (negro y dorado, Cormorant) se descarta porque contradice la marca.
- **Change:**
  - `DESIGN.md` nuevo en la raíz del proyecto.
  - Sin sombras en el contenido (`--sombra-1` pasa a ser una línea de 1 px; `--sombra-flotante` queda solo para lo que flota) y titulares en Manrope 700.
  - El menú marca la sección visible (`aria-current`).
  - Evento `view_section`.
  - Títulos, descripción y datos estructurados con Bogotá.
  - Ficha de `/apps` con límites, caché, índices y topes de gasto.
  - `npm test` con 5 suites (Playwright y axe) y la CI de GitHub `pruebas.yml`.
  - `backlog.md` nuevo.
- **Hallazgo nuevo:** Vercel Hobby es solo para uso no comercial (backlog #2), y la decisión es de Juanes.
- **Validación:** `npm test` con 183 comprobaciones en verde. Lighthouse móvil 98/100/100/100 (LCP 2,1 s, CLS 0,013) y escritorio 100/100/100/100. Build con veto y lint en verde.
