import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 
import fr from './assets/translations/fr.json';
import ar from './assets/translations/ar.json';

i18n
    .use(initReactI18next)
    .init({
        // init data
        resources: {
            fr: {
                translation: fr
            },
            ar: {
                translation: ar
            }
        },
        fallbackLng: localStorage.getItem('language') || 'ar',
        debug: false,

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        }
    });

export default i18n;