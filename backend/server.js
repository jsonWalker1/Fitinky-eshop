/**
 * ============================================
 * MAIN SERVER
 * ============================================
 * Hlavní server pro veřejné rozhraní
 * Admin server běží samostatně na jiném portu
 * 
 * Port: 3001 (nebo PORT env variable)
 * ============================================
 */

import express from 'express';
import { config } from './config/server.js';
import { setupCommonMiddleware } from './middleware/common.js';
import { setupStaticFiles } from './middleware/staticFiles.js';
import indexRoutes from './routes/indexRoutes.js';
import healthRoutes from './routes/healthRoutes.js';
import productsRoutes from './routes/productsRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import userAuthRoutes from './routes/userAuthRoutes.js';
import checkoutRoutes from './routes/checkoutRoutes.js';
import ordersRoutes from './routes/ordersRoutes.js';

const app = express();

// Společné middleware
setupCommonMiddleware(app);

// Statické soubory
setupStaticFiles(app);

// Veřejné routy (bez admin)
app.use('/', indexRoutes);
app.use('/', healthRoutes);
app.use('/', productsRoutes);
app.use('/', cartRoutes);
app.use('/', userAuthRoutes);
app.use('/', checkoutRoutes);
app.use('/', ordersRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint nenalezen'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Chyba:', err);
    res.status(500).json({
        success: false,
        error: 'Interní chyba serveru'
    });
});

// Spuštění hlavního serveru
app.listen(config.port, () => {
    console.log(`\n🚀 Hlavní server běží na http://localhost:${config.port}`);
    console.log(`📄 Index stránka: http://localhost:${config.port}/`);
    console.log(`🔌 API endpoint: http://localhost:${config.port}/api/index`);
    console.log(`❤️  Health check: http://localhost:${config.port}/health`);
    console.log(`🌍 Environment: ${config.env}`);
    console.log(`\n💡 Admin server běží samostatně na portu 3002\n`);
});
