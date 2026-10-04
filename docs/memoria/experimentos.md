# Experimentos

Ninguno se ha ejecutado: requieren tráfico real y Google Analytics activo. Están diseñados para correr apenas haya datos.
Con poco tráfico (inferido para un negocio que empieza), conviene medir tendencias semanales antes de declarar ganadores.

### E1 · Simulador frente a vista previa estática
- **Hipótesis:** el simulador aumenta el porcentaje de visitantes que inician un chat.
- **Variable:** sección del simulador.
- **Control:** imagen estática con las mismas piezas (sin interacción).
- **Variante:** simulador interactivo actual.
- **Resultado esperado:** más `generate_lead` por sesión en la variante.
- **Métrica principal:** `generate_lead` / sesiones. Secundarias: `sim_start`, `sim_name`, `sim_cta`.
- **Criterio de éxito:** mejora sostenida durante 4 semanas o con un mínimo de 100 sesiones por variante. Si no se llega a ese volumen, el resultado es indicativo, no concluyente.
- **Fecha / contexto:** a definir cuando GA4 esté activo.
- **Aprendizaje:** pendiente.

### E2 · Texto del botón principal
- **Hipótesis:** "Ver precio para mi negocio" genera más clics que "Cotizar por WhatsApp" en visitantes orientados a precio.
- **Variable:** texto del CTA del hero.
- **Control:** "Cotizar por WhatsApp".
- **Métrica:** clics en el CTA del hero / sesiones.
- **Criterio de éxito:** igual que E1.
- **Riesgo:** el nuevo texto promete un precio; la respuesta por WhatsApp tiene que darlo.

### E3 · Prueba social real
- **Hipótesis:** publicar 3 opiniones reales aumenta el contacto de los visitantes escépticos.
- **Variable:** sección de opiniones (vacía frente a 3 reales).
- **Diseño:** comparación de antes y después (no hay tráfico suficiente para un A/B), anotando las campañas activas en cada periodo.
- **Métrica:** `generate_lead` / sesiones; tiempo en la página.
- **Criterio de éxito:** mejora durante 4 semanas sin cambios grandes de tráfico.
