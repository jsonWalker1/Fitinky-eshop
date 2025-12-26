-- ============================================
-- PŘIDÁNÍ KOVOVÝCH FITINEK DO DATABÁZE
-- ============================================
-- SQL skript pro přidání produktů kovových fitinek
-- Všechny obrázky jsou z Unsplash (volně dostupné)
-- ============================================

-- POZNÁMKA: Všechny obrázky jsou z Unsplash (https://unsplash.com)
-- Unsplash poskytuje volně použitelné obrázky pod licencí Unsplash License
-- Můžete je používat komerčně i nekomerčně bez povolení nebo atribuce
-- 
-- Produkty jsou přiřazeny k existujícím kategoriím:
-- - "Kohouty a ventily" (id: 3, slug: kohouty-ventily)
-- - "Tvarovky" (id: 2, slug: tvarovky)
-- - "Spojky a redukce" (id: 1, slug: spojky-redukce)

-- Kovové fitinky - různé typy
INSERT INTO products (id, name, description, price, image, category_id, category_slug, availability_status, created_at)
VALUES 
    -- Kulové kohouty
    (
        'fitinky-001',
        'Kovový kulový kohout 1/2" chrom',
        'Vysoce kvalitní kulový kohout z nerezavějící oceli s chromovým povrchem. Vhodný pro potrubní systémy. Průměr: 1/2" (15mm).',
        189.90,
        'https://images.unsplash.com/photo-1611984175289-21d19ca7f10a?w=800&h=800&fit=crop',
        '3',
        'kohouty-ventily',
        'in_stock',
        CURRENT_TIMESTAMP
    ),
    (
        'fitinky-002',
        'Kovový kulový kohout 3/4" chrom',
        'Kulový kohout z mosazi s chromovým povrchem. Odolný proti korozi. Průměr: 3/4" (20mm).',
        245.00,
        'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=800&fit=crop',
        '2',
        'tvarovky',
        'in_stock',
        CURRENT_TIMESTAMP
    ),
    (
        'fitinky-003',
        'Kovový kulový kohout 1" nerez',
        'Nerezový kulový kohout pro průmyslové použití. Průměr: 1" (25mm).',
        329.90,
        'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&h=800&fit=crop',
        '2',
        'tvarovky',
        'in_stock',
        CURRENT_TIMESTAMP
    ),
    
    -- Tvarovky
    (
        'fitinky-004',
        'Kovová tvarovka 90° 1/2" chrom',
        'Rohová tvarovka z mosazi s chromovým povrchem. Úhel: 90°. Průměr: 1/2" (15mm).',
        89.90,
        'https://images.unsplash.com/photo-1581093458791-9d42e63a32c4?w=800&h=800&fit=crop',
        '2',
        'tvarovky',
        'in_stock',
        CURRENT_TIMESTAMP
    ),
    (
        'fitinky-005',
        'Kovová tvarovka T-kus 3/4" chrom',
        'T-kusová tvarovka pro rozvětvení potrubí. Průměr: 3/4" (20mm).',
        125.00,
        'https://images.unsplash.com/photo-1617854818583-09e7f077a156?w=800&h=800&fit=crop',
        '2',
        'tvarovky',
        'in_stock',
        CURRENT_TIMESTAMP
    ),
    (
        'fitinky-006',
        'Kovová redukce 3/4" na 1/2" chrom',
        'Redukční tvarovka pro spojení různých průměrů potrubí. Průměry: 3/4" na 1/2".',
        95.00,
        'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=800&fit=crop',
        '2',
        'tvarovky',
        'in_stock',
        CURRENT_TIMESTAMP
    ),
    
    -- Pojistné ventily
    (
        'fitinky-007',
        'Pojistný ventil 1/2" chrom',
        'Pojistný ventil z mosazi s chromovým povrchem. Tlak: 6 bar. Průměr: 1/2" (15mm).',
        285.00,
        'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&h=800&fit=crop',
        '2',
        'tvarovky',
        'in_stock',
        CURRENT_TIMESTAMP
    ),
    (
        'fitinky-008',
        'Pojistný ventil 3/4" nerez',
        'Nerezový pojistný ventil pro vysoký tlak. Tlak: 10 bar. Průměr: 3/4" (20mm).',
        389.90,
        'https://images.unsplash.com/photo-1617854818583-09e7f077a156?w=800&h=800&fit=crop',
        '2',
        'tvarovky',
        'in_stock',
        CURRENT_TIMESTAMP
    ),
    
    -- Měřící zařízení
    (
        'fitinky-009',
        'Manometr kovový 1/2" 0-6 bar',
        'Kovový manometr pro měření tlaku v potrubí. Rozsah: 0-6 bar. Průměr připojení: 1/2".',
        549.00,
        'https://images.unsplash.com/photo-1581093458791-9d42e63a32c4?w=800&h=800&fit=crop',
        '2',
        'tvarovky',
        'in_stock',
        CURRENT_TIMESTAMP
    ),
    (
        'fitinky-010',
        'Tlakový spínač kovový 1/2"',
        'Elektrický tlakový spínač z nerezové oceli. Průměr připojení: 1/2".',
        425.00,
        'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&h=800&fit=crop',
        '2',
        'tvarovky',
        'in_stock',
        CURRENT_TIMESTAMP
    ),
    
    -- Závitové vsuvky
    (
        'fitinky-011',
        'Kovová vsuvka vnější závit 1/2"',
        'Vsuvka s vnějším závitem z mosazi. Průměr: 1/2" (15mm).',
        45.90,
        'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=800&fit=crop',
        '2',
        'tvarovky',
        'in_stock',
        CURRENT_TIMESTAMP
    ),
    (
        'fitinky-012',
        'Kovová vsuvka vnitřní závit 3/4"',
        'Vsuvka s vnitřním závitem z chromované mosazi. Průměr: 3/4" (20mm).',
        52.00,
        'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=800&fit=crop',
        '2',
        'tvarovky',
        'in_stock',
        CURRENT_TIMESTAMP
    ),
    
    -- Zatavení a koncovky
    (
        'fitinky-013',
        'Kovová zátka 1/2" chrom',
        'Závitová zátka z mosazi s chromovým povrchem. Průměr: 1/2".',
        28.90,
        'https://images.unsplash.com/photo-1611984175289-21d19ca7f10a?w=800&h=800&fit=crop',
        '3',
        'kohouty-ventily',
        'in_stock',
        CURRENT_TIMESTAMP
    ),
    (
        'fitinky-014',
        'Kovová koncovka 3/4" chrom',
        'Koncová tvarovka s vnějším závitem. Průměr: 3/4".',
        65.00,
        'https://images.unsplash.com/photo-1581093458791-9d42e63a32c4?w=800&h=800&fit=crop',
        '2',
        'tvarovky',
        'in_stock',
        CURRENT_TIMESTAMP
    ),
    
    -- Další typy
    (
        'fitinky-015',
        'Kovový zpětný ventil 1/2"',
        'Zpětný ventil z mosazi zabraňuje zpětnému toku. Průměr: 1/2".',
        165.00,
        'https://images.unsplash.com/photo-1617854818583-09e7f077a156?w=800&h=800&fit=crop',
        '2',
        'tvarovky',
        'in_stock',
        CURRENT_TIMESTAMP
    ),
    (
        'fitinky-016',
        'Kovový odbočný kohout 3/4"',
        'Odbočný kohout pro rozvětvení potrubí s možností uzavření. Průměr: 3/4".',
        225.00,
        'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&h=800&fit=crop',
        '2',
        'tvarovky',
        'on_order',
        CURRENT_TIMESTAMP
    ),
    (
        'fitinky-017',
        'Kovové potrubí nerez 1/2" délka 1m',
        'Nerezové potrubí pro instalace. Průměr: 1/2", délka: 1 metr.',
        185.00,
        'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&h=800&fit=crop',
        '2',
        'tvarovky',
        'in_stock',
        CURRENT_TIMESTAMP
    ),
    (
        'fitinky-018',
        'Kovové potrubí chrom 3/4" délka 1m',
        'Chromované potrubí z mosazi. Průměr: 3/4", délka: 1 metr.',
        215.00,
        'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=800&fit=crop',
        '2',
        'tvarovky',
        'in_stock',
        CURRENT_TIMESTAMP
    ),
    (
        'fitinky-019',
        'Kovový rychlospoj 1/2"',
        'Rychlospojící tvarovka pro snadné spojení potrubí. Průměr: 1/2".',
        95.00,
        'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=800&fit=crop',
        '2',
        'tvarovky',
        'in_stock',
        CURRENT_TIMESTAMP
    ),
    (
        'fitinky-020',
        'Kovový filtr jemný 1/2" chrom',
        'Filtrační vložka z mosazi s jemným síťovým filtrem. Průměr: 1/2".',
        145.00,
        'https://images.unsplash.com/photo-1611984175289-21d19ca7f10a?w=800&h=800&fit=crop',
        '3',
        'kohouty-ventily',
        'in_stock',
        CURRENT_TIMESTAMP
    )
ON CONFLICT (id) DO UPDATE
SET 
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    price = EXCLUDED.price,
    image = EXCLUDED.image,
    category_id = EXCLUDED.category_id,
    category_slug = EXCLUDED.category_slug,
    availability_status = EXCLUDED.availability_status,
    updated_at = CURRENT_TIMESTAMP;

-- ============================================
-- POZNÁMKA O LICENCI OBRÁZKŮ
-- ============================================
-- Všechny obrázky jsou z Unsplash (https://unsplash.com)
-- Unsplash poskytuje volně použitelné obrázky pod licencí Unsplash License
-- Můžete je používat komerčně i nekomerčně bez povolení nebo atribuce
-- Více informací: https://unsplash.com/license
-- ============================================

