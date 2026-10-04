import Hero from '../components/Hero';
import Works from '../components/Works';
import { Comparison, Faq, Pricing, Process, Services, Templates } from '../components/Sections';
import { About, Contact } from '../components/Extra';

export default function Home() {
  return (
    <>
      <Hero />
      <Works />
      <Services />
      <Comparison />
      <Process />
      <Pricing />
      <Templates />
      <About />
      <Faq />
      <Contact />
    </>
  );
}
