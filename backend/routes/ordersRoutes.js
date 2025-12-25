/**
 * ============================================
 * ORDERS ROUTES
 * ============================================
 * Routování pro objednávky uživatelů
 * ============================================
 */

import express from 'express';
import { getUserOrders, getOrderById } from '../controllers/ordersController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/orders - získání objednávek uživatele
router.get('/api/orders', requireAuth, getUserOrders);

// GET /api/orders/:id - získání detailu objednávky
router.get('/api/orders/:id', requireAuth, getOrderById);

export default router;

