# Eshop Admin GUI

Full-stack e-commerce platform s admin panelem. Experimentální projekt vytvořený ve spolupráci s AI pro učení a zkoušení moderních webových technologií.

## 📖 O projektu

Tento projekt vznikl jako experimentální zkouška programování s AI asistencí. Cílem bylo vytvořit funkční e-commerce platformu s kompletním admin panelem a naučit se moderní webové technologie a best practices.

Projekt zahrnuje jak zákaznickou část (storefront), tak komplexní admin rozhraní pro správu produktů, objednávek a uživatelů.

## 📋 Obsah

- [Technologie](#technologie)
- [Struktura projektu](#struktura-projektu)
- [Instalace a spuštění](#instalace-a-spuštění)
- [Sass struktura](#sass-struktura)
- [Mixiny](#mixiny)
- [Komponenty](#komponenty)
- [Workflow](#workflow)

## 🛠 Technologie

### Frontend
- **HTML5** - semantická struktura stránky
- **SASS/SCSS** - CSS preprocesor s modulární architekturou
- **JavaScript (ES6+)** - moderní JavaScript s moduly
- **Vite** - dev server s hot module replacement

### Backend
- **Node.js** - runtime prostředí
- **Express.js** - web framework
- **PostgreSQL** - relační databáze
- **Prisma** - ORM pro type-safe databázový přístup

### Deployment
- **Railway** - cloud hosting platforma

## 📁 Struktura projektu

```
eshopAdminGUI/
├── backend/            # Backend aplikace
│   ├── controllers/   # HTTP request handlers
│   ├── services/      # Business logika
│   ├── repositories/  # Data access layer
│   ├── routes/        # API routy
│   ├── middleware/    # Express middleware
│   ├── db/            # Database migrace a utilities
│   └── views/         # Admin HTML šablony
├── src/js/            # Frontend JavaScript moduly
├── sass/              # SASS/SCSS soubory
│   ├── _variables.scss # Design tokens
│   ├── _mixins.scss   # Reusable mixiny
│   ├── _base.scss     # Reset a base styles
│   ├── _layout.scss   # Layout komponenty
│   └── components/    # Component styles
├── assets/            # Statické soubory
├── *.html             # Frontend stránky
└── package.json       # NPM konfigurace
```

## 🎯 Stav projektu

### ✅ Co je hotové a funguje

#### Zákaznická část (Frontend)
- ✅ **Procházení produktů a kategorií** - Zobrazení produktů podle kategorií, filtrování
- ✅ **Nákupní košík** - Přidávání/odebírání produktů, zobrazení celkové ceny
- ✅ **Proces objednávky (checkout)** - Formulář pro dokončení objednávky
- ✅ **Historie objednávek** - Zobrazení všech objednávek uživatele
- ✅ **Uživatelská autentizace** - Přihlášení/odhlášení, demo uživatel
- ✅ **Globální vyhledávání** - Search bar v headeru, dropdown s výsledky, stránka výsledků
- ✅ **Přepínání měn** - CZK, EUR, USD s ukládáním do localStorage
- ✅ **Kalkulačky** - Výpočet hmotností nerezových materiálů (plech, trubka, jekl, atd.)
- ✅ **Tabulka jakostí** - Rozbalovací sekce s informacemi o nerezových materiálech
- ✅ **Statické stránky** - About, Contact, Services, Articles
- ✅ **Kontaktní formulář** - Odesílání zpráv s backend API
- ✅ **Kategorie stránka** - Dynamické zobrazení produktů podle kategorie (`/category/:slug`)

#### Admin panel
- ✅ **Dashboard** - Přehled statistik a rychlé akce
- ✅ **Správa produktů** - CRUD operace, inline editor, galerie obrázků
- ✅ **Správa kategorií** - Hlavní kategorie a podkategorie (hierarchie)
- ✅ **Správa objednávek** - Zobrazení a správa objednávek
- ✅ **Správa uživatelů** - Zobrazení uživatelů
- ✅ **Správa zpráv** - Zobrazení zpráv z kontaktního formuláře
- ✅ **Správa produktových atributů** - Materiál, tvar, typ připojení, průměr (DN)
- ✅ **Kategorie sortimentu** - Nejprodávanější, Skladem, Zlevněné (many-to-many)
- ✅ **Globální vyhledávání** - Vyhledávání produktů, objednávek, uživatelů, kategorií
- ✅ **Správa měn** - Nastavení kurzů pro přepínání měn

#### Backend a databáze
- ✅ **PostgreSQL databáze** - Kompletní schéma s produkty, kategoriemi, objednávkami, uživateli
- ✅ **API endpointy** - RESTful API pro všechny entity
- ✅ **Autentizace** - Middleware pro ověření uživatelů
- ✅ **Migrace** - SQL migrace pro databázové změny
- ✅ **Hierarchie kategorií** - Podpora podkategorií (parent_id)

### ❌ Co nefunguje nebo není dokončené

- ⚠️ **Validace formulářů** - Omezení inputů byly odstraněny, není client-side validace
- ⚠️ **Admin autentizace** - Jednoduchá autentizace (admin/admin123), bez JWT/session
- ⚠️ **Hashování hesel** - Hesla nejsou hashovaná (pouze demo)
- ⚠️ **Měny v databázi** - Kurzy měn jsou zatím pouze v localStorage
- ⚠️ **Search bar na mobilu** - Je skrytý, není v hamburger menu
- ⚠️ **Error handling** - Není kompletní error handling na všech místech
- ⚠️ **Testování** - Chybí unit a integration testy

### 📋 Co je v plánu (TODO)

- [ ] **Bezpečnost** - Implementovat hashování hesel (bcrypt), JWT tokeny, rate limiting
- [ ] **Validace** - Přidat client-side a server-side validaci formulářů
- [ ] **Měny v DB** - Přesunout kurzy měn z localStorage do databáze
- [ ] **Mobilní optimalizace** - Přidat search bar do hamburger menu, vylepšit responzivitu
- [ ] **Testování** - Přidat unit testy a integration testy
- [ ] **Dokumentace API** - Vytvořit kompletní API dokumentaci
- [ ] **Email notifikace** - Odesílání emailů při nových objednávkách/zprávách
- [ ] **Export dat** - Možnost exportovat produkty/objednávky do CSV/Excel
- [ ] **Statistiky a reporty** - Rozšířit dashboard o grafy a detailní statistiky
- [ ] **Produktové varianty** - Podpora různých variant produktů (barva, velikost)

## 🚀 Instalace a spuštění

### Instalace závislostí

```bash
npm install
```

### Spuštění backend serveru

```bash
npm run server
```

Backend server běží na **http://localhost:3001**

### Spuštění admin serveru

```bash
npm run server:admin
```

Admin server běží na **http://localhost:3002**

### Spuštění obou serverů najednou

```bash
npm run server:all
```

### Kompilace Sass

**Watch mode (automatická kompilace při změnách):**
```bash
npm run sass:watch
```

**Jednorázová kompilace:**
```bash
npm run sass:compile
```

**Důležité:** CSS se kompiluje do `sass/main.css`. HTML odkazuje na tento soubor.

### Build pro produkci

```bash
npm run build
```

Build najdete ve složce `dist/`.

## 🎨 Sass struktura

### Importy v `main.scss`

Všechny Sass soubory se importují v `sass/main.scss` pomocí `@use`:

```scss
@use 'variables';           // Proměnné
@use 'mixins';              // Mixiny
@use 'base';                // Základní styly
@use 'layout';              // Layout
@use 'components/header';    // Header komponenta
@use 'components/footer';   // Footer komponenta
@use 'components/mainCon';  // Main container
@use 'components/landingPage'; // Landing page
```

**Poznámka:** Při přidávání nových komponent nezapomeňte je přidat do `main.scss`!

### Soubory a jejich účel

- **`_variables.scss`** - CSS proměnné (barvy, spacing, typography, breakpoints)
- **`_mixins.scss`** - Znovupoužitelné mixiny (tlačítka, text, atd.)
- **`_base.scss`** - Reset CSS a globální základní styly
- **`_layout.scss`** - Layout styly (mainContainer, grid, atd.)
- **`components/_*.scss`** - Styly pro jednotlivé komponenty

## 🎯 Mixiny

Všechny mixiny jsou v `sass/_mixins.scss`. Používají se pomocí `@include`.

### Tlačítka

#### `button-base`
Základní styl pro všechna tlačítka.

```scss
.my-button {
    @include button-base;
}
```

#### `button-primary($bg-color, $hover-color, $text-color)`
Primární tlačítko s modrým pozadím.

**Parametry:**
- `$bg-color` - barva pozadí (default: `#007bff`)
- `$hover-color` - barva při hoveru (default: `#0056b3`)
- `$text-color` - barva textu (default: `#fff`)

**Příklad:**
```scss
.btn-primary {
    @include button-primary;
}

// Vlastní barvy
.custom-btn {
    @include button-primary(#ff0000, #cc0000, #fff);
}
```

#### `button-secondary($bg-color, $text-color, $hover-bg)`
Sekundární tlačítko s bílým pozadím.

**Parametry:**
- `$bg-color` - barva pozadí (default: `#fff`)
- `$text-color` - barva textu (default: `#667eea`)
- `$hover-bg` - barva pozadí při hoveru (default: `#f8f9fa`)

**Příklad:**
```scss
.btn-secondary {
    @include button-secondary;
}
```

#### `button-outline($border-color, $text-color, $hover-bg, $hover-text)`
Tlačítko s obrysem (outline).

**Parametry:**
- `$border-color` - barva rámečku (default: `#007bff`)
- `$text-color` - barva textu (default: `#007bff`)
- `$hover-bg` - barva pozadí při hoveru (default: `#007bff`)
- `$hover-text` - barva textu při hoveru (default: `#fff`)

**Příklad:**
```scss
.btn-outline {
    @include button-outline;
}
```

### Text

#### `text-heading($size, $weight, $color, $margin-bottom)`
Styl pro nadpisy.

**Parametry:**
- `$size` - velikost písma (default: `2rem`)
- `$weight` - tloušťka písma (default: `600`)
- `$color` - barva (default: `#333`)
- `$margin-bottom` - spodní mezera (default: `1rem`)

**Příklad:**
```scss
h1 {
    @include text-heading(3rem, 700, #fff, 1rem);
}
```

#### `text-body($size, $color, $line-height, $margin-bottom)`
Styl pro text odstavců.

**Parametry:**
- `$size` - velikost písma (default: `1rem`)
- `$color` - barva (default: `#666`)
- `$line-height` - výška řádku (default: `1.6`)
- `$margin-bottom` - spodní mezera (default: `0`)

**Příklad:**
```scss
p {
    @include text-body(1.25rem, #666, 1.6, 1rem);
}
```

#### `text-link($color, $hover-color)`
Styl pro odkazy.

**Parametry:**
- `$color` - barva odkazu (default: `#007bff`)
- `$hover-color` - barva při hoveru (default: `#0056b3`)

**Příklad:**
```scss
a {
    @include text-link;
}
```

#### `text-center`
Zarovnání textu na střed.

```scss
.centered-text {
    @include text-center;
}
```

#### `text-uppercase`
Převod na velká písmena s mezerami.

```scss
.uppercase-text {
    @include text-uppercase;
}
```

## 🧩 Komponenty

### Header (`components/_header.scss`)

Styly pro hlavičku stránky s navigací a menu.

**HTML struktura:**
```html
<header>
    <div class="logo">...</div>
    <div class="header-menu">
        <nav>...</nav>
    </div>
    <div class="right-menu">...</div>
</header>
```

### Footer (`components/_footer.scss`)

Styly pro patičku stránky.

### Landing Page (`components/_landingPage.scss`)

Styly pro landing page včetně:
- Hero sekce
- Features sekce
- CTA (Call to Action) sekce
- Tlačítka

**HTML struktura:**
```html
<main>
    <section class="hero">...</section>
    <section class="features">...</section>
    <section class="cta">...</section>
</main>
```

### Main Container (`components/_mainCon.scss`)

Styly pro hlavní kontejner.

## 🔄 Workflow

### Přidání nové komponenty

1. Vytvoř nový soubor v `sass/components/_nazevKomponenty.scss`
2. Přidej import do `sass/main.scss`:
   ```scss
   @use 'components/nazevKomponenty';
   ```
3. Zkompiluj Sass: `npm run sass:compile` nebo použij watch mode

### Editace existující komponenty

1. Otevři příslušný soubor v `sass/components/`
2. Proveď změny
3. Pokud používáš watch mode, změny se zkompilují automaticky
4. Pokud ne, spusť `npm run sass:compile`

### Použití mixinů v nové komponentě

```scss
@use '../mixins' as *;

.my-component {
    h1 {
        @include text-heading(2rem, 600, #333, 1rem);
    }
    
    .btn {
        @include button-primary;
    }
}
```

**Důležité:** `@use` musí být na začátku souboru, před jakýmkoli jiným kódem!

## 📝 Poznámky

- Všechny Sass soubory začínají podtržítkem `_` (partials)
- CSS se kompiluje do `sass/main.css`
- HTML odkazuje na `/sass/main.css`
- Při změnách v Sass vždy zkompiluj nebo použij watch mode
- Mixiny jsou v `_mixins.scss` a používají se pomocí `@include`
- Proměnné jsou v `_variables.scss` (aktuálně prázdné, připravené k použití)

## 🐛 Řešení problémů

### Sass se nekompiluje
- Zkontroluj, že máš správnou cestu v `main.scss`
- Zkontroluj syntaxi Sass (žádné chyby)
- Zkus smazat `main.css` a zkompilovat znovu

### Změny se nezobrazují
- Zkontroluj, že jsi zkompiloval Sass (`npm run sass:compile`)
- Obnov stránku v prohlížeči (Ctrl+F5 pro hard refresh)
- Zkontroluj, že HTML odkazuje na správný CSS soubor

### Mixiny nefungují
- Zkontroluj, že máš `@use '../mixins' as *;` na začátku souboru
- Zkontroluj, že mixin existuje v `_mixins.scss`
- Zkontroluj syntaxi `@include mixin-name;`

---

## 💡 O projektu a AI spolupráci

Tento projekt vznikl jako experimentální zkouška programování s AI asistencí. Cílem bylo:

- Naučit se moderní webové technologie (Node.js, Express, PostgreSQL, Prisma)
- Vyzkoušet clean architecture a best practices
- Vytvořit funkční full-stack aplikaci od začátku do konce
- Pochopit, jak AI může pomoci při vývoji a učení

Projekt demonstruje:
- **Layered architecture** - Routes → Controllers → Services → Repositories
- **RESTful API design** - Konzistentní API endpointy
- **Database design** - Normalizované schéma s Prisma ORM
- **Modern frontend** - ES6 moduly, SASS architektura
- **Production deployment** - Railway cloud hosting

---

**Poslední aktualizace:** 2024
