# Thamani logistics customer workspace prototype

**Status:** Interactive design and journey prototype; not connected logistics acceptance.

**Governing decisions:** Accepted ADR-THA-0014 as modified by ADR-THA-0018, ADR-SHARED-040 and existing owning-engine authority boundaries.

## Experience

The customer is a fictitious Customer Organisation, **Acacia Exports**. Its representatives use an organisation-centric workspace rather than a product catalogue/cart/checkout. The sidebar covers Overview, Shipments, Get a quote, Track a shipment, Documents and Help & support.

- Overview: scenario-derived shipment counts, actionable attention filter, illustrative African corridor diagram, reference lookup and recent shipments.
- Quote: origin/destination and load validation; road/air/ocean scenarios; Standard/Priority comparison; sample ZAR amounts; 30-minute validity; explicit Priority approval simulation. Editing a request invalidates its previous comparison and approval.
- Booking: carry quote/version, route, cargo and service into review; require an acknowledgement; create one session-local request per quote. A request never becomes a confirmed carrier booking or fabricated collection/delivery milestone.
- Shipments/tracking: searchable and filterable references; case-insensitive lookup; unknown-reference feedback; shipment milestones, cargo/text route alternative and document checklist. Initial references are `TH-260184`, `TH-260183`, `TH-260181` and `TH-260176`; session bookings use `DEMO-B-*`.
- Documents: scenario metadata and missing-document states. No document contents, upload/download or assertion of Customs clearance.
- Support: a synthetic enquiry acknowledgement and expandable answers. No message is sent.
- Reset: clears drafts and generated requests. Refresh also resets the demo. No browser storage, cookies, database or engine commands are used.

## Stack and separation

The prototype is a **separate Next.js 16.3.8 App Router application** in `prototype/app`, using the repository's pinned React 19.3.0, strict TypeScript, Tailwind CSS 4.3.3, Zod 4.4.3, Base UI 1.9.0, `experience-tokens@0.3.1` and `experience-ui@0.3.1`. Reusable client components live under `src/components/logistics/prototype`; synthetic scenario helpers live in `src/lib/logistics/prototype.ts`.

Node 24 and pnpm 11.24.0 remain the repository baseline. PostgreSQL 17 remains the backend baseline when a connected implementation needs a database; this presentation prototype needs none. No dependency pin or lockfile changes are required. The new navy/white/gold palette is a scoped design proposal, not approval of a production logistics theme or the retired retail theme.

```sh
# After the repository's normal authenticated GitHub Packages installation:
pnpm prototype:dev
pnpm prototype:build
```

The build statically exports to `prototype/out/`. Webpack is selected explicitly for this isolated export; the production app's build configuration and `src/app` route tree are unchanged. Vite, already used by the repository, is only the browser component acceptance harness (`tests/browser/prototype.html`); private hosting uses the Next.js export.

## Private preview and governance

Host only the exported static files behind Sites owner-only access. `noindex` metadata is a discovery hint, not access control. Do not make the preview public without the Platform Owner's approval. The source PR must remain unmerged until reviewed.

All organisations, rates, dates, route lines, milestones, document states and acknowledgements are synthetic and labelled throughout. The corridor graphic is a schematic with a text alternative; it is not a MapLibre integration, live GPS, route calculation or BGX qualification. No tiles, geolocation, analytics, external fonts or carrier calls are used.

The prototype grants no Principal, membership, organisation role, approval authority or resource access. It cannot register a CP commerce profile, satisfy CAA-06b provenance, exercise a Medusa commitment or requalify historical TA-08. IAM authentication, CP context, TMS transport execution, Trade Docs documentary workflows, Regulations decisions and ERP financial records remain with their respective authorities. An approval click is explicitly a simulation and is never sent to those systems.

Before connected staging, replace fixtures through an authorised estate BFF/projection boundary; prove cross-tenant/object/capability denials; obtain qualified quote/contract and TMS booking providers; preserve idempotency and authority at commitment; qualify document access and notifications independently. Prototype tests are UX evidence only.

## Validation

- Unit and component coverage: invalid corridors/load, stale/reused quotes, Priority approval, request lineage, no execution promotion, quote-to-book-to-track and reset.
- Existing `test:logistics:browser` runs the new desktop/mobile journeys alongside the existing logistics evidence tests, including keyboard tabs, axe WCAG checks, overflow checks, search/filtering, documents and support.
- CI also builds the isolated Next.js export after the existing production build. Screenshots and traces are retained by the existing browser artifact step.
- Do not treat a passing unit suite or static build as connected-provider qualification, approved brand visuals or production launch acceptance.

The initial local registry installation returned HTTP 401 for private Shared packages. Local checks used source-built packages from the exact upstream `0.3.1` tag (`83e5a4a5db7111fa4fbd3603559b1ef6136eaae3`), without changing dependency pins or committing package substitutes. CI's normal authenticated registry installation remains the independent check of the published archives.
