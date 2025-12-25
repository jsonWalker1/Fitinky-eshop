# 📚 Sass Dokumentace

Tento dokument popisuje strukturu a organizaci Sass souborů v projektu.

## 📁 Struktura složek

```
sass/
├── main.scss              # Hlavní Sass soubor pro veřejnou část
├── admin.scss             # Hlavní Sass soubor pro admin část
├── _variables.scss        # CSS proměnné (barvy, spacing, atd.)
├── _mixins.scss          # Znovupoužitelné mixiny
├── _base.scss            # Základní reset a globální styly
├── _layout.scss          # Layout styly
├── components/           # Komponenty
│   ├── _header.scss      # Header komponenta
│   ├── _footer.scss      # Footer komponenta
│   ├── _mainCon.scss     # Main container
│   ├── _landingPage.scss # Landing page komponenty
│   ├── _products.scss    # Produkty komponenty
│   ├── _cart.scss        # Košík komponenty
│   ├── _orders.scss      # Objednávky komponenty
│   ├── _userMenu.scss    # Uživatelské menu (login/logout)
│   ├── _checkout.scss    # Checkout komponenty
│   ├── _login.scss       # Login formulář (veřejný)
│   ├── _adminNavigation.scss # Admin navigace
│   └── admin/            # Admin komponenty
│       ├── _login.scss   # Admin login
│       └── _dashboard.scss # Admin dashboard
├── main.css              # Zkompilovaný CSS (generovaný)
└── admin.css             # Zkompilovaný admin CSS (generovaný)
```

## 🎯 Hlavní soubory

### `main.scss`
Hlavní Sass soubor pro veřejnou část aplikace. Importuje všechny potřebné komponenty v správném pořadí:

1. Variables - proměnné
2. Mixins - mixiny
3. Base - základní styly
4. Layout - layout styly
5. Components - komponenty (header, footer, produkty, atd.)

**Při přidávání nových komponent nezapomeňte je přidat sem!**

### `admin.scss`
Hlavní Sass soubor pro admin rozhraní. Struktura je podobná jako `main.scss`, ale obsahuje pouze admin komponenty.

## 🧩 Komponenty

### `_userMenu.scss`
Styly pro uživatelské menu (login/logout tlačítka, userName span).

**HTML struktura:**
```html
<button class="login" id="loginButton">...</button>
<button class="login" id="logoutButton">...</button>
<span id="userName">...</span>
<li id="ordersMenuItem">...</li>
```

**JavaScript třídy:**
- `.visible` - zobrazit prvek
- Výchozí stav: skrytý (`display: none`)

**Použití:**
```javascript
// Zobrazit
element.classList.add('visible');
// Skrýt
element.classList.remove('visible');
```

### `_adminNavigation.scss`
Styly pro admin navigační odkazy v admin headeru.

**HTML struktura:**
```html
<div class="admin-header">
    <a href="..." class="admin-nav-link">Uživatelé</a>
    <a href="..." class="admin-nav-link">Objednávky</a>
</div>
```

### `_checkout.scss`
Styly pro stránku dokončení objednávky (checkout).

**Hlavní třídy:**
- `.checkout-container` - hlavní kontejner
- `.checkout-grid` - grid layout (2 sloupce na desktopu, 1 na mobilu)
- `.form-section` - sekce formuláře
- `.order-summary` - shrnutí objednávky

### `_login.scss`
Styly pro veřejný přihlašovací formulář.

**HTML struktura:**
```html
<div class="login-container">
    <div class="login-box">
        <h1>Přihlášení</h1>
        <form id="loginForm">
            <div class="form-group">...</div>
            <button class="btn-login">Přihlásit se</button>
        </form>
    </div>
</div>
```

**Hlavní třídy:**
- `.login-container` - kontejner pro login formulář
- `.login-box` - přihlašovací box
- `.form-group` - skupina formulářových polí
- `.btn-login` - přihlašovací tlačítko
- `.error-message.show` - chybové zprávy (použij třídu `.show` pro zobrazení)

**Použití:**
```javascript
// Zobrazit chybovou zprávu
errorElement.classList.add('show');
// Skrýt chybovou zprávu
errorElement.classList.remove('show');
```

### `_orders.scss`
Styly pro stránku s objednávkami.

**Status barvy:**
- `.status-pending` / `[data-status="pending"]` - oranžová (#f39c12)
- `.status-processing` / `[data-status="processing"]` - modrá (#3498db)
- `.status-shipped` / `[data-status="shipped"]` - fialová (#9b59b6)
- `.status-delivered` / `[data-status="delivered"]` - zelená (#27ae60)
- `.status-cancelled` / `[data-status="cancelled"]` - červená (#e74c3c)

**Použití:**
```html
<div class="order-status status-pending" data-status="pending">
    Čeká
</div>
```

### `_cart.scss`
Styly pro košík.

**Dynamické zobrazení:**
- `#emptyCart` - prázdný košík (výchozí: skrytý)
- `#cartContent` - košík s produkty (výchozí: skrytý)

**Použití:**
```javascript
// Zobrazit prázdný košík
emptyCart.classList.add('visible');
// Zobrazit košík s produkty
cartContent.classList.add('visible');
```

### `_products.scss`
Styly pro produkty a kategorie.

**Dynamické zobrazení:**
- `#productsContainer` - kontejner s produkty (výchozí: skrytý)

**Použití:**
```javascript
// Zobrazit produkty
productsContainer.classList.add('visible');
```

## 🎨 Status barvy

### Produkty
- `status-in_stock` / `[data-status="in_stock"]` - zelená (#27ae60)
- `status-on_order` / `[data-status="on_order"]` - oranžová (#f39c12)
- `status-out_of_stock` / `[data-status="out_of_stock"]` - červená (#e74c3c)

### Objednávky
- `status-pending` / `[data-status="pending"]` - oranžová (#f39c12)
- `status-processing` / `[data-status="processing"]` - modrá (#3498db)
- `status-shipped` / `[data-status="shipped"]` - fialová (#9b59b6)
- `status-delivered` / `[data-status="delivered"]` - zelená (#27ae60)
- `status-cancelled` / `[data-status="cancelled"]` - červená (#e74c3c)

**Použití:**
```html
<!-- V HTML -->
<span class="product-status status-in_stock">Skladem</span>

<!-- V JavaScript (template string) -->
<span class="product-status status-${status}" data-status="${status}">
    ${statusLabel}
</span>
```

## 🔧 Mixiny

### Button mixiny
- `@include button-primary()` - primární tlačítko
- `@include button-secondary()` - sekundární tlačítko
- `@include button-outline()` - tlačítko s obrysem

### Text mixiny
- `@include text-heading(size, weight, color, margin-bottom)` - nadpisy
- `@include text-body(size, color, line-height, margin-bottom)` - text
- `@include text-link(color, hover-color)` - odkazy

**Příklad:**
```scss
h1 {
    @include text-heading(2rem, 700, #333, 1rem);
}
```

## 📝 Pravidla pro práci se Sass

### ✅ DO:
- Používej mixiny pro opakující se styly
- Organizuj kód do logických komponent
- Používej třídy místo inline stylů
- Komentuj složitější části kódu
- Používej `.visible` třídu pro dynamické zobrazení/skrytí

### ❌ NEDĚLEJ:
- Nepiš inline styly v HTML (`style="..."`)
- Nepoužívej `element.style.display` v JavaScriptu (použij třídy)
- Nepřidávej styly přímo do HTML (`<style>` tagy)
- Neopakuj stejný kód na více místech (vytvoř mixin)

## 🚀 Kompilace

Sass soubory se kompilují pomocí:

```bash
npm run build:css
```

nebo

```bash
npm run sass:compile
```

Tím se vygenerují `main.css` a `admin.css` soubory.

## 🔍 Jak najít správný soubor

### Hledám styly pro...
- **Header/Navigace** → `components/_header.scss`
- **Footer** → `components/_footer.scss`
- **Produkty** → `components/_products.scss`
- **Košík** → `components/_cart.scss`
- **Objednávky** → `components/_orders.scss`
- **Checkout** → `components/_checkout.scss`
- **Login formulář** → `components/_login.scss`
- **Login/Logout tlačítka** → `components/_userMenu.scss`
- **Admin navigace** → `components/_adminNavigation.scss`
- **Admin dashboard** → `components/admin/_dashboard.scss`
- **Admin login** → `components/admin/_login.scss`
- **Barvy/Spacing** → `_variables.scss`
- **Mixiny** → `_mixins.scss`

## 📌 Důležité poznámky

1. **Výchozí stav skrytých prvků:**
   - Login/logout tlačítka, userName, ordersMenuItem jsou výchozí skryté
   - Empty cart, cart content, products container jsou výchozí skryté
   - Používej třídu `.visible` pro zobrazení

2. **Status barvy:**
   - Vždy používej třídy místo inline stylů
   - Můžeš použít jak třídu (`status-pending`), tak data atribut (`data-status="pending"`)

3. **Responsive design:**
   - Všechny komponenty mají mobile-first přístup
   - Breakpointy: `768px` (tablet), `480px` (mobil)

4. **Přidávání nových komponent:**
   - Vytvoř nový soubor v `components/`
   - Importuj ho v `main.scss` nebo `admin.scss`
   - Zkompiluj pomocí `npm run build:css`

## 🐛 Řešení problémů

### Styly se neaplikují
1. Zkontroluj, jestli je soubor importován v `main.scss` nebo `admin.scss`
2. Zkompiluj Sass: `npm run build:css`
3. Zkontroluj, jestli je správný CSS soubor načten v HTML

### Inline styly se stále zobrazují
1. Zkontroluj JavaScript soubory - používají třídy místo `element.style.*`?
2. Zkontroluj HTML soubory - nejsou tam `style="..."` atributy?

### Status barvy nefungují
1. Zkontroluj, jestli má element správnou třídu nebo data atribut
2. Zkontroluj `_orders.scss` nebo `admin/_dashboard.scss` pro správné barvy

