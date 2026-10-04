import { useEffect, useState } from 'react';
import { BRAND, waLink } from '../config';
import { IconMenu, IconWhatsApp, IconX } from './Icons';

const LINKS = [
  { href: '/#servicios', label: 'Servicios' },
  { href: '/#portafolio', label: 'Portafolio' },
  { href: '/#planes', label: 'Planes' },
  { href: '/#plantillas', label: 'Plantillas' },
  { href: '/#casos', label: 'Casos' },
  { href: '/#contacto', label: 'Contacto' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? 'nav--solid' : ''}`}>
      <div className="container nav__inner">
        <a href="/" className="logo" aria-label={`${BRAND.name}, ir al inicio`}>
          <span className="logo__mark" aria-hidden="true">F</span>
          <span>Forja<span className="logo__accent">Digital</span></span>
        </a>

        <nav className={`nav__links ${open ? 'is-open' : ''}`} aria-label="Principal">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <a className="btn btn--primary btn--sm nav__cta" href={waLink()} target="_blank" rel="noopener noreferrer">
            <IconWhatsApp size={18} /> Cotiza gratis
          </a>
        </nav>

        <button
          className="nav__toggle"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <IconX /> : <IconMenu />}
        </button>
      </div>
    </header>
  );
}
