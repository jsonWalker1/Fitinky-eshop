# TODO: Řešení ukládání obrázků

## Problém
Railway používá ephemeral filesystem - nahrané obrázky se ztratí při každém redeploy.

## Co se musí vyřešit
- Implementovat cloud storage (Cloudinary/Supabase/AWS S3) pro trvalé ukládání obrázků
- Upravit upload controller pro ukládání do cloudu místo lokálního filesystemu
- Ukládat pouze URL do databáze (ne soubory)

## Poznámka
Prozatím se to řešit nebude, ale je to důležitý bod do budoucna.

