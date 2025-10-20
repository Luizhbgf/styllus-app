# 🚀 Deploy Styllus no Vercel - Guia Completo

## 📋 Pré-requisitos

1. Conta no [Vercel](https://vercel.com)
2. Conta no [Supabase](https://supabase.com)
3. Repositório GitHub com o código

## 🔧 Passo 1: Configurar Supabase

### 1.1 Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Clique em "New Project"
3. Configure:
   - Nome: `styllus-production`
   - Database Password: (anote esta senha)
   - Region: Escolha a mais próxima dos seus usuários
   - Plan: Free tier é suficiente para começar

### 1.2 Executar Scripts SQL

No Supabase, vá em SQL Editor e execute **na ordem**:

**Script 1: Criar tabelas**
\`\`\`sql
-- Cole o conteúdo de scripts/01-create-tables.sql
\`\`\`

**Script 2: Criar índices**
\`\`\`sql
-- Cole o conteúdo de scripts/02-create-indexes.sql
\`\`\`

**Script 3: Criar funções**
\`\`\`sql
-- Cole o conteúdo de scripts/03-create-functions.sql
\`\`\`

**Script 4: Configurar autenticação**
\`\`\`sql
-- Cole o conteúdo de scripts/05-update-auth-system.sql
\`\`\`

**Script 5: Configurar RLS**
\`\`\`sql
-- Cole o conteúdo de scripts/07-fix-rls-policies.sql
\`\`\`

**Script 6: Configurar trigger de novos usuários**
\`\`\`sql
-- Cole o conteúdo de scripts/08-setup-auth-triggers.sql
\`\`\`

### 1.3 Configurar Authentication

No Supabase:
1. Vá em Authentication > Settings
2. Em "Email Auth":
   - ✅ Enable Email Signups
   - ❌ Confirm Email (desmarque para facilitar testes)
3. Em "Site URL": coloque `https://seu-dominio.vercel.app`
4. Em "Redirect URLs": adicione `https://seu-dominio.vercel.app/**`

### 1.4 Obter Credenciais

No Supabase:
1. Vá em Settings > API
2. Copie:
   - `Project URL` → será o `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → será o `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 🚀 Passo 2: Deploy no Vercel

### 2.1 Importar Projeto

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Importe seu repositório do GitHub
4. Configuração:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

### 2.2 Configurar Variáveis de Ambiente

No Vercel, em Settings > Environment Variables, adicione:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon
NEXT_PUBLIC_APP_URL=https://seu-dominio.vercel.app
NEXT_PUBLIC_ENV=production
\`\`\`

**⚠️ IMPORTANTE**: Marque todas como disponíveis em Production, Preview e Development.

### 2.3 Deploy

1. Clique em "Deploy"
2. Aguarde o build completar (3-5 minutos)
3. Seu app estará disponível em `https://seu-projeto.vercel.app`

## ✅ Passo 3: Verificar Deploy

### 3.1 Testar Aplicação

1. Acesse sua URL do Vercel
2. Clique em "Cadastrar"
3. Crie uma conta de teste
4. Faça login

### 3.2 Verificar Logs

Se houver erros:
1. No Vercel: Settings > Logs
2. No Supabase: Logs > Database Logs

### 3.3 Criar Primeiro Admin

No Supabase SQL Editor:

\`\`\`sql
-- Após criar sua conta através do cadastro, execute:
UPDATE users 
SET access_level = 30, user_type = 'admin', is_owner = true
WHERE email = 'seu-email@exemplo.com';
\`\`\`

## 🎨 Passo 4: Configurar Domínio Customizado (Opcional)

### 4.1 Adicionar Domínio

No Vercel:
1. Settings > Domains
2. Add Domain: `styllus.com.br`
3. Siga as instruções para configurar DNS

### 4.2 Atualizar Supabase

No Supabase:
1. Authentication > Settings
2. Site URL: `https://styllus.com.br`
3. Redirect URLs: `https://styllus.com.br/**`

### 4.3 Atualizar Variável de Ambiente

No Vercel:
\`\`\`env
NEXT_PUBLIC_APP_URL=https://styllus.com.br
\`\`\`

Faça redeploy.

## 🔧 Passo 5: Configurações Avançadas

### 5.1 Ativar Confirmação de Email

Quando estiver pronto para produção:

No Supabase:
1. Authentication > Settings
2. ✅ Confirm Email
3. Configure Email Templates (opcional)

### 5.2 Configurar Analytics (Opcional)

No Vercel:
1. Analytics > Enable
2. Configure Web Analytics

### 5.3 Monitoramento de Erros (Opcional)

Configure Sentry:
\`\`\`env
SENTRY_DSN=sua-dsn-do-sentry
\`\`\`

## 📊 Verificar Status

### Health Check

Acesse: `https://seu-dominio.vercel.app/api/health`

### Logs em Tempo Real

\`\`\`bash
# Instalar Vercel CLI
npm i -g vercel

# Ver logs
vercel logs seu-projeto
\`\`\`

## 🚨 Troubleshooting

### Erro "Failed to fetch"
- Verifique se as variáveis de ambiente estão corretas
- Confirme que os scripts SQL foram executados
- Verifique os logs no Vercel e Supabase

### Login não funciona
- Verifique se "Confirm Email" está desabilitado (para testes)
- Confirme que o trigger `handle_new_user()` foi criado
- Verifique as políticas RLS

### Erro ao cadastrar
- Verifique se as tabelas `users` e `clients` existem
- Confirme que o trigger está ativo
- Verifique logs no Supabase

## 📞 Suporte

- Vercel Support: [vercel.com/support](https://vercel.com/support)
- Supabase Support: [supabase.com/support](https://supabase.com/support)

## ✅ Checklist Final

- [ ] Supabase configurado
- [ ] Scripts SQL executados
- [ ] Authentication configurado
- [ ] Variáveis de ambiente no Vercel
- [ ] Deploy realizado com sucesso
- [ ] Cadastro e login testados
- [ ] Primeiro admin criado
- [ ] Domínio configurado (opcional)
- [ ] Monitoramento ativo

---

🎉 **Parabéns! Seu app está no ar!**
