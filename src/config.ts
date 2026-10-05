// Datos del negocio: cambia aquí y se actualiza todo el sitio.
export const BRAND = {
  name: 'Forja Digital',
  tagline: 'La IA genera. Nosotros construimos.',
  siteUrl: 'https://forja-digital-mlid.vercel.app',
  whatsappNumber: '573133818294', // formato internacional, sin + ni espacios
  whatsappDisplay: '313 381 8294',
  responseTime: '24 horas', // promesa de tiempo de respuesta
  facebook: '', // enlace de tu página de Facebook. Vacío = no se muestra
  instagram: '', // enlace de tu Instagram. Vacío = no se muestra
  city: 'Colombia',
  domicile: 'Bogotá, Colombia', // domicilio del responsable (Decreto 1074 de 2015, art. 2.2.2.25.3.1)
  depositPercent: 50, // anticipo para iniciar un proyecto; el resto se paga al entregar (aprobado por Juanes, 4 oct 2026)
  serviceArea: 'Atendemos negocios en toda Colombia de forma remota, por WhatsApp y videollamada.',
  /**
   * Mapa (opcional). En Google Maps busca tu ciudad u oficina → Compartir → Insertar un mapa →
   * copia SOLO la URL que está dentro de src="...". Vacío = no se muestra el mapa.
   */
  mapEmbedUrl: '',
  address: '', // ej. 'Calle 00 #00-00, Bogotá'. Vacío = no se muestra.
  hours: 'Lunes a sábado, de 8:00 a.m. a 7:00 p.m.',
  legalOwner: 'Juan Esteban Niño Naranjo', // responsable del tratamiento de datos (política de privacidad)
  email: 'forjadigital7@gmail.com', // correo de Forja (dado por Juanes el 4 oct 2026): datos personales y contacto
};

/**
 * ID de Google Analytics 4 de Forja Digital (dado por Juanes el 4 oct 2026). Es un identificador público, no un secreto:
 * cualquiera lo ve en el navegador. La variable VITE_GA_ID de Vercel, si existe, tiene prioridad.
 * GA solo se carga si el visitante acepta las cookies (ver consent.ts).
 */
export const GA_ID = (import.meta.env.VITE_GA_ID as string | undefined) || 'G-XKHGRSYFDP';

/** Arma un enlace de WhatsApp con un mensaje ya escrito. */
export function waLink(message = `Hola ${BRAND.name}, quiero cotizar`) {
  return `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
