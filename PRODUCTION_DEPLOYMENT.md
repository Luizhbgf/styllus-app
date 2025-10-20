# 🚀 Guia Completo de Deploy em Produção - Styllus

Este guia cobre todo o processo de colocar a aplicação Styllus em produção, incluindo:
- ✅ Deploy do site no domínio personalizado
- ✅ Publicação na Google Play Store
- ✅ Publicação na Apple App Store

---

## 📱 PARTE 1: Deploy do Site (https://styllusestetica.com.br/)

### Pré-requisitos
- Conta na Vercel (gratuita)
- Acesso ao gerenciador de DNS do domínio
- Variáveis de ambiente configuradas

### Passo 1: Deploy na Vercel

#### 1.1 Conectar Repositório
\`\`\`bash
# Se ainda não fez, instale a CLI da Vercel
npm i -g vercel

# Faça login
vercel login

# No diretório do projeto
vercel
\`\`\`

#### 1.2 Configurar Variáveis de Ambiente

Na dashboard da Vercel:
1. Vá em **Settings** > **Environment Variables**
2. Adicione todas as variáveis:

\`\`\`env
PROD_SUPABASE_ENV=production
PROD_SUPABASE_APP_URL=https://styllusestetica.com.br

STAGING_SUPABASE_URL=sua_url_supabase
STAGING_SUPABASE_ANON_KEY=sua_anon_key
STAGING_SUPABASE_SERVICE_ROLE_KEY=sua_service_key

PROD_SUPABASE_URL=sua_url_supabase
PROD_SUPABASE_ANON_KEY=sua_anon_key
PROD_SUPABASE_SERVICE_ROLE_KEY=sua_service_key
\`\`\`

### Passo 2: Configurar Domínio Personalizado

#### 2.1 Na Vercel
1. Acesse o projeto na Vercel
2. Vá em **Settings** > **Domains**
3. Clique em **Add Domain**
4. Digite: `styllusestetica.com.br`
5. Clique em **Add**

#### 2.2 Configurar DNS

A Vercel fornecerá registros DNS. Configure no seu provedor de domínio:

**Opção A: Nameservers (Recomendado)**
\`\`\`
ns1.vercel-dns.com
ns2.vercel-dns.com
\`\`\`

**Opção B: Registros A e CNAME**
\`\`\`
Tipo: A
Nome: @
Valor: 76.76.21.21

Tipo: CNAME
Nome: www
Valor: cname.vercel-dns.com
\`\`\`

#### 2.3 Aguardar Propagação
- DNS pode levar de 1 a 48 horas para propagar
- Verifique em: https://dnschecker.org

#### 2.4 SSL Automático
A Vercel configura SSL automaticamente via Let's Encrypt.

### Passo 3: Fazer Deploy
\`\`\`bash
# Deploy para produção
vercel --prod
\`\`\`

---

## 📱 PARTE 2: Aplicativo Android (Google Play Store)

### Pré-requisitos
- Conta Google Developer ($25 taxa única)
- Android Studio instalado
- JDK 17 ou superior
- Node.js 18+

### Passo 1: Preparar Projeto

#### 1.1 Instalar Capacitor
\`\`\`bash
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android @capacitor/ios
npm install @capacitor/splash-screen @capacitor/status-bar
\`\`\`

#### 1.2 Inicializar Capacitor
\`\`\`bash
npx cap init
# App name: Styllus
# App ID: com.styllus.app
# Web directory: out
\`\`\`

#### 1.3 Adicionar Plataforma Android
\`\`\`bash
npx cap add android
\`\`\`

### Passo 2: Configurar Ícones e Splash Screens

Crie os ícones nas seguintes resoluções em `android/app/src/main/res/`:

\`\`\`
mipmap-mdpi/ic_launcher.png (48x48)
mipmap-hdpi/ic_launcher.png (72x72)
mipmap-xhdpi/ic_launcher.png (96x96)
mipmap-xxhdpi/ic_launcher.png (144x144)
mipmap-xxxhdpi/ic_launcher.png (192x192)
\`\`\`

Use ferramentas online:
- https://icon.kitchen/
- https://appicon.co/

### Passo 3: Build e Sincronizar

\`\`\`bash
# Build do Next.js para mobile
BUILD_MODE=mobile npm run build

# Sincronizar com Capacitor
npx cap sync android

# Abrir no Android Studio
npx cap open android
\`\`\`

### Passo 4: Gerar APK/AAB Assinado

#### 4.1 Criar Keystore
\`\`\`bash
keytool -genkey -v -keystore styllus-release-key.keystore \
  -alias styllus -keyalg RSA -keysize 2048 -validity 10000
\`\`\`

**Guarde essas informações em local seguro!**

#### 4.2 Configurar no Android Studio
1. **Build** > **Generate Signed Bundle / APK**
2. Selecione **Android App Bundle**
3. Escolha o keystore criado
4. Preencha as senhas
5. Selecione **release**
6. Clique em **Finish**

#### 4.3 Arquivo gerado
\`\`\`
android/app/release/app-release.aab
\`\`\`

### Passo 5: Publicar na Google Play Store

#### 5.1 Criar Conta Developer
1. Acesse https://play.google.com/console
2. Pague a taxa única de $25
3. Complete o perfil

#### 5.2 Criar Novo App
1. **Criar aplicativo**
2. Nome: **Styllus**
3. Idioma padrão: **Português (Brasil)**
4. App ou jogo: **App**
5. Gratuito ou pago: **Gratuito**

#### 5.3 Preencher Informações

**Ficha da loja:**
- Título: Styllus - Gestão de Beleza
- Descrição curta: Sistema completo para salões de beleza
- Descrição completa: [Descrição detalhada do app]
- Ícone: 512x512 PNG
- Imagem de destaque: 1024x500 PNG
- Screenshots: 
  - Mínimo 2 screenshots
  - 16:9 ou 9:16
  - Formatos: PNG ou JPEG

**Categorização:**
- Categoria: Negócios
- Tipo de conteúdo: Ferramenta de Negócios

**Informações de contato:**
- E-mail: contato@styllusestetica.com.br
- Telefone: [Telefone do cliente]
- Website: https://styllusestetica.com.br
- Política de privacidade: [URL da política]

#### 5.4 Upload do AAB
1. **Produção** > **Criar nova versão**
2. Upload do arquivo `app-release.aab`
3. Notas de versão: "Versão inicial do aplicativo"
4. **Revisar versão**
5. **Iniciar lançamento**

#### 5.5 Revisão Google
- Tempo médio: 1-7 dias
- Você receberá email quando aprovado

---

## 🍎 PARTE 3: Aplicativo iOS (Apple App Store)

### Pré-requisitos
- Mac com macOS
- Xcode 14+ instalado
- Conta Apple Developer ($99/ano)
- Certificados e Provisioning Profiles

### Passo 1: Preparar Projeto iOS

#### 1.1 Adicionar Plataforma iOS
\`\`\`bash
npx cap add ios
\`\`\`

#### 1.2 Build e Sincronizar
\`\`\`bash
BUILD_MODE=mobile npm run build
npx cap sync ios
npx cap open ios
\`\`\`

### Passo 2: Configurar no Xcode

#### 2.1 Configurações Básicas
1. Abra o projeto no Xcode
2. Selecione o target **App**
3. Em **General**:
   - Display Name: **Styllus**
   - Bundle Identifier: **com.styllus.app**
   - Version: **1.0**
   - Build: **1**

#### 2.2 Configurar Signing
1. **Signing & Capabilities**
2. Marque **Automatically manage signing**
3. Selecione seu Team (Apple Developer Account)

#### 2.3 Adicionar Ícones
1. Vá em **Assets.xcassets** > **AppIcon**
2. Arraste os ícones nas resoluções corretas:
   - 20x20 pt (2x, 3x)
   - 29x29 pt (2x, 3x)
   - 40x40 pt (2x, 3x)
   - 60x60 pt (2x, 3x)
   - 1024x1024 pt (1x) - App Store

Use: https://appicon.co/ para gerar todos os tamanhos

### Passo 3: Build para Release

#### 3.1 Selecionar Dispositivo
- Product > Destination > Any iOS Device (arm64)

#### 3.2 Criar Archive
1. **Product** > **Archive**
2. Aguarde o build completar
3. A janela **Organizer** abrirá

#### 3.3 Validar o Archive
1. Selecione o archive criado
2. Clique em **Validate App**
3. Corrija qualquer erro
4. Clique em **Distribute App**

### Passo 4: App Store Connect

#### 4.1 Criar App no App Store Connect
1. Acesse https://appstoreconnect.apple.com
2. **Meus Apps** > **+ Novo App**
3. Preencha:
   - Plataforma: iOS
   - Nome: Styllus
   - Idioma principal: Português (Brasil)
   - Bundle ID: com.styllus.app
   - SKU: STYLLUS001

#### 4.2 Preencher Informações do App

**Informações do app:**
- Nome: Styllus
- Subtítulo: Gestão de Salão de Beleza
- Categoria primária: Negócios
- Categoria secundária: Produtividade

**Descrição:**
\`\`\`
Sistema completo de gestão para salões de beleza, com agendamentos, 
controle de clientes, profissionais, cursos e muito mais.

Recursos:
• Agendamento online
• Gestão de profissionais
• Controle de clientes
• Sistema de assinaturas
• Relatórios e análises
• Notificações em tempo real
\`\`\`

**Palavras-chave:**
\`\`\`
salão, beleza, agendamento, estética, barbearia, cabelo, manicure
\`\`\`

**Screenshots:**
- Mínimo 3 screenshots
- iPhone 6.7" (1290x2796)
- iPhone 6.5" (1242x2688)
- iPad Pro 12.9" (2048x2732)

**Informações de contato:**
- E-mail: contato@styllusestetica.com.br
- Telefone: [Telefone]
- URL de suporte: https://styllusestetica.com.br/suporte
- URL de marketing: https://styllusestetica.com.br

**Privacidade:**
- URL da política: https://styllusestetica.com.br/privacidade

#### 4.3 Upload do Build
1. No Xcode Organizer, clique em **Distribute App**
2. Selecione **App Store Connect**
3. **Upload**
4. Aguarde o processamento (pode levar horas)

#### 4.4 Submeter para Revisão
1. No App Store Connect, selecione o build
2. Preencha **Informações de versão**
3. **Adicionar para revisão**
4. **Enviar para revisão**

#### 4.5 Revisão Apple
- Tempo médio: 24-48 horas
- Pode solicitar informações adicionais
- Seja responsivo às solicitações

---

## 📋 PARTE 4: Checklist de Entrega

### Antes de Entregar ao Cliente

- [ ] Site funcionando em https://styllusestetica.com.br
- [ ] SSL configurado e válido
- [ ] Todas as páginas testadas
- [ ] Sistema de login funcionando
- [ ] Banco de dados configurado e populado
- [ ] Backups automáticos configurados
- [ ] Monitoramento de erros configurado (Sentry/LogRocket)

### Aplicativo Android
- [ ] APK/AAB gerado e assinado
- [ ] Testado em dispositivos físicos
- [ ] Screenshots de qualidade
- [ ] Descrição e ícones corretos
- [ ] Publicado na Play Store (ou em revisão)

### Aplicativo iOS
- [ ] Build validado e enviado
- [ ] Testado no TestFlight
- [ ] Screenshots de qualidade
- [ ] Descrição e ícones corretos
- [ ] Submetido para revisão (ou aprovado)

### Documentação
- [ ] Manual do administrador
- [ ] Manual do usuário
- [ ] Credenciais de acesso
- [ ] Documentação técnica
- [ ] Plano de manutenção

---

## 📞 PARTE 5: Suporte Pós-Deploy

### Monitoramento

**Vercel:**
- Analytics: https://vercel.com/analytics
- Logs: Dashboard do projeto
- Uptime: 99.9% SLA

**Google Play:**
- Console: https://play.google.com/console
- Crashes & ANRs
- Avaliações de usuários

**App Store:**
- Connect: https://appstoreconnect.apple.com
- Análises
- Avaliações

### Atualizações

**Site:**
\`\`\`bash
git push origin main
# Deploy automático na Vercel
\`\`\`

**Android:**
1. Incrementar versionCode e versionName
2. Build novo AAB
3. Upload na Play Store
4. Lançamento gradual recomendado

**iOS:**
1. Incrementar Version e Build
2. Archive e upload
3. Submeter nova versão

---

## 💰 CUSTOS MENSAIS ESTIMADOS

| Serviço | Custo |
|---------|-------|
| Vercel Pro (opcional) | $20/mês |
| Supabase Pro | $25/mês |
| Google Play (uma vez) | $25 |
| Apple Developer | $99/ano |
| Domínio | ~R$40/ano |

**Total inicial:** ~$150 + domínio
**Total mensal:** $45-65

---

## 🎉 Conclusão

Após seguir todos os passos, você terá:

✅ Site em produção no domínio do cliente
✅ Aplicativo Android na Play Store
✅ Aplicativo iOS na App Store
✅ Sistema completo funcionando
✅ Infraestrutura escalável

**Tempo estimado total:** 3-7 dias
- Website: 1 dia
- Android: 1-2 dias
- iOS: 1-4 dias (revisão Apple)

Boa sorte! 🚀
