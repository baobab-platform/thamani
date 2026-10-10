# ADR-THA-0017 — Legacy Migration, Production Readiness and Go-Live Transition Architecture

**Status:** Accepted — Programme Closure / Production Transition Architecture  
**Date:** 2026-10-03  
**Decision Owners:** Nabhold Group Africa / Thamani Global / Baobab Platform Architecture  
**Primary Repository:** `baobab-platform/thamani`  
**Legal Entity:** `THAMANI-GLOBAL`  
**Digital Estate:** Thamani  
**Platform Context / Provisioning Authority:** `baobab-platform/baobab-cp`  
**Canonical Contract Authority:** `baobab-platform/shared`  
**Identity Authority:** `baobab-platform/baobab-iam`  
**Transport Execution Authority:** `baobab-platform/baobab-tms`  
**Trade-Document / Customs Workflow Authority:** `baobab-platform/baobab-trade-docs`  
**Financial Authority:** `baobab-platform/baobab-erp`  
**Regulatory Decision Authority:** `baobab-platform/baobab-regulations`  
**Content Authority:** `baobab-platform/baobab-cms` where applicable  
**Intelligence:** `baobab-platform/baobab-pulse`  
**Infrastructure Authority:** `baobab-platform/infrastructure`  
**Decision Class:** Legacy migration / production readiness / release governance / capability cutover / data migration / rollback / go-live / operational acceptance

---

# 1. Decision

Thamani SHALL migrate from its legacy B2C ecommerce Digital Estate into the integrated shipping, transportation and logistics Digital Estate defined by ADR-THA-0003 through ADR-THA-0016 through a **controlled, capability-gated and evidence-driven transition**.

Production activation SHALL NOT mean:

```text
frontend deployed
        =
Thamani production-ready
```

Nor:

```text
CI green
        =
business capability ready
```

Nor:

```text
engine repository exists
        =
capability available
```

Instead:

> **Thamani production readiness shall be established per customer-visible capability through demonstrable readiness of every authoritative dependency required to fulfil that capability.**

---

# 2. Normative Dependencies

This ADR closes and SHALL be interpreted with the full Thamani architecture:

```text
THA-0003  Enterprise Domain Boundary
THA-0004  Counterparty / Provider Qualification
THA-0005  Historical Transport Domain Model
THA-0006  RFQ / Quote / Contract / Rate / Margin
THA-0008  Cross-Border / Customs / Regulatory Composition
THA-0009  Capability Consumption / Authority Boundary
THA-0010  Warehousing / 3PL / Inventory Custody
THA-0011  Cold Chain / DG / Special Cargo
THA-0012  Project Logistics / Heavy / Abnormal Cargo
THA-0013  4PL / Control Tower / Multi-Provider Orchestration
THA-0014  Digital Estate / Customer / Partner / Operations UX
THA-0015  Claims / Liability / Service Recovery
THA-0016  Communications / Notifications / Escalation
```

and with:

- ADR-TMS-0001 / ADR-TMS-0002
- ADR-TDOC-0001 / ADR-TDOC-0002
- the accepted Control Plane ADR series
- ADR-SHARED-017 and ADR-SHARED-018
- accepted IAM provider-neutral and production-governance ADRs
- accepted ERP architecture and production-readiness ADRs
- accepted Regulations ADRs
- applicable CMS, Pulse and infrastructure decisions.

---

# 3. Governing Principle

> **Go-live is the controlled activation of proven business capabilities over proven platform dependencies—not the date on which a web application happens to be deployed.**

---

# 4. Current Repository Reality

The repository audit on 2026-10-03 confirms that the current `thamani` repository still carries substantial legacy B2C architecture.

Its README currently describes Thamani as:

```text
consumer-first B2C digital estate
```

and assigns its primary experience around:

```text
retail presentation
discovery
merchandising
cart
checkout
```

This is no longer the accepted Thamani business architecture.

---

# 5. Existing Legacy Routes

The current implementation still includes the retail model represented by routes such as:

```text
/shop

/search

/products/[handle]

/cart

/checkout
```

These SHALL NOT define the target Thamani Digital Estate.

---

# 6. Current Legacy Commerce Dependency

The repository currently includes:

```text
@medusajs/js-sdk
```

and existing build/runtime configuration still assumes:

```text
MEDUSA_BACKEND_URL

NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY

NEXT_PUBLIC_DEFAULT_REGION_ID
```

These SHALL be reviewed under the accepted THA-0009 authority model.

They SHALL NOT survive simply because they already exist.

---

# 7. Existing Technical Foundation Is Not Discarded

The migration SHALL preserve useful implementation foundations where they remain architecturally valid.

The current estate already contains:

```text
Next.js

React

strict TypeScript

server-first patterns

Zod validation

Vitest

Playwright

accessibility tooling

Docker packaging

health endpoint

CI

security scanning

Foundation workflow integration

contract lock

DevContainer support
```

The migration is therefore:

> **a semantic, domain and integration transformation—not an instruction to rewrite the entire frontend stack from zero.**

---

# 8. Legacy ADR Reconciliation

## ADR-0001 — Next.js B2C Digital Estate

ADR-0001 SHALL be treated as:

```text
BUSINESS MODEL:
SUPERSEDED

FRONTEND ENGINEERING CHOICES:
SELECTIVELY RETAINED
```

Retained principles include:

```text
Next.js App Router

React

strict TypeScript

server-first rendering

accessibility

SEO

performance discipline

evidence-before-UI
```

Superseded principles include:

```text
B2C storefront as primary estate

product catalogue as primary customer experience

cart

checkout

Medusa Store API as universal backend boundary
```

---

# 9. ADR-0002 — Supplier Onboarding Portal

ADR-0002 SHALL be reinterpreted through:

```text
THA-0004
    provider/counterparty qualification

THA-0014
    Partner Portal

Control Plane
    canonical organisation identity
```

The old assumption that Thamani independently owns a standalone supplier domain/database SHALL NOT override the newer canonical-organisation and provider-relationship architecture.

---

# 10. Supplier Becomes Logistics Partner Context

Where relevant, legacy supplier concepts SHALL migrate toward:

```text
Canonical Organisation
        │
        ▼
Thamani Relationship
        │
        ▼
Logistics Provider Profile
        │
        ▼
Capabilities
        │
        ▼
Qualification
```

rather than retaining the retail supplier-onboarding model by inertia.

---

# 11. Historical ADRs Shall Not Be Erased

The old ADRs SHALL remain historical records.

They SHOULD be annotated:

```text
Superseded by ADR-THA-0003 / ADR-THA-0014 / ADR-THA-0017
```

rather than rewritten as though the original decision had never existed.

---

# 12. Organisation Rename Hygiene

The platform organisation is now:

```text
baobab-platform
```

not:

```text
nabhold
```

All active operational configuration in Thamani SHALL use the current organisation identity.

Historical ADR text may legitimately retain historical references.

---

# 13. Current Repository Violations

The current production configuration still contains operational references including:

```text
ghcr.io/nabhold/baobab-dev

nabhold/shared

nabhold/baobab-trade

nabhold/baobab-erp

nabhold/infrastructure

nabhold/baobab-dev

.nabhold/environment.yaml
```

These SHALL be treated as **pre-production migration defects**.

---

# 14. Metadata Directory Migration

The repository SHALL converge from:

```text
.nabhold/
```

to:

```text
.baobab/
```

according to the current Foundation repository contract.

No production release SHALL depend on obsolete `.nabhold` operational metadata.

---

# 15. Package Namespace Migration

The current package name:

```text
@nabhold/thamani
```

SHALL be reviewed and migrated to the approved current organisation/package namespace where applicable.

---

# 16. Contract Lock Migration

The current:

```text
contracts.lock.yaml
```

contains legacy repository identities and assumptions including:

```text
nabhold/thamani

nabhold/shared

nabhold/baobab-trade

Medusa v2 Store API
```

The lock SHALL be rebuilt against the accepted logistics architecture.

---

# 17. Contract Lock Must Describe Reality

The target lock SHALL identify only contracts Thamani actually consumes.

Conceptually:

```text
shared
Control Plane
IAM
TMS
Trade Docs
ERP
CMS
Regulations
Pulse
```

where the capability is active and required.

---

# 18. No Aspirational Contract Pins

This SHALL be prohibited:

```text
contract pinned
because
we expect that engine eventually
```

A lock must identify an actual consumed, versioned dependency.

---

# 19. Runtime Version Conformance

The current repository declares:

```text
Node >=24 <25
```

while the current Dockerfile builds/runs using:

```text
Node 26.8.1
```

This is an explicit runtime-contract inconsistency.

It SHALL block production release until resolved.

---

# 20. Runtime Version Decision

The repository SHALL use one intentionally approved Node runtime baseline across:

```text
package.json

DevContainer

CI image

Docker build

Docker runtime

production infrastructure
```

If Node 24 remains the approved Thamani baseline, the container SHALL conform.

If the project deliberately moves to Node 26, that change SHALL update the repository contract and supporting development/build environments together.

---

# 21. Runtime Drift Is Not Harmless

This SHALL be rejected:

```text
CI uses one Node major

package declares another

Docker uses another

production uses another
```

Production reproducibility requires alignment.

---

# 22. Repository Hygiene Gate

Before application migration begins, Thamani SHALL pass a repository-wide legacy reference audit.

At minimum search for:

```text
nabhold

.nabhold

ghcr.io/nabhold

@nabhold/

consumer-first

B2C storefront

cart

checkout

Medusa Store API
```

Every occurrence SHALL be classified:

```text
HISTORICAL

MIGRATE

REMOVE

SUPERSEDE

INTENTIONALLY RETAIN
```

---

# 23. Production Readiness Is Evidence

The ERP production-readiness architecture already establishes the broader Baobab principle:

> **Production readiness is a body of evidence, not a deployment status.**

THA-0017 adopts the same principle.

---

# 24. Capability-Scoped Production Readiness

Thamani SHALL NOT have only one global:

```text
production_ready = true
```

Instead readiness SHALL be assessed per user-visible capability.

For example:

```text
Public Estate                READY
Quote Intake                 READY
Authentication               READY
Customer Portal              READY
Road Transport Execution     BLOCKED
Trade Documents              BLOCKED
Customs Workflow             BLOCKED
Warehousing                  CONDITIONALLY_READY
4PL                          BLOCKED
```

may be valid.

---

# 25. Estate Go-Live ≠ All Capabilities Go-Live

This distinction permits Thamani to launch safely in controlled increments.

For example:

```text
Public corporate/logistics estate
```

could legitimately go live before:

```text
full TMS booking

Customs workflow

4PL automation
```

if unavailable features are not falsely presented as operational.

---

# 26. No Fabricated Capability

This SHALL remain one of the strongest go-live invariants:

```text
UI exists
    !=
capability exists
```

THA-0014's evidence-before-UI principle SHALL govern every release.

---

# 27. Capability Readiness State

A Thamani capability SHOULD expose an internal readiness classification:

```text
NOT_PLANNED

FOUNDATION

IMPLEMENTING

INTEGRATION_READY

UAT_READY

CONDITIONALLY_READY

PRODUCTION_READY

ACTIVE

DEGRADED

SUSPENDED

RETIRED
```

Exact contract naming MAY follow Control Plane readiness semantics.

---

# 28. `FOUNDATION`

`FOUNDATION` means:

```text
architecture/scaffold exists
```

It SHALL NOT mean:

```text
customer-operable production service exists
```

---

# 29. TMS Current Baseline

At the date of this ADR, `baobab-tms` contains its foundational architecture:

```text
ADR-TMS-0001
ADR-TMS-0002
```

and remains based on the new-engine Foundation scaffolding.

Therefore:

> **The existence of `baobab-tms` SHALL NOT be interpreted as evidence that transport execution is production-ready.**

---

# 30. Trade Docs Current Baseline

Likewise, `baobab-trade-docs` currently contains:

```text
ADR-TDOC-0001
ADR-TDOC-0002
```

and Foundation scaffolding.

Therefore:

> **Trade Docs capability SHALL remain unavailable to production Thamani flows until its required implementation, certification and operational gates pass.**

---

# 31. Architecture Ahead of Implementation Is Expected

The architecture programme intentionally establishes:

```text
what the engines must become
```

before the implementation exists.

THA-0017 SHALL not confuse architectural completeness with runtime completeness.

---

# 32. Regulations Readiness

The extensive Regulations ADR programme SHALL similarly not constitute proof that:

```text
every jurisdiction pack

every rule

every regulatory decision path
```

is production-certified.

Thamani SHALL consume only explicitly certified regulatory coverage.

---

# 33. Regulatory Coverage Must Be Visible

For any regulated feature:

```text
jurisdiction

cargo

mode

procedure

regime
```

SHALL fall within known regulatory coverage before the Digital Estate claims automated regulatory readiness.

---

# 34. Unsupported Regulatory Context

Where coverage is absent:

```text
COVERAGE_INSUFFICIENT
```

or equivalent SHALL be surfaced operationally.

It SHALL not silently become:

```text
COMPLIANT
```

---

# 35. Control Plane Dependency

Production Thamani SHALL require a production-ready Control Plane path for any functionality depending on:

```text
organisation context

tenant context

legal entity

market

entitlement

capability binding

provider resolution

canonical mapping
```

---

# 36. Control Plane Readiness Model

Control Plane already defines readiness as an evaluation of:

```text
desired state
vs
observed state
```

with:

```text
audit
observability
reconciliation
drift detection
```

as first-class production concerns.

Thamani SHALL consume that readiness rather than invent local provider-resolution truth.

---

# 37. Thamani Onboarding

Thamani Global SHALL itself be onboarded/provisioned through the canonical organisation/tenant lifecycle.

This SHALL establish the approved:

```text
canonical organisation

legal entity

tenant/platform-account relationship

Digital Estate

market participation

subscription classification

entitlements

capabilities

bindings

isolation profile
```

before dependent production services are activated.

---

# 38. Internal Group Does Not Mean Unmanaged

Even where Thamani is:

```text
INTERNAL_GROUP
```

and incurs no platform subscription charge, it SHALL still have:

```text
explicit subscription

explicit entitlements

explicit capabilities

metering

audit

lifecycle governance
```

according to Control Plane onboarding architecture.

---

# 39. South Africa First

The first operational market SHALL be activated only through approved Thamani market participation.

Future Uganda participation SHALL be an explicit, separately governed market activation.

---

# 40. Market ≠ Deployment Region

This remains:

```text
South Africa market
    !=
automatic South Africa deployment region
```

Residency/deployment topology remains a platform/infrastructure policy decision.

---

# 41. IAM Dependency

Private:

```text
Customer Portal

Partner Portal

Operations Workspace

Executive Experience
```

SHALL NOT go live before the required IAM/BFF/session architecture is production-ready.

---

# 42. Legacy B2C Identity Assumptions

IAM historical ADRs referencing:

```text
Thamani B2C Customer Identity
```

SHALL be reconciled against the new mixed logistics customer/provider/staff architecture before production activation.

Provider-neutral IAM ADRs take architectural precedence where later accepted.

---

# 43. IAM Migration

IAM currently includes a Keycloak-to-Ory migration architecture.

Thamani SHALL not bind itself directly to:

```text
Keycloak-specific UI

Ory-specific browser code
```

where provider-neutral IAM/BFF contracts should apply.

---

# 44. BFF Is Required for Private Experiences

The preferred flow remains:

```text
Browser
   │
   ▼
Thamani BFF
   │
   ▼
IAM / Control Plane / Domains
```

Privileged OAuth tokens SHALL remain server-side according to accepted IAM architecture.

---

# 45. ERP Dependency

Any production capability involving:

```text
invoice

payment accounting

customer receivable

provider payable

financial inventory

claim financial consequence

actual cost
```

SHALL require ERP readiness evidence for that capability.

---

# 46. ERP Production Readiness

ERP-020 defines readiness across architecture, contracts, tenancy, financial integrity, security, reconciliation, backup, DR, provisioning and operations.

Thamani SHALL not bypass those gates merely to enable UI features.

---

# 47. CMS Dependency

Public editorial content MAY go live only against:

```text
production CMS
```

or an explicitly approved static-content fallback.

CMS unavailability SHALL not justify storing uncontrolled editorial content inside transactional databases.

---

# 48. Pulse Dependency

Pulse SHALL remain optional for core operational correctness unless a specific capability explicitly requires it.

A Pulse outage SHALL normally degrade:

```text
prediction

recommendation

intelligence
```

rather than:

```text
tracking

booking

document access

invoice access
```

---

# 49. Production Dependency Graph

Conceptually:

```text
                         THAMANI
                            │
             ┌──────────────┼──────────────┐
             ▼              ▼              ▼
          PUBLIC          PRIVATE       OPERATIONS
          ESTATE          PORTALS        WORKSPACE
             │              │              │
             └──────────────┼──────────────┘
                            ▼
                         BFF / APP
                            │
              ┌─────────────┼─────────────┐
              ▼             ▼             ▼
             IAM           CP           SHARED
                            │
             ┌──────────────┼─────────────────┐
             ▼              ▼                 ▼
            TMS         TRADE DOCS           ERP
             │              │                 │
             └──────────┬───┴───────┬─────────┘
                        ▼           ▼
                   REGULATIONS     CMS
                        │           │
                        └─────┬─────┘
                              ▼
                            PULSE
                        where applicable
```

---

# 50. Readiness Aggregation

A customer capability is ready only when:

```text
Digital Estate
      +
IAM
      +
Context
      +
Required canonical contracts
      +
Required authoritative engine
      +
Required provider
      +
Infrastructure
      +
Observability
      +
Operational support
      =
PRODUCTION READY
```

---

# 51. One Failed Mandatory Dependency Blocks the Capability

For example:

```text
Customer UI ready
+
TMS unavailable
=
TRANSPORT BOOKING NOT READY
```

---

# 52. No Averaging Readiness

This SHALL be prohibited:

```text
8 of 10 systems ready
    =
80% production ready
```

A mandatory dependency is binary for the capability it supports.

---

# 53. Conditional Readiness

`CONDITIONALLY_READY` MAY be used only when the unresolved condition:

```text
does not violate a critical invariant

has an explicit owner

has an expiry

has a compensating control

is visible to operations

is approved
```

---

# 54. Conditions That Cannot Be Waived

The following SHALL block production:

```text
cross-tenant data leakage

authentication bypass

privilege escalation

known financial corruption

uncontrolled data loss

broken canonical identity isolation

silent regulatory pass on unknown

unrecoverable state

known secrets exposure

unbounded duplicate financial mutation
```

---

# 55. Manual Operating Procedures

A capability MAY initially use a controlled human process if:

```text
the customer promise is honest

authority is clear

manual process is documented

operators are trained

audit exists

SLA is realistic

volume is manageable

security is adequate

no critical invariant is weakened
```

---

# 56. Manual ≠ Fake Automation

For example:

```text
Customs brokerage request
        │
        ▼
trained broker / operations workflow
```

may be valid.

The UI SHALL NOT present:

```text
Automated Customs Clearance
```

if the process is actually manual.

---

# 57. Manual Fallback State

Where relevant, UI/operations SHOULD distinguish:

```text
AUTOMATED

MANUAL

MANUAL_FALLBACK

DEGRADED

UNAVAILABLE
```

---

# 58. Feature Flags

Feature flags MAY control staged exposure.

Examples:

```text
customer_portal

partner_portal

public_tracking

warehouse_visibility

trade_docs

customs_workflow

project_logistics

four_pl
```

---

# 59. Feature Flag ≠ Security Control

This SHALL remain:

```text
feature hidden
    !=
feature authorised
```

Backend authorisation remains mandatory.

---

# 60. Feature Flag ≠ Capability Readiness

A feature flag can expose or suppress a feature.

It SHALL NOT certify that the underlying capability is production-ready.

---

# 61. Dark Deployment

New capabilities MAY be deployed:

```text
code present
+
traffic disabled
```

for production validation before exposure.

---

# 62. Shadow Evaluation

Where safe, new integrations MAY consume production-like facts without affecting authoritative state.

Example:

```text
new ETA projection

new provider-selection recommendation
```

may run in shadow mode before operational use.

---

# 63. Shadow Mode Must Not Mutate Production

A shadow consumer SHALL NOT:

```text
create bookings

post invoices

submit Customs declarations

send customer communications
```

unless specifically authorised.

---

# 64. Legacy Data Classification

Before migration, every legacy data set SHALL be classified as:

```text
PRODUCTION_REQUIRED

LEGAL_RETENTION

BUSINESS_REQUIRED

MIGRATE

ARCHIVE

DISCARDABLE_TEST_DATA

UNKNOWN
```

---

# 65. Never Assume Legacy Data Is Disposable

This SHALL be prohibited:

```text
old B2C model is obsolete
therefore
delete database
```

Environment and data provenance SHALL be established first.

---

# 66. Pre-Production Reset

If evidence confirms an environment contains only:

```text
test

seed

synthetic

non-production
```

data, a controlled reset MAY be preferable to unnecessary migration.

The reset decision SHALL be documented.

---

# 67. Production Data Requires Migration Plan

Any real customer/provider/transactional data SHALL require:

```text
source inventory

mapping

transformation

validation

reconciliation

retention

rollback/archive policy
```

---

# 68. Legacy Product Data

Retail catalogue/product data SHALL NOT automatically migrate into:

```text
TMS CargoItem

Thamani logistics service
```

because:

```text
Product
    != CargoItem
    != Logistics Service
```

---

# 69. Legacy Cart Data

A cart is a commerce aggregate.

It SHALL NOT be transformed into:

```text
logistics ServiceOrder
```

without genuine business equivalence.

Most obsolete/pre-production cart data should be archived or discarded according to data classification rather than semantically fabricated.

---

# 70. Legacy Order Data

Any genuine historical orders SHALL retain their commerce identity.

They SHALL not be rewritten as LogisticsShipments merely to fit the new architecture.

---

# 71. Historical Commerce Remains Historical Commerce

Where required:

```text
Legacy Commerce Order
        │
        ▼
Historical Record / Archive
```

is preferable to:

```text
pretend LogisticsShipment
```

---

# 72. Legacy Supplier Data

Genuine supplier/provider applications SHALL be assessed for mapping to:

```text
Canonical Organisation

Thamani counterparty relationship

provider profile

capability claims

qualification evidence
```

---

# 73. No Automatic Approval Migration

This SHALL be prohibited:

```text
legacy supplier status = APPROVED
    ↓
new logistics provider fully qualified
```

The qualification scope has changed materially.

Reassessment MAY be required.

---

# 74. Contact Migration

Legacy contact records SHALL be:

```text
deduplicated

canonicalised where possible

scoped

verified where required

mapped to organisation relationships
```

rather than blindly copied.

---

# 75. Authentication Migration

Legacy identity/account data SHALL follow IAM migration architecture.

Thamani SHALL not create its own password-migration path outside IAM.

---

# 76. Credentials

Thamani migration SHALL never export/reimport plaintext passwords.

Identity credential migration belongs to IAM.

---

# 77. Content Migration

Useful:

```text
corporate content

service information

FAQs

articles
```

MAY migrate to CMS.

Obsolete:

```text
retail merchandising

consumer product campaigns
```

SHALL be individually assessed.

---

# 78. URL Migration

Retired public URLs SHOULD use:

```text
301/308 redirect
```

where a valid semantic replacement exists.

Otherwise:

```text
410 Gone
```

or a suitable controlled response MAY be more truthful.

---

# 79. Do Not Redirect Everything to Homepage

This is discouraged:

```text
/products/coffee
    → /
```

if there is no semantically equivalent page.

Search engines and users should receive meaningful migrations.

---

# 80. SEO Migration

The public transition SHALL address:

```text
canonical URLs

redirect map

sitemap

robots rules

metadata

structured content

broken links

search-console equivalent monitoring
```

as part of go-live.

---

# 81. Migration Ledger

A migration ledger SHALL record every material migration unit.

Conceptually:

```text
MigrationItem
├── source_type
├── source_id
├── source_system
├── target_type?
├── target_id?
├── disposition
├── mapping_version
├── migrated_at?
├── validation_status
├── reconciliation_status
├── exception?
└── evidence
```

---

# 82. Migration Disposition

Allowed dispositions SHOULD include:

```text
MIGRATED

ARCHIVED

SUPERSEDED

NOT_APPLICABLE

DISCARDED_TEST_DATA

MANUAL_REVIEW
```

---

# 83. Idempotent Migration

Migration tooling SHOULD be safely repeatable.

A rerun SHALL not create:

```text
duplicate organisation

duplicate provider

duplicate invoice

duplicate document

duplicate shipment
```

---

# 84. Migration Mapping

Canonical mappings SHALL use approved Control Plane/Shared mapping semantics.

Migration SHALL not introduce hidden ad hoc lookup tables as permanent architecture.

---

# 85. Data Reconciliation

For each migrated data class:

```text
source count

target count

mapped count

rejected count

unresolved count
```

SHOULD be measurable where meaningful.

---

# 86. Count Equality Is Not Enough

This remains:

```text
100 rows source
100 rows target
    !=
correct migration
```

Semantic validation is required.

---

# 87. Migration Evidence

Production migration SHOULD produce:

```text
migration report

reconciliation report

exceptions

approvals

timestamps

source revision

target release
```

---

# 88. Compatibility Seams

Temporary compatibility adapters MAY support transition.

Examples:

```text
legacy reference → canonical reference

old route → new route

legacy event → canonical consumer mapping
```

---

# 89. Compatibility Is Time-Bounded

Every compatibility seam SHALL have:

```text
owner

purpose

consumers

introduced_at

removal condition

target removal date/version
```

---

# 90. Compatibility Layer Must Not Become Architecture

This SHALL be prohibited:

```text
temporary adapter
still running five years later
because nobody knows who uses it
```

---

# 91. Canonical Event Migration

New Thamani functionality SHALL consume canonical Shared events.

It SHALL NOT recreate retired Digital Estate-specific:

```text
thamani-*
```

event types.

---

# 92. Consumer-First Event Migration

Where event contracts change:

```text
consumer accepts new contract
        ↓
producer switches
        ↓
compatibility removed later
```

SHALL be preferred.

---

# 93. Historical Events Are Immutable

Already published historical events SHALL not be rewritten merely because the taxonomy changed.

---

# 94. API Migration

Breaking API migrations SHOULD follow:

```text
publish new version

support transition

migrate consumer

observe

remove old version
```

rather than simultaneous uncontrolled cutover.

---

# 95. Database Migration Principle

Production schema migrations SHALL be:

```text
forward

versioned

reviewed

tested
```

Previously applied migrations SHALL not normally be edited in place.

---

# 96. Expand / Migrate / Contract

For risky database changes, prefer:

```text
EXPAND
    introduce compatible structure

MIGRATE
    move/read new representation

CONTRACT
    remove old structure later
```

---

# 97. Deployment Architecture

Thamani SHALL remain an independently deployable Digital Estate.

Its repository SHALL produce a production image.

Infrastructure SHALL own:

```text
runtime deployment

DNS

TLS

networking

secrets injection

scaling

observability infrastructure

rollback mechanisms
```

---

# 98. No Cloud Credentials in Repository

This existing principle remains valid.

Thamani SHALL contain no production:

```text
cloud credentials

Kubernetes secrets

database passwords

provider credentials
```

in source.

---

# 99. Immutable Artifact Principle

A production release SHALL deploy a specific immutable artifact.

This SHALL be traceable to:

```text
source commit

build workflow

dependencies

container digest
```

---

# 100. Software Supply-Chain Provenance

SLSA 1.2 defines increasing Build Track assurances and recommends verifiable build provenance describing how an artifact was produced.

Thamani SHOULD adopt organisation-wide software supply-chain provenance requirements rather than merely tag images by human-readable version.

---

# 101. Production Artifact

A release SHOULD identify:

```text
Git commit SHA

container digest

build provenance

SBOM

dependency lock

Shared contract pins

build timestamp

approved release record
```

---

# 102. Tags Are Not Sufficient Identity

This remains:

```text
thamani:latest
```

insufficient as production release evidence.

Deployment SHOULD resolve to immutable digest.

---

# 103. Action Pinning

GitHub Actions and reusable workflows SHALL follow organisation policy for immutable references.

Mutable:

```text
@main
```

SHALL not be used for production-critical reusable workflows.

---

# 104. Current CI Migration

Current Thamani CI still references:

```text
ghcr.io/nabhold/baobab-dev:1.4.2-frontend
```

and current reusable workflows still reference:

```text
nabhold/shared
```

These SHALL be corrected to current `baobab-platform` sources and currently approved immutable pins.

---

# 105. Foundation Workflow

Foundation SHALL remain a mandatory repository gate after its configuration is reconciled with the current organisation and `.baobab` metadata.

---

# 106. CI Minimum Gate

Every production candidate SHALL pass:

```text
format

lint

typecheck

unit tests

integration tests

build

contract validation

Foundation

security scanning
```

plus capability-specific checks.

---

# 107. E2E Is Mandatory for Critical Journeys

The current generic CI does not make critical business flows proven merely because unit tests/build succeed.

Critical production journeys SHALL have E2E coverage.

---

# 108. Required Initial Journey Tests

Examples include:

```text
Public quote request

Public tracking where enabled

Customer authentication

Organisation-context selection

Customer shipment visibility

Partner authentication

Partner qualification flow

Operations exception handling

authorised document access
```

for capabilities included in the release.

---

# 109. Capability-Specific E2E

When later activated:

```text
TMS booking

warehouse flow

Customs documents

4PL provider selection

claim submission

notification escalation
```

SHALL each require end-to-end evidence.

---

# 110. Security Development Baseline

NIST's final SSDF 1.1 remains the current final Secure Software Development Framework, while SSDF 1.2 exists as a 2025 draft revision.

Baobab SHOULD use recognised secure-development practices as a supporting baseline without claiming conformance merely from tool adoption.

---

# 111. Security Gate

Production release SHALL verify at minimum:

```text
dependency vulnerabilities

source-code analysis

secret scanning

container vulnerabilities

IAM/session boundary

object-level authorisation

CSRF

XSS mitigations

CSP

security headers

privileged operations

cross-tenant access

cross-organisation access

sensitive logs
```

as applicable.

---

# 112. Security Critical Findings

Known exploitable critical vulnerabilities in exposed production paths SHALL block release unless formally risk-accepted under security governance.

---

# 113. No Exception for Isolation Breach

Cross-customer or cross-tenant information exposure SHALL always block production.

---

# 114. Authorisation Proof

Tests SHALL demonstrate:

```text
Customer A
cannot access
Customer B resource

Provider A
cannot access
Provider B commercial data

Customer
cannot access
Thamani internal margin

ordinary staff
cannot access
executive/privileged operation
```

---

# 115. Performance Gate

THA-0014's web-performance requirements remain applicable.

Core customer/public journeys SHOULD demonstrate acceptable real-user performance rather than merely synthetic build success.

---

# 116. Load Testing

Operational APIs SHALL be load-tested against expected volume before go-live.

Final SLOs SHALL be informed by representative measurements.

---

# 117. Capacity Planning

Readiness SHALL consider:

```text
concurrent users

shipment volume

tracking events

document volume

provider integrations

warehouse events

notification volume

event throughput

database connections

storage growth
```

according to enabled capabilities.

---

# 118. SLOs Before Go-Live

Each critical production service SHALL have defined:

```text
SLI

SLO

measurement window

alert threshold

owner

error-budget or reliability policy
```

where appropriate.

---

# 119. Do Not Invent SLOs Without Evidence

This SHALL be avoided:

```text
99.99%
because it sounds production-grade
```

Measure baseline capacity and business needs first.

---

# 120. Availability Is End-to-End

A green Next.js health endpoint SHALL not imply:

```text
customer tracking works
```

if TMS or Control Plane is unavailable.

---

# 121. Readiness Probe vs Liveness Probe

Operational deployment SHOULD distinguish:

```text
LIVENESS
    process is functioning

READINESS
    instance can serve intended traffic
```

as applicable.

---

# 122. Business Capability Health

In addition to technical health, Thamani SHOULD understand:

```text
Can customer tracking currently resolve?

Can booking currently resolve?

Can documents currently be retrieved?

Can authentication currently succeed?
```

---

# 123. Dependency Health

The control tower/operations UI SHOULD expose downstream degradation without exposing raw engine topology to customers unnecessarily.

---

# 124. Observability

Production Thamani SHALL include:

```text
structured logs

metrics

distributed traces

business correlation IDs

audit

alerting

frontend telemetry
```

according to platform standards.

---

# 125. OpenTelemetry Alignment

OpenTelemetry semantic conventions provide common naming for traces, metrics, logs and resources.

Baobab SHOULD use consistent platform observability conventions rather than each repository inventing unrelated telemetry naming.

---

# 126. Trace Path

A customer operation SHOULD be traceable conceptually as:

```text
Browser
  ↓
Thamani
  ↓
BFF
  ↓
IAM / Control Plane
  ↓
Authoritative Engine
  ↓
External Provider
```

where applicable.

---

# 127. Trace ≠ Audit

This remains:

```text
Trace
    operational request path

Audit
    consequential business/security change history
```

Both may be required.

---

# 128. Correlation

Cross-engine flows SHOULD propagate:

```text
trace context

correlation ID

causation information

canonical entity refs
```

without creating one universal transaction ID.

---

# 129. Business Monitoring

Operations SHALL have dashboards for included production capabilities.

Examples:

```text
quote requests

booking failures

tracking latency

provider failures

document errors

auth failures

customer-facing errors

notification backlog
```

---

# 130. Alert Ownership

Every production alert SHALL have:

```text
owner

severity

runbook

escalation path
```

---

# 131. Alert Without Owner Is Not Operational Readiness

This SHALL be rejected:

```text
alert exists
but
nobody knows who responds
```

---

# 132. Runbooks

Production-critical failure modes SHALL have operational runbooks.

At minimum:

```text
Thamani unavailable

IAM unavailable

Control Plane unavailable

TMS unavailable

Trade Docs unavailable

ERP unavailable

provider integration unavailable

message/event backlog

bad deployment

data migration failure

security incident
```

where those dependencies are active.

---

# 133. Support Model

Before customer go-live define:

```text
support hours

severity levels

incident escalation

customer communication

engineering escalation

security escalation

provider escalation
```

---

# 134. Operational Ownership

Every live capability SHALL have:

```text
business owner

engineering owner

operations owner

security contact

dependency owner
```

---

# 135. Backup

Any Thamani-owned durable production data SHALL be covered by:

```text
backup policy

retention

encryption

restore process

restore testing
```

---

# 136. Backup Existence ≠ Recoverability

This remains:

```text
backup job green
    !=
restore proven
```

---

# 137. Restore Tests

Production readiness SHALL require periodic restore tests for state Thamani owns.

Dependencies SHALL satisfy their respective DR architecture.

---

# 138. RPO and RTO

Critical data/services SHOULD have approved:

```text
RPO

RTO
```

derived from business impact.

They SHALL not be copied blindly from other engines.

---

# 139. Disaster Recovery

A DR plan SHALL define:

```text
trigger

decision authority

recovery environment

data restoration

DNS/traffic recovery

dependency recovery order

customer communication

return to normal
```

---

# 140. Dependency Recovery Order

A plausible recovery dependency order may be:

```text
Infrastructure
      ↓
IAM / CP
      ↓
Authoritative Engines
      ↓
Thamani BFF
      ↓
Thamani UI
```

but actual runbooks SHALL reflect deployed topology.

---

# 141. Business Continuity

If some engines are unavailable but business can continue safely using manual processes, the approved continuity procedure SHALL state:

```text
what remains available

what becomes manual

what is blocked

how transactions are reconciled later
```

---

# 142. Fail Closed

Functions involving:

```text
security

regulatory release

financial integrity

dangerous goods

critical identity resolution
```

SHALL fail closed where required.

---

# 143. Fail Open Is Explicit

No capability SHALL fail open merely because:

```text
customer experience looks better
```

Fail-open behaviour requires explicit architectural justification.

---

# 144. Release Candidate

A production candidate SHALL identify a fixed set of:

```text
code

contracts

configuration

infrastructure

dependencies

database migrations
```

---

# 145. No Moving Dependency During Sign-Off

Once final production acceptance begins, arbitrary dependency upgrades SHALL not occur without restarting relevant verification.

---

# 146. Release Dossier

Every major Thamani production activation SHOULD have a Release Dossier containing:

```text
release identifier

commit

container digest

SBOM

provenance

contract pins

migration plan

migration results

security results

test results

performance results

dependency-readiness matrix

rollback plan

runbooks

approvals

known exceptions
```

---

# 147. Readiness Evidence Matrix

Conceptually:

| Requirement              | Evidence               | Owner        | Status  |
| ------------------------ | ---------------------- | ------------ | ------- |
| Architecture conformance | ADR matrix             | Architecture | PASS    |
| CI                       | workflow run           | Engineering  | PASS    |
| Security                 | security report        | Security     | PASS    |
| Auth                     | E2E tests              | IAM/Thamani  | PASS    |
| CP context               | readiness evidence     | CP           | PASS    |
| TMS                      | provider certification | TMS          | BLOCKED |
| Backup                   | restore report         | Operations   | PASS    |
| Rollback                 | rehearsal              | Operations   | PASS    |

---

# 148. Unknown Is Not Pass

This SHALL be non-negotiable:

```text
status = UNKNOWN
```

does not qualify as:

```text
PASS
```

---

# 149. Gate Authority

Individual teams MAY certify their domain.

No team SHALL certify another engine merely because integration tests happened to pass.

---

# 150. Final Go-Live Authority

Final activation SHALL combine:

```text
business approval

architecture approval

engineering approval

operations approval

security approval

dependency readiness
```

for the release scope.

---

# 151. Go-Live Profiles

Thamani SHOULD use staged go-live profiles rather than one enormous launch.

---

# 152. Profile A — Public Logistics Estate

Potential scope:

```text
Homepage

Services

Solutions

Industries

Network

Insights

About

Contact

Quote intake
```

Dependencies primarily:

```text
Thamani

CMS where used

communication intake

infrastructure
```

This MAY be the first production profile.

---

# 153. Profile B — Identity and Customer Foundation

Adds:

```text
sign in

organisation context

customer profile

portal shell

Action Centre foundation
```

Requires production IAM + Control Plane.

---

# 154. Profile C — Core Transport Visibility

Adds:

```text
LogisticsShipment

tracking

Consignment

milestones

delivery
```

Requires production TMS capability and provider integration.

---

# 155. Profile D — Partner Operations

Adds:

```text
partner organisation

qualification

assignments

provider execution interactions
```

Requires THA-0004 implementation, IAM organisation context and authoritative execution contracts.

---

# 156. Profile E — Warehousing / 3PL

Adds:

```text
warehouse inventory

receipts

dispatches

custody

warehouse documents
```

Requires certified warehouse/ERP/TMS boundaries.

---

# 157. Profile F — Documents / Customs

Adds:

```text
TradeDocument

document versions

CustomsCase

declarations

authority workflow
```

Requires production Trade Docs and required regulatory/customs integrations.

---

# 158. Profile G — Special Cargo

Adds:

```text
cold chain

DG readiness

telemetry

special handling
```

Requires relevant TMS, warehouse, Regulations and Trade Docs readiness.

---

# 159. Profile H — Project Logistics

Adds:

```text
projects

engineering readiness

permit coordination

heavy-haul movement

project control
```

with required provider/engineering/authority integrations.

---

# 160. Profile I — 4PL Control Tower

Adds:

```text
multi-provider orchestration

provider selection

network exceptions

SLA

control tower
```

only after the underlying authoritative execution capabilities are sufficiently mature.

---

# 161. Profile J — Claims / Communications

Adds mature:

```text
claims

insurance coordination

recourse

service recovery

notification escalation
```

as those domains reach production readiness.

---

# 162. Profiles Are Composable

The sequence MAY vary.

What SHALL NOT vary is:

> **A profile cannot be activated before its mandatory dependency gates pass.**

---

# 163. UAT

Every private operational profile SHALL pass UAT with realistic personas.

Examples:

```text
customer operator

customer approver

provider dispatcher

Thamani operations

claims specialist

executive
```

according to scope.

---

# 164. UAT Data

UAT SHOULD use:

```text
realistic synthetic

masked

or explicitly approved non-production
```

data.

Production personal/commercial data SHALL not be copied casually into test environments.

---

# 165. UAT Is Not Production Certification Alone

User acceptance proves usability/business fit.

It does not replace:

```text
security

performance

isolation

DR

migration

operational readiness
```

---

# 166. Cutover Strategy

Production transition SHALL use an explicit cutover plan.

The preferred sequence is:

```text
PREPARE
   ↓
FREEZE
   ↓
SNAPSHOT
   ↓
MIGRATE
   ↓
VERIFY
   ↓
DEPLOY DARK
   ↓
SMOKE TEST
   ↓
ENABLE LIMITED TRAFFIC
   ↓
OBSERVE
   ↓
EXPAND
   ↓
RETIRE LEGACY
```

---

# 167. Prepare

Before cutover:

```text
release frozen

dependencies pinned

runbooks ready

support staffed

migration rehearsed

rollback rehearsed

alerts active

communications prepared
```

---

# 168. Freeze

Where mutable legacy data exists, define a controlled migration freeze.

Freeze scope may be:

```text
full write freeze

specific feature freeze

read-only window

delta-capture window
```

---

# 169. Snapshot

Create required:

```text
database backups

content snapshot

migration ledger baseline

configuration snapshot
```

before irreversible steps.

---

# 170. Migrate

Execute only the approved migration version.

Ad hoc manual production edits SHOULD be minimised and audited.

---

# 171. Verify

Immediately verify:

```text
counts

key identities

authorisation

critical records

canonical mappings

health

business invariants
```

---

# 172. Deploy Dark

The release MAY be deployed with customer traffic disabled.

Perform production-environment:

```text
health

readiness

dependency

configuration

secret

migration
```

verification.

---

# 173. Smoke Test

Smoke tests SHALL cover actual deployment topology.

Examples:

```text
public page

authentication

CP context

authorised private page

one canonical dependency
```

according to profile.

---

# 174. Limited Traffic

Where architecture supports it, begin with:

```text
internal users

pilot customer

small traffic percentage

specific market

specific capability
```

before full activation.

---

# 175. Observe

Establish a controlled observation window with:

```text
metrics

errors

latency

security alerts

business failures

dependency health

support contacts
```

---

# 176. Expand

Expand only when predefined acceptance conditions remain satisfied.

---

# 177. Legacy Retirement

Legacy functionality SHALL be retired only after:

```text
new path proven

required data migrated

redirects active

consumers migrated

rollback window considered

retention satisfied
```

---

# 178. Rollback

Every production cutover SHALL define rollback before execution.

---

# 179. Rollback Is More Than Redeploy Old Image

Rollback may require:

```text
application rollback

database compatibility

routing reversal

feature flag reversal

event compatibility

data reconciliation
```

---

# 180. Database Rollback

Destructive down-migrations SHOULD NOT be assumed safe.

Prefer forward-compatible migration patterns that allow:

```text
application rollback
```

without:

```text
destructive database reversal
```

where practical.

---

# 181. Rollback Threshold

Rollback triggers SHOULD be defined before launch.

Examples:

```text
authentication failure above threshold

cross-tenant security issue

critical data corruption

unrecoverable transaction failure

systemic 5xx

migration reconciliation failure

critical dependency incompatibility
```

---

# 182. Security Incident Overrides Normal Rollout

A suspected:

```text
tenant breach

credential compromise

privilege escalation
```

SHALL trigger security containment procedures, not merely routine rollback logic.

---

# 183. Roll-Forward

Some failures are safer to resolve through:

```text
roll-forward patch
```

rather than reverting data/schema.

The incident commander/technical owner SHALL choose according to runbook and state.

---

# 184. Cutover Decision Log

Material cutover decisions SHALL be timestamped and attributable.

---

# 185. Hypercare

After a major go-live, Thamani SHOULD enter a defined hypercare period.

Focus:

```text
support response

error monitoring

customer issues

data reconciliation

provider failures

performance

security

migration defects
```

---

# 186. Hypercare Is Not Permanent Architecture

After stability criteria are met, normal production operations SHALL resume.

---

# 187. Go-Live Communications

Affected:

```text
staff

customers

partners

support

executives
```

SHOULD receive appropriate communications under THA-0016.

---

# 188. Status Page

Thamani/Baobab SHOULD have an appropriate customer-facing service-status mechanism as production maturity grows.

Internal engine topology need not be disclosed.

---

# 189. Incident Communication

Outage messages SHOULD communicate:

```text
customer impact

affected capability

known workaround

next update
```

rather than expose internal debugging speculation.

---

# 190. Decommissioning Legacy Commerce

Legacy B2C functionality SHALL be decommissioned intentionally.

This includes review/removal of:

```text
Medusa browser SDK

product catalogue adapter

cart

checkout

retail search

retail product pages

retail environment variables

retail fixtures

retail tests

retail copy

legacy commerce-specific CI assumptions
```

unless an explicitly retained capability still requires them.

---

# 191. Medusa May Still Exist Elsewhere

Removing Medusa from Thamani does NOT imply:

```text
Baobab Trade is removed
```

or:

```text
Medusa is invalid platform-wide
```

It only means:

> **Thamani logistics SHALL consume Baobab capabilities it actually requires rather than retaining a commerce provider because of historical storefront architecture.**

---

# 192. `baobab-trade` Remains Optional for Thamani

If a future Thamani workflow genuinely needs a Trade capability, it MAY consume that capability through Control Plane/provider-neutral architecture.

It SHALL not be the universal Thamani backend.

---

# 193. Documentation Migration

Thamani documentation SHALL be reconciled.

At minimum:

```text
README

architecture docs

development docs

environment docs

deployment docs

security docs

testing docs

ADR index

route documentation
```

SHALL reflect the logistics estate.

---

# 194. README Must Describe Current Reality

The production README SHALL no longer claim:

```text
Thamani is consumer-first B2C
```

after the migration.

---

# 195. Architecture Index

The ADR index SHOULD show:

```text
legacy

superseded

accepted

historical
```

status clearly.

---

# 196. Configuration Migration

Environment variables SHALL move from vendor/business-model-specific configuration toward capability/application configuration.

This SHOULD be eliminated where no longer needed:

```text
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
```

---

# 197. Browser Environment Variables

Secrets SHALL never use:

```text
NEXT_PUBLIC_*
```

or equivalent public exposure.

---

# 198. Production Configuration

Configuration SHALL be:

```text
environment-specific

externally injected

validated at startup

documented

non-secret where public

secret-managed where sensitive
```

---

# 199. Startup Validation

Missing mandatory production configuration SHOULD cause explicit readiness failure rather than late customer-facing failure.

---

# 200. Deployment Readiness vs Application Readiness

The container may be alive before downstream dependencies are available.

Readiness SHALL reflect the intended traffic policy.

---

# 201. Production Data Protection

Production migration SHALL verify:

```text
encryption in transit

encryption at rest where required

secret handling

access controls

retention

backup

PII protection
```

---

# 202. Log Hygiene

Production logs SHALL not expose:

```text
OAuth tokens

session cookies

passwords

bank details

document content

sensitive cargo data

customer secrets

provider credentials
```

---

# 203. Analytics

Analytics SHALL not leak authenticated operational data to public marketing analytics providers without explicit privacy/security approval.

---

# 204. Third-Party Scripts

Public Digital Estate third-party scripts SHALL be minimised.

Private operational portals SHOULD be even more restrictive.

---

# 205. Production Domain

DNS/TLS/domain configuration remains infrastructure-owned.

Thamani repository SHALL declare its requirements, not provision cloud topology directly.

---

# 206. TLS

All production customer/partner/staff traffic SHALL use HTTPS.

---

# 207. Security Headers

Production shall apply appropriate:

```text
CSP

HSTS

frame policy

content-type protections

referrer policy

cookie protections
```

according to security architecture.

---

# 208. Accessibility Go-Live Gate

Critical journeys SHALL meet the accepted accessibility target before their production exposure.

Accessibility defects that prevent essential service use SHALL be release blockers.

---

# 209. Browser Matrix

Thamani SHALL document and test a supported browser baseline.

Unsupported browsers SHALL fail gracefully where possible.

---

# 210. Mobile Readiness

Customer tracking, authentication and high-frequency portal journeys SHALL be tested on realistic mobile viewport/device conditions.

---

# 211. Operational Desktop Readiness

Operations/control-tower interfaces SHALL be validated with:

```text
large datasets

keyboard navigation

multiple filters

long-running sessions

realistic data density
```

---

# 212. Customer Pilot

Before broad operational rollout, Thamani SHOULD use one or a small number of controlled pilot customers where feasible.

---

# 213. Pilot ≠ Production Exemption

Pilot users still require:

```text
security

data protection

audit

operational support
```

---

# 214. Pilot Success Criteria

Define before start:

```text
transaction completion

support volume

error rate

latency

operator intervention

customer satisfaction

data integrity

dependency stability
```

---

# 215. Market Pilot

Initial South African operation SHOULD be separated conceptually from future Uganda rollout.

Successful ZA operation SHALL not automatically certify Uganda:

```text
tax

regulatory

market

provider

currency

jurisdiction
```

requirements.

---

# 216. Production Change Governance

After go-live, production change SHALL follow:

```text
PR

review

CI

security

artifact build

approved release

progressive deployment

monitoring
```

rather than direct server mutation.

---

# 217. Emergency Change

Emergency production changes SHALL remain:

```text
authorised

audited

time-bounded

retrospectively reviewed
```

---

# 218. Configuration Drift

Production runtime configuration SHALL be reconciled against desired state.

Undocumented drift SHALL be treated as an operational defect.

---

# 219. Database Drift

Manual schema changes outside governed migrations SHALL be prohibited.

---

# 220. Dependency Drift

Production SHALL not silently consume unpinned changing:

```text
container tags

shared contracts

reusable workflows

critical packages
```

where immutable resolution is required.

---

# 221. Release Provenance

SLSA's current 1.2 Build specification treats provenance as verifiable information linking an artifact to how and from what inputs it was built.

Baobab release pipelines SHOULD retain enough evidence to verify that a deployed Thamani image corresponds to the approved source and build process.

---

# 222. Production Readiness Matrix

A final readiness matrix SHOULD cover at least:

```text
01 Architecture
02 Repository hygiene
03 Shared contracts
04 Control Plane context
05 IAM
06 Digital Estate
07 TMS
08 Trade Docs
09 ERP
10 Regulations
11 CMS
12 Pulse
13 Data migration
14 Security
15 Tenancy/isolation
16 Functional testing
17 E2E
18 Accessibility
19 Performance
20 Capacity
21 Observability
22 Alerting
23 Runbooks
24 Backup
25 Restore
26 DR
27 Supply-chain security
28 Release governance
29 Support
30 Customer/partner readiness
31 Rollback
32 Compliance/privacy
```

---

# 223. Readiness Evidence Status

Each gate SHALL be:

```text
PASS

FAIL

BLOCKED

NOT_APPLICABLE

CONDITIONALLY_ACCEPTED
```

with evidence.

---

# 224. No “Mostly Pass”

Critical gates SHALL not use vague statuses such as:

```text
mostly done
```

---

# 225. Conditional Acceptance

Every conditional acceptance SHALL record:

```text
risk

owner

compensating control

expiry

required remediation

approver
```

---

# 226. Expired Exception

An expired production exception SHALL become a blocking operational finding until renewed or fixed.

---

# 227. Architecture Exception

Implementation conflicting with an accepted ADR SHALL require:

```text
ADR amendment

supersession

or
explicit time-bounded architecture exception
```

not silent divergence.

---

# 228. Go-Live Checklist

No production profile SHALL activate until its checklist confirms:

```text
scope fixed

dependencies ready

contracts pinned

IAM ready

context provisioned

migrations completed

security passed

E2E passed

performance acceptable

observability active

alerts tested

backup tested

rollback tested

runbooks approved

support ready

business owner approved
```

---

# 229. Production Acceptance Invariants

The following SHALL always block go-live:

```text
unknown canonical tenant/legal-entity context

broken provider resolution

uncontrolled identity mapping

cross-tenant leakage

unprotected private API

unverified critical migration

unrecoverable database

known financial integrity defect

known regulatory false-positive release

unknown production artifact

critical secrets exposure
```

---

# 230. Target Migration Architecture

```text
                 LEGACY THAMANI
            B2C / MEDUSA STOREFRONT
                       │
                       ▼
             LEGACY INVENTORY AUDIT
                       │
          ┌────────────┼─────────────┐
          ▼            ▼             ▼
        KEEP        MIGRATE        RETIRE
          │            │             │
          └────────────┼─────────────┘
                       ▼
                CANONICALISE
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
      ORG / IAM     CONTENT      BUSINESS DATA
          │            │            │
          ▼            ▼            ▼
         CP            CMS      Owning Domains
          │                         │
          └────────────┬────────────┘
                       ▼
                THAMANI DIGITAL ESTATE
                       │
      ┌────────────────┼─────────────────┐
      ▼                ▼                 ▼
    PUBLIC          CUSTOMER          PARTNER
      │                │                 │
      └────────────────┼─────────────────┘
                       ▼
                   OPERATIONS
                       │
                       ▼
                  APP / BFF
                       │
           capability contracts
                       │
      ┌────────┬───────┼────────┬──────────┐
      ▼        ▼       ▼        ▼          ▼
     TMS     TDOC      ERP     REG       CMS/PULSE
      │        │        │        │          │
      └────────┴────────┼────────┴──────────┘
                        ▼
                  CONTROL PLANE
             resolution / readiness
```

---

# 231. Go-Live Transition

```text
ARCHITECTURE ACCEPTED
        │
        ▼
LEGACY CLASSIFICATION
        │
        ▼
FOUNDATION REMEDIATION
        │
        ▼
DEPENDENCY IMPLEMENTATION
        │
        ▼
CAPABILITY CERTIFICATION
        │
        ▼
INTEGRATION
        │
        ▼
UAT
        │
        ▼
PRODUCTION READINESS
        │
        ▼
CUTOVER REHEARSAL
        │
        ▼
PRODUCTION APPROVAL
        │
        ▼
LIMITED GO-LIVE
        │
        ▼
OBSERVE / HYPERCARE
        │
        ▼
EXPAND
        │
        ▼
LEGACY RETIREMENT
```

---

# 232. Implementation Programme

## THA-GL-00 — Architecture Freeze and ADR Reconciliation

Reconcile repository ADRs against THA-0003 through THA-0017.

Actions:

```text
update ADR index

mark ADR-0001 business assumptions superseded

reconcile ADR-0002

correct ADR-0006 obsolete THA-0015 forward-reference

document historical THA-0005 transfer to TMS

confirm THA-0007 treatment

confirm THA-0008 composition boundary
```

---

## THA-GL-01 — Repository Identity Remediation

Remove active operational references to:

```text
nabhold/*

.nabhold/

@nabh... legacy package namespaces
```

where migration is required.

Converge on:

```text
baobab-platform

.baobab
```

and current immutable shared/dev pins.

---

## THA-GL-02 — Runtime Baseline

Resolve:

```text
Node engine declaration
vs
CI
vs
DevContainer
vs
Docker
vs
production
```

to one approved baseline.

---

## THA-GL-03 — Foundation / CI Modernisation

Reconcile:

```text
Foundation workflow

security workflow

CI container

action pins

Dependabot

contract verification

image build
```

with current Shared standards.

---

## THA-GL-04 — Legacy Feature Inventory

Classify:

```text
routes

components

Medusa SDK usage

cart

checkout

catalogue

search

supplier workflows

tests

environment configuration
```

as:

```text
KEEP
REUSE
REWRITE
REMOVE
REDIRECT
```

---

## THA-GL-05 — Legacy Data Inventory

Determine whether any production/business data exists and classify migration disposition.

---

## THA-GL-06 — Control Plane Onboarding

Provision canonical:

```text
Thamani organisation

legal entity

tenant/platform account

Digital Estate

South Africa market participation

subscription

capability entitlements

bindings

isolation profile
```

---

## THA-GL-07 — IAM Reconciliation

Reconcile historical Thamani B2C identity configuration with:

```text
customer organisations

partners/providers

staff

executives

BFF

Ory/provider-neutral target
```

---

## THA-GL-08 — Public Estate

Build the logistics-native public estate independent of unfinished operational engines.

This MAY become the first go-live candidate.

---

## THA-GL-09 — Customer / Partner Shells

Implement authenticated shells only after IAM/CP readiness passes.

---

## THA-GL-10 — TMS Activation Programme

Complete required `ADR-TMS-*` decisions and implementation before transport execution is exposed.

Minimum required areas include:

```text
transport plan

route/movement

booking

carrier/capacity

resources

tracking

delivery

events/API

tenant isolation

security

observability

resilience

certification
```

---

## THA-GL-11 — Trade Docs Activation Programme

Complete required `ADR-TDOC-*` decisions and implementation before documents/customs workflows are exposed.

Minimum required areas include:

```text
document lifecycle

dossiers

CustomsCase

declaration

authority adapter

evidence

storage

security

tenant isolation

events

resilience

certification
```

---

## THA-GL-12 — ERP Provisioning

Provision Thamani ERP context only for approved financial/warehouse capabilities required by the initial release.

---

## THA-GL-13 — Regulations Coverage

Certify only regulatory packs/profiles required by the initial release.

Unsupported jurisdictions/processes remain manual or unavailable.

---

## THA-GL-14 — CMS / Public Content

Move governed public editorial content into the approved CMS boundary.

---

## THA-GL-15 — Integration Contracts

Pin and test every consumed production contract.

---

## THA-GL-16 — Customer Capability Slices

Implement vertical slices one capability at a time.

For each:

```text
UI
→ BFF
→ CP
→ authoritative engine
→ provider
→ event
→ projection
→ observability
```

must work.

---

## THA-GL-17 — Data Migration Rehearsal

Run migration against production-like source copies.

Produce reconciliation evidence.

---

## THA-GL-18 — Security Certification

Perform:

```text
threat review

authorisation testing

cross-tenant testing

dependency/container scanning

session/security verification

secret audit
```

for the release scope.

---

## THA-GL-19 — Performance / Capacity Certification

Measure:

```text
public web

auth

portal

API

dependency latency

event throughput

operational views
```

according to release scope.

---

## THA-GL-20 — Operational Acceptance

Approve:

```text
monitoring

alerts

runbooks

backup

restore

DR

support

escalation

status communications
```

---

## THA-GL-21 — Cutover Rehearsal

Run the full migration/deployment/rollback procedure in a representative environment.

---

## THA-GL-22 — Go-Live Review

Produce final Release Dossier and dependency-readiness matrix.

---

## THA-GL-23 — Limited Production Activation

Enable agreed:

```text
market

customers

capabilities

traffic
```

only.

---

## THA-GL-24 — Hypercare

Operate enhanced monitoring/support.

Reconcile:

```text
migration

errors

support issues

performance

dependency drift
```

daily or at appropriate cadence.

---

## THA-GL-25 — Expansion

Enable additional capabilities only through their own readiness gates.

---

## THA-GL-26 — Legacy Retirement

Remove obsolete:

```text
retail routes

commerce adapters

legacy configuration

legacy dependencies

obsolete data

compatibility seams
```

after migration evidence confirms retirement is safe.

---

# 233. Rejected Alternatives

## Alternative A — Rewrite Thamani From Scratch

**Rejected as the default.**

The existing modern frontend, CI, testing and container foundations contain reusable value.

---

## Alternative B — Keep the Retail Storefront and Add Logistics Features

**Rejected.**

The information architecture and business model are fundamentally superseded.

---

## Alternative C — Go Live When the Frontend Looks Finished

**Rejected.**

Production readiness is end-to-end capability evidence.

---

## Alternative D — Wait Until Every Future Thamani Capability Is Complete

**Rejected.**

Capability-scoped phased go-live is safer and faster.

---

## Alternative E — Expose Placeholder UI for Unfinished Engines

**Rejected.**

Evidence-before-UI remains mandatory.

---

## Alternative F — Treat Repository Existence as Engine Readiness

**Rejected.**

TMS and Trade Docs illustrate why architecture/scaffolding and production implementation are distinct.

---

## Alternative G — Keep Medusa as Universal Thamani Backend

**Rejected.**

Thamani is now logistics-first and consumes capability-specific engines.

---

## Alternative H — Migrate Every Legacy Record

**Rejected.**

Test/obsolete data may be better discarded or archived after classification.

---

## Alternative I — Delete All Legacy Data

**Rejected.**

Production/legal/business records require governed retention and migration.

---

## Alternative J — Big-Bang All Capabilities in One Release

**Rejected.**

The dependency graph is too broad and uneven in maturity.

---

## Alternative K — Use Feature Flags as Readiness Certification

**Rejected.**

Flags govern exposure, not architectural readiness.

---

## Alternative L — Roll Back by Restoring the Entire Database Automatically

**Rejected as a universal strategy.**

Database evolution often requires forward-compatible cutover patterns.

---

## Alternative M — Accept Unknown Readiness as Pass

**Rejected.**

Unknown means insufficient evidence.

---

## Alternative N — Conditional Acceptance of Tenant Isolation Failure

**Rejected absolutely.**

---

## Alternative O — Treat Backups as Proof of Recovery

**Rejected.**

Restore must be tested.

---

## Alternative P — Use Mutable Release Tags

**Rejected for authoritative release identity.**

Immutable artifact identity/provenance is required.

---

# 234. Architectural Invariants

```text
Deployment
    != Production Readiness

CI Green
    != Go-Live Approval

Repository Exists
    != Capability Ready

ADR Complete
    != Implementation Complete

Implementation Complete
    != Production Ready

Frontend Ready
    != Backend Ready

Feature Flag Enabled
    != Capability Certified

Feature Flag Disabled
    != Security Boundary

Manual Process
    != Failed Architecture automatically

Manual Process
    must be explicit and governed

Legacy Product
    != TMS CargoItem

Legacy Cart
    != Logistics Service Order

Legacy Commerce Order
    != LogisticsShipment

Legacy Supplier Approval
    != Logistics Provider Qualification automatically

Historical ADR
    must not be silently rewritten

Historical Event
    must not be silently rewritten

Compatibility Adapter
    must be temporary

Migration Count Match
    != Semantic Migration Correctness

Backup Exists
    != Restore Proven

Liveness
    != Readiness

Application Healthy
    != Business Capability Healthy

One Engine Healthy
    != End-to-End Capability Healthy

UNKNOWN
    != PASS

CONDITIONALLY_READY
    != excuse for critical security failure

Internal Group
    != unmanaged tenant

South Africa Readiness
    != Uganda Readiness

Market
    != Deployment Region

UI Route
    != Authorisation

Public Feature
    != Private Capability

Engine Failover
    != Logistics Provider Substitution

Roll Back Application
    != Automatically Roll Back Data

Artifact Tag
    != Immutable Artifact Identity

Node Runtime
    must conform across build/runtime contracts

Legacy nabhold operational references
    must not remain in active production configuration

.nabhold
    must not remain active platform metadata

Production Contract
    must identify actual current dependencies

Unsupported Regulation
    must not become COMPLIANT

Unimplemented Engine
    must not produce fake UI

Thamani
    must remain independently deployable

Engine data
    must remain authoritative in its owning engine

Go-live
    must be capability-scoped

Release readiness
    must be evidence-backed
```

---

# 235. Initial Readiness Interpretation

At the date this ADR is accepted, the architecture SHALL assume:

```text
THAMANI DIGITAL ESTATE
    reusable technical foundation exists
    business/domain migration required

CONTROL PLANE
    advanced implementation/readiness machinery exists
    Thamani-specific onboarding still requires evidence

SHARED
    advanced canonical governance exists
    Thamani contract locks require repinning/reconciliation

IAM
    advanced architecture/implementation exists
    provider migration and Thamani target UX require readiness evidence

ERP
    mature architecture/readiness programme exists
    Thamani provisioning requires explicit activation

TMS
    foundational architecture/scaffold
    NOT inferred production-ready

TRADE DOCS
    foundational architecture/scaffold
    NOT inferred production-ready

REGULATIONS
    extensive architecture exists
    production regulatory coverage must be separately demonstrated

CMS
    readiness must be assessed for public content scope

PULSE
    non-authoritative; optional for core first release
```

This is a planning baseline, not a substitute for the final readiness assessment.

---

# 236. Recommended First Production Scope

The lowest-risk initial release SHOULD favour capabilities whose authoritative dependencies are already mature.

A reasonable first profile is:

```text
PUBLIC LOGISTICS ESTATE

Services

Solutions

Industries

Network / Markets

About

Insights

Contact

Quote Request

Sign In entry point when IAM ready
```

while operational capabilities remain gated.

---

# 237. Operational Expansion

Then progressively activate:

```text
Customer Identity
        ↓
Customer Portal
        ↓
Transport Visibility
        ↓
Partner Operations
        ↓
Warehousing
        ↓
Trade Documents / Customs
        ↓
Special Cargo
        ↓
Project Logistics
        ↓
4PL
        ↓
Claims / Advanced Communications
```

based on actual dependency readiness—not merely this illustrative ordering.

---

# 238. Final Production Acceptance Model

```text
                 BUSINESS SCOPE APPROVED
                           │
                           ▼
                 ARCHITECTURE CONFORMANT
                           │
                           ▼
                    CONTRACTS PINNED
                           │
                           ▼
               DEPENDENCIES CERTIFIED
                           │
                           ▼
                 FUNCTIONAL TESTS PASS
                           │
                           ▼
                     E2E TESTS PASS
                           │
                           ▼
                    SECURITY PASS
                           │
                           ▼
                  MIGRATION VERIFIED
                           │
                           ▼
                PERFORMANCE ACCEPTED
                           │
                           ▼
                 OPERATIONS ACCEPTED
                           │
                           ▼
                  ROLLBACK REHEARSED
                           │
                           ▼
                 BUSINESS APPROVAL
                           │
                           ▼
                   PRODUCTION ACTIVE
```

---

# 239. Final Decision

Thamani SHALL transition from its historical B2C ecommerce implementation to its accepted integrated logistics architecture through **incremental, capability-scoped, evidence-driven production activation**.

The migration SHALL retain:

```text
Next.js / React foundation

server-first rendering

strict typing

accessibility discipline

test infrastructure

containerisation

health/readiness foundation

CI/security foundation
```

where conformant.

It SHALL retire or replace:

```text
B2C-storefront information architecture

cart

checkout

retail catalogue assumptions

obsolete Medusa-centric Thamani integration

legacy organisation references

.nabhold operational configuration

obsolete contracts.lock semantics

supplier-retail assumptions
```

where superseded.

The Control Plane SHALL determine:

```text
who Thamani is

which market it operates in

which capabilities it is entitled to

which providers serve those capabilities

whether desired and observed platform state converge
```

The authoritative engines SHALL independently certify their production capabilities.

Thamani SHALL consume only:

```text
implemented

contracted

authorised

observable

operationally supported
```

capabilities.

The defining migration principle is:

> **Preserve useful engineering foundations, but do not preserve obsolete business semantics merely because code already exists.**

The defining readiness principle is:

> **Production readiness is demonstrated evidence across architecture, security, data, dependencies, operations and recovery—not a green build or a running container.**

The defining dependency principle is:

> **A Thamani capability cannot be more production-ready than the mandatory authoritative systems on which that capability depends.**

The defining migration-data principle is:

> **Historical data shall be classified before it is migrated, archived or discarded; obsolete semantics shall never be manufactured into new canonical objects merely to obtain a one-to-one migration.**

The defining release principle is:

> **Production shall deploy a known immutable artifact, from known source, against known contract versions, with known configuration and reproducible release evidence.**

The defining cutover principle is:

> **Every material production transition shall have a rehearsed migration path, explicit acceptance conditions, observability, rollback or roll-forward strategy, and accountable decision authority.**

The defining phased-go-live principle is:

> **Thamani may launch the portions of its Digital Estate whose dependencies are proven without pretending unfinished logistics capabilities are already available.**

The defining resilience principle is:

> **Backups, failover, degraded modes and manual fallbacks count as readiness only when they have been tested and operators know how to use them.**

The defining legacy principle is:

> **The old B2C Thamani remains part of architectural history, not the hidden foundation of the new logistics enterprise.**

And the programme-closing principle is:

> **ADR-THA-0003 through ADR-THA-0017 now define Thamani as a coherent logistics enterprise and Digital Estate. Further reusable transport, document, regulatory, financial, identity or platform architecture decisions should move to the appropriate Baobab engine or Shared/Control Plane ADR programme rather than expanding Thamani into a platform monolith.**
