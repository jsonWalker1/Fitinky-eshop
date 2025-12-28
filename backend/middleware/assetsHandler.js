/**
 * ============================================
 * ASSETS HANDLER MIDDLEWARE
 * ============================================
 * Middleware pro servování obrázků s fallbackem na placeholder
 * ============================================
 */

import express from 'express';
import path from 'path';
import fs from 'fs';
import { paths } from '../config/paths.js';

/**
 * Middleware pro servování obrázků z assets/pic s fallbackem
 */
export const assetsHandler = (req, res, next) => {
    // Pokud je to požadavek na /assets/pic/
    if (req.path.startsWith('/assets/pic/')) {
        const filePath = path.join(paths.root, req.path);
        
        // Zkontrolovat, jestli soubor existuje
        if (fs.existsSync(filePath)) {
            // Soubor existuje, použít default static middleware
            return next();
        } else {
            // Soubor neexistuje, vrátit placeholder nebo 404
            // Můžeme použít default placeholder obrázek
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
    }
    
    // Pro ostatní cesty pokračovat normálně
    next();
};

