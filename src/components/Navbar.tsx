import { useEffect, useRef, useState } from 'react';
import { BRAND, waLink } from '../config';
import { IconMenu, IconWhatsApp, IconX } from './Icons';

const LINKS = [
  { href: '/#trabajos', label: 'Trabajos' },
  { href: '/#simulador', label: 'Pruébalo' },
  { href: '/#servicios', label: 'Servicios' },
  { href: '/apps', label: 'Apps' },
  { href: '/#planes', label: 'Planes' },
  { href: '/plantillas-canva', label: 'Plantillas' },
];

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <a href="/" className={`logo${inverse ? ' logo--inverse' : ''}`} aria-label={`${BRAND.name}, inicio`}>
      <svg className="logo__mark" viewBox="0 0 32 32" aria-hidden="true">
        {/* Martillo en el momento del golpe, con tres chispas (opción C, elegida por Juanes) */}
        <rect className="logo__fondo" width="32" height="32" rx="8" />
        <g transform="translate(3.2 3.2) scale(.8)">
          <g className="logo__martillo" transform="translate(3 -1) rotate(-40 16 16)">
            <rect x="6" y="5" width="20" height="8" rx="1.5" />
            <rect x="13.5" y="13" width="5" height="16" rx="1" />
          </g>
          <path className="logo__chispas" d="M4.5 19.5L2 21.5M7 21.2L6.4 24.6M10 20.6L11.8 23.4" />
        </g>
      </svg>
      <span>Forja Digital</span>
    </a>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Estado activo del menú: la página actual o la sección que se está viendo en el inicio
  useEffect(() => {
    const path = location.pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/';
    if (path !== '/') {
      const match = LINKS.find((l) => l.href === path);
      if (match) queueMicrotask(() => setActive(match.href));
      return;
    }
    const targets = LINKS.filter((l) => l.href.startsWith('/#'))
      .map((l) => document.getElementById(l.href.slice(2)))
      .filter((el): el is HTMLElement => !!el);
    const hero = document.getElementById('inicio');
    if (hero) targets.push(hero);
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) setActive(e.target.id === 'inicio' ? '' : '/#' + e.target.id);
    }, { rootMargin: '-45% 0px -50% 0px' });
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
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
            <a
              key={l.href}
              href={l.href}
              className={active === l.href ? 'is-active' : undefined}
              aria-current={active === l.href ? (l.href.startsWith('/#') ? 'location' : 'page') : undefined}
              onClick={() => setOpen(false)}
            >{l.label}</a>
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
