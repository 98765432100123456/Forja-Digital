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
  // Datos mínimos: sin señales de Google ni personalización de anuncios (solo medir visitas y contactos).
  window.gtag('config', id, { anonymize_ip: true, allow_google_signals: false, allow_ad_personalization_signals: false });

  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(s);

  // Errores de JavaScript en navegadores reales (sec. 73: medir errores). Solo el mensaje, recortado; nunca datos del formulario.
  window.addEventListener('error', (e) => reportError(e.message, false));
  window.addEventListener('unhandledrejection', (e) => reportError(String(e.reason), false));

  // Qué secciones se ven y hasta dónde llega cada visita (video @sebas.soto222: "no sabes qué usan ni dónde se te van").
  // Un evento por sección y por visita, cuando la sección cruza la mitad de la pantalla. Sin datos personales.
  if ('IntersectionObserver' in window) {
    const seen = new Set<string>();
    const io = new IntersectionObserver((entries) => {
      for (const en of entries) {
        if (!en.isIntersecting) continue;
        const el = en.target as HTMLElement;
        const name = el.dataset.seccion || el.id;
        io.unobserve(el);
        if (!name || seen.has(name)) continue;
        seen.add(name);
        track('view_section', { section: name });
      }
    }, { rootMargin: '0px 0px -50% 0px' });
    document.querySelectorAll<HTMLElement>('main section[id], main [data-seccion]').forEach((el) => io.observe(el));
  }

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
