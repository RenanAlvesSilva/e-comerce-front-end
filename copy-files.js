// copy-files.js
import fs from 'fs';
import path from 'path';

const srcFiles = ['orderapi.js', 'algumOutro.js']; // coloque aqui os nomes dos seus arquivos
const srcDir = path.resolve('js');
const destDir = path.resolve('dist/js');

// Cria a pasta dist/js se não existir
fs.mkdirSync(destDir, { recursive: true });

// Copia cada arquivo
for (const file of srcFiles) {
  const srcPath = path.join(srcDir, file);
  const destPath = path.join(destDir, file);

  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`✅ Copiado: ${file}`);
  } else {
    console.warn(`⚠️ Arquivo não encontrado: ${file}`);
  }
}
