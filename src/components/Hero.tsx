import { BRAND, waLink } from '../config';
import { img, imgSet } from '../data';
import { IconWhatsApp } from './Icons';

/** Candado del navegador: la seguridad aparece como un detalle real, no como otra tarjeta. */
const Lock = () => (
  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
    <rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
);

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="container hero__grid">
        <div className="hero__copy">
          <h1 className="hero__title">La IA genera.<br /> Nosotros construimos.</h1>
          <p className="hero__lead">
            Diseño para redes, páginas web y bases de datos para salones de belleza, restaurantes, inmobiliarias y
            emprendimientos en Colombia. Hablas directo con quien lo hace.
          </p>
          <div className="hero__actions">
            <a className="btn btn--primary btn--lg" href={waLink()} target="_blank" rel="noopener noreferrer" data-hero-cta>
              <IconWhatsApp size={20} /> Cotizar por WhatsApp
            </a>
            <a className="btn btn--quiet btn--lg" href="#simulador">Mira cómo se vería tu negocio</a>
          </div>
          <p className="hero__note">Cotización gratis. Respondemos en menos de {BRAND.responseTime}.</p>
        </div>

        <div className="bench" role="img" aria-label="Ejemplo ilustrativo con datos de muestra: una página web de un salón de belleza, el menú de un restaurante en historia y una tabla de pedidos">
          <span className="bench__tag" aria-hidden="true">Ejemplo ilustrativo</span>
          <div className="bench__laptop piece">
            <div className="browser">
              <div className="browser__bar">
                <span className="browser__url"><Lock /> studiobella.com</span>
              </div>
              <div className="site">
                <div className="site__nav"><b>Studio Bella</b><span>Servicios</span><span>Precios</span><span>Reservar</span></div>
                <div className="site__hero">
                  <div className="site__copy">
                    <strong>El detalle que te mereces</strong>
                    <small>Reserva tu cita en línea en menos de un minuto.</small>
                    <em>Reservar cita</em>
                  </div>
                  <img src={img('belleza-promo')} srcSet={imgSet('belleza-promo')} sizes="(min-width: 900px) 200px, 30vw" alt="" width="720" height="720" />
                </div>
              </div>
            </div>
          </div>
          <div className="bench__phone bench__phone--a piece"><img src={img('restaurante-menu')} srcSet={imgSet('restaurante-menu')} sizes="(min-width: 900px) 160px, 25vw" alt="" width="720" height="1280" /></div>
          <div className="bench__table piece">
            <p className="bench__table-title">Pedidos de hoy</p>
            <table>
              <thead><tr><th>Cliente</th><th>Total</th><th>Estado</th></tr></thead>
              <tbody>
                <tr><td>Laura M.</td><td>$90.000</td><td><span className="st st--ok">Pagado</span></td></tr>
                <tr><td>Andrés P.</td><td>$22.000</td><td><span className="st st--wait">En camino</span></td></tr>
                <tr><td>Carolina R.</td><td>$60.000</td><td><span className="st st--ok">Pagado</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
