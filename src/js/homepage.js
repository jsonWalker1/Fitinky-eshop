/**
 * ============================================
 * HOMEPAGE LOGIC
 * ============================================
 * JavaScript pro homepage - načítání kategorií a produktů
 * ============================================
 */

const API_BASE = '/api';

// Ikony pro kategorie (mapování podle názvu kategorie)
const categoryIcons = {
    'armatury-a-fitinky': 'build',
    'lisovaci-system': 'settings',
    'plechy-a-site': 'grid_view',
    'plne-tyce-a-profily': 'straighten',
    'trubky': 'water_drop',
    'jekly': 'crop_square',
    'betonarska-ocel': 'gavel',
    'spojovaci-material': 'settings',
    'lana-a-retezy': 'link',
    'panty-a-petlice': 'lock',
    'nastroje-a-naradi': 'construction',
    'hadice': 'water_drop',
    'prislusenstvi': 'precision_manufacturing',
    'vyprodej': 'sell'
};

// Načtení kategorií a jejich zobrazení v sidebaru
async function loadCategories() {
    try {
        const response = await fetch(`${API_BASE}/categories`);
        const data = await response.json();
        
        if (data.success && data.categories) {
            displayCategories(data.categories);
        } else {
            document.getElementById('categoriesNav').innerHTML = '<p>Žádné kategorie k dispozici.</p>';
        }
    } catch (error) {
        console.error('Chyba při načítání kategorií:', error);
        document.getElementById('categoriesNav').innerHTML = '<p>Chyba při načítání kategorií.</p>';
    }
}

// Zobrazení kategorií v sidebaru
function displayCategories(categories) {
    const nav = document.getElementById('categoriesNav');
    
    if (categories.length === 0) {
        nav.innerHTML = '<p>Žádné kategorie k dispozici.</p>';
        return;
    }
    
    const categoriesHtml = categories.map(category => {
        const iconName = categoryIcons[category.slug] || 'category';
        const productCount = category.productCount || 0;
        
        return `
            <a href="/products?category=${category.slug}" class="category-item">
                <div class="category-name">
                    <span class="material-symbols-outlined">${iconName}</span>
                    <span>${escapeHtml(category.name)}</span>
                </div>
                <span class="material-symbols-outlined expand-icon">expand_more</span>
            </a>
        `;
    }).join('');
    
    nav.innerHTML = categoriesHtml;
}

// Načtení nejprodávanějších produktů
async function loadBestsellers() {
    try {
        // Načteme první 4 produkty (nebo můžeme přidat API endpoint pro bestsellers)
        const response = await fetch(`${API_BASE}/products`);
        const data = await response.json();
        
        if (data.success && data.products) {
            // Zobrazíme první 4 produkty jako "nejprodávanější"
            const bestsellers = data.products.slice(0, 4);
            displayBestsellers(bestsellers);
        } else {
            document.getElementById('bestsellersGrid').innerHTML = '<p>Žádné produkty k dispozici.</p>';
        }
    } catch (error) {
        console.error('Chyba při načítání produktů:', error);
        document.getElementById('bestsellersGrid').innerHTML = '<p>Chyba při načítání produktů.</p>';
    }
}

// Zobrazení nejprodávanějších produktů
function displayBestsellers(products) {
    const grid = document.getElementById('bestsellersGrid');
    
    if (products.length === 0) {
        grid.innerHTML = '<p>Žádné produkty k dispozici.</p>';
        return;
    }
    
    const productsHtml = products.map(product => {
        const imageUrl = product.image || '/assets/pic/trubka.webp';
        const price = product.price || 0;
        const priceVat = Math.round(price * 1.21); // 21% DPH
        
        return `
            <div class="product-card">
                <div class="product-image">
                    <img src="${imageUrl}" alt="${escapeHtml(product.name)}" onerror="this.src='/assets/pic/trubka.webp'">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${escapeHtml(product.name)}</h3>
                    <div class="product-price">
                        <div class="price-from">od ${price.toLocaleString('cs-CZ')} Kč</div>
                        <div class="price-vat">${priceVat.toLocaleString('cs-CZ')} Kč s DPH</div>
                    </div>
                    <a href="/products" class="btn-detail">Detail</a>
                </div>
            </div>
        `;
    }).join('');
    
    grid.innerHTML = productsHtml;
}

// Escape HTML pro bezpečné zobrazení
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text || '';
    return div.innerHTML;
}

// Inicializace Swiper karuselu
function initHeroSwiper() {
    const swiperElement = document.querySelector('.heroSwiper');
    if (!swiperElement) {
        console.error('Hero Swiper element nenalezen');
        return;
    }
    
    if (typeof Swiper === 'undefined') {
        console.error('Swiper.js není načten');
        return;
    }
    
    new Swiper('.heroSwiper', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        speed: 500,
        slidesPerView: 1,
        spaceBetween: 0,
        observer: true,
        observeParents: true,
        watchOverflow: true,
        resizeObserver: true
    });
}

// Inicializace při načtení stránky
document.addEventListener('DOMContentLoaded', () => {
    loadCategories();
    loadBestsellers();
});

// Inicializovat Swiper po načtení všech scriptů
window.addEventListener('load', () => {
    // Počkat chvilku, aby se Swiper script stihl načíst
    setTimeout(() => {
        if (typeof Swiper !== 'undefined') {
            initHeroSwiper();
        } else {
            console.error('Swiper.js se nepodařilo načíst');
        }
    }, 100);
});

