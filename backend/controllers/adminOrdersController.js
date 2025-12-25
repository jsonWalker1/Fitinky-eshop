/**
 * ============================================
 * ADMIN ORDERS CONTROLLER
 * ============================================
 * Controller pro správu objednávek v admin rozhraní
 * ============================================
 */

import * as userAuthService from '../services/userAuthService.js';
import fs from 'fs';
import path from 'path';
import { paths } from '../config/paths.js';

/**
 * Získá všechny objednávky
 * GET /admin/api/orders
 */
export const getAllOrders = (req, res) => {
    try {
        const orders = userAuthService.getAllOrders();
        
        // Obohať objednávky o informace o uživateli
        const usersFile = path.join(paths.root, 'backend', 'data', 'users.json');
        const data = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
        
        const ordersWithUsers = orders.map(order => {
            const user = data.users.find(u => u.id === order.userId);
            return {
                ...order,
                user: user ? {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                } : null
            };
        });
        
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
export const getOrderById = (req, res) => {
    try {
        const { id } = req.params;
        const orders = userAuthService.getAllOrders();
        const order = orders.find(o => o.id === id);
        
        if (!order) {
            return res.status(404).json({
                success: false,
                error: 'Objednávka nenalezena'
            });
        }
        
        const user = userAuthService.findUserById(order.userId);
        
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
export const updateOrderStatus = (req, res) => {
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
        
        const result = userAuthService.updateOrderStatus(id, status);
        
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

