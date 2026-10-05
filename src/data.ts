// Contenido del sitio. Edita textos y precios aquí.

// Imágenes (se importan para que Vite las optimice y les ponga hash)
const imgs = import.meta.glob('./assets/portfolio/*.webp', { eager: true, import: 'default' }) as Record<string, string>;
const kitImgs = import.meta.glob('./assets/kits/*.webp', { eager: true, import: 'default' }) as Record<string, string>;
export const img = (name: string) => imgs[`./assets/portfolio/${name}.webp`];
export const kitImg = (name: string) => kitImgs[`./assets/kits/${name}.webp`];

export type Niche = 'belleza' | 'restaurante' | 'inmobiliaria' | 'emprendedores';

// ===== Trabajos =====
// Cada tipo de negocio tiene un caso (reto + qué se hizo) y sus piezas.
// Hoy son proyectos demostrativos. Con clientes reales: demo: false y un resultado verdadero en `result`.
export type Piece = { file: string; title: string; tall?: boolean };
export type Work = {
  id: Niche;
  label: string;
  title: string;
  demo: boolean;
  challenge: string;
  solution: string;
  result?: string;
  deliverables: string[];
  pieces: Piece[];
};

export const WORKS: Work[] = [
  {
    id: 'belleza',
    label: 'Salón de belleza',
    title: 'Un salón que dejó de responder precios uno por uno',
    demo: true,
    challenge: 'Publicaba sin un estilo definido y cada clienta preguntaba los precios por chat.',
    solution: 'Definimos colores y tipografías propias, una lista de precios para historias y una tarjeta de fidelidad digital.',
    deliverables: ['6 posts', '4 historias', 'Lista de precios', 'Tarjeta de fidelidad'],
    pieces: [
      { file: 'belleza-promo', title: 'Post de promoción' },
      { file: 'belleza-precios', title: 'Lista de precios en historia', tall: true },
      { file: 'belleza-fidelidad', title: 'Tarjeta de fidelidad', tall: true },
      { file: 'belleza-tips', title: 'Post de consejos' },
    ],
  },
  {
    id: 'restaurante',
    label: 'Restaurante',
    title: 'Un menú del día que se actualiza en dos minutos',
    demo: true,
    challenge: 'Enviaba el menú como foto de un cuaderno y no tenía forma de premiar a los clientes frecuentes.',
    solution: 'Un menú editable para cada día, promociones semanales y una tarjeta de sellos.',
    deliverables: ['Menú diario', 'Post 2x1', 'Tarjeta de sellos', 'Datos de contacto y domicilios'],
    pieces: [
      { file: 'restaurante-menu', title: 'Menú en historia', tall: true },
      { file: 'restaurante-promo', title: 'Promoción 2x1' },
      { file: 'restaurante-contacto', title: 'Post de contacto' },
      { file: 'restaurante-sellos', title: 'Tarjeta de sellos', tall: true },
    ],
  },
  {
    id: 'inmobiliaria',
    label: 'Inmobiliaria',
    title: 'Inmuebles y servicios con un formato que se reconoce',
    demo: true,
    challenge: 'Cada inmueble se publicaba distinto y los servicios no estaban explicados en ningún lado.',
    solution: 'Una lista de servicios con tarifas, posts educativos para compradores y un formato fijo para contacto.',
    deliverables: ['Lista de servicios', 'Posts educativos', 'Promoción', 'Post de contacto'],
    pieces: [
      { file: 'inmobiliaria-servicios', title: 'Lista de servicios', tall: true },
      { file: 'inmobiliaria-tips', title: 'Post para compradores' },
      { file: 'inmobiliaria-promo', title: 'Post de oportunidad' },
      { file: 'inmobiliaria-contacto', title: 'Post de contacto' },
    ],
  },
  {
    id: 'emprendedores',
    label: 'Tienda online',
    title: 'Un catálogo que se vende solo por historias',
    demo: true,
    challenge: 'Una marca de velas artesanales que mostraba sus productos sin precios ni orden.',
    solution: 'Catálogo con precios en historia, una encuesta para conocer preferencias y posts que cuentan la marca.',
    deliverables: ['Catálogo', 'Encuesta en historia', 'Post de descuento', 'Post de marca'],
    pieces: [
      { file: 'emprendedores-catalogo', title: 'Catálogo en historia', tall: true },
      { file: 'emprendedores-promo', title: 'Post de descuento' },
      { file: 'emprendedores-tips', title: 'Post de marca' },
      { file: 'emprendedores-encuesta', title: 'Encuesta en historia', tall: true },
    ],
  },
];

// ===== Servicios =====
export const SERVICES = [
  {
    title: 'Diseño para redes',
    text: 'Posts, historias, menús, listas de precios y tarjetas de fidelidad con tus colores, editables en Canva.',
    includes: ['Identidad visual', 'Textos con tu forma de hablar', 'Archivos listos para publicar'],
  },
  {
    title: 'Páginas web',
    text: 'Desde una página para recibir clientes hasta un catálogo con pedidos por WhatsApp. Rápidas y pensadas para celular.',
    includes: ['Diseño a la medida', 'Lista para Google', 'Dominio a tu nombre'],
  },
  {
    title: 'Bases de datos',
    text: 'Clientes, pedidos e inventario en un solo lugar, para dejar el cuaderno y los mil chats.',
    includes: ['Registro de clientes y pedidos', 'Inventario', 'Reportes simples'],
  },
  {
    title: 'Seguridad y soporte',
    text: 'Tu sitio y tus datos protegidos, con alguien que responde cuando necesitas un cambio.',
    includes: ['HTTPS', 'Copias de seguridad', 'Accesos por roles'],
  },
];

// ===== Comparación =====
export const COMPARISON = [
  { topic: 'Diseño', ai: 'Las mismas plantillas que puede usar cualquier negocio', us: 'Pensado para tu cliente y tu tipo de negocio' },
  { topic: 'Textos', ai: 'Genéricos, no suenan a ti', us: 'Con tu forma de hablar y de vender' },
  { topic: 'Coherencia', ai: 'Redes, web y datos por separado', us: 'Una sola identidad en todo' },
  { topic: 'Cuando algo falla', ai: 'Lo resuelves tú solo', us: 'Una persona real por WhatsApp' },
];

// ===== Proceso =====
export const PROCESS = [
  { title: 'Hablamos', text: 'Por WhatsApp o videollamada, para entender tu negocio y lo que necesitas.' },
  { title: 'Te proponemos', text: 'Alcance, tiempos y precio por escrito. Sin letra pequeña.' },
  { title: 'Construimos', text: 'Te mostramos avances y aplicamos tus comentarios en cada ronda.' },
  { title: 'Lanzamos', text: 'Publicamos, te enseñamos a usarlo y seguimos disponibles para soporte.' },
];

// ===== Planes =====
export const PLANS = [
  {
    name: 'Landing',
    price: '$400.000',
    time: 'Lista en 1 a 2 semanas',
    desc: 'Una página para presentar tu negocio y recibir clientes.',
    features: ['Una página con secciones', 'Botón y formulario a WhatsApp', 'Adaptada a celular', '1 ronda de cambios'],
  },
  {
    name: 'Web de negocio',
    price: '$700.000',
    time: 'Lista en 2 a 4 semanas',
    desc: 'Tu sitio completo para generar confianza, preparado para que Google lo lea bien.',
    features: ['3 a 5 secciones', 'Mapa y datos de contacto', 'SEO básico', '2 rondas de cambios'],
    featured: true,
  },
  {
    name: 'Catálogo',
    price: '$1.000.000',
    time: 'El tiempo depende del tamaño del catálogo',
    desc: 'Tus productos en línea y los pedidos directo a tu WhatsApp.',
    features: ['Catálogo de productos', 'Pedido por WhatsApp', 'Base de datos de productos', 'Panel para cambiar precios'],
  },
  {
    name: 'Acompañamiento',
    price: '$60.000',
    period: 'al mes',
    time: 'Empieza cuando tu web esté publicada',
    desc: 'Para que tu web siga funcionando, segura y al día.',
    features: ['Cambios de contenido', 'Copias de seguridad', 'Revisión de seguridad', 'Soporte por WhatsApp'],
  },
];

// ===== Plantillas =====
/** Precio de referencia de cada kit (aprobado por Juanes el 4 oct 2026). */
export const KIT_PRICE = 'Desde $50.000';

export const KITS = [
  { id: 'belleza', title: 'Kit para salones de belleza', text: 'Uñas, pestañas, cejas y spa.' },
  { id: 'restaurante', title: 'Kit para restaurantes', text: 'Menú, promociones y tarjeta de sellos.' },
  { id: 'inmobiliaria', title: 'Kit para inmobiliarias', text: 'Fichas de inmuebles y servicios.' },
  { id: 'emprendedores', title: 'Kit para emprendedores', text: 'Catálogo, lanzamientos y descuentos.' },
];

// ===== Preguntas frecuentes =====
export const FAQ = [
  {
    q: '¿Usan inteligencia artificial?',
    a: 'Sí, como herramienta, igual que usamos Canva o un editor de código. Pero cada diseño, texto y línea de código lo pensamos, revisamos y ajustamos nosotros para tu negocio.',
  },
  {
    q: '¿Cuánto se demora una página web?',
    a: 'Una landing suele estar lista en 1 a 2 semanas y una web de negocio en 2 a 4 semanas. Depende de qué tan rápido tengamos tus textos, fotos y comentarios.',
  },
  {
    q: '¿Qué necesito para empezar?',
    a: 'Si tienes logo, fotos y textos, perfecto. Si no, los construimos contigo desde cero.',
  },
  {
    q: '¿El dominio y el hosting están incluidos?',
    a: 'Se pagan aparte y quedan a tu nombre, para que siempre sean tuyos. Te ayudamos a elegir la opción más económica y segura.',
  },
  {
    q: '¿Cómo protegen mi página y mis datos?',
    a: 'Con HTTPS, cabeceras de seguridad, copias de seguridad, contraseñas fuertes y accesos por roles. No compartimos tus datos ni los de tus clientes.',
  },
  {
    q: '¿Cómo funcionan las plantillas de Canva?',
    a: 'Te enviamos un enlace que crea una copia editable en tu cuenta de Canva (sirve la gratuita). Cambias textos, colores y fotos, y publicas.',
  },
];

// ===== Opiniones =====
// Solo opiniones REALES de clientes, con su permiso. Mientras esté vacío se muestra una invitación.
export const REVIEWS: { name: string; business: string; text: string; rating: 1 | 2 | 3 | 4 | 5 }[] = [];

// ===== Equipo =====
// Para poner tu foto: guarda una imagen cuadrada en src/assets/equipo/juanes.webp (o .jpg).
// Mientras no exista, se muestran tus iniciales.
const teamImgs = import.meta.glob('./assets/equipo/*.{webp,jpg,jpeg,png}', { eager: true, import: 'default' }) as Record<string, string>;
export const teamImg = (name?: string) =>
  name ? Object.entries(teamImgs).find(([k]) => k.includes(`/${name}.`))?.[1] : undefined;

export const TEAM = [
  {
    name: 'Juan Esteban Niño',
    role: 'Diseño y desarrollo',
    bio: 'Estudio Ingeniería de Sistemas y trabajo en desarrollo web, bases de datos y documentación de procesos. Atiendo cada proyecto de principio a fin: el que te responde es el mismo que lo construye.',
    initials: 'JN',
    photo: 'juanes',
  },
];
