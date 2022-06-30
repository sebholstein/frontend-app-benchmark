import { defineConfig } from 'astro/config';

import solid from '@astrojs/solid-js';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  integrations: [solid(), tailwind(), sitemap()],
  vite: {
    server: {
      proxy: {
        '/results-data': {
          target: 'http://127.0.0.1:3201',
        },
      },
    },
  },
});
