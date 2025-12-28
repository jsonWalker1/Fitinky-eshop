/**
 * ============================================
 * ATTRIBUTE REPOSITORY (SQL)
 * ============================================
 * Data access layer pro správu hodnot atributů
 * ============================================
 */

import pool from '../db/connection.js';

/**
 * Načte všechny kategorie atributů
 */
export const getAllAttributeCategories = async () => {
    try {
        const result = await pool.query(
            'SELECT * FROM attribute_categories ORDER BY display_name'
        );
        return result.rows;
    } catch (error) {
        console.error('Chyba při načítání kategorií atributů:', error);
        throw error;
    }
};

/**
 * Načte kategorii atributu podle name
 */
export const getAttributeCategoryByName = async (name) => {
    try {
        const result = await pool.query(
            'SELECT * FROM attribute_categories WHERE name = $1',
            [name]
        );
        return result.rows[0] || null;
    } catch (error) {
        console.error('Chyba při načítání kategorie atributu:', error);
        throw error;
    }
};

/**
 * Načte kategorii atributu podle ID
 */
export const getAttributeCategoryById = async (id) => {
    try {
        const result = await pool.query(
            'SELECT * FROM attribute_categories WHERE id = $1',
            [id]
        );
        return result.rows[0] || null;
    } catch (error) {
        console.error('Chyba při načítání kategorie atributu:', error);
        throw error;
    }
};

/**
 * Vytvoří novou kategorii atributu
 */
export const addAttributeCategory = async (categoryData) => {
    try {
        const { name, display_name, description } = categoryData;
        const result = await pool.query(
            `INSERT INTO attribute_categories (name, display_name, description)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [name, display_name, description || null]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Chyba při vytváření kategorie atributu:', error);
        throw error;
    }
};

/**
 * Aktualizuje kategorii atributu
 */
export const updateAttributeCategory = async (id, categoryData) => {
    try {
        const updates = [];
        const values = [];
        let paramIndex = 1;
        
        if (categoryData.display_name !== undefined) {
            updates.push(`display_name = $${paramIndex++}`);
            values.push(categoryData.display_name);
        }
        if (categoryData.description !== undefined) {
            updates.push(`description = $${paramIndex++}`);
            values.push(categoryData.description);
        }
        
        if (updates.length === 0) {
            return await getAttributeCategoryById(id);
        }
        
        values.push(id);
        const result = await pool.query(
            `UPDATE attribute_categories 
             SET ${updates.join(', ')}
             WHERE id = $${paramIndex}
             RETURNING *`,
            values
        );
        
        return result.rows[0] || null;
    } catch (error) {
        console.error('Chyba při aktualizaci kategorie atributu:', error);
        throw error;
    }
};

/**
 * Smaže kategorii atributu (a všechny její hodnoty)
 */
export const deleteAttributeCategory = async (id) => {
    try {
        const result = await pool.query(
            'DELETE FROM attribute_categories WHERE id = $1 RETURNING id',
            [id]
        );
        return result.rows.length > 0;
    } catch (error) {
        console.error('Chyba při mazání kategorie atributu:', error);
        throw error;
    }
};

/**
 * Načte všechny hodnoty atributu pro kategorii
 */
export const getAttributeValuesByCategory = async (categoryId) => {
    try {
        const result = await pool.query(
            `SELECT * FROM attribute_values 
             WHERE category_id = $1 
             ORDER BY display_order ASC, display_name ASC`,
            [categoryId]
        );
        return result.rows;
    } catch (error) {
        console.error('Chyba při načítání hodnot atributů:', error);
        throw error;
    }
};

/**
 * Načte hodnoty atributu podle názvu kategorie (např. "material")
 */
export const getAttributeValuesByCategoryName = async (categoryName) => {
    try {
        const result = await pool.query(
            `SELECT av.* 
             FROM attribute_values av
             JOIN attribute_categories ac ON av.category_id = ac.id
             WHERE ac.name = $1
             ORDER BY av.display_order ASC, av.display_name ASC`,
            [categoryName]
        );
        return result.rows;
    } catch (error) {
        console.error('Chyba při načítání hodnot atributů:', error);
        throw error;
    }
};

/**
 * Načte hodnotu atributu podle ID
 */
export const getAttributeValueById = async (id) => {
    try {
        const result = await pool.query(
            'SELECT * FROM attribute_values WHERE id = $1',
            [id]
        );
        return result.rows[0] || null;
    } catch (error) {
        console.error('Chyba při načítání hodnoty atributu:', error);
        throw error;
    }
};

/**
 * Vytvoří novou hodnotu atributu
 */
export const addAttributeValue = async (valueData) => {
    try {
        const { category_id, value, display_name, description, display_order } = valueData;
        const result = await pool.query(
            `INSERT INTO attribute_values (category_id, value, display_name, description, display_order)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [category_id, value, display_name, description || null, display_order || 0]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Chyba při vytváření hodnoty atributu:', error);
        throw error;
    }
};

/**
 * Aktualizuje hodnotu atributu
 */
export const updateAttributeValue = async (id, valueData) => {
    try {
        const updates = [];
        const values = [];
        let paramIndex = 1;
        
        if (valueData.value !== undefined) {
            updates.push(`value = $${paramIndex++}`);
            values.push(valueData.value);
        }
        if (valueData.display_name !== undefined) {
            updates.push(`display_name = $${paramIndex++}`);
            values.push(valueData.display_name);
        }
        if (valueData.description !== undefined) {
            updates.push(`description = $${paramIndex++}`);
            values.push(valueData.description);
        }
        if (valueData.display_order !== undefined) {
            updates.push(`display_order = $${paramIndex++}`);
            values.push(valueData.display_order);
        }
        
        if (updates.length === 0) {
            return await getAttributeValueById(id);
        }
        
        values.push(id);
        const result = await pool.query(
            `UPDATE attribute_values 
             SET ${updates.join(', ')}
             WHERE id = $${paramIndex}
             RETURNING *`,
            values
        );
        
        return result.rows[0] || null;
    } catch (error) {
        console.error('Chyba při aktualizaci hodnoty atributu:', error);
        throw error;
    }
};

/**
 * Smaže hodnotu atributu
 */
export const deleteAttributeValue = async (id) => {
    try {
        const result = await pool.query(
            'DELETE FROM attribute_values WHERE id = $1 RETURNING id',
            [id]
        );
        return result.rows.length > 0;
    } catch (error) {
        console.error('Chyba při mazání hodnoty atributu:', error);
        throw error;
    }
};

/**
 * Načte kategorie atributů s jejich hodnotami (pro admin panel)
 */
export const getAttributeCategoriesWithValues = async () => {
    try {
        const categories = await getAllAttributeCategories();
        
        for (const category of categories) {
            const values = await getAttributeValuesByCategory(category.id);
            category.values = values;
        }
        
        return categories;
    } catch (error) {
        console.error('Chyba při načítání kategorií atributů s hodnotami:', error);
        throw error;
    }
};

