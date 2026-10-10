# Medusa 2.21.2 consumer verification — Thamani's superseded storefront

**Audit date:** 10 October 2026. **Current source:** `baobab-platform/thamani` `main`. **Decision authority:** Accepted `docs/adr/ADR-THA-0018 — B2B Commercial Model, Legacy Supersession and Platform Engine Responsibility Reallocation.md`. **Outcome:** Legacy API compatibility is assessable; target B2B logistics compatibility is **NOT established by passing the old storefront**.

## Governing architectural correction

ADR-THA-0018 explicitly supersedes Thamani's original B2C ecommerce model. Its intended operating model is **B2B integrated logistics**, with organisation-centric customers and providers, RFQ/service requests, quotations, rate contracts, service orders, transport execution via Baobab TMS, trade documents via Trade Docs and ERP settlement. **Medusa product/cart/checkout is not the target Thamani customer workflow.**

The deployed repository's older `src/app/page.tsx`, `src/app/shop/page.tsx`, `src/app/products/[handle]/page.tsx`, `src/app/search/page.tsx`, `src/app/cart/page.tsx` and `src/lib/medusa` continue to embody the B2C model. This is architectural drift, not evidence that Thamani should be treated as a new Store consumer for LA-05C3 native checkout.

## Actual inherited Medusa v2 consumers

| Source | Operation | Query | Response assumptions | Medusa 2.21.2 impact |
| --- | --- | --- | --- | --- |
| `src/lib/medusa/products.ts` | `sdk.store.product.list` twice | `limit:24,q?,region_id` and `handle,limit:1,region_id` | `id,handle,title,subtitle,description,thumbnail,variants[].id,title,calculated_price` | Default variant/calculated-price projection needs *live* proof |
| `src/lib/medusa/cart.ts` | `sdk.store.cart.create` | `region_id` | `cart.id` persisted to server-set HTTP-only cookie | Strict Store fields are not explicitly requested |
| `src/lib/medusa/cart.ts` | `sdk.store.cart.createLineItem` | `variant_id,quantity` | Mutation succeeds for region and active channel | Backend guard, payment/shipping and seller policy must be demonstrated separately |
| `src/lib/medusa/cart.ts` | `sdk.store.cart.retrieve` | `cartId` from cookie | `cart.items[].id,title,quantity` | Default cart item projection needs staging proof |

**Static findings:** No explicit `fields` selection in these callers, no `/store/search` use, and `src/app/checkout/page.tsx` explicitly gates real order completion. Thus strict allowed-field paths and search-index-only expansions pose no *known direct request-selector* incompatibility in the legacy code. However the response expectations about `variants[].calculated_price` and `cart.items` are unproven on Medusa 2.21.2. Thamani pins `@medusajs/js-sdk@2.19.0`, so TypeScript compatibility with a 2.21.2 backend must not be inferred.

## Tests and limitations

```bash
node scripts/verify-medusa-2212-legacy.mjs  # static caller/ADR drift gate
# Historical legacy-only HTTP check; requires designated non-production fixtures:
MEDUSA_2212_APPROVE_LEGACY_TEST=yes \
MEDUSA_BACKEND_URL=https://<staging-medusa> \
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=<publishable-staging-key> \
NEXT_PUBLIC_DEFAULT_REGION_ID=<configured-region> \
MEDUSA_2212_TEST_PRODUCT_HANDLE=<published-product-with-calculated-price> \
MEDUSA_2212_RELEASE_ATTESTATION=2.21.2 \
node scripts/verify-medusa-2212-legacy.mjs --live-legacy
```

Live legacy mode checks field shapes and `q` product listing; with `MEDUSA_2212_TEST_CART_ID` it also checks cart item projections. It **does not** create carts, charge payments, register legal actors or prove B2B logistics. No staging endpoints or approval fixtures are currently supplied.

## Decision

1. Keep `baobab-trade` Medusa 2.21.2 security upgrade candidate isolated until ZuriBeans' *current* Store API calls and Thamani's *remaining legacy* calls have live projection evidence.
2. Do **not** block Medusa's necessary security hardening forever on Thamani's B2C redesign: either decommission/disable the obsolete retail routes after acceptance of its B2B services estate, or maintain a strictly time-bounded compatibility smoke for any historical retail surface that remains actually reachable.
3. Implement Thamani B2B logistics via CP-authorised capability consumption, RFQ/contract/service-order and TMS/Trade Docs/ERP capabilities, not an assumed Medusa cart. A legal-actor PEP for `SERVICE_CONTRACTING` or equivalent requires the appropriate independently approved LA-05 authority; a native Medusa seller-of-record checkout does not establish it.
4. Retain market, tenant, organisation, IAM and provider authority boundaries. Never add a wildcard Medusa `allowFields` override to keep the old storefront running.
