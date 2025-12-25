import express from 'express';
import * as userAuthController from '../controllers/userAuthController.js';

const router = express.Router();

// POST /api/auth/login - přihlášení
router.post('/api/auth/login', userAuthController.login);

// POST /api/auth/logout - odhlášení
router.post('/api/auth/logout', userAuthController.logout);

// POST /api/auth/register - registrace
router.post('/api/auth/register', userAuthController.register);

// GET /api/auth/verify - ověření přihlášení
router.get('/api/auth/verify', userAuthController.verify);

export default router;

