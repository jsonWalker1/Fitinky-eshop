/**
 * ============================================
 * CART PAGE LOGIC
 * ============================================
 * JavaScript pro stránku košíku
 * ============================================
 */

import { isAuthenticated, getUserId, requireAuth } from './auth.js';
import { handleLogout } from './main.js';

const API_BASE = '/api';

window.handleLogout = handleLogout;

// Zkontrolovat přihlášení při načtení stránky
document.addEventListener('DOMContentLoaded', async () => {
    if (!await requireAuth()) {
        return; // requireAuth přesměruje na login
    }
    loadCart();
    updateCartBadge();
});

// Načtení košíku
async function loadCart() {
    if (!isAuthenticated()) {
        showError('Pro zobrazení košíku se musíte přihlásit');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/cart`, {
            headers: {
                'X-User-Id': getUserId()
            }
        });
        const data = await response.json();
        
        if (data.success) {
            displayCart(data.cart);
        } else {
            if (data.requiresAuth) {
                showError('Pro zobrazení košíku se musíte přihlásit');
                setTimeout(() => {
                    window.location.href = '/login';
                }, 2000);
            } else {
                showError('Chyba při načítání košíku');
            }
        }
    } catch (error) {
        console.error('Chyba:', error);
        showError('Chyba připojení k serveru');
    }
}

// Zobrazení košíku
function displayCart(cart) {
    const emptyCart = document.getElementById('emptyCart');
    const cartContent = document.getElementById('cartContent');
    
    if (cart.items.length === 0) {
        emptyCart.classList.add('visible');
        cartContent.classList.remove('visible');
        return;
    }
    
    emptyCart.classList.remove('visible');
    cartContent.classList.add('visible');
    
    // Zobrazení produktů
    const itemsContainer = document.getElementById('cartItems');
    itemsContainer.innerHTML = cart.items.map(item => {
        // Zajistit, že price je číslo
        const price = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;
        const quantity = typeof item.quantity === 'number' ? item.quantity : parseInt(item.quantity) || 1;
        
        return `
        <div class="cart-item" data-product-id="${item.productId}">
            <div class="item-image">
                <img src="${item.image || '/assets/pic/trubka.webp'}" alt="${item.name}">
            </div>
            <div class="item-info">
                <h3>${item.name}</h3>
                <div class="item-price" data-price="${price}">${formatPrice(price)} / ks</div>
            </div>
            <div class="item-quantity">
                <button class="quantity-btn" onclick="updateQuantity('${item.productId}', ${quantity - 1})">-</button>
                <input type="number" value="${quantity}" min="1" 
                       onchange="updateQuantity('${item.productId}', parseInt(this.value))">
                <button class="quantity-btn" onclick="updateQuantity('${item.productId}', ${quantity + 1})">+</button>
            </div>
            <div class="item-total">
                <span data-price="${price * quantity}">${formatPrice(price * quantity)}</span>
            </div>
            <button class="btn-remove" onclick="removeItem('${item.productId}')">
                <span>×</span>
            </button>
        </div>
        `;
    }).join('');
    
    // Výpočet celkové ceny
    const subtotal = typeof cart.total === 'number' ? cart.total : parseFloat(cart.total) || 0;
    const vat = subtotal * 0.21;
    const total = subtotal + vat;
    
    document.getElementById('subtotal').textContent = formatPrice(subtotal);
    document.getElementById('vat').textContent = formatPrice(vat);
    document.getElementById('total').textContent = formatPrice(total);
}

// Aktualizace množství
window.updateQuantity = async function(productId, quantity) {
    if (!isAuthenticated()) {
        alert('Pro úpravu košíku se musíte přihlásit');
        window.location.href = '/login';
        return;
    }
    
    if (quantity < 1) {
        removeItem(productId);
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/cart/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-User-Id': getUserId()
            },
            body: JSON.stringify({ productId, quantity })
        });
        
        const data = await response.json();
        
        if (data.success) {
            displayCart(data.cart);
            updateCartBadge();
        }
    } catch (error) {
        console.error('Chyba:', error);
    }
};

// Odstranění produktu
window.removeItem = async function(productId) {
    if (!isAuthenticated()) {
        alert('Pro úpravu košíku se musíte přihlásit');
        window.location.href = '/login';
        return;
    }
    
    if (!confirm('Opravdu chcete odstranit tento produkt z košíku?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/cart/remove/${productId}`, {
            method: 'DELETE',
            headers: {
                'X-User-Id': getUserId()
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            displayCart(data.cart);
            updateCartBadge();
        }
    } catch (error) {
        console.error('Chyba:', error);
    }
};

// Přesměrování na checkout
document.getElementById('checkoutBtn')?.addEventListener('click', () => {
    if (!isAuthenticated()) {
        alert('Pro dokončení objednávky se musíte přihlásit');
        window.location.href = '/login';
        return;
    }
    window.location.href = '/checkout';
});

// Listen for currency changes
window.addEventListener('currencyChanged', () => {
    loadCart();
});

document.getElementById('clearCartBtn')?.addEventListener('click', async () => {
    if (!isAuthenticated()) {
        alert('Pro úpravu košíku se musíte přihlásit');
        window.location.href = '/login';
        return;
    }
    
    if (!confirm('Opravdu chcete vyprázdnit košík?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/cart/clear`, {
            method: 'DELETE',
            headers: {
                'X-User-Id': getUserId()
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            displayCart(data.cart);
            updateCartBadge();
        }
    } catch (error) {
        console.error('Chyba:', error);
    }
});

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

// Zobrazení chyby
function showError(message) {
    const container = document.querySelector('.cart-section .container');
    container.innerHTML = `<p class="error">${message}</p>`;
}

