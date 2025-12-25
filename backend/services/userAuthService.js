/**
 * ============================================
 * USER AUTH SERVICE
 * ============================================
 * Business logika pro autentifikaci běžných uživatelů
 * ============================================
 */

import fs from 'fs';
import path from 'path';
import { paths } from '../config/paths.js';

const usersFile = path.join(paths.root, 'backend', 'data', 'users.json');

/**
 * Načte všechny uživatele
 */
const loadUsers = () => {
    try {
        const data = fs.readFileSync(usersFile, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Chyba při načítání uživatelů:', error);
        return { users: [], orders: [] };
    }
};

/**
 * Uloží uživatele
 */
const saveUsers = (data) => {
    try {
        fs.writeFileSync(usersFile, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Chyba při ukládání uživatelů:', error);
        throw error;
    }
};

/**
 * Najde uživatele podle emailu
 */
export const findUserByEmail = (email) => {
    const data = loadUsers();
    return data.users.find(user => user.email === email);
};

/**
 * Najde uživatele podle ID
 */
export const findUserById = (userId) => {
    const data = loadUsers();
    return data.users.find(user => user.id === userId);
};

/**
 * Ověří přihlašovací údaje
 */
export const verifyCredentials = (email, password) => {
    const user = findUserByEmail(email);
    
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
};

/**
 * Vytvoří nového uživatele
 */
export const createUser = (userData) => {
    const data = loadUsers();
    
    // Zkontrolovat, jestli už email existuje
    if (findUserByEmail(userData.email)) {
        return { success: false, error: 'Email již existuje' };
    }
    
    // Vygenerovat ID
    const newId = String(data.users.length + 1);
    
    const newUser = {
        id: newId,
        email: userData.email,
        password: userData.password, // TODO: Hashovat heslo
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        phone: userData.phone || '',
        address: userData.address || {},
        createdAt: new Date().toISOString(),
        cart: {
            items: [],
            total: 0
        },
        orders: []
    };
    
    data.users.push(newUser);
    saveUsers(data);
    
    const { password: _, ...userWithoutPassword } = newUser;
    return { success: true, user: userWithoutPassword };
};

/**
 * Resetuje heslo uživatele
 */
export const resetPassword = (userId, newPassword) => {
    const data = loadUsers();
    const userIndex = data.users.findIndex(user => user.id === userId);
    
    if (userIndex === -1) {
        return { success: false, error: 'Uživatel nenalezen' };
    }
    
    // TODO: Hashovat nové heslo
    data.users[userIndex].password = newPassword;
    saveUsers(data);
    
    return { success: true };
};

/**
 * Získá košík uživatele
 */
export const getUserCart = (userId) => {
    const user = findUserById(userId);
    if (!user) {
        return { items: [], total: 0 };
    }
    return user.cart || { items: [], total: 0 };
};

/**
 * Uloží košík uživatele
 */
export const saveUserCart = (userId, cart) => {
    const data = loadUsers();
    const userIndex = data.users.findIndex(user => user.id === userId);
    
    if (userIndex === -1) {
        throw new Error('Uživatel nenalezen');
    }
    
    data.users[userIndex].cart = cart;
    saveUsers(data);
    return cart;
};

/**
 * Vytvoří objednávku
 */
export const createOrder = (userId, orderData) => {
    const data = loadUsers();
    const userIndex = data.users.findIndex(user => user.id === userId);
    
    if (userIndex === -1) {
        return { success: false, error: 'Uživatel nenalezen' };
    }
    
    // Vypočítat cenu dopravy
    const shippingPrices = {
        'standard': 150,
        'express': 250,
        'pickup': 0
    };
    const shippingPrice = shippingPrices[orderData.shipping] || 0;
    const subtotal = orderData.total || 0;
    const total = subtotal + shippingPrice;
    
    const order = {
        id: String(Date.now()),
        userId: userId,
        items: orderData.items,
        subtotal: subtotal,
        shippingPrice: shippingPrice,
        total: total,
        status: 'pending',
        createdAt: new Date().toISOString(),
        shippingAddress: orderData.shippingAddress || data.users[userIndex].address,
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
    };
    
    // Přidat objednávku do globálního seznamu
    data.orders.push(order);
    
    // Přidat objednávku k uživateli
    data.users[userIndex].orders.push(order.id);
    
    // Vyprázdnit košík uživatele
    data.users[userIndex].cart = { items: [], total: 0 };
    
    saveUsers(data);
    
    return { success: true, order };
};

/**
 * Získá všechny objednávky
 */
export const getAllOrders = () => {
    const data = loadUsers();
    return data.orders || [];
};

/**
 * Získá objednávky uživatele
 */
export const getUserOrders = (userId) => {
    const data = loadUsers();
    return data.orders.filter(order => order.userId === userId);
};

/**
 * Aktualizuje status objednávky
 */
export const updateOrderStatus = (orderId, status) => {
    const data = loadUsers();
    const orderIndex = data.orders.findIndex(order => order.id === orderId);
    
    if (orderIndex === -1) {
        return { success: false, error: 'Objednávka nenalezena' };
    }
    
    data.orders[orderIndex].status = status;
    data.orders[orderIndex].updatedAt = new Date().toISOString();
    saveUsers(data);
    
    return { success: true, order: data.orders[orderIndex] };
};

