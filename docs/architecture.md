# Architektura Family Expense Tracker

## Przegląd

Family Expense Tracker to aplikacja webowa zaprojektowana do śledzenia wydatków rodzinnych ze wspólną bazą danych. Aplikacja jest zbudowana z myślą o skalowalności i łatwości rozwoju.

## Stack technologiczny

### Frontend
- **Next.js 14** - Framework React z App Router
- **TypeScript** - Typowanie statyczne
- **Tailwind CSS** - Utility-first CSS framework
- **React** - Biblioteka UI

### Backend
- **Supabase** - Backend-as-a-Service
  - PostgreSQL - Baza danych
  - Auth - Autentykacja użytkowników
  - Row Level Security - Bezpieczeństwo na poziomie wierszy
  - Real-time - Synchronizacja w czasie rzeczywistym

### Hosting
- **Vercel** - Hosting aplikacji Next.js (CI/CD)

## Architektura systemu

```
┌─────────────────┐
│   Użytkownicy   │
│   (Przeglądarka)│
└────────┬────────┘
         │ HTTPS
         ▼
┌─────────────────┐
│   Next.js App   │
│   (Vercel)      │
│                 │
│  - App Router   │
│  - Server Comp. │
│  - Client Comp. │
└────────┬────────┘
         │ Supabase Client
         ▼
┌─────────────────┐
│   Supabase      │
│                 │
│  ┌───────────┐  │
│  │PostgreSQL │  │
│  └───────────┘  │
│  ┌───────────┐  │
│  │   Auth    │  │
│  └───────────┘  │
│  ┌───────────┐  │
│  │    RLS    │  │
│  └───────────┘  │
└─────────────────┘
```

## Model danych

### Tabele

#### families (Rodziny)
- `id` UUID - Klucz główny
- `name` VARCHAR - Nazwa rodziny
- `created_at` TIMESTAMP
- `updated_at` TIMESTAMP

#### users (Użytkownicy)
- `id` UUID - Klucz główny (referencja do auth.users)
- `email` VARCHAR - Email użytkownika
- `name` VARCHAR - Imię użytkownika
- `family_id` UUID - Klucz obcy do families
- `role` VARCHAR - Rola (admin/member)
- `created_at` TIMESTAMP
- `updated_at` TIMESTAMP

#### expenses (Wydatki)
- `id` UUID - Klucz główny
- `amount` DECIMAL - Kwota wydatku
- `description` TEXT - Opis wydatku
- `category` VARCHAR - Kategoria
- `expense_date` DATE - Data wydatku
- `user_id` UUID - Kto dodał
- `family_id` UUID - Do której rodziny należy
- `created_at` TIMESTAMP
- `updated_at` TIMESTAMP

### Relacje

```
families (1) ──── (N) users
families (1) ──── (N) expenses
users (1) ──── (N) expenses
```

## Bezpieczeństwo

### Row Level Security (RLS)

Każda rodzina ma dostęp tylko do swoich danych dzięki politykom RLS:

1. **Families** - Użytkownicy widzą tylko swoją rodzinę
2. **Users** - Użytkownicy widzą tylko członków swojej rodziny
3. **Expenses** - Użytkownicy widzą tylko wydatki swojej rodziny

### Autentykacja

- Supabase Auth z wykorzystaniem JWT
- Sesje zarządzane przez cookies
- Automatyczne odświeżanie tokenów

## Struktura projektu

```
family-expense-tracker/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Strony autentykacji
│   │   ├── dashboard/         # Dashboard aplikacji
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Strona główna
│   ├── components/            # Komponenty React
│   │   ├── ui/               # Komponenty UI (przyciski, formularze)
│   │   └── features/         # Komponenty funkcjonalne
│   ├── lib/                  # Biblioteki i utilities
│   │   ├── supabase/         # Klienty Supabase
│   │   ├── constants.ts      # Stałe (kategorie)
│   │   └── utils.ts          # Helper functions
│   └── types/                # TypeScript types
│       └── database.ts       # Typy bazy danych
├── supabase/
│   ├── migrations/           # Migracje SQL
│   └── seed.sql             # Dane testowe
├── public/                   # Statyczne pliki
└── docs/                    # Dokumentacja
```

## Przepływ danych

### Dodawanie wydatku

```
1. Użytkownik wypełnia formularz
   ↓
2. Walidacja po stronie klienta
   ↓
3. POST request do Supabase
   ↓
4. RLS weryfikuje uprawnienia
   ↓
5. INSERT do tabeli expenses
   ↓
6. Real-time update dla innych użytkowników
   ↓
7. UI aktualizuje się automatycznie
```

## Skalowalność

### Obecna architektura obsłuży:
- Do 1000 rodzin
- Do 100,000 wydatków/miesiąc
- Do 10 użytkowników na rodzinę

### Plan skalowania:
1. **Optymalizacja zapytań** - Indeksy, materialized views
2. **Caching** - Redis dla często używanych danych
3. **CDN** - Dla statycznych zasobów
4. **Database sharding** - Gdy baza przekroczy 100GB

## Przyszłe rozszerzenia

### Faza 2 - Analizy (1-2 miesiące)
- Wykresy trendów
- Budżety miesięczne
- Eksport danych

### Faza 3 - Paragony (2-4 miesiące)
- Supabase Storage dla plików
- Google Cloud Vision API dla OCR
- Edge Functions dla przetwarzania

### Faza 4 - AI/ML (3-6 miesięcy)
- Automatyczne kategoryzowanie
- Predykcja wydatków
- Personalizowane rekomendacje

## Monitoring i observability

### Planowane narzędzia:
- **Vercel Analytics** - Podstawowe metryki
- **Sentry** - Error tracking
- **Supabase Dashboard** - Monitoring bazy danych

## Backup i disaster recovery

- **Automatyczne backupy** - Supabase daily backups
- **Point-in-time recovery** - Do 7 dni wstecz
- **Export danych** - Regularne exporty do CSV

## Koszty (miesięcznie)

### Start (do 5 rodzin):
- Supabase: $0 (free tier)
- Vercel: $0 (hobby tier)
- **Total: $0/miesiąc**

### Wzrost (50 rodzin):
- Supabase: $25 (Pro)
- Vercel: $20 (Pro)
- **Total: $45/miesiąc**

### Skala (500+ rodzin):
- Supabase: $100+ (Team/Enterprise)
- Vercel: $20-100 (Pro/Team)
- **Total: $120+/miesiąc**
