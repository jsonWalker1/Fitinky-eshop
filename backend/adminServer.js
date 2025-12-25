/**
 * ============================================
 * ADMIN SERVER
 * ============================================
 * Samostatný server pro admin rozhraní
 * Běží na jiném portu než hlavní server
 * 
 * Port: 3002 (nebo ADMIN_PORT env variable)
 * ============================================
 */

import express from 'express';
import { adminConfig } from './config/adminServer.js';
import { setupCommonMiddleware } from './middleware/common.js';
import { setupStaticFiles } from './middleware/staticFiles.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import adminUsersRoutes from './routes/adminUsersRoutes.js';
import adminOrdersRoutes from './routes/adminOrdersRoutes.js';

const app = express();

// Společné middleware
setupCommonMiddleware(app);

// Statické soubory (pro admin CSS a assets)
setupStaticFiles(app);

// Admin routy (pouze auth a admin)
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
    console.error('Admin server - Chyba:', err);
    res.status(500).json({
        success: false,
        error: 'Interní chyba serveru'
    });
});

// Spuštění admin serveru
app.listen(adminConfig.port, () => {
    console.log(`\n🔐 Admin server běží na http://localhost:${adminConfig.port}`);
    console.log(`📄 Admin login: http://localhost:${adminConfig.port}/admin`);
    console.log(`📊 Admin dashboard: http://localhost:${adminConfig.port}/admin/dashboard`);
    console.log(`🔑 Auth endpoint: http://localhost:${adminConfig.port}/admin/api/auth/login`);
    console.log(`🌍 Environment: ${adminConfig.env}\n`);
});

