# Prisma Setup Guide

## Proč Prisma?

Prisma je moderní ORM (Object-Relational Mapping) pro Node.js s těmito výhodami:

✅ **Type-safe queries** - automatické TypeScript typy  
✅ **Automatické migrace** - jednoduchá správa schématu  
✅ **Prisma Client** - generovaný klient s autocomplete  
✅ **Vizuální Studio** - GUI pro správu databáze  
✅ **Výborná dokumentace** - snadné učení  
✅ **Relations** - snadná práce s vztahy mezi tabulkami  

## Instalace

```bash
# Prisma CLI (dev dependency)
npm install -D prisma

# Prisma Client (runtime dependency)
npm install @prisma/client
```

## Inicializace

```bash
npx prisma init
```

Tím se vytvoří:
- `prisma/schema.prisma` - datové schéma
- `.env` - environment variables (DATABASE_URL)

## Struktura podle rules.md

Podle `rules.md` by měla být struktura:
```
backend/
├── repositories/  → práce s DB (Prisma)
├── services/      → business logika
├── controllers/   → HTTP logika
└── ...
```

**Repositories** používají Prisma Client pro přístup k databázi.

## Základní Prisma Schema

Viz `prisma/schema.prisma` - obsahuje všechny modely podle aktuálních JSON souborů.

## Migrace

```bash
# Vytvořit migraci (po změně schema.prisma)
npx prisma migrate dev --name nazev_migrace

# Aplikovat migrace v produkci
npx prisma migrate deploy

# Resetovat databázi (development)
npx prisma migrate reset
```

## Prisma Client

```javascript
// backend/db/prisma.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;
```

## Repository příklad

```javascript
// backend/repositories/userRepository.js
import prisma from '../db/prisma.js';

export const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email }
  });
};

export const createUser = async (userData) => {
  return await prisma.user.create({
    data: {
      email: userData.email,
      password: userData.password,
      firstName: userData.firstName,
      // ...
    }
  });
};
```

## Výhody oproti čistému pg

1. **Type safety** - TypeScript typy automaticky
2. **Snadnější queries** - `prisma.user.findMany()` místo SQL
3. **Relations** - `include: { orders: true }` místo JOINů
4. **Migrace** - automatické, verzované
5. **Studio** - `npx prisma studio` pro GUI

## Railway Deployment

1. Přidej PostgreSQL na Railway (New → Database → PostgreSQL)
2. Railway automaticky nastaví `DATABASE_URL` environment variable
3. Railway automaticky použije `railway.json` s build command:
   ```
   npm install && npm run prisma:generate && npm run build:css
   ```
4. A start command:
   ```
   npm run prisma:deploy && npm start
   ```
5. Hotovo! Prisma Client se vygeneruje, migrace se aplikují, aplikace startuje.

**Poznámka:** Pokud nechceš používat Prismu teď, můžeš nechat JSON soubory a přejít na Prismu později.

## Data Migration z JSON

1. Načti data z JSON souborů
2. Použij Prisma Client k vložení do DB
3. Viz `backend/db/migrate-to-prisma.js` (připravíme později)

