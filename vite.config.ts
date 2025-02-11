import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        host: 'www.commars.whqtker.site',
        https: true,
        headers: {
            'Cross-Origin-Opener-Policy': 'unsafe-none',
            'Cross-Origin-Embedder-Policy': 'unsafe-none',
        },
    },
});
