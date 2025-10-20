# 🚀 Deploy no Vercel - Guia Completo

## Passo 1: Configurar Supabase

### 1.1 Criar Projeto
1. Acesse [supabase.com](https://supabase.com)
2. Clique em "New Project"
3. Escolha um nome e senha forte
4. Escolha a região mais próxima (São Paulo para Brasil)

### 1.2 Executar Scripts SQL
1. No Supabase, vá em **SQL Editor**
2. Clique em **New Query**
3. Execute os scripts **NA ORDEM**:
   - `scripts/01-create-tables.sql`
   - `scripts/02-create-indexes.sql`
   - `scripts/03-create-functions.sql`
   - `scripts/09-production-setup.sql` ⭐ **IMPORTANTE**

### 1.3 Configurar Autenticação
1. Vá em **Authentication** > **Settings**
2. Em **Email Auth**:
   - ✅ Enable Email provider
   - ❌ Desmarque "Confirm email" (para testes)
   - ✅ Enable Email confirmations (para produção)
3. Em **URL Configuration**:
   - Site URL: `https://seu-app.vercel.app`
   - Redirect URLs: `https://seu-app.vercel.app/**`

### 1.4 Copiar Credenciais
1. Vá em **Settings** > **API**
2. Copie:
   - `Project URL` → NEXT_PUBLIC_SUPABASE_URL
   - `anon public` → NEXT_PUBLIC_SUPABASE_ANON_KEY

---

## Passo 2: Deploy no Vercel

### 2.1 Preparar Repositório
\`\`\`bash
git add .
git commit -m "Preparar para produção"
git push origin main
\`\`\`

### 2.2 Criar Projeto no Vercel
1. Acesse [vercel.com](https://vercel.com)
2. Clique em **Add New** > **Project**
3. Importe seu repositório do GitHub
4. Configure o projeto:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

### 2.3 Adicionar Variáveis de Ambiente
No Vercel, vá em **Settings** > **Environment Variables** e adicione:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon
NEXT_PUBLIC_APP_URL=https://seu-app.vercel.app
NEXT_PUBLIC_ENV=production
\`\`\`

### 2.4 Deploy
1. Clique em **Deploy**
2. Aguarde o build completar (2-3 minutos)
3. Clique no link do projeto

---

## Passo 3: Testar

### 3.1 Teste de Cadastro
1. Acesse `https://seu-app.vercel.app/cadastro`
2. Preencha o formulário
3. Clique em "Criar Conta"
4. Deve redirecionar para `/cliente/dashboard`

### 3.2 Teste de Login
1. Acesse `https://seu-app.vercel.app/login`
2. Use as credenciais criadas
3. Deve fazer login com sucesso

### 3.3 Verificar Logs
1. Abra o Console do navegador (F12)
2. Procure por:
   - ✅ "🔧 Supabase Client iniciado"
   - ✅ "✅ Login completo"
   - ❌ Não deve ter erros de DNS

---

## Passo 4: Configurar Domínio (Opcional)

### 4.1 Adicionar Domínio
1. No Vercel, vá em **Settings** > **Domains**
2. Adicione seu domínio: `styllusestetica.com.br`
3. Configure os DNS conforme instruções

### 4.2 Atualizar Supabase
1. No Supabase, vá em **Authentication** > **Settings**
2. Atualize:
   - Site URL: `https://styllusestetica.com.br`
   - Redirect URLs: `https://styllusestetica.com.br/**`

### 4.3 Atualizar Variáveis
No Vercel, atualize:
\`\`\`env
NEXT_PUBLIC_APP_URL=https://styllusestetica.com.br
\`\`\`

---

## ⚠️ Troubleshooting

### Erro "Failed to fetch"
- ✅ Verifique se as variáveis de ambiente estão corretas
- ✅ Verifique se o script SQL foi executado
- ✅ Tente fazer um novo deploy no Vercel

### Erro "Email já cadastrado"
- ✅ Vá no Supabase > Authentication > Users
- ✅ Delete o usuário e tente novamente

### Erro de CORS
- ✅ Verifique a URL do Supabase
- ✅ Adicione o domínio nas Redirect URLs

### RLS Error
- ✅ Execute o script `09-production-setup.sql` novamente
- ✅ Verifique se RLS está habilitado nas tabelas

---

## 📞 Suporte

Se ainda tiver problemas:
1. Abra o Console (F12) e copie os erros
2. Verifique os logs no Vercel
3. Verifique os logs no Supabase > Logs

---

## ✅ Checklist Final

- [ ] Projeto criado no Supabase
- [ ] Scripts SQL executados
- [ ] Email confirmations configurado
- [ ] Redirect URLs configuradas
- [ ] Credenciais copiadas
- [ ] Repositório no GitHub atualizado
- [ ] Projeto criado no Vercel
- [ ] Variáveis de ambiente adicionadas
- [ ] Deploy realizado com sucesso
- [ ] Cadastro testado
- [ ] Login testado
- [ ] Console sem erros

🎉 **Pronto! Seu app está no ar!**
