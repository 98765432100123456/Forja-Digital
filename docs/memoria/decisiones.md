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
- **Estado:** **requiere aprobación humana** (es una decisión de negocio). Se mantienen publicados hasta que Juanes los confirme o los cambie.

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
| D7 Promesas | Identificado | Disponible | — | Propuesta | — | — | — | Aprobación de Juanes |
