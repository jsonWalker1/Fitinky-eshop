/**
 * ============================================
 * ADD PRODUCT ATTRIBUTES TABLE
 * ============================================
 * Skript pro vytvoření tabulky product_attributes
 * Spusť: node backend/db/add-product-attributes-table.js
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

async function addProductAttributesTable() {
    const client = await pool.connect();
    
    try {
        console.log('📦 Vytvářím tabulku product_attributes...');
        
        // Načtení SQL z souboru
        const sqlPath = join(__dirname, 'add-product-attributes-table.sql');
        const sql = readFileSync(sqlPath, 'utf-8');
        
        // Spuštění SQL
        await client.query(sql);
        
        console.log('✅ Tabulka product_attributes byla úspěšně vytvořena!');
        console.log('');
        console.log('📋 Vytvořené indexy:');
        console.log('   - idx_product_attributes_product');
        console.log('   - idx_product_attributes_name');
        console.log('   - idx_product_attributes_value');
        console.log('   - idx_product_attributes_name_value');
        console.log('');
        console.log('📝 Základní atributy pro fitinky:');
        console.log('   - diameter (průměr DN)');
        console.log('   - connection_type (typ připojení)');
        console.log('   - shape (tvar)');
        console.log('   - material (materiál)');
        
    } catch (error) {
        console.error('❌ Chyba při vytváření tabulky:', error.message);
        if (error.code === '42P07') {
            console.error('   Tabulka už existuje. Pokud chceš přepsat, smaž ji ručně.');
        }
        throw error;
    } finally {
        client.release();
        await pool.end();
    }
}

addProductAttributesTable()
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

