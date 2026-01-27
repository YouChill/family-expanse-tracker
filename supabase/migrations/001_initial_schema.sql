-- 001_initial_schema.sql
-- Tworzenie tabel dla Family Expense Tracker

-- Włącz rozszerzenie UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela: families (Rodziny)
CREATE TABLE IF NOT EXISTS families (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela: users (Użytkownicy) - rozszerza auth.users z Supabase
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  family_id UUID REFERENCES families(id) ON DELETE SET NULL,
  role VARCHAR(20) DEFAULT 'member' CHECK (role IN ('admin', 'member')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela: expenses (Wydatki)
CREATE TABLE IF NOT EXISTS expenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  amount DECIMAL(10,2) NOT NULL CHECK (amount >= 0),
  description TEXT,
  category VARCHAR(50) NOT NULL CHECK (category IN (
    'food', 'home', 'transport', 'health', 'clothing', 
    'entertainment', 'education', 'shopping', 'travel', 'other'
  )),
  expense_date DATE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  family_id UUID REFERENCES families(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indeksy dla wydajności
CREATE INDEX idx_expenses_family_id ON expenses(family_id);
CREATE INDEX idx_expenses_user_id ON expenses(user_id);
CREATE INDEX idx_expenses_date ON expenses(expense_date);
CREATE INDEX idx_expenses_category ON expenses(category);
CREATE INDEX idx_users_family_id ON users(family_id);

-- Funkcja automatycznej aktualizacji updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggery dla automatycznej aktualizacji updated_at
CREATE TRIGGER update_families_updated_at
  BEFORE UPDATE ON families
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_expenses_updated_at
  BEFORE UPDATE ON expenses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) - Każda rodzina widzi tylko swoje dane

-- Włącz RLS
ALTER TABLE families ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

-- Polityki dla families
CREATE POLICY "Users can view their own family"
  ON families FOR SELECT
  USING (id IN (
    SELECT family_id FROM users WHERE id = auth.uid()
  ));

CREATE POLICY "Users can update their own family"
  ON families FOR UPDATE
  USING (id IN (
    SELECT family_id FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

-- Polityki dla users
CREATE POLICY "Users can view members of their family"
  ON users FOR SELECT
  USING (family_id IN (
    SELECT family_id FROM users WHERE id = auth.uid()
  ));

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  USING (id = auth.uid());

CREATE POLICY "Users can insert their own profile"
  ON users FOR INSERT
  WITH CHECK (id = auth.uid());

-- Polityki dla expenses
CREATE POLICY "Users can view expenses from their family"
  ON expenses FOR SELECT
  USING (family_id IN (
    SELECT family_id FROM users WHERE id = auth.uid()
  ));

CREATE POLICY "Users can insert expenses to their family"
  ON expenses FOR INSERT
  WITH CHECK (
    family_id IN (
      SELECT family_id FROM users WHERE id = auth.uid()
    )
    AND user_id = auth.uid()
  );

CREATE POLICY "Users can update their own expenses"
  ON expenses FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own expenses"
  ON expenses FOR DELETE
  USING (user_id = auth.uid());

-- Komentarze do tabel
COMMENT ON TABLE families IS 'Rodziny użytkowników';
COMMENT ON TABLE users IS 'Użytkownicy aplikacji - rozszerza auth.users';
COMMENT ON TABLE expenses IS 'Wydatki rodzinne';

COMMENT ON COLUMN expenses.category IS 'Kategorie: food, home, transport, health, clothing, entertainment, education, shopping, travel, other';
COMMENT ON COLUMN users.role IS 'Rola użytkownika w rodzinie: admin lub member';
