import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest.json';

const isFirefox = process.env.FIREFOX === 'true';

export default defineConfig({
  server: {
    cors: {
      origin: [/^chrome-extension:\/\//, /^moz-extension:\/\//],
    },
  },
  plugins: [
    react(),
    crx({
      manifest,
      browser: isFirefox ? 'firefox' : 'chrome'
    }),
  ],
});
