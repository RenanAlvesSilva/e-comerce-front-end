import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        personalizar: resolve(__dirname, 'personalizar.html')
      }
    },
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true
  }
});