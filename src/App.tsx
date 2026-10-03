import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { Faq, FinalCta, Footer, Portfolio, Pricing, Process, Services, Templates, VsAI, WhatsAppFloat } from './components/Sections';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <Navbar />
      <main id="contenido">
        <Hero />
        <Services />
        <VsAI />
        <Portfolio />
        <Process />
        <Pricing />
        <Templates />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
