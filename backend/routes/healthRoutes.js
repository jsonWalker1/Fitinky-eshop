import express from 'express';
import { getHealth } from '../controllers/healthController.js';

const router = express.Router();

// GET /health - health check endpoint
router.get('/health', getHealth);

export default router;

