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

/** Datos clave de cada servicio: precio, tiempo y lo que trae, sin cajas. */
function Specs({ items, dark = false }: { items: { k: string; v: string }[]; dark?: boolean }) {
  return (
    <dl className={`specs${dark ? ' specs--dark' : ''}`}>
      {items.map((i) => (
        <div key={i.k}><dt>{i.k}</dt><dd>{i.v}</dd></div>
      ))}
    </dl>
  );
}

const REEL = ['belleza-promo', 'restaurante-menu', 'inmobiliaria-promo', 'emprendedores-catalogo', 'restaurante-promo', 'belleza-precios', 'inmobiliaria-servicios', 'emprendedores-promo'];

export default function Vitrinas() {
  const landing = PLANS[0];
  return (
    <div id="servicios" className="vitrinas">
      <h2 className="sr-only">Lo que hacemos</h2>

      {/* 1. Páginas web: texto a la izquierda y el portátil se sale por la derecha */}
      <section data-seccion="web" className="feat feat--web" aria-labelledby="v-web">
        <div className="container feat__grid">
          <div className="feat__text">
            <p className="feat__index"><span>01</span>Páginas web</p>
            <h3 id="v-web" className="feat__title">Una página que presenta tu negocio mientras atiendes.</h3>
            <p className="feat__sub">Tus clientes ven qué haces, cuánto cuesta y te escriben por WhatsApp sin esperar a que contestes.</p>
            <Specs items={[{ k: 'Desde', v: `${landing.price}¹` }, { k: 'Tiempo', v: '1 a 2 semanas' }, { k: 'Incluye', v: 'Botón a WhatsApp' }]} />
            <div className="feat__actions">
              <a className="btn btn--primary" href={cotizar('una página web')} target="_blank" rel="noopener noreferrer">Cotizar mi página</a>
              <a className="btn btn--outline" href="/paginas-web">Conocer las páginas web</a>
            </div>
          </div>
          <div className="feat__media feat__media--bleed reveal" role="img" aria-label="Ejemplo ilustrativo de una página web para un restaurante">
            <span className="media-tag" aria-hidden="true">Ejemplo ilustrativo</span>
            <LaptopSite site="resto" />
          </div>
        </div>
      </section>

      {/* 2. Apps: oscuro, los celulares primero y el texto a la derecha */}
      <section data-seccion="apps" className="feat feat--apps" aria-labelledby="v-apps">
        <div className="container feat__grid feat__grid--flip">
          <div className="feat__media phones reveal" role="img" aria-label="Ejemplo ilustrativo: una micro app de agenda de citas y una app de pedidos">
            <span className="media-tag" aria-hidden="true">Ejemplo ilustrativo</span>
            <div className="phone phone--tilt-l"><AgendaApp /></div>
            <div className="phone phone--tilt-r"><PedidosApp /></div>
          </div>
          <div className="feat__text">
            <p className="feat__index"><span>02</span>Apps y micro apps</p>
            <h3 id="v-apps" className="feat__title">Tu negocio, en el celular de tus clientes.</h3>
            <p className="feat__sub">Agenda, pedidos o inventario en una app que se instala sin pasar por las tiendas.</p>
            <Specs dark items={[{ k: 'Micro app', v: `${APP_OFFERS[0].price}¹ · 2 a 4 semanas` }, { k: 'App', v: `${APP_OFFERS[1].price}¹ · 6 a 10 semanas` }]} />
            <div className="feat__actions">
              <a className="btn btn--primary" href={cotizar('una app')} target="_blank" rel="noopener noreferrer">Cotizar mi app</a>
              <a className="btn btn--ghost" href="/apps">Conocer las apps</a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Canva y redes: una tira de piezas reales que cruza la pantalla */}
      <section data-seccion="diseno" className="strip" aria-labelledby="v-canva">
        <div className="container strip__head">
          <div>
            <p className="feat__index"><span>03</span>Diseño y plantillas</p>
            <h3 id="v-canva" className="feat__title">Publica como una marca grande.</h3>
          </div>
          <div className="strip__offers">
            <div>
              <h4>Plantillas para Canva</h4>
              <p>Kits de 10 diseños editables, {KIT_PRICE.toLowerCase()}.</p>
              <a className="link-arrow" href="/plantillas-canva">Ver plantillas <span aria-hidden="true">→</span></a>
            </div>
            <div>
              <h4 id="v-redes">Diseño para redes</h4>
              <p>Posts, historias y menús con tus colores, editables en Canva.</p>
              <a className="link-arrow" href="/diseno-para-redes">Ver diseño para redes <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </div>
        <ul className="reel" aria-label="Piezas de muestra para salones, restaurantes, inmobiliarias y emprendedores" tabIndex={0}>
          {REEL.map((n) => (
            <li key={n}><img src={img(n)} srcSet={imgSet(n)} sizes="(min-width: 900px) 260px, 56vw" alt="" width="720" height="720" loading="lazy" decoding="async" /></li>
          ))}
          <li className="reel__kit"><img src={kitImg('belleza')} srcSet={kitSet('belleza')} sizes="(min-width: 900px) 260px, 56vw" alt="Kit para salones de belleza: 6 posts y 4 historias" width="900" height="900" loading="lazy" decoding="async" /></li>
        </ul>
      </section>

      {/* 4. Datos y seguridad: como un libro de cuentas, con líneas y sin tarjetas */}
      <section data-seccion="datos-seguridad" className="ledger" aria-label="Bases de datos y seguridad">
        <div className="container ledger__grid">
          <div className="ledger__col">
            <p className="feat__index"><span>04</span>Bases de datos</p>
            <h3 id="v-datos" className="ledger__title">Deja el cuaderno y los mil chats.</h3>
            <p className="feat__sub">Clientes, pedidos e inventario en un solo lugar.</p>
            <div className="ledger__table" role="img" aria-label="Ejemplo ilustrativo de una tabla de pedidos">
              <span className="media-tag media-tag--inline" aria-hidden="true">Ejemplo ilustrativo · Pedidos de hoy</span>
              <table aria-hidden="true">
                <thead><tr><th>Cliente</th><th>Total</th><th>Estado</th></tr></thead>
                <tbody>
                  <tr><td>Laura M.</td><td>$90.000</td><td><span className="st st--ok">Pagado</span></td></tr>
                  <tr><td>Andrés P.</td><td>$22.000</td><td><span className="st st--wait">En camino</span></td></tr>
                  <tr><td>Carolina R.</td><td>$60.000</td><td><span className="st st--ok">Pagado</span></td></tr>
                </tbody>
              </table>
            </div>
            <a className="link-arrow" href="/bases-de-datos">Ver bases de datos <span aria-hidden="true">→</span></a>
          </div>
          <div className="ledger__col">
            <p className="feat__index"><span>05</span>Seguridad y soporte</p>
            <h3 id="v-seg" className="ledger__title">Tu sitio cuidado, mes a mes.</h3>
            <p className="feat__sub">Acompañamiento desde {PLANS[3].price} al mes.<sup>1</sup></p>
            <ul className="ledger__list" aria-label="Lo que incluye el acompañamiento">
              <li><Lock /> Conexión segura (HTTPS)</li>
              <li><Lock /> Copias de seguridad</li>
              <li><Lock /> Revisión de seguridad</li>
              <li><IconWhatsApp size={14} /> Soporte por WhatsApp</li>
            </ul>
            <a className="link-arrow" href="/seguridad-y-soporte">Ver seguridad y soporte <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>
    </div>
  );
}
