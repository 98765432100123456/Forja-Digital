import { BRAND, waLink } from '../config';
import { KITS, KIT_PRICE, kitImg, kitSet } from '../data';
import { Breadcrumbs } from '../components/Layout';
import { IconWhatsApp } from '../components/Icons';

const STEPS = [
  { t: 'Elige tu kit', d: 'Escríbenos por WhatsApp con el kit que quieres y en qué idioma (español o inglés). Cada kit cuesta desde $50.000; te confirmamos el valor exacto antes de pagar.' },
  { t: 'Paga', d: 'Te enviamos los datos de pago. No necesitas cuenta en ninguna tienda.' },
  { t: 'Recibe el enlace', d: 'Te llega un enlace que crea una copia editable en tu cuenta de Canva. Sirve la cuenta gratuita.' },
  { t: 'Personaliza y publica', d: 'Cambias textos, colores y fotos con tu marca, y publicas en Instagram, Facebook o WhatsApp.' },
];

const QA = [
  { q: '¿Qué trae cada kit?', a: '10 diseños: 6 posts cuadrados y 4 historias verticales, pensados para el tipo de negocio del kit.' },
  { q: '¿Necesito Canva Pro?', a: 'No. Las plantillas funcionan con la cuenta gratuita de Canva.' },
  { q: '¿Las fotos vienen incluidas?', a: 'Los diseños traen espacios para tus fotos. Usa fotos tuyas o de bancos con licencia libre para uso comercial, como Unsplash o Pexels; no uses imágenes descargadas de Google.' },
  { q: '¿Puedo revenderlas?', a: 'No. Puedes usarlas y modificarlas para tu propio negocio todas las veces que quieras, pero no compartirlas ni revenderlas como plantillas.' },
  { q: '¿Y si quiero algo a la medida?', a: 'Hacemos diseño para redes con tu identidad propia. Escríbenos y lo cotizamos.' },
];

export default function Plantillas() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Plantillas para Canva' }]} />
      <section className="section page">
        <div className="container">
          <header className="section__head">
            <h1 className="page__title">Plantillas para Canva para negocios en Colombia</h1>
            <p>
              Kits de 10 diseños para redes sociales, hechos para salones de belleza, restaurantes, inmobiliarias y emprendimientos.
              Los editas en Canva con tus colores, textos y fotos. Desde $50.000 por kit.
            </p>
          </header>
          <div className="kits">
            {KITS.map((k) => (
              <article key={k.id} className="kit">
                <img src={kitImg(k.id)} srcSet={kitSet(k.id)} sizes="(min-width: 1100px) 280px, (min-width: 600px) 45vw, 90vw" alt={`Vista previa del ${k.title.toLowerCase()}: 6 posts y 4 historias`} width="900" height="900" loading="lazy" decoding="async" />
                <h2 className="kit__title">{k.title}</h2>
                <p>{k.text}</p>
                <p className="kit__price">{KIT_PRICE}</p>
                <a className="link" href={waLink(`Hola ${BRAND.name}, quiero el ${k.title}`)} target="_blank" rel="noopener noreferrer" aria-label={`Pedir este kit: ${k.title}`}>Pedir este kit</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="como-funciona">
        <div className="container">
          <header className="section__head"><h2 id="como-funciona">Cómo funciona</h2></header>
          <ol className="process">
            {STEPS.map((s, i) => (
              <li key={s.t} className="process__step">
                <span className="process__n" aria-hidden="true">{i + 1}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="preguntas-kits">
        <div className="container container--narrow">
          <header className="section__head"><h2 id="preguntas-kits">Preguntas sobre las plantillas</h2></header>
          <div className="faq">
            {QA.map((x) => (
              <details key={x.q} className="faq__item">
                <summary>{x.q}</summary>
                <div className="faq__body"><p>{x.a}</p></div>
              </details>
            ))}
          </div>
          <p className="page__note">
            Condiciones de compra, licencia y devoluciones en los <a className="link" href="/terminos#plantillas">términos y condiciones</a>.
          </p>
          <a className="btn btn--primary btn--lg page__cta" data-cta href={waLink(`Hola ${BRAND.name}, quiero información de las plantillas para Canva`)} target="_blank" rel="noopener noreferrer">
            <IconWhatsApp size={20} /> Pedir una plantilla por WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
