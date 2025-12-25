/**
 * ============================================
 * AUTH UTILITIES
 * ============================================
 * Pomocné funkce pro správu autentifikace
 * ============================================
 */

const API_BASE = '/api';

/**
 * Zkontroluje, jestli je uživatel přihlášený
 */
export function isAuthenticated() {
    return !!localStorage.getItem('userId');
}

/**
 * Získá ID přihlášeného uživatele
 */
export function getUserId() {
    return localStorage.getItem('userId');
}

/**
 * Odhlásí uživatele
 */
export async function logout() {
    try {
        await fetch(`${API_BASE}/auth/logout`, {
            method: 'POST',
            headers: {
                'X-User-Id': getUserId()
            }
        });
    } catch (error) {
        console.error('Chyba při odhlašování:', error);
    }
    
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userData');
    window.location.href = '/login';
}

/**
 * Ověří, jestli je uživatel přihlášený (s kontrolou na serveru)
 */
export async function verifyAuth() {
    const userId = getUserId();
    
    if (!userId) {
        return false;
    }
    
    try {
        const response = await fetch(`${API_BASE}/auth/verify`, {
            headers: {
                'X-User-Id': userId
            }
        });
        
        const data = await response.json();
        return data.success && data.authenticated;
    } catch (error) {
        console.error('Chyba při ověřování:', error);
        return false;
    }
}

/**
 * Zkontroluje přihlášení a přesměruje na login pokud není přihlášený
 */
export async function requireAuth() {
    const authenticated = await verifyAuth();
    
    if (!authenticated) {
        window.location.href = '/login';
        return false;
    }
    
    return true;
}

