# ADR-THA-0009 — Baobab Capability Consumption, Engine Authority and System-of-Record Boundary

**Status:** Accepted — Foundational Thamani Architecture  
**Date:** 2026-10-03  
**Decision Owners:** Nabhold Group Africa / Thamani Global / Baobab Platform Architecture  
**Primary Repository:** `baobab-platform/thamani`  
**Legal Entity:** `THAMANI-GLOBAL`  
**Digital Estate:** Thamani  
**Platform Architecture:** Capability-Centric Baobab Platform  
**Capability Contract Authority:** `baobab-platform/shared`  
**Capability Resolution Authority:** `baobab-platform/baobab-cp`  
**Identity Authority:** `baobab-platform/baobab-iam`  
**Decision Class:** Digital-estate boundary / capability consumption / engine authority / system-of-record / domain decomposition / integration architecture

---

# 1. Decision

Thamani SHALL remain an independently deployable **Digital Estate and business-composition layer** for Thamani Global.

Thamani SHALL NOT become:

```text
a TMS
a customs platform
a document engine
an ERP
a regulatory rules engine
an IAM platform
a CMS
an analytics engine
or a general Baobab integration monolith
```

Thamani SHALL consume Baobab business capabilities through the capability-centric architecture established by the Control Plane and Shared contracts.

The target architecture SHALL therefore be:

```text
                         THAMANI GLOBAL
                              │
                              ▼
                       THAMANI DIGITAL ESTATE
                              │
                Customer / Partner / Staff UX
                              │
                              ▼
                    THAMANI APPLICATION LAYER
                              │
                       consumes capabilities
                              │
                              ▼
                     BAOBAB CONTROL PLANE
                  context / grants / resolution
                              │
       ┌──────────────┬───────┼─────────┬──────────────┐
       ▼              ▼       ▼         ▼              ▼
  baobab-tms     trade-docs   ERP   regulations       IAM
   logistics      documents finance    rules         identity
       │              │       │         │              │
       └──────────────┴───────┼─────────┴──────────────┘
                              │
                 other Baobab capabilities
                              │
           ┌──────────────────┼──────────────────┐
           ▼                  ▼                  ▼
          CMS               Pulse              Trade
        content         intelligence         commerce
```

The governing principle is:

> **Thamani owns the logistics business experience and Thamani-specific commercial orchestration; reusable platform engines own reusable domain capabilities.**

---

# 2. Why This Decision Is Required Now

When ADR-THA-0003 through ADR-THA-0006 were written, the dedicated:

```text
baobab-tms
baobab-trade-docs
```

engine repositories did not yet have substantive architecture.

Both repositories now exist.

As of this decision they remain Foundation-0 scaffolds rather than implemented production engines.

Their creation nevertheless changes the correct domain boundary.

Without this ADR, Thamani risks becoming the accidental owner of reusable concepts such as:

```text
Shipment
Consignment
Transport Plan
Transport Movement
Transport Booking
Carrier Capacity
Tracking Event
Customs Case
Trade Document
```

That would contradict Baobab's capability-centric architecture.

---

# 3. Governing Baobab Principle

ADR-BCP-002 establishes:

> Digital Estates consume capabilities. Engines provide capabilities.

Thamani SHALL conform to this principle.

This means Thamani SHALL NOT fundamentally depend upon:

```text
baobab-tms
baobab-trade-docs
baobab-erp
baobab-regulations
```

by implementation name.

Instead it consumes stable capabilities such as:

```text
logistics.*
documents.*
customs.*
finance.*
regulations.*
identity.*
content.*
intelligence.*
```

once those capabilities are registered and production-certified through Shared and Control Plane governance.

---

# 4. Engine Name Is Not Capability Identity

This SHALL remain non-negotiable:

```text
baobab-tms
    !=
logistics capability

baobab-trade-docs
    !=
document capability

baobab-erp
    !=
finance capability
```

An engine is a provider.

A capability describes what Baobab can do.

Therefore:

```text
Capability
     │
     ▼
CapabilityProvider
     │
     ▼
Engine
     │
     ▼
EngineRelease
     │
     ▼
EngineInstance
```

SHALL remain the platform relationship.

---

# 5. Control Plane Resolution

Thamani SHALL resolve capabilities through the Control Plane according to:

```text
tenant
legal entity
Digital Estate
market
jurisdiction/context
entitlement
scope
binding
provider eligibility
provider health
contract compatibility
isolation
residency
effective time
```

Thamani SHALL NOT hard-code:

```text
if logistics:
    call https://baobab-tms
```

as its canonical architecture.

---

# 6. Provider-Neutral Consumption

The architecture SHALL permit:

```text
logistics.shipment.manage
        │
        ▼
baobab-tms
```

today, while still permitting a future approved provider to satisfy the same capability where architecture permits.

Similarly:

```text
documents.trade.manage
        │
        ▼
baobab-trade-docs
```

SHALL represent a provider relationship, not permanent capability identity.

---

# 7. Thamani Is a Digital Estate

The Thamani repository SHALL own:

```text
public Thamani experience

customer portal

partner portal

operations portal

division-oriented experience

Thamani navigation

Thamani design system

Thamani brand

customer workflow composition

customer-facing service abstractions

Thamani-specific orchestration policy

presentation projections

BFF / application composition where required
```

---

# 8. Thamani Is Not the Canonical Runtime for Reusable Logistics Facts

Thamani SHALL NOT become authoritative for reusable runtime facts such as:

```text
transport movement state

carrier booking state

route execution

vehicle assignment

container assignment

customs declaration state

regulatory determination

ERP accounting state

authentication state
```

merely because the Thamani UI displays them.

---

# 9. Business Composition vs Domain Authority

This distinction SHALL remain:

```text
THAMANI BUSINESS
        │
        ▼
composes many capabilities
```

while:

```text
DOMAIN ENGINE
        │
        ▼
owns authoritative domain behaviour
```

A business process may span many engines without any one engine owning the entire customer journey.

---

# 10. Primary Domain-Authority Matrix

The target authority matrix SHALL be:

| Domain concern                                    | Primary authority                        |
| ------------------------------------------------- | ---------------------------------------- |
| Thamani service portfolio and divisional offering | Thamani                                  |
| Customer logistics RFQ                            | Thamani                                  |
| Customer-facing logistics quotation               | Thamani                                  |
| Customer sell price                               | Thamani commercial domain                |
| Thamani margin policy                             | Thamani commercial domain                |
| Customer service order                            | Thamani                                  |
| Canonical organisation                            | Control Plane                            |
| Counterparty identity                             | Control Plane                            |
| Platform tenant/legal-entity context              | Control Plane                            |
| Capability grants/bindings/resolution             | Control Plane                            |
| Human/workload authentication                     | IAM                                      |
| Shipment execution                                | TMS                                      |
| Consignment execution                             | TMS                                      |
| Transport planning                                | TMS                                      |
| Routes/corridors operational model                | TMS                                      |
| Transport movements/legs/calls                    | TMS                                      |
| Carrier booking                                   | TMS                                      |
| Capacity/resource assignment                      | TMS                                      |
| Transport events                                  | TMS                                      |
| Customs case workflow                             | Trade Docs                               |
| Customs declaration workflow                      | Trade Docs                               |
| Trade-document lifecycle                          | Trade Docs                               |
| Document dossier                                  | Trade Docs                               |
| Customs authority messages                        | Trade Docs projection of authority facts |
| Regulatory applicability                          | Regulations                              |
| Regulatory decision                               | Regulations                              |
| Customs/product classification decision           | Regulations                              |
| Regulatory requirement determination              | Regulations                              |
| Accounting                                        | ERP                                      |
| AR/AP                                             | ERP                                      |
| General ledger                                    | ERP                                      |
| Financial asset accounting                        | ERP                                      |
| Final financial actual costs                      | ERP                                      |
| Authentication/session state                      | IAM                                      |
| Public/editorial content                          | CMS                                      |
| Predictive/logistics intelligence                 | Pulse                                    |
| Commerce/cart/order where applicable              | Trade                                    |

---

# 11. Authority Is Per Fact, Not Per Screen

A screen MAY display:

```text
shipment
customs state
invoice
documents
ETA
exceptions
```

simultaneously.

This SHALL NOT imply Thamani owns those facts.

Example:

```text
THAMANI CUSTOMER SHIPMENT SCREEN

Shipment State        ← TMS
Customs State         ← Trade Docs
Regulatory Block      ← Regulations
Invoice               ← ERP
Documents             ← Trade Docs
Predicted ETA         ← Pulse / TMS projection
Customer Service Note ← Thamani
```

---

# 12. System of Record Is Not One Database

The phrase:

```text
System of Record
```

SHALL be interpreted at the domain/fact level.

There SHALL NOT be one universal:

```text
THAMANI DATABASE
```

containing authoritative copies of all Baobab data.

---

# 13. Authoritative Fact

An Authoritative Fact is a fact for which one domain has primary authority.

Examples:

```text
Movement departed
        → TMS

Customs release received
        → Trade Docs projection of authority response

Import prohibited
        → Regulations decision

Invoice posted
        → ERP

User authenticated
        → IAM
```

---

# 14. Projection

Thamani MAY maintain local projections for:

```text
performance
UX
search
dashboard rendering
notification
offline composition
```

provided that projections retain source identity and SHALL NOT become competing authority.

---

# 15. Projection Model

Conceptually:

```text
Authoritative Engine
        │
        ▼
Canonical API / Event
        │
        ▼
Thamani Projection
        │
        ▼
User Experience
```

The projection MAY be rebuilt.

The authoritative source MUST remain recoverable.

---

# 16. No Shadow Domain Databases

This SHALL be prohibited:

```text
Thamani Shipment
and
TMS Shipment
```

as independently editable authoritative aggregates.

Likewise:

```text
Thamani Invoice
and
ERP Invoice
```

SHALL NOT represent two competing financial truths.

---

# 17. Local Reference Is Permitted

Thamani MAY store:

```text
canonical shipment ID

customs case ID

invoice ID

organisation ID

document ID

regulatory decision ID
```

plus read projections.

This is not duplication of authority.

---

# 18. THA-0005 Authority Reallocation

ADR-THA-0005 remains historically valuable and continues to define Thamani's understanding of transport semantics.

However, its assertion that:

```text
Thamani Logistics Execution Domain
```

is the target operational authority SHALL be superseded in part.

The target reusable authority becomes:

```text
bound logistics capability provider
```

with:

```text
baobab-tms
```

as the intended first-party implementation.

---

# 19. THA-0005 Concepts Rehomed to TMS

The following concepts SHOULD become foundational `baobab-tms` architecture:

```text
Shipment
Consignment
ConsignmentItem
TransportPlan
TransportRoute
TransportMovement
TransportLeg
TransportCall
TransportBooking
TransportEvent
Milestone
Delivery execution
```

Thamani SHALL consume those concepts through canonical capability contracts.

---

# 20. THA-0006 Is Split Across Boundaries

ADR-THA-0006 SHALL remain partly authoritative for Thamani.

Thamani retains authority over:

```text
customer RFQ

customer quotation

customer sell rate

customer contract

commercial approval

Thamani margin policy

discount policy

customer service order

quoted margin
```

---

# 21. Transport Costing Moves Toward TMS

Transport-domain concerns SHOULD move toward TMS where reusable:

```text
carrier rate request

carrier buy rate

transport operating cost estimate

route-related cost

capacity-related cost

distance-related charge basis

transport accessorial input

provider transport quote

expected movement cost
```

These facts MAY then feed Thamani commercial pricing.

---

# 22. Customer Price Does Not Belong to TMS

This SHALL remain:

```text
TMS expected transport cost
        !=
Thamani customer sell price
```

TMS SHALL NOT become Thamani's universal pricing or margin engine.

---

# 23. THA-0007 Resource Semantics Move to TMS

The reusable concepts developed for THA-0007 belong predominantly in `baobab-tms`:

```text
TransportResource

TransportMeans

TransportEquipment

Capacity

CapacityReservation

ResourceAssignment

Fleet operational projection

Availability

Serviceability

Dispatch

movement-resource assignment
```

---

# 24. Asset Strategy Remains Thamani Business Architecture

Thamani still decides whether its business is:

```text
asset-light

asset-owning

hybrid
```

This strategic decision remains in Thamani.

Operational resource management belongs to TMS.

Financial fixed-asset authority belongs to ERP.

---

# 25. Resource Authority Split

The relationship SHALL be:

```text
THAMANI
business ownership strategy
        │
        ▼
TMS
operational resource / capacity state
        │
        ▼
ERP
financial asset state
```

---

# 26. THA-0008 Becomes Composition Architecture

ADR-THA-0008 SHALL remain a Thamani decision because cross-border logistics is a Thamani business service.

However, its engine-internal concepts SHALL be rehomed.

Target:

```text
Thamani Cross-Border Service
        │
        ├── TMS
        │    transport execution
        │
        ├── Trade Docs
        │    document/customs execution
        │
        ├── Regulations
        │    regulatory decisions
        │
        └── ERP
             financial consequences
```

---

# 27. TMS Authority

`baobab-tms`, once properly architected, certified and bound, SHOULD become the first-party provider for reusable transport-management capabilities.

Target authority includes:

```text
shipment execution

consignment execution

transport planning

routing

corridor operational modelling

movement

leg

transport call

carrier booking

resource/capacity assignment

dispatch

transport tracking

transport execution exceptions
```

---

# 28. TMS Does Not Own

TMS SHALL NOT become authoritative for:

```text
customer contract

Thamani customer sell price

general ledger

customs law

trade-document legal identity

authentication

CMS content

customer relationship master

regulatory rules
```

---

# 29. Trade Docs Authority

`baobab-trade-docs`, once properly architected and certified, SHOULD become the first-party reusable provider for:

```text
trade-document identity

document lifecycle

document version

document dossier

customs case

declaration preparation

declaration workflow

authority submission

authority response normalisation

transit documentary workflow

supporting documents

document/evidence relationships
```

---

# 30. Trade Docs Does Not Own

Trade Docs SHALL NOT own:

```text
regulatory interpretation

customs sovereign authority

physical transport execution

customer margin

general ledger

canonical organisation identity
```

---

# 31. Regulations Authority

`baobab-regulations` SHALL remain authoritative for:

```text
regulatory applicability

regulatory decisions

classification decisions

required permits

required documents

rules of origin

prohibitions

conditional permissions

effective-dated regulatory requirements

decision explanation
```

---

# 32. Regulations Does Not Execute Customs Submission

This SHALL remain:

```text
Regulations
    decides requirement

Trade Docs
    executes document/customs workflow
```

---

# 33. ERP Authority

ERP SHALL remain authoritative for:

```text
accounts receivable

accounts payable

customer invoice

provider invoice

general ledger

financial actual costs

tax accounting consequences

fixed-asset accounting

financial settlement projections
```

---

# 34. Operational Cost vs ERP Actual

This SHALL remain:

```text
TMS operational expected cost
        !=
ERP actual accounting cost
```

Thamani commercial analytics may compare both.

---

# 35. IAM Authority

IAM SHALL own:

```text
authentication

credential management

session

MFA / passkeys

workload identity

identity-side organisation membership projection

token issuance
```

---

# 36. IAM Does Not Own Business Authorization Entirely

Business-level decisions such as:

```text
may approve this quote

may dispatch this shipment

may submit this declaration

may view provider buy rates
```

belong to the relevant domain/application authorization model using authenticated IAM identity.

---

# 37. CMS Authority

CMS SHALL own:

```text
public service pages

articles

guides

corporate content

division content

corridor editorial content

FAQs
```

It SHALL not own:

```text
shipment
quote
declaration
invoice
```

transaction state.

---

# 38. Pulse Authority

Pulse SHALL provide non-authoritative intelligence such as:

```text
ETA predictions

corridor risk

provider-performance intelligence

rate trends

capacity intelligence

exception risk

congestion intelligence
```

---

# 39. Prediction Is Not Operational Fact

This SHALL remain:

```text
Pulse ETA
    !=
TMS actual arrival
```

and:

```text
Pulse risk recommendation
    !=
Regulations prohibition
```

---

# 40. Trade Boundary

`baobab-trade` SHALL remain relevant where Thamani participates in actual commerce/trade workflows.

It SHALL NOT remain a mandatory dependency merely because the old Thamani estate was B2C commerce.

---

# 41. Logistics Customer Need Not Use Trade

Example:

```text
Mining Company
      │
      ▼
Thamani Project Logistics
      │
      ▼
TMS
```

requires no commerce storefront.

---

# 42. Trade Customer May Use Thamani

Example:

```text
ZuriBeans
    │
    ▼
Baobab Trade
    │
    ▼
Thamani Logistics Service
    │
    ▼
TMS
```

Trade retains commerce/trade authority.

TMS retains physical logistics execution.

---

# 43. Warehouse Boundary Is Deliberately Not Forced Into TMS

This ADR SHALL NOT declare TMS authoritative for detailed warehouse execution such as:

```text
bin

locator

putaway

pick

pack

cycle count

wave

warehouse labour
```

Those concerns may justify:

```text
ERP/WMS capability
or
a future dedicated warehouse engine
```

depending on architecture.

---

# 44. TMS May Coordinate Warehouse Handoffs

TMS MAY own transport-facing events such as:

```text
cargo ready

dock appointment

pickup requested

loaded

departed warehouse
```

without owning the warehouse-management system.

---

# 45. 3PL Is Not One Engine

A Thamani 3PL service may compose:

```text
TMS
+
warehouse capability
+
Trade Docs
+
ERP
+
customer service
```

Therefore:

```text
3PL
    !=
TMS
```

---

# 46. 4PL Is Definitely Not One Engine

Thamani 4PL SHALL remain primarily a business orchestration capability.

Conceptually:

```text
                     THAMANI 4PL
                         │
             ┌───────────┼────────────┐
             ▼           ▼            ▼
          TMS         Warehouse     Trade Docs
             │           │            │
             ├──────┬────┴──────┬─────┤
             ▼      ▼           ▼     ▼
          Carrier   3PL      Customs  ERP
             │
             ▼
      external providers
```

---

# 47. Control Tower Is a Projection and Orchestration Layer

The Thamani 4PL control tower MAY aggregate:

```text
orders

shipments

inventory

customs

documents

costs

exceptions

predictions
```

It SHALL not become the source of truth for each domain.

---

# 48. Cross-Engine Business Process

A normal customer workflow MAY be:

```text
Customer RFQ
     │
     ▼
THAMANI
quote / contract / service order
     │
     ▼
CONTROL PLANE
resolve capabilities
     │
     ├──────────────► REGULATIONS
     │                  requirements
     │
     ├──────────────► TRADE DOCS
     │                  documents/customs
     │
     ├──────────────► TMS
     │                  transport execution
     │
     └──────────────► ERP
                        financial consequences
```

---

# 49. Application Layer

Thamani SHALL use an application/composition boundary between leaf UI components and engine capabilities.

The architecture SHOULD resemble:

```text
React / Next.js UI
       │
       ▼
Thamani Application / BFF Layer
       │
       ▼
Capability Client / Resolver
       │
       ▼
Control Plane
       │
       ▼
Resolved Provider
```

---

# 50. Leaf Components Shall Not Know Engines

This SHALL be avoided:

```text
<Button
  onClick={() => callBaobabTmsDirectly()}
/>
```

Leaf UI components SHOULD invoke Thamani application abstractions.

---

# 51. Server-First Integration

Where consistent with the Thamani technology architecture:

```text
browser
   │
   ▼
Thamani server/application boundary
   │
   ▼
Baobab capabilities
```

SHOULD be preferred to exposing internal engine topology directly to browsers.

---

# 52. Browser Shall Not Resolve Engine Topology

The browser SHALL NOT receive unnecessary:

```text
engine instance addresses

internal topology

service credentials

authority credentials

provider secrets
```

---

# 53. Capability Client

Thamani SHOULD introduce a stable capability-access layer conceptually similar to:

```text
src/lib/baobab/
├── context
├── capabilities
├── logistics
├── documents
├── regulations
├── finance
├── identity
└── intelligence
```

Exact implementation is not prescribed.

---

# 54. No Vendor-Named Application Boundary

This SHOULD be avoided:

```text
src/lib/medusa
src/lib/idempiere
src/lib/tms
```

as the primary architectural surface exposed to business features.

Provider-specific adapters MAY exist beneath capability abstractions.

---

# 55. Capability Composition

Some Thamani features require multiple capabilities.

Example:

```text
Cross-Border Booking
      │
      ├── commercial quotation
      ├── logistics planning
      ├── regulations assessment
      ├── trade documents
      ├── customs workflow
      └── finance
```

Thamani owns composition of the customer journey.

---

# 56. Composition Is Not Domain Duplication

Thamani MAY coordinate:

```text
Create service order
      ↓
request transport plan
      ↓
request regulatory assessment
      ↓
request document workflow
```

without maintaining its own competing:

```text
TransportPlan
RegulatoryDecision
CustomsCase
```

aggregates.

---

# 57. Orchestration vs Choreography

Both MAY be used.

Use orchestration where:

```text
customer workflow requires explicit coordination
long-running process requires state
human intervention is expected
failure recovery requires process visibility
```

Use event choreography where:

```text
one domain fact naturally informs another
loose coupling is sufficient
no central coordinator is required
```

---

# 58. No Universal Saga in Thamani

This ADR SHALL NOT require every cross-engine operation to be managed by one giant Thamani Saga.

Process ownership SHALL remain business-workflow specific.

---

# 59. Distributed Transactions

Thamani SHALL NOT depend on distributed ACID transactions across engines.

The architecture SHOULD use:

```text
local transaction

outbox/event

idempotency

durable workflow

reconciliation

compensation
```

where cross-engine coordination is required.

---

# 60. Canonical IDs

Cross-engine relationships SHALL use:

```text
canonical IDs

external references

mappings

correlation IDs

causation IDs
```

according to Shared/Control Plane contracts.

---

# 61. Native IDs Shall Not Leak as Universal Identity

This SHALL remain prohibited:

```text
shipment_id = tms_database_primary_key
```

as a universal cross-platform assumption.

---

# 62. Context Propagation

Every capability invocation SHALL preserve sufficient context such as:

```text
tenant

legal entity

Digital Estate

market

actor

correlation

jurisdiction where applicable

effective time where applicable
```

according to canonical contracts.

---

# 63. Tenant and Legal Entity

Thamani Global remains the tenant/legal-entity context applicable to its operations according to Control Plane architecture.

Thamani's twelve divisions SHALL NOT become separate tenants merely because they invoke different capabilities.

---

# 64. Divisions Are Business Dimensions

Examples:

```text
Haulage
Shipping
Customs Brokerage
3PL
4PL
```

MAY be reflected as:

```text
business unit

commercial reporting dimension

cost/profit centre

service portfolio classification
```

without changing canonical legal identity.

---

# 65. Capability Entitlement Is Explicit

The fact that Thamani's business wants a capability SHALL NOT mean it automatically has a production entitlement.

The sequence remains:

```text
Capability exists
        !=
Thamani entitled
        !=
Provider supports
        !=
Provider certified
        !=
Binding active
        !=
Healthy instance
        !=
Resolution successful
```

---

# 66. New TMS Repository Does Not Create Entitlement

This SHALL remain:

```text
baobab-tms repository exists
        !=
Thamani can use production logistics capability
```

The provider must complete:

```text
architecture
implementation
contracts
certification
registration
deployment
binding
resolution
```

---

# 67. Same for Trade Docs

Likewise:

```text
baobab-trade-docs repository exists
        !=
production customs/document capability available
```

---

# 68. Fail-Closed Capability Resolution

If Thamani requires:

```text
logistics shipment execution
```

and no eligible provider resolves, the system SHALL NOT silently:

```text
fall back to Thamani local database
```

and create an ungoverned alternative authority.

---

# 69. Transitional Architecture

Until TMS and Trade Docs become production-capable, existing or temporary functionality MAY remain where already implemented.

Such interim placement SHALL be explicitly marked:

```text
TRANSITIONAL
```

and SHALL NOT become architectural precedent.

---

# 70. Transition Rule

Temporary functionality MAY remain in:

```text
Thamani

Trade

ERP
```

only where necessary to preserve working behaviour during migration.

Each transitional owner SHALL have:

```text
target authority
migration condition
compatibility contract
sunset criteria
```

---

# 71. No Big-Bang Migration Required

The re-homing SHALL proceed capability-by-capability.

Example:

```text
Shipment Read
    → TMS

Shipment Create
    → TMS

Route Planning
    → TMS

Tracking
    → TMS
```

may become available progressively.

---

# 72. Consumer-First Compatibility

Before changing canonical producers/events:

```text
consumers
    SHALL accept the new contract
before
producer switches
```

consistent with Shared event-migration architecture.

---

# 73. Event Authority

Events SHALL be emitted by the domain that owns the fact.

Examples:

```text
logistics.movement.departed
        → TMS

customs.declaration.submitted
        → Trade Docs

regulations.compliance-assessment.decided
        → Regulations

finance.invoice.posted
        → ERP
```

---

# 74. Thamani Event Context

Thamani SHALL emit events only for facts it genuinely owns.

Examples MAY include:

```text
customer logistics RFQ submitted

customer quote issued

customer quote accepted

Thamani service order created

customer service exception acknowledged
```

Final context/event naming requires Shared governance.

---

# 75. Thamani Shall Not Re-Emit Domain Facts as If Authoritative

This SHOULD be avoided:

```text
TMS emits movement departed

Thamani emits another canonical
"shipment departed"
representing the same fact
```

A customer-projection event MAY exist if semantically different.

---

# 76. Public Tracking

Thamani MAY expose customer-friendly tracking based upon TMS facts.

Example:

```text
TMS:
movement.departed

Thamani projection:
Your shipment is on the way
```

The projection SHALL retain source lineage.

---

# 77. Notifications

Notification orchestration MAY be Thamani-owned when it represents customer-experience policy.

The underlying triggering fact remains owned by its source domain.

---

# 78. Search

Thamani MAY maintain searchable indexes/projections of:

```text
shipment reference

quote reference

invoice reference

customs case reference
```

for UX.

Search indexes SHALL not become authoritative business stores.

---

# 79. Cache

Caching SHALL preserve:

```text
source

freshness

tenant scope

authorization

invalidation strategy
```

where stale data could materially affect operations.

---

# 80. Commands Require Authoritative Routing

A command such as:

```text
Cancel Transport Booking
```

SHALL route to the authoritative capability provider.

Thamani SHALL not update a local projection to simulate cancellation.

---

# 81. Projection Update Does Not Equal Command Success

This SHALL remain:

```text
UI state changed
    !=
domain command committed
```

The authoritative domain response/event determines success.

---

# 82. Engine Failure

If TMS is unavailable:

```text
shipment execution state
```

SHALL not be invented by Thamani.

Thamani MAY display:

```text
temporarily unavailable
last known state
pending update
```

according to UX policy.

---

# 83. Stale Read

A projection SHOULD be able to distinguish:

```text
CURRENT

POTENTIALLY_STALE

UNAVAILABLE

RECONCILIATION_REQUIRED
```

where operational significance warrants it.

---

# 84. Reconciliation

Thamani SHOULD reconcile local projections against authoritative engines.

Example:

```text
Projection:
Shipment IN_TRANSIT

TMS:
Shipment DELIVERED

        │
        ▼
Projection reconciliation
```

not:

```text
last writer wins across databases
```

---

# 85. Manual Correction

A Thamani operator SHALL NOT manually alter an authoritative TMS fact merely through Thamani's database.

The application should route:

```text
correction request
```

to the owning domain's governed correction process.

---

# 86. Domain-Specific Authorization

The owning engine SHALL remain responsible for fine-grained domain rules.

For example:

```text
IAM:
actor authenticated

Thamani:
actor can access operations portal

TMS:
actor may reassign movement

Trade Docs:
actor may submit declaration

ERP:
actor may approve financial posting
```

---

# 87. System-of-Record Matrix

The following shall guide implementation:

| Object / fact                        | System of authority                                 |
| ------------------------------------ | --------------------------------------------------- |
| Thamani RFQ                          | Thamani                                             |
| Thamani Quote                        | Thamani                                             |
| Thamani Customer Contract            | Thamani / contract capability where later separated |
| Customer Sell Price                  | Thamani                                             |
| Service Order                        | Thamani                                             |
| Canonical Organisation               | CP                                                  |
| Capability Grant                     | CP                                                  |
| Capability Binding                   | CP                                                  |
| Capability Resolution                | CP                                                  |
| Human Identity                       | IAM                                                 |
| Shipment Execution                   | TMS                                                 |
| Consignment                          | TMS                                                 |
| Transport Plan                       | TMS                                                 |
| Route / Corridor execution           | TMS                                                 |
| Movement / Leg / Call                | TMS                                                 |
| Booking                              | TMS                                                 |
| Transport Resource assignment        | TMS                                                 |
| Transport Event                      | TMS                                                 |
| Transport ETA operational projection | TMS                                                 |
| Predictive ETA                       | Pulse or TMS intelligence adapter                   |
| Customs Case                         | Trade Docs                                          |
| Customs Declaration                  | Trade Docs                                          |
| Trade Document                       | Trade Docs                                          |
| Document Dossier                     | Trade Docs                                          |
| Regulatory Requirement               | Regulations                                         |
| Regulatory Decision                  | Regulations                                         |
| Classification Decision              | Regulations                                         |
| External Customs Decision            | Competent authority; projected by Trade Docs        |
| Customer Invoice                     | ERP                                                 |
| Provider Payable                     | ERP                                                 |
| GL Entry                             | ERP                                                 |
| Fixed Asset Financial Record         | ERP                                                 |
| Public Content                       | CMS                                                 |
| AI/Analytics Insight                 | Pulse                                               |
| Commerce Order                       | Trade                                               |
| Commerce Fulfilment                  | Trade                                               |
| Customer Portal Projection           | Thamani                                             |
| Operations Control-Tower Projection  | Thamani                                             |

---

# 88. Authority of External Regulators

No internal Baobab engine SHALL become sovereign authority.

For Customs:

```text
Competent Customs Authority
        │
        ▼
authoritative external decision
        │
        ▼
Trade Docs
records / normalises / evidences
```

For other regulators the same principle applies.

---

# 89. Provider Authority vs Legal Authority

This distinction SHALL remain:

```text
Trade Docs owns
CustomsCase workflow

Customs Authority owns
legal Customs decision
```

and:

```text
Regulations owns
Baobab regulatory assessment

Regulator owns
source law / authoritative external act
```

---

# 90. Operational SOR vs External Authority

An internal engine may be the authoritative Baobab record without being the legal issuer.

Example:

```text
Trade Docs
    authoritative Baobab projection

Customs Authority
    external legal authority
```

---

# 91. Canonical Contract Boundary

`baobab-platform/shared` SHALL define only the contracts required across engine boundaries.

Shared SHALL NOT become:

```text
TMS domain implementation

document runtime

ERP runtime

Thamani application state
```

---

# 92. Avoid Over-Generalisation

Not every internal object needs a Shared schema.

Example:

```text
TMS internal route optimisation candidate
```

need not become a platform contract unless another bounded context genuinely consumes it.

---

# 93. Shared Contract Promotion Rule

A domain object SHOULD move into Shared only when it is:

```text
cross-engine

semantically stable

provider-neutral

architecture-approved
```

---

# 94. TMS ADR Authority

Once `baobab-tms` foundational ADRs are accepted, they SHALL become authoritative for reusable transport-domain behaviour.

Where a TMS ADR supersedes detailed transport semantics from THA-0005/0007:

```text
TMS ADR
    governs reusable engine semantics

THA ADR
    governs how Thamani consumes them
```

---

# 95. Trade Docs ADR Authority

The same principle applies to Trade Docs.

Its ADRs SHALL own:

```text
reusable document/customs domain behaviour
```

while Thamani ADRs own:

```text
Thamani service composition and UX
```

---

# 96. Regulatory ADR Authority

Existing ADR-REG decisions SHALL remain authoritative over regulatory semantics.

Thamani SHALL NOT rewrite regulatory meaning merely because it needs a simpler UX.

---

# 97. Cross-Repository Change Discipline

A Thamani requirement that changes a reusable platform contract SHALL be implemented through:

```text
1. architecture decision in owning domain
2. Shared contract change where cross-engine
3. provider implementation
4. capability certification/registration
5. Thamani consumer adaptation
```

not:

```text
change Thamani frontend
and infer everyone else must follow
```

---

# 98. Business-Division Mapping

Thamani divisions MAY consume platform capabilities as follows:

| Thamani division       | Principal platform capabilities                      |
| ---------------------- | ---------------------------------------------------- |
| Haulage                | TMS, ERP, IAM, Pulse                                 |
| Shipping               | TMS, Trade Docs, Regulations, ERP, Pulse             |
| Freight Forwarding     | TMS, Trade Docs, Regulations, ERP                    |
| Customs Brokerage      | Trade Docs, Regulations, ERP, IAM                    |
| Warehousing            | Warehouse capability, ERP, IAM, TMS handoffs         |
| 3PL                    | TMS, warehouse capability, ERP, Trade Docs           |
| Courier                | TMS, ERP, IAM                                        |
| Last Mile              | TMS, IAM, ERP                                        |
| Cold Chain             | TMS, Regulations, telemetry/intelligence, Trade Docs |
| Project Logistics      | TMS, Regulations, Trade Docs, ERP                    |
| Cross-Border Logistics | TMS, Trade Docs, Regulations, ERP                    |
| 4PL                    | Broad capability composition/control tower           |

This mapping is indicative, not an entitlement registry.

---

# 99. Division Does Not Determine Provider

Example:

```text
Thamani Shipping
```

does not imply:

```text
provider = baobab-tms
```

for every capability it needs.

It may consume:

```text
TMS
Trade Docs
Regulations
ERP
Pulse
```

simultaneously.

---

# 100. Digital Estate Independence

Thamani SHALL remain independently deployable.

A deployment of the frontend SHALL not require deploying all Baobab engines in the same process.

---

# 101. Polyrepo Boundary

Each engine SHALL remain independently:

```text
versioned

tested

deployed

observed

scaled

released

certified
```

according to Baobab platform standards.

---

# 102. No Shared Release Train Requirement

Thamani SHALL NOT require:

```text
TMS vX
Trade Docs vY
ERP vZ
```

to be deployed in one monolithic release.

Compatibility is governed by contracts and capability versions.

---

# 103. Contract Version Compatibility

Capability resolution SHALL consider compatible contract versions.

A provider SHALL not resolve merely because it claims the right capability name.

---

# 104. Engine Health

The Control Plane SHALL consider provider/engine health according to its accepted architecture.

Thamani SHALL not maintain a competing global engine-health registry.

---

# 105. Observability Boundary

Each engine owns operational observability for its runtime.

Thamani owns:

```text
customer journey observability

application/BFF observability

composition failures
```

---

# 106. Cross-Engine Trace

All significant workflows SHOULD support correlation across:

```text
Thamani

Control Plane

TMS

Trade Docs

Regulations

ERP

external provider
```

without leaking sensitive payloads into telemetry.

---

# 107. Customer Journey Trace

For a customer case, operations SHOULD eventually be able to trace:

```text
RFQ
→ Quote
→ Service Order
→ Shipment
→ Regulatory Assessment
→ Documents
→ Customs
→ Movement
→ Delivery
→ Invoice
```

using references rather than one mega-record.

---

# 108. No Mega Logistics Aggregate

This SHALL remain prohibited:

```text
ThamaniLogisticsTransaction {
    customer
    quote
    shipment
    truck
    customs
    documents
    regulations
    invoice
    payment
}
```

as one canonical mutable aggregate.

---

# 109. Control-Tower Read Model Is Permitted

A read model may expose exactly that joined view for operations.

The difference is authority.

```text
Read Model
    joins authoritative facts

Mega Aggregate
    claims ownership of all facts
```

Only the first is accepted.

---

# 110. Cross-Engine Failure

Cross-engine operations SHALL represent partial progress.

Example:

```text
Service Order created       YES
TMS Shipment created        YES
Regulatory assessment       YES
Trade Docs case             FAILED
```

The platform SHALL not pretend:

```text
entire transaction never happened
```

if earlier authoritative actions committed.

---

# 111. Compensation

Recovery MAY require:

```text
cancel booking

hold movement

close unused case

re-run document creation

notify customer

manual review
```

depending on workflow.

---

# 112. Retry

Retries SHALL be:

```text
idempotent

bounded

observable

domain-aware
```

A retry SHALL not duplicate:

```text
shipment

declaration

invoice

booking
```

---

# 113. Transitional Medusa Removal

Legacy Thamani architecture assumed:

```text
Baobab Trade / Medusa
=
primary business backend
```

That assumption is superseded.

Baobab Trade MAY still provide selected capabilities.

It is no longer Thamani's universal backend.

---

# 114. Thamani Repository Refactoring Implication

Existing Thamani code SHOULD eventually be classified:

```text
THAMANI EXPERIENCE

THAMANI COMMERCIAL DOMAIN

PLATFORM CAPABILITY CLIENT

LEGACY COMMERCE

MIGRATE TO TMS

MIGRATE TO TRADE DOCS

MIGRATE TO REGULATIONS

MIGRATE TO ERP

REMOVE
```

---

# 115. Do Not Refactor Prematurely

Code SHALL NOT be moved solely because its name resembles a future engine concept.

Migration requires:

```text
target ADR

target contract

target runtime

compatibility path

tests

migration plan
```

---

# 116. Legacy Data

Historical Thamani data SHALL be assessed before migration.

It MAY contain:

```text
real operational data

test data

mock data

obsolete B2C data

supplier onboarding data

duplicate projections
```

Each category requires an explicit disposition.

---

# 117. No Blind Table Migration

This is prohibited:

```text
copy thamani.shipments
to tms.shipments
```

without semantic reconciliation.

---

# 118. Capability Migration

Migration SHALL be capability-oriented.

Example:

```text
Current:
Thamani owns temporary shipment projection

Target:
TMS owns canonical shipment

Migration:
1. establish contract
2. import/reconcile canonical records
3. dual-read compatibility if necessary
4. consumer migration
5. producer switch
6. retire old authority
```

---

# 119. Event Migration

Historical events SHALL not be rewritten merely to fit the new producer taxonomy.

Shared event migration rules SHALL govern.

---

# 120. Future Thamani ADR Scope

After this ADR, new Thamani ADRs SHOULD focus on:

```text
Thamani business capability

service composition

customer experience

operational organisation

commercial policy

business governance

control-tower composition
```

rather than defining reusable engine internals.

---

# 121. Future TMS ADR Scope

TMS ADRs SHOULD focus on:

```text
shipment execution

consignment

planning

routing

corridors

movements

bookings

capacity

transport resources

dispatch

tracking

transport exceptions

carrier integration

transport costing

multimodal interoperability
```

---

# 122. Future Trade Docs ADR Scope

Trade Docs ADRs SHOULD focus on:

```text
document semantics

document lifecycle

customs case

declaration

transit

authority adapter

signature

evidence

document provenance

regulatory-document interaction

retention
```

---

# 123. Outstanding Thamani ADRs

The Thamani ADR programme SHALL continue, but the scope is revised.

The recommended remaining Thamani-specific decisions are:

```text
ADR-THA-0010
Warehousing, 3PL and Inventory-Custody
Service Composition Boundary

ADR-THA-0011
Cold Chain, Dangerous Goods and
Special-Cargo Service Boundary

ADR-THA-0012
Project Logistics and Heavy /
Abnormal Cargo Service Architecture

ADR-THA-0013
4PL Control Tower, Provider Selection
and Multi-Provider Orchestration

ADR-THA-0014
Thamani Digital Estate,
Customer / Partner / Operations Experience

ADR-THA-0015
Customer Service Management,
Exceptions, Claims and Service Recovery

ADR-THA-0016
Thamani Operational Governance,
SLA and Division Performance Architecture
```

This sequence MAY be refined as engine ADRs mature.

---

# 124. Tracking ADR Reallocation

The previously proposed:

```text
Tracking, Milestones, Telemetry,
Exceptions, POD and Claims
```

SHALL no longer remain one Thamani ADR.

It SHALL be decomposed approximately as:

```text
TMS
    tracking
    milestones
    telemetry
    execution exceptions

Trade Docs
    documentary POD / evidence lifecycle

Thamani
    customer claim
    service recovery
    customer communication

ERP
    financial settlement / credit / debit consequences
```

---

# 125. Cold-Chain ADR Reallocation

The Thamani cold-chain ADR SHOULD define:

```text
service proposition

customer requirements

division responsibility

composed capability requirements

quality governance
```

while:

```text
TMS
    temperature-aware execution

Regulations
    regulatory requirements

Trade Docs
    certificates/evidence

Pulse
    intelligence/anomaly detection
```

own their respective domain behaviours.

---

# 126. Project Logistics ADR Reallocation

Thamani SHALL define the commercial/service architecture for project logistics.

TMS SHALL define reusable:

```text
heavy-haul execution

special-resource planning

movement execution

route/resource constraints
```

where applicable.

---

# 127. 4PL ADR Remains Strongly Thamani-Specific

The 4PL decision SHALL remain in Thamani because it answers:

> How does Thamani act as lead logistics orchestrator for a customer?

not:

> How does the TMS execute transport?

---

# 128. Alternatives Considered

## Alternative A — Keep All Existing Logistics Architecture in Thamani

**Rejected.**

It would make a Digital Estate the canonical platform logistics engine.

---

## Alternative B — Move Everything to TMS

**Rejected.**

TMS does not own customer commercial strategy, regulatory policy, customs documentation, accounting or the 4PL business relationship.

---

## Alternative C — Make TMS the Entire Logistics Platform

**Rejected.**

It would create another monolith.

---

## Alternative D — Make Trade Docs Part of TMS

**Rejected.**

Physical transport execution and regulated document/customs workflow have different authorities and lifecycles.

---

## Alternative E — Make Regulations Part of Trade Docs

**Rejected.**

Regulatory decision and documentary execution must remain separated.

---

## Alternative F — Use ERP as the Universal System of Record

**Rejected.**

ERP owns financial facts, not every logistics fact.

---

## Alternative G — Keep Medusa as Thamani's Universal Backend

**Rejected.**

The old B2C commerce architecture no longer reflects Thamani's business.

---

## Alternative H — Let UI Components Call Engines Directly

**Rejected.**

It leaks topology/provider choices into the experience layer and undermines capability resolution.

---

## Alternative I — Copy Every Engine's Data Into Thamani

**Rejected.**

It creates competing systems of record.

---

## Alternative J — No Local Projections

**Rejected.**

A high-performance digital estate may legitimately need local query/read projections.

---

# 129. Positive Consequences

This decision provides:

```text
clear domain authority

provider neutrality

TMS reuse

Trade Docs reuse

Regulations reuse

clean Control Plane integration

clean ERP boundary

independent engine evolution

clean Digital Estate architecture

future external Baobab customers

reduced duplicated domain logic

safer migrations

clearer event ownership

cleaner 4PL architecture

better control-tower composition
```

---

# 130. Costs and Negative Consequences

The architecture requires:

```text
more contracts

more explicit mappings

distributed workflows

provider resolution

event coordination

projection reconciliation

cross-engine testing
```

than a single application/database.

This complexity is accepted because the business and authority boundaries are genuinely distributed.

---

# 131. Implementation Sequence

Implementation SHOULD proceed as follows.

## THA-BOUNDARY-00 — ADR Reconciliation

Review:

```text
THA-0003
THA-0004
THA-0005
THA-0006
THA-0007
THA-0008
```

and mark which sections:

```text
STAY

SUPERSEDED IN PART

MOVED TO TMS

MOVED TO TRADE DOCS

MOVED TO SHARED

MOVED TO REGULATIONS
```

---

## THA-BOUNDARY-01 — TMS ADR Foundation

Establish the first `ADR-TMS-*` decisions before substantive TMS code.

---

## THA-BOUNDARY-02 — Trade Docs ADR Foundation

Establish the first `ADR-TDOC-*` decisions before substantive Trade Docs code.

---

## THA-BOUNDARY-03 — Shared Capability Catalogue

Register the required provider-neutral capabilities.

---

## THA-BOUNDARY-04 — Provider Declarations

Activate valid capability-provider declarations for:

```text
baobab-tms

baobab-trade-docs
```

once their implementations exist.

---

## THA-BOUNDARY-05 — Control Plane Resolution

Ensure Thamani can resolve required capabilities under its:

```text
tenant

legal entity

market

Digital Estate

scope
```

---

## THA-BOUNDARY-06 — Thamani Capability Client

Introduce a provider-neutral application integration layer.

---

## THA-BOUNDARY-07 — Remove Direct Legacy Engine Coupling

Progressively eliminate obsolete direct assumptions such as:

```text
Thamani → Medusa for every business workflow
```

---

## THA-BOUNDARY-08 — Projection Architecture

Establish customer and operations read models with explicit source authority.

---

## THA-BOUNDARY-09 — Migration

Move reusable domain authority out of Thamani incrementally.

---

## THA-BOUNDARY-10 — Certification

Prove:

```text
no duplicate system of record

no provider-name coupling in canonical capability contracts

tenant/legal-entity propagation

authorization

idempotency

reconciliation

provider outage behaviour

event ownership

migration compatibility

observability

recovery
```

before production cutover.

---

# 132. Final Architectural Invariants

The following SHALL remain non-negotiable:

```text
Digital Estate
    != Engine

Business Division
    != Engine

Capability
    != Engine

Capability
    != Provider

Provider
    != Engine Instance

Repository Exists
    != Provider Ready

Provider Ready
    != Tenant Entitled

Tenant Entitled
    != Capability Bound

Capability Bound
    != Resolution Successful

Thamani
    != TMS

Thamani
    != Trade Docs

Thamani
    != Regulations

TMS
    != ERP

TMS
    != Trade Docs

TMS
    != Regulations

Trade Docs
    != Customs Authority

Trade Docs
    != Regulations

Regulations
    != Operational Execution

ERP
    != TMS

IAM
    != Business Domain

CMS
    != Transaction System

Pulse Prediction
    != Operational Fact

Trade
    != Universal Thamani Backend

Shipment
    authoritative in TMS target architecture

Transport Movement
    authoritative in TMS

Customs Case
    authoritative in Trade Docs

Regulatory Decision
    authoritative in Regulations

Financial Posting
    authoritative in ERP

Authentication
    authoritative in IAM

Canonical Organisation
    authoritative in Control Plane

Customer Quote
    authoritative in Thamani

Customer Sell Price
    authoritative in Thamani

Thamani Projection
    != Authoritative Source

Control Tower
    != System of Record

Local Cache
    != System of Record

External Reference
    != Canonical Identity

Engine Name
    must not become canonical capability identity

Direct database coupling
    is prohibited

Cross-engine transactions
    must tolerate partial progress

Capability resolution
    must fail closed

Domain authority
    must remain explicit

Historical authority migrations
    must remain auditable
```

---

# 133. Final Decision

Thamani Global SHALL operate as a **business and digital-experience composition layer over reusable Baobab capabilities**.

The target architecture SHALL be:

```text
                        CUSTOMER / PARTNER / STAFF
                                  │
                                  ▼
                           THAMANI ESTATE
                                  │
                       Thamani business policy
                       customer experience
                       service composition
                                  │
                                  ▼
                          CAPABILITY ACCESS
                                  │
                                  ▼
                        BAOBAB CONTROL PLANE
                                  │
              entitlement / binding / resolution
                                  │
      ┌───────────────┬───────────┼───────────┬───────────────┐
      │               │           │           │               │
      ▼               ▼           ▼           ▼               ▼
   TMS          TRADE DOCS   REGULATIONS     ERP             IAM
      │               │           │           │               │
 transport      documents /   regulatory   financial       identity
 execution       customs       decisions     truth
      │               │           │           │
      └───────────────┴──────┬────┴───────────┘
                              │
                   authoritative domain facts
                              │
                              ▼
                     THAMANI PROJECTIONS
                              │
                 ┌────────────┼────────────┐
                 ▼            ▼            ▼
              Customer      Partner     Control Tower
               Portal        Portal      Operations
```

The target authority relationship is:

```text
THAMANI
owns:
    customer experience
    commercial logistics proposition
    customer RFQ
    customer quote
    customer contract/service order
    margin policy
    service composition
    3PL/4PL operating model

TMS
owns:
    reusable transport execution

TRADE DOCS
owns:
    reusable digital trade-document
    and customs workflow

REGULATIONS
owns:
    regulatory interpretation
    and decision

ERP
owns:
    financial truth

CONTROL PLANE
owns:
    platform context,
    entitlement and capability resolution

IAM
owns:
    identity and authentication

CMS
owns:
    editorial content

PULSE
owns:
    non-authoritative intelligence
```

The defining architectural principle is:

> **Thamani shall own the business relationship and customer outcome, not every technical capability required to deliver that outcome.**

The defining platform principle is:

> **Reusable transport, trade-document, regulatory, financial, identity and intelligence capabilities shall live behind Baobab capability contracts and remain independently replaceable providers.**

The defining system-of-record principle is:

> **Authority shall be assigned to the domain that owns the fact, not to whichever application happens to display or orchestrate it.**

And the defining evolution principle is:

> **Where earlier Thamani ADRs defined reusable logistics-engine semantics before dedicated engines existed, those semantics shall be preserved as architectural input and deliberately re-homed into the appropriate Baobab engine rather than duplicated or discarded.**
