/**
 * ============================================
 * CART CONTROLLER
 * ============================================
 * HTTP logika pro košík
 * Podle rules.md: controllers → HTTP logika
 * ============================================
 */

import {
    addToCart,
    removeFromCart,
    updateCartItem,
    getCart,
    clearCart,
    getCartItemCount
} from '../services/cartService.js';

/**
 * Pomocná funkce pro získání userId z headeru (pro volitelné endpointy)
 */
const getUserId = (req) => {
    return req.userId || req.headers['x-user-id'] || null;
};

/**
 * GET /api/cart
 * Vrací obsah košíku
 */
export const getCartItems = (req, res) => {
    try {
        const userId = req.userId; // Z auth middleware
        const cart = getCart(userId);
        
        res.json({
            success: true,
            cart
        });
    } catch (error) {
        console.error('Chyba při načítání košíku:', error);
        res.status(500).json({
            success: false,
            error: 'Chyba při načítání košíku'
        });
    }
};

/**
 * POST /api/cart/add
 * Přidá produkt do košíku
 */
export const addItem = (req, res) => {
    try {
        const userId = req.userId; // Z auth middleware
        const { productId, quantity } = req.body;
        
        if (!productId) {
            return res.status(400).json({
                success: false,
                error: 'ProductId je povinné'
            });
        }
        
        const cart = addToCart(userId, productId, quantity || 1);
        
        res.json({
            success: true,
            cart,
            message: 'Produkt přidán do košíku'
        });
    } catch (error) {
        console.error('Chyba při přidávání do košíku:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Chyba při přidávání do košíku'
        });
    }
};

/**
 * DELETE /api/cart/remove/:productId
 * Odstraní produkt z košíku
 */
export const removeItem = (req, res) => {
    try {
        const userId = req.userId; // Z auth middleware
        const { productId } = req.params;
        
        const cart = removeFromCart(userId, productId);
        
        res.json({
            success: true,
            cart,
            message: 'Produkt odstraněn z košíku'
        });
    } catch (error) {
        console.error('Chyba při odstraňování z košíku:', error);
        res.status(500).json({
            success: false,
            error: 'Chyba při odstraňování z košíku'
        });
    }
};

/**
 * PUT /api/cart/update
 * Aktualizuje množství produktu v košíku
 */
export const updateItem = (req, res) => {
    try {
        const userId = req.userId; // Z auth middleware
        const { productId, quantity } = req.body;
        
        if (!productId || quantity === undefined) {
            return res.status(400).json({
                success: false,
                error: 'ProductId a quantity jsou povinné'
            });
        }
        
        const cart = updateCartItem(userId, productId, quantity);
        
        res.json({
            success: true,
            cart,
            message: 'Košík aktualizován'
        });
    } catch (error) {
        console.error('Chyba při aktualizaci košíku:', error);
        res.status(500).json({
            success: false,
            error: 'Chyba při aktualizaci košíku'
        });
    }
};

/**
 * DELETE /api/cart/clear
 * Vyprázdní košík
 */
export const clearCartItems = (req, res) => {
    try {
        const userId = req.userId; // Z auth middleware
        const cart = clearCart(userId);
        
        res.json({
            success: true,
            cart,
            message: 'Košík vyprázdněn'
        });
    } catch (error) {
        console.error('Chyba při vyprázdňování košíku:', error);
        res.status(500).json({
            success: false,
            error: 'Chyba při vyprázdňování košíku'
        });
    }
};

/**
 * GET /api/cart/count
 * Vrací počet položek v košíku (volitelný - nevyžaduje přihlášení)
 */
export const getItemCount = (req, res) => {
    try {
        const userId = getUserId(req);
        const count = getCartItemCount(userId);
        
        res.json({
            success: true,
            count
        });
    } catch (error) {
        console.error('Chyba při načítání počtu položek:', error);
        res.status(500).json({
            success: false,
            error: 'Chyba při načítání počtu položek'
        });
    }
};

