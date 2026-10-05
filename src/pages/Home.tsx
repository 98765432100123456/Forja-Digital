import Hero from '../components/Hero';
import Vitrinas from '../components/Vitrinas';
import Works from '../components/Works';
import Simulator from '../components/Simulator';
import { Comparison, Faq, Pricing, Process } from '../components/Sections';
import { About, Contact } from '../components/Extra';

// Rediseño "vitrina" (D20): una idea por pantalla, el producto como protagonista y servicios en vitrinas.
export default function Home() {
  return (
    <>
      <Hero />
      <Vitrinas />
      <Simulator />
      <Works />
      <Comparison />
      <Process />
      <Pricing />
      <About />
      <Faq />
      <Contact />
    </>
  );
}
