import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const useLanguageDirection = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const currentLanguage = i18n.language;
    const isRTL = currentLanguage === 'ar';
    
    // Update document direction
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
    
    // Add/remove RTL class for styling
    if (isRTL) {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
    
    // Update meta tags for SEO
    const htmlTag = document.querySelector('html');
    if (htmlTag) {
      htmlTag.setAttribute('lang', currentLanguage);
      htmlTag.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    }
    
  }, [i18n.language]);

  return {
    isRTL: i18n.language === 'ar',
    currentLanguage: i18n.language,
    direction: i18n.language === 'ar' ? 'rtl' : 'ltr'
  };
};
