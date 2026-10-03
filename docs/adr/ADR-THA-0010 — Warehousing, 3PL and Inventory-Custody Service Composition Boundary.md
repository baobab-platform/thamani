# ADR-THA-0010 — Warehousing, 3PL and Inventory-Custody Service Composition Boundary

**Status:** Accepted — Reconciled with ADR-TMS-0002 and ADR-TDOC-0002  
**Date:** 2026-10-03  
**Decision Owners:** Nabhold Group Africa / Thamani Global / Baobab Platform Architecture  
**Primary Repository:** `baobab-platform/thamani`  
**Legal Entity:** `THAMANI-GLOBAL`  
**Business Divisions:** Warehousing / 3PL / Cross-Border Logistics / Cold Chain / 4PL  
**Digital Estate:** Thamani  
**Transport Execution Authority:** bound `logistics.*` provider, initially targeted to `baobab-platform/baobab-tms`  
**Trade-Document Authority:** `baobab-platform/baobab-trade-docs`  
**Financial Inventory Authority:** `baobab-platform/baobab-erp`  
**Canonical Inventory / Ownership / Custody Semantics:** `baobab-platform/baobab-cp` + `baobab-platform/shared`  
**Regulatory Decision Authority:** `baobab-platform/baobab-regulations`  
**Commerce Inventory Authority:** `baobab-platform/baobab-trade` where commerce applies  
**Warehouse Execution Provider:** Provider-neutral — ERP warehouse capability, specialist WMS, external 3PL platform or future Baobab warehouse engine  
**Decision Class:** Warehousing / 3PL / custody / inventory / warehouse execution / service composition / TMS hand-off / documentary boundary

---

# 1. Normative Dependencies

This ADR SHALL be interpreted consistently with:

- ADR-THA-0003 — Thamani Global Integrated Shipping, Transportation and Logistics Enterprise Domain Boundary
- ADR-THA-0004 — Canonical Logistics Counterparty, Carrier, Service-Provider Qualification and Partner Onboarding
- ADR-THA-0006 — RFQ, Logistics Quotation, Contract, Rate and Margin Architecture
- ADR-THA-0009 — Baobab Capability Consumption, Engine Authority and System-of-Record Boundary
- ADR-TMS-0001 — Baobab TMS Mission, Authority, Transport Execution Boundary and Platform Capability Role
- **ADR-TMS-0002 — Canonical LogisticsShipment, Consignment and Transport Execution Domain Model**
- ADR-TDOC-0001 — Baobab Trade Docs Mission, Authority, Executable Trade Document and Customs Workflow Boundary
- **ADR-TDOC-0002 — Canonical TradeDocument, Version, Content and Relationship Model**
- ADR-BCP-013 — Canonical Inventory Ownership, Custody, Location and In-Transit Model
- ADR-BCP-014 — Canonical Counterparty Identity, Roles and Relationships Model
- ADR-SHARED-017 — Canonical Capability Catalogue, Provider Declaration, Engine Registry and Runtime Capability Convergence
- ADR-SHARED-018 — Canonical Event Context Registry, Event-Type Ownership and Legacy Event Migration
- ADR-ERP-015 — ERP Inventory, Warehouse, Procurement and Supply-Chain Architecture
- applicable IAM, regulatory, evidence and mapping decisions.

---

# 2. Reconciliation Outcome

ADR-TMS-0002 and ADR-TDOC-0002 do **not** invalidate the central THA-0010 decision.

They clarify its boundaries.

The following Thamani decisions remain unchanged:

```text
Thamani provides Warehousing services.

Thamani provides 3PL services.

3PL is a business/service composition,
not one software engine.

Warehouse execution remains provider-neutral.

Thamani does not become a WMS.

Baobab TMS does not become a WMS.

ERP remains authoritative for
financially consequential inventory.

Ownership
!= Custody
!= Physical Location
!= Financial Inventory
!= Commercial Availability.

A dedicated baobab-wms
is not justified merely by this ADR.
```

The following areas are now refined by TMS-0002:

```text
Shipment
    → LogisticsShipment where physical logistics is meant.

Warehouse transport references
    → canonical TMS references.

Consignment
    → TMS canonical Consignment.

HandlingUnit
    → TMS canonical transport execution concept
      once used in transport execution.

Transport custody
    → TMS authority.

Movement / Arrival / Departure
    → TMS authority.
```

The following areas are now refined by TDOC-0002:

```text
Warehouse Receipt document
    != physical Warehouse Receipt event.

Document
    != File.

Document
    != Evidence.

POD document
    != Delivery fact.

Inspection document
    != Inspection event.

TradeDocument lifecycle
    → Trade Docs authority.

Document versions/content/relationships
    → Trade Docs authority.

Warehouse documents
    SHALL reference source operational facts;
    they do not replace those facts.
```

---

# 3. Executive Decision

Thamani SHALL provide **Warehousing and 3PL as first-class customer services**.

Thamani SHALL own:

```text
customer warehousing proposition

3PL commercial relationship

customer RFQ

customer quotation

customer contract

service order

customer instructions

SLA

commercial pricing

service composition

customer-facing visibility

service exception coordination
```

Thamani SHALL NOT automatically own:

```text
warehouse execution

transport execution

financial inventory

trade-document lifecycle

customs workflow

regulatory interpretation
```

The target architecture is:

```text
                         CUSTOMER
                            │
                            ▼
                    THAMANI 3PL SERVICE
                            │
                Contract / SLA / Service Order
                            │
          ┌─────────────────┼──────────────────┐
          ▼                 ▼                  ▼
      Warehousing       Transportation      Customs /
          │                 │               Documents
          ▼                 ▼                  ▼
 Warehouse Capability  Baobab TMS        Trade Docs
          │                 │                  │
          └─────────────┬───┴───────────┬──────┘
                        │               │
                        ▼               ▼
                      ERP          Regulations
                    financial       decisions
                     truth
                        │
                        ▼
               THAMANI CONTROL TOWER
```

---

# 4. Governing Principle

> **Thamani owns the warehousing and 3PL customer outcome; specialised engines and providers retain authority over the physical, transport, documentary, regulatory and financial facts from which that outcome is composed.**

---

# 5. 3PL Is Not a Software Bounded Context

Thamani 3PL represents:

```text
commercial responsibility

customer relationship

operational accountability

SLA

service orchestration

multi-provider coordination
```

It SHALL NOT be represented as:

```text
3PL Engine
```

merely because it is a business division.

A 3PL engagement may compose:

```text
Warehousing
+
Transport
+
Inventory Handling
+
Order Fulfilment
+
Trade Documents
+
Customs
+
Returns
+
Value-Added Services
+
Financial Settlement
+
Visibility
```

---

# 6. Warehousing Is Also Not One Universal Engine

Warehouse service delivery MAY be implemented by:

```text
iDempiere warehouse functionality

external WMS

customer WMS

external 3PL platform

specialist SaaS WMS

future Baobab warehouse engine
```

depending upon capability resolution.

Thamani SHALL consume the capability.

It SHALL not hard-code one implementation as the warehouse concept itself.

---

# 7. No Premature `baobab-wms`

This ADR does NOT create:

```text
baobab-wms
```

as a required platform engine.

A dedicated WMS SHALL be considered only when a sufficiently reusable and distinct bounded context is demonstrated.

Potential triggers include:

```text
complex bin management

wave planning

slotting optimisation

RF/scanner execution

warehouse automation

robotics integration

advanced replenishment

multi-client warehouse isolation

labour management

yard management

high-volume fulfilment
```

---

# 8. TMS Is Not WMS

ADR-TMS-0001 and TMS-0002 govern this boundary.

TMS owns:

```text
LogisticsShipment

Consignment

TransportPlan

TransportMovement

TransportLeg

TransportCall

TransportEvent

transport capacity

transport resource

transport custody

delivery execution
```

It SHALL NOT automatically own:

```text
warehouse bin

rack

putaway

replenishment

warehouse pick

cycle count

slotting

warehouse stock count
```

---

# 9. ERP Is Not Automatically WMS

ERP remains authoritative for financially consequential inventory.

ERP MAY provide warehouse-execution functionality.

That does not establish a permanent platform rule that all future advanced warehouse execution must remain inside ERP.

---

# 10. Core Inventory Doctrine

Thamani SHALL preserve the BCP-013 principle that:

```text
Physical Quantity
    != Financial Inventory

Ownership
    != Custody

Custody
    != Location

Location
    != Commercial Availability

Commercial Reservation
    != Physical Allocation

Physical Presence
    != Title

Warehouse Receipt
    != Ownership Transfer

Dispatch
    != Financial Goods Issue
```

---

# 11. Inventory Dimensions

A complete warehouse situation may require independent answers to:

```text
WHAT?
    Product / material / item

HOW MUCH?
    Quantity + UOM

WHO OWNS IT?
    Inventory owner

WHO HAS PHYSICAL CUSTODY?
    Custodian

WHERE IS IT?
    Facility / location

WHAT PHYSICAL CONDITION?
    Accepted / damaged / quarantine etc.

WHAT CUSTOMS CONDITION?
    Released / bonded / hold etc.

WHAT COMMERCIAL CONDITION?
    Available / reserved / allocated

WHAT FINANCIAL CONDITION?
    Financial ownership / valuation

WHAT TRANSPORT CONDITION?
    Awaiting pickup / in transport / delivered
```

No single engine need own every dimension.

---

# 12. Inventory Owner

`InventoryOwner` identifies the applicable ownership party.

Examples:

```text
Thamani

ZuriBeans

customer

supplier

consignee

another Nabhold subsidiary

external principal
```

Warehouse location SHALL not determine ownership.

---

# 13. Customer-Owned Inventory

Thamani SHALL support:

```text
Customer owns goods
        +
Thamani stores goods
```

without placing those goods onto Thamani's balance sheet merely because Thamani has custody.

---

# 14. Custody

Custody identifies:

> **Who presently has physical responsibility/control for the goods?**

Examples:

```text
Owner:
ZuriBeans

Custodian:
Thamani-operated warehouse
```

or:

```text
Owner:
Customer A

Custodian:
External 3PL warehouse
```

---

# 15. Custody Is Temporal

Custody SHALL change through explicit hand-offs.

Example:

```text
Supplier
    │
    ▼
Carrier
    │
    ▼
Warehouse
    │
    ▼
Carrier
    │
    ▼
Customer
```

The custody chain SHOULD remain reconstructable.

---

# 16. TMS-0002 Custody Reconciliation

ADR-TMS-0002 establishes transport execution custody as a TMS concern.

Therefore:

```text
Warehouse Custody
        │
        ▼
Physical Handover
        │
        ▼
TMS Transport Custody
```

SHALL be the canonical boundary.

The warehouse provider SHALL own the operational fact:

```text
goods released by warehouse
```

TMS SHALL own the continuing transport execution fact:

```text
goods accepted into transport custody
```

---

# 17. Handover Is a Cross-Domain Fact

The handover SHOULD eventually use a Shared provider-neutral contract.

Conceptually:

```text
CustodyHandover
├── subject_reference
├── releasing_party
├── receiving_party
├── releasing_domain
├── receiving_domain
├── location
├── quantity
├── UOM
├── physical_condition
├── occurred_at
├── evidence_refs[]
├── discrepancies[]
└── correlation
```

This ADR does not establish final Shared schema.

---

# 18. Handover Subject

A custody handover MAY apply to:

```text
CargoItem

HandlingUnit

TransportEquipment

inventory lot

package group
```

depending upon execution context.

---

# 19. `LogisticsShipment`

Whenever THA-0010 refers to physical shipment execution, the canonical term SHALL be:

```text
LogisticsShipment
```

as established by ADR-TMS-0002.

The unqualified:

```text
Shipment
```

SHALL be avoided where it could be confused with:

```text
TradeShipment

CommerceFulfilment
```

---

# 20. Warehouse-to-TMS Relationship

Warehouse execution MAY be associated with:

```text
LogisticsShipmentReference

ConsignmentReference

CargoItemReference

HandlingUnitReference

TransportMovementReference
```

using canonical TMS identity.

The warehouse provider SHALL NOT create competing canonical TMS aggregates.

---

# 21. `HandlingUnit` Reconciliation

ADR-TMS-0002 defines `HandlingUnit` as a physical aggregation handled operationally as one logistics unit.

Examples include:

```text
pallet

cage

roll container

crate assembly

project cargo unit
```

---

# 22. Warehouse Formation of Handling Units

A warehouse provider MAY physically:

```text
build

break down

repack

label

scan

move
```

a HandlingUnit.

The warehouse execution provider owns those warehouse operational facts.

---

# 23. TMS Canonical Transport Projection

Where a HandlingUnit participates in transport execution:

```text
Warehouse Provider
     │
     │ handling event
     ▼
Canonical TMS HandlingUnit projection
     │
     ▼
Consignment / Transport execution
```

SHALL be preferred to maintaining an independently authoritative Thamani handling-unit model.

---

# 24. Provider Handling-Unit ID

A WMS/provider may use:

```text
PALLET-00891
```

as a local ID.

TMS may use:

```text
canonical HandlingUnit ID
```

The provider ID SHALL be an ExternalReference or mapping.

---

# 25. HandlingUnit Is Not TransportEquipment

This remains:

```text
HandlingUnit
    != TransportEquipment
```

For example:

```text
Pallet
    HandlingUnit

40-foot container
    TransportEquipment
```

according to TMS-0002 semantics.

---

# 26. Package Boundary

Warehouse packing MAY create:

```text
TransportPackage

HandlingUnit
```

facts that later participate in TMS execution.

The physical packaging operation remains a warehouse event.

The canonical transport-use projection belongs to TMS where it participates in LogisticsShipment/Consignment execution.

---

# 27. `CargoItem`

ADR-TMS-0002 defines `CargoItem` as a logistics execution projection/snapshot.

Warehouse execution SHALL NOT redefine CargoItem as the inventory master.

Warehouse operations normally work from:

```text
product/material reference

inventory lot

batch

serial

quantity

condition
```

and correlate those facts with TMS CargoItems at the transport boundary.

---

# 28. Product vs CargoItem

This remains:

```text
Product
    != CargoItem
```

and:

```text
Inventory Position
    != CargoItem
```

---

# 29. `Consignment`

Consignment SHALL retain its ADR-TMS-0002 meaning:

> goods moved under a transport/carriage arrangement.

Warehouse execution MAY reference a Consignment.

It SHALL not use Consignment as a synonym for:

```text
warehouse order

inventory lot

storage account

receipt
```

---

# 30. One Warehouse Operation May Serve Several Consignments

For example:

```text
Warehouse Pick Wave
        │
        ├── Consignment A cargo
        ├── Consignment B cargo
        └── Consignment C cargo
```

The warehouse work remains one operational process while transport identities remain independent.

---

# 31. One Consignment May Cross Several Warehouses

Likewise:

```text
Consignment C
      │
      ├── Origin Warehouse
      ├── Cross-Dock
      └── Destination Warehouse
```

SHALL not produce duplicate Consignment identities.

---

# 32. Physical Warehouse Receipt

`PhysicalWarehouseReceipt` or equivalent operational event SHALL mean:

> **the warehouse execution provider physically accepted specified goods into its custody or processing scope.**

It is an operational fact.

---

# 33. Physical Receipt Does Not Mean

```text
ownership transferred

financial receipt posted

quality accepted

Customs released

goods commercially available

warehouse-receipt instrument legally issued
```

These are separate facts.

---

# 34. Warehouse Receipt Document

TDOC-0002 now makes this distinction explicit:

```text
Physical Warehouse Receipt Event
            !=
Warehouse Receipt TradeDocument
```

If the warehouse issues a documentary warehouse receipt:

```text
Warehouse Execution Fact
        │
        ▼
Trade Docs
        │
        ▼
TradeDocument:
WAREHOUSE_RECEIPT
```

Trade Docs SHALL own the documentary identity, version, content and relationships.

---

# 35. Transferable Warehouse Receipt

Where a warehouse receipt is legally transferable:

```text
ordinary TradeDocument semantics
```

are insufficient.

TDOC-0002 requires additional:

```text
transferability

control

integrity

legal-regime
```

semantics.

Thamani SHALL NOT model transferability itself.

---

# 36. Warehouse Receipt File

This SHALL remain:

```text
Warehouse Receipt PDF
    !=
Warehouse Receipt TradeDocument
```

and:

```text
Warehouse Receipt TradeDocument
    !=
Physical Receipt Event
```

---

# 37. Receiving Workflow

A warehouse receiving workflow MAY include:

```text
appointment

transport arrival

unloading

identification

count

condition inspection

discrepancy capture

custody acceptance

receipt confirmation

putaway eligibility
```

---

# 38. Transport Arrival

ADR-TMS-0002 establishes:

```text
TransportMovement / TransportCall / TransportEvent
```

as TMS concepts.

Therefore:

```text
truck arrived at warehouse
```

is fundamentally a TMS transport event.

---

# 39. Warehouse Acceptance

The fact:

```text
warehouse physically accepted goods
```

belongs to warehouse execution.

The two SHALL not be collapsed.

---

# 40. Arrival Is Not Receipt

This remains:

```text
Transport arrived
    !=
Warehouse received cargo
```

---

# 41. Receipt Is Not Putaway

Likewise:

```text
Warehouse received cargo
    !=
Cargo put away
```

---

# 42. Putaway

Putaway belongs to warehouse execution.

Conceptually:

```text
Receiving Zone
     │
     ▼
Putaway Task
     │
     ▼
Storage Location
```

TMS SHALL not manage this internal facility execution.

---

# 43. Warehouse Location

Warehouse execution MAY represent:

```text
zone

rack

bin

bulk area

cold room

quarantine area

bonded area

staging area
```

according to the chosen warehouse provider.

---

# 44. Facility Identity vs Provider Location

Where cross-engine reference is required:

```text
Canonical Facility
      │
      ├── ERP warehouse ID
      ├── WMS facility ID
      ├── WMS bin ID
      └── 3PL provider location
```

SHALL use governed mappings.

---

# 45. Physical Inventory Position

A warehouse execution provider MAY own the authoritative physical position:

```text
WarehouseInventoryPosition
├── product/material reference
├── owner
├── custodian
├── facility
├── internal location
├── lot/batch/serial
├── quantity
├── UOM
├── quality state
├── customs condition
└── observed_at
```

---

# 46. Financial Inventory

ERP remains authoritative for:

```text
financial ownership

valuation

cost

financial receipt

financial issue

financial transfer

financial adjustment

landed cost

GL consequence
```

---

# 47. Commercial Availability

Where commerce applies, the applicable commercial provider remains authoritative for:

```text
available-to-promise

reservation

sales allocation

channel availability
```

Warehouse execution SHALL not become commercial pricing/ATP authority merely because it knows physical stock.

---

# 48. Physical Quantity ≠ Available Quantity

Example:

```text
Physical:
100 units

Quality Hold:
5

Customs Hold:
20

Commercial Reserved:
30

Commercial Available:
45
```

is perfectly valid.

---

# 49. No Universal Quantity

This remains prohibited:

```text
inventory_quantity = 100
```

as the complete inventory state.

---

# 50. Physical Receipt vs ERP Receipt

Example:

```text
Warehouse:
10 pallets physically received

Inspection:
2 damaged

ERP:
8 accepted financially
2 pending discrepancy
```

The architecture SHALL support this.

---

# 51. Warehouse Event ≠ Financial Posting

This remains:

```text
warehouse.received
    !=
ERP financial goods receipt
```

---

# 52. Warehouse Discrepancy

Operational discrepancies MAY include:

```text
shortage

overage

wrong item

wrong lot

damage

seal discrepancy

unexpected serial

condition mismatch
```

---

# 53. Discrepancy Document

The operational discrepancy belongs to the warehouse execution provider.

If a formal:

```text
Damage Report

Discrepancy Report

Inspection Report
```

is issued:

```text
Operational Fact
       │
       ▼
Trade Docs
       │
       ▼
TradeDocument
```

SHALL govern the documentary representation.

---

# 54. Inspection Event vs Inspection Certificate

This distinction follows TDOC-0002:

```text
Warehouse inspection occurred
    !=
Inspection Certificate document
```

An external inspection authority may also be the legal issuer of the certificate.

---

# 55. Document Authority

Warehouse execution MAY supply:

```text
source facts

measurements

actor

time

photos/evidence references
```

Trade Docs SHALL own the formal document's:

```text
canonical document ID

version

content artifacts

issuer relation

document relationships

lifecycle
```

---

# 56. Document Does Not Replace Source Fact

If a receipt document says:

```text
100 pallets received
```

the underlying warehouse receipt event remains operational authority for the warehouse action.

The document is its documentary representation/evidence.

---

# 57. Source Change Does Not Rewrite Issued Document

If a later stock reconciliation determines:

```text
actual quantity = 99
```

an already issued warehouse document SHALL not be silently changed.

TDOC-0002 version/correction policy applies.

---

# 58. Proof of Delivery

Similarly:

```text
TMS Delivery Fact
       │
       ▼
Trade Docs
       │
       ▼
ProofOfDelivery TradeDocument
```

The POD document does not create physical delivery.

---

# 59. Packing

Warehouse packing MAY create:

```text
packages

handling units

labels

transport preparation
```

The physical packing activity belongs to warehouse execution.

Formal packing documents belong to Trade Docs.

---

# 60. Packing List

This remains:

```text
Packing Activity
    !=
Packing List TradeDocument
```

A Packing List may be generated from warehouse/ERP/TMS source facts but SHALL have its own TradeDocument identity and version.

---

# 61. Packing List Relationship

Trade Docs MAY relate:

```text
Packing List
    SUPPORTS
Commercial Invoice

Packing List
    SUBMITTED_WITH
Customs Declaration
```

without changing warehouse execution ownership.

---

# 62. Cross-Docking

Thamani SHALL support:

```text
Inbound LogisticsShipment / Movement
         │
         ▼
Warehouse / Cross-Dock
         │
    Receive / Sort
         │
         ▼
Outbound LogisticsShipment / Movement
```

Long-term storage SHALL not be required merely to model cross-dock handling.

---

# 63. Consolidation

Warehouse execution may physically consolidate:

```text
Cargo A

Cargo B

Cargo C
```

into:

```text
HandlingUnit X
```

or other transport grouping.

TMS SHALL maintain the canonical transport linkage from those goods to their LogisticsShipment/Consignment context.

---

# 64. Consolidation Does Not Merge Business Identity

Warehouse consolidation SHALL NOT automatically merge:

```text
customer ownership

LogisticsShipment identity

Consignment identity

trade transaction identity
```

---

# 65. Deconsolidation

The reverse process SHALL preserve lineage:

```text
HandlingUnit X
      │
      ▼
Warehouse Deconsolidation
      │
      ├── Cargo A
      ├── Cargo B
      └── Cargo C
```

---

# 66. Value-Added Services

Thamani MAY commercially offer:

```text
labelling

relabeling

repacking

kitting

assembly

sorting

grading

palletisation

quality inspection

special packaging

returns processing
```

Warehouse execution owns the operational tasks.

Thamani owns the contracted service.

---

# 67. Warehouse Work Order

A warehouse execution provider MAY own:

```text
WarehouseWorkOrder
```

or equivalent.

It SHALL remain distinct from:

```text
Thamani ServiceOrder
```

---

# 68. Service Decomposition

Conceptually:

```text
Thamani Service Order
        │
        ▼
Operational Decomposition
        │
        ├── Warehouse Work Order
        ├── TMS Transport Requirement
        ├── Trade Docs Requirement
        └── ERP Financial Consequence
```

---

# 69. Returns

A return MAY compose:

```text
TMS reverse LogisticsShipment

warehouse receipt

inspection

quarantine

restock

repair

disposal

TradeDocument

ERP credit / adjustment
```

No single engine owns the entire return lifecycle.

---

# 70. Return Received ≠ Restocked

This remains:

```text
RETURN RECEIVED
    !=
AVAILABLE INVENTORY
```

---

# 71. Lot / Batch / Serial

Warehouse execution SHALL preserve applicable:

```text
lot

batch

serial

expiry

origin

quality references
```

where operationally required.

---

# 72. Traceability

Thamani SHOULD be able to compose:

```text
Source
   │
   ▼
Lot / Batch
   │
   ▼
Warehouse Receipt
   │
   ▼
Storage
   │
   ▼
Handling Unit
   │
   ▼
Consignment
   │
   ▼
LogisticsShipment
   │
   ▼
Customer
```

without one engine claiming authority over the whole chain.

---

# 73. GS1 EPCIS Compatibility

Warehouse provider adapters MAY use standards such as GS1 EPCIS for supply-chain event interoperability.

That external event representation SHALL be mapped to authoritative Baobab domain facts.

It SHALL not become the mandatory Baobab persistence schema.

---

# 74. Warehouse Event Semantics

Potential operational facts include:

```text
received

putaway completed

inventory moved

picked

packed

staged

loaded

released

stock counted

discrepancy detected

damaged

quarantined
```

Canonical event names require Shared governance.

---

# 75. Event Context Is Still Open

This ADR SHALL NOT unilaterally decide whether all warehouse facts belong under:

```text
inventory.*

logistics.*

fulfilment.*

warehouse.*
```

The choice SHALL follow Shared event-ownership architecture and actual bounded-context authority.

---

# 76. TMS Event Boundary

Events describing:

```text
movement arrived

movement departed

delivery completed

transport custody
```

belong to TMS/logistics authority.

Warehouse SHALL reference them rather than reissue competing physical transport events.

---

# 77. TDOC Event Boundary

Events describing:

```text
document issued

document superseded

document version created

document verification completed
```

belong to Trade Docs/documents authority.

Warehouse SHALL not become the canonical producer of those document-lifecycle facts.

---

# 78. Bonded / Customs-Controlled Warehousing

A bonded or Customs-controlled warehouse SHALL compose:

```text
Warehouse Execution
        +
Trade Docs
        +
Regulations
        +
External Customs Authority
```

No single boolean:

```text
bonded = true
```

is sufficient architecture.

---

# 79. Customs Physical vs Documentary State

Example:

```text
Physical:
STORED

Custody:
THAMANI_WAREHOUSE

Customs:
UNDER_CUSTOMS_CONTROL

Quality:
ACCEPTED

Commercial:
NOT_AVAILABLE
```

is a valid state.

---

# 80. Customs Case

Trade Docs owns:

```text
CustomsCase

CustomsDeclaration

customs authority response projection
```

The warehouse provider SHALL reference those facts where they constrain physical warehouse execution.

---

# 81. Customs Hold

A warehouse MAY enforce:

```text
DO NOT RELEASE
```

because Trade Docs reports an authoritative Customs hold.

The warehouse SHALL not independently determine:

```text
CUSTOMS_HOLD
```

based on local assumptions.

---

# 82. Regulatory Hold

Likewise:

```text
Regulations Decision
       │
       ▼
Warehouse PEP
       │
       ▼
Physical block
```

is valid.

Warehouse execution SHALL not duplicate the regulatory reasoning.

---

# 83. Quality Hold

This remains independent:

```text
QUALITY_HOLD
    !=
CUSTOMS_HOLD
```

---

# 84. Cold Storage

Cold-storage facilities MAY expose operational capabilities such as:

```text
temperature zones

operating range

backup power

sensor support

alarm support
```

Detailed cold-chain service architecture remains for THA-0011.

---

# 85. Sensor Observation

Warehouse telemetry MAY include:

```text
temperature

humidity

door state

power

shock
```

An observation SHALL not by itself mean:

```text
cargo non-compliant
```

without applicable policy/assessment.

---

# 86. Telemetry Document Boundary

A generated:

```text
Temperature Report
```

or:

```text
Cold Chain Certificate
```

SHALL be a TradeDocument if treated as a formal document.

The raw telemetry remains operational evidence/source data.

---

# 87. External Warehouse Provider

Thamani MAY subcontract warehousing.

Conceptually:

```text
Customer
   │
   ▼
Thamani 3PL Contract
   │
   ▼
External Warehouse Provider
   │
   ▼
Physical Facility
```

Thamani retains its contractual responsibility according to its customer contract.

---

# 88. Provider Qualification

External warehouse providers remain governed by THA-0004.

Qualification MAY include:

```text
facility capability

insurance

security

commodity suitability

cold-chain capability

customs authorisation

dangerous-goods suitability

service geography
```

---

# 89. Provider Qualification ≠ Facility Qualification

This remains:

```text
Organisation qualified
    !=
Every facility qualified
```

Facility-specific qualification MAY be required.

---

# 90. Facility Capability

Facilities MAY declare:

```text
dry storage

bulk storage

pallet storage

cold storage

frozen storage

bonded storage

dangerous goods

high-value storage

cross-docking

food-grade storage

project cargo handling
```

Claims SHALL be verified according to policy.

---

# 91. Warehouse Capacity

Capacity MAY be represented in:

```text
pallet positions

m³

m²

tonnage

bin positions

container positions

specialist storage units
```

with explicit units.

---

# 92. Capacity ≠ Availability

This remains:

```text
Capacity
    !=
Available Capacity
```

---

# 93. Warehouse Capacity Reservation

A warehouse provider MAY reserve:

```text
storage capacity
```

This is distinct from:

```text
commercial inventory reservation
```

and:

```text
TMS transport capacity reservation
```

---

# 94. Pricing

THA-0006 remains authoritative for Thamani customer pricing.

Warehouse service pricing MAY use:

```text
pallet/day

CBM/day

m²/month

receipt

handling unit

pick

pack

order

line

cross-dock

labour hour

special handling

management fee
```

---

# 95. Operational Charge Facts

Warehouse execution MAY provide facts such as:

```text
10 pallet-days

25 picks

2 receipts

5 labour hours
```

Thamani's commercial domain applies the contract/rate.

---

# 96. Activity ≠ Invoice

This remains:

```text
Warehouse Activity
    !=
Customer Invoice
```

ERP owns financial posting.

---

# 97. SLA

Thamani's 3PL contracts MAY govern:

```text
receiving turnaround

inventory accuracy

order accuracy

pick turnaround

dispatch cutoff

damage rate

temperature compliance

cycle-count accuracy
```

Operational systems provide evidence.

Thamani evaluates contractual service performance.

---

# 98. Control-Tower Projection

Thamani MAY compose:

```text
INBOUND
    Movement arriving

WAREHOUSE
    20 pallets received

QUALITY
    2 pallets quarantined

CUSTOMS
    under Customs control

OUTBOUND
    18 pallets staged

TRANSPORT
    Consignment booked

DOCUMENTS
    packing list issued
```

into one operational view.

---

# 99. Control Tower Is Not Authority

The view SHALL retain references to authoritative sources:

```text
TMS

Warehouse Provider

Trade Docs

Regulations

ERP
```

It SHALL not independently edit their facts.

---

# 100. No 3PL Mega Aggregate

This remains prohibited:

```text
ThreePLTransaction {
    warehouse
    shipment
    consignment
    customs
    documents
    inventory
    invoice
}
```

as one canonical mutable aggregate.

---

# 101. Composite Reference Model

A Thamani projection MAY instead maintain:

```text
ThreePLServiceView
├── service_order_ref
├── warehouse_work_order_refs[]
├── logistics_shipment_refs[]
├── consignment_refs[]
├── trade_document_refs[]
├── customs_case_refs[]
├── inventory_refs[]
└── financial_refs[]
```

---

# 102. Unknown ≠ Zero

If the warehouse provider is unavailable:

```text
UNKNOWN
```

or:

```text
LAST_KNOWN
```

SHALL be used.

This SHALL never silently become:

```text
quantity = 0
```

---

# 103. Reconciliation

Warehouse physical position, ERP financial inventory and commercial availability SHALL be reconcilable.

Example:

```text
Warehouse:
100 physical

ERP:
98 financial

Trade:
90 available

        │
        ▼
Reconciliation
```

The values may legitimately differ.

---

# 104. No Last-Writer-Wins

This remains prohibited:

```text
whichever system wrote latest
is inventory truth
```

Each system owns a defined dimension.

---

# 105. Inventory Adjustment

A warehouse provider MAY identify or propose:

```text
physical adjustment
```

ERP SHALL own financially consequential adjustment according to ERP governance.

---

# 106. Documenting an Adjustment

If a formal:

```text
Stock Adjustment Report
```

is required, Trade Docs SHALL own its documentary representation.

The document itself SHALL not post the financial adjustment.

---

# 107. Cross-Engine Correlation

A 3PL process SHOULD be traceable through:

```text
service_order_id

warehouse_work_order_id

inventory references

logistics_shipment_id

consignment_id

handling_unit_id

trade_document_id

customs_case_id

ERP references

correlation_id
```

---

# 108. Canonical References

The warehouse provider SHALL consume/reference TMS and Trade Docs identifiers rather than copying source aggregates into its own canonical namespace.

---

# 109. TMS Source-of-Truth Matrix

Following TMS-0002:

| Fact | Authority |
|---|---|
| LogisticsShipment | TMS |
| Consignment | TMS |
| CargoItem transport projection | TMS |
| HandlingUnit transport projection | TMS |
| TransportMovement | TMS |
| TransportLeg | TMS |
| TransportCall | TMS |
| TransportEvent | TMS |
| Transport custody | TMS |
| Delivery fact | TMS |

---

# 110. Trade Docs Source-of-Truth Matrix

Following TDOC-0002:

| Fact | Authority |
|---|---|
| TradeDocument | Trade Docs |
| DocumentVersion | Trade Docs |
| ContentArtifact association | Trade Docs |
| Document relationships | Trade Docs |
| Document lifecycle | Trade Docs |
| Documentary provenance | Trade Docs |
| Transfer-control state where applicable | Trade Docs / legal regime |
| Underlying business fact | Owning source domain |

---

# 111. Warehouse Source-of-Truth Matrix

| Fact | Authority |
|---|---|
| Physical warehouse receipt | Warehouse execution provider |
| Putaway | Warehouse execution provider |
| Bin/location movement | Warehouse execution provider |
| Physical warehouse stock | Warehouse execution provider |
| Warehouse pick | Warehouse execution provider |
| Warehouse pack | Warehouse execution provider |
| Warehouse staging | Warehouse execution provider |
| Warehouse stock count | Warehouse execution provider |
| Physical warehouse release | Warehouse execution provider |

---

# 112. Other Authority Matrix

| Fact | Authority |
|---|---|
| 3PL customer contract | Thamani |
| Customer warehouse quote | Thamani |
| Customer SLA | Thamani |
| Customer service order | Thamani |
| Inventory ownership context | Canonical inventory model / authoritative business source |
| Financial inventory | ERP |
| Inventory valuation | ERP |
| Commerce reservation | Trade where applicable |
| Commercial ATP | applicable commercial provider |
| CustomsCase | Trade Docs |
| Customs authority decision | External Customs authority, projected by Trade Docs |
| Regulatory requirement | Regulations |
| Customer portal projection | Thamani |

---

# 113. Example — ZuriBeans Inventory

```text
ZuriBeans
owns coffee inventory
        │
        ▼
TMS LogisticsShipment
        │
        ▼
Transport Movement arrives
        │
        ▼
Warehouse Provider
physically receives coffee
        │
        ├── ownership: ZuriBeans
        ├── custody: warehouse
        └── physical location: W1
        │
        ▼
ERP
records financial inventory as applicable
        │
        ▼
Trade
may expose commercial availability
```

---

# 114. Example — Warehouse-to-TMS Handoff

```text
Warehouse Provider
        │
        │ stages HU-100
        ▼
Physical Warehouse Release
        │
        ▼
Custody Handover
        │
        ├── HandlingUnitRef HU-100
        ├── ConsignmentRef C-22
        └── LogisticsShipmentRef LS-8
        │
        ▼
TMS
Transport Custody Accepted
        │
        ▼
TransportMovement
        │
        ▼
Movement Departed
```

The warehouse SHALL not emit a competing canonical departure event.

---

# 115. Example — Warehouse Receipt Document

```text
Warehouse Provider
records:
100 bags physically received
        │
        ▼
Trade Docs
creates:
Warehouse Receipt TradeDocument
        │
        ├── Version 1
        ├── structured content
        └── PDF rendering
```

If a later recount finds:

```text
99 bags
```

the issued Version 1 SHALL not be silently rewritten.

---

# 116. Example — Bonded Storage

```text
TMS
Movement arrives
      │
      ▼
Trade Docs
CustomsCase
      │
      ▼
Customs Authority
goods under Customs control
      │
      ▼
Warehouse Provider
stores goods
      │
      ├── Physical = STORED
      ├── Customs = CONTROLLED
      └── Commercial = BLOCKED
```

---

# 117. Example — POD

```text
TMS
Delivery Completed
      │
      ▼
Source Evidence
signature / photo / scan
      │
      ▼
Trade Docs
ProofOfDelivery TradeDocument
      │
      ▼
Thamani
Customer visibility
```

The POD TradeDocument SHALL not be the authoritative cause of delivery.

---

# 118. Capability Model

Thamani SHALL ultimately consume something conceptually equivalent to:

```text
warehouse execution capability
```

through Control Plane provider resolution.

The exact canonical capability namespace remains a Shared decision.

---

# 119. Existing Namespace Review

Candidate existing domains include:

```text
inventory

logistics

fulfilment
```

A dedicated:

```text
warehouse
```

namespace MAY later be justified.

This ADR SHALL not mint it unilaterally.

---

# 120. Provider Resolution

Target:

```text
Thamani requires
Warehouse Execution Capability
        │
        ▼
Control Plane
        │
        ▼
Bound Provider
        │
        ├── iDempiere
        ├── Specialist WMS
        ├── External 3PL
        └── Future Baobab WMS
```

---

# 121. No Thamani-Specific Warehouse API

This SHOULD be avoided:

```text
POST /thamani/internal-warehouse/receive
```

as the canonical platform contract.

Thamani's application layer SHOULD consume provider-neutral capability abstractions.

---

# 122. Integration Semantics

Cross-domain integration SHALL use:

```text
canonical IDs

external references

typed associations

events

commands

correlation

causation

idempotency
```

rather than shared databases.

---

# 123. No Direct Database Integration

This SHALL remain prohibited:

```text
TMS reading WMS tables

WMS writing TMS tables

Trade Docs reading ERP database

Thamani updating TMS database directly
```

---

# 124. Failure Semantics

Warehouse integration SHALL distinguish:

```text
WAREHOUSE_BLOCK

QUALITY_BLOCK

CUSTOMS_BLOCK

REGULATORY_BLOCK

TRANSPORT_BLOCK

PROVIDER_UNAVAILABLE

UNKNOWN
```

rather than one generic:

```text
ERROR
```

---

# 125. Idempotency

Material warehouse integration operations SHOULD support idempotency.

Examples:

```text
record receipt

record release

record handover

confirm pick

confirm staging

register physical discrepancy
```

---

# 126. Out-of-Order Events

Warehouse and transport events MAY arrive late or out of sequence.

Where necessary preserve:

```text
occurred_at

received_at
```

independently.

---

# 127. Correction

Incorrect operational observations SHOULD be corrected through governed correction/adjustment semantics rather than disappearing.

---

# 128. Security

Warehouse access SHALL consider:

```text
tenant

customer

facility

inventory owner

operator

user role

customs state

document confidentiality
```

---

# 129. Multi-Customer Warehouses

A Thamani-operated warehouse MAY contain:

```text
Customer A inventory

Customer B inventory

Thamani inventory
```

in the same physical facility.

Their:

```text
ownership

visibility

warehouse instructions

documents

commercial terms
```

SHALL remain isolated.

---

# 130. 3PL Customer ≠ Tenant Automatically

A customer using Thamani warehousing SHALL NOT automatically become a separate Baobab tenant.

Tenant/platform-account architecture remains governed by Control Plane.

---

# 131. Audit

Material actions SHOULD be auditable:

```text
receipt

custody acceptance

putaway

movement

pick

pack

staging

release

custody handover

stock count

discrepancy

quality hold

manual override

formal document issuance
```

with the last category governed through Trade Docs.

---

# 132. Historical Integrity

Warehouse history SHALL remain reconstructable even after:

```text
facility closure

provider change

inventory sale

customer exit

ERP adjustment

warehouse-system migration
```

according to retention policy.

---

# 133. Revised Implementation Sequence

## THA-WH-00 — Architecture Audit

Audit:

```text
Thamani

TMS

Trade Docs

ERP

Trade

Shared

Control Plane

existing warehouse providers
```

---

## THA-WH-01 — Service Model

Implement only Thamani-owned concepts:

```text
Warehousing Service

3PL Service

Customer Warehouse Requirement

Customer SLA

Customer Instruction

Service Order
```

---

## THA-WH-02 — Provider-Neutral Facility Model

Establish:

```text
WarehouseFacilityReference

WarehouseOperatorReference

FacilityCapability
```

where cross-domain reference is necessary.

---

## THA-WH-03 — Inventory / Custody Alignment

Reconcile:

```text
owner

custodian

physical location

quantity

UOM

quality

customs state

financial state
```

against BCP-013 and ERP-015.

---

## THA-WH-04 — TMS Reference Boundary

Use TMS-0002 canonical references:

```text
LogisticsShipment

Consignment

CargoItem

HandlingUnit

TransportMovement
```

without creating parallel warehouse-owned equivalents.

---

## THA-WH-05 — Trade Docs Reference Boundary

Use TDOC-0002 for:

```text
Warehouse Receipt document

Packing List

Inspection Report

Discrepancy Report

POD

other formal documents
```

without representing files as documents.

---

## THA-WH-06 — Inbound Reference Slice

Prove:

```text
TMS TransportCall / Arrival
        ↓
Warehouse Physical Receipt
        ↓
Warehouse Custody
        ↓
ERP Consequence
```

---

## THA-WH-07 — Storage Reference Slice

Prove:

```text
owner

custodian

facility

warehouse location

lot/batch

physical quantity

quality status
```

without competing financial authority.

---

## THA-WH-08 — Outbound Reference Slice

Prove:

```text
Customer Instruction
    ↓
Pick
    ↓
Pack
    ↓
HandlingUnit Formation
    ↓
Stage
    ↓
Warehouse Release
    ↓
Custody Handover
    ↓
TMS Transport Custody
    ↓
Transport Movement
```

---

## THA-WH-09 — Document Reference Slice

Prove:

```text
Physical Warehouse Receipt
        ↓
Trade Docs
Warehouse Receipt TradeDocument
        ↓
Version + Content + Rendering
```

with correct authority.

---

## THA-WH-10 — Reconciliation

Implement:

```text
warehouse physical inventory

ERP financial inventory

commercial availability
```

reconciliation.

---

## THA-WH-11 — External 3PL Provider

Prove the model using a third-party warehouse system.

---

## THA-WH-12 — Cross-Docking

Prove warehouse handling without fictitious long-term storage.

---

## THA-WH-13 — Bonded / Customs Warehouse

Integrate:

```text
Warehouse Provider

Trade Docs

Regulations

Customs authority

TMS
```

without authority duplication.

---

## THA-WH-14 — Customer Portal

Expose authoritative projections of:

```text
physical inventory

receipts

dispatches

holds

documents

LogisticsShipments

Consignments

warehouse activity
```

---

## THA-WH-15 — SLA / Commercial Rating

Connect warehouse operational facts to:

```text
THA-0006 pricing

SLA measurement

ERP invoicing
```

without duplicating their authority.

---

## THA-WH-16 — Dedicated WMS Assessment

Evaluate objectively whether:

```text
ERP warehouse capabilities

external providers

existing WMS adapters
```

are sufficient.

Only then consider a dedicated Baobab WMS ADR programme.

---

## THA-WH-17 — Production Hardening

Verify:

```text
customer isolation

owner/custodian separation

TMS handoff integrity

HandlingUnit identity

inventory reconciliation

document identity

document versioning

provider outage

unknown-vs-zero

Customs hold enforcement

idempotency

audit

security

retention

recovery
```

---

# 134. Rejected Alternatives

## A. Keep THA-0010 Draft Until Every TMS/TDOC ADR Is Complete

**Rejected.**

TMS-0002 and TDOC-0002 establish the canonical dependencies needed for this decision.

Later specialised ADRs can refine implementation without invalidating the service boundary.

---

## B. Put Warehouse Execution in TMS

**Rejected.**

Internal warehouse execution and transportation execution are separate bounded contexts.

---

## C. Put All Warehouse Execution Permanently in ERP

**Rejected as a universal rule.**

ERP remains financially authoritative, but specialist warehouse execution may require another provider.

---

## D. Create `baobab-wms` Now

**Rejected.**

The reusable need is not yet sufficiently proven.

---

## E. Let Thamani Own HandlingUnit Canonically

**Rejected.**

Where HandlingUnit participates in transport execution, TMS-0002 governs its canonical transport semantics.

---

## F. Use Warehouse Receipt PDF as Receipt Authority

**Rejected.**

Physical receipt and documentary representation are separate.

---

## G. Make Warehouse Documents Warehouse-Database Records

**Rejected as the canonical document architecture.**

Formal trade documents belong to Trade Docs.

---

## H. Let POD Determine Delivery

**Rejected.**

TMS owns the delivery fact; the POD document evidences it.

---

## I. Use One `shipment_id` Everywhere

**Rejected.**

TMS-0002 distinguishes LogisticsShipment from TradeShipment and CommerceFulfilment.

---

## J. Duplicate Consignments in the Warehouse System

**Rejected as cross-platform canonical identity.**

Provider-local identifiers may map to the TMS Consignment.

---

## K. One Global Inventory Quantity

**Rejected.**

Physical, financial and commercial inventory states differ.

---

# 135. Reconciled Architectural Invariants

```text
Thamani 3PL
    != WMS

Thamani Warehousing
    != Warehouse Execution System

3PL
    != TMS

Warehouse
    != LogisticsShipment

Warehouse Work Order
    != LogisticsShipment

Warehouse Work Order
    != Consignment

LogisticsShipment
    authoritative in TMS

Consignment
    authoritative in TMS

Transport Movement
    authoritative in TMS

Transport custody
    authoritative in TMS

Warehouse physical receipt
    authoritative in Warehouse Execution

Warehouse storage position
    authoritative in Warehouse Execution

Warehouse release
    authoritative in Warehouse Execution

Physical Receipt Event
    != Warehouse Receipt TradeDocument

Packing Activity
    != Packing List TradeDocument

Inspection Event
    != Inspection Report TradeDocument

TMS Delivery Fact
    != POD TradeDocument

TradeDocument
    authoritative in Trade Docs

DocumentVersion
    authoritative in Trade Docs

ContentArtifact
    != Document

Document
    != Evidence

Evidence
    != Operational Fact

HandlingUnit transport projection
    authoritative in TMS

Warehouse may physically create/change
    a HandlingUnit,
    but SHALL reference the canonical
    TMS identity for transport execution

Product
    != CargoItem

Inventory Position
    != CargoItem

Physical Quantity
    != Financial Inventory

Physical Quantity
    != Commercial Availability

Owner
    != Custodian

Custodian
    != Transport Carrier automatically

Location
    != Ownership

Warehouse Receipt
    != Ownership Transfer

Warehouse Receipt
    != ERP Financial Receipt

Quality Hold
    != Customs Hold

Customs Hold
    != Regulatory Interpretation

Warehouse Provider
    must not invent Customs release

Trade Docs
    must not invent physical receipt

TMS
    must not invent warehouse putaway

ERP
    must not invent physical warehouse observations

Thamani
    must not duplicate authoritative engine state

Unknown
    != Zero
```

---

# 136. Final Authority Diagram

```text
                       THAMANI CUSTOMER
                              │
                              ▼
                      THAMANI 3PL SERVICE
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
     WAREHOUSING          TRANSPORT          DOCUMENTS /
          │                   │               CUSTOMS
          ▼                   ▼                   ▼
 Warehouse Provider       BAOBAB TMS         TRADE DOCS
          │                   │                   │
   ┌──────┼──────┐      ┌─────┼─────┐       ┌─────┼──────┐
   ▼      ▼      ▼      ▼     ▼     ▼       ▼     ▼      ▼
Receive Putaway Pick   LS   Consign Move   Docs Versions Cases
   │      │      │      │     │     │       │
   └──────┼──────┘      └─────┼─────┘       │
          │                   │              │
          └──────────┬────────┴──────────────┘
                     ▼
                  HANDOFFS
                     │
           canonical IDs / references
                     │
       ┌─────────────┼──────────────┐
       ▼             ▼              ▼
      ERP       REGULATIONS     CONTROL PLANE
 financial      policy/PDP      context/resolution
 inventory
```

---

# 137. Final Decision

Thamani SHALL offer Warehousing and 3PL as integrated customer services while maintaining strict domain authority underneath the customer experience.

The operational model SHALL be:

```text
Customer Requirement
        │
        ▼
Thamani Service Order
        │
        ├── Warehouse Execution
        │       ├── receive
        │       ├── store
        │       ├── pick
        │       ├── pack
        │       └── release
        │
        ├── Baobab TMS
        │       ├── LogisticsShipment
        │       ├── Consignment
        │       ├── HandlingUnit transport projection
        │       ├── Movement
        │       └── Transport custody
        │
        ├── Baobab Trade Docs
        │       ├── Warehouse Receipt document
        │       ├── Packing List
        │       ├── Inspection documents
        │       ├── POD
        │       └── document versions/content
        │
        ├── Baobab ERP
        │       └── financial inventory
        │
        └── Baobab Regulations / Customs
                └── regulatory conditions
```

The defining 3PL principle is:

> **Thamani owns the integrated customer logistics service, while the platform preserves specialised authority for warehouse execution, transport execution, documents, regulation and financial inventory.**

The defining TMS boundary is:

> **Warehouse operations may physically form, stage and release cargo and handling units, but LogisticsShipment, Consignment, transport-use HandlingUnit identity, TransportMovement and transport custody remain canonical TMS concepts.**

The defining Trade Docs boundary is:

> **A warehouse event is not a document. Formal warehouse receipts, packing lists, inspection reports and proofs of delivery shall use the canonical TradeDocument, DocumentVersion and ContentArtifact architecture without replacing their underlying operational facts.**

The defining custody principle is:

> **Warehouse custody and transport custody shall meet through an explicit hand-off rather than by assuming that warehouse release, carrier acceptance, departure, ownership transfer and financial issue are the same event.**

The defining inventory principle is:

> **Physical inventory, financial inventory, commercial availability, ownership, custody and Customs status shall remain independently authoritative dimensions.**

And the defining evolution principle is:

> **Thamani shall remain capable of using ERP warehouse functions, specialist WMS products, external 3PL systems or a future Baobab WMS without changing its 3PL customer contract model or the canonical TMS and Trade Docs boundaries.**