import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { hydrateRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { LaravelReactI18nProvider } from 'laravel-react-i18n';
// import "./i18n";

const appName = import.meta.env.VITE_APP_NAME || 'RUMAH PARFUM';

createInertiaApp({
    title: (title) => `${title}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        const language = localStorage.getItem("language") || "ar";
        root.render((
            <LaravelReactI18nProvider
                locale='ar'
                fallbackLocale={language}
                files={import.meta.glob('/lang/*.json')}
            >
                <App {...props} />
            </LaravelReactI18nProvider>
        ));

        // hydrateRoot(el, (
        //     <LaravelReactI18nProvider
        //         locale='ar'
        //         fallbackLocale='ar'
        //         files={import.meta.glob('/lang/*.json')}
        //     >
        //         <App {...props} />
        //     </LaravelReactI18nProvider>
        // ))
    },
    progress: {
        color: '#4B5563',
    },
});
