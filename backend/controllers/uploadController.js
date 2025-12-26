/**
 * ============================================
 * UPLOAD CONTROLLER
 * ============================================
 * Controller pro nahrávání souborů (obrázky)
 * ============================================
 */

import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { paths } from '../config/paths.js';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Nastavení multer pro ukládání souborů
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(paths.root, 'assets', 'pic');
        
        // Vytvořit složku, pokud neexistuje
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Generovat unikátní název souboru
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext).replace(/[^a-z0-9]/gi, '-').toLowerCase();
        cb(null, `${name}-${uniqueSuffix}${ext}`);
    }
});

// Filtrování pouze obrázků
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Povolené jsou pouze obrázky (jpeg, jpg, png, gif, webp)'));
    }
};

export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: fileFilter
});

/**
 * Nahrání obrázku produktu
 * POST /admin/api/upload/image
 */
export const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: 'Žádný soubor nebyl nahrán'
            });
        }
        
        // Vrátit URL obrázku (relativní cesta od root)
        const imageUrl = `/assets/pic/${req.file.filename}`;
        
        res.json({
            success: true,
            url: imageUrl,
            filename: req.file.filename
        });
    } catch (error) {
        console.error('Chyba při nahrávání obrázku:', error);
        res.status(500).json({
            success: false,
            error: 'Chyba při nahrávání obrázku'
        });
    }
};

