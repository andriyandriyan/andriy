import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import compress from 'astro-compress';
import robotsTxt from 'astro-robots-txt';

export default defineConfig({
  site: process.env.SITE_URL,
  integrations: [tailwind(), react(), sitemap(), robotsTxt(), compress()]
});