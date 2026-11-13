// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Cambia esto por el dominio definitivo (se usa para las URLs canónicas y Open Graph).
  site: 'https://buenasnoticiascoruna.es',

  vite: {
    plugins: [tailwindcss()],
  },
});