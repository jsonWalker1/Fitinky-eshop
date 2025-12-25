# Railway Deployment Guide

Tento projekt obsahuje dva servery:
1. **Main Server** (port 3001) - Veřejné rozhraní pro zákazníky
2. **Admin Server** (port 3002) - Admin rozhraní

## Rychlý start po nasazení

### Main Server (Zákaznický frontend)

Po nasazení na Railway získáš URL adresu (např. `https://tvuj-projekt.railway.app`).

**Otevři tuto URL a automaticky se ti zobrazí `index.html`!**

Všechny stránky jsou dostupné přes Express routes:
- `https://tvuj-projekt.railway.app/` → index.html (domovská stránka)
- `https://tvuj-projekt.railway.app/products` → products.html
- `https://tvuj-projekt.railway.app/cart` → cart.html
- `https://tvuj-projekt.railway.app/login` → login.html
- `https://tvuj-projekt.railway.app/checkout` → checkout.html
- `https://tvuj-projekt.railway.app/orders` → orders.html

**Statické soubory** (CSS, JS, obrázky) se automaticky načítají:
- `/sass/main.css` → CSS styly
- `/assets/pic/*` → obrázky a média
- `/src/js/*` → JavaScript soubory

### Admin Server

Pokud máš samostatný admin server:
- `https://admin-projekt.railway.app/admin` → Admin login
- `https://admin-projekt.railway.app/admin/dashboard` → Admin dashboard

## Možnosti deploymentu

### Varianta 1: Jeden Railway projekt (oba servery společně)

**Krok 1:** Vytvoř nový projekt na Railway
- Jdi na [railway.app](https://railway.app)
- Klikni na "New Project"
- Vyber "Deploy from GitHub repo" (nebo jiný zdroj)

**Krok 2:** Nastav proměnné prostředí
V Railway dashboardu → Variables přidej:
```
PORT=3001
ADMIN_PORT=3002
NODE_ENV=production
```

**Krok 3:** Railway automaticky použije:
- `Procfile` → spustí `npm start`
- `npm start` → zkompiluje Sass a spustí oba servery

**Poznámka:** Tato varianta spustí oba servery v jednom procesu. Railway nastaví `PORT` automaticky, takže hlavní server poběží na portu, který Railway přidělí.

### Varianta 2: Dva samostatné Railway projekty (doporučeno)

#### Main Server Project:

**Krok 1:** Vytvoř první Railway projekt pro main server
- Název: `eshop-main-server`

**Krok 2:** Nastav start command:
```
npm run start:main
```

**Krok 3:** Nastav proměnné prostředí:
```
PORT=3001
NODE_ENV=production
```

#### Admin Server Project:

**Krok 1:** Vytvoř druhý Railway projekt pro admin server
- Název: `eshop-admin-server`

**Krok 2:** Nastav start command:
```
npm run start:admin
```

**Krok 3:** Nastav proměnné prostředí:
```
ADMIN_PORT=3002
NODE_ENV=production
```

**Krok 4:** Získej URL adresy obou služeb z Railway dashboardu

## Build Process

Railway automaticky:
1. Instaluje závislosti (`npm install`)
2. Generuje Prisma Client (`npm run prisma:generate`) - pokud používáš Prismu
3. Spustí build script (`npm run build:css`) - zkompiluje Sass
4. Aplikuje databázové migrace (`npm run prisma:deploy`) - pokud používáš Prismu
5. Spustí start command podle konfigurace

## Důležité poznámky

### Porty na Railway
- Railway automaticky nastaví proměnnou `PORT` pro hlavní službu
- Pokud používáš Variantu 1 (oba servery společně), `start-servers.js` použije:
  - `process.env.PORT` pro main server (Railway to nastaví automaticky)
  - `process.env.ADMIN_PORT || 3002` pro admin server

### Statické soubory
- Railway slouží statické soubory přes Express middleware
- CSS soubory jsou zkompilované do `sass/main.css` a `sass/admin.css`

### JSON soubory (data)
- `backend/data/*.json` soubory jsou součástí repozitáře
- Na Railway budou existovat, ale změny se nebudou persistovat mezi deployem
- **Doporučení:** Pro produkci použij databázi (PostgreSQL na Railway, MongoDB, atd.)

### Environment Variables v Railway

V Railway dashboardu nastav:

**Pro main server:**
```
PORT=3001 (nebo nech Railway automaticky)
NODE_ENV=production
```

**Pro admin server (pokud samostatný projekt):**
```
ADMIN_PORT=3002
NODE_ENV=production
```

## Troubleshooting

### Port already in use
- Railway automaticky nastaví `PORT` - nehardcoduj porty v kódu
- Používej `process.env.PORT` v konfiguraci

### CSS se nekompiluje
- Zkontroluj, že `sass` je v `dependencies` (ne jen `devDependencies`)
- Nebo použij build hook v Railway

### Admin server nedostupný
- Pokud používáš Variantu 1, ujisti se, že `start-servers.js` funguje správně
- Zkontroluj logy v Railway dashboardu

## Aktualizace kódu pro produkci

1. **Přesuň sass z devDependencies do dependencies:**
```json
"dependencies": {
  "express": "^4.22.1",
  "sass": "^1.69.0"
}
```

2. **Zkontroluj, že všechny cesty jsou relativní** (ne absolutní)

3. **Ověř, že JSON soubory mají správná oprávnění**

## Next Steps

1. ✅ Deploy na Railway
2. 🔄 Nahraď JSON soubory databází
3. 🔄 Přidej environment-specific konfigurace
4. 🔄 Nastav monitoring a logy

