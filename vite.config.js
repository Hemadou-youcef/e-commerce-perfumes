import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import i18n from 'laravel-react-i18n/vite';
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        i18n(),
        VitePWA({ registerType: 'autoUpdate' })
    ],
    // ADD REACT ICONS  TO SSR AND react-i18next TO CLIENT
    ssr:{
        noExternal: ['react-icons']
    }
});
