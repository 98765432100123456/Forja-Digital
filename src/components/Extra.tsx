import { useState, type FormEvent } from 'react';
import { BRAND, waLink } from '../config';
import { track } from '../analytics';
import { CASES, REVIEWS, TEAM, img, teamImg } from '../data';
import { IconCheck, IconWhatsApp } from './Icons';

function Head({ kicker, title, accent, lead }: { kicker: string; title: string; accent?: string; lead?: string }) {
  return (
    <div className="section-head">
      <p className="kicker">{kicker}</p>
      <h2>{title} {accent && <span className="text-accent">{accent}</span>}</h2>
      {lead && <p className="section-head__lead">{lead}</p>}
    </div>
  );
}

export function Cases() {
  return (
    <section id="casos" className="section section--alt">
      <div className="container">
        <Head kicker="Casos" title="Así resolvemos" accent="problemas reales." lead="Proyectos que muestran cómo trabajamos: el reto, lo que hicimos y lo que se entregó." />
        <div className="cases">
          {CASES.map((c) => (
            <article key={c.title} className="card case">
              <div className="case__img"><img src={img(c.image)} alt={`Ejemplo del proyecto: ${c.title}`} loading="lazy" /></div>
              <div className="case__body">
                <div className="case__meta">
                  <span className="tag">{c.niche}</span>
                  {c.demo && <span className="tag tag--muted">Proyecto demostrativo</span>}
                </div>
                <h3>{c.title}</h3>
                <dl>
                  <dt>Reto</dt><dd>{c.challenge}</dd>
                  <dt>Qué hicimos</dt><dd>{c.solution}</dd>
                  {c.result && (<><dt>Resultado</dt><dd>{c.result}</dd></>)}
                </dl>
                <ul>{c.deliverables.map((d) => <li key={d}><IconCheck size={14} /> {d}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Reviews() {
  return (
    <section id="resenas" className="section">
      <div className="container">
        <Head kicker="Reseñas" title="Lo que dicen" accent="nuestros clientes." />
        {REVIEWS.length > 0 ? (
          <div className="reviews">
            {REVIEWS.map((r) => (
              <figure key={r.name + r.text.slice(0, 10)} className="card review">
                <div className="review__stars" aria-label={`${r.rating} de 5 estrellas`}>{'★'.repeat(r.rating)}<span>{'★'.repeat(5 - r.rating)}</span></div>
                <blockquote>“{r.text}”</blockquote>
                <figcaption><strong>{r.name}</strong> · {r.business}</figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="card reviews-empty">
            <p>Estamos empezando y solo publicamos <strong>reseñas reales</strong> de clientes, con su permiso.</p>
            <p>¿Ya trabajaste con nosotros? Tu opinión nos ayuda muchísimo.</p>
            <a className="btn btn--ghost" href={waLink(`Hola ${BRAND.name}, quiero dejar una reseña`)} target="_blank" rel="noopener noreferrer">Dejar mi reseña</a>
          </div>
        )}
      </div>
    </section>
  );
}

export function Team() {
  return (
    <section id="equipo" className="section section--alt">
      <div className="container">
        <Head kicker="Equipo" title="Una persona real" accent="detrás de cada proyecto." lead="Sin call center ni intermediarios: hablas directamente con quien diseña y programa tu proyecto." />
        <div className="team">
          {TEAM.map((m) => {
            const photo = teamImg(m.photo);
            return (
              <article key={m.name} className="card member">
                {photo
                  ? <img className="member__photo" src={photo} alt={`Foto de ${m.name}, ${m.role}`} />
                  : <div className="member__photo member__photo--initials" role="img" aria-label={`Iniciales de ${m.name}`}>{m.initials}</div>}
                <div>
                  <h3>{m.name}</h3>
                  <p className="member__role">{m.role}</p>
                  <p>{m.bio}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const SERVICES_OPTIONS = ['Página web', 'Plantillas / diseño para redes', 'Base de datos', 'Seguridad y soporte', 'No estoy seguro, quiero asesoría'];

export function Contact() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const clean = (k: string, max = 400) => String(f.get(k) || '').replace(/\s+/g, ' ').trim().slice(0, max);
    const msg =
      `Hola ${BRAND.name}, soy ${clean('nombre', 80)}` +
      (clean('negocio', 80) ? ` de ${clean('negocio', 80)}` : '') +
      `. Me interesa: ${clean('servicio', 60)}.` +
      (clean('mensaje') ? ` ${clean('mensaje')}` : '');
    track('generate_lead', { method: 'formulario' });
    window.open(waLink(msg), '_blank', 'noopener,noreferrer');
    setSent(true);
    window.location.href = '/gracias';
  }

  return (
    <section id="contacto" className="section">
      <div className="container contact">
        <div className="contact__info">
          <Head kicker="Contacto" title="Cuéntanos de" accent="tu negocio." lead={`Llena el formulario y se abrirá WhatsApp con tu mensaje listo. Te respondemos en menos de ${BRAND.responseTime}.`} />
          <ul className="contact__list">
            <li><strong>WhatsApp:</strong> <a href={waLink()} target="_blank" rel="noopener noreferrer">{BRAND.whatsappDisplay}</a></li>
            <li><strong>Horario:</strong> {BRAND.hours}</li>
            <li><strong>Zona:</strong> {BRAND.serviceArea}</li>
            {BRAND.address && <li><strong>Dirección:</strong> {BRAND.address}</li>}
          </ul>
          {BRAND.mapEmbedUrl && (
            <iframe className="contact__map" title={`Mapa de ubicación de ${BRAND.name}`} src={BRAND.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          )}
        </div>

        <form className="card form" onSubmit={onSubmit}>
          <label><span className="form__label">Tu nombre</span><input name="nombre" required maxLength={80} autoComplete="name" /></label>
          <label><span className="form__label">Nombre de tu negocio <small>(opcional)</small></span><input name="negocio" maxLength={80} autoComplete="organization" /></label>
          <label><span className="form__label">¿Qué necesitas?</span>
            <select name="servicio" required defaultValue="">
              <option value="" disabled>Elige una opción</option>
              {SERVICES_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </select>
          </label>
          <label><span className="form__label">Cuéntanos un poco más <small>(opcional)</small></span><textarea name="mensaje" rows={4} maxLength={400} /></label>
          <button className="btn btn--primary btn--block" type="submit" disabled={sent}>
            <IconWhatsApp size={20} /> Enviar por WhatsApp
          </button>
          <p className="form__note">No guardamos tus datos en ningún servidor: el mensaje se envía directamente a nuestro WhatsApp. Ver <a href="/privacidad">política de privacidad</a>.</p>
        </form>
      </div>
    </section>
  );
}
