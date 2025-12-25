/**
 * ============================================
 * PRODUCTS PAGE LOGIC
 * ============================================
 * JavaScript pro stránku s produkty a kategoriemi
 * ============================================
 */

import { isAuthenticated, getUserId } from './auth.js';

const API_BASE = '/api';

// Načtení kategorií a jejich zobrazení
async function loadCategories() {
    try {
        const response = await fetch(`${API_BASE}/categories`);
        const data = await response.json();
        
        if (data.success) {
            displayCategories(data.categories);
        } else {
            showError('Chyba při načítání kategorií');
        }
    } catch (error) {
        console.error('Chyba:', error);
        showError('Chyba připojení k serveru');
    }
}

// Zobrazení kategorií
function displayCategories(categories) {
    const grid = document.getElementById('categoriesGrid');
    
    if (categories.length === 0) {
        grid.innerHTML = '<p>Žádné kategorie k dispozici.</p>';
        return;
    }
    
    grid.innerHTML = categories.map(category => `
        <div class="category-card" data-slug="${category.slug}">
            <div class="category-image">
                <img src="${category.image || '/assets/pic/trubka.webp'}" alt="${category.name}">
            </div>
            <div class="category-info">
                <h3>${category.name}</h3>
                <p>${category.description}</p>
                <div class="category-count">${category.productCount || 0} produktů</div>
                <button class="btn btn-primary" onclick="loadCategoryProducts('${category.slug}')">
                    Zobrazit produkty
                </button>
            </div>
        </div>
    `).join('');
}

// Načtení produktů podle kategorie
window.loadCategoryProducts = async function(slug) {
    try {
        // Skrýt kategorie, zobrazit produkty
        document.getElementById('categoriesGrid').style.display = 'none';
        document.getElementById('productsContainer').classList.add('visible');
        
        // Načíst kategorii pro název
        const categoryResponse = await fetch(`${API_BASE}/categories/${slug}`);
        const categoryData = await categoryResponse.json();
        
        if (categoryData.success) {
            document.getElementById('categoryTitle').textContent = categoryData.category.name;
        }
        
        // Načíst produkty
        const productsResponse = await fetch(`${API_BASE}/products?category=${slug}`);
        const productsData = await productsResponse.json();
        
        if (productsData.success) {
            displayProducts(productsData.products);
        } else {
            showError('Chyba při načítání produktů');
        }
    } catch (error) {
        console.error('Chyba:', error);
        showError('Chyba připojení k serveru');
    }
};

// Zobrazení produktů
function displayProducts(products) {
    const grid = document.getElementById('productsGrid');
    
    if (products.length === 0) {
        grid.innerHTML = '<p>V této kategorii nejsou žádné produkty.</p>';
        return;
    }
    
    const statusLabels = {
        'in_stock': 'Skladem',
        'on_order': 'Na objednávku',
        'out_of_stock': 'Nedostupné'
    };
    
    grid.innerHTML = products.map(product => {
        // Zpětná kompatibilita - pokud má inStock, použij to
        const status = product.availabilityStatus || (product.inStock ? 'in_stock' : 'out_of_stock');
        const isAvailable = status === 'in_stock' || status === 'on_order';
        const statusLabel = statusLabels[status] || status;
        
        return `
        <div class="product-card ${status === 'out_of_stock' ? 'product-unavailable' : ''}">
            <div class="product-image">
                <img src="${product.image || '/assets/pic/trubka.webp'}" alt="${product.name}">
                ${status !== 'in_stock' ? `<div class="product-status-badge product-status-${status}">${statusLabel}</div>` : ''}
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-description">${product.description || ''}</p>
                <div class="product-price">${(typeof product.price === 'number' ? product.price : parseFloat(product.price) || 0).toFixed(2)} Kč</div>
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
                    ${status === 'out_of_stock' ? 'Nedostupné' : status === 'on_order' ? 'Na objednávku' : 'Přidat do košíku'}
                </button>
            </div>
        </div>
    `;
    }).join('');
}

// Zpět na kategorie
window.backToCategories = function() {
    document.getElementById('categoriesGrid').style.display = 'grid';
    document.getElementById('productsContainer').classList.remove('visible');
};

// Správa množství
window.increaseQuantity = function(productId) {
    const input = document.getElementById(`quantity-${productId}`);
    const currentValue = parseInt(input.value) || 1;
    if (currentValue < 99) {
        input.value = currentValue + 1;
    }
};

window.decreaseQuantity = function(productId) {
    const input = document.getElementById(`quantity-${productId}`);
    const currentValue = parseInt(input.value) || 1;
    if (currentValue > 1) {
        input.value = currentValue - 1;
    }
};

window.validateQuantity = function(productId) {
    const input = document.getElementById(`quantity-${productId}`);
    let value = parseInt(input.value) || 1;
    if (value < 1) value = 1;
    if (value > 99) value = 99;
    input.value = value;
};

// Přidání do košíku
window.addToCart = async function(productId) {
    // Zkontrolovat přihlášení
    if (!isAuthenticated()) {
        showNotification('Pro přidání do košíku se musíte přihlásit', 'error');
        setTimeout(() => {
            window.location.href = '/login';
        }, 2000);
        return;
    }
    
    // Zkontrolovat dostupnost produktu
    const productCard = document.querySelector(`[onclick="addToCart('${productId}')"]`)?.closest('.product-card');
    if (productCard && productCard.classList.contains('product-unavailable')) {
        showNotification('Tento produkt není dostupný', 'error');
        return;
    }
    
    const quantityInput = document.getElementById(`quantity-${productId}`);
    const quantity = parseInt(quantityInput.value) || 1;
    
    if (quantity < 1 || quantity > 99) {
        showNotification('Neplatné množství', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/cart/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-User-Id': getUserId()
            },
            body: JSON.stringify({ productId, quantity })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Zobrazit notifikaci
            const message = quantity === 1 
                ? 'Produkt přidán do košíku!' 
                : `${quantity} ks produktu přidáno do košíku!`;
            showNotification(message);
            updateCartBadge();
            // Resetovat množství na 1
            quantityInput.value = 1;
        } else {
            if (data.requiresAuth) {
                showNotification('Pro přidání do košíku se musíte přihlásit', 'error');
                setTimeout(() => {
                    window.location.href = '/login';
                }, 2000);
            } else {
                showNotification('Chyba při přidávání do košíku', 'error');
            }
        }
    } catch (error) {
        console.error('Chyba:', error);
        showNotification('Chyba připojení k serveru', 'error');
    }
};

// Aktualizace badge v headeru
async function updateCartBadge() {
    try {
        const headers = {};
        if (isAuthenticated()) {
            headers['X-User-Id'] = getUserId();
        }
        
        const response = await fetch(`${API_BASE}/cart/count`, {
            headers: headers
        });
        const data = await response.json();
        
        if (data.success) {
            const badge = document.getElementById('cartBadge');
            if (badge) {
                badge.textContent = data.count;
                badge.style.display = data.count > 0 ? 'block' : 'none';
            }
        }
    } catch (error) {
        console.error('Chyba při načítání počtu:', error);
    }
}

// Zobrazení notifikace
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Zobrazení chyby
function showError(message) {
    const grid = document.getElementById('categoriesGrid');
    grid.innerHTML = `<p class="error">${message}</p>`;
}

// Načtení kategorií při načtení stránky
document.addEventListener('DOMContentLoaded', () => {
    loadCategories();
    updateCartBadge();
});

