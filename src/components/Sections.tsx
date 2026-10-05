import { BRAND, waLink } from '../config';
import { APP_OFFERS, COMPARISON, FAQ, KITS, KIT_PRICE, PLANS, PROCESS, SERVICES, kitImg, kitSet } from '../data';
import { IconCheck } from './Icons';

export function Services() {
  return (
    <section id="servicios" className="section">
      <div className="container">
        <header className="section__head">
          <h2>Lo que hacemos</h2>
          <p>Cinco servicios que se pueden contratar por separado o juntos, con la misma identidad en todo.</p>
        </header>
        <div className="services">
          {SERVICES.map((s) => (
            <article key={s.title} className="service">
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <ul className="checks">
                {s.includes.map((p) => <li key={p}><IconCheck size={16} /> {p}</li>)}
              </ul>
            </article>
          ))}
          <article className="service service--wide">
            <div>
              <h3>Apps y micro apps</h3>
              <p>Agendas, pedidos, inventarios o portales de clientes que se instalan en el celular. Micro apps desde {APP_OFFERS[0].price}; apps desde {APP_OFFERS[1].price}.</p>
            </div>
            <a className="btn btn--secondary" href="/apps">Ver apps y micro apps</a>
          </article>
        </div>
      </div>
    </section>
  );
}

export function Comparison() {
  return (
    <section className="section section--tight">
      <div className="container compare">
        <header className="compare__intro">
          <h2>¿Por qué no hacerlo solo con IA?</h2>
          <p>
            Puedes, y para algunas cosas sirve. La diferencia está en lo que la IA no conoce: tu negocio, tu cliente y lo
            que pasa después de publicar.
          </p>
        </header>
        <div className="table-wrap">
          <table className="compare__table">
            <caption className="sr-only">Comparación entre usar solo IA y trabajar con {BRAND.name}</caption>
            <thead>
              <tr><th scope="col"><span className="sr-only">Aspecto</span></th><th scope="col">Solo con IA</th><th scope="col">Con {BRAND.name}</th></tr>
            </thead>
            <tbody>
              {COMPARISON.map((r) => (
                <tr key={r.topic}>
                  <th scope="row">{r.topic}</th>
                  <td>{r.ai}</td>
                  <td>{r.us}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className="section section--alt">
      <div className="container">
        <header className="section__head">
          <h2>Cómo trabajamos</h2>
          <p>Cuatro pasos. En todos hablas con la misma persona.</p>
        </header>
        <ol className="process">
          {PROCESS.map((p, i) => (
            <li key={p.title} className="process__step">
              <span className="process__n" aria-hidden="true">{i + 1}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Pricing() {
  return (
    <section id="planes" className="section">
      <div className="container">
        <header className="section__head">
          <h2>Planes y precios</h2>
          <p>Precios de referencia en pesos colombianos. El dominio y el hosting se pagan aparte y quedan a tu nombre.</p>
        </header>
        <div className="plans">
          {PLANS.map((p) => (
            <article key={p.name} className={`plan${p.featured ? ' plan--featured' : ''}`}>
              <div className="plan__top">
                <h3>{p.name}</h3>
                {p.featured && <span className="plan__badge">Recomendado</span>}
              </div>
              <p className="plan__price">
                <span className="plan__from">desde</span>
                <span className="plan__amount">{p.price}</span>
                {p.period && <span className="plan__period">{p.period}</span>}
              </p>
              <p className="plan__desc">{p.desc}</p>
              <p className="plan__time">{p.time}</p>
              <ul className="checks">{p.features.map((f) => <li key={f}><IconCheck size={16} /> {f}</li>)}</ul>
              <a
                className={`btn ${p.featured ? 'btn--primary' : 'btn--secondary'} btn--block`}
                href={waLink(`Hola ${BRAND.name}, quiero cotizar el plan ${p.name}`)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Cotizar este plan: ${p.name}`}
              >
                Cotizar este plan
              </a>
            </article>
          ))}
        </div>
        <p className="aside">
          ¿Necesitas una app? Mira las <a className="link" href="/apps">apps y micro apps</a>. ¿Algo distinto, como un sistema a la medida o una base de datos?{' '}
          <a href={waLink(`Hola ${BRAND.name}, necesito un proyecto a la medida`)} target="_blank" rel="noopener noreferrer">Cuéntanos y lo cotizamos</a>.
        </p>
      </div>
    </section>
  );
}

export function Templates() {
  return (
    <section id="plantillas" className="section section--alt">
      <div className="container">
        <header className="section__head">
          <h2>Plantillas listas para Canva</h2>
          <p>Kits de 10 diseños: 6 posts y 4 historias, en español o inglés. Cambias textos, colores y fotos, y publicas. {KIT_PRICE} por kit.</p>
        </header>
        <div className="kits">
          {KITS.map((k) => (
            <article key={k.id} className="kit">
              <img src={kitImg(k.id)} srcSet={kitSet(k.id)} sizes="(min-width: 1100px) 280px, (min-width: 600px) 45vw, 90vw" alt={`Vista previa del ${k.title.toLowerCase()}: 6 posts y 4 historias`} width="900" height="900" loading="lazy" decoding="async" />
              <h3>{k.title}</h3>
              <p>{k.text}</p>
              <p className="kit__price">{KIT_PRICE}</p>
              <a className="link" href={waLink(`Hola ${BRAND.name}, quiero el ${k.title}`)} target="_blank" rel="noopener noreferrer" aria-label={`Pedir este kit: ${k.title}`}>Pedir este kit</a>
            </article>
          ))}
        </div>
        <p className="aside">Cómo se compran, qué incluyen y la licencia de uso: <a href="/plantillas-canva">ver la página de plantillas</a>.</p>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="preguntas" className="section">
      <div className="container faq-layout">
        <header className="section__head">
          <h2>Preguntas frecuentes</h2>
          <p>
            ¿Tienes otra?{' '}
            <a className="link" href={waLink(`Hola ${BRAND.name}, tengo una pregunta`)} target="_blank" rel="noopener noreferrer">Pregúntanos por WhatsApp</a>.
          </p>
        </header>
        <div className="faq">
          {FAQ.map((f) => (
            <details key={f.q} className="faq__item">
              <summary>{f.q}</summary>
              <div className="faq__body"><p>{f.a}</p></div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
