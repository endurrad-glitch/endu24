# ENDU24 Data Platform (v2)

## 1) Best practice: CSV locale manuale in produzione

Non è una pratica adatta alla produzione per un comparatore prezzi:

- **Nessuna auditabilità**: difficile sapere chi ha cambiato cosa e quando.
- **Single point of failure**: dipende da una macchina locale.
- **Zero automazione**: import fragile e non idempotente.
- **Rischio inconsistenza**: categorie, URL e prezzi divergono tra release.

### Modelli feed a confronto

- **CSV manuale**: adatto a bootstrap o piccoli test.
- **Feed XML (Google Merchant-like)**: standard per merchant, ottimo per integrazione B2B.
- **API**: migliore per near real-time, retry e controlli granulari.
- **Database centralizzato**: single source of truth applicativa, con versioning e storicizzazione.

## 2) Architettura proposta (scalabile)

1. **Ingestion layer** (`scripts/import-catalog.mjs`)
   - Input multipli: CSV, XML.
   - Rilevamento automatico sorgenti `data/products_export*.csv`.
2. **Validation & normalization**
   - Parsing robusto prezzi, URL, stato disponibilità.
   - Schema dati unificato prodotto/offerta.
3. **Category intelligence**
   - Master categories controllate dal sistema (`data/catalog/category-master.json`).
   - Mapping brand-specific (`data/catalog/category-mapping.json`).
   - Fallback intelligente su keyword.
4. **Serving layer**
   - Catalogo generato in `data/catalog/products.json`.
   - Frontend legge solo catalogo normalizzato (`lib/products.ts`).
5. **Outbound tracking layer**
   - Link esterni passano da `/api/out` per tracking/affiliazione futura.

## 3) Scheduler consigliato

### Cron (self-hosted)

```bash
# ogni ora: ingest Loboo da feed aggiornato
0 * * * * cd /workspace/endu24 && npm run import:catalog >> /var/log/endu24-import.log 2>&1
```

### Pipeline CI/CD (consigliato)

- Job schedulato (GitHub Actions, GitLab CI, Cloud Scheduler).
- Step:
  1) download feed remoto
  2) `node scripts/import-catalog.mjs --source auto --input <file>`
  3) validazione output
  4) deploy/apply DB upsert

## 4) Categoria master + mapping

- Le categorie ENDU24 sono **sovrane** rispetto ai feed esterni.
- Le categorie dei feed vengono trattate come `sourceCategory`.
- Mapping dinamico:
  - prima lookup esatto brand-specific
  - poi fallback per keyword su titolo/tipo
  - infine categoria di default `accessori-moto`

## 5) Link prodotto (fix)

- URL prodotto risolto con priorità:
  - `Variant URL`, `Product URL`, `URL`, `url`, `link`, `offer_url`
  - fallback automatico: `https://endurrad.com/products/{handle}`
- Homepage/PLP/PDP usano link esterni tracciabili via `/api/out`.
- Se URL manca o non valido: fallback UI "Link non disponibile".

## 6) Scalabilità futura

- Spostare output da JSON locale a tabella PostgreSQL (`products`, `offers`, `import_runs`, `category_map`).
- Aggiungere dead-letter queue per record invalidi.
- Versionare feed e diff giornalieri prezzo/disponibilità.
- Inserire worker async per import multi-brand paralleli.
- Aggiungere metriche (tempo ingest, error rate, prodotti aggiornati).
