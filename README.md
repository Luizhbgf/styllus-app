# 💈 Styllus - Sistema de Gerenciamento de Salão

Sistema completo para agendamento e gerenciamento de salões de beleza, barbearias e spas.

## ✨ Funcionalidades

### Para Clientes
- 📅 Agendamento online
- 👨‍💼 Busca de profissionais
- ⭐ Sistema de avaliações
- 💳 Assinaturas mensais
- 📱 App mobile (PWA)

### Para Profissionais (Staff)
- 📊 Dashboard de desempenho
- 💰 Controle financeiro
- 📅 Gestão de agenda
- 💎 Criação de planos de assinatura
- 👥 Gestão de clientes

### Para Administradores
- 🏢 Visão geral do negócio
- 👥 Gestão de usuários e permissões
- 📈 Relatórios e analytics
- ⚙️ Configurações do sistema
- 💰 Controle financeiro global

## 🚀 Tecnologias

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Next.js API Routes, Supabase
- **Database**: PostgreSQL (Supabase)
- **Styling**: Tailwind CSS, shadcn/ui
- **Auth**: Sistema customizado com níveis
- **Deploy**: Docker, Vercel, Nginx

## 📦 Instalação

### Desenvolvimento Local

\`\`\`bash
# Instalar dependências
npm install

# Configurar ambiente
cp .env.development.example .env.development

# Executar
npm run dev
\`\`\`

### Com Docker

\`\`\`bash
# Desenvolvimento
docker-compose up app-dev

# Produção
docker-compose up -d
\`\`\`

## 🌐 Ambientes

- **Desenvolvimento**: http://localhost:3000
- **Homologação**: http://localhost:3001
- **Produção**: http://localhost (via Nginx)

## 👤 Usuários de Teste

Após executar os scripts SQL:

- **Owner**: owner@styllus.com / senha123
- **Admin**: admin@styllus.com / senha123
- **Staff**: carlos@styllus.com / senha123
- **Cliente**: maria@cliente.com / senha123

## 📱 App Mobile

A aplicação é uma PWA e pode ser instalada como app nativo:

- **Android**: Chrome > Menu > "Adicionar à tela inicial"
- **iOS**: Safari > Compartilhar > "Adicionar à Tela de Início"

## 📊 Níveis de Acesso

- **10 - Cliente**: Área do cliente
- **20 - Staff**: Área de profissionais
- **30 - Admin**: Área administrativa
- **Owner**: Super administrador

## 🔒 Segurança

- Sistema de autenticação com níveis hierárquicos
- Rate limiting
- Headers de segurança
- Validações frontend e backend
- Logs de alterações

## 📖 Documentação

Veja [DEPLOYMENT.md](./DEPLOYMENT.md) para guia completo de deploy.

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.
