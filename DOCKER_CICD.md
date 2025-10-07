# Docker & CI/CD Documentation

## 🐳 Docker

### Configurações Disponíveis

- **Dockerfile**: Build de produção otimizado com Nginx
- **Dockerfile.dev**: Build para desenvolvimento com hot reload
- **docker-compose.yml**: Orquestração de serviços

### Comandos Docker

#### Desenvolvimento
```bash
# Build da imagem de desenvolvimento
npm run docker:build-dev

# Executar em modo desenvolvimento
npm run docker:run-dev

# Usar Docker Compose para desenvolvimento
npm run docker:compose-dev
```

#### Produção
```bash
# Build da imagem de produção
npm run docker:build

# Executar em produção
npm run docker:run

# Usar Docker Compose para produção
docker-compose up frontend-prod
```

#### Testes
```bash
# Executar testes via Docker
npm run docker:compose-test
```

### Estrutura dos Containers

#### Container de Desenvolvimento
- **Base**: node:18-alpine
- **Porta**: 3000
- **Features**: Hot reload, volume mounting
- **Comando**: `npm run dev`

#### Container de Produção
- **Base**: nginx:alpine
- **Porta**: 80
- **Features**: Multi-stage build, otimizações de performance
- **Assets**: Servidos via Nginx

## 🚀 CI/CD Pipeline

### GitHub Actions Workflows

#### 1. CI/CD Principal (`.github/workflows/ci-cd.yml`)

**Triggers:**
- Push para `main` ou `develop`
- Pull requests para `main`

**Jobs:**
1. **Test**: Executa linting, testes unitários e cobertura
2. **Build**: Compila a aplicação e gera artefatos
3. **Docker**: Build e push da imagem Docker para GitHub Container Registry
4. **Security**: Auditoria de segurança e scan de vulnerabilidades
5. **Deploy**: Deploy automático (configurável)

#### 2. Dependabot Auto-merge (`.github/workflows/dependabot.yml`)

**Features:**
- Auto-merge para atualizações minor e patch
- Configuração automática de reviewers

### Configuração do Dependabot

Localizado em `.github/dependabot.yml`:
- **Frequência**: Semanal (segundas-feiras às 09:00)
- **Ecosistemas**: npm, GitHub Actions, Docker
- **Limite**: 10 PRs abertos simultaneamente

### Variáveis de Ambiente Necessárias

Para deployment completo, configure os seguintes secrets no GitHub:

```env
# Opcional: Para scans de segurança
SNYK_TOKEN=your_snyk_token

# Para deploy em AWS (exemplo)
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
```

### Fluxo de Deploy

1. **Desenvolvimento**: 
   - Commits em branches de feature
   - Testes automáticos em PRs

2. **Staging**:
   - Merge para `develop`
   - Deploy automático para ambiente de staging

3. **Produção**:
   - Merge para `main`
   - Deploy automático para produção
   - Criação automática da imagem Docker

### Monitoramento e Logs

#### Health Checks
- **Endpoint**: `/health`
- **Frequência**: A cada 30 segundos
- **Timeout**: 3 segundos

#### Logs de Aplicação
- **Nginx Access Logs**: `/var/log/nginx/access.log`
- **Nginx Error Logs**: `/var/log/nginx/error.log`

### Performance e Otimizações

#### Otimizações do Nginx
- Compressão Gzip habilitada
- Cache de assets estáticos (1 ano)
- Security headers configurados
- Client-side routing suportado

#### Otimizações do Docker
- Multi-stage build para reduzir tamanho da imagem
- Cache layers otimizados
- Health checks implementados

### Comandos Úteis

```bash
# Ver logs do container
docker logs fiap-blog-frontend

# Acessar shell do container
docker exec -it fiap-blog-frontend sh

# Verificar health check
docker inspect --format='{{.State.Health.Status}}' fiap-blog-frontend

# Limpar imagens não utilizadas
docker system prune -f
```

### Troubleshooting

#### Problemas Comuns

1. **Build Failures**:
   - Verificar logs do GitHub Actions
   - Confirmar que todos os testes passam localmente

2. **Docker Issues**:
   - Verificar se as portas estão disponíveis
   - Confirmar que o Docker daemon está rodando

3. **Deploy Issues**:
   - Verificar secrets configurados no GitHub
   - Confirmar permissões de deploy

#### Rollback

Em caso de problemas em produção:

```bash
# Usar tag anterior da imagem
docker run -p 8080:80 ghcr.io/felipe-lopes-code/fiapblog-frontend:previous-tag

# Ou reverter o commit no GitHub
git revert HEAD
git push origin main
```