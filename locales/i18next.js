import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import nl from './nl.json';

export const languageResources = {
  en: en,
  nl:nl
};

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  fallbackLng: 'en',
  resources: languageResources,
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18next;
