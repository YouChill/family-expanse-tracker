# Quick Start - Szybki start 🚀

Jeśli chcesz jak najszybciej uruchomić projekt, wykonaj te kroki:

## Wymagania

- macOS
- VS Code zainstalowane
- Konto GitHub
- 30 minut czasu

## Krok 1: Przygotowanie (5 min)

```bash
# Zainstaluj Node.js (jeśli nie masz)
brew install node

# Sprawdź wersję
node --version  # Powinno być v18+
```

## Krok 2: Sklonuj i zainstaluj (5 min)

```bash
# Przejdź do folderu projektów
cd ~/Documents

# Tu będzie link do pobrania projektu
# Rozpakuj i przejdź do folderu
cd family-expense-tracker

# Zainstaluj zależności
npm install

# Otwórz w VS Code
code .
```

## Krok 3: Supabase (10 min)

1. Wejdź na https://supabase.com
2. Zaloguj się (przez GitHub najłatwiej)
3. **New project** → Nazwa: `family-expense-tracker`
4. Wygeneruj i zapisz hasło do bazy
5. Region: **Europe (Frankfurt)**
6. Free plan
7. **Create project** (poczekaj ~2 min)

## Krok 4: Baza danych (5 min)

1. W Supabase → **SQL Editor**
2. **New query**
3. Otwórz `supabase/migrations/001_initial_schema.sql` w VS Code
4. Skopiuj WSZYSTKO i wklej do SQL Editor
5. **Run** (Cmd+Enter)
6. Zobacz "Success"

## Krok 5: Klucze API (3 min)

1. Supabase → **Settings** → **API**
2. Skopiuj **Project URL** i **anon key**
3. W VS Code skopiuj `.env.example` → `.env.local`
4. Wklej swoje wartości:

```env
NEXT_PUBLIC_SUPABASE_URL=https://twoj-projekt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...długi_klucz
```

## Krok 6: Uruchom! (2 min)

```bash
npm run dev
```

Otwórz: **http://localhost:3000**

## ✅ Gotowe!

Aplikacja działa lokalnie. Teraz możesz:

1. Zacząć kodować funkcjonalności
2. Przeczytać `docs/mvp-roadmap.md` - co dalej
3. Przeczytać `docs/architecture.md` - jak to działa

## Git i GitHub (bonus)

```bash
# Inicjalizuj Git
git init
git add .
git commit -m "Initial commit"

# Utwórz repo na GitHub i:
git remote add origin https://github.com/TWOJA-NAZWA/family-expense-tracker.git
git branch -M main
git push -u origin main
```

## Problemy?

Przeczytaj szczegółowy guide: `docs/setup-guide.md`

## Następny krok

Zacznij od implementacji autentykacji:
- Strona logowania (`/login`)
- Strona rejestracji (`/register`)

Zobacz `docs/mvp-roadmap.md` Faza 2! 🎯
