-- Remover políticas RLS existentes que podem estar bloqueando
DROP POLICY IF EXISTS "Users can read their own data" ON users;
DROP POLICY IF EXISTS "Users can update their own data" ON users;
DROP POLICY IF EXISTS "Anyone can create users" ON users;

-- Criar políticas mais permissivas para desenvolvimento
CREATE POLICY "Enable read access for all users" ON users
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON users
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON users
  FOR UPDATE USING (true);

-- Criar políticas para tabela clients
DROP POLICY IF EXISTS "Enable read access for clients" ON clients;
DROP POLICY IF EXISTS "Enable insert for clients" ON clients;

CREATE POLICY "Enable read access for all clients" ON clients
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for all clients" ON clients
  FOR INSERT WITH CHECK (true);

-- Adicionar comentário
COMMENT ON TABLE users IS 'Tabela de usuários com políticas permissivas para desenvolvimento';
