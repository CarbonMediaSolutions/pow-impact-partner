import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from '@/locales/en/common.json';
import enHome from '@/locales/en/home.json';
import enAbout from '@/locales/en/about.json';
import enSolutions from '@/locales/en/solutions.json';
import enPerspectives from '@/locales/en/perspectives.json';
import enAnalysis from '@/locales/en/analysis.json';
import enBook from '@/locales/en/book.json';
import enSubmit from '@/locales/en/submit.json';

import zhCommon from '@/locales/zh/common.json';
import zhHome from '@/locales/zh/home.json';
import zhAbout from '@/locales/zh/about.json';
import zhSolutions from '@/locales/zh/solutions.json';
import zhPerspectives from '@/locales/zh/perspectives.json';
import zhAnalysis from '@/locales/zh/analysis.json';
import zhBook from '@/locales/zh/book.json';
import zhSubmit from '@/locales/zh/submit.json';

export const resources = {
  en: {
    common: enCommon,
    home: enHome,
    about: enAbout,
    solutions: enSolutions,
    perspectives: enPerspectives,
    analysis: enAnalysis,
    book: enBook,
    submit: enSubmit,
  },
  zh: {
    common: zhCommon,
    home: zhHome,
    about: zhAbout,
    solutions: zhSolutions,
    perspectives: zhPerspectives,
    analysis: zhAnalysis,
    book: zhBook,
    submit: zhSubmit,
  },
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common', 'home', 'about', 'solutions', 'perspectives', 'analysis', 'book', 'submit'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
