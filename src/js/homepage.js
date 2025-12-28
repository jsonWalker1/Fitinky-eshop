/**
 * ============================================
 * HOMEPAGE LOGIC - B2B Style
 * ============================================
 * JavaScript pro hlavní stránku s průmyslovým B2B designem
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
            document.getElementById('categoriesNavB2B').innerHTML = '<p class="error-text">Žádné kategorie k dispozici.</p>';
        }
    } catch (error) {
        console.error('Chyba při načítání kategorií:', error);
        document.getElementById('categoriesNavB2B').innerHTML = '<p class="error-text">Chyba při načítání kategorií.</p>';
    }
}

/**
 * Zobrazí kategorie
 */
function displayCategories(categories) {
    const nav = document.getElementById('categoriesNavB2B');
    
    if (categories.length === 0) {
        nav.innerHTML = '<p class="error-text">Žádné kategorie k dispozici.</p>';
        return;
    }
    
    nav.innerHTML = categories.map(category => {
        const productCount = category.productCount || 0;
        return `
            <a href="/products?category=${category.slug}" class="category-item-b2b">
                <span class="category-name-b2b">${escapeHtml(category.name)}</span>
                <span class="category-count-b2b">(${productCount})</span>
            </a>
        `;
    }).join('');
}

/**
 * Načte a zobrazí produkty
 */
async function loadProducts() {
    try {
        const response = await fetch(`${API_BASE}/products`);
        const data = await response.json();
        
        if (data.success && data.products) {
            const products = data.products.slice(0, 16);
            displayProducts(products);
        } else {
            document.getElementById('homepageProductsB2B').innerHTML = '<p class="error-text">Žádné produkty k dispozici.</p>';
        }
    } catch (error) {
        console.error('Chyba při načítání produktů:', error);
        document.getElementById('homepageProductsB2B').innerHTML = '<p class="error-text">Chyba při načítání produktů.</p>';
    }
}

/**
 * Zobrazí produkty v gridu
 */
function displayProducts(products) {
    const grid = document.getElementById('homepageProductsB2B');
    
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
        
        const status = product.availabilityStatus || (product.inStock ? 'in_stock' : 'out_of_stock');
        const statusLabel = statusLabels[status] || status;
        const statusClass = status === 'in_stock' ? 'status-in-stock' : status === 'on_order' ? 'status-on-order' : 'status-out-of-stock';
        
        const price = typeof product.price === 'number' ? product.price : parseFloat(product.price) || 0;
        
        return `
            <article class="product-card-b2b">
                <a href="/products?product=${product.id}" class="product-link-b2b">
                    <div class="product-image-b2b">
                        <img src="${mainImage}" alt="${escapeHtml(product.name)}" loading="lazy">
                    </div>
                    <div class="product-info-b2b">
                        <h3 class="product-name-b2b">${escapeHtml(product.name)}</h3>
                        <div class="product-meta-b2b">
                            <span class="product-price-b2b">${price.toFixed(2)} Kč</span>
                            <span class="product-status-b2b ${statusClass}">${statusLabel}</span>
                        </div>
                    </div>
                </a>
            </article>
        `;
    }).join('');
}

/**
 * Escape HTML
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Inicializace
if (document.getElementById('categoriesNavB2B')) {
    loadCategories();
}

if (document.getElementById('homepageProductsB2B')) {
    loadProducts();
}
