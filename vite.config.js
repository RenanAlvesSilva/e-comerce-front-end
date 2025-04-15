import { defineConfig } from 'vite';
import { resolve } from 'path';
import { glob } from 'glob';

// Obtém todos os arquivos JS da raiz e da pasta JS
const jsFiles = [...glob.sync('*.js', { ignore: ['vite.config.js', 'server.js', 'healthcheck.js'] }), ...glob.sync('js/*.js')];

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        personalizar: resolve(__dirname, 'personalizar.html'),
        // Inclua cada arquivo JS como entrada separada
        ...Object.fromEntries(
          jsFiles.map(file => [
            // Use o nome do arquivo sem extensão como chave
            file.replace('.js', '').replace('/', '-'),
            // Caminho completo para o arquivo
            resolve(__dirname, file)
          ])
        )
      }
    },
    // Preserva a estrutura de diretórios original
    outDir: 'dist',
    assetsDir: 'assets',
    // Garante que os arquivos não processados sejam copiados para o dist
    copyPublicDir: true
  }
});