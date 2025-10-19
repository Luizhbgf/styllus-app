# 🚀 Guia de Deploy - Styllus

## 📋 Pré-requisitos

- Docker e Docker Compose instalados
- Node.js 20+
- Conta no Supabase
- Domínio configurado (para produção)

## 🏗️ Arquitetura

A aplicação está configurada para rodar em 3 ambientes:

- **Desenvolvimento** (porta 3000)
- **Homologação** (porta 3001)
- **Produção** (porta 3002 + Load Balancer na 80/443)

## 🔧 Configuração Inicial

### 1. Clonar o repositório
\`\`\`bash
git clone https://github.com/seu-usuario/styllus-app.git
cd styllus-app
\`\`\`

### 2. Configurar variáveis de ambiente

Copie e configure os arquivos de ambiente:

\`\`\`bash
cp .env.development.example .env.development
cp .env.staging.example .env.staging
cp .env.production.example .env.production
\`\`\`

Edite cada arquivo com suas credenciais do Supabase.

### 3. Configurar Supabase

Execute os scripts SQL na ordem:
1. `scripts/01-create-tables.sql`
2. `scripts/02-create-indexes.sql`
3. `scripts/03-create-functions.sql`
4. `scripts/04-insert-sample-data.sql`
5. `scripts/05-update-auth-system.sql`
6. `scripts/06-create-owner-and-test-users.sql`

## 🐳 Deploy com Docker

### Desenvolvimento

\`\`\`bash
docker-compose up app-dev
\`\`\`

Acesse: http://localhost:3000

### Homologação

\`\`\`bash
docker-compose up app-staging
\`\`\`

Acesse: http://localhost:3001

### Produção Completa

\`\`\`bash
docker-compose up -d
\`\`\`

Isso iniciará:
- 3 instâncias da aplicação
- Nginx como load balancer
- Redis para cache

Acesse: http://localhost

## ☁️ Deploy na Vercel

### 1. Instalar Vercel CLI

\`\`\`bash
npm i -g vercel
\`\`\`

### 2. Deploy

\`\`\`bash
# Desenvolvimento
vercel

# Produção
vercel --prod
\`\`\`

### 3. Configurar variáveis de ambiente

No painel da Vercel:
1. Vá em Settings > Environment Variables
2. Adicione todas as variáveis do arquivo `.env.production`

## 📱 PWA - Progressive Web App

A aplicação está configurada como PWA e pode ser instalada em:

- **Android**: Chrome > Menu > "Adicionar à tela inicial"
- **iOS**: Safari > Compartilhar > "Adicionar à Tela de Início"

## 🔒 SSL/HTTPS

### Desenvolvimento
Use mkcert para SSL local:

\`\`\`bash
mkcert -install
mkcert localhost
\`\`\`

### Produção
Configure Let's Encrypt com Certbot:

\`\`\`bash
certbot --nginx -d styllus.app -d www.styllus.app
\`\`\`

## 📊 Monitoramento

### Health Check

\`\`\`bash
curl http://localhost/health
\`\`\`

### Logs

\`\`\`bash
# Ver logs em tempo real
docker-compose logs -f app-prod

# Ver logs específicos
docker logs styllus-prod
\`\`\`

## 🔄 CI/CD

O projeto inclui GitHub Actions configurado:

- **Push para `develop`**: Deploy automático em dev
- **Push para `staging`**: Deploy automático em staging
- **Push para `main`**: Deploy automático em produção

## 📈 Escalabilidade

### Para suportar 500+ usuários simultâneos:

1. **Horizontal Scaling**: Aumente réplicas no docker-compose
\`\`\`yaml
deploy:
  replicas: 5  # Aumente conforme necessário
\`\`\`

2. **Vertical Scaling**: Aumente recursos
\`\`\`yaml
resources:
  limits:
    cpus: '2'
    memory: 2G
\`\`\`

3. **Database Connection Pooling**
Configure no Supabase: Settings > Database > Connection Pooling

4. **CDN**: Configure Cloudflare ou similar

5. **Redis Cache**: Já incluído no docker-compose

## 🛡️ Segurança

- Rate limiting configurado no Nginx
- Headers de segurança aplicados
- CORS configurado
- Environment variables separadas por ambiente

## 📞 Suporte

Para problemas, abra uma issue no GitHub.
