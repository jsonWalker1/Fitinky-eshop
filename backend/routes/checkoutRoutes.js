/**
 * ============================================
 * CHECKOUT ROUTES
 * ============================================
 * Routování pro checkout a objednávky
 * ============================================
 */

import express from 'express';
import { createOrder } from '../controllers/checkoutController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/checkout - vytvoření objednávky
router.post('/api/checkout', requireAuth, createOrder);

export default router;


