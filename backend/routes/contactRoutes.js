import express from 'express';
import { submitContact } from '../controllers/contactController.js';

const router = express.Router();

// POST /api/contact - odeslání kontaktního formuláře
router.post('/api/contact', submitContact);

export default router;

