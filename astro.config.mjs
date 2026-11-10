// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

/** @type {import('astro').AstroUserConfig} */
export default defineConfig({
  site: 'https://amireslamdoust.github.io',
  base: '/',
  output: 'static',
  integrations: [react(), mdx()],
  vite: {
    resolve: {
      alias: {
        '@domain': '/src/domain',
        '@design-system': '/src/design-system',
        '@features': '/src/features',
        '@shared': '/src/shared',
        '@diagrams': '/src/diagrams',
        '@content': '/src/content',
      },
    },
  },
});
