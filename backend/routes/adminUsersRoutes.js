import express from 'express';
import {
    getAllUsers,
    getUserById,
    resetUserPassword,
    deleteUser
} from '../controllers/adminUsersController.js';

const router = express.Router();

// Admin API - Uživatelé
router.get('/admin/api/users', getAllUsers);
router.get('/admin/api/users/:id', getUserById);
router.post('/admin/api/users/:id/reset-password', resetUserPassword);
router.delete('/admin/api/users/:id', deleteUser);

export default router;

