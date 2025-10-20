-- Criar usuário owner (você precisará fazer signup manual no Supabase Auth)
-- Este script apenas documenta os usuários de teste

-- IMPORTANTE: Primeiro crie estes usuários no Supabase Auth Dashboard
-- Authentication > Users > Add User

-- Usuário 1: Owner (Dono do sistema)
-- Email: owner@styllus.com
-- Senha: owner123
-- Após criar no Auth, execute:
-- UPDATE users SET access_level = 30, is_owner = true, user_type = 'admin' 
-- WHERE email = 'owner@styllus.com';

-- Usuário 2: Admin
-- Email: admin@styllus.com
-- Senha: admin123
-- Após criar no Auth, execute:
-- UPDATE users SET access_level = 30, user_type = 'admin' 
-- WHERE email = 'admin@styllus.com';

-- Usuário 3: Staff/Professional
-- Email: staff@styllus.com
-- Senha: staff123
-- Após criar no Auth, execute:
-- UPDATE users SET access_level = 20, user_type = 'professional' 
-- WHERE email = 'staff@styllus.com';

-- Usuário 4: Cliente
-- Email: cliente@styllus.com
-- Senha: cliente123
-- Após criar no Auth, execute:
-- UPDATE users SET access_level = 10, user_type = 'client' 
-- WHERE email = 'cliente@styllus.com';

COMMENT ON TABLE users IS 'Usuários de teste devem ser criados no Supabase Auth Dashboard primeiro';
