/**
 * ============================================
 * MIGRACE OBRAZKŮ PRODUKTŮ DO GALERIE
 * ============================================
 * Převede existující image pole z products do product_images
 * ============================================
 */

import pool from './connection.js';

async function migrateProductImages() {
    try {
        console.log('Zahajuji migraci obrázků produktů...');
        
        // Načíst všechny produkty s obrázky
        const productsResult = await pool.query(`
            SELECT id, image 
            FROM products 
            WHERE image IS NOT NULL AND image != ''
        `);
        
        console.log(`Nalezeno ${productsResult.rows.length} produktů s obrázky`);
        
        let migrated = 0;
        let skipped = 0;
        
        for (const product of productsResult.rows) {
            // Zkontrolovat, zda už existuje obrázek pro tento produkt
            const existingCheck = await pool.query(
                'SELECT id FROM product_images WHERE product_id = $1 AND image_url = $2',
                [product.id, product.image]
            );
            
            if (existingCheck.rows.length === 0) {
                // Vložit obrázek jako první v galerii
                await pool.query(
                    'INSERT INTO product_images (product_id, image_url, display_order) VALUES ($1, $2, 0)',
                    [product.id, product.image]
                );
                migrated++;
            } else {
                skipped++;
            }
        }
        
        console.log(`Migrace dokončena:`);
        console.log(`  - Migrováno: ${migrated} obrázků`);
        console.log(`  - Přeskočeno: ${skipped} obrázků (již existují)`);
        
        process.exit(0);
    } catch (error) {
        console.error('Chyba při migraci obrázků:', error);
        process.exit(1);
    }
}

migrateProductImages();

