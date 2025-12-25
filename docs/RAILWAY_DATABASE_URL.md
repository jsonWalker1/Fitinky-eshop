# Nastavení DATABASE_URL na Railway

## Problém
Aplikace se snaží připojit k `localhost:5432`, což znamená, že `DATABASE_URL` není nastavená.

## Řešení

### Možnost 1: PostgreSQL jako Railway Service (doporučeno)

Pokud máš PostgreSQL jako službu ve stejném Railway projektu:

1. Railway Dashboard → tvůj projekt
2. PostgreSQL service → Variables
3. Najdi `DATABASE_URL` nebo `POSTGRES_URL` 
4. Zkopíruj hodnotu
5. Hlavní aplikace → Variables → Add Variable
6. Key: `DATABASE_URL`
7. Value: vlož zkopírovanou hodnotu
8. Save

Railway automaticky poskytuje `DATABASE_URL` když máš PostgreSQL jako service!

### Možnost 2: Manuální nastavení

Pokud nemáš PostgreSQL jako Railway service:

1. Railway Dashboard → tvůj projekt (hlavní aplikace)
2. Variables → Add Variable
3. Key: `DATABASE_URL`
4. Value: `postgresql://postgres:HESLO@HOST:PORT/DATABASE`
   - HESLO: heslo z PostgreSQL
   - HOST: hostname (např. `shortline.proxy.rlwy.net`)
   - PORT: port (např. `16553`)
   - DATABASE: název databáze (obvykle `railway`)
5. Save

### Formát DATABASE_URL:
```
postgresql://postgres:YfQusObLDYtvOEZTQMBkBbQRxYUuFJcx@shortline.proxy.rlwy.net:16553/railway
```

## Po nastavení

1. Railway automaticky restartuje aplikaci
2. Zkontroluj logy - mělo by být: `✅ Připojeno k PostgreSQL databázi`
3. Pokud stále chyba, zkontroluj, že hodnota `DATABASE_URL` je správná

## Kontrola

V Railway logu bys měl vidět:
- `✅ Připojeno k PostgreSQL databázi` - úspěch
- `❌ CHYBA: DATABASE_URL není nastavená!` - chybí env variable
- `❌ Neočekávaná chyba databáze` - špatné přihlašovací údaje

