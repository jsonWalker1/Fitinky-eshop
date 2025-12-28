-- Zkontrolovat, zda jsou hodnoty atributů v databázi
SELECT 
    ac.name as category_name,
    ac.display_name as category_display,
    av.value,
    av.display_name,
    av.display_order
FROM attribute_values av
JOIN attribute_categories ac ON av.category_id = ac.id
ORDER BY ac.name, av.display_order;

-- Zkontrolovat počet hodnot v každé kategorii
SELECT 
    ac.name,
    ac.display_name,
    COUNT(av.id) as value_count
FROM attribute_categories ac
LEFT JOIN attribute_values av ON ac.id = av.category_id
GROUP BY ac.id, ac.name, ac.display_name;

