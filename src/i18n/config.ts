import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from '@/locales/en/common.json';
import enHome from '@/locales/en/home.json';
import zhCommon from '@/locales/zh/common.json';
import zhHome from '@/locales/zh/home.json';

export const resources = {
  en: {
    common: enCommon,
    home: enHome,
  },
  zh: {
    common: zhCommon,
    home: zhHome,
  },
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common', 'home'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
