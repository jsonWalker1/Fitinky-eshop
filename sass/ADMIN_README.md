# Admin Sass Struktura

Sass struktura pro admin rozhraní je podobná struktuře hlavního frontendu.

## Struktura

```
sass/
├── admin.scss              # Hlavní admin Sass soubor
├── admin.css               # Zkompilovaný admin CSS
├── components/
│   └── admin/
│       ├── _login.scss     # Admin login komponenta
│       └── _dashboard.scss # Admin dashboard komponenta
├── _variables.scss         # Sdílené proměnné
├── _mixins.scss            # Sdílené mixiny
└── _base.scss             # Sdílené základní styly
```

## Kompilace

### Jednorázová kompilace
```bash
npm run sass:compile
```

Kompiluje oba soubory:
- `sass/main.scss` → `sass/main.css` (hlavní frontend)
- `sass/admin.scss` → `sass/admin.css` (admin rozhraní)

### Watch mode
```bash
npm run sass:watch
```

Sleduje změny v obou Sass souborech a automaticky je kompiluje.

## Použití v HTML

### Admin Login
```html
<link rel="stylesheet" href="/sass/admin.css">
```

### Admin Dashboard
```html
<link rel="stylesheet" href="/sass/admin.css">
```

## Komponenty

### Login (`components/admin/_login.scss`)
Styly pro admin přihlašovací stránku:
- `.login-container` - kontejner pro login
- `.login-box` - přihlašovací formulář
- `.form-group` - skupina formulářových polí
- `.btn-login` - přihlašovací tlačítko
- `.error-message` - chybové zprávy

### Dashboard (`components/admin/_dashboard.scss`)
Styly pro admin dashboard:
- `.admin-header` - hlavička dashboardu
- `.admin-container` - hlavní kontejner
- `.admin-section` - sekce dashboardu
- `.form-group` - formulářové skupiny
- `.product-item` - položka produktu
- `.message` - zprávy (success/error)

## Sdílené zdroje

Admin Sass používá stejné:
- **Variables** (`_variables.scss`) - barvy, spacing, atd.
- **Mixins** (`_mixins.scss`) - znovupoužitelné mixiny
- **Base** (`_base.scss`) - základní reset styly

## Responzivní design

Admin komponenty mají responzivní design:
- Desktop: plná šířka a rozložení
- Tablet (< 768px): upravené paddingy
- Mobil (< 480px): vertikální layout

## Přidání nové admin komponenty

1. Vytvoř nový soubor v `sass/components/admin/_nazevKomponenty.scss`
2. Přidej import do `sass/admin.scss`:
   ```scss
   @use 'components/admin/nazevKomponenty';
   ```
3. Zkompiluj Sass: `npm run sass:compile`

