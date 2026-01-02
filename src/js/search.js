/**
 * ============================================
 * SEARCH FUNCTIONALITY
 * ============================================
 * Globální vyhledávání produktů
 * ============================================
 */

import { formatPrice } from './currency.js';

const API_BASE = '/api';
let searchTimeout = null;

/**
 * Inicializace search bara
 */
export function initSearch() {
    const searchInput = document.getElementById('globalSearchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchInput || !searchResults) return;
    
    // Vyhledávání při psaní (s debounce)
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        
        clearTimeout(searchTimeout);
        
        if (query.length < 2) {
            searchResults.classList.remove('show');
            return;
        }
        
        searchTimeout = setTimeout(() => {
            performSearch(query, true);
        }, 300);
    });
    
    // Zavřít výsledky při kliknutí mimo
    document.addEventListener('click', (e) => {
        const searchWrapper = searchInput.closest('.search-wrapper');
        if (searchWrapper && !searchWrapper.contains(e.target)) {
            searchResults.classList.remove('show');
        }
    });
    
    // Enter pro full search
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query.length >= 2) {
                window.location.href = `/search?q=${encodeURIComponent(query)}`;
            }
        }
    });
}

/**
 * Provede vyhledávání
 */
export async function performSearch(query = null, showDropdown = false) {
    const searchInput = document.getElementById('globalSearchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchInput || !searchResults) return;
    
    const searchQuery = query || searchInput.value.trim();
    
    if (searchQuery.length < 2) {
        searchResults.classList.remove('show');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/products?search=${encodeURIComponent(searchQuery)}`);
        const data = await response.json();
        
        console.log('Search results:', data); // Debug
        
        if (data.success && data.products && Array.isArray(data.products)) {
            displaySearchResults(data.products, showDropdown);
        } else {
            showNoResults(showDropdown);
        }
    } catch (error) {
        console.error('Chyba při vyhledávání:', error);
        if (showDropdown) {
            showNoResults(true);
        }
    }
}

/**
 * Zobrazí výsledky vyhledávání
 */
function displaySearchResults(products, showDropdown) {
    const searchResults = document.getElementById('searchResults');
    if (!searchResults) {
        console.error('searchResults element not found');
        return;
    }
    
    if (!Array.isArray(products) || products.length === 0) {
        showNoResults(showDropdown);
        return;
    }
    
    // Zobrazit pouze prvních 5 výsledků v dropdownu
    const displayProducts = showDropdown ? products.slice(0, 5) : products;
    
    console.log('Displaying products:', displayProducts); // Debug
    
    searchResults.innerHTML = displayProducts.map(product => {
        // Zpracování obrázků - stejně jako v products.js
        let productImage = '/assets/pic/trubka.webp';
        if (product.images && Array.isArray(product.images) && product.images.length > 0) {
            const firstImage = product.images[0];
            if (typeof firstImage === 'string') {
                productImage = firstImage;
            } else if (typeof firstImage === 'object' && firstImage.url) {
                productImage = firstImage.url;
            } else if (typeof firstImage === 'object' && firstImage.image_url) {
                productImage = firstImage.image_url;
            }
        } else if (product.image) {
            productImage = product.image;
        }
        
        const price = typeof product.price === 'number' ? product.price : parseFloat(product.price) || 0;
        
        return `
            <div class="search-result-item" onclick="window.location.href='/products?product=${product.id}'">
                <img src="${productImage}" alt="${escapeHtml(product.name)}" onerror="this.src='/assets/pic/trubka.webp'">
                <div class="result-info">
                    <div class="result-name">${escapeHtml(product.name)}</div>
                    <div class="result-price">${formatPrice(price)}</div>
                </div>
            </div>
        `;
    }).join('');
    
    if (showDropdown) {
        searchResults.classList.add('show');
    }
}

/**
 * Zobrazí zprávu o žádných výsledcích
 */
function showNoResults(showDropdown) {
    const searchResults = document.getElementById('searchResults');
    if (!searchResults) return;
    
    searchResults.innerHTML = `
        <div class="search-no-results">
            Žádné produkty nenalezeny
        </div>
    `;
    
    if (showDropdown) {
        searchResults.classList.add('show');
    }
}

/**
 * Escape HTML
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Globální funkce pro onclick
window.performSearch = function() {
    const searchInput = document.getElementById('globalSearchInput');
    const query = searchInput ? searchInput.value.trim() : '';
    if (query.length >= 2) {
        window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
};

// Inicializace při načtení
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initSearch();
        });
    } else {
        // DOM už je načtený
        initSearch();
    }
}


