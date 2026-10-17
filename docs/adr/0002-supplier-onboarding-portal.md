# ADR-0002: Supplier onboarding portal

**Status:** Superseded by ADR-THA-0018 (§19, §22). The B2C supplier-estate model is replaced by the organisation-centric logistics-provider relationship of ADR-THA-0004. The `business_model: "B2C"` position recorded below is no longer current. Kept for its lifecycle, capability and evidence design, which ADR-THA-0004 generalises.

Thamani hosts a supplier registration, application and status-tracking portal
alongside its B2C storefront, without becoming a B2B storefront, a
marketplace, or an ERP. The two surfaces share this repository but not their
data: commerce reads stay in `src/lib/medusa`; supplier onboarding gets its
own `src/lib/supplier` domain layer and its own database, matching the
pattern `baobab-platform/zuribeans` proved out for its own supplier-side amendment
(that repository's `docs/adr/0006-supplier-registration-data-ownership.md`).

This does not relabel Thamani's business model. `contracts/legal-entity/registry.yaml`
keeps `THAMANI-GLOBAL: business_model: "B2C"` — that describes Thamani's
commerce relationship to its customers, not every workflow it hosts. A
supplier-facing intake form is B2C-estate-hosted experience, the same way
this repository already hosts non-commerce pages; it is not a market, and it
must never be classified as one.

## What this reuses instead of reinventing

`baobab-platform/shared`'s ADR-0006 extracted `@baobab-platform/supplier-domain` (a generic
lifecycle mechanism and Zod shapes for a supplier organisation, its
contacts, capabilities, certifications and status-change audit trail) and
`contracts/supplier-onboarding/v1` (the canonical event contracts) from
`baobab-platform/zuribeans`' proven implementation, specifically so a second estate
would not need to re-derive that design from scratch. Thamani adopts both
once `@baobab-platform/supplier-domain` is published — `contracts.lock.yaml` does
not yet pin a version because no release exists yet at the time of this
ADR. Until then, `docs/supplier-onboarding/domain-model.md` documents the
shapes Thamani's own `src/lib/supplier` layer implements against, so the
swap to a real import is mechanical rather than a redesign.

## What this explicitly does not do yet

- **No direct ERP integration.** ADR-0001 already rejects that outright
  ("direct ERP/Pulse integrations are rejected until demonstrated
  requirements justify them"); this ADR does not reopen it. A supplier
  application does not call `baobab-platform/baobab-erp`, and never will without a
  superseding ADR — provisioning is Trade's or Control Plane's concern, per
  the existing "Trade mediates business workflows" rule.
- **No new authentication system.** Thamani has no account system today.
  `applicantIdentityRef` (the join point `@baobab-platform/supplier-domain` defines
  for whatever identity authenticates a supplier applicant) is left
  unimplemented until Thamani has an account system to bind it to — the
  domain schemas and lifecycle logic in this increment do not require a
  live authenticated session to exist.
- **No live database yet.** Standing up `SUPPLIER_DB_URL`, migrations, and
  the actual registration/application UI is later, scoped work (this
  program's Phase 2), not this ADR.
- **No event publishing.** `contracts/supplier-onboarding/v1` defines
  `supplier.*` events Thamani can eventually emit, but no message broker
  exists anywhere in this ecosystem yet to carry them (the same position
  ERP's own event contracts are already in).
- **No canonical Organisation identity.** Any future
  `canonical_organisation_id` field stays reserved and null, exactly as
  `@baobab-platform/supplier-domain` defines it, until `baobab-platform/baobab-cp` and
  `baobab-platform/shared`'s ERP system-of-record assign that concept an owner.
