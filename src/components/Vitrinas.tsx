import { BRAND, waLink } from '../config';
import { APP_OFFERS, KIT_PRICE, PLANS, img, imgSet, kitImg, kitSet } from '../data';
import { LaptopSite, Lock } from './Hero';
import { IconWhatsApp } from './Icons';

const cotizar = (que: string) => waLink(`Hola ${BRAND.name}, quiero cotizar ${que}`);

/** Pantalla de una micro app de agenda (ejemplo ilustrativo, datos de muestra). */
function AgendaApp() {
  const slots = [
    { h: '9:00', n: 'Laura · Uñas acrílicas', s: 'ok' },
    { h: '10:30', n: 'Disponible', s: 'free' },
    { h: '11:00', n: 'Carolina · Pestañas', s: 'ok' },
    { h: '2:00', n: 'Andrea · Cejas', s: 'wait' },
    { h: '3:30', n: 'Disponible', s: 'free' },
  ];
  return (
    <div className="app-ui">
      <div className="app-ui__top"><b>Agenda</b><span>Hoy · 5 citas</span></div>
      <div className="app-ui__days">{['L', 'M', 'M', 'J', 'V', 'S'].map((d, i) => <span key={i} className={i === 2 ? 'is-on' : ''}>{d}<small>{14 + i}</small></span>)}</div>
      <ul className="app-ui__list">
        {slots.map((s) => (
          <li key={s.h} className={`slot slot--${s.s}`}><time>{s.h}</time><span>{s.n}</span></li>
        ))}
      </ul>
      <div className="app-ui__cta">Agendar cita</div>
    </div>
  );
}

function PedidosApp() {
  const rows = [
    { n: 'Pedido #128', d: '2 almuerzos · domicilio', t: '$36.000', s: 'En camino' },
    { n: 'Pedido #127', d: 'Bandeja casera', t: '$21.000', s: 'Entregado' },
    { n: 'Pedido #126', d: '3 jugos naturales', t: '$15.000', s: 'Entregado' },
  ];
  return (
    <div className="app-ui app-ui--alt">
      <div className="app-ui__top"><b>Pedidos</b><span>Hoy</span></div>
      <div className="app-ui__kpi"><div><small>Ventas</small><b>$412.000</b></div><div><small>Pedidos</small><b>18</b></div></div>
      <ul className="app-ui__orders">
        {rows.map((r) => (
          <li key={r.n}><div><b>{r.n}</b><small>{r.d}</small></div><div><b>{r.t}</b><small className={r.s === 'En camino' ? 'is-wait' : 'is-ok'}>{r.s}</small></div></li>
        ))}
      </ul>
    </div>
  );
}

export default function Vitrinas() {
  const landing = PLANS[0];
  return (
    <div id="servicios" className="vitrinas">
      <h2 className="sr-only">Lo que hacemos</h2>

      <section className="tile tile--acero" aria-labelledby="v-web">
        <div className="container tile__head">
          <p className="tile__eyebrow">Páginas web</p>
          <h3 id="v-web" className="tile__title">Una página que presenta tu negocio mientras atiendes.</h3>
          <p className="tile__sub">Desde {landing.price}. Lista en 1 a 2 semanas.<sup>1</sup></p>
          <div className="tile__actions">
            <a className="btn btn--primary" href={cotizar('una página web')} target="_blank" rel="noopener noreferrer">Cotizar mi página</a>
            <a className="btn btn--outline" href="#planes">Ver planes</a>
          </div>
        </div>
        <div className="tile__visual tile__visual--wide reveal" role="img" aria-label="Ejemplo ilustrativo de una página web para un restaurante">
          <span className="stage__tag stage__tag--light" aria-hidden="true">Ejemplo ilustrativo</span>
          <LaptopSite site="resto" />
        </div>
      </section>

      <section className="tile tile--noche" aria-labelledby="v-apps">
        <div className="container tile__head">
          <p className="tile__eyebrow">Apps y micro apps</p>
          <h3 id="v-apps" className="tile__title">Tu negocio, en el celular de tus clientes.</h3>
          <p className="tile__sub">Micro apps desde {APP_OFFERS[0].price}. Apps desde {APP_OFFERS[1].price}.<sup>1</sup></p>
          <div className="tile__actions">
            <a className="btn btn--primary" href="/apps">Conocer las apps</a>
            <a className="btn btn--ghost" href={cotizar('una app')} target="_blank" rel="noopener noreferrer">Cotizar</a>
          </div>
        </div>
        <div className="tile__visual phones reveal" role="img" aria-label="Ejemplo ilustrativo: una micro app de agenda de citas y una app de pedidos">
          <span className="stage__tag" aria-hidden="true">Ejemplo ilustrativo</span>
          <div className="phone phone--tilt-l"><AgendaApp /></div>
          <div className="phone phone--tilt-r"><PedidosApp /></div>
        </div>
      </section>

      <div className="tiles-grid container-wide">
        <section className="tile tile--half tile--acero" aria-labelledby="v-canva">
          <div className="tile__head">
            <p className="tile__eyebrow">Plantillas para Canva</p>
            <h3 id="v-canva" className="tile__title tile__title--sm">Publica como una marca grande.</h3>
            <p className="tile__sub">Kits de 10 diseños, {KIT_PRICE.toLowerCase()}.</p>
            <div className="tile__actions">
              <a className="btn btn--primary btn--sm" href="/plantillas-canva">Ver plantillas</a>
              <a className="btn btn--outline btn--sm" href={waLink(`Hola ${BRAND.name}, quiero una plantilla para Canva`)} target="_blank" rel="noopener noreferrer">Pedir por WhatsApp</a>
            </div>
          </div>
          <div className="tile__visual reveal">
            <img className="tile__img" src={kitImg('belleza')} srcSet={kitSet('belleza')} sizes="(min-width: 900px) 420px, 80vw" alt="Vista previa del kit para salones de belleza: 6 posts y 4 historias" width="900" height="900" loading="lazy" decoding="async" />
          </div>
        </section>

        <section className="tile tile--half tile--acero" aria-labelledby="v-redes">
          <div className="tile__head">
            <p className="tile__eyebrow">Diseño para redes</p>
            <h3 id="v-redes" className="tile__title tile__title--sm">Tu identidad en cada post.</h3>
            <p className="tile__sub">Posts, historias y menús con tus colores, editables en Canva.</p>
            <div className="tile__actions">
              <a className="btn btn--primary btn--sm" href={cotizar('diseño para redes')} target="_blank" rel="noopener noreferrer">Cotizar diseño</a>
              <a className="btn btn--outline btn--sm" href="#trabajos">Ver trabajos</a>
            </div>
          </div>
          <div className="tile__visual fan reveal" role="img" aria-label="Ejemplos de posts para un restaurante, una inmobiliaria y un emprendimiento">
            <img src={img('restaurante-promo')} srcSet={imgSet('restaurante-promo')} sizes="200px" alt="" width="720" height="720" loading="lazy" decoding="async" />
            <img src={img('inmobiliaria-promo')} srcSet={imgSet('inmobiliaria-promo')} sizes="200px" alt="" width="720" height="720" loading="lazy" decoding="async" />
            <img src={img('emprendedores-promo')} srcSet={imgSet('emprendedores-promo')} sizes="200px" alt="" width="720" height="720" loading="lazy" decoding="async" />
          </div>
        </section>

        <section className="tile tile--half tile--acero" aria-labelledby="v-datos">
          <div className="tile__head">
            <p className="tile__eyebrow">Bases de datos</p>
            <h3 id="v-datos" className="tile__title tile__title--sm">Deja el cuaderno y los mil chats.</h3>
            <p className="tile__sub">Clientes, pedidos e inventario en un solo lugar.</p>
            <div className="tile__actions">
              <a className="btn btn--primary btn--sm" href={cotizar('una base de datos')} target="_blank" rel="noopener noreferrer">Cotizar</a>
            </div>
          </div>
          <div className="tile__visual reveal" role="img" aria-label="Ejemplo ilustrativo de una tabla de pedidos">
            <div className="data-card">
              <p className="data-card__title">Pedidos de hoy</p>
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
        </section>

        <section className="tile tile--half tile--grafito" aria-labelledby="v-seg">
          <div className="tile__head">
            <p className="tile__eyebrow">Seguridad y soporte</p>
            <h3 id="v-seg" className="tile__title tile__title--sm">Tu sitio cuidado, mes a mes.</h3>
            <p className="tile__sub">Acompañamiento desde {PLANS[3].price} al mes.</p>
            <div className="tile__actions">
              <a className="btn btn--primary btn--sm" href={cotizar('el acompañamiento mensual')} target="_blank" rel="noopener noreferrer">Cotizar</a>
            </div>
          </div>
          <div className="tile__visual reveal">
            <ul className="secure-card" aria-label="Lo que incluye el acompañamiento">
              <li><Lock /> Conexión segura (HTTPS)</li>
              <li><Lock /> Copias de seguridad</li>
              <li><Lock /> Revisión de seguridad</li>
              <li><IconWhatsApp size={14} /> Soporte por WhatsApp</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
