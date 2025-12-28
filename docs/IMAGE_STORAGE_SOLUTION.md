# Řešení pro ukládání obrázků na Railway

## Problém

Railway používá **ephemeral filesystem** - to znamená, že:
- Když nahrajete obrázek, uloží se do `/assets/pic/` na serveru
- Při každém redeploy se filesystem smaže a vytvoří znovu
- Obrázky, které nejsou v Git repozitáři, se ztratí
- Proto se po redeploy zobrazí znovu defaultní obrázky

## Řešení

### Možnost 1: Cloud Storage (Doporučeno) ⭐

Použít externí cloud storage službu:

#### A) Railway Blob Storage
- Integrované do Railway
- Jednoduché nastavení
- Placené (ale levné)

#### B) Cloudinary
- Generous free tier
- Automatické optimalizace obrázků
- CDN
- **Doporučeno pro začátek**

#### C) AWS S3
- Velmi spolehlivé
- Placené (ale levné pro malé projekty)
- Více nastavení

#### D) Supabase Storage
- Free tier
- Jednoduché API
- Dobrá dokumentace

### Možnost 2: Database Storage (Pro malé projekty)

Ukládat obrázky jako base64 do databáze:
- ✅ Vše je v databázi
- ✅ Žádné externí služby
- ❌ Databáze se zvětšuje
- ❌ Horší výkon
- ❌ Omezení velikosti

### Možnost 3: Git LFS (Pro malé projekty)

Ukládat obrázky do Git pomocí Git LFS:
- ✅ Vše je v repozitáři
- ❌ Git repozitář se zvětšuje
- ❌ Pomalé push/pull
- ❌ Ne ideální pro produkci

## Doporučené řešení: Cloudinary

Cloudinary je nejjednodušší a nejpraktičtější řešení:

### Výhody:
1. **Free tier**: 25 GB úložiště, 25 GB bandwidth měsíčně
2. **Automatické optimalizace**: Obrázky se automaticky optimalizují
3. **CDN**: Rychlé načítání po celém světě
4. **Transformace**: Resize, crop, filtry přes URL
5. **Jednoduchá integrace**: NPM balíček

### Implementace:

1. Zaregistrovat se na cloudinary.com (zdarma)
2. Nainstalovat SDK: `npm install cloudinary`
3. Upravit upload controller
4. Ukládat URL do databáze (ne soubor)
5. Hotovo!

### Přibližná cena:
- **Free tier**: 25 GB úložiště, 25 GB bandwidth měsíčně (stačí pro začátek)
- **Paid**: Od $89/měsíc (když přesáhnete free tier)

## Alternativní řešení: Supabase Storage

Také dobrá volba:
- Free tier: 1 GB úložiště
- Jednoduchá integrace
- Dobrá dokumentace

## Co teď udělat?

1. **Krátkodobě**: Obrázky se ztratí po redeploy (to je normální)
2. **Dlouhodobě**: Implementovat Cloudinary nebo podobnou službu

**STATUS:** ⚠️ TODO - Prozatím se to řešit nebude, ale je to důležitý bod do budoucna.

---

## Shrnutí problému

Ano, je kolem toho docela "sraní" 😄:

1. **Ephemeral filesystem** na Railway - soubory se mažou při redeploy
2. **Cloud storage** - nutné nastavit externí službu
3. **Integrace** - upravit upload controller a ukládání URL
4. **Environment variables** - API keys atd.
5. **Migrace existujících obrázků** - pokud budou nějaké

Ale je to standardní problém, který řeší skoro každý, kdo deployuje na platformách typu Railway/Heroku/Vercel. Cloudinary nebo Supabase Storage to vyřeší poměrně jednoduše.

