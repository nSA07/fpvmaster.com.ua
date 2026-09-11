import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import partytown from '@astrojs/partytown';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  integrations: [react(), partytown()],
  vite: {
    plugins: [tailwindcss()],
  },
});