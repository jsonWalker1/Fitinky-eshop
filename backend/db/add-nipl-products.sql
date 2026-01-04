-- Přidání produktů Nipl - typ 308 - 1.4401 do databáze
-- Velikost závitu je uložena jako atribut produktu

-- Nejprve zjistíme ID kategorie (předpokládá se, že kategorie už existuje)
-- Pokud neexistuje, vytvoříme ji
DO $$
DECLARE
    category_id_var VARCHAR(50);
    product_id_var VARCHAR(50);
    size_value VARCHAR(50);
    price_value DECIMAL(10,2);
    status_value VARCHAR(50);
    timestamp_val TIMESTAMP := CURRENT_TIMESTAMP;
    product_count INTEGER := 0;
BEGIN
    -- Najít nebo vytvořit kategorii "Závitové fitinky - 1.4401"
    SELECT id INTO category_id_var FROM categories WHERE slug = 'z-vitov-fitinky-1-4401' LIMIT 1;
    
    IF category_id_var IS NULL THEN
        -- Pokud kategorie neexistuje, vytvořit ji
        category_id_var := 'zavitove-fitinky-1-4401';
        INSERT INTO categories (id, name, slug, description, created_at)
        VALUES (category_id_var, 'Závitové fitinky - 1.4401', 'z-vitov-fitinky-1-4401', 
                'Závitové fitinky vyrobené z nerezové oceli 1.4401', timestamp_val)
        ON CONFLICT (id) DO NOTHING;
    END IF;

    -- Pole produktů: (velikost, cena, status)
    -- status: 'in_stock' = Skladem, 'on_order' = Do 10 dnů
    CREATE TEMP TABLE IF NOT EXISTS temp_products (
        size VARCHAR(50),
        price DECIMAL(10,2),
        status VARCHAR(50)
    );

    INSERT INTO temp_products VALUES
        ('1/8"', 23.00, 'in_stock'),
        ('1/4"', 23.00, 'in_stock'),
        ('3/8"', 23.00, 'in_stock'),
        ('1/2"', 30.00, 'in_stock'),
        ('3/4"', 42.00, 'in_stock'),
        ('1"', 48.00, 'in_stock'),
        ('5/4"', 72.00, 'in_stock'),
        ('6/4"', 89.00, 'in_stock'),
        ('2"', 129.00, 'in_stock'),
        ('2 1/2"', 183.00, 'in_stock'),
        ('3"', 299.00, 'in_stock'),
        ('4"', 390.00, 'on_order'),  -- Do 10 dnů
        ('5"', 919.00, 'in_stock'),
        ('6"', 1642.00, 'in_stock');

    -- Vložit produkty
    FOR size_value, price_value, status_value IN 
        SELECT size, price, status FROM temp_products
    LOOP
        -- Generovat ID produktu
        product_id_var := 'nipl-308-1-4401-' || REPLACE(REPLACE(size_value, '"', ''), ' ', '-');
        product_id_var := REPLACE(REPLACE(product_id_var, '/', '-'), '--', '-');
        
        -- Vložit produkt
        INSERT INTO products (id, name, category_id, price, description, availability_status, created_at, updated_at)
        VALUES (
            product_id_var,
            'Nipl - typ 308 - 1.4401: ' || size_value,
            category_id_var,
            price_value,
            'Nipl typ 308 vyrobený z nerezové oceli 1.4401, velikost závitu: ' || size_value,
            status_value,
            timestamp_val,
            timestamp_val
        )
        ON CONFLICT (id) DO UPDATE SET
            name = EXCLUDED.name,
            price = EXCLUDED.price,
            description = EXCLUDED.description,
            availability_status = EXCLUDED.availability_status,
            updated_at = timestamp_val;

        -- Vložit atribut "velikost závitu" nebo "diameter"
        INSERT INTO product_attributes (product_id, attribute_name, attribute_value, attribute_type, created_at, updated_at)
        VALUES (product_id_var, 'diameter', size_value, 'text', timestamp_val, timestamp_val)
        ON CONFLICT (product_id, attribute_name) DO UPDATE SET
            attribute_value = EXCLUDED.attribute_value,
            updated_at = timestamp_val;

        product_count := product_count + 1;
    END LOOP;

    RAISE NOTICE 'Přidáno % produktů do kategorie %', product_count, category_id_var;
    
    DROP TABLE IF EXISTS temp_products;
END $$;

