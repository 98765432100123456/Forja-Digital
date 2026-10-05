import { useEffect, useState, type ReactNode } from 'react';
import { BRAND, waLink } from '../config';
import { initAnalytics } from '../analytics';
import Navbar, { Logo } from './Navbar';
import { IconFacebook, IconInstagram, IconWhatsApp } from './Icons';
import CookieBanner, { CookieSettingsLink } from './CookieBanner';

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
          <a href="/apps">Apps y micro apps</a>
          <a href="/plantillas-canva">Plantillas para Canva</a>
        </nav>
        <nav className="footer__nav" aria-label="Ayuda">
          <h2>Ayuda</h2>
          <a href="/#preguntas">Preguntas frecuentes</a>
          <a href="/#contacto">Contacto</a>
        </nav>
        <nav className="footer__nav" aria-label="Legal">
          <h2>Legal</h2>
          <a href="/privacidad">Política de privacidad</a>
          <a href="/terminos">Términos y condiciones</a>
          <a href="/reembolsos">Cancelaciones y reembolsos</a>
          <a href="/cookies">Política de cookies</a>
          <CookieSettingsLink />
        </nav>
        {(BRAND.facebook || BRAND.instagram) && (
          <div className="footer__nav">
            <h2>Síguenos</h2>
            {BRAND.facebook && <a href={BRAND.facebook} target="_blank" rel="noopener noreferrer"><IconFacebook size={18} /> Facebook</a>}
            {BRAND.instagram && <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer"><IconInstagram size={18} /> Instagram</a>}
          </div>
        )}
      </div>
      <ol className="container footer__notes">
        <li>Precios de referencia en pesos colombianos; no se cobra IVA. El precio final queda por escrito en la propuesta. Los tiempos de entrega cuentan desde que recibimos el anticipo y tus contenidos.</li>
        <li>Las pantallas, páginas y piezas que ves en este sitio son ejemplos ilustrativos con datos de muestra, no trabajos de clientes reales.</li>
      </ol>
      <div className="container footer__legal">
        <p>
          © {YEAR} {BRAND.name} · {BRAND.legalOwner} · {BRAND.domicile}
          {BRAND.nit && <> · NIT {BRAND.nit}</>} · {BRAND.email} · +57 {BRAND.whatsappDisplay}
        </p>
        <p>Horario de atención: {(BRAND.hours.charAt(0).toLowerCase() + BRAND.hours.slice(1)).replace(/\.$/, '')}.</p>
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
    // El hash viene de la URL: es entrada no confiable. Un "%" mal formado hacía fallar decodeURIComponent y dejaba la
    // página en blanco (H1 en docs/memoria/seguridad.md). Solo se usa para buscar un id; nunca se inserta en el DOM.
    let id = '';
    try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { id = ''; }
    if (id) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'instant' as ScrollBehavior }));
  }, []);
  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <Navbar />
      <main id="contenido">{children}</main>
      <Footer />
      <StickyContact />
      <CookieBanner />
    </>
  );
}
