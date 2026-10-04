import { StrictMode, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/unbounded/700.css';
import '@fontsource-variable/manrope';
import './index.css';
import Layout from './components/Layout';

/** Monta una página dentro del layout común (menú, pie de página y contacto). */
export function mount(page: ReactNode) {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Layout>{page}</Layout>
    </StrictMode>,
  );
}
