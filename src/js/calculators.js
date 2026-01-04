/**
 * ============================================
 * CALCULATORS LOGIC
 * ============================================
 * JavaScript pro kalkulačky nerezových materiálů
 * ============================================
 */

// Toggle jakosti materiálu
function toggleGrade(gradeId) {
    const content = document.getElementById(gradeId);
    const header = content.closest('.grade-row').querySelector('.grade-header');
    const expandIcon = header.querySelector('.expand-icon');
    
    if (content) {
        const isExpanded = content.classList.contains('expanded');
        
        if (isExpanded) {
            content.classList.remove('expanded');
            expandIcon.style.transform = 'rotate(0deg)';
        } else {
            // Zavřít ostatní jakosti
            document.querySelectorAll('.grade-content').forEach(gc => {
                gc.classList.remove('expanded');
            });
            document.querySelectorAll('.expand-icon').forEach(icon => {
                icon.style.transform = 'rotate(0deg)';
            });
            
            // Otevřít tuto jakost
            content.classList.add('expanded');
            expandIcon.style.transform = 'rotate(180deg)';
        }
    }
}

// Získání hustoty z selectu
function getDensity(calcType) {
    const select = document.querySelector(`.grade-select[data-calc="${calcType}"]`);
    return parseFloat(select.value) || 7930;
}

// Výpočet hmotnosti plechu
function calculateSheet() {
    const thickness = parseFloat(document.getElementById('sheetThickness').value) / 1000; // mm -> m
    const width = parseFloat(document.getElementById('sheetWidth').value) / 1000; // mm -> m
    const length = parseFloat(document.getElementById('sheetLength').value) / 1000; // mm -> m
    const density = 7930; // Default density (AISI 304)
    
    if (!thickness || !width || !length) {
        document.getElementById('sheetWeightPerM').value = '';
        document.getElementById('sheetTotalWeight').value = '';
        return;
    }
    
    // Hmotnost na m (pro šířku 1m)
    const weightPerM = thickness * width * density; // kg/m
    
    // Celková hmotnost
    const totalWeight = weightPerM * length; // kg
    
    document.getElementById('sheetWeightPerM').value = weightPerM.toFixed(2);
    document.getElementById('sheetTotalWeight').value = totalWeight.toFixed(2);
}

// Výpočet hmotnosti trubky
function calculatePipe() {
    const outerDiameter = parseFloat(document.getElementById('pipeOuterDiameter').value) / 1000; // mm -> m
    const wallThickness = parseFloat(document.getElementById('pipeWallThickness').value) / 1000; // mm -> m
    const length = parseFloat(document.getElementById('pipeLength').value); // m
    const density = 7930; // Default density (AISI 304)
    
    if (!outerDiameter || !wallThickness || !length) {
        document.getElementById('pipeWeightPerM').value = '';
        document.getElementById('pipeTotalWeight').value = '';
        return;
    }
    
    if (wallThickness >= outerDiameter / 2) {
        document.getElementById('pipeWeightPerM').value = '';
        document.getElementById('pipeTotalWeight').value = '';
        return;
    }
    
    const innerDiameter = outerDiameter - 2 * wallThickness;
    
    // Plocha průřezu
    const outerArea = Math.PI * Math.pow(outerDiameter / 2, 2);
    const innerArea = Math.PI * Math.pow(innerDiameter / 2, 2);
    const crossSectionArea = outerArea - innerArea; // m²
    
    // Hmotnost na m
    const weightPerM = crossSectionArea * density; // kg/m
    
    // Celková hmotnost
    const totalWeight = weightPerM * length; // kg
    
    document.getElementById('pipeWeightPerM').value = weightPerM.toFixed(2);
    document.getElementById('pipeTotalWeight').value = totalWeight.toFixed(2);
}

// Výpočet hmotnosti jeklu (hollow square)
function calculateHollow() {
    const longSide = parseFloat(document.getElementById('hollowLongSide').value) / 1000; // mm -> m
    const shortSide = parseFloat(document.getElementById('hollowShortSide').value) / 1000; // mm -> m
    const thickness = parseFloat(document.getElementById('hollowThickness').value) / 1000; // mm -> m
    const length = parseFloat(document.getElementById('hollowLength').value); // m
    const density = 7930; // Default density (AISI 304)
    
    if (!longSide || !shortSide || !thickness || !length) {
        document.getElementById('hollowWeightPerM').value = '';
        document.getElementById('hollowTotalWeight').value = '';
        return;
    }
    
    if (thickness >= Math.min(longSide, shortSide) / 2) {
        document.getElementById('hollowWeightPerM').value = '';
        document.getElementById('hollowTotalWeight').value = '';
        return;
    }
    
    // Vnější a vnitřní rozměry
    const outerArea = longSide * shortSide;
    const innerLong = longSide - 2 * thickness;
    const innerShort = shortSide - 2 * thickness;
    const innerArea = innerLong * innerShort;
    const crossSectionArea = outerArea - innerArea; // m²
    
    // Hmotnost na m
    const weightPerM = crossSectionArea * density; // kg/m
    
    // Celková hmotnost
    const totalWeight = weightPerM * length; // kg
    
    document.getElementById('hollowWeightPerM').value = weightPerM.toFixed(2);
    document.getElementById('hollowTotalWeight').value = totalWeight.toFixed(2);
}

// Výpočet hmotnosti kulatiny
function calculateRound() {
    const diameter = parseFloat(document.getElementById('roundDiameter').value) / 1000; // mm -> m
    const length = parseFloat(document.getElementById('roundLength').value); // m
    const density = 7930; // Default density (AISI 304)
    
    if (!diameter || !length) {
        document.getElementById('roundWeightPerM').value = '';
        document.getElementById('roundTotalWeight').value = '';
        return;
    }
    
    // Plocha průřezu
    const crossSectionArea = Math.PI * Math.pow(diameter / 2, 2); // m²
    
    // Hmotnost na m
    const weightPerM = crossSectionArea * density; // kg/m
    
    // Celková hmotnost
    const totalWeight = weightPerM * length; // kg
    
    document.getElementById('roundWeightPerM').value = weightPerM.toFixed(2);
    document.getElementById('roundTotalWeight').value = totalWeight.toFixed(2);
}

// Výpočet hmotnosti ploché tyče
function calculateFlat() {
    const width = parseFloat(document.getElementById('flatWidth').value) / 1000; // mm -> m
    const thickness = parseFloat(document.getElementById('flatThickness').value) / 1000; // mm -> m
    const length = parseFloat(document.getElementById('flatLength').value); // m
    const density = 7930; // Default density (AISI 304)
    
    if (!width || !thickness || !length) {
        document.getElementById('flatWeightPerM').value = '';
        document.getElementById('flatTotalWeight').value = '';
        return;
    }
    
    // Plocha průřezu
    const crossSectionArea = width * thickness; // m²
    
    // Hmotnost na m
    const weightPerM = crossSectionArea * density; // kg/m
    
    // Celková hmotnost
    const totalWeight = weightPerM * length; // kg
    
    document.getElementById('flatWeightPerM').value = weightPerM.toFixed(2);
    document.getElementById('flatTotalWeight').value = totalWeight.toFixed(2);
}

// Výpočet hmotnosti čtyřhranu
function calculateSquare() {
    const side = parseFloat(document.getElementById('squareSide').value) / 1000; // mm -> m
    const length = parseFloat(document.getElementById('squareLength').value); // m
    const density = 7930; // Default density (AISI 304)
    
    if (!side || !length) {
        document.getElementById('squareWeightPerM').value = '';
        document.getElementById('squareTotalWeight').value = '';
        return;
    }
    
    // Plocha průřezu
    const crossSectionArea = side * side; // m²
    
    // Hmotnost na m
    const weightPerM = crossSectionArea * density; // kg/m
    
    // Celková hmotnost
    const totalWeight = weightPerM * length; // kg
    
    document.getElementById('squareWeightPerM').value = weightPerM.toFixed(2);
    document.getElementById('squareTotalWeight').value = totalWeight.toFixed(2);
}

// Výpočet hmotnosti šestihranu
function calculateHex() {
    const diameter = parseFloat(document.getElementById('hexDiameter').value) / 1000; // mm -> m (průměr přes plochy)
    const length = parseFloat(document.getElementById('hexLength').value); // m
    const density = 7930; // Default density (AISI 304)
    
    if (!diameter || !length) {
        document.getElementById('hexWeightPerM').value = '';
        document.getElementById('hexTotalWeight').value = '';
        return;
    }
    
    // Strana šestihranu (průměr přes plochy = 2 * strana)
    const side = diameter / 2;
    
    // Plocha průřezu (pravidelný šestihran)
    const crossSectionArea = (3 * Math.sqrt(3) / 2) * Math.pow(side, 2); // m²
    
    // Hmotnost na m
    const weightPerM = crossSectionArea * density; // kg/m
    
    // Celková hmotnost
    const totalWeight = weightPerM * length; // kg
    
    document.getElementById('hexWeightPerM').value = weightPerM.toFixed(2);
    document.getElementById('hexTotalWeight').value = totalWeight.toFixed(2);
}

// Inicializace - automatické výpočty při změně hodnot
document.addEventListener('DOMContentLoaded', () => {
    // Všechny jakosti jsou zpočátku sbalené
    document.querySelectorAll('.grade-content').forEach(content => {
        content.classList.remove('expanded');
    });
    
    // Přidat event listenery pro automatické výpočty
    const inputs = {
        sheet: ['sheetThickness', 'sheetWidth', 'sheetLength'],
        pipe: ['pipeOuterDiameter', 'pipeWallThickness', 'pipeLength'],
        hollow: ['hollowLongSide', 'hollowShortSide', 'hollowThickness', 'hollowLength'],
        round: ['roundDiameter', 'roundLength'],
        flat: ['flatWidth', 'flatThickness', 'flatLength'],
        square: ['squareSide', 'squareLength'],
        hex: ['hexDiameter', 'hexLength']
    };
    
    // Přidat event listenery pro každou kalkulačku
    inputs.sheet.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', calculateSheet);
            input.addEventListener('change', calculateSheet);
        }
    });
    
    inputs.pipe.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', calculatePipe);
            input.addEventListener('change', calculatePipe);
        }
    });
    
    inputs.hollow.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', calculateHollow);
            input.addEventListener('change', calculateHollow);
        }
    });
    
    inputs.round.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', calculateRound);
            input.addEventListener('change', calculateRound);
        }
    });
    
    inputs.flat.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', calculateFlat);
            input.addEventListener('change', calculateFlat);
        }
    });
    
    inputs.square.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', calculateSquare);
            input.addEventListener('change', calculateSquare);
        }
    });
    
    inputs.hex.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', calculateHex);
            input.addEventListener('change', calculateHex);
        }
    });
});
