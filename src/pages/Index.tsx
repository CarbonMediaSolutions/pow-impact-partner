import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ThreePsFramework } from '@/components/ThreePsFramework';
import { Services } from '@/components/Services';
import { Testimonials } from '@/components/Testimonials';
import { Assessment } from '@/components/Assessment';
import { CaseStudies } from '@/components/CaseStudies';
import { About } from '@/components/About';
import { Process } from '@/components/Process';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <ThreePsFramework />
        <Services />
        <Testimonials />
        <Assessment />
        <CaseStudies />
        <About />
        <Process />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
