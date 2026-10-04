// Datos del negocio: cambia aquí y se actualiza todo el sitio.
export const BRAND = {
  name: 'Forja Digital',
  tagline: 'La IA genera. Nosotros construimos.',
  siteUrl: 'https://forja-digital-mlid.vercel.app',
  whatsappNumber: '573133818294', // formato internacional, sin + ni espacios
  whatsappDisplay: '313 381 8294',
  responseTime: '24 horas', // promesa de tiempo de respuesta
  facebook: 'https://www.facebook.com/', // reemplaza con el enlace de tu página
  instagram: 'https://www.instagram.com/', // reemplaza con tu perfil
  city: 'Colombia',
  serviceArea: 'Atendemos negocios en toda Colombia de forma remota, por WhatsApp y videollamada.',
  /**
   * Mapa (opcional). En Google Maps busca tu ciudad u oficina → Compartir → Insertar un mapa →
   * copia SOLO la URL que está dentro de src="...". Vacío = no se muestra el mapa.
   */
  mapEmbedUrl: '',
  address: '', // ej. 'Calle 00 #00-00, Bogotá'. Vacío = no se muestra.
  hours: 'Lunes a sábado · 8:00 a.m. – 7:00 p.m.',
  legalOwner: 'Juan Esteban Niño Naranjo', // responsable del tratamiento de datos (política de privacidad)
  email: '', // correo para temas de datos personales (opcional)
};

/** ID de Google Analytics 4 (G-XXXXXXX). Se configura en Vercel como variable de entorno VITE_GA_ID. */
export const GA_ID = import.meta.env.VITE_GA_ID as string | undefined;

/** Arma un enlace de WhatsApp con un mensaje ya escrito. */
export function waLink(message = `Hola ${BRAND.name}, quiero cotizar`) {
  return `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
