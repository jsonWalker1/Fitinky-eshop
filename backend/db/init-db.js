/**
 * ============================================
 * DATABASE INITIALIZATION SCRIPT
 * ============================================
 * Vytvoří tabulky z schema.sql
 * 
 * Použití:
 *   DATABASE_URL="postgresql://..." node backend/db/init-db.js
 * ============================================
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './connection.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const schemaPath = path.join(__dirname, 'schema.sql');

async function initDatabase() {
    const client = await pool.connect();
    
    try {
        console.log('🔄 Vytvářím databázové tabulky...\n');
        
        // Načti schema.sql
        const schemaSQL = fs.readFileSync(schemaPath, 'utf8');
        
        // Spusť SQL příkazy
        await client.query(schemaSQL);
        
        console.log('✅ Databázové tabulky úspěšně vytvořeny!\n');
        
        // Ověření - zobraz seznam tabulek
        const result = await client.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
            ORDER BY table_name;
        `);
        
        console.log('📊 Vytvořené tabulky:');
        result.rows.forEach(row => {
            console.log(`   - ${row.table_name}`);
        });
        console.log('');
        
    } catch (error) {
        console.error('❌ Chyba při vytváření tabulek:', error);
        throw error;
    } finally {
        client.release();
        await pool.end();
    }
}

// Spusť inicializaci
initDatabase()
    .then(() => {
        console.log('✅ Inicializace dokončena!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('❌ Inicializace selhala:', error);
        process.exit(1);
    });

