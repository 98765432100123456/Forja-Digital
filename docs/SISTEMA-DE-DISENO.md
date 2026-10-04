# Sistema de diseño de Forja Digital

Basado en la [auditoría](./AUDITORIA.md). Todas las secciones y páginas usan estos tokens; están definidos como variables CSS
al inicio de `src/index.css`.

## Idea de la marca

Forja Digital es un **taller**: alguien que construye a mano, con oficio, lo que una máquina entrega en serie. La interfaz se
comporta como un taller ordenado: superficie clara y neutra, herramientas a la vista, y un solo lugar donde está el calor
(el banco de trabajo del inicio, donde se ven las piezas reales). El naranja es la brasa: aparece donde hay que actuar.

**Principios**

1. **Mostrar antes que prometer.** Las piezas reales van arriba; las afirmaciones se apoyan en ellas.
2. **Un solo punto caliente por pantalla.** Si todo es naranja, nada lo es.
3. **La estructura informa.** Reglas, tablas y números solo cuando ordenan contenido real (un proceso, una comparación, un precio).
4. **Hablar como el taller.** Frases cortas, verbos concretos, sin superlativos.

## Color

| Token | Hex | Uso | Contraste |
|---|---|---|---|
| `--acero` | `#F1F2F0` | Fondo de página | — |
| `--blanco` | `#FFFFFF` | Superficies elevadas, formularios | — |
| `--grafito` | `#1B1E22` | Texto principal, banco de trabajo, pie | 14,9:1 sobre acero |
| `--hierro` | `#5A626A` | Texto secundario | 5,5:1 sobre acero |
| `--linea` | `#D9DDE0` | Reglas, bordes de campos | — |
| `--forja` | `#F26B2A` | Acción principal (fondo de botón con texto grafito) | 5,5:1 con grafito |
| `--forja-tinta` | `#B33A0B` | Enlaces y acentos de texto | 5,3:1 sobre acero |
| `--exito` | `#1E7A52` | Estados correctos, WhatsApp | 5,3:1 sobre blanco |
| `--error` | `#B42318` | Errores de formulario | 6,6:1 sobre blanco |

Sobre grafito: texto `#FFFFFF` (16,7:1) y secundario `#C7CCD1` (10,3:1).

## Tipografía

- **Unbounded 700** para titulares (identidad de la marca, igual que en anuncios). Siempre en minúscula de oración, nunca en
  párrafos, interletrado −0,02 em.
- **Manrope** (variable) para todo lo demás: 400 cuerpo, 600 énfasis, 700 etiquetas de control. Cifras tabulares en precios y tablas.

Escala modular 1,25 sobre 17 px:

| Token | px | Uso |
|---|---|---|
| `--t-xs` | 14 | Notas, ayudas de formulario |
| `--t-s` | 15 | Texto secundario |
| `--t-m` | 17 | Cuerpo |
| `--t-l` | 21 | Entradillas, títulos de elemento |
| `--t-xl` | 27 | Títulos de subsección |
| `--t-2xl` | 34–42 | Títulos de sección (fluido) |
| `--t-3xl` | 44–68 | Titular del inicio (fluido) |

Interlineado: 1,6 cuerpo; 1,1 titulares. Longitud de línea máxima: 64 caracteres en párrafos.

## Espaciado, grid y medidas

- Base 4 px: `4 8 12 16 24 32 48 64 96 128`.
- Contenedor máximo 1200 px; márgenes laterales 20 px (móvil), 32 px (tablet), 48 px (escritorio).
- Grid de 12 columnas con 24 px de separación en escritorio; 1 columna en móvil.
- Separación entre secciones: 96 px escritorio, 64 px móvil. Varía según la sección cuando el contenido lo pide.
- Puntos de quiebre: 480, 760, 1024, 1280 px.

## Forma

- **Radios:** 6 px (chips y pestañas), 10 px (botones y campos), 16 px (imágenes y banco de trabajo). Nada en píldora salvo indicadores de estado.
- **Bordes:** 1 px `--linea`. Las reglas horizontales separan filas de contenido, no decoran.
- **Elevación:** nivel 0 por defecto. Nivel 1 solo para piezas flotando sobre el banco de trabajo y el menú móvil:
  `0 1px 2px rgb(27 30 34 / .08), 0 12px 32px -12px rgb(27 30 34 / .35)`.

## Iconografía e imágenes

- Iconos de trazo 2 px, 20–24 px, solo cuando ayudan a reconocer una acción (WhatsApp, menú, cerrar, check en listas).
- Imágenes: siempre trabajo real (kits, sitios). Nada de fotos de stock ni ilustraciones genéricas.
- Las piezas se muestran como objetos sobre el banco de trabajo (sombra nivel 1) o planas en la galería.

## Estados interactivos

| Estado | Tratamiento |
|---|---|
| Hover (botón principal) | Fondo `#E25B1C` |
| Hover (enlace) | Subrayado de 2 px que aparece |
| Focus | Anillo de 3 px `--forja-tinta` con 2 px de separación |
| Active / press | `scale(.98)` en 80 ms |
| Deshabilitado / cargando | Opacidad .7, cursor `progress`, texto del estado ("Abriendo WhatsApp…") |
| Error | Borde y mensaje `--error` bajo el campo, `aria-invalid` |
| Éxito | Ícono y texto `--exito` |

## Movimiento

- Una sola secuencia de entrada: las piezas del banco de trabajo se asientan al cargar (400 ms, escalonado 60 ms).
- Movimiento como respuesta: acordeón de preguntas, cambio de pestaña en Trabajos, apertura del menú y del lightbox (150–200 ms).
- Curva `cubic-bezier(.2,.7,.2,1)`. Con `prefers-reduced-motion` todo es instantáneo.

## Estructura de la página de inicio

```
┌─────────────────────────────────────────────────────────┐
│ Logo            Trabajos Servicios Planes Plantillas  [Cotizar] │
├──────────────────────┬──────────────────────────────────┤
│ Titular (2 líneas)   │  ███ banco de trabajo (grafito) ███ │
│ Para quién + qué     │   web · celulares · tabla pedidos  │
│ [Cotizar] Ver trabajos│                                    │
│ Respuesta en 24 h    │                                    │
├──────────────────────┴──────────────────────────────────┤
│ Trabajos: pestañas por negocio → caso (texto) + galería  │
├─────────────────────────────────────────────────────────┤
│ Servicios: 4 filas con regla (nombre | qué es | incluye) │
├─────────────────────────────────────────────────────────┤
│ Solo IA vs. Forja Digital: tabla de 4 filas              │
├─────────────────────────────────────────────────────────┤
│ Proceso: 4 pasos numerados (secuencia real)              │
├─────────────────────────────────────────────────────────┤
│ Planes: 4 columnas separadas por reglas, precio grande   │
├─────────────────────────────────────────────────────────┤
│ Plantillas: 4 kits como producto                         │
├─────────────────────────────────────────────────────────┤
│ Quién está detrás + opiniones (estado vacío honesto)     │
├─────────────────────────────────────────────────────────┤
│ Preguntas │ Contacto (formulario)                        │
├─────────────────────────────────────────────────────────┤
│ Pie (grafito)                                            │
└─────────────────────────────────────────────────────────┘
```

Alineación: todo a la izquierda. Solo se centra el contenido de las páginas de estado (gracias, 404).

## Revisión del plan contra resultados genéricos

| Primera idea | Por qué se descartó | Decisión final |
|---|---|---|
| Mantener fondo negro con acento naranja | Es el patrón más común de páginas generadas y cansa en lectura larga. | Fondo acero claro; el oscuro solo en el banco de trabajo (el punto caliente) y el pie. |
| Fondo crema cálido | Es la otra paleta típica generada. | Gris neutro frío-cálido `#F1F2F0`, más "metal" que "papel". |
| Tarjetas para servicios, casos, planes y reseñas | Kit de tarjetas repetido. | Filas con reglas para servicios; tabla para la comparación; pestañas para casos; columnas para planes. Tarjeta solo para los kits (son productos). |
| Etiqueta en mayúsculas sobre cada título | Plantilla. | Eliminadas. |
| Palabra destacada en naranja en cada titular | Recurso repetido. | Titulares en un color. |
| Animación de aparición en cada sección | Movimiento gratuito. | Una entrada en el hero y movimiento solo como respuesta. |
