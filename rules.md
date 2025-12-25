# 1️⃣ Obecné zásady

- Kód MUSÍ být čitelný pro juniorního vývojáře
- Upřednostňuj čitelnost před „chytrostí“
- Žádná magie, žádné implicitní chování
- Vše musí být snadno dohledatelné ve struktuře složek
- Raději více menších souborů než jeden obří

---

## 2️⃣ Povolený stack

### Backend
- node.js
- Express
- PostgreSQL
- Prisma



## 3️⃣ Struktura backendu (POVINNÁ)

Backend NESMÍ obsahovat jeden velký `server.js`.

### Povolená struktura:

backend/
src/
app.js # inicializace express app
server.js # pouze start serveru + port
routes/
controllers/
services/
repositories/
middleware/
db/
modules/


### Pravidla:
- routes → pouze routování
- controllers → HTTP logika
- services → business logika
- repositories → práce s DB (Prisma)
- middleware → auth, permissions, validation

ŽÁDNÁ logika nesmí být v `server.js`.

---

## 4️⃣ Struktura frontend – ADMIN (POVINNÁ)

Admin frontend NESMÍ být v jedné složce bez struktury.



## 5️⃣ Naming & styl kódu

- Výstižné názvy proměnných
- Žádné zkratky typu `x`, `tmp`, `data1`
- Funkce dělají jednu věc
- Max 50–80 řádků na soubor (orientačně)

---

## 6️⃣ Komentáře & vysvětlování

- Složitější části MUSÍ být okomentované
- AI MUSÍ vysvětlit:
  - proč je kód takto
  - ne jen co dělá

Před každým větším blokem krátký komentář.

---

## 7️⃣ Pravidla pro generování kódu

- AI NESMÍ:
  - přepisovat existující architekturu
  - slučovat soubory bez souhlasu
  - vytvářet „god files“

- AI SMÍ:
  - vytvářet nové složky
  - pokud dávají architektonický smysl
  - vždy musí vysvětlit PROČ

---

## 8️⃣ Pracovní režim

Každý úkol:
1. návrh struktury (bez kódu)
2. potvrzení
3. implementace
4. krátké vysvětlení

Bez potvrzení NEIMPLEMENTOVAT.

---

## 9️⃣ Pokud si AI není jistá

- AI se MUSÍ zeptat
- NESMÍ hádat
- NESMÍ improvizovat

---

veškeré mdčka co se týče plánu jak a co deployovat je nutné dát do složky doc

## 🔴 Sankce

Při porušení pravidel:
- AI musí kód opravit
- bez přidávání nových funkcí
- pouze podle pravidel tohoto dokumentu
