# Doporučení pro úpravu designu podle inerez.cz

## Analýza inerez.cz

Podle analýzy webu [inerez.cz](https://www.inerez.cz/) je to profesionální B2B eshop s nerezovými materiály. Klíčové prvky:

### Header
- **Kontaktní informace nahoře**: Telefon (603 788 788) a email (info@inerez.cz) v pravé horní části
- **Logo vlevo**: Klikatelné, odkazuje na homepage
- **Hlavní navigace**: Kategorie produktů v menu
- **Vyhledávání**: V headeru, snadno dostupné
- **Košík**: Ikona s počtem položek
- **Přihlášení/Odhlášení**: V headeru

### Hlavní stránka
- **Hero sekce**: Velký nadpis s popisem a CTA tlačítkem
- **Produktové sekce**: "Nejnovější zboží", "Nejprodávanější", "Doporučujeme"
- **Rychlé odkazy**: Kalkulátory a převodní tabulky
- **Kategorie grid**: Karty kategorií s obrázky

### Design prvky
- **Čistý design**: Bílá barva, modrá/šedá pro akcenty
- **Produktové karty**: Bílé pozadí, jemné stíny, hover efekty
- **Typografie**: Čitelná, dobře strukturovaná
- **Spacing**: Generous white space

### Footer
- **Informace o firmě**: Název, adresa, kontakty
- **Důležité odkazy**: O nás, Reference, GDPR, atd.
- **Kategorie odkazů**: Dělení materiálů, K nákupu
- **Platební metody**: Ikony platebních karet
- **Sociální sítě**: (pokud mají)

## Konkrétní úpravy pro Fitinky eshop

### 1. Header - Kontaktní informace (Priorita: Vysoká)

**Co udělat:**
- Přidat banner nahoře v headeru s kontaktními informacemi
- Telefon a email vpravo
- Možná i změna měny (pokud bude)

**Kde:** `sass/components/_header.scss`, `index.html`, `products.html`

### 2. Hero sekce (Priorita: Vysoká)

**Co udělat:**
- Změnit text na zaměření fitinky
- "Vodovodní fitinky pro vaše projekty"
- Přidat CTA tlačítko "Zobrazit katalog"
- Vylepšit vizuálně - větší text, lepší spacing

**Kde:** `index.html`, `sass/components/_landingPage.scss`

### 3. Sekce "Nejnovější produkty" (Priorita: Vysoká)

**Co udělat:**
- Přidat sekci na hlavní stránku
- Zobrazit 4-6 nejnovějších produktů z API
- Produktové karty v grid layoutu
- Tlačítko "Zobrazit všechny produkty"

**Kde:** `index.html`, `src/js/main.js` (nová funkce), `sass/components/_landingPage.scss`

### 4. Produktové karty (Priorita: Střední)

**Co udělat:**
- Vylepšit stíny (subtle, professional)
- Hover efekty (lift, shadow increase)
- Lepší spacing
- Zlepšit typografii cen
- Status dostupnosti - barevné badge

**Kde:** `sass/components/_products.scss`

### 5. Footer (Priorita: Střední)

**Co udělat:**
- Přidat footer s více sloupci
- Informace o firmě
- Kontaktní informace
- Důležité odkazy (O nás, Doprava, Kontakt)
- Platební metody (ikony)
- Copyright

**Kde:** `footer.html` nebo do každého HTML, `sass/components/_footer.scss`

### 6. Kategorie na hlavní stránce (Priorita: Nízká)

**Co udělat:**
- Vylepšit kategorie grid
- Lepší hover efekty
- Zobrazit počet produktů v každé kategorii
- Více vizuálně atraktivní

**Kde:** `index.html`, `sass/components/_products.scss`

## Implementační plán

### Fáze 1: Header a Hero (Rychlé vylepšení)
1. ✅ Přidat kontaktní informace do headeru
2. ✅ Upravit hero sekci pro fitinky
3. ✅ Vylepšit hlavní nadpis

### Fáze 2: Produktové sekce (Hlavní obsah)
1. ✅ Přidat sekci "Nejnovější produkty"
2. ✅ Vylepšit produktové karty
3. ✅ Upravit kategorie grid

### Fáze 3: Footer a finalizace
1. ✅ Vylepšit footer
2. ✅ Finální úpravy designu
3. ✅ Testování responzivity

## Technické poznámky

- Použít existující Sass strukturu
- Zachovat responzivitu
- Použít Material Icons pro ikony (pokud je používáte)
- Zajistit konzistenci s admin panelem

