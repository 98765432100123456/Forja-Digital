import { GA_ID } from './config';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Carga Google Analytics 4 solo si existe la variable VITE_GA_ID.
 * Sin ID, el sitio no carga ningún script de terceros.
 */
export function initAnalytics() {
  if (!GA_ID || typeof window === 'undefined' || window.gtag) return;
  if (!/^G-[A-Z0-9]+$/.test(GA_ID)) return; // evita inyectar valores raros

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { anonymize_ip: true });

  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);

  // Errores de JavaScript en navegadores reales (sec. 73: medir errores). Solo el mensaje, recortado; nunca datos del formulario.
  window.addEventListener('error', (e) => reportError(e.message, false));
  window.addEventListener('unhandledrejection', (e) => reportError(String(e.reason), false));

  // Mide cada clic hacia WhatsApp como un contacto (lead)
  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest('a');
    if (a && a.href.startsWith('https://wa.me/')) {
      track('generate_lead', { method: 'whatsapp', label: a.textContent?.trim().slice(0, 60) || '' });
    }
  });
}

export function track(event: string, params: Record<string, unknown> = {}) {
  window.gtag?.('event', event, params);
}

/** Envía un error a GA4 como evento `exception`. Sin GA4 configurado no hace nada. */
export function reportError(message: string, fatal: boolean) {
  track('exception', { description: message.slice(0, 100), fatal });
}
