# Auditoría de forja-digital-mlid.vercel.app

Fecha: 3 de octubre de 2026 · Versión auditada: commit `8c42aab`

Esta auditoría es el paso previo al rediseño. Primero se identifica qué conservar y qué está fallando; las decisiones de diseño
que salen de aquí están en [`SISTEMA-DE-DISENO.md`](./SISTEMA-DE-DISENO.md).

---

## 1. Qué es el producto

- **Qué es:** el sitio de Forja Digital, un servicio de una persona (Juan Esteban) que hace diseño para redes, páginas web,
  bases de datos y seguridad para negocios pequeños en Colombia, y vende kits de plantillas de Canva.
- **Para quién:** dueños de salones de belleza, restaurantes, inmobiliarias y emprendimientos. No son técnicos, llegan
  casi siempre desde el celular (Facebook, Instagram, WhatsApp) y comparan con "lo hago yo con IA o con Canva".
- **Trabajo principal de la página:** que la persona entienda en segundos qué recibe, confíe en que hay alguien real
  detrás y escriba por WhatsApp. Todo lo demás es secundario.

## 2. Qué se conserva

| Elemento | Por qué se conserva |
|---|---|
| Frase "La IA genera. Nosotros construimos." | Es el posicionamiento de la marca y ya está en la página de Facebook y en los anuncios. |
| Naranja de marca | Es el color de los anuncios y del logo; cambiarlo rompe el reconocimiento entre canales. |
| Tipografía Unbounded para titulares | Tiene carácter y es la de las piezas publicitarias. Se reduce su uso, no se elimina. |
| Composición del hero con piezas reales (web, celulares, tabla de pedidos) | Es lo único que muestra trabajo real en el primer pantallazo. Es el elemento memorable. |
| Portafolio con imágenes reales de los kits y lightbox | Prueba concreta de trabajo. |
| Planes con precio "desde" | Transparencia de precio: reduce la fricción de preguntar. |
| Formulario → WhatsApp → /gracias | Funcionalidad crítica. No se puede romper. |
| Preguntas frecuentes, política de privacidad, 404, breadcrumbs, esquema local, GA opcional, CTA fijo en móvil | Checklist de lanzamiento ya implementado. Se conservan todos. |
| Cabeceras de seguridad, fuentes autoalojadas, sitio multipágina | Base técnica correcta. |

## 3. Auditoría UX

Severidad: **Alta** = afecta la conversión o la comprensión · **Media** = genera fricción · **Baja** = pulido.

| # | Problema | Por qué afecta | Severidad | Solución |
|---|---|---|---|---|
| U1 | El hero no dice **para quién** es el servicio. | El test de 5 segundos falla: un dueño de restaurante no sabe si esto es para él. | Alta | Subtítulo con el tipo de negocios y el resultado concreto. |
| U2 | Hay **13 secciones** en la página de inicio y varias repiten la misma idea (Portafolio y Casos muestran los mismos kits; CTA final repite el contacto). | Página larga, el usuario se cansa antes de llegar al contacto. | Alta | Fusionar Portafolio + Casos en "Trabajos"; quitar el CTA final redundante; unir Equipo + Reseñas. |
| U3 | La prueba (trabajos) aparece después de Servicios y de la comparación con IA. | Se promete antes de mostrar. | Media | Mover "Trabajos" justo después del hero. |
| U4 | Seis CTAs distintos para la misma acción ("Cotiza gratis", "Lo quiero", "Pedir precio", "Enviar por WhatsApp", "WhatsApp 313…", "Cotiza gratis por WhatsApp"). | El usuario no sabe si son acciones diferentes. | Media | Un verbo para la acción principal: **"Cotizar por WhatsApp"**. Las variantes dicen qué cotizan ("Cotizar este plan", "Pedir este kit"). |
| U5 | El formulario no muestra errores propios ni estado de envío; si el navegador bloquea la ventana de WhatsApp, el usuario llega a /gracias sin haber escrito. | Pérdida de contactos sin que nadie lo note. | Alta | Validación con mensajes en español junto al campo, estado "Abriendo WhatsApp…", y /gracias con enlace de respaldo (ya existe) más el mensaje preparado. |
| U6 | Filtro del portafolio con "Todos" muestra 16 piezas sin contexto. | Escaneabilidad baja: muchas imágenes, ninguna explicación. | Media | Pestañas por tipo de negocio; cada pestaña muestra el caso (reto, qué se hizo) y sus piezas. |
| U7 | Reseñas vacías ocupan una sección completa con título "Lo que dicen nuestros clientes". | Promete algo que no hay; resta confianza. | Media | Estado vacío honesto y pequeño dentro de "Quién está detrás". |
| U8 | Indicador "Agenda abierta" con punto verde. | Es decorativo y no se actualiza; si deja de ser cierto, engaña. | Baja | Eliminar. |
| U9 | Menú móvil: el panel no cierra con Escape ni al tocar fuera; el foco no se gestiona. | Accesibilidad y uso con teclado. | Media | Cerrar con Escape, al navegar y al tocar fuera; `aria-controls`. |
| U10 | Lightbox sin navegación entre imágenes. | El usuario cierra y abre cada imagen. | Baja | Flechas anterior/siguiente y teclado. |
| U11 | Estados de carga de imágenes: espacio vacío hasta que cargan (sin `width`/`height`). | Saltos de diseño (CLS). | Media | Dimensiones intrínsecas y fondo neutro mientras cargan. |
| U12 | En móvil, el hero baja el contenido visual muy abajo y la barra fija tapa parte del pie. | Jerarquía débil en el dispositivo principal. | Media | Hero móvil propio: texto → CTA → composición reducida. Espacio inferior reservado para la barra. |

## 4. Auditoría visual

| # | Problema | Señal | Severidad | Solución |
|---|---|---|---|---|
| V1 | Fondo casi negro con un solo acento naranja brillante. | Patrón típico de página generada. | Alta | Fondo claro neutro (acero), tinta grafito; el oscuro se reserva para el banco de trabajo del hero y el pie. |
| V2 | Una palabra de cada titular pintada en naranja con resplandor (`text-shadow`). | Recurso repetido en las 10 secciones; nada destaca porque todo destaca. | Alta | Titulares en un solo color. El naranja queda para la acción principal y la marca. |
| V3 | Etiqueta en MAYÚSCULAS espaciadas encima de cada título ("LO QUE HACEMOS", "PLANES"…). | Plantilla; el título ya dice lo mismo. | Alta | Eliminar etiquetas; títulos que se explican solos. |
| V4 | Todo dentro de tarjetas con el mismo radio (24 px), borde y fondo translúcido. | "Kit de tarjetas SaaS". Secciones idénticas. | Alta | Listas con reglas, tablas y composición editorial. Tarjetas solo para objetos (kits, planes). |
| V5 | Resplandores borrosos de colores (`blur(120px)`) detrás de secciones. | Decoración sin propósito. | Alta | Eliminar. |
| V6 | Botones en píldora con flecha "→" en todos. | Genérico; la flecha no aporta información. | Media | Radio 10 px, sin flecha salvo enlaces que llevan a otra página. |
| V7 | Iconos en cajas de color en Servicios. | Iconos aleatorios decorativos. | Media | Quitar cajas; los servicios se distinguen por título y contenido. |
| V8 | Cadenas con punto medio ("Uñas · Pestañas · Cejas", "HTTPS · Backups · Roles"). | Señal de plantilla. | Baja | Texto normal o listas. |
| V9 | Ritmo: todas las secciones tienen el mismo padding y la misma estructura (etiqueta, título, subtítulo, grid). | Monotonía; la página parece hecha por partes. | Media | Variar la composición según el contenido: tabla, lista, pestañas, galería, formulario. |
| V10 | Tipografía display en 7 tamaños sin escala. | Inconsistencia. | Media | Escala modular 1,25 sobre 17 px. |
| V11 | Texto gris de baja jerarquía en cuerpo largo (#a9b6bf sobre negro) en párrafos de 15 px. | Fatiga de lectura. | Baja | Cuerpo a 17 px en grafito; secundario en hierro (contraste 5,5:1). |
| V12 | Fuente monoespaciada solo para la tabla del hero (≈56 KB extra). | Peso sin necesidad. | Baja | Usar cifras tabulares de Manrope; quitar JetBrains Mono. |

## 5. Funcionalidades que no se pueden romper

1. Todos los enlaces a WhatsApp con mensaje prellenado (número 57 313 381 8294).
2. Formulario → abre WhatsApp → redirige a `/gracias`.
3. Lightbox del portafolio.
4. Acordeón de preguntas frecuentes (con `<details>` nativo).
5. Menú móvil.
6. Páginas `/gracias`, `/privacidad`, `404`, con breadcrumbs, títulos y metadescripciones propios.
7. Google Analytics opcional por `VITE_GA_ID` y evento `generate_lead`.
8. Datos estructurados, sitemap, robots, imagen para compartir.
9. Cabeceras de seguridad y CSP.
10. Edición de contenido desde `src/config.ts` y `src/data.ts`.

---

## 6. Resultado del rediseño (verificación final)

### Cambios por hallazgo

| Hallazgo | Qué se hizo |
|---|---|
| U1 | El subtítulo del hero dice para quién es y qué recibe. |
| U2, U3 | De 13 a 10 secciones. Trabajos va justo después del hero y une portafolio y casos. Se quitó el CTA final repetido. Equipo y opiniones quedaron en una sección. |
| U4 | Un solo verbo: "Cotizar". Las variantes dicen qué se cotiza ("Cotizar este plan", "Pedir este kit"). |
| U5 | Validación propia con mensajes junto al campo y foco en el primer error. Estado "Abriendo WhatsApp…". Si el navegador bloquea la ventana, WhatsApp se abre en la misma pestaña. /gracias recupera el mensaje preparado. |
| U6 | Pestañas accesibles por tipo de negocio (flechas, Inicio y Fin), con el caso y sus piezas. |
| U7 | Opiniones con estado vacío honesto, dentro de "Quién está detrás". |
| U8 | Se quitó "Agenda abierta". |
| U9 | El menú móvil se cierra con Escape, al tocar fuera y al navegar. Tiene `aria-controls`. |
| U10 | El visor tiene anterior/siguiente, flechas del teclado y contador. |
| U11 | Todas las imágenes tienen dimensiones intrínsecas y fondo neutro mientras cargan. |
| U12 | Hero móvil propio. La barra fija aparece solo cuando el botón del hero sale de la pantalla, para no duplicar la acción. |
| Extra | Las anclas desde otras páginas (`/#planes`) ahora llevan a la sección (antes el contenido no existía cuando el navegador intentaba desplazarse). |
| V1–V12 | Ver `SISTEMA-DE-DISENO.md`. Sin glows, sin etiquetas en mayúsculas, sin palabra coloreada en titulares, sin tarjetas repetidas, sin flechas decorativas. Se eliminó la fuente monoespaciada. |

### Test de los primeros 5 segundos (captura a 1440 × 900 y 390 × 844)

- **Qué es:** diseño, páginas web y bases de datos. Lo dicen el titular y el subtítulo, y el banco de trabajo lo muestra.
- **Para quién:** salones de belleza, restaurantes, inmobiliarias y emprendimientos en Colombia.
- **Qué puede hacer:** cotizar o ver trabajos.
- **Acción principal:** "Cotizar por WhatsApp", el único botón naranja de la primera pantalla.

### Test "¿parece hecha por IA?"

| Pregunta | Resultado |
|---|---|
| ¿Parece una plantilla? | No. Cada sección usa la forma que pide su contenido: pestañas, filas con reglas, tabla, pasos, columnas de precio, producto y formulario. |
| ¿Patrones repetidos sin necesidad? | No. La única repetición es la lista con check, usada para "qué incluye". |
| ¿Demasiadas tarjetas? | No. Solo el plan destacado y el formulario tienen superficie propia. En móvil los planes pasan a bloques para poder separarlos. |
| ¿Texto artificial? | Se reescribió en voz de taller: frases cortas, sin superlativos, con datos concretos. |
| ¿Colores automáticos? | Paleta de 4 colores base con contraste medido (ver sistema de diseño). |
| ¿Animaciones gratuitas? | Hay una sola entrada (las piezas del hero se asientan). El resto del movimiento responde a una acción. Con `prefers-reduced-motion` no hay movimiento. |
| ¿Personalidad? | El banco de trabajo oscuro con piezas reales, la tipografía Unbounded y la brasa naranja solo donde se actúa. |

### Pruebas automáticas ejecutadas

- Pestañas (clic y teclado), visor (abrir, avanzar, cerrar con Escape), acordeón, carga de imágenes: **pasan**.
- Formulario: errores, foco en el primer error, limpieza al escribir, enlace a WhatsApp con el mensaje, redirección a /gracias y mensaje recuperado: **pasan**.
- Accesibilidad con axe-core (WCAG 2 A/AA y buenas prácticas) en inicio, gracias, privacidad y 404: **0 violaciones**.
- Móvil: barra fija oculta con el hero visible y visible al bajar; menú que abre y cierra con Escape: **pasan**.
- Objetivos táctiles de 44 px o más. Los únicos más pequeños son enlaces dentro de frases, que WCAG 2.5.8 exceptúa.
- Sin desbordamiento horizontal a 390, 820 y 1440 px.
- Peso: CSS 12,8 KB y JS 70 KB (gzip, la mayor parte es React). Se quitó una fuente.

### Criterio final

- [x] UX clara
- [x] Jerarquía visual
- [x] Identidad de marca coherente con anuncios y Facebook
- [x] Diseño original
- [x] Responsive real (hero, comparación, pasos, planes y formulario cambian de forma en móvil)
- [x] Accesibilidad
- [x] Buen rendimiento
- [x] Código mantenible (contenido en `data.ts` y `config.ts`, estilos con tokens)
- [x] Microinteracciones intencionales
- [x] Tipografía y espaciado consistentes
- [x] Estados de interacción completos
- [x] Sin elementos genéricos innecesarios
- [x] Todas las funcionalidades existentes siguen funcionando
