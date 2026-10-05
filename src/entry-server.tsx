// Entrada para prerenderizar el HTML en la compilación (SEO, vista previa y primera pintura rápida).
import { StrictMode, type ReactNode } from 'react';
import { renderToString } from 'react-dom/server';
import Layout from './components/Layout';
import Home from './pages/Home';
import Gracias from './pages/Gracias';
import Privacidad from './pages/Privacidad';
import Terminos from './pages/Terminos';
import Plantillas from './pages/Plantillas';
import Apps from './pages/Apps';
import NotFound from './pages/NotFound';

const PAGES: Record<string, () => ReactNode> = {
  'index.html': () => <Home />,
  'gracias.html': () => <Gracias />,
  'privacidad.html': () => <Privacidad />,
  '404.html': () => <NotFound />,
  'terminos.html': () => <Terminos />,
  'plantillas-canva.html': () => <Plantillas />,
  'apps.html': () => <Apps />,
};

export function render(file: string) {
  const page = PAGES[file];
  if (!page) throw new Error(`Página sin prerenderizar: ${file}`);
  return renderToString(
    <StrictMode>
      <Layout>{page()}</Layout>
    </StrictMode>,
  );
}

export const files = Object.keys(PAGES);
