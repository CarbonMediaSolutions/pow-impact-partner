import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { FeaturedPerspectives } from '@/components/FeaturedPerspectives';
import { InsightLed } from '@/components/InsightLed';
import { Services } from '@/components/Services';
import { CaseStudies } from '@/components/CaseStudies';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <FeaturedPerspectives />
        <InsightLed />
        <Services />
        <CaseStudies />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
