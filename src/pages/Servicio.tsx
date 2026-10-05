import { BRAND, waLink } from '../config';
import { PROCESS, img, imgSet } from '../data';
import { type ServiceId, servicePage } from '../servicios';
import { Breadcrumbs } from '../components/Layout';
import { LaptopSite, Lock } from '../components/Hero';
import { IconCheck, IconWhatsApp } from '../components/Icons';

const PIEZAS = ['belleza-promo', 'restaurante-menu', 'inmobiliaria-promo', 'emprendedores-catalogo', 'restaurante-promo', 'belleza-precios'];

/** Prácticas reales de este sitio, comprobables en el código y en las cabeceras (docs/memoria/seguridad.md). */
const ESTE_SITIO = [
  'Conexión cifrada (HTTPS) con HSTS de 2 años',
  'Cabeceras de seguridad que bloquean scripts de terceros no autorizados',
  'Revisión automática de seguridad antes de cada publicación',
  'Pruebas automáticas en cada cambio, antes de publicar',
];

function Muestra({ kind }: { kind: 'laptop' | 'piezas' | 'tabla' | 'sitio' }) {
  if (kind === 'laptop') {
    return (
      <div className="svc__media" role="img" aria-label="Ejemplo ilustrativo de una página web para un restaurante">
        <span className="media-tag media-tag--inline" aria-hidden="true">Ejemplo ilustrativo</span>
        <LaptopSite site="resto" />
      </div>
    );
  }
  if (kind === 'piezas') {
    return (
      <div className="svc__media">
        <span className="media-tag media-tag--inline">Ejemplo ilustrativo</span>
        <ul className="svc__grid" aria-label="Piezas de muestra para salones, restaurantes, inmobiliarias y emprendedores">
          {PIEZAS.map((n) => (
            <li key={n}><img src={img(n)} srcSet={imgSet(n)} sizes="(min-width: 900px) 200px, 45vw" alt="" width="720" height="720" loading="lazy" decoding="async" /></li>
          ))}
        </ul>
      </div>
    );
  }
  if (kind === 'tabla') {
    return (
      <div className="svc__media ledger__table" role="img" aria-label="Ejemplo ilustrativo de una tabla de pedidos">
        <span className="media-tag media-tag--inline" aria-hidden="true">Ejemplo ilustrativo · Pedidos de hoy</span>
        <table aria-hidden="true">
          <thead><tr><th>Cliente</th><th>Total</th><th>Estado</th></tr></thead>
          <tbody>
            <tr><td>Laura M.</td><td>$90.000</td><td><span className="st st--ok">Pagado</span></td></tr>
            <tr><td>Andrés P.</td><td>$22.000</td><td><span className="st st--wait">En camino</span></td></tr>
            <tr><td>Carolina R.</td><td>$60.000</td><td><span className="st st--ok">Pagado</span></td></tr>
            <tr><td>Daniela S.</td><td>$45.000</td><td><span className="st st--ok">Pagado</span></td></tr>
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <div className="svc__media">
      <p className="media-tag media-tag--inline">forja-digital-mlid.vercel.app</p>
      <ul className="ledger__list" aria-label="Cómo cuidamos este sitio">
        {ESTE_SITIO.map((t) => <li key={t}><Lock /> {t}</li>)}
      </ul>
    </div>
  );
}

export default function Servicio({ id }: { id: ServiceId }) {
  const s = servicePage(id);
  const msg = waLink(`Hola ${BRAND.name}, ${s.cta.message}`);
  return (
    <>
      <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Servicios', href: '/#servicios' }, { label: s.name }]} />

      <section className="svc" aria-labelledby="svc-title" data-seccion={`servicio-${s.id}`}>
        <div className="container svc__grid-top">
          <div className="svc__text">
            <h1 id="svc-title" className="page__title svc__title">{s.title}</h1>
            <p className="feat__sub">{s.lead}</p>
            <dl className="specs">
              {s.specs.map((x) => <div key={x.k}><dt>{x.k}</dt><dd>{x.v}</dd></div>)}
            </dl>
            <div className="feat__actions">
              <a className="btn btn--primary" href={msg} target="_blank" rel="noopener noreferrer" data-cta="">
                <IconWhatsApp size={18} /> {s.cta.label}
              </a>
              <a className="link-arrow" href={s.related[0].href}>{s.related[0].label} <span aria-hidden="true">→</span></a>
            </div>
          </div>
          <div className="svc__side">
            <Muestra kind={s.sample} />
            <p className="svc__caption"><strong>{s.sampleTitle}.</strong> {s.sampleText}</p>
          </div>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="svc-incluye">
        <div className="container">
          <header className="section__head">
            <h2 id="svc-incluye">Qué incluye</h2>
          </header>
          <ul className="svc__includes">
            {s.includes.map((x) => (
              <li key={x.t}>
                <h3><IconCheck size={18} /> {x.t}</h3>
                <p>{x.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="svc-proceso">
        <div className="container">
          <header className="section__head">
            <h2 id="svc-proceso">Cómo trabajamos</h2>
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

      <section className="section section--alt" aria-labelledby="svc-preguntas">
        <div className="container container--narrow">
          <header className="section__head"><h2 id="svc-preguntas">Preguntas sobre {s.name.toLowerCase()}</h2></header>
          <div className="faq">
            {s.faq.map((x) => (
              <details key={x.q} className="faq__item">
                <summary>{x.q}</summary>
                <div className="faq__body"><p>{x.a}</p></div>
              </details>
            ))}
          </div>
          <p className="page__note">
            Ver también:{' '}
            {s.related.map((r, i) => (
              <span key={r.href}>{i > 0 && ' · '}<a className="link" href={r.href}>{r.label}</a></span>
            ))}
            . Pagos, entregas y garantía en los <a className="link" href="/terminos">términos y condiciones</a>.
          </p>
          <a className="btn btn--primary btn--lg page__cta" href={msg} target="_blank" rel="noopener noreferrer">
            <IconWhatsApp size={20} /> {s.cta.label}
          </a>
        </div>
      </section>
    </>
  );
}
