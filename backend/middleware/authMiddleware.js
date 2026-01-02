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
export const requireAuth = async (req, res, next) => {
    try {
        const userId = req.headers['x-user-id'];
        
        if (!userId) {
            return res.status(401).json({
                success: false,
                error: 'Pro přístup k této funkci musíte být přihlášeni',
                requiresAuth: true
            });
        }
        
        // Ověřit, jestli uživatel existuje
        const user = await userAuthService.findUserById(userId);
        
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
    } catch (error) {
        console.error('Chyba v auth middleware:', error);
        return res.status(500).json({
            success: false,
            error: 'Chyba při ověřování uživatele'
        });
    }
};

