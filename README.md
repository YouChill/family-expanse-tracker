# Family Expense Tracker 💰

Aplikacja webowa do zarządzania wydatkami rodzinnymi z wspólną bazą danych.

## 🎯 Funkcjonalności MVP

- ✅ Rejestracja i logowanie użytkowników
- ✅ Tworzenie/dołączanie do rodziny
- ✅ Ręczne dodawanie wydatków (kwota, kategoria, data, opis)
- ✅ Lista wydatków z filtrowaniem
- ✅ Podstawowy dashboard z statystykami
- ✅ Podział wydatków według członków rodziny

## 🚀 Tech Stack

- **Frontend:** Next.js 14 (App Router), React, TypeScript
- **Styling:** Tailwind CSS
- **Backend:** Supabase (PostgreSQL, Auth, Real-time)
- **Deployment:** Vercel

## 📋 Wymagania

- Node.js 18+ ([pobierz tutaj](https://nodejs.org/))
- npm lub yarn
- Konto Supabase (darmowe)
- Git

## 🛠️ Setup projektu

### 1. Sklonuj repozytorium

```bash
git clone https://github.com/TWOJA-NAZWA/family-expense-tracker.git
cd family-expense-tracker
```

### 2. Zainstaluj zależności

```bash
npm install
```

### 3. Skonfiguruj Supabase

1. Utwórz nowy projekt na [supabase.com](https://supabase.com)
2. W panelu Supabase przejdź do **SQL Editor**
3. Wykonaj skrypty z folderu `supabase/migrations/` po kolei
4. Skopiuj klucze API z **Settings > API**

### 4. Konfiguracja zmiennych środowiskowych

Skopiuj plik `.env.example` do `.env.local`:

```bash
cp .env.example .env.local
```

Uzupełnij zmienne w `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=twoj-url-projektu
NEXT_PUBLIC_SUPABASE_ANON_KEY=twoj-anon-key
```

### 5. Uruchom aplikację deweloperską

```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem: [http://localhost:3000](http://localhost:3000)

## 📁 Struktura projektu

```
family-expense-tracker/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── (auth)/         # Strony autentykacji
│   │   ├── dashboard/      # Dashboard aplikacji
│   │   └── layout.tsx      # Root layout
│   ├── components/         # Komponenty React
│   │   ├── ui/            # Komponenty UI (przyciski, formularze)
│   │   └── features/      # Komponenty funkcjonalne
│   ├── lib/               # Biblioteki i utilities
│   │   ├── supabase/      # Klient Supabase
│   │   └── utils/         # Helper functions
│   └── types/             # TypeScript types
├── supabase/
│   ├── migrations/        # Migracje SQL
│   └── seed.sql          # Dane testowe
├── public/               # Statyczne pliki
└── docs/                # Dokumentacja
```

## 🗄️ Model danych

### Families (Rodziny)
- `id` - UUID
- `name` - Nazwa rodziny
- `created_at` - Data utworzenia

### Users (Użytkownicy)
- `id` - UUID
- `email` - Email
- `name` - Imię
- `family_id` - Klucz obcy do Families
- `role` - Rola (admin/member)

### Expenses (Wydatki)
- `id` - UUID
- `amount` - Kwota
- `description` - Opis
- `category` - Kategoria
- `expense_date` - Data wydatku
- `user_id` - Kto dodał
- `family_id` - Rodzina

## 🎨 Kategorie wydatków

- 🍔 Jedzenie i napoje
- 🏠 Dom i rachunki
- 🚗 Transport
- 🏥 Zdrowie
- 👕 Odzież
- 🎮 Rozrywka
- 📚 Edukacja
- 🛒 Zakupy
- ✈️ Podróże
- 💰 Inne

## 📱 Przyszłe funkcjonalności

### Faza 2 - Podstawowe analizy
- Wykresy trendów (miesięczne, roczne)
- Eksport do CSV/Excel
- Budżety miesięczne z powiadomieniami
- Edycja i usuwanie wydatków

### Faza 3 - Paragony i OCR
- Upload zdjęć paragonów
- OCR (automatyczne rozpoznawanie tekstu)
- Podgląd paragonów przy wydatkach

### Faza 4 - Inteligentne funkcje
- Automatyczne kategoryzowanie (ML)
- Przewidywanie wydatków
- Cykliczne wydatki
- Zaawansowane raporty

## 🤝 Contributing

1. Fork projektu
2. Utwórz branch (`git checkout -b feature/AmazingFeature`)
3. Commit zmian (`git commit -m 'Add some AmazingFeature'`)
4. Push do brancha (`git push origin feature/AmazingFeature`)
5. Otwórz Pull Request

## 📝 Licencja

MIT License - szczegóły w pliku `LICENSE`

## 📧 Kontakt

Pytania? Otwórz issue na GitHubie!
