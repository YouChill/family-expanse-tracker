# MVP Development Roadmap

Plan implementacji MVP dla Family Expense Tracker

## Faza 1: Fundament (Tydzień 1) ✅

### Setup projektu
- [x] Inicjalizacja Next.js z TypeScript
- [x] Konfiguracja Tailwind CSS
- [x] Setup Supabase
- [x] Struktura folderów
- [x] GitHub repository
- [x] CI/CD pipeline

### Baza danych
- [x] Schema SQL (families, users, expenses)
- [x] Row Level Security policies
- [x] Seed data dla testów
- [x] TypeScript types dla bazy

## Faza 2: Autentykacja (Tydzień 1-2) 🚧

### Auth Pages
- [ ] Strona rejestracji (`/register`)
  - [ ] Formularz rejestracji
  - [ ] Walidacja email/hasła
  - [ ] Integracja z Supabase Auth
  - [ ] Automatyczne tworzenie rodziny
  
- [ ] Strona logowania (`/login`)
  - [ ] Formularz logowania
  - [ ] "Zapamiętaj mnie"
  - [ ] Przekierowanie po zalogowaniu
  
- [ ] Reset hasła
  - [ ] Formularz "Forgot password"
  - [ ] Email z linkiem reset
  - [ ] Strona ustawiania nowego hasła

### Auth Components
- [ ] AuthGuard - ochrona chronionych stron
- [ ] useAuth hook - dostęp do user w komponentach
- [ ] Layout z nawigacją dla zalogowanych

## Faza 3: Dashboard i wydatki (Tydzień 2-3) 📋

### Dashboard Layout
- [ ] Navbar z nawigacją
  - [ ] Logo
  - [ ] Menu (Dashboard, Wydatki, Statystyki)
  - [ ] User dropdown (Ustawienia, Wyloguj)
  
- [ ] Sidebar (opcjonalnie)
  - [ ] Szybkie statystyki
  - [ ] Filtry

### Lista wydatków
- [ ] ExpenseList component
  - [ ] Wyświetlanie wszystkich wydatków
  - [ ] Formatowanie dat (date-fns)
  - [ ] Kategorie z ikonami
  - [ ] Kolor według kategorii
  
- [ ] Filtrowanie
  - [ ] Po dacie (dzisiaj, tydzień, miesiąc, custom range)
  - [ ] Po kategorii (multi-select)
  - [ ] Po członku rodziny
  
- [ ] Sortowanie
  - [ ] Po dacie (ASC/DESC)
  - [ ] Po kwocie (ASC/DESC)
  
- [ ] Paginacja
  - [ ] 20 wydatków na stronę
  - [ ] Load more / Infinite scroll

### Dodawanie wydatku
- [ ] ExpenseForm component
  - [ ] Input kwoty (z walidacją)
  - [ ] Select kategorii
  - [ ] Date picker
  - [ ] Textarea opisu
  - [ ] Submit button
  
- [ ] Modal/Dialog dla formularza
  - [ ] Otwieranie przez FAB (Floating Action Button)
  - [ ] Zamykanie (X, ESC, click outside)
  
- [ ] Walidacja formularza
  - [ ] Kwota > 0
  - [ ] Kategoria wymagana
  - [ ] Data nie z przyszłości
  
- [ ] Zapisywanie do Supabase
  - [ ] Loading state
  - [ ] Success message
  - [ ] Error handling

### Edycja i usuwanie
- [ ] Edit expense
  - [ ] Ten sam formularz co dodawanie
  - [ ] Prefilled z istniejącymi danymi
  - [ ] Update w bazie
  
- [ ] Delete expense
  - [ ] Confirmation dialog
  - [ ] Soft delete lub hard delete?
  - [ ] Toast notification

## Faza 4: Dashboard i statystyki (Tydzień 3-4) 📊

### Dashboard Overview
- [ ] Statystyka cards
  - [ ] Suma wydatków w bieżącym miesiącu
  - [ ] Liczba wydatków
  - [ ] Średnia wydatku
  - [ ] Najpopularniejsza kategoria
  
- [ ] Wykres kołowy
  - [ ] Podział wydatków według kategorii
  - [ ] Recharts lub podobna biblioteka
  - [ ] Kolory kategorii
  - [ ] Procentowy podział
  
- [ ] Wykres wydatków w czasie
  - [ ] Ostatnie 7/30 dni
  - [ ] Line chart lub Bar chart
  - [ ] Hover tooltips

### Wydatki według użytkowników
- [ ] Lista członków rodziny
  - [ ] Avatar lub inicjały
  - [ ] Suma wydatków każdej osoby
  - [ ] Procent całości
  
- [ ] Wykres porównawczy
  - [ ] Bar chart użytkowników

## Faza 5: UI/UX Polish (Tydzień 4) ✨

### Komponenty UI
- [ ] Button component (variants, sizes, loading)
- [ ] Input component (error states, icons)
- [ ] Select component
- [ ] DatePicker component
- [ ] Modal/Dialog component
- [ ] Toast notifications
- [ ] Loading skeletons
- [ ] Empty states

### Responsive design
- [ ] Mobile (375px+)
- [ ] Tablet (768px+)
- [ ] Desktop (1024px+)
- [ ] Navigation burger menu na mobile

### Accessibility
- [ ] Keyboard navigation
- [ ] ARIA labels
- [ ] Focus states
- [ ] Color contrast (WCAG AA)

### Animacje
- [ ] Page transitions
- [ ] Modal animations
- [ ] Hover effects
- [ ] Loading spinners

## Faza 6: Testing i Deploy (Tydzień 4) 🚀

### Testing
- [ ] Testy manualne wszystkich flow
  - [ ] Rejestracja → Dodaj wydatek → Zobacz w liście
  - [ ] Logowanie → Filtruj wydatki → Edytuj
  - [ ] Multiple users w jednej rodzinie
  
- [ ] Error scenarios
  - [ ] Brak internetu
  - [ ] Session expired
  - [ ] Validation errors
  
- [ ] Performance
  - [ ] Lighthouse score > 90
  - [ ] Time to Interactive < 3s

### Deploy na Vercel
- [ ] Połącz GitHub z Vercel
- [ ] Configure environment variables
- [ ] Preview deployments dla PR
- [ ] Production deployment
- [ ] Custom domain (opcjonalnie)

### Dokumentacja
- [ ] Update README z live URL
- [ ] User guide (jak używać)
- [ ] Screenshots w README
- [ ] Video demo (opcjonalnie)

## Po MVP - Backlog 📝

### Priorytet wysoki
- [ ] Edycja profilu użytkownika
- [ ] Zaproszenia do rodziny (invite link)
- [ ] Eksport danych (CSV, PDF)
- [ ] Budżety miesięczne
- [ ] Email notifications

### Priorytet średni
- [ ] Dark mode
- [ ] Multi-currency support
- [ ] Recurring expenses
- [ ] Tags dla wydatków
- [ ] Więcej typów wykresów

### Priorytet niski
- [ ] Mobile app (React Native)
- [ ] Integracje (bank sync)
- [ ] AI categorization
- [ ] Współdzielone budżety
- [ ] Goals i savings

## Metryki sukcesu MVP

- [ ] Użytkownik może się zarejestrować w < 2 minuty
- [ ] Dodanie wydatku zajmuje < 30 sekund
- [ ] Dashboard ładuje się w < 2 sekundy
- [ ] 0 critical bugs
- [ ] Lighthouse score > 90
- [ ] Działa na Chrome, Safari, Firefox

## Harmonogram

| Tydzień | Focus | Deliverable |
|---------|-------|-------------|
| 1 | Auth + Setup | Działające logowanie/rejestracja |
| 2 | Wydatki CRUD | Dodawanie i lista wydatków |
| 3 | Statystyki | Dashboard z wykresami |
| 4 | Polish + Deploy | Live app na produkcji |

**Cel:** Działający MVP do końca tygodnia 4 (1 miesiąc od startu)

## Następne kroki

Po zakończeniu tego roadmapu przejdziemy do:
1. Zbieranie feedbacku od rodziny
2. Analiza użycia (Vercel Analytics)
3. Priorytetyzacja Fazy 2 funkcjonalności
4. Planowanie paragonów i OCR
