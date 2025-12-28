-- ============================================
-- ATTRIBUTE CATEGORIES TABLE
-- ============================================
-- Tabulka pro správu kategorií atributů (např. materiály, typy připojení, tvary)
-- Umožňuje dynamicky přidávat/editovat hodnoty atributů v admin panelu
-- ============================================

-- Tabulka pro kategorie atributů (např. "material", "connection_type", "shape")
CREATE TABLE IF NOT EXISTS attribute_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE, -- např. "material", "connection_type", "shape"
  display_name VARCHAR(255) NOT NULL, -- např. "Materiál", "Typ připojení", "Tvar"
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabulka pro hodnoty atributů (např. "nerez-304", "zavitove", "koleno")
CREATE TABLE IF NOT EXISTS attribute_values (
  id SERIAL PRIMARY KEY,
  category_id INTEGER NOT NULL REFERENCES attribute_categories(id) ON DELETE CASCADE,
  value VARCHAR(255) NOT NULL, -- hodnota (např. "nerez-304", "zavitove")
  display_name VARCHAR(255) NOT NULL, -- zobrazený název (např. "Nerez 304", "Závitové")
  description TEXT,
  display_order INTEGER DEFAULT 0, -- pořadí zobrazení
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(category_id, value)
);

-- Indexy
CREATE INDEX IF NOT EXISTS idx_attribute_values_category ON attribute_values(category_id);
CREATE INDEX IF NOT EXISTS idx_attribute_values_order ON attribute_values(category_id, display_order);

-- Trigger pro automatické aktualizování updated_at
CREATE OR REPLACE FUNCTION update_attribute_categories_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_attribute_categories_updated_at
    BEFORE UPDATE ON attribute_categories
    FOR EACH ROW
    EXECUTE FUNCTION update_attribute_categories_updated_at();

CREATE TRIGGER update_attribute_values_updated_at
    BEFORE UPDATE ON attribute_values
    FOR EACH ROW
    EXECUTE FUNCTION update_attribute_categories_updated_at();

-- Vložit základní kategorie atributů
INSERT INTO attribute_categories (name, display_name, description) VALUES
('material', 'Materiál', 'Dostupné materiály pro fitinky'),
('connection_type', 'Typ připojení', 'Typy připojení fitinek'),
('shape', 'Tvar', 'Tvary fitinek')
ON CONFLICT (name) DO NOTHING;

-- Vložit základní hodnoty pro materiály
INSERT INTO attribute_values (category_id, value, display_name, display_order)
SELECT 
    (SELECT id FROM attribute_categories WHERE name = 'material'),
    'nerez-304',
    'Nerez 304',
    1
ON CONFLICT (category_id, value) DO NOTHING;

INSERT INTO attribute_values (category_id, value, display_name, display_order)
SELECT 
    (SELECT id FROM attribute_categories WHERE name = 'material'),
    'nerez-316',
    'Nerez 316',
    2
ON CONFLICT (category_id, value) DO NOTHING;

INSERT INTO attribute_values (category_id, value, display_name, display_order)
SELECT 
    (SELECT id FROM attribute_categories WHERE name = 'material'),
    'mosaz',
    'Mosaz',
    3
ON CONFLICT (category_id, value) DO NOTHING;

INSERT INTO attribute_values (category_id, value, display_name, display_order)
SELECT 
    (SELECT id FROM attribute_categories WHERE name = 'material'),
    'ocel',
    'Uhlíková ocel',
    4
ON CONFLICT (category_id, value) DO NOTHING;

INSERT INTO attribute_values (category_id, value, display_name, display_order)
SELECT 
    (SELECT id FROM attribute_categories WHERE name = 'material'),
    'plast',
    'Plast',
    5
ON CONFLICT (category_id, value) DO NOTHING;

-- Vložit základní hodnoty pro typy připojení
INSERT INTO attribute_values (category_id, value, display_name, display_order)
SELECT 
    (SELECT id FROM attribute_categories WHERE name = 'connection_type'),
    'zavitove',
    'Závitové',
    1
ON CONFLICT (category_id, value) DO NOTHING;

INSERT INTO attribute_values (category_id, value, display_name, display_order)
SELECT 
    (SELECT id FROM attribute_categories WHERE name = 'connection_type'),
    'svarove',
    'Svařované',
    2
ON CONFLICT (category_id, value) DO NOTHING;

INSERT INTO attribute_values (category_id, value, display_name, display_order)
SELECT 
    (SELECT id FROM attribute_categories WHERE name = 'connection_type'),
    'press',
    'Press',
    3
ON CONFLICT (category_id, value) DO NOTHING;

INSERT INTO attribute_values (category_id, value, display_name, display_order)
SELECT 
    (SELECT id FROM attribute_categories WHERE name = 'connection_type'),
    'push-fit',
    'Push-fit',
    4
ON CONFLICT (category_id, value) DO NOTHING;

-- Vložit základní hodnoty pro tvary
INSERT INTO attribute_values (category_id, value, display_name, display_order)
SELECT 
    (SELECT id FROM attribute_categories WHERE name = 'shape'),
    'koleno',
    'Koleno',
    1
ON CONFLICT (category_id, value) DO NOTHING;

INSERT INTO attribute_values (category_id, value, display_name, display_order)
SELECT 
    (SELECT id FROM attribute_categories WHERE name = 'shape'),
    't-kus',
    'T-kus',
    2
ON CONFLICT (category_id, value) DO NOTHING;

INSERT INTO attribute_values (category_id, value, display_name, display_order)
SELECT 
    (SELECT id FROM attribute_categories WHERE name = 'shape'),
    'kriz',
    'Kříž',
    3
ON CONFLICT (category_id, value) DO NOTHING;

INSERT INTO attribute_values (category_id, value, display_name, display_order)
SELECT 
    (SELECT id FROM attribute_categories WHERE name = 'shape'),
    'prechod',
    'Přechod',
    4
ON CONFLICT (category_id, value) DO NOTHING;

INSERT INTO attribute_values (category_id, value, display_name, display_order)
SELECT 
    (SELECT id FROM attribute_categories WHERE name = 'shape'),
    'redukce',
    'Redukce',
    5
ON CONFLICT (category_id, value) DO NOTHING;

INSERT INTO attribute_values (category_id, value, display_name, display_order)
SELECT 
    (SELECT id FROM attribute_categories WHERE name = 'shape'),
    'zatka',
    'Zátka',
    6
ON CONFLICT (category_id, value) DO NOTHING;

INSERT INTO attribute_values (category_id, value, display_name, display_order)
SELECT 
    (SELECT id FROM attribute_categories WHERE name = 'shape'),
    'viko',
    'Víko',
    7
ON CONFLICT (category_id, value) DO NOTHING;

INSERT INTO attribute_values (category_id, value, display_name, display_order)
SELECT 
    (SELECT id FROM attribute_categories WHERE name = 'shape'),
    'kombinovane',
    'Kombinované',
    8
ON CONFLICT (category_id, value) DO NOTHING;

