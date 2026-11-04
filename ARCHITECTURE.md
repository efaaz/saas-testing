# SellerDesk architecture

This project intentionally uses a small, conventional structure instead of nested feature modules.

## Request and state flow

```text
app/page.tsx (Server Component)
        |
        v
components/sellerdesk-app.tsx (Client Component)
        |
        +--> components/layout, dashboard, products, orders
        |
        v
hooks/use-sellerdesk.ts
        |
        +--> lib/product-service.ts
        +--> lib/order-service.ts
        +--> lib/storage.ts
        |
        v
React state + browser localStorage
```

## Responsibilities

- **App Router (`app/`)**: route entry points, document metadata, global styles.
- **UI (`components/`)**: presentation and user interaction. Feature-specific screen components are grouped by screen.
- **Application state (`hooks/`)**: coordinates shared products and orders state and exposes actions to the UI.
- **Business logic (`lib/*-service.ts`)**: validates and creates products/orders and applies order-status/inventory rules. These functions do not depend on React.
- **Persistence (`lib/storage.ts`)**: browser localStorage adapter. It is not a database and is not safe for multi-user or concurrent writes.
- **Types (`types.ts`)**: shared contracts for Product, Order, inputs, and screen keys.

## Why this is enough for this demo

There are only a few screens and one shared dataset. A nested feature architecture, multiple repository interfaces, global state library, and API layer would add indirection without delivering much benefit at this stage. If the product grows, the screen folders and domain modules can be split further based on actual change and reuse patterns.
