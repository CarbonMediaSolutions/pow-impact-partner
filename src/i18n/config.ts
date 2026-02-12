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

import zhHantCommon from '@/locales/zh-Hant/common.json';
import zhHantHome from '@/locales/zh-Hant/home.json';
import zhHantAbout from '@/locales/zh-Hant/about.json';
import zhHantSolutions from '@/locales/zh-Hant/solutions.json';
import zhHantPerspectives from '@/locales/zh-Hant/perspectives.json';
import zhHantAnalysis from '@/locales/zh-Hant/analysis.json';
import zhHantBook from '@/locales/zh-Hant/book.json';
import zhHantSubmit from '@/locales/zh-Hant/submit.json';

import zhHansCommon from '@/locales/zh-Hans/common.json';
import zhHansHome from '@/locales/zh-Hans/home.json';
import zhHansAbout from '@/locales/zh-Hans/about.json';
import zhHansSolutions from '@/locales/zh-Hans/solutions.json';
import zhHansPerspectives from '@/locales/zh-Hans/perspectives.json';
import zhHansAnalysis from '@/locales/zh-Hans/analysis.json';
import zhHansBook from '@/locales/zh-Hans/book.json';
import zhHansSubmit from '@/locales/zh-Hans/submit.json';

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
  'zh-Hant': {
    common: zhHantCommon,
    home: zhHantHome,
    about: zhHantAbout,
    solutions: zhHantSolutions,
    perspectives: zhHantPerspectives,
    analysis: zhHantAnalysis,
    book: zhHantBook,
    submit: zhHantSubmit,
  },
  'zh-Hans': {
    common: zhHansCommon,
    home: zhHansHome,
    about: zhHansAbout,
    solutions: zhHansSolutions,
    perspectives: zhHansPerspectives,
    analysis: zhHansAnalysis,
    book: zhHansBook,
    submit: zhHansSubmit,
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
