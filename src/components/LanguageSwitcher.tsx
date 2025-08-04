import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸',
      dir: 'ltr'
    },
    {
      code: 'ar',
      name: 'Arabic',
      nativeName: 'العربية',
      flag: '🇸🇦',
      dir: 'rtl'
    }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    
    // Update document direction and language
    const newLang = languages.find(lang => lang.code === languageCode);
    if (newLang) {
      document.documentElement.dir = newLang.dir;
      document.documentElement.lang = languageCode;
      
      // Store preference
      localStorage.setItem('thuraya-language', languageCode);
    }
    
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-thuraya-midnight/50 border-thuraya-gold/20 text-thuraya-pearl hover:bg-thuraya-gold/10 hover:border-thuraya-gold/40 transition-all duration-300"
      >
        <Globe className="w-4 h-4" />
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="hidden sm:inline font-medium">{currentLanguage.nativeName}</span>
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full mt-2 right-0 z-50 min-w-[180px] bg-thuraya-midnight/95 backdrop-blur-lg border border-thuraya-gold/20 rounded-premium shadow-constellation overflow-hidden"
            >
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => changeLanguage(language.code)}
                  className={`w-full px-4 py-3 text-left hover:bg-thuraya-gold/10 transition-colors duration-200 flex items-center gap-3 ${
                    currentLanguage.code === language.code 
                      ? 'bg-thuraya-gold/20 text-thuraya-gold' 
                      : 'text-thuraya-pearl hover:text-thuraya-gold'
                  }`}
                >
                  <span className="text-lg">{language.flag}</span>
                  <div className="flex flex-col">
                    <span className="font-medium">{language.nativeName}</span>
                    <span className="text-xs text-thuraya-pearl/60">{language.name}</span>
                  </div>
                  {currentLanguage.code === language.code && (
                    <motion.div
                      layoutId="activeLanguage"
                      className="ml-auto w-2 h-2 bg-thuraya-gold rounded-full"
                    />
                  )}
                </button>
              ))}
              
              {/* Cultural Touch */}
              <div className="px-4 py-2 border-t border-thuraya-gold/10">
                <p className="text-xs text-thuraya-pearl/50 text-center">
                  {t('language_switcher.switch_to_arabic')} • {t('language_switcher.switch_to_english')}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
