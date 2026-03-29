import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SiteContentProvider } from "@/components/SiteContentProvider";
import { CookieConsent } from "@/components/CookieConsent";
import Index from "./pages/Index";

const NotFound = lazy(() => import("./pages/NotFound"));
const TaxPlanning = lazy(() => import("./pages/TaxPlanning"));
const FinancialCompliance = lazy(() => import("./pages/FinancialCompliance"));
const GrowthStrategy = lazy(() => import("./pages/GrowthStrategy"));
const ImpactMeasurement = lazy(() => import("./pages/ImpactMeasurement"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Impact = lazy(() => import("./pages/Impact"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const Contact = lazy(() => import("./pages/Contact"));
const CaseStudyPage = lazy(() => import("./pages/CaseStudyPage"));
const Perspectives = lazy(() => import("./pages/Perspectives"));
const Analysis = lazy(() => import("./pages/Analysis"));
const PerspectiveDetail = lazy(() => import("./pages/PerspectiveDetail"));
const AnalysisDetail = lazy(() => import("./pages/AnalysisDetail"));
const Solutions = lazy(() => import("./pages/Solutions"));
const BookConsultation = lazy(() => import("./pages/BookConsultation"));
const SubmitPerspective = lazy(() => import("./pages/SubmitPerspective"));
const Admin = lazy(() => import("./pages/Admin"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));

const queryClient = new QueryClient();

const PageFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SiteContentProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/perspectives" element={<Perspectives />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/services/tax-planning" element={<TaxPlanning />} />
            <Route path="/services/financial-compliance" element={<FinancialCompliance />} />
            <Route path="/services/growth-strategy" element={<GrowthStrategy />} />
            <Route path="/services/impact-measurement" element={<ImpactMeasurement />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/impact" element={<Impact />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/case-studies/:id" element={<CaseStudyPage />} />
            <Route path="/perspectives/:id" element={<PerspectiveDetail />} />
            <Route path="/analysis/:id" element={<AnalysisDetail />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/book" element={<BookConsultation />} />
            <Route path="/submit-perspective" element={<SubmitPerspective />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <CookieConsent />
      </BrowserRouter>
      </SiteContentProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
