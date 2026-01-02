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
    getAdminAttributes,
    getAdminSettings,
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
import {
    getAttributeCategories,
    getAttributeValues,
    addAttributeValue,
    updateAttributeValue,
    deleteAttributeValue
} from '../controllers/attributeController.js';
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
router.get('/admin/attributes', getAdminAttributes);
router.get('/admin/settings', getAdminSettings);

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

// Admin API - Attribute Values
router.get('/admin/api/attributes/categories', getAttributeCategories);
router.get('/admin/api/attributes/values/:categoryName', getAttributeValues);
router.post('/admin/api/attributes/values', addAttributeValue);
router.put('/admin/api/attributes/values/:id', updateAttributeValue);
router.delete('/admin/api/attributes/values/:id', deleteAttributeValue);

export default router;

