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
    const density = getDensity('sheet');
    
    if (!thickness || !width || !length) {
        alert('Vyplňte prosím všechny hodnoty.');
        return;
    }
    
    // Hmotnost na m²
    const weightPerM2 = thickness * density; // kg/m²
    
    // Celková hmotnost
    const totalWeight = weightPerM2 * width * length; // kg
    
    document.getElementById('sheetWeightPerM2').value = weightPerM2.toFixed(2) + ' kg/m²';
    document.getElementById('sheetTotalWeight').value = totalWeight.toFixed(2) + ' kg';
}

// Výpočet hmotnosti trubky
function calculatePipe() {
    const outerDiameter = parseFloat(document.getElementById('pipeOuterDiameter').value) / 1000; // mm -> m
    const wallThickness = parseFloat(document.getElementById('pipeWallThickness').value) / 1000; // mm -> m
    const length = parseFloat(document.getElementById('pipeLength').value); // m
    const density = getDensity('pipe');
    
    if (!outerDiameter || !wallThickness || !length) {
        alert('Vyplňte prosím všechny hodnoty.');
        return;
    }
    
    if (wallThickness >= outerDiameter / 2) {
        alert('Tloušťka stěny musí být menší než polovina průměru.');
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
    
    document.getElementById('pipeWeightPerM').value = weightPerM.toFixed(2) + ' kg/m';
    document.getElementById('pipeTotalWeight').value = totalWeight.toFixed(2) + ' kg';
}

// Výpočet hmotnosti jeklu (hollow square)
function calculateHollow() {
    const longSide = parseFloat(document.getElementById('hollowLongSide').value) / 1000; // mm -> m
    const shortSide = parseFloat(document.getElementById('hollowShortSide').value) / 1000; // mm -> m
    const thickness = parseFloat(document.getElementById('hollowThickness').value) / 1000; // mm -> m
    const length = parseFloat(document.getElementById('hollowLength').value); // m
    const density = getDensity('hollow');
    
    if (!longSide || !shortSide || !thickness || !length) {
        alert('Vyplňte prosím všechny hodnoty.');
        return;
    }
    
    if (thickness >= Math.min(longSide, shortSide) / 2) {
        alert('Tloušťka musí být menší než polovina kratší strany.');
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
    
    document.getElementById('hollowWeightPerM').value = weightPerM.toFixed(2) + ' kg/m';
    document.getElementById('hollowTotalWeight').value = totalWeight.toFixed(2) + ' kg';
}

// Výpočet hmotnosti kulatiny
function calculateRound() {
    const diameter = parseFloat(document.getElementById('roundDiameter').value) / 1000; // mm -> m
    const length = parseFloat(document.getElementById('roundLength').value); // m
    const density = getDensity('round');
    
    if (!diameter || !length) {
        alert('Vyplňte prosím všechny hodnoty.');
        return;
    }
    
    // Plocha průřezu
    const crossSectionArea = Math.PI * Math.pow(diameter / 2, 2); // m²
    
    // Hmotnost na m
    const weightPerM = crossSectionArea * density; // kg/m
    
    // Celková hmotnost
    const totalWeight = weightPerM * length; // kg
    
    document.getElementById('roundWeightPerM').value = weightPerM.toFixed(2) + ' kg/m';
    document.getElementById('roundTotalWeight').value = totalWeight.toFixed(2) + ' kg';
}

// Výpočet hmotnosti ploché tyče
function calculateFlat() {
    const width = parseFloat(document.getElementById('flatWidth').value) / 1000; // mm -> m
    const thickness = parseFloat(document.getElementById('flatThickness').value) / 1000; // mm -> m
    const length = parseFloat(document.getElementById('flatLength').value); // m
    const density = getDensity('flat');
    
    if (!width || !thickness || !length) {
        alert('Vyplňte prosím všechny hodnoty.');
        return;
    }
    
    // Plocha průřezu
    const crossSectionArea = width * thickness; // m²
    
    // Hmotnost na m
    const weightPerM = crossSectionArea * density; // kg/m
    
    // Celková hmotnost
    const totalWeight = weightPerM * length; // kg
    
    document.getElementById('flatWeightPerM').value = weightPerM.toFixed(2) + ' kg/m';
    document.getElementById('flatTotalWeight').value = totalWeight.toFixed(2) + ' kg';
}

// Výpočet hmotnosti čtyřhranu
function calculateSquare() {
    const side = parseFloat(document.getElementById('squareSide').value) / 1000; // mm -> m
    const length = parseFloat(document.getElementById('squareLength').value); // m
    const density = getDensity('square');
    
    if (!side || !length) {
        alert('Vyplňte prosím všechny hodnoty.');
        return;
    }
    
    // Plocha průřezu
    const crossSectionArea = side * side; // m²
    
    // Hmotnost na m
    const weightPerM = crossSectionArea * density; // kg/m
    
    // Celková hmotnost
    const totalWeight = weightPerM * length; // kg
    
    document.getElementById('squareWeightPerM').value = weightPerM.toFixed(2) + ' kg/m';
    document.getElementById('squareTotalWeight').value = totalWeight.toFixed(2) + ' kg';
}

// Výpočet hmotnosti šestihranu
function calculateHex() {
    const diameter = parseFloat(document.getElementById('hexDiameter').value) / 1000; // mm -> m (průměr přes plochy)
    const length = parseFloat(document.getElementById('hexLength').value); // m
    const density = getDensity('hex');
    
    if (!diameter || !length) {
        alert('Vyplňte prosím všechny hodnoty.');
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
    
    document.getElementById('hexWeightPerM').value = weightPerM.toFixed(2) + ' kg/m';
    document.getElementById('hexTotalWeight').value = totalWeight.toFixed(2) + ' kg';
}

// Inicializace
document.addEventListener('DOMContentLoaded', () => {
    // Všechny jakosti jsou zpočátku sbalené
    document.querySelectorAll('.grade-content').forEach(content => {
        content.classList.remove('expanded');
    });
});
