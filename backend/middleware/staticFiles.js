import express from 'express';
import path from 'path';
import { paths } from '../config/paths.js';

/**
 * Middleware pro servování statických souborů
 */
export const setupStaticFiles = (app) => {
    app.use('/sass', express.static(paths.sass));
    app.use('/assets', express.static(paths.assets));
    app.use('/src', express.static(paths.src));
    
    // Servování views (pro admin stránky)
    const viewsPath = path.join(paths.root, 'backend', 'views');
    app.use('/views', express.static(viewsPath));
};

