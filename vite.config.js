import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  appType: 'mpa',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        privacidad: resolve(__dirname, 'privacidad/index.html'),
        terminos: resolve(__dirname, 'terminos/index.html'),
        faq: resolve(__dirname, 'faq/index.html'),
        manual: resolve(__dirname, 'manual/index.html'),
        futuro: resolve(__dirname, 'futuro/index.html'),
      },
    },
  },
});
