# endu24.com – Next.js + Supabase CMS leggero

Applicazione Next.js (App Router) con dashboard admin per gestire header pubblico (logo, branding, menu) tramite Supabase.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Supabase Auth + Database + Storage
- Server Actions per mutazioni lato admin

## Struttura cartelle principale

```txt
app/
  admin/
    (protected)/
      layout.tsx
      page.tsx
      logo/page.tsx
      menu/page.tsx
    login/
      LoginForm.tsx
      page.tsx
    actions/auth.ts
    logo/actions.ts
    menu/actions.ts
  layout.tsx
  page.tsx
components/
  admin/
    LogoManager.tsx
    MenuManager.tsx
  navbar/
    Navbar.tsx
    MobileMenu.tsx
lib/
  cms.ts
  supabase/
    client.ts
    server.ts
db/
  supabase-cms.sql
```

## Setup Supabase

1. Crea un progetto su Supabase.
2. Esegui lo script SQL in `db/supabase-cms.sql` nel SQL Editor.
3. In Authentication > Users crea almeno un utente admin (email/password).
4. Configura `.env.local` partendo da `.env.example`:

```bash
cp .env.example .env.local
```

## Funzionalità implementate

- **Auth admin** con email/password Supabase
- **Protezione route `/admin/*`** via layout server-side con redirect automatico a `/admin/login`
- **Logout** con invalidazione sessione
- **Dashboard admin** con sidebar + header
- **Gestione logo/branding** su `/admin/logo`
  - upload su Supabase Storage bucket `site-assets`
  - preview live
  - salvataggio `settings.logo_url` + `settings.site_name`
- **Gestione menu** su `/admin/menu`
  - CRUD menu items
  - toggle attivo/non attivo
  - ordinamento tramite campo numerico `order`
- **Header pubblico dinamico** (`components/navbar/Navbar.tsx`) che legge logo e menu da Supabase (SSR)

## Deploy su Vercel

1. Push repository su GitHub.
2. Importa il progetto in Vercel.
3. Aggiungi Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy.
5. Esegui SQL `db/supabase-cms.sql` sul progetto Supabase di produzione.
6. Crea utente admin in Supabase Auth per accedere a `/admin/login`.

## Comandi utili

```bash
npm install
npm run dev
npm run lint
npm run build
```
