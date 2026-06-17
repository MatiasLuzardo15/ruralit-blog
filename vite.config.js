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
        novas: resolve(__dirname, 'novedades/index.html'),
        'dictado-inteligente': resolve(__dirname, 'novedades/dictado-inteligente.html'),
        'motor-impositivo': resolve(__dirname, 'novedades/motor-impositivo.html'),
        'lectura-automatica': resolve(__dirname, 'novedades/lectura-automatica.html'),
        'control-de-stock': resolve(__dirname, 'novedades/control-de-stock.html'),
        'establecimientos-compartidos': resolve(__dirname, 'novedades/establecimientos-compartidos.html'),
        'organiza-los-gastos': resolve(__dirname, 'novedades/organizá-los-gastos.html'),
        'importar-datos-excel': resolve(__dirname, 'novedades/importar-datos-excel.html'),
      },
    },
  },
});
