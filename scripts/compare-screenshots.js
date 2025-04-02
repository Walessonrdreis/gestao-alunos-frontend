/**
 * Script para gerar capturas de tela comparativas dos frontends PHP e React
 * 
 * Este script utiliza Puppeteer para criar capturas de tela dos dois frontends
 * (PHP e React) de forma automatizada, para facilitar a comparação visual.
 * 
 * Para executar:
 * 1. Instale as dependências: npm install puppeteer
 * 2. Execute o script: node scripts/compare-screenshots.js
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// URLs dos frontends
const PHP_URL = 'https://www.reisbatech.com';
const REACT_URL = 'http://localhost:5173';

// Caminhos para salvar as capturas de tela
const SCREENSHOTS_DIR = path.join(__dirname, '../screenshots');

// Lista de páginas para capturar
const PAGES = [
  { name: 'home', path: '/', title: 'Dashboard' },
  { name: 'alunos-lista', path: '/alunos', title: 'Lista de Alunos' },
  { name: 'aluno-cadastro', path: '/alunos/novo', title: 'Cadastro de Aluno' },
  { name: 'login', path: '/login', title: 'Login' },
];

/**
 * Cria o diretório para salvar as capturas de tela se não existir
 */
function createScreenshotsDir() {
  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  }
}

/**
 * Captura tela de uma página específica em ambos os frontends
 * 
 * @param {Object} browser - Instância do navegador Puppeteer
 * @param {Object} page - Objeto com informações da página a ser capturada
 */
async function captureScreenshots(browser, page) {
  console.log(`\nCapturando screenshots para: ${page.title}`);
  
  // Captura frontend PHP
  console.log(`- Capturando frontend PHP (${page.path})...`);
  const phpPage = await browser.newPage();
  await phpPage.setViewport({ width: 1280, height: 800 });
  
  try {
    await phpPage.goto(`${PHP_URL}${page.path}`, { waitUntil: 'networkidle2', timeout: 30000 });
    await phpPage.screenshot({ 
      path: path.join(SCREENSHOTS_DIR, `php-${page.name}.png`),
      fullPage: true
    });
    console.log('  ✓ Frontend PHP capturado com sucesso');
  } catch (error) {
    console.error(`  ✗ Erro ao capturar frontend PHP: ${error.message}`);
  } finally {
    await phpPage.close();
  }
  
  // Captura frontend React
  console.log(`- Capturando frontend React (${page.path})...`);
  const reactPage = await browser.newPage();
  await reactPage.setViewport({ width: 1280, height: 800 });
  
  try {
    await reactPage.goto(`${REACT_URL}${page.path}`, { waitUntil: 'networkidle2', timeout: 30000 });
    await reactPage.screenshot({ 
      path: path.join(SCREENSHOTS_DIR, `react-${page.name}.png`),
      fullPage: true
    });
    console.log('  ✓ Frontend React capturado com sucesso');
  } catch (error) {
    console.error(`  ✗ Erro ao capturar frontend React: ${error.message}`);
  } finally {
    await reactPage.close();
  }
}

/**
 * Gera uma página HTML com as comparações lado a lado
 */
function generateComparisonPage() {
  let html = `
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Comparação Visual: PHP vs React</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      max-width: 1800px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 {
      text-align: center;
      margin-bottom: 30px;
    }
    .comparison {
      margin-bottom: 50px;
      border: 1px solid #ddd;
      border-radius: 5px;
      overflow: hidden;
    }
    .comparison-header {
      background-color: #f0f0f0;
      padding: 15px;
      border-bottom: 1px solid #ddd;
    }
    .comparison-content {
      display: flex;
      flex-wrap: wrap;
    }
    .side {
      flex: 1;
      min-width: 45%;
      padding: 15px;
      box-sizing: border-box;
    }
    .side:first-child {
      border-right: 1px solid #ddd;
    }
    .side h3 {
      margin-top: 0;
    }
    img {
      max-width: 100%;
      border: 1px solid #eee;
    }
    @media (max-width: 1200px) {
      .comparison-content {
        flex-direction: column;
      }
      .side:first-child {
        border-right: none;
        border-bottom: 1px solid #ddd;
      }
    }
  </style>
</head>
<body>
  <h1>Comparação Visual: Frontend PHP vs Frontend React</h1>
  <p>
    Esta página exibe capturas de tela lado a lado do sistema de gerenciamento de alunos
    em suas duas implementações: o site PHP original em produção e a nova versão React.
  </p>
  `;
  
  // Adiciona cada comparação
  for (const page of PAGES) {
    html += `
  <div class="comparison">
    <div class="comparison-header">
      <h2>${page.title} (${page.path})</h2>
    </div>
    <div class="comparison-content">
      <div class="side">
        <h3>Frontend PHP (Original)</h3>
        <img src="php-${page.name}.png" alt="Frontend PHP - ${page.title}">
      </div>
      <div class="side">
        <h3>Frontend React (Novo)</h3>
        <img src="react-${page.name}.png" alt="Frontend React - ${page.title}">
      </div>
    </div>
  </div>
    `;
  }
  
  html += `
  <footer>
    <p>Gerado automaticamente em ${new Date().toLocaleString()}</p>
  </footer>
</body>
</html>
  `;
  
  fs.writeFileSync(path.join(SCREENSHOTS_DIR, 'comparison.html'), html);
  console.log(`\nPágina de comparação gerada: ${path.join(SCREENSHOTS_DIR, 'comparison.html')}`);
}

/**
 * Função principal que orquestra todo o processo
 */
async function main() {
  console.log('Iniciando captura de screenshots comparativos...');
  createScreenshotsDir();
  
  const browser = await puppeteer.launch({ 
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    // Processa cada página
    for (const page of PAGES) {
      await captureScreenshots(browser, page);
    }
    
    // Gera a página HTML de comparação
    generateComparisonPage();
    
    console.log('\nProcesso concluído com sucesso!');
    console.log(`As capturas de tela foram salvas em: ${SCREENSHOTS_DIR}`);
    console.log('Para visualizar as comparações, abra o arquivo comparison.html em um navegador.');
  } catch (error) {
    console.error(`\nErro durante o processo: ${error.message}`);
  } finally {
    await browser.close();
  }
}

// Executa a função principal
main().catch(console.error); 