/**
 * ============================================
 * ADMIN ORDERS CONTROLLER
 * ============================================
 * Controller pro správu objednávek v admin rozhraní
 * ============================================
 */

import * as userAuthService from '../services/userAuthService.js';
import * as userRepo from '../repositories/userRepository.js';

/**
 * Získá všechny objednávky
 * GET /admin/api/orders?search=query
 */
export const getAllOrders = async (req, res) => {
    try {
        const searchQuery = req.query.search || null;
        const orders = await userAuthService.getAllOrders(searchQuery);
        
        // Obohať objednávky o informace o uživateli
        const ordersWithUsers = await Promise.all(orders.map(async (order) => {
            const user = await userAuthService.findUserById(order.userId);
            return {
                ...order,
                user: user ? {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                } : null
            };
        }));
        
        res.json({
            success: true,
            orders: ordersWithUsers
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
 * Získá objednávku podle ID
 * GET /admin/api/orders/:id
 */
export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await userRepo.getOrderById(id);
        
        if (!order) {
            return res.status(404).json({
                success: false,
                error: 'Objednávka nenalezena'
            });
        }
        
        const user = await userAuthService.findUserById(order.userId);
        
        res.json({
            success: true,
            order: {
                ...order,
                user: user ? {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phone: user.phone,
                    address: user.address
                } : null
            }
        });
    } catch (error) {
        console.error('Chyba při načítání objednávky:', error);
        res.status(500).json({
            success: false,
            error: 'Chyba při načítání objednávky'
        });
    }
};

/**
 * Aktualizuje status objednávky
 * PUT /admin/api/orders/:id/status
 */
export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                error: 'Neplatný status objednávky'
            });
        }
        
        const result = await userAuthService.updateOrderStatus(id, status);
        
        if (!result.success) {
            return res.status(404).json({
                success: false,
                error: result.error
            });
        }
        
        res.json({
            success: true,
            order: result.order,
            message: 'Status objednávky aktualizován'
        });
    } catch (error) {
        console.error('Chyba při aktualizaci statusu objednávky:', error);
        res.status(500).json({
            success: false,
            error: 'Chyba při aktualizaci statusu objednávky'
        });
    }
};
