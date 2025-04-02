# Frontend React - Sistema de Gerenciamento de Alunos

Este é o frontend React para o Sistema de Gerenciamento de Alunos, desenvolvido como uma duplicação exata do frontend PHP existente.

## Duplicação do Frontend PHP

Este projeto React é uma **duplicação exata** do frontend PHP encontrado em `src/frontend`. Todos os componentes, páginas, estilos e funcionalidades foram recriados para corresponder exatamente à versão PHP original.

### Correspondência de Arquivos

| Frontend PHP | Frontend React |
|--------------|----------------|
| `index.php` | `src/App.tsx` |
| `pages/Login/index.php` | `src/pages/Login/Login.tsx` |
| `pages/Signup/index.php` | `src/pages/Signup/Signup.tsx` |
| `templates/main.php` | `src/App.tsx (MainContent)` |
| `templates/header.php` | `src/App.tsx (Header)` |
| `templates/footer.php` | `src/App.tsx (Footer)` |
| `styles/auth.css` | `src/styles/auth.css` |
| `styles/index.css` | `src/styles/index.css` |

### Componentes Duplicados

- **Sistema de Autenticação**: Login e cadastro idênticos ao PHP
- **Layout Principal**: Header, footer e estrutura de página
- **Formulário de Alunos**: Interface para cadastro e edição
- **Listagem de Alunos**: Visualização e filtros

## Como Verificar a Duplicação

Para verificar que ambos os frontends são visualmente e funcionalmente idênticos:

1. **Inicie o servidor PHP**:
   ```bash
   cd /home/walas/projects/gerenciamentodealunos/src/frontend
   php -S localhost:8000
   ```

2. **Inicie o servidor React**:
   ```bash
   cd /home/walas/projects/gerenciamentodealunos/src/frontend-react
   npm run dev
   ```

3. **Acesse ambos os frontends**:
   - Frontend PHP: http://localhost:8000
   - Frontend React: http://localhost:5173

4. **Compare visualmente**:
   - Verifique que todas as páginas têm aparência idêntica
   - Teste os formulários e interações
   - Confirme que o comportamento é o mesmo

## Notas Importantes

1. **Autenticação**: O sistema de autenticação no React é simulado localmente, enquanto o PHP usa sessões do servidor.
2. **API**: O React está configurado para se conectar às mesmas APIs que o PHP utiliza.
3. **Scripts Externos**: Foram incluídos os mesmos scripts externos (jQuery, Bootstrap, etc.) para garantir compatibilidade.
4. **CSS**: Os estilos foram duplicados exatamente para garantir a mesma aparência visual.

## Estado Atual do Projeto

O projeto atualmente implementa:

- ✅ **Sistema de Autenticação**: Login e Cadastro de usuários funcionais
- ✅ **Layout Principal**: Estrutura de página idêntica ao PHP
- ✅ **Formulário de Alunos**: Interface para cadastro e edição de alunos
- ✅ **Listagem de Alunos**: Visualização, filtragem e pesquisa de alunos

## Tecnologias Utilizadas

- React 18
- TypeScript 4.9+
- React Router v6
- Bootstrap 5 (mesma versão do PHP)
- Context API para gerenciamento de estado
- CSS Modules para estilos encapsulados

## Estrutura do Projeto

O projeto segue uma estrutura organizada e modular, atualizada para seguir as melhores práticas React:

```
/src
  /assets          # Recursos estáticos (imagens, ícones, fontes)
  /components      # Componentes reutilizáveis
    /ui            # Componentes de UI básicos
      /Alert       # Cada componente em sua própria pasta com index.tsx
      /AlunoCard
      /AlunosList
      /AlunosListHeader
    /layout        # Componentes de estrutura (Header, Footer)
  /contexts        # Context API para estado global (AuthContext)
  /hooks           # Hooks personalizados (useAlunoForm, etc)
  /pages           # Componentes de página/rotas
    /AlunoForm     # Cada página em sua própria pasta com index.tsx
    /AlunosListPage
    /Dashboard
    /Login
    /NotFound
    /Signup
  /services        # Serviços de API, autenticação, etc
  /styles          # Estilos globais e módulos CSS
    /modules       # CSS Modules para estilos específicos
  /types           # Definições de tipos TypeScript
  /utils           # Funções utilitárias (validações, formatadores)
```

## Práticas Implementadas

### Componentes React

- **Estrutura de Diretórios**: Cada componente/página tem sua própria pasta com arquivos relacionados
- **Componentes Funcionais**: Utilizamos exclusivamente componentes funcionais com React Hooks
- **Responsabilidade Única**: Cada componente tem uma única responsabilidade bem definida
- **CSS Modules**: Estilos encapsulados evitando conflitos de nome de classes
- **Componentização Efetiva**: Extraímos lógicas repetitivas em componentes menores reutilizáveis

### TypeScript e Documentação

- **Comentários TSDoc**: Componentes, hooks e interfaces documentados com sintaxe TSDoc
- **Tipagem Estrita**: Uso de interfaces e types para garantir corretude do código
- **Exemplos de Uso**: Exemplos incluídos nos comentários para clareza

### Autenticação e Navegação

- **Context API**: Sistema de autenticação implementado com Context API
- **Proteção de Rotas**: Rotas protegidas que redirecionam usuários não autenticados
- **Login Simplificado**: Em modo de desenvolvimento, aceita qualquer email/senha

### Formulários e UI

- **Validação de Formulários**: Sistema de validação de campos implementado
- **Feedback Visual**: Alertas e mensagens de erro/sucesso para usuários
- **Responsividade**: Interface adaptável a diferentes tamanhos de tela

## Componentes Principais

### Páginas
- **Login**: Autenticação de usuários
- **Signup**: Cadastro de novos usuários
- **Dashboard**: Página principal (versão simplificada)
- **AlunoForm**: Formulário para criação e edição de alunos
- **AlunosListPage**: Listagem de alunos com filtros e pesquisa
- **NotFound**: Página 404 para rotas inexistentes

### Componentes UI
- **Alert**: Componente para mensagens ao usuário (sucesso, erro, etc.)
- **AlunoCard**: Exibe informações de um aluno em formato de card
- **AlunosList**: Lista paginada de cards de alunos
- **AlunosListHeader**: Filtros e barra de pesquisa para a lista de alunos

### Contextos
- **AuthContext**: Gerencia autenticação e autorização de usuários

## Instalação e Execução

### Requisitos
- Node.js 18.x ou superior
- npm 9.x ou superior

### Passos
1. Clone o repositório
2. Navegue até a pasta do projeto: `cd src/frontend-react`
3. Instale as dependências: `npm install`
4. Inicie o servidor de desenvolvimento: `npm run dev`

O aplicativo estará disponível em `http://localhost:5173`.

## Construção para Produção

```bash
npm run build
```

Os arquivos serão gerados na pasta `dist`.

## Como Iniciar o Projeto

Para executar o projeto localmente, siga estas etapas:

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Iniciar o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

3. **Construir para produção**:
   ```bash
   npm run build
   ```

4. **Visualizar versão de produção**:
   ```bash
   npm run preview
   ```

## Comparação com o Frontend PHP

Para comparar o frontend React com a versão PHP existente, você pode executar ambos simultaneamente:

```bash
npm run compare
```

Este comando iniciará:
- Frontend PHP em: http://localhost:8000
- Frontend React em: http://localhost:5173

Você pode então acessar ambos os endereços para comparar visualmente e funcionalmente as duas implementações.

### Diferenças Notáveis

1. **Arquitetura**: 
   - PHP: Renderização server-side tradicional
   - React: Single Page Application (SPA) com renderização client-side

2. **Experiência do Usuário**:
   - PHP: Recarrega a página em transições
   - React: Navegação fluida sem recarregamento de página

3. **Código e Manutenção**:
   - PHP: Código mais simples, porém com maior acoplamento
   - React: Código mais modular, componentizado e tipado

## Próximos Passos

- Implementação completa do Dashboard
- Conectar com API real para operações CRUD
- Implementar testes automatizados
- Adicionar funcionalidades de relatórios e estatísticas
