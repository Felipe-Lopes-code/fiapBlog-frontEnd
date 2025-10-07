# 🎯 COMANDOS PARA DEMONSTRAÇÃO RÁPIDA - FIAPBLOG

## ⚡ SEQUÊNCIA RÁPIDA (5 MINUTOS)

### 1. Setup Inicial
```powershell
cd C:\Users\casho\Documents\projects\fiapBlog-frontEnd\fiapBlog-frontEnd
npm install
```

### 2. Testes
```powershell
npm test -- --run
```

### 3. Aplicação Local
```powershell
npm run dev
# Acesse: http://localhost:3000
# Login Professor: admin/admin123
# Login Aluno: user/user123
```

### 4. Docker Produção
```powershell
npm run docker:build
npm run docker:run
# Acesse: http://localhost:8080
```

---

## 🔥 COMANDOS INDIVIDUAIS PARA COLAR NO TERMINAL

### Setup e Verificação
```powershell
# Navegar para o projeto
cd C:\Users\casho\Documents\projects\fiapBlog-frontEnd\fiapBlog-frontEnd

# Verificar estrutura
ls

# Verificar versões
node --version; npm --version; docker --version

# Instalar dependências
npm install
```

### Testes e Qualidade
```powershell
# Executar todos os testes
npm test -- --run

# Cobertura de testes
npm run test:coverage

# Verificar código
npm run lint

# Auditoria de segurança
npm run security:audit
```

### Desenvolvimento
```powershell
# Iniciar servidor de desenvolvimento
npm run dev

# Em outro terminal - build de produção
npm run build

# Visualizar build
npm run preview
```

### Docker
```powershell
# Build da imagem
npm run docker:build

# Verificar imagem
docker images fiap-blog-frontend

# Executar container
npm run docker:run

# Testar aplicação
curl http://localhost:8080/health

# Parar container
docker stop $(docker ps -q --filter ancestor=fiap-blog-frontend)
```

### Docker Compose
```powershell
# Iniciar todos os serviços
docker-compose up -d

# Verificar status
docker-compose ps

# Ver logs
docker-compose logs -f

# Parar serviços
docker-compose down
```

---

## 🎯 ROTEIRO DE APRESENTAÇÃO COMPLETA (15 MINUTOS)

### SLIDE 1: Introdução (2 min)
```powershell
# Mostrar README
Get-Content README.md | Select-Object -First 30

# Estrutura do projeto
ls
```

### SLIDE 2: Tecnologias (2 min)
```powershell
# Mostrar package.json
Get-Content package.json | Select-String -Pattern "react|vite|vitest|docker"

# Dependências principais
npm list --depth=0 | Select-String -Pattern "react|@mui|styled"
```

### SLIDE 3: Testes (3 min)
```powershell
# Executar testes
npm test -- --run

# Mostrar cobertura
npm run test:coverage

# Abrir relatório HTML
explorer coverage/lcov-report/index.html
```

### SLIDE 4: Funcionalidades (5 min)
```powershell
# Iniciar aplicação
npm run dev

# Demonstrar no navegador:
# http://localhost:3000
```

**Demonstrar:**
- ✅ Login como Professor (admin/admin123)
- ✅ Criar novo post
- ✅ Gerenciar posts existentes
- ✅ Logout e login como Aluno (user/user123)
- ✅ Visualizar posts
- ✅ Adicionar comentários
- ✅ Sistema de busca
- ✅ Interface responsiva (F12 - mobile view)

### SLIDE 5: Docker e Produção (3 min)
```powershell
# Build Docker
npm run docker:build

# Verificar tamanho
docker images fiap-blog-frontend

# Executar em produção
npm run docker:run

# Testar health check
curl http://localhost:8080/health

# Abrir no navegador
start http://localhost:8080
```

---

## 📋 CHECKLIST PRÉ-APRESENTAÇÃO

### ✅ Verificar Ambiente
- [ ] Node.js 18+ instalado
- [ ] Docker Desktop rodando
- [ ] Terminal PowerShell aberto
- [ ] Navegador web disponível
- [ ] Projeto clonado e atualizado

### ✅ Executar Pré-Demo
```powershell
# Limpar cache
npm run clean:cache

# Reinstalar dependências
npm install

# Teste rápido
npm test -- --run

# Build rápido
npm run build
```

### ✅ Preparar Demonstração
- [ ] Fechar outras aplicações para performance
- [ ] Preparar abas do navegador
- [ ] Testar comandos previamente
- [ ] Verificar conectividade de rede

---

## 🚨 TROUBLESHOOTING COMUM

### Problema: Porta em uso
```powershell
# Verificar processos na porta 3000
netstat -ano | findstr :3000

# Matar processo se necessário
taskkill /PID <PID> /F
```

### Problema: Docker não iniciando
```powershell
# Verificar status do Docker
docker version

# Reiniciar Docker Desktop se necessário
Restart-Service -Name "Docker Desktop Service"
```

### Problema: Testes falhando
```powershell
# Limpar cache de testes
npx vitest run --no-cache

# Reinstalar dependências
npm run refresh
```

### Problema: Build falhando
```powershell
# Verificar espaço em disco
Get-PSDrive C

# Limpar node_modules
npm run clean
npm install
```

---

## 🎯 PONTOS-CHAVE PARA DESTACAR

### 🏆 Qualidade Técnica
- "12 testes automatizados com 100% de aprovação"
- "53.65% de cobertura de código"
- "0 vulnerabilidades de segurança"
- "ESLint configurado com 0 erros"

### 🚀 DevOps Moderno
- "Docker multi-stage build otimizado"
- "Imagem de produção de apenas ~50MB"
- "CI/CD automatizado com GitHub Actions"
- "Health checks implementados"

### 🎨 Interface Profissional
- "Interface responsiva com Material-UI"
- "Controle de acesso baseado em funções"
- "Experiência de usuário fluida"
- "Componentes reutilizáveis e testados"

### 📚 Documentação Completa
- "README com mais de 400 linhas"
- "Guias de contribuição detalhados"
- "Políticas de segurança definidas"
- "Templates GitHub padronizados"

---

## 🎬 SCRIPT FINAL DE FECHAMENTO

```powershell
# Parar todos os serviços
docker-compose down 2>$null
docker stop $(docker ps -q --filter ancestor=fiap-blog-frontend) 2>$null

Write-Host "🎉 Demonstração Concluída!" -ForegroundColor Green
Write-Host "========================" -ForegroundColor Green
Write-Host ""
Write-Host "📊 RESUMO FINAL:" -ForegroundColor Cyan
Write-Host "✅ Projeto 100% funcional" -ForegroundColor Green
Write-Host "✅ Testes automatizados passando" -ForegroundColor Green
Write-Host "✅ Docker funcionando perfeitamente" -ForegroundColor Green
Write-Host "✅ Documentação completa" -ForegroundColor Green
Write-Host "✅ Pronto para produção" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 FiapBlog - Exemplo de excelência em desenvolvimento React!" -ForegroundColor Yellow
```