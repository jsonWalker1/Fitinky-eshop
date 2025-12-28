# Analýza kategorie Armatury a Fitinky na inerez.cz

**Datum analýzy:** 28.12.2024  
**Cíl:** Zjistit, jak inerez.cz organizuje armatury a fitinky pro implementaci do našeho eshopu

---

## 🔍 Zjištění z webu inerez.cz

### Struktura kategorií

Na inerez.cz mají armatury a fitinky jako hlavní kategorii, která je dále rozdělena do podkategorií:

#### Hlavní kategorie: **Armatury a fitinky**

Typické podkategorie:
1. **Závitové fitinky** (vnitřní/vnější závit)
2. **Svařované fitinky** (pro svařování)
3. **Tlakové fitinky** (pro vysokotlaké systémy)
4. **Přechody a redukce** (změna průměru, typu)
5. **Zátky a víka**
6. **T-kusy a kříže**
7. **Kolena a ohyby**
8. **Kombinované fitinky**

---

## 📋 Co by měl obsahovat eshop pro fitinky

### 1. **Kategorie podle typu připojení**

#### A) Závitové fitinky
- Vnitřní závit (vnitřní/závit)
- Vnější závit (vnější závit)
- Kombinované (vnitřní + vnější závit)
- Závitové přechody

**Příklady produktů:**
- Koleno 90° závitové (R/R, R/Z)
- T-kus závitový (R/R/R)
- Přechod závitový (R/Z)
- Redukce závitová (R/Z různých průměrů)

#### B) Svařované fitinky
- Pro svařování elektricky
- Pro svařování laserem
- Přírubové připojení

#### C) Tlakové fitinky
- Press fitinky
- Push-fit fitinky

---

### 2. **Kategorie podle tvaru/funkce**

#### A) Kolena a ohyby
- Koleno 90°
- Koleno 45°
- Kolena s různým poloměrem ohybu

#### B) T-kusy a kříže
- T-kus rovný
- T-kus redukovaný
- Kříž (4 vývody)

#### C) Přechody a redukce
- Přechod závit/kolík
- Přechod závit/závit (různé průměry)
- Redukce (velký → malý průměr)

#### D) Zátky a víka
- Zátky závitové
- Víka závitová
- Zátky s vypouštěcím ventilem

#### E) Kombinované fitinky
- Kombinace různých typů připojení

---

### 3. **Kategorie podle materiálu**

- Nerezová ocel (304, 316)
- Mosaz
- Uhlíková ocel
- Plast (PP, PE, PVC)

---

### 4. **Kategorie podle průměru (DN)**

Běžné průměry pro fitinky:
- DN 10, 15, 20, 25, 32, 40, 50, 65, 80, 100, 125, 150...

---

## 🎯 Doporučená struktura pro náš eshop

### **HLAVNÍ KATEGORIE: Armatury a fitinky**

#### **Podkategorie podle typu připojení:**

1. **Závitové fitinky**
   - Koleno závitové
   - T-kus závitový
   - Přechod závitový
   - Redukce závitová
   - Zátky závitové

2. **Svařované fitinky**
   - Koleno svařované
   - T-kus svařovaný
   - Přechod svařovaný

3. **Tlakové fitinky**
   - Press fitinky
   - Push-fit fitinky

---

### **ALTERNATIVNÍ STRUKTURA (jednodušší):**

Pokud chceš jednodušší strukturu, můžeš kategorizovat podle **tvaru**:

1. **Kolena**
   - 90°, 45°
   - Závitové, svařované

2. **T-kusy a kříže**
   - Rovné, redukované
   - Závitové, svařované

3. **Přechody a redukce**
   - Přechody závit/závit
   - Redukce (změna průměru)
   - Přechody závit/kolík

4. **Zátky a víka**
   - Zátky závitové
   - Víka závitová

5. **Kombinované fitinky**
   - Kombinace různých typů

---

## 💡 Doporučení pro implementaci

### **1. Struktura kategorií v databázi**

Zatím máš jednoduchou strukturu kategorií. Pro fitinky bych doporučil:

#### Varianta A: Jednoduchá (doporučuji začít s touto)
```
- Armatury a fitinky (hlavní kategorie)
  ├─ Kolena
  ├─ T-kusy a kříže
  ├─ Přechody a redukce
  ├─ Zátky a víka
  └─ Kombinované fitinky
```

#### Varianta B: Detailní (pro větší sortiment)
```
- Armatury a fitinky (hlavní kategorie)
  ├─ Závitové fitinky
  │  ├─ Kolena závitové
  │  ├─ T-kusy závitové
  │  ├─ Přechody závitové
  │  └─ Zátky závitové
  ├─ Svařované fitinky
  │  ├─ Kolena svařované
  │  ├─ T-kusy svařované
  │  └─ Přechody svařované
  └─ Tlakové fitinky
     ├─ Press fitinky
     └─ Push-fit fitinky
```

---

### **2. Produktové atributy**

Pro fitinky je důležité mít následující atributy u každého produktu:

#### Povinné atributy:
- **Průměr (DN)** - např. DN 15, DN 20, DN 25
- **Typ připojení** - závitové (R/Z), svařované, press
- **Tvar** - koleno, T-kus, přechod, zátka, atd.
- **Materiál** - nerez 304, nerez 316, mosaz, uhlíková ocel
- **Úhel** (pro kolena) - 90°, 45°

#### Volitelné atributy:
- **Vnější průměr** (mm)
- **Délka** (mm)
- **Tlaková odolnost** (bar)
- **Teplotní rozsah** (°C)
- **Povrchová úprava** - matný, lesklý
- **Norma** - DIN, ČSN, EN

---

### **3. Databázové schéma**

Můžeš buď:

#### Varianta A: JSONB atributy (rychlé řešení)
```sql
ALTER TABLE products ADD COLUMN attributes JSONB;

-- Příklad:
{
  "diameter": "DN 20",
  "connection_type": "zavitove",
  "shape": "koleno",
  "angle": "90",
  "material": "nerez-304",
  "outer_diameter": 26.9,
  "pressure_rating": 16,
  "standard": "DIN"
}
```

#### Varianta B: Samostatná tabulka (lepší pro filtrování)
```sql
CREATE TABLE product_attributes (
  id SERIAL PRIMARY KEY,
  product_id VARCHAR(50) REFERENCES products(id) ON DELETE CASCADE,
  attribute_name VARCHAR(100) NOT NULL,
  attribute_value VARCHAR(255),
  attribute_type VARCHAR(50) -- 'text', 'number', 'boolean'
);

CREATE INDEX idx_product_attributes_product ON product_attributes(product_id);
CREATE INDEX idx_product_attributes_name ON product_attributes(attribute_name);
```

**Doporučení:** Začni s JSONB (Varianta A) - je rychlejší na implementaci. Pokud budeš potřebovat pokročilé filtrování, můžeš později přejít na Variantu B.

---

### **4. Filtrování na frontendu**

Na stránce s produkty by měly být filtry:

#### Základní filtry:
- ✅ Kategorie (už máš)
- ❌ Průměr (DN) - přidat
- ❌ Typ připojení - přidat
- ❌ Materiál - přidat
- ❌ Tvar - přidat
- ❌ Úhel (pro kolena) - přidat

#### Pokročilé filtry:
- Cena (rozmezí)
- Dostupnost
- Tlaková odolnost
- Norma

---

### **5. Zobrazení produktu**

Na detailu produktu zobrazit:

#### Hlavní informace:
- Název produktu
- Obrázky (galerie)
- Cena
- Dostupnost

#### Technické údaje (tab):
- Průměr (DN)
- Typ připojení
- Tvar
- Úhel (pokud je koleno)
- Materiál
- Vnější rozměry
- Tlaková odolnost
- Teplotní rozsah
- Norma
- Popis/detaily

#### Tabulka rozměrů (pokud je více variant):
Pokud máš stejný typ fitinky v různých průměrech, můžeš je zobrazit v tabulce.

---

## 📝 Konkrétní kroky pro implementaci

### KROK 1: Vytvoř kategorie pro fitinky

V admin panelu vytvoř kategorie:

1. **Armatury a fitinky** (hlavní)
   - Kolena
   - T-kusy a kříže
   - Přechody a redukce
   - Zátky a víka
   - Kombinované fitinky

### KROK 2: Přidej atributy do produktů

**Možnost A: JSONB sloupec (rychlé)**
```sql
ALTER TABLE products ADD COLUMN attributes JSONB;
```

**Možnost B: Samostatná tabulka (pokročilé)**

### KROK 3: Uprav admin panel

V admin panelu při vytváření/editaci produktu přidat formulář pro atributy:
- Průměr (DN) - select/dropdown
- Typ připojení - select
- Tvar - select
- Úhel - number (pokud je koleno)
- Materiál - select
- Vnější průměr - number
- Tlaková odolnost - number
- Norma - text

### KROK 4: Uprav frontend

- Zobrazit atributy na detailu produktu
- Přidat filtry podle atributů
- Možná tabulka variant (pokud je stejný typ v různých průměrech)

---

## 🎨 Design doporučení

### Pro kategorii "Armatury a fitinky":

1. **Karty kategorií** - obrázek + název + počet produktů
2. **Technické specifikace** - důraz na technické údaje
3. **Tabulky rozměrů** - pro varianty produktů
4. **Filtry na boku** - snadné filtrování podle atributů
5. **Detailní popis** - technické informace na prvním místě

---

## ❓ Otázky k rozhodnutí

1. **Jak detailní struktura kategorií?**
   - Jednoduchá (5-6 kategorií) vs. Detailní (10+ kategorií)
   - Doporučení: Začni jednoduše, můžeš později rozdělit
   jednoduchá 

2. **Kde ukládat atributy?**
   - JSONB (rychlé) vs. Samostatná tabulka (pokročilé)
   - Doporučení: JSONB pro začátek
   ne dej pokročilé budeme dělat pak pro zákazniký funkci s filtrací produktů a to musím fungovat dobře 

3. **Kolik atributů potřebuješ?**
   - Základní (průměr, typ, tvar, materiál) vs. Pokročilé (všechny výše)
   - Doporučení: Začni se základními, přidávej podle potřeby
   základní 

4. **Filtrování podle atributů?**
   - Ano, je důležité pro B2B eshop
   - Uživatelé budou chtít najít konkrétní typ fitinky
   ano určitě filtr budeme dělat 

---

## ✅ Shrnutí

Pro eshop zaměřený primárně na fitinky doporučuji:

1. ✅ **Struktura kategorií:** Jednoduchá struktura (Kolena, T-kusy, Přechody, Zátky, Kombinované)
2. ✅ **Atributy:** JSONB sloupec v products tabulce
3. ✅ **Základní atributy:** Průměr (DN), Typ připojení, Tvar, Materiál, Úhel
4. ✅ **Filtrování:** Přidat filtry podle atributů na stránce produktů
5. ✅ **Detail produktu:** Technické specifikace na prvním místě

**Další krok:** Začni vytvářením kategorií v admin panelu a pak přidej atributy do produktů.

