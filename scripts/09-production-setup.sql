-- Script completo para configuração de produção
-- Execute este script no SQL Editor do Supabase

-- 1. Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Criar tabela de usuários se não existir
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  access_level TEXT NOT NULL DEFAULT 'client' CHECK (access_level IN ('client', 'staff', 'admin', 'owner')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Criar índices para performance
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_access_level ON public.users(access_level);

-- 4. Função para criar usuário automaticamente após signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, phone, access_level)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'phone',
    'client'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Criar trigger se não existir
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 6. Habilitar RLS (Row Level Security)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 7. Políticas RLS - Permitir leitura para usuários autenticados
DROP POLICY IF EXISTS "Usuários podem ver seus próprios dados" ON public.users;
CREATE POLICY "Usuários podem ver seus próprios dados"
  ON public.users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- 8. Políticas RLS - Permitir inserção através do trigger
DROP POLICY IF EXISTS "Sistema pode inserir novos usuários" ON public.users;
CREATE POLICY "Sistema pode inserir novos usuários"
  ON public.users
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- 9. Políticas RLS - Permitir atualização própria
DROP POLICY IF EXISTS "Usuários podem atualizar seus próprios dados" ON public.users;
CREATE POLICY "Usuários podem atualizar seus próprios dados"
  ON public.users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- 10. Criar usuário owner padrão (ALTERE EMAIL E SENHA)
-- Este é um exemplo - VOCÊ DEVE ALTERAR PARA SUAS CREDENCIAIS
DO $$
DECLARE
  user_id UUID;
BEGIN
  -- Inserir usuário na tabela users primeiro
  INSERT INTO public.users (id, email, name, access_level)
  VALUES (
    gen_random_uuid(),
    'admin@styllus.com',
    'Administrador',
    'owner'
  )
  ON CONFLICT (email) DO NOTHING;
END $$;

-- 11. Verificar configuração
SELECT 
  'Tabela users criada' as status,
  COUNT(*) as total_usuarios
FROM public.users;
