import { useState, type FormEvent } from 'react';
import { BRAND, waLink } from '../config';
import { track } from '../analytics';
import { REVIEWS, TEAM, teamImg } from '../data';
import { IconWhatsApp } from './Icons';

export const MSG_KEY = 'forja:mensaje';

export function About() {
  const m = TEAM[0];
  const photo = teamImg(m.photo);
  return (
    <section id="equipo" className="section">
      <div className="container about">
        <div className="about__person">
          {photo
            ? <img className="about__photo" src={photo} alt={`Foto de ${m.name}`} width="320" height="320" />
            : <div className="about__photo about__photo--initials" role="img" aria-label={`Iniciales de ${m.name}`}>{m.initials}</div>}
          <div>
            <h2>Quién está detrás</h2>
            <p className="about__name">{m.name} <span>· {m.role}</span></p>
            <p className="about__bio">{m.bio}</p>
          </div>
        </div>

        <div className="about__reviews">
          <h3>Opiniones de clientes</h3>
          {REVIEWS.length > 0 ? (
            REVIEWS.map((r) => (
              <figure key={r.name + r.text.slice(0, 12)} className="review">
                <div className="review__stars" aria-label={`${r.rating} de 5 estrellas`}>{'★'.repeat(r.rating)}<span>{'★'.repeat(5 - r.rating)}</span></div>
                <blockquote>{r.text}</blockquote>
                <figcaption>{r.name}, {r.business}</figcaption>
              </figure>
            ))
          ) : (
            <div className="empty">
              <p>Todavía no hay opiniones publicadas. Solo mostramos las de clientes reales, con su permiso.</p>
              <a className="link" href={waLink(`Hola ${BRAND.name}, quiero dejar mi opinión`)} target="_blank" rel="noopener noreferrer">¿Trabajamos juntos? Deja tu opinión</a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const SERVICE_OPTIONS = ['Página web', 'Diseño para redes', 'Base de datos', 'Seguridad y soporte', 'No estoy seguro, quiero asesoría'];
type Errors = Partial<Record<'nombre' | 'servicio', string>>;

export function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);

  function validate(f: FormData): Errors {
    const e: Errors = {};
    if (String(f.get('nombre') || '').trim().length < 2) e.nombre = 'Escribe tu nombre para saber cómo llamarte.';
    if (!f.get('servicio')) e.servicio = 'Elige qué necesitas. Si no sabes, elige "quiero asesoría".';
    return e;
  }

  function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const f = new FormData(form);
    const found = validate(f);
    setErrors(found);
    if (Object.keys(found).length) {
      form.querySelector<HTMLElement>(found.nombre ? '#f-nombre' : '#f-servicio')?.focus();
      return;
    }
    const clean = (k: string, max = 400) => String(f.get(k) || '').replace(/\s+/g, ' ').trim().slice(0, max);
    const msg =
      `Hola ${BRAND.name}, soy ${clean('nombre', 80)}` +
      (clean('negocio', 80) ? ` de ${clean('negocio', 80)}` : '') +
      `. Me interesa: ${clean('servicio', 60)}.` +
      (clean('mensaje') ? ` ${clean('mensaje')}` : '');

    setSending(true);
    track('generate_lead', { method: 'formulario' });
    try { sessionStorage.setItem(MSG_KEY, msg); } catch { /* sin almacenamiento: /gracias usa el mensaje genérico */ }

    const win = window.open(waLink(msg), '_blank');
    if (win) {
      win.opener = null;
      window.location.href = '/gracias';
    } else {
      // El navegador bloqueó la ventana: abrimos WhatsApp en esta misma pestaña.
      window.location.href = waLink(msg);
    }
  }

  const clearError = (k: keyof Errors) => errors[k] && setErrors((e) => ({ ...e, [k]: undefined }));

  return (
    <section id="contacto" className="section section--alt">
      <div className="container contact">
        <div className="contact__info">
          <h2>Cuéntanos de tu negocio</h2>
          <p>Llena el formulario y se abre WhatsApp con tu mensaje listo para enviar. Te respondemos en menos de {BRAND.responseTime}.</p>
          <dl className="contact__list">
            <div><dt>WhatsApp</dt><dd><a className="link" href={waLink()} target="_blank" rel="noopener noreferrer">{BRAND.whatsappDisplay}</a></dd></div>
            <div><dt>Llamar</dt><dd><a className="link" href={`tel:+${BRAND.whatsappNumber}`}>+57 {BRAND.whatsappDisplay}</a></dd></div>
            {BRAND.email && <div><dt>Correo</dt><dd><a className="link" href={`mailto:${BRAND.email}`}>{BRAND.email}</a></dd></div>}
            <div><dt>Horario</dt><dd>{BRAND.hours}</dd></div>
            <div><dt>Dónde</dt><dd>{BRAND.address || BRAND.serviceArea}</dd></div>
          </dl>
          {BRAND.mapEmbedUrl && (
            <iframe className="contact__map" title={`Mapa de ubicación de ${BRAND.name}`} src={BRAND.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          )}
        </div>

        <form className="form" onSubmit={onSubmit} noValidate>
          <div className="field">
            <label htmlFor="f-nombre">Tu nombre</label>
            <input id="f-nombre" name="nombre" maxLength={80} autoComplete="name"
              aria-invalid={!!errors.nombre} aria-describedby={errors.nombre ? 'e-nombre' : undefined} onInput={() => clearError('nombre')} />
            {errors.nombre && <p className="field__error" id="e-nombre">{errors.nombre}</p>}
          </div>
          <div className="field">
            <label htmlFor="f-negocio">Nombre de tu negocio <span>opcional</span></label>
            <input id="f-negocio" name="negocio" maxLength={80} autoComplete="organization" />
          </div>
          <div className="field">
            <label htmlFor="f-servicio">¿Qué necesitas?</label>
            <select id="f-servicio" name="servicio" defaultValue=""
              aria-invalid={!!errors.servicio} aria-describedby={errors.servicio ? 'e-servicio' : undefined} onChange={() => clearError('servicio')}>
              <option value="" disabled>Elige una opción</option>
              {SERVICE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </select>
            {errors.servicio && <p className="field__error" id="e-servicio">{errors.servicio}</p>}
          </div>
          <div className="field">
            <label htmlFor="f-mensaje">Cuéntanos un poco más <span>opcional</span></label>
            <textarea id="f-mensaje" name="mensaje" rows={4} maxLength={400} placeholder="Por ejemplo: tengo un restaurante y quiero recibir pedidos por WhatsApp." />
          </div>
          <button data-cta className="btn btn--primary btn--block btn--lg" type="submit" disabled={sending} aria-live="polite">
            <IconWhatsApp size={20} /> {sending ? 'Abriendo WhatsApp…' : 'Enviar por WhatsApp'}
          </button>
          <p className="form__note">
            El mensaje va directo a nuestro WhatsApp; no se guarda en ningún servidor. Al enviarlo, autorizas que usemos estos datos
            para responderte, según la <a className="link" href="/privacidad">política de privacidad</a>.
          </p>
        </form>
      </div>
    </section>
  );
}
