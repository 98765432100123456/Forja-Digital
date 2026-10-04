import { Breadcrumbs } from '../components/Layout';

const LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/#trabajos', label: 'Trabajos' },
  { href: '/#planes', label: 'Planes y precios' },
  { href: '/#contacto', label: 'Contacto' },
];

export default function NotFound() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Página no encontrada' }]} />
      <section className="section status">
        <div className="container status__inner">
          <p className="status__code" aria-hidden="true">404</p>
          <h1>Esta página no existe</h1>
          <p className="status__lead">El enlace puede estar mal escrito o la página cambió de lugar. Desde aquí puedes seguir:</p>
          <ul className="status__links">
            {LINKS.map((l) => <li key={l.href}><a className="btn btn--secondary" href={l.href}>{l.label}</a></li>)}
          </ul>
        </div>
      </section>
    </>
  );
}
