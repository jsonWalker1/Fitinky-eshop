-- ============================================
-- ADD PRODUCT CATEGORIES (nejprodávanější, skladem, zlevněné)
-- ============================================
-- Přidání nových kategorií pro sortiment produktů
-- ============================================

-- Vložení kategorií, pokud ještě neexistují
INSERT INTO categories (id, name, slug, description, created_at)
VALUES 
    ('cat-bestsellers', 'Nejprodávanější', 'nejprodavanejsi', 'Nejprodávanější produkty', CURRENT_TIMESTAMP),
    ('cat-in-stock', 'Skladem', 'skladem', 'Produkty skladem', CURRENT_TIMESTAMP),
    ('cat-discounted', 'Zlevněné', 'zlevnene', 'Zlevněné produkty', CURRENT_TIMESTAMP)
ON CONFLICT (id) DO NOTHING;

-- Vytvoření indexu pro rychlejší vyhledávání
CREATE INDEX IF NOT EXISTS idx_products_category_slug ON products(category_slug);

