import { BRAND } from '../config';
import { Breadcrumbs } from '../components/Layout';
import { openCookieSettings } from '../consent';

const UPDATED = '4 de octubre de 2026';

const ROWS = [
  { name: '_ga', who: 'Google Analytics (Google LLC)', type: 'Cookie de analítica', what: 'Distinguir visitantes de forma agregada', time: '2 años', when: 'Solo si aceptas' },
  { name: '_ga_<ID>', who: 'Google Analytics (Google LLC)', type: 'Cookie de analítica', what: 'Mantener el estado de la visita', time: '2 años', when: 'Solo si aceptas' },
  { name: 'forja:cookies', who: BRAND.name, type: 'Almacenamiento local (no es cookie)', what: 'Recordar si aceptaste o rechazaste las cookies', time: 'Hasta que borres los datos del navegador', when: 'Al decidir en el aviso' },
  { name: 'forja:mensaje', who: BRAND.name, type: 'Almacenamiento de sesión (no es cookie)', what: 'Volver a abrir WhatsApp con tu mensaje desde la página de gracias', time: 'Hasta cerrar la pestaña', when: 'Al enviar el formulario' },
];

export default function Cookies() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Política de cookies' }]} />
      <section className="section page">
        <div className="container container--narrow legal">
          <h1>Política de cookies</h1>
          <p className="legal__date">Vigente desde el {UPDATED}</p>

          <p>
            Las cookies son pequeños archivos que un sitio guarda en tu navegador. Este sitio funciona sin ellas: solo usamos cookies
            de analítica si las aceptas. No usamos cookies de publicidad ni compartimos datos para anuncios.
          </p>

          <h2 id="lista">1. Qué guardamos en tu navegador</h2>
          <div className="table-scroll" role="region" aria-label="Tabla de cookies" tabIndex={0}>
            <table className="legal-table">
              <thead>
                <tr><th scope="col">Nombre</th><th scope="col">De quién</th><th scope="col">Tipo</th><th scope="col">Para qué</th><th scope="col">Duración</th><th scope="col">Cuándo</th></tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.name}><th scope="row"><code>{r.name}</code></th><td data-label="De quién">{r.who}</td><td data-label="Tipo">{r.type}</td><td data-label="Para qué">{r.what}</td><td data-label="Duración">{r.time}</td><td data-label="Cuándo">{r.when}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            En Google Analytics desactivamos las señales de Google y la personalización de anuncios, y la dirección IP se anonimiza.
            Duración de las cookies de Google según su documentación oficial.
          </p>

          <h2 id="cambiar">2. Cómo aceptar, rechazar o cambiar tu decisión</h2>
          <p>
            La primera vez que entras te preguntamos. "Aceptar" y "Rechazar" pesan lo mismo y, si no eliges nada, no se activa ninguna
            cookie. Puedes cambiar tu decisión cuando quieras: al rechazar, borramos las cookies de Google Analytics.
          </p>
          <p>
            <button type="button" className="btn btn--secondary" onClick={openCookieSettings}>Cambiar mis preferencias de cookies</button>
          </p>

          <h2 id="navegador">3. Borrarlas desde tu navegador</h2>
          <p>
            También puedes borrar o bloquear las cookies en la configuración de privacidad de tu navegador (Chrome, Safari, Firefox o
            Edge). El sitio seguirá funcionando.
          </p>

          <h2 id="terceros">4. Contenido de terceros</h2>
          <p>
            No incrustamos videos, mapas, botones de redes sociales ni chats de terceros. Los enlaces a WhatsApp y Facebook abren esos
            servicios fuera de este sitio, con sus propias políticas.
          </p>

          <h2 id="mas">5. Más información</h2>
          <p>Cómo tratamos tus datos personales: <a href="/privacidad">política de privacidad</a>. Dudas: {BRAND.email}.</p>
        </div>
      </section>
    </>
  );
}
