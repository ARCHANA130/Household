# Lolitha

Lolitha is a small Next.js storefront prototype. The project now includes a reusable header, a stronger homepage structure, and working routes for `Shop`, `Collections`, and `About`.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Current structure

- `src/app/page.js`: homepage with hero, feature cards, and starter product cards
- `src/app/shop/page.js`: product browsing page
- `src/app/collections/page.js`: collection overview page
- `src/app/about/page.js`: brand/about page
- `src/components/`: reusable UI building blocks

## Next improvements

- Connect cards to real product data
- Add a mobile menu and active navigation states
- Introduce cart state and search behavior
- Add ESLint and tests once the UI structure stabilizes
