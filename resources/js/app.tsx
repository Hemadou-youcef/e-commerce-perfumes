import './bootstrap';
import '../css/app.css';

// import { createRoot } from 'react-dom/client';
import { hydrateRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import "./i18n";

const appName = import.meta.env.VITE_APP_NAME || 'RUMAH PARFUM';

createInertiaApp({
    title: (title) => `${title}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        // const root = createRoot(el);

        // root.render(<App {...props} />);
        
        hydrateRoot(el, <App {...props} />)
    },
    progress: {
        color: '#4B5563',
    },
});
