import { BRAND, waLink } from '../config';
import { img } from '../data';
import { IconArrow, IconDatabase, IconShield, IconWhatsApp } from './Icons';

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="glow glow--teal hero__glow1" aria-hidden="true" />
      <div className="glow glow--accent hero__glow2" aria-hidden="true" />

      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="pill"><span className="dot" aria-hidden="true" /> Agenda abierta · Colombia</p>
          <h1 className="hero__title">
            La IA genera.<br />
            <span className="text-accent">Nosotros construimos.</span>
          </h1>
          <p className="hero__lead">
            Diseño, páginas web, bases de datos y seguridad para tu negocio, hechos a tu medida por personas reales.
            Precio justo y trato directo, sin agencias de por medio.
          </p>
          <div className="hero__actions">
            <a className="btn btn--primary" href={waLink()} target="_blank" rel="noopener noreferrer">
              <IconWhatsApp size={20} /> Cotiza gratis
            </a>
            <a className="btn btn--ghost" href="#portafolio">
              Ver trabajos <IconArrow size={18} />
            </a>
          </div>
          <p className="hero__promise"><span className="dot" aria-hidden="true" /> Te respondemos en menos de {BRAND.responseTime}</p>
          <ul className="hero__tags" aria-label="Servicios">
            <li>Diseño</li><li>Web</li><li>Bases de datos</li><li>Seguridad</li>
          </ul>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="phone phone--left"><img src={img('restaurante-menu')} alt="" /></div>
          <div className="phone phone--right"><img src={img('belleza-fidelidad')} alt="" /></div>

          <div className="laptop">
            <div className="laptop__screen">
              <div className="mini-browser">
                <div className="mini-browser__bar"><i /><i /><i /><span>studiobella.com</span></div>
                <div className="mini-site">
                  <div className="mini-site__nav"><b>Studio Bella</b><span>Servicios · Precios · Contacto</span></div>
                  <div className="mini-site__hero">
                    <div>
                      <small>UÑAS · PESTAÑAS · CEJAS</small>
                      <strong>El detalle que<br />te mereces</strong>
                      <em>Reservar cita</em>
                    </div>
                    <img src={img('belleza-promo')} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="laptop__base" />
          </div>

          <div className="float-card float-card--db">
            <div className="float-card__head"><IconDatabase size={18} /> pedidos</div>
            <div className="db-row db-row--head"><span>cliente</span><span>total</span><span>estado</span></div>
            <div className="db-row"><span>Laura M.</span><span>$90.000</span><span className="ok">● pagado</span></div>
            <div className="db-row"><span>Andrés P.</span><span>$22.000</span><span className="warn">● en camino</span></div>
            <div className="db-row"><span>Carolina R.</span><span>$60.000</span><span className="ok">● pagado</span></div>
          </div>

          <div className="float-card float-card--sec">
            <div className="sec-icon"><IconShield size={26} /></div>
            <div>
              <strong>Sitio protegido</strong>
              <span>HTTPS · Backups · Roles</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
