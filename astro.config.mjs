// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Dominio definitivo: se usa para las URLs canónicas, Open Graph y el sitemap.
  site: 'https://buenasnoticiascoruna.es',

  i18n: {
    locales: ['es', 'gl'],
    defaultLocale: 'es',
    routing: {
      // Español en la raíz (/, /predicas); gallego con prefijo (/gl/, /gl/predicas).
      prefixDefaultLocale: false,
    },
  },

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: { es: 'es-ES', gl: 'gl-ES' },
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});