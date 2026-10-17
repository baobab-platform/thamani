# ADR-THA-0018 — B2B Commercial Model, Legacy Supersession and Platform Engine Responsibility Reallocation

**Status:** Accepted — Architectural Reconciliation, Supersession and Responsibility Reallocation  
**Date:** 2026-10-03  
**Decision Owners:** Nabhold Group Africa / Thamani Global / Baobab Platform Architecture  
**Primary Repository:** `baobab-platform/thamani`  
**Legal Entity:** `THAMANI-GLOBAL`  
**Commercial Model:** **B2B — Integrated Logistics Services**  
**Digital Estate:** Thamani  
**Canonical Organisation Authority:** `baobab-platform/baobab-cp`  
**Canonical Contract Authority:** `baobab-platform/shared`  
**Identity Authority:** `baobab-platform/baobab-iam`  
**Transport Execution Authority:** `baobab-platform/baobab-tms`  
**Trade-Document / Customs Workflow Authority:** `baobab-platform/baobab-trade-docs`  
**Regulatory Decision Authority:** `baobab-platform/baobab-regulations`  
**Financial Authority:** `baobab-platform/baobab-erp`  
**Content Authority:** `baobab-platform/baobab-cms` where applicable  
**Intelligence:** `baobab-platform/baobab-pulse`  
**Decision Class:** Commercial model / B2B / ADR supersession / engine extraction / responsibility allocation / Digital Estate / platform authority reconciliation

---

# 1. Purpose

This ADR resolves three architectural transitions that have occurred during the evolution of Thamani Global:

1. Thamani's original architecture described a **consumer-first B2C ecommerce Digital Estate**.
2. Thamani was subsequently redefined as an **integrated shipping, transportation, freight and logistics enterprise**.
3. Reusable transport, trade-document and Customs-workflow concerns initially modelled within Thamani were later extracted into dedicated Baobab platform engines:
   - `baobab-tms`
   - `baobab-trade-docs`

Those transitions are individually visible across the ADR history, but no single decision currently provides a complete normative statement of:

```text
WHAT THAMANI IS NOW

WHICH EARLIER DECISIONS ARE SUPERSEDED

WHICH EARLIER DECISIONS REMAIN VALID

WHICH RESPONSIBILITIES MOVED TO BAOBAB TMS

WHICH RESPONSIBILITIES MOVED TO BAOBAB TRADE DOCS

WHICH RESPONSIBILITIES REMAIN WITH THAMANI

HOW THE B2B CUSTOMER MODEL SHOULD NOW BE IMPLEMENTED
```

This ADR provides that reconciliation.

---

# 2. Executive Decision

Thamani Global SHALL operate as a:

> **B2B integrated logistics enterprise whose primary commercial customers are organisations purchasing logistics, transportation, forwarding, warehousing, Customs, project-logistics, 3PL and 4PL services.**

Thamani SHALL NOT be architected as a consumer ecommerce business.

Its target commercial model is:

```text
THAMANI GLOBAL
      │
      │ provides logistics services to
      ▼
CUSTOMER ORGANISATION
      │
      ├── Organisation Administrator
      ├── Logistics / Operations User
      ├── Procurement User
      ├── Approver
      ├── Customs / Trade User
      ├── Finance User
      ├── Project User
      └── Read-Only / Tracking User
```

not:

```text
INDIVIDUAL CONSUMER
      │
      ▼
PRODUCT CATALOGUE
      │
      ▼
CART
      │
      ▼
CHECKOUT
```

---

# 3. Canonical Business-Model Statement

The canonical statement SHALL henceforth be:

> **Thamani Global is a B2B shipping, transportation, freight and logistics enterprise.**

Its primary commercial relationship is:

```text
THAMANI
   │
   ▼
CUSTOMER ORGANISATION
```

rather than:

```text
THAMANI
   │
   ▼
CONSUMER SHOPPER
```

Any current registry, documentation, UI copy, configuration or contract that states:

```text
THAMANI-GLOBAL = B2C
```

as the target business model SHALL be treated as obsolete and SHALL be reconciled.

---

# 4. B2B Does Not Mean Ecommerce

This distinction is important.

Thamani being:

```text
B2B
```

SHALL NOT imply:

```text
B2B ecommerce marketplace
```

or:

```text
wholesale product storefront
```

or:

```text
Medusa B2B commerce
```

by default.

Thamani's primary commercial product is:

```text
LOGISTICS SERVICE
```

not:

```text
MERCHANDISE
```

The dominant commercial workflow is therefore:

```text
Customer Requirement
        │
        ▼
RFQ / Service Request
        │
        ▼
Quotation
        │
        ▼
Negotiation / Approval
        │
        ▼
Contract / Rate Agreement
        │
        ▼
Service Order / Booking
        │
        ▼
Logistics Execution
        │
        ▼
Delivery / Service Completion
        │
        ▼
Invoice / Statement
        │
        ▼
Account Relationship
```

rather than:

```text
Browse
  ↓
Add to Cart
  ↓
Checkout
  ↓
Commerce Order
```

---

# 5. External Logistics Context

FIATA's definition of freight forwarding and logistics services encompasses carriage by single or multiple modes, consolidation, storage, handling, packing, distribution, Customs and fiscal services, insurance-related services and information technology used in the management of logistics flows.

CSCMP likewise describes logistics management as covering transportation, fleet management, warehousing, materials handling, inventory and management of third-party logistics providers, coordinated as an integrating business function.

Those industry boundaries support the decision that Thamani is better modelled as:

```text
B2B LOGISTICS ENTERPRISE
```

than as:

```text
B2C COMMERCE ESTATE
```

---

# 6. B2B Customer Organisation

The primary customer relationship SHALL be organisation-centric.

Conceptually:

```text
Canonical Organisation
        │
        ▼
Thamani Customer Relationship
        │
        ├── customer account/reference
        ├── commercial terms
        ├── contract(s)
        ├── service entitlements
        ├── credit / financial relationship
        ├── approved locations
        ├── contacts
        └── operating preferences
        │
        ▼
Organisation Membership
        │
        ├── users
        ├── roles
        ├── approval authorities
        └── resource scopes
```

---

# 7. Customer Organisation ≠ Tenant Automatically

A customer becoming a Thamani customer SHALL NOT automatically mean:

```text
new Baobab tenant
```

or:

```text
new Digital Estate
```

or:

```text
new platform account
```

The Control Plane SHALL determine the appropriate canonical organisation/platform relationship.

Therefore:

```text
Customer Organisation
    !=
Tenant automatically
```

---

# 8. Natural Persons Still Participate

The B2B model does not remove natural persons.

Natural persons may participate as:

```text
organisation representative

employee

administrator

approver

finance contact

Customs contact

warehouse contact

driver

consignee contact

delivery recipient

project representative

partner operator

service contact
```

The distinction is:

> **The natural person participates within a business or logistics relationship rather than constituting the default consumer-commerce customer model.**

---

# 9. Last Mile to an Individual Does Not Make Thamani B2C

This distinction SHALL be explicit.

A valid Thamani flow may be:

```text
Retailer / Manufacturer / Enterprise
              │
              │ contracts with Thamani
              ▼
           THAMANI
              │
              ▼
       Last-Mile Service
              │
              ▼
     Individual Recipient
```

The commercial model remains:

```text
B2B
```

because the contractual customer is the organisation.

The individual may be:

```text
recipient

consignee contact

delivery contact
```

but is not thereby transformed into a retail customer of Thamani.

This operating pattern may sometimes be described commercially as:

```text
B2B2C execution
```

but Thamani's primary commercial model remains B2B.

---

# 10. Customer and Provider Sides Are Both Organisation-Centric

Thamani participates in two major B2B relationship directions:

```text
                       THAMANI
                          │
             ┌────────────┴────────────┐
             ▼                         ▼
    CUSTOMER ORGANISATION      PROVIDER ORGANISATION
             │                         │
      purchases service          supplies capability
             │                         │
             ▼                         ▼
        B2B SELL SIDE             B2B BUY SIDE
```

Examples of provider organisations include:

```text
road carrier

shipping line

air carrier

warehouse operator

freight forwarder

Customs broker

courier

last-mile provider

cold-chain provider

heavy-haul provider

engineering provider

terminal

survey provider
```

---

# 11. One Organisation May Be Both Customer and Provider

Canonical organisation identity SHALL not depend on the role.

Example:

```text
ORGANISATION X
      │
      ├── Customer Relationship with Thamani
      │
      └── Carrier Relationship with Thamani
```

This SHALL NOT create:

```text
Organisation X — Customer

Organisation X — Provider
```

as duplicate canonical organisations.

ADR-THA-0004 remains authoritative for contextual logistics-provider relationships.

---

# 12. Business Divisions Remain Valid

The twelve business divisions established by ADR-THA-0003 remain:

|   # | Division               |
| --: | ---------------------- |
|   1 | Haulage                |
|   2 | Shipping               |
|   3 | Freight Forwarding     |
|   4 | Customs Brokerage      |
|   5 | Warehousing            |
|   6 | 3PL                    |
|   7 | Courier                |
|   8 | Last Mile              |
|   9 | Cold Chain             |
|  10 | Project Logistics      |
|  11 | Cross-Border Logistics |
|  12 | 4PL                    |

They remain business divisions of:

```text
THAMANI GLOBAL
```

and do not automatically become:

```text
platform engines

tenants

legal entities

separate Digital Estates
```

---

# 13. Important Architectural Evolution

ADR-THA-0003 deliberately left open whether Thamani's logistics execution would ultimately be implemented by:

```text
Baobab Trade

a dedicated logistics engine

an external TMS provider
```

That question has now been answered.

The platform subsequently created:

```text
baobab-platform/baobab-tms
```

and:

```text
baobab-platform/baobab-trade-docs
```

with accepted foundational ADRs.

Therefore several earlier Thamani ADRs now describe **historical design work whose reusable portions have migrated into dedicated platform engines**.

---

# 14. Architectural Evolution — Before

Initially the architecture resembled:

```text
THAMANI
   │
   ├── B2C Storefront
   │
   ├── Supplier Portal
   │
   ├── Shipment Domain
   │
   ├── Transport Planning
   │
   ├── Fleet / Equipment
   │
   ├── Cross-Border
   │
   ├── Customs / Documents
   │
   └── Logistics UI
   │
   ▼
BAOBAB TRADE / ERP / OTHER ENGINES
```

That architecture created a risk that Thamani itself would become:

```text
Digital Estate
+
TMS
+
document engine
+
Customs engine
+
provider system
+
commercial application
```

---

# 15. Architectural Evolution — After

The accepted target architecture is now:

```text
                         THAMANI B2B
                              │
              Customer / Partner / Operations
                              │
                              ▼
                   THAMANI BUSINESS LAYER
                              │
        ┌─────────────────────┼───────────────────────┐
        ▼                     ▼                       ▼
   COMMERCIAL            SERVICE                  CONTROL
   RELATIONSHIP          COMPOSITION               TOWER
        │                     │                       │
        └─────────────────────┼───────────────────────┘
                              ▼
                    BAOBAB CAPABILITIES
                              │
        ┌────────────┬────────┼────────┬─────────────┐
        ▼            ▼        ▼        ▼             ▼
       TMS       TRADE DOCS   ERP  REGULATIONS      IAM
        │            │        │        │             │
        └────────────┴────────┼────────┴─────────────┘
                              ▼
                       CONTROL PLANE
                 context / capability resolution
```

---

# 16. Governing Responsibility Principle

> **Thamani owns the B2B logistics business relationship and service composition; reusable operational engines own the canonical execution semantics required to deliver that service.**

---

# 17. Thamani vs Baobab Engine Boundary

Thamani SHALL own:

```text
customer organisation relationship

partner/provider relationship

B2B RFQ

customer quotation

customer contract

customer sell-side pricing

service order

customer SLA

service composition

division participation

provider sourcing policy

customer approvals

customer-facing tracking experience

customer-facing document experience

4PL control tower

customer exception management

claims

service recovery

communications

B2B Digital Estate
```

It SHALL consume reusable platform engines for canonical execution.

---

# 18. Responsibility Reallocation — Summary

| Concern                             | Historical Thamani ADR                | Current authority                |
| ----------------------------------- | ------------------------------------- | -------------------------------- |
| B2B customer relationship           | legacy B2C / THA-0003                 | **Thamani**                      |
| RFQ / quotation / customer contract | THA-0006                              | **Thamani**                      |
| Customer sell price / margin        | THA-0006                              | **Thamani**                      |
| Logistics service composition       | THA-0003/0008/0009                    | **Thamani**                      |
| LogisticsShipment                   | THA-0005                              | **Baobab TMS**                   |
| Consignment                         | THA-0005                              | **Baobab TMS**                   |
| TransportPlan                       | THA-0005                              | **Baobab TMS**                   |
| TransportRoute                      | THA-0005                              | **Baobab TMS**                   |
| TransportMovement                   | THA-0005                              | **Baobab TMS**                   |
| TransportLeg / Call                 | THA-0005                              | **Baobab TMS**                   |
| Transport events                    | THA-0005                              | **Baobab TMS**                   |
| Transport booking                   | THA-0005/0007                         | **Baobab TMS**                   |
| Fleet operational semantics         | THA-0007                              | **Baobab TMS**                   |
| Transport means/equipment           | THA-0007                              | **Baobab TMS**                   |
| Capacity/resource assignment        | THA-0007                              | **Baobab TMS**                   |
| Transport custody                   | THA-0005                              | **Baobab TMS**                   |
| Physical delivery                   | THA-0005                              | **Baobab TMS**                   |
| TradeDocument                       | THA-0008 and older Trade architecture | **Baobab Trade Docs**            |
| Document version/content            | implicit previously                   | **Baobab Trade Docs**            |
| Document dossier                    | THA-0008                              | **Baobab Trade Docs**            |
| CustomsCase                         | THA-0008                              | **Baobab Trade Docs**            |
| Customs declaration workflow        | THA-0008                              | **Baobab Trade Docs**            |
| Authority submission/response       | THA-0008                              | **Baobab Trade Docs**            |
| Regulatory applicability            | THA-0008                              | **Baobab Regulations**           |
| Regulatory decisions                | THA-0008                              | **Baobab Regulations**           |
| Sovereign Customs decisions         | THA-0008                              | **External competent authority** |
| Financial accounting                | various                               | **Baobab ERP**                   |
| Organisation identity               | earlier supplier models               | **Control Plane**                |
| Capability/provider resolution      | THA-0009                              | **Control Plane**                |
| Authentication                      | various                               | **Baobab IAM**                   |
| Public/editorial content            | THA-0014                              | **Baobab CMS**                   |
| Predictive intelligence             | THA-0013/0014                         | **Baobab Pulse**                 |

---

# 19. ADR Supersession Matrix

The following classifications SHALL become normative.

| ADR                                   | Status after ADR-THA-0018            | Decision                                                                                                                                        |
| ------------------------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| ADR-0001 — Next.js B2C Digital Estate | **Superseded**                       | B2C/storefront/Medusa commercial architecture retired. Selected frontend engineering decisions retained.                                        |
| ADR-0002 — Supplier Onboarding Portal | **Superseded**                       | B2C supplier-estate model replaced by organisation-centric logistics-provider architecture in THA-0004.                                         |
| ADR-THA-0003                          | **Accepted as Modified by THA-0018** | Logistics-enterprise boundary remains; target model is now explicitly B2B.                                                                      |
| ADR-THA-0004                          | **Retained**                         | Canonical organisation, counterparty and logistics-provider qualification remain correct.                                                       |
| ADR-THA-0005                          | **Superseded in Part**               | Reusable shipment/consignment/planning/movement/execution model is reallocated to `baobab-tms`.                                                 |
| ADR-THA-0006                          | **Retained with Reconciliation**     | B2B RFQ, quote, contract, rate, approval and margin remain Thamani responsibilities.                                                            |
| ADR-THA-0007                          | **Superseded in Part**               | Reusable fleet/equipment/capacity/resource/execution semantics reallocated to `baobab-tms`.                                                     |
| ADR-THA-0008                          | **Superseded in Part**               | Cross-border service composition remains Thamani; transport → TMS; documents/Customs workflow → Trade Docs; regulatory decisions → Regulations. |
| ADR-THA-0009                          | **Retained**                         | Authority and system-of-record boundary remains governing.                                                                                      |
| ADR-THA-0010                          | **Retained**                         | Warehousing/3PL customer-service composition remains Thamani; execution remains provider-neutral.                                               |
| ADR-THA-0011                          | **Retained**                         | Special cargo remains Thamani service composition over TMS/Regulations/Trade Docs/etc.                                                          |
| ADR-THA-0012                          | **Retained**                         | Project Logistics remains Thamani project/service orchestration over reusable capabilities.                                                     |
| ADR-THA-0013                          | **Retained**                         | 4PL remains Thamani orchestration; authoritative operational facts remain distributed.                                                          |
| ADR-THA-0014                          | **Superseded in Part**               | Digital Estate retained but Customer Experience becomes explicitly organisation-centric B2B.                                                    |
| ADR-THA-0015                          | **Retained**                         | Claims architecture remains; B2B organisation/contract context governs normal use.                                                              |
| ADR-THA-0016                          | **Retained**                         | Communication architecture remains; organisation roles/contacts are primary recipient model.                                                    |
| ADR-THA-0017                          | **Accepted as Modified by THA-0018** | Migration target is explicitly a B2B logistics Digital Estate.                                                                                  |

---

# 20. ADR-0001 — Full Business-Model Supersession

Legacy:

```text
ADR-0001 — Next.js B2C Digital Estate
```

is superseded for all business-model decisions.

Specifically retired are:

```text
Thamani = B2C commerce estate

consumer shopper as canonical customer

retail product catalogue as primary experience

shopping cart

consumer checkout

consumer product detail

retail merchandising

Medusa Store API as universal Thamani backend
```

---

# 21. ADR-0001 — Technology Decisions Retained

The following decisions MAY remain:

```text
Next.js

React

TypeScript

server-first architecture

SEO

accessibility

performance discipline

independently deployable Digital Estate

adapter-oriented backend integration
```

They survive because they are sound frontend-engineering choices, not because the old B2C architecture remains valid.

---

# 22. ADR-0002 — Superseded Supplier Model

Legacy ADR-0002 states that Thamani hosts:

```text
supplier registration
+
B2C storefront
```

and explicitly preserves:

```text
THAMANI-GLOBAL: business_model: "B2C"
```

That business-model decision is superseded.

Its useful ideas around:

```text
application lifecycle

contacts

capability declarations

certifications

status

evidence
```

have evolved into the broader logistics-counterparty architecture of ADR-THA-0004.

Therefore:

```text
Supplier Onboarding Portal
```

is no longer the governing Thamani provider model.

The target concept is:

```text
Logistics Partner / Provider Relationship
```

---

# 23. ADR-THA-0003 — Clarification

ADR-THA-0003 correctly transformed Thamani into an integrated logistics enterprise.

However, its wording states primarily what Thamani is **no longer**:

```text
consumer-first B2C ecommerce enterprise
```

without making the new commercial model sufficiently explicit.

ADR-THA-0018 therefore adds:

> **Thamani Global SHALL operate primarily as a B2B logistics enterprise.**

---

# 24. ADR-THA-0003 — Composition Principle Retained

The following principle remains fully accepted:

> **Customers buy logistics outcomes from Thamani Global; Thamani composes the divisions and providers required to deliver those outcomes.**

It is now interpreted as:

> **Business customers buy logistics outcomes from Thamani Global.**

---

# 25. ADR-THA-0004 — Retained

ADR-THA-0004 already aligns strongly with the B2B architecture.

Its hierarchy remains valid:

```text
Canonical Organisation
        │
        ▼
Thamani Counterparty Relationship
        │
        ▼
Logistics Provider Profile
        │
        ▼
Capabilities
        │
        ▼
Evidence
        │
        ▼
Qualification
        │
        ▼
Eligibility
```

The same canonical organisation may participate as:

```text
CUSTOMER

CARRIER

BROKER

WAREHOUSE OPERATOR

FREIGHT FORWARDER

OTHER PROVIDER
```

without identity duplication.

---

# 26. ADR-THA-0005 — Transport Functionality Reallocation

ADR-THA-0005 was written before the dedicated TMS architecture was established.

It assigned concepts such as:

```text
Shipment

Consignment

TransportPlan

TransportRoute

TransportMovement

TransportLeg

TransportCall

TransportEvent

Delivery
```

to a Thamani Logistics Execution Domain.

That reusable authority has moved.

---

# 27. Baobab TMS Is Now the Reusable Transport Authority

The target architecture is:

```text
                  THAMANI
        B2B logistics service
                     │
                     │ requests transport capability
                     ▼
               CONTROL PLANE
                     │
                     ▼
              logistics capability
                     │
                     ▼
                BAOBAB TMS
                     │
          canonical transport execution
```

Thamani SHALL NOT maintain a parallel canonical transport domain.

---

# 28. `Shipment` Terminology Is Corrected

TMS-0002 introduced an important correction.

The canonical reusable TMS object is:

```text
LogisticsShipment
```

not an ambiguous:

```text
Shipment
```

because Baobab also has distinct:

```text
TradeShipment
```

semantics.

Therefore earlier THA-0005 references to transport-execution `Shipment` SHALL be interpreted through TMS-0002 as:

```text
LogisticsShipment
```

when physical logistics execution is intended.

---

# 29. THA-0005 Surviving Value

THA-0005 remains historically valuable because it established many of the conceptual distinctions that informed the later TMS model.

Its reusable semantics have moved.

Its Thamani-specific surviving concern is:

```text
How does the customer's Thamani service
reference and compose
TMS transport execution?
```

not:

```text
How does Thamani itself implement
the universal transport domain?
```

---

# 30. Transport Responsibilities Moved to TMS

The following concerns SHALL now be considered TMS concerns:

```text
LogisticsShipment

CargoItem transport snapshot

TransportPackage

HandlingUnit transport relationship

Consignment

TransportPlan

TransportRoute

TransportMovement

TransportLeg

TransportCall

TransportEvent

Booking

carrier execution

transport capacity

transport means

transport equipment

transport resource assignment

dispatch

tracking

milestones

physical transport custody

delivery

transport exceptions
```

---

# 31. Transport Responsibilities Remaining in Thamani

Thamani retains:

```text
customer service request

commercial service order

customer contract

service-level requirement

customer sell price

customer SLA

customer-facing shipment projection

customer exception coordination

internal division responsibility

provider sourcing policy

4PL orchestration

claims/service recovery
```

---

# 32. ADR-THA-0007 — Fleet and Resource Reallocation

ADR-THA-0007 originally assigns:

```text
Fleet / Capacity Domain Authority
```

to Thamani.

That is now too broad.

Operational semantics for reusable transport resources belong to TMS.

---

# 33. Fleet Responsibility Split

The corrected architecture is:

```text
                   TRANSPORT RESOURCE
                          │
          ┌───────────────┼────────────────┐
          ▼               ▼                ▼
        TMS              ERP            THAMANI
 operational state   financial asset   business strategy
 assignment          accounting        ownership decision
 availability        depreciation      sourcing policy
 capability          book value        buy/lease/partner
 execution           acquisition       division planning
```

---

# 34. TMS Owns Operational Resource Semantics

TMS SHALL govern reusable operational concepts such as:

```text
TransportMeans

TransportEquipment

capacity

availability

assignment

dispatch

operational resource status
```

---

# 35. ERP Owns Financial Asset Truth

Where Thamani actually owns:

```text
truck

trailer

container

equipment

other capital asset
```

ERP remains authoritative for:

```text
financial asset

acquisition

book value

depreciation

accounting consequences
```

---

# 36. Thamani Owns Fleet Business Strategy

Thamani remains responsible for decisions such as:

```text
Should we own trucks?

Should we lease?

Should we subcontract?

Should we charter?

Which capacity model serves this market?

Which division carries asset responsibility?
```

These are business decisions rather than TMS canonical transport semantics.

---

# 37. ADR-THA-0008 — Reconciliation

ADR-THA-0008 remains important.

Its central proposition is retained:

> **Thamani composes cross-border logistics from several independent capabilities.**

What changes is the classification of authority.

---

# 38. THA-0008 — Current Responsibility Split

| Cross-border concern                      | Current authority              |
| ----------------------------------------- | ------------------------------ |
| Customer cross-border service             | **Thamani**                    |
| Customer contract / quote                 | **Thamani**                    |
| Cross-border service composition          | **Thamani**                    |
| Physical cargo transport                  | **Baobab TMS**                 |
| LogisticsShipment / Consignment           | **Baobab TMS**                 |
| Route / movement                          | **Baobab TMS**                 |
| Transport custody                         | **Baobab TMS**                 |
| Trade documents                           | **Baobab Trade Docs**          |
| Document versions/content                 | **Baobab Trade Docs**          |
| Document dossier                          | **Baobab Trade Docs**          |
| CustomsCase                               | **Baobab Trade Docs**          |
| Customs declaration workflow              | **Baobab Trade Docs**          |
| Customs submission                        | **Baobab Trade Docs**          |
| Authority-response projection             | **Baobab Trade Docs**          |
| Regulatory applicability                  | **Baobab Regulations**         |
| Regulatory requirements                   | **Baobab Regulations**         |
| Regulatory decisions                      | **Baobab Regulations**         |
| Sovereign Customs decision                | **External Customs authority** |
| Accounting / actual financial consequence | **Baobab ERP**                 |
| Platform context / capability resolution  | **Control Plane**              |

---

# 39. Cross-Border Composition Remains Thamani

Thamani still owns the business outcome:

```text
Move customer cargo
from origin market
to destination market
under an agreed B2B logistics service
```

Conceptually:

```text
CUSTOMER ORGANISATION
        │
        ▼
THAMANI CROSS-BORDER SERVICE
        │
        ├──────────────► TMS
        │                 physical execution
        │
        ├──────────────► TRADE DOCS
        │                 documents / Customs workflow
        │
        ├──────────────► REGULATIONS
        │                 regulatory decision
        │
        └──────────────► ERP
                          financial consequence
```

---

# 40. Trade Docs Responsibility Reallocation

Reusable document and Customs-workflow concerns originally distributed across Thamani/Trade thinking SHALL now belong primarily to:

```text
baobab-platform/baobab-trade-docs
```

---

# 41. Trade Docs Owns TradeDocument

Trade Docs SHALL own the executable lifecycle semantics of:

```text
TradeDocument
```

including the richer architecture introduced by TDOC-0002:

```text
TradeDocument
        │
        ▼
DocumentVersion
        │
        ▼
DocumentContent
        │
        ▼
ContentArtifact
```

with first-class:

```text
DocumentRelationship

DocumentSubjectAssociation

DocumentIdentifier

provenance

verification

versioning

content integrity
```

---

# 42. Trade Docs Owns Customs Workflow

Reusable Customs workflow concerns belong to Trade Docs, including:

```text
CustomsCase

CustomsDeclaration

declaration versions

submission workflow

authority acknowledgement

authority response

transit-document workflow

documentary requirements

document dossiers

permit/certificate references
```

where implemented.

---

# 43. Trade Docs Is Not Customs Authority

This remains non-negotiable:

```text
Trade Docs
    !=
Customs Authority
```

Trade Docs may:

```text
prepare

validate

submit

receive

normalise

track

record

orchestrate

evidence
```

Customs workflows.

The competent sovereign authority remains authoritative for:

```text
acceptance

rejection

assessment

hold

inspection

release

other statutory decisions
```

---

# 44. Regulations Remains Separate From Trade Docs

This distinction SHALL remain:

```text
Regulations
    determines what is required

Trade Docs
    executes the documentary workflow

External Authority
    makes sovereign decision
```

Conceptually:

```text
REGULATIONS
    │
    │ "Certificate X required"
    ▼
TRADE DOCS
    │
    │ obtains / validates / submits Certificate X
    ▼
CUSTOMS / AUTHORITY
    │
    │ accepts / rejects / decides
    ▼
TRADE DOCS
    │
    │ records authoritative response
    ▼
THAMANI
    customer-facing service status
```

---

# 45. Documents Are Not TMS Facts

This remains:

```text
TMS Delivery
    !=
ProofOfDelivery TradeDocument

TMS LogisticsShipment
    !=
Bill of Lading

Transport Movement
    !=
Customs Declaration

Transport Event
    !=
Authority Decision
```

The engines SHALL cross-reference rather than absorb one another.

---

# 46. Standards Support for the Decomposition

UN/CEFACT's Reference Data Model approach explicitly separates interoperable semantic subsets for supply chain and multimodal transport while deriving them from a common semantic library, allowing the domains to interoperate without becoming one data model.

Its Cross-Border Management RDM further aims to connect supply-chain, transport and regulatory/Customs information domains rather than collapsing those domains into one application.

That is closely aligned with Baobab's decomposition:

```text
TMS
    transport

TRADE DOCS
    documentary / Customs execution

REGULATIONS
    regulatory meaning

THAMANI
    customer service composition
```

---

# 47. WCO Interoperability Direction

The WCO Data Model remains an important Customs interoperability reference. Version 4.3.0, announced in July 2026, expanded web-oriented JSON tagging and support for additional digital document types.

Trade Docs SHOULD therefore integrate WCO semantics through:

```text
versioned adapters

exchange models

authority mappings
```

rather than making WCO structures Thamani's internal persistence model.

---

# 48. ADR-THA-0006 — Explicit B2B Interpretation

ADR-THA-0006 remains one of the strongest Thamani-owned domains.

Its concepts become explicitly B2B:

```text
RFQ

Quotation

Negotiated Rate

Customer Contract

Rate Agreement

Approval Authority

Margin

Service Order
```

---

# 49. Sell-Side B2B Commercial Model

The customer commercial flow SHALL be:

```text
Customer Organisation
        │
        ▼
RFQ
        │
        ▼
Thamani Quotation
        │
        ▼
Customer Approval / Negotiation
        │
        ▼
Contract / Rate Agreement
        │
        ▼
Service Order
        │
        ▼
Execution
```

---

# 50. Provider Buy-Side Remains Separate

Thamani's procurement of execution capability is:

```text
Thamani
    │
    ▼
Provider RFQ / Rate / Contract
    │
    ▼
Carrier / Warehouse / Broker / Provider
```

This is distinct from:

```text
Customer Quote
```

Therefore:

```text
Customer Sell Price
    !=
Provider Buy Rate
```

remains a core invariant.

---

# 51. B2B Self-Service Is Permitted

B2B does not require every transaction to involve a human salesperson.

Thamani MAY eventually support:

```text
instant quote

self-service service request

repeat booking

contract-rate booking

API-based booking
```

where authorised.

Those remain B2B workflows when performed under:

```text
Customer Organisation
+
Contract / Relationship
+
Authorised Principal
```

They SHALL not be remodelled as consumer cart/checkout merely because they are self-service.

---

# 52. ADR-THA-0014 — Customer Experience Correction

ADR-THA-0014 remains the governing Digital Estate experience ADR, subject to the following supersession:

The generic:

```text
Customer Experience
```

SHALL henceforth mean primarily:

```text
B2B ORGANISATION CUSTOMER EXPERIENCE
```

---

# 53. Target Customer Portal

The primary authenticated customer architecture SHALL be:

```text
CUSTOMER PORTAL
│
├── Dashboard
│
├── Company
│   ├── Organisation Profile
│   ├── Business Units / Operating Contexts
│   ├── Locations
│   ├── Team
│   ├── Roles
│   └── Approval Authorities
│
├── RFQs
├── Quotations
├── Contracts
├── Service Orders / Bookings
├── Shipments
├── Tracking
├── Warehousing & Inventory
├── Documents & Customs
├── Projects
├── 4PL / Control Tower
├── Exceptions
├── Claims
├── Invoices & Statements
├── Reports
└── Settings
```

Capabilities SHALL appear only where implemented and entitled.

---

# 54. B2B Authentication Context

The normal private customer context SHALL be:

```text
Authenticated Principal
        │
        ▼
Organisation Membership
        │
        ▼
Thamani Customer Relationship
        │
        ▼
Role
        │
        ▼
Approval Authority
        │
        ▼
Resource Scope
```

not merely:

```text
logged-in customer account
```

---

# 55. Organisation Administration

B2B customers MAY require delegated administration for:

```text
invite member

remove member

assign roles

define approval limits

manage locations

manage operational contacts

manage notification recipients
```

according to IAM and Thamani authorisation architecture.

---

# 56. Approval Authorities

The B2B model SHALL permit organisational controls such as:

```text
User A:
may request quotes

User B:
may approve quotes ≤ ZAR 500,000

User C:
may approve project logistics contracts

Finance User:
may see invoices

Operations User:
may track shipments but not prices
```

Exact authority models SHALL conform to IAM/application authorisation governance.

---

# 57. Individual Customer Language Is Superseded

THA-0014 wording that suggests the primary portal supports:

```text
individual customers
```

as a peer commercial model SHALL be superseded.

Individuals MAY still exist as:

```text
recipients

contacts

representatives

sole-business representatives where supported
```

but the default commercial architecture remains organisation-centric.

---

# 58. Partner Portal Is Also B2B

The Thamani Partner Portal SHALL represent:

```text
Organisation-to-Organisation
```

relationships.

The partner's users act for:

```text
Carrier Organisation

Warehouse Organisation

Broker Organisation

Engineering Organisation

Other Provider Organisation
```

---

# 59. ADR-THA-0015 — B2B Claims Interpretation

Claims SHALL normally arise from a:

```text
customer organisation

provider organisation

insurer

other business counterparty
```

relationship.

Natural persons may file/manage cases as authorised representatives.

The underlying claim authority remains as defined in THA-0015.

---

# 60. ADR-THA-0016 — B2B Communications Interpretation

Recipient resolution SHOULD primarily favour organisation relationships such as:

```text
CUSTOMER_LOGISTICS_CONTACT

CUSTOMER_CUSTOMS_CONTACT

CUSTOMER_FINANCE_CONTACT

CUSTOMER_APPROVER

PROVIDER_DISPATCH_CONTACT

PROVIDER_FINANCE_CONTACT
```

rather than a consumer engagement model.

---

# 61. ADR-THA-0017 — Migration Target Clarification

ADR-THA-0017 describes migration away from the legacy B2C estate.

ADR-THA-0018 clarifies the target explicitly:

```text
LEGACY TARGET
─────────────────────
B2C ecommerce estate


MIGRATION


NEW TARGET
─────────────────────
B2B integrated logistics Digital Estate
```

---

# 62. Migration Is Not “B2C to Generic Logistics”

It is specifically:

```text
B2C COMMERCE
        │
        ▼
B2B LOGISTICS
```

This matters because the target requires:

```text
organisations

teams

roles

approval authorities

contracts

rates

service orders

account relationships

partner organisations

provider qualification

invoices/statements

enterprise reporting
```

that a consumer account architecture does not adequately model.

---

# 63. Medusa / Baobab Trade Boundary

`baobab-trade` remains a valid platform engine.

This ADR does NOT state:

```text
Medusa is obsolete

Baobab Trade is obsolete
```

It states:

> **Baobab Trade is not Thamani's universal backend merely because Thamani historically used a Medusa storefront.**

---

# 64. Baobab Trade May Still Be Consumed

If Thamani later requires an actual capability supplied by Baobab Trade, it MAY consume that capability through Control Plane resolution.

Examples might include future:

```text
commercial catalogue

commerce transaction

payment-adjacent workflow
```

only where architecture explicitly justifies it.

---

# 65. No Cart / Checkout by Inertia

The following SHALL be removed from target architecture unless independently justified by a future accepted decision:

```text
cart

consumer checkout

retail product catalogue

consumer product detail

retail merchandising

publishable-store-key browser model
```

---

# 66. B2B Booking Is Not Checkout

This distinction is important:

```text
Approve logistics quote
        │
        ▼
Create Service Order / Booking
```

SHALL NOT automatically be represented as:

```text
Checkout
```

even when the workflow is fully digital.

---

# 67. Thamani Digital Estate Is Not TMS UI

This remains:

```text
Thamani Digital Estate
    !=
Baobab TMS frontend
```

Thamani presents:

```text
customer outcome

commercial context

service composition

cross-domain visibility
```

while TMS provides transport authority.

---

# 68. Thamani Digital Estate Is Not Trade Docs UI

Similarly:

```text
Thamani Documents & Customs Experience
    !=
Trade Docs engine
```

The customer-facing estate consumes Trade Docs capabilities and projections.

---

# 69. Engine Topology Must Not Leak Into UX

A customer SHOULD see:

```text
Shipment

Documents

Customs

Warehouse Inventory

Project

Exception

Invoice
```

not:

```text
TMS

TDOC

ERP

REG

CP
```

---

# 70. Authority Per Fact

The governing rule remains:

> **Authority is assigned per fact, not per screen.**

One Thamani screen may therefore compose:

```text
Customer Contract
    → Thamani

LogisticsShipment
    → TMS

TradeDocument
    → Trade Docs

RegulatoryDecision
    → Regulations

Invoice
    → ERP

Prediction
    → Pulse
```

without Thamani becoming authority for all displayed information.

---

# 71. No Shared Database

The responsibility reallocation SHALL NOT be implemented through:

```text
Thamani reading TMS database

Thamani reading Trade Docs database

TMS reading Trade Docs database
```

Canonical APIs, events, references and mappings SHALL be used.

---

# 72. Engine Extraction Does Not Remove Thamani Business Capability

Moving transport semantics to TMS does NOT mean:

```text
Thamani no longer provides haulage
```

Likewise moving document semantics to Trade Docs does NOT mean:

```text
Thamani no longer provides Customs brokerage
```

The distinction is:

```text
BUSINESS SERVICE
    !=
SOFTWARE ENGINE
```

---

# 73. Example — Haulage

Thamani may sell:

```text
ROAD HAULAGE
```

to a customer.

Execution architecture:

```text
Customer Organisation
        │
        ▼
Thamani Haulage Service
        │
        ▼
Thamani Service Order
        │
        ▼
Baobab TMS
        │
        ▼
Thamani-owned truck
or
external carrier
```

TMS owning the transport model does not transfer the business relationship away from Thamani.

---

# 74. Example — Freight Forwarding

```text
Customer Organisation
        │
        ▼
Thamani Freight Forwarding
        │
        ├── Road Carrier A
        ├── Shipping Line B
        ├── Warehouse C
        └── Broker D
        │
        ▼
TMS + Trade Docs + Regulations
```

Thamani remains the customer's commercial/service orchestrator.

---

# 75. Example — Customs Brokerage

```text
Customer Organisation
        │
        ▼
Thamani Customs Brokerage Service
        │
        ▼
Trade Docs
        │
        ├── CustomsCase
        ├── Declaration
        ├── Documents
        └── Authority interaction
        │
        ▼
Government Customs Authority
```

Thamani provides the brokerage service.

Trade Docs supplies reusable executable workflow.

The Customs authority remains sovereign.

---

# 76. Example — Cross-Border Logistics

```text
CUSTOMER ORGANISATION
        │
        ▼
Thamani Cross-Border Service
        │
        ├── B2B contract
        ├── SLA
        ├── customer communication
        └── service orchestration
        │
        ├────────► TMS
        │           transport
        │
        ├────────► Trade Docs
        │           documents / Customs workflow
        │
        ├────────► Regulations
        │           regulatory decisions
        │
        └────────► ERP
                    finance
```

---

# 77. Example — 4PL

```text
CUSTOMER ORGANISATION
        │
        ▼
Thamani 4PL Mandate
        │
        ▼
Thamani Control Tower
        │
        ├── Provider A
        ├── Provider B
        ├── Thamani Division
        └── Provider C
        │
        ▼
Reusable Baobab Engines
```

4PL remains particularly strong evidence for keeping:

```text
Thamani business orchestration
```

separate from:

```text
TMS transport execution
```

---

# 78. Platform Capability vs Logistics Provider

This distinction SHALL remain explicit:

```text
baobab-tms
    =
software capability provider

ABC Haulage Ltd
    =
physical logistics provider
```

The Control Plane may resolve TMS.

Thamani may select ABC Haulage.

Those are different decisions.

---

# 79. Engine Provider-Neutrality

The architecture SHALL continue to request:

```text
capability
```

rather than hard-code:

```text
engine name
```

at business-domain boundaries.

Conceptually:

```text
Thamani
   │
   ▼
logistics capability
   │
   ▼
Control Plane
   │
   ▼
Baobab TMS
```

The initial implementation may be Baobab TMS.

The capability identity remains provider-neutral.

---

# 80. Trade Docs Is Also Provider-Neutral

Likewise:

```text
Thamani
   │
   ▼
documents/customs capability
   │
   ▼
Control Plane
   │
   ▼
Baobab Trade Docs
```

rather than:

```text
every Thamani workflow directly imports
Trade Docs implementation internals
```

---

# 81. Shared Contract Follow-Ups

The engine extractions imply Shared contract work.

Target stable cross-engine contracts SHOULD eventually support appropriate representations of:

```text
LogisticsShipmentReference

ConsignmentReference

TransportMovementReference

TradeDocumentReference

DocumentVersionReference

CustomsCaseReference

RegulatoryDecisionReference
```

without leaking engine persistence structures.

---

# 82. Existing Shared Shipment Contract

Existing Shared shipment semantics SHALL NOT be silently mutated in place to mean the newer TMS `LogisticsShipment`.

TMS-0002 already establishes this constraint.

A compatible new contract/version SHALL be introduced through Shared governance.

---

# 83. Existing TradeDocument Contract

Likewise:

```text
contracts/trade-document/v1
```

SHALL not be silently mutated into the richer TDOC-0002 model.

A compatible:

```text
v2

or
new canonical contract family
```

SHALL follow Shared governance.

---

# 84. Event Governance

Physical transport facts SHOULD eventually publish under the proper:

```text
logistics.*
```

context once Shared governance certifies the producer and contracts.

They SHALL NOT simply repurpose:

```text
trade.shipment.*
```

events to mean TMS physical execution.

---

# 85. Document Events

Trade Docs SHOULD become the authoritative producer for appropriate:

```text
documents.*
```

facts after Shared capability/event governance approves the transfer.

Current registry ownership SHALL not be silently edited merely because TDOC ADRs exist.

---

# 86. Repository Consequences

The `thamani` repository SHALL be reconciled against this ADR.

At minimum:

```text
README

ADR index

route architecture

business-model labels

contracts.lock.yaml

Medusa dependencies

environment variables

fixtures

tests

IAM assumptions

customer models

provider models

navigation

copy

mock data
```

SHALL be reviewed.

---

# 87. Registry Consequences

Any active registry that still states:

```text
THAMANI-GLOBAL:
    business_model: B2C
```

SHALL be updated through the proper registry-governance process to reflect the accepted target architecture.

Recommended semantic meaning:

```text
business_model:
    B2B
```

with logistics/service classification represented separately where the registry supports it.

---

# 88. No Silent Registry Change

The registry SHALL be changed explicitly with:

```text
ADR reference

review

tests

downstream impact assessment
```

because the business-model field may have consumers.

---

# 89. IAM Consequences

Older IAM architecture or configuration containing assumptions such as:

```text
Thamani B2C Customer
```

SHALL be audited.

This ADR does NOT supersede another repository's IAM ADR directly.

Instead it establishes a new authoritative Thamani requirement:

```text
ORGANISATION-CENTRIC B2B ACCESS
```

to which IAM implementation must conform.

---

# 90. IAM Target Requirement

Thamani requires IAM support for:

```text
organisation membership

delegated administration

business roles

approval authorities

customer organisation context

provider organisation context

staff context

multi-organisation users

BFF/session security

step-up for high-risk actions
```

---

# 91. Commercial Account ≠ IAM Organisation

This distinction SHOULD remain:

```text
IAM / canonical organisation
    identifies organisation/principal

Thamani Customer Relationship
    defines commercial relationship
```

A canonical organisation may exist without being a Thamani customer.

---

# 92. Customer Master / ERP Boundary

ERP may maintain the financial/customer-account representation required for:

```text
AR

credit

billing

invoicing

tax

accounting
```

Thamani's customer relationship SHALL map to ERP where financial provisioning requires it.

Neither shall replace Control Plane canonical organisation identity.

---

# 93. Data Migration Consequences

Legacy:

```text
consumer account
```

data SHALL NOT automatically become:

```text
B2B customer organisation
```

Migration must establish actual business meaning.

---

# 94. Legacy Consumer Account Classification

Any legacy account SHALL be classified:

```text
TEST / SYNTHETIC

BUSINESS REPRESENTATIVE

INDIVIDUAL RECIPIENT

HISTORICAL CONSUMER RECORD

UNKNOWN
```

before migration.

---

# 95. No Fabricated Organisations

This SHALL be prohibited:

```text
legacy consumer account
    ↓
create fake company
```

merely to fit the B2B model.

---

# 96. Legacy Supplier Migration

Legacy supplier records may map to:

```text
Canonical Organisation
        +
Thamani Provider Relationship
```

only where actual organisation/provider facts exist.

Qualification SHALL be reassessed according to THA-0004 where necessary.

---

# 97. Public Digital Estate

The public site SHALL present Thamani as:

```text
B2B logistics company
```

with calls to action such as:

```text
Request a Quote

Track Shipment

Talk to Logistics Specialist

Become a Logistics Partner

Sign In
```

rather than:

```text
Shop Now

Add to Cart

Checkout
```

---

# 98. B2B Information Architecture

The public experience SHOULD emphasise:

```text
Services

Solutions

Industries

Markets / Network

Tracking

Request a Quote

Insights

About

Partner With Us

Sign In
```

---

# 99. Customer Portal Mental Model

The target customer journey is:

```text
MY COMPANY
    │
    ▼
OUR LOGISTICS RELATIONSHIP WITH THAMANI
    │
    ├── RFQs
    ├── Quotes
    ├── Contracts
    ├── Service Orders
    ├── Shipments
    ├── Inventory
    ├── Documents
    ├── Projects
    ├── Claims
    └── Invoices
```

not:

```text
MY SHOPPING ACCOUNT
```

---

# 100. B2B Reporting

Reporting SHOULD support organisational dimensions such as:

```text
customer organisation

business unit

site

market

service line

lane

project

cost centre reference

contract

service order
```

where required.

---

# 101. Contracted Rates

B2B customer pricing may be governed by:

```text
contract rates

customer-specific rates

lane rates

project rates

volume tiers

framework agreement

spot quotation
```

rather than public retail prices.

---

# 102. Public Prices Are Not Required

The Thamani public estate SHALL NOT require public price display.

Logistics services MAY legitimately require:

```text
RFQ

rate calculation

negotiation

contract pricing
```

before price is known.

---

# 103. B2B Approval Flow

The architecture SHALL permit:

```text
Quote prepared
      │
      ▼
Customer requester
      │
      ▼
Customer approver
      │
      ▼
Accepted
      │
      ▼
Service order
```

where customer governance requires it.

---

# 104. Customer API / Integration

Mature B2B customers MAY eventually integrate through:

```text
API

webhook

EDI

file exchange

other governed machine-to-machine channel
```

rather than using only browser interactions.

This remains consistent with the B2B model.

---

# 105. B2B Does Not Mean Human-Only

Therefore:

```text
B2B
    !=
manual sales process only
```

Automation is permitted where contracts, identity and authority remain clear.

---

# 106. Platform Interoperability Principle

UN/CEFACT's RDM architecture deliberately supports interoperability among different business-domain models derived from a common semantic foundation.

Baobab SHALL follow the same architectural direction:

```text
standardise contracts

preserve bounded authorities

compose capabilities
```

rather than centralising all logistics into the Thamani repository.

---

# 107. Consequences for TMS ADR Programme

Further reusable decisions regarding:

```text
transport planning

movement

route

carrier booking

fleet/resources

telemetry

tracking

transport cost

delivery

transport exception

transport API/events

transport persistence

TMS security

TMS resilience
```

SHALL be written under:

```text
ADR-TMS-*
```

not:

```text
ADR-THA-*
```

unless the decision concerns specifically how Thamani consumes/composes the capability.

---

# 108. Consequences for Trade Docs ADR Programme

Further reusable decisions regarding:

```text
document dossier

CustomsCase

declaration

authority adapters

transit

signatures

evidence

document storage

WCO interoperability

Trade Docs API/events

security

resilience
```

SHALL be written under:

```text
ADR-TDOC-*
```

---

# 109. Consequences for Regulations

Reusable decisions regarding:

```text
legal applicability

regulatory classification

regulatory requirements

regulatory decisions

jurisdiction packs
```

remain under:

```text
ADR-REG-*
```

---

# 110. Consequences for Thamani ADR Programme

After this reconciliation, additional Thamani ADRs SHOULD be rare.

A new `ADR-THA-*` is justified where the decision concerns:

```text
Thamani-specific B2B business model

Thamani customer proposition

Thamani service composition

Thamani organisation/customer relationship

Thamani operational governance

Thamani Digital Estate

Thamani commercial policy
```

It SHOULD NOT be used to redefine reusable platform engine semantics.

---

# 111. Supersession Precedence

Where an earlier Thamani ADR conflicts with this ADR:

```text
ADR-THA-0018
```

SHALL govern Thamani business-model and responsibility-allocation interpretation.

Where an earlier Thamani ADR conflicts with an accepted owning-engine ADR on reusable engine internals:

```text
TMS ADR
TDOC ADR
REG ADR
ERP ADR
IAM ADR
CP ADR
Shared ADR
```

the owning-engine/platform ADR SHALL govern its bounded context.

---

# 112. Historical Value Is Preserved

Superseding an ADR does NOT mean deleting it.

The earlier decisions document:

```text
how architecture evolved

why dedicated engines were created

which ideas were extracted

which boundaries changed
```

They SHALL remain in Git history and the ADR index.

---

# 113. Recommended ADR Headers

The superseded ADRs SHOULD receive concise status annotations.

For example:

```text
ADR-0001

Status:
Superseded by ADR-THA-0003 and ADR-THA-0018
```

---

# 114. THA-0005 Recommended Annotation

```text
Status:
Accepted Historically —
Superseded in Part by ADR-TMS-0001,
ADR-TMS-0002 and ADR-THA-0018.

Reusable transport-execution semantics
now belong to Baobab TMS.
```

---

# 115. THA-0007 Recommended Annotation

```text
Status:
Accepted Historically —
Superseded in Part by Baobab TMS
resource/fleet ADRs and ADR-THA-0018.

Thamani retains fleet business strategy;
TMS owns reusable operational resource semantics.
```

---

# 116. THA-0008 Recommended Annotation

```text
Status:
Accepted as Service-Composition Architecture —
Superseded in Part by ADR-TMS-*,
ADR-TDOC-* and ADR-REG-*.

Thamani owns the cross-border customer service;
the reusable execution domains reside in
their respective Baobab engines.
```

---

# 117. THA-0014 Recommended Annotation

```text
Status:
Accepted as Modified by ADR-THA-0018.

Customer Experience means primarily
organisation-centric B2B Customer Experience.
```

---

# 118. THA-0017 Recommended Annotation

```text
Status:
Accepted as Modified by ADR-THA-0018.

The migration target is explicitly
a B2B logistics Digital Estate.
```

---

# 119. Architecture Before and After

## Before

```text
THAMANI B2C
│
├── Product Catalogue
├── Consumer Account
├── Retail Search
├── Cart
├── Checkout
├── Supplier Portal
└── Medusa Store API
        │
        ▼
   BAOBAB TRADE
```

## After

```text
                     THAMANI B2B
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
       CUSTOMER        PARTNER       OPERATIONS
    ORGANISATION    ORGANISATION
          │              │
          └──────────────┼──────────────┘
                         ▼
                 THAMANI SERVICES
                         │
       ┌─────────────────┼─────────────────┐
       ▼                 ▼                 ▼
 BAOBAB TMS       BAOBAB TRADE DOCS   REGULATIONS
 transport          documents /         regulatory
 execution          Customs workflow       meaning
       │                 │                 │
       └─────────────────┼─────────────────┘
                         ▼
                        ERP
                         │
                         ▼
                   CONTROL PLANE
              context / provider resolution
```

---

# 120. Strategic Transformation in One Sentence

The complete architectural transition SHALL be understood as:

> **Thamani moved from owning a B2C commerce experience over Baobab Trade to owning a B2B logistics-service experience that composes reusable Baobab transport, document, regulatory, financial, identity and control-plane capabilities.**

---

# 121. Fundamental Invariants

The following SHALL remain non-negotiable:

```text
Thamani
    = B2B logistics enterprise

Thamani
    != B2C retail storefront

B2B
    != B2B ecommerce automatically

Customer
    primarily = Organisation relationship

Natural Person
    != Consumer Customer automatically

Individual Recipient
    != B2C commercial relationship

B2B2C Last Mile
    != B2C Thamani business model

Customer Organisation
    != Tenant automatically

Organisation Role
    != Organisation Identity

Customer Organisation
    may also be Provider Organisation

Business Division
    != Platform Engine

Business Service
    != Software Engine

Thamani Haulage Service
    != TMS

Thamani Customs Brokerage Service
    != Trade Docs

Thamani Cross-Border Service
    != Regulations

LogisticsShipment
    belongs to TMS

Consignment
    belongs to TMS

TransportPlan
    belongs to TMS

TransportMovement
    belongs to TMS

Transport Resource Execution
    belongs to TMS

TradeDocument
    belongs to Trade Docs

CustomsCase
    belongs to Trade Docs

Customs Declaration Workflow
    belongs to Trade Docs

RegulatoryDecision
    belongs to Regulations

Sovereign Customs Decision
    belongs to competent authority

Accounting Truth
    belongs to ERP

Organisation Identity
    belongs to Control Plane

Capability Resolution
    belongs to Control Plane

Authentication
    belongs to IAM

Customer Contract
    belongs to Thamani commercial domain

Customer Sell Price
    belongs to Thamani

Customer SLA
    belongs to Thamani

Service Composition
    belongs to Thamani

4PL Customer Mandate
    belongs to Thamani

Control Tower Customer Projection
    belongs to Thamani

Customer-facing screen
    may compose many authoritative domains

Screen ownership
    != fact authority

Cart
    != Service Order

Checkout
    != Logistics Booking

Medusa
    != Universal Thamani Backend

TMS Engine
    != Physical Carrier

Trade Docs
    != Customs Authority

Moving functionality to an engine
    != removing the business service from Thamani

Superseded ADR
    != Deleted History
```

---

# 122. Implementation Reconciliation Sequence

The repository SHOULD now be reconciled in this order.

## THA-B2B-00 — ADR Index

Update the ADR index with:

```text
Superseded

Superseded in Part

Accepted as Modified

Retained
```

statuses established by this ADR.

---

## THA-B2B-01 — Business-Model Registry

Locate every active representation of:

```text
THAMANI-GLOBAL = B2C
```

and update it through the governing registry/change process.

---

## THA-B2B-02 — Documentation

Reconcile:

```text
README

architecture documents

deployment docs

developer docs

route docs

user journey docs
```

to state:

```text
B2B logistics enterprise
```

---

## THA-B2B-03 — Legacy Retail Surface Removal

Classify:

```text
/shop

/products/*

/cart

/checkout

retail search
```

for removal/redirect/retirement according to THA-0017.

---

## THA-B2B-04 — Customer Organisation Model

Implement/consume:

```text
Canonical Organisation

Customer Relationship

Organisation Membership

Role

Approval Authority

Resource Scope
```

through the appropriate CP/IAM/Thamani boundaries.

---

## THA-B2B-05 — Customer Portal IA

Align THA-0014 implementation to:

```text
Company

RFQs

Quotes

Contracts

Service Orders

Shipments

Warehousing

Documents

Projects

4PL

Claims

Invoices

Reports
```

rather than retail constructs.

---

## THA-B2B-06 — Partner Portal

Align providers to THA-0004 organisation/provider relationships.

Remove legacy supplier=B2C-estate assumptions.

---

## THA-B2B-07 — TMS Extraction

Remove any Thamani-native canonical implementation that conflicts with TMS authority for:

```text
LogisticsShipment

Consignment

TransportPlan

Movement

route

booking

resource assignment

tracking

delivery
```

while retaining adapters/projections required by the Thamani Digital Estate.

---

## THA-B2B-08 — Trade Docs Extraction

Remove or prevent duplicate Thamani authority for:

```text
TradeDocument

document versioning

document dossier

CustomsCase

CustomsDeclaration

authority workflow
```

and consume Trade Docs contracts instead.

---

## THA-B2B-09 — Regulations Reconciliation

Ensure Thamani does not implement regulatory decision logic now owned by:

```text
baobab-regulations
```

---

## THA-B2B-10 — Commercial Reconciliation

Preserve THA-0006 sell-side B2B semantics:

```text
RFQ

Quote

Contract

Rate

Margin

Approval

Service Order
```

without converting them into retail commerce constructs.

---

## THA-B2B-11 — Contract Lock

Rebuild:

```text
contracts.lock.yaml
```

around actual B2B logistics capabilities.

Remove historical assumptions that:

```text
Baobab Trade / Medusa
```

is necessarily the estate's primary backend.

---

## THA-B2B-12 — IAM Reconciliation

Audit historical:

```text
B2C customer
```

IAM assumptions and reconcile through the IAM architecture programme.

---

## THA-B2B-13 — Tests

Add architectural/conformance tests preventing reintroduction of:

```text
B2C labels

cart/checkout

consumer customer authority

duplicate TMS models

duplicate TradeDocument models
```

where practical.

---

## THA-B2B-14 — Migration / Go-Live

Update THA-0017 implementation plans so every go-live profile is evaluated against:

```text
B2B customer organisations

B2B providers

organisation-scoped IAM

TMS capability readiness

Trade Docs readiness

Regulations readiness

ERP provisioning

Control Plane context
```

---

# 123. Rejected Alternatives

## Alternative A — Keep Thamani “B2C and B2B”

**Rejected as the primary architecture.**

It would preserve two fundamentally different customer, identity, pricing, UX and transaction models without demonstrated business need.

---

## Alternative B — Call Thamani B2C Because Last-Mile Deliveries Reach Individuals

**Rejected.**

Physical delivery recipient and contractual customer are different concepts.

---

## Alternative C — Keep Cart and Checkout but Rename Them

**Rejected.**

B2B logistics RFQ/contract/service-order semantics should be represented directly.

---

## Alternative D — Keep Shipment/Fleet Logic Inside Thamani and Also Build TMS

**Rejected.**

That creates duplicate canonical transport authority.

---

## Alternative E — Keep Customs Documents Inside Thamani and Also Build Trade Docs

**Rejected.**

That creates duplicate documentary and workflow authority.

---

## Alternative F — Move All Thamani Business Logic Into TMS

**Rejected.**

TMS is a reusable transport engine, not Thamani's commercial/customer domain.

---

## Alternative G — Move All Cross-Border Logic Into Trade Docs

**Rejected.**

Cross-border service composition includes transport, commercial, regulatory and financial concerns beyond documents.

---

## Alternative H — Make Trade Docs the Regulatory Decision Engine

**Rejected.**

Regulations remains PDP; Trade Docs executes documentary workflow.

---

## Alternative I — Make Baobab Trade the B2B Backend Because Thamani Is B2B

**Rejected.**

B2B logistics does not imply B2B product commerce.

---

## Alternative J — Delete Superseded ADRs

**Rejected.**

They explain the evolution of the architecture and remain valuable historical evidence.

---

# 124. Consequences

## Positive

This decision:

```text
eliminates ambiguity around B2B vs B2C

clarifies organisation-centric customer architecture

prevents cart/checkout semantics from returning

clarifies TMS authority

clarifies Trade Docs authority

preserves Thamani service ownership

reduces duplicated domain logic

clarifies cross-border responsibility

simplifies future engineering decisions

provides an explicit historical map

improves onboarding for future developers

improves go-live planning
```

---

## Negative / Cost

The decision requires:

```text
registry updates

ADR-status reconciliation

documentation changes

route/UI redesign

IAM review

legacy data review

contract-lock changes

potential removal of Medusa-specific code

migration work

TMS/TDOC integration work
```

These costs are intentional consequences of making the architecture coherent.

---

# 125. Final Authority Model

```text
                         CUSTOMER ORGANISATION
                                  │
                                  ▼
                           THAMANI GLOBAL
                         B2B LOGISTICS SERVICE
                                  │
            ┌─────────────────────┼──────────────────────┐
            ▼                     ▼                      ▼
      COMMERCIAL DOMAIN     SERVICE COMPOSITION      DIGITAL ESTATE
            │                     │                      │
            └─────────────────────┼──────────────────────┘
                                  ▼
                         BAOBAB PLATFORM
                                  │
       ┌───────────────┬──────────┼──────────┬──────────────┐
       ▼               ▼          ▼          ▼              ▼
      TMS         TRADE DOCS     ERP    REGULATIONS        IAM
 transport         documents    finance    regulatory     identity
 execution        / Customs                decision
       │               │          │          │              │
       └───────────────┴──────────┼──────────┴──────────────┘
                                  ▼
                           CONTROL PLANE
                  organisation / context /
                    capability resolution
```

---

# 126. Final Decision

Thamani Global SHALL henceforth be understood and implemented as:

> **an organisation-centric B2B integrated logistics enterprise.**

Its primary customers are organisations purchasing logistics services.

Natural persons interact with Thamani principally as:

```text
organisation representatives

employees

approvers

contacts

consignees

recipients

partner users

operators
```

rather than as retail shoppers.

The following legacy model is retired:

```text
B2C
+
catalogue
+
cart
+
checkout
+
consumer-commerce account
+
Medusa-centric Digital Estate
```

The following commercial model replaces it:

```text
Customer Organisation
        │
        ▼
RFQ
        │
        ▼
Quotation
        │
        ▼
Contract / Rate Agreement
        │
        ▼
Service Order
        │
        ▼
Logistics Execution
        │
        ▼
Invoice / Statement
```

The reusable transport architecture originally developed partly within Thamani is reallocated to:

```text
baobab-tms
```

including:

```text
LogisticsShipment

Consignment

TransportPlan

TransportRoute

TransportMovement

TransportLeg

TransportCall

transport booking

transport means/equipment

capacity

resource assignment

tracking

transport custody

delivery
```

The reusable document and Customs-workflow architecture is reallocated to:

```text
baobab-trade-docs
```

including:

```text
TradeDocument

DocumentVersion

DocumentContent

ContentArtifact

DocumentRelationship

DocumentDossier

CustomsCase

CustomsDeclaration

authority submission

authority response projection

documentary evidence workflow
```

Regulatory interpretation remains with:

```text
baobab-regulations
```

Sovereign legal/Customs decisions remain with:

```text
competent external authorities
```

Financial truth remains with:

```text
baobab-erp
```

Canonical organisation, tenant/context and capability/provider resolution remain with:

```text
baobab-cp
```

Authentication remains with:

```text
baobab-iam
```

And Thamani continues to own:

```text
the B2B customer relationship

the logistics service proposition

RFQs

customer quotations

customer contracts

customer sell-side pricing

service orders

customer SLAs

business-division composition

4PL mandates

provider-selection policy

customer-facing control tower

claims

service recovery

communications

and the Thamani Digital Estate
```

The defining commercial principle is:

> **Thamani sells logistics services to organisations; it does not operate as a retail shopping estate.**

The defining customer principle is:

> **A natural person receiving cargo does not by itself create a B2C relationship; the contractual customer relationship determines the commercial model.**

The defining extraction principle is:

> **Moving transport or document functionality into reusable Baobab engines transfers software-domain authority, not Thamani's customer-facing business responsibility.**

The defining TMS principle is:

> **Thamani provides and orchestrates logistics; Baobab TMS supplies reusable canonical transport-execution semantics.**

The defining Trade Docs principle is:

> **Thamani provides trade-document and Customs-related services to its customers; Baobab Trade Docs supplies reusable executable document and Customs-workflow semantics.**

The defining regulatory principle is:

> **Regulations determines regulatory meaning, Trade Docs executes the documentary workflow, TMS executes physical transport, and competent authorities retain sovereign decision authority.**

The defining platform principle is:

> **Thamani shall compose Baobab capabilities rather than duplicate them.**

And the defining historical principle is:

> **The Thamani ADR history shall remain intact, but ADR-THA-0018 provides the authoritative map explaining which earlier decisions were superseded, which remain valid, and where reusable responsibilities now reside.**
