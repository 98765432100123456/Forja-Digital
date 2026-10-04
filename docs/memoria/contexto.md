# Contexto del producto

## Determinación del contexto

| Aspecto | Valor | Certeza |
|---|---|---|
| Tipo de producto | Landing de servicios con tienda de plantillas | Observado |
| Industria | Diseño y desarrollo web para pequeños negocios | Observado |
| Modelo de negocio | Proyectos con precio "desde", acompañamiento mensual y venta de kits | Observado (sitio) |
| Etapa | **Etapa 0, PRE-LAUNCH**: público, sin tráfico medido ni clientes | Observado (sin casos reales, sin opiniones, sin GA4) |
| Audiencia | Salones, restaurantes, inmobiliarias y emprendimientos en Colombia | Observado (decisión del dueño) |
| Objetivo | Conversaciones de venta por WhatsApp | Observado |
| Tráfico | Desconocido | Google Analytics sin ID configurado |
| Conversión | Desconocida | Sin datos |
| Canal de llegada | Facebook / Instagram | Hipótesis (la página de Facebook existe; no hay datos de tráfico) |
| Tecnología | React + Vite + TypeScript, multipágina prerenderizada, Vercel | Observado |
| Restricciones | Una sola persona, sin presupuesto de publicidad conocido, sin dominio propio | Observado / Inferido |
| Madurez | MVP | Inferido |

**Qué necesita realmente el producto** (es una landing de servicios en etapa de lanzamiento):
1. Confianza.
2. Diferenciación.
3. Generar contactos.
4. Medición.

No necesita (todavía): más funcionalidades, cuentas de usuario ni backend.

## Inteligencia del producto

| Pregunta | Respuesta | Certeza |
|---|---|---|
| ¿Qué vende realmente? | Tranquilidad: verse profesional sin aprender tecnología y sin que te dejen solo. | Hipótesis |
| ¿Qué problema compra el usuario? | "Mi negocio se ve improvisado en internet y no sé cómo arreglarlo." | Hipótesis |
| ¿Qué percepción necesita existir? | Que hay una persona real, capaz y accesible. | Inferido |
| ¿Por qué alguien lo elegiría? | Precio "desde" más bajo que el de los estudios revisados ($400.000 frente a $450.000 y $3.500.000), trato directo y simulador. | Observado (precios) / Hipótesis (motivo de compra) |
| ¿Por qué NO lo elegiría? | Sin opiniones, sin clientes reales, sin foto y con dominio `.vercel.app`. Los competidores revisados muestran reseñas y cifras. | Observado |
| Momento de mayor valor | Cuando el visitante ve su propio nombre en la vista previa. | Hipótesis |
| Dónde aparece la incertidumbre | ¿Es real? ¿Cumple? ¿Cuánto tarda? ¿Qué pasa si no me gusta? | Inferido |
| Dónde hay fricción | Saltar de la web a WhatsApp; no hay garantía ni forma de pago explicada. | Observado (falta el contenido) |
| Cuello de botella principal | **Confianza.** | Inferido (comparación con competidores) |
| Posible ventaja competitiva | Vista previa del negocio propio + precio visible + persona real. | Hipótesis |

## Simulación de usuarios

Las simulaciones sirven para generar hipótesis; no son evidencia de comportamiento real.

| Perfil | Objetivo | Contexto | Motivación | Dudas | Fricciones | Comportamiento esperado | Punto de abandono | Percepción final |
|---|---|---|---|---|---|---|---|---|
| Nuevo, llega desde publicidad en Facebook | Saber si le sirve | Celular, entre clientes | Verse mejor que la competencia de su barrio | ¿Esto es para mí? | Página larga | Lee el hero, baja a Trabajos | Si no ve su tipo de negocio | "Se ve serio" |
| Escéptico | Comprobar que es real | Compara varias opciones | Evitar estafas | ¿Quién es? ¿Ha trabajado con alguien? | Sin foto, sin opiniones, casos demostrativos | Busca opiniones y la sección del equipo | Al ver "Todavía no hay opiniones" | "Puede ser bueno, pero no me arriesgo" |
| Orientado a precio | Saber cuánto cuesta | Presupuesto ajustado | Gastar poco | ¿Hay costos ocultos? | Dominio y hosting aparte | Va directo a Planes | Si el total final no es claro | "Es más barato que otros" |
| Orientado a calidad | Ver el nivel del trabajo | Ya tuvo una mala experiencia | Resultado profesional | ¿El trabajo final se ve como la muestra? | No hay un sitio real para abrir | Mira el portafolio y el simulador | Si solo encuentra muestras | "Buen gusto, falta prueba" |
| Baja paciencia, celular | Escribir ya | Pantalla pequeña | Resolver rápido | — | Ninguna importante | Toca el botón del hero o la barra fija | — | "Fácil" |
| Llega desde Google | Encontrar un diseñador web en Colombia | Búsqueda específica | Comparar | ¿Dónde están? | Sin ciudad ni dirección | Lee el título y la descripción | Si no ve su ciudad | Neutral |

**¿Qué descubrimos?** En 4 de los 6 perfiles, la principal duda es la confianza (inferido).
**¿Qué cambió gracias a eso?** Se priorizan la prueba social real y la medición por encima de mejoras visuales (ver `priorizacion.md`).
**¿Qué hipótesis queda sin validar?** Que el simulador reduce la incertidumbre; que el precio visible atrae y no espanta; que el canal principal es Facebook.

## Promesas públicas y su evidencia (sec. 6)

| Promesa en la página | Evidencia | Estado |
|---|---|---|
| "Respondemos en menos de 24 horas" | Ninguna todavía (no hay historial de respuestas) | Hipótesis, pendiente de confirmar (D7) |
| Landing lista en 1 a 2 semanas; Web en 2 a 4 | Ninguna (no hay proyectos entregados) | Hipótesis, pendiente de confirmar (D7) |
| Precios "desde" ($400.000 a $1.000.000; $60.000 al mes) | Definidos por el dueño | Observado (decisión), sin validar con el mercado |
| "Hablas directo con quien lo hace" | Una sola persona (Juanes) | Observado |
| HTTPS, cabeceras de seguridad, copias de seguridad, accesos por roles | HTTPS y cabeceras verificadas en este sitio (A+). Copias y roles: prácticas para proyectos con datos, aún sin entregar | Parcialmente verificado |
| "No compartimos tus datos" | El sitio no guarda datos en servidor y no envía el contenido del formulario a GA4 | Verificado para el sitio |
| "Lista para Google" | HTML prerenderizado, sitemap, robots, canonical y datos estructurados presentes | Verificado (técnico); posicionamiento: desconocido |

## Inteligencia de negocio (sec. 7)

| Aspecto | Estado | Certeza |
|---|---|---|
| Propuesta de valor | Diseño y web a la medida, económicos, con una persona real | Observado (página) |
| Ingresos | Proyectos únicos + acompañamiento mensual + kits | Observado; precio de los kits: no definido |
| Costes | Tiempo de Juanes; Vercel gratis; dominio y hosting los paga el cliente | Inferido |
| Adquisición | Página de Facebook | Hipótesis (sin datos) |
| Activación | Primer mensaje por WhatsApp | Definido como evento `generate_lead` |
| Conversión | Mensaje → propuesta → pago | Desconocido |
| Retención / expansión | Plan de acompañamiento mensual y venta cruzada (redes + web + datos) | Hipótesis |
| Ventaja competitiva | Precio de entrada más bajo + vista previa propia + trato directo | Hipótesis |
| Riesgos de negocio | Promesas sin confirmar, sin prueba social, depender de una sola persona | Inferido |
