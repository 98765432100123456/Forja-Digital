import { useEffect, useSyncExternalStore } from 'react';
import { analyticsConfigured, bannerSnapshot, openCookieSettings, setChoice, subscribeConsent, type Choice } from '../consent';

const noop = () => () => {};
const serverEmpty = () => '';

/**
 * Aviso de cookies: aparece solo si hay analítica configurada y el visitante aún no decidió.
 * "Aceptar" y "Rechazar" tienen el mismo peso visual: rechazar no puede ser más difícil que aceptar.
 * No bloquea la página; se puede cambiar la decisión desde "Preferencias de cookies" en el pie.
 */
export default function CookieBanner() {
  const snap = useSyncExternalStore(subscribeConsent, bannerSnapshot, serverEmpty);
  const open = snap !== '';
  const current = snap.split('|')[1] as Choice | '' | undefined;

  useEffect(() => {
    document.body.classList.toggle('has-cookie-banner', open);
  }, [open]);

  if (!open) return null;
  return (
    <div className="cookies" role="region" aria-label="Aviso de cookies" tabIndex={-1}>
      <div className="cookies__inner">
        <p>
          Usamos cookies de Google Analytics para saber cuántas personas visitan el sitio y qué secciones les sirven.{' '}
          <strong>Solo se activan si aceptas.</strong> Más detalles en la{' '}
          <a href="/cookies">política de cookies</a>.
          {current && <span className="cookies__now"> Ahora: {current === 'granted' ? 'aceptadas' : 'rechazadas'}.</span>}
        </p>
        <div className="cookies__actions">
          <button type="button" className="btn btn--secondary" onClick={() => setChoice('denied')}>Rechazar</button>
          <button type="button" className="btn btn--secondary" onClick={() => setChoice('granted')}>Aceptar</button>
        </div>
      </div>
    </div>
  );
}

/** Enlace del pie para volver a abrir el aviso. Solo existe si hay algo que consentir. */
export function CookieSettingsLink() {
  const show = useSyncExternalStore(noop, analyticsConfigured, () => false);
  if (!show) return null;
  return (
    <button
      type="button"
      className="footer__link-btn"
      onClick={() => {
        openCookieSettings();
        requestAnimationFrame(() => document.querySelector<HTMLElement>('.cookies')?.focus());
      }}
    >
      Preferencias de cookies
    </button>
  );
}
