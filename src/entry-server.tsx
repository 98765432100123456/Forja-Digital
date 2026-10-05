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
import Reembolsos from './pages/Reembolsos';
import Cookies from './pages/Cookies';
import NotFound from './pages/NotFound';
import Servicio from './pages/Servicio';

const PAGES: Record<string, () => ReactNode> = {
  'index.html': () => <Home />,
  'gracias.html': () => <Gracias />,
  'privacidad.html': () => <Privacidad />,
  '404.html': () => <NotFound />,
  'terminos.html': () => <Terminos />,
  'plantillas-canva.html': () => <Plantillas />,
  'apps.html': () => <Apps />,
  'reembolsos.html': () => <Reembolsos />,
  'cookies.html': () => <Cookies />,
  'paginas-web.html': () => <Servicio id="paginas-web" />,
  'diseno-para-redes.html': () => <Servicio id="diseno-para-redes" />,
  'bases-de-datos.html': () => <Servicio id="bases-de-datos" />,
  'seguridad-y-soporte.html': () => <Servicio id="seguridad-y-soporte" />,
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
