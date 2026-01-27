#!/bin/bash

# setup.sh - Automatyczny setup projektu Family Expense Tracker

echo "🚀 Family Expense Tracker - Setup Script"
echo "========================================="
echo ""

# Sprawdź Node.js
echo "📦 Sprawdzanie Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js nie jest zainstalowany!"
    echo "Zainstaluj przez: brew install node"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "⚠️  Wymagany Node.js 18+, masz $(node -v)"
    echo "Zaktualizuj przez: brew upgrade node"
    exit 1
fi

echo "✅ Node.js $(node -v) - OK"
echo ""

# Sprawdź czy jesteśmy w odpowiednim folderze
if [ ! -f "package.json" ]; then
    echo "❌ Nie znaleziono package.json"
    echo "Uruchom ten skrypt w głównym folderze projektu!"
    exit 1
fi

# Instaluj zależności
echo "📥 Instalowanie zależności..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Instalacja zależności nie powiodła się!"
    exit 1
fi

echo "✅ Zależności zainstalowane"
echo ""

# Sprawdź .env.local
if [ ! -f ".env.local" ]; then
    echo "⚙️  Tworzę .env.local z przykładu..."
    cp .env.example .env.local
    echo "⚠️  WAŻNE: Wypełnij klucze Supabase w .env.local!"
    echo ""
fi

# Inicjalizuj Git (jeśli nie jest)
if [ ! -d ".git" ]; then
    echo "📝 Inicjalizacja Git..."
    git init
    git add .
    git commit -m "Initial commit - Family Expense Tracker"
    echo "✅ Git zainicjalizowany"
    echo ""
    echo "💡 Aby połączyć z GitHub:"
    echo "   1. Utwórz repo na GitHub"
    echo "   2. git remote add origin https://github.com/TWOJA-NAZWA/family-expense-tracker.git"
    echo "   3. git push -u origin main"
    echo ""
fi

# Podsumowanie
echo "========================================="
echo "✅ Setup zakończony pomyślnie!"
echo "========================================="
echo ""
echo "📋 Następne kroki:"
echo ""
echo "1. Skonfiguruj Supabase:"
echo "   • Wejdź na https://supabase.com"
echo "   • Utwórz nowy projekt"
echo "   • Wykonaj migration z supabase/migrations/001_initial_schema.sql"
echo "   • Skopiuj klucze API do .env.local"
echo ""
echo "2. Uruchom aplikację:"
echo "   npm run dev"
echo ""
echo "3. Otwórz w przeglądarce:"
echo "   http://localhost:3000"
echo ""
echo "📚 Więcej informacji:"
echo "   • Quick Start: QUICK-START.md"
echo "   • Pełny setup: docs/setup-guide.md"
echo "   • Roadmap: docs/mvp-roadmap.md"
echo ""
echo "Powodzenia! 🎉"
