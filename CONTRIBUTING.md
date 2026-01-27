# Contributing to Family Expense Tracker

Dziękujemy za zainteresowanie projektem! 🎉

## Jak zacząć?

1. **Fork** repozytorium
2. **Clone** swojego forka lokalnie
3. Utwórz nowy **branch** dla swojej funkcjonalności
4. Wprowadź zmiany
5. **Commit** i **push**
6. Otwórz **Pull Request**

## Git Workflow

### Nazewnictwo branchy

- `feature/nazwa-funkcjonalności` - Nowe funkcjonalności
- `fix/nazwa-bugfixa` - Poprawki błędów
- `docs/nazwa-dokumentacji` - Zmiany w dokumentacji
- `refactor/nazwa-refaktoryzacji` - Refaktoryzacja kodu

### Przykład

```bash
# Utwórz nowy branch
git checkout -b feature/add-budget-alerts

# Wprowadź zmiany i commituj
git add .
git commit -m "Add budget alert notifications"

# Wypchnij na swojego forka
git push origin feature/add-budget-alerts
```

## Commit Messages

Używamy konwencji Conventional Commits:

```
type(scope): subject

body (opcjonalne)

footer (opcjonalne)
```

### Typy commitów

- `feat:` - Nowa funkcjonalność
- `fix:` - Poprawka błędu
- `docs:` - Zmiany w dokumentacji
- `style:` - Formatowanie, brakujące średniki, itp.
- `refactor:` - Refaktoryzacja kodu
- `test:` - Dodanie testów
- `chore:` - Maintenance tasks

### Przykłady

```bash
feat(expenses): add expense filtering by date range
fix(auth): resolve login redirect issue
docs(readme): update setup instructions
refactor(components): simplify ExpenseForm component
```

## Code Style

- Używamy **TypeScript** - wszystkie pliki powinny być `.ts` lub `.tsx`
- Używamy **ESLint** - uruchom `npm run lint` przed commitem
- Używamy **Prettier** - kod jest automatycznie formatowany
- Komponenty React używają **function components** z hooks

### Przykład komponentu

```tsx
// components/ui/Button.tsx
import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

export function Button({ 
  variant = 'primary', 
  children, 
  className = '',
  ...props 
}: ButtonProps) {
  return (
    <button 
      className={`btn btn-${variant} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
```

## Testing

Przed stworzeniem Pull Requesta upewnij się że:

- [ ] Kod przechodzi `npm run lint`
- [ ] Kod przechodzi `npm run type-check`
- [ ] Aplikacja buduje się bez błędów `npm run build`
- [ ] Funkcjonalność działa lokalnie `npm run dev`

## Pull Request Process

1. Upewnij się że Twój branch jest zaktualizowany z `main`:
```bash
git checkout main
git pull upstream main
git checkout twoj-branch
git rebase main
```

2. Wypełnij template Pull Requesta:
   - Opisz co zmienia Twój PR
   - Dodaj screenshoty (jeśli dotyczy UI)
   - Linkuj powiązane issues

3. Poczekaj na code review

4. Wprowadź sugerowane zmiany (jeśli są)

5. PR zostanie zmergowany przez maintainera

## Potrzebujesz pomocy?

- Otwórz issue z pytaniem
- Napisz w Discussions
- Sprawdź dokumentację w folderze `docs/`

## Kodeks postępowania

- Bądź uprzejmy i szanuj innych
- Konstruktywna krytyka jest mile widziana
- Pomóż innym jeśli możesz
- Baw się dobrze! 🚀
