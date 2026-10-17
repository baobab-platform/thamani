# BXS-05F — Thamani logistics experience consumption

**Governing:** Accepted ADR-SHARED-040; ADR-THA-0014; ADR-THA-0017.

Shared published GitHub Packages `experience-tokens@0.3.1`,
`experience-ui@0.3.1` and `experience-geo-core@0.3.1`
in [release workflow 39073176845](https://github.com/baobab-platform/shared/actions/runs/39073176845).
All three compiled exports and SHA512 archive digests were independently
verified in [run 39073362603](https://github.com/baobab-platform/shared/actions/runs/39073362603).
Thamani pins these exact versions. React/ReactDOM/types remain at 19.3.0
to satisfy Shared UI's declared peer dependency.

## Strict scope

- A source-labelled, authority-neutral `TrackingEvidence` UI primitive
  is provided to the existing internal logistics component family.
- Its caller must supply an IAM/CP-authorised BFF projection. The restricted
  variant renders only a denial; an authorised variant accepts validated
  location source, type and time and caller-supplied certified milestones.
- No map renderer, public tracking route, claim of live GPS, carrier ETA,
  provider rate, customs clearance or transport completion is introduced.
- The old retail storefront remains legacy migration debt and is NOT
  reclassified as the future logistics Digital Estate by this increment.
- The published neutral `base.css` and Shared UI CSS are additive.
  **The legacy Thamani theme is intentionally not imported.** Shared
  tokens expressly mark it `legacy-retail-not-approved-for-logistics`.

## Security and release

pnpm uses the exact registry SHA512 lock, with an age exception limited
to independently verified Shared 0.3.1 releases. Node 24, pnpm 11.24.0
and existing PostgreSQL 17 when required remain the platform baseline.
CI authenticates using a same-repository, job-scoped packages:read token.
An ephemeral home npmrc is used for pnpm 11; Docker requires a BuildKit
secret and tmpfs credentials, never a checked-in token or Docker ARG.
All CI/Foundation/audit/CodeQL, React unit and accessibility tests must pass.

## Explicit future acceptance gates

An approved NEW Thamani logistics brand/theme, route IA, real browser
keyboard/axe/visual goldens, authenticated customer BFF, TMS tracking
and MapLibre/deck.gl renderer will be implemented independently.
Real operations, route ETA, cross-border validity and shipment milestones
cannot be asserted by purely presentational package adoption.
