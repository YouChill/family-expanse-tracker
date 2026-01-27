# Setup Checklist ✅

Użyj tego pliku żeby śledzić postęp setupu projektu.

## Przed startem

- [ ] Mam zainstalowany VS Code
- [ ] Mam konto na GitHub
- [ ] Mam 30-60 minut czasu

## Krok 1: Środowisko (10 min)

- [ ] Node.js 18+ zainstalowane
  ```bash
  node --version  # Sprawdź wersję
  ```
- [ ] Git zainstalowany
  ```bash
  git --version
  ```
- [ ] Projekt pobrany/sklonowany
- [ ] VS Code otwarte w folderze projektu

## Krok 2: Instalacja (5 min)

- [ ] Uruchomiłem `npm install`
- [ ] Instalacja zakończona bez błędów
- [ ] Folder `node_modules/` utworzony

## Krok 3: Supabase (15 min)

- [ ] Konto Supabase utworzone
- [ ] Nowy projekt utworzony
  - Nazwa: `family-expense-tracker`
  - Region: Europe (Frankfurt)
  - Plan: Free
- [ ] Hasło do bazy zapisane w bezpiecznym miejscu
- [ ] Projekt Supabase gotowy (status: Active)

## Krok 4: Baza danych (5 min)

- [ ] Otworzony SQL Editor w Supabase
- [ ] Skopiowany cały `supabase/migrations/001_initial_schema.sql`
- [ ] Wykonany w SQL Editor (Run)
- [ ] Zobaczony komunikat "Success"
- [ ] Tabele widoczne w Table Editor:
  - [ ] families
  - [ ] users
  - [ ] expenses

## Krok 5: Konfiguracja (5 min)

- [ ] Skopiowany plik `.env.example` → `.env.local`
- [ ] W Supabase: Settings → API otwarte
- [ ] Project URL skopiowany
- [ ] anon/public key skopiowany
- [ ] Oba wartości wklejone do `.env.local`
- [ ] Plik `.env.local` zapisany

## Krok 6: Test (5 min)

- [ ] Uruchomiony `npm run dev`
- [ ] Zobaczony komunikat "ready - started server on 0.0.0.0:3000"
- [ ] Otwarte http://localhost:3000 w przeglądarce
- [ ] Strona się załadowała (nawet jeśli pusta/błąd 404 - to OK na razie)

## Krok 7: Git i GitHub (10 min)

- [ ] Repozytorium na GitHub utworzone
  - Nazwa: `family-expense-tracker`
  - Visibility: Private (lub Public)
- [ ] Git zainicjalizowany lokalnie (`git init`)
- [ ] Remote dodany
  ```bash
  git remote add origin https://github.com/TWOJA-NAZWA/family-expense-tracker.git
  ```
- [ ] Pierwszy commit
  ```bash
  git add .
  git commit -m "Initial commit"
  ```
- [ ] Push do GitHub
  ```bash
  git push -u origin main
  ```
- [ ] Kod widoczny na GitHubie

## Opcjonalne rozszerzenia VS Code

- [ ] ESLint (`dbaeumer.vscode-eslint`)
- [ ] Prettier (`esbenp.prettier-vscode`)
- [ ] Tailwind CSS IntelliSense (`bradlc.vscode-tailwindcss`)
- [ ] GitLens (`eamodio.gitlens`)

## Weryfikacja końcowa

- [ ] `npm run lint` - przechodzi bez błędów
- [ ] `npm run type-check` - przechodzi bez błędów
- [ ] `npm run build` - buduje się pomyślnie
- [ ] `.env.local` NIE jest w Git (sprawdź: nie pojawia się w `git status`)
- [ ] Wszystkie pliki z projektu są na GitHubie

## 🎉 Setup zakończony!

Jeśli wszystkie checkboxy są zaznaczone - gratulacje! 

### Następne kroki:

1. [ ] Przeczytaj `docs/mvp-roadmap.md` - plan implementacji
2. [ ] Przeczytaj `docs/architecture.md` - jak działa aplikacja
3. [ ] Zacznij od Fazy 2: Autentykacja

### Rozpocznij kodowanie:

```bash
# Utwórz branch na pierwszą funkcjonalność
git checkout -b feature/auth-pages

# Zacznij kodować!
```

## Problemy?

Jeśli któryś krok nie działa:

1. Sprawdź `docs/setup-guide.md` - szczegółowe instrukcje
2. Zobacz `PROJECT_STRUCTURE.md` - FAQ i troubleshooting
3. Sprawdź logi błędów w terminalu
4. Upewnij się że wszystkie wcześniejsze kroki są ✅

## Przydatne komendy

```bash
# Zatrzymaj dev server
Ctrl + C

# Sprawdź status Git
git status

# Zobacz jakie porty są używane
lsof -i :3000

# Wyczyść cache npm
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```
