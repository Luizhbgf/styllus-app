-- =====================================================
-- SCRIPT 3: CONFIGURAR ROW LEVEL SECURITY (RLS)
-- Execute este script APÓS o Script 2
-- =====================================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Remover políticas existentes (se houver)
DROP POLICY IF EXISTS "Usuários podem ver seus próprios dados" ON public.users;
DROP POLICY IF EXISTS "Usuários podem atualizar seus próprios dados" ON public.users;
DROP POLICY IF EXISTS "Admins podem ver todos os usuários" ON public.users;
DROP POLICY IF EXISTS "Admins podem atualizar usuários" ON public.users;
DROP POLICY IF EXISTS "Todos podem ver profissionais ativos" ON public.professionals;
DROP POLICY IF EXISTS "Profissionais podem atualizar seus dados" ON public.professionals;
DROP POLICY IF EXISTS "Todos podem ver clientes" ON public.clients;
DROP POLICY IF EXISTS "Clientes podem atualizar seus dados" ON public.clients;
DROP POLICY IF EXISTS "Todos podem ver serviços ativos" ON public.services;
DROP POLICY IF EXISTS "Staff pode gerenciar serviços" ON public.services;
DROP POLICY IF EXISTS "Clientes podem ver seus agendamentos" ON public.appointments;
DROP POLICY IF EXISTS "Clientes podem criar agendamentos" ON public.appointments;
DROP POLICY IF EXISTS "Staff pode ver todos os agendamentos" ON public.appointments;
DROP POLICY IF EXISTS "Todos podem ver cursos ativos" ON public.courses;
DROP POLICY IF EXISTS "Staff pode gerenciar cursos" ON public.courses;

-- ============================================
-- POLÍTICAS PARA USERS
-- ============================================

-- Usuários podem ver seus próprios dados
CREATE POLICY "Usuários podem ver seus próprios dados"
ON public.users FOR SELECT
USING (auth.uid() = id);

-- Usuários podem atualizar seus próprios dados
CREATE POLICY "Usuários podem atualizar seus próprios dados"
ON public.users FOR UPDATE
USING (auth.uid() = id);

-- Admins podem ver todos os usuários
CREATE POLICY "Admins podem ver todos os usuários"
ON public.users FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.users
        WHERE id = auth.uid() AND access_level >= 30
    )
);

-- Admins podem atualizar usuários
CREATE POLICY "Admins podem atualizar usuários"
ON public.users FOR UPDATE
USING (
    EXISTS (
        SELECT 1 FROM public.users
        WHERE id = auth.uid() AND access_level >= 30
    )
);

-- ============================================
-- POLÍTICAS PARA PROFESSIONALS
-- ============================================

-- Todos podem ver profissionais ativos
CREATE POLICY "Todos podem ver profissionais ativos"
ON public.professionals FOR SELECT
USING (is_active = true OR user_id = auth.uid());

-- Profissionais podem atualizar seus dados
CREATE POLICY "Profissionais podem atualizar seus dados"
ON public.professionals FOR UPDATE
USING (user_id = auth.uid());

-- ============================================
-- POLÍTICAS PARA CLIENTS
-- ============================================

-- Todos autenticados podem ver clientes
CREATE POLICY "Todos podem ver clientes"
ON public.clients FOR SELECT
USING (auth.uid() IS NOT NULL);

-- Clientes podem atualizar seus próprios dados
CREATE POLICY "Clientes podem atualizar seus dados"
ON public.clients FOR UPDATE
USING (user_id = auth.uid());

-- ============================================
-- POLÍTICAS PARA SERVICES
-- ============================================

-- Todos podem ver serviços ativos
CREATE POLICY "Todos podem ver serviços ativos"
ON public.services FOR SELECT
USING (is_active = true OR auth.uid() IS NOT NULL);

-- Staff pode gerenciar serviços
CREATE POLICY "Staff pode gerenciar serviços"
ON public.services FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM public.users
        WHERE id = auth.uid() AND access_level >= 20
    )
);

-- ============================================
-- POLÍTICAS PARA APPOINTMENTS
-- ============================================

-- Clientes podem ver seus próprios agendamentos
CREATE POLICY "Clientes podem ver seus agendamentos"
ON public.appointments FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.clients
        WHERE clients.id = appointments.client_id
        AND clients.user_id = auth.uid()
    )
);

-- Clientes podem criar agendamentos
CREATE POLICY "Clientes podem criar agendamentos"
ON public.appointments FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.clients
        WHERE clients.id = appointments.client_id
        AND clients.user_id = auth.uid()
    )
);

-- Staff pode ver e gerenciar todos os agendamentos
CREATE POLICY "Staff pode ver todos os agendamentos"
ON public.appointments FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM public.users
        WHERE id = auth.uid() AND access_level >= 20
    )
);

-- ============================================
-- POLÍTICAS PARA COURSES
-- ============================================

-- Todos podem ver cursos ativos
CREATE POLICY "Todos podem ver cursos ativos"
ON public.courses FOR SELECT
USING (status = 'active' OR auth.uid() IS NOT NULL);

-- Staff pode gerenciar cursos
CREATE POLICY "Staff pode gerenciar cursos"
ON public.courses FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM public.users
        WHERE id = auth.uid() AND access_level >= 20
    )
);

-- Mensagem de sucesso
DO $$
BEGIN
    RAISE NOTICE '✅ SCRIPT 3 EXECUTADO COM SUCESSO!';
    RAISE NOTICE 'Row Level Security (RLS) configurado em todas as tabelas';
    RAISE NOTICE '';
    RAISE NOTICE '🎉 CONFIGURAÇÃO DO BANCO CONCLUÍDA!';
    RAISE NOTICE 'Próximo passo: Configurar variáveis de ambiente no Vercel';
END $$;
