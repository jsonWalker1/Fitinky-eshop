# Vytvoření tabulky product_attributes

## Možnost 1: Pomocí Node.js skriptu (vyžaduje DATABASE_URL)

```bash
export DATABASE_URL="postgresql://user:password@host:port/database"
npm run db:add-attributes-table
```

## Možnost 2: Přímo v PostgreSQL (doporučeno)

Můžeš spustit SQL přímo v databázi:

### V Railway Dashboard:
1. Jdi do Railway dashboardu
2. Otevři PostgreSQL databázi
3. Klikni na "Query" nebo "Connect"
4. Zkopíruj obsah souboru `backend/db/add-product-attributes-table-standalone.sql`
5. Vlož a spusť

### Nebo pomocí psql:
```bash
psql $DATABASE_URL -f backend/db/add-product-attributes-table-standalone.sql
```

## Co se vytvoří:

- **Tabulka:** `product_attributes`
  - `id` - PRIMARY KEY (SERIAL)
  - `product_id` - FOREIGN KEY na products(id)
  - `attribute_name` - název atributu (diameter, connection_type, shape, material)
  - `attribute_value` - hodnota atributu
  - `attribute_type` - typ (text, number, boolean)
  - `created_at`, `updated_at` - časové značky

- **Indexy:**
  - `idx_product_attributes_product` - rychlé vyhledávání podle product_id
  - `idx_product_attributes_name` - rychlé vyhledávání podle názvu atributu
  - `idx_product_attributes_value` - rychlé vyhledávání podle hodnoty
  - `idx_product_attributes_name_value` - složený index pro filtrování

- **Trigger:** Automatické aktualizování `updated_at` při změně

## Základní atributy pro fitinky:

- `diameter` (text) - Průměr DN, např. "DN 20", "DN 25"
- `connection_type` (text) - Typ připojení, např. "zavitove", "svarove"
- `shape` (text) - Tvar fitinky, např. "koleno", "t-kus", "prechod"
- `material` (text) - Materiál, např. "nerez-304", "nerez-316", "mosaz"

