import { BRAND, waLink } from '../config';
import { Breadcrumbs } from '../components/Layout';

const UPDATED = '3 de octubre de 2026';

export default function Privacidad() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Política de privacidad' }]} />
      <section className="section page">
        <div className="container container--narrow legal">
          <h1>Política de privacidad y tratamiento de datos</h1>
          <p className="legal__date">Última actualización: {UPDATED}</p>

          <p>
            En {BRAND.name} respetamos tu privacidad. Esta política explica qué datos recogemos, para qué los usamos y cuáles son tus
            derechos, de acuerdo con la Ley 1581 de 2012 y el Decreto 1377 de 2013 de Colombia sobre protección de datos personales.
          </p>

          <h2>1. Responsable del tratamiento</h2>
          <p>
            {BRAND.legalOwner}, bajo el nombre comercial {BRAND.name}. Contacto: WhatsApp{' '}
            <a href={waLink(`Hola ${BRAND.name}, tengo una consulta sobre mis datos personales`)} target="_blank" rel="noopener noreferrer">{BRAND.whatsappDisplay}</a>
            {BRAND.email && <> o correo <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a></>}.
          </p>

          <h2>2. Qué datos recogemos</h2>
          <ul>
            <li><strong>Datos que tú nos das:</strong> nombre, nombre de tu negocio, número de WhatsApp y la información que nos cuentes sobre tu proyecto.</li>
            <li><strong>Datos de navegación:</strong> si está activada la analítica, datos anónimos de uso del sitio (páginas visitadas, tipo de dispositivo, ciudad aproximada) mediante Google Analytics.</li>
          </ul>
          <p>
            El formulario de contacto <strong>no guarda información en ningún servidor</strong>: solo arma un mensaje que se abre en tu
            WhatsApp para que tú decidas si lo envías.
          </p>

          <h2>3. Para qué usamos tus datos</h2>
          <ul>
            <li>Responder tus mensajes y enviarte cotizaciones.</li>
            <li>Desarrollar y dar soporte a los proyectos que contrates.</li>
            <li>Mejorar el sitio web a partir de estadísticas de uso anónimas.</li>
          </ul>
          <p>No vendemos ni compartimos tus datos con terceros para publicidad.</p>

          <h2>4. Cookies y analítica</h2>
          <p>
            Este sitio puede usar Google Analytics, que instala cookies para medir visitas de forma agregada, con la IP anonimizada.
            Puedes bloquear o borrar las cookies desde la configuración de tu navegador sin que el sitio deje de funcionar.
          </p>

          <h2>5. Tus derechos</h2>
          <p>Como titular de los datos puedes, en cualquier momento:</p>
          <ul>
            <li>Conocer, actualizar y rectificar tus datos.</li>
            <li>Pedir prueba de la autorización que nos diste.</li>
            <li>Saber cómo hemos usado tus datos.</li>
            <li>Revocar la autorización o pedir que eliminemos tus datos.</li>
            <li>Presentar quejas ante la Superintendencia de Industria y Comercio (SIC).</li>
          </ul>
          <p>Para ejercerlos, escríbenos por WhatsApp. Respondemos consultas en un máximo de 10 días hábiles y reclamos en un máximo de 15 días hábiles.</p>

          <h2>6. Seguridad</h2>
          <p>
            Usamos conexión cifrada (HTTPS), cabeceras de seguridad y buenas prácticas para proteger la información. Solo las personas
            que trabajan en tu proyecto tienen acceso a tus datos.
          </p>

          <h2>7. Cambios a esta política</h2>
          <p>Si cambiamos esta política, publicaremos la nueva versión en esta misma página con su fecha de actualización.</p>
        </div>
      </section>
    </>
  );
}
