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
