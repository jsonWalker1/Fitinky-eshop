/**
 * ============================================
 * PRODUCTS CONTROLLER
 * ============================================
 * HTTP logika pro produkty a kategorie
 * Podle rules.md: controllers → HTTP logika
 * ============================================
 */

import {
    getAllCategories,
    getCategoryBySlug,
    getAllProducts,
    getProductsByCategory,
    getProductById,
    getCategoriesWithProductCount
} from '../services/productsService.js';

/**
 * GET /api/categories
 * Vrací všechny kategorie s počtem produktů
 */
export const getCategories = async (req, res) => {
    try {
        const categories = await getCategoriesWithProductCount();
        res.json({
            success: true,
            categories
        });
    } catch (error) {
        console.error('Chyba při načítání kategorií:', error);
        res.status(500).json({
            success: false,
            error: 'Chyba při načítání kategorií'
        });
    }
};

/**
 * GET /api/categories/:slug
 * Vrací kategorii podle slug
 */
export const getCategory = async (req, res) => {
    try {
        const { slug } = req.params;
        const category = await getCategoryBySlug(slug);
        
        if (!category) {
            return res.status(404).json({
                success: false,
                error: 'Kategorie nenalezena'
            });
        }
        
        res.json({
            success: true,
            category
        });
    } catch (error) {
        console.error('Chyba při načítání kategorie:', error);
        res.status(500).json({
            success: false,
            error: 'Chyba při načítání kategorie'
        });
    }
};

/**
 * GET /api/products
 * Vrací všechny produkty nebo produkty podle kategorie
 */
export const getProducts = async (req, res) => {
    try {
        const { category } = req.query;
        
        let products;
        if (category) {
            products = await getProductsByCategory(category);
        } else {
            products = await getAllProducts();
        }
        
        res.json({
            success: true,
            products
        });
    } catch (error) {
        console.error('Chyba při načítání produktů:', error);
        res.status(500).json({
            success: false,
            error: 'Chyba při načítání produktů'
        });
    }
};

/**
 * GET /api/products/:id
 * Vrací produkt podle ID
 */
export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await getProductById(id);
        
        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Produkt nenalezen'
            });
        }
        
        res.json({
            success: true,
            product
        });
    } catch (error) {
        console.error('Chyba při načítání produktu:', error);
        res.status(500).json({
            success: false,
            error: 'Chyba při načítání produktu'
        });
    }
};

