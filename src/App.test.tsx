import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { useLanguageDirection } from "./hooks/useLanguageDirection";

const queryClient = new QueryClient();

const SimpleTest = () => {
  return (
    <div style={{ padding: '20px', color: 'black', backgroundColor: 'white' }}>
      <h1>Simple Test - React is Working!</h1>
      <p>If you can see this, React is rendering correctly.</p>
    </div>
  );
};

const AppContent = () => {
  try {
    useLanguageDirection(); // Initialize language direction management
  } catch (error) {
    console.error('Error in useLanguageDirection:', error);
  }
  
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<SimpleTest />} />
        <Route path="*" element={<SimpleTest />} />
      </Routes>
    </HashRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
