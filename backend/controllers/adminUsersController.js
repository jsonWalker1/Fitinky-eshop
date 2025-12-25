/**
 * ============================================
 * ADMIN USERS CONTROLLER
 * ============================================
 * Controller pro správu uživatelů v admin rozhraní
 * ============================================
 */

import * as userAuthService from '../services/userAuthService.js';
import * as userRepo from '../repositories/userRepository.js';

/**
 * Získá všechny uživatele
 * GET /admin/api/users
 */
export const getAllUsers = async (req, res) => {
    try {
        const users = await userRepo.getAllUsers();
        
        // Vrátit uživatele bez hesel
        const usersWithoutPasswords = users.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });
        
        res.json({
            success: true,
            users: usersWithoutPasswords
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
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userAuthService.findUserById(id);
        
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
export const resetUserPassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { newPassword } = req.body;
        
        if (!newPassword || newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                error: 'Heslo musí mít minimálně 6 znaků'
            });
        }
        
        const result = await userAuthService.resetPassword(id, newPassword);
        
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
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deleted = await userRepo.deleteUser(id);
        
        if (!deleted) {
            return res.status(404).json({
                success: false,
                error: 'Uživatel nenalezen'
            });
        }
        
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

