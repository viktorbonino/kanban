import i18n from 'i18next';
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from 'locales/en.json'
import it from 'locales/it.json'

const resources = {
  en: {
    translation: en
  },
  it: {
    translation: it
  }
}

i18n
  .use(initReactI18next) 
  .use(LanguageDetector)
  .init({
    resources,
    lng: "en",

    keySeparator: false, 

    interpolation: {
      escapeValue: false
    }
  })

export default i18n