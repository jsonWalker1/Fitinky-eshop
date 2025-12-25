/**
 * ============================================
 * USER AUTH SERVICE
 * ============================================
 * Business logika pro autentifikaci běžných uživatelů
 * 
 * Používá SQL repository pro přístup k datům
 * ============================================
 */

import * as userRepo from '../repositories/userRepository.js';

/**
 * Najde uživatele podle emailu
 */
export const findUserByEmail = async (email) => {
    try {
        return await userRepo.findUserByEmail(email);
    } catch (error) {
        console.error('Chyba při hledání uživatele:', error);
        return null;
    }
};

/**
 * Najde uživatele podle ID
 */
export const findUserById = async (userId) => {
    try {
        return await userRepo.findUserById(userId);
    } catch (error) {
        console.error('Chyba při hledání uživatele:', error);
        return null;
    }
};

/**
 * Ověří přihlašovací údaje
 */
export const verifyCredentials = async (email, password) => {
    try {
        const user = await findUserByEmail(email);
        
        if (!user) {
            return { success: false, error: 'Uživatel nenalezen' };
        }
        
        // TODO: V produkci použít hashování hesel (bcrypt)
        if (user.password !== password) {
            return { success: false, error: 'Neplatné heslo' };
        }
        
        // Vrátit uživatele bez hesla
        const { password: _, ...userWithoutPassword } = user;
        return { success: true, user: userWithoutPassword };
    } catch (error) {
        console.error('Chyba při ověřování přihlašovacích údajů:', error);
        return { success: false, error: 'Chyba při přihlašování' };
    }
};

/**
 * Vytvoří nového uživatele
 */
export const createUser = async (userData) => {
    try {
        // Zkontrolovat, jestli už email existuje
        const existingUser = await findUserByEmail(userData.email);
        if (existingUser) {
            return { success: false, error: 'Email již existuje' };
        }
        
        const newUser = await userRepo.createUser(userData);
        
        // Vrátit uživatele bez hesla
        const { password: _, ...userWithoutPassword } = newUser;
        return { success: true, user: userWithoutPassword };
    } catch (error) {
        console.error('Chyba při vytváření uživatele:', error);
        return { success: false, error: 'Chyba při registraci' };
    }
};

/**
 * Resetuje heslo uživatele
 */
export const resetPassword = async (userId, newPassword) => {
    try {
        await userRepo.updateUserPassword(userId, newPassword);
        return { success: true };
    } catch (error) {
        console.error('Chyba při resetování hesla:', error);
        return { success: false, error: 'Chyba při resetování hesla' };
    }
};

/**
 * Získá košík uživatele
 */
export const getUserCart = async (userId) => {
    try {
        return await userRepo.getUserCart(userId);
    } catch (error) {
        console.error('Chyba při načítání košíku:', error);
        return { items: [], total: 0 };
    }
};

/**
 * Uloží košík uživatele (používá se v cartService)
 */
export const saveUserCart = async (userId, cart) => {
    try {
        // Vyprázdnit starý košík
        await userRepo.clearCart(userId);
        
        // Přidat všechny položky znovu
        for (const item of cart.items) {
            await userRepo.addToCart(userId, item.productId, item.quantity);
        }
        
        return await userRepo.getUserCart(userId);
    } catch (error) {
        console.error('Chyba při ukládání košíku:', error);
        throw error;
    }
};

/**
 * Vytvoří objednávku
 */
export const createOrder = async (userId, orderData) => {
    try {
        // Vypočítat cenu dopravy
        const shippingPrices = {
            'standard': 150,
            'express': 250,
            'pickup': 0
        };
        const shippingPrice = shippingPrices[orderData.shipping] || 0;
        const subtotal = orderData.total || 0;
        const total = subtotal + shippingPrice;
        
        const order = await userRepo.createOrder({
            userId: userId,
            items: orderData.items,
            subtotal: subtotal,
            shippingPrice: shippingPrice,
            total: total,
            status: 'pending',
            shippingAddress: orderData.shippingAddress || {},
            contactInfo: {
                firstName: orderData.firstName,
                lastName: orderData.lastName,
                email: orderData.email,
                phone: orderData.phone
            },
            shipping: orderData.shipping,
            payment: orderData.payment,
            note: orderData.note || '',
            company: orderData.isCompany ? {
                name: orderData.companyName,
                ico: orderData.ico,
                dic: orderData.dic
            } : null
        });
        
        // Vyprázdnit košík
        await userRepo.clearCart(userId);
        
        return { success: true, order };
    } catch (error) {
        console.error('Chyba při vytváření objednávky:', error);
        return { success: false, error: 'Chyba při vytváření objednávky' };
    }
};

/**
 * Získá všechny objednávky
 */
export const getAllOrders = async () => {
    try {
        return await userRepo.getAllOrders();
    } catch (error) {
        console.error('Chyba při načítání objednávek:', error);
        return [];
    }
};

/**
 * Získá objednávky uživatele
 */
export const getUserOrders = async (userId) => {
    try {
        return await userRepo.getUserOrders(userId);
    } catch (error) {
        console.error('Chyba při načítání objednávek uživatele:', error);
        return [];
    }
};

/**
 * Aktualizuje status objednávky
 */
export const updateOrderStatus = async (orderId, status) => {
    try {
        const order = await userRepo.updateOrderStatus(orderId, status);
        if (!order) {
            return { success: false, error: 'Objednávka nenalezena' };
        }
        return { success: true, order };
    } catch (error) {
        console.error('Chyba při aktualizaci statusu objednávky:', error);
        return { success: false, error: 'Chyba při aktualizaci statusu' };
    }
};
