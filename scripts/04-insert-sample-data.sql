-- Insert sample data

-- Insert admin user
INSERT INTO users (id, email, name, phone, user_type) VALUES 
('00000000-0000-0000-0000-000000000001', 'admin@styllus.com', 'Administrador', '(11) 99999-0000', 'admin');

-- Insert sample professionals
INSERT INTO users (id, email, name, phone, user_type) VALUES 
('11111111-1111-1111-1111-111111111111', 'ana@styllus.com', 'Ana Silva', '(11) 99999-1111', 'professional'),
('22222222-2222-2222-2222-222222222222', 'carlos@styllus.com', 'Carlos Lima', '(11) 99999-2222', 'professional'),
('33333333-3333-3333-3333-333333333333', 'beatriz@styllus.com', 'Beatriz Oliveira', '(11) 99999-3333', 'professional');

INSERT INTO professionals (user_id, specialty, bio, experience_years, rating, total_reviews, status, location) VALUES 
('11111111-1111-1111-1111-111111111111', 'Cabeleireira', 'Especialista em cortes femininos e coloração', 8, 4.8, 156, 'active', 'São Paulo, SP'),
('22222222-2222-2222-2222-222222222222', 'Massoterapeuta', 'Massagem terapêutica e relaxante', 12, 4.9, 89, 'active', 'Rio de Janeiro, RJ'),
('33333333-3333-3333-3333-333333333333', 'Manicure', 'Especialista em nail art e cuidados com unhas', 5, 4.7, 203, 'active', 'Belo Horizonte, MG');

-- Insert sample clients
INSERT INTO users (id, email, name, phone, user_type) VALUES 
('44444444-4444-4444-4444-444444444444', 'maria@email.com', 'Maria Santos', '(11) 98888-1111', 'client'),
('55555555-5555-5555-5555-555555555555', 'joao@email.com', 'João Silva', '(11) 98888-2222', 'client'),
('66666666-6666-6666-6666-666666666666', 'ana.paula@email.com', 'Ana Paula', '(11) 98888-3333', 'client');

INSERT INTO clients (user_id, birth_date, gender, address, total_services, total_spent, status) VALUES 
('44444444-4444-4444-4444-444444444444', '1990-05-15', 'feminino', 'São Paulo, SP', 15, 1200.00, 'active'),
('55555555-5555-5555-5555-555555555555', '1985-08-22', 'masculino', 'Rio de Janeiro, RJ', 8, 960.00, 'active'),
('66666666-6666-6666-6666-666666666666', '1992-12-03', 'feminino', 'Belo Horizonte, MG', 22, 1760.00, 'active');

-- Insert sample services
INSERT INTO services (name, description, category, duration_minutes, price, professional_id) VALUES 
('Corte Feminino', 'Corte de cabelo personalizado', 'Cabelo', 60, 80.00, (SELECT id FROM professionals WHERE user_id = '11111111-1111-1111-1111-111111111111')),
('Coloração', 'Coloração completa do cabelo', 'Cabelo', 120, 150.00, (SELECT id FROM professionals WHERE user_id = '11111111-1111-1111-1111-111111111111')),
('Massagem Relaxante', 'Massagem corporal relaxante', 'Massagem', 90, 120.00, (SELECT id FROM professionals WHERE user_id = '22222222-2222-2222-2222-222222222222')),
('Manicure Completa', 'Cuidado completo das unhas', 'Unhas', 60, 60.00, (SELECT id FROM professionals WHERE user_id = '33333333-3333-3333-3333-333333333333'));

-- Insert sample courses
INSERT INTO courses (title, description, instructor_id, category, price, duration_hours, total_lessons, level, status, total_students) VALUES 
('Técnicas de Corte Moderno', 'Aprenda as técnicas mais modernas de corte', (SELECT id FROM professionals WHERE user_id = '11111111-1111-1111-1111-111111111111'), 'Cabelo', 299.00, 8, 12, 'intermediate', 'active', 45),
('Massagem Terapêutica', 'Curso completo de massagem terapêutica', (SELECT id FROM professionals WHERE user_id = '22222222-2222-2222-2222-222222222222'), 'Massagem', 399.00, 12, 16, 'advanced', 'active', 28),
('Nail Art Profissional', 'Técnicas avançadas de nail art', (SELECT id FROM professionals WHERE user_id = '33333333-3333-3333-3333-333333333333'), 'Unhas', 199.00, 6, 10, 'beginner', 'active', 67);
