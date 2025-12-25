/**
 * ============================================
 * AUTH CONTROLLER
 * ============================================
 * Controller pro autentizaci admin uživatelů
 * 
 * Endpointy:
 * - POST /admin/api/auth/login - přihlášení
 * - POST /admin/api/auth/logout - odhlášení (budoucí)
 * - GET /admin/api/auth/verify - ověření tokenu (budoucí)
 * 
 * ============================================
 */

/**
 * Admin přihlášení
 * POST /admin/api/auth/login
 */
export const login = (req, res) => {
    const { username, password } = req.body;
    
    // Validace vstupů
    if (!username || !password) {
        return res.status(400).json({
            success: false,
            error: 'Uživatelské jméno a heslo jsou povinné'
        });
    }
    
    // Jednoduchá autentizace (v produkci použij hashování a databázi!)
    // TODO: Implementovat hashování hesel (bcrypt)
    // TODO: Implementovat JWT tokeny nebo session management
    // TODO: Přidat rate limiting
    
    if (username === 'admin' && password === 'admin123') {
        // Úspěšné přihlášení
        // TODO: Vytvořit JWT token nebo session
        res.json({
            success: true,
            message: 'Přihlášení úspěšné',
            redirect: '/admin/dashboard',
            user: {
                username: 'admin',
                role: 'admin'
            }
            // TODO: Přidat token: jwt.sign(...)
        });
    } else {
        // Neplatné přihlašovací údaje
        res.status(401).json({
            success: false,
            error: 'Neplatné přihlašovací údaje'
        });
    }
};

/**
 * Admin odhlášení
 * POST /admin/api/auth/logout
 */
export const logout = (req, res) => {
    // TODO: Zrušit session nebo invalidovat token
    res.json({
        success: true,
        message: 'Odhlášení úspěšné',
        redirect: '/admin/login'
    });
};

/**
 * Ověření autentizace
 * GET /admin/api/auth/verify
 */
export const verify = (req, res) => {
    // TODO: Ověřit JWT token nebo session
    // TODO: Zkontrolovat, jestli je uživatel stále přihlášený
    
    // Pro teď vracíme, že je přihlášený (pokud endpoint existuje)
    res.json({
        success: true,
        authenticated: true,
        user: {
            username: 'admin',
            role: 'admin'
        }
    });
};

