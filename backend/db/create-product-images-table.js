/**
 * Vytvoří tabulku product_images pokud neexistuje
 */

import pool from './connection.js';

async function createProductImagesTable() {
    try {
        console.log('Vytvářím tabulku product_images...');
        
        await pool.query(`
            CREATE TABLE IF NOT EXISTS product_images (
              id SERIAL PRIMARY KEY,
              product_id VARCHAR(50) NOT NULL REFERENCES products(id) ON DELETE CASCADE,
              image_url VARCHAR(500) NOT NULL,
              display_order INTEGER DEFAULT 0,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        await pool.query(`
            CREATE INDEX IF NOT EXISTS idx_product_images_product ON product_images(product_id)
        `);
        
        await pool.query(`
            CREATE INDEX IF NOT EXISTS idx_product_images_order ON product_images(product_id, display_order)
        `);
        
        console.log('✅ Tabulka product_images byla vytvořena');
        process.exit(0);
    } catch (error) {
        console.error('Chyba při vytváření tabulky:', error);
        process.exit(1);
    }
}

createProductImagesTable();

