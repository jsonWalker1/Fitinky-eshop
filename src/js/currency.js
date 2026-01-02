/**
 * ============================================
 * CURRENCY UTILITIES
 * ============================================
 * Správa měn a přepínání currency
 * ============================================
 */

// Dostupné měny
const CURRENCIES = {
    'CZK': {
        code: 'CZK',
        symbol: 'Kč',
        name: 'Česká koruna',
        rate: 1.0 // Base currency
    },
    'EUR': {
        code: 'EUR',
        symbol: '€',
        name: 'Euro',
        rate: 24.5 // Přibližný kurz (mělo by být z API)
    },
    'USD': {
        code: 'USD',
        symbol: '$',
        name: 'US Dollar',
        rate: 22.5 // Přibližný kurz (mělo by být z API)
    }
};

// Výchozí měna
const DEFAULT_CURRENCY = 'CZK';

/**
 * Získá aktuální měnu z localStorage
 */
export function getCurrentCurrency() {
    const stored = localStorage.getItem('currency') || DEFAULT_CURRENCY;
    return CURRENCIES[stored] || CURRENCIES[DEFAULT_CURRENCY];
}

/**
 * Nastaví měnu
 */
export function setCurrency(currencyCode) {
    if (CURRENCIES[currencyCode]) {
        localStorage.setItem('currency', currencyCode);
        updateCurrencyUI();
        // Dispatch event pro aktualizaci cen na stránce
        window.dispatchEvent(new CustomEvent('currencyChanged', { detail: { currency: currencyCode } }));
        return true;
    }
    return false;
}

/**
 * Převede cenu z CZK na aktuální měnu
 */
export function convertPrice(priceInCZK) {
    const current = getCurrentCurrency();
    const converted = priceInCZK * current.rate;
    return converted;
}

/**
 * Formátuje cenu s měnou
 */
export function formatPrice(priceInCZK) {
    const current = getCurrentCurrency();
    const converted = convertPrice(priceInCZK);
    
    if (current.code === 'CZK') {
        return `${converted.toFixed(2)} ${current.symbol}`;
    } else {
        return `${current.symbol}${converted.toFixed(2)}`;
    }
}

/**
 * Aktualizuje UI currency selectoru
 */
export function updateCurrencyUI() {
    const current = getCurrentCurrency();
    const currencyTexts = document.querySelectorAll('.currency-text');
    const currencySelectors = document.querySelectorAll('.currency-option');
    
    currencyTexts.forEach(el => {
        el.textContent = current.code;
    });
    
    currencySelectors.forEach(el => {
        if (el.dataset.currency === current.code) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    });
    
    // Update all prices on the page
    updateAllPrices();
}

/**
 * Aktualizuje všechny ceny na stránce
 */
function updateAllPrices() {
    document.querySelectorAll('[data-price]').forEach(el => {
        const price = parseFloat(el.dataset.price);
        if (!isNaN(price)) {
            el.textContent = formatPrice(price);
        }
    });
}

/**
 * Inicializuje currency selector
 */
export function initCurrencySelector() {
    const currencyMenu = document.querySelector('.currency-menu');
    const currencyIcon = document.querySelector('.currency-icon');
    
    if (!currencyMenu || !currencyIcon) return;
    
    // Toggle menu při kliknutí
    currencyIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        currencyMenu.classList.toggle('show');
    });
    
    // Zavřít menu při kliknutí mimo
    document.addEventListener('click', () => {
        currencyMenu.classList.remove('show');
    });
    
    // Zavřít menu při kliknutí na možnost
    currencyMenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    // Přepnutí měny - přidáme listenery pro všechny currency menu na stránce
    document.querySelectorAll('.currency-menu .currency-option').forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const currencyCode = option.dataset.currency;
            if (currencyCode) {
                setCurrency(currencyCode);
                const menu = option.closest('.currency-menu');
                if (menu) {
                    menu.classList.remove('show');
                }
            }
        });
    });
    
    // Aktualizovat UI
    updateCurrencyUI();
}

// Inicializace při načtení
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        initCurrencySelector();
        updateCurrencyUI();
    });
}

