import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguageDirection } from "./hooks/useLanguageDirection";
import { ErrorBoundary } from "./components/ErrorBoundary";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import CaseStudies from "./pages/CaseStudies";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import OdooTest from "./pages/OdooTest";
import NotFound from "./pages/NotFound";
// import JotFormChatbot from "./components/JotFormChatbot";

const queryClient = new QueryClient();

const AppContent = () => {
  const { ready, i18n } = useTranslation();
  useLanguageDirection(); // Initialize language direction management
  
  // Show loading state while i18n is initializing
  if (!ready) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/70">Initializing application...</p>
        </div>
      </div>
    );
  }
  
  try {
    return (
      <HashRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/odoo-test" element={<OdooTest />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    );
  } catch (error) {
    console.error("Router error:", error);
    console.error("Error stack:", error instanceof Error ? error.stack : 'Unknown error');
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-xl mb-4">Navigation Error</h1>
          <p className="mb-2">Error: {error instanceof Error ? error.message : 'Unknown error'}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }
};

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {/* <JotFormChatbot 
          enabled={true} 
          skipWelcome={true} 
          maximizable={true}
          showDelay={3000}
          trackLeads={true}
        /> */}
        <AppContent />
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
