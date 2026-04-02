# endu24 SaaS Core (Next.js 16 + Supabase)

Production-ready SaaS foundation for **endu24.com**, rebuilt with:

- Next.js 16 (App Router)
- TypeScript (strict)
- Tailwind CSS
- Supabase (Auth, Postgres, Storage)
- RLS policies

## Project structure

```txt
app/
  (public)/
    layout.tsx
    page.tsx
  admin/
    layout.tsx
    page.tsx
    logo/page.tsx
    menu/page.tsx
  login/page.tsx
  api/logout/route.ts
  layout.tsx
  globals.css

actions/
  auth.ts
  settings.ts
  menu.ts

components/
  admin/
    login-form.tsx
    logo-settings-form.tsx
    menu-manager.tsx
  layout/
    public-header.tsx
    admin-shell.tsx
  ui/
    button.tsx
    card.tsx
    input.tsx

lib/
  auth/session.ts
  cms.ts
  supabase/
    client.ts
    server.ts
  utils/cn.ts

types/
  database.ts

db/
  supabase-cms.sql
proxy.ts
```

## Environment variables

Create `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

> `SUPABASE_SERVICE_ROLE_KEY` is reserved for future privileged backend operations and is not required for current admin actions.

## Supabase setup

1. Create a Supabase project.
2. Enable Email/Password in Authentication providers.
3. Run SQL from `db/supabase-cms.sql` in the SQL editor.
4. Create at least one admin user in Supabase Auth (email/password).

## Local development

```bash
npm install
npm run dev
```

Open:

- Public site: `http://localhost:3000`
- Login: `http://localhost:3000/login`
- Admin: `http://localhost:3000/admin`

## CMS scope implemented

- **Branding** (`/admin/logo`)
  - update site name
  - upload logo to Supabase Storage (`site-assets`)
  - preview + persisted logo URL

- **Menu management** (`/admin/menu`)
  - create menu items
  - toggle active/inactive
  - delete entries
  - sort by `sort_order`

- **Public rendering**
  - header renders logo + site name + active menu items from Supabase

## Deployment (Vercel)

1. Import repository in Vercel.
2. Add environment variables from `.env.local`.
3. Deploy.
4. Ensure Supabase URL domain is allowed in `next.config.ts` image remote patterns.
