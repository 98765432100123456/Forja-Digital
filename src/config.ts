// Datos del negocio: cambia aquí y se actualiza todo el sitio.
export const BRAND = {
  name: 'Forja Digital',
  tagline: 'La IA genera. Nosotros construimos.',
  whatsappNumber: '573133818294', // formato internacional, sin + ni espacios
  whatsappDisplay: '313 381 8294',
  facebook: 'https://www.facebook.com/', // reemplaza con el enlace de tu página
  instagram: 'https://www.instagram.com/', // reemplaza con tu perfil
  city: 'Colombia',
};

/** Arma un enlace de WhatsApp con un mensaje ya escrito. */
export function waLink(message = `Hola ${BRAND.name}, quiero cotizar`) {
  return `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
