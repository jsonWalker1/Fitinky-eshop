/**
 * ============================================
 * ADMIN MESSAGES ROUTES
 * ============================================
 * Routy pro správu kontaktních zpráv v admin panelu
 * ============================================
 */

import express from 'express';
import {
    getAdminMessages,
    getMessages,
    getUnreadCount,
    markAsRead,
    archiveMessage
} from '../controllers/adminMessagesController.js';

const router = express.Router();

// Admin stránka - zprávy
router.get('/admin/messages', getAdminMessages);

// Admin API - zprávy
router.get('/admin/api/messages', getMessages);
router.get('/admin/api/messages/unread-count', getUnreadCount);
router.put('/admin/api/messages/:id/read', markAsRead);
router.put('/admin/api/messages/:id/archive', archiveMessage);

export default router;

