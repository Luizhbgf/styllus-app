-- =====================================================
-- SCRIPT 2: CONFIGURAR AUTENTICAÇÃO
-- Execute este script APÓS o Script 1
-- =====================================================

-- Função para criar usuário automaticamente após signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Inserir na tabela users
    INSERT INTO public.users (id, email, name, phone, access_level, is_owner, user_type, is_active)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
        NEW.raw_user_meta_data->>'phone',
        10, -- access_level padrão: Cliente
        false,
        'client',
        true
    );

    -- Inserir na tabela clients
    INSERT INTO public.clients (user_id, name, phone, email)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
        NEW.raw_user_meta_data->>'phone',
        NEW.email
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Remover trigger existente se houver
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Criar trigger para novos usuários
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- Função para sincronizar email
CREATE OR REPLACE FUNCTION public.handle_user_email_update()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.users
    SET email = NEW.email
    WHERE id = NEW.id;
    
    UPDATE public.clients
    SET email = NEW.email
    WHERE user_id = NEW.id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Remover trigger existente se houver
DROP TRIGGER IF EXISTS on_auth_user_email_updated ON auth.users;

-- Criar trigger para atualização de email
CREATE TRIGGER on_auth_user_email_updated
    AFTER UPDATE OF email ON auth.users
    FOR EACH ROW
    WHEN (OLD.email IS DISTINCT FROM NEW.email)
    EXECUTE FUNCTION public.handle_user_email_update();

-- Mensagem de sucesso
DO $$
BEGIN
    RAISE NOTICE '✅ SCRIPT 2 EXECUTADO COM SUCESSO!';
    RAISE NOTICE 'Triggers de autenticação configurados';
    RAISE NOTICE 'Próximo passo: Execute o SCRIPT 3 (SQL_COMPLETO_03_RLS.sql)';
END $$;
