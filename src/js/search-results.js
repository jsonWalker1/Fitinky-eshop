/**
 * ============================================
 * SEARCH RESULTS PAGE
 * ============================================
 * Zobrazení výsledků vyhledávání
 * ============================================
 */

import { formatPrice } from './currency.js';

const API_BASE = '/api';

// Načtení výsledků při načtení stránky
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    
    if (query) {
        document.getElementById('globalSearchInput').value = query;
        loadSearchResults(query);
    } else {
        document.getElementById('searchResultsContainer').innerHTML = '<p>Zadejte prosím vyhledávací dotaz.</p>';
    }
});

/**
 * Načte výsledky vyhledávání
 */
async function loadSearchResults(query) {
    const queryElement = document.getElementById('searchQuery');
    const resultsContainer = document.getElementById('searchResultsContainer');
    
    queryElement.textContent = `Hledání: "${query}"`;
    
    try {
        const response = await fetch(`${API_BASE}/products?search=${encodeURIComponent(query)}`);
        const data = await response.json();
        
        if (data.success && data.products && data.products.length > 0) {
            displaySearchResults(data.products);
        } else {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <p>Pro dotaz "<strong>${escapeHtml(query)}</strong>" nebyly nalezeny žádné produkty.</p>
                    <a href="/products" class="btn btn-primary">Prohlédnout všechny produkty</a>
                </div>
            `;
        }
    } catch (error) {
        console.error('Chyba při vyhledávání:', error);
        resultsContainer.innerHTML = '<p class="error">Chyba při načítání výsledků. Zkuste to prosím později.</p>';
    }
}

/**
 * Zobrazí výsledky vyhledávání
 */
function displaySearchResults(products) {
    const resultsContainer = document.getElementById('searchResultsContainer');
    
    const statusLabels = {
        'in_stock': 'Skladem',
        'on_order': 'Na objednávku',
        'out_of_stock': 'Nedostupné'
    };
    
    resultsContainer.innerHTML = `
        <div class="results-count">Nalezeno ${products.length} ${products.length === 1 ? 'produkt' : products.length < 5 ? 'produkty' : 'produktů'}</div>
        <div class="products-grid" id="searchProductsGrid">
            ${products.map(product => {
                const status = product.availabilityStatus || (product.inStock ? 'in_stock' : 'out_of_stock');
                const isAvailable = status === 'in_stock' || status === 'on_order';
                const statusLabel = statusLabels[status] || status;
                
                // Zpracování obrázků
                let productImages = [];
                if (product.images && Array.isArray(product.images) && product.images.length > 0) {
                    productImages = product.images.map(img => {
                        if (typeof img === 'string') return img;
                        if (typeof img === 'object' && img.url) return img.url;
                        if (typeof img === 'object' && img.image_url) return img.image_url;
                        return null;
                    }).filter(Boolean);
                } else if (product.image) {
                    productImages = [product.image];
                }
                const mainImage = productImages.length > 0 ? productImages[0] : '/assets/pic/trubka.webp';
                
                const price = typeof product.price === 'number' ? product.price : parseFloat(product.price) || 0;
                
                return `
                    <div class="product-card ${status === 'out_of_stock' ? 'product-unavailable' : ''}" data-product-id="${product.id}">
                        <div class="product-image">
                            <img src="${mainImage}" alt="${escapeHtml(product.name)}" onerror="this.src='/assets/pic/trubka.webp'">
                            ${status !== 'in_stock' ? `<div class="product-status-badge product-status-${status}">${statusLabel}</div>` : ''}
                        </div>
                        <div class="product-info">
                            <h3>${escapeHtml(product.name)}</h3>
                            <p class="product-description">${escapeHtml(product.description || '')}</p>
                            <div class="product-price" data-price="${price}">${formatPrice(price)}</div>
                            ${status === 'in_stock' ? `<div class="product-availability product-available">✓ Skladem</div>` : ''}
                            ${status === 'on_order' ? `<div class="product-availability product-on-order">⏱ Na objednávku</div>` : ''}
                            ${status === 'out_of_stock' ? `<div class="product-availability product-out-of-stock">✗ Nedostupné</div>` : ''}
                            <div class="product-quantity">
                                <label for="quantity-${product.id}">Množství:</label>
                                <div class="quantity-controls">
                                    <button class="quantity-btn" type="button" onclick="decreaseQuantity('${product.id}')" ${!isAvailable ? 'disabled' : ''}>-</button>
                                    <input type="number" id="quantity-${product.id}" value="1" min="1" max="99" 
                                           onchange="validateQuantity('${product.id}')" ${!isAvailable ? 'disabled' : ''}>
                                    <button class="quantity-btn" type="button" onclick="increaseQuantity('${product.id}')" ${!isAvailable ? 'disabled' : ''}>+</button>
                                </div>
                            </div>
                            <button class="btn btn-primary" onclick="addToCart('${product.id}')" ${!isAvailable ? 'disabled' : ''}>
                                ${isAvailable ? 'Přidat do košíku' : 'Nedostupné'}
                            </button>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

/**
 * Escape HTML
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Import funkcí z products.js (pokud existují)
if (typeof window.addToCart === 'undefined') {
    window.addToCart = async function(productId) {
        const quantity = parseInt(document.getElementById(`quantity-${productId}`).value) || 1;
        // Přesměrovat na products stránku s přidáním do košíku
        window.location.href = `/products?addToCart=${productId}&quantity=${quantity}`;
    };
}

if (typeof window.decreaseQuantity === 'undefined') {
    window.decreaseQuantity = function(productId) {
        const input = document.getElementById(`quantity-${productId}`);
        const current = parseInt(input.value) || 1;
        if (current > 1) {
            input.value = current - 1;
        }
    };
}

if (typeof window.increaseQuantity === 'undefined') {
    window.increaseQuantity = function(productId) {
        const input = document.getElementById(`quantity-${productId}`);
        const current = parseInt(input.value) || 1;
        if (current < 99) {
            input.value = current + 1;
        }
    };
}

if (typeof window.validateQuantity === 'undefined') {
    window.validateQuantity = function(productId) {
        const input = document.getElementById(`quantity-${productId}`);
        let value = parseInt(input.value) || 1;
        if (value < 1) value = 1;
        if (value > 99) value = 99;
        input.value = value;
    };
}


