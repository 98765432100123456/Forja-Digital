# Quality gates y crítica antes del release

Evaluación del 4 de octubre de 2026 sobre la rama `mejora/seguridad-y-madurez` (secciones 82–85 del motor).
Estados: PASSED, FAILED, NOT YET AVAILABLE, NOT TESTED.

## Gates

| Gate | Estado | Evidencia | Lo que falta |
|---|---|---|---|
| **Product** | PASSED | Flujos principales probados: contacto por WhatsApp, formulario, simulador, trabajos y FAQ (25 pruebas funcionales) | Validar la propuesta con clientes reales |
| **Design** | PASSED con observaciones | Identidad consistente (`marca.md`); responsive sin desbordes a 390, 820 y 1440 px; crítica abajo | Foto real y trabajos reales |
| **Accessibility** | PASSED | axe-core: 0 violaciones en 4 páginas; Lighthouse 100; teclado y foco probados | Prueba con lector de pantalla real: NOT TESTED |
| **Performance** | PASSED | Lighthouse móvil 98, LCP 2,1 s, CLS 0,015; INP de laboratorio ≤ 144 ms (CPU 4× más lenta) | Datos de campo: NOT YET AVAILABLE |
| **Security** | PASSED | Ningún hallazgo crítico ni alto (`seguridad.md`); build con veto automático | Protección de `main` (H3): FAILED, depende de Juanes |
| **Evidence** | PASSED | Cada afirmación de la página revisada; se quitaron "El más pedido" y "Aparece en Google" (D10) | "24 horas" y tiempos de entrega siguen sin confirmar (D7) |
| **Conversion / Business** | NOT YET AVAILABLE | No hay tráfico ni contactos medidos | GA4 + primeros clientes |

**Veredicto del World-Class Gate (sec. 83):** se aprueba **para publicar como producto en Etapa 0**: es sólido en producto,
diseño, accesibilidad, rendimiento, tecnología, seguridad y evidencia. **No** se puede afirmar que sea "de clase mundial"
en conversión, negocio ni aprendizaje: todavía no hay datos para saberlo. La aprobación final para producción es de Juanes.

## Critical Design Director (sec. 84)

- **¿Qué sigue pareciendo genérico?** La rejilla de 4 servicios con lista de ✓ y la de 4 pasos numerados: es el patrón que
  usan los 3 estudios revisados. Se mantiene porque los visitantes la esperan (`competencia.md`), pero no diferencia.
- **¿Qué parece generado por IA?** Las cuatro piezas de "Trabajos" son demostrativas y lo dicen. Quien busca prueba real
  no la encuentra. El problema no es de diseño: falta un cliente real.
- **¿Qué no tiene suficiente evidencia?**
  - "El más pedido" sobre el plan Web: **no hay pedidos**. Corregido a "Recomendado" (D10).
  - "Aparece en Google": nadie puede garantizar aparecer. Corregido a "Lista para Google" (D10).
  - "Respondemos en menos de 24 horas" y los tiempos de entrega: pendientes del dueño (D7).
- **¿Qué no está claro?** Cómo se paga (anticipo, medios de pago) y qué pasa si el resultado no gusta. No aparece en la
  página. Es una decisión de negocio de Juanes; no se inventa una garantía (sec. 19).
- **¿Qué genera desconfianza?** Sin foto, 0 opiniones y el dominio `.vercel.app`.
- **¿Qué sobra?** Nada evidente. La página ya bajó de 13 a 10 secciones (D2).
- **¿Qué falta?** Prueba social real, la foto de Juanes y la forma de pago.
- **¿Qué podría romperse?** Un enlace con un hash mal formado la dejaba en blanco (H1, corregido). El pie decía "7:00 p.m.."
  con doble punto (corregido).
- **¿Qué podría ser abusado?** El mensaje prellenado: alguien puede editar el precio antes de enviarlo (H2). No tiene efecto
  porque el precio se confirma por escrito.
- **¿Qué afirmación no podemos defender?** Las tres de arriba. Después de este ciclo solo queda D7.
- **¿Qué cambio tendría mayor impacto?** Ninguno de diseño: un cliente real con permiso para mostrar su trabajo y su opinión.

## Inspección visual

Capturas completas a 1440 y 390 px del build local (las previews de Vercel piden inicio de sesión). Una captura mostró los
kits como cuadros grises; se verificó que las 4 imágenes cargan (900 px, `complete: true`). Era la carga diferida durante la
captura, no un defecto.
