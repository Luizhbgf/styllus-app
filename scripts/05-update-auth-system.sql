-- Adicionar campos de autenticação e níveis à tabela users
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS access_level INTEGER DEFAULT 10,
ADD COLUMN IF NOT EXISTS is_owner BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS password_hash TEXT,
ADD COLUMN IF NOT EXISTS last_login TIMESTAMP,
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Adicionar constraint para validar níveis de acesso
ALTER TABLE users 
ADD CONSTRAINT valid_access_level 
CHECK (access_level IN (10, 20, 30));

-- Comentários para documentação
COMMENT ON COLUMN users.access_level IS '10: Cliente, 20: Staff, 30: Admin';
COMMENT ON COLUMN users.is_owner IS 'Super admin com poderes totais';

-- Criar índice para melhorar performance de login
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_access_level ON users(access_level);

-- Atualizar dados existentes baseado no user_type
UPDATE users SET 
  access_level = CASE 
    WHEN user_type = 'client' THEN 10
    WHEN user_type = 'professional' THEN 20
    WHEN user_type = 'admin' THEN 30
    ELSE 10
  END
WHERE access_level IS NULL;

-- Criar tabela de logs de alteração de nível
CREATE TABLE IF NOT EXISTS access_level_changes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  changed_by UUID REFERENCES users(id),
  old_level INTEGER,
  new_level INTEGER,
  reason TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Criar índice para logs
CREATE INDEX IF NOT EXISTS idx_access_changes_user ON access_level_changes(user_id);
CREATE INDEX IF NOT EXISTS idx_access_changes_date ON access_level_changes(created_at DESC);

-- Função para registrar mudanças de nível
CREATE OR REPLACE FUNCTION log_access_level_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.access_level != NEW.access_level THEN
    INSERT INTO access_level_changes (user_id, old_level, new_level)
    VALUES (NEW.id, OLD.access_level, NEW.access_level);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para registrar mudanças automaticamente
DROP TRIGGER IF EXISTS trigger_log_access_level_change ON users;
CREATE TRIGGER trigger_log_access_level_change
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION log_access_level_change();

-- Atualizar função de estatísticas de usuários
CREATE OR REPLACE FUNCTION get_user_statistics()
RETURNS TABLE (
  total_users BIGINT,
  total_clients BIGINT,
  total_staff BIGINT,
  total_admins BIGINT,
  active_users BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*)::BIGINT as total_users,
    COUNT(*) FILTER (WHERE access_level = 10)::BIGINT as total_clients,
    COUNT(*) FILTER (WHERE access_level = 20)::BIGINT as total_staff,
    COUNT(*) FILTER (WHERE access_level = 30)::BIGINT as total_admins,
    COUNT(*) FILTER (WHERE is_active = true)::BIGINT as active_users
  FROM users;
END;
$$ LANGUAGE plpgsql;
