/**
 * ============================================
 * ORDERS CONTROLLER
 * ============================================
 * Controller pro správu objednávek uživatelů
 * ============================================
 */

import * as userAuthService from '../services/userAuthService.js';

/**
 * Získá objednávky přihlášeného uživatele
 * GET /api/orders
 */
export const getUserOrders = (req, res) => {
    try {
        const userId = req.userId; // Z auth middleware
        
        if (!userId) {
            return res.status(401).json({
                success: false,
                error: 'Pro zobrazení objednávek musíte být přihlášeni',
                requiresAuth: true
            });
        }
        
        const orders = userAuthService.getUserOrders(userId);
        
        res.json({
            success: true,
            orders: orders
        });
    } catch (error) {
        console.error('Chyba při načítání objednávek:', error);
        res.status(500).json({
            success: false,
            error: 'Chyba při načítání objednávek'
        });
    }
};

/**
 * Získá detail objednávky uživatele
 * GET /api/orders/:id
 */
export const getOrderById = (req, res) => {
    try {
        const userId = req.userId; // Z auth middleware
        const { id } = req.params;
        
        if (!userId) {
            return res.status(401).json({
                success: false,
                error: 'Pro zobrazení objednávky musíte být přihlášeni',
                requiresAuth: true
            });
        }
        
        const orders = userAuthService.getUserOrders(userId);
        const order = orders.find(o => o.id === id);
        
        if (!order) {
            return res.status(404).json({
                success: false,
                error: 'Objednávka nenalezena'
            });
        }
        
        res.json({
            success: true,
            order: order
        });
    } catch (error) {
        console.error('Chyba při načítání objednávky:', error);
        res.status(500).json({
            success: false,
            error: 'Chyba při načítání objednávky'
        });
    }
};

