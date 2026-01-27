# Setup Guide - Krok po kroku

Ten przewodnik przeprowadzi Cię przez cały proces setupu projektu Family Expense Tracker od zera.

## Wymagania wstępne

### 1. Zainstaluj Node.js

**macOS (przez Homebrew):**
```bash
brew install node
```

**Lub pobierz z oficjalnej strony:**
- Wejdź na https://nodejs.org/
- Pobierz wersję LTS (Long Term Support)
- Zainstaluj

**Weryfikacja:**
```bash
node --version  # Powinno pokazać v18 lub wyżej
npm --version   # Powinno pokazać v9 lub wyżej
```

### 2. Zainstaluj Git

```bash
# Sprawdź czy masz już Git
git --version

# Jeśli nie, zainstaluj przez Homebrew
brew install git
```

### 3. Zainstaluj VS Code

- Pobierz z https://code.visualstudio.com/
- Zainstaluj aplikację
- Otwórz VS Code

### 4. Zainstaluj rozszerzenia VS Code

Otwórz VS Code i zainstaluj następujące rozszerzenia (Cmd+Shift+X):

- **ESLint** - dbaeumer.vscode-eslint
- **Prettier** - esbenp.prettier-vscode
- **Tailwind CSS IntelliSense** - bradlc.vscode-tailwindcss
- **TypeScript** - (wbudowane w VS Code)
- **GitLens** - eamodio.gitlens

## Krok 1: Utwórz konto GitHub

1. Wejdź na https://github.com
2. Kliknij "Sign up"
3. Wypełnij formularz rejestracyjny
4. Zweryfikuj email

## Krok 2: Utwórz nowe repozytorium

1. Zaloguj się na GitHub
2. Kliknij "+" w górnym prawym rogu → "New repository"
3. Wypełnij dane:
   - **Repository name:** `family-expense-tracker`
   - **Description:** "Aplikacja do zarządzania wydatkami rodzinnymi"
   - **Visibility:** Private (lub Public, jeśli chcesz)
   - **NIE** zaznaczaj "Initialize with README" (już mamy lokalnie)
4. Kliknij "Create repository"

## Krok 3: Sklonuj strukturę projektu

Otwórz Terminal na macOS (Cmd+Space → wpisz "Terminal"):

```bash
# Przejdź do folderu gdzie chcesz mieć projekt
cd ~/Documents  # lub inna lokalizacja

# Pobierz strukturę projektu (dostaniesz link)
# Rozpakuj i przejdź do folderu
cd family-expense-tracker
```

## Krok 4: Połącz z GitHubem

```bash
# Zainicjuj Git (jeśli jeszcze nie jest)
git init

# Dodaj wszystkie pliki
git add .

# Pierwszy commit
git commit -m "Initial project structure"

# Dodaj remote (zamień YOUR-USERNAME na swoją nazwę użytkownika GitHub)
git remote add origin https://github.com/YOUR-USERNAME/family-expense-tracker.git

# Wypchnij kod na GitHub
git branch -M main
git push -u origin main
```

## Krok 5: Otwórz projekt w VS Code

```bash
# Z terminala w folderze projektu
code .
```

## Krok 6: Zainstaluj zależności

W VS Code otwórz terminal (Ctrl+` lub View → Terminal):

```bash
npm install
```

To może potrwać kilka minut. npm pobierze wszystkie wymagane pakiety.

## Krok 7: Utwórz projekt Supabase

1. Wejdź na https://supabase.com
2. Kliknij "Start your project"
3. Zaloguj się (GitHub, Google, lub email)
4. Kliknij "New project"
5. Wypełnij formularz:
   - **Name:** family-expense-tracker
   - **Database Password:** (wygeneruj silne hasło i zapisz je!)
   - **Region:** Europe (Frankfurt) - najbliżej Polski
   - **Pricing Plan:** Free
6. Kliknij "Create new project" (to potrwa ~2 minuty)

## Krok 8: Skonfiguruj bazę danych

1. W panelu Supabase przejdź do **SQL Editor** (ikona ">" w lewym menu)
2. Kliknij "New query"
3. Otwórz plik `supabase/migrations/001_initial_schema.sql` w VS Code
4. Skopiuj całą zawartość
5. Wklej do SQL Editor w Supabase
6. Kliknij "Run" (lub Cmd+Enter)
7. Powinieneś zobaczyć "Success. No rows returned"

## Krok 9: Pobierz klucze API

1. W Supabase przejdź do **Settings** → **API**
2. Znajdź sekcję "Project API keys"
3. Skopiuj:
   - **Project URL** (przykład: `https://abc123.supabase.co`)
   - **anon/public key** (długi ciąg znaków zaczynający się od `eyJ...`)

## Krok 10: Skonfiguruj zmienne środowiskowe

W VS Code:

1. Skopiuj plik `.env.example` i nazwij go `.env.local`:
```bash
cp .env.example .env.local
```

2. Otwórz `.env.local` i wypełnij swoimi wartościami:
```env
NEXT_PUBLIC_SUPABASE_URL=https://twoj-projekt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=twoj_klucz_tutaj
```

3. Zapisz plik (Cmd+S)

## Krok 11: Uruchom aplikację

W terminalu VS Code:

```bash
npm run dev
```

Powinieneś zobaczyć:
```
  ▲ Next.js 14.1.0
  - Local:        http://localhost:3000
  - ready started server on 0.0.0.0:3000
```

## Krok 12: Otwórz w przeglądarce

Wejdź na: http://localhost:3000

🎉 **Gratulacje!** Aplikacja działa lokalnie!

## Problemy?

### "Command not found: npm"
- Node.js nie jest zainstalowany. Wróć do kroku 1.

### "Module not found"
- Uruchom `npm install` ponownie

### "Supabase connection error"
- Sprawdź czy klucze w `.env.local` są poprawne
- Upewnij się że projekt Supabase jest aktywny

### "Port 3000 already in use"
- Zamknij inną aplikację używającą portu 3000
- Lub zmień port: `npm run dev -- -p 3001`

## Następne kroki

1. **Przeczytaj dokumentację architektury:** `docs/architecture.md`
2. **Zacznij kodowanie:** Następnym krokiem będzie stworzenie stron logowania i rejestracji
3. **Commituj regularnie:** `git add .` → `git commit -m "opis zmian"` → `git push`

## Przydatne komendy

```bash
# Development
npm run dev          # Uruchom dev server
npm run build        # Zbuduj produkcyjną wersję
npm run start        # Uruchom produkcyjną wersję
npm run lint         # Sprawdź kod

# Git
git status           # Zobacz zmiany
git add .            # Dodaj wszystkie pliki
git commit -m "msg"  # Commit ze wiadomością
git push             # Wypchnij na GitHub
git pull             # Pobierz zmiany z GitHub

# VS Code
Cmd+P                # Szybkie otwieranie plików
Cmd+Shift+P          # Command palette
Cmd+`                # Toggle terminal
Cmd+B                # Toggle sidebar
```

## Potrzebujesz pomocy?

- Dokumentacja Next.js: https://nextjs.org/docs
- Dokumentacja Supabase: https://supabase.com/docs
- Dokumentacja TypeScript: https://www.typescriptlang.org/docs
- Dokumentacja Tailwind: https://tailwindcss.com/docs
