import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { WORKS, img, type Piece } from '../data';
import { IconCheck, IconX } from './Icons';

const Chevron = ({ dir }: { dir: 'left' | 'right' }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={dir === 'left' ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'} />
  </svg>
);

export default function Works() {
  const [active, setActive] = useState(0);
  const [viewer, setViewer] = useState<number | null>(null);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const work = WORKS[active];
  const pieces: Piece[] = work.pieces;

  // Pestañas accesibles: flechas, Inicio y Fin mueven entre pestañas
  function onTabKey(e: KeyboardEvent<HTMLButtonElement>) {
    const last = WORKS.length - 1;
    const next = { ArrowRight: active === last ? 0 : active + 1, ArrowLeft: active === 0 ? last : active - 1, Home: 0, End: last }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    setActive(next);
    tabsRef.current[next]?.focus();
  }

  // Visor de imágenes
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (viewer !== null && !d.open) d.showModal();
    if (viewer === null && d.open) d.close();
  }, [viewer]);

  const step = useCallback((delta: number) => {
    setViewer((v) => (v === null ? v : (v + delta + pieces.length) % pieces.length));
  }, [pieces.length]);

  function onViewerKey(e: KeyboardEvent<HTMLDialogElement>) {
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  }

  const current = viewer !== null ? pieces[viewer] : null;

  return (
    <section id="trabajos" className="section works">
      <div className="container">
        <header className="section__head">
          <h2>Trabajos</h2>
          <p>Elige un tipo de negocio para ver el reto, lo que hicimos y las piezas que se entregaron.</p>
        </header>

        <div className="tabs" role="tablist" aria-label="Tipo de negocio">
          {WORKS.map((w, i) => (
            <button
              key={w.id}
              ref={(el) => { tabsRef.current[i] = el; }}
              role="tab"
              id={`tab-${w.id}`}
              aria-selected={i === active}
              aria-controls={`panel-${w.id}`}
              tabIndex={i === active ? 0 : -1}
              className="tab"
              onClick={() => setActive(i)}
              onKeyDown={onTabKey}
            >
              {w.label}
            </button>
          ))}
        </div>

        <div className="works__panel" role="tabpanel" id={`panel-${work.id}`} aria-labelledby={`tab-${work.id}`} key={work.id}>
          <div className="case">
            {work.demo && <p className="case__flag">Proyecto demostrativo</p>}
            <h3>{work.title}</h3>
            <dl>
              <div><dt>El reto</dt><dd>{work.challenge}</dd></div>
              <div><dt>Lo que hicimos</dt><dd>{work.solution}</dd></div>
              {work.result && <div><dt>Resultado</dt><dd>{work.result}</dd></div>}
            </dl>
            <ul className="checks">
              {work.deliverables.map((d) => <li key={d}><IconCheck size={16} /> {d}</li>)}
            </ul>
          </div>

          <div className="pieces">
            {pieces.map((p, i) => (
              <button key={p.file} className={`piece-thumb${p.tall ? ' is-tall' : ''}`} onClick={() => setViewer(i)} aria-label={`Ampliar: ${p.title}`}>
                <img src={img(p.file)} alt={p.title} width="720" height={p.tall ? 1280 : 720} loading="lazy" decoding="async" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="viewer"
        aria-label="Visor de piezas"
        onClose={() => setViewer(null)}
        onKeyDown={onViewerKey}
        onClick={(e) => e.target === e.currentTarget && setViewer(null)}
      >
        {current && (
          <figure className="viewer__figure">
            <img src={img(current.file)} alt={current.title} />
            <figcaption>
              <span>{current.title}</span>
              <span className="viewer__count">{(viewer ?? 0) + 1} de {pieces.length}</span>
            </figcaption>
            <div className="viewer__controls">
              <button className="icon-btn" onClick={() => step(-1)} aria-label="Pieza anterior"><Chevron dir="left" /></button>
              <button className="icon-btn" onClick={() => step(1)} aria-label="Pieza siguiente"><Chevron dir="right" /></button>
              <button className="icon-btn" onClick={() => setViewer(null)} aria-label="Cerrar"><IconX size={22} /></button>
            </div>
          </figure>
        )}
      </dialog>
    </section>
  );
}
