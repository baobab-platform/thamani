# BXS-05G — Governed shipment workspace composition

**Status:** Source increment; neither protected customer route nor live-service acceptance.

**Governing:** Accepted ADR-SHARED-040 and ADR-THA-0005, -0008, -0009,
-0014 (especially §§29–32, 175–177 and THA-UX-07/09/10), -0017.

## What is implemented

The source-only `ShipmentWorkspace` composes existing native Base UI
`LogisticsViewTabs` with the published Shared Experience System `TrackingEvidence`,
`StatusLabel` and `FeedbackPanel` primitives. It supports three customer
concepts without coupling the UI to an individual engine:

- **Tracking:** source-labelled observation and TMS-owned milestone timeline.
- **Route:** text-first, non-map stop evidence with planned/carrier-reported/
  verified-milestone semantics; no generated GPS path or predicted ETA.
- **Documents:** authorised document **metadata only**, with no arbitrary
  download links or inferred customs clearance.

Every route and document projection must be supplied by a caller that has
already enforced IAM identity, CP organisation/tenant context, object-level
shipment grants and native capability decision. Nested `restricted` and
`unavailable` states are rendered independently. A globally restricted
shipment renders **no tabs or hidden view data**.

## Explicit authority and security contract

Presentation visibility does not grant read or write authority. The browser
must never call TMS, Trade Docs, CP or ERP using raw engine credentials.
The future server-side BFF must validate field-level visibility, redact
counterparty details, constrain payload size and attest observation freshness.
String source labels, timestamps, stop IDs and document IDs are validated
as display-only metadata; any malformed projection fails closed. There
are no quote, booking, payment, customs or document-download operations.

No frontend-estimated location becomes observed GPS. No route can claim
live tracking merely because a customer opens the Route tab. The text
view deliberately precedes a MapLibre adapter so geospatial interaction
is never the sole accessible way to inspect an authorised shipment.

## Test evidence and future gating

Vitest/Testing Library checks whole-workspace denial, independently
restricted capabilities, Base UI tab switching, invalid/duplicate source
data, and the absence of fictitious document links. axe verifies
serious/critical WCAG failures for the composed control surface.

The production Digital Estate still serves legacy retail routes; this PR
does not expose the new workspace or approve Thamani's logistics palette.
THA-UX-07 must provide a real IAM/CP-bound confidential BFF before exposing
THA-UX-09 shipment details. Follow-on gates: real TMS/Trade Docs fixtures,
cross-organisation denial, governed documents, keyboard browser/visual
acceptance, approved logistics theme, then optional MapLibre rendering.

**Exit rule:** merge source only after all normal Thamani mandatory CI,
Foundation, Security, Store compatibility and pinning checks succeed.

## Audit hardening

The follow-up rejects impossible calendar dates, unknown route-evidence values,
unknown document states and unknown shipment visibility. The temporary local calendar guard is now a re-export of the strict,
SHA512-verified `experience-geo-core@0.3.1` implementation, preserving
the existing local import seam without duplicate parsing code.

`pnpm test:logistics:browser` uses an isolated loopback Vite fixture, actual
logistics components and exact published dependencies. Chromium tests keyboard
tab movement, responsive bounds, reduced motion, axe and capability denial.
No synthetic fixture is added to the production Next route tree.
