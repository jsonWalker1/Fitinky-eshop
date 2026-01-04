/**
 * ============================================
 * MIGRATION CONTROLLER
 * ============================================
 * Controller pro spuštění databázových migrací
 * ============================================
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from '../db/connection.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * POST /api/migrations/add-product-categories
 * Spustí migraci pro přidání kategorií sortimentu
 */
export const addProductCategories = async (req, res) => {
    try {
        console.log('📝 Spouštění migrace pro přidání kategorií sortimentu...');
        
        const sqlPath = path.join(__dirname, '../db/add-product-categories.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');
        
        await pool.query(sql);
        
        // Zkontrolovat, jestli kategorie existují
        const checkResult = await pool.query(`
            SELECT id, name, slug FROM categories 
            WHERE id IN ('cat-bestsellers', 'cat-in-stock', 'cat-discounted')
            ORDER BY id;
        `);
        
        console.log('✅ Migrace úspěšně dokončena!');
        
        res.json({
            success: true,
            message: 'Kategorie sortimentu byly úspěšně přidány',
            categories: checkResult.rows
        });
    } catch (error) {
        console.error('❌ Chyba při spouštění migrace:', error);
        res.status(500).json({
            success: false,
            error: 'Chyba při spouštění migrace: ' + error.message
        });
    }
};

