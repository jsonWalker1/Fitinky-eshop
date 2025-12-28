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
    getAdminCategories,
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getDashboardStats,
    getAdminCategoriesAPI,
    createCategory,
    updateAdminCategory,
    deleteAdminCategory,
    getAdminCategory,
    getProductImagesAPI,
    addProductImageAPI,
    deleteProductImageAPI,
    updateProductImageOrderAPI
} from '../controllers/adminController.js';
import { globalSearch } from '../controllers/globalSearchController.js';
import { uploadImage, upload } from '../controllers/uploadController.js';

const router = express.Router();

// Admin stránky
router.get('/admin', getAdminLogin);
router.get('/admin/login', getAdminLogin);
router.get('/admin/dashboard', getAdminDashboard);
router.get('/admin/products', getAdminProducts);
router.get('/admin/categories', getAdminCategories);
router.get('/admin/users', getAdminUsers);
router.get('/admin/orders', getAdminOrders);

// Admin API - Dashboard
router.get('/admin/api/dashboard', getDashboardStats);

// Admin API - Globální vyhledávání
router.get('/admin/api/search', globalSearch);

// Admin API - Upload obrázků
router.post('/admin/api/upload/image', upload.single('image'), uploadImage);

// Admin API - Kategorie
router.get('/admin/api/categories', getAdminCategoriesAPI);
router.get('/admin/api/categories/:id', getAdminCategory);
router.post('/admin/api/categories', createCategory);
router.put('/admin/api/categories/:id', updateAdminCategory);
router.delete('/admin/api/categories/:id', deleteAdminCategory);

// Admin API - Produkty
router.get('/admin/api/products', getProducts);
router.post('/admin/api/products', addProduct);
router.put('/admin/api/products/:id', updateProduct);
router.delete('/admin/api/products/:id', deleteProduct);

// Admin API - Product Images
router.get('/admin/api/products/:productId/images', getProductImagesAPI);
router.post('/admin/api/products/:productId/images', addProductImageAPI);
router.delete('/admin/api/products/:productId/images/:imageId', deleteProductImageAPI);
router.put('/admin/api/products/:productId/images/:imageId/order', updateProductImageOrderAPI);

export default router;

