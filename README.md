# Eshop Admin GUI

Full-stack e-commerce platform s admin panelem. Experimentální projekt vytvořený ve spolupráci s AI pro učení a zkoušení moderních webových technologií.

## 📖 O projektu

Tento projekt vznikl jako experimentální zkouška programování s AI asistencí. Cílem bylo vytvořit funkční e-commerce platformu s kompletním admin panelem a naučit se moderní webové technologie a best practices.

Projekt zahrnuje jak zákaznickou část (storefront), tak komplexní admin rozhraní pro správu produktů, objednávek a uživatelů.

## 📋 Obsah

- [O projektu](#-o-projektu)
- [Stav projektu](#-stav-projektu)
- [Technologie](#technologie)
- [Struktura projektu](#struktura-projektu)

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
  - Frontend: [https://web-production-fa55.up.railway.app/](https://web-production-fa55.up.railway.app/)
  - Admin Dashboard: [https://web-production-fa55.up.railway.app/admin/dashboard](https://web-production-fa55.up.railway.app/admin/dashboard)
  - PostgreSQL databáze běží na Railway

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

#### Deployment
- ✅ **Railway hosting** - Aplikace je deploynutá na Railway platformě
- ✅ **PostgreSQL databáze na Railway** - Produkční databáze běží na Railway
- ✅ **Produkční URL:**
  - Frontend: [https://web-production-fa55.up.railway.app/](https://web-production-fa55.up.railway.app/)
  - Admin Dashboard: [https://web-production-fa55.up.railway.app/admin/dashboard](https://web-production-fa55.up.railway.app/admin/dashboard)

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
