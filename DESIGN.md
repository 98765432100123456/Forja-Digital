# DESIGN.md · Forja Digital

Archivo de diseño para leer **antes** de crear o cambiar cualquier pantalla, a mano o con IA (Claude, Cursor…).
Fuente de verdad del código: `src/index.css`. El porqué de cada decisión está en `docs/SISTEMA-DE-DISENO.md`,
`docs/memoria/marca.md` y `docs/memoria/decisiones.md` (D20–D22).

Referencias estudiadas (4 oct 2026), de las que se tomaron **principios**, nunca la apariencia:
- Sitio de Apple: grabación de Juanes y el sistema "Apple iPhone 18 Pro" de [Refero Styles](https://styles.refero.design/style/40be36d7-7fe6-4451-9f2d-7ceccfd43be8). Sin sombras, capas separadas por color y líneas finas, un solo color de acción y titulares grandes de peso medio.
- [UI UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) (licencia MIT): lista de entrega y guías de UX.
  Su recomendación automática (negro con dorado, Cormorant, "liquid glass") **no se adoptó**: choca con la marca y no cuenta con evidencia a favor.

## 1. Principios
1. **Una idea por pantalla.** Cada sección tiene un solo trabajo y una acción principal.
2. **Cada sección con su propia composición.** Prohibido repetir el mismo bloque (etiqueta, título, subtítulo, botones e imagen) en varias secciones: es lo que hace que una página "se note hecha con IA" (D22).
3. **Mostrar antes de prometer.** El producto (pantallas, piezas) es el protagonista. Todo ejemplo dice "Ejemplo ilustrativo".
4. **Sin sombras en el contenido.** Las capas se separan con color de fondo y una línea de 1 px. La sombra queda solo para lo que flota: menú del celular, aviso de cookies y botón de WhatsApp.
5. **El naranja es la acción.** `--forja` solo en el botón principal de cada sección, el logo y detalles mínimos. Nunca como fondo de una sección.
6. **Nunca inventar** opiniones, clientes, cifras ni resultados.

## 2. Color
| Token | Hex | Uso |
|---|---|---|
| `--grafito` | `#1b1e22` | Texto principal, líneas fuertes y fondo del pie |
| `--noche` | `#0f1113` | Fondo de las secciones oscuras (héroe y apps) |
| `--acero` | `#f1f2f0` | Fondo claro principal |
| `--blanco` | `#ffffff` | Fondo claro alterno y campos de formulario |
| `--hierro` | `#5a626a` | Texto secundario (contraste 6,2:1 sobre blanco) |
| `--sobre-noche` | `#a9afb5` | Texto secundario sobre `--noche` |
| `--linea` / `--linea-fuerte` | `#d9dde0` / `#b9bfc4` | Separadores y bordes de controles |
| `--forja` / `--forja-hover` | `#f26b2a` / `#e25b1c` | Botón principal (texto grafito encima: 5,5:1) |
| `--forja-tinta` | `#b33a0b` | Enlaces, etiquetas y botón de borde sobre fondo claro |
| `--exito` / `--aviso` / `--error` | `#1e7a52` / `#8a5a00` / `#b42318` | Estados |

Reglas: los fondos alternan claro (acero o blanco) y oscuro (noche), sin dos secciones oscuras seguidas. El texto debe tener un contraste de al menos 4,5:1, y los textos grandes, de al menos 3:1.

## 3. Tipografía
| Rol | Familia | Peso | Tamaño | Interletrado |
|---|---|---|---|---|
| Logo | Unbounded | 700 | 17 px | -0,02 em |
| Héroe | Manrope | 700 | `--t-hero` 42–88 px | -0,045 em |
| Título de vitrina | Manrope | 700 | `--t-tile` 34–64 px | -0,04 em |
| Título de sección | Manrope | 700 | 34–54 px | -0,035 em |
| Subtítulo | Manrope | 400 | 21 px (`--t-l`) | 0 |
| Texto | Manrope | 400 | 17 px (`--t-m`), interlineado 1,5 | 0 |
| Etiqueta | Manrope | 700 | 15 px, con número `01 \| Nombre` | 0 |
| Dato (precio, tiempo) | Manrope | 800 | 17 px, cifras tabulares | 0 |

Escala fija: 14 · 15 · 17 · 21 · 27 · 32–42 · 38–56. No se usan tamaños fuera de esta escala. Las líneas de texto corrido no pasan de 65 caracteres. Los títulos usan `text-wrap: balance`.

## 4. Espacio y retícula
- Base 4: `--s-1` 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 px.
- Margen lateral (`--gutter`): 20 px en celular, 32 px desde 760 px y 48 px desde 1280 px.
- Secciones: 72–136 px de espacio arriba y abajo (`clamp`).
- Separación mínima de 8 px entre elementos tocables.
- Anchos que se prueban: 320, 375, 390, 768, 1024 y 1440 px. Ningún ancho tiene desplazamiento horizontal, salvo la tira de piezas, que se desliza dentro de su propio contenedor.

## 5. Forma
- Botones: píldora (`999px`).
- Controles (opciones, campos): 10 px. Piezas de muestra: 4 px.
- **Las secciones no son cajas redondeadas** (D22). Se separan con color de fondo o con líneas.

## 6. Botones y enlaces
| Variante | Cuándo | Estilo |
|---|---|---|
| `.btn--primary` | Una por sección: la acción principal | Fondo naranja, texto grafito |
| `.btn--outline` | Segunda acción sobre fondo claro | Borde y texto `--forja-tinta` |
| `.btn--ghost` | Segunda acción sobre fondo oscuro | Borde blanco al 45 % |
| `.link-arrow` | Acción dentro de una lista o columna | Texto subrayado con flecha → |

Alto mínimo de 48 px (44 px en `--sm`). Se reduce al presionarlos (`scale(0.97)`), con `cursor: pointer` y transiciones de 150–220 ms. Los textos dicen qué pasa al tocarlos: "Cotizar mi página" en lugar de "Clic aquí". Si un botón se repite, su `aria-label` incluye el texto visible.

## 7. Componentes
- **Ficha técnica (`.specs`):** filas con una línea entre cada una (etiqueta a la izquierda, dato a la derecha). Para precio y tiempo.
- **Tira de piezas (`.reel`):** piezas reales en fila, que se desliza con el dedo y se puede recorrer con el teclado.
- **Libro de cuentas (`.ledger`):** dos columnas separadas por una línea vertical, tablas y listas con líneas.
- **Dispositivos (`.laptop`, `.phone`):** sin sombra, solo un borde de 1 px.
- **Menú:** translúcido. La sección que se está viendo queda marcada (`aria-current`).

## 8. Movimiento
- Curva `--ease` (cubic-bezier 0.23, 1, 0.32, 1). Duraciones de 150, 220 y 300 ms.
- La aparición al desplazarse solo usa CSS (`animation-timeline: view()`) y solo cuando `prefers-reduced-motion: no-preference`. El héroe nunca tiene animación de entrada.
- Sin animaciones infinitas, sin parallax y sin bloquear el desplazamiento.

## 9. Lista antes de entregar
- [ ] Ninguna sección repite la composición de otra.
- [ ] Sin emojis como íconos (SVG propios).
- [ ] Contraste ≥ 4,5:1 y foco visible con teclado.
- [ ] `prefers-reduced-motion` respetado.
- [ ] Probado en 320, 375, 768, 1024 y 1440 px, sin desplazamiento horizontal.
- [ ] axe sin violaciones y Lighthouse ≥ 95 en celular.
- [ ] Cada ejemplo marcado como ilustrativo y ningún dato inventado.
- [ ] `npm test` en verde.
