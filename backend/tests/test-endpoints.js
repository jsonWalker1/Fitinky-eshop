/**
 * Testovací skript pro endpointy
 * Spustit: node backend/tests/test-endpoints.js
 */

const BASE_URL = 'http://localhost:3001';

async function testEndpoint(name, url, expectedStatus = 200) {
    try {
        const response = await fetch(url);
        const status = response.status;
        const isOk = status === expectedStatus;
        
        console.log(`${isOk ? '✅' : '❌'} ${name}`);
        console.log(`   URL: ${url}`);
        console.log(`   Status: ${status} (očekáváno: ${expectedStatus})`);
        
        if (isOk) {
            const contentType = response.headers.get('content-type');
            console.log(`   Content-Type: ${contentType}`);
            
            if (contentType?.includes('application/json')) {
                const data = await response.json();
                console.log(`   Response: ${JSON.stringify(data).substring(0, 100)}...`);
            } else if (contentType?.includes('text/html')) {
                const text = await response.text();
                console.log(`   Response: ${text.substring(0, 100)}...`);
            }
        }
        
        console.log('');
        return isOk;
    } catch (error) {
        console.log(`❌ ${name}`);
        console.log(`   Chyba: ${error.message}`);
        console.log('');
        return false;
    }
}

async function runTests() {
    console.log('🧪 Spouštím testy endpointů...\n');
    console.log('='.repeat(50));
    console.log('');
    
    const results = [];
    
    // Test health endpoint
    results.push(await testEndpoint(
        'Health Check',
        `${BASE_URL}/health`,
        200
    ));
    
    // Test GET / (index.html jako HTML)
    results.push(await testEndpoint(
        'GET / (Index HTML)',
        `${BASE_URL}/`,
        200
    ));
    
    // Test GET /api/index (index.html jako JSON)
    results.push(await testEndpoint(
        'GET /api/index (Index JSON)',
        `${BASE_URL}/api/index`,
        200
    ));
    
    // Test 404
    results.push(await testEndpoint(
        'GET /nonexistent (404)',
        `${BASE_URL}/nonexistent`,
        404
    ));
    
    console.log('='.repeat(50));
    console.log('');
    
    const passed = results.filter(r => r).length;
    const total = results.length;
    
    console.log(`📊 Výsledky: ${passed}/${total} testů prošlo`);
    
    if (passed === total) {
        console.log('✅ Všechny testy prošly!');
        process.exit(0);
    } else {
        console.log('❌ Některé testy selhaly!');
        process.exit(1);
    }
}

// Zkontrolovat, jestli server běží
fetch(`${BASE_URL}/health`)
    .then(() => {
        runTests();
    })
    .catch(() => {
        console.error('❌ Server neběží na', BASE_URL);
        console.error('Spusť server pomocí: npm run server');
        process.exit(1);
    });

