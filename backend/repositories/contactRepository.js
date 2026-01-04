/**
 * ============================================
 * CONTACT REPOSITORY (SQL)
 * ============================================
 * Data access layer pro kontaktní zprávy
 * ============================================
 */

import pool from '../db/connection.js';

/**
 * Uloží novou kontaktní zprávu
 */
export const createContactMessage = async (data) => {
    try {
        const { name, email, phone, subject, message } = data;
        
        const result = await pool.query(
            `INSERT INTO contact_messages (name, email, phone, subject, message, status)
             VALUES ($1, $2, $3, $4, $5, 'new')
             RETURNING *`,
            [name, email, phone || null, subject, message]
        );
        
        return result.rows[0];
    } catch (error) {
        console.error('Chyba při ukládání kontaktní zprávy:', error);
        throw error;
    }
};

/**
 * Získá všechny kontaktní zprávy (pro admin)
 */
export const getAllContactMessages = async (filters = {}) => {
    try {
        let query = 'SELECT * FROM contact_messages';
        const params = [];
        const conditions = [];
        
        if (filters.status) {
            conditions.push(`status = $${params.length + 1}`);
            params.push(filters.status);
        }
        
        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }
        
        query += ' ORDER BY created_at DESC';
        
        if (filters.limit) {
            query += ` LIMIT $${params.length + 1}`;
            params.push(filters.limit);
        }
        
        const result = await pool.query(query, params);
        return result.rows;
    } catch (error) {
        console.error('Chyba při získávání kontaktních zpráv:', error);
        throw error;
    }
};

/**
 * Získá kontaktní zprávu podle ID
 */
export const getContactMessageById = async (id) => {
    try {
        const result = await pool.query(
            'SELECT * FROM contact_messages WHERE id = $1',
            [id]
        );
        return result.rows[0] || null;
    } catch (error) {
        console.error('Chyba při získávání kontaktní zprávy:', error);
        throw error;
    }
};

/**
 * Označí zprávu jako přečtenou
 */
export const markAsRead = async (id) => {
    try {
        const result = await pool.query(
            `UPDATE contact_messages 
             SET status = 'read', read_at = CURRENT_TIMESTAMP
             WHERE id = $1
             RETURNING *`,
            [id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Chyba při označování zprávy jako přečtené:', error);
        throw error;
    }
};

/**
 * Označí zprávu jako archivovanou
 */
export const archiveMessage = async (id) => {
    try {
        const result = await pool.query(
            `UPDATE contact_messages 
             SET status = 'archived'
             WHERE id = $1
             RETURNING *`,
            [id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Chyba při archivování zprávy:', error);
        throw error;
    }
};

/**
 * Získá počet nepřečtených zpráv
 */
export const getUnreadCount = async () => {
    try {
        const result = await pool.query(
            "SELECT COUNT(*) as count FROM contact_messages WHERE status = 'new'"
        );
        return parseInt(result.rows[0].count, 10);
    } catch (error) {
        console.error('Chyba při získávání počtu nepřečtených zpráv:', error);
        throw error;
    }
};

