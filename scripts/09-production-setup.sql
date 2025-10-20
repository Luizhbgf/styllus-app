-- Script completo para configuração de produção no Supabase
-- Execute este script no SQL Editor do Supabase

-- 1. Limpar dados existentes (CUIDADO EM PRODUÇÃO!)
DO $$ 
BEGIN
    -- Desabilitar triggers temporariamente
    ALTER TABLE users DISABLE TRIGGER ALL;
    ALTER TABLE clients DISABLE TRIGGER ALL;
    ALTER TABLE professionals DISABLE TRIGGER ALL;
    
    -- Limpar tabelas
    TRUNCATE TABLE appointments CASCADE;
    TRUNCATE TABLE services CASCADE;
    TRUNCATE TABLE appointment_requests CASCADE;
    TRUNCATE TABLE notifications CASCADE;
    TRUNCATE TABLE clients CASCADE;
    TRUNCATE TABLE professionals CASCADE;
    TRUNCATE TABLE users CASCADE;
    
    -- Reabilitar triggers
    ALTER TABLE users ENABLE TRIGGER ALL;
    ALTER TABLE clients ENABLE TRIGGER ALL;
    ALTER TABLE professionals ENABLE TRIGGER ALL;
END $$;

-- 2. Criar função trigger para novos usuários
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Inserir na tabela users
    INSERT INTO public.users (
        id,
        email,
        name,
        phone,
        user_type,
        access_level,
        is_owner,
        is_active,
        created_at
    )
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'name', 'Usuário'),
        COALESCE(NEW.raw_user_meta_data->>'phone', ''),
        'client',
        10,
        false,
        true,
        NOW()
    )
    ON CONFLICT (id) DO NOTHING;

    -- Inserir na tabela clients
    INSERT INTO public.clients (
        user_id,
        status,
        created_at
    )
    VALUES (
        NEW.id,
        'active',
        NOW()
    )
    ON CONFLICT (user_id) DO NOTHING;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Criar trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- 4. Atualizar políticas RLS
-- Políticas para users
DROP POLICY IF EXISTS "Usuários podem ler próprios dados" ON users;
CREATE POLICY "Usuários podem ler próprios dados" 
    ON users FOR SELECT 
    USING (auth.uid() = id OR is_active = true);

DROP POLICY IF EXISTS "Usuários podem atualizar próprios dados" ON users;
CREATE POLICY "Usuários podem atualizar próprios dados" 
    ON users FOR UPDATE 
    USING (auth.uid() = id);

DROP POLICY IF EXISTS "Sistema pode inserir usuários" ON users;
CREATE POLICY "Sistema pode inserir usuários" 
    ON users FOR INSERT 
    WITH CHECK (true);

-- Políticas para clients
DROP POLICY IF EXISTS "Clientes podem ler próprios dados" ON clients;
CREATE POLICY "Clientes podem ler próprios dados" 
    ON clients FOR SELECT 
    USING (auth.uid() = user_id OR EXISTS (
        SELECT 1 FROM users WHERE id = auth.uid() AND access_level >= 20
    ));

DROP POLICY IF EXISTS "Sistema pode inserir clientes" ON clients;
CREATE POLICY "Sistema pode inserir clientes" 
    ON clients FOR INSERT 
    WITH CHECK (true);

-- Políticas para professionals
DROP POLICY IF EXISTS "Todos podem ler profissionais ativos" ON professionals;
CREATE POLICY "Todos podem ler profissionais ativos" 
    ON professionals FOR SELECT 
    USING (is_active = true OR auth.uid() = user_id);

-- Políticas para services
DROP POLICY IF EXISTS "Todos podem ler serviços ativos" ON services;
CREATE POLICY "Todos podem ler serviços ativos" 
    ON services FOR SELECT 
    USING (is_active = true);

DROP POLICY IF EXISTS "Profissionais podem gerenciar serviços" ON services;
CREATE POLICY "Profissionais podem gerenciar serviços" 
    ON services FOR ALL 
    USING (EXISTS (
        SELECT 1 FROM users WHERE id = auth.uid() AND access_level >= 20
    ));

-- Políticas para appointments
DROP POLICY IF EXISTS "Usuários podem ver próprios agendamentos" ON appointments;
CREATE POLICY "Usuários podem ver próprios agendamentos" 
    ON appointments FOR SELECT 
    USING (
        client_id = auth.uid() OR 
        professional_id = auth.uid() OR 
        EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND access_level >= 20)
    );

DROP POLICY IF EXISTS "Profissionais podem gerenciar agendamentos" ON appointments;
CREATE POLICY "Profissionais podem gerenciar agendamentos" 
    ON appointments FOR ALL 
    USING (EXISTS (
        SELECT 1 FROM users WHERE id = auth.uid() AND access_level >= 20
    ));

-- 5. Criar índices para performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_access_level ON users(access_level);
CREATE INDEX IF NOT EXISTS idx_clients_user_id ON clients(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_client ON appointments(client_id);
CREATE INDEX IF NOT EXISTS idx_appointments_professional ON appointments(professional_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_services_professional ON services(professional_id);

-- 6. Habilitar RLS em todas as tabelas
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointment_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- 7. Criar usuário admin inicial (opcional)
-- Descomente e ajuste os dados se quiser criar um admin inicial
/*
DO $$
DECLARE
    admin_id uuid;
BEGIN
    -- Primeiro crie o usuário no Supabase Auth Dashboard
    -- Depois execute este script com o ID do usuário
    admin_id := 'SEU-UUID-AQUI'::uuid;
    
    INSERT INTO users (id, email, name, user_type, access_level, is_owner, is_active)
    VALUES (
        admin_id,
        'admin@styllus.com',
        'Administrador',
        'admin',
        30,
        true,
        true
    )
    ON CONFLICT (id) DO UPDATE SET
        access_level = 30,
        is_owner = true;
END $$;
*/

-- 8. Verificar configuração
SELECT 
    'users' as tabela,
    COUNT(*) as total
FROM users
UNION ALL
SELECT 
    'clients' as tabela,
    COUNT(*) as total
FROM clients
UNION ALL
SELECT 
    'RLS habilitado' as tabela,
    COUNT(*) as total
FROM pg_tables 
WHERE schemaname = 'public' 
AND rowsecurity = true;

-- Pronto! Agora o Supabase está configurado para produção ✅
