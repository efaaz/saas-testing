# SellerDesk — Credosis Phase 02 Demo

A frontend prototype for small social-commerce sellers to manage products, customer orders, inventory, and printable order slips.


This is a demo application for Credosis Phase 02. It is intended to demonstrate the frontend architecture, workflow, and business logic for a small social commerce seller dashboard as I haven't use backend and for database I used localStorage to store the data and for state management I used  

## Tech stack

- Next.js App Router + React + TypeScript
- Tailwind CSS v4
- shadcn/ui for reusable UI components
- Sonner for notifications
- localStorage for browser-only demo persistence

## Run locally

```bash
npm install
npm run dev
```


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


## Main workflow

1. Add or edit products with SKU, selling price, cost price, and stock.
2. Create an order with customer details and one or more products.
3. Confirm an order to deduct stock.
4. Mark a confirmed order as delivered, or cancel it to restore stock.
5. Open an order slip and print it or save it as PDF.

## Demo persistence

The demo seeds fictional products and orders the first time it runs. Data is stored in the current browser under `sellerdesk-data`.


## Current limitations

- No authentication or multi-tenant data isolation.
- Data belongs to one browser profile; it is not shared across devices.
- No payment, courier, or social inbox integrations.
- Dashboard sales are grouped using order creation date, not delivery date.
- Gross profit is estimated from recorded product cost and selling prices only. It excludes shipping, packaging, marketing, refunds, taxes, and other operating costs.
- localStorage is a demo adapter, not production persistence. A real application must validate and update stock on the server using database transactions.

