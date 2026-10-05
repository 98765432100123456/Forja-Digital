import { BRAND, waLink } from '../config';
import { PLANS, img, imgSet } from '../data';
import { IconWhatsApp } from './Icons';

/** Candado del navegador: la seguridad aparece como un detalle real, no como otra tarjeta. */
export const Lock = () => (
  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
    <rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
);

const SITES = {
  salon: { url: 'studiobella.com', name: 'Studio Bella', links: ['Servicios', 'Precios', 'Reservar'], title: 'El detalle que te mereces', text: 'Reserva tu cita en línea en menos de un minuto.', cta: 'Reservar cita', image: 'belleza-promo' },
  resto: { url: 'lacocinadecasa.co', name: 'La Cocina de Casa', links: ['Menú', 'Domicilios', 'Ubicación'], title: 'Almuerzos caseros, a tu puerta', text: 'Mira el menú del día y pide por WhatsApp.', cta: 'Pedir por WhatsApp', image: 'restaurante-promo' },
};

/** Portátil con la página de muestra de un negocio (ejemplo ilustrativo). */
export function LaptopSite({ site = 'salon' }: { site?: keyof typeof SITES }) {
  const s = SITES[site];
  return (
    <div className={`laptop laptop--${site}`}>
      <div className="laptop__screen">
        <div className="browser">
          <div className="browser__bar">
            <span className="browser__url"><Lock /> {s.url}</span>
          </div>
          <div className="site">
            <div className="site__nav"><b>{s.name}</b>{s.links.map((l) => <span key={l}>{l}</span>)}</div>
            <div className="site__hero">
              <div className="site__copy">
                <strong>{s.title}</strong>
                <small>{s.text}</small>
                <em>{s.cta}</em>
              </div>
              <img src={img(s.image)} srcSet={imgSet(s.image)} sizes="(min-width: 900px) 320px, 40vw" alt="" width="720" height="720" />
            </div>
          </div>
        </div>
      </div>
      <div className="laptop__base" />
    </div>
  );
}

export default function Hero() {
  return (
    <section id="inicio" className="hero tile tile--noche">
      <div className="container tile__head">
        {/* Se entiende en 3 segundos (D25): el título dice qué hacemos; el lema queda como etiqueta */}
        <p className="tile__eyebrow">{BRAND.tagline}</p>
        <h1 className="hero__title">Páginas web, apps y diseño para tu negocio.</h1>
        <p className="tile__sub">
          Desde {PLANS[0].price}<sup>1</sup>, en Bogotá y toda Colombia. Hablas directo con quien lo hace.
        </p>
        <div className="tile__actions">
          <a className="btn btn--primary btn--lg" href={waLink()} target="_blank" rel="noopener noreferrer" data-hero-cta>
            <IconWhatsApp size={20} /> Cotizar por WhatsApp
          </a>
          <a className="btn btn--ghost btn--lg" href="#simulador">Mira cómo se vería tu negocio</a>
        </div>
        <p className="tile__note">Cotización gratis. Respondemos en menos de {BRAND.responseTime}.</p>
      </div>

      <div className="hero__stage" role="img" aria-label="Ejemplo ilustrativo: la página web de un salón de belleza en un portátil y el menú de un restaurante en un celular">
        <span className="stage__tag" aria-hidden="true">Ejemplo ilustrativo</span>
        <div className="hero__laptop"><LaptopSite /></div>
        <div className="phone hero__phone">
          <img src={img('restaurante-menu')} srcSet={imgSet('restaurante-menu')} sizes="(min-width: 900px) 220px, 28vw" alt="" width="720" height="1280" />
        </div>
      </div>
    </section>
  );
}
