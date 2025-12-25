/**
 * ============================================
 * MAIN JAVASCRIPT
 * ============================================
 * Globální funkcionalita pro všechny stránky
 * ============================================
 */

import { isAuthenticated, getUserId, logout } from './auth.js';

console.log('Eshop Admin GUI initialized');

// Aktualizace badge košíku v headeru
async function updateCartBadge() {
    try {
        const headers = {};
        if (isAuthenticated()) {
            headers['X-User-Id'] = getUserId();
        }
        
        const response = await fetch('/api/cart/count', {
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

// Aktualizace UI podle přihlášení
function updateAuthUI() {
    const loginButton = document.getElementById('loginButton');
    const logoutButton = document.getElementById('logoutButton');
    const userName = document.getElementById('userName');
    const cartIcon = document.getElementById('cartIcon');
    const ordersMenuItem = document.getElementById('ordersMenuItem');
    
    if (isAuthenticated()) {
        // Zobrazit odhlášení a jméno
        if (loginButton) loginButton.classList.remove('visible');
        if (logoutButton) logoutButton.classList.add('visible');
        if (userName) {
            // Zkusit získat jméno z userData nebo userName
            let name = 'Uživatel';
            
            const userDataStr = localStorage.getItem('userData');
            if (userDataStr) {
                try {
                    const userData = JSON.parse(userDataStr);
                    if (userData.firstName && userData.lastName) {
                        name = `${userData.firstName} ${userData.lastName}`;
                    } else if (userData.email) {
                        name = userData.email;
                    }
                } catch (e) {
                    console.error('Chyba při parsování userData:', e);
                }
            }
            
            // Fallback na userName z localStorage
            if (name === 'Uživatel') {
                const storedUserName = localStorage.getItem('userName');
                if (storedUserName) {
                    name = storedUserName;
                } else {
                    const userEmail = localStorage.getItem('userEmail');
                    if (userEmail) {
                        name = userEmail;
                    }
                }
            }
            
            userName.innerHTML = `<a href="/orders">${name}</a>`;
            userName.classList.add('visible');
        }
        // Zobrazit odkaz na objednávky v menu
        if (ordersMenuItem) ordersMenuItem.classList.add('visible');
        // Košík je vždy viditelný
        if (cartIcon) cartIcon.style.pointerEvents = 'auto';
    } else {
        // Zobrazit přihlášení
        if (loginButton) loginButton.classList.add('visible');
        if (logoutButton) logoutButton.classList.remove('visible');
        if (userName) userName.classList.remove('visible');
        // Skrýt odkaz na objednávky v menu
        if (ordersMenuItem) ordersMenuItem.classList.remove('visible');
        // Košík je viditelný, ale při kliknutí přesměruje na login
        if (cartIcon) {
            cartIcon.addEventListener('click', (e) => {
                if (!isAuthenticated()) {
                    e.preventDefault();
                    alert('Pro zobrazení košíku se musíte přihlásit');
                    window.location.href = '/login';
                }
            });
        }
    }
}

// Odhlášení
export async function handleLogout(e) {
    e.preventDefault();
    if (confirm('Opravdu se chcete odhlásit?')) {
        await logout();
    }
}

window.handleLogout = handleLogout;

// Hamburger menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const headerMenu = document.getElementById('headerMenu');
  
  if (hamburger && headerMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      headerMenu.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
    
    // Zavřít menu při kliknutí na odkaz
    const menuLinks = headerMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        headerMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });
  }
  
  // Aktualizovat UI podle přihlášení
  updateAuthUI();
  
  // Načíst počet položek v košíku
  updateCartBadge();
});
