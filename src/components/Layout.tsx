import { useEffect, type ReactNode } from 'react';
import { BRAND, waLink } from '../config';
import { initAnalytics } from '../analytics';
import Navbar from './Navbar';
import { IconFacebook, IconInstagram, IconWhatsApp } from './Icons';

const YEAR = new Date().getFullYear();

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="breadcrumbs container" aria-label="Ruta de navegación">
      <ol>
        {items.map((it, i) => (
          <li key={it.label}>
            {it.href && i < items.length - 1 ? <a href={it.href}>{it.label}</a> : <span aria-current="page">{it.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <a href="/" className="logo"><span className="logo__mark" aria-hidden="true">F</span><span>Forja<span className="logo__accent">Digital</span></span></a>
          <p>{BRAND.tagline} Hecho en {BRAND.city}.</p>
          <p>Respondemos en menos de {BRAND.responseTime}.</p>
        </div>
        <nav className="footer__nav" aria-label="Pie de página">
          <p className="footer__title">Sitio</p>
          <a href="/#servicios">Servicios</a>
          <a href="/#portafolio">Portafolio</a>
          <a href="/#casos">Casos</a>
          <a href="/#planes">Planes</a>
          <a href="/#plantillas">Plantillas</a>
        </nav>
        <nav className="footer__nav" aria-label="Ayuda">
          <p className="footer__title">Ayuda</p>
          <a href="/#preguntas">Preguntas frecuentes</a>
          <a href="/#contacto">Contacto</a>
          <a href="/privacidad">Política de privacidad</a>
        </nav>
        <div className="footer__social">
          <a href={BRAND.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><IconFacebook /></a>
          <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><IconInstagram /></a>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><IconWhatsApp /></a>
        </div>
      </div>
      <p className="container footer__legal">
        © {YEAR} {BRAND.name}. Todos los derechos reservados. · <a href="/privacidad">Privacidad</a>
      </p>
    </footer>
  );
}

/** Botón flotante en escritorio + barra fija inferior en celular. */
function StickyContact() {
  return (
    <>
      <a className="wa-float" href={waLink()} target="_blank" rel="noopener noreferrer" aria-label={`Escríbenos por WhatsApp al ${BRAND.whatsappDisplay}`}>
        <IconWhatsApp size={28} />
      </a>
      <div className="mobile-cta">
        <a className="btn btn--primary btn--block" href={waLink()} target="_blank" rel="noopener noreferrer">
          <IconWhatsApp size={20} /> Cotiza gratis por WhatsApp
        </a>
        <span>Respuesta en menos de {BRAND.responseTime}</span>
      </div>
    </>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  useEffect(() => { initAnalytics(); }, []);
  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <Navbar />
      <main id="contenido">{children}</main>
      <Footer />
      <StickyContact />
    </>
  );
}
