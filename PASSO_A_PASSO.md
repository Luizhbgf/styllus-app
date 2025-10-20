# 🎯 Guia Passo a Passo - Configuração Completa

## ✅ PASSO 1: Criar Projeto no Supabase

1. Acesse: https://supabase.com
2. Clique em **"New Project"**
3. Preencha:
   - **Name**: `styllusbd` ⚠️ IMPORTANTE: use exatamente este nome!
   - **Database Password**: Crie uma senha forte (anote ela!)
   - **Region**: Selecione `South America (São Paulo)` ou a mais próxima
4. Clique em **"Create new project"**
5. ⏳ Aguarde 2-3 minutos até aparecer "Project is ready"

---

## ✅ PASSO 2: Executar Scripts SQL

### 2.1 Abrir SQL Editor
1. No menu lateral esquerdo do Supabase, clique em **"SQL Editor"**
2. Clique em **"New query"** (botão + no canto superior direito)

### 2.2 Script 1 - Criar Tabelas
1. Copie TODO o conteúdo do arquivo `scripts/SQL_COMPLETO_01_TABELAS.sql`
2. Cole na área de texto do SQL Editor
3. Clique em **"Run"** (ou pressione Ctrl+Enter)
4. ✅ Aguarde aparecer "Success. No rows returned"

### 2.3 Script 2 - Configurar Autenticação
1. Clique em **"New query"** novamente
2. Copie TODO o conteúdo do arquivo `scripts/SQL_COMPLETO_02_AUTH.sql`
3. Cole e clique em **"Run"**
4. ✅ Aguarde aparecer "Success"

### 2.4 Script 3 - Políticas de Segurança
1. Clique em **"New query"** novamente
2. Copie TODO o conteúdo do arquivo `scripts/SQL_COMPLETO_03_RLS.sql`
3. Cole e clique em **"Run"**
4. ✅ Aguarde aparecer "Success"

### 2.5 Verificar Tabelas Criadas
1. No menu lateral, clique em **"Table Editor"**
2. Você deve ver as tabelas:
   - ✅ users
   - ✅ professionals
   - ✅ clients
   - ✅ appointments
   - ✅ services
   - ✅ courses

---

## ✅ PASSO 3: Obter Credenciais do Supabase

1. No menu lateral, clique em ⚙️ **"Settings"**
2. Clique em **"API"** no submenu
3. Você verá:

### 📋 URL do Projeto:
\`\`\`
https://xxxxxxxx.supabase.co
\`\`\`
👆 Copie esta URL completa

### 📋 Chave Anon (anon key):
\`\`\`
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ...
\`\`\`
👆 Copie esta chave COMPLETA (é muito longa, role para ver tudo)

⚠️ **IMPORTANTE**: Copie as credenciais e guarde em um bloco de notas temporário!

---

## ✅ PASSO 4: Configurar Variáveis no Vercel

### 4.1 Acessar Projeto no Vercel
1. Acesse: https://vercel.com
2. Faça login
3. Clique no seu projeto **"styllus"** (ou nome que você deu)

### 4.2 Adicionar Variáveis de Ambiente
1. Clique em **"Settings"** (no menu superior)
2. No menu lateral, clique em **"Environment Variables"**
3. Adicione a primeira variável:
   - **Key**: `NEXT_PUBLIC_SUPABASE_URL`
   - **Value**: Cole a URL que você copiou (ex: `https://xxxxxxxx.supabase.co`)
   - Marque: ✅ Production, ✅ Preview, ✅ Development
   - Clique em **"Save"**

4. Adicione a segunda variável:
   - **Key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value**: Cole a chave anon completa que você copiou
   - Marque: ✅ Production, ✅ Preview, ✅ Development
   - Clique em **"Save"**

### 4.3 Verificar Variáveis Salvas
Você deve ver na lista:
- ✅ `NEXT_PUBLIC_SUPABASE_URL`
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## ✅ PASSO 5: Fazer Redeploy

1. No Vercel, clique em **"Deployments"** (menu superior)
2. Você verá uma lista de deploys
3. No deploy mais recente (primeiro da lista):
   - Clique nos **3 pontinhos** (⋮) no canto direito
   - Clique em **"Redeploy"**
4. Na modal que abrir, clique em **"Redeploy"** novamente
5. ⏳ Aguarde 1-2 minutos até o status ficar **"Ready"**

---

## ✅ PASSO 6: Desabilitar Confirmação de Email (Opcional)

Para facilitar os testes, você pode desabilitar a confirmação de email:

1. No Supabase, clique em **"Authentication"** no menu lateral
2. Clique em **"Providers"**
3. Clique em **"Email"**
4. Desmarque a opção **"Confirm email"**
5. Clique em **"Save"**

Agora os usuários podem fazer login imediatamente após o cadastro!

---

## ✅ PASSO 7: Testar o Sistema

### 7.1 Testar Cadastro
1. Acesse: `https://seu-projeto.vercel.app/cadastro`
2. Preencha o formulário:
   - Nome: Seu nome
   - Email: seu@email.com
   - Telefone: (opcional)
   - Senha: mínimo 6 caracteres
3. Clique em **"Criar Conta"**
4. ✅ Você deve ser redirecionado para `/cliente/dashboard`

### 7.2 Testar Login
1. Faça logout ou abra em aba anônima
2. Acesse: `https://seu-projeto.vercel.app/login`
3. Entre com o email e senha que você criou
4. ✅ Você deve ser redirecionado para o dashboard

---

## 🎉 PRONTO!

Se tudo funcionou, seu sistema está no ar!

### 📱 URLs Principais:
- **Página inicial**: `https://seu-projeto.vercel.app`
- **Login**: `https://seu-projeto.vercel.app/login`
- **Cadastro**: `https://seu-projeto.vercel.app/cadastro`
- **Dashboard Cliente**: `https://seu-projeto.vercel.app/cliente/dashboard`
- **Dashboard Admin**: `https://seu-projeto.vercel.app/admin/dashboard`

---

## 🆘 Problemas?

### Tela preta após login
- Abra o console do navegador (F12)
- Verifique se há erros de variáveis de ambiente
- Confirme que as variáveis estão corretas no Vercel
- Faça um novo redeploy

### Erro "Invalid login credentials"
- Verifique se desabilitou a confirmação de email
- Ou verifique seu email para confirmar a conta
- Tente cadastrar um novo usuário

### Erro de conexão com Supabase
- Verifique se o projeto está ativo no Supabase
- Confirme que a URL está correta
- Verifique se a chave anon está completa

---

## 📞 Suporte

Se precisar de ajuda, abra o console do navegador (F12), copie os erros e me envie!
