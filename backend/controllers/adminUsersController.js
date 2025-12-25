/**
 * ============================================
 * ADMIN USERS CONTROLLER
 * ============================================
 * Controller pro správu uživatelů v admin rozhraní
 * ============================================
 */

import * as userAuthService from '../services/userAuthService.js';
import fs from 'fs';
import path from 'path';
import { paths } from '../config/paths.js';

/**
 * Získá všechny uživatele
 * GET /admin/api/users
 */
export const getAllUsers = (req, res) => {
    try {
        const usersFile = path.join(paths.root, 'backend', 'data', 'users.json');
        const data = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
        
        // Vrátit uživatele bez hesel
        const users = data.users.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });
        
        res.json({
            success: true,
            users
        });
    } catch (error) {
        console.error('Chyba při načítání uživatelů:', error);
        res.status(500).json({
            success: false,
            error: 'Chyba při načítání uživatelů'
        });
    }
};

/**
 * Získá uživatele podle ID
 * GET /admin/api/users/:id
 */
export const getUserById = (req, res) => {
    try {
        const { id } = req.params;
        const user = userAuthService.findUserById(id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'Uživatel nenalezen'
            });
        }
        
        const { password, ...userWithoutPassword } = user;
        res.json({
            success: true,
            user: userWithoutPassword
        });
    } catch (error) {
        console.error('Chyba při načítání uživatele:', error);
        res.status(500).json({
            success: false,
            error: 'Chyba při načítání uživatele'
        });
    }
};

/**
 * Resetuje heslo uživatele
 * POST /admin/api/users/:id/reset-password
 */
export const resetUserPassword = (req, res) => {
    try {
        const { id } = req.params;
        const { newPassword } = req.body;
        
        if (!newPassword || newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                error: 'Heslo musí mít minimálně 6 znaků'
            });
        }
        
        const result = userAuthService.resetPassword(id, newPassword);
        
        if (!result.success) {
            return res.status(404).json({
                success: false,
                error: result.error
            });
        }
        
        res.json({
            success: true,
            message: 'Heslo bylo úspěšně resetováno'
        });
    } catch (error) {
        console.error('Chyba při resetování hesla:', error);
        res.status(500).json({
            success: false,
            error: 'Chyba při resetování hesla'
        });
    }
};

/**
 * Smaže uživatele
 * DELETE /admin/api/users/:id
 */
export const deleteUser = (req, res) => {
    try {
        const { id } = req.params;
        const usersFile = path.join(paths.root, 'backend', 'data', 'users.json');
        const data = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
        
        const initialLength = data.users.length;
        data.users = data.users.filter(user => user.id !== id);
        
        // Odstranit objednávky uživatele
        data.orders = data.orders.filter(order => order.userId !== id);
        
        if (data.users.length === initialLength) {
            return res.status(404).json({
                success: false,
                error: 'Uživatel nenalezen'
            });
        }
        
        fs.writeFileSync(usersFile, JSON.stringify(data, null, 2));
        
        res.json({
            success: true,
            message: 'Uživatel úspěšně smazán'
        });
    } catch (error) {
        console.error('Chyba při mazání uživatele:', error);
        res.status(500).json({
            success: false,
            error: 'Chyba při mazání uživatele'
        });
    }
};

