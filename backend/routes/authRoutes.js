/**
 * ============================================
 * AUTH ROUTES
 * ============================================
 * Routy pro autentizaci admin uživatelů
 * 
 * Endpointy:
 * - POST /admin/api/auth/login
 * - POST /admin/api/auth/logout
 * - GET /admin/api/auth/verify
 * 
 * ============================================
 */

import express from 'express';
import { login, logout, verify } from '../controllers/authController.js';

const router = express.Router();

// Admin autentizace endpointy
router.post('/admin/api/auth/login', login);
router.post('/admin/api/auth/logout', logout);
router.get('/admin/api/auth/verify', verify);

export default router;

