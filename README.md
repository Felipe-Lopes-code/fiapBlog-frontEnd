# FIAP Blog - Frontend

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Tests](https://img.shields.io/badge/tests-12%2F12-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-53.65%25-yellow)
![Docker](https://img.shields.io/badge/docker-ready-blue)

Este é o frontend do FIAP Blog, uma aplicação web desenvolvida em React que permite a criação, visualização e gerenciamento de posts em um blog, com funcionalidades específicas para professores e alunos.

> **Atualizado**: 07/10/2025 - Implementado controle de acesso baseado em roles, sistema de testes completo, CI/CD e containerização Docker.

## 🎯 Funcionalidades

### 👥 Sistema de Autenticação
- Login com diferentes níveis de acesso (Professor/Aluno)
- Controle de rotas baseado em autenticação
- Sistema de tokens JWT

### 📝 Gerenciamento de Posts
- **Professores**: Criar, editar e excluir posts
- **Alunos**: Visualizar posts e adicionar comentários
- Sistema de comentários com moderação

### � Controle de Acesso
- Diferentes interfaces baseadas no papel do usuário
- Proteção de rotas sensíveis
- Validação de permissões no frontend

## 🚀 Tecnologias e Ferramentas

### Core
- **React 18** - Biblioteca principal
- **Vite** - Build tool e dev server
- **React Router Dom** - Roteamento
- **Styled Components** - Estilização
- **Material-UI** - Componentes UI

### Testes
- **Vitest** - Framework de testes
- **React Testing Library** - Testes de componentes
- **Jest DOM** - Matchers adicionais
- **Cobertura V8** - Relatórios de cobertura

### DevOps
- **Docker** - Containerização
- **GitHub Actions** - CI/CD
- **ESLint** - Qualidade de código
- **Dependabot** - Atualizações automáticas

## 📋 Requisitos do Sistema

- **Node.js** 18 ou superior
- **npm** 6 ou superior
- **Docker** (opcional, para containerização)
- **Git** para versionamento

## 🔧 Instalação e Configuração

### 🐳 Usando Docker (Recomendado)

1. Clone o repositório:
```bash
git clone https://github.com/Felipe-Lopes-code/fiapBlog-frontEnd.git
cd fiapBlog-frontEnd
```

2. Build e execute com Docker Compose:
```bash
# Desenvolvimento
docker-compose up frontend-dev

# Produção
docker-compose up frontend-prod

# Testes
docker-compose up frontend-test
```

### � Instalação Local

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
```env
# .env
VITE_API_URL=http://localhost:3000
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## 🧪 Testes

### Executar Testes
```bash
# Testes em modo watch
npm test

# Testes com cobertura
npm run test:coverage

# Testes no Docker
npm run docker:compose-test
```

### Cobertura Atual
- **Total**: 53.65% das linhas cobertas
- **Componentes**: 100% de cobertura
- **Layout**: 84.69% de cobertura
- **Estilos**: 100% de cobertura

## 🐳 Docker

### Comandos Disponíveis
```bash
# Build de produção
npm run docker:build

# Executar em produção
npm run docker:run

# Desenvolvimento com hot reload
npm run docker:run-dev

# Subir todos os serviços
npm run docker:compose-up
```

### Estrutura Docker
- **Dockerfile**: Build otimizado para produção
- **Dockerfile.dev**: Ambiente de desenvolvimento
- **docker-compose.yml**: Orquestração de serviços
- **nginx.conf**: Configuração customizada do Nginx

## 🚀 CI/CD Pipeline

### GitHub Actions
O projeto inclui pipeline completo de CI/CD:

1. **Lint**: Verificação de qualidade de código
2. **Test**: Execução de testes unitários
3. **Build**: Compilação da aplicação
4. **Docker**: Build e push de imagens
5. **Security**: Scan de vulnerabilidades
6. **Deploy**: Deploy automático (configurável)

### Workflows
- `.github/workflows/ci-cd.yml`: Pipeline principal
- `.github/workflows/dependabot.yml`: Auto-merge de dependências

## 🔍 Problemas Conhecidos e Soluções

### 🧪 Testes

#### ✅ Solucionados
1. **ThemeProvider "theme" prop is required**
   - **Solução**: Implementado `ThemeProviderWrapper` 
   - **Arquivo**: `src/styles/ThemeProvider.jsx`

2. **Router conflicts nos testes**
   - **Solução**: Criado `TestApp` dedicado para testes
   - **Arquivo**: `src/test/TestApp.jsx`

3. **React não definido em JSX**
   - **Solução**: Imports explícitos do React em arquivos de teste
   - **Configuração**: ESLint atualizado para React 18

#### ⚠️ Warnings Conhecidos
- **@import CSS syntax in createGlobalStyle**: Não afeta funcionalidade
- **Fast refresh warnings**: Normal em arquivos de contexto

### 🐳 Docker

#### Builds
- **Primeira build**: ~25 segundos (instala dependências)
- **Builds subsequentes**: ~15 segundos (usa cache)
- **Imagem final**: ~50MB (produção otimizada)

#### Troubleshooting
```bash
# Limpar cache Docker
docker system prune -f

# Rebuild sem cache
docker build --no-cache -t fiap-blog-frontend .

# Ver logs do container
docker logs <container-name>
```

## 📚 Estrutura do Projeto

```
fiapBlog-frontEnd/
├── 📁 .github/
│   ├── workflows/
│   │   ├── ci-cd.yml           # Pipeline principal
│   │   └── dependabot.yml      # Auto-merge de dependências
│   └── dependabot.yml          # Configuração do Dependabot
├── 📁 src/
│   ├── 📁 api/
│   │   ├── api.js              # Configuração Axios e serviços
│   │   ├── mockApi.js          # Mock da API para desenvolvimento
│   │   └── mockAuthApi.js      # Mock de autenticação
│   ├── 📁 components/
│   │   ├── common/
│   │   │   └── StyledComponents.jsx  # Componentes base estilizados
│   │   └── layout/
│   │       └── MainLayout.jsx  # Layout principal da aplicação
│   ├── 📁 context/
│   │   └── AuthContext.jsx     # Gerenciamento de estado de autenticação
│   ├── 📁 hooks/
│   │   ├── useApi.js           # Hook para chamadas da API
│   │   └── usePostsPresenter.js # Hook para lógica de posts
│   ├── 📁 pages/
│   │   ├── AdminPage.jsx       # Página de administração
│   │   ├── CreatePostPage.jsx  # Criação de posts
│   │   ├── EditPostPage.jsx    # Edição de posts
│   │   ├── HomePage.jsx        # Página inicial com lista de posts
│   │   ├── LoginPage.jsx       # Página de login
│   │   └── PostPage.jsx        # Visualização de post individual
│   ├── 📁 routes/
│   │   └── AppRouter.jsx       # Configuração de roteamento
│   ├── 📁 styles/
│   │   ├── GlobalStyles.js     # Estilos globais
│   │   ├── ThemeProvider.jsx   # Provider de temas
│   │   └── theme.js           # Definições do tema
│   ├── 📁 test/
│   │   ├── CommonComponents.test.jsx  # Testes de componentes
│   │   ├── Simple.test.jsx     # Testes básicos
│   │   ├── TestApp.jsx         # App dedicado para testes
│   │   ├── testUtils.js        # Utilitários de teste
│   │   └── setup.js           # Configuração dos testes
│   ├── 📁 utils/
│   │   ├── crypto.js          # Funções de criptografia
│   │   └── generateHash.js    # Geração de hashes
│   ├── App.jsx               # Componente principal
│   ├── App.test.jsx          # Testes da aplicação
│   └── main.jsx              # Ponto de entrada
├── 📁 coverage/              # Relatórios de cobertura
├── 📄 Dockerfile            # Build de produção
├── 📄 Dockerfile.dev        # Build de desenvolvimento
├── 📄 docker-compose.yml    # Orquestração de serviços
├── 📄 nginx.conf           # Configuração do Nginx
├── 📄 .dockerignore        # Exclusões para Docker
├── 📄 eslint.config.js     # Configuração do ESLint
├── 📄 vite.config.js       # Configuração do Vite
├── 📄 vitest.config.js     # Configuração dos testes
└── 📄 package.json         # Dependências e scripts
```

## 📱 Funcionalidades Detalhadas

### 🔐 Sistema de Autenticação
- **Login seguro** com validação de credenciais
- **Controle de sessão** com tokens JWT
- **Logout automático** em caso de token expirado
- **Redirecionamento** baseado no papel do usuário

### 📝 Gerenciamento de Posts
- **Criação**: Interface intuitiva para professores
- **Visualização**: Lista paginada com busca
- **Edição**: Funcionalidade completa de edição
- **Exclusão**: Confirmação antes de deletar
- **Busca**: Por título ou conteúdo do post

### 💬 Sistema de Comentários
- **Adicionar comentários**: Todos os usuários autenticados
- **Moderação**: Professores podem excluir comentários
- **Validação**: Comentários não podem ser vazios
- **Threading**: Suporte a discussões organizadas

### 🎨 Interface e UX
- **Design responsivo** para mobile e desktop
- **Tema consistente** com Material-UI
- **Navegação intuitiva** com breadcrumbs
- **Feedback visual** para ações do usuário
- **Loading states** durante operações assíncronas

## 👥 Controle de Acesso (Roles)

### 👨‍🏫 Professor
- ✅ Visualizar todos os posts
- ✅ Criar novos posts
- ✅ Editar próprios posts
- ✅ Excluir próprios posts
- ✅ Moderar comentários
- ✅ Acesso à área administrativa

### 👨‍🎓 Aluno
- ✅ Visualizar posts públicos
- ✅ Adicionar comentários
- ✅ Buscar posts
- ❌ Criar posts
- ❌ Editar posts
- ❌ Excluir conteúdo
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
## 🚀 Deploy e Produção

### 🌍 Deploy Automático
O projeto está configurado para deploy automático via GitHub Actions:
- **Trigger**: Push para branch `main`
- **Build**: Criação de imagem Docker otimizada
- **Registry**: GitHub Container Registry
- **Deploy**: Configurável para diferentes provedores

### 🔧 Configuração de Produção
```bash
# Build de produção local
npm run build

# Servir build localmente
npm run preview

# Deploy com Docker
docker build -t fiap-blog-frontend .
docker run -p 80:80 fiap-blog-frontend
```

### 🌐 Variáveis de Ambiente
```env
# Desenvolvimento
VITE_API_URL=http://localhost:3000

# Produção
VITE_API_URL=https://api.fiapblog.com
```

## 🔒 Segurança

### Headers de Segurança (Nginx)
- `X-Frame-Options: SAMEORIGIN`
- `X-XSS-Protection: 1; mode=block`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: no-referrer-when-downgrade`
- `Content-Security-Policy: default-src 'self'`

### Autenticação
- Tokens JWT com expiração
- Validação no frontend e backend
- Logout automático em caso de token inválido
- Hash seguro de senhas

## 🤝 Contribuição

### Como Contribuir
1. **Fork** do projeto
2. **Clone** seu fork
3. **Crie** uma branch para sua feature
4. **Implemente** as mudanças
5. **Execute** os testes
6. **Commit** suas mudanças
7. **Push** para sua branch
8. **Abra** um Pull Request

### Padrões de Código
- **ESLint**: Seguir configuração do projeto
- **Commits**: Usar conventional commits
- **Testes**: Manter cobertura acima de 50%
- **Documentação**: Atualizar README quando necessário

### Conventional Commits
```bash
feat: adiciona nova funcionalidade
fix: corrige bug específico
docs: atualiza documentação
test: adiciona ou corrige testes
refactor: refatora código sem alterar funcionalidade
```

## 📞 Suporte e Contato

### 🐛 Reportar Bugs
- Abra uma [Issue](https://github.com/Felipe-Lopes-code/fiapBlog-frontEnd/issues)
- Inclua passos para reproduzir
- Adicione screenshots se relevante
- Especifique versão do browser/OS

### 💡 Sugestões
- Use [Discussions](https://github.com/Felipe-Lopes-code/fiapBlog-frontEnd/discussions)
- Descreva a funcionalidade desejada
- Explique o caso de uso
- Considere implementar e contribuir

### 📚 Documentação Adicional
- [🐳 Docker & CI/CD](./DOCKER_CICD.md) - Guia completo de containerização
- [📊 Relatório de Testes](./TESTE_REPORT.md) - Resultados detalhados dos testes
- [🔧 Instruções Docker](./DOCKER_TEST_INSTRUCTIONS.md) - Como testar containers

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 Agradecimentos

- **FIAP** - Pela oportunidade de desenvolvimento
- **React Team** - Pela excelente biblioteca
- **Vite** - Pelo build tool ultrarrápido
- **Styled Components** - Pela facilidade de estilização
- **Community** - Pelas contribuições e feedback

---

**Desenvolvido com ❤️ para FIAP**

*Última atualização: 07/10/2025*
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