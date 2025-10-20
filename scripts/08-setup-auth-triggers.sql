-- Criar função para criar usuário automaticamente após signup no Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, phone, user_type, access_level, is_owner, is_active, created_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', 'Novo Usuário'),
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    'client',
    10,
    false,
    true,
    NOW()
  )
  ON CONFLICT (id) DO NOTHING;

  -- Criar cliente
  INSERT INTO public.clients (user_id, status, created_at)
  VALUES (NEW.id, 'active', NOW())
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Remover trigger existente se houver
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Criar trigger para executar a função
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Atualizar políticas RLS para tabela users
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read their own data" ON users;
DROP POLICY IF EXISTS "Users can update their own data" ON users;
DROP POLICY IF EXISTS "Service role can do anything" ON users;

CREATE POLICY "Users can read their own data"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own data"
  ON users FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Service role can do anything"
  ON users
  USING (auth.role() = 'service_role');

-- Políticas para clients
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Clients can read their own data" ON clients;
DROP POLICY IF EXISTS "Service role can do anything on clients" ON clients;

CREATE POLICY "Clients can read their own data"
  ON clients FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can do anything on clients"
  ON clients
  USING (auth.role() = 'service_role');

-- Adicionar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_user_type ON users(user_type);
CREATE INDEX IF NOT EXISTS idx_clients_user_id ON clients(user_id);

-- Comentário
COMMENT ON FUNCTION handle_new_user() IS 'Cria automaticamente registro de usuário e cliente após signup no Auth';
