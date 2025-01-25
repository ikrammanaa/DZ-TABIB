// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import fr from './locales/fr.json';

// Initialize i18next
i18n
  .use(initReactI18next)  // Passes i18n down to react-i18next
  .init({
    resources: {
      en: { translation: en },  // English translations
      fr: { translation: fr },  // French translations
    },
    lng: 'en',  // Default language
    fallbackLng: 'en',  // Fallback language in case of missing translations
    interpolation: {
      escapeValue: false,  // React already does escaping
    },
  });

export default i18n;
