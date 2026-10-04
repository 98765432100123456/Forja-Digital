import { BRAND, waLink } from '../config';
import { PLANS } from '../data';
import { Breadcrumbs } from '../components/Layout';

const UPDATED = '4 de octubre de 2026';

export default function Terminos() {
  const rest = 100 - BRAND.depositPercent;
  return (
    <>
      <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Términos y condiciones' }]} />
      <section className="section page">
        <div className="container container--narrow legal">
          <h1>Términos y condiciones</h1>
          <p className="legal__date">Vigentes desde el {UPDATED}</p>

          <p>
            Estas son las reglas para contratar los servicios y comprar las plantillas de {BRAND.name}. Están escritas para que se
            entiendan sin abogado. Si algo no está claro, pregúntanos antes de pagar.
          </p>

          <h2 id="quienes">1. Quiénes somos</h2>
          <p>
            {BRAND.name} es el nombre comercial de {BRAND.legalOwner}, con domicilio en {BRAND.domicile}. Contacto por WhatsApp al{' '}
            <a href={waLink()} target="_blank" rel="noopener noreferrer">{BRAND.whatsappDisplay}</a>
            {BRAND.email && <> o al correo <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a></>}.
          </p>

          <h2 id="cotizacion">2. Precios y propuesta</h2>
          <ul>
            <li>Los precios de la página son <strong>"desde"</strong>, en pesos colombianos: son una referencia, no una oferta cerrada.</li>
            <li>Antes de empezar te enviamos por escrito una <strong>propuesta</strong> con el alcance, el precio final y la fecha de entrega. El trabajo empieza cuando la aceptas y pagas el anticipo.</li>
            <li>Lo que no esté en la propuesta no está incluido. Si quieres agregar algo después, lo cotizamos aparte antes de hacerlo.</li>
            <li>El dominio y el hosting se pagan aparte y quedan a tu nombre.</li>
          </ul>

          <h2 id="pagos">3. Pagos</h2>
          <ul>
            <li><strong>{BRAND.depositPercent} % de anticipo</strong> para empezar y <strong>{rest} % al entregar</strong>, antes de publicar el sitio o enviarte los archivos finales.</li>
            <li>Los medios de pago se indican en la propuesta.</li>
            <li>El plan de acompañamiento se paga mes a mes, por adelantado.</li>
          </ul>

          <h2 id="entrega">4. Tiempos de entrega</h2>
          <ul>
            {PLANS.filter((p) => p.time && !p.time.startsWith('Empieza')).map((p) => <li key={p.name}><strong>{p.name}:</strong> {p.time.charAt(0).toLowerCase() + p.time.slice(1)}.</li>)}
          </ul>
          <p>
            Los plazos cuentan desde que recibimos el anticipo <strong>y</strong> tus contenidos (textos, logo, fotos, precios). Si los
            contenidos o tus respuestas se demoran, la fecha se mueve los mismos días. Si el retraso es nuestro, te avisamos con una
            nueva fecha y el motivo.
          </p>

          <h2 id="cambios">5. Rondas de cambios</h2>
          <p>
            Cada plan incluye las rondas de cambios que dice su descripción. Una ronda es una lista de ajustes que nos envías junta
            sobre lo que te mostramos. Los cambios adicionales, o los que cambian lo acordado en la propuesta, se cotizan aparte.
          </p>

          <h2 id="garantia">6. Garantía</h2>
          <p>
            Aplicamos la garantía legal del Estatuto del Consumidor (Ley 1480 de 2011): si algo que entregamos no funciona como se
            acordó en la propuesta, lo corregimos sin costo. La garantía no cubre:
          </p>
          <ul>
            <li>Cambios que hagas tú o un tercero sobre lo entregado.</li>
            <li>Fallas del dominio, el hosting u otros servicios contratados con otras empresas.</li>
            <li>Contenido que nos entregues (textos, fotos, precios) y sus errores.</li>
            <li>Funciones nuevas que no estaban en la propuesta.</li>
          </ul>

          <h2 id="cancelacion">7. Cancelación, retracto y reembolsos</h2>
          <ul>
            <li><strong>Si cancelas antes de que empecemos a trabajar,</strong> te devolvemos el anticipo completo.</li>
            <li>
              <strong>Derecho de retracto:</strong> en compras a distancia tienes 5 días hábiles para retractarte. No aplica a servicios
              que ya empezaron con tu acuerdo ni a trabajos hechos a la medida de tus especificaciones (artículo 47 de la Ley 1480).
            </li>
            <li><strong>Si cancelas cuando el trabajo ya empezó,</strong> el anticipo cubre lo hecho hasta ese momento y te entregamos lo avanzado.</li>
            <li><strong>Acompañamiento mensual:</strong> sin permanencia. Puedes cancelarlo cuando quieras, avisando antes del siguiente pago.</li>
            <li>Cuando haya reembolso, lo hacemos en máximo 30 días calendario.</li>
          </ul>

          <h2 id="plantillas">8. Plantillas para Canva</h2>
          <ul>
            <li>Te enviamos un enlace que crea una copia editable en tu cuenta de Canva. El precio se confirma por WhatsApp antes de pagar.</li>
            <li><strong>Licencia:</strong> puedes usar y modificar las plantillas para tu propio negocio, sin límite de publicaciones. No puedes revenderlas, compartirlas ni publicarlas como plantillas.</li>
            <li>Si el enlace no funciona o una plantilla tiene un defecto, la corregimos o te devolvemos el dinero.</li>
            <li>Como es un archivo digital que no se puede devolver una vez entregado, el retracto aplica mientras no te hayamos enviado el enlace.</li>
          </ul>

          <h2 id="propiedad">9. Propiedad intelectual</h2>
          <ul>
            <li>Cuando pagas el total, el diseño y el código hechos para tu proyecto son tuyos.</li>
            <li>Solo mostramos tu proyecto en nuestro portafolio, y solo publicamos tu opinión, si nos das permiso. Nunca publicamos opiniones inventadas.</li>
            <li>Las fuentes tipográficas, íconos y librerías de terceros conservan sus propias licencias (ver el punto 11).</li>
            <li>
              Las fotos y textos que nos entregues deben ser tuyos o tener permiso de uso. Si no tienes fotos, usamos bancos con
              licencia libre para uso comercial (como Unsplash o Pexels) o fotos que tú tomes; nunca imágenes descargadas de Google.
            </li>
          </ul>

          <h2 id="datos">10. Datos personales</h2>
          <p>
            Tratamos tus datos según nuestra <a href="/privacidad">política de privacidad</a>. Si tu proyecto guarda datos de tus
            clientes, tú eres el responsable de esos datos frente a ellos y nosotros los usamos solo para construir y mantener el
            proyecto.
          </p>

          <h2 id="creditos">11. Créditos y licencias de este sitio</h2>
          <ul>
            <li>Tipografías Unbounded y Manrope: SIL Open Font License 1.1.</li>
            <li>Las plantillas de muestra usan las tipografías Bebas Neue, DM Serif Display, Montserrat, Playfair Display y Poppins (SIL Open Font License 1.1) e íconos de Font Awesome Free (licencia CC BY 4.0, de Fonticons, Inc.).</li>
            <li>Las ilustraciones, piezas de muestra e íconos del sitio son diseño propio de {BRAND.name}. No usamos fotos de terceros. Los logotipos de WhatsApp, Facebook e Instagram son marcas de Meta Platforms y se usan solo para indicar el canal de contacto.</li>
          </ul>

          <h2 id="ley">12. Ley aplicable</h2>
          <p>
            Estos términos se rigen por las leyes de Colombia. Si tenemos un desacuerdo, primero lo hablamos directamente. Como
            consumidor, también puedes acudir a la Superintendencia de Industria y Comercio.
          </p>

          <h2 id="actualizaciones">13. Cambios a estos términos</h2>
          <p>Publicaremos cualquier cambio en esta página con su fecha. Un proyecto ya contratado sigue las condiciones de su propuesta.</p>
        </div>
      </section>
    </>
  );
}
