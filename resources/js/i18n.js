import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';


// 
import fr from './assets/translations/fr.json';
import ar from './assets/translations/ar.json';

const localStorageValue = localStorage?.getItem('language') || 'ar';

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        // init data

        lng: 'ar',
        resources: {
            fr: {
                translation: fr
            },
            ar: {
                translation: ar
            }
        },
        fallbackLng: localStorageValue,
        debug: true,
        preload: ['ar', 'fr'],

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        // SSR
        react: {
            useSuspense: false,
        },
    });

export default i18n;