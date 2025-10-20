# 🚀 Guia de Deploy no Vercel

## Pré-requisitos
- Conta no [Supabase](https://supabase.com)
- Conta no [Vercel](https://vercel.com)
- Repositório no GitHub

## Passo 1: Configurar Supabase

### 1.1 Criar Projeto
1. Acesse [supabase.com/dashboard](https://supabase.com/dashboard)
2. Clique em "New Project"
3. Preencha os dados e anote a senha do banco

### 1.2 Executar Scripts SQL
1. Vá em "SQL Editor" no menu lateral
2. Execute **NA ORDEM** os scripts abaixo:

\`\`\`sql
-- Execute cada script, um de cada vez, clicando em "Run"
scripts/01-create-tables.sql
scripts/02-create-indexes.sql
scripts/03-create-functions.sql
scripts/09-production-setup.sql
\`\`\`

### 1.3 Desabilitar Confirmação de Email (opcional para testes)
1. Vá em "Authentication" > "Settings"
2. Em "Email Auth", **DESMARQUE** "Confirm email"
3. Clique em "Save"

### 1.4 Copiar Credenciais
1. Vá em "Settings" > "API"
2. Copie:
   - Project URL
   - anon public (chave pública)

## Passo 2: Deploy no Vercel

### 2.1 Importar Projeto
1. Acesse [vercel.com/new](https://vercel.com/new)
2. Selecione seu repositório do GitHub
3. Clique em "Import"

### 2.2 Configurar Variáveis de Ambiente
Na tela de configuração, adicione:

\`\`\`env
PROD_SUPABASE_NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
PROD_SUPABASE_SUPABASE_ANON_KEY=sua-chave-anon
PROD_SUPABASE_APP_URL=https://seu-dominio.vercel.app
\`\`\`

**Importante:** Após o primeiro deploy, volte e atualize `PROD_SUPABASE_APP_URL` com a URL real do Vercel.

### 2.3 Deploy
1. Clique em "Deploy"
2. Aguarde o build (~2-3 minutos)
3. Acesse a URL fornecida

## Passo 3: Criar Usuário Administrador

### Opção 1: Via Interface (Recomendado)
1. Acesse `https://seu-app.vercel.app/cadastro`
2. Cadastre-se normalmente
3. No Supabase SQL Editor, execute:

\`\`\`sql
UPDATE public.users 
SET access_level = 'owner' 
WHERE email = 'seu-email@exemplo.com';
\`\`\`

### Opção 2: Via SQL Direto
1. No Supabase, vá em "Authentication" > "Users"
2. Clique em "Add user" > "Create new user"
3. Preencha email e senha
4. No SQL Editor, execute:

\`\`\`sql
UPDATE public.users 
SET access_level = 'owner', 
    name = 'Seu Nome'
WHERE email = 'seu-email@exemplo.com';
\`\`\`

## Passo 4: Testar

1. **Teste o Cadastro:**
   - Acesse `/cadastro`
   - Crie uma conta nova
   - Verifique se redireciona para `/cliente/dashboard`

2. **Teste o Login:**
   - Acesse `/login`
   - Entre com suas credenciais
   - Verifique o redirecionamento correto

3. **Teste o Admin:**
   - Faça login com o usuário owner
   - Acesse `/admin/dashboard`
   - Verifique se carrega corretamente

## Solução de Problemas

### Erro: "Failed to fetch"
- Verifique se as variáveis de ambiente estão corretas
- Confirme que executou todos os scripts SQL
- Limpe o cache do browser (Ctrl+Shift+R)

### Erro: "Email ou senha incorretos"
- Verifique se o usuário existe no Supabase Auth
- Confirme se a senha está correta
- Verifique se o RLS está configurado

### Página em branco ou erro 500
- Abra o Console do navegador (F12)
- Verifique os logs de erro
- Vá no Vercel Dashboard > Seu Projeto > Logs
- Procure por erros no build ou runtime

## Checklist Final

- [ ] Scripts SQL executados
- [ ] Variáveis de ambiente configuradas
- [ ] Deploy bem-sucedido no Vercel
- [ ] Cadastro funcionando
- [ ] Login funcionando
- [ ] Usuário owner criado
- [ ] Dashboard admin acessível

## Próximos Passos

Após o sistema funcionar:
1. Configure domínio customizado no Vercel
2. Habilite confirmação de email no Supabase
3. Configure SMTP para emails transacionais
4. Adicione mais funcionalidades conforme necessário

## Suporte

Se encontrar problemas:
1. Verifique os logs do Vercel
2. Verifique os logs do Supabase (Database > Logs)
3. Abra o console do navegador (F12) para erros
