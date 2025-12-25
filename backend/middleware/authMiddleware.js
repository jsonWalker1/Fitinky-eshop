/**
 * ============================================
 * AUTH MIDDLEWARE
 * ============================================
 * Middleware pro kontrolu autentifikace uživatelů
 * ============================================
 */

import * as userAuthService from '../services/userAuthService.js';

/**
 * Middleware pro kontrolu přihlášení
 * Pokud uživatel není přihlášený, vrátí 401
 */
export const requireAuth = (req, res, next) => {
    const userId = req.headers['x-user-id'];
    
    if (!userId) {
        return res.status(401).json({
            success: false,
            error: 'Pro přístup k této funkci musíte být přihlášeni',
            requiresAuth: true
        });
    }
    
    // Ověřit, jestli uživatel existuje
    const user = userAuthService.findUserById(userId);
    
    if (!user) {
        return res.status(401).json({
            success: false,
            error: 'Neplatný uživatel',
            requiresAuth: true
        });
    }
    
    // Přidat userId do requestu pro další použití
    req.userId = userId;
    req.user = user;
    next();
};

