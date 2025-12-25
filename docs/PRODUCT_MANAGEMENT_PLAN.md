# 🎯 Plán vylepšení Product & Category Management GUI

## 📋 Aktuální stav (Spartánský)

### Produkty:
- ✅ Základní formulář: název, kategorie, cena, popis, availability status
- ❌ Žádné editování produktů
- ❌ Kategorie hardcoded v HTML (ne dynamické)
- ❌ Jedna možnost obrázku (jen URL)
- ❌ Žádné produktové atributy (pro fitinky: průměr, materiál, závit, atd.)
- ❌ Žádné varianty produktu
- ❌ Základní seznam produktů bez filtrování/hledání
- ❌ Žádné bulk operace

### Kategorie:
- ❌ Žádná správa kategorií v adminu
- ❌ Nelze přidávat/editovat/mazat kategorie
- ❌ Kategorie jen v JSON souboru

---

## 🎨 Navržená vylepšení

### 1. PRODUKTOVÝ FORMULÁŘ - Rozšířený

#### Základní informace
- [x] Název produktu *
- [x] Cena (Kč) *
- [x] Popis (WYSIWYG editor?)
- [x] Kategorie * (dynamický select z databáze)

#### Obrázky produktu
- [ ] **Upload více obrázků** (hlavní + galerie)
- [ ] Drag & drop pro změnu pořadí
- [ ] Preview obrázků před uložením
- [ ] Alt text pro každý obrázek
- [ ] Crop/resize obrázku před uploadem
- [ ] Možnost upload z URL nebo lokální soubor

#### Atributy specifické pro fitinky
- [ ] **Průměr** (1/2", 3/4", 1", atd.) - select nebo text
- [ ] **Materiál** (mosaz, nerez, plast, měď, atd.)
- [ ] **Typ závitu** (vnitřní/vnější, pravá/levá)
- [ ] **Pracovní tlak** (bar)
- [ ] **Teplota** (min/max °C)
- [ ] **Certifikace** (CE, DIN, atd.)
- [ ] **EAN/SKU kód**
- [ ] **Výrobce/Dodavatel**
- [ ] **Hmotnost** (gramy/kg)
- [ ] **Rozměry** (délka, šířka, výška v mm)

#### Varianty produktu
- [ ] Možnost vytvořit varianty produktu (např. různé průměry stejného produktu)
- [ ] Každá varianta má vlastní cenu, SKU, dostupnost
- [ ] Tabulka s variantami (průměr → cena → sklad)

#### Dostupnost a sklad
- [x] Status dostupnosti (in_stock, on_order, out_of_stock)
- [ ] **Skladové množství** (počet kusů)
- [ ] **Minimální objednávkové množství**
- [ ] **Doba dodání** (pracovní dny)
- [ ] **Skladové lokace** (pokud je jich více)

#### SEO a metadata
- [ ] **SEO title** (pokud se liší od názvu)
- [ ] **SEO description**
- [ ] **Meta keywords**
- [ ] **URL slug** (editovatelný)

#### Další možnosti
- [ ] **Zobrazit na homepage?** (checkbox)
- [ ] **Doporučený produkt?** (featured)
- [ ] **Novinka?** (new product badge)
- [ ] **Akční produkt?** (sleva %)
- [ ] **Datum platnosti ceny** (pokud je to časově omezené)
- [ ] **Poznámka pro adminy** (interní poznámka, neviditelná pro zákazníky)

---

### 2. SPRÁVA KATEGORIÍ

#### Formulář kategorie
- [ ] **Název kategorie** *
- [ ] **Slug** (automatický z názvu, editovatelný)
- [ ] **Popis kategorie**
- [ ] **Nadřazená kategorie** (pro hierarchii - např. "Kohouty" → "Kulové kohouty")
- [ ] **Obrázek kategorie** (upload nebo URL)
- [ ] **Ikona kategorie** (emoji nebo icon)
- [ ] **Pořadí zobrazení** (drag & drop nebo číslo)
- [ ] **SEO metadata** (title, description)
- [ ] **Aktivní?** (checkbox - skrytá kategorie)

#### Kategorie tree/hierarchie
- [ ] Zobrazení kategorií jako strom (parent/child)
- [ ] Drag & drop pro změnu pořadí/hierarchie
- [ ] Počet produktů v každé kategorii
- [ ] Rychlé akce: Editovat, Smazat, Duplikovat
- [ ] Bulk operace (smazat více, přesunout produkty, atd.)

---

### 3. SEZNAM PRODUKTŮ - Vylepšený

#### Filtrování a vyhledávání
- [ ] **Vyhledávací pole** (název, SKU, EAN)
- [ ] **Filtr podle kategorie** (multi-select)
- [ ] **Filtr podle dostupnosti** (in_stock, out_of_stock, on_order)
- [ ] **Filtr podle materiálu** (pokud je atribut)
- [ ] **Filtr podle průměru** (pokud je atribut)
- [ ] **Filtr podle ceny** (rozsah)
- [ ] **Filtr podle data vytvoření** (poslední týden, měsíc, atd.)

#### Zobrazení produktů
- [ ] **Zobrazení: List / Grid / Table** (přepínač)
- [ ] **Tabulkové zobrazení** s řazením podle sloupců
- [ ] **Thumbnail obrázků** v seznamu
- [ ] **Rychlý náhled** (hover nebo modal)
- [ ] **Počet produktů na stránku** (10, 25, 50, 100)
- [ ] **Paginace** nebo infinite scroll

#### Akce na produktech
- [ ] **Editovat** (tlačítko nebo klik na řádek)
- [ ] **Smazat** (s potvrzením)
- [ ] **Duplikovat** (vytvoří kopii pro rychlé přidání podobného)
- [ ] **Změnit dostupnost** (rychle bez otevření editace)
- [ ] **Změnit kategorii** (bulk operace)
- [ ] **Exportovat** (CSV, Excel)
- [ ] **Importovat** (CSV import)

#### Bulk operace
- [ ] **Checkboxy** pro výběr více produktů
- [ ] **Smazat vybrané**
- [ ] **Změnit kategorii vybraným**
- [ ] **Změnit dostupnost vybraným**
- [ ] **Exportovat vybrané**

#### Statistiky
- [ ] **Celkový počet produktů**
- [ ] **Počet skladem / nedostupných**
- [ ] **Nejnovější produkty**
- [ ] **Produkty bez obrázku** (warning)

---

### 4. UX/UI VYLEPŠENÍ

#### Formulář UX
- [ ] **Wizard/Tabs** pro dlouhý formulář (Základní info → Obrázky → Atributy → SEO)
- [ ] **Live preview** produktu při vytváření
- [ ] **Validace v reálném čase** (zobrazit chyby okamžitě)
- [ ] **Autocomplete** pro často používané hodnoty (materiály, průměry)
- [ ] **Save draft** (uložit jako koncept, ještě nepublikovat)
- [ ] **Keyboard shortcuts** (Ctrl+S pro uložení, Esc pro zrušení)

#### Vizuální vylepšení
- [ ] **Moderní design** (podle aktuálního admin stylu)
- [ ] **Responsive** (funguje i na tabletu)
- [ ] **Dark mode** (volitelně)
- [ ] **Loading states** (spinner při načítání)
- [ ] **Success/Error toasts** (hezčí než alert())
- [ ] **Confirmation modals** (hezčí než confirm())

#### Navigace
- [ ] **Sidebar menu** (Produkty, Kategorie, Objednávky, Uživatelé)
- [ ] **Breadcrumbs** (Produkty > Editovat > Název produktu)
- [ ] **Quick actions** (FAB button pro rychlé přidání produktu)

---

### 5. BACKEND ROZŠÍŘENÍ

#### Produktový model (JSON/Prisma)
Rozšířit strukturu produktu o:
- `images: []` (array obrázků místo jednoho)
- `attributes: {}` (průměr, materiál, atd. jako objekt)
- `variants: []` (varianty produktu)
- `stock: { quantity, minOrder, location }`
- `seo: { title, description, keywords, slug }`
- `metadata: { featured, new, discount, expiresAt }`

#### API endpointy
- `GET /admin/api/products` (s filtrováním, paginací, řazením)
- `GET /admin/api/products/:id`
- `POST /admin/api/products` (vytvoření)
- `PUT /admin/api/products/:id` (editace)
- `DELETE /admin/api/products/:id`
- `POST /admin/api/products/bulk` (bulk operace)
- `POST /admin/api/products/:id/duplicate`
- `POST /admin/api/products/upload-image` (upload obrázku)

#### Kategorie API
- `GET /admin/api/categories`
- `GET /admin/api/categories/:id`
- `POST /admin/api/categories`
- `PUT /admin/api/categories/:id`
- `DELETE /admin/api/categories/:id`
- `PUT /admin/api/categories/reorder` (změna pořadí)

#### Validace
- Validovat povinná pole
- Validovat formáty (cena > 0, slug formát, atd.)
- Validovat unikátnost (slug, SKU, EAN)

---

### 6. DODATEČNÉ FUNKCE (Nice to have)

#### Import/Export
- [ ] **Export do CSV/Excel** (všechny produkty nebo vybrané)
- [ ] **Import z CSV/Excel** (bulk přidání produktů)
- [ ] **Template CSV** ke stažení
- [ ] **Preview importu** před uložením

#### Historie a audit
- [ ] **Historie změn** produktu (kdo, kdy, co změnil)
- [ ] **Verze produktu** (možnost vrátit se k předchozí verzi)

#### Notifikace
- [ ] **Email notifikace** při nízkém stavu skladu
- [ ] **Dashboard widget** s varováními (produkty bez obrázku, nízký sklad, atd.)

#### Integrace
- [ ] **Google Merchant** export (pro Google Shopping)
- [ ] **Heureka XML** export (pro srovnávače cen)

---

## 📊 Prioritizace

### 🔴 Vysoká priorita (MVP)
1. Editace produktů (doplnit k přidávání)
2. Dynamické načítání kategorií (místo hardcoded)
3. Upload obrázku (alespoň jednoho)
4. Základní atributy pro fitinky (průměr, materiál)
5. Správa kategorií (CRUD)
6. Filtrování a vyhledávání v seznamu produktů

### 🟡 Střední priorita
7. Více obrázků na produkt
8. Skladové množství
9. Tabulkové zobrazení produktů
10. Bulk operace (smazat, změnit kategorii)
11. Duplikace produktu

### 🟢 Nízká priorita (Nice to have)
12. Varianty produktu
13. WYSIWYG editor pro popis
14. SEO metadata
15. Import/Export CSV
16. Historie změn

---

## 💡 Inspirace z Medusa a e-commerce platforem

### Co Medusa má:
- Advanced product variants (velikost, barva, atd.)
- Product collections (skupiny produktů)
- Product tags
- Rich text editor pro popis
- Multiple images s alt text
- SEO fields
- Inventory management
- Product options (customizable attributes)

### Co mají e-shopy s fitinkami:
- Filtrování podle průměru, materiálu, typu
- Technické parametry (tlak, teplota)
- Certifikace
- Kompatibilita (co s čím jde kombinovat)
- Technické výkresy (PDF)

---

## 📝 Poznámky k implementaci

### Struktura souborů
```
backend/
├── views/
│   ├── admin-products.html (nová stránka pro produkty)
│   ├── admin-categories.html (nová stránka pro kategorie)
│   └── admin-dashboard.html (upravit - jen odkazy)
├── controllers/
│   ├── adminProductsController.js (rozšířit)
│   └── adminCategoriesController.js (nový)
├── services/
│   ├── productsService.js (rozšířit)
│   └── categoriesService.js (rozšířit)
└── routes/
    └── adminProductsRoutes.js (nový, nebo rozšířit adminRoutes)

frontend/
├── admin/
│   ├── products/
│   │   ├── list.js
│   │   ├── form.js
│   │   └── filters.js
│   └── categories/
│       ├── list.js
│       └── form.js
```

### Technologie
- **Image upload:** Multer (Express middleware) nebo cloud storage (Cloudinary, AWS S3)
- **Form validation:** Client-side (HTML5 + JS) + Server-side
- **Rich text editor:** Quill.js nebo TinyMCE (volitelně)
- **Table/Grid:** Vlastní nebo Datatables.js

---

## ✅ Checklist pro ticket

- [ ] Rozšířit produktový model o atributy (průměr, materiál, SKU, atd.)
- [ ] Přidat editaci produktů (GET/PUT endpointy + formulář)
- [ ] Vytvořit správu kategorií (CRUD)
- [ ] Implementovat upload obrázků
- [ ] Přidat filtrování a vyhledávání v seznamu produktů
- [ ] Vylepšit UX formuláře (validace, loading states)
- [ ] Přidat bulk operace (smazat více, změnit kategorii)
- [ ] Přidat duplikaci produktu
- [ ] Skladové množství
- [ ] Tabulkové zobrazení s řazením

