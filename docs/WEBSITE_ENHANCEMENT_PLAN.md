# Plán rozšíření webových stránek - Fitinky Eshop

**Datum:** 2024  
**Status:** Návrh  
**Priorita:** Vysoká

---

## 📋 Současný stav

### ✅ Co už existuje:
- Header s navigací a košíkem
- Hlavní stránka (index.html) s hero sekcí a features
- Produkty stránka
- Košík stránka
- Checkout stránka
- Login stránka
- Orders stránka (historie objednávek)
- Footer SCSS soubor (_footer.scss) - ale je prázdný a není implementovaný v HTML

### ❌ Co chybí:
1. **Footer** - úplně chybí implementace
2. **Stránky:**
   - O nás
   - Kontakt
   - FAQ (Často kladené otázky)
   - Obchodní podmínky
   - Ochrana osobních údajů (GDPR)
   - Reklamační řád
   - Doprava a platba
3. **Funkce:**
   - Newsletter přihlášení
   - Sociální sítě
   - Certifikáty a důvěryhodnost
   - Vyhledávání produktů
   - Filtr produktů

---

## 🎯 Cílová struktura (inspirace: Alza.cz, Mall.cz, Rohlik.cz)

### 1. FOOTER (Patička)

#### Struktura (4 sloupce na desktop, stack na mobile):

```
┌─────────────────────────────────────────────────────────────────┐
│                    FOOTER (tmavá barva)                         │
├─────────────────┬─────────────────┬─────────────────┬───────────┤
│ O NÁS           │ NÁKUP           │ PODPORA         │ KONTAKT   │
├─────────────────┼─────────────────┼─────────────────┼───────────┤
│ • O nás         │ • Doprava       │ • FAQ           │ 📍 Adresa │
│ • Náš příběh    │ • Platba        │ • Reklamace     │ 📞 Telefon│
│ • Naše hodnoty  │ • Obchodní      │ • Kontakt       │ ✉️ Email  │
│ • Tým           │   podmínky      │ • Návody        │           │
│ • Kariéra       │ • GDPR          │ • Garance       │           │
│                 │ • Reklamační    │ • Výměna zboží  │           │
│                 │   řád           │                 │           │
├─────────────────┴─────────────────┴─────────────────┴───────────┤
│ NEWSETTER                                                       │
│ [Email input] [Odeslat] Přihlášením souhlasíte s GDPR          │
├─────────────────────────────────────────────────────────────────┤
│ SOCIÁLNÍ SÍTĚ                                                   │
│ [Facebook] [Instagram] [LinkedIn] [YouTube]                     │
├─────────────────────────────────────────────────────────────────┤
│ LOGO + SLOGAN              │ CERTIFIKÁTY / DŮVĚRYHODNOST       │
│                             │ [ISO] [Heureka] [Srovnání cen]    │
├─────────────────────────────┴───────────────────────────────────┤
│ © 2024 Fitinky Eshop. Všechna práva vyhrazena.                 │
│ [Obchodní podmínky] [GDPR] [Cookies]                            │
└─────────────────────────────────────────────────────────────────┘
```

#### Obsah jednotlivých sekcí:

**1. O NÁS (5-7 odkazů)**
- O nás (stránka s příběhem firmy)
- Náš příběh / Historie
- Naše hodnoty
- Tým
- Kariéra / Nabídka práce
- Reference / Projekty
- Certifikáty a ocenění

**2. NÁKUP (5-7 odkazů)**
- Doprava a platba
- Obchodní podmínky
- Ochrana osobních údajů (GDPR)
- Reklamační řád
- Všeobecné podmínky
- Cookies
- Newsletter

**3. PODPORA (5-7 odkazů)**
- FAQ (Často kladené otázky)
- Kontakt
- Reklamace
- Návody a dokumentace
- Garance
- Výměna zboží
- Sledování objednávky

**4. KONTAKT (informace, ne odkazy)**
- **Adresa:**
  ```
  Fitinky s.r.o.
  U Vodárny 123
  120 00 Praha 2
  Česká republika
  ```
- **Telefon:** +420 123 456 789
- **Email:** info@fitinky.cz
- **Provozní doba:**
  - Po-Pá: 8:00 - 17:00
  - So: 9:00 - 12:00
  - Ne: Zavřeno

#### Newsletter sekce:
- Input pole pro email
- Tlačítko "Odeslat" / "Přihlásit se"
- Checkbox: "Souhlasím se zpracováním osobních údajů"
- Text: "Přihlášením souhlasíte s [GDPR] a [Obchodními podmínkami]"

#### Sociální sítě:
- Facebook (ikonka + odkaz)
- Instagram
- LinkedIn
- YouTube
- (volitelně: Twitter/X, TikTok)

#### Certifikáty a důvěryhodnost:
- Logo "Heureka Ověřeno zákazníky"
- Logo "Srovnání cen - Nejlepší ceny"
- ISO certifikáty (pokud jsou)
- Bezpečná platba (visa, mastercard loga)
- SSL certifikát indikace

#### Dolní řádek:
- Logo firmy (malé) + slogan
- © 2024 Fitinky Eshop. Všechna práva vyhrazena.
- Rychlé odkazy: [Obchodní podmínky] [GDPR] [Cookies] [Mapa stránek]

---

## 📄 Nové stránky k vytvoření

### 1. O nás (`/about` nebo `/o-nas`)

**Struktura:**
```
┌─────────────────────────────────────┐
│        O NÁS                        │
├─────────────────────────────────────┤
│ Hero sekce s obrázkem kanceláře/    │
│ skladu/firmy                        │
├─────────────────────────────────────┤
│ NÁŠ PŘÍBĚH                          │
│ Text o historii firmy, kdy vznikla, │
│ jak se vyvíjela                     │
├─────────────────────────────────────┤
│ NAŠE HODNOTY                        │
│ [Ikona] Kvalita                     │
│ [Ikona] Spolehlivost                │
│ [Ikona] Zákaznická podpora          │
│ [Ikona] Inovace                     │
├─────────────────────────────────────┤
│ PROČ SI VYBRAT NÁS                  │
│ • 10+ let na trhu                   │
│ • 5000+ spokojených zákazníků       │
│ • Široký sortiment                  │
│ • Rychlé dodání                     │
├─────────────────────────────────────┤
│ NÁŠ TÝM (volitelně)                 │
│ Fotky klíčových lidí                │
├─────────────────────────────────────┤
│ CERTIFIKÁTY                         │
│ Loga certifikátů                    │
└─────────────────────────────────────┘
```

**Obsah:**
- Historie firmy (kdy, kde, proč)
- Vize a mise
- Naše hodnoty
- Proč si vybrat nás (výhody)
- Statistiky (počet zákazníků, let na trhu, produktů)
- Tým (volitelně - fotky, jména, pozice)
- Certifikáty a ocenění

---

### 2. Kontakt (`/contact` nebo `/kontakt`)

**Struktura:**
```
┌─────────────────────────────────────┐
│        KONTAKT                      │
├─────────────────────────────────────┤
│ KONTAKTNÍ FORMULÁŘ                  │
│ [Jméno]                             │
│ [Email]                             │
│ [Telefon]                           │
│ [Předmět] (dropdown)                │
│ [Zpráva] (textarea)                 │
│ [Odeslat]                           │
├─────────────────────────────────────┤
│ KONTAKTNÍ ÚDAJE                     │
│ 📍 Adresa                           │
│ 📞 Telefon                          │
│ ✉️ Email                            │
│ 🕐 Provozní doba                    │
├─────────────────────────────────────┤
│ MAPA (Google Maps embed)            │
│ [Interaktivní mapa s polohou]       │
└─────────────────────────────────────┘
```

**Obsah:**
- Kontaktní formulář (s validací)
- Kontaktní údaje (adresa, telefon, email, IČO, DIČ)
- Provozní doba
- Mapa (Google Maps iframe)
- Informace o obchodní jednotce

**Kontaktní formulář - pole:**
- Jméno a příjmení (povinné)
- Email (povinné, validace)
- Telefon (volitelné)
- Předmět (dropdown: Obecný dotaz, Reklamace, Technická podpora, Obchodní dotaz)
- Zpráva (textarea, povinné, min 10 znaků)
- Checkbox GDPR souhlas
- Tlačítko "Odeslat"

---

### 3. FAQ (`/faq`)

**Struktura:**
```
┌─────────────────────────────────────┐
│  ČASTO KLADENÉ OTÁZKY (FAQ)         │
├─────────────────────────────────────┤
│ [🔍 Vyhledávání v FAQ...]           │
├─────────────────────────────────────┤
│ DOPRAVA A PLATBA                    │
│ ▼ Jak dlouho trvá dodání?           │
│   Odpověď...                        │
│ ▶ Jaké jsou možnosti platby?        │
│ ▶ Mohu si zboží vyzvednout?         │
├─────────────────────────────────────┤
│ OBJEDNÁVKA A REKLAMACE              │
│ ▶ Jak mohu zrušit objednávku?       │
│ ▶ Jak podat reklamaci?              │
│ ▶ Jaká je záruka?                   │
├─────────────────────────────────────┤
│ PRODUKTY                            │
│ ▶ Jak vybrat správný produkt?       │
│ ▶ Jsou produkty skladem?            │
│ ▶ Mohu vrátit zboží?                │
├─────────────────────────────────────┤
│ ÚČET A PŘIHLÁŠENÍ                   │
│ ▶ Jak vytvořit účet?                │
│ ▶ Zapomněl jsem heslo               │
│ ▶ Jak změnit údaje?                 │
└─────────────────────────────────────┘
```

**Funkce:**
- Accordion/collapse pro jednotlivé otázky
- Vyhledávání v FAQ
- Kategorie FAQ (Doprava, Objednávka, Produkty, Účet)
- "Byla tato odpověď užitečná?" (Ano/Ne) - pro statistiky

**Navržené otázky:**

**Doprava a platba:**
1. Jak dlouho trvá dodání?
2. Jaké jsou možnosti dopravy?
3. Kolik stojí doprava?
4. Jaké jsou možnosti platby?
5. Je platba bezpečná?
6. Mohu si zboží vyzvednout osobně?

**Objednávka a reklamace:**
1. Jak zrušit objednávku?
2. Jak vrátit zboží?
3. Jak podat reklamaci?
4. Jaká je záruka na produkty?
5. Jak dlouho trvá vyřízení reklamace?
6. Jak změnit objednávku?

**Produkty:**
1. Jak vybrat správný produkt?
2. Jsou produkty skladem?
3. Jak zjistit dostupnost produktu?
4. Jaké jsou specifikace produktu?
5. Můžu si nechat poradit s výběrem?

**Účet a přihlášení:**
1. Jak vytvořit účet?
2. Zapomněl jsem heslo - co dělat?
3. Jak změnit údaje v účtu?
4. Jak smazat účet?
5. Jak změnit email?

---

### 4. Obchodní podmínky (`/terms` nebo `/obchodni-podminky`)

**Obsah:**
- Definice pojmů
- Všeobecná ustanovení
- Ceny a platby
- Dodání zboží
- Záruka
- Odstoupení od smlouvy
- Ochrana osobních údajů (odkaz na GDPR)
- Řešení sporů
- Závěrečná ustanovení

**Struktura:**
- Číslované sekce
- Vytištění PDF (volitelně)
- Poslední aktualizace: [datum]

---

### 5. Ochrana osobních údajů / GDPR (`/privacy` nebo `/gdpr`)

**Obsah:**
- Správce osobních údajů
- Účel zpracování
- Kategorie osobních údajů
- Doba uchování
- Práva subjektu údajů
- Cookies
- Kontakt na pověřence pro ochranu osobních údajů

**Struktura:**
- Číslované sekce
- Kontaktní údaje
- Poslední aktualizace: [datum]

---

### 6. Reklamační řád (`/warranty` nebo `/reklamacni-rad`)

**Obsah:**
- Co je reklamace
- Jak podat reklamaci
- Náležitosti reklamace
- Lhůty pro vyřízení
- Práva z vadného plnění
- Záruka
- Kontakt na reklamace

---

### 7. Doprava a platba (`/shipping` nebo `/doprava-platba`)

**Struktura:**
```
┌─────────────────────────────────────┐
│    DOPRAVA A PLATBA                 │
├─────────────────────────────────────┤
│ DOPRAVA                             │
│ • Standardní doprava (2-3 dny)      │
│ • Expresní doprava (24h)            │
│ • Osobní odběr (zdarma)             │
│ • Zahraniční doprava                │
├─────────────────────────────────────┤
│ PLATBA                              │
│ • Kartou online                     │
│ • Dobírka                           │
│ • Převod na účet                    │
│ • Hotovost (při odběru)             │
├─────────────────────────────────────┤
│ CENY DOPRAVY                        │
│ [Tabulka s cenami]                  │
└─────────────────────────────────────┘
```

**Obsah:**
- Možnosti dopravy (s popisem, cenami, dobou)
- Možnosti platby (s popisem)
- Ceník dopravy (tabulka)
- Platební metody (loga)
- Bezpečnost plateb
- Informace o dodání

---

## 🎨 Další vylepšení stránek

### 1. Vyhledávání produktů

**Umístění:** V headeru (ikona lupy nebo search bar)

**Funkce:**
- Fulltextové vyhledávání v názvech a popisech produktů
- Autocomplete při psaní
- Zobrazení výsledků (dropdown nebo stránka)
- Filtrování výsledků (kategorie, cena, dostupnost)

### 2. Filtrování produktů

**Na stránce /products:**
- Filtry podle:
  - Kategorie
  - Cena (slider)
  - Dostupnost (skladem/na objednávku)
  - Značka (pokud budou)
  - Hodnocení (pokud budou)
- Řazení:
  - Od nejlevnějších
  - Od nejdražších
  - Podle názvu A-Z
  - Podle popularity
  - Nejnovější

### 3. Breadcrumb navigace

**Na stránkách:**
```
Domů > Produkty > Spojky a redukce > Přímá spojka 1/2"
```

### 4. Newsletter přihlášení

**Umístění:**
- Footer (popsáno výše)
- Popup při první návštěvě (volitelně)
- Sidebar na některých stránkách

**Funkce:**
- Email input
- GDPR souhlas
- Odeslání na backend
- Uložení do databáze/souboru
- Potvrzovací email (budoucnost)

### 5. Cookie banner

**Obsah:**
- Informace o cookies
- Tlačítka: "Přijmout vše" / "Nastavení" / "Odmítnout"
- Odkaz na detailní informace o cookies

**Používání:**
- Technické cookies (vždy)
- Analytické cookies (s souhlasem)
- Marketingové cookies (s souhlasem)

### 6. Trust badges (důvěryhodnost)

**Umístění:**
- Footer
- Checkout stránka

**Obsah:**
- SSL certifikát
- Bezpečná platba (visa, mastercard)
- Heureka Ověřeno zákazníky
- Srovnání cen
- ISO certifikáty

### 7. Live chat (volitelně, budoucnost)

**Umístění:** Pravý dolní roh (floating button)

---

## 📱 Responsivní design

**Footer a všechny nové stránky musí být:**
- Responzivní (mobile-first)
- Přizpůsobitelné pro tablet
- Přizpůsobitelné pro desktop
- Testováno na různých velikostech obrazovek

---

## 🔧 Technické detaily

### Backend routes k vytvoření:

```javascript
// Nové routy v backend/routes/
GET  /about              → about.html (O nás)
GET  /contact            → contact.html (Kontakt)
GET  /faq                → faq.html (FAQ)
GET  /terms              → terms.html (Obchodní podmínky)
GET  /privacy            → privacy.html (GDPR)
GET  /warranty           → warranty.html (Reklamační řád)
GET  /shipping           → shipping.html (Doprava a platba)

// API endpointy
POST /api/contact        → Odeslání kontaktního formuláře
POST /api/newsletter     → Přihlášení k newsletteru
GET  /api/faq            → Seznam FAQ (pro vyhledávání)
```

### Kontaktní formulář backend:

```javascript
// backend/controllers/contactController.js
export const submitContact = (req, res) => {
  // Validace
  // Uložení do souboru/databáze
  // Odeslání emailu (budoucnost)
  // Response
}
```

### Newsletter backend:

```javascript
// backend/controllers/newsletterController.js
export const subscribeNewsletter = (req, res) => {
  // Validace emailu
  // Kontrola duplicity
  // Uložení do souboru/databáze
  // Response
}
```

---

## 📊 Priorizace implementace

### Fáze 1 - Kritické (MVP):
1. ✅ Footer (základní struktura, 4 sloupce, kontaktní údaje)
2. ✅ Kontakt stránka (s formulářem)
3. ✅ FAQ stránka (základní otázky)
4. ✅ Obchodní podmínky (základní text)
5. ✅ GDPR stránka (základní text)

### Fáze 2 - Důležité:
6. ✅ O nás stránka
7. ✅ Doprava a platba stránka
8. ✅ Reklamační řád
9. ✅ Newsletter přihlášení (footer + backend)
10. ✅ Sociální sítě odkazy
11. ✅ Cookie banner

### Fáze 3 - Vylepšení:
12. ✅ Vyhledávání produktů
13. ✅ Filtrování produktů
14. ✅ Breadcrumb navigace
15. ✅ Trust badges
16. ✅ Mapa na kontaktní stránce

### Fáze 4 - Pokročilé (budoucnost):
17. Newsletter automatizace
18. Live chat
19. FAQ vyhledávání s AI
20. Recenze a hodnocení produktů

---

## 🎯 Inspirace z konkurence

### Alza.cz footer obsahuje:
- O Alze (O nás, Kariéra, Reference, Certifikáty)
- Nákup (Doprava, Platba, Obchodní podmínky, Reklamace)
- Podpora (FAQ, Kontakt, Návody, Garance)
- Newsletter přihlášení
- Sociální sítě
- Certifikáty (ISO, Heureka)
- Platební metody

### Mall.cz footer obsahuje:
- Podobná struktura jako Alza
- Newsletter
- Mobilní aplikace odkazy
- Certifikáty a ocenění
- Platební metody

### Rohlik.cz footer obsahuje:
- O Rohliku
- Pro zákazníky
- Pro partnery
- Kontakt
- Newsletter
- Sociální sítě
- Certifikáty

---

## 📝 Poznámky k implementaci

### Footer:
- Použít existující `sass/components/_footer.scss`
- Implementovat do všech HTML stránek
- Responzivní design (4 sloupce → 2 sloupce → 1 sloupec)
- Tmavá barva (např. #2c3e50 nebo #1a1a1a)
- Světlý text

### Nové stránky:
- Vytvořit HTML soubory v root adresáři
- Přidat routy v backend
- Použít stejný layout jako ostatní stránky (header + footer)
- Stylovat pomocí Sass
- Přidat do navigace (header nebo footer)

### Kontaktní formulář:
- Frontend validace (JavaScript)
- Backend validace
- Uložení do souboru (newsletter.json nebo contacts.json)
- V budoucnu: odeslání emailu

### Newsletter:
- Email validace
- Uložení do souboru (newsletter.json)
- GDPR souhlas povinný
- V budoucnu: integrace s email service (SendGrid, Mailchimp)

---

## ✅ Checklist implementace

### Footer:
- [ ] Vytvořit HTML strukturu footeru
- [ ] Stylovat footer (Sass)
- [ ] Přidat do všech HTML stránek
- [ ] Responzivní design
- [ ] Kontaktní údaje
- [ ] Navigační odkazy
- [ ] Newsletter formulář
- [ ] Sociální sítě odkazy
- [ ] Certifikáty a trust badges
- [ ] Dolní řádek s copyright

### Nové stránky:
- [ ] about.html
- [ ] contact.html
- [ ] faq.html
- [ ] terms.html
- [ ] privacy.html
- [ ] warranty.html
- [ ] shipping.html

### Backend:
- [ ] Kontaktní formulář API endpoint
- [ ] Newsletter API endpoint
- [ ] Routy pro nové stránky

### Funkce:
- [ ] Vyhledávání produktů
- [ ] Filtrování produktů
- [ ] Cookie banner
- [ ] Breadcrumb navigace

---

**Poznámka:** Tento dokument je živý dokument a může být aktualizován podle potřeb projektu.

