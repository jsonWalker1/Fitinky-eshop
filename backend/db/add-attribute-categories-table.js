/**
 * ============================================
 * ADD ATTRIBUTE CATEGORIES TABLE
 * ============================================
 * Skript pro vytvoření tabulek pro správu hodnot atributů
 * Spusť: node backend/db/add-attribute-categories-table.js
 * ============================================
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pg from 'pg';

const { Pool } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Načtení DATABASE_URL z environment variables
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
    console.error('❌ Chybí DATABASE_URL environment variable');
    console.error('Nastav ji například:');
    console.error('export DATABASE_URL="postgresql://user:password@host:port/database"');
    process.exit(1);
}

const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: DATABASE_URL.includes('railway') ? { rejectUnauthorized: false } : false
});

async function addAttributeCategoriesTable() {
    const client = await pool.connect();
    
    try {
        console.log('📦 Vytvářím tabulky attribute_categories a attribute_values...');
        
        // Načtení SQL z souboru
        const sqlPath = join(__dirname, 'add-attribute-categories-table.sql');
        const sql = readFileSync(sqlPath, 'utf-8');
        
        // Spuštění SQL
        await client.query(sql);
        
        console.log('✅ Tabulky byly úspěšně vytvořeny!');
        console.log('');
        console.log('📋 Vytvořené tabulky:');
        console.log('   - attribute_categories (kategorie atributů)');
        console.log('   - attribute_values (hodnoty atributů)');
        console.log('');
        console.log('📝 Základní kategorie:');
        console.log('   - material (Materiál)');
        console.log('   - connection_type (Typ připojení)');
        console.log('   - shape (Tvar)');
        console.log('');
        console.log('✅ Základní hodnoty byly vloženy!');
        
    } catch (error) {
        console.error('❌ Chyba při vytváření tabulek:', error.message);
        if (error.code === '42P07') {
            console.error('   Tabulky už existují. Pokud chceš přepsat, smaž je ručně.');
        }
        throw error;
    } finally {
        client.release();
        await pool.end();
    }
}

addAttributeCategoriesTable()
    .then(() => {
        console.log('');
        console.log('✅ Hotovo!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('');
        console.error('❌ Chyba:', error);
        process.exit(1);
    });

