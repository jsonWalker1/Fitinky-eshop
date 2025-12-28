-- ============================================
-- PRODUCT ATTRIBUTES TABLE
-- ============================================
-- Tabulka pro ukládání produktových atributů
-- Podporuje filtrování produktů podle atributů
-- ============================================

-- Tabulka pro atributy produktů
CREATE TABLE IF NOT EXISTS product_attributes (
  id SERIAL PRIMARY KEY,
  product_id VARCHAR(50) NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  attribute_name VARCHAR(100) NOT NULL,
  attribute_value VARCHAR(255),
  attribute_type VARCHAR(50) NOT NULL DEFAULT 'text', -- 'text', 'number', 'boolean'
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

CREATE TRIGGER update_product_attributes_updated_at
    BEFORE UPDATE ON product_attributes
    FOR EACH ROW
    EXECUTE FUNCTION update_product_attributes_updated_at();

-- Předdefinované atributy pro fitinky (základní):
-- - diameter (průměr DN) - text, např. "DN 20"
-- - connection_type (typ připojení) - text, např. "zavitove", "svarove"
-- - shape (tvar) - text, např. "koleno", "t-kus", "prechod"
-- - material (materiál) - text, např. "nerez-304", "nerez-316", "mosaz"

