import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import CaseStudy from "./pages/CaseStudy";
import Schedule from "./pages/Schedule";
import NotFound from "./pages/NotFound";
import { Suspense, lazy } from "react";

const queryClient = new QueryClient();
const About = lazy(() => import("@/components/About"));

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/case-study/:slug" element={<CaseStudy />} />
            <Route path="/schedule" element={<Schedule />} />
            {/* Exemple d'utilisation du lazy loading pour About (à intégrer dans Index si besoin) */}
            {/* <Route path="/about" element={<Suspense fallback={<div>Chargement...</div>}><About /></Suspense>} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
