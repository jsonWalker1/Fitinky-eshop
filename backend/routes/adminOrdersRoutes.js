import express from 'express';
import {
    getAllOrders,
    getOrderById,
    updateOrderStatus
} from '../controllers/adminOrdersController.js';

const router = express.Router();

// Admin API - Objednávky
router.get('/admin/api/orders', getAllOrders);
router.get('/admin/api/orders/:id', getOrderById);
router.put('/admin/api/orders/:id/status', updateOrderStatus);

export default router;

