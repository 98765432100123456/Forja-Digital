// Una página por servicio (video de @luisalvarezweb, "20 cosas que reviso cuando una web no trae clientes", punto 4).
// Todo el contenido sale de datos ya aprobados por Juanes (planes, precios, preguntas frecuentes y términos).
// Regla: no se inventan precios. Donde no hay un precio aprobado, se dice que se cotiza.
import { APP_OFFERS, FAQ, KIT_PRICE, PLANS } from './data';

export type ServiceId = 'paginas-web' | 'diseno-para-redes' | 'bases-de-datos' | 'seguridad-y-soporte';

export interface ServicePage {
  id: ServiceId;
  path: string;
  /** Nombre corto para el menú, las migas de pan y el pie. */
  name: string;
  title: string;
  lead: string;
  specs: { k: string; v: string }[];
  cta: { label: string; message: string };
  includes: { t: string; d: string }[];
  /** Muestra visual: qué ejemplo ilustrativo se enseña. */
  sample: 'laptop' | 'piezas' | 'tabla' | 'sitio';
  sampleTitle: string;
  sampleText: string;
  faq: { q: string; a: string }[];
  related: { label: string; href: string }[];
}

const faq = (q: string) => {
  const f = FAQ.find((x) => x.q === q);
  if (!f) throw new Error(`Pregunta no encontrada: ${q}`);
  return f;
};

export const SERVICE_PAGES: ServicePage[] = [
  {
    id: 'paginas-web',
    path: '/paginas-web',
    name: 'Páginas web',
    title: 'Páginas web para negocios en Bogotá',
    lead: 'Una página que presenta tu negocio, muestra tus precios y te trae contactos por WhatsApp. Rápida, pensada primero para celular y lista para que Google la entienda.',
    specs: [
      { k: 'Desde', v: `${PLANS[0].price}¹` },
      { k: 'Tiempo', v: '1 a 2 semanas (landing) o 2 a 4 (web de negocio)' },
      { k: 'Planes', v: 'Landing, web de negocio y catálogo' },
    ],
    cta: { label: 'Cotizar mi página', message: 'quiero cotizar una página web' },
    includes: [
      { t: 'Diseño a la medida', d: 'Pensado para tu cliente y tu tipo de negocio, no una plantilla que usa cualquiera.' },
      { t: 'Pensada para celular', d: 'Probada en celular, tableta y computador antes de entregarla.' },
      { t: 'Contacto directo', d: 'Botón y formulario que abren WhatsApp con el mensaje listo.' },
      { t: 'Lista para Google', d: 'Título y descripción por página, datos de tu negocio y mapa del sitio.' },
      { t: 'Segura', d: 'Conexión cifrada (HTTPS) y cabeceras de seguridad.' },
      { t: 'Tuya', d: 'El dominio y el hosting se pagan aparte y quedan a tu nombre.' },
    ],
    sample: 'laptop',
    sampleTitle: 'Así se ve una página hecha para vender',
    sampleText: 'Qué haces, cuánto cuesta y cómo escribirte, en la primera pantalla.',
    faq: [
      faq('¿Cuánto se demora una página web?'),
      faq('¿Qué necesito para empezar?'),
      faq('¿El dominio y el hosting están incluidos?'),
      { q: '¿Puedo pedir cambios?', a: 'Sí. La landing incluye 1 ronda de cambios y la web de negocio 2. Después de publicada, los cambios entran en el acompañamiento mensual o se cotizan aparte.' },
    ],
    related: [
      { label: 'Ver los planes y precios', href: '/#planes' },
      { label: 'Seguridad y soporte mensual', href: '/seguridad-y-soporte' },
    ],
  },
  {
    id: 'diseno-para-redes',
    path: '/diseno-para-redes',
    name: 'Diseño para redes',
    title: 'Diseño para redes sociales y plantillas de Canva',
    lead: 'Posts, historias, menús, listas de precios y tarjetas de fidelidad con tus colores y tu forma de hablar, editables en Canva.',
    specs: [
      { k: 'Kits de plantillas', v: `${KIT_PRICE.toLowerCase()}¹` },
      { k: 'A la medida', v: 'Se cotiza según la cantidad de piezas' },
      { k: 'Formato', v: 'Editable en Canva (sirve la cuenta gratuita)' },
    ],
    cta: { label: 'Cotizar mi diseño', message: 'quiero cotizar diseño para redes' },
    includes: [
      { t: 'Identidad visual', d: 'Colores y tipografías propias para que tus publicaciones se reconozcan.' },
      { t: 'Textos con tu forma de hablar', d: 'Escritos para tu cliente, no frases genéricas.' },
      { t: 'Listo para publicar', d: 'Tamaños para posts e historias, con los archivos listos para subir.' },
      { t: 'Editable', d: 'Te queda la copia en tu cuenta de Canva para cambiar textos, fotos y precios.' },
    ],
    sample: 'piezas',
    sampleTitle: 'Piezas de muestra',
    sampleText: 'Proyectos demostrativos para cuatro tipos de negocio. No son trabajos de clientes reales.',
    faq: [
      faq('¿Cómo funcionan las plantillas de Canva?'),
      { q: '¿Qué diferencia hay entre un kit y un diseño a la medida?', a: 'El kit trae 10 diseños listos para tu tipo de negocio (6 posts y 4 historias) que tú editas. En el diseño a la medida creamos las piezas con tu identidad y tus textos.' },
      faq('¿Usan inteligencia artificial?'),
    ],
    related: [
      { label: 'Ver los kits de plantillas', href: '/plantillas-canva' },
      { label: 'Ver trabajos de muestra', href: '/#trabajos' },
    ],
  },
  {
    id: 'bases-de-datos',
    path: '/bases-de-datos',
    name: 'Bases de datos',
    title: 'Bases de datos para negocios: clientes, pedidos e inventario',
    lead: 'Clientes, pedidos e inventario en un solo lugar, para dejar el cuaderno y los mil chats y saber qué vendes sin hacer cuentas a mano.',
    specs: [
      { k: 'Precio', v: 'Se cotiza según lo que necesites' },
      { k: 'Si la usa tu equipo', v: `Micro app, desde ${APP_OFFERS[0].price}¹` },
      { k: 'Los datos', v: 'Son tuyos y se pueden exportar' },
    ],
    cta: { label: 'Cotizar mi base de datos', message: 'quiero cotizar una base de datos' },
    includes: [
      { t: 'Registro de clientes y pedidos', d: 'Quién compró, qué, cuándo y si ya pagó.' },
      { t: 'Inventario', d: 'Qué tienes, qué se está acabando y qué se vende más.' },
      { t: 'Reportes simples', d: 'Ventas del día, de la semana y del mes sin sumar a mano.' },
      { t: 'Cada quien ve lo suyo', d: 'Accesos por roles: tu equipo entra solo a lo que necesita.' },
      { t: 'Copias de seguridad', d: 'Automáticas, para no perder la información.' },
      { t: 'Rápida aunque crezca', d: 'Índices en la base de datos para que siga rápida con miles de registros.' },
    ],
    sample: 'tabla',
    sampleTitle: 'Tus pedidos, claros',
    sampleText: 'Ejemplo ilustrativo con datos de muestra.',
    faq: [
      { q: '¿Base de datos o micro app?', a: `Si solo necesitas ordenar tu información, una base de datos basta. Si tus clientes o tu equipo la van a usar desde el celular (por ejemplo, para pedir o agendar), es una micro app, desde ${APP_OFFERS[0].price}.` },
      { q: '¿De quién son los datos?', a: 'Tuyos. Las cuentas quedan a tu nombre y puedes exportar la información cuando quieras. Nosotros solo la usamos para construir y mantener el sistema.' },
      faq('¿Cómo protegen mi página y mis datos?'),
    ],
    related: [
      { label: 'Ver apps y micro apps', href: '/apps' },
      { label: 'Seguridad y soporte mensual', href: '/seguridad-y-soporte' },
    ],
  },
  {
    id: 'seguridad-y-soporte',
    path: '/seguridad-y-soporte',
    name: 'Seguridad y soporte',
    title: 'Seguridad y soporte mensual para tu página',
    lead: 'Tu página sigue funcionando, segura y al día, con alguien que responde por WhatsApp cuando necesitas un cambio.',
    specs: [
      { k: 'Desde', v: `${PLANS[3].price} al mes¹` },
      { k: 'Empieza', v: 'Cuando tu web esté publicada' },
      { k: 'Soporte', v: 'Por WhatsApp, lunes a sábado' },
    ],
    cta: { label: 'Cotizar el acompañamiento', message: 'quiero cotizar el acompañamiento mensual' },
    includes: [
      { t: 'Cambios de contenido', d: 'Textos, precios, fotos y horarios al día.' },
      { t: 'Copias de seguridad', d: 'Para volver atrás si algo sale mal.' },
      { t: 'Revisión de seguridad', d: 'Conexión cifrada (HTTPS), cabeceras de seguridad y accesos por roles.' },
      { t: 'Soporte por WhatsApp', d: 'Hablas con la misma persona que hizo tu página.' },
    ],
    sample: 'sitio',
    sampleTitle: 'Así cuidamos este mismo sitio',
    sampleText: 'Lo que hacemos con nuestra página, verificable por cualquiera.',
    faq: [
      faq('¿Cómo protegen mi página y mis datos?'),
      { q: '¿Cómo pido un cambio?', a: 'Por WhatsApp, de lunes a sábado de 8:00 a.m. a 7:00 p.m. Nos dices qué cambiar y te avisamos cuando esté publicado.' },
      { q: '¿Puedo cancelar?', a: 'Sí. Las condiciones están en la política de cancelaciones y reembolsos.' },
    ],
    related: [
      { label: 'Cancelaciones y reembolsos', href: '/reembolsos' },
      { label: 'Páginas web', href: '/paginas-web' },
    ],
  },
];

export const servicePage = (id: ServiceId) => SERVICE_PAGES.find((s) => s.id === id)!;
