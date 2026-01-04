/**
 * Migrace: Přidání produktů Nipl - typ 308 - 1.4401
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
        console.log('Spouštím migraci: add-nipl-products...');
        
        const sqlPath = path.join(__dirname, 'add-nipl-products.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');
        
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

