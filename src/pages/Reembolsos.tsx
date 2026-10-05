import { BRAND, waLink } from '../config';
import { Breadcrumbs } from '../components/Layout';

const UPDATED = '4 de octubre de 2026';

export default function Reembolsos() {
  const rest = 100 - BRAND.depositPercent;
  return (
    <>
      <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Política de reembolsos' }]} />
      <section className="section page">
        <div className="container container--narrow legal">
          <h1>Política de cancelaciones y reembolsos</h1>
          <p className="legal__date">Vigente desde el {UPDATED}</p>

          <p>
            Esta política explica cuándo puedes cancelar, cuándo te devolvemos el dinero y cómo pedirlo, según el Estatuto del
            Consumidor (Ley 1480 de 2011). Complementa los <a href="/terminos">términos y condiciones</a>.
          </p>

          <h2 id="pagos">1. Cómo se paga</h2>
          <ul>
            <li><strong>Proyectos (páginas, apps, diseño, bases de datos):</strong> {BRAND.depositPercent} % de anticipo para empezar y {rest} % al entregar.</li>
            <li><strong>Plantillas para Canva:</strong> pago completo antes de enviar el enlace.</li>
            <li><strong>Acompañamiento mensual:</strong> mes a mes, por adelantado.</li>
            <li><strong>Medios de pago:</strong> {BRAND.paymentMethods.join(', ')}. {BRAND.taxNote}</li>
          </ul>

          <h2 id="retracto">2. Derecho de retracto (5 días hábiles)</h2>
          <p>
            Como contratas a distancia, tienes 5 días hábiles para retractarte sin dar explicaciones. No aplica a servicios que ya
            empezaron con tu acuerdo ni a trabajos hechos según tus especificaciones (artículo 47 de la Ley 1480). En las plantillas,
            aplica mientras no te hayamos enviado el enlace.
          </p>

          <h2 id="cuando">3. Cuándo devolvemos el dinero</h2>
          <div className="table-scroll" role="region" aria-label="Tabla de reembolsos" tabIndex={0}>
            <table className="legal-table">
              <thead><tr><th scope="col">Situación</th><th scope="col">Qué pasa</th></tr></thead>
              <tbody>
                <tr><th scope="row">Cancelas un proyecto antes de que empecemos</th><td data-label="Qué pasa">Te devolvemos el anticipo completo.</td></tr>
                <tr><th scope="row">Cancelas un proyecto ya empezado</th><td data-label="Qué pasa">El anticipo cubre lo hecho hasta ese momento y te entregamos lo avanzado.</td></tr>
                <tr><th scope="row">Lo entregado no funciona como se acordó</th><td data-label="Qué pasa">Lo corregimos sin costo (garantía legal). Si no podemos corregirlo, te devolvemos lo pagado por esa parte.</td></tr>
                <tr><th scope="row">Plantilla con defecto o enlace que no abre</th><td data-label="Qué pasa">La corregimos o te devolvemos el dinero.</td></tr>
                <tr><th scope="row">Cancelas el acompañamiento mensual</th><td data-label="Qué pasa">Sin permanencia: no se cobra el mes siguiente. El mes ya pagado no se devuelve.</td></tr>
                <tr><th scope="row">Cambias de opinión sobre algo ya entregado y que funciona</th><td data-label="Qué pasa">No hay reembolso, salvo el retracto del punto 2 cuando aplique.</td></tr>
              </tbody>
            </table>
          </div>

          <h2 id="como">4. Cómo pedir un reembolso o poner una queja</h2>
          <ol>
            <li>
              Escríbenos al correo <a href={`mailto:${BRAND.email}?subject=PQR`}>{BRAND.email}</a> con el asunto "PQR", o por{' '}
              <a href={waLink(`Hola ${BRAND.name}, quiero radicar una petición, queja o reclamo`)} target="_blank" rel="noopener noreferrer">WhatsApp</a>.
              Incluye tu nombre, qué compraste y qué pides.
            </li>
            <li>El correo o el chat queda con fecha y hora: ese es tu número de radicado. Te confirmamos que lo recibimos.</li>
            <li>Respondemos en máximo 15 días hábiles.</li>
            <li>Si corresponde un reembolso, lo hacemos por el mismo medio con el que pagaste, en máximo 30 días calendario.</li>
          </ol>
          <p>
            Si no quedas conforme con la respuesta, puedes acudir a la Superintendencia de Industria y Comercio (SIC).
          </p>
        </div>
      </section>
    </>
  );
}
