# Aprendizajes

Regla: un patrón pasa por descubierto → probado → medido → repetido → validado. Solo cuando está validado entra a un playbook
general. **Un solo proyecto nunca cambia una regla global.** Por eso no se modificó la habilidad general
`diseno-web-nivel-premium` con nada de lo que hay aquí.

| Patrón candidato | Contexto | Cambio | Resultado | Confianza | Aplicabilidad | Excepciones |
|---|---|---|---|---|---|---|
| Mostrar una vista previa del negocio del visitante antes del precio puede reducir la incertidumbre | Landing de servicios locales, etapa de lanzamiento | Simulador (D3) | Sin medir | Baja (hipótesis) | Otros servicios donde el resultado es visual | Servicios donde el resultado no se puede mostrar |
| Un HTML prerenderizado hace que un sitio React se lea sin JavaScript | Sitio React + Vite en Vercel | Prerenderizado (D4) | Verificado técnicamente | Alta (técnica) | Cualquier sitio React sin SSR | Apps detrás de inicio de sesión |
| La falta de prueba social es la brecha principal frente a competidores locales | Servicios web en Colombia | — | Observado en 3 competidores | Media | Negocios de servicios nuevos | — |

## Aprendizaje de seguridad (sec. 80): H1, página en blanco por un hash mal formado
- **¿Cómo ocurrió?** Se agregó `decodeURIComponent` para arreglar el desplazamiento a las anclas, sin pensar en entradas inválidas.
- **¿Por qué no se detectó antes?** Las pruebas solo usaban anclas válidas (`#planes`, `#trabajos`).
- **¿Qué agente lo introdujo?** Claude, en el ciclo del 3 de octubre de 2026.
- **¿Qué control faltó?** Tratar la URL como entrada no confiable y tener un límite de errores.
- **¿Qué prueba faltaba?** Una con entradas inválidas o hostiles.
- **¿Qué regla se actualiza?** En este proyecto: toda lectura de URL, almacenamiento o formulario va con validación y su
  prueba hostil (R1–R4). Es un patrón candidato para otros proyectos, no una regla global (un solo caso).

## Errores cometidos y corregidos
- **4 de octubre de 2026:** la página decía "El más pedido" y "Aparece en Google" sin evidencia. Venían de un patrón de
  plantilla, no de datos. Corregido (D10).
- **3 de octubre de 2026:** se afirmó que ningún competidor tenía simulador y que los freelancers no publican precios, sin haber revisado sus sitios. Se corrigió el 4 de octubre con la revisión de 4 sitios: K&T Code tiene una calculadora de precio y 2 de 3 estudios publican precios.
- **3 de octubre de 2026:** la revisión final declaró valor de negocio sin datos. Se corrigió a "desconocido".
