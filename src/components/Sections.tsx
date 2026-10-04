import { useEffect, useRef, useState } from 'react';
import { BRAND, waLink } from '../config';
import { FAQ, KITS, NICHES, PLANS, PORTFOLIO, PROCESS, SERVICES, VS, img, kitImg, type Niche } from '../data';
import {
  IconArrow, IconCheck, IconCode, IconDatabase,
  IconPalette, IconShield, IconSpark, IconWhatsApp, IconX,
} from './Icons';

const SERVICE_ICONS = { palette: IconPalette, code: IconCode, database: IconDatabase, shield: IconShield };

function SectionHead({ kicker, title, accent, lead }: { kicker: string; title: string; accent?: string; lead?: string }) {
  return (
    <div className="section-head">
      <p className="kicker">{kicker}</p>
      <h2>{title} {accent && <span className="text-accent">{accent}</span>}</h2>
      {lead && <p className="section-head__lead">{lead}</p>}
    </div>
  );
}

export function Services() {
  return (
    <section id="servicios" className="section">
      <div className="container">
        <SectionHead kicker="Lo que hacemos" title="Todo lo que tu negocio necesita" accent="para verse y funcionar bien." />
        <div className="services">
          {SERVICES.map((s) => {
            const Icon = SERVICE_ICONS[s.icon];
            return (
              <article key={s.title} className="card service">
                <div className="service__icon"><Icon size={28} /></div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <ul>
                  {s.points.map((p) => <li key={p}><IconCheck size={16} /> {p}</li>)}
                </ul>
              </article>
            );
          })}
        </div>
        <p className="note">¿Quieres ver ejemplos? Mira el <a href="#portafolio">portafolio</a>, los <a href="#casos">casos</a> o compara los <a href="#planes">planes y precios</a>.</p>
      </div>
    </section>
  );
}

export function VsAI() {
  return (
    <section className="section section--alt">
      <div className="container">
        <SectionHead
          kicker="¿Por qué no solo IA?"
          title="Lo que la IA sola"
          accent="no te entrega."
          lead="Usamos tecnología a nuestro favor, pero lo que vendes es tu negocio, y eso necesita a alguien que lo entienda."
        />
        <div className="vs">
          <div className="vs__col vs__col--ai">
            <p className="vs__label"><IconSpark size={18} /> Diseño genérico con IA</p>
            <ul>{VS.ai.map((t) => <li key={t}><IconX size={18} /> {t}</li>)}</ul>
          </div>
          <div className="vs__col vs__col--us">
            <p className="vs__label">Hecho con {BRAND.name}</p>
            <ul>{VS.us.map((t) => <li key={t}><IconCheck size={18} /> {t}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Portfolio() {
  const [filter, setFilter] = useState<Niche | 'todos'>('todos');
  const [active, setActive] = useState<(typeof PORTFOLIO)[number] | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const items = filter === 'todos' ? PORTFOLIO : PORTFOLIO.filter((p) => p.niche === filter);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (active && !d.open) d.showModal();
    if (!active && d.open) d.close();
  }, [active]);

  return (
    <section id="portafolio" className="section">
      <div className="container">
        <SectionHead kicker="Portafolio" title="Diseños reales," accent="no imágenes de stock." lead="Una muestra de los kits que hemos creado para distintos tipos de negocio." />
        <div className="filters" role="group" aria-label="Filtrar por tipo de negocio">
          {NICHES.map((n) => (
            <button key={n.id} className={`chip ${filter === n.id ? 'is-active' : ''}`} aria-pressed={filter === n.id} onClick={() => setFilter(n.id)}>
              {n.label}
            </button>
          ))}
        </div>
        <div className="gallery">
          {items.map((p) => (
            <button key={p.file} className="gallery__item" onClick={() => setActive(p)} aria-label={`Ampliar: ${p.title}`}>
              <img src={img(p.file)} alt={p.title} loading="lazy" />
              <span className="gallery__caption">{p.title}</span>
            </button>
          ))}
        </div>
        <p className="note">¿Te gusta algún estilo? Lo puedes comprar listo en la <a href="#plantillas">tienda de plantillas</a> o pedir uno a tu medida en los <a href="#planes">planes</a>.</p>
      </div>

      <dialog ref={dialogRef} className="lightbox" onClose={() => setActive(null)} onClick={(e) => e.target === e.currentTarget && setActive(null)}>
        {active && (
          <figure>
            <img src={img(active.file)} alt={active.title} />
            <figcaption>{active.title}</figcaption>
            <button className="lightbox__close" onClick={() => setActive(null)} aria-label="Cerrar"><IconX /></button>
          </figure>
        )}
      </dialog>
    </section>
  );
}

export function Process() {
  return (
    <section className="section section--alt">
      <div className="container">
        <SectionHead kicker="Cómo trabajamos" title="Simple, claro" accent="y contigo en cada paso." />
        <ol className="process">
          {PROCESS.map((p) => (
            <li key={p.n} className="process__step">
              <span className="process__n">{p.n}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Pricing() {
  return (
    <section id="planes" className="section">
      <div className="container">
        <SectionHead kicker="Planes" title="Precios justos," accent="sin sorpresas." lead="Valores de referencia en pesos colombianos. Dominio y hosting se pagan aparte, a tu nombre." />
        <div className="plans">
          {PLANS.map((p) => (
            <article key={p.name} className={`card plan ${p.featured ? 'plan--featured' : ''}`}>
              {p.featured && <span className="plan__badge">Más pedido</span>}
              <h3>{p.name}</h3>
              <p className="plan__price">
                <small>desde</small>
                <span>{p.price.replace('desde ', '').replace('/mes', '')}{p.price.endsWith('/mes') && <em>/mes</em>}</span>
              </p>
              <p className="plan__desc">{p.desc}</p>
              <ul>{p.features.map((f) => <li key={f}><IconCheck size={16} /> {f}</li>)}</ul>
              <a className={`btn ${p.featured ? 'btn--primary' : 'btn--ghost'} btn--block`} href={waLink(`Hola ${BRAND.name}, me interesa el plan ${p.name}`)} target="_blank" rel="noopener noreferrer">
                Lo quiero <IconArrow size={18} />
              </a>
            </article>
          ))}
        </div>
        <p className="note">¿Necesitas algo distinto, como un sistema a la medida o una base de datos para tu negocio? <a href={waLink(`Hola ${BRAND.name}, necesito un proyecto a la medida`)} target="_blank" rel="noopener noreferrer">Cuéntanos y lo cotizamos.</a></p>
      </div>
    </section>
  );
}

export function Templates() {
  return (
    <section id="plantillas" className="section section--alt">
      <div className="container">
        <SectionHead kicker="Tienda" title="Plantillas listas" accent="para usar hoy." lead="Kits de 10 diseños editables en Canva: 6 posts y 4 historias. Disponibles en español e inglés." />
        <div className="kits">
          {KITS.map((k) => (
            <article key={k.id} className="card kit">
              <img src={kitImg(k.id)} alt={`Vista previa del ${k.title.toLowerCase()}`} loading="lazy" />
              <div className="kit__body">
                <h3>{k.title}</h3>
                <p>{k.text}</p>
                <a className="btn btn--ghost btn--sm" href={waLink(`Hola ${BRAND.name}, quiero el ${k.title}`)} target="_blank" rel="noopener noreferrer">
                  Pedir precio <IconArrow size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="preguntas" className="section">
      <div className="container container--narrow">
        <SectionHead kicker="Preguntas frecuentes" title="Lo que todos" accent="nos preguntan." />
        <div className="faq">
          {FAQ.map((f) => (
            <details key={f.q} className="faq__item">
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="section">
      <div className="container">
        <div className="cta">
          <div className="glow glow--accent cta__glow" aria-hidden="true" />
          <h2>Tu negocio merece <span className="text-accent">algo único.</span></h2>
          <p>Escríbenos y en menos de {BRAND.responseTime} te respondemos con ideas para tu negocio. La cotización es gratis.</p>
          <a className="btn btn--primary btn--lg" href={waLink()} target="_blank" rel="noopener noreferrer">
            <IconWhatsApp size={22} /> WhatsApp {BRAND.whatsappDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
