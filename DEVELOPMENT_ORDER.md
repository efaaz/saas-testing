# Recommended development order

Build and commit SellerDesk in small, testable stages. Do not create every file at once.

1. **Project foundation** — `app/layout.tsx`, `app/globals.css`, `app/page.tsx`, `components.json`.
2. **Shared types and constants** — `types.ts`, `lib/constants.ts`.
3. **Utilities and demo data** — `lib/utils.ts`, `lib/demo-data.ts`.
4. **shadcn UI primitives** — `components/ui/*` (Button, Card, Input, Label, Badge, Table, Dialog, Select, Sheet, Separator, Textarea).
5. **Persistence** — `lib/storage.ts`; verify seeded data loads and survives refresh.
6. **Business rules** — `lib/product-service.ts`, then `lib/order-service.ts`, then `lib/dashboard.ts`.
7. **Shared application state** — `hooks/use-sellerdesk.ts`; connect services and storage.
8. **Application shell** — `components/layout/*`, then `components/sellerdesk-app.tsx`.
9. **Product experience** — `components/products/product-dialog.tsx`, then `products-view.tsx`.
10. **Order experience** — `components/orders/order-dialog.tsx`, `orders-view.tsx`, then slip components.
11. **Dashboard and final integration** — `components/dashboard/dashboard-view.tsx`; test all flows.
12. **Quality and release** — responsive checks, print checks, build, README, deployment.

Commit after each stage works. Prefer small logical commits, for example `feat: add product validation` and `feat: build product list`. Do not create commits just to make the history look busy.
