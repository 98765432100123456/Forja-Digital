import { BRAND, waLink } from '../config';
import { APP_BASICS, APP_FAQ, APP_OFFERS, APP_STEPS } from '../data';
import { Breadcrumbs } from '../components/Layout';
import { IconCheck, IconWhatsApp } from '../components/Icons';

const COMPARE = [
  { k: 'Para qué', micro: 'Una tarea concreta', app: 'Varias funciones conectadas' },
  { k: 'Quién la usa', micro: 'Tú o tu equipo, o tus clientes para una sola acción', app: 'Tus clientes y tu equipo, cada uno con su cuenta y permisos' },
  { k: 'Panel', micro: 'Una vista sencilla con tus datos', app: 'Administración completa con reportes' },
  { k: 'Ejemplo', micro: 'Un salón que recibe citas sin responder chats', app: 'Un restaurante con pedidos, domicilios y clientes frecuentes' },
];

const STORES = [
  { t: 'App instalable (incluida)', d: 'Se abre desde un enlace y se agrega a la pantalla de inicio. Sin cuentas de tienda, sin revisiones y con actualizaciones al instante.' },
  { t: 'Google Play (aparte)', d: 'Cuenta de desarrollador a tu nombre con pago único. Si la cuenta es personal y nueva, Google exige una prueba cerrada con al menos 12 personas durante 14 días seguidos antes de publicar.' },
  { t: 'App Store (aparte)', d: 'Cuenta de desarrollador a tu nombre con pago anual. Apple rechaza apps que son solo una página web empaquetada, así que la app debe aportar funciones propias.' },
];

export default function Apps() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Apps y micro apps' }]} />

      <section className="section page" aria-labelledby="apps-title">
        <div className="container">
          <header className="section__head">
            <h1 id="apps-title" className="page__title">Apps y micro apps para tu negocio</h1>
            <p>
              Convertimos la tarea que hoy haces en el cuaderno, en una hoja de cálculo o en mil chats en una app que se instala en
              el celular. Empiezas con lo que necesitas y la haces crecer.
            </p>
          </header>
          <div className="plans plans--two">
            {APP_OFFERS.map((o, i) => (
              <article key={o.id} className={`plan${i === 0 ? ' plan--featured' : ''}`}>
                <div className="plan__top">
                  <h2 className="plan__name">{o.name}</h2>
                  {i === 0 && <span className="plan__badge">Para empezar</span>}
                </div>
                <p className="plan__price">
                  <span className="plan__from">desde</span>
                  <span className="plan__amount">{o.price}</span>
                </p>
                <p className="plan__desc">{o.desc}</p>
                <p className="plan__time">{o.time}</p>
                <p className="plan__examples"><strong>Ejemplos:</strong> {o.examples.join(' · ')}.</p>
                <ul className="checks">{o.includes.map((f) => <li key={f}><IconCheck size={16} /> {f}</li>)}</ul>
                <a
                  className={`btn ${i === 0 ? 'btn--primary' : 'btn--secondary'} btn--block`}
                  href={waLink(`Hola ${BRAND.name}, quiero cotizar una ${o.name.toLowerCase()}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...(i === 0 ? { 'data-cta': '' } : {})}
                >
                  Cotizar una {o.name.toLowerCase()}
                </a>
              </article>
            ))}
          </div>
          <p className="aside">Precios de referencia en pesos colombianos. El servidor, la base de datos y las cuentas de tienda se pagan aparte y quedan a tu nombre.</p>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="diferencia">
        <div className="container compare compare--flat">
          <div className="compare__intro">
            <h2 id="diferencia">¿Micro app o app?</h2>
            <p>Si no estás seguro, empieza por la micro app: resuelve el problema más urgente y se convierte en app cuando lo necesites.</p>
          </div>
          <div className="table-scroll" role="region" aria-label="Comparación entre micro app y app" tabIndex={0}>
            <table className="compare__table">
              <thead><tr><th scope="col"><span className="sr-only">Aspecto</span></th><th scope="col">Micro app</th><th scope="col">App</th></tr></thead>
              <tbody>
                {COMPARE.map((r) => (
                  <tr key={r.k}><th scope="row">{r.k}</th><td>{r.micro}</td><td>{r.app}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="incluye">
        <div className="container">
          <header className="section__head">
            <h2 id="incluye">Lo que trae toda app que hacemos</h2>
            <p>Lo que una app necesita para ser segura, legal y fácil de usar, incluido en el precio.</p>
          </header>
          <ul className="basics">
            {APP_BASICS.map((b) => (
              <li key={b.t} className="basics__item">
                <h3><IconCheck size={18} /> {b.t}</h3>
                <p>{b.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="tiendas">
        <div className="container">
          <header className="section__head">
            <h2 id="tiendas">¿En las tiendas o instalable?</h2>
            <p>La app instalable funciona en cualquier celular desde el primer día. Las tiendas suman visibilidad, pero también requisitos, costos y revisiones.</p>
          </header>
          <div className="stores">
            {STORES.map((s) => (
              <article key={s.t} className="stores__item">
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="proceso-apps">
        <div className="container">
          <header className="section__head">
            <h2 id="proceso-apps">Cómo la construimos</h2>
            <p>Cuatro pasos, con la misma persona de principio a fin.</p>
          </header>
          <ol className="process">
            {APP_STEPS.map((p, i) => (
              <li key={p.title} className="process__step">
                <span className="process__n" aria-hidden="true">{i + 1}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="preguntas-apps">
        <div className="container container--narrow">
          <header className="section__head"><h2 id="preguntas-apps">Preguntas sobre apps</h2></header>
          <div className="faq">
            {APP_FAQ.map((x) => (
              <details key={x.q} className="faq__item">
                <summary>{x.q}</summary>
                <div className="faq__body"><p>{x.a}</p></div>
              </details>
            ))}
          </div>
          <p className="page__note">
            Condiciones de pago, entrega, garantía y propiedad en los <a className="link" href="/terminos#apps">términos y condiciones</a>.
          </p>
          <a className="btn btn--primary btn--lg page__cta" href={waLink(`Hola ${BRAND.name}, quiero una app para mi negocio`)} target="_blank" rel="noopener noreferrer">
            <IconWhatsApp size={20} /> Cuéntanos qué app necesitas
          </a>
        </div>
      </section>
    </>
  );
}
