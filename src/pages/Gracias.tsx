import { BRAND, waLink } from '../config';
import { Breadcrumbs } from '../components/Layout';
import { IconCheck, IconWhatsApp } from '../components/Icons';

export default function Gracias() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Gracias' }]} />
      <section className="section page">
        <div className="container container--narrow page__center">
          <div className="page__icon"><IconCheck size={40} /></div>
          <h1>¡Gracias por <span className="text-accent">escribirnos!</span></h1>
          <p className="page__lead">
            Se abrió WhatsApp con tu mensaje listo. Solo toca <strong>enviar</strong> y te respondemos en menos de {BRAND.responseTime}.
          </p>
          <div className="page__actions">
            <a className="btn btn--primary" href={waLink()} target="_blank" rel="noopener noreferrer">
              <IconWhatsApp size={20} /> No se abrió WhatsApp
            </a>
            <a className="btn btn--ghost" href="/">Volver al inicio</a>
          </div>
          <p className="page__more">Mientras tanto, mira el <a href="/#portafolio">portafolio</a>, los <a href="/#casos">casos</a> o las <a href="/#plantillas">plantillas listas</a>.</p>
        </div>
      </section>
    </>
  );
}
