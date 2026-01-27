# Struktura projektu Family Expense Tracker

## 📂 Główne foldery

```
family-expense-tracker/
├── .github/              # GitHub templates i workflows
├── docs/                 # Dokumentacja projektu
├── src/                  # Kod źródłowy aplikacji
├── supabase/            # Pliki bazy danych
└── public/              # Statyczne pliki (wkrótce)
```

## 📄 Pliki konfiguracyjne

### Root level
- **package.json** - Zależności npm i skrypty
- **tsconfig.json** - Konfiguracja TypeScript
- **next.config.js** - Konfiguracja Next.js
- **tailwind.config.js** - Konfiguracja Tailwind CSS
- **postcss.config.js** - Konfiguracja PostCSS
- **.env.example** - Przykład zmiennych środowiskowych
- **.gitignore** - Pliki ignorowane przez Git
- **LICENSE** - Licencja MIT
- **setup.sh** - Skrypt automatycznego setupu

### Dokumentacja
- **README.md** - Główna dokumentacja projektu
- **QUICK-START.md** - Szybki start (30 min)
- **CONTRIBUTING.md** - Wytyczne dla kontrybutorów

## 📁 Szczegółowa struktura

### `/docs`
```
docs/
├── architecture.md    # Dokumentacja architektury
├── setup-guide.md     # Szczegółowy przewodnik setupu
└── mvp-roadmap.md     # Plan implementacji MVP
```

**Kiedy używać:**
- `architecture.md` - Zrozumienie jak działa cały system
- `setup-guide.md` - Szczegółowe instrukcje instalacji
- `mvp-roadmap.md` - Plan pracy, tracking postępu

### `/src`
```
src/
├── app/              # Next.js App Router (BĘDZIE)
│   ├── (auth)/      # Strony autentykacji
│   ├── dashboard/   # Dashboard aplikacji
│   ├── layout.tsx   # Root layout
│   └── page.tsx     # Strona główna
├── components/       # Komponenty React (BĘDZIE)
│   ├── ui/          # Podstawowe komponenty UI
│   └── features/    # Komponenty funkcjonalne
├── lib/             # Biblioteki i utilities
│   ├── supabase/    # Klienty Supabase
│   │   ├── client.ts
│   │   └── server.ts
│   └── constants.ts # Kategorie wydatków
└── types/           # TypeScript types
    └── database.ts  # Typy bazy danych
```

**Kiedy używać:**
- `src/app/*` - Routing i strony Next.js
- `src/components/ui/*` - Button, Input, Modal, etc.
- `src/components/features/*` - ExpenseForm, ExpenseList, etc.
- `src/lib/supabase/client.ts` - W Client Components
- `src/lib/supabase/server.ts` - W Server Components
- `src/types/database.ts` - Import typów bazy

### `/supabase`
```
supabase/
├── migrations/
│   └── 001_initial_schema.sql  # Schemat bazy
└── seed.sql                     # Dane testowe
```

**Kiedy używać:**
- `001_initial_schema.sql` - Jednorazowo w SQL Editor
- `seed.sql` - Po utworzeniu pierwszego użytkownika

### `/.github`
```
.github/
├── workflows/
│   └── ci.yml                  # CI/CD pipeline
├── ISSUE_TEMPLATE/
│   ├── bug_report.md          # Template bug report
│   └── feature_request.md     # Template feature request
└── pull_request_template.md   # Template PR
```

**Kiedy używać:**
- Automatycznie przy tworzeniu Issues/PRs na GitHubie

## 🔧 Pliki konfiguracyjne - szczegóły

### package.json
Zawiera:
- Zależności projektu (Next.js, React, Supabase, etc.)
- Skrypty npm (`dev`, `build`, `lint`)
- Wersja projektu
- Metadata

### tsconfig.json
Konfiguruje:
- TypeScript compiler options
- Path aliases (`@/*` → `./src/*`)
- Strict mode dla lepszej type safety

### next.config.js
Konfiguruje:
- Next.js options
- Image domains dla Supabase Storage (przyszłość)
- React strict mode

### tailwind.config.js
Konfiguruje:
- Content paths (gdzie szukać klas)
- Niestandardowe kolory (primary palette)
- Theme extensions

## 📋 Skrypty npm

```bash
npm run dev          # Development server (localhost:3000)
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint check
npm run type-check   # TypeScript check
```

## 🗃️ Baza danych - tabele

### families
Jedna rodzina = jedna grupa użytkowników dzieląca wydatki

### users
Rozszerza `auth.users` z Supabase, dodaje `family_id` i `role`

### expenses
Wszystkie wydatki z kategorią, datą, kwotą, etc.

## 🔐 Bezpieczeństwo

### Row Level Security (RLS)
Każda tabela ma polityki które:
- Sprawdzają `auth.uid()` - kto jest zalogowany
- Weryfikują `family_id` - dostęp tylko do swojej rodziny
- Kontrolują INSERT/UPDATE/DELETE - kto może co zmieniać

### Zmienne środowiskowe
Nigdy nie commituj `.env.local` do Git!
Zawsze używaj `.env.example` jako template.

## 📝 Workflow rozwoju

### 1. Feature branch
```bash
git checkout -b feature/nazwa-funkcjonalnosci
```

### 2. Koduj
Edytuj pliki w VS Code

### 3. Test lokalnie
```bash
npm run dev
npm run lint
npm run type-check
```

### 4. Commit
```bash
git add .
git commit -m "feat: opis zmian"
```

### 5. Push
```bash
git push origin feature/nazwa-funkcjonalnosci
```

### 6. Pull Request
Utwórz PR na GitHubie

## 🎯 Następne kroki

1. **Setup** - Uruchom `./setup.sh` lub postępuj według `QUICK-START.md`
2. **Auth** - Implementuj logowanie/rejestrację (Faza 2 MVP)
3. **CRUD** - Dodawanie/wyświetlanie wydatków (Faza 3 MVP)
4. **Dashboard** - Statystyki i wykresy (Faza 4 MVP)
5. **Polish** - UI/UX i deploy (Faza 5 MVP)

## 📚 Zasoby

- Next.js Docs: https://nextjs.org/docs
- Supabase Docs: https://supabase.com/docs
- TypeScript Handbook: https://www.typescriptlang.org/docs
- Tailwind Docs: https://tailwindcss.com/docs

## ❓ FAQ

**Q: Gdzie dodać nowy komponent?**
A: `src/components/ui/` dla podstawowych, `src/components/features/` dla funkcjonalnych

**Q: Gdzie dodać nową stronę?**
A: `src/app/nazwa-strony/page.tsx`

**Q: Jak dodać nową tabelę do bazy?**
A: Utwórz nową migrację SQL w `supabase/migrations/`

**Q: Gdzie trzymać stałe/constants?**
A: `src/lib/constants.ts` lub `src/lib/config.ts`

**Q: Jak używać Supabase w komponencie?**
A: Client Component → `createClient()` z `lib/supabase/client.ts`
   Server Component → `createClient()` z `lib/supabase/server.ts`

## 🐛 Troubleshooting

Problem → Zobacz plik → Szukaj w
- Setup issues → `docs/setup-guide.md` → "Problemy?"
- Architektura → `docs/architecture.md`
- Roadmap → `docs/mvp-roadmap.md`
- Contributing → `CONTRIBUTING.md`
