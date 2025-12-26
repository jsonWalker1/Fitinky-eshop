/**
 * ============================================
 * PRODUCT REPOSITORY (SQL)
 * ============================================
 * Data access layer pro produkty a kategorie
 * Používá PostgreSQL databázi
 * ============================================
 */

import pool from '../db/connection.js';

/**
 * Načte všechny kategorie
 * @param {string} searchQuery - Volitelný vyhledávací dotaz pro filtrování kategorií
 */
export const getAllCategories = async (searchQuery = null) => {
    try {
        let query = 'SELECT * FROM categories';
        const params = [];
        
        if (searchQuery && searchQuery.trim()) {
            const searchPattern = `%${searchQuery.trim()}%`;
            query += `
                WHERE name ILIKE $1
                   OR slug ILIKE $1
                   OR description ILIKE $1
            `;
            params.push(searchPattern);
        }
        
        query += ' ORDER BY name';
        
        const result = await pool.query(query, params);
        return result.rows;
    } catch (error) {
        console.error('Chyba při načítání kategorií:', error);
        throw error;
    }
};

/**
 * Načte kategorii podle slug
 */
export const getCategoryBySlug = async (slug) => {
    try {
        const result = await pool.query('SELECT * FROM categories WHERE slug = $1', [slug]);
        return result.rows[0] || null;
    } catch (error) {
        console.error('Chyba při načítání kategorie:', error);
        throw error;
    }
};

/**
 * Načte kategorii podle ID
 */
export const getCategoryById = async (id) => {
    try {
        const result = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
        return result.rows[0] || null;
    } catch (error) {
        console.error('Chyba při načítání kategorie:', error);
        throw error;
    }
};

/**
 * Načte všechny produkty
 * @param {string} searchQuery - Volitelný vyhledávací dotaz pro filtrování produktů
 */
export const getAllProducts = async (searchQuery = null) => {
    try {
        let query = `
            SELECT p.*, c.name as category_name, c.slug as category_slug_db
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
        `;
        const params = [];
        
        if (searchQuery && searchQuery.trim()) {
            const searchPattern = `%${searchQuery.trim()}%`;
            query += `
                WHERE p.name ILIKE $1
                   OR p.description ILIKE $1
                   OR c.name ILIKE $1
            `;
            params.push(searchPattern);
        }
        
        query += ' ORDER BY p.name';
        
        const result = await pool.query(query, params);
        return result.rows.map(mapProductToJSON);
    } catch (error) {
        console.error('Chyba při načítání produktů:', error);
        throw error;
    }
};

/**
 * Načte produkt podle ID
 */
export const getProductById = async (id) => {
    try {
        const result = await pool.query(`
            SELECT p.*, c.name as category_name, c.slug as category_slug_db
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            WHERE p.id = $1
        `, [id]);
        return result.rows[0] ? mapProductToJSON(result.rows[0]) : null;
    } catch (error) {
        console.error('Chyba při načítání produktu:', error);
        throw error;
    }
};

/**
 * Načte produkty podle kategorie (slug)
 */
export const getProductsByCategory = async (categorySlug) => {
    try {
        const result = await pool.query(`
            SELECT p.*, c.name as category_name, c.slug as category_slug_db
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            WHERE p.category_slug = $1 OR c.slug = $1
            ORDER BY p.name
        `, [categorySlug]);
        return result.rows.map(mapProductToJSON);
    } catch (error) {
        console.error('Chyba při načítání produktů podle kategorie:', error);
        throw error;
    }
};

/**
 * Přidá nový produkt
 */
export const addProduct = async (productData) => {
    try {
        // Najít category_id podle category slug nebo ID
        let categoryId = null;
        if (productData.categorySlug || productData.categoryId) {
            const category = productData.categoryId 
                ? await getCategoryById(productData.categoryId)
                : await getCategoryBySlug(productData.categorySlug || productData.category);
            categoryId = category?.id || null;
        }

        const id = productData.id || String(Date.now());
        const result = await pool.query(`
            INSERT INTO products (id, name, description, price, image, category_id, category_slug, availability_status)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
        `, [
            id,
            productData.name,
            productData.description || null,
            productData.price,
            productData.image || null,
            categoryId,
            productData.categorySlug || productData.category || null,
            productData.availabilityStatus || 'in_stock'
        ]);

        return mapProductToJSON(result.rows[0]);
    } catch (error) {
        console.error('Chyba při přidávání produktu:', error);
        throw error;
    }
};

/**
 * Aktualizuje produkt
 */
export const updateProduct = async (id, productData) => {
    try {
        // Najít category_id pokud je poskytnut categorySlug nebo category
        let categoryId = null;
        if (productData.categorySlug || productData.category) {
            const category = await getCategoryBySlug(productData.categorySlug || productData.category);
            categoryId = category?.id || null;
        } else if (productData.categoryId) {
            categoryId = productData.categoryId;
        }

        const updates = [];
        const values = [];
        let paramIndex = 1;

        if (productData.name !== undefined) {
            updates.push(`name = $${paramIndex++}`);
            values.push(productData.name);
        }
        if (productData.description !== undefined) {
            updates.push(`description = $${paramIndex++}`);
            values.push(productData.description);
        }
        if (productData.price !== undefined) {
            updates.push(`price = $${paramIndex++}`);
            values.push(productData.price);
        }
        if (productData.image !== undefined) {
            updates.push(`image = $${paramIndex++}`);
            values.push(productData.image);
        }
        if (categoryId !== null) {
            updates.push(`category_id = $${paramIndex++}`);
            values.push(categoryId);
        }
        if (productData.categorySlug !== undefined || productData.category !== undefined) {
            updates.push(`category_slug = $${paramIndex++}`);
            values.push(productData.categorySlug || productData.category);
        }
        if (productData.availabilityStatus !== undefined) {
            updates.push(`availability_status = $${paramIndex++}`);
            values.push(productData.availabilityStatus);
        }

        if (updates.length === 0) {
            return await getProductById(id);
        }

        values.push(id);
        const result = await pool.query(`
            UPDATE products 
            SET ${updates.join(', ')}
            WHERE id = $${paramIndex}
            RETURNING *
        `, values);

        return result.rows[0] ? mapProductToJSON(result.rows[0]) : null;
    } catch (error) {
        console.error('Chyba při aktualizaci produktu:', error);
        throw error;
    }
};

/**
 * Smaže produkt
 */
export const deleteProduct = async (id) => {
    try {
        const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING id', [id]);
        return result.rows.length > 0;
    } catch (error) {
        console.error('Chyba při mazání produktu:', error);
        throw error;
    }
};

/**
 * Načte kategorie s počtem produktů
 * @param {string} searchQuery - Volitelný vyhledávací dotaz pro filtrování kategorií
 */
export const getCategoriesWithProductCount = async (searchQuery = null) => {
    try {
        let query = `
            SELECT 
                c.*,
                COUNT(p.id) as product_count
            FROM categories c
            LEFT JOIN products p ON c.id = p.category_id
        `;
        const params = [];
        
        if (searchQuery && searchQuery.trim()) {
            const searchPattern = `%${searchQuery.trim()}%`;
            query += `
                WHERE c.name ILIKE $1
                   OR c.slug ILIKE $1
                   OR c.description ILIKE $1
            `;
            params.push(searchPattern);
        }
        
        query += `
            GROUP BY c.id
            ORDER BY c.name
        `;
        
        const result = await pool.query(query, params);
        return result.rows.map(row => ({
            ...row,
            productCount: parseInt(row.product_count) || 0
        }));
    } catch (error) {
        console.error('Chyba při načítání kategorií s počtem produktů:', error);
        throw error;
    }
};

/**
 * Mapuje SQL řádek na JSON formát (pro kompatibilitu s frontendem)
 */
function mapProductToJSON(row) {
    return {
        id: row.id,
        name: row.name,
        description: row.description,
        price: parseFloat(row.price) || 0,
        image: row.image,
        categoryId: row.category_id,
        categorySlug: row.category_slug || row.category_slug_db,
        category: row.category_name || row.category_slug || row.category_slug_db,
        availabilityStatus: row.availability_status,
        createdAt: row.created_at ? new Date(row.created_at).toISOString() : new Date().toISOString(),
        updatedAt: row.updated_at ? new Date(row.updated_at).toISOString() : null
    };
}

