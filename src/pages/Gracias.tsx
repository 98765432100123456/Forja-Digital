import { useSyncExternalStore } from 'react';
import { BRAND, waLink } from '../config';
import { Breadcrumbs } from '../components/Layout';
import { MSG_KEY } from '../components/Extra';
import { IconCheck, IconWhatsApp } from '../components/Icons';

const noop = () => () => {};

function savedMessage() {
  try { return sessionStorage.getItem(MSG_KEY) || undefined; } catch { return undefined; }
}

export default function Gracias() {
  // En el servidor (prerenderizado) no hay mensaje; en el navegador se lee de sessionStorage sin romper la hidratación.
  const msg = useSyncExternalStore(noop, savedMessage, () => undefined);
  return (
    <>
      <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Gracias' }]} />
      <section className="section status">
        <div className="container status__inner">
          <div className="status__icon status__icon--ok" aria-hidden="true"><IconCheck size={32} /></div>
          <h1>Abrimos WhatsApp con tu mensaje</h1>
          <p className="status__lead">
            Solo falta tocar <strong>enviar</strong> en WhatsApp. Te respondemos en menos de {BRAND.responseTime}.
          </p>
          <div className="status__actions">
            <a className="btn btn--primary btn--lg" href={waLink(msg)} target="_blank" rel="noopener noreferrer">
              <IconWhatsApp size={20} /> Abrir WhatsApp de nuevo
            </a>
            <a className="btn btn--secondary btn--lg" href="/">Volver al inicio</a>
          </div>
          <p className="status__more">
            Mientras tanto puedes ver los <a className="link" href="/#trabajos">trabajos</a> o las <a className="link" href="/#plantillas">plantillas listas</a>.
          </p>
        </div>
      </section>
    </>
  );
}
