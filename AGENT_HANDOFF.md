# 🤝 Agent Handoff Documentation

Tento dokument obsahuje všechny důležité informace pro nového agenta, který má navázat na práci na tomto projektu.

## 📋 Obsah

1. [Rychlý přehled](#rychlý-přehled)
2. [Struktura projektu](#struktura-projektu)
3. [Technologie a závislosti](#technologie-a-závislosti)
4. [Instalace a spuštění](#instalace-a-spuštění)
5. [Důležité soubory a jejich účel](#důležité-soubory-a-jejich-účel)
6. [Hlavní funkce a jejich umístění](#hlavní-funkce-a-jejich-umístění)
7. [Poslední implementované změny](#poslední-implementované-změny)
8. [Známé problémy a TODO](#známé-problémy-a-todo)
9. [Jak pokračovat v práci](#jak-pokračovat-v-práci)
10. [Důležité poznámky](#důležité-poznámky)

---

## 🚀 Rychlý přehled

**Projekt:** Full-stack e-commerce platforma s admin panelem  
**Typ:** Experimentální projekt vytvořený ve spolupráci s AI  
**Stav:** Funkční, připraveno k prezentaci  
**Deployment:** Railway (cloud hosting)

### Hlavní funkce:
- ✅ Zákaznická část (storefront) s produkty, košíkem, checkoutem
- ✅ Admin panel pro správu produktů, objednávek, uživatelů
- ✅ Uživatelská autentizace (běžní uživatelé + admin)
- ✅ Globální vyhledávání produktů
- ✅ Přepínání měn (CZK, EUR, USD)
- ✅ Kalkulačky pro výpočet hmotností nerezových materiálů
- ✅ Tabulka jakostí nerezových materiálů s rozbalovacími sekcemi

---

## 📁 Struktura projektu

```
eshopAdminGUI/
├── backend/                    # Backend aplikace
│   ├── controllers/           # HTTP request handlers
│   │   ├── indexController.js      # Frontend HTML stránky
│   │   ├── productsController.js   # Produkty API
│   │   ├── cartController.js       # Košík API
│   │   ├── ordersController.js     # Objednávky API
│   │   ├── checkoutController.js    # Checkout API
│   │   ├── userAuthController.js    # Uživatelská autentizace
│   │   ├── adminController.js       # Admin panel
│   │   └── globalSearchController.js # Globální vyhledávání
│   ├── services/              # Business logika
│   │   ├── productsService.js
│   │   ├── cartService.js
│   │   └── userAuthService.js
│   ├── repositories/          # Data access layer (SQL)
│   │   ├── productRepository.js
│   │   ├── userRepository.js
│   │   └── attributeRepository.js
│   ├── routes/                # API routy
│   │   ├── indexRoutes.js          # Frontend routes
│   │   ├── productsRoutes.js        # /api/products
│   │   ├── cartRoutes.js            # /api/cart
│   │   ├── ordersRoutes.js          # /api/orders
│   │   ├── checkoutRoutes.js        # /api/checkout
│   │   ├── userAuthRoutes.js        # /api/auth
│   │   └── adminRoutes.js           # /admin/*
│   ├── middleware/            # Express middleware
│   │   ├── authMiddleware.js        # Autentizace (requireAuth)
│   │   ├── staticFiles.js            # Statické soubory
│   │   └── assetsHandler.js          # Assets handling
│   ├── db/                    # Database migrace a utilities
│   │   ├── connection.js             # PostgreSQL connection pool
│   │   ├── schema.sql                # Database schema
│   │   ├── init-db.js                # Inicializace DB
│   │   └── migrate.js                # Migrace dat
│   ├── views/                 # Admin HTML šablony
│   │   ├── admin-dashboard.html
│   │   ├── admin-products.html
│   │   ├── admin-orders.html
│   │   ├── admin-users.html
│   │   └── admin-settings.html       # Nastavení měn
│   ├── server.js              # Hlavní server (port 3001)
│   └── adminServer.js         # Admin server (port 3002)
│
├── src/js/                    # Frontend JavaScript moduly
│   ├── main.js                # Globální funkcionalita
│   ├── auth.js                # Autentizace
│   ├── currency.js            # Přepínání měn
│   ├── search.js              # Globální vyhledávání
│   ├── search-results.js      # Stránka výsledků vyhledávání
│   ├── products.js            # Stránka produktů
│   ├── cart.js                # Košík
│   ├── checkout.js            # Checkout
│   ├── orders.js              # Historie objednávek
│   ├── homepage.js            # Homepage
│   └── calculators.js          # Kalkulačky
│
├── sass/                      # SASS/SCSS soubory
│   ├── _variables.scss        # Design tokens (barvy, spacing, atd.)
│   ├── _mixins.scss           # Reusable mixiny
│   ├── _base.scss             # Reset a base styles
│   ├── _layout.scss           # Layout komponenty
│   ├── main.scss              # Main frontend styles
│   ├── admin.scss             # Admin panel styles
│   └── components/            # Component styles
│       ├── _header.scss            # Header s search barem
│       ├── _footer.scss            # Footer
│       ├── _cart.scss              # Košík
│       ├── _products.scss           # Produkty
│       ├── _pages.scss              # Statické stránky + kalkulačky
│       └── ...
│
├── *.html                     # Frontend HTML stránky
│   ├── index.html             # Homepage
│   ├── products.html           # Produkty
│   ├── cart.html              # Košík
│   ├── checkout.html          # Checkout
│   ├── orders.html            # Historie objednávek
│   ├── login.html             # Přihlášení
│   ├── search.html            # Výsledky vyhledávání
│   ├── calculators.html       # Kalkulačky
│   └── about.html, contact.html, ... # Statické stránky
│
├── assets/                    # Statické soubory (obrázky, atd.)
├── prisma/                    # Prisma schema
│   └── schema.prisma
├── docs/                      # Dokumentace (většinou v .gitignore)
├── rules.md                   # ⚠️ DŮLEŽITÉ: Pravidla pro vývoj
├── README.md                  # Základní dokumentace
└── package.json               # NPM konfigurace

```

---

## 🛠 Technologie a závislosti

### Frontend
- **HTML5** - semantická struktura
- **SASS/SCSS** - CSS preprocesor s modulární architekturou
- **JavaScript (ES6+)** - moderní JavaScript s ES moduly
- **Vite** - dev server (volitelně)

### Backend
- **Node.js** - runtime prostředí
- **Express.js** - web framework
- **PostgreSQL** - relační databáze
- **Prisma** - ORM (používá se, ale hlavně SQL queries v repositories)

### Deployment
- **Railway** - cloud hosting
- **Procfile** - konfigurace pro Railway

### NPM Scripts (důležité)
```bash
npm run sass:compile    # Zkompilovat SASS → CSS
npm run server          # Spustit hlavní server (port 3001)
npm run server:admin    # Spustit admin server (port 3002)
npm run server:all      # Spustit oba servery najednou
npm run db:init         # Inicializovat databázi
npm run db:migrate      # Spustit migrace
```

---

## 🚀 Instalace a spuštění

### 1. Instalace závislostí
```bash
npm install
```

### 2. Nastavení databáze
```bash
# Inicializace databáze
npm run db:init

# Migrace dat
npm run db:migrate
```

### 3. Kompilace SASS
```bash
npm run sass:compile
```

### 4. Spuštění serverů
```bash
# Oba servery najednou
npm run server:all

# Nebo jednotlivě:
npm run server        # Hlavní server (port 3001)
npm run server:admin  # Admin server (port 3002)
```

### 5. Přístup k aplikaci
- **Frontend:** http://localhost:3001
- **Admin panel:** http://localhost:3002/admin/login

---

## 📄 Důležité soubory a jejich účel

### Backend

#### `backend/server.js`
- Hlavní entry point pro frontend server
- Port: 3001
- Obsahuje routing pro veřejné stránky

#### `backend/adminServer.js`
- Admin server
- Port: 3002
- Obsahuje routing pro admin panel

#### `backend/middleware/authMiddleware.js`
- **DŮLEŽITÉ:** Middleware `requireAuth` je **async funkce**
- Ověřuje uživatele z headeru `X-User-Id`
- Přidává `req.userId` a `req.user` do requestu

#### `backend/repositories/productRepository.js`
- SQL queries pro produkty
- Funkce: `getAllProducts(filters)`, `getProductById()`, atd.
- Podporuje `filters.search` pro vyhledávání

#### `backend/controllers/productsController.js`
- API endpoint: `GET /api/products?search=query`
- Podporuje vyhledávání přes query parametr `search`

### Frontend

#### `src/js/currency.js`
- **DŮLEŽITÉ:** Exportuje `formatPrice(price)` - používat pro všechny ceny!
- Správa přepínání měn (CZK, EUR, USD)
- Ukládá výběr do localStorage
- Dispatchuje event `currencyChanged`

#### `src/js/search.js`
- Globální vyhledávání produktů
- Dropdown s výsledky při psaní
- Přesměrování na `/search` při Enter

#### `src/js/cart.js`
- **DŮLEŽITÉ:** Importuje `formatPrice` z `currency.js`
- Logika zobrazení prázdného/plného košíku
- Kontrola: `cart && cart.items && Array.isArray(cart.items) && cart.items.length > 0`

#### `src/js/orders.js`
- **DŮLEŽITÉ:** Importuje `formatPrice` z `currency.js`
- Zobrazení historie objednávek uživatele

#### `src/js/calculators.js`
- Kalkulačky pro nerezové materiály
- Funkce: `calculateSheet()`, `calculatePipe()`, `calculateHollow()`, atd.
- Toggle jakostí materiálů: `toggleGrade(gradeId)`

### CSS/SASS

#### `sass/components/_header.scss`
- Search bar styly (`.search-wrapper`, `.search-results`)
- Currency selector styly
- Mobilní zobrazení (skrytí tagline)

#### `sass/components/_cart.scss`
- **DŮLEŽITÉ:** `.empty-cart` a `#cartContent` jsou ve výchozím stavu `display: none`
- Zobrazí se pouze s třídou `.visible`

#### `sass/components/_pages.scss`
- Styly pro statické stránky
- Kalkulačky styly
- Tabulka jakostí nerezových materiálů

---

## 🎯 Hlavní funkce a jejich umístění

### 1. Globální vyhledávání
- **Frontend:** `src/js/search.js` - `initSearch()`, `performSearch()`
- **Backend:** `backend/controllers/productsController.js` - `getProducts()` s `search` parametrem
- **HTML:** Search bar v headeru všech stránek (`#globalSearchInput`)
- **Výsledky:** `/search` stránka (`search.html` + `src/js/search-results.js`)

### 2. Přepínání měn
- **Frontend:** `src/js/currency.js`
- **Funkce:** `formatPrice(price)`, `setCurrency()`, `getCurrentCurrency()`
- **Storage:** localStorage klíč `selectedCurrency`
- **Event:** `currencyChanged` custom event
- **Admin:** `/admin/settings` - správa měn (zatím localStorage)

### 3. Košík
- **Frontend:** `src/js/cart.js`
- **Backend:** `backend/controllers/cartController.js`
- **API:** `GET /api/cart`, `POST /api/cart`, `PUT /api/cart`, `DELETE /api/cart`
- **Logika zobrazení:** Kontrola `cart.items.length > 0` → zobrazit `#cartContent` nebo `#emptyCart`

### 4. Historie objednávek
- **Frontend:** `src/js/orders.js` - `loadOrders()`, `displayOrders()`
- **Backend:** `backend/controllers/ordersController.js` - `getUserOrders()`
- **API:** `GET /api/orders` (vyžaduje `X-User-Id` header)
- **Middleware:** `requireAuth` (async!)

### 5. Kalkulačky
- **HTML:** `calculators.html`
- **JavaScript:** `src/js/calculators.js`
- **Funkce:** 7 kalkulaček (plech, trubka, jekl, kulatina, plochá tyč, čtyřhran, šestihran)
- **Tabulka jakostí:** Rozbalovací sekce s informacemi o nerezových materiálech

### 6. Admin panel
- **URL:** `/admin/login` → `/admin/dashboard`
- **Server:** Port 3002
- **Routes:** `backend/routes/adminRoutes.js`
- **Views:** `backend/views/admin-*.html`

---

## 📝 Poslední implementované změny

### 1. Globální vyhledávání (nejnovější)
- ✅ Search bar v headeru na všech stránkách
- ✅ Dropdown s výsledky při psaní (max 5 produktů)
- ✅ Stránka `/search` s výsledky vyhledávání
- ✅ Backend podpora `?search=query` v `/api/products`
- ✅ Opraveno zobrazení výsledků (obrázek, název, cena vedle sebe)

### 2. Kalkulačky (nejnovější)
- ✅ Kompletní redesign stránky kalkulaček
- ✅ Tabulka jakostí nerezových materiálů (5 jakostí: 304, 316, 430, 410, 321)
- ✅ Rozbalovací sekce s informacemi o materiálech
- ✅ 7 kalkulaček: plech, trubka, jekl, kulatina, plochá tyč, čtyřhran, šestihran
- ✅ Výběr jakosti materiálu s automatickou hustotou

### 3. Přepínání měn
- ✅ Currency selector v headeru
- ✅ `formatPrice()` funkce pro formátování cen
- ✅ Integrace do všech stránek (produkty, košík, checkout, objednávky)
- ✅ Admin stránka pro správu měn (`/admin/settings`)

### 4. Statické stránky
- ✅ Vytvořeny stránky: `/about`, `/tables`, `/services`, `/articles`, `/contact`
- ✅ Všechny odkazy na homepage jsou funkční

### 5. Opravy
- ✅ Opravena logika zobrazení košíku (prázdný vs. plný)
- ✅ Opraven import `formatPrice` v `cart.js` a `orders.js`
- ✅ Opraven async `requireAuth` middleware
- ✅ Opraveno zobrazení výsledků ve search baru

---

## ⚠️ Známé problémy a TODO

### Opravené problémy
- ✅ Kolize zobrazení prázdného/plného košíku - **OPRAVENO**
- ✅ Chybějící import `formatPrice` v `cart.js` a `orders.js` - **OPRAVENO**
- ✅ Async middleware `requireAuth` - **OPRAVENO**

### Možné vylepšení
- [ ] Admin správa měn - zatím pouze localStorage, možná přidat do DB
- [ ] Search bar na mobilu - zatím skrytý, možná přidat do hamburger menu
- [ ] Kalkulačky - možná přidat více typů materiálů nebo kalkulaček
- [ ] Validace formulářů - přidat client-side validaci

---

## 🔄 Jak pokračovat v práci

### 1. Před začátkem práce
```bash
# Zkontrolovat stav
git status

# Zkompilovat SASS (pokud byly změny v SASS)
npm run sass:compile

# Spustit servery
npm run server:all
```

### 2. Při přidávání nových funkcí

#### Backend:
1. **Routes** → `backend/routes/*.js` - přidat route
2. **Controller** → `backend/controllers/*.js` - HTTP logika
3. **Service** → `backend/services/*.js` - business logika
4. **Repository** → `backend/repositories/*.js` - SQL queries

#### Frontend:
1. **HTML** → vytvořit/přidat do existujícího HTML
2. **JavaScript** → `src/js/*.js` - funkcionalita
3. **SASS** → `sass/components/_*.scss` - styly
4. **Kompilace** → `npm run sass:compile`

### 3. Důležité pravidla (viz `rules.md`)

⚠️ **PŘEČTI SI `rules.md` PŘED PRACÍ!**

- Backend struktura: `routes` → `controllers` → `services` → `repositories`
- Žádná logika v `server.js`
- Max 50-80 řádků na soubor
- Výstižné názvy proměnných
- Komentáře u složitějších částí

### 4. Při práci s cenami
**VŽDY používat `formatPrice()` z `currency.js`!**
```javascript
import { formatPrice } from './currency.js';
// ...
const priceDisplay = formatPrice(product.price);
```

### 5. Při práci s autentizací
- Middleware `requireAuth` je **async funkce**
- Uživatel se předává v headeru `X-User-Id`
- Frontend: `src/js/auth.js` - `isAuthenticated()`, `getUserId()`

### 6. Při práci s databází
- Používat SQL queries v `repositories/*.js`
- Connection pool: `backend/db/connection.js`
- Prisma je k dispozici, ale hlavně se používá SQL

---

## 💡 Důležité poznámky

### Architektura

#### Backend (Clean Architecture)
```
Request → Route → Controller → Service → Repository → Database
```

- **Routes:** Pouze routování, žádná logika
- **Controllers:** HTTP logika (req/res), validace
- **Services:** Business logika, orchestrace
- **Repositories:** Data access, SQL queries

#### Frontend
- **Modulární JavaScript:** ES6 moduly (`import`/`export`)
- **SASS architektura:** Variables → Mixins → Base → Layout → Components
- **Globální funkce:** `window.functionName` pro inline onclick handlers

### Autentizace

#### Běžní uživatelé
- Frontend: `src/js/auth.js`
- Backend: `backend/middleware/authMiddleware.js` - `requireAuth`
- Header: `X-User-Id` s userId
- Storage: localStorage (`userId`, `userEmail`)

#### Admin
- Admin panel: `/admin/login`
- Admin server: port 3002
- Admin routes: `backend/routes/adminRoutes.js`

### Databáze

- **PostgreSQL** - hlavní databáze
- **Connection:** `backend/db/connection.js` - connection pool
- **Schema:** `backend/db/schema.sql`
- **Migrace:** `backend/db/migrate.js`

### CSS/SASS

- **Kompilace:** `npm run sass:compile`
- **Watch mode:** `npm run sass:watch` (volitelně)
- **Struktura:** Variables → Mixins → Base → Layout → Components
- **Design tokens:** `sass/_variables.scss`

### Deployment

- **Platforma:** Railway
- **Konfigurace:** `railway.json`, `Procfile`
- **Database URL:** Environment variable `DATABASE_URL`

---

## 🔍 Rychlé reference

### Důležité API endpointy

```
GET  /api/products?search=query     # Produkty s vyhledáváním
GET  /api/categories                # Kategorie
GET  /api/cart                      # Košík (vyžaduje X-User-Id)
POST /api/cart                      # Přidat do košíku
GET  /api/orders                    # Objednávky uživatele (vyžaduje X-User-Id)
POST /api/checkout                  # Vytvořit objednávku
GET  /search?q=query                # Stránka výsledků vyhledávání
GET  /calculators                   # Kalkulačky
```

### Důležité JavaScript funkce

```javascript
// Currency
import { formatPrice, setCurrency, getCurrentCurrency } from './currency.js';

// Auth
import { isAuthenticated, getUserId, requireAuth } from './auth.js';

// Search
import { initSearch, performSearch } from './search.js';

// Calculators
toggleGrade(gradeId)        // Rozbalit/sbalit jakost materiálu
calculateSheet()           // Výpočet hmotnosti plechu
calculatePipe()            // Výpočet hmotnosti trubky
// ... další kalkulačky
```

### Důležité CSS třídy

```css
.visible          /* Zobrazit prvek (display: block) */
.search-wrapper   /* Search bar container */
.calculator-item  /* Kalkulačka karta */
.grade-row        /* Řádek v tabulce jakostí */
.cart-item        /* Položka v košíku */
```

---

## 📚 Další dokumentace

- `README.md` - Základní dokumentace projektu
- `rules.md` - **DŮLEŽITÉ:** Pravidla pro vývoj
- `backend/README.md` - Backend dokumentace
- `sass/SASS_DOCUMENTATION.md` - SASS dokumentace
- `docs/` - Další analýzy a plány (většinou v .gitignore)

---

## 🎯 Tipy pro nového agenta

1. **Začni s `rules.md`** - obsahuje důležitá pravidla architektury
2. **Zkontroluj `package.json`** - všechny dostupné npm scripts
3. **Používej `formatPrice()`** - pro všechny ceny na frontendu
4. **Middleware je async** - `requireAuth` je async funkce
5. **SASS kompilace** - po změnách v SASS vždy `npm run sass:compile`
6. **Git workflow** - změny → `git add .` → `git commit -m "..."` → `git push`
7. **Testování** - zkontroluj konzoli prohlížeče (F12) při problémech

---

## 📞 Kontakt a podpora

- **GitHub:** https://github.com/jsonWalker1/Fitinky-eshop.git
- **Deployment:** Railway (production URL v Railway dashboardu)

---

**Poslední aktualizace:** 2024 (po implementaci search baru a kalkulaček)

**Status:** Projekt je funkční a připraven k prezentaci. Všechny hlavní funkce jsou implementované a otestované.

