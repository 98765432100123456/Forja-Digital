import { useEffect, useState, type ReactNode } from 'react';
import { BRAND, waLink } from '../config';
import { initAnalytics } from '../analytics';
import Navbar, { Logo } from './Navbar';
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
      <div className="container footer__grid">
        <div className="footer__brand">
          <Logo inverse />
          <p>{BRAND.tagline}</p>
          <a className="btn btn--primary" href={waLink()} target="_blank" rel="noopener noreferrer">
            <IconWhatsApp size={18} /> {BRAND.whatsappDisplay}
          </a>
        </div>
        <nav className="footer__nav" aria-label="Secciones">
          <h2>Sitio</h2>
          <a href="/#trabajos">Trabajos</a>
          <a href="/#servicios">Servicios</a>
          <a href="/#planes">Planes</a>
          <a href="/#plantillas">Plantillas</a>
        </nav>
        <nav className="footer__nav" aria-label="Ayuda">
          <h2>Ayuda</h2>
          <a href="/#preguntas">Preguntas frecuentes</a>
          <a href="/#contacto">Contacto</a>
          <a href="/privacidad">Política de privacidad</a>
        </nav>
        {(BRAND.facebook || BRAND.instagram) && (
          <div className="footer__nav">
            <h2>Síguenos</h2>
            {BRAND.facebook && <a href={BRAND.facebook} target="_blank" rel="noopener noreferrer"><IconFacebook size={18} /> Facebook</a>}
            {BRAND.instagram && <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer"><IconInstagram size={18} /> Instagram</a>}
          </div>
        )}
      </div>
      <div className="container footer__legal">
        <p>© {YEAR} {BRAND.name}. Hecho en {BRAND.city}.</p>
        <p>Horario de atención: {BRAND.hours.charAt(0).toLowerCase() + BRAND.hours.slice(1)}.</p>
      </div>
    </footer>
  );
}

/** Botón flotante en escritorio y barra fija inferior en celular. */
function StickyContact() {
  // En el inicio, la barra móvil aparece solo cuando el botón principal del hero ya no se ve (evita dos CTAs iguales).
  // También se oculta mientras se ve otro botón principal (simulador, formulario), para no repetir la acción.
  const [heroCtaVisible, setHeroCtaVisible] = useState(false);
  useEffect(() => {
    const els = document.querySelectorAll('[data-hero-cta], [data-cta]');
    if (!els.length || !('IntersectionObserver' in window)) return;
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      setHeroCtaVisible(visible.size > 0);
    });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <aside aria-label="Contacto rápido">
      <a className="wa-float" href={waLink()} target="_blank" rel="noopener noreferrer" aria-label={`Escríbenos por WhatsApp al ${BRAND.whatsappDisplay}`}>
        <IconWhatsApp size={26} />
      </a>
      <div className={`mobile-cta${heroCtaVisible ? ' is-hidden' : ''}`} aria-hidden={heroCtaVisible || undefined}>
        <a className="btn btn--primary btn--block" href={waLink()} target="_blank" rel="noopener noreferrer">
          <IconWhatsApp size={20} /> Cotizar por WhatsApp
        </a>
      </div>
    </aside>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  useEffect(() => {
    initAnalytics();
    // Al llegar desde otra página con un ancla (/#planes), el contenido aún no existía cuando el navegador intentó
    // desplazarse. Lo hacemos ahora que React ya pintó la página.
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'instant' as ScrollBehavior }));
  }, []);
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
