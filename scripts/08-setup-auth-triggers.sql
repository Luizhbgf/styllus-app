-- Remover função e trigger existentes se houver
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Criar função para lidar com novos usuários
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  user_name TEXT;
  user_phone TEXT;
BEGIN
  -- Extrair nome e telefone dos metadados
  user_name := COALESCE(NEW.raw_user_meta_data->>'name', 'Novo Usuário');
  user_phone := COALESCE(NEW.raw_user_meta_data->>'phone', '');

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
    user_name,
    user_phone,
    'client',
    10,
    false,
    true,
    NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    name = EXCLUDED.name,
    phone = EXCLUDED.phone,
    updated_at = NOW();

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
EXCEPTION
  WHEN OTHERS THEN
    -- Log do erro (aparecerá nos logs do Supabase)
    RAISE WARNING 'Error in handle_new_user: %', SQLERRM;
    RETURN NEW;
END;
$$;

-- Criar trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Garantir que a tabela clients tem a constraint necessária
ALTER TABLE clients DROP CONSTRAINT IF EXISTS clients_user_id_fkey;
ALTER TABLE clients ADD CONSTRAINT clients_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- Criar constraint única se não existir
ALTER TABLE clients DROP CONSTRAINT IF EXISTS clients_user_id_key;
ALTER TABLE clients ADD CONSTRAINT clients_user_id_key UNIQUE (user_id);

COMMENT ON FUNCTION handle_new_user() IS 'Trigger function para criar usuário e cliente automaticamente após signup';
