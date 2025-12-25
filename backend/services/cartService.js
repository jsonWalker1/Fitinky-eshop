/**
 * ============================================
 * CART SERVICE
 * ============================================
 * Business logika pro práci s košíkem
 * Podle rules.md: services → business logika
 * 
 * Používá SQL repository pro přístup k datům
 * ============================================
 */

import { getProductById } from './productsService.js';
import * as userRepo from '../repositories/userRepository.js';

/**
 * Přidá produkt do košíku (pro přihlášeného uživatele)
 */
export const addToCart = async (userId, productId, quantity = 1) => {
    if (!userId) {
        throw new Error('Uživatel musí být přihlášen');
    }
    
    const product = await getProductById(productId);
    
    if (!product) {
        throw new Error('Produkt nenalezen');
    }
    
    return await userRepo.addToCart(userId, productId, quantity);
};

/**
 * Odstraní produkt z košíku
 */
export const removeFromCart = async (userId, productId) => {
    if (!userId) {
        throw new Error('Uživatel musí být přihlášen');
    }
    
    return await userRepo.removeFromCart(userId, productId);
};

/**
 * Aktualizuje množství produktu v košíku
 */
export const updateCartItem = async (userId, productId, quantity) => {
    if (!userId) {
        throw new Error('Uživatel musí být přihlášen');
    }
    
    return await userRepo.updateCartItem(userId, productId, quantity);
};

/**
 * Získá košík
 */
export const getCart = async (userId) => {
    if (!userId) {
        return { items: [], total: 0 };
    }
    return await userRepo.getUserCart(userId);
};

/**
 * Vyprázdní košík
 */
export const clearCart = async (userId) => {
    if (!userId) {
        throw new Error('Uživatel musí být přihlášen');
    }
    
    return await userRepo.clearCart(userId);
};

/**
 * Získá počet položek v košíku
 */
export const getCartItemCount = async (userId) => {
    if (!userId) {
        return 0;
    }
    const cart = await userRepo.getUserCart(userId);
    return cart.items.reduce((count, item) => count + item.quantity, 0);
};
