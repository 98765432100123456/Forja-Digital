import { Breadcrumbs } from '../components/Layout';
import { IconArrow } from '../components/Icons';

export default function NotFound() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Página no encontrada' }]} />
      <section className="section page">
        <div className="container container--narrow page__center">
          <p className="page__code" aria-hidden="true">404</p>
          <h1>Esta página <span className="text-accent">no existe.</span></h1>
          <p className="page__lead">Puede que el enlace esté mal escrito o que la página se haya movido. Estos enlaces te pueden servir:</p>
          <div className="page__links">
            <a href="/">Inicio <IconArrow size={16} /></a>
            <a href="/#servicios">Servicios <IconArrow size={16} /></a>
            <a href="/#portafolio">Portafolio <IconArrow size={16} /></a>
            <a href="/#planes">Planes y precios <IconArrow size={16} /></a>
            <a href="/#contacto">Contacto <IconArrow size={16} /></a>
          </div>
        </div>
      </section>
    </>
  );
}
