/**
 * ============================================
 * CATEGORY PAGE LOGIC
 * ============================================
 * JavaScript pro stránku s kategorií a produkty
 * ============================================
 */

import { isAuthenticated, getUserId } from './auth.js';
import { formatPrice } from './currency.js';

const API_BASE = '/api';

// Získat slug kategorie z URL
function getCategorySlugFromURL() {
    const path = window.location.pathname;
    const match = path.match(/\/category\/([^\/]+)/);
    return match ? match[1] : null;
}

// Načtení kategorie a produktů
async function loadCategory() {
    const slug = getCategorySlugFromURL();
    if (!slug) {
        document.getElementById('categoryTitle').textContent = 'Kategorie nenalezena';
        document.getElementById('productsGrid').innerHTML = '<p>Kategorie nenalezena.</p>';
        return;
    }

    try {
        // Načíst kategorii
        const categoryResponse = await fetch(`${API_BASE}/categories/${slug}`);
        const categoryData = await categoryResponse.json();

        if (!categoryData.success || !categoryData.category) {
            document.getElementById('categoryTitle').textContent = 'Kategorie nenalezena';
            document.getElementById('productsGrid').innerHTML = '<p>Kategorie nenalezena.</p>';
            return;
        }

        const category = categoryData.category;

        // Zobrazit informace o kategorii
        document.getElementById('categoryTitle').textContent = category.name;
        document.title = `${category.name} - Fitinky`;
        
        if (category.description) {
            document.getElementById('categoryDescription').textContent = category.description;
        } else {
            document.getElementById('categoryDescription').style.display = 'none';
        }

        if (category.image) {
            const categoryImageDiv = document.getElementById('categoryImage');
            categoryImageDiv.innerHTML = `<img src="${category.image}" alt="${category.name}">`;
        } else {
            document.getElementById('categoryImage').style.display = 'none';
        }

        // Načíst produkty
        const productsResponse = await fetch(`${API_BASE}/products?category=${slug}`);
        const productsData = await productsResponse.json();

        if (productsData.success) {
            displayProducts(productsData.products);
            document.getElementById('productsCount').textContent = `${productsData.products.length} produktů`;
        } else {
            document.getElementById('productsGrid').innerHTML = '<p>Chyba při načítání produktů.</p>';
        }
    } catch (error) {
        console.error('Chyba:', error);
        document.getElementById('categoryTitle').textContent = 'Chyba';
        document.getElementById('productsGrid').innerHTML = '<p>Chyba připojení k serveru.</p>';
    }
}

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
        const status = product.availabilityStatus || (product.inStock ? 'in_stock' : 'out_of_stock');
        const isAvailable = status === 'in_stock' || status === 'on_order';
        const statusLabel = statusLabels[status] || status;

        // Zpracování obrázků produktu
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
        const hasGallery = productImages.length > 1;

        return `
        <div class="product-card ${status === 'out_of_stock' ? 'product-unavailable' : ''}" data-product-id="${product.id}">
            <div class="product-image ${hasGallery ? 'product-image-gallery' : ''}" ${hasGallery ? `onclick="openProductGallery('${product.id}')"` : ''} style="${hasGallery ? 'cursor: pointer;' : ''}">
                <img src="${mainImage}" alt="${product.name}">
                ${status !== 'in_stock' ? `<div class="product-status-badge product-status-${status}">${statusLabel}</div>` : ''}
                ${hasGallery ? `<div class="product-gallery-badge">
                    <span class="material-symbols-outlined">photo_library</span>
                    <span>${productImages.length}</span>
                </div>` : ''}
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-description">${product.description || ''}</p>
                <div class="product-price" data-price="${product.price}">${formatPrice(typeof product.price === 'number' ? product.price : parseFloat(product.price) || 0)}</div>
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
    if (!isAuthenticated()) {
        alert('Pro přidání do košíku se musíte přihlásit');
        setTimeout(() => {
            window.location.href = '/login';
        }, 2000);
        return;
    }

    const quantityInput = document.getElementById(`quantity-${productId}`);
    const quantity = parseInt(quantityInput.value) || 1;

    if (quantity < 1 || quantity > 99) {
        alert('Neplatné množství');
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
            alert(quantity === 1 ? 'Produkt přidán do košíku!' : `${quantity} ks produktu přidáno do košíku!`);
            updateCartBadge();
            quantityInput.value = 1;
        } else {
            alert('Chyba při přidávání do košíku');
        }
    } catch (error) {
        console.error('Chyba:', error);
        alert('Chyba připojení k serveru');
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

// Načtení kategorie při načtení stránky
document.addEventListener('DOMContentLoaded', () => {
    loadCategory();
    updateCartBadge();
});

// Listen for currency changes
window.addEventListener('currencyChanged', () => {
    document.querySelectorAll('.product-price[data-price]').forEach(el => {
        const price = parseFloat(el.dataset.price);
        if (!isNaN(price)) {
            el.textContent = formatPrice(price);
        }
    });
});

