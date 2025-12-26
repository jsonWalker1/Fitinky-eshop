/**
 * ============================================
 * ADD FITINKY PRODUCTS SCRIPT
 * ============================================
 * Spustí SQL skript pro přidání produktů kovových fitinek
 * 
 * Použití:
 *   node backend/db/add-fitinky.js
 * 
 * Před spuštěním:
 *   1. Nastav DATABASE_URL environment variable
 *   2. Ujisti se, že schema.sql je spuštěno
 * ============================================
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './connection.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function addFitinkyProducts() {
    const client = await pool.connect();
    
    try {
        await client.query('BEGIN');
        
        console.log('🔄 Přidávám produkty kovových fitinek...\n');
        
        // Načti SQL soubor
        const sqlFile = path.join(__dirname, 'add-fitinky-products.sql');
        const sql = fs.readFileSync(sqlFile, 'utf8');
        
        // Spusť SQL skript
        await client.query(sql);
        
        await client.query('COMMIT');
        
        console.log('✅ Produkty kovových fitinek úspěšně přidány!\n');
        
        // Zobraz počet přidaných produktů
        const result = await client.query(
            "SELECT COUNT(*) as count FROM products WHERE id LIKE 'fitinky-%'"
        );
        const count = result.rows[0].count;
        console.log(`📦 Celkem produktů fitinek v databázi: ${count}`);
        
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('❌ Chyba při přidávání produktů:', error);
        process.exit(1);
    } finally {
        client.release();
        await pool.end();
    }
}

// Spusť skript
addFitinkyProducts().catch((error) => {
    console.error('❌ Neočekávaná chyba:', error);
    process.exit(1);
});

