import { lazy, Suspense } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Footer } from '@/components/Footer';

const ThreePillars = lazy(() => import('@/components/ThreePillars').then(m => ({ default: m.ThreePillars })));
const FeaturedPerspectives = lazy(() => import('@/components/FeaturedPerspectives').then(m => ({ default: m.FeaturedPerspectives })));
const InsightLed = lazy(() => import('@/components/InsightLed').then(m => ({ default: m.InsightLed })));
const CaseStudies = lazy(() => import('@/components/CaseStudies').then(m => ({ default: m.CaseStudies })));
const ClientLogos = lazy(() => import('@/components/ClientLogos').then(m => ({ default: m.ClientLogos })));
const FinalCTA = lazy(() => import('@/components/FinalCTA').then(m => ({ default: m.FinalCTA })));

const SectionFallback = () => <div className="py-20" />;

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <ThreePillars />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <FeaturedPerspectives />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <InsightLed />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <CaseStudies />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ClientLogos />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <FinalCTA />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
