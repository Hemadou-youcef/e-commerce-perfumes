import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    server: {
        // host: true,
        // hmr: {
        //     host: '192.168.8.3',
        // },
    },
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            refresh: true,
        }),
        react(),
        VitePWA({ registerType: 'autoUpdate' })
    ],
});
