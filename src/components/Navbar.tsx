import { useEffect, useRef, useState } from 'react';
import { BRAND, waLink } from '../config';
import { IconMenu, IconWhatsApp, IconX } from './Icons';

const LINKS = [
  { href: '/#trabajos', label: 'Trabajos' },
  { href: '/#servicios', label: 'Servicios' },
  { href: '/#planes', label: 'Planes' },
  { href: '/#plantillas', label: 'Plantillas' },
  { href: '/#preguntas', label: 'Preguntas' },
];

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <a href="/" className={`logo${inverse ? ' logo--inverse' : ''}`} aria-label={`${BRAND.name}, inicio`}>
      <svg className="logo__mark" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="8" />
        <path d="M11 8h11v4h-6.5v3H21v4h-5.5v5H11z" />
      </svg>
      <span>Forja Digital</span>
    </a>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cerrar con Escape o al tocar fuera del menú
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); toggleRef.current?.focus(); }
    };
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !toggleRef.current?.contains(t)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onDown); };
  }, [open]);

  return (
    <header className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <Logo />

        <nav id="menu-principal" ref={panelRef} className={`nav__links${open ? ' is-open' : ''}`} aria-label="Principal">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <a className="btn btn--primary btn--sm nav__cta" href={waLink()} target="_blank" rel="noopener noreferrer">
            <IconWhatsApp size={18} /> Cotizar
          </a>
        </nav>

        <button
          ref={toggleRef}
          className="nav__toggle"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="menu-principal"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <IconX /> : <IconMenu />}
        </button>
      </div>
    </header>
  );
}
