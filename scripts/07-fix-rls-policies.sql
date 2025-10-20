-- Desabilitar RLS temporariamente para configuração
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE clients DISABLE ROW LEVEL SECURITY;
ALTER TABLE professionals DISABLE ROW LEVEL SECURITY;
ALTER TABLE appointments DISABLE ROW LEVEL SECURITY;

-- Remover todas as políticas existentes
DROP POLICY IF EXISTS "Users can read their own data" ON users;
DROP POLICY IF EXISTS "Users can update their own data" ON users;
DROP POLICY IF EXISTS "Users can insert their own data" ON users;
DROP POLICY IF EXISTS "Service role can do anything" ON users;
DROP POLICY IF EXISTS "Public can read users" ON users;

DROP POLICY IF EXISTS "Clients can read their own data" ON clients;
DROP POLICY IF EXISTS "Service role can do anything on clients" ON clients;
DROP POLICY IF EXISTS "Public can read clients" ON clients;

DROP POLICY IF EXISTS "Professionals can read their own data" ON professionals;
DROP POLICY IF EXISTS "Service role can do anything on professionals" ON professionals;
DROP POLICY IF EXISTS "Public can read professionals" ON professionals;

DROP POLICY IF EXISTS "Users can read their own appointments" ON appointments;
DROP POLICY IF EXISTS "Service role can do anything on appointments" ON appointments;
DROP POLICY IF EXISTS "Public can read appointments" ON appointments;

-- Reabilitar RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Criar políticas permissivas para desenvolvimento
-- AVISO: Em produção, ajuste estas políticas para serem mais restritivas

-- Políticas para users
CREATE POLICY "Allow authenticated users to read users"
  ON users FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow users to update their own data"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Allow users to insert their own data"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Allow service role full access to users"
  ON users
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Políticas para clients
CREATE POLICY "Allow authenticated users to read clients"
  ON clients FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow users to update their own client data"
  ON clients FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Allow users to insert their own client data"
  ON clients FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow service role full access to clients"
  ON clients
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Políticas para professionals
CREATE POLICY "Allow authenticated users to read professionals"
  ON professionals FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow professionals to update their own data"
  ON professionals FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Allow professionals to insert their own data"
  ON professionals FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow service role full access to professionals"
  ON professionals
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Políticas para appointments
CREATE POLICY "Allow authenticated users to read appointments"
  ON appointments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow users to manage their appointments"
  ON appointments FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow service role full access to appointments"
  ON appointments
  TO service_role
  USING (true)
  WITH CHECK (true);

COMMENT ON TABLE users IS 'RLS configurado para permitir acesso autenticado em desenvolvimento';
