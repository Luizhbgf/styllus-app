# Variáveis de Ambiente - Styllus App

Este documento explica todas as variáveis de ambiente necessárias para o funcionamento da aplicação.

## 🔑 Variáveis Obrigatórias

### 1. NEXT_PUBLIC_ENV
**Descrição:** Define o ambiente da aplicação
**Valores possíveis:** `development`, `staging`, `production`
**Exemplo:** `production`

\`\`\`env
NEXT_PUBLIC_ENV=production
\`\`\`

### 2. NEXT_PUBLIC_APP_URL
**Descrição:** URL pública da aplicação
**Exemplo:** `https://styllus.app` ou `https://seu-dominio.vercel.app`

\`\`\`env
NEXT_PUBLIC_APP_URL=https://styllus.app
\`\`\`

### 3. SUPABASE_URL (Staging)
**Descrição:** URL do projeto Supabase para ambiente de homologação
**Onde encontrar:** Dashboard do Supabase > Settings > API > Project URL

\`\`\`env
STAGING_SUPABASE_URL=https://seu-projeto.supabase.co
\`\`\`

### 4. SUPABASE_ANON_KEY (Staging)
**Descrição:** Chave pública do Supabase para staging
**Onde encontrar:** Dashboard do Supabase > Settings > API > Project API keys > anon public

\`\`\`env
STAGING_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
\`\`\`

### 5. SUPABASE_SERVICE_ROLE_KEY (Staging)
**Descrição:** Chave de serviço do Supabase (uso apenas no backend)
**Onde encontrar:** Dashboard do Supabase > Settings > API > Project API keys > service_role
**⚠️ IMPORTANTE:** Nunca exponha esta chave no frontend!

\`\`\`env
STAGING_SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
\`\`\`

### 6. PROD_SUPABASE_URL
**Descrição:** URL do projeto Supabase para produção
**Onde encontrar:** Dashboard do Supabase > Settings > API > Project URL

\`\`\`env
PROD_SUPABASE_URL=https://seu-projeto-prod.supabase.co
\`\`\`

### 7. PROD_SUPABASE_ANON_KEY
**Descrição:** Chave pública do Supabase para produção
**Onde encontrar:** Dashboard do Supabase > Settings > API > Project API keys > anon public

\`\`\`env
PROD_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
\`\`\`

### 8. PROD_SUPABASE_SERVICE_ROLE_KEY
**Descrição:** Chave de serviço do Supabase para produção
**Onde encontrar:** Dashboard do Supabase > Settings > API > Project API keys > service_role
**⚠️ IMPORTANTE:** Nunca exponha esta chave no frontend!

\`\`\`env
PROD_SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
\`\`\`

## 🎯 Como Configurar no Vercel

### Passo 1: Criar Projeto no Supabase
1. Acesse https://supabase.com
2. Crie um novo projeto (ou use um existente)
3. Copie as credenciais:
   - Project URL
   - anon/public key
   - service_role key (mantenha segura!)

### Passo 2: Adicionar no Vercel
1. Acesse seu projeto no Vercel
2. Vá em Settings > Environment Variables
3. Adicione cada variável com seu respectivo valor
4. Selecione os ambientes apropriados:
   - `STAGING_*` → Preview
   - `PROD_*` → Production
   - `NEXT_PUBLIC_*` → Todos

### Passo 3: Valores Recomendados

\`\`\`env
# Geral
NEXT_PUBLIC_ENV=production
NEXT_PUBLIC_APP_URL=https://seu-app.vercel.app

# Staging (use as mesmas do prod se não tiver ambiente separado)
STAGING_SUPABASE_URL=sua_url_supabase
STAGING_SUPABASE_ANON_KEY=sua_anon_key
STAGING_SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key

# Produção
PROD_SUPABASE_URL=sua_url_supabase
PROD_SUPABASE_ANON_KEY=sua_anon_key
PROD_SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key
\`\`\`

## 🔒 Segurança

### ✅ Pode expor (NEXT_PUBLIC_*)
- `NEXT_PUBLIC_ENV`
- `NEXT_PUBLIC_APP_URL`
- Qualquer `SUPABASE_URL`
- Qualquer `SUPABASE_ANON_KEY`

### ❌ NUNCA expor
- `SUPABASE_SERVICE_ROLE_KEY` (qualquer ambiente)
- Chaves de API de terceiros
- Senhas ou tokens de acesso

## 📝 Exemplo Completo

\`\`\`env
# .env.local (desenvolvimento)
NEXT_PUBLIC_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

STAGING_SUPABASE_URL=https://abc123.supabase.co
STAGING_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.abc123
STAGING_SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xyz789

PROD_SUPABASE_URL=https://def456.supabase.co
PROD_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.def456
PROD_SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.uvw012
\`\`\`

## 🆘 Suporte

Se tiver dúvidas:
1. Verifique o Dashboard do Supabase
2. Consulte a documentação: https://supabase.com/docs
3. Entre em contato com o suporte técnico
