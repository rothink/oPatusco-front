import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
import path from 'path';

export default defineConfig({
  plugins: [vue(), vuetify({ autoImport: true })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom', // Define o ambiente de teste para jsdom
    setupFiles: ['./tests/setup/vuetifySetup.js', './tests/setup/globalMocks.js'], // Adiciona o mock de ResizeObserver
    deps: {
      inline: ["vuetify"],
    },
    globals: true,
  },
});
