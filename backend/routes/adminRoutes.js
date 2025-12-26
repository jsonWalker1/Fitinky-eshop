/**
 * ============================================
 * ADMIN ROUTES
 * ============================================
 * Routy pro admin rozhraní (stránky a produkty)
 * 
 * Autentizace je v samostatném authRoutes.js
 * 
 * ============================================
 */

import express from 'express';
import {
    getAdminLogin,
    getAdminDashboard,
    getAdminProducts,
    getAdminUsers,
    getAdminOrders,
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getDashboardStats
} from '../controllers/adminController.js';
import { globalSearch } from '../controllers/globalSearchController.js';
import { uploadImage, upload } from '../controllers/uploadController.js';

const router = express.Router();

// Admin stránky
router.get('/admin', getAdminLogin);
router.get('/admin/login', getAdminLogin);
router.get('/admin/dashboard', getAdminDashboard);
router.get('/admin/products', getAdminProducts);
router.get('/admin/users', getAdminUsers);
router.get('/admin/orders', getAdminOrders);

// Admin API - Dashboard
router.get('/admin/api/dashboard', getDashboardStats);

// Admin API - Globální vyhledávání
router.get('/admin/api/search', globalSearch);

// Admin API - Upload obrázků
router.post('/admin/api/upload/image', upload.single('image'), uploadImage);

// Admin API - Produkty
router.get('/admin/api/products', getProducts);
router.post('/admin/api/products', addProduct);
router.put('/admin/api/products/:id', updateProduct);
router.delete('/admin/api/products/:id', deleteProduct);

export default router;

