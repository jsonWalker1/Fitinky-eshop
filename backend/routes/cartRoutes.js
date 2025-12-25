/**
 * ============================================
 * CART ROUTES
 * ============================================
 * Routování pro košík
 * Podle rules.md: routes → pouze routování
 * ============================================
 */

import express from 'express';
import {
    getCartItems,
    addItem,
    removeItem,
    updateItem,
    clearCartItems,
    getItemCount
} from '../controllers/cartController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Košík endpointy - vyžadují přihlášení (kromě count, který může být volitelný)
router.get('/api/cart', requireAuth, getCartItems);
router.get('/api/cart/count', getItemCount); // Volitelné - vrátí 0 pokud není přihlášený
router.post('/api/cart/add', requireAuth, addItem);
router.delete('/api/cart/remove/:productId', requireAuth, removeItem);
router.put('/api/cart/update', requireAuth, updateItem);
router.delete('/api/cart/clear', requireAuth, clearCartItems);

export default router;

