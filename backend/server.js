/**
 * ============================================
 * MAIN SERVER
 * ============================================
 * Hlavní server pro veřejné rozhraní + Admin rozhraní
 * Vše běží na jednom portu
 * 
 * Port: 3001 (nebo PORT env variable)
 * ============================================
 */

import express from 'express';
import { config } from './config/server.js';
import { setupCommonMiddleware } from './middleware/common.js';
import { setupStaticFiles } from './middleware/staticFiles.js';
import { assetsHandler } from './middleware/assetsHandler.js';
import indexRoutes from './routes/indexRoutes.js';
import healthRoutes from './routes/healthRoutes.js';
import productsRoutes from './routes/productsRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import userAuthRoutes from './routes/userAuthRoutes.js';
import checkoutRoutes from './routes/checkoutRoutes.js';
import ordersRoutes from './routes/ordersRoutes.js';
// Admin routy
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import adminUsersRoutes from './routes/adminUsersRoutes.js';
import adminOrdersRoutes from './routes/adminOrdersRoutes.js';

const app = express();

// Společné middleware
setupCommonMiddleware(app);

// Assets handler (před static files, aby mohl zachytit chybějící soubory)
app.use(assetsHandler);

// Statické soubory
setupStaticFiles(app);

// Veřejné routy
app.use('/', indexRoutes);
app.use('/', healthRoutes);
app.use('/', productsRoutes);
app.use('/', cartRoutes);
app.use('/', userAuthRoutes);
app.use('/', checkoutRoutes);
app.use('/', ordersRoutes);

// Admin routy (dostupné na /admin/*)
app.use('/', authRoutes);
app.use('/', adminRoutes);
app.use('/', adminUsersRoutes);
app.use('/', adminOrdersRoutes);

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

// Spuštění serveru
app.listen(config.port, () => {
    console.log(`\n🚀 Server běží na http://localhost:${config.port}`);
    console.log(`📄 Index stránka: http://localhost:${config.port}/`);
    console.log(`🔌 API endpoint: http://localhost:${config.port}/api/index`);
    console.log(`❤️  Health check: http://localhost:${config.port}/health`);
    console.log(`🔐 Admin login: http://localhost:${config.port}/admin/login`);
    console.log(`📊 Admin dashboard: http://localhost:${config.port}/admin/dashboard`);
    console.log(`🌍 Environment: ${config.env}\n`);
});
