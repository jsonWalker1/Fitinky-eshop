/**
 * Zkontrolovat hodnoty atributů v databázi
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pg from 'pg';

const { Pool } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
    console.error('❌ Chybí DATABASE_URL environment variable');
    process.exit(1);
}

const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: DATABASE_URL.includes('railway') ? { rejectUnauthorized: false } : false
});

async function checkAttributeValues() {
    const client = await pool.connect();
    
    try {
        console.log('🔍 Kontroluji hodnoty atributů v databázi...\n');
        
        // Zkontrolovat kategorie
        const categoriesResult = await client.query(
            'SELECT * FROM attribute_categories ORDER BY name'
        );
        console.log(`📋 Kategorie atributů (${categoriesResult.rows.length}):`);
        categoriesResult.rows.forEach(cat => {
            console.log(`   - ${cat.name} (${cat.display_name})`);
        });
        console.log('');
        
        // Zkontrolovat hodnoty
        const valuesResult = await client.query(`
            SELECT 
                ac.name as category_name,
                ac.display_name as category_display,
                av.value,
                av.display_name,
                av.display_order
            FROM attribute_values av
            JOIN attribute_categories ac ON av.category_id = ac.id
            ORDER BY ac.name, av.display_order
        `);
        
        console.log(`📦 Hodnoty atributů (${valuesResult.rows.length}):`);
        if (valuesResult.rows.length === 0) {
            console.log('   ⚠️  ŽÁDNÉ HODNOTY V DATABÁZI!');
        } else {
            let currentCategory = null;
            valuesResult.rows.forEach(row => {
                if (row.category_name !== currentCategory) {
                    currentCategory = row.category_name;
                    console.log(`\n   ${row.category_display} (${row.category_name}):`);
                }
                console.log(`      - ${row.display_name} (${row.value})`);
            });
        }
        console.log('');
        
        // Zkontrolovat počet hodnot v každé kategorii
        const countResult = await client.query(`
            SELECT 
                ac.name,
                ac.display_name,
                COUNT(av.id) as value_count
            FROM attribute_categories ac
            LEFT JOIN attribute_values av ON ac.id = av.category_id
            GROUP BY ac.id, ac.name, ac.display_name
            ORDER BY ac.name
        `);
        
        console.log('📊 Počet hodnot v kategoriích:');
        countResult.rows.forEach(row => {
            console.log(`   - ${row.display_name}: ${row.value_count} hodnot`);
        });
        
    } catch (error) {
        console.error('❌ Chyba:', error.message);
        if (error.code === '42P01') {
            console.error('   Tabulky neexistují! Spusť nejdřív: npm run db:add-attribute-categories');
        }
        throw error;
    } finally {
        client.release();
        await pool.end();
    }
}

checkAttributeValues()
    .then(() => {
        console.log('');
        console.log('✅ Kontrola dokončena!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('');
        console.error('❌ Chyba:', error);
        process.exit(1);
    });

