This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Data import pipeline

Genera il catalogo normalizzato (CSV/XML -> JSON):

```bash
npm run import:catalog
```

Output: `data/catalog/products.json` (usato dall'app in runtime).

Per input specifico:

```bash
node scripts/import-catalog.mjs --source csv --input data/products_export.csv --brand loboo
```

## Maintenance mode (Vercel-ready)

Il progetto supporta una maintenance mode centralizzata tramite `proxy.ts`.

### Attivazione / disattivazione

1. Imposta la variabile ambiente:

```bash
MAINTENANCE_MODE=true
```

2. Deploy su Vercel (o riavvio locale) per applicare la modifica.

Per tornare online:

```bash
MAINTENANCE_MODE=false
```

### Comportamento

- con `MAINTENANCE_MODE=true` tutte le route applicative vengono riscritte su `/maintenance`
- restano accessibili asset statici e path tecnici (`/_next`, `/api`, file pubblici)
- evita loop grazie all'esclusione esplicita di `/maintenance`
