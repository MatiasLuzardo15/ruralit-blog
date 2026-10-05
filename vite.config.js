import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import { resolve } from 'path';

/**
 * La documentación es una sola página (docs/index.html) que resuelve sus
 * rutas en el navegador. En producción lo hace el rewrite de vercel.json;
 * acá, en `vite` y `vite preview`, se sirve el mismo HTML para /docs/*.
 */
const docsFallback = () => {
  const rewrite = (req, _res, next) => {
    const [pathname, search = ''] = (req.url ?? '').split('?');
    if (/^\/docs(\/[^.]*)?$/.test(pathname)) req.url = `/docs/index.html${search ? `?${search}` : ''}`;
    next();
  };
  return {
    name: 'docs-spa-fallback',
    configureServer(server) { server.middlewares.use(rewrite); },
    configurePreviewServer(server) { server.middlewares.use(rewrite); },
  };
};

export default defineConfig({
  plugins: [react(), docsFallback()],
  appType: 'mpa',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        privacidad: resolve(__dirname, 'privacidad/index.html'),
        terminos: resolve(__dirname, 'terminos/index.html'),
        faq: resolve(__dirname, 'faq/index.html'),
        manual: resolve(__dirname, 'manual/index.html'),
        docs: resolve(__dirname, 'docs/index.html'),
        planes: resolve(__dirname, 'planes/index.html'),
        novas: resolve(__dirname, 'novedades/index.html'),
        'dictado-inteligente': resolve(__dirname, 'novedades/dictado-inteligente.html'),
        'actividad-del-equipo': resolve(__dirname, 'novedades/actividad-del-equipo.html'),
        'chats-del-equipo': resolve(__dirname, 'novedades/chats-del-equipo.html'),
        'motor-impositivo': resolve(__dirname, 'novedades/motor-impositivo.html'),
        'lectura-automatica': resolve(__dirname, 'novedades/lectura-automatica.html'),
        'control-de-stock': resolve(__dirname, 'novedades/control-de-stock.html'),
        'establecimientos-compartidos': resolve(__dirname, 'novedades/establecimientos-compartidos.html'),
        'organiza-los-gastos': resolve(__dirname, 'novedades/organiza-los-gastos.html'),
        'importar-datos-excel': resolve(__dirname, 'novedades/importar-datos-excel.html'),
      },
    },
  },
});
