/**
 * ============================================
 * CALCULATORS LOGIC
 * ============================================
 * JavaScript pro kalkulačky (hmotnosti, tlaky, převody)
 * ============================================
 */

// Výpočet hmotnosti trubky
function calculatePipeWeight() {
    const diameter = parseFloat(document.getElementById('pipeDiameter').value);
    const thickness = parseFloat(document.getElementById('pipeThickness').value);
    const length = parseFloat(document.getElementById('pipeLength').value);
    const density = parseFloat(document.getElementById('pipeDensity').value) || 7850;
    
    const resultDiv = document.getElementById('pipeResult');
    
    if (!diameter || !thickness || !length) {
        resultDiv.innerHTML = '<div class="error">Vyplňte prosím všechny hodnoty.</div>';
        return;
    }
    
    if (thickness >= diameter / 2) {
        resultDiv.innerHTML = '<div class="error">Tloušťka stěny musí být menší než polovina průměru.</div>';
        return;
    }
    
    // Vnitřní průměr
    const innerDiameter = diameter - 2 * thickness;
    
    // Plocha průřezu (kruhová trubka)
    const outerArea = Math.PI * Math.pow(diameter / 2 / 1000, 2);
    const innerArea = Math.PI * Math.pow(innerDiameter / 2 / 1000, 2);
    const crossSectionArea = outerArea - innerArea; // m²
    
    // Objem v m³
    const volume = crossSectionArea * length; // m³
    
    // Hmotnost
    const weight = volume * density; // kg
    
    resultDiv.innerHTML = `
        <div class="result-success">
            <h3>Výsledek:</h3>
            <p><strong>Hmotnost:</strong> ${weight.toFixed(2)} kg</p>
            <p><strong>Objem:</strong> ${(volume * 1000).toFixed(4)} l</p>
            <p><strong>Průřez:</strong> ${(crossSectionArea * 1000000).toFixed(2)} mm²</p>
        </div>
    `;
}

// Výpočet hmotnosti plechu
function calculateSheetWeight() {
    const length = parseFloat(document.getElementById('sheetLength').value);
    const width = parseFloat(document.getElementById('sheetWidth').value);
    const thickness = parseFloat(document.getElementById('sheetThickness').value);
    const density = parseFloat(document.getElementById('sheetDensity').value) || 7850;
    
    const resultDiv = document.getElementById('sheetResult');
    
    if (!length || !width || !thickness) {
        resultDiv.innerHTML = '<div class="error">Vyplňte prosím všechny hodnoty.</div>';
        return;
    }
    
    // Objem v m³
    const volume = (length / 1000) * (width / 1000) * (thickness / 1000); // m³
    
    // Hmotnost
    const weight = volume * density; // kg
    
    resultDiv.innerHTML = `
        <div class="result-success">
            <h3>Výsledek:</h3>
            <p><strong>Hmotnost:</strong> ${weight.toFixed(2)} kg</p>
            <p><strong>Objem:</strong> ${(volume * 1000000).toFixed(2)} cm³</p>
            <p><strong>Plocha:</strong> ${((length * width) / 1000000).toFixed(2)} m²</p>
        </div>
    `;
}

// Výpočet tlaku v potrubí
function calculatePressure() {
    const diameter = parseFloat(document.getElementById('pressureDiameter').value);
    const flow = parseFloat(document.getElementById('pressureFlow').value);
    const viscosity = parseFloat(document.getElementById('pressureViscosity').value) || 0.001;
    const length = parseFloat(document.getElementById('pressureLength').value);
    
    const resultDiv = document.getElementById('pressureResult');
    
    if (!diameter || !flow || !length) {
        resultDiv.innerHTML = '<div class="error">Vyplňte prosím všechny hodnoty.</div>';
        return;
    }
    
    // Průměr v metrech
    const diameterM = diameter / 1000;
    
    // Průřez potrubí
    const area = Math.PI * Math.pow(diameterM / 2, 2); // m²
    
    // Rychlost proudění (m/s)
    const flowM3s = flow / 1000 / 60; // l/min -> m³/s
    const velocity = flowM3s / area; // m/s
    
    // Reynoldsovo číslo
    const rho = 1000; // hustota vody kg/m³
    const reynolds = (rho * velocity * diameterM) / viscosity;
    
    // Součinitel tření (Darcy-Weisbach, zjednodušeně)
    let frictionFactor;
    if (reynolds < 2300) {
        // Laminární proudění
        frictionFactor = 64 / reynolds;
    } else {
        // Turbulentní proudění (Blasius)
        frictionFactor = 0.316 / Math.pow(reynolds, 0.25);
    }
    
    // Tlaková ztráta (Pa)
    const pressureLoss = frictionFactor * (length / diameterM) * (rho * Math.pow(velocity, 2) / 2);
    
    // Převod na bar
    const pressureBar = pressureLoss / 100000;
    
    resultDiv.innerHTML = `
        <div class="result-success">
            <h3>Výsledek:</h3>
            <p><strong>Tlaková ztráta:</strong> ${pressureBar.toFixed(4)} bar</p>
            <p><strong>Tlaková ztráta:</strong> ${(pressureLoss / 1000).toFixed(2)} kPa</p>
            <p><strong>Rychlost proudění:</strong> ${velocity.toFixed(2)} m/s</p>
            <p><strong>Reynoldsovo číslo:</strong> ${reynolds.toFixed(0)}</p>
            <p><small>${reynolds < 2300 ? 'Laminární proudění' : 'Turbulentní proudění'}</small></p>
        </div>
    `;
}

// Převod jednotek
function convertUnits() {
    const value = parseFloat(document.getElementById('convertValue').value);
    const from = document.getElementById('convertFrom').value;
    const to = document.getElementById('convertTo').value;
    
    const resultDiv = document.getElementById('convertResult');
    
    if (!value) {
        resultDiv.innerHTML = '<div class="error">Zadejte hodnotu k převodu.</div>';
        return;
    }
    
    if (from === to) {
        resultDiv.innerHTML = '<div class="error">Vyberte různé jednotky.</div>';
        return;
    }
    
    // Převodní faktory
    const conversions = {
        // Délka
        'mm': { 'cm': 0.1, 'm': 0.001 },
        'cm': { 'mm': 10, 'm': 0.01 },
        'm': { 'mm': 1000, 'cm': 100 },
        // Hmotnost
        'kg': { 'g': 1000 },
        'g': { 'kg': 0.001 },
        // Tlak
        'bar': { 'psi': 14.504, 'kpa': 100 },
        'psi': { 'bar': 0.069, 'kpa': 6.895 },
        'kpa': { 'bar': 0.01, 'psi': 0.145 }
    };
    
    let result;
    
    // Kontrola, jestli jsou jednotky stejného typu
    const lengthUnits = ['mm', 'cm', 'm'];
    const weightUnits = ['kg', 'g'];
    const pressureUnits = ['bar', 'psi', 'kpa'];
    
    if (lengthUnits.includes(from) && lengthUnits.includes(to)) {
        // Převod přes metry
        let inMeters = value;
        if (from === 'mm') inMeters = value / 1000;
        else if (from === 'cm') inMeters = value / 100;
        
        if (to === 'mm') result = inMeters * 1000;
        else if (to === 'cm') result = inMeters * 100;
        else result = inMeters;
    } else if (weightUnits.includes(from) && weightUnits.includes(to)) {
        if (from === 'kg') result = value * 1000;
        else result = value / 1000;
    } else if (pressureUnits.includes(from) && pressureUnits.includes(to)) {
        if (conversions[from] && conversions[from][to]) {
            result = value * conversions[from][to];
        } else {
            // Převod přes bar
            let inBar = value;
            if (from === 'psi') inBar = value * 0.069;
            else if (from === 'kpa') inBar = value * 0.01;
            
            if (to === 'psi') result = inBar * 14.504;
            else if (to === 'kpa') result = inBar * 100;
            else result = inBar;
        }
    } else {
        resultDiv.innerHTML = '<div class="error">Nelze převádět mezi různými typy jednotek.</div>';
        return;
    }
    
    resultDiv.innerHTML = `
        <div class="result-success">
            <h3>Výsledek:</h3>
            <p><strong>${value} ${from}</strong> = <strong>${result.toFixed(4)} ${to}</strong></p>
        </div>
    `;
}


