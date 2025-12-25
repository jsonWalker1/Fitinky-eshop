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

// Kontrola DATABASE_URL
const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!connectionString) {
    console.error('❌ CHYBA: DATABASE_URL není nastavená!');
    console.error('💡 Nastav DATABASE_URL jako environment variable na Railway.');
    console.error('💡 Nebo lokálně: export DATABASE_URL="postgresql://..."');
    // Neexitujeme, aby aplikace mohla zobrazit lepší chybovou hlášku
}

// Connection pool pro efektivní správu připojení
const pool = new Pool({
    connectionString: connectionString,
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
    if (!connectionString) {
        console.error('💡 Zkontroluj, že DATABASE_URL je nastavená na Railway!');
    }
    // Neexitujeme, aby aplikace mohla zobrazit chybovou hlášku
});

export default pool;

