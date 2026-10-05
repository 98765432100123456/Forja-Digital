# Analítica

**Estado: activada el 4 de octubre de 2026 (ID `G-XKHGRSYFDP`, en `src/config.ts`); todavía sin datos.** Desde el 4 de octubre de 2026, GA4 solo se carga si el visitante acepta las cookies (D12): las cifras representarán a quienes aceptan, no a todos los visitantes.

 Google Analytics 4 está instalado en el código, pero se activa solo cuando existe la variable
`VITE_GA_ID` en Vercel, y hoy no existe. El 4 de octubre de 2026 se verificó que los eventos se envían correctamente usando un
ID de prueba.

## Diccionario de eventos

| Evento | Cuándo se dispara | Parámetros | Para qué sirve |
|---|---|---|---|
| `page_view` | Automático de GA4 | — | Tráfico por página |
| `generate_lead` | Clic en cualquier enlace a WhatsApp o envío del formulario | `method` (whatsapp / formulario), `label` (texto del botón) | **Conversión principal** |
| `sim_start` | Primera interacción con el simulador | `control` (tipo / nombre / color) | Inicio del embudo del simulador |
| `sim_name` | El visitante escribe el nombre de su negocio | — | Compromiso con el simulador |
| `sim_cta` | Clic en "Cotizar con este estilo" | `tipo`, `color`, `con_nombre` | Fin del embudo del simulador |
| `exception` | Error de JavaScript en el navegador, o fallo que muestra la pantalla de salida | `description` (máx. 100 caracteres), `fatal` | Detectar errores reales (sec. 73) |

## Métricas de decisión

| Métrica | Fórmula | Decide sobre |
|---|---|---|
| Tasa de contacto | `generate_lead` / sesiones | Salud general de la conversión |
| Embudo del simulador | `sim_start` → `sim_name` → `sim_cta` | Si el simulador sirve (E1) |
| Contactos por origen | `generate_lead` según la etiqueta del botón | Qué CTA funciona (E2) |
| Canal de llegada | Fuente/medio de GA4 | Validar la hipótesis "llegan desde Facebook" |

## Para activarla
1. Crea una propiedad GA4 en https://analytics.google.com y copia el ID `G-XXXXXXX`.
2. En Vercel ve a **Settings → Environment Variables**, agrega `VITE_GA_ID` con ese ID y vuelve a desplegar.
3. En GA4, marca `generate_lead` como evento clave (conversión).

La política de privacidad del sitio ya menciona el uso de Google Analytics.

## Preparación para medir (sec. 73)

| Área | Estado |
|---|---|
| Adquisición | Preparada (fuente/medio de GA4); sin datos |
| Activación / conversión | Preparada (`generate_lead`, embudo del simulador); sin datos |
| Engagement | Preparada (page_view, scroll mejorado de GA4) |
| Retención | No aplica a una landing; se mide fuera del sitio (clientes que renuevan el acompañamiento) |
| Errores | Preparada (`exception`); sin datos |
| Rendimiento de campo | No preparada a propósito: con poco tráfico no habría muestra suficiente. Se activa con Vercel Speed Insights cuando haya visitas |
| Eventos de seguridad | No aplica: no hay inicio de sesión ni API que registrar |

**Línea base:** no disponible aún. Ningún experimento (E1–E3) puede empezar sin al menos 2 semanas de datos con GA4.
