/**
 * ============================================
 * ASSETS HANDLER MIDDLEWARE
 * ============================================
 * Route handler pro servování obrázků z assets/pic s fallbackem na placeholder
 * ============================================
 */

import express from 'express';
import path from 'path';
import fs from 'fs';
import { paths } from '../config/paths.js';

const router = express.Router();

/**
 * Route handler pro /assets/pic/* s fallbackem na placeholder
 */
router.get('/assets/pic/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(paths.root, 'assets', 'pic', filename);
    
    // Zkontrolovat, jestli soubor existuje
    if (fs.existsSync(filePath)) {
        return res.sendFile(filePath);
    } else {
        // Soubor neexistuje, vrátit placeholder
        const placeholderPath = path.join(paths.root, 'assets', 'pic', 'trubka.webp');
        
        if (fs.existsSync(placeholderPath)) {
            return res.sendFile(placeholderPath);
        } else {
            // Pokud ani placeholder neexistuje, vrátit 404
            return res.status(404).json({
                success: false,
                error: 'Obrázek nenalezen'
            });
        }
    }
});

export default router;

