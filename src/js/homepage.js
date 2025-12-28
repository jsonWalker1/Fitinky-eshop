/**
 * ============================================
 * HOMEPAGE LOGIC
 * ============================================
 * JavaScript pro hlavní stránku
 * Zobrazuje kategorie a nejnovější produkty
 * ============================================
 */

const API_BASE = '/api';

/**
 * Načte a zobrazí kategorie
 */
async function loadCategories() {
    try {
        const response = await fetch(`${API_BASE}/categories`);
        const data = await response.json();
        
        if (data.success && data.categories) {
            displayCategories(data.categories);
        } else {
            document.getElementById('categoriesList').innerHTML = '<p>Žádné kategorie k dispozici.</p>';
        }
    } catch (error) {
        console.error('Chyba při načítání kategorií:', error);
        document.getElementById('categoriesList').innerHTML = '<p>Chyba při načítání kategorií.</p>';
    }
}

/**
 * Zobrazí kategorie
 */
function displayCategories(categories) {
    const list = document.getElementById('categoriesList');
    
    if (categories.length === 0) {
        list.innerHTML = '<p>Žádné kategorie k dispozici.</p>';
        return;
    }
    
    list.innerHTML = categories.map(category => `
        <div class="category-item" onclick="window.location.href='/products?category=${category.slug}'">
            <div class="category-name">${escapeHtml(category.name)}</div>
            <div class="category-count">${category.productCount || 0} produktů</div>
        </div>
    `).join('');
}

/**
 * Načte a zobrazí nejnovější produkty
 */
async function loadLatestProducts() {
    try {
        const response = await fetch(`${API_BASE}/products`);
        const data = await response.json();
        
        if (data.success && data.products) {
            // Seřadit podle data vytvoření (nejnovější první) a vzít prvních 6
            const latestProducts = data.products
                .sort((a, b) => {
                    const dateA = new Date(a.createdAt || 0);
                    const dateB = new Date(b.createdAt || 0);
                    return dateB - dateA;
                })
                .slice(0, 6);
            
            displayLatestProducts(latestProducts);
        } else {
            document.getElementById('latestProductsGrid').innerHTML = '<p>Žádné produkty k zobrazení.</p>';
        }
    } catch (error) {
        console.error('Chyba při načítání produktů:', error);
        document.getElementById('latestProductsGrid').innerHTML = '<p>Chyba při načítání produktů.</p>';
    }
}

/**
 * Zobrazí nejnovější produkty
 */
function displayLatestProducts(products) {
    const grid = document.getElementById('latestProductsGrid');
    
    if (products.length === 0) {
        grid.innerHTML = '<p>Žádné produkty k zobrazení.</p>';
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
        
        return `
            <div class="product-card ${status === 'out_of_stock' ? 'product-unavailable' : ''}" data-product-id="${product.id}">
                <div class="product-image">
                    <img src="${mainImage}" alt="${product.name}">
                    ${status !== 'in_stock' ? `<div class="product-status-badge product-status-${status}">${statusLabel}</div>` : ''}
                </div>
                <div class="product-info">
                    <h3>${escapeHtml(product.name)}</h3>
                    <div class="product-price">${(typeof product.price === 'number' ? product.price : parseFloat(product.price) || 0).toFixed(2)} Kč</div>
                    ${status === 'in_stock' ? `<div class="product-availability product-available">✓ Skladem</div>` : ''}
                    ${status === 'on_order' ? `<div class="product-availability product-on-order">⏱ Na objednávku</div>` : ''}
                    ${status === 'out_of_stock' ? `<div class="product-availability product-out-of-stock">✗ Nedostupné</div>` : ''}
                    <button class="btn btn-primary btn-block" ${!isAvailable ? 'disabled' : ''} onclick="window.location.href='/products?category=${product.categorySlug || ''}'">
                        Zobrazit detail
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

/**
 * Escape HTML pro bezpečné zobrazení
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Načíst kategorie a produkty když je stránka načtena
if (document.getElementById('categoriesList')) {
    loadCategories();
}

if (document.getElementById('latestProductsGrid')) {
    loadLatestProducts();
}

