/**
 * ============================================
 * ORDERS PAGE LOGIC
 * ============================================
 * JavaScript pro stránku s objednávkami uživatele
 * ============================================
 */

import { isAuthenticated, getUserId, requireAuth } from './auth.js';
import { handleLogout } from './main.js';

const API_BASE = '/api';

window.handleLogout = handleLogout;

// Status labels a barvy
const statusLabels = {
    'pending': 'Čeká na zpracování',
    'processing': 'Zpracovává se',
    'shipped': 'Odesláno',
    'delivered': 'Doručeno',
    'cancelled': 'Zrušeno'
};

const statusColors = {
    'pending': '#f39c12',
    'processing': '#3498db',
    'shipped': '#9b59b6',
    'delivered': '#27ae60',
    'cancelled': '#e74c3c'
};

// Načtení objednávek při načtení stránky
document.addEventListener('DOMContentLoaded', async () => {
    if (!await requireAuth()) {
        return; // requireAuth přesměruje na login
    }
    
    await loadOrders();
    updateCartBadge();
});

// Načtení objednávek
async function loadOrders() {
    try {
        const response = await fetch(`${API_BASE}/orders`, {
            headers: {
                'X-User-Id': getUserId()
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            displayOrders(data.orders);
        } else {
            if (data.requiresAuth) {
                window.location.href = '/login';
            } else {
                showError('Chyba při načítání objednávek');
            }
        }
    } catch (error) {
        console.error('Chyba:', error);
        showError('Chyba připojení k serveru');
    }
}

// Zobrazení objednávek
function displayOrders(orders) {
    const list = document.getElementById('ordersList');
    
    if (orders.length === 0) {
        list.innerHTML = `
            <div class="no-orders">
                <p>Zatím nemáte žádné objednávky.</p>
                <a href="/products" class="btn btn-primary">Prohlédnout produkty</a>
            </div>
        `;
        return;
    }
    
    // Seřadit objednávky podle data (nejnovější první)
    orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    list.innerHTML = orders.map(order => {
        const status = order.status || 'pending';
        const statusLabel = statusLabels[status] || status;
        const statusColor = statusColors[status] || '#333';
        
        return `
            <div class="order-card" data-status="${status}">
                <div class="order-header">
                    <div class="order-id">
                        <h3>Objednávka #${order.id}</h3>
                        <span class="order-date">${formatDate(order.createdAt)}</span>
                    </div>
                    <div class="order-status" style="color: ${statusColor};">
                        <strong>${statusLabel}</strong>
                    </div>
                </div>
                
                <div class="order-content">
                    <div class="order-items">
                        <h4>Položky:</h4>
                        <ul>
                            ${order.items.map(item => `
                                <li>
                                    <span class="item-name">${item.name}</span>
                                    <span class="item-quantity">${item.quantity}ks</span>
                                    <span class="item-price">${(item.quantity * item.price).toFixed(2)} Kč</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    
                    <div class="order-summary">
                        ${order.subtotal ? `<div class="summary-row"><span>Mezisoučet:</span><span>${order.subtotal.toFixed(2)} Kč</span></div>` : ''}
                        ${order.shippingPrice !== undefined ? `<div class="summary-row"><span>Doprava:</span><span>${order.shippingPrice.toFixed(2)} Kč</span></div>` : ''}
                        <div class="summary-row summary-total">
                            <span><strong>Celkem:</strong></span>
                            <span><strong>${order.total ? order.total.toFixed(2) : (order.subtotal + (order.shippingPrice || 0)).toFixed(2)} Kč</strong></span>
                        </div>
                    </div>
                    
                    ${order.shippingAddress ? `
                        <div class="order-address">
                            <h4>Dodací adresa:</h4>
                            <p>
                                ${order.shippingAddress.street || ''}<br>
                                ${order.shippingAddress.postalCode || ''} ${order.shippingAddress.city || ''}<br>
                                ${order.shippingAddress.country || ''}
                            </p>
                        </div>
                    ` : ''}
                    
                    ${order.shipping ? `
                        <div class="order-info">
                            <span><strong>Doprava:</strong> ${getShippingLabel(order.shipping)}</span>
                        </div>
                    ` : ''}
                    
                    ${order.payment ? `
                        <div class="order-info">
                            <span><strong>Platba:</strong> ${getPaymentLabel(order.payment)}</span>
                        </div>
                    ` : ''}
                    
                    <button class="btn btn-outline" onclick="viewOrderDetails('${order.id}')">
                        Zobrazit detail
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Zobrazení detailu objednávky
window.viewOrderDetails = async function(orderId) {
    try {
        const response = await fetch(`${API_BASE}/orders/${orderId}`, {
            headers: {
                'X-User-Id': getUserId()
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            const order = data.order;
            let details = `Objednávka #${order.id}\n\n`;
            details += `Datum: ${formatDate(order.createdAt)}\n`;
            details += `Status: ${statusLabels[order.status] || order.status}\n\n`;
            
            if (order.contactInfo) {
                details += `Kontakt:\n`;
                details += `${order.contactInfo.firstName} ${order.contactInfo.lastName}\n`;
                details += `${order.contactInfo.email}\n`;
                if (order.contactInfo.phone) details += `${order.contactInfo.phone}\n`;
                details += `\n`;
            }
            
            if (order.shippingAddress) {
                details += `Dodací adresa:\n`;
                details += `${order.shippingAddress.street || ''}\n`;
                details += `${order.shippingAddress.postalCode || ''} ${order.shippingAddress.city || ''}\n`;
                details += `${order.shippingAddress.country || ''}\n\n`;
            }
            
            if (order.company) {
                details += `Firma:\n`;
                details += `${order.company.name}\n`;
                details += `IČO: ${order.company.ico}\n`;
                if (order.company.dic) details += `DIČ: ${order.company.dic}\n`;
                details += `\n`;
            }
            
            details += `Doprava: ${getShippingLabel(order.shipping)}\n`;
            details += `Platba: ${getPaymentLabel(order.payment)}\n\n`;
            
            details += `Položky:\n`;
            order.items.forEach(item => {
                details += `- ${item.name}: ${item.quantity}ks x ${item.price.toFixed(2)} Kč = ${(item.quantity * item.price).toFixed(2)} Kč\n`;
            });
            
            details += `\nMezisoučet: ${order.subtotal ? order.subtotal.toFixed(2) : '0.00'} Kč\n`;
            if (order.shippingPrice) {
                details += `Doprava: ${order.shippingPrice.toFixed(2)} Kč\n`;
            }
            details += `Celkem: ${order.total ? order.total.toFixed(2) : (order.subtotal + (order.shippingPrice || 0)).toFixed(2)} Kč\n`;
            
            if (order.note) {
                details += `\nPoznámka: ${order.note}`;
            }
            
            alert(details);
        } else {
            alert('Chyba při načítání detailu objednávky');
        }
    } catch (error) {
        console.error('Chyba:', error);
        alert('Chyba připojení k serveru');
    }
};

// Formátování data
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('cs-CZ', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Label pro dopravu
function getShippingLabel(shipping) {
    const labels = {
        'standard': 'Standardní doprava',
        'express': 'Expresní doprava',
        'pickup': 'Osobní odběr'
    };
    return labels[shipping] || shipping;
}

// Label pro platbu
function getPaymentLabel(payment) {
    const labels = {
        'card': 'Kreditní karta',
        'transfer': 'Bankovní převod',
        'cash': 'Hotově při převzetí'
    };
    return labels[payment] || payment;
}

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
    const list = document.getElementById('ordersList');
    list.innerHTML = `<p class="error">${message}</p>`;
}

