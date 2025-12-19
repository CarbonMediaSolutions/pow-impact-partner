import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { FeaturedInsights } from '@/components/FeaturedInsights';
import { InsightLed } from '@/components/InsightLed';
import { LatestThinking } from '@/components/LatestThinking';
import { ThreePsFramework } from '@/components/ThreePsFramework';
import { Services } from '@/components/Services';
import { CaseStudies } from '@/components/CaseStudies';
import { About } from '@/components/About';
import { Process } from '@/components/Process';
import { FAQ } from '@/components/FAQ';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <FeaturedInsights />
        <InsightLed />
        <LatestThinking />
        <ThreePsFramework />
        <Services />
        <CaseStudies />
        <About />
        <Process />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
