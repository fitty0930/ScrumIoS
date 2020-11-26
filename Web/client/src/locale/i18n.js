import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './en.json';
import es from './es.json';

// Following the Step-By-Step: https://react.i18next.com/legacy-v9/step-by-step-guide

const resources = {
    en: {
        translation: en
    },
    es: {
        translation: es
    }
};

const getLang = () => {
    let langNavigator = window.navigator.language || navigator.browserLanguage;
    let array = langNavigator.split("-");
    return array[0];
}

i18n
    .use(Backend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        resources,
        lng: getLang(),
        fallbackLng: 'en',
        debug: true,
        supportedLngs: ['es', 'en'],
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        }
    });


export default i18n;