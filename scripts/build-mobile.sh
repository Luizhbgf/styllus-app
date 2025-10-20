#!/bin/bash

echo "🚀 Iniciando build para mobile..."

# Definir modo mobile
export BUILD_MODE=mobile
export NEXT_PUBLIC_ENV=production
export NEXT_PUBLIC_APP_URL=https://styllusestetica.com.br

# Build do Next.js
echo "📦 Building Next.js..."
npm run build

# Exportar para static
echo "📤 Exporting static files..."
npm run export

# Sincronizar com Capacitor
echo "🔄 Syncing with Capacitor..."
npx cap sync

echo "✅ Build mobile concluído!"
echo ""
echo "Para abrir no Android Studio:"
echo "  npm run open:android"
echo ""
echo "Para abrir no Xcode:"
echo "  npm run open:ios"
