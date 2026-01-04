/**
 * ============================================
 * ADD PRODUCT CATEGORIES
 * ============================================
 * Skript pro vytvoření kategorií sortimentu
 * ============================================
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './connection.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function addProductCategories() {
    try {
        console.log('📝 Přidávání kategorií sortimentu...');
        
        const sqlPath = path.join(__dirname, 'add-product-categories.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');
        
        await pool.query(sql);
        
        console.log('✅ Kategorie sortimentu byly úspěšně přidány!');
        
        // Zkontrolovat, jestli kategorie existují
        const checkResult = await pool.query(`
            SELECT id, name, slug FROM categories 
            WHERE id IN ('cat-bestsellers', 'cat-in-stock', 'cat-discounted')
            ORDER BY id;
        `);
        
        if (checkResult.rows.length > 0) {
            console.log('\n📋 Přidané kategorie:');
            checkResult.rows.forEach(cat => {
                console.log(`   - ${cat.name} (${cat.slug})`);
            });
        } else {
            console.log('⚠️  Kategorie možná nebyly vytvořeny');
        }
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Chyba při přidávání kategorií:', error);
        process.exit(1);
    }
}

addProductCategories();

