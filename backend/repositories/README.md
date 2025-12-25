# Repositories

Podle `rules.md`: **repositories → práce s DB (Prisma)**

## Struktura

Každý repository soubor obsahuje funkce pro práci s jednou entitou v databázi:

- `userRepository.js` - práce s uživateli
- `productRepository.js` - práce s produkty
- `categoryRepository.js` - práce s kategoriemi
- `cartRepository.js` - práce s košíky
- `orderRepository.js` - práce s objednávkami

## Příklad použití

```javascript
// V service vrstvě
import { findUserByEmail } from '../repositories/userRepository.js';

export const verifyCredentials = async (email, password) => {
    const user = await findUserByEmail(email);
    // ... business logika
};
```

## Vztahy

Services volají repositories, repositories používají Prisma Client.

```
Controller → Service → Repository → Prisma Client → Database
```

