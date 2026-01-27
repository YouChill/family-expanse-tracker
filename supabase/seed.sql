-- seed.sql
-- Dane testowe dla developmentu (UWAGA: używać tylko w środowisku deweloperskim!)

-- Przykładowa rodzina
INSERT INTO families (id, name) VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'Rodzina Testowa');

-- UWAGA: Użytkownicy muszą być najpierw utworzeni przez Supabase Auth
-- Po zarejestrowaniu użytkownika przez Auth, uzupełnij tabelę users:
-- 
-- INSERT INTO users (id, email, name, family_id, role) VALUES
--   ('user-uuid-z-auth-users', 'test@example.com', 'Jan Kowalski', '550e8400-e29b-41d4-a716-446655440000', 'admin');

-- Przykładowe wydatki (dodaj po utworzeniu użytkownika)
-- 
-- INSERT INTO expenses (amount, description, category, expense_date, user_id, family_id) VALUES
--   (45.99, 'Zakupy spożywcze Biedronka', 'food', '2024-01-15', 'user-uuid', '550e8400-e29b-41d4-a716-446655440000'),
--   (120.00, 'Rachunek za prąd', 'home', '2024-01-10', 'user-uuid', '550e8400-e29b-41d4-a716-446655440000'),
--   (35.50, 'Paliwo do samochodu', 'transport', '2024-01-14', 'user-uuid', '550e8400-e29b-41d4-a716-446655440000'),
--   (89.99, 'Wizyta u lekarza', 'health', '2024-01-08', 'user-uuid', '550e8400-e29b-41d4-a716-446655440000'),
--   (199.00, 'Nowe buty', 'clothing', '2024-01-12', 'user-uuid', '550e8400-e29b-41d4-a716-446655440000');
