# FIAP Blog - Frontend

Este é o frontend do FIAP Blog, uma aplicação web desenvolvida em React que permite a criação, visualização e gerenciamento de posts em um blog, com funcionalidades específicas para professores e alunos.

> **Nota**: Atualizado em 07/10/2025 com novas funcionalidades de controle de acesso e sistema de comentários.

## 🚀 Tecnologias Utilizadas

- React
- Vite
- React Router Dom
- Styled Components
- Axios
- Context API para gerenciamento de estado

## 📋 Requisitos do Sistema

- Node.js (versão 14 ou superior)
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Felipe-Lopes-code/fiapBlog-frontEnd.git
cd fiapBlog-frontEnd
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto
   - Adicione a URL da API:
```env
VITE_API_URL=http://localhost:3000
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## 🔍 Problemas Conhecidos e Soluções

### Testes

1. **Erro: ThemeProvider "theme" prop is required**
   - **Problema**: O styled-components requer um tema válido durante os testes
   - **Solução**: Criamos um `ThemeProviderWrapper` que encapsula o tema e fornece-o para os componentes
   - **Arquivo**: `src/styles/ThemeProvider.jsx`

2. **Erro: You cannot render a <Router> inside another <Router>**
   - **Problema**: O componente App inclui um BrowserRouter, que conflita com o BrowserRouter dos testes
   - **Solução**: Criamos um componente `TestApp` específico para testes que não inclui o BrowserRouter
   - **Arquivo**: `src/test/TestApp.jsx`

3. **Aviso: @import CSS syntax in createGlobalStyle**
   - **Status**: Não afeta a funcionalidade dos testes
   - **Solução alternativa**: Considerar o uso de react-helmet ou incluir os estilos diretamente no index.html

### Boas Práticas de Teste

1. **Providers nos Testes**
   ```jsx
   const renderWithProviders = (component) => {
     return render(
       <BrowserRouter>
         <ThemeProviderWrapper>
           <AuthProvider>
             {component}
           </AuthProvider>
         </ThemeProviderWrapper>
       </BrowserRouter>
     );
   };
   ```

2. **Componente de Teste Dedicado**
   - Criar versões específicas para teste de componentes que dependem de providers globais
   - Evitar duplicação de providers
   - Manter a consistência do estado da aplicação durante os testes

## 🏗️ Estrutura do Projeto

```
src/
├── api/
│   └── api.js              # Configuração e serviços do Axios
├── components/
│   ├── common/             # Componentes reutilizáveis
│   └── layout/            # Componentes de layout
├── context/
│   └── AuthContext.jsx     # Contexto de autenticação
├── hooks/
│   └── useApi.js          # Hooks personalizados
├── pages/                 # Páginas da aplicação
├── styles/                # Estilos e temas
└── routes/                # Configuração de rotas
```

## 📱 Funcionalidades

### Sistema de Posts
- Criação de posts (apenas professores)
- Visualização de posts (todos usuários)
- Edição de posts (apenas professores)
- Exclusão de posts (apenas professores)
- Campo de busca por título ou conteúdo
- Navegação intuitiva entre posts
- Exibição de autor e data de criação

### Sistema de Comentários
- Adição de comentários (todos usuários autenticados)
- Visualização de comentários (todos usuários)
- Exclusão de comentários (apenas professores)
- Exibição de autor do comentário
- Ordem cronológica dos comentários

### Área Administrativa (Professores)
- Dashboard com visão geral
- Gerenciamento completo de posts
- Moderação de comentários
- Interface intuitiva para criação/edição
- Feedback visual das ações

## 🔒 Autenticação e Segurança

### Sistema de Autenticação
- Utiliza JWT (JSON Web Tokens)
- Tokens armazenados no localStorage
- Interceptor Axios para injeção automática do token
- Expiração de token após 24 horas
- Criptografia de senhas com salt único por usuário

### Rotas Protegidas
- `/create` - Criação de posts (apenas professores)
- `/edit/:id` - Edição de posts (apenas professores)
- `/admin` - Painel administrativo (apenas professores)

### Controle de Acesso (RBAC)
#### 🎓 Alunos (STUDENT)
- Visualizar todos os posts
- Ler posts completos
- Adicionar comentários em posts
- Visualizar comentários

#### 👨‍🏫 Professores (PROFESSOR)
- Todas as permissões dos alunos
- Criar novos posts
- Editar posts existentes
- Excluir posts
- Excluir comentários
- Acessar área administrativa

### Segurança
- Validação de token em cada requisição
- Verificação de papel do usuário em cada operação sensível
- Proteção contra XSS
- Sanitização de dados de entrada

## 🎨 Estilização

O projeto utiliza Styled Components para estilização, com um sistema de tema consistente que inclui:
- Cores padronizadas
- Tipografia consistente
- Espaçamentos
- Sombras
- Componentes estilizados reutilizáveis

## 📱 Responsividade

## 🐞 Problemas Conhecidos e Soluções

### 1. Configuração do Vite
- **Problema**: Erro na configuração inicial do Vite com React
- **Solução**: Instalação do plugin @vitejs/plugin-react e configuração correta no vite.config.js
```bash
npm install @vitejs/plugin-react --save-dev
```

### 2. Mock API
- **Problema**: Dificuldades na formatação do arquivo mockApi.js e duplicação de dados
- **Solução**: Reescrita do arquivo com estrutura adequada e remoção de duplicações
- **Detalhes**: 
  - Implementação de array mockPosts com dados estruturados
  - Adição de delays artificiais para simular API real
  - Correção da formatação de template strings
  - Implementação de funções assíncronas com tratamento de erros

### 3. Desenvolvimento Atual
- Sistema de mock implementado com dados de exemplo
- Funcionalidades básicas de CRUD funcionando localmente
- Persistência de dados limitada à sessão do navegador

### 4. Próximos Passos
- Integração com backend real
- Implementação de testes automatizados
- Melhorias na UX/UI
- Cache de dados para melhor performance

A aplicação é totalmente responsiva, adaptando-se a diferentes tamanhos de tela:
- Desktop
- Tablet
- Mobile

## 🔄 Integração com Backend

A comunicação com o backend é feita através de uma API REST, utilizando o Axios para:
- Listagem de posts
- Criação de posts
- Edição de posts
- Exclusão de posts
- Autenticação de usuários
- Gerenciamento de comentários

## 🧪 Testes

### Executando os Testes

Para rodar os testes:
```bash
npm test
```

### Estrutura de Testes

O projeto utiliza:
- Vitest como test runner
- React Testing Library para testes de componentes
- Jest DOM para assertions relacionadas ao DOM

### Arquivos de Teste

```
src/
├── test/
│   ├── setup.js           # Configuração global dos testes
│   └── TestApp.jsx        # Versão do App específica para testes
├── App.test.jsx           # Testes de integração e segurança
└── styles/
    └── ThemeProvider.jsx  # Provider de tema com suporte a testes
```

### Testes de Segurança

Os testes cobrem:
1. Autenticação
   - Redirecionamento de usuários não autenticados
   - Proteção de rotas
2. Controle de Acesso
   - Permissões baseadas em papéis (aluno/professor)
   - Visibilidade condicional de funcionalidades

## 🚀 Deploy

Para fazer o build da aplicação:
```bash
npm run build
```

Os arquivos de build serão gerados na pasta `dist/`.

## 👥 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## ✨ Experiência e Desafios

Durante o desenvolvimento deste projeto, enfrentamos vários desafios interessantes:

1. **Autenticação**: Implementação de um sistema robusto de autenticação com rotas protegidas.
2. **Estado Global**: Gerenciamento eficiente do estado da aplicação usando Context API.
3. **Responsividade**: Criação de uma interface adaptável a diferentes dispositivos.
4. **Performance**: Otimização de carregamento e renderização de componentes.

## 🤝 Suporte

Em caso de dúvidas ou problemas, abra uma issue no repositório ou entre em contato com a equipe de desenvolvimento.