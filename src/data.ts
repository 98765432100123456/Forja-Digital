// Contenido del sitio. Edita textos y precios aquí.

// Imágenes del portafolio (se importan para que Vite las optimice y les ponga hash)
const imgs = import.meta.glob('./assets/portfolio/*.webp', { eager: true, import: 'default' }) as Record<string, string>;
const kitImgs = import.meta.glob('./assets/kits/*.webp', { eager: true, import: 'default' }) as Record<string, string>;
export const img = (name: string) => imgs[`./assets/portfolio/${name}.webp`];
export const kitImg = (name: string) => kitImgs[`./assets/kits/${name}.webp`];

export type Niche = 'belleza' | 'restaurante' | 'inmobiliaria' | 'emprendedores';

export const NICHES: { id: Niche | 'todos'; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'belleza', label: 'Belleza' },
  { id: 'restaurante', label: 'Restaurantes' },
  { id: 'inmobiliaria', label: 'Inmobiliarias' },
  { id: 'emprendedores', label: 'Emprendedores' },
];

export const PORTFOLIO: { file: string; niche: Niche; title: string; tall?: boolean }[] = [
  { file: 'belleza-promo', niche: 'belleza', title: 'Post de promoción · Salón de belleza' },
  { file: 'restaurante-menu', niche: 'restaurante', title: 'Historia de menú · Restaurante', tall: true },
  { file: 'emprendedores-promo', niche: 'emprendedores', title: 'Post de descuento · Tienda online' },
  { file: 'inmobiliaria-tips', niche: 'inmobiliaria', title: 'Post educativo · Inmobiliaria' },
  { file: 'belleza-fidelidad', niche: 'belleza', title: 'Tarjeta de fidelidad · Salón de belleza', tall: true },
  { file: 'restaurante-promo', niche: 'restaurante', title: 'Post 2x1 · Restaurante' },
  { file: 'emprendedores-catalogo', niche: 'emprendedores', title: 'Catálogo en historia · Tienda online', tall: true },
  { file: 'inmobiliaria-promo', niche: 'inmobiliaria', title: 'Post de oportunidad · Inmobiliaria' },
  { file: 'belleza-tips', niche: 'belleza', title: 'Post de tips · Salón de belleza' },
  { file: 'restaurante-sellos', niche: 'restaurante', title: 'Tarjeta de sellos · Restaurante', tall: true },
  { file: 'emprendedores-tips', niche: 'emprendedores', title: 'Post de marca · Tienda online' },
  { file: 'inmobiliaria-servicios', niche: 'inmobiliaria', title: 'Lista de servicios · Inmobiliaria', tall: true },
  { file: 'restaurante-contacto', niche: 'restaurante', title: 'Post de contacto · Restaurante' },
  { file: 'belleza-precios', niche: 'belleza', title: 'Lista de precios · Salón de belleza', tall: true },
  { file: 'inmobiliaria-contacto', niche: 'inmobiliaria', title: 'Post de contacto · Inmobiliaria' },
  { file: 'emprendedores-encuesta', niche: 'emprendedores', title: 'Historia interactiva · Tienda online', tall: true },
];

export const SERVICES = [
  {
    icon: 'palette',
    title: 'Diseño y plantillas',
    text: 'Kits para redes con tu identidad: posts, historias, menús, listas de precios y tarjetas de fidelidad, editables en Canva.',
    points: ['Tus colores y tipografías', 'Textos con tu forma de hablar', 'Listos para publicar'],
  },
  {
    icon: 'code',
    title: 'Páginas web',
    text: 'Landing pages, webs de negocio y catálogos con pedidos por WhatsApp. Rápidas, adaptadas a celular y fáciles de encontrar en Google.',
    points: ['Diseño a la medida', 'Optimizadas para celular', 'SEO básico incluido'],
  },
  {
    icon: 'database',
    title: 'Bases de datos',
    text: 'Organizamos tus clientes, pedidos e inventario en un solo lugar, para que dejes de depender del cuaderno o de mil chats.',
    points: ['Clientes y pedidos', 'Inventario y reportes', 'Conectado a tu web'],
  },
  {
    icon: 'shield',
    title: 'Seguridad y soporte',
    text: 'Tu sitio y tus datos protegidos con buenas prácticas, y una persona real que te responde cuando algo cambia.',
    points: ['HTTPS / SSL', 'Copias de seguridad', 'Accesos por roles'],
  },
] as const;

export const VS = {
  ai: ['Plantillas que usa todo el mundo', 'Textos genéricos que no suenan a ti', 'Diseño, web y redes sin conexión entre sí', 'Si algo falla, nadie te responde'],
  us: ['Diseño pensado para tu cliente', 'Textos con tu voz y tu forma de vender', 'Redes, web y datos con una sola identidad', 'Una persona real por WhatsApp, antes y después'],
};

export const PROCESS = [
  { n: '01', title: 'Te escuchamos', text: 'Una conversación por WhatsApp o llamada para entender tu negocio, tu cliente y lo que necesitas.' },
  { n: '02', title: 'Proponemos', text: 'Te enviamos una propuesta clara con alcance, tiempos y precio. Sin letra pequeña.' },
  { n: '03', title: 'Construimos', text: 'Diseñamos y desarrollamos mostrándote avances. Tus comentarios se aplican en cada ronda.' },
  { n: '04', title: 'Lanzamos y acompañamos', text: 'Publicamos, te enseñamos a usarlo y seguimos disponibles para soporte.' },
];

export const PLANS = [
  {
    name: 'Landing',
    price: 'desde $400.000',
    desc: 'Una página para presentar tu negocio y recibir clientes.',
    features: ['1 página con secciones', 'Botón y formulario a WhatsApp', 'Adaptada a celular', '1 ronda de cambios'],
  },
  {
    name: 'Web de negocio',
    price: 'desde $700.000',
    desc: 'Tu sitio completo para generar confianza y aparecer en Google.',
    features: ['3 a 5 secciones', 'Mapa y datos de contacto', 'SEO básico', '2 rondas de cambios'],
    featured: true,
  },
  {
    name: 'Catálogo',
    price: 'desde $1.000.000',
    desc: 'Muestra tus productos y recibe pedidos directo a tu WhatsApp.',
    features: ['Catálogo de productos', 'Pedido por WhatsApp', 'Base de datos de productos', 'Panel para actualizar precios'],
  },
  {
    name: 'Acompañamiento',
    price: 'desde $60.000/mes',
    desc: 'Para que tu web siga funcionando, segura y al día.',
    features: ['Cambios de contenido', 'Copias de seguridad', 'Revisión de seguridad', 'Soporte por WhatsApp'],
  },
];

export const KITS = [
  { id: 'belleza', title: 'Kit para salones de belleza', text: 'Uñas, pestañas, cejas y spa.' },
  { id: 'restaurante', title: 'Kit para restaurantes', text: 'Menús, promos y tarjeta de sellos.' },
  { id: 'inmobiliaria', title: 'Kit para inmobiliarias', text: 'Fichas de inmuebles y servicios.' },
  { id: 'emprendedores', title: 'Kit para emprendedores', text: 'Catálogo, lanzamientos y descuentos.' },
];

export const FAQ = [
  {
    q: '¿Ustedes usan inteligencia artificial?',
    a: 'Sí, como herramienta, igual que usamos Canva o un editor de código. Pero cada diseño, texto y línea de código lo pensamos, revisamos y ajustamos nosotros para tu negocio. La IA no conoce a tu cliente; nosotros sí nos tomamos el tiempo.',
  },
  {
    q: '¿Cuánto se demora una página web?',
    a: 'Una landing suele estar lista en 1 a 2 semanas y una web de negocio en 2 a 4 semanas, dependiendo de qué tan rápido tengamos tus textos, fotos y comentarios.',
  },
  {
    q: '¿Qué necesito para empezar?',
    a: 'Solo ganas. Si tienes logo, fotos y textos, perfecto; si no, te ayudamos a construirlos desde cero.',
  },
  {
    q: '¿El dominio y el hosting están incluidos?',
    a: 'Se pagan aparte, directamente a tu nombre, para que siempre sean tuyos. Te asesoramos para elegir la opción más económica y segura.',
  },
  {
    q: '¿Cómo protegen mi página y mis datos?',
    a: 'Usamos HTTPS, cabeceras de seguridad, copias de seguridad, contraseñas fuertes y accesos por roles. Nunca compartimos tus datos ni los de tus clientes.',
  },
  {
    q: '¿Cómo funcionan las plantillas de Canva?',
    a: 'Te enviamos un enlace que crea una copia editable en tu cuenta de Canva (sirve la gratuita). Cambias textos, colores y fotos, y publicas.',
  },
];

// ===== Casos de éxito =====
// Hoy son proyectos demostrativos (los kits). Cuando tengas clientes reales, agrégalos aquí con
// demo: false y un resultado verdadero (ej. "Pasó de 0 a 25 pedidos por WhatsApp al mes").
export const CASES: {
  title: string; niche: string; image: string; demo: boolean;
  challenge: string; solution: string; deliverables: string[]; result?: string;
}[] = [
  {
    title: 'Identidad para un salón de belleza', niche: 'Belleza', image: 'belleza-promo', demo: true,
    challenge: 'Un salón que publicaba sin un estilo definido y respondía precios uno por uno por chat.',
    solution: 'Paleta y tipografías propias, lista de precios en historia y tarjeta de fidelidad digital.',
    deliverables: ['6 posts', '4 historias', 'Lista de precios', 'Tarjeta de fidelidad'],
  },
  {
    title: 'Menú y promociones para restaurante', niche: 'Restaurantes', image: 'restaurante-menu', demo: true,
    challenge: 'Un restaurante de almuerzos que enviaba el menú como foto de un cuaderno.',
    solution: 'Menú editable cada día, promos semanales y tarjeta de sellos para clientes frecuentes.',
    deliverables: ['Menú diario', 'Post 2x1', 'Tarjeta de sellos', 'Historia para domicilios'],
  },
  {
    title: 'Fichas de inmuebles para inmobiliaria', niche: 'Inmobiliarias', image: 'inmobiliaria-servicios', demo: true,
    challenge: 'Una inmobiliaria pequeña sin un formato claro para publicar inmuebles y servicios.',
    solution: 'Ficha de inmueble con datos clave, lista de servicios y posts educativos para compradores.',
    deliverables: ['Ficha de inmueble', 'Lista de servicios', 'Posts educativos', 'Post de contacto'],
  },
];

// ===== Reseñas =====
// Solo reseñas REALES de clientes, con su permiso. Mientras esté vacío, la sección invita a dejar una.
export const REVIEWS: { name: string; business: string; text: string; rating: 1 | 2 | 3 | 4 | 5 }[] = [];

// ===== Equipo =====
// Para poner tu foto: guarda una imagen cuadrada en src/assets/equipo/juanes.webp (o .jpg)
// y cambia photo: 'juanes'. Mientras no exista, se muestran tus iniciales.
const teamImgs = import.meta.glob('./assets/equipo/*.{webp,jpg,jpeg,png}', { eager: true, import: 'default' }) as Record<string, string>;
export const teamImg = (name?: string) =>
  name ? Object.entries(teamImgs).find(([k]) => k.includes(`/${name}.`))?.[1] : undefined;

export const TEAM = [
  {
    name: 'Juan Esteban Niño',
    role: 'Fundador · Diseño y desarrollo',
    bio: 'Estudiante de Ingeniería de Sistemas con experiencia en desarrollo web, bases de datos y documentación de procesos. Atiendo cada proyecto de forma directa, de principio a fin.',
    initials: 'JN',
    photo: 'juanes',
  },
];
