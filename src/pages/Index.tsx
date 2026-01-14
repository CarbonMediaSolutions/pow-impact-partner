import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ThreePillars } from '@/components/ThreePillars';
import { InsightLed } from '@/components/InsightLed';
import { CaseStudies } from '@/components/CaseStudies';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <ThreePillars />
        <InsightLed />
        <CaseStudies />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
