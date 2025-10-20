# 🚀 Guia Completo de Configuração do Supabase

## 1️⃣ Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Clique em "New Project"
3. Escolha um nome: **styllusbd** (importante!)
4. Escolha uma senha forte para o banco
5. Selecione a região mais próxima (ex: São Paulo)
6. Clique em "Create new project"
7. Aguarde 2-3 minutos até o projeto estar pronto

## 2️⃣ Executar Scripts SQL

Acesse: **SQL Editor** no menu lateral do Supabase

Execute os scripts **NA ORDEM**:

### Script 1: Criar Tabelas
\`\`\`sql
-- Cole e execute o conteúdo de scripts/01-create-tables.sql
\`\`\`

### Script 2: Criar Índices
\`\`\`sql
-- Cole e execute o conteúdo de scripts/02-create-indexes.sql
\`\`\`

### Script 3: Criar Funções
\`\`\`sql
-- Cole e execute o conteúdo de scripts/03-create-functions.sql
\`\`\`

### Script 4: Configurar RLS
\`\`\`sql
-- Cole e execute o conteúdo de scripts/09-production-setup.sql
\`\`\`

## 3️⃣ Obter Credenciais

1. No menu lateral, clique em **Settings** (engrenagem)
2. Clique em **API**
3. Você verá:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGci...` (chave longa)

## 4️⃣ Configurar no Vercel

1. Acesse seu projeto no [Vercel](https://vercel.com)
2. Vá em **Settings** → **Environment Variables**
3. Adicione as seguintes variáveis:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci... (cole a chave completa)
\`\`\`

4. Clique em "Save"
5. Vá em **Deployments**
6. Clique nos 3 pontinhos do último deployment
7. Clique em "Redeploy"

## 5️⃣ Desabilitar Confirmação de Email (Opcional para Testes)

1. No Supabase, vá em **Authentication** → **Settings**
2. Na seção **Email Auth**, desmarque "**Confirm email**"
3. Clique em "Save"

Isso permite que usuários façam login imediatamente após o cadastro, sem precisar confirmar email.

## 6️⃣ Testar

1. Aguarde o deploy no Vercel terminar
2. Acesse: `https://seu-projeto.vercel.app/cadastro`
3. Crie uma nova conta
4. Faça login em: `https://seu-projeto.vercel.app/login`

## ✅ Checklist

- [ ] Projeto "styllusbd" criado no Supabase
- [ ] 4 scripts SQL executados sem erros
- [ ] Credenciais copiadas (URL e ANON KEY)
- [ ] Variáveis de ambiente configuradas no Vercel
- [ ] Redeploy realizado no Vercel
- [ ] Confirmação de email desabilitada (opcional)
- [ ] Teste de cadastro realizado
- [ ] Teste de login realizado

## 🆘 Problemas Comuns

### Tela preta após login/cadastro
- **Causa**: Variáveis de ambiente não configuradas
- **Solução**: Verifique se as variáveis estão corretas no Vercel e faça redeploy

### Erro "Invalid login credentials"
- **Causa**: Email/senha incorretos ou confirmação de email pendente
- **Solução**: Desabilite confirmação de email ou verifique inbox

### Erro "Failed to fetch"
- **Causa**: URL do Supabase incorreta ou projeto pausado
- **Solução**: Verifique a URL e se o projeto está ativo no Supabase

## 📞 Suporte

Se encontrar problemas, abra o console do navegador (F12) e copie os erros exibidos.
\`\`\`

```plaintext file=".env.example"
# Supabase Configuration
# Obtenha em: https://supabase.com/dashboard/project/_/settings/api

NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-key-aqui
