/**
 * ============================================
 * LOGIN PAGE LOGIC
 * ============================================
 * JavaScript pro přihlašovací stránku
 * ============================================
 */

const API_BASE = '/api';

// Zkontrolovat, jestli je uživatel už přihlášený
if (localStorage.getItem('userId')) {
    window.location.href = '/';
}

document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const generalError = document.getElementById('generalError');
    
    // Skrýt chybové zprávy
    generalError.classList.remove('show');
    
    try {
        const response = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Uložit ID uživatele do localStorage
            localStorage.setItem('userId', data.user.id);
            localStorage.setItem('userEmail', data.user.email);
            localStorage.setItem('userName', `${data.user.firstName} ${data.user.lastName}`.trim() || data.user.email);
            
            // Uložit celý user objekt pro snadnější přístup
            localStorage.setItem('userData', JSON.stringify(data.user));
            
            // Přesměrovat na hlavní stránku
            window.location.href = '/';
        } else {
            generalError.textContent = data.error || 'Chyba při přihlašování';
            generalError.classList.add('show');
        }
        } catch (error) {
            console.error('Chyba:', error);
            generalError.textContent = 'Chyba připojení k serveru';
            generalError.classList.add('show');
        }
});

