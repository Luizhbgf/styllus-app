-- Criar usuário owner (super admin)
INSERT INTO users (email, name, phone, user_type, access_level, is_owner, is_active)
VALUES 
  ('owner@styllus.com', 'Super Admin', '(11) 99999-0000', 'admin', 30, true, true)
ON CONFLICT (email) DO UPDATE SET
  access_level = 30,
  is_owner = true;

-- Criar usuários de teste para cada nível
INSERT INTO users (email, name, phone, user_type, access_level, is_owner, is_active)
VALUES 
  -- Admins
  ('admin@styllus.com', 'Admin User', '(11) 98888-0001', 'admin', 30, false, true),
  ('admin2@styllus.com', 'Admin User 2', '(11) 98888-0002', 'admin', 30, false, true),
  
  -- Staff
  ('staff@styllus.com', 'Staff User', '(11) 97777-0001', 'professional', 20, false, true),
  ('staff2@styllus.com', 'Staff User 2', '(11) 97777-0002', 'professional', 20, false, true),
  
  -- Clients
  ('client@styllus.com', 'Client User', '(11) 96666-0001', 'client', 10, false, true),
  ('client2@styllus.com', 'Client User 2', '(11) 96666-0002', 'client', 10, false, true)
ON CONFLICT (email) DO NOTHING;

-- Atualizar profissionais existentes para ter acesso de staff
UPDATE users SET access_level = 20 
WHERE user_type = 'professional' AND access_level != 20;

-- Criar registros de profissionais para os staff
INSERT INTO professionals (user_id, specialty, status, bio)
SELECT 
  u.id,
  'Profissional',
  'active',
  'Profissional de teste'
FROM users u
WHERE u.user_type = 'professional' 
  AND NOT EXISTS (
    SELECT 1 FROM professionals p WHERE p.user_id = u.id
  );
