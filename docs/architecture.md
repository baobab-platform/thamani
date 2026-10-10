# Architecture

Thamani is exclusively a Digital Estate. Server Components call application-level adapters in `src/lib/medusa`; React components never call the Medusa SDK directly. Marketing content is cacheable, catalogue data is revalidated, price/availability are region-sensitive, and cart/customer/checkout data are dynamic and never placed in shared caches.

Information architecture grows by complete vertical slices. Empty routes are not committed. Cross-estate reuse with Zuribeans requires an explicit package governed through `baobab-platform/shared`, not source imports between repositories.

## Current contract findings

ADR-THA-0018 makes Thamani Global a **B2B integrated logistics enterprise** and declares any registry, documentation, UI copy, configuration or contract that states `THAMANI-GLOBAL = B2C` obsolete. The pinned Shared registry (`contracts/legal-entity/registry.yaml`) still records `business_model: "B2C"` for `THAMANI-GLOBAL`; that value must be reconciled in `baobab-platform/shared`. Thamani does not alter or duplicate the canonical registry locally. `contracts.lock.yaml` still records one open gap: Shared has not published a canonical commerce Store API package, so the legacy storefront integrates against Baobab Trade's Medusa v2 Store API directly rather than a Baobab-owned contract. That storefront is superseded by ADR-THA-0018.
