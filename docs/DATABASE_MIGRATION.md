# Migrace z JSON na SQL databázi

## Problém s JSON soubory na Railway

JSON soubory jsou součástí repozitáře a při každém deployu se nahradí verzí z GITu. To znamená:
- ❌ Ztratíš všechny nové registrace uživatelů
- ❌ Ztratíš všechny objednávky
- ❌ Ztratíš změny v košících
- ❌ Ztratíš produkty přidané přes admin rozhraní

**Řešení: SQL databáze (PostgreSQL)**

## Krok 1: Přidat PostgreSQL na Railway

1. V Railway dashboardu → klikni na projekt
2. Klikni na "New" → "Database" → "Add PostgreSQL"
3. Railway automaticky vytvoří databázi a nastaví environment variables:
   - `PGHOST`
   - `PGPORT`
   - `PGDATABASE`
   - `PGUSER`
   - `PGPASSWORD`
   - `DATABASE_URL` (connection string)

## Krok 2: Instalace závislostí

```bash
npm install pg
```

## Krok 3: Database schema

Vytvoř následující tabulky:

### Users table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(50),
  address_street VARCHAR(255),
  address_city VARCHAR(100),
  address_postal_code VARCHAR(20),
  address_country VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index pro rychlé vyhledávání
CREATE INDEX idx_users_email ON users(email);
```

### Products table
```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image VARCHAR(500),
  category_id INTEGER,
  availability_status VARCHAR(50) DEFAULT 'available',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_products_category ON products(category_id);
```

### Categories table
```sql
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_categories_slug ON categories(slug);
```

### Cart items table
```sql
CREATE TABLE cart_items (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, product_id)
);

CREATE INDEX idx_cart_items_user ON cart_items(user_id);
```

### Orders table
```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  total_price DECIMAL(10, 2) NOT NULL,
  shipping_address JSONB,
  billing_address JSONB,
  shipping_method VARCHAR(100),
  payment_method VARCHAR(100),
  company_name VARCHAR(255),
  company_ico VARCHAR(50),
  company_dic VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
```

### Order items table
```sql
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id),
  product_name VARCHAR(255) NOT NULL,
  product_price DECIMAL(10, 2) NOT NULL,
  quantity INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_order_items_order ON order_items(order_id);
```

## Krok 4: Vytvořit database connection utility

Vytvoř `backend/db/connection.js`:

```javascript
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

export default pool;
```

## Krok 5: Vytvořit database service vrstvu

Místo `fs.readFileSync` a `fs.writeFileSync` použij SQL dotazy:

```javascript
// backend/services/userAuthService.js
import pool from '../db/connection.js';

export const findUserByEmail = async (email) => {
  const result = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0] || null;
};

export const createUser = async (userData) => {
  const result = await pool.query(
    `INSERT INTO users (email, password, first_name, last_name, phone, 
     address_street, address_city, address_postal_code, address_country)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING *`,
    [userData.email, userData.password, userData.firstName, ...]
  );
  return result.rows[0];
};
```

## Krok 6: Migration script

Vytvoř `backend/db/migrate.js` pro migraci dat z JSON do SQL:

```javascript
// Načte data z JSON a vloží do databáze
import fs from 'fs';
import pool from './connection.js';

async function migrate() {
  // Načti JSON soubory
  const users = JSON.parse(fs.readFileSync('backend/data/users.json'));
  const products = JSON.parse(fs.readFileSync('backend/data/products.json'));
  
  // Vlož do databáze...
}
```

## Výhody SQL databáze

✅ **Trvalé uložení** - data se neztrací při redeployu
✅ **Transakce** - zaručuje konzistenci dat
✅ **Relace** - správné propojení mezi entitami
✅ **Výkon** - rychlejší dotazy než JSON
✅ **Bezpečnost** - připojení přes SSL, SQL injection protection
✅ **Škálovatelnost** - lepší pro větší objemy dat

## Doporučený postup

1. **Teď (pro vývoj):** Nech JSON soubory, ale připrav strukturu pro migraci
2. **Před production deployem:** Migruj na SQL
3. **Na Railway:** Přidej PostgreSQL databázi a použij environment variables

Mám ti připravit kompletní migraci teď, nebo chceš nejdřív nasadit na Railway a pak postupně migrovat?

