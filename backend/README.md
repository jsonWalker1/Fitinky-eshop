# Backend Server

Express server pro Eshop Admin GUI s čistou strukturou.

## Struktura

```
backend/
├── config/           # Konfigurace
│   ├── paths.js      # Cesty k souborům
│   ├── server.js     # Konfigurace hlavního serveru
│   └── adminServer.js # Konfigurace admin serveru
├── server.js         # Hlavní server (port 3001)
└── adminServer.js    # Admin server (port 3002)
├── controllers/      # Business logika
│   ├── indexController.js
│   ├── healthController.js
│   ├── adminController.js
│   └── authController.js
├── routes/          # Routy
│   ├── indexRoutes.js
│   ├── healthRoutes.js
│   ├── authRoutes.js
│   └── adminRoutes.js
├── middleware/      # Middleware
│   ├── common.js    # Společné middleware
│   └── staticFiles.js # Statické soubory
├── views/           # HTML šablony
│   ├── admin-login.html
│   └── admin-dashboard.html
├── data/            # Data soubory (JSON)
│   └── products.json
├── tests/           # Testy
│   └── test-endpoints.js
├── server.js        # Hlavní entry point
└── README.md        # Dokumentace
```

## Spuštění

### Hlavní server (veřejné rozhraní)
```bash
npm run server
```
Běží na portu **3001**

### Admin server (admin rozhraní)
```bash
npm run server:admin
```
Běží na portu **3002**

### Oba servery najednou
```bash
npm run server:all
```
Spustí oba servery současně s lepším error handlingem.

### Zastavení serverů
```bash
npm run server:stop
```
Zastaví všechny běžící backend servery a uvolní porty.

### Manuální spuštění
```bash
# Hlavní server
node backend/server.js

# Admin server
node backend/adminServer.js
```

## Endpointy

### Veřejné endpointy

#### GET `/`
Vrací celý `index.html` jako HTML stránku.

#### GET `/api/index`
Vrací `index.html` jako JSON s HTML obsahem.

#### GET `/health`
Health check endpoint.

### Admin endpointy

#### GET `/admin` nebo `/admin/login`
Admin přihlašovací stránka.

**Přihlašovací údaje (demo):**
- Uživatelské jméno: `admin`
- Heslo: `admin123`

#### GET `/admin/dashboard`
Admin dashboard pro správu produktů.

#### POST `/admin/api/auth/login`
Přihlášení do admin rozhraní (speciální auth endpoint).

**Request:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Přihlášení úspěšné",
  "redirect": "/admin/dashboard",
  "user": {
    "username": "admin",
    "role": "admin"
  }
}
```

#### POST `/admin/api/auth/logout`
Odhlášení z admin rozhraní.

**Response:**
```json
{
  "success": true,
  "message": "Odhlášení úspěšné",
  "redirect": "/admin/login"
}
```

#### GET `/admin/api/auth/verify`
Ověření autentizace.

**Response:**
```json
{
  "success": true,
  "authenticated": true,
  "user": {
    "username": "admin",
    "role": "admin"
  }
}
```

#### GET `/admin/api/products`
Získá všechny produkty.

**Response:**
```json
{
  "success": true,
  "products": [
    {
      "id": "1234567890",
      "name": "Produkt",
      "category": "elektronika",
      "price": 999.99,
      "description": "Popis produktu",
      "createdAt": "2024-01-01T12:00:00.000Z"
    }
  ]
}
```

#### POST `/admin/api/products`
Přidá nový produkt.

**Request:**
```json
{
  "name": "Název produktu",
  "category": "elektronika",
  "price": 999.99,
  "description": "Popis produktu"
}
```

**Response:**
```json
{
  "success": true,
  "product": { ... },
  "message": "Produkt úspěšně přidán"
}
```

#### DELETE `/admin/api/products/:id`
Smaže produkt podle ID.

**Response:**
```json
{
  "success": true,
  "message": "Produkt úspěšně smazán"
}
```

## Statické soubory

Server automaticky servuje:
- `/sass/*` - Sass/CSS soubory
- `/assets/*` - Obrázky a statické soubory
- `/src/*` - JavaScript soubory

## Porty

- **Hlavní server:** Port **3001** (veřejné rozhraní)
- **Admin server:** Port **3002** (admin rozhraní)

Porty lze změnit pomocí environment variables:
```bash
# Hlavní server
PORT=3001 npm run server

# Admin server
ADMIN_PORT=3002 npm run server:admin
```

**Důležité:** Admin server běží na samostatném portu pro lepší bezpečnost a izolaci.

## Kategorie produktů

Dostupné kategorie:
- `elektronika`
- `obleceni`
- `domacnost`
- `sport`
- `knihy`
- `jine`

## Bezpečnost

⚠️ **POZOR:** Toto je demo verze s jednoduchou autentizací. Pro produkci:
- Použij hashování hesel (bcrypt)
- Implementuj JWT nebo session management
- Přidej rate limiting
- Použij databázi místo JSON souborů
- Přidej validaci a sanitizaci vstupů
