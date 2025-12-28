-- ============================================
-- PRODUCT ATTRIBUTES TABLE - Standalone SQL
-- ============================================
-- Tento soubor můžeš spustit přímo v PostgreSQL databázi
-- nebo použít: psql $DATABASE_URL -f backend/db/add-product-attributes-table-standalone.sql
-- ============================================

-- Tabulka pro atributy produktů
CREATE TABLE IF NOT EXISTS product_attributes (
  id SERIAL PRIMARY KEY,
  product_id VARCHAR(50) NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  attribute_name VARCHAR(100) NOT NULL,
  attribute_value VARCHAR(255),
  attribute_type VARCHAR(50) NOT NULL DEFAULT 'text',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(product_id, attribute_name)
);

-- Indexy pro rychlé vyhledávání
CREATE INDEX IF NOT EXISTS idx_product_attributes_product ON product_attributes(product_id);
CREATE INDEX IF NOT EXISTS idx_product_attributes_name ON product_attributes(attribute_name);
CREATE INDEX IF NOT EXISTS idx_product_attributes_value ON product_attributes(attribute_value);
CREATE INDEX IF NOT EXISTS idx_product_attributes_name_value ON product_attributes(attribute_name, attribute_value);

-- Trigger pro automatické aktualizování updated_at
CREATE OR REPLACE FUNCTION update_product_attributes_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Pokud trigger už existuje, smaž ho a vytvoř nový
DROP TRIGGER IF EXISTS update_product_attributes_updated_at ON product_attributes;
CREATE TRIGGER update_product_attributes_updated_at
    BEFORE UPDATE ON product_attributes
    FOR EACH ROW
    EXECUTE FUNCTION update_product_attributes_updated_at();

-- Ověření, že tabulka byla vytvořena
SELECT 'Tabulka product_attributes byla úspěšně vytvořena!' as status;

-- Zobrazení struktury tabulky
\d product_attributes

