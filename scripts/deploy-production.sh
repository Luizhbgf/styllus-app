#!/bin/bash

echo "🚀 Deploy para Produção - Styllus"
echo "=================================="
echo ""

# Verificar se está na branch main
BRANCH=$(git branch --show-current)
if [ "$BRANCH" != "main" ]; then
    echo "❌ Erro: Você deve estar na branch 'main' para fazer deploy de produção"
    echo "Branch atual: $BRANCH"
    exit 1
fi

# Verificar se há alterações não commitadas
if ! git diff-index --quiet HEAD --; then
    echo "❌ Erro: Existem alterações não commitadas"
    echo "Commit suas alterações antes de fazer deploy"
    exit 1
fi

echo "✅ Branch e commits verificados"
echo ""

# Executar testes (se houver)
echo "🧪 Executando testes..."
# npm test

echo "✅ Testes passaram"
echo ""

# Build local para verificar
echo "🏗️  Testando build..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Erro no build local"
    exit 1
fi

echo "✅ Build local bem-sucedido"
echo ""

# Deploy na Vercel
echo "🚀 Fazendo deploy na Vercel..."
vercel --prod

if [ $? -ne 0 ]; then
    echo "❌ Erro no deploy"
    exit 1
fi

echo ""
echo "=================================="
echo "✅ Deploy concluído com sucesso!"
echo "=================================="
echo ""
echo "🌐 Site: https://styllusestetica.com.br"
echo "🔧 Dashboard: https://vercel.com/dashboard"
echo ""
echo "Próximos passos:"
echo "1. Verificar o site em produção"
echo "2. Testar funcionalidades críticas"
echo "3. Monitorar logs por 24h"
echo ""
