import { GA_ID } from './config';
import { analyticsConfigured, getChoice, onChoice } from './consent';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Carga Google Analytics 4 solo si existe la variable VITE_GA_ID **y** el visitante aceptó las cookies de analítica.
 * Sin ID o sin consentimiento, el sitio no carga ningún script de terceros ni instala cookies.
 */
export function initAnalytics() {
  if (typeof window === 'undefined' || !analyticsConfigured()) return;
  if (getChoice() === 'granted') loadGA();
  onChoice((c) => (c === 'granted' ? loadGA() : disableGA()));
}

let loaded = false;
function loadGA() {
  const id = GA_ID!;
  (window as unknown as Record<string, boolean>)[`ga-disable-${id}`] = false;
  if (loaded) return;
  loaded = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', id, { anonymize_ip: true });

  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
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

/** Si el visitante retira el consentimiento: GA deja de enviar datos y se borran sus cookies. */
function disableGA() {
  const id = GA_ID!;
  (window as unknown as Record<string, boolean>)[`ga-disable-${id}`] = true;
  const host = location.hostname;
  document.cookie.split(';').map((c) => c.split('=')[0].trim()).filter((n) => n === '_ga' || n.startsWith('_ga_')).forEach((n) => {
    for (const domain of ['', `; domain=${host}`, `; domain=.${host}`]) document.cookie = `${n}=; Max-Age=0; path=/${domain}`;
  });
}

export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  window.gtag?.('event', event, params);
}

/** Envía un error a GA4 como evento `exception`. Sin GA4 configurado no hace nada. */
export function reportError(message: string, fatal: boolean) {
  track('exception', { description: message.slice(0, 100), fatal });
}
