# Priorización

Fórmula: **impacto potencial (1–5) × confianza (0–1) ÷ esfuerzo (1–5)**. Cuando hay poca evidencia, se reduce la confianza.
"Dependencia" indica quién tiene que actuar.

| # | Acción | Impacto | Confianza | Esfuerzo | Puntaje | Riesgo | Dependencia | Alineación |
|---|---|---|---|---|---|---|---|---|
| 1 | Activar Google Analytics 4 (variable `VITE_GA_ID` en Vercel) | 4 | 0,9 | 1 | **3,6** | Bajo | Juanes | Sin datos no se puede validar nada |
| 2 | Instrumentar el embudo del simulador | 3 | 0,8 | 1 | **2,4** | Bajo | ✔ Hecho | Mide la hipótesis principal |
| 3 | Confirmar promesas (24 horas, tiempos de entrega) | 3 | 0,7 | 1 | **2,1** | Medio: una promesa incumplida destruye confianza | Juanes | Confianza |
| 4 | Corregir textos sin evidencia | 2 | 0,9 | 1 | **1,8** | Bajo | ✔ Hecho | Veracidad |
| 5 | Foto real + primeras 3 opiniones reales | 5 | 0,7 | 2 | **1,75** | Bajo | Juanes y clientes | Cierra la brecha principal |
| 6 | Dominio propio | 3 | 0,6 | 1 | **1,8** | Bajo | Juanes (costo anual) | Confianza |
| 7 | Precio de los kits | 3 | 0,6 | 1 | **1,8** | Bajo | Juanes | Conversión de la tienda |
| 8 | Perfil de Google Business con reseñas | 4 | 0,6 | 2 | **1,2** | Bajo | Juanes | Confianza + búsquedas locales |
| 9 | Post descargable desde el simulador | 2 | 0,3 | 3 | 0,2 | Bajo | — | Crecimiento (especulativo) |
| 10 | Cambiar el botón flotante verde | 1 | 0,2 | 1 | 0,2 | Bajo | — | Sin evidencia de que sea un problema |

**Decisión de esta iteración:**
- Ejecutar 2 y 4 (autónomas y reversibles).
- Pedir aprobación o datos a Juanes para 1, 3, 5, 6 y 7.
- No hacer 9 ni 10 hasta tener evidencia (no sobreingeniería).
