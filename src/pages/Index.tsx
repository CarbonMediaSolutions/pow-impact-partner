import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Philosophy } from '@/components/Philosophy';
import { FeaturedInsights } from '@/components/FeaturedInsights';
import { InsightLed } from '@/components/InsightLed';
import { LatestThinking } from '@/components/LatestThinking';
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
        <Philosophy />
        <FeaturedInsights />
        <InsightLed />
        <LatestThinking />
        <Services />
        <CaseStudies />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
