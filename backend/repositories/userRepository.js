/**
 * ============================================
 * USER REPOSITORY (SQL)
 * ============================================
 * Data access layer pro uživatele, košíky a objednávky
 * Používá PostgreSQL databázi
 * ============================================
 */

import pool from '../db/connection.js';
import { randomUUID } from 'crypto';

/**
 * Najde uživatele podle emailu
 */
export const findUserByEmail = async (email) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0] ? mapUserToJSON(result.rows[0]) : null;
    } catch (error) {
        console.error('Chyba při hledání uživatele podle emailu:', error);
        throw error;
    }
};

/**
 * Najde uživatele podle ID
 */
export const findUserById = async (userId) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
        return result.rows[0] ? mapUserToJSON(result.rows[0]) : null;
    } catch (error) {
        console.error('Chyba při hledání uživatele podle ID:', error);
        throw error;
    }
};

/**
 * Vytvoří nového uživatele
 */
export const createUser = async (userData) => {
    try {
        const id = userData.id || randomUUID();
        
        const result = await pool.query(`
            INSERT INTO users (id, email, password, first_name, last_name, phone,
                address_street, address_city, address_postal_code, address_country)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *
        `, [
            id,
            userData.email,
            userData.password,
            userData.firstName || null,
            userData.lastName || null,
            userData.phone || null,
            userData.address?.street || null,
            userData.address?.city || null,
            userData.address?.postalCode || null,
            userData.address?.country || 'Česká republika'
        ]);

        return mapUserToJSON(result.rows[0]);
    } catch (error) {
        console.error('Chyba při vytváření uživatele:', error);
        throw error;
    }
};

/**
 * Aktualizuje heslo uživatele
 */
export const updateUserPassword = async (userId, newPassword) => {
    try {
        await pool.query('UPDATE users SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', 
            [newPassword, userId]);
        return true;
    } catch (error) {
        console.error('Chyba při aktualizaci hesla:', error);
        throw error;
    }
};

/**
 * Aktualizuje údaje uživatele
 */
export const updateUser = async (userId, userData) => {
    try {
        const updates = [];
        const values = [];
        let paramIndex = 1;

        if (userData.firstName !== undefined) {
            updates.push(`first_name = $${paramIndex++}`);
            values.push(userData.firstName);
        }
        if (userData.lastName !== undefined) {
            updates.push(`last_name = $${paramIndex++}`);
            values.push(userData.lastName);
        }
        if (userData.phone !== undefined) {
            updates.push(`phone = $${paramIndex++}`);
            values.push(userData.phone);
        }
        if (userData.address?.street !== undefined) {
            updates.push(`address_street = $${paramIndex++}`);
            values.push(userData.address.street);
        }
        if (userData.address?.city !== undefined) {
            updates.push(`address_city = $${paramIndex++}`);
            values.push(userData.address.city);
        }
        if (userData.address?.postalCode !== undefined) {
            updates.push(`address_postal_code = $${paramIndex++}`);
            values.push(userData.address.postalCode);
        }
        if (userData.address?.country !== undefined) {
            updates.push(`address_country = $${paramIndex++}`);
            values.push(userData.address.country);
        }

        if (updates.length === 0) {
            return await findUserById(userId);
        }

        values.push(userId);
        const result = await pool.query(`
            UPDATE users 
            SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP
            WHERE id = $${paramIndex}
            RETURNING *
        `, values);

        return result.rows[0] ? mapUserToJSON(result.rows[0]) : null;
    } catch (error) {
        console.error('Chyba při aktualizaci uživatele:', error);
        throw error;
    }
};

/**
 * Získá všechny uživatele
 * @param {string} searchQuery - Volitelný vyhledávací dotaz pro filtrování uživatelů
 */
export const getAllUsers = async (searchQuery = null) => {
    try {
        let query = 'SELECT * FROM users';
        const params = [];
        
        if (searchQuery && searchQuery.trim()) {
            const searchPattern = `%${searchQuery.trim()}%`;
            query += `
                WHERE email ILIKE $1
                   OR first_name ILIKE $1
                   OR last_name ILIKE $1
                   OR (first_name || ' ' || last_name) ILIKE $1
                   OR phone ILIKE $1
            `;
            params.push(searchPattern);
        }
        
        query += ' ORDER BY created_at DESC';
        
        const result = await pool.query(query, params);
        return result.rows.map(mapUserToJSON);
    } catch (error) {
        console.error('Chyba při načítání uživatelů:', error);
        throw error;
    }
};

/**
 * Smaže uživatele
 */
export const deleteUser = async (userId) => {
    try {
        const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [userId]);
        return result.rows.length > 0;
    } catch (error) {
        console.error('Chyba při mazání uživatele:', error);
        throw error;
    }
};

// ============================================
// CART OPERATIONS
// ============================================

/**
 * Získá košík uživatele
 */
export const getUserCart = async (userId) => {
    try {
        const result = await pool.query(`
            SELECT 
                ci.*,
                p.name as product_name,
                p.price as product_price,
                p.image as product_image
            FROM cart_items ci
            LEFT JOIN products p ON ci.product_id = p.id
            WHERE ci.user_id = $1
            ORDER BY ci.created_at
        `, [userId]);

        const items = result.rows.map(row => ({
            productId: row.product_id,
            name: row.product_name || 'Neznámý produkt',
            price: parseFloat(row.product_price) || 0,
            image: row.product_image,
            quantity: row.quantity || 1
        })).filter(item => item.price > 0); // Filtrovat položky bez ceny (smazané produkty)

        const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        return { items, total };
    } catch (error) {
        console.error('Chyba při načítání košíku:', error);
        throw error;
    }
};

/**
 * Přidá produkt do košíku
 */
export const addToCart = async (userId, productId, quantity = 1) => {
    try {
        await pool.query(`
            INSERT INTO cart_items (user_id, product_id, quantity)
            VALUES ($1, $2, $3)
            ON CONFLICT (user_id, product_id) 
            DO UPDATE SET quantity = cart_items.quantity + $3, updated_at = CURRENT_TIMESTAMP
        `, [userId, productId, quantity]);
        
        return await getUserCart(userId);
    } catch (error) {
        console.error('Chyba při přidávání do košíku:', error);
        throw error;
    }
};

/**
 * Odstraní produkt z košíku
 */
export const removeFromCart = async (userId, productId) => {
    try {
        await pool.query('DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2', 
            [userId, productId]);
        return await getUserCart(userId);
    } catch (error) {
        console.error('Chyba při odstraňování z košíku:', error);
        throw error;
    }
};

/**
 * Aktualizuje množství produktu v košíku
 */
export const updateCartItem = async (userId, productId, quantity) => {
    try {
        if (quantity <= 0) {
            return await removeFromCart(userId, productId);
        }
        
        await pool.query(`
            UPDATE cart_items 
            SET quantity = $1, updated_at = CURRENT_TIMESTAMP
            WHERE user_id = $2 AND product_id = $3
        `, [quantity, userId, productId]);
        
        return await getUserCart(userId);
    } catch (error) {
        console.error('Chyba při aktualizaci košíku:', error);
        throw error;
    }
};

/**
 * Vyprázdní košík
 */
export const clearCart = async (userId) => {
    try {
        await pool.query('DELETE FROM cart_items WHERE user_id = $1', [userId]);
        return { items: [], total: 0 };
    } catch (error) {
        console.error('Chyba při vyprázdňování košíku:', error);
        throw error;
    }
};

// ============================================
// ORDER OPERATIONS
// ============================================

/**
 * Vytvoří objednávku
 */
export const createOrder = async (orderData) => {
    try {
        const client = await pool.connect();
        
        try {
            await client.query('BEGIN');
            
            const orderId = orderData.id || randomUUID();
            
            // Vytvořit objednávku
            const orderResult = await client.query(`
                INSERT INTO orders (id, user_id, subtotal, shipping_price, total_price, status,
                    shipping_address, contact_info, shipping_method, payment_method, note, company)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
                RETURNING *
            `, [
                orderId,
                orderData.userId,
                orderData.subtotal || 0,
                orderData.shippingPrice || 0,
                orderData.total || 0,
                orderData.status || 'pending',
                JSON.stringify(orderData.shippingAddress || {}),
                JSON.stringify(orderData.contactInfo || {}),
                orderData.shipping || null,
                orderData.payment || null,
                orderData.note || null,
                orderData.company ? JSON.stringify(orderData.company) : null
            ]);

            // Přidat položky objednávky
            if (orderData.items && orderData.items.length > 0) {
                for (const item of orderData.items) {
                    await client.query(`
                        INSERT INTO order_items (order_id, product_id, product_name, product_price, product_image, quantity)
                        VALUES ($1, $2, $3, $4, $5, $6)
                    `, [
                        orderId,
                        item.productId || null,
                        item.name,
                        item.price,
                        item.image || null,
                        item.quantity
                    ]);
                }
            }

            await client.query('COMMIT');
            
            return mapOrderToJSON(orderResult.rows[0]);
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Chyba při vytváření objednávky:', error);
        throw error;
    }
};

/**
 * Získá všechny objednávky
 * @param {string} searchQuery - Volitelný vyhledávací dotaz pro filtrování objednávek
 */
export const getAllOrders = async (searchQuery = null) => {
    try {
        let query;
        const params = [];
        
        if (searchQuery && searchQuery.trim()) {
            const searchPattern = `%${searchQuery.trim()}%`;
            // Pro vyhledávání používáme EXISTS pro produktové jméno, abychom se vyhnuli duplikátům
            query = `
                SELECT DISTINCT orders.* 
                FROM orders
                LEFT JOIN users ON orders.user_id = users.id
                WHERE orders.id::text ILIKE $1
                   OR users.email ILIKE $1
                   OR users.first_name ILIKE $1
                   OR users.last_name ILIKE $1
                   OR (users.first_name || ' ' || users.last_name) ILIKE $1
                   OR EXISTS (
                       SELECT 1 FROM order_items 
                       WHERE order_items.order_id = orders.id 
                       AND order_items.product_name ILIKE $1
                   )
                ORDER BY orders.created_at DESC
            `;
            params.push(searchPattern);
        } else {
            query = `
                SELECT * FROM orders 
                ORDER BY created_at DESC
            `;
        }
        
        const result = await pool.query(query, params);
        return result.rows.map(mapOrderToJSON);
    } catch (error) {
        console.error('Chyba při načítání objednávek:', error);
        throw error;
    }
};

/**
 * Získá objednávky uživatele
 */
export const getUserOrders = async (userId) => {
    try {
        const result = await pool.query(`
            SELECT * FROM orders 
            WHERE user_id = $1 
            ORDER BY created_at DESC
        `, [userId]);
        return result.rows.map(mapOrderToJSON);
    } catch (error) {
        console.error('Chyba při načítání objednávek uživatele:', error);
        throw error;
    }
};

/**
 * Získá objednávku podle ID
 */
export const getOrderById = async (orderId) => {
    try {
        const result = await pool.query('SELECT * FROM orders WHERE id = $1', [orderId]);
        if (!result.rows[0]) return null;
        
        const order = mapOrderToJSON(result.rows[0]);
        
        // Načíst položky objednávky
        const itemsResult = await pool.query(`
            SELECT * FROM order_items 
            WHERE order_id = $1 
            ORDER BY created_at
        `, [orderId]);
        
        order.items = itemsResult.rows.map(row => ({
            productId: row.product_id,
            name: row.product_name,
            price: parseFloat(row.product_price) || 0,
            image: row.product_image,
            quantity: row.quantity
        }));
        
        return order;
    } catch (error) {
        console.error('Chyba při načítání objednávky:', error);
        throw error;
    }
};

/**
 * Aktualizuje status objednávky
 */
export const updateOrderStatus = async (orderId, status) => {
    try {
        const result = await pool.query(`
            UPDATE orders 
            SET status = $1, updated_at = CURRENT_TIMESTAMP
            WHERE id = $2
            RETURNING *
        `, [status, orderId]);
        
        return result.rows[0] ? mapOrderToJSON(result.rows[0]) : null;
    } catch (error) {
        console.error('Chyba při aktualizaci statusu objednávky:', error);
        throw error;
    }
};

// ============================================
// MAPPING FUNCTIONS
// ============================================

/**
 * Mapuje SQL řádek uživatele na JSON formát
 */
function mapUserToJSON(row) {
    return {
        id: row.id,
        email: row.email,
        password: row.password,
        firstName: row.first_name,
        lastName: row.last_name,
        phone: row.phone,
        address: {
            street: row.address_street,
            city: row.address_city,
            postalCode: row.address_postal_code,
            country: row.address_country
        },
        createdAt: row.created_at ? new Date(row.created_at).toISOString() : new Date().toISOString(),
        updatedAt: row.updated_at ? new Date(row.updated_at).toISOString() : null
    };
}

/**
 * Mapuje SQL řádek objednávky na JSON formát
 */
function mapOrderToJSON(row) {
    return {
        id: row.id,
        userId: row.user_id,
        subtotal: parseFloat(row.subtotal || 0),
        shippingPrice: parseFloat(row.shipping_price || 0),
        total: parseFloat(row.total_price || 0),
        status: row.status || 'pending',
        shippingAddress: row.shipping_address || {},
        contactInfo: row.contact_info || {},
        shipping: row.shipping_method,
        payment: row.payment_method,
        note: row.note,
        company: row.company || null,
        createdAt: row.created_at ? new Date(row.created_at).toISOString() : new Date().toISOString(),
        updatedAt: row.updated_at ? new Date(row.updated_at).toISOString() : null,
        items: [] // Budou načteny samostatně v getOrderById
    };
}

