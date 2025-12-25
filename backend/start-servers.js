/**
 * ============================================
 * START SERVERS SCRIPT
 * ============================================
 * Spustí oba servery (hlavní + admin)
 * S lepším error handlingem
 * ============================================
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const mainServer = spawn('node', [join(__dirname, 'server.js')], {
    stdio: 'inherit',
    shell: false
});

const adminServer = spawn('node', [join(__dirname, 'adminServer.js')], {
    stdio: 'inherit',
    shell: false
});

// Error handling
mainServer.on('error', (err) => {
    console.error('❌ Chyba při spuštění hlavního serveru:', err);
});

adminServer.on('error', (err) => {
    console.error('❌ Chyba při spuštění admin serveru:', err);
});

// Cleanup při ukončení
process.on('SIGINT', () => {
    console.log('\n🛑 Ukončuji servery...');
    mainServer.kill();
    adminServer.kill();
    process.exit(0);
});

process.on('SIGTERM', () => {
    mainServer.kill();
    adminServer.kill();
    process.exit(0);
});

