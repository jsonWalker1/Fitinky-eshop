-- Vytvoření pomocné tabulky pro many-to-many vztah mezi produkty a kategoriemi sortimentu
-- Umožňuje produktu být v několika kategoriích sortimentu současně (nejprodávanější, skladem, zlevněné)

CREATE TABLE IF NOT EXISTS product_sortiment_categories (
    id SERIAL PRIMARY KEY,
    product_id VARCHAR(255) NOT NULL,
    sortiment_category_slug VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE(product_id, sortiment_category_slug)
);

-- Vytvoření indexu pro rychlejší vyhledávání
CREATE INDEX IF NOT EXISTS idx_product_sortiment_product_id ON product_sortiment_categories(product_id);
CREATE INDEX IF NOT EXISTS idx_product_sortiment_category_slug ON product_sortiment_categories(sortiment_category_slug);

-- Migrace existujících dat z products.category_slug do nové tabulky
INSERT INTO product_sortiment_categories (product_id, sortiment_category_slug)
SELECT id, category_slug
FROM products
WHERE category_slug IS NOT NULL
  AND category_slug IN ('nejprodavanejsi', 'skladem', 'zlevnene')
ON CONFLICT (product_id, sortiment_category_slug) DO NOTHING;

-- Poznámka: Sloupec products.category_slug zůstane pro zpětnou kompatibilitu,
-- ale nové produkty by měly používat pouze product_sortiment_categories tabulku

