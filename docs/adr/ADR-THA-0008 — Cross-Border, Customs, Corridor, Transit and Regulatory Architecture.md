# ADR-THA-0008 — Cross-Border, Customs, Corridor, Transit and Regulatory Architecture

**Status:** Accepted — Foundational Thamani Architecture  
**Date:** 2026-10-03  
**Decision Owners:** Nabhold Group Africa / Thamani Global / Baobab Platform Architecture  
**Primary Repository:** `baobab-platform/thamani`  
**Legal Entity:** `THAMANI-GLOBAL`  
**Business Domain:** Cross-Border Logistics / Customs Brokerage / Freight Forwarding / 3PL / 4PL  
**Target Transport Capability Provider:** `baobab-platform/baobab-tms`  
**Target Digital Trade Document Capability Provider:** `baobab-platform/baobab-trade-docs`  
**Regulatory Decision Authority:** `baobab-platform/baobab-regulations`  
**Platform Context / Capability Authority:** `baobab-platform/baobab-cp`  
**Canonical Contract Authority:** `baobab-platform/shared`  
**Financial / Accounting Authority:** `baobab-platform/baobab-erp`  
**Commerce / Trade Authority:** `baobab-platform/baobab-trade` where explicitly applicable  
**Identity / Authentication Authority:** `baobab-platform/baobab-iam`  
**Intelligence Authority:** `baobab-platform/baobab-pulse` where applicable  
**Overall Runtime / SOR Confirmation:** ADR-THA-0015  
**Decision Class:** Cross-border logistics / corridor / customs / declarations / transit / border procedures / regulatory execution / document execution / engine composition

---

# 1. Depends On / Reconciles With

This ADR SHALL be interpreted consistently with:

- ADR-THA-0003 — Thamani Global Integrated Shipping, Transportation and Logistics Enterprise Domain Boundary
- ADR-THA-0004 — Canonical Logistics Counterparty, Carrier, Service-Provider Qualification and Partner Onboarding
- ADR-THA-0005 — Shipment, Consignment, Transport Plan, Movement and Execution Lifecycle Architecture
- ADR-THA-0006 — RFQ, Logistics Quotation, Contract, Rate and Margin Architecture
- ADR-THA-0007 — Fleet, Equipment, Capacity, Asset Ownership and Carrier Execution Architecture
- ADR-BCP-004 — Context, Market, Geography, Legal-Entity and Digital Estate Resolution Model
- ADR-BCP-011 — Market Participation, Trade Lanes and Cross-Market Trading Model
- ADR-BCP-013 — Canonical Inventory Ownership, Custody, Location and In-Transit Model
- ADR-BCP-014 — Canonical Counterparty Identity, Roles and Relationships Model
- ADR-BCP-018 — Canonical Organisation, Corporate Group, Platform Account and Tenant Relationship Model
- ADR-SHARED-007 — Canonical Capability Contracts, Composition Registry and Cross-Engine Provider Model
- ADR-SHARED-012 — Topology Identifiers and External System Registry
- ADR-SHARED-013 — External References and Canonical Mapping Administration
- ADR-SHARED-014 — Mapping Resolution in a Trusted Context
- ADR-SHARED-017 — Canonical Capability Catalogue, Provider Declaration, Engine Registry and Runtime Capability Convergence
- ADR-SHARED-018 — Canonical Event Context Registry, Event-Type Ownership and Legacy Event Migration
- ADR-REG-0001 — Baobab Regulations Mission, Authority, Regulatory Execution and System Boundary
- ADR-REG-0017 — Regulatory Context and Applicability Resolution
- ADR-REG-0018 — Regulatory Decision and Evaluation Engine
- ADR-REG-0019 — Policy Decision Point and Enforcement Point Separation
- ADR-REG-0020 — Decision Explainability, Replay and Reproducibility
- ADR-REG-0023 — Regulatory Change Detection and Impact Analysis
- ADR-REG-0026 — Baobab Platform Integration and Canonical Context Boundary
- ADR-REG-0027 — Cross-Border Trade Regulatory Profile
- ADR-0021 — Customs, Trade Compliance and Regulatory Provider Architecture
- ADR-0022 — Shipping, Logistics, Freight and Transport Provider Abstraction
- ADR-0025 — Trade Documents, Evidence, Provenance and Document Lifecycle Architecture
- ADR-0026 — Incoterms, Delivery Obligations, Risk Transfer and Title Transfer Model
- applicable ERP financial, procurement and evidence decisions.

---

# 2. Current Repository Reality — 3 October 2026

A current Baobab repository audit establishes:

```text
baobab-platform/baobab-tms
Description:
Logistics Orchestration Engine

Created:
2 October 2026

Current state:
Foundation-0 scaffold
No application runtime
No engine ADR family yet
No production capability declaration yet
```

and:

```text
baobab-platform/baobab-trade-docs
Description:
Executable Digital Trade Documents Engine

Created:
2 October 2026

Current state:
Foundation-0 scaffold
No application runtime
No engine ADR family yet
No production capability declaration yet
```

Both repositories were created from:

```text
baobab-platform/engine-template
```

and therefore currently represent architectural intent rather than implemented engine authority.

By contrast:

```text
baobab-platform/baobab-regulations
```

already contains the substantial:

```text
ADR-REG-0001 … ADR-REG-0030
```

regulatory architecture family.

Therefore this ADR SHALL distinguish:

```text
TARGET ENGINE BOUNDARY
```

from:

```text
CURRENT RUNTIME IMPLEMENTATION
```

---

# 3. Important Governance Constraint

This Thamani ADR MAY determine:

> **which platform capabilities Thamani requires and how Thamani composes them.**

It SHALL NOT unilaterally determine:

> **the complete reusable architecture of `baobab-tms` or `baobab-trade-docs`.**

Those engines require their own ADR programmes and Shared capability registration.

Therefore:

```text
THA-0008
      │
      ├── establishes Thamani requirements
      ├── establishes consumer boundaries
      ├── establishes authority separation
      └── establishes integration expectations

BUT

TMS engine ADRs
and
Trade Docs engine ADRs
      │
      ▼
define reusable engine internals
```

---

# 4. External Standards and Regulatory Basis

This architecture is informed by:

```text
WCO Data Model
WCO Transit Guidelines
WCO Single Window architecture
WTO Trade Facilitation Agreement
UN/CEFACT Cross-Border Management RDM
UN/CEFACT Multimodal Transport RDM
ASYCUDA
national customs systems
regional transit regimes
COMESA transit architecture
```

The WCO Data Model is explicitly intended as a common language for Customs and other cross-border regulatory agencies. Version 4.3.0, released in July 2026, now includes JSON tags for web implementations and broader support for digital supporting documents, while remaining technology-neutral.

UN/CEFACT's Cross-Border Management Reference Data Model is particularly relevant because it is designed to link supply-chain, multimodal transport and regulatory/customs models rather than treating those domains as one database.

This strongly supports Baobab's proposed decomposition.

---

# 5. Executive Decision

Thamani SHALL implement cross-border logistics through a composition of independent platform capabilities.

The target architecture SHALL be:

```text
                         THAMANI GLOBAL
                   Customer / Operator Experience
                                │
                                ▼
                     LOGISTICS SERVICE ORDER
                                │
             ┌──────────────────┼──────────────────┐
             │                  │                  │
             ▼                  ▼                  ▼
        BAOBAB TMS      BAOBAB TRADE DOCS   BAOBAB REGULATIONS
             │                  │                  │
             │                  │                  │
    Transport execution   Document/customs    Regulatory meaning
    Routes & movements       execution          and decisions
             │                  │                  │
             └──────────────────┼──────────────────┘
                                │
                                ▼
                    CROSS-BORDER EXECUTION
                                │
                ┌───────────────┼───────────────┐
                ▼               ▼               ▼
             ERP             Customs         External
          Financial         Authorities       Providers
           effects        / Single Windows
```

The architectural doctrine SHALL be:

> **TMS determines and records how cargo physically moves.**

> **Trade Docs prepares, executes and records documentary and Customs interactions.**

> **Regulations determines what regulatory requirements, permissions, prohibitions and conditions apply.**

> **The competent government authority determines the legally authoritative customs outcome.**

> **Thamani composes these capabilities into one customer logistics service.**

---

# 6. The Four Different Authorities

The architecture SHALL explicitly separate:

```text
LOGISTICS EXECUTION AUTHORITY
        baobab-tms

DOCUMENT / CUSTOMS WORKFLOW AUTHORITY
        baobab-trade-docs

REGULATORY DECISION AUTHORITY
        baobab-regulations

LEGAL / CUSTOMS AUTHORITY
        External competent authority
```

These SHALL never be collapsed.

---

# 7. The Customs Authority Remains Outside Baobab

This distinction is critical.

A national Customs administration may:

```text
accept declaration

reject declaration

assess duties

request documents

order examination

place cargo on hold

release cargo

acquit transit

revoke or amend a decision
```

Baobab SHALL NOT claim to perform those sovereign acts.

Therefore:

```text
baobab-trade-docs
    does NOT
"clear cargo"
```

in the sovereign sense.

It:

```text
prepares
validates
submits
receives
normalises
tracks
records
orchestrates
and evidences
```

the clearance workflow.

---

# 8. Terminology Correction — “Customs Clearance Engine”

`baobab-trade-docs` MAY colloquially be described as supporting customs clearance.

Architecturally, its stronger definition SHALL be:

> **Executable Digital Trade Documents and Customs Workflow Engine.**

Not:

> **Customs authority engine.**

This distinction prevents a serious authority error.

---

# 9. Why TMS Is a Separate Engine

ADR-THA-0005 already establishes that logistics execution involves:

```text
Shipment

Consignment

Transport Plan

Route

Movement

Leg

Call

Booking

Transport Event

Delivery
```

These concepts are useful beyond Thamani.

They may serve:

```text
Thamani

ZuriBeans

future Baobab tenants

external logistics businesses

manufacturers

distributors

4PL operators
```

Therefore transport-management capability SHALL not be implemented as Thamani-only frontend state.

---

# 10. Why Trade Docs Is a Separate Engine

Trade documents similarly span several operational domains.

They include:

```text
customs declarations

commercial invoices

packing lists

certificates of origin

permits

phytosanitary certificates

inspection certificates

bills of lading

air waybills

road consignment notes

transit documents

customs assessments

release notices

supporting evidence
```

No single:

```text
Trade
TMS
ERP
Thamani
```

engine naturally owns every one.

---

# 11. Why Regulations Remains Separate

Regulations answers questions such as:

```text
Is this commodity importable?

Which HS classification applies?

Which authority controls it?

Which permit is required?

Does a phytosanitary requirement apply?

Which rules of origin apply?

Is preferential treatment available?

Which declaration requirements apply?

Which transit regime applies?

Which supporting documents are mandatory?
```

That is different from:

```text
generate document

submit declaration

move truck

record Customs response
```

---

# 12. PDP / PEP Architecture

ADR-REG-0019 SHALL govern regulatory decision versus operational enforcement.

The pattern SHALL be:

```text
        BAOBAB REGULATIONS
              PDP
               │
               │ RegulatoryDecision
               ▼
     ┌─────────┼───────────┐
     ▼         ▼           ▼
   TMS     TRADE DOCS    THAMANI
   PEP        PEP          PEP
```

Regulations determines:

```text
required
permitted
conditional
prohibited
review required
```

The owning operational engine enforces the decision.

---

# 13. Example Regulatory Enforcement

Suppose Regulations determines:

```text
Import permit REQUIRED

Phytosanitary certificate REQUIRED

Customs declaration REQUIRED
```

Then:

```text
baobab-trade-docs
    ensures documentary requirements are satisfied
```

and:

```text
baobab-tms
    prevents prohibited physical progression
```

where applicable.

Regulations SHALL NOT directly update TMS shipment tables.

---

# 14. Capability-Centric Architecture

Thamani SHALL consume capabilities.

It SHALL NOT fundamentally request:

```text
engine = baobab-tms
engine = baobab-trade-docs
```

The platform model remains:

```text
Thamani requires
LOGISTICS CAPABILITY
        │
        ▼
Control Plane
        │
        ▼
Capability Resolution
        │
        ▼
Provider
        │
        ▼
EngineInstance
```

`baobab-tms` is the intended first-party provider implementation.

It is not the capability identity.

---

# 15. Existing Shared Namespace Position

Current Shared capability namespaces already include:

```text
logistics

customs

documents
```

This is useful.

Candidate Thamani requirements may therefore eventually resolve through capabilities such as:

```text
logistics.shipment.*
logistics.route.*
logistics.movement.*
logistics.booking.*

customs.declaration.*
customs.clearance.*
customs.transit.*

documents.trade-document.*
documents.evidence.*
documents.transport-document.*
```

Exact keys SHALL require Shared architecture review.

This ADR SHALL NOT mint them directly.

---

# 16. Regulations Namespace Gap

At the time of this decision, Shared's capability namespace registry does not yet contain a fully registered:

```text
regulations
```

capability domain.

ADR-SHARED-018 reserves `regulations` as an event context and the G-REG-NS architecture work proposes a corresponding capability namespace.

Therefore implementation SHALL require convergence before production.

---

# 17. Customs Namespace Clarification

Current Shared describes `customs` broadly.

THA-0008 refines the intended interpretation:

```text
CUSTOMS
=
customs execution/workflow facts
```

such as:

```text
declaration preparation
declaration submission
authority acknowledgement
assessment received
document request
inspection
hold
release
transit opening
transit acquittal
```

while:

```text
REGULATIONS
=
regulatory meaning
```

such as:

```text
classification
applicability
eligibility
permit requirement
origin rule
SPS requirement
prohibition
regulatory obligation
```

---

# 18. Customs Duty Distinction

The architecture SHALL distinguish at least:

```text
Expected statutory duty determination
        │
        ▼
Regulatory / calculation decision

Customs authority duty assessment
        │
        ▼
External-authority fact

Financial payable / posting
        │
        ▼
ERP
```

These may differ.

---

# 19. Shared Event Architecture

ADR-SHARED-018 already establishes an important boundary:

```text
fulfilment.*
    commerce promise

logistics.*
    physical execution

trade.shipment.*
    trade execution

customs.*
    customs execution facts

regulations.*
    regulatory decisions
```

THA-0008 SHALL preserve it.

---

# 20. Thamani Does Not Own the Engines

The relationship SHALL be:

```text
BAOBAB PLATFORM
│
├── baobab-tms
│
├── baobab-trade-docs
│
├── baobab-regulations
│
└── other engines
       │
       ▼
THAMANI
consumes capabilities
```

Not:

```text
Thamani backend
│
├── internal TMS
├── internal customs engine
└── internal regulations engine
```

---

# 21. Thamani Business Division ≠ Platform Engine

This SHALL remain:

```text
Thamani Cross-Border Logistics
    !=
baobab-tms

Thamani Customs Brokerage
    !=
baobab-trade-docs

Thamani 4PL
    !=
baobab-tms
```

One is organisational/business structure.

The other is platform capability infrastructure.

---

# 22. Customs Brokerage Division

Thamani's Customs Brokerage division MAY act as:

```text
licensed customs broker
clearing agent
declarant representative
customer agent
```

only where applicable licensing and authority permit.

ADR-THA-0004 governs provider qualification.

The engine itself cannot provide legal licensing.

---

# 23. External Broker

Where Thamani cannot legally perform a Customs role:

```text
Thamani
    │
    ▼
Trade Docs Case
    │
    ▼
Qualified External Customs Broker
    │
    ▼
Customs Authority
```

SHALL be supported.

The customer experience need not change fundamentally.

---

# 24. Cross-Border Logistics Is a Composition

A cross-border service SHALL be understood as a composition of several independent concerns.

```text
CUSTOMER SERVICE
      │
      ├── transport
      ├── customs
      ├── regulatory compliance
      ├── documentation
      ├── transit
      ├── warehousing
      ├── insurance
      ├── finance
      └── visibility
```

No one engine SHALL own the entire composition.

---

# 25. Market Is Not Jurisdiction

This distinction remains mandatory:

```text
Market
    !=
Country
    !=
Jurisdiction
    !=
Customs Territory
    !=
Trade Lane
    !=
Logistics Corridor
```

---

# 26. Market

Control Plane remains authoritative for:

```text
Market
MarketParticipation
```

These answer:

> Where is the organisation configured and entitled to conduct specified business activity?

---

# 27. Jurisdiction

Regulations SHALL own regulatory jurisdiction semantics.

Examples MAY include:

```text
national
subnational
regional
supranational
treaty-based
customs-specific
```

---

# 28. Customs Territory

A `CustomsTerritory` SHALL be independently representable.

A customs territory may not correspond exactly to one sovereign country.

Therefore this SHALL be rejected:

```text
customs_territory = country_code
```

as a universal model.

---

# 29. Trade Lane

ADR-BCP-011 remains authoritative.

Example:

```text
UG → ZA
```

describes a governed cross-market trade relationship.

It does not define physical transport routing.

---

# 30. Logistics Corridor

`baobab-tms` SHOULD own the operational concept:

```text
LogisticsCorridor
```

Conceptually:

```text
LogisticsCorridor
├── corridor_id
├── name
├── supported_modes[]
├── corridor_nodes[]
├── border_crossings[]
├── ports[]
├── inland_terminals[]
├── customs_territories[]
├── transit_jurisdictions[]
├── typical_routes[]
├── operational_constraints[]
├── effective_period
└── external_references[]
```

---

# 31. Corridor Is Not Trade Lane

Example:

```text
Trade Lane:
Uganda → South Africa
```

may be served by:

```text
Northern Corridor
Kampala → Mombasa → Durban
```

or:

```text
Central Corridor
Kampala → Dar es Salaam → Durban
```

Therefore:

```text
TradeLane
    !=
LogisticsCorridor
```

---

# 32. Corridor Is Not Route

A Corridor is reusable.

A Route is shipment/consignment-specific.

```text
Corridor
   │
   ├── Route A
   ├── Route B
   └── Route C
```

---

# 33. Route Determines Regulatory Context

A route can materially change regulatory requirements.

Example:

```text
UG
 ↓
KE
 ↓
ZA
```

versus:

```text
UG
 ↓
TZ
 ↓
ZA
```

has different transit jurisdiction context.

Therefore:

> **A route change may trigger regulatory re-evaluation.**

---

# 34. Route Replanning Regulatory Loop

The target flow SHALL be:

```text
TMS Route Plan
     │
     ▼
Transit Jurisdictions
     │
     ▼
Regulations Evaluation
     │
     ├── requirements
     ├── restrictions
     └── obligations
     │
     ▼
Trade Docs Requirements
     │
     ▼
Cross-Border Readiness
```

If TMS replans:

```text
Route v1
   │
   ▼
Route v2
```

then the regulatory decision MAY become stale.

---

# 35. Stale Regulatory Decision

A regulatory assessment SHALL retain the context digest or equivalent context identity against which it was evaluated.

Material changes such as:

```text
route
jurisdiction
cargo
classification
origin
value
quantity
counterparty
transport mode
effective date
```

MAY require reassessment.

---

# 36. No Regulatory Decision Reuse Across Different Context

This SHALL be prohibited:

```text
Assessment:
UG → KE → ZA

reused for:

UG → TZ → ZA
```

without proving equivalence.

---

# 37. Border Crossing

TMS SHOULD model:

```text
BorderCrossing
```

or equivalent operational node.

Conceptually:

```text
BorderCrossing
├── id
├── location
├── countries/customs territories
├── authorities[]
├── facility_type
├── operating_constraints?
├── supported_modes[]
└── external_references[]
```

---

# 38. Border Crossing Is Not Customs Case

This remains:

```text
Border Crossing
    =
physical location / operational node

Customs Case
    =
regulatory/documentary process
```

---

# 39. One-Stop Border Posts

The model SHALL support border facilities where agencies or neighbouring states coordinate processes.

It SHALL NOT assume every border requires entirely independent duplicate physical stops.

---

# 40. Customs Case

`baobab-trade-docs` SHOULD own a first-class:

```text
CustomsCase
```

Conceptually:

```text
CustomsCase
├── canonical_case_id
├── tenant_context
├── legal_entity
├── customs_authority
├── jurisdiction
├── customs_territory
├── customs_procedure
├── declarant
├── represented_party?
├── broker?
├── shipment_refs[]
├── consignment_refs[]
├── movement_refs[]
├── declaration_refs[]
├── document_dossier
├── regulatory_decision_refs[]
├── financial_refs[]
├── status_projection
├── authority_responses[]
└── external_references[]
```

---

# 41. Customs Case Is Not Shipment

One Shipment MAY require:

```text
Export Customs Case
+
Transit Customs Case(s)
+
Import Customs Case
```

Therefore:

```text
Shipment
    !=
CustomsCase
```

---

# 42. One Customs Case May Reference Several Cargo Objects

Where the applicable authority permits:

```text
Customs Case
      │
      ├── Consignment A
      └── Consignment B
```

SHALL be representable.

No hard-coded one-to-one assumption SHALL be made.

---

# 43. Customs Procedure

The system SHALL represent customs procedure independently from shipment status.

Possible general families include:

```text
EXPORT

IMPORT_FOR_HOME_USE

CUSTOMS_WAREHOUSING

TRANSIT

TEMPORARY_ADMISSION

INWARD_PROCESSING

RE_EXPORT

OTHER JURISDICTION-SPECIFIC PROCEDURE
```

Exact authority procedure codes SHALL be external mappings.

---

# 44. Do Not Globalise National Procedure Codes

This SHALL be prohibited:

```text
canonical_procedure = SARS_CODE_X
```

or:

```text
canonical_procedure = ASYCUDA_CODE_Y
```

National/provider codes SHALL map to stable Baobab semantics.

---

# 45. Customs Declaration

A declaration SHALL be independently represented.

Conceptually:

```text
CustomsDeclaration
├── canonical_declaration_id
├── customs_case_id
├── procedure
├── declaration_type
├── declarant
├── authority
├── goods_items[]
├── valuation_context
├── classification_refs[]
├── origin_refs[]
├── document_refs[]
├── status
├── version
├── submitted_at?
├── authority_reference?
└── external_references[]
```

---

# 46. Declaration Draft Is Not Official Declaration

This distinction SHALL be explicit:

```text
Baobab Declaration Draft
    !=
Declaration accepted by Customs
```

---

# 47. Authority Reference

After authority acceptance:

```text
CanonicalDeclarationID
      │
      ▼
ExternalReference
      │
      ▼
Customs Authority Declaration Reference
```

The authority reference SHALL not replace canonical identity.

---

# 48. Declaration Versioning

Corrections SHALL preserve versions.

This is prohibited:

```text
overwrite customs declaration fields
```

such that the submitted version cannot be reconstructed.

---

# 49. Declaration Lifecycle

A general declaration lifecycle MAY include:

```text
DRAFT
    │
    ▼
DATA_REQUIRED
    │
    ▼
VALIDATED
    │
    ▼
READY_FOR_REVIEW
    │
    ▼
READY_TO_SUBMIT
    │
    ▼
SUBMISSION_PENDING
    │
    ▼
SUBMITTED
    │
    ▼
ACKNOWLEDGED
    │
    ├── REJECTED
    ├── AMENDMENT_REQUIRED
    └── ACCEPTED
```

Customs-case status continues beyond declaration acceptance.

---

# 50. Submission Is Not Acceptance

This SHALL remain:

```text
SUBMITTED
    !=
ACCEPTED
```

A successful HTTP/EDI transmission only proves transmission.

---

# 51. Acceptance Is Not Release

Likewise:

```text
DECLARATION_ACCEPTED
    !=
GOODS_RELEASED
```

---

# 52. Release

An authority-issued release SHALL be represented as an external authoritative result.

Conceptually:

```text
CustomsAuthorityDecision
├── authority
├── case_id
├── external_reference
├── decision_type
├── scope
├── issued_at
├── effective_at?
├── conditions[]
├── source_message_ref
└── evidence_ref
```

---

# 53. Release Types Must Be Contextual

A release may mean:

```text
export release

release for transit

import release

conditional release

release for examination movement

release from warehouse
```

The system SHALL not reduce all such states to:

```text
cleared = true
```

---

# 54. “Cleared” Boolean Is Prohibited as Authority

This SHALL be rejected:

```text
shipment.customsCleared = true
```

as the canonical regulatory record.

A high-level read model MAY derive a customer-friendly status.

The underlying authority decision SHALL remain explicit.

---

# 55. Supporting Documents

A CustomsCase SHALL have a governed:

```text
DocumentDossier
```

or equivalent.

Conceptually:

```text
DocumentDossier
├── case_id
├── requirements[]
├── documents[]
├── missing_requirements[]
├── verification_states[]
├── submission_state
└── dossier_version
```

---

# 56. Required Document Set

Regulations SHOULD produce:

```text
RequiredDocumentSet
```

as part of its regulatory decision.

Trade Docs SHALL execute that requirement.

The pattern is:

```text
Regulations:
"Certificate X is required."

Trade Docs:
"Certificate X is present,
verified and included in submission."
```

---

# 57. Document Requirement Is Not Document

This SHALL remain:

```text
RequiredDocument
    !=
TradeDocument
```

A requirement describes what must exist.

A document is an artifact/record intended to satisfy it.

---

# 58. Document Is Not Evidence

ADR-0025 remains valid:

```text
Document
    !=
Evidence
```

An uploaded PDF does not prove validity.

---

# 59. Trade Docs Engine and ADR-0025

`baobab-trade-docs` SHOULD become the principal reusable capability provider for the canonical document architecture established by ADR-0025.

ADR-0025's useful semantics SHALL remain:

```text
Document identity

metadata

provenance

version

relationships

content reference

authority

evidence linkage
```

The new engine SHALL operationalise those semantics rather than replace them.

---

# 60. Document Content Authority

Trade Docs SHALL NOT claim content authority merely because it stores or indexes a document.

Examples:

```text
Commercial Invoice
    financial content authority → ERP

Customs Release
    legal authority → Customs Authority

Bill of Lading
    transport-document authority → issuing carrier / contractual carrier

Certificate of Origin
    authority → approved issuing authority

TradeDocument canonical lifecycle
    → Trade Docs
```

---

# 61. Executable Digital Trade Document

The phrase:

```text
Executable Digital Trade Document
```

SHALL mean:

> a semantically understood, versioned, provenance-preserving document object that can participate in governed workflow.

It SHALL NOT mean:

> Baobab may invent legal effect for the document.

---

# 62. Document Workflow

A document MAY participate in:

```text
draft

generation

review

signature

issuance

submission

acknowledgement

verification

acceptance

rejection

expiry

revocation

supersession
```

according to document type.

---

# 63. File Is Still Not Document

The architecture SHALL preserve:

```text
TradeDocument
      │
      ├── semantic identity
      ├── issuer
      ├── lifecycle
      ├── version
      └── provenance
              │
              ▼
          Content
              │
              ├── PDF
              ├── XML
              ├── JSON
              ├── EDI message
              └── structured credential
```

---

# 64. WCO Data Model Mapping

`baobab-trade-docs` SHOULD use the WCO Data Model as an important interoperability standard for customs adapters.

It SHALL NOT make the WCO schema its internal persistence schema.

The WCO Data Model is explicitly technology-neutral, while its 2026 version supports JSON tags and digital supporting documents, which makes a versioned adapter architecture appropriate.

---

# 65. UN/CEFACT Mapping

The Cross-Border Management RDM SHOULD inform semantic alignment between:

```text
Trade

Transport

Customs

Regulatory
```

because the model is specifically intended to bridge these cross-border information domains.

---

# 66. Standards Adapter Pattern

The target SHALL be:

```text
Baobab Canonical Model
        │
        ▼
Standards Adapter
        │
        ├── WCO DM
        ├── UN/CEFACT
        ├── national EDI
        ├── national API
        └── Single Window
```

Not:

```text
Baobab domain
=
one country's customs message format
```

---

# 67. External Customs Adapter

Conceptually:

```text
CustomsAuthorityAdapter
├── authority
├── jurisdiction
├── protocol
├── message_version
├── supported_procedures[]
├── credential_profile
├── submission_mapping
├── response_mapping
├── document_mapping
├── status_mapping
└── effective_period
```

---

# 68. Adapter Versioning

Adapters SHALL be versioned independently.

Example:

```text
SARS goods-declaration adapter
version N

URA ASYCUDA adapter
version M
```

because authority message standards can change independently of Baobab.

---

# 69. Uganda Integration

Uganda provides a useful first reference implementation.

URA describes the Uganda Electronic Single Window as the single platform through which trade and transport participants can lodge standardised information and documents to satisfy import, export and transit regulatory requirements. It is built on the ASYCUDA World platform.

URA also states that ASYCUDA World processes import/export goods transactions, permits electronic customs declarations and allows commercial documents to be attached to declarations.

Therefore the Uganda adapter SHALL treat:

```text
UESW / ASYCUDA
```

as an external authoritative customs environment.

---

# 70. South Africa Integration

South Africa uses electronic customs declaration/reporting mechanisms requiring specific EDI participation for many actors and declaration/report types. SARS documents CUSDEC customs declarations, CUSRES responses and numerous cargo-processing messages.

SARS also updated goods-declaration policy and declaration annexures in August 2026, illustrating why authority adapters must be effective-dated and independently maintained.

Therefore:

```text
SARS adapter
```

SHALL not be hard-coded into generic Trade Docs domain logic.

---

# 71. Single Window Principle

The WTO Trade Facilitation Agreement encourages Single Window systems through which traders submit import, export and transit documentation/data through one entry point, with authority results returned through that environment.

WCO similarly describes the Single Window as a system/environment enabling trade and transport parties to lodge standardised regulatory information through a single entry point.

Baobab SHALL integrate with these systems.

It SHALL NOT attempt to replace national Single Windows.

---

# 72. One-Time Data Principle

Where authoritative business data already exists in Baobab:

```text
organisation

shipment

consignment

cargo

invoice

origin

classification

route

carrier

equipment
```

Trade Docs SHOULD consume the canonical data rather than force manual re-entry.

---

# 73. No Duplicate Customs Master Data

This SHOULD be avoided:

```text
Thamani customer address
ERP customer address
TMS customer address
Trade Docs customer address
```

as four independent truths.

Canonical references and effective snapshots SHALL be used.

---

# 74. Snapshot at Submission

Although source master data remains external, an actual declaration submission SHALL preserve the values submitted.

Therefore:

```text
Master Data
     │
     ▼
Declaration Draft
     │
     ▼
Submission Snapshot
```

SHALL be retained.

Later customer-address changes SHALL not rewrite a historical declaration.

---

# 75. Declarant

The CustomsCase SHALL distinguish:

```text
Importer

Exporter

Declarant

Customs Broker / Agent

Carrier

Consignor

Consignee

Guarantor

Represented Party
```

as applicable.

---

# 76. Declarant Is Not Logged-In User

This SHALL remain:

```text
Customs Declarant
    !=
IAM User
```

A human user may act on behalf of a licensed organisation.

---

# 77. Representative Authority

Submission SHALL require appropriate organisational/representative authority.

ADR-THA-0004 and IAM decisions remain authoritative.

---

# 78. Machine Credentials

Direct EDI/API submissions SHOULD use:

```text
service/workload identity
+
authority credential
```

where supported.

Human credentials SHALL not be embedded in application code.

---

# 79. Digital Signature

Where the authority/document requires digital signing:

```text
Document
      │
      ▼
Authorised Signatory / Workload
      │
      ▼
Signature
      │
      ▼
Submission
```

SHALL preserve signing identity and signature evidence.

---

# 80. Customs Credentials Are Sensitive

The following SHALL remain server-side:

```text
EDI credentials

PKI material

private keys

authority API secrets

customs broker credentials

signing credentials
```

They SHALL NOT enter browser storage.

---

# 81. Transit

Transit SHALL be modelled independently from ordinary physical movement.

The WTO Trade Facilitation Agreement specifically recognises advance filing of transit documentation, transit guarantees and termination of the transit operation after requirements are satisfied.

Therefore:

```text
Cargo physically moving
    !=
Customs transit procedure satisfied
```

---

# 82. Transit Case

`baobab-trade-docs` SHOULD own a:

```text
TransitCase
```

or specialised CustomsCase.

Conceptually:

```text
TransitCase
├── case_id
├── regime
├── customs_territories[]
├── offices_of_departure[]
├── offices_of_transit[]
├── office_of_destination?
├── cargo_refs[]
├── movement_refs[]
├── declaration_refs[]
├── guarantee_refs[]
├── seals[]
├── control_events[]
├── authority_events[]
├── status
└── acquittal_reference?
```

---

# 83. Transit Lifecycle

A general lifecycle MAY resemble:

```text
PREPARING
    │
    ▼
DECLARED
    │
    ▼
RELEASED_FOR_TRANSIT
    │
    ▼
IN_TRANSIT
    │
    ├── HELD
    ├── INSPECTION
    └── INCIDENT
    │
    ▼
EXIT / DESTINATION_CONFIRMED
    │
    ▼
ACQUITTAL_PENDING
    │
    ▼
ACQUITTED
```

Jurisdiction-specific differences SHALL remain adapters/policy.

---

# 84. Transit Release Is Not Import Release

This SHALL remain:

```text
RELEASED_FOR_TRANSIT
    !=
RELEASED_FOR_HOME_USE
```

---

# 85. Transit Movement

TMS SHALL own the physical movement.

Trade Docs SHALL own the customs transit case.

Conceptually:

```text
TMS

Transport Movement
Kampala → Border → Port
        │
        │ correlated
        ▼
Trade Docs

Transit Case
declaration + guarantee + acquittal
```

---

# 86. Customs-Controlled Movement

TMS SHALL be able to represent movement under:

```text
CUSTOMS_CONTROL
TRANSIT_CONTROL
BOND_CONTROL
```

or equivalent restrictions.

This SHALL NOT transfer customs authority to TMS.

---

# 87. Transit Guarantee

A transit guarantee SHALL be independently represented.

Conceptually:

```text
TransitGuarantee
├── guarantee_id
├── regime
├── principal
├── guarantor
├── authority
├── jurisdictions[]
├── coverage_type
├── amount?
├── currency?
├── validity
├── covered_cases[]
├── status
├── release/acquittal state
└── document_reference
```

---

# 88. Guarantee May Cover Multiple Movements

The architecture SHALL NOT assume:

```text
one guarantee
=
one shipment
```

The WTO TFA explicitly contemplates comprehensive guarantees covering multiple transactions.

---

# 89. COMESA RCTG Example

COMESA's Regional Customs Transit Guarantee is designed to facilitate transit goods under Customs seals while providing customs security to transit countries.

This illustrates why:

```text
TransitGuarantee
```

should be a reusable regulatory/documentary concept rather than a field on a truck record.

---

# 90. South African Transit Example

SARS distinguishes national and international transit and requires specific customs procedures and licensed removers of goods in bond for relevant road movements.

The architecture SHALL therefore support:

```text
carrier qualification
+
customs procedure
+
declaration
+
transport movement
+
guarantee/security
```

as separate but correlated facts.

---

# 91. Transit Acquittal

This SHALL remain:

```text
Cargo exited country
    != automatically
Transit case acquitted
```

Authority confirmation/evidence remains required according to procedure.

---

# 92. Physical Exit Evidence

TMS MAY produce evidence such as:

```text
border exit event

GPS event

gate event

delivery event
```

but Customs authority determines whether that evidence satisfies transit acquittal.

---

# 93. Seal

Customs transit MAY reference transport seals.

TMS/Trade Docs SHALL correlate:

```text
seal applied

seal identifier

seal inspected

seal broken

seal replaced

seal discrepancy
```

without assuming the software seal state itself is a customs decision.

---

# 94. Customs Bond vs Transport Insurance

This SHALL remain:

```text
Customs Guarantee
    !=
Cargo Insurance

Customs Guarantee
    !=
Vehicle Insurance

Customs Guarantee
    !=
Carrier Liability Insurance
```

---

# 95. Financial Guarantee Boundary

Trade Docs MAY own the workflow/reference.

ERP MAY own:

```text
fees

financial liability

provider payable

security-related accounting

payment
```

where applicable.

The bank/insurer/customs authority remains authoritative for the actual guarantee instrument.

---

# 96. Customs Valuation

Regulations MAY determine:

```text
applicable valuation requirements
```

and produce regulatory reasoning.

Trade Docs SHALL prepare/decorate declaration data with the appropriate valuation inputs.

ERP/Trade provide authoritative commercial values.

---

# 97. Customs Valuation Is Not Commercial Price

This SHALL remain:

```text
Customer Logistics Price
    !=
Customs Value
```

and:

```text
ERP Invoice Total
    != automatically
Customs Value
```

depending upon applicable rules.

---

# 98. HS Classification

ADR-REG-0027 remains authoritative:

```text
Commercial Product
    !=
Customs Classification
```

Regulations owns the classification decision semantics.

Trade Docs consumes the approved classification when building a declaration.

---

# 99. Trade Docs Shall Not Guess HS Codes

This SHALL be prohibited:

```text
if product contains "coffee":
    customs_code = 0901
```

inside Trade Docs.

Classification belongs to the regulatory decision domain.

---

# 100. Rules of Origin

Regulations SHALL determine:

```text
origin requirements

preferential origin eligibility

direct-transport requirements

documentary proof requirements
```

Trade Docs SHALL execute the certificate/document workflow.

---

# 101. Certificate of Origin

This distinction SHALL remain:

```text
Origin Determination
    =
Regulations decision

Certificate of Origin
    =
Document / external authority evidence
```

---

# 102. SPS / Plant Health

Similarly:

```text
Phytosanitary requirement
    =
Regulations

Phytosanitary certificate
    =
Trade Docs / authority evidence

Cargo movement
    =
TMS
```

---

# 103. Permit

A permit has three distinct dimensions:

```text
Permit Required?
    → Regulations

Permit Document / Application
    → Trade Docs

Permit Issued?
    → External Authority
```

---

# 104. Prohibition

If Regulations returns:

```text
PROHIBITED
```

the operational PEPs SHALL prevent prohibited execution.

For example:

```text
TMS
    blocks new dispatch

Trade Docs
    blocks declaration submission where inappropriate

Thamani
    prevents service commitment
```

according to decision scope.

---

# 105. Review Required

Where the regulatory outcome is:

```text
REVIEW_REQUIRED
```

automation SHALL NOT silently convert it to:

```text
PASS
```

Human/regulatory review must resolve it.

---

# 106. Regulatory Unavailability

Mandatory regulatory decisions SHALL fail closed.

Conceptually:

```text
Required Regulations decision
        │
        ▼
Regulations unavailable
        │
        ▼
UNKNOWN
        │
        ▼
BLOCK regulated transition
```

This follows ADR-REG architecture.

---

# 107. Customs Integration Failure

Likewise:

```text
Trade Docs submits declaration
        │
        ▼
Authority endpoint unavailable
```

SHALL result in:

```text
SUBMISSION_PENDING
or
SUBMISSION_FAILED
```

not:

```text
SUBMITTED
```

unless successful delivery is known.

---

# 108. Authority Timeout

No Customs response SHALL result in:

```text
PENDING / UNKNOWN
```

not:

```text
RELEASED
```

---

# 109. Idempotent Submission

Declaration submission SHALL support idempotency.

Repeated network retries MUST NOT accidentally create multiple declarations where the external authority supports or requires de-duplication.

---

# 110. Submission Correlation

Every authority interaction SHOULD preserve:

```text
canonical request ID

authority correlation ID

authority declaration reference

message ID

submission time

response time

adapter version
```

where available.

---

# 111. Raw Message Preservation

For material regulated exchanges, Trade Docs SHOULD preserve:

```text
raw request representation
raw response representation
checksum
normalized projection
mapping version
```

according to retention/security policy.

---

# 112. Normalised State Does Not Replace Raw Evidence

This SHALL remain:

```text
status = RELEASED
```

is a convenient projection.

The underlying:

```text
authority response
```

is the evidence.

---

# 113. EDI Support

Trade Docs SHALL not assume all government systems provide modern REST APIs.

Supported integration patterns MAY include:

```text
REST / JSON API

SOAP/XML

EDI / EDIFACT

ASYCUDA integration

Single Window API

secure file transfer

message gateway

broker integration

controlled assisted/manual workflow
```

---

# 114. SARS EDI Example

SARS legally mandates EDI for defined declarations/reports and uses message structures including CUSDEC and CUSRES.

Therefore a production-grade African trade-document engine MUST support protocol diversity.

---

# 115. Manual / Assisted Workflow

Where no viable machine interface exists:

```text
Trade Docs
      │
      ▼
Controlled Human Task
      │
      ▼
Authority Portal / Procedure
      │
      ▼
Evidence Capture
```

MAY be supported.

---

# 116. Manual Does Not Mean Ungoverned

A manual customs task SHALL retain:

```text
assigned actor

organisation authority

instructions

submitted data snapshot

completion evidence

authority reference

time

review/approval
```

---

# 117. Browser Automation Is Not Canonical Architecture

Screen scraping or RPA against government portals SHALL NOT be the foundational integration strategy.

If temporarily necessary, it SHALL be isolated behind a governed adapter and treated as higher operational risk.

---

# 118. Advance Filing

The architecture SHALL support documentation/declaration before cargo physically reaches the border.

The WTO TFA specifically encourages advance filing and processing of transit documentation.

Therefore:

```text
physical arrival
```

SHALL NOT be a prerequisite for every CustomsCase operation.

---

# 119. Document Readiness

Trade Docs MAY expose:

```text
DocumentReadiness
```

such as:

```text
COMPLETE

INCOMPLETE

EXPIRING

VERIFICATION_REQUIRED

INVALID
```

as a projection.

---

# 120. Regulatory Readiness

Regulations MAY expose:

```text
RegulatoryReadiness
```

based on:

```text
requirements

assessments

conditions

unresolved review
```

---

# 121. Customs Readiness

Trade Docs MAY expose:

```text
CustomsReadiness
```

based on:

```text
declaration readiness

required documents

broker assignment

authority state

payment/guarantee references
```

---

# 122. Transport Readiness

TMS MAY expose:

```text
TransportReadiness
```

based on:

```text
route

booking

capacity

resource

provider

cargo
```

---

# 123. Cross-Border Readiness Is Composite

Thamani MAY compose:

```text
CrossBorderReadiness
```

as:

```text
Transport Ready
        +
Regulatory Ready
        +
Documents Ready
        +
Customs Ready
        +
Financial Preconditions
        =
Operational Cross-Border Readiness
```

This is a projection.

It SHALL NOT become a competing system of record.

---

# 124. Readiness Condition Model

A cross-border readiness display SHOULD explain:

```text
READY

BLOCKED
  Missing phytosanitary certificate

BLOCKED
  Customs declaration rejected

BLOCKED
  Transit guarantee expired

BLOCKED
  Carrier not qualified

WAITING
  Customs assessment pending
```

rather than a single colour badge.

---

# 125. Customer Experience

Customers SHOULD normally see:

```text
Documents Required

Documents Under Review

Submitted to Customs

Customs Processing

Inspection Required

Released for Transit

In Transit

Import Processing

Released

Out for Delivery
```

where appropriate.

They SHALL not normally need to interpret raw:

```text
CUSRES codes
EDI message types
authority-specific internal codes
```

---

# 126. Customer-Friendly Status Is Projection

This remains:

```text
"Customs Processing"
```

may represent several internal authority states.

The canonical underlying facts SHALL remain available to authorised operators.

---

# 127. Customs Inspection

An inspection SHALL be represented independently.

Conceptually:

```text
CustomsInspection
├── case_id
├── authority
├── inspection_type
├── requested_at
├── location
├── scheduled_at?
├── completed_at?
├── outcome?
├── evidence[]
└── restrictions[]
```

---

# 128. Inspection Is Not Hold

A Customs authority MAY:

```text
inspect without broad hold

hold pending inspection

conditionally release after inspection
```

These SHALL remain separate facts.

---

# 129. Physical Examination

TMS SHALL support operational tasks needed for examination:

```text
move to inspection site

present vehicle

open container

reposition cargo

return to terminal
```

without owning the legal inspection decision.

---

# 130. Border Delay

TMS MAY record:

```text
border delay
```

as an operational exception.

The reason MAY reference:

```text
customs hold
document deficiency
congestion
inspection
system outage
```

without duplicating authority state.

---

# 131. Customs Hold

A Customs hold SHALL block affected physical transitions according to its scope.

Conceptually:

```text
Customs Hold
      │
      ▼
TMS Enforcement
      │
      X
Restricted movement
```

---

# 132. Hold Scope

A hold may apply to:

```text
entire shipment

one consignment

one container

one goods item

one declaration

one movement
```

The system SHALL not assume every hold freezes unrelated cargo.

---

# 133. Release After Hold

When authority release is received:

```text
Customs Event
      │
      ▼
Trade Docs Normalisation
      │
      ▼
PEP Re-evaluation
      │
      ▼
TMS Resume Eligibility
```

---

# 134. No Direct Database Coupling

This SHALL remain prohibited:

```text
TMS
direct SQL
into Trade Docs

Trade Docs
direct SQL
into Regulations

Regulations
direct SQL
into TMS
```

---

# 135. Cross-Engine Contracts

Integration SHALL use:

```text
canonical APIs

events

external references

mappings

correlation

causation

versioned contracts
```

---

# 136. Distributed Transaction Boundary

Cross-border execution SHALL NOT require one ACID transaction across:

```text
TMS

Trade Docs

Regulations

ERP

Customs Authority

Carrier

Warehouse
```

Instead use:

```text
local transactions

outbox/events

durable operations

idempotency

reconciliation

compensation
```

---

# 137. Regulatory Decision Reference

A PEP SHALL reference the regulatory decision it enforced.

Example:

```text
TMS Movement Hold
      │
      └── regulatory_decision_id
```

It SHALL NOT copy the regulatory legal reasoning and become a second authority.

---

# 138. Customs Case References Regulatory Decision

Likewise:

```text
CustomsCase
      │
      └── requirement_decisions[]
```

but Trade Docs SHALL not own those decision semantics.

---

# 139. Document Dossier References Source Facts

Trade Docs SHALL build documents from source facts using references/snapshots.

Example:

```text
ERP
Commercial Invoice
      │
      ▼
Trade Docs
Declaration Supporting Document

Regulations
HS Classification
      │
      ▼
Trade Docs
Declaration Goods Item

TMS
Transport Means
      │
      ▼
Trade Docs
Transport/Customs field
```

---

# 140. Source Conflict

If two authoritative sources disagree:

```text
ERP invoice value:
USD 50,000

Customer uploaded invoice:
USD 47,000
```

Trade Docs SHALL create:

```text
DATA DISCREPANCY
```

not arbitrarily select one.

---

# 141. Data Validation

Validation SHOULD distinguish:

```text
SCHEMA VALIDITY

DOMAIN VALIDITY

REGULATORY VALIDITY

AUTHORITY ACCEPTANCE
```

These are not the same.

---

# 142. Local Validation

Trade Docs MAY validate:

```text
required field missing

invalid code format

inconsistent totals

unsupported unit
```

before submission.

---

# 143. Local Validation Is Not Customs Approval

This SHALL remain:

```text
Baobab validation passed
    !=
Customs declaration accepted
```

---

# 144. Customs Authority Assessment

An authority assessment MAY differ from Baobab's expected calculation.

The architecture SHALL support:

```text
Baobab expected duty:
100

Authority assessment:
115
```

without rewriting historical expectations.

---

# 145. Assessment Reconciliation

A discrepancy MAY produce:

```text
AssessmentReview
```

with possible outcomes:

```text
accept authority assessment

correct Baobab inputs

submit amendment

raise objection

request human review
```

according to procedure.

---

# 146. ERP Financial Posting

ERP SHALL remain authoritative for:

```text
duty payable

VAT payable

customs fee payable

broker payable

carrier payable

financial accrual

payment

GL posting
```

---

# 147. Payment Is Not Customs Release

This remains:

```text
Duty Paid
    !=
Cargo Released
```

Customs may have other outstanding controls.

---

# 148. Release Is Not Financial Posting

Likewise:

```text
Cargo Released
    !=
Financially Reconciled
```

---

# 149. Baobab Trade Boundary

`baobab-trade` SHALL retain its commerce/trade authority.

It MAY consume:

```text
regulatory decisions

customs results

documents

transport events
```

when executing cross-border commerce.

It SHALL NOT remain the universal customs/document runtime merely because earlier ADRs placed customs orchestration there.

---

# 150. ADR-0021 Reconciliation

ADR-0021 remains useful for:

```text
canonical regulatory context

provider neutrality

fail-closed compliance

classification separation

evidence lineage
```

But its earlier placement of:

```text
customs workflow
```

within Trade SHALL be refined by the dedicated engine architecture.

Target:

```text
Trade
    trade execution / enforcement

Regulations
    regulatory decision

Trade Docs
    customs/document execution
```

---

# 151. ADR-0025 Reconciliation

ADR-0025 remains the semantic foundation for:

```text
documents

evidence

provenance

versions

authorities

content references
```

The dedicated Trade Docs engine SHOULD become its principal reusable runtime provider.

---

# 152. ZuriBeans Can Consume Trade Docs Independently

Example:

```text
ZuriBeans
      │
      ├── uses Thamani transport
      │       └── TMS + Trade Docs
      │
      └── or uses another carrier
              └── Trade Docs still usable
```

Therefore Trade Docs SHALL NOT be Thamani-specific.

---

# 153. ZuriBeans Can Consume Regulations Independently

Likewise:

```text
ZuriBeans
      │
      ▼
Baobab Regulations
```

may evaluate export/import requirements before Thamani is selected as logistics provider.

---

# 154. TMS Can Serve External Baobab Customers

The same TMS SHOULD be usable by:

```text
Thamani

manufacturer

distributor

external 3PL

external 4PL

other logistics operator
```

without Thamani concepts embedded in its core domain.

---

# 155. Thamani Composition Layer

Thamani SHALL own:

```text
customer service experience

commercial relationship

logistics quotation

service order

division orchestration

customer visibility

customer-facing exception coordination
```

It SHALL reference TMS / Trade Docs / Regulations objects rather than duplicate them.

---

# 156. Cross-Border Service Order

A Thamani Service Order MAY require:

```text
Transport capability

Customs brokerage capability

Trade document capability

Regulatory assessment capability

Warehousing capability

Insurance arrangement
```

independently.

---

# 157. Customs-Only Service

Thamani SHALL support:

```text
Customer already has transport

Thamani provides customs brokerage only
```

Therefore a CustomsCase SHALL be able to reference external shipment/movement identifiers without requiring TMS to own the physical journey.

---

# 158. Transport-Only Service

Likewise:

```text
Customer handles customs itself

Thamani provides road transport
```

may use:

```text
TMS
```

while consuming only the minimum external clearance state necessary for transport.

---

# 159. Full Door-to-Door Service

A complete cross-border service MAY use:

```text
TMS
+
Trade Docs
+
Regulations
+
ERP
+
IAM
+
external carriers
+
customs authorities
```

under one customer service order.

---

# 160. 4PL Model

Thamani 4PL may orchestrate a customer's own:

```text
carrier

broker

warehouse

TMS

document provider
```

while still using Baobab capabilities as the control layer.

The architecture SHALL not require every participant to be a Thamani-owned provider.

---

# 161. Corridor Regulatory Profile

Thamani MAY maintain a read-model:

```text
CorridorRegulatoryProfile
```

combining:

```text
corridor
jurisdictions
regulatory decisions
border requirements
document requirements
```

for planning.

This SHALL be a projection.

It SHALL NOT become regulatory authority.

---

# 162. Corridor Requirements Can Change

A corridor previously usable may become affected by:

```text
border closure

permit change

transit rule change

security restriction

product restriction

new SPS requirement
```

Regulations SHALL own interpretation of those changes.

---

# 163. Regulatory Change Propagation

Potential pattern:

```text
Authoritative Rule Changes
        │
        ▼
Baobab Regulations
        │
        ▼
Regulatory Change Event
        │
        ▼
Affected Active Plans
        │
        ├── TMS route reassessment
        ├── Trade Docs dossier reassessment
        └── Thamani customer impact review
```

---

# 164. Existing Active Shipments

A changed rule SHALL not automatically cancel every active shipment.

Impact evaluation SHALL determine:

```text
grandfathered

must comply immediately

requires new document

requires reroute

requires customs intervention

unaffected
```

based on authoritative rules.

---

# 165. Border Event Model

TMS MAY emit operational facts such as:

```text
ARRIVED_AT_BORDER

ENTERED_BORDER_FACILITY

EXITED_BORDER_FACILITY

ARRIVED_AT_CUSTOMS_LOCATION

DEPARTED_CUSTOMS_LOCATION
```

These SHALL remain physical facts.

---

# 166. Customs Event Model

Trade Docs MAY emit canonical customs facts such as:

```text
declaration.submitted

declaration.accepted

declaration.rejected

supporting-document.requested

inspection.requested

assessment.received

hold.placed

release.granted

transit.opened

transit.acquitted
```

Final names SHALL be registered through ADR-SHARED-018 governance.

---

# 167. Regulatory Event Model

Regulations MAY emit:

```text
classification.assigned

compliance-assessment.decided

requirement.determined

regulatory-change.detected
```

subject to final Shared registration.

---

# 168. No Duplicate Event Producers

One canonical event type SHALL have one authorised producer under Shared event governance.

TMS SHALL NOT emit:

```text
customs.clearance.granted
```

because physical logistics is not the customs authority projection owner.

---

# 169. Enforcement Event

If TMS blocks execution because of a regulatory decision, the event should describe the TMS/domain consequence.

For example conceptually:

```text
logistics.movement.blocked
```

with reference to the regulatory/customs decision.

It SHALL not duplicate:

```text
regulations.compliance-assessment.decided
```

---

# 170. Customs Status Mapping

Each external authority may use its own status vocabulary.

Trade Docs SHALL map:

```text
Authority Native Status
        │
        ▼
Adapter Mapping
        │
        ▼
Canonical Customs State
```

while preserving the original value.

---

# 171. Unknown Authority State

An unknown/new external response code SHALL:

```text
fail safely
+
retain raw response
+
create review/adapter alert
```

It SHALL not be silently mapped to:

```text
RELEASED
```

---

# 172. National Systems Evolve

SARS's 2026 goods-declaration updates and the WCO's continuing Data Model releases demonstrate that national and international customs semantics evolve over time.

Adapters SHALL therefore be:

```text
versioned
tested
effective-dated
observable
```

---

# 173. Authority Capability Metadata

A customs adapter SHOULD advertise:

```text
supported jurisdictions

supported procedures

supported message standards

submission capability

document upload capability

status query capability

amendment capability

cancellation capability

transit capability
```

rather than relying on engine name.

---

# 174. Provider-Neutral Customs Execution

Although `baobab-trade-docs` is the intended Baobab engine:

```text
customs.declaration.submit
```

could theoretically be implemented by another certified provider.

Control Plane SHALL retain provider resolution.

---

# 175. Customs Broker Provider vs Technology Provider

These SHALL remain different:

```text
Technology provider:
baobab-trade-docs

Customs service provider:
Thamani Customs / External Broker

Authority:
URA / SARS / other Customs administration
```

---

# 176. Transport Technology Provider vs Carrier

Likewise:

```text
TMS provider:
baobab-tms

Carrier:
Thamani Haulage / External Carrier

Transport Means:
Truck / Vessel / Aircraft / Train
```

---

# 177. Systems Must Not Confuse These Roles

This SHALL be prohibited:

```text
carrier_id = baobab-tms
```

and:

```text
customs_broker_id = baobab-trade-docs
```

---

# 178. Evidence Provenance

Material border decisions SHALL preserve:

```text
source authority

source system

message/document

received_at

effective_at

canonical mapping version

checksum

external reference
```

where appropriate.

---

# 179. Customs Audit Timeline

A CustomsCase SHOULD support a timeline such as:

```text
08:41 Declaration prepared

08:52 Broker approved submission

08:54 Submitted to authority

08:54 Authority acknowledgement received

09:13 Additional document requested

09:27 Document submitted

10:06 Inspection selected

12:42 Inspection completed

13:15 Release received
```

with authoritative provenance.

---

# 180. Cross-Border Audit

Thamani SHOULD ultimately answer:

```text
Which route was planned?

Which jurisdictions applied?

Which regulations were evaluated?

Which documents were required?

Which declaration was submitted?

Who submitted it?

Under whose authority?

Which Customs responses were received?

Was a guarantee required?

When was transit opened?

Where was the cargo physically located?

When was it released?

Which provider executed each movement?

Which financial assessment resulted?

What changed during the journey?
```

---

# 181. Customs Data Is Sensitive

Customs data may contain:

```text
commercial value

supplier/customer identity

cargo details

classification

route

financial information

government references

security-sensitive information
```

Access SHALL follow least privilege.

---

# 182. Tenant Isolation

Customs cases, declarations and supporting documents SHALL remain tenant/legal-entity scoped.

One Thamani customer SHALL not gain access to another customer's regulated documentation merely because they share a carrier.

---

# 183. Broker Scope

An external customs broker SHALL see only cases and documents for which it has explicit delegated authority.

---

# 184. Authority Credentials Isolation

Authority integration credentials SHALL be scoped according to:

```text
legal entity

broker/declarant

authority

jurisdiction

environment
```

where required.

Credentials SHALL not be shared casually across tenants.

---

# 185. Audit of Privileged Customs Actions

Actions such as:

```text
submit declaration

amend declaration

withdraw declaration

accept authority assessment

override validation

change declarant

attach guarantee

mark authority message manually
```

SHALL be auditable.

---

# 186. Maker / Checker

High-risk customs submissions MAY require:

```text
preparer
    !=
approver
```

according to organisational policy.

The system SHALL support this without claiming the authority legally requires it universally.

---

# 187. AI Boundary

AI MAY assist with:

```text
document extraction

classification candidate generation

document completeness checks

field mapping

anomaly detection

regulatory explanation
```

It SHALL NOT independently:

```text
invent Customs release

invent permit

submit binding declaration without authority

override regulatory prohibition
```

---

# 188. OCR / Document Extraction

Extracted document data SHALL retain:

```text
source document

extracted field

confidence

human correction

verification state
```

where material.

Extraction SHALL not make the extracted value legally authoritative.

---

# 189. Cross-Border Control Tower

Thamani MAY present a cross-border control-tower projection:

```text
Shipment
│
├── Transport           IN TRANSIT
├── Export Customs      RELEASED
├── Transit             OPEN
├── Documents           COMPLETE
├── Import Readiness    READY
├── Regulatory          PASS WITH CONDITIONS
└── Exceptions          1 OPEN
```

This projection is particularly important for Thamani 4PL.

---

# 190. Control Tower Is Not New System of Record

The control tower SHALL compose authoritative engine state.

It SHALL NOT maintain competing versions of:

```text
shipment

declaration

regulatory assessment

invoice

document
```

---

# 191. Initial Reference Corridor

The first serious vertical SHOULD align with ADR-REG-0027:

```text
Uganda
   ↓
South Africa

Products:
coffee
vanilla
```

with an actual transport route selected at execution time.

---

# 192. Example Multimodal Journey

For illustration:

```text
ZuriBeans Uganda
        │
        ▼
Kampala
        │
        │ Road
        ▼
Transit Jurisdiction(s)
        │
        ▼
East African Port
        │
        │ Sea
        ▼
Durban
        │
        │ Road
        ▼
South African Customer
```

The exact corridor SHALL not be hard-coded by this ADR.

---

# 193. Example Engine Composition

```text
ZuriBeans
    │
    ▼
Thamani Service Order
    │
    ├───────────────────────────────────────┐
    │                                       │
    ▼                                       ▼
BAOBAB TMS                         BAOBAB REGULATIONS
    │                                       │
Route                              HS / origin / SPS /
Movements                          permits / obligations
Bookings                                    │
    │                                       │
    └───────────────┬───────────────────────┘
                    ▼
          BAOBAB TRADE DOCS
                    │
             Document Dossier
             Export Declaration
             Transit Documents
             Import Declaration
                    │
                    ▼
           Government Systems
                    │
           ┌────────┴─────────┐
           ▼                  ▼
     Uganda / Transit      South Africa
       Authorities           Authorities
                    │
                    ▼
                Releases
                    │
                    ▼
                 TMS PEP
                    │
                    ▼
              Physical Movement
```

---

# 194. Reroute Example

Suppose:

```text
Original route
UG → KE → port → ZA
```

becomes:

```text
Replanned route
UG → TZ → port → ZA
```

The workflow SHOULD be:

```text
TMS
Route Replanned
      │
      ▼
Regulations
Re-evaluate transit jurisdictions
      │
      ▼
Trade Docs
Determine dossier/declaration impact
      │
      ├── existing docs remain valid
      ├── amendment required
      └── new transit case required
      │
      ▼
TMS
Resume only when required gates satisfied
```

---

# 195. Customs-Only Example

```text
External Carrier
      │
      ▼
Customer Shipment
      │
      ▼
Thamani Customs Brokerage
      │
      ▼
Trade Docs
      │
      ▼
Regulations
      │
      ▼
Customs Authority
```

No Baobab TMS movement ownership is required.

---

# 196. Haulage-Only Cross-Border Example

```text
Customer's Customs Broker
         │
         ▼
External Release State
         │
         ▼
Thamani Haulage
         │
         ▼
Baobab TMS
```

TMS consumes sufficient release evidence but does not own the CustomsCase.

---

# 197. Full 4PL Example

```text
Customer
   │
   ▼
Thamani 4PL
   │
   ├── External Freight Forwarder
   ├── External Carrier
   ├── Thamani Customs
   ├── External Warehouse
   ├── Thamani Last Mile
   │
   ▼
Baobab Platform
   │
   ├── TMS
   ├── Trade Docs
   ├── Regulations
   ├── ERP
   ├── IAM
   └── Pulse
```

---

# 198. Failure Semantics

The architecture SHALL distinguish:

```text
REGULATORY BLOCK
Known regulatory condition prevents action

CUSTOMS HOLD
Authority has restricted cargo

DOCUMENT BLOCK
Required evidence/document missing

TRANSPORT BLOCK
Operational execution cannot proceed

INTEGRATION FAILURE
System/provider communication failed

UNKNOWN
Required state cannot be established
```

These SHALL not all become:

```text
ERROR
```

---

# 199. Blocked vs Failed

Example:

```text
BLOCKED:
Import permit missing
```

versus:

```text
FAILED:
Authority EDI gateway unreachable after retry budget
```

Different:

```text
cause

operator response

customer communication

remediation
```

are required.

---

# 200. No Optimistic Regulatory Success

This SHALL be non-negotiable:

```text
Regulations timeout
        != PASS

Customs timeout
        != RELEASED

Document verification timeout
        != VERIFIED
```

---

# 201. Reconciliation

Cross-engine state SHALL be reconciled.

Example:

```text
TMS:
Cargo departed border

Trade Docs:
Transit still OPEN

Authority:
Exit confirmation received

        │
        ▼
Reconciliation
        │
        ▼
Transit ACQUITTAL workflow
```

---

# 202. Physical Fact vs Regulatory Fact

A GPS observation that cargo crossed a geographic border is:

```text
physical evidence
```

It is NOT automatically:

```text
legal export

customs exit confirmation

transit acquittal
```

---

# 203. Customs Event vs Logistics Event

This SHALL remain:

```text
logistics.movement.arrived
    !=
customs.declaration.accepted

logistics.movement.departed
    !=
customs.release.granted
```

---

# 204. Document Event vs Regulatory Decision

Likewise:

```text
documents.certificate.received
    !=
regulations.requirement.satisfied
```

until verified/evaluated.

---

# 205. Historical Reproducibility

A historical cross-border case SHALL preserve:

```text
route version

regulatory rule version

assessment

document versions

declaration versions

authority messages

adapter version

provider

financial assessment

execution events
```

---

# 206. Effective Time

Regulations change.

Therefore the system SHALL distinguish:

```text
transaction effective time

rule effective time

document issued time

declaration submitted time

authority decision time

physical event time

record time
```

---

# 207. Current Rules Shall Not Rewrite History

A 2027 regulation SHALL not make a 2026 shipment appear as though the 2027 rule governed it.

ADR-REG bitemporal architecture remains authoritative.

---

# 208. Retention

Customs/document records MAY have statutory retention obligations.

Retention SHALL therefore be:

```text
jurisdiction-aware

document-type-aware

legal-entity-aware

effective-dated
```

and SHALL be informed by Regulations rather than scattered frontend constants.

---

# 209. Data Residency

Some regulatory/customs data may have jurisdictional residency requirements.

Control Plane residency/context decisions and Regulations requirements SHALL be applied to provider resolution and storage architecture.

---

# 210. Observability

Cross-border integration SHALL expose operational metrics such as:

```text
declaration submission latency

authority response latency

submission failure rate

document deficiency rate

inspection frequency

release cycle time

border dwell time

transit acquittal delay

adapter health

regulatory-decision latency
```

without exposing protected data in telemetry.

---

# 211. Correlation

A single cross-border journey SHOULD be traceable through:

```text
service_order_id

shipment_id

consignment_id

transport_plan_id

movement_id

customs_case_id

declaration_id

regulatory_decision_id

document_id

ERP reference

external authority reference
```

using canonical mappings and correlation IDs.

---

# 212. No Mega Cross-Border Aggregate

This SHALL be rejected:

```text
CrossBorderShipment {
  everything
}
```

containing every:

```text
movement
document
regulation
invoice
customs state
provider
```

inside one mutable object.

Cross-border service is a composition.

---

# 213. Useful Cross-Border Projection

Thamani MAY maintain:

```text
CrossBorderOperationView
```

as a read model linking authoritative IDs.

That is acceptable.

It SHALL not become another source of truth.

---

# 214. Engine Provider Registration

Before production, `baobab-tms` and `baobab-trade-docs` SHALL conform to ADR-SHARED-017:

```text
Canonical Capability
        │
        ▼
Provider Declaration
        │
        ▼
Implementation Evidence
        │
        ▼
Certification
        │
        ▼
Control Plane Registration
        │
        ▼
Engine / Release / Instance
        │
        ▼
Capability Binding
        │
        ▼
Resolution
```

---

# 215. No Production Binding From Empty Scaffold

Repository existence SHALL NOT imply:

```text
provider is production-ready
```

The current repositories are scaffolds only.

---

# 216. Required TMS Engine ADR Programme

Before substantive TMS implementation, a dedicated ADR family SHOULD define at minimum:

```text
mission and authority

shipment/consignment execution boundary

routing

movements

capacity

carrier integration

resource/fleet interaction

tracking/events

exception model

multi-tenancy

provider adapters

API/event contracts

persistence

security

observability

resilience

production readiness
```

---

# 217. Required Trade Docs ADR Programme

Likewise Trade Docs SHOULD define:

```text
mission and authority

document identity

document lifecycle

customs case

declaration workflow

supporting documents

authority adapters

signature / credential model

evidence/provenance

customs responses

transit

versioning

retention

security

multi-tenancy

interoperability

production readiness
```

---

# 218. Regulations Dependency

The G-REG namespace/capability work SHALL converge before Regulations is treated as a production-bound capability provider.

Thamani SHALL not bypass Control Plane and hard-code a direct regulatory provider simply because the repository exists.

---

# 219. Implementation Sequence

Implementation SHOULD proceed as follows.

## THA-XB-00 — Cross-Repository Architecture Audit

Audit:

```text
thamani

baobab-tms

baobab-trade-docs

baobab-regulations

baobab-trade

baobab-erp

baobab-cp

shared

IAM
```

and classify existing cross-border assumptions:

```text
KEEP

MOVE

GENERALISE

SUPERSEDE

REMOVE
```

---

## THA-XB-01 — Engine Architecture Decisions

Before application code:

```text
write TMS foundational ADRs

write Trade Docs foundational ADRs

reconcile Regulations status

reconcile Trade ADR-0021/0025
```

---

## THA-XB-02 — Capability Governance

Register/reconcile canonical capabilities under:

```text
logistics

documents

customs

regulations
```

through Shared governance.

---

## THA-XB-03 — Provider Declaration

Activate:

```text
.baobab/capability-provider.yaml
```

for both new engines according to ADR-SHARED-017.

---

## THA-XB-04 — Shared Contracts

Define canonical contracts for:

```text
LogisticsCorridor

BorderCrossingReference

CustomsCaseReference

CustomsDeclarationReference

CustomsAuthorityDecision

TransitCaseReference

TransitGuaranteeReference

DocumentRequirement

DocumentDossierReference

CrossBorderReadinessCondition
```

only where truly cross-engine.

---

## THA-XB-05 — TMS Core

Implement the ADR-THA-0005 transport spine in `baobab-tms`:

```text
Shipment

Consignment

Plan

Route

Movement

Leg

Call

Booking

Transport Event
```

---

## THA-XB-06 — Corridor Model

Add:

```text
corridor

border node

customs territory reference

transit jurisdiction

route versioning
```

to TMS.

---

## THA-XB-07 — Regulations Integration

Define the canonical request from:

```text
shipment
+
route
+
cargo
+
parties
+
effective date
```

to:

```text
RegulatoryContext
```

without embedding regulatory rules in TMS.

---

## THA-XB-08 — Trade Docs Core

Implement:

```text
TradeDocument

DocumentVersion

DocumentContentReference

DocumentDossier

DocumentRequirement

provenance
```

---

## THA-XB-09 — Customs Case

Implement:

```text
CustomsCase

CustomsDeclaration

AuthorityMessage

CustomsAuthorityDecision

inspection

hold

release
```

---

## THA-XB-10 — Transit

Implement:

```text
TransitCase

TransitGuarantee

customs-controlled movement references

acquittal
```

---

## THA-XB-11 — Uganda Reference Adapter

Integrate the appropriate UESW / ASYCUDA workflow boundary.

Do not begin with broad pan-African abstractions before one real authority adapter works.

---

## THA-XB-12 — South Africa Reference Adapter

Implement SARS interaction patterns including appropriate declaration/document/response mappings.

Do not make SARS semantics canonical.

---

## THA-XB-13 — Uganda → South Africa Pilot

Use:

```text
coffee
vanilla
```

and a real chosen corridor to exercise:

```text
export

transit

multimodal TMS

documents

origin

SPS

customs

import

delivery
```

---

## THA-XB-14 — Customs Brokerage Portal

Add staff/broker workflow for:

```text
case queue

data review

document review

submission approval

authority response

inspection

release

amendment

exception
```

---

## THA-XB-15 — Customer Cross-Border Experience

Expose:

```text
requirements

documents

clearance progress

milestones

issues

customer actions
```

without exposing unnecessary authority protocol complexity.

---

## THA-XB-16 — ERP Reconciliation

Integrate:

```text
duty assessment

tax assessment

broker cost

guarantee costs

provider costs

customer charges

payments
```

without moving financial authority into Trade Docs.

---

## THA-XB-17 — Event / Reconciliation Hardening

Verify:

```text
duplicate messages

out-of-order responses

missing authority response

adapter retry

route change

regulatory change

document expiry

rejected declaration

amendment

inspection

hold

release

transit failure

late acquittal
```

---

## THA-XB-18 — Production Hardening

Verify:

```text
tenant isolation

credential security

PKI

audit

SoD

regulatory fail-closed

customs fail-closed

adapter versioning

event provenance

data retention

data residency

backup/recovery

provider outage

authority outage

manual fallback

reconciliation

performance

observability
```

before go-live.

---

# 220. Alternatives Considered

## Alternative A — Put Cross-Border Logic Inside Thamani

**Rejected.**

The capabilities are reusable platform domains.

---

## Alternative B — Put Customs Inside TMS

**Rejected.**

Physical transport execution and government declaration workflow have different authorities and lifecycles.

---

## Alternative C — Put Regulatory Rules Inside Trade Docs

**Rejected.**

Document execution and regulatory meaning are different domains.

---

## Alternative D — Put Customs Back Inside Baobab Trade

**Rejected as the universal target.**

Commerce is only one producer/consumer of cross-border services.

---

## Alternative E — Make Baobab Regulations Submit Declarations

**Rejected.**

Regulations is PDP/regulatory-decision authority, not operational document workflow.

---

## Alternative F — Make Trade Docs Decide Regulatory Eligibility

**Rejected.**

It would duplicate Regulations.

---

## Alternative G — Make Trade Docs the Customs Authority

**Rejected.**

Legal authority belongs to the government Customs administration.

---

## Alternative H — Make Every Cross-Border Service Require TMS

**Rejected.**

Thamani may provide customs-only services.

---

## Alternative I — Make Every Customs Case Require Thamani

**Rejected.**

Trade Docs must serve other Baobab consumers.

---

## Alternative J — Make `country` Equal `customs territory`

**Rejected.**

The concepts differ.

---

## Alternative K — Make Trade Lane Equal Corridor

**Rejected.**

Commercial cross-market relationship and operational path differ.

---

## Alternative L — Use One `customsCleared` Boolean

**Rejected.**

Customs procedures contain independent decisions and stages.

---

## Alternative M — Encode Uganda/South Africa Rules in Application Code

**Rejected.**

Rules belong to Regulations and authority adapters.

---

## Alternative N — Build One Universal Customs API Immediately

**Rejected.**

National interfaces vary substantially and require adapter architecture.

---

## Alternative O — Treat PDFs as the Trade Document Model

**Rejected.**

Documents require identity, semantics, lifecycle and provenance.

---

## Alternative P — Treat Successful Message Transmission as Customs Release

**Rejected.**

Submission, acceptance and release are different legal/technical states.

---

# 221. Positive Consequences

The decision provides:

```text
clean TMS boundary

clean customs/document boundary

clean regulatory boundary

government-authority separation

multi-jurisdiction support

multi-corridor routing

reusable Baobab engines

customs-only services

transport-only services

integrated door-to-door services

4PL orchestration

provider neutrality

Uganda/South Africa adapters

future African market expansion

standards interoperability

regulatory explainability

customs auditability

historical reproducibility
```

---

# 222. Costs and Negative Consequences

The architecture is more complex than:

```text
Shipment {
    customs_status
    documents[]
    route
}
```

It requires coordination among:

```text
TMS

Trade Docs

Regulations

ERP

Control Plane

IAM

external Customs systems

brokers

carriers
```

That complexity is accepted because those authorities already exist independently in the real world.

Collapsing them in software would hide complexity rather than eliminate it.

---

# 223. Final Architectural Invariants

The following SHALL remain non-negotiable:

```text
Thamani
    != TMS

Thamani
    != Trade Docs

Thamani
    != Regulations

TMS
    != Customs Authority

Trade Docs
    != Customs Authority

Regulations
    != Customs Authority

Regulations
    != TMS

Regulations
    != Trade Docs

Regulatory Decision
    != Operational Enforcement

Customs Requirement
    != Customs Document

Customs Document
    != Customs Decision

Declaration Draft
    != Declaration Submitted

Declaration Submitted
    != Declaration Accepted

Declaration Accepted
    != Cargo Released

Cargo Released
    != Transit Acquitted

Release for Transit
    != Release for Home Use

Customs Assessment
    != ERP Posting

Expected Duty
    != Authority Duty Assessment

Duty Paid
    != Customs Release

Customs Release
    != Physical Delivery

Physical Border Crossing
    != Legal Export

GPS Event
    != Customs Exit Confirmation

Trade Lane
    != Logistics Corridor

Logistics Corridor
    != Transport Route

Market
    != Jurisdiction

Country
    != Customs Territory

Border Crossing
    != Customs Case

Shipment
    != Customs Case

Customs Case
    != Declaration

Customs Case
    != Regulatory Assessment

Transit Case
    != Transport Movement

Transit Guarantee
    != Cargo Insurance

Carrier
    != TMS Provider

Customs Broker
    != Trade Docs Provider

Authority Adapter
    != Regulatory Authority

External Authority Identifier
    != Canonical ID

Authority Status
    != Customer-Friendly Status

Document
    != File

Document
    != Evidence

Evidence
    != Verification

Classification
    != Product Identity

Origin Determination
    != Certificate of Origin

Permit Requirement
    != Permit Issued

Regulatory PASS
    != Customs RELEASED

Provider failure
    != Regulatory approval

Authority timeout
    != Release

Unknown
    != PASS

Route change
    may invalidate regulatory assessment

Historical declaration
    must preserve submitted snapshot

Historical regulatory assessment
    must preserve applicable rule version

Historical transport execution
    must preserve actual route

Raw authority evidence
    must preserve provenance

Engine name
    must not become capability identity

Repository existence
    must not imply production readiness
```

---

# 224. Final Decision

Thamani Global SHALL implement cross-border logistics as a **composed Baobab capability architecture**, not as one monolithic logistics application.

The final target relationship is:

```text
                          BAOBAB CONTROL PLANE
                  Context / Capability / Provider
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
         BAOBAB TMS     BAOBAB TRADE DOCS   BAOBAB REGULATIONS
              │                │                │
              │                │                │
         TRANSPORT         DOCUMENT /       REGULATORY
         EXECUTION         CUSTOMS           DECISIONS
              │            EXECUTION             │
              │                │                │
              │                ▼                │
              │       CUSTOMS / SINGLE WINDOW   │
              │          AUTHORITIES            │
              │                │                │
              └────────────────┼────────────────┘
                               │
                               ▼
                         THAMANI GLOBAL
                   Logistics Composition Layer
                               │
           ┌───────────────────┼───────────────────┐
           ▼                   ▼                   ▼
       Customer            Operations          Partners
       Experience          Control Tower       / Brokers
                               │
                               ▼
                            BAOBAB ERP
                         financial effects
```

For a regulated cross-border movement:

```text
CUSTOMER REQUIREMENT
        │
        ▼
THAMANI SERVICE ORDER
        │
        ▼
TMS TRANSPORT PLAN
        │
        ▼
ROUTE + TRANSIT JURISDICTIONS
        │
        ▼
REGULATIONS ASSESSMENT
        │
        ├── classification
        ├── origin
        ├── admissibility
        ├── permit requirements
        ├── SPS
        ├── transit requirements
        └── documentary requirements
        │
        ▼
TRADE DOCS DOSSIER
        │
        ├── certificates
        ├── permits
        ├── declaration
        ├── guarantees
        └── supporting evidence
        │
        ▼
CUSTOMS AUTHORITY
        │
        ├── accept
        ├── assess
        ├── request
        ├── inspect
        ├── hold
        └── release
        │
        ▼
TRADE DOCS NORMALISED AUTHORITY FACT
        │
        ▼
TMS POLICY ENFORCEMENT
        │
        ▼
PHYSICAL MOVEMENT
        │
        ▼
TRANSIT / BORDER / IMPORT CASES
        │
        ▼
DELIVERY
        │
        ▼
ERP FINANCIAL RECONCILIATION
```

Thamani SHALL therefore be able to answer, for every cross-border logistics engagement:

```text
What goods are moving?

Who owns and controls the commercial transaction?

Which route will the cargo physically use?

Which countries and customs territories will it traverse?

Which regulations apply at the effective time?

What classification applies?

Which permits and certificates are required?

Which trade documents are required?

Which Customs declarations are required?

Who is legally authorised to submit them?

Which Customs authority receives each declaration?

What exactly was submitted?

Which version was submitted?

Which acknowledgement was received?

Which duties and taxes were assessed?

Was an inspection ordered?

Was the cargo held?

Was it released?

Was it released for transit or for home use?

Which transit guarantee applies?

Has the transit movement been acquitted?

Where is the cargo physically?

Which movement or carrier currently has custody?

Did the route change?

Did that route change alter regulatory requirements?

What does the customer see?

What does the broker see?

What does the operations team see?

What evidence supports every regulatory and Customs state?

What financial consequences were posted?

Can the complete transaction be reconstructed years later?
```

The defining transport principle is:

> **Physical movement belongs to TMS.**

The defining documentary principle is:

> **Executable trade-document and Customs workflows belong to Trade Docs, while authoritative business content remains with its originating authority.**

The defining regulatory principle is:

> **Regulatory meaning belongs to Baobab Regulations; operational engines enforce its decisions without becoming independent interpreters of law.**

The defining sovereignty principle is:

> **Baobab may prepare, submit, interpret, orchestrate, record and evidence a Customs process, but only the competent authority may exercise the legal authority to assess, hold, reject or release goods.**

The defining platform principle is:

> **`baobab-tms`, `baobab-trade-docs` and `baobab-regulations` shall evolve as reusable Baobab capability providers, not as Thamani-specific subsystems.**

And the defining strategic principle is:

> **Thamani shall make African cross-border logistics feel like one coherent customer service while preserving, underneath, the independent authorities of transport execution, trade documentation, Customs administration, regulatory decision-making and financial accounting.**