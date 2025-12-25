/**
 * ============================================
 * DATABASE CONNECTION
 * ============================================
 * PostgreSQL connection pool
 * Pro produkci použije Railway DATABASE_URL
 * Pro vývoj může použít lokální PostgreSQL
 * ============================================
 */

import pkg from 'pg';
const { Pool } = pkg;

// Connection pool pro efektivní správu připojení
const pool = new Pool({
    connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL,
    ssl: process.env.NODE_ENV === 'production' 
        ? { rejectUnauthorized: false } 
        : false,
    max: 20, // maximální počet připojení v poolu
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

// Test připojení
pool.on('connect', () => {
    console.log('✅ Připojeno k PostgreSQL databázi');
});

pool.on('error', (err) => {
    console.error('❌ Neočekávaná chyba databáze:', err);
    process.exit(-1);
});

export default pool;

