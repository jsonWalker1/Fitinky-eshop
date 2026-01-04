-- Přidání parent_id sloupce do categories tabulky pro podporu podkategorií
-- Umožňuje vytvářet hierarchii kategorií (kategorie -> podkategorie)

ALTER TABLE categories 
ADD COLUMN IF NOT EXISTS parent_id VARCHAR(50) REFERENCES categories(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_categories_parent ON categories(parent_id);

-- Komentář: parent_id je NULL pro hlavní kategorie, nebo obsahuje ID nadřazené kategorie

