import { BRAND, waLink } from '../config';
import { Breadcrumbs } from '../components/Layout';

const UPDATED = '4 de octubre de 2026';
const DATA_MSG = `Hola ${BRAND.name}, quiero hacer una consulta sobre mis datos personales`;

export default function Privacidad() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Política de privacidad' }]} />
      <section className="section page">
        <div className="container container--narrow legal">
          <h1>Política de privacidad y tratamiento de datos</h1>
          <p className="legal__date">Vigente desde el {UPDATED}</p>

          <p>
            Esta política explica qué datos personales recoge {BRAND.name}, para qué los usa, con quién los comparte y cómo puedes
            ejercer tus derechos. Cumple la Ley 1581 de 2012 y el Decreto 1074 de 2015 (que incorpora el Decreto 1377 de 2013) de
            Colombia.
          </p>

          <h2 id="responsable">1. Responsable del tratamiento</h2>
          <ul>
            <li><strong>Nombre:</strong> {BRAND.legalOwner}, bajo el nombre comercial {BRAND.name}.</li>
            <li><strong>Domicilio:</strong> {BRAND.domicile}. Atendemos de forma remota.</li>
            <li>
              <strong>Teléfono y WhatsApp:</strong>{' '}
              <a href={waLink(DATA_MSG)} target="_blank" rel="noopener noreferrer">{BRAND.whatsappDisplay}</a>
            </li>
            {BRAND.email && <li><strong>Correo:</strong> <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a></li>}
            <li><strong>Quién atiende tus consultas y reclamos:</strong> {BRAND.legalOwner}, directamente.</li>
          </ul>

          <h2 id="datos">2. Qué datos recogemos</h2>
          <ul>
            <li><strong>Los que tú nos das:</strong> nombre, nombre de tu negocio, número de WhatsApp y lo que nos cuentes sobre tu proyecto.</li>
            <li><strong>Datos de navegación, solo si aceptas las cookies:</strong> páginas visitadas, tipo de dispositivo y ciudad aproximada, mediante Google Analytics (ver el punto 6).</li>
            <li><strong>Registros técnicos del servidor:</strong> nuestro proveedor de hosting (Vercel) registra la dirección IP y el navegador de cada visita para que el sitio funcione y sea seguro.</li>
          </ul>
          <p>
            No pedimos datos sensibles (salud, religión, opiniones políticas, datos biométricos) ni recogemos a sabiendas datos de
            menores de edad. El formulario de contacto <strong>no guarda nada en un servidor</strong>: arma un mensaje que se abre en tu
            WhatsApp y tú decides si lo envías.
          </p>

          <h2 id="finalidad">3. Para qué los usamos</h2>
          <ul>
            <li>Responder tus mensajes y enviarte cotizaciones.</li>
            <li>Hacer, entregar y dar soporte a los proyectos que contrates, y facturarlos.</li>
            <li>Si aceptas las cookies, saber cuántas personas visitan el sitio y qué secciones les sirven, para mejorarlo.</li>
          </ul>
          <p>
            No vendemos tus datos, no los compartimos para publicidad y no te enviamos mensajes promocionales que no hayas pedido.
            Solo te escribimos por el canal que usaste para contactarnos y, como exige la Ley 2300 de 2023, nunca domingos ni
            festivos, de lunes a viernes entre 7:00 a.m. y 7:00 p.m. y los sábados entre 8:00 a.m. y 3:00 p.m. Si nos dices que
            paremos, dejamos de hacerlo.
          </p>

          <h2 id="autorizacion">4. Cómo nos autorizas</h2>
          <p>
            Al escribirnos por WhatsApp, o al enviar el formulario que abre WhatsApp con tu mensaje, nos autorizas a usar los datos que
            compartes para las finalidades del punto 3. Las cookies de analítica requieren una autorización aparte: el botón
            "Aceptar" del aviso de cookies.
          </p>

          <h2 id="ia">5. Inteligencia artificial</h2>
          <p>
            Usamos herramientas de inteligencia artificial para diseñar, escribir y programar. <strong>No ingresamos tus datos
            personales ni los de tus clientes en herramientas de IA</strong> sin pedirte autorización expresa antes. Este sitio no
            usa IA para procesar lo que escribes.
          </p>

          <h2 id="cookies">6. Cookies y analítica</h2>
          <p>
            El sitio funciona sin cookies. Solo si eliges "Aceptar" en el aviso de cookies se activa Google Analytics, que instala
            cookies (<code>_ga</code> y <code>_ga_*</code>) para contar visitas de forma agregada, con la IP anonimizada. Si eliges
            "Rechazar", o no eliges nada, Google Analytics no se carga. Puedes cambiar tu decisión en cualquier momento desde
            "Preferencias de cookies" en el pie de página; al rechazarlas, borramos esas cookies.
          </p>
          <p>Tu decisión se guarda en tu propio navegador (almacenamiento local), no en nuestros servidores. El detalle de cada cookie está en la <a href="/cookies">política de cookies</a>.</p>

          <h2 id="terceros">7. Con quién compartimos datos</h2>
          <p>Solo con proveedores que necesitamos para operar. Algunos guardan datos fuera de Colombia:</p>
          <ul>
            <li><strong>WhatsApp (Meta Platforms):</strong> el canal donde conversamos contigo.</li>
            <li><strong>Vercel Inc.:</strong> aloja este sitio web.</li>
            <li><strong>Google LLC:</strong> Google Analytics, solo si aceptas las cookies.</li>
          </ul>
          <p>
            Cuando hacemos un proyecto con datos de <em>tus</em> clientes (por ejemplo, una base de datos de pedidos), tú eres el
            responsable de esos datos y nosotros actuamos como encargados: solo los usamos para el proyecto, según tus
            instrucciones.
          </p>

          <h2 id="conservacion">8. Cuánto tiempo los conservamos</h2>
          <p>
            Mientras sean necesarios para la finalidad por la que los recogimos (responderte, ejecutar el proyecto y darle soporte) y
            por el tiempo que exijan las normas contables y tributarias. Puedes pedir que los eliminemos antes, salvo que la ley nos
            obligue a guardarlos.
          </p>

          <h2 id="derechos">9. Tus derechos</h2>
          <p>Como titular de los datos puedes, en cualquier momento y sin costo:</p>
          <ul>
            <li>Conocer, actualizar y corregir tus datos.</li>
            <li>Pedir prueba de la autorización que nos diste.</li>
            <li>Saber cómo hemos usado tus datos.</li>
            <li>Revocar la autorización o pedir que <strong>eliminemos</strong> tus datos.</li>
            <li>Presentar quejas ante la Superintendencia de Industria y Comercio (SIC), después de haber hecho tu reclamo con nosotros.</li>
          </ul>

          <h2 id="procedimiento">10. Cómo ejercerlos</h2>
          <ol>
            <li>Escríbenos por <a href={waLink(DATA_MSG)} target="_blank" rel="noopener noreferrer">WhatsApp</a>{BRAND.email && <> o a <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a></>} con tu nombre, qué pides y cómo te respondemos.</li>
            <li>Si no podemos confirmar que eres el titular, te pediremos un dato para verificarlo.</li>
            <li><strong>Consultas:</strong> respondemos en máximo 10 días hábiles (prorrogables 5 más, avisándote el motivo).</li>
            <li><strong>Reclamos</strong> (corrección, eliminación o revocatoria): respondemos en máximo 15 días hábiles (prorrogables 8 más, avisándote el motivo).</li>
          </ol>

          <h2 id="seguridad">11. Seguridad</h2>
          <p>
            Usamos conexión cifrada (HTTPS), cabeceras de seguridad y acceso limitado: solo quien trabaja en tu proyecto ve tus
            datos. Ningún sistema es infalible; si ocurriera un incidente que afecte tus datos, te avisaríamos y lo reportaríamos a la
            SIC como exige la ley.
          </p>

          <h2 id="cambios">12. Cambios a esta política</h2>
          <p>Si la cambiamos, publicaremos la nueva versión en esta misma página con su fecha. Los cambios importantes los avisaremos aquí antes de que apliquen.</p>
        </div>
      </section>
    </>
  );
}
