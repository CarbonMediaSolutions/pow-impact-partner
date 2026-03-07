import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SiteContentProvider } from "@/components/SiteContentProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TaxPlanning from "./pages/TaxPlanning";
import FinancialCompliance from "./pages/FinancialCompliance";
import GrowthStrategy from "./pages/GrowthStrategy";
import ImpactMeasurement from "./pages/ImpactMeasurement";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Impact from "./pages/Impact";
import AboutPage from "./pages/AboutPage";
import Contact from "./pages/Contact";
import CaseStudyPage from "./pages/CaseStudyPage";
import Perspectives from "./pages/Perspectives";
import Analysis from "./pages/Analysis";
import PerspectiveDetail from "./pages/PerspectiveDetail";
import AnalysisDetail from "./pages/AnalysisDetail";
import Solutions from "./pages/Solutions";
import BookConsultation from "./pages/BookConsultation";
import SubmitPerspective from "./pages/SubmitPerspective";
import Admin from "./pages/Admin";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SiteContentProvider>
      <BrowserRouter>
        <ScrollToTop />
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
      </BrowserRouter>
      </SiteContentProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
