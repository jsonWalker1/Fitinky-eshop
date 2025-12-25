// Konfigurace admin serveru

export const adminConfig = {
    port: process.env.ADMIN_PORT || 3002,
    env: process.env.NODE_ENV || 'development',
};

