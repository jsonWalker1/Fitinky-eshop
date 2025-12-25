/**
 * ============================================
 * USER AUTH CONTROLLER
 * ============================================
 * Controller pro autentifikaci běžných uživatelů
 * ============================================
 */

import * as userAuthService from '../services/userAuthService.js';

/**
 * Uživatelské přihlášení
 * POST /api/auth/login
 */
export const login = async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            error: 'Email a heslo jsou povinné'
        });
    }
    
    const result = await userAuthService.verifyCredentials(email, password);
    
    if (!result.success) {
        return res.status(401).json({
            success: false,
            error: result.error
        });
    }
    
    // TODO: Vytvořit JWT token nebo session
    res.json({
        success: true,
        message: 'Přihlášení úspěšné',
        user: result.user
        // TODO: Přidat token
    });
};

/**
 * Uživatelské odhlášení
 * POST /api/auth/logout
 */
export const logout = (req, res) => {
    // TODO: Zrušit session nebo invalidovat token
    res.json({
        success: true,
        message: 'Odhlášení úspěšné'
    });
};

/**
 * Registrace nového uživatele
 * POST /api/auth/register
 */
export const register = async (req, res) => {
    const { email, password, firstName, lastName, phone } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            error: 'Email a heslo jsou povinné'
        });
    }
    
    const result = await userAuthService.createUser({
        email,
        password,
        firstName,
        lastName,
        phone
    });
    
    if (!result.success) {
        return res.status(400).json({
            success: false,
            error: result.error
        });
    }
    
    res.json({
        success: true,
        message: 'Registrace úspěšná',
        user: result.user
    });
};

/**
 * Ověření přihlášení
 * GET /api/auth/verify
 */
export const verify = async (req, res) => {
    // TODO: Ověřit JWT token nebo session
    const userId = req.headers['x-user-id'];
    
    if (!userId) {
        return res.status(401).json({
            success: false,
            authenticated: false
        });
    }
    
    const user = await userAuthService.findUserById(userId);
    
    if (!user) {
        return res.status(401).json({
            success: false,
            authenticated: false
        });
    }
    
    const { password: _, ...userWithoutPassword } = user;
    res.json({
        success: true,
        authenticated: true,
        user: userWithoutPassword
    });
};
