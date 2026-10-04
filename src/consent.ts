// Consentimiento de cookies de analítica (Ley 1581 de 2012: autorización previa, expresa e informada).
// Sin una decisión del visitante, Google Analytics NO se carga y no se instala ninguna cookie.
import { GA_ID } from './config';

export type Choice = 'granted' | 'denied';
const KEY = 'forja:cookies';
const EVENT = 'forja:consent';
export const OPEN_EVENT = 'forja:open-cookie-settings';

/** El banner solo tiene sentido si hay analítica configurada con un ID válido. */
export const analyticsConfigured = () => !!GA_ID && /^G-[A-Z0-9]+$/.test(GA_ID);

export function getChoice(): Choice | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch {
    return null;
  }
}

export function setChoice(choice: Choice) {
  try { localStorage.setItem(KEY, choice); } catch { /* sin almacenamiento: la decisión dura esta visita */ }
  window.dispatchEvent(new CustomEvent<Choice>(EVENT, { detail: choice }));
}

export function onChoice(fn: (c: Choice) => void) {
  const h = (e: Event) => fn((e as CustomEvent<Choice>).detail);
  window.addEventListener(EVENT, h);
  return () => window.removeEventListener(EVENT, h);
}

export const openCookieSettings = () => window.dispatchEvent(new Event(OPEN_EVENT));

// ---- Estado del aviso para React (useSyncExternalStore: sin setState dentro de efectos y sin desajustes al hidratar) ----
let forcedOpen = false;
export function subscribeConsent(cb: () => void) {
  const onOpen = () => { forcedOpen = true; cb(); };
  const onDecide = () => { forcedOpen = false; cb(); };
  window.addEventListener(OPEN_EVENT, onOpen);
  window.addEventListener(EVENT, onDecide);
  return () => { window.removeEventListener(OPEN_EVENT, onOpen); window.removeEventListener(EVENT, onDecide); };
}
/** Texto que resume el estado: '' = no mostrar; si no, 'abierto|<decisión actual>'. */
export function bannerSnapshot(): string {
  if (!analyticsConfigured()) return '';
  const c = getChoice();
  return !c || forcedOpen ? `abierto|${c ?? ''}` : '';
}
