import { StrictMode, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/unbounded/700.css';
import '@fontsource/unbounded/800.css';
import '@fontsource-variable/manrope';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/600.css';
import './index.css';
import Layout from './components/Layout';

/** Monta una página dentro del layout común (menú, pie de página, botones de contacto). */
export function mount(page: ReactNode) {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Layout>{page}</Layout>
    </StrictMode>,
  );
}
