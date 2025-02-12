import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  if (mode === 'development') {
    return {
      plugins: [react(), tailwindcss()],
      server: {
        host: true,
        port: 5173
      }
    }
  }
  
  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        '/api': {
          target: 'https://api.commars.whqtker.site',
          changeOrigin: true,
          secure: false,
        }
      }
    }
  }
});