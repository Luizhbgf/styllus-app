# ✅ Checklist de Deploy - Styllus

Use esta checklist para garantir que tudo foi configurado corretamente.

## 📋 Supabase

- [ ] Projeto "styllusbd" criado no Supabase
- [ ] Script 1 (Tabelas) executado sem erros
- [ ] Script 2 (Autenticação) executado sem erros
- [ ] Script 3 (RLS) executado sem erros
- [ ] Tabelas visíveis no Table Editor:
  - [ ] users
  - [ ] professionals
  - [ ] clients
  - [ ] services
  - [ ] appointments
  - [ ] courses
- [ ] URL do projeto copiada: `https://________.supabase.co`
- [ ] Anon Key copiada: `eyJhbGci...`
- [ ] (Opcional) Confirmação de email desabilitada

## 🚀 Vercel

- [ ] Projeto importado no Vercel
- [ ] Variável `NEXT_PUBLIC_SUPABASE_URL` configurada
- [ ] Variável `NEXT_PUBLIC_SUPABASE_ANON_KEY` configurada
- [ ] Variáveis marcadas para Production, Preview e Development
- [ ] Redeploy realizado
- [ ] Deploy finalizado com status "Ready"

## 🧪 Testes

- [ ] Página inicial carrega: `https://seu-projeto.vercel.app`
- [ ] Página de login carrega: `/login`
- [ ] Página de cadastro carrega: `/cadastro`
- [ ] Cadastro de novo usuário funciona
- [ ] Login com usuário criado funciona
- [ ] Redirecionamento para dashboard funciona
- [ ] Não aparece tela preta
- [ ] Console do navegador sem erros de variáveis

## 📱 URLs Principais

Anote aqui as URLs do seu projeto:

- **Vercel**: https://_________________.vercel.app
- **Supabase**: https://_________________.supabase.co
- **Login**: https://_________________.vercel.app/login
- **Admin**: https://_________________.vercel.app/admin/dashboard

## 🎉 Status Final

- [ ] ✅ Tudo funcionando perfeitamente!

---

## 📞 Precisa de Ajuda?

Se algo não funcionou:
1. Abra o console do navegador (F12)
2. Copie os erros exibidos
3. Envie para análise
