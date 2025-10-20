# Instruções de Configuração - Styllus

## 1. Configurar Supabase

### Passo 1: Criar Projeto no Supabase
1. Acesse https://supabase.com
2. Crie um novo projeto
3. Anote a URL e a Anon Key do projeto

### Passo 2: Executar Scripts SQL
Execute os scripts na seguinte ordem no SQL Editor do Supabase:

\`\`\`sql
-- 1. Primeiro, execute o script de criação de tabelas
-- scripts/01-create-tables.sql

-- 2. Depois, execute os índices
-- scripts/02-create-indexes.sql

-- 3. Execute as funções
-- scripts/03-create-functions.sql

-- 4. (Opcional) Insira dados de exemplo
-- scripts/04-insert-sample-data.sql

-- 5. Configure o sistema de autenticação
-- scripts/05-update-auth-system.sql

-- 6. Configure as políticas RLS
-- scripts/07-fix-rls-policies.sql

-- 7. Configure o trigger de criação de usuários
-- scripts/08-setup-auth-triggers.sql
\`\`\`

### Passo 3: Configurar Email Authentication
1. No Supabase Dashboard, vá em Authentication > Settings
2. Em "Email Auth", você pode:
   - **Para desenvolvimento**: Desabilitar "Confirm email"
   - **Para produção**: Configurar SMTP customizado

### Passo 4: Criar Usuário de Teste
1. No Supabase Dashboard, vá em Authentication > Users
2. Clique em "Add User"
3. Crie um usuário:
   - Email: seu@email.com
   - Password: sua-senha-segura
   - Auto Confirm User: ✅ (marcar)

## 2. Configurar Variáveis de Ambiente

### No Vercel:
1. Vá em Settings > Environment Variables
2. Adicione:
   \`\`\`
   PROD_SUPABASE_SUPABASE_URL=sua-url-do-supabase
   PROD_SUPABASE_SUPABASE_ANON_KEY=sua-anon-key
   \`\`\`

### Localmente (.env.local):
\`\`\`env
PROD_SUPABASE_SUPABASE_URL=sua-url-do-supabase
PROD_SUPABASE_SUPABASE_ANON_KEY=sua-anon-key
\`\`\`

## 3. Testar a Aplicação

### Local:
\`\`\`bash
npm install
npm run dev
\`\`\`

Acesse: http://localhost:3000

### Produção (Vercel):
1. Faça commit das mudanças
2. Push para o repositório
3. O Vercel fará deploy automaticamente

## 4. Verificação

### Teste de Login:
1. Acesse /login
2. Use as credenciais do usuário criado
3. Você deve ser redirecionado para o dashboard apropriado

### Teste de Cadastro:
1. Acesse /cadastro
2. Preencha o formulário
3. Clique em "Criar Conta"
4. Você deve ser automaticamente logado

## 5. Solução de Problemas

### Erro "Failed to fetch":
- Verifique se as variáveis de ambiente estão corretas
- Verifique se o projeto Supabase está ativo
- Verifique a conexão com a internet

### Erro "Email ou senha incorretos":
- Verifique se o usuário existe no Supabase Auth
- Verifique se a senha está correta
- Verifique se o email está confirmado (ou desabilitou confirmação)

### Usuário criado mas não aparece no dashboard:
- Verifique se o trigger `on_auth_user_created` foi executado
- Verifique os logs do Supabase para erros
- Execute manualmente:
  \`\`\`sql
  SELECT * FROM users WHERE email = 'seu@email.com';
  \`\`\`

## 6. Estrutura de Níveis de Acesso

- **10 - Cliente**: Acesso ao dashboard do cliente
- **20 - Profissional/Staff**: Acesso ao dashboard de staff
- **30 - Administrador**: Acesso ao painel administrativo

Para alterar o nível de acesso de um usuário:
\`\`\`sql
UPDATE users 
SET access_level = 30, user_type = 'admin' 
WHERE email = 'usuario@email.com';
