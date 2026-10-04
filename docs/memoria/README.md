# Memoria del proyecto: Forja Digital

Esta carpeta es la memoria del proyecto. Sirve para que cada iteración continúe desde donde quedó la anterior en lugar de
empezar de cero. Pertenece **solo a este proyecto**: aquí no se guarda información de otros clientes.

| Archivo | Para qué sirve |
|---|---|
| [`contexto.md`](./contexto.md) | Qué es el producto, qué vende realmente, a quién, y la simulación de usuarios |
| [`competencia.md`](./competencia.md) | Competidores revisados, con evidencia |
| [`decisiones.md`](./decisiones.md) | Registro de decisiones y matriz de evidencia |
| [`priorizacion.md`](./priorizacion.md) | Qué hacer primero (impacto × confianza / esfuerzo) |
| [`experimentos.md`](./experimentos.md) | Experimentos diseñados y sus resultados |
| [`marca.md`](./marca.md) | Memoria de marca: principios, tono, tokens, elementos permitidos y prohibidos |
| [`aprendizajes.md`](./aprendizajes.md) | Patrones candidatos y su nivel de evidencia |
| [`registro.md`](./registro.md) | Trazabilidad: qué cambió, en qué archivos, qué pruebas se corrieron y qué versión se desplegó |
| [`arquitectura.md`](./arquitectura.md) | Stack, organización del código, calidad medida y escalabilidad |
| [`analitica.md`](./analitica.md) | Diccionario de eventos, métricas de decisión y cómo activar GA4 |
| [`seguridad.md`](./seguridad.md) | Fronteras de confianza, hallazgos, postura de controles, riesgos residuales y lo que no aplica |
| [`gates.md`](./gates.md) | Quality gates antes de publicar y crítica honesta de diseño |

El sistema de diseño está en [`../SISTEMA-DE-DISENO.md`](../SISTEMA-DE-DISENO.md). Juntos, estos archivos son el **contexto compartido del producto**: producto, marca, decisiones, experimentos, competencia, arquitectura, usuarios, analítica, diseño y aprendizajes.

## Madurez del producto

**Etapa 0, PRE-LAUNCH** (4 de octubre de 2026): el sitio es público, pero no hay tráfico medido, conversiones, clientes,
incidentes ni carga real. Por eso no se reportan métricas de negocio y la seguridad se limita a **verificar controles**.
Pasa a Etapa 1 cuando GA4 esté activo y lleguen los primeros contactos reales.

Jerarquía de evidencia: datos reales de producción > experimento controlado > prueba con usuarios > simulación > supuesto de diseño.

## Etiquetas de certeza (se usan en todos los archivos)

- **Observado:** sale directo del producto, del código, de las pruebas o de una fuente revisada.
- **Inferido:** conclusión razonable a partir de lo observado.
- **Hipótesis:** suposición que hay que validar.
- **Desconocido:** todavía no se puede determinar.
- **Medido:** cambio respaldado por datos de antes y después. Hoy no hay ningún resultado de negocio medido; sí hay mediciones técnicas de laboratorio.

Etiquetas adicionales (sección 5 del motor):
- **Verificado:** se comprobó con una prueba reproducible (por ejemplo, una falla reproducida y luego corregida).
- **No disponible aún:** no puede existir todavía (datos de campo sin tráfico).
- **No medido:** podría medirse, pero no se hizo.
- **No aplica:** no corresponde a este producto (por ejemplo, autenticación en un sitio sin cuentas).
- **Muestra insuficiente:** hay datos, pero no alcanzan para concluir.
- **Falló:** se probó y no pasó.
- **Riesgo residual:** riesgo conocido y aceptado con su razón.

Nunca: desconocido → falso o verdadero; hipótesis → hecho; implementado → validado; probado una vez → seguro para siempre;
sin incidentes → sin vulnerabilidades; sin quejas → satisfacción; simulación → comportamiento real; scanner aprobado → sistema seguro.
