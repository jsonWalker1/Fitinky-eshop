/**
 * ============================================
 * PRODUCTS ROUTES
 * ============================================
 * Routování pro produkty a kategorie
 * Podle rules.md: routes → pouze routování
 * ============================================
 */

import express from 'express';
import {
    getCategories,
    getCategory,
    getProducts,
    getProduct
} from '../controllers/productsController.js';

const router = express.Router();

// Kategorie
router.get('/api/categories', getCategories);
router.get('/api/categories/:slug', getCategory);

// Produkty
router.get('/api/products', getProducts);
router.get('/api/products/:id', getProduct);

export default router;

