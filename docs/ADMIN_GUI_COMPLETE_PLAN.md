# 🎯 Komplexní plán vylepšení Admin GUI

## 📊 Aktuální stav

### Existující stránky:
1. **Admin Login** - základní přihlášení
2. **Admin Dashboard** - formulář pro přidání produktu + seznam produktů
3. **Admin Users** - seznam uživatelů (reset hesla, smazání)
4. **Admin Orders** - seznam objednávek (změna statusu, detail přes alert())

### Problémy:
- ❌ Žádná sidebar navigace (jen odkazy v headeru)
- ❌ Dashboard bez statistik a přehledů
- ❌ Žádná správa kategorií jako samostatná stránka
- ❌ Chybí detail objednávky (pouze alert())
- ❌ Chybí detail uživatele
- ❌ Chybí filtrování/vyhledávání
- ❌ Chybí export funkcionality
- ❌ Žádné statistiky/KPIs
- ❌ Chybí nastavení/konfigurace

---

## 🏗️ Návrh struktury Admin GUI

### 1. NAVIGACE A LAYOUT

#### 1.1 Sidebar Menu (Hlavní navigace)
```
┌─────────────────────────┐
│  📊 Dashboard           │ ← Hlavní přehled
│  📦 Produkty            │ ← Správa produktů
│  📁 Kategorie           │ ← Správa kategorií
│  🛒 Objednávky          │ ← Správa objednávek
│  👥 Uživatelé           │ ← Správa uživatelů
│  ⚙️  Nastavení          │ ← Konfigurace
│  📊 Statistiky          │ ← Reporty a analýzy
│  🔐 Odhlásit se         │
└─────────────────────────┘
```

**Features:**
- [1] Collapsible sidebar (skrýt/ukázat)
- [ ] Active state (označit aktuální stránku)
- [1] Icons pro každou sekci
- [ ] Badge s počtem (např. "Objednávky (5)" pro nové)
- [1] Responsive (na mobilu hamburger menu)
- [1] Logo/název eshopu v headeru

#### 1.2 Top Header Bar
```
┌─────────────────────────────────────────────────┐
│ [Logo] Eshop Admin    🔔 [Notifications] [User]│
└─────────────────────────────────────────────────┘
```

**Features:**
- [1] Logo/Název aplikace
- [ ] Notifikace (badge s počtem nových objednávek)
- [ ] Uživatelský menu (profil, odhlásit se)
- [ ] Search bar (globální vyhledávání)
- [ ] Breadcrumbs (kde se nacházím)

---

### 2. DASHBOARD (Hlavní přehled)

#### 2.1 Statistiky Widgety (Cards)
```
┌──────────┬──────────┬──────────┬──────────┐
│ 📦 150   │ 🛒 23    │ 👥 89    │ 💰 45K   │
│ Produkty │ Objednávky│Uživatelé │Tržby dnes│
└──────────┴──────────┴──────────┴──────────┘
```

**Statistiky zobrazit:**
- [ ] Celkový počet produktů
- [ ] Počet aktivních objednávek (pending, processing)
- [ ] Počet uživatelů
- [ ] Tržby (dnes/tento měsíc/celkem)
- [ ] Průměrná hodnota objednávky
- [ ] Procentuální změna oproti předchozímu období

#### 2.2 Grafy
- [ ] **Graf tržeb** (line chart - tržby za posledních 7/30 dní)
- [ ] **Graf objednávek** (bar chart - objednávky podle statusu)
- [ ] **Top produkty** (pie chart nebo bar chart - nejprodávanější)
- [ ] **Aktivita uživatelů** (line chart - noví uživatelé v čase)

#### 2.3 Rychlé akce (Quick Actions)
- [ ] "Přidat produkt" (tlačítko → přesměrování na produkty)
- [ ] "Zobrazit nové objednávky" (tlačítko → objednávky)
- [ ] "Export dat" (dropdown s možnostmi)

#### 2.4 Recent Activity / Feed
- [ ] Poslední objednávky (5 nejnovějších)
- [ ] Poslední registrovaní uživatelé
- [ ] Poslední přidané produkty
- [ ] Systémové notifikace (nízký sklad, chybějící údaje, atd.)

---

### 3. PRODUKTY (Rozšířená verze)

#### 3.1 Produkty - List View
```
┌─────────────────────────────────────────────────────────────┐
│ Produkty                               [+ Přidat produkt]   │
├─────────────────────────────────────────────────────────────┤
│ [🔍 Hledat...] [📁 Kategorie ▼] [📊 Status ▼] [🔄 Refresh] │
├─────────────────────────────────────────────────────────────┤
│ [☐] Název        │ Kategorie │ Cena │ Status │ Akce        │
│ [☐] Produkt 1    │ Fitinky   │ 150  │ ✓      │ [Edit][Del] │
│ [☐] Produkt 2    │ Tvarovky  │ 89   │ ⚠️      │ [Edit][Del] │
└─────────────────────────────────────────────────────────────┘
│ Zobrazeno 1-25 z 150          [<] [1][2][3] ... [>]        │
└─────────────────────────────────────────────────────────────┘
```

**Features:**
- [ ] Tabulkové zobrazení s řazením (kliknutí na sloupec)
- [ ] Bulk selection (checkboxy pro výběr více)
- [ ] Filtry: kategorie, status, materiál, průměr, cena
- [ ] Vyhledávání (název, SKU, EAN)
- [ ] Paginace nebo infinite scroll
- [ ] Export (CSV, Excel)
- [ ] Zobrazení: Grid / List / Table switcher
- [ ] Quick edit (inline editování některých polí)

#### 3.2 Produkty - Detail/Edit View
- [ ] Full-page formulář pro editaci
- [ ] Tabs: Základní info | Obrázky | Atributy | SEO | Varianty
- [ ] Live preview produktu
- [ ] Historie změn (kdo, kdy, co změnil)
- [ ] Duplikovat produkt
- [ ] Smazat produkt (s potvrzením)

#### 3.3 Produkty - Kategorie (Správa kategorií)

**List View - Přehled kategorií:**
```
┌─────────────────────────────────────────────────────────────┐
│ Kategorie                            [+ Přidat kategorii]   │
├─────────────────────────────────────────────────────────────┤
│ [🔍 Hledat...] [🔄 Refresh] [📥 Export]                     │
├─────────────────────────────────────────────────────────────┤
│ Název              │ Slug            │ Produkty │ Akce      │
│ Spojky a redukce   │ spojky-redukce  │ 3        │ [Edit][Del]│
│ Tvarovky           │ tvarovky        │ 2        │ [Edit][Del]│
│ Kohouty a ventily  │ kohouty-ventily │ 2        │ [Edit][Del]│
└─────────────────────────────────────────────────────────────┘
```

**Features pro správu kategorií:**
- [ ] **CRUD operace:**
  - Vytvořit novou kategorii
  - Upravit existující kategorii
  - Smazat kategorii (s kontrolou, zda obsahuje produkty)
  - Duplikovat kategorii

- [ ] **Formulář pro kategorii:**
  - Název kategorie (povinné)
  - Slug (automaticky generován z názvu, možnost upravit)
  - Popis (textarea)
  - Obrázek kategorie (upload nebo URL)
  - Pořadí zobrazení (číslo pro řazení)
  - Status (aktivní/neaktivní - skrýt zobrazování na frontendu)

- [ ] **Zobrazení:**
  - Tabulkové zobrazení všech kategorií
  - Grid view (s obrázky kategorií)
  - Počet produktů v každé kategorii (badge)
  - Náhled obrázku kategorie

- [ ] **Funkce:**
  - Drag & drop pro změnu pořadí (pokud budou hierarchické)
  - Vyhledávání (název, slug)
  - Řazení (podle názvu, počtu produktů, pořadí)
  - Filtrování (aktivní/neaktivní)
  - Export (CSV, Excel)

- [ ] **Hierarchie kategorií (budoucnost):**
  - Tree view (rodičovské a podkategorie)
  - Nesting kategorie (max. 2-3 úrovně)
  - Breadcrumb navigace v tree view

- [ ] **Validace:**
  - Slug musí být unikátní
  - Kontrola při mazání (pokud má kategorie produkty, zobrazit varování)
  - Kontrola slug formátu (lowercase, pomlčky místo mezer)

- [ ] **Detail kategorie:**
  - Základní informace (název, slug, popis, obrázek)
  - Seznam produktů v kategorii (odkaz na produkty)
  - Možnost rychlého přidání produktu do kategorie
  - Statistiky (počet produktů, celková hodnota produktů v kategorii)

**Navrhované kategorie pro potrubní materiál (aktuální stav + rozšíření):**
1. **Spojky a redukce** - Přímé spojky, redukce, přechody
2. **Tvarovky** - Rohy, T-kusy, kříže, oblouky
3. **Kohouty a ventily** - Kulové kohouty, pojistné ventily, regulační ventily
4. **Těsnění a O-kroužky** - Těsnění závitová, O-kroužky, těsnící kroužky
5. **Adaptéry a přechody** - Adaptéry vnitřní/vnější, přechody na hadice
6. **Závitové spojky** - Závitové spojky, vsuvky, zástrčky

**Možné budoucí rozšíření kategorií:**
- Potrubí (rovné trubky různých průměrů)
- Armatury (závitové vsuvky, matice, šroubení)
- Hadice a konektory (flexibilní hadice, koncovky)
- Instalační materiál (držáky, úchyty, konzoly)
- Sanitární armatury (baterie, sprchové hlavice, zásobníky)
- Topenářské komponenty (radiátory, kotle, expanzní nádoby)

---

### 4. OBJEDNÁVKY

#### 4.1 Objednávky - List View
```
┌─────────────────────────────────────────────────────────────┐
│ Objednávky                          [📥 Export] [🔄 Refresh]│
├─────────────────────────────────────────────────────────────┤
│ [🔍 Hledat...] [📅 Datum ▼] [📊 Status ▼] [👤 Uživatel...] │
├─────────────────────────────────────────────────────────────┤
│ #ID       │ Datum      │ Uživatel      │ Status    │ Celkem │
│ #12345    │ 22.12.2024 │ Jan Novák     │ 🟡 Čeká   │ 1,250  │
│ #12346    │ 22.12.2024 │ Petr Svoboda  │ 🔵 Zprac. │ 890    │
└─────────────────────────────────────────────────────────────┘
```

**Features:**
- [ ] Filtry: status, datum (rozsah), uživatel, cena (rozsah)
- [ ] Vyhledávání (číslo objednávky, email, jméno)
- [ ] Bulk operace (změnit status více objednávek)
- [ ] Export (CSV, Excel, PDF faktura)
- [ ] Řazení podle sloupců
- [ ] Paginace

#### 4.2 Objednávka - Detail View (Full page, ne alert!)
- [ ] **Základní info:**
  - Číslo objednávky
  - Datum vytvoření/aktualizace
  - Status (dropdown pro změnu)
  - Celková cena (rozpisek: subtotal, doprava, celkem)

- [ ] **Uživatel:**
  - Jméno, email, telefon
  - Link na detail uživatele
  - Historie objednávek uživatele

- [ ] **Dodací adresa:**
  - Plná adresa s formátováním
  - Možnost editovat (pokud objednávka ještě není odeslaná)

- [ ] **Fakturační adresa:**
  - Pokud se liší od dodací

- [ ] **Položky objednávky:**
  - Tabulka s produkty
  - Obrázky produktů
  - Link na detail produktu
  - Cena, množství, celkem

- [ ] **Doprava a platba:**
  - Zvolený způsob dopravy
  - Cena dopravy
  - Zvolený způsob platby
  - Status platby (zaplaceno/nezaplaceno)

- [ ] **Firma (pokud je nákup na firmu):**
  - Název, IČO, DIČ

- [ ] **Poznámka zákazníka:**
  - Zobrazit pokud existuje

- [ ] **Admin poznámka:**
  - Interní poznámka (neviditelná pro zákazníka)
  - Historie změn statusu

- [ ] **Akce:**
  - Změnit status
  - Stáhnout fakturu (PDF)
  - Odeslat email zákazníkovi
  - Zrušit objednávku
  - Duplikovat objednávku

#### 4.3 Faktura (PDF generování)
- [ ] Generování PDF faktury
- [ ] Logo eshopu
- [ ] Všechny údaje z objednávky
- [ ] QR kód pro platbu (pokud je bankovní převod)
- [ ] Tisk-friendly design

---

### 5. UŽIVATELÉ

#### 5.1 Uživatelé - List View
```
┌─────────────────────────────────────────────────────────────┐
│ Uživatelé                           [📥 Export] [🔄 Refresh]│
├─────────────────────────────────────────────────────────────┤
│ [🔍 Hledat...] [📅 Registrace ▼] [🛒 Objednávky ▼]         │
├─────────────────────────────────────────────────────────────┤
│ Jméno          │ Email           │ Registrace │ Obj. │ Akce │
│ Jan Novák      │ jan@email.cz    │ 01.01.2024 │ 5    │ [⚙️]│
│ Petr Svoboda   │ petr@email.cz   │ 15.01.2024 │ 2    │ [⚙️]│
└─────────────────────────────────────────────────────────────┘
```

**Features:**
- [ ] Filtry: datum registrace, počet objednávek, status účtu
- [ ] Vyhledávání (jméno, email, telefon)
- [ ] Export (CSV)
- [ ] Aktivace/deaktivace účtu
- [ ] Řazení

#### 5.2 Uživatel - Detail View
- [ ] **Základní info:**
  - Jméno, příjmení
  - Email, telefon
  - Datum registrace
  - Status účtu (aktivní/neaktivní)

- [ ] **Adresa:**
  - Dodací adresa
  - Fakturační adresa (pokud se liší)
  - Možnost editovat

- [ ] **Statistiky:**
  - Celkový počet objednávek
  - Celková hodnota objednávek
  - Průměrná hodnota objednávky
  - Poslední objednávka

- [ ] **Objednávky uživatele:**
  - Tabulka s objednávkami
  - Link na detail každé objednávky
  - Filtrování podle statusu

- [ ] **Košík uživatele:**
  - Zobrazit aktuální košík (pokud má)
  - Možnost vyprázdnit košík
  - Možnost editovat košík

- [ ] **Akce:**
  - Resetovat heslo
  - Editovat údaje
  - Deaktivovat/aktivovat účet
  - Smazat účet (s potvrzením)
  - Odeslat email uživateli

---

### 6. STATISTIKY A REPORTY

#### 6.1 Přehledové statistiky
- [ ] **Tržby:**
  - Dnes, tento týden, tento měsíc, celkem
  - Graf tržeb v čase (line chart)
  - Porovnání s předchozím obdobím

- [ ] **Objednávky:**
  - Počet objednávek podle statusu
  - Graf objednávek v čase
  - Průměrná hodnota objednávky
  - Konverzní poměr

- [ ] **Produkty:**
  - Top 10 nejprodávanějších produktů
  - Produkty s nízkým stavem skladu
  - Produkty bez objednávek

- [ ] **Uživatelé:**
  - Noví uživatelé v čase
  - Aktivní uživatelé
  - Uživatelé podle počtu objednávek

#### 6.2 Export reportů
- [ ] Export statistik do PDF
- [ ] Export statistik do Excel
- [ ] Email reportu (automaticky denně/týdně/měsíčně)

---

### 7. NASTAVENÍ

#### 7.1 Obecné nastavení
- [ ] Název eshopu
- [ ] Logo eshopu
- [ ] Favicon
- [ ] Kontaktní údaje (email, telefon, adresa)
- [ ] Měna (CZK)
- [ ] Daň (DPH %)

#### 7.2 Nastavení dopravy
- [ ] Způsoby dopravy (standardní, expresní, osobní odběr)
- [ ] Ceny dopravy
- [ ] Bezplatná doprava od (částka)
- [ ] Doba dodání

#### 7.3 Nastavení platby
- [ ] Způsoby platby (bankovní převod, karta, hotově)
- [ ] Platební údaje (číslo účtu, IBAN, SWIFT)
- [ ] Variabilní symbol (formát)

#### 7.4 Email nastavení
- [ ] SMTP server
- [ ] Email adresa pro notifikace
- [ ] Templates emailů (objednávka přijata, odeslána, atd.)

#### 7.5 Admin účty
- [ ] Seznam admin účtů
- [ ] Vytvořit nového admina
- [ ] Změnit heslo
- [ ] Role a oprávnění (super admin, admin, editor)

---

### 8. UX/UI VYLEPŠENÍ

#### 8.1 Design System
- [ ] Konzistentní barvy (primary, secondary, success, danger, warning)
- [ ] Typografie (fonty, velikosti, váhy)
- [ ] Spacing system (margin, padding)
- [ ] Button styles (primary, secondary, danger, outline)
- [ ] Form inputs (konzistentní styling)
- [ ] Cards/Boxes (shadows, borders, rounded corners)
- [ ] Icons (ikonky pro všechny akce)

#### 8.2 Interakce
- [ ] Loading states (spinner při načítání)
- [ ] Skeleton screens (placeholders při načítání)
- [ ] Toast notifikace (success, error, warning, info)
- [ ] Modals (pro potvrzení akcí, formuláře)
- [ ] Tooltips (nápověda při hover)
- [ ] Dropdowns (kontextové menu)
- [ ] Animace (smooth transitions)

#### 8.3 Responsive Design
- [ ] Mobile-first approach
- [ ] Hamburger menu na mobilu
- [ ] Collapsible sidebar
- [ ] Touch-friendly tlačítka (dostatečně velké)
- [ ] Swipe gestures (pokud dává smysl)

#### 8.4 Accessibility
- [ ] ARIA labels
- [ ] Keyboard navigation (Tab, Enter, Escape)
- [ ] Focus states (viditelný focus outline)
- [ ] Alt text na obrázcích
- [ ] Kontrast (dostatečný pro čitelnost)

---

### 9. FUNKCE A FEATURES

#### 9.1 Notifikace
- [ ] Notifikační centrum (zvonek v headeru)
- [ ] Nové objednávky (badge s počtem)
- [ ] Nízký stav skladu (varování)
- [ ] Systémové notifikace
- [ ] Možnost označit jako přečtené
- [ ] Možnost smazat notifikace

#### 9.2 Vyhledávání
- [ ] Globální vyhledávání (v headeru)
- [ ] Vyhledávání produktů (název, SKU, EAN)
- [ ] Vyhledávání objednávek (číslo, email)
- [ ] Vyhledávání uživatelů (jméno, email)
- [ ] Recent searches (poslední vyhledávání)
- [ ] Search suggestions (autocomplete)

#### 9.3 Export/Import
- [ ] Export produktů (CSV, Excel)
- [ ] Import produktů (CSV, Excel) s validací
- [ ] Export objednávek (CSV, Excel, PDF)
- [ ] Export uživatelů (CSV)
- [ ] Template soubory ke stažení

#### 9.4 Historie a Audit Log
- [ ] Historie změn produktů (kdo, kdy, co)
- [ ] Historie změn objednávek (změna statusu)
- [ ] Historie přihlášení adminů
- [ ] Audit log (všechny důležité akce)

#### 9.5 Bulk operace
- [ ] Bulk editace produktů (změnit kategorii, status)
- [ ] Bulk smazání produktů
- [ ] Bulk změna statusu objednávek
- [ ] Bulk export (vybrané položky)

---

## 📋 Prioritizace

### 🔴 Vysoká priorita (Must have pro MVP)
1. **Sidebar navigace** - základní struktura adminu
2. **Dashboard se statistikami** - přehled o eshopu
3. **Detail objednávky** (full page, ne alert)
4. **Detail uživatele** - kompletní informace
5. **Filtrování a vyhledávání** (všechny sekce)
6. **Tabulkové zobrazení** s řazením
7. **Toast notifikace** místo alert()
8. **Správa kategorií** jako samostatná stránka

### 🟡 Střední priorita (Should have)
9. **Grafy na dashboardu** (tržby, objednávky)
10. **Export funkcionality** (CSV, Excel)
11. **Bulk operace** (smazat více, změnit status)
12. **PDF faktura** pro objednávky
13. **Nastavení** (základní konfigurace)
14. **Admin poznámky** k objednávkám

### 🟢 Nízká priorita (Nice to have)
15. **Notifikační centrum** (zvonek s notifikacemi)
16. **Historie změn** (audit log)
17. **Grafy a reporty** (pokročilé statistiky)
18. **Email templates** v nastavení
19. **Role a oprávnění** (více adminů)
20. **Import funkcionality** (CSV import)

---

## 🎨 Design inspirace

- **Shopify Admin** - čistý, profesionální design
- **WooCommerce** - přehledné, funkční
- **Medusa Admin** - moderní, minimalistické
- **Stripe Dashboard** - elegantní, data-focused

---

## 📝 Technické poznámky

### Komponenty k vytvoření
- Sidebar komponenta
- Dashboard cards/widgety
- Data table komponenta (s filtrováním, řazením)
- Modal komponenta
- Toast notifikace komponenta
- Form komponenty (input, select, textarea)
- Button komponenty
- Pagination komponenta

### JavaScript knihovny (volitelně)
- **Chart.js** nebo **Recharts** - pro grafy
- **DataTables.js** - pro pokročilé tabulky (volitelně, může být vlastní)
- **FileSaver.js** - pro export souborů
- **jsPDF** - pro generování PDF faktur

### Struktura souborů
```
backend/views/admin/
├── admin-layout.html (základní layout se sidebar)
├── dashboard.html
├── products/
│   ├── list.html
│   ├── detail.html
│   └── categories.html (správa kategorií)
├── orders/
│   ├── list.html
│   └── detail.html
├── users/
│   ├── list.html
│   └── detail.html
├── statistics.html
└── settings.html
```

### API endpointy pro kategorie (doplnění)

**Admin API endpointy:**
```
GET    /admin/api/categories              - Seznam všech kategorií s počtem produktů
GET    /admin/api/categories/:id          - Detail kategorie podle ID
POST   /admin/api/categories              - Vytvořit novou kategorii
PUT    /admin/api/categories/:id          - Upravit existující kategorii
DELETE /admin/api/categories/:id          - Smazat kategorii (s kontrolou produktů)
GET    /admin/api/categories/:id/products - Seznam produktů v kategorii
```

**Request/Response příklady:**
```javascript
// POST /admin/api/categories
{
  "name": "Potrubí",
  "slug": "potrubi",
  "description": "Rovné trubky různých průměrů",
  "image": "/assets/pic/trubka.webp"
}

// PUT /admin/api/categories/:id
{
  "name": "Potrubí a trubky",
  "slug": "potrubi-trubky",
  "description": "Aktualizovaný popis",
  "image": "/assets/pic/trubka-new.webp"
}

// Response (GET /admin/api/categories/:id)
{
  "success": true,
  "category": {
    "id": "7",
    "name": "Potrubí",
    "slug": "potrubi",
    "description": "Rovné trubky různých průměrů",
    "image": "/assets/pic/trubka.webp",
    "productCount": 15,
    "createdAt": "2024-01-15T10:00:00.000Z"
  }
}
```

---

Tento plán pokrývá kompletní vylepšení admin GUI od základní navigace až po pokročilé funkce. Můžeš to použít jako roadmapu pro postupnou implementaci! 🚀

