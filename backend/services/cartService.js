/**
 * ============================================
 * CART SERVICE
 * ============================================
 * Business logika pro práci s košíkem
 * Podle rules.md: services → business logika
 * 
 * Košík je uložen v users.json pro každého uživatele
 * ============================================
 */

import { getProductById } from './productsService.js';
import { getUserCart, saveUserCart } from './userAuthService.js';

/**
 * Vypočítá celkovou cenu košíku
 */
const calculateTotal = (items) => {
    return items.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);
};

/**
 * Přidá produkt do košíku (pro přihlášeného uživatele)
 */
export const addToCart = (userId, productId, quantity = 1) => {
    if (!userId) {
        throw new Error('Uživatel musí být přihlášen');
    }
    
    const product = getProductById(productId);
    
    if (!product) {
        throw new Error('Produkt nenalezen');
    }
    
    const cart = getUserCart(userId);
    
    // Zkontrolovat, jestli produkt už je v košíku
    const existingItem = cart.items.find(item => item.productId === productId);
    
    if (existingItem) {
        // Zvýšit množství
        existingItem.quantity += quantity;
    } else {
        // Přidat nový produkt
        cart.items.push({
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    // Přepočítat celkovou cenu
    cart.total = calculateTotal(cart.items);
    
    saveUserCart(userId, cart);
    return cart;
};

/**
 * Odstraní produkt z košíku
 */
export const removeFromCart = (userId, productId) => {
    if (!userId) {
        throw new Error('Uživatel musí být přihlášen');
    }
    
    const cart = getUserCart(userId);
    cart.items = cart.items.filter(item => item.productId !== productId);
    cart.total = calculateTotal(cart.items);
    saveUserCart(userId, cart);
    return cart;
};

/**
 * Aktualizuje množství produktu v košíku
 */
export const updateCartItem = (userId, productId, quantity) => {
    if (!userId) {
        throw new Error('Uživatel musí být přihlášen');
    }
    
    if (quantity <= 0) {
        return removeFromCart(userId, productId);
    }
    
    const cart = getUserCart(userId);
    const item = cart.items.find(item => item.productId === productId);
    
    if (item) {
        item.quantity = quantity;
        cart.total = calculateTotal(cart.items);
        saveUserCart(userId, cart);
    }
    
    return cart;
};

/**
 * Získá košík
 */
export const getCart = (userId) => {
    if (!userId) {
        return { items: [], total: 0 };
    }
    return getUserCart(userId);
};

/**
 * Vyprázdní košík
 */
export const clearCart = (userId) => {
    if (!userId) {
        throw new Error('Uživatel musí být přihlášen');
    }
    
    const emptyCart = { items: [], total: 0 };
    saveUserCart(userId, emptyCart);
    return emptyCart;
};

/**
 * Získá počet položek v košíku
 */
export const getCartItemCount = (userId) => {
    if (!userId) {
        return 0;
    }
    const cart = getUserCart(userId);
    return cart.items.reduce((count, item) => count + item.quantity, 0);
};

