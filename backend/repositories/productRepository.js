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
 * Načte obrázky produktu
 */
export const getProductImages = async (productId) => {
    try {
        const result = await pool.query(
            'SELECT id, image_url, display_order FROM product_images WHERE product_id = $1 ORDER BY display_order ASC, id ASC',
            [productId]
        );
        return result.rows;
    } catch (error) {
        console.error('Chyba při načítání obrázků produktu:', error);
        throw error;
    }
};

/**
 * Načte atributy produktu
 */
export const getProductAttributes = async (productId) => {
    try {
        const result = await pool.query(
            'SELECT attribute_name, attribute_value, attribute_type FROM product_attributes WHERE product_id = $1 ORDER BY attribute_name',
            [productId]
        );
        // Převede na objekt { attribute_name: attribute_value }
        const attributes = {};
        result.rows.forEach(row => {
            attributes[row.attribute_name] = {
                value: row.attribute_value,
                type: row.attribute_type
            };
        });
        return attributes;
    } catch (error) {
        console.error('Chyba při načítání atributů produktu:', error);
        throw error;
    }
};

/**
 * Přidá nebo aktualizuje atribut produktu
 */
export const upsertProductAttribute = async (productId, attributeName, attributeValue, attributeType = 'text') => {
    try {
        const result = await pool.query(
            `INSERT INTO product_attributes (product_id, attribute_name, attribute_value, attribute_type)
             VALUES ($1, $2, $3, $4)
             ON CONFLICT (product_id, attribute_name)
             DO UPDATE SET attribute_value = $3, attribute_type = $4, updated_at = CURRENT_TIMESTAMP
             RETURNING *`,
            [productId, attributeName, attributeValue, attributeType]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Chyba při ukládání atributu produktu:', error);
        throw error;
    }
};

/**
 * Smaže atribut produktu
 */
export const deleteProductAttribute = async (productId, attributeName) => {
    try {
        const result = await pool.query(
            'DELETE FROM product_attributes WHERE product_id = $1 AND attribute_name = $2 RETURNING id',
            [productId, attributeName]
        );
        return result.rows.length > 0;
    } catch (error) {
        console.error('Chyba při mazání atributu produktu:', error);
        throw error;
    }
};

/**
 * Smaže všechny atributy produktu
 */
export const deleteAllProductAttributes = async (productId) => {
    try {
        await pool.query('DELETE FROM product_attributes WHERE product_id = $1', [productId]);
        return true;
    } catch (error) {
        console.error('Chyba při mazání atributů produktu:', error);
        throw error;
    }
};

/**
 * Uloží všechny atributy produktu (přepíše existující)
 */
export const setProductAttributes = async (productId, attributes) => {
    try {
        // Smazat všechny existující atributy
        await deleteAllProductAttributes(productId);
        
        // Přidat nové atributy
        if (attributes && typeof attributes === 'object') {
            const entries = Object.entries(attributes);
            for (const [name, data] of entries) {
                const value = typeof data === 'object' ? data.value : data;
                const type = typeof data === 'object' && data.type ? data.type : 'text';
                await upsertProductAttribute(productId, name, value, type);
            }
        }
        
        return true;
    } catch (error) {
        console.error('Chyba při ukládání atributů produktu:', error);
        throw error;
    }
};

/**
 * Přidá obrázek do galerie produktu
 */
export const addProductImage = async (productId, imageUrl, displayOrder = null) => {
    try {
        // Pokud není zadán display_order, použij maximální + 1
        if (displayOrder === null) {
            const maxOrderResult = await pool.query(
                'SELECT MAX(display_order) as max_order FROM product_images WHERE product_id = $1',
                [productId]
            );
            displayOrder = (maxOrderResult.rows[0]?.max_order ?? -1) + 1;
        }
        
        const result = await pool.query(
            'INSERT INTO product_images (product_id, image_url, display_order) VALUES ($1, $2, $3) RETURNING *',
            [productId, imageUrl, displayOrder]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Chyba při přidávání obrázku:', error);
        throw error;
    }
};

/**
 * Odstraní obrázek z galerie produktu
 */
export const deleteProductImage = async (imageId) => {
    try {
        const result = await pool.query('DELETE FROM product_images WHERE id = $1 RETURNING id', [imageId]);
        return result.rows.length > 0;
    } catch (error) {
        console.error('Chyba při mazání obrázku:', error);
        throw error;
    }
};

/**
 * Aktualizuje pořadí obrázků
 */
export const updateProductImageOrder = async (imageId, displayOrder) => {
    try {
        const result = await pool.query(
            'UPDATE product_images SET display_order = $1 WHERE id = $2 RETURNING *',
            [displayOrder, imageId]
        );
        return result.rows[0] || null;
    } catch (error) {
        console.error('Chyba při aktualizaci pořadí obrázku:', error);
        throw error;
    }
};

/**
 * Odstraní všechny obrázky produktu
 */
export const deleteAllProductImages = async (productId) => {
    try {
        await pool.query('DELETE FROM product_images WHERE product_id = $1', [productId]);
        return true;
    } catch (error) {
        console.error('Chyba při mazání obrázků produktu:', error);
        throw error;
    }
};

/**
 * Načte všechny produkty
 * @param {object} filters - Objekt s filtry: { search, categoryId, availabilityStatus }
 */
export const getAllProducts = async (filters = {}) => {
    try {
        let query = `
            SELECT p.*, c.name as category_name, c.slug as category_slug_db
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
        `;
        const params = [];
        const conditions = [];
        let paramIndex = 1;
        
        // Vyhledávání
        if (filters.search && filters.search.trim()) {
            const searchPattern = `%${filters.search.trim()}%`;
            conditions.push(`(
                p.name ILIKE $${paramIndex}
                OR p.description ILIKE $${paramIndex}
                OR c.name ILIKE $${paramIndex}
            )`);
            params.push(searchPattern);
            paramIndex++;
        }
        
        // Filtr podle kategorie
        if (filters.categoryId) {
            conditions.push(`(p.category_id = $${paramIndex} OR c.id = $${paramIndex})`);
            params.push(filters.categoryId);
            paramIndex++;
        }
        
        // Filtr podle dostupnosti
        if (filters.availabilityStatus) {
            conditions.push(`p.availability_status = $${paramIndex}`);
            params.push(filters.availabilityStatus);
            paramIndex++;
        }
        
        // Přidat WHERE klauzuli pokud jsou podmínky
        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }
        
        query += ' ORDER BY p.name';
        
        const result = await pool.query(query, params);
        const products = result.rows.map(mapProductToJSON);
        
        // Načíst obrázky a atributy pro všechny produkty
        for (const product of products) {
            const images = await getProductImages(product.id);
            product.images = images.map(img => ({
                id: img.id,
                url: img.image_url,
                displayOrder: img.display_order
            }));
            
            const attributes = await getProductAttributes(product.id);
            product.attributes = attributes;
        }
        
        return products;
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
        
        if (!result.rows[0]) return null;
        
        const product = mapProductToJSON(result.rows[0]);
        
        // Načíst obrázky z galerie
        const images = await getProductImages(id);
        product.images = images.map(img => ({
            id: img.id,
            url: img.image_url,
            displayOrder: img.display_order
        }));
        
        // Načíst atributy
        const attributes = await getProductAttributes(id);
        product.attributes = attributes;
        
        return product;
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
        
        const products = result.rows.map(mapProductToJSON);
        
        // Načíst obrázky a atributy pro všechny produkty
        for (const product of products) {
            const images = await getProductImages(product.id);
            product.images = images.map(img => ({
                id: img.id,
                url: img.image_url,
                displayOrder: img.display_order
            }));
            
            const attributes = await getProductAttributes(product.id);
            product.attributes = attributes;
        }
        
        return products;
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
        // Najít category_id a slug podle category ID nebo slug
        let categoryId = null;
        let categorySlug = null;
        if (productData.categoryId) {
            const category = await getCategoryById(productData.categoryId);
            if (category) {
                categoryId = category.id;
                categorySlug = category.slug;
            }
        } else if (productData.categorySlug || productData.category) {
            const category = await getCategoryBySlug(productData.categorySlug || productData.category);
            if (category) {
                categoryId = category.id;
                categorySlug = category.slug;
            }
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
            categorySlug,
            productData.availabilityStatus || 'in_stock'
        ]);

        const product = mapProductToJSON(result.rows[0]);
        
        // Uložit atributy pokud jsou poskytnuty
        if (productData.attributes && typeof productData.attributes === 'object') {
            await setProductAttributes(id, productData.attributes);
            const attributes = await getProductAttributes(id);
            product.attributes = attributes;
        }
        
        return product;
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
        // Najít category_id a slug podle category ID nebo slug
        let categoryId = null;
        let categorySlug = null;
        if (productData.categoryId) {
            const category = await getCategoryById(productData.categoryId);
            if (category) {
                categoryId = category.id;
                categorySlug = category.slug;
            }
        } else if (productData.categorySlug || productData.category) {
            const category = await getCategoryBySlug(productData.categorySlug || productData.category);
            if (category) {
                categoryId = category.id;
                categorySlug = category.slug;
            }
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
        if (categorySlug !== null) {
            updates.push(`category_slug = $${paramIndex++}`);
            values.push(categorySlug);
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

        if (!result.rows[0]) return null;
        
        const product = mapProductToJSON(result.rows[0]);
        
        // Aktualizovat atributy pokud jsou poskytnuty
        if (productData.attributes !== undefined) {
            await setProductAttributes(id, productData.attributes);
            const attributes = await getProductAttributes(id);
            product.attributes = attributes;
        } else {
            // Načíst existující atributy
            const attributes = await getProductAttributes(id);
            product.attributes = attributes;
        }
        
        return product;
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
 * Vytvoří novou kategorii
 */
export const addCategory = async (categoryData) => {
    try {
        const { name, slug, description, image } = categoryData;
        
        // Generovat ID pokud není poskytnuto
        const id = categoryData.id || `cat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        // Validovat slug - pokud není poskytnut, vytvořit z názvu
        const finalSlug = slug || name.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
        
        const result = await pool.query(
            `INSERT INTO categories (id, name, slug, description, image)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [id, name, finalSlug, description || null, image || null]
        );
        
        return result.rows[0];
    } catch (error) {
        console.error('Chyba při vytváření kategorie:', error);
        throw error;
    }
};

/**
 * Aktualizuje kategorii
 */
export const updateCategory = async (id, categoryData) => {
    try {
        const updates = [];
        const values = [];
        let paramIndex = 1;
        
        if (categoryData.name !== undefined) {
            updates.push(`name = $${paramIndex++}`);
            values.push(categoryData.name);
        }
        if (categoryData.slug !== undefined) {
            updates.push(`slug = $${paramIndex++}`);
            values.push(categoryData.slug);
        }
        if (categoryData.description !== undefined) {
            updates.push(`description = $${paramIndex++}`);
            values.push(categoryData.description);
        }
        if (categoryData.image !== undefined) {
            updates.push(`image = $${paramIndex++}`);
            values.push(categoryData.image);
        }
        
        if (updates.length === 0) {
            return await getCategoryById(id);
        }
        
        values.push(id);
        const result = await pool.query(
            `UPDATE categories 
             SET ${updates.join(', ')}
             WHERE id = $${paramIndex}
             RETURNING *`,
            values
        );
        
        return result.rows[0] || null;
    } catch (error) {
        console.error('Chyba při aktualizaci kategorie:', error);
        throw error;
    }
};

/**
 * Smaže kategorii
 * @throws {Error} Pokud kategorie obsahuje produkty
 */
export const deleteCategory = async (id) => {
    try {
        // Zkontrolovat, zda kategorie obsahuje produkty
        const productsResult = await pool.query(
            'SELECT COUNT(*) as count FROM products WHERE category_id = $1',
            [id]
        );
        const productCount = parseInt(productsResult.rows[0].count) || 0;
        
        if (productCount > 0) {
            throw new Error(`Kategorie obsahuje ${productCount} produktů. Nelze smazat kategorii, která obsahuje produkty.`);
        }
        
        // Kategorie neobsahuje produkty - smazat ji
        const result = await pool.query('DELETE FROM categories WHERE id = $1 RETURNING id', [id]);
        return result.rows.length > 0;
    } catch (error) {
        console.error('Chyba při mazání kategorie:', error);
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

