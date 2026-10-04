import { useId, useRef, useState, type CSSProperties } from 'react';
import { track } from '../analytics';
import { BRAND, waLink } from '../config';
import { IconWhatsApp } from './Icons';

type Kind = 'belleza' | 'restaurante' | 'inmobiliaria' | 'tienda';

const KINDS: Record<Kind, { label: string; example: string; headline: string; action: string; post: string; postNote: string; serif: boolean }> = {
  belleza: { label: 'Salón de belleza', example: 'Studio Bella', headline: 'El detalle que te mereces', action: 'Reservar cita', post: 'Agenda abierta esta semana', postNote: 'Uñas, pestañas y cejas', serif: true },
  restaurante: { label: 'Restaurante', example: 'La Cocina de Casa', headline: 'Almuerzos caseros todos los días', action: 'Ver el menú', post: 'Menú del día', postNote: 'Sopa, plato fuerte y jugo natural', serif: false },
  inmobiliaria: { label: 'Inmobiliaria', example: 'Hogar Ideal', headline: 'Tu próximo hogar empieza aquí', action: 'Ver inmuebles', post: 'Apartamento en venta', postNote: '3 habitaciones, 2 baños', serif: true },
  tienda: { label: 'Tienda online', example: 'Tu Marca', headline: 'Hecho a mano, enviado a todo el país', action: 'Comprar ahora', post: 'Nueva colección', postNote: 'Disponible desde hoy', serif: false },
};

const PALETTES = [
  { id: 'vino', label: 'Vino', bg: '#F6E4E1', ink: '#5A2338', accent: '#D9A441' },
  { id: 'bosque', label: 'Bosque', bg: '#E7EEEA', ink: '#173B34', accent: '#C9A66B' },
  { id: 'oceano', label: 'Océano', bg: '#E6EEF6', ink: '#14365C', accent: '#F2A541' },
  { id: 'carbon', label: 'Carbón', bg: '#FBEBD9', ink: '#1E1A17', accent: '#F2B233' },
  { id: 'lavanda', label: 'Lavanda', bg: '#EFECFF', ink: '#1B1640', accent: '#B9E43F' },
] as const;

const clean = (s: string) => s.replace(/\s+/g, ' ').trimStart().slice(0, 28);
const initials = (s: string) => s.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? '').join('') || 'TU';
const handle = (s: string) => '@' + (s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '') || 'tunegocio');

export default function Simulator() {
  const uid = useId();
  const [kind, setKind] = useState<Kind>('belleza');
  const [name, setName] = useState('');
  const [paletteId, setPaletteId] = useState<(typeof PALETTES)[number]['id']>('vino');

  // Medición del embudo: inicio (primera interacción) → nombre escrito → clic en cotizar.
  const sent = useRef<Set<string>>(new Set());
  const once = (event: string, params: Record<string, unknown> = {}) => {
    if (sent.current.has(event)) return;
    sent.current.add(event);
    track(event, params);
  };

  const k = KINDS[kind];
  const p = PALETTES.find((x) => x.id === paletteId)!;
  const shown = name.trim() || k.example;
  const font = k.serif ? 'Georgia, "Times New Roman", serif' : 'var(--f-display)';
  const vars = { '--p-bg': p.bg, '--p-ink': p.ink, '--p-accent': p.accent, '--p-font': font } as CSSProperties;

  const message =
    `Hola ${BRAND.name}, probé el simulador: ${k.label.toLowerCase()}` +
    (name.trim() ? ` llamado "${name.trim()}"` : '') +
    `, color ${p.label.toLowerCase()}. Quiero algo así para mi negocio.`;

  return (
    <section id="simulador" className="section section--alt simulator" aria-labelledby={`${uid}-t`}>
      <div className="container sim">
        <div className="sim__intro">
          <h2 id={`${uid}-t`}>Mira cómo se vería tu negocio</h2>
          <p className="sim__lead">Elige tu tipo de negocio, escribe el nombre y prueba un color. Es una vista rápida; el diseño final lo hacemos contigo.</p>
        </div>

        <div className="sim__work">
        <div className="sim__form">

          <fieldset className="sim__group">
            <legend>Tipo de negocio</legend>
            <div className="choices">
              {(Object.keys(KINDS) as Kind[]).map((key) => (
                <label key={key} className="choice">
                  <input type="radio" name={`${uid}-kind`} value={key} checked={kind === key} onChange={() => { once('sim_start', { control: 'tipo' }); setKind(key); }} />
                  <span>{KINDS[key].label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="field sim__group">
            <label htmlFor={`${uid}-name`}>Nombre de tu negocio</label>
            <input id={`${uid}-name`} value={name} onChange={(e) => { once('sim_start', { control: 'nombre' }); if (e.target.value.trim()) once('sim_name'); setName(clean(e.target.value)); }} placeholder={k.example} maxLength={28} autoComplete="organization" />
          </div>

          <fieldset className="sim__group">
            <legend>Color</legend>
            <div className="swatches">
              {PALETTES.map((x) => (
                <label key={x.id} className="swatch">
                  <input type="radio" name={`${uid}-color`} value={x.id} checked={paletteId === x.id} onChange={() => { once('sim_start', { control: 'color' }); setPaletteId(x.id); }} />
                  <span className="swatch__chip" style={{ background: `linear-gradient(135deg, ${x.ink} 50%, ${x.bg} 50%)` }} aria-hidden="true" />
                  <span className="swatch__name">{x.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <a data-cta className="btn btn--primary btn--lg sim__cta" href={waLink(message)} target="_blank" rel="noopener noreferrer"
            onClick={() => track('sim_cta', { tipo: kind, color: paletteId, con_nombre: !!name.trim() })}>
            <IconWhatsApp size={20} /> Cotizar con este estilo
          </a>
          <p className="sim__note">Te escribimos con este estilo como punto de partida.</p>
        </div>

        <div className="sim__stage" style={vars}>
          <p className="sr-only" aria-live="polite">Vista previa: {shown}, {k.label.toLowerCase()}, color {p.label.toLowerCase()}.</p>
          <div className="sim__browser" aria-hidden="true">
            <div className="sim__bar"><span>{handle(shown).slice(1)}.com</span></div>
            <div className="sim__site">
              <div className="sim__nav"><b>{shown}</b><span>Inicio</span><span>Servicios</span><span>Contacto</span></div>
              <div className="sim__hero">
                <strong>{k.headline}</strong>
                <em>{k.action}</em>
              </div>
            </div>
          </div>
          <div className="sim__phone" aria-hidden="true">
            <div className="sim__profile">
              <span className="sim__avatar">{initials(shown)}</span>
              <span><b>{handle(shown)}</b><small>{k.label}</small></span>
            </div>
            <div className="sim__post">
              <small>{shown}</small>
              <strong>{k.post}</strong>
              <span>{k.postNote}</span>
              <em>{k.action}</em>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
