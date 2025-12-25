# Strategie: Editor obsahu vs SQL migrace

**Problém:** Bojíme se, že pokud teď vytvoříme GUI editor pro produkty/kategorie, který bude pracovat s JSON, a pak později přepneme na SQL, budeme muset vše předělávat.

**Datum:** 2024

---

## 🔍 Analýza situace

### Aktuální stav:
1. ✅ Existuje základní formulář pro přidání produktu (admin-dashboard.html)
2. ✅ Controller používá JSON (`fs.readFileSync`, `fs.writeFileSync`)
3. ✅ SQL databáze je připravená a migrovaná
4. ⚠️ Editor ještě není kompletní (plánovaný velký update v ADMIN_GUI_COMPLETE_PLAN.md)

### Problém:
```
┌─────────────────┐
│  Frontend       │
│  (GUI Editor)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Controller     │ ← Musíš měnit, pokud změníš JSON → SQL
│  (addProduct)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  productsService│ ← Musíš měnit, pokud změníš JSON → SQL
│  (JSON)         │
└─────────────────┘
```

Pokud teď vytvoříš GUI editor pro JSON, a pak přepneš na SQL:
- ❌ Frontend se nemusí měnit (používá API)
- ❌ Controller se musí měnit (volá jiné metody)
- ❌ Service se musí kompletně přepsat

**Riziko:** Všechna práce na editoru bude muset být znovu otestována po přepnutí na SQL.

---

## ✅ ŘEŠENÍ: Repository Pattern (Abstrakce)

### Návrh architektury:

```
┌─────────────────┐
│  Frontend       │
│  (GUI Editor)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Controller     │ ← Nemusíš měnit! Používá interface
│  (addProduct)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Service Layer  │ ← Nemusíš měnit! Používá repository
│  (Business      │
│   Logic)        │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  Repository Interface (Abstract)    │
│  - addProduct(product)              │
│  - getProduct(id)                   │
│  - getAllProducts()                 │
│  - updateProduct(id, data)          │
│  - deleteProduct(id)                │
└────────┬────────────────────────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌─────────┐ ┌─────────┐
│ JSON    │ │ SQL     │
│ Repo    │ │ Repo    │
└─────────┘ └─────────┘
```

### Jak to funguje:

1. **Vytvoříš repository interface** (abstraktní třída/funkce)
2. **Vytvoříš dvě implementace:**
   - `ProductRepositoryJSON` - pracuje s JSON soubory
   - `ProductRepositorySQL` - pracuje s PostgreSQL
3. **Service používá repository** (nezávisle na implementaci)
4. **Controller používá service** (neví, jestli je JSON nebo SQL)

**Přepnutí JSON → SQL:**
- Změníš jen 1 řádek (výběr repository)
- Všechno ostatní zůstane stejné!

---

## 🎯 DOPORUČENÍ

### Varianta A: Implementovat SQL TEĎ (NEJLEPŠÍ)

**Důvody:**
1. ✅ **Editor ještě není hotový** - máš jen základní formulář
2. ✅ **Už máš databázi připravenou** - všechna data jsou migrovaná
3. ✅ **Lepší to udělat teď** - než později s více kódem
4. ✅ **Žádné předělávání** - editor bude od začátku na SQL
5. ✅ **Railway vyžaduje SQL** - JSON nefunguje na produkci

**Čas:** 4-6 hodin práce (přepis 3 služeb)

**Výhoda:** Editor můžeš stavět přímo na SQL, bez obav o přepisování.

---

### Varianta B: Repository Pattern (kompromis)

**Pokud nechceš SQL teď:**

1. **Vytvoř repository vrstvu** (1-2 hodiny)
   - `backend/repositories/productRepository.js`
   - Interface s metodami: `getAll`, `getById`, `add`, `update`, `delete`
   - Implementace: `JSONProductRepository` a `SQLProductRepository`

2. **Uprav services** (1-2 hodiny)
   - `productsService.js` používá repository
   - `const repo = new JSONProductRepository()` (nebo SQL)

3. **Postav editor** (jak chceš)
   - Editor nezávislý na implementaci
   - Používá API přes controller → service → repository

4. **Později přepneš na SQL** (30 minut)
   - Změníš jen: `const repo = new SQLProductRepository()`
   - Všechno ostatní funguje!

**Výhoda:** Můžeš postavit editor teď, přepnutí je triviální.

**Nevýhoda:** Trochu více práce navíc (repository vrstva).

---

### Varianta C: Postavit editor na JSON, přepisovat později (NEDOPORUČUJE SE)

**Problémy:**
- ❌ Musíš přepsat service + controller později
- ❌ Musíš znovu testovat vše
- ❌ Riziko rozbití existující funkcionality
- ❌ Více práce celkem

**Čas celkem:** 6-8 hodin (editor + pozdější přepis)

**Nevýhoda:** Víc práce, více rizika.

---

## 📋 Konkrétní plán - Varianta A (SQL teď)

### Krok 1: Vytvoř SQL repository (1-2 hodiny)

```javascript
// backend/repositories/productRepository.js
import pool from '../db/connection.js';

export class SQLProductRepository {
    async getAll() {
        const result = await pool.query('SELECT * FROM products');
        return result.rows;
    }
    
    async getById(id) {
        const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
        return result.rows[0] || null;
    }
    
    async add(product) {
        // INSERT do SQL
    }
    
    // ... další metody
}
```

### Krok 2: Přepiš productsService.js (1-2 hodiny)

```javascript
// backend/services/productsService.js
import { SQLProductRepository } from '../repositories/productRepository.js';

const productRepo = new SQLProductRepository();

export const getAllProducts = async () => {
    return await productRepo.getAll();
};

export const getProductById = async (id) => {
    return await productRepo.getById(id);
};

export const addProduct = async (product) => {
    return await productRepo.add(product);
};
```

### Krok 3: Uprav controller pro async (1 hodina)

```javascript
// backend/controllers/adminController.js
export const addProduct = async (req, res) => {
    try {
        const product = await productsService.addProduct(req.body);
        res.json({ success: true, product });
    } catch (error) {
        // error handling
    }
};
```

### Krok 4: Otestuj (1 hodina)

- Test všechny endpointy
- Ověř, že data se ukládají do SQL
- Ověř, že frontend funguje

**Celkem: 4-6 hodin**

---

## 📋 Konkrétní plán - Varianta B (Repository Pattern)

### Krok 1: Vytvoř repository interface (30 min)

```javascript
// backend/repositories/productRepositoryInterface.js
export class ProductRepositoryInterface {
    async getAll() { throw new Error('Not implemented'); }
    async getById(id) { throw new Error('Not implemented'); }
    async add(product) { throw new Error('Not implemented'); }
    async update(id, product) { throw new Error('Not implemented'); }
    async delete(id) { throw new Error('Not implemented'); }
}
```

### Krok 2: Vytvoř JSON implementaci (1 hodina)

```javascript
// backend/repositories/jsonProductRepository.js
export class JSONProductRepository extends ProductRepositoryInterface {
    // Implementace s fs.readFileSync
}
```

### Krok 3: Vytvoř SQL implementaci (1-2 hodiny)

```javascript
// backend/repositories/sqlProductRepository.js
export class SQLProductRepository extends ProductRepositoryInterface {
    // Implementace s pool.query
}
```

### Krok 4: Uprav service pro použití repository (1 hodina)

```javascript
// backend/services/productsService.js
import { JSONProductRepository } from '../repositories/jsonProductRepository.js';

const productRepo = new JSONProductRepository(); // Později: new SQLProductRepository()

export const getAllProducts = async () => {
    return await productRepo.getAll();
};
```

### Krok 5: Postav editor (jak chceš)

Editor je nezávislý na implementaci!

**Celkem: 3.5-4.5 hodiny + čas na editor**

---

## 🎯 FINÁLNÍ DOPORUČENÍ

### Doporučuji: **Varianta A (SQL teď)**

**Proč:**
1. ✅ Editor ještě není hotový - máš jen základ
2. ✅ Databáze je připravená
3. ✅ Railway potřebuje SQL
4. ✅ Ušetříš čas (4-6h teď vs 6-8h později)
5. ✅ Žádné riziko přepisování editoru
6. ✅ Editor můžeš stavět přímo na SQL

**Akční plán:**
1. Implementuj SQL repository (2h)
2. Přepiš services na SQL (2h)
3. Uprav controllers pro async (1h)
4. Otestuj (1h)
5. **Pak postav editor na SQL** (bez obav!)

**Celkem: 6 hodin práce, ale pak máš:**
- ✅ Funkční SQL backend
- ✅ Můžeš stavět editor bez obav
- ✅ Vše funguje na Railway
- ✅ Profesionální řešení

---

## ❓ Co si o tom myslím?

**Tvoje obavy jsou oprávněné!** Pokud postavíš editor na JSON a pak přepneš na SQL:
- Musíš přepsat service layer
- Musíš znovu testovat
- Riziko rozbití funkcionality

**Řešení:**
- **Nejlepší:** Implementovat SQL teď (4-6h), pak stavět editor
- **Kompromis:** Repository pattern (3-4h), pak editor, později triviální přepnutí
- **Nejhorší:** Editor na JSON, přepis později (více práce, více rizika)

**Můj názor:** Udělej SQL teď. Editor ještě není hotový, databáze je připravená, a ušetříš si pozdější problémy.

---

**Chceš, abych začal s implementací SQL? Můžu:**
1. Vytvořit SQL repository
2. Přepsat services
3. Upravit controllers
4. Otestovat

Nebo chceš nejdřív zvážit repository pattern?

