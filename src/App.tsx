import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

const queryClient = new QueryClient();

const SimpleTestWithI18n = () => {
  const { t, i18n } = useTranslation();
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };
  
  return (
    <div className="p-8 bg-white text-black min-h-screen">
      <h1 className="text-4xl font-bold mb-4">
        {t('navigation.home', 'Simple Test - React is Working!')}
      </h1>
      <p className="text-lg mb-4">
        Current language: {i18n.language}
      </p>
      <button 
        onClick={toggleLanguage}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Switch Language
      </button>
      <p className="text-lg">If you can see this, React is rendering correctly.</p>
      <p className="text-sm mt-4 text-gray-600">This is a test to check if i18n is working.</p>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SimpleTestWithI18n />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
