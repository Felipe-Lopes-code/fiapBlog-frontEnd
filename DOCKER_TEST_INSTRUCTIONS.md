# Instruções para Teste dos Containers Docker

## Pré-requisitos
1. Instalar Docker Desktop
2. Iniciar Docker Desktop
3. Verificar se Docker está rodando: `docker --version`

## Comandos de Teste

### 1. Testar Build de Produção
```bash
# Build da imagem de produção
docker build -t fiap-blog-frontend:prod .

# Executar container de produção
docker run -p 8080:80 fiap-blog-frontend:prod

# Acessar: http://localhost:8080
```

### 2. Testar Build de Desenvolvimento
```bash
# Build da imagem de desenvolvimento
docker build -f Dockerfile.dev -t fiap-blog-frontend:dev .

# Executar container de desenvolvimento com volume
docker run -p 3000:3000 -v ${PWD}:/app -v /app/node_modules fiap-blog-frontend:dev

# Acessar: http://localhost:3000
```

### 3. Testar com Docker Compose
```bash
# Executar ambiente de desenvolvimento
docker-compose up frontend-dev

# Executar ambiente de produção
docker-compose up frontend-prod

# Executar testes
docker-compose up frontend-test
```

### 4. Verificar Health Check
```bash
# Verificar status do health check
docker inspect --format='{{.State.Health.Status}}' <container_id>

# Testar endpoint de health
curl http://localhost:8080/health
```

## Troubleshooting

### Erro: "Docker daemon not running"
- Iniciar Docker Desktop
- Aguardar inicialização completa

### Erro: "Port already in use"
- Verificar processos usando as portas: `netstat -an | findstr :8080`
- Parar containers existentes: `docker stop $(docker ps -aq)`

### Erro: "Build failed"
- Verificar se todas as dependências estão instaladas
- Executar `npm install` localmente primeiro
- Verificar logs de build: `docker logs <container_id>`