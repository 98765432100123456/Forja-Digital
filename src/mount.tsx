import { StrictMode, type ReactNode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import '@fontsource/unbounded/700.css';
import '@fontsource-variable/manrope';
import './index.css';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';

/** Monta una página dentro del layout común (menú, pie de página y contacto). */
export function mount(page: ReactNode) {
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
