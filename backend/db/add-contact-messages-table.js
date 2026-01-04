/**
 * ============================================
 * ADD CONTACT MESSAGES TABLE
 * ============================================
 * Skript pro vytvoření tabulky contact_messages
 * ============================================
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './connection.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function addContactMessagesTable() {
    try {
        console.log('📝 Vytváření tabulky contact_messages...');
        
        const sqlPath = path.join(__dirname, 'add-contact-messages-table.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');
        
        await pool.query(sql);
        
        console.log('✅ Tabulka contact_messages byla úspěšně vytvořena!');
        
        // Zkontrolovat, jestli tabulka existuje
        const checkResult = await pool.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'contact_messages'
            );
        `);
        
        if (checkResult.rows[0].exists) {
            console.log('✅ Tabulka contact_messages existuje v databázi');
        } else {
            console.log('⚠️  Tabulka contact_messages možná nebyla vytvořena');
        }
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Chyba při vytváření tabulky contact_messages:', error);
        process.exit(1);
    }
}

addContactMessagesTable();

