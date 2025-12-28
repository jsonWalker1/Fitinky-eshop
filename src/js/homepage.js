/**
 * ============================================
 * HOMEPAGE LOGIC
 * ============================================
 * JavaScript pro hlavní stránku
 * Zobrazuje kategorie a produkty
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
            document.getElementById('categoriesNav').innerHTML = '<p class="error-text">Žádné kategorie k dispozici.</p>';
        }
    } catch (error) {
        console.error('Chyba při načítání kategorií:', error);
        document.getElementById('categoriesNav').innerHTML = '<p class="error-text">Chyba při načítání kategorií.</p>';
    }
}

/**
 * Zobrazí kategorie v sidebaru
 */
function displayCategories(categories) {
    const nav = document.getElementById('categoriesNav');
    
    if (categories.length === 0) {
        nav.innerHTML = '<p class="error-text">Žádné kategorie k dispozici.</p>';
        return;
    }
    
    nav.innerHTML = categories.map(category => {
        const productCount = category.productCount || 0;
        return `
            <a href="/products?category=${category.slug}" class="category-link">
                <span class="category-name">${escapeHtml(category.name)}</span>
                <span class="category-count">${productCount} produktů</span>
            </a>
        `;
    }).join('');
}

/**
 * Načte a zobrazí nejnovější produkty
 */
async function loadLatestProducts() {
    try {
        const response = await fetch(`${API_BASE}/products`);
        const data = await response.json();
        
        if (data.success && data.products) {
            // Zobrazit pouze prvních 12 produktů
            const latestProducts = data.products.slice(0, 12);
            displayProducts(latestProducts);
        } else {
            document.getElementById('homepageProductsGrid').innerHTML = '<p class="error-text">Žádné produkty k dispozici.</p>';
        }
    } catch (error) {
        console.error('Chyba při načítání produktů:', error);
        document.getElementById('homepageProductsGrid').innerHTML = '<p class="error-text">Chyba při načítání produktů.</p>';
    }
}

/**
 * Zobrazí produkty v gridu
 */
function displayProducts(products) {
    const grid = document.getElementById('homepageProductsGrid');
    
    if (products.length === 0) {
        grid.innerHTML = '<p class="error-text">Žádné produkty k dispozici.</p>';
        return;
    }
    
    const statusLabels = {
        'in_stock': 'Skladem',
        'on_order': 'Na objednávku',
        'out_of_stock': 'Nedostupné'
    };
    
    grid.innerHTML = products.map(product => {
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
        
        const status = product.availabilityStatus || (product.inStock ? 'in_stock' : 'out_of_stock');
        const statusLabel = statusLabels[status] || status;
        const statusClass = status === 'in_stock' ? 'in-stock' : status === 'on_order' ? 'on-order' : 'out-of-stock';
        
        const price = typeof product.price === 'number' ? product.price : parseFloat(product.price) || 0;
        
        return `
            <article class="product-card">
                <a href="/products?product=${product.id}" class="product-link">
                    <div class="product-image-wrapper">
                        <img src="${mainImage}" alt="${escapeHtml(product.name)}" class="product-image" loading="lazy">
                        <span class="product-status ${statusClass}">${statusLabel}</span>
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">${escapeHtml(product.name)}</h3>
                        <div class="product-price">${price.toFixed(2)} Kč</div>
                    </div>
                </a>
            </article>
        `;
    }).join('');
}

/**
 * Escape HTML pro bezpečné zobrazení textu
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Načíst kategorie a produkty když je stránka načtena
if (document.getElementById('categoriesNav')) {
    loadCategories();
}

if (document.getElementById('homepageProductsGrid')) {
    loadLatestProducts();
}

