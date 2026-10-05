import { StrictMode, type ReactNode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import '@fontsource/unbounded/700.css';
import '@fontsource-variable/manrope';
import './index.css';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';

/**
 * Al recargar, la página empieza arriba (pedido de Juanes, 4 oct 2026). El navegador, por defecto, vuelve a la posición
 * anterior o al #ancla de la URL y la deja a mitad de página. Un enlace con #ancla que llega de afuera sigue funcionando:
 * solo se cambia la recarga.
 */
function startAtTopOnReload() {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
  if (nav?.type !== 'reload') return;
  if (location.hash) history.replaceState(null, '', location.pathname + location.search);
  const top = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  top();
  if (document.readyState !== 'complete') window.addEventListener('load', () => requestAnimationFrame(top), { once: true });
}

/** Monta una página dentro del layout común (menú, pie de página y contacto). */
export function mount(page: ReactNode) {
  startAtTopOnReload();
  const el = document.getElementById('root')!;
  const app = (
    <StrictMode>
      <ErrorBoundary>
        <Layout>{page}</Layout>
      </ErrorBoundary>
    </StrictMode>
  );
  // En producción el HTML viene prerenderizado: React solo lo "hidrata". En desarrollo se monta desde cero.
  if (el.hasChildNodes()) hydrateRoot(el, app);
  else createRoot(el).render(app);
}
