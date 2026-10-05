# Apps y micro apps: oferta y lista de requisitos

Oferta aprobada por Juanes el 4 de octubre de 2026:
- **Micro app:** desde $800.000, de 2 a 4 semanas.
- **App:** desde $2.500.000, de 6 a 10 semanas.
- **Formato:** app web instalable (PWA) por defecto; publicar en tiendas se cotiza aparte.

Página: `/apps`. Es una página por intención de búsqueda, igual que `/plantillas-canva`.

**Estado del negocio:** 0 apps entregadas. Precios y tiempos son decisiones del dueño, **no validadas con el mercado**.
**No se mostró ningún ejemplo como cliente real:** los ejemplos de la página son tipos de app, no casos.

## Por qué PWA primero (decisión D18)
- Funciona en Android y iPhone desde un enlace, sin cuentas de tienda ni revisiones. Las actualizaciones llegan al instante.
- Las tiendas suman costos y requisitos (abajo), que para un negocio pequeño que empieza pueden no compensar. **Hipótesis:**
  validar con los primeros clientes si piden estar en las tiendas.
- Apple rechaza apps que son "una página web empaquetada" (guía 4.2). Llevar una PWA a la App Store exige funciones
  propias de una app nativa, así que se cotiza aparte y con cuidado.

## Requisitos de las tiendas (verificados el 4 de octubre de 2026)
| Requisito | Fuente | Estado |
|---|---|---|
| Google Play, cuenta personal creada después del 13 nov 2023: prueba cerrada con **mínimo 12 testers durante 14 días seguidos** antes de producción | [Ayuda de Play Console](https://support.google.com/googleplay/android-developer/answer/14151465?hl=en-GB) | VERIFIED |
| Google Play: apps con cuentas deben permitir **borrar la cuenta dentro de la app y desde un enlace web**, declarado en el formulario de Seguridad de los datos | [Ayuda de Play Console](https://support.google.com/googleplay/android-developer/answer/13327111?hl=en-GB) | VERIFIED |
| Google Play: apps nuevas y actualizaciones deben apuntar a **Android 16 (API 36)** desde el 31 ago 2026 (prórroga posible hasta el 1 nov 2026) | [Android Developers](https://developer.android.com/google/play/requirements/target-sdk?hl=es) | VERIFIED |
| App Store 4.2: no se aceptan apps que sean solo un sitio web empaquetado | [App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) | VERIFIED |
| App Store 5.1.1(v): si hay cuentas, **borrar la cuenta dentro de la app** | Ídem | VERIFIED |
| App Store 5.1.1(i): política de privacidad enlazada en la ficha **y dentro de la app** | Ídem | VERIFIED |
| Costos: Apple ~US$99 al año; Google ~US$25 una sola vez | Fuentes secundarias (blogs de 2026) | INFERRED: confirmar al registrar la cuenta |

## Lista de requisitos de toda app o micro app (antes de entregar)
Adaptación de los checklists que ya se aplicaron al sitio (20 + 20 + 15 puntos) y de las secciones 31–72 del motor.

**Producto y UX**
- [ ] Una tarea principal clara; flujo principal en 3 toques o menos.
- [ ] Estados de vacío, carga, error y éxito en cada pantalla.
- [ ] Los errores dicen qué pasó y cómo arreglarlo.
- [ ] Diseño primero para celular (320–430 px) y probado en Android y iPhone reales.

**PWA (instalable)**
- [ ] `manifest.webmanifest` con nombre, ícono de 192 y 512 px, color del tema y `display: standalone`.
- [ ] Service worker con estrategia de caché explícita: qué funciona sin conexión y qué no.
- [ ] Ícono para iPhone (`apple-touch-icon`) y pantalla de inicio probada en Safari.

**Seguridad (no negociable)**
- [ ] Autenticación con un proveedor probado; nunca contraseñas propias en texto plano.
- [ ] Autorización en el servidor en cada operación: identidad → rol → recurso → cliente (tenant). Prueba "recurso A → recurso B": cambiar un ID no da acceso a datos ajenos.
- [ ] Si se usa Firebase o Supabase: reglas o políticas por fila revisadas; nunca `allow read, write: if true`.
- [ ] Consultas parametrizadas: sin concatenar texto del usuario en SQL; sin operadores de consulta sacados directamente del cliente (`$ne`, `$gt`) en NoSQL.
- [ ] Validación de entradas en el servidor (tipo, longitud, formato) y límites de tamaño en archivos subidos.
- [ ] Ninguna clave secreta en el código del celular; variables de entorno en el servidor; `.env` fuera de Git.
- [ ] Límite de intentos en inicio de sesión y recuperación de contraseña.
- [ ] Cabeceras de seguridad (CSP, HSTS…) y veto automático en el build, como en este sitio.
- [ ] Copias de seguridad automáticas **y una restauración probada**.
- [ ] Registro de acciones administrativas (quién, qué, cuándo).

**Privacidad y legal (Colombia)**
- [ ] El cliente es **responsable** de los datos de sus usuarios y Forja actúa como **encargado**: dejarlo por escrito en la propuesta.
- [ ] Política de privacidad del cliente según el Decreto 1074 de 2015, accesible dentro de la app.
- [ ] Autorización de tratamiento de datos al registrarse (casilla sin marcar por defecto).
- [ ] Borrar la cuenta y sus datos desde la app, más un enlace web si va a Google Play.
- [ ] Términos de uso de la app.
- [ ] Analítica solo con consentimiento.
- [ ] Imágenes y fuentes con licencia comercial; créditos cuando la licencia los exija.

**Calidad y lanzamiento**
- [ ] Accesibilidad: axe sin violaciones, contraste AA, teclado y lector de pantalla.
- [ ] Rendimiento en un celular de gama media con red lenta.
- [ ] Monitoreo de errores y aviso de caída.
- [ ] Datos de prueba borrados antes de entregar.
- [ ] Manual corto y sesión de entrega al cliente.
- [ ] Cuentas (servidor, dominio, tiendas) a nombre del cliente, con Forja como colaborador.

## Riesgos de este servicio
- **Seguridad:** un error de autorización expone datos de los clientes de nuestro cliente. Severidad CRÍTICA (sec. 93). Por eso la lista de seguridad no es opcional.
- **Alcance:** las apps crecen. Mitigación: propuesta escrita con alcance cerrado y cambios cotizados aparte.
- **Capacidad:** una sola persona. Una app de 6–10 semanas ocupa gran parte del tiempo disponible. Hipótesis a revisar con el primer proyecto real.
- **Tiendas:** la aprobación no depende de Forja; los términos lo dicen.
