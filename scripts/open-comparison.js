/**
 * Script para abrir os dois frontends em navegadores para comparação visual manual
 * 
 * Este script é uma alternativa mais simples ao compare-screenshots.js,
 * permitindo comparação visual sem necessidade de Puppeteer.
 * 
 * Para executar:
 * node scripts/open-comparison.js
 */

const { exec } = require('child_process');
const readline = require('readline');

// URLs dos frontends
const PHP_URL = 'https://www.reisbatech.com';
const REACT_URL = 'http://localhost:5173';

// Lista de páginas para comparar
const PAGES = [
  { name: 'Dashboard', path: '/' },
  { name: 'Lista de Alunos', path: '/alunos' },
  { name: 'Cadastro de Aluno', path: '/alunos/novo' },
  { name: 'Login', path: '/login' },
];

// Interface para leitura de entrada do usuário
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Detecta o sistema operacional para escolher o comando correto para abrir o navegador
 * @returns {string} Comando para abrir o navegador
 */
function getBrowserCommand() {
  const platform = process.platform;
  
  if (platform === 'win32') {
    return 'start';
  } else if (platform === 'darwin') {
    return 'open';
  } else {
    return 'xdg-open';
  }
}

/**
 * Abre uma URL específica no navegador padrão
 * @param {string} url URL a ser aberta
 */
function openBrowser(url) {
  const command = getBrowserCommand();
  exec(`${command} ${url}`);
}

/**
 * Abre as duas versões de uma página específica para comparação
 * @param {Object} page Objeto com informações da página
 */
function openComparison(page) {
  console.log(`\nAbrindo páginas para comparação: ${page.name}`);
  console.log(`- PHP: ${PHP_URL}${page.path}`);
  console.log(`- React: ${REACT_URL}${page.path}`);
  
  openBrowser(`${PHP_URL}${page.path}`);
  openBrowser(`${REACT_URL}${page.path}`);
}

/**
 * Exibe menu de páginas para comparar
 */
function showMenu() {
  console.log('\n=== COMPARAÇÃO VISUAL DE FRONTENDS ===');
  console.log('Escolha a página para comparar:');
  
  PAGES.forEach((page, index) => {
    console.log(`${index + 1}. ${page.name}`);
  });
  
  console.log(`${PAGES.length + 1}. Comparar todas as páginas`);
  console.log('0. Sair');
  
  rl.question('\nDigite sua escolha: ', (answer) => {
    const choice = parseInt(answer, 10);
    
    if (choice === 0) {
      console.log('Saindo do programa...');
      rl.close();
      return;
    }
    
    if (choice === PAGES.length + 1) {
      // Abrir todas as páginas
      console.log('\nAbrindo todas as páginas para comparação...');
      PAGES.forEach(page => {
        openComparison(page);
      });
    } else if (choice >= 1 && choice <= PAGES.length) {
      // Abrir página específica
      openComparison(PAGES[choice - 1]);
    } else {
      console.log('Opção inválida!');
    }
    
    // Perguntar se deseja continuar
    setTimeout(() => {
      rl.question('\nDeseja comparar outra página? (s/n): ', (answer) => {
        if (answer.toLowerCase() === 's') {
          showMenu();
        } else {
          console.log('Saindo do programa...');
          rl.close();
        }
      });
    }, 1000);
  });
}

/**
 * Verifica se o frontend React está rodando
 */
function checkReactFrontend() {
  console.log('Verificando se o frontend React está rodando...');
  
  // Usa fetch para verificar se o servidor está respondendo
  const http = require('http');
  const url = new URL(REACT_URL);
  
  const req = http.request(
    {
      hostname: url.hostname,
      port: url.port,
      path: '/',
      method: 'HEAD',
      timeout: 3000
    },
    (res) => {
      if (res.statusCode === 200) {
        console.log('✓ Frontend React está rodando!');
        showMenu();
      } else {
        console.log(`✗ Frontend React respondeu com status ${res.statusCode}`);
        askToStartFrontend();
      }
    }
  );
  
  req.on('error', () => {
    console.log('✗ Frontend React não está rodando!');
    askToStartFrontend();
  });
  
  req.on('timeout', () => {
    req.destroy();
    console.log('✗ Timeout ao verificar o frontend React!');
    askToStartFrontend();
  });
  
  req.end();
}

/**
 * Pergunta se o usuário deseja iniciar o frontend React
 */
function askToStartFrontend() {
  rl.question('Deseja iniciar o frontend React agora? (s/n): ', (answer) => {
    if (answer.toLowerCase() === 's') {
      console.log('\nIniciando o frontend React...');
      console.log('Executando: npm run dev');
      console.log('\nIMPORTANTE: Quando o servidor estiver pronto, abra outro terminal e execute este script novamente.');
      
      const child = exec('npm run dev', { cwd: process.cwd() });
      
      // Encaminha a saída do processo para o console
      child.stdout.pipe(process.stdout);
      child.stderr.pipe(process.stderr);
      
      rl.close();
    } else {
      console.log('\nPor favor, inicie o frontend React antes de usar este script:');
      console.log('npm run dev');
      rl.close();
    }
  });
}

// Inicia o programa
console.log('Ferramenta de Comparação Visual - Frontend PHP vs React');
checkReactFrontend(); 