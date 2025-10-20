-- Script de configuração final para produção
-- Execute este script APÓS todos os outros

-- 1. Criar índices adicionais para performance
CREATE INDEX IF NOT EXISTS idx_users_email_active ON users(email, is_active);
CREATE INDEX IF NOT EXISTS idx_appointments_client_date ON appointments(client_id, appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_professional_date ON appointments(professional_id, appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);

-- 2. Otimizar configurações de busca
CREATE INDEX IF NOT EXISTS idx_users_name_search ON users USING gin(to_tsvector('portuguese', name));
CREATE INDEX IF NOT EXISTS idx_professionals_specialty_search ON professionals USING gin(to_tsvector('portuguese', specialty));

-- 3. Adicionar constraint de integridade
ALTER TABLE appointments 
  ADD CONSTRAINT check_appointment_date_future 
  CHECK (appointment_date >= CURRENT_DATE);

-- 4. Função para limpeza de dados antigos (executar mensalmente)
CREATE OR REPLACE FUNCTION cleanup_old_data()
RETURNS void AS $$
BEGIN
  -- Deletar agendamentos cancelados com mais de 6 meses
  DELETE FROM appointments 
  WHERE status = 'cancelled' 
    AND appointment_date < CURRENT_DATE - INTERVAL '6 months';
    
  -- Arquivar usuários inativos há mais de 1 ano
  UPDATE users 
  SET is_active = false 
  WHERE last_login < CURRENT_DATE - INTERVAL '1 year'
    AND is_active = true
    AND access_level = 10; -- apenas clientes
END;
$$ LANGUAGE plpgsql;

-- 5. Comentários finais
COMMENT ON DATABASE postgres IS 'Styllus Production Database';
COMMENT ON FUNCTION cleanup_old_data() IS 'Função para limpeza mensal de dados antigos';

-- 6. Verificar integridade
DO $$
DECLARE
  missing_tables TEXT[];
BEGIN
  SELECT ARRAY_AGG(table_name) INTO missing_tables
  FROM (VALUES 
    ('users'), ('clients'), ('professionals'), 
    ('appointments'), ('services'), ('payments')
  ) AS required_tables(table_name)
  WHERE NOT EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' 
      AND table_name = required_tables.table_name
  );
  
  IF missing_tables IS NOT NULL THEN
    RAISE EXCEPTION 'Tabelas faltando: %', array_to_string(missing_tables, ', ');
  ELSE
    RAISE NOTICE '✅ Todas as tabelas necessárias existem';
  END IF;
END $$;

-- 7. Estatísticas finais
SELECT 
  'users' as table_name, 
  COUNT(*) as total_records,
  COUNT(*) FILTER (WHERE is_active = true) as active_records
FROM users
UNION ALL
SELECT 
  'clients' as table_name, 
  COUNT(*) as total_records,
  COUNT(*) FILTER (WHERE status = 'active') as active_records
FROM clients
UNION ALL
SELECT 
  'professionals' as table_name, 
  COUNT(*) as total_records,
  COUNT(*) FILTER (WHERE status = 'active') as active_records
FROM professionals;

RAISE NOTICE '✅ Setup de produção concluído com sucesso!';
