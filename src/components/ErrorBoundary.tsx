import { Component, type ErrorInfo, type ReactNode } from 'react';
import { BRAND, waLink } from '../config';
import { reportError } from '../analytics';

/**
 * Si algo falla al pintar la página, React desmonta todo y el visitante ve una pantalla en blanco.
 * Este límite muestra en su lugar una salida clara: recargar o escribir por WhatsApp. Usa solo HTML simple
 * para no depender del componente que falló.
 */
export default class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    reportError(`${error.message} @ ${info.componentStack?.split('\n')[1]?.trim() ?? ''}`, true);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <main id="contenido" className="section status">
        <div className="container status__inner">
          <h1>No pudimos cargar la página</h1>
          <p className="status__lead">Fue un error nuestro, no tuyo. Recarga la página o escríbenos directamente.</p>
          <div className="status__actions">
            <a className="btn btn--primary btn--lg" href={waLink()} target="_blank" rel="noopener noreferrer">
              Escribir a {BRAND.name} por WhatsApp
            </a>
            <a className="btn btn--secondary btn--lg" href="/">Recargar</a>
          </div>
        </div>
      </main>
    );
  }
}
