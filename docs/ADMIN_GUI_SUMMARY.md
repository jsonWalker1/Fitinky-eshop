# 📋 Admin GUI - Rychlý přehled vylepšení

## 🎯 Hlavní oblasti k vylepšení

### 1. **Navigace & Layout**
- ❌ Sidebar menu místo linků v headeru
- ❌ Top header bar (logo, notifikace, uživatel)
- ❌ Breadcrumbs pro navigaci

### 2. **Dashboard (Hlavní přehled)**
- ❌ Statistiky (produkty, objednávky, uživatelé, tržby)
- ❌ Grafy (tržby, objednávky v čase)
- ❌ Recent activity feed
- ❌ Quick actions

### 3. **Produkty** (viz PRODUCT_MANAGEMENT_PLAN.md)
- ❌ Editace produktů
- ❌ Tabulkové zobrazení s filtrováním
- ❌ Správa kategorií (samostatná stránka)
- ❌ Upload obrázků

### 4. **Objednávky**
- ❌ Detail objednávky (full page, ne alert!)
- ❌ Filtrování a vyhledávání
- ❌ PDF faktura
- ❌ Admin poznámky
- ❌ Historie změn statusu

### 5. **Uživatelé**
- ❌ Detail uživatele (full page)
- ❌ Filtrování a vyhledávání
- ❌ Statistiky uživatele (celkové tržby, objednávky)
- ❌ Editace uživatele
- ❌ Zobrazení košíku uživatele

### 6. **Statistiky & Reporty**
- ❌ Přehledové statistiky
- ❌ Grafy a analýzy
- ❌ Export reportů

### 7. **Nastavení**
- ❌ Obecné nastavení (název, logo, kontakt)
- ❌ Nastavení dopravy
- ❌ Nastavení platby
- ❌ Email nastavení
- ❌ Správa admin účtů

### 8. **UX/UI**
- ❌ Toast notifikace (místo alert)
- ❌ Modals (pro potvrzení)
- ❌ Loading states
- ❌ Responsive design
- ❌ Design system (konzistentní barvy, typografie)

### 9. **Funkce**
- ❌ Notifikace (zvonek v headeru)
- ❌ Globální vyhledávání
- ❌ Export/Import (CSV, Excel, PDF)
- ❌ Bulk operace
- ❌ Audit log

---

## 🔴 Top 10 priorit (MVP)

1. **Sidebar navigace** - základ struktury
2. **Dashboard se statistikami** - přehled
3. **Detail objednávky** - full page místo alert
4. **Detail uživatele** - kompletní info
5. **Filtrování/vyhledávání** - ve všech sekcích
6. **Tabulkové zobrazení** - s řazením
7. **Toast notifikace** - místo alert
8. **Správa kategorií** - samostatná stránka
9. **Editace produktů** - formulář
10. **PDF faktura** - pro objednávky

---

## 📁 Struktura stránek

```
/admin
├── /dashboard          → Přehled s statistikami
├── /products           → Seznam produktů
├── /products/:id       → Detail/Editace produktu
├── /categories         → Správa kategorií
├── /orders             → Seznam objednávek
├── /orders/:id         → Detail objednávky
├── /users              → Seznam uživatelů
├── /users/:id          → Detail uživatele
├── /statistics         → Reporty a analýzy
└── /settings           → Nastavení
```

---

## 💡 Design inspirace

- Shopify Admin - čistý, profesionální
- WooCommerce - přehledný, funkční
- Medusa Admin - moderní, minimalistický

---

**Viz `ADMIN_GUI_COMPLETE_PLAN.md` pro detailní popis všech funkcí.**

