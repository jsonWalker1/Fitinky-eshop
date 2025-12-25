/**
 * ============================================
 * STOP SERVERS SCRIPT
 * ============================================
 * Zastaví všechny běžící backend servery
 * ============================================
 */

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function stopServers() {
    try {
        console.log('🛑 Zastavuji servery...');
        
        // Najít a zabít procesy
        const { stdout } = await execAsync('pgrep -f "node backend"');
        const pids = stdout.trim().split('\n').filter(pid => pid);
        
        if (pids.length === 0) {
            console.log('✅ Žádné servery neběží');
            return;
        }
        
        for (const pid of pids) {
            try {
                process.kill(parseInt(pid), 'SIGTERM');
                console.log(`✅ Server s PID ${pid} zastaven`);
            } catch (err) {
                // Proces už neběží
            }
        }
        
        // Uvolnit porty
        await execAsync('lsof -ti:3001,3002 2>/dev/null | xargs kill -9 2>/dev/null || true');
        
        console.log('✅ Všechny servery zastaveny');
    } catch (error) {
        console.log('✅ Servery zastaveny (nebo neběžely)');
    }
}

stopServers();

