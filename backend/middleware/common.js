import express from 'express';

/**
 * Společné middleware
 */
export const setupCommonMiddleware = (app) => {
    // Parsování JSON
    app.use(express.json());
    
    // Parsování URL encoded dat
    app.use(express.urlencoded({ extended: true }));
    
    // Logging middleware (volitelné)
    app.use((req, res, next) => {
        console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
        next();
    });
};

