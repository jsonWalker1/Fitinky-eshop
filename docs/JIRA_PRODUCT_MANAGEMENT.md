# 🎯 JIRA Ticket: Vylepšení Product & Category Management GUI

## 📋 Popis

Aktuální admin rozhraní pro správu produktů a kategorií je velmi spartanské. Je potřeba vytvořit profesionální, plně funkční GUI pro správu produktů a kategorií s důrazem na specifické potřeby pro vodovodní fitinky.

## 🔍 Aktuální stav

- ✅ Základní formulář pro přidání produktu (název, kategorie, cena, popis, dostupnost)
- ❌ Chybí editace produktů
- ❌ Kategorie jsou hardcoded v HTML (ne dynamické z databáze)
- ❌ Žádná správa kategorií v adminu
- ❌ Jen jeden obrázek (URL), žádný upload
- ❌ Chybí produktové atributy specifické pro fitinky
- ❌ Základní seznam bez filtrování/hledání
- ❌ Chybí bulk operace

---

## 🎯 Cíle

### 1. Produktový formulář - Rozšíření

#### Povinné funkce (MVP)
- [ ] **Editace produktů** - formulář pro úpravu existujících produktů
- [ ] **Dynamické kategorie** - načítání z databáze místo hardcoded
- [ ] **Upload obrázků** - možnost nahrát obrázek (alespoň jeden hlavní)
- [ ] **Základní atributy pro fitinky:**
  - Průměr (1/2", 3/4", 1", atd.)
  - Materiál (mosaz, nerez, plast, měď)
  - SKU/EAN kód
- [ ] **Skladové množství** (počet kusů)
- [ ] **Wizard/Tabs** pro organizaci dlouhého formuláře

#### Nice to have
- Více obrázků (galerie)
- Další atributy (tlak, teplota, certifikace, rozměry)
- Varianty produktu (různé průměry = různé ceny)
- SEO metadata (title, description, slug)
- Rich text editor pro popis
- Drag & drop pro obrázky

### 2. Správa kategorií

- [ ] **CRUD pro kategorie** (vytvořit, přečíst, upravit, smazat)
- [ ] **Formulář kategorie:**
  - Název *
  - Slug (auto-generovat z názvu, editovatelný)
  - Popis
  - Obrázek kategorie
  - Pořadí zobrazení
- [ ] **Seznam kategorií** s možností editace/smazání
- [ ] **Hierarchie kategorií** (nadřazená kategorie - pro budoucnost)
- [ ] **Počet produktů** v každé kategorii

### 3. Seznam produktů - Vylepšení

#### Povinné
- [ ] **Vyhledávání** (název, SKU)
- [ ] **Filtrování:**
  - Podle kategorie
  - Podle dostupnosti (skladem, nedostupné, na objednávku)
  - Podle materiálu/průměru (pokud jsou atributy)
- [ ] **Tabulkové zobrazení** s řazením podle sloupců
- [ ] **Paginace** nebo infinite scroll
- [ ] **Rychlé akce:** Editovat, Smazat, Duplikovat

#### Nice to have
- Grid/List/Table view switcher
- Bulk operace (označit více, smazat, změnit kategorii)
- Export do CSV
- Thumbnail obrázků v seznamu

### 4. UX/UI vylepšení

- [ ] **Validace formulářů** v reálném čase
- [ ] **Loading states** (spinner při načítání/ukládání)
- [ ] **Toast notifikace** (success/error) místo alert()
- [ ] **Confirmation modals** místo confirm()
- [ ] **Sidebar navigace** (Produkty, Kategorie, Objednávky, Uživatelé)
- [ ] **Breadcrumbs** pro lepší navigaci
- [ ] **Responsive design** (funguje i na tabletu)

---

## 🔧 Technické požadavky

### Backend API

#### Produkty
- `GET /admin/api/products` - seznam s filtrováním, paginací, řazením
- `GET /admin/api/products/:id` - detail produktu
- `POST /admin/api/products` - vytvoření
- `PUT /admin/api/products/:id` - editace
- `DELETE /admin/api/products/:id` - smazání
- `POST /admin/api/products/:id/duplicate` - duplikace
- `POST /admin/api/products/upload-image` - upload obrázku

#### Kategorie
- `GET /admin/api/categories` - seznam
- `GET /admin/api/categories/:id` - detail
- `POST /admin/api/categories` - vytvoření
- `PUT /admin/api/categories/:id` - editace
- `DELETE /admin/api/categories/:id` - smazání
- `PUT /admin/api/categories/reorder` - změna pořadí

### Datový model produktu (rozšíření)

```javascript
{
  id, name, price, description, category, availabilityStatus, // současné
  images: [], // array místo jednoho
  attributes: {
    diameter: "1/2\"",
    material: "mosaz",
    sku: "FIT-001",
    ean: "1234567890123",
    // ... další
  },
  stock: {
    quantity: 100,
    minOrder: 1,
    location: "Sklad 1"
  },
  seo: {
    title: "...",
    description: "...",
    slug: "produkt-slug"
  }
}
```

### Struktura souborů

```
backend/
├── views/
│   ├── admin-products.html (nová stránka)
│   └── admin-categories.html (nová stránka)
├── controllers/
│   ├── adminProductsController.js (rozšířit)
│   └── adminCategoriesController.js (nový)
└── services/
    ├── productsService.js (rozšířit)
    └── categoriesService.js (rozšířit)
```

---

## 📊 Prioritizace

### 🔴 Vysoká priorita (Must have)
1. Editace produktů
2. Dynamické načítání kategorií
3. Upload obrázku (alespoň jeden)
4. Základní atributy (průměr, materiál, SKU)
5. Správa kategorií (CRUD)
6. Filtrování a vyhledávání v seznamu

### 🟡 Střední priorita (Should have)
7. Více obrázků
8. Skladové množství
9. Tabulkové zobrazení
10. Duplikace produktu
11. Bulk operace

### 🟢 Nízká priorita (Nice to have)
12. Varianty produktu
13. SEO metadata
14. Rich text editor
15. Export CSV
16. Historie změn

---

## 📝 Acceptance Criteria

### Produkty
- ✅ Uživatel může vytvořit nový produkt s povinnými poli
- ✅ Uživatel může upravit existující produkt
- ✅ Uživatel může smazat produkt (s potvrzením)
- ✅ Uživatel může nahrát obrázek produktu
- ✅ Uživatel může vyplnit atributy produktu (průměr, materiál, SKU)
- ✅ Uživatel může vyhledávat a filtrovat produkty
- ✅ Produkty se zobrazují v přehledné tabulce

### Kategorie
- ✅ Uživatel může vytvořit novou kategorii
- ✅ Uživatel může upravit kategorii
- ✅ Uživatel může smazat kategorii (s kontrolou, že nejsou produkty)
- ✅ Kategorie se dynamicky načítají do selectu v produktovém formuláři
- ✅ Uživatel vidí počet produktů v každé kategorii

### UX
- ✅ Formuláře mají validaci v reálném čase
- ✅ Zobrazují se loading stavy při načítání/ukládání
- ✅ Success/Error notifikace místo alert()
- ✅ Design je konzistentní s aktuálním admin rozhraním

---

## 🔗 Související

- Prisma migrace (pro trvalé uložení dat)
- Image upload storage (lokální nebo cloud)
- Validace a sanitizace vstupů

---

## 💡 Poznámky

- Inspirace: Medusa admin, WooCommerce, Shopify admin
- Pro fitinky jsou důležité technické parametry (průměr, materiál, tlak, teplota)
- Zvážit varianty produktu pro různé průměry (např. stejný produkt v 1/2" a 3/4")
- V budoucnu přidat import/export CSV pro hromadné operace

