# DEV-08 — logistics provider admission and readiness

Authority: Accepted Shared EA-DEV DEV-08, original INT-04, ADR-THA-0009 and
ADR-THA-0018. Thamani composes B2B logistics services; TMS owns physical
execution, Trade Docs owns documentary evidence, Regulations owns regulatory
decisions, CP owns canonical context/bindings/legal authority and IAM identity.
An individual consignee or recipient gains no B2B purchasing authority through
customer status. The existing prototype remains a synthetic UX demonstration.

## Observed provider prerequisite

At this increment, `baobab-tms` main
`9a4761f6a4c039cb000eb29503a748faa369d691` contains architecture/template files.
Its README explicitly reports no runnable headless service, live carrier
integration or active canonical capability. TMS-TECH-01 remains Proposed;
ADR-TMS-0001/0002 are accepted domain architecture. Shared publishes no current
logistics/TMS wire contract consumed by Thamani. Thamani's existing contract
lock expressly leaves these unimplemented integrations unpinned. No technology
proposal or namespace example is promoted into an accepted wire API here.

Real B2B quote, booking, tracking and proof-of-event execution therefore remain
BLOCKED. Source/unit/browser tests do not turn those cases into runtime passes.
The official Shared EA-DEV register carries the detailed engineering inventory.

## Source implementation

`src/lib/logistics/dev08-admission.ts` strengthens the existing BGX-03 seam;
`bgx03-admission.ts` preserves its import path by re-exporting the new boundary.
The `server-only` marker prevents admission code from entering client bundles.
No production HTTP endpoint or connected engine adapter is exposed.

The internal receipt types are verified-adapter projections, not new canonical
contracts or browser-supplied authority. An eventual server adapter must verify
real issuer signature/current token status and obtain current CP and TMS policy
decisions. Constructing a matching object is not authentication. The supplied
`unavailableLogisticsPorts` returns no authority and never falls back to fixtures.

The maintained read path requires, in order:

1. Current authenticated Principal and exact server-configured audience.
2. CP capability/binding, tenant, Organisation, legal entity and Market, with
   current approved transport-actor authority and its source reference.
3. Native TMS object policy for the exact shipment, matching all scope and
   binding fields, a sourced owner/custodian/intended-recipient relationship
   and an explicit permission for the selected read mode.
4. Current native evidence for the same shipment/context. The native reader is
   never called when preceding authority is missing, mismatched or expired.

`TRACKING` and `EVENT_PROOF` are internal read intents. The server selects the
audience, capability, intent and freshness policy; browser flags supply none of
those authorities. These intents reserve no Shared capability key. Tracking
permission alone never permits an event-proof read. A proof additionally needs
the exact requested event reference, source and verified occurrence; predicted,
future or impossible events are refused. It is not a verified POD document,
Customs release, GPS accuracy guarantee or legal sufficiency decision.

Every scope receipt must echo the exact current CP binding reference. The server
clock is re-read after awaited calls, every upstream lease is rechecked, and a
backwards/non-finite clock refuses. Native snapshot timestamps must be valid,
non-future and within the server's explicit positive maximum age. Historical
event occurrence may precede the fresh snapshot. The returned validity is the
intersection of all four leases, not a new transferable permission token.

Only opaque shipment/source references, snapshot time, bounded validity and an
explicitly admitted event reference/source/time are copied into the frozen
display projection. Arbitrary carrier, ETA, custody, coordinates, credentials,
provider URLs and other native fields cannot pass through a spread operation.
All refusals and outages return one generic unavailable/not-authorised answer
without confirming object existence. No booking, dispatch or other write is
performed by this read boundary.

## Validation and limits

Unit tests use visibly synthetic receipts. They cover scope/binding mismatch,
missing grant/object policy, unapproved actor/Market, owner/custodian/recipient
permissions, separate event-proof permission, future/stale/impossible evidence,
authority expiring during an await, backwards clocks, provider outages and
projection-field minimisation. The unchanged prototype/browser journeys continue
to be UX evidence only. No real transport receipt or teardown claim is created.

The local GitHub Packages install returned 401. Local source checks built the
three Shared Experience packages at exact `0.3.1` source commit
`83e5a4a5db7111fa4fbd3603559b1ef6136eaae3` in a temporary workspace, using
Thamani's direct public dependency versions. The immutable Shared registry pins
and archive hashes remain unchanged. Those checks do not prove the published archives install;
normal authenticated owner CI must independently prove that before merge.

The first CI run identified high-severity Zod and Undici advisories in the
existing dependency lock. This increment pins Zod 4.6.6 and the affected Undici
8.x leaf to 8.12.2, including compatible transitive Zod 4.x consumers. The two
leaf resolutions use their registry integrity hashes; the three private Shared
importers and original archive/snapshot entries are verified unchanged. A local
lock-only install also requires unavailable registry authentication, so the owner
frozen-lock installation is required to independently validate the lock. No new
audit suppression is introduced. Advisory sources:
https://github.com/advisories/GHSA-mrhx-c7xc-m3w5 and
https://github.com/advisories/GHSA-xjj6-f33q-929c.

## Integration and maintenance

Before wiring a protected customer route, implement and qualify the owning TMS
runtime and accepted Shared contracts, actual IAM/CP adapters, Organisation and
legal/Market relationships, native shipment object policy and scoped event
provenance. Map accepted owner responses into these internal receipts; do not
serialize these types as an invented network contract. Replace synthetic tests
with a joined native profile under Infrastructure's existing guarded lifecycle,
including actual wrong-actor/Market, unrelated tracking, invented carrier/ETA/
custody, revoked/expired authority, booking replay, outage/recovery and teardown.

Quote/service-order commercial behavior remains with Thamani; carrier booking
and physical events remain TMS-owned. Do not revive the retired retail checkout
or interpret a prototype quote/approval click as any provider acknowledgement.
Missing mandatory documentary or regulatory providers block the applicable step.

Rollback removes the affected server consumer/adapter wiring and restores
reviewed source pins while preserving generic denial. It must not reconnect
synthetic fixtures, relax object policy or restore retired retail commitments.
Re-run source, type, build and browser checks after changing this seam; requalify
the actual joined profile after any authority, provider or wire-contract change.
Independent staging/production acceptance remains a later promotion requirement.
