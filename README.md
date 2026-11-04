# SellerDesk — Credosis Phase 02 Demo

A frontend prototype for small social-commerce sellers to manage products, customer orders, inventory, and printable order slips.

## Tech stack

- Next.js App Router + React + TypeScript
- Tailwind CSS v4
- shadcn/ui-inspired, locally owned components under `src/components/ui`, built with Radix UI primitives and the same copy-in/customization approach
- Radix UI primitives
- Sonner for notifications
- localStorage for browser-only demo persistence

## Run locally

Requirements: Node.js 20.9+ and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000. Run `npm run build` before deploying.

## Simple project structure

```text
src/
├── app/                     # Next.js routes, layout, global CSS
├── components/
│   ├── ui/                  # shadcn-style reusable primitives
│   ├── layout/              # Sidebar and header
│   ├── dashboard/           # Dashboard screen
│   ├── products/            # Product list and product dialog
│   ├── orders/              # Orders, order dialog, slips
│   ├── shared/              # Shared status badge and empty state
│   └── sellerdesk-app.tsx   # Main app composition
├── hooks/
│   └── use-sellerdesk.ts    # Shared client state and application actions
├── lib/                     # Types, constants, data, storage, business logic, helpers
│   ├── product-service.ts
│   ├── order-service.ts
│   ├── dashboard.ts
│   ├── storage.ts
│   ├── demo-data.ts
│   ├── constants.ts
│   └── utils.ts
└── types.ts                 # Shared domain types
```

## Architecture in plain language

- `app/` is only the Next.js entry point and global setup.
- `components/` contains the UI. Screens are grouped by what they display, not by a nested feature architecture.
- `hooks/use-sellerdesk.ts` owns shared Products/Orders state and calls the functions in `lib/`.
- `lib/*-service.ts` contains business rules that should not live inside React components.
- `lib/storage.ts` is the only module that reads or writes localStorage.
- `components/ui/` contains reusable shadcn-style components that can be customized in this repository.

See [DEVELOPMENT_ORDER.md](./DEVELOPMENT_ORDER.md) for a recommended incremental implementation and commit sequence.

## Main workflow

1. Add or edit products with SKU, selling price, cost price, and stock.
2. Create an order with customer details and one or more products.
3. Confirm an order to deduct stock.
4. Mark a confirmed order as delivered, or cancel it to restore stock.
5. Open an order slip and print it or save it as PDF.

## Demo persistence

The demo seeds fictional products and orders the first time it runs. Data is stored in the current browser under `sellerdesk-demo-v3`.

To reset the demo, run this in the browser console:

```js
localStorage.removeItem("sellerdesk-demo-v3");
location.reload();
```

## Current limitations

- No authentication or multi-tenant data isolation.
- Data belongs to one browser profile; it is not shared across devices.
- No payment, courier, or social inbox integrations.
- Dashboard sales are grouped using order creation date, not delivery date.
- Gross profit is estimated from recorded product cost and selling prices only. It excludes shipping, packaging, marketing, refunds, taxes, and other operating costs.
- localStorage is a demo adapter, not production persistence. A real application must validate and update stock on the server using database transactions.

## shadcn/ui

shadcn/ui is a source-code distribution approach rather than a traditional black-box component package. This repository keeps its UI component source under `src/components/ui`, using Radix primitives and shadcn conventions so the components can be inspected and customized. The `components.json` file configures the shadcn CLI for future additions. You can add more components later with:

```bash
npx shadcn@latest add tooltip
```

Review generated source before using it so the project remains consistent.
