import Hero from '../components/Hero';
import { Faq, FinalCta, Portfolio, Pricing, Process, Services, Templates, VsAI } from '../components/Sections';
import { Cases, Contact, Reviews, Team } from '../components/Extra';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <VsAI />
      <Portfolio />
      <Cases />
      <Process />
      <Pricing />
      <Templates />
      <Reviews />
      <Team />
      <Faq />
      <Contact />
      <FinalCta />
    </>
  );
}
