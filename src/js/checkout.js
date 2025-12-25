/**
 * ============================================
 * CHECKOUT PAGE LOGIC
 * ============================================
 * JavaScript pro stránku checkout
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
    setupForm();
});

// Načtení košíku
async function loadCart() {
    try {
        const response = await fetch(`${API_BASE}/cart`, {
            headers: {
                'X-User-Id': getUserId()
            }
        });
        const data = await response.json();
        
        if (data.success && data.cart.items.length > 0) {
            displayOrderSummary(data.cart);
            prefillUserData();
        } else {
            alert('Váš košík je prázdný');
            window.location.href = '/cart';
        }
    } catch (error) {
        console.error('Chyba:', error);
        alert('Chyba při načítání košíku');
        window.location.href = '/cart';
    }
}

// Zobrazení shrnutí objednávky
function displayOrderSummary(cart) {
    const itemsContainer = document.getElementById('orderSummaryItems');
    
    let html = '';
    cart.items.forEach(item => {
        const price = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;
        const quantity = typeof item.quantity === 'number' ? item.quantity : parseInt(item.quantity) || 1;
        html += `
            <div class="order-item">
                <div>
                    <strong>${item.name}</strong><br>
                    <small>${quantity}ks x ${price.toFixed(2)} Kč</small>
                </div>
                <div>
                    ${(quantity * price).toFixed(2)} Kč
                </div>
            </div>
        `;
    });
    
    itemsContainer.innerHTML = html;
    
    // Uložit subtotal pro pozdější použití
    window.orderSubtotal = cart.total || 0;
    
    // Celková cena se přepočítá při změně dopravy
    updateTotal(window.orderSubtotal);
}

// Nastavení formuláře
function setupForm() {
    const form = document.getElementById('checkoutForm');
    const isCompanyCheckbox = document.getElementById('isCompany');
    const companyFields = document.getElementById('companyFields');
    const shippingSelect = document.getElementById('shipping');
    
    // Zobrazení/skrytí polí pro firmu
    isCompanyCheckbox.addEventListener('change', (e) => {
        if (e.target.checked) {
            companyFields.classList.add('show');
            document.getElementById('companyName').setAttribute('required', 'required');
            document.getElementById('ico').setAttribute('required', 'required');
        } else {
            companyFields.classList.remove('show');
            document.getElementById('companyName').removeAttribute('required');
            document.getElementById('ico').removeAttribute('required');
        }
    });
    
    // Aktualizace celkové ceny při změně dopravy
    shippingSelect.addEventListener('change', () => {
        const subtotal = parseFloat(document.getElementById('orderTotal').textContent.replace(/[^\d.]/g, '')) || 0;
        updateTotal(subtotal);
    });
    
    // Odeslání formuláře
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await submitOrder();
    });
}

// Aktualizace celkové ceny
function updateTotal(subtotal) {
    const shippingSelect = document.getElementById('shipping');
    const shippingValue = shippingSelect ? shippingSelect.value : '';
    
    const shippingPrices = {
        'standard': 150,
        'express': 250,
        'pickup': 0
    };
    
    const shippingPrice = shippingPrices[shippingValue] || 0;
    const total = (subtotal || window.orderSubtotal || 0) + shippingPrice;
    
    const totalElement = document.getElementById('orderTotal');
    if (totalElement) {
        totalElement.textContent = total.toFixed(2) + ' Kč';
    }
}

// Předvyplnění údajů uživatele
async function prefillUserData() {
    try {
        const response = await fetch(`${API_BASE}/auth/verify`, {
            headers: {
                'X-User-Id': getUserId()
            }
        });
        const data = await response.json();
        
        if (data.success && data.user) {
            const user = data.user;
            if (user.firstName) document.getElementById('firstName').value = user.firstName;
            if (user.lastName) document.getElementById('lastName').value = user.lastName;
            if (user.email) document.getElementById('email').value = user.email;
            if (user.phone) document.getElementById('phone').value = user.phone;
            
            if (user.address) {
                if (user.address.street) document.getElementById('street').value = user.address.street;
                if (user.address.city) document.getElementById('city').value = user.address.city;
                if (user.address.postalCode) document.getElementById('postalCode').value = user.address.postalCode;
                if (user.address.country) document.getElementById('country').value = user.address.country;
            }
        }
    } catch (error) {
        console.error('Chyba při načítání údajů uživatele:', error);
    }
}

// Odeslání objednávky
async function submitOrder() {
    const form = document.getElementById('checkoutForm');
    const submitBtn = document.getElementById('submitBtn');
    const errorMessage = document.getElementById('errorMessage');
    
    // Skrýt chybu
    errorMessage.classList.remove('show');
    errorMessage.textContent = '';
    
    // Deaktivovat tlačítko
    submitBtn.disabled = true;
    submitBtn.textContent = 'Zpracovávám...';
    
    try {
        const formData = new FormData(form);
        const orderData = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            street: formData.get('street'),
            city: formData.get('city'),
            postalCode: formData.get('postalCode'),
            country: formData.get('country'),
            shipping: formData.get('shipping'),
            payment: formData.get('payment'),
            note: formData.get('note'),
            isCompany: formData.get('isCompany') === 'on',
            companyName: formData.get('companyName'),
            ico: formData.get('ico'),
            dic: formData.get('dic')
        };
        
        const response = await fetch(`${API_BASE}/checkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-User-Id': getUserId()
            },
            body: JSON.stringify(orderData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Úspěch - přesměrovat na stránku s potvrzením
            alert(`Objednávka #${data.order.id} byla úspěšně vytvořena!`);
            window.location.href = '/';
        } else {
            // Zobrazit chybu
            errorMessage.textContent = data.error || 'Chyba při vytváření objednávky';
            errorMessage.classList.add('show');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Dokončit objednávku';
        }
    } catch (error) {
        console.error('Chyba:', error);
        errorMessage.textContent = 'Chyba připojení k serveru';
        errorMessage.classList.add('show');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Dokončit objednávku';
    }
}

