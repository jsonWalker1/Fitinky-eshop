/**
 * ============================================
 * PRISMA CLIENT
 * ============================================
 * Singleton instance Prisma Client
 * Používej tento soubor pro import prisma clientu
 * ============================================
 */

import { PrismaClient } from '@prisma/client';

// Singleton pattern - jedna instance pro celou aplikaci
const prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development' 
        ? ['query', 'error', 'warn'] 
        : ['error'],
});

// Graceful shutdown
process.on('beforeExit', async () => {
    await prisma.$disconnect();
});

export default prisma;

