# Tablero de pendientes (backlog)

Una sola lista con lo que falta, quién lo hace y el estado (video de @sebas.soto222: "sin un sistema claro se te olvidan bugs, ideas y tareas").
Se actualiza en cada ciclo. **Linear** o **GitHub Issues** son opciones para cuando haya clientes o más personas. Para pasarse a Linear hace falta que Juanes cree la cuenta.

Estados: Por hacer · En curso · Bloqueado (espera algo de otra persona) · Hecho.
Prioridad: Alta = riesgo legal o de que el sitio se caiga · Media = confianza o medición · Baja = mejora.

Última revisión: 5 oct 2026.

## Decisiones y cuentas de Juanes
| # | Tarea | Prioridad | Estado | Nota |
|---|---|---|---|---|
| 1 | **Hosting:** Vercel Hobby es solo para uso no comercial. Elegir entre pasar a Pro (US$20 al mes) o mudar a un hosting gratis que permita uso comercial | Alta | Por hacer | `seguridad.md`. Claude hace la mudanza si se elige esa opción |
| 2 | **RUT/NIT y dirección de notificación judicial** para el pie y los términos (Ley 1480, art. 50) | Alta | Por hacer | `legal.md`. Puede ser la dirección de una oficina virtual si no quieres publicar la de tu casa |
| 3 | **Confirmar 4 reglas** redactadas por Claude: (a) si se cancela con el trabajo empezado, el anticipo cubre lo hecho; (b) el acompañamiento no tiene permanencia; (c) el mes ya pagado no se devuelve; (d) si un defecto no se puede corregir, se devuelve lo pagado por esa parte | Alta | Por hacer | Están publicadas en `/terminos` y `/reembolsos` |
| 4 | **Revisión de un abogado**: retracto de las plantillas, términos y si hay que inscribirse en el RNBD | Media | Por hacer | `legal.md` |
| 5 | **Search Console y Bing**: crear la propiedad y pasarle a Claude el código de verificación | Media | Por hacer | Claude lo instala y envía el `sitemap.xml` |
| 6 | **Google Analytics**: revisar "Tiempo real" y marcar `generate_lead` como evento clave cuando aparezca | Media | Por hacer | `analitica.md` |
| 7 | **Probar en un iPhone (Safari) y en un Android reales**: página, formulario, ícono nuevo en la pantalla de inicio | Media | Por hacer | Aquí solo hay Chromium |
| 8 | **Aviso de caída:** el revisor de cada 30 min está activo, pero GitHub no lo ha ejecutado ni una vez. Abrir GitHub → Actions → "Disponibilidad del sitio" → "Run workflow" una vez para confirmar que funciona | Media | Por hacer | Claude no puede lanzarlo (sin permiso de escritura en la API) |
| 9 | **GitHub:** proteger `main` y exigir que pase el check "Pruebas" antes de publicar | Media | Por hacer | Las pruebas ya corren en cada cambio, pero todavía no bloquean |
| 10 | **GitHub:** cerrar el PR #1 de Copilot | Baja | Por hacer | |
| 11 | **Instagram:** crear la cuenta para enlazarla (hoy está oculta) | Baja | Por hacer | |
| 12 | **Dominio propio** (.com o .co) | Media | Por hacer | Da más confianza que `.vercel.app` y facilita mudarse de hosting |
| 13 | **Perfil de Empresa en Google** (Google Business) para aparecer en búsquedas de Bogotá y en Maps | Alta | Por hacer | Hoy la marca no aparece al buscarla (video, punto 3) |
| 14 | **Primer cliente real** con permiso para mostrar su trabajo y su opinión | Alta para el negocio | Por hacer | Lo que más sube la confianza (`gates.md`) |
| 15 | **Sentry** (opcional para el sitio): crear la cuenta si quieres avisos de errores de todas las visitas | Baja | Por hacer | Hoy los errores llegan a GA4 solo si la persona acepta cookies |
| 16 | **Marca:** buscar en la SIC marcas parecidas al martillo antes de registrarla | Baja | Por hacer | D21 |
| 17 | **Validar precios** de apps y kits con los primeros clientes | Media | Por hacer | Hoy son decisión del dueño, sin datos del mercado |
| 18 | **WhatsApp Business:** configurar el mensaje de bienvenida, el de ausencia y las respuestas rápidas que redactó Claude | Alta | Por hacer | `whatsapp.md`. Video: "respuesta en menos de 5 minutos" |
| 19 | **Precio de referencia** para diseño a la medida (por pieza o por paquete) y para bases de datos | Media | Por hacer | Hoy dice "se cotiza". Video: "precio o rango visible" |

## Lo que hace Claude
| # | Tarea | Prioridad | Estado | Nota |
|---|---|---|---|---|
| C1 | Aplicar `DESIGN.md` a `/apps` y `/plantillas-canva`: revisar que no repitan el mismo bloque de tarjetas | Media | Por hacer | El inicio y las 4 páginas de servicio nuevas ya lo siguen |
| C2 | Medir con PageSpeed Insights en producción | Baja | Bloqueado | La API de Google respondió 429 (límite); se reintenta. En local: móvil 98/100/100/100 |
| C3 | Actualizar el tablero visual (artifact) con el estado de hoy | Baja | Por hacer | Muestra producción `3e8410e` |
| C4 | Borrar las ramas ya publicadas: `rediseno/vitrina`, `marca/logo-martillo`, `mejora/*`, `claude-prueba-acceso` | Baja | Por hacer | |
| C5 | Prueba con lector de pantalla real (NVDA o VoiceOver) | Baja | NOT TESTED | axe da 0 errores, pero no reemplaza una prueba real |
| C6 | Instalar los códigos de Search Console y Bing | Media | Bloqueado | Espera el #5 |
| C7 | NIT y dirección en el pie, los términos y los datos estructurados | Alta | Bloqueado | Espera el #2 |

## Hecho hoy (4 oct)
- Logo del martillo, vitrinas sin cuadros, `DESIGN.md`, sin sombras y menú que marca la sección: en producción (`e6abbdc`).
- Pruebas automáticas en cada cambio (183 comprobaciones, GitHub Actions en verde).
- Medición de secciones (`view_section`), SEO local con Bogotá y estándar de apps (límites, caché, índices y topes).
