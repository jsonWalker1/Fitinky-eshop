/**
 * Migrace: Vytvoření tabulky pro many-to-many vztah produktů a kategorií sortimentu
 * Umožňuje produktu být v několika kategoriích sortimentu současně
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './connection.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigration() {
    const client = await pool.connect();
    
    try {
        console.log('Spouštím migraci: add-product-sortiment-categories-table...');
        
        // Načíst SQL soubor
        const sqlPath = path.join(__dirname, 'add-product-sortiment-categories-table.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');
        
        // Spustit SQL
        await client.query('BEGIN');
        await client.query(sql);
        await client.query('COMMIT');
        
        console.log('✅ Migrace úspěšně dokončena!');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('❌ Chyba při migraci:', error);
        throw error;
    } finally {
        client.release();
    }
}

// Spustit migraci pokud je soubor spuštěn přímo
if (import.meta.url === `file://${process.argv[1]}`) {
    runMigration()
        .then(() => {
            console.log('Migrace dokončena');
            process.exit(0);
        })
        .catch((error) => {
            console.error('Chyba při migraci:', error);
            process.exit(1);
        });
}

export default runMigration;

