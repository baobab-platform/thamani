# ADR-THA-0005 — Shipment, Consignment, Transport Plan, Movement and Execution Lifecycle Architecture

**Status:** Accepted — Foundational Thamani Architecture  
**Date:** 2026-09-25  
**Decision Owners:** Nabhold Group Africa / Thamani Global / Baobab Platform Architecture  
**Primary Repository:** `baobab-platform/thamani`  
**Legal Entity:** `THAMANI-GLOBAL`  
**Logistics Domain Authority:** Thamani Logistics Execution Domain  
**Canonical Contract Authority:** `baobab-platform/shared`  
**Platform Context Authority:** `baobab-platform/baobab-cp`  
**Canonical Organisation / Counterparty Authority:** `baobab-platform/baobab-cp`  
**Identity Authority:** `baobab-platform/baobab-iam`  
**Financial Authority:** `baobab-platform/baobab-erp`  
**Trade / Commerce Authority:** `baobab-platform/baobab-trade` where explicitly applicable  
**Operational Runtime:** Deferred to ADR-THA-0015  
**Decision Class:** Shipment / consignment / multimodal transport / transport planning / movement / booking / execution / tracking / delivery

---

# 1. Depends On / Reconciles With

This ADR SHALL be interpreted consistently with:

- ADR-THA-0003 — Thamani Global Integrated Shipping, Transportation and Logistics Enterprise Domain Boundary
- ADR-THA-0004 — Canonical Logistics Counterparty, Carrier, Service-Provider Qualification and Partner Onboarding
- ADR-BCP-004 — Context, Market, Geography, Legal-Entity and Digital Estate Resolution Model
- ADR-BCP-011 — Market Participation, Trade Lanes and Cross-Market Trading Model
- ADR-BCP-012 — Intercompany and Inter-Branch Trading Model
- ADR-BCP-013 — Canonical Inventory Ownership, Custody, Location and In-Transit Model
- ADR-BCP-014 — Canonical Counterparty Identity, Roles and Relationships Model
- ADR-BCP-018 — Canonical Organisation, Corporate Group, Platform Account and Tenant Relationship Model
- ADR-0021 — Customs, Trade Compliance and Regulatory Provider Architecture
- ADR-0022 — Shipping, Logistics, Freight and Transport Provider Abstraction
- ADR-0025 — Trade Documents, Evidence, Provenance and Document Lifecycle Architecture
- ADR-0026 — Incoterms, Delivery Obligations, Risk Transfer and Title Transfer Model
- ADR-ERP-015 — ERP Inventory, Warehouse, Procurement and Supply-Chain Architecture
- ADR-ERP-016 — Commerce–ERP Integration and Order-to-Cash Architecture
- applicable canonical event, mapping, context and evidence contracts in `baobab-platform/shared`

All referenced Baobab ADRs SHALL be treated according to the currently accepted architecture governance.

---

# 2. External Standards Basis

This architecture has been informed by:

- UN/CEFACT Multi-Modal Transport Reference Data Model;
- UN/CEFACT international supply-chain vocabulary;
- UN/CEFACT emerging multimodal Transport Event Registry work;
- DCSA Track & Trace and Industry Blueprint;
- IATA ONE Record;
- GS1 EPCIS 2.0;
- FIATA multimodal freight-forwarding principles;
- international transport-document and customs architectures.

UN/CEFACT's current vocabulary explicitly distinguishes **Shipment**, **Consignment**, **Transport Movement**, **Transport Leg**, **Transport Route**, **Transport Call**, **Transport Equipment**, **Transport Means**, **Booking** and **Transport Event** rather than reducing transport to one generic shipment record.

That separation SHALL materially influence Thamani's domain model.

---

# 3. Executive Decision

Thamani SHALL adopt a multimodal logistics execution model based upon the following hierarchy:

```text
Commercial Requirement
        │
        ▼
Logistics Service Order
        │
        ▼
Shipment
        │
        ├──────────────┐
        ▼              ▼
   Consignment A   Consignment B
        │              │
        ▼              ▼
   Transport Plan   Transport Plan
        │
        ▼
Transport Route / Itinerary
        │
        ▼
Transport Movement(s)
        │
        ▼
Transport Leg(s)
        │
        ▼
Transport Call(s)
        │
        ▼
Operational Events
        │
        ▼
Delivery / Handover
        │
        ▼
Proof / Acceptance / Closure
```

These concepts SHALL remain independently identifiable.

The governing principle is:

> **Commercial intent, transport contract, physical movement, planned routing, provider booking, operational events and delivery evidence are related but SHALL NOT be collapsed into a single shipment status record.**

---

# 4. Fundamental Separation

The following concepts SHALL remain separate:

```text
Commercial Order
    !=
Logistics Service Order

Logistics Service Order
    !=
Shipment

Shipment
    !=
Consignment

Consignment
    !=
Provider Booking

Consignment
    !=
Transport Movement

Transport Movement
    !=
Transport Leg

Transport Leg
    !=
Transport Route

Transport Route
    !=
Trade Lane

Transport Means
    !=
Transport Equipment

Transport Call
    !=
Location

Transport Event
    !=
Shipment Status

Delivery
    !=
Customer Acceptance

Proof of Delivery
    !=
Delivery Event
```

---

# 5. Shipment Uses Trade Semantics

Thamani SHALL align the term:

```text
Shipment
```

with the trade-facing meaning used by UN/CEFACT.

The current UN/CEFACT vocabulary defines Shipment as an identifiable collection of trade items transported together from seller/consignor to buyer/consignee.

A Shipment therefore primarily answers:

> **What goods are being delivered from the commercial origin toward the commercial destination?**

---

# 6. Shipment Is Not the Physical Truck, Vessel or Flight Journey

This SHALL be prohibited:

```text
Shipment
=
Truck Trip
```

Likewise:

```text
Shipment
=
Vessel Voyage
```

or:

```text
Shipment
=
Air Flight
```

Those physical journeys belong to transport movements.

---

# 7. Shipment Model

Conceptually:

```text
Shipment
├── canonical_id
├── tenant_context
├── legal_entity_id
├── customer_relationship_id
├── service_order_id?
├── shipment_reference
├── shipment_type
├── ship_from
├── ship_to
├── trade_origin?
├── trade_destination?
├── trade_lane_id?
├── cargo_summary
├── shipment_items[]
├── packages[]
├── total_weight?
├── total_volume?
├── planned_ready_at?
├── required_delivery_at?
├── service_level?
├── incoterm_context?
├── status_projection
├── consignments[]
├── external_references[]
├── evidence_references[]
├── created_at
└── version
```

This is conceptual and SHALL not dictate persistence implementation.

---

# 8. Shipment May Originate From Many Business Processes

A Thamani Shipment MAY originate from:

```text
customer logistics order
trade sales order
procurement order
warehouse transfer
intercompany transfer
return
project-logistics instruction
courier request
customer relocation
asset movement
internal logistics operation
```

It SHALL NOT require a Medusa Commerce Order.

---

# 9. Shipment Is Not Commerce Fulfilment

Where Baobab Trade initiates transport:

```text
Commerce Order
      │
      ▼
Commerce Fulfilment
      │
      ▼
Shipment Requirement
      │
      ▼
Thamani Logistics
```

shall be valid.

But:

```text
Thamani Customer RFQ
      │
      ▼
Logistics Service Order
      │
      ▼
Shipment
```

shall be equally valid without a Commerce Order.

---

# 10. One Commercial Order May Produce Multiple Shipments

Example:

```text
Customer Order
      │
      ├── Shipment 1
      ├── Shipment 2
      └── Shipment 3
```

Reasons MAY include:

```text
different origins
capacity constraints
partial availability
different transport modes
different delivery dates
regulatory separation
dangerous-goods segregation
customer instruction
```

---

# 11. One Shipment May Reference Multiple Commercial Objects

Where policy permits:

```text
Shipment
├── Customer Order A
├── Customer Order B
└── Transfer C
```

Canonical correlation SHALL preserve source lineage.

---

# 12. Consignment Uses Transport-Contract Semantics

UN/CEFACT defines a Consignment as a separately identifiable collection of consignment items moved from one consignor to one consignee under one transport contract.

A Consignment therefore answers:

> **Under which transport-service contract or carriage arrangement are these goods being transported?**

This is distinct from the trade-oriented Shipment question.

---

# 13. Shipment vs Consignment

The principal semantic distinction SHALL be:

```text
SHIPMENT
Trade / delivery view

"What goods must get from the commercial
seller/origin to the commercial buyer/destination?"
```

versus:

```text
CONSIGNMENT
Transport contract view

"What goods have been entrusted for movement
between consignor and consignee under this
transport-service arrangement?"
```

---

# 14. Shipment–Consignment Relationship Is Not Assumed One-to-One

The architecture SHALL support:

```text
Shipment A
     │
     ├── Consignment 1
     └── Consignment 2
```

and, where consolidation permits:

```text
Consignment X
     │
     ├── part/all of Shipment A
     ├── part/all of Shipment B
     └── part/all of Shipment C
```

The model SHALL therefore use explicit associations rather than:

```text
shipment.consignment_id
```

as an irreversible universal one-to-one assumption.

---

# 15. Consolidation

Freight forwarding frequently consolidates several customer movements into common transport capacity.

The architecture SHALL support:

```text
Shipment A ─┐
Shipment B ─┼──► Consolidated Consignment
Shipment C ─┘
```

while preserving:

```text
cargo ownership
customer identity
trade lineage
package identity
delivery destination
billing allocation
```

---

# 16. Deconsolidation

Likewise:

```text
Consolidated Consignment
        │
        ▼
Deconsolidation
        │
        ├── Shipment A
        ├── Shipment B
        └── Shipment C
```

SHALL preserve lineage.

Deconsolidation SHALL NOT create unrelated new cargo identities.

---

# 17. Consignment Model

Conceptually:

```text
Consignment
├── canonical_id
├── transport_contract_reference
├── consignor_id
├── consignee_id
├── transport_service_buyer_id
├── transport_service_provider_id
├── forwarding_agent_id?
├── shipment_associations[]
├── consignment_items[]
├── packages[]
├── gross_weight
├── volume?
├── service_requirements[]
├── transport_modes[]
├── route_requirements?
├── handling_requirements[]
├── dangerous_goods?
├── temperature_profile?
├── booking_references[]
├── transport_document_references[]
├── status_projection
└── external_references[]
```

---

# 18. Consignment Item

A Consignment SHALL support one or more Consignment Items.

UN/CEFACT treats Consignment Item as the lowest grouped transport level inside a consignment, including transport-oriented grouping by goods/packaging characteristics.

Conceptually:

```text
ConsignmentItem
├── id
├── consignment_id
├── shipment_item_associations[]
├── cargo_description
├── quantity
├── unit_of_measure
├── packages[]
├── weight
├── volume?
├── tariff_classification?
├── dangerous_goods_profile?
└── handling_requirements[]
```

---

# 19. Commercial Item Is Not Consignment Item

This SHALL remain explicit:

```text
Trade Item
    !=
Consignment Item
```

A commercial trade line may be split across several transport items.

Likewise several compatible trade items may be grouped for transport purposes.

---

# 20. Package Is Distinct From Item

The architecture SHALL distinguish:

```text
Goods / Item
        │
        ▼
Transport Package
        │
        ▼
Handling Unit
        │
        ▼
Transport Equipment
```

where applicable.

Examples:

```text
coffee bags
      ↓
pallet
      ↓
container
      ↓
vessel
```

---

# 21. Transport Equipment

Transport equipment represents equipment used to:

```text
contain
hold
protect
secure
or facilitate transport of cargo
```

Examples include:

```text
container
trailer
ULD
tank
reefer container
swap body
special transport frame
```

UN/CEFACT explicitly separates Transport Equipment from Transport Means.

---

# 22. Transport Means

Transport Means SHALL represent the device actually conveying cargo.

Examples:

```text
truck
tractor
vessel
aircraft
train
barge
van
motorcycle
```

Therefore:

```text
Container
    !=
Vessel
```

and:

```text
Trailer
    !=
Truck tractor
```

---

# 23. Transport Plan

A Transport Plan SHALL represent Thamani's intended execution architecture for a Shipment or Consignment.

Conceptually:

```text
TransportPlan
├── id
├── shipment_id?
├── consignment_id?
├── plan_version
├── status
├── requested_route?
├── planned_route
├── movements[]
├── transport_legs[]
├── transport_calls[]
├── providers[]
├── equipment_requirements[]
├── service_requirements[]
├── planned_milestones[]
├── fallback_plan?
├── created_at
├── effective_at
└── supersedes?
```

---

# 24. Transport Plan Is Versioned

This SHALL be prohibited:

```text
UPDATE route
SET origin = ...
```

where doing so destroys historical execution plans.

Instead:

```text
Transport Plan v1
        │
        ▼
Replanning
        │
        ▼
Transport Plan v2
```

Historical versions SHALL remain reconstructable.

---

# 25. Plan vs Execution

The architecture SHALL preserve:

```text
PLANNED EXECUTION
        !=
ACTUAL EXECUTION
```

A deviation SHALL not erase the original plan.

This permits later measurement of:

```text
schedule variance
route variance
provider variance
cost variance
service-level failure
```

---

# 26. Transport Route

UN/CEFACT defines a Transport Route as a planned route—an itinerary and schedule—over which transport movements are performed.

Thamani SHALL align with that distinction.

A route therefore represents:

```text
planned path
+
sequence
+
potential schedule
```

rather than the physical journey itself.

---

# 27. Trade Lane Is Not Transport Route

ADR-BCP-011 remains authoritative for Trade Lane.

Example:

```text
Trade Lane

Uganda
   ↓
South Africa
```

may support several logistics routes:

```text
Route A
Kampala
 → Mombasa
 → Durban
 → Cape Town
```

and:

```text
Route B
Kampala
 → Dar es Salaam
 → Cape Town
```

Therefore:

```text
TradeLane
    !=
TransportRoute
```

---

# 28. Transport Corridor Is Also Distinct

Thamani MAY model a reusable Logistics Corridor.

Example:

```text
Northern Corridor

Kampala
 → Malaba
 → Nairobi
 → Mombasa
```

A corridor describes a recurring physical/economic transport pathway.

It SHALL NOT automatically imply:

```text
one shipment
one route
one provider
one trade lane
```

---

# 29. Transport Movement

UN/CEFACT defines Transport Movement as the physical carriage of goods for transport purposes—a voyage, flight, trip or journey.

This definition SHALL guide Thamani.

Examples:

```text
Truck Trip #TR-02933
Vessel Voyage MAE-302W
Flight KQ-482
Train Service ZRL-204
```

---

# 30. Movement Is the Physical Journey

The conceptual relationship SHALL be:

```text
Transport Route
      │
      │ planned pathway
      ▼
Transport Movement
      │
      │ actual/scheduled journey
      ▼
Transport Means
```

---

# 31. Transport Movement Model

Conceptually:

```text
TransportMovement
├── canonical_id
├── movement_type
├── transport_mode
├── service_reference?
├── route_reference?
├── transport_means_id?
├── operator_id
├── carrier_id?
├── planned_start?
├── estimated_start?
├── actual_start?
├── planned_end?
├── estimated_end?
├── actual_end?
├── calls[]
├── equipment[]
├── consignment_assignments[]
├── status_projection
└── external_references[]
```

---

# 32. One Movement May Carry Multiple Consignments

Example:

```text
Truck Trip TG-TR-8821
│
├── Consignment A
├── Consignment B
└── Consignment C
```

This is ordinary consolidated transport.

The system SHALL NOT duplicate the truck trip once for every consignment.

---

# 33. One Consignment May Use Multiple Movements

Example:

```text
Consignment
     │
     ├── Truck Movement
     │      Kampala → Mombasa
     │
     ├── Vessel Movement
     │      Mombasa → Durban
     │
     └── Truck Movement
            Durban → Cape Town
```

This is fundamental to multimodal logistics.

---

# 34. Transport Leg

UN/CEFACT's current vocabulary defines Transport Leg as the span between two consecutive transport calls to which a consignment is assigned.

Thamani SHALL therefore treat a Transport Leg as a **consignment-specific execution segment**, not simply another word for journey.

---

# 35. Movement vs Leg

The distinction SHALL be:

```text
Transport Movement
=
the vehicle/vessel/aircraft/train journey
```

while:

```text
Transport Leg
=
the segment of that journey
relevant to a consignment
between consecutive calls
```

---

# 36. Example: Movement Serving Several Legs

A vessel movement may be:

```text
Mombasa
   ↓
Dar es Salaam
   ↓
Maputo
   ↓
Durban
```

Consignment A may occupy:

```text
Mombasa → Durban
```

while Consignment B occupies:

```text
Dar es Salaam → Maputo
```

The physical voyage need not be duplicated.

---

# 37. Transport Call

UN/CEFACT defines a Transport Call as an ordered stop of a transport means along a movement with sequence and location.

Thamani SHALL use a similar concept.

Examples:

```text
warehouse pickup
border checkpoint
inland terminal
rail terminal
port
airport
cross-dock
delivery depot
customer site
```

---

# 38. Transport Call Model

Conceptually:

```text
TransportCall
├── id
├── movement_id
├── sequence
├── location
├── call_type?
├── planned_arrival?
├── planned_departure?
├── operational_requirements[]
└── external_references[]
```

Actual timing SHALL preferably be represented through events rather than destructive updates.

---

# 39. Location Is Not Call

This SHALL remain invariant:

```text
Port of Durban
    =
Location
```

while:

```text
Vessel MAERSK X
calls at Durban
on 2026-10-04
    =
Transport Call
```

---

# 40. Booking

UN/CEFACT currently describes Booking as a transaction reserving transport services for a Consignment.

Thamani SHALL therefore model booking as an execution/procurement commitment.

---

# 41. Booking Is Not Consignment

This SHALL remain mandatory:

```text
Consignment
    !=
Booking
```

A Consignment may:

```text
require several bookings
```

and a provider may rebook capacity while the Consignment remains the same transport-contract object.

---

# 42. Booking Model

Conceptually:

```text
TransportBooking
├── canonical_id
├── consignment_id
├── transport_leg_id?
├── provider_id
├── provider_capability_id
├── quote_reference?
├── provider_booking_reference
├── mode
├── service
├── requested_capacity
├── confirmed_capacity?
├── equipment_requirements[]
├── pickup_window?
├── delivery_window?
├── sailing/flight/service_reference?
├── booking_status
├── booked_at?
├── confirmed_at?
├── cancelled_at?
├── external_references[]
└── commercial_reference?
```

---

# 43. Provider Eligibility Before Booking

Before a provider receives a new booking:

```text
Provider
      │
      ▼
ADR-THA-0004
Scoped Qualification
      │
      ▼
Capability Eligible?
      │
     YES
      │
      ▼
Booking
```

Mandatory qualification SHALL fail closed.

---

# 44. Booking Lifecycle

A generic booking lifecycle SHOULD support:

```text
DRAFT
   │
   ▼
REQUESTED
   │
   ├────► DECLINED
   │
   ▼
PENDING_CONFIRMATION
   │
   ▼
CONFIRMED
   │
   ├────► AMENDED
   │
   ├────► CANCELLED
   │
   └────► COMPLETED
```

Provider-specific states SHALL map into canonical semantics.

---

# 45. Capacity Reservation Is Explicit

Booking SHALL be capable of representing:

```text
requested capacity
confirmed capacity
allocated equipment
space allocation
weight allocation
volume allocation
```

where the transport mode requires it.

---

# 46. Provider Booking Reference Is External

A carrier reference such as:

```text
MAEU123456789
```

SHALL remain:

```text
ExternalReference
```

rather than becoming the canonical Thamani Booking ID.

---

# 47. Booking Rejection Does Not Cancel Shipment

This SHALL hold:

```text
Provider A declines booking
        │
        ▼
Booking = DECLINED
        │
        ▼
Shipment / Consignment remains active
        │
        ▼
Select Provider B
```

---

# 48. Rebooking

Rebooking SHALL create or preserve history.

Example:

```text
Booking 1 — Carrier A — CANCELLED
Booking 2 — Carrier B — CONFIRMED
```

shall not become:

```text
Booking 1 provider overwritten from A to B
```

without audit.

---

# 49. Mode Vocabulary

Canonical transport modes SHOULD align with internationally recognised values.

UN/CEFACT currently distinguishes modes including:

```text
MARITIME
RAIL
ROAD
AIR
MAIL
MULTIMODAL
FIXED_TRANSPORT_INSTALLATION
INLAND_WATER
```

plus not-specified/not-applicable cases.

Thamani MAY use readable canonical symbols while mapping them explicitly to external code systems.

---

# 50. Multimodal Is Not a Physical Vehicle Type

This SHALL remain explicit:

```text
MULTIMODAL
    !=
TransportMeans
```

Multimodal describes the use of multiple modes across one transport arrangement.

Individual movements still use actual modes.

---

# 51. Pre-Carriage, Main Carriage and On-Carriage

Transport legs SHOULD support broad stage classification:

```text
PRE_CARRIAGE
MAIN_CARRIAGE
ON_CARRIAGE
```

where appropriate.

The classification SHALL not impose maritime terminology on unrelated workflows where it does not fit.

---

# 52. Transport Event

The current UN/CEFACT vocabulary defines a Transport Event as a punctual transport occurrence linked to a transport call, such as arrival, departure, loading or discharge, and explicitly supports planned, estimated and actual event semantics.

Thamani SHALL adopt an event-oriented execution model.

---

# 53. Event Model

Conceptually:

```text
TransportEvent
├── canonical_event_id
├── event_type
├── event_classifier
├── subject_type
├── subject_id
├── movement_id?
├── leg_id?
├── call_id?
├── consignment_id?
├── shipment_id?
├── equipment_id?
├── location?
├── event_time
├── record_time
├── source_party
├── source_system
├── provider_event_id?
├── evidence_reference?
├── correlation_id
├── causation_id?
└── metadata
```

---

# 54. Event Subject Is Explicit

Events MAY apply to:

```text
Shipment
Consignment
Transport Movement
Transport Leg
Transport Equipment
Package
Booking
Delivery
```

The event SHALL identify what changed or was observed.

---

# 55. Event Occurrence Time vs Record Time

The architecture SHALL distinguish:

```text
event_time
```

from:

```text
record_time
```

UN/CEFACT's current Event model explicitly distinguishes when an event occurred from when it was recorded.

This is essential for offline and delayed reporting.

---

# 56. Planned, Estimated and Actual Events

Thamani SHALL distinguish:

```text
PLANNED
ESTIMATED
ACTUAL
```

event classifiers.

Example:

```text
PLANNED_ARRIVAL     09:00
ESTIMATED_ARRIVAL   11:45
ACTUAL_ARRIVAL      12:17
```

All three may be operationally valuable.

---

# 57. Do Not Overwrite ETA History

This SHALL be prohibited:

```text
arrival_time = latest ETA
```

if previous predictions are destroyed.

ETA history SHOULD remain available for:

```text
service reliability
prediction quality
delay analysis
customer communication audit
```

---

# 58. Event Vocabulary

Core operational events SHOULD support concepts such as:

```text
BOOKING_REQUESTED
BOOKING_CONFIRMED

CARGO_READY
PICKUP_STARTED
PICKED_UP

GATE_IN
GATE_OUT

LOADED
DISCHARGED

DEPARTED
ARRIVED

BORDER_ENTERED
BORDER_EXITED

EXPORT_CLEARED
IMPORT_CLEARED
CUSTOMS_HELD
CUSTOMS_RELEASED

TRANSSHIPMENT_STARTED
TRANSSHIPMENT_COMPLETED

OUT_FOR_DELIVERY
DELIVERY_ATTEMPTED
DELIVERED

POD_CAPTURED

DAMAGED
LOST
SHORT
OVER
DELAYED
```

Exact vocabularies SHALL be governed through versioned contracts rather than arbitrary strings.

---

# 59. Event Vocabulary Is Subject-Specific

The system SHALL NOT create one meaningless global lifecycle in which every event applies to every entity.

For example:

```text
VESSEL_ARRIVED
```

does not make sense as a lifecycle event for:

```text
Invoice
```

UN/CEFACT likewise treats event types as dependent upon the event subject's lifecycle.

---

# 60. DCSA Interoperability

For container shipping, Thamani SHOULD support DCSA-aligned adapters.

DCSA Track & Trace standardises operational shipment/equipment events and APIs to improve cross-carrier visibility and covers the journey from pre-shipment through post-shipment phases.

Thamani SHALL map DCSA concepts into its canonical model.

It SHALL NOT make its internal database schema identical to DCSA's provider-facing schema.

---

# 61. DCSA Is Maritime-Specific

The following is prohibited:

```text
DCSA model
=
universal Thamani logistics model
```

DCSA provides valuable maritime/container semantics.

Thamani must also support:

```text
road
air
rail
courier
warehouse
project logistics
```

---

# 62. Air Cargo Interoperability

For air cargo, Thamani SHOULD support IATA ONE Record adapters.

IATA describes ONE Record as a common air-cargo data model combined with standardised secured APIs for information exchange across airlines, forwarders, ground handlers and other stakeholders.

The current IATA cargo ontology is independently versioned, reinforcing the need for versioned adapters rather than hard-coded equivalence.

---

# 63. Air Cargo Objects Are External Semantics

Objects such as:

```text
Waybill
Piece
ULD
Transport Segment
Booking
```

MAY map to Thamani concepts.

They SHALL not dictate all non-air logistics semantics.

---

# 64. GS1 EPCIS Interoperability

GS1 EPCIS SHALL be considered where customers/providers require interoperable visibility data.

EPCIS models real-world business events around questions such as:

```text
WHAT
WHEN
WHERE
WHY
HOW
```

and EPCIS 2.0 supports sensor observations such as temperature and shock.

This aligns strongly with Thamani cold-chain and custody-event requirements.

---

# 65. Canonical Event Is Not External Event

Every external event SHOULD enter through:

```text
External Event
      │
      ▼
Provider Adapter
      │
      ▼
Validation / Mapping
      │
      ▼
Canonical Transport Event
```

Source payloads MAY be retained as evidence where policy requires.

---

# 66. Event Provenance

Every material event SHOULD preserve:

```text
source_party
source_system
provider_event_id
received_at
occurred_at
mapping_version
evidence_reference?
```

The system SHALL be able to explain where an event came from.

---

# 67. Idempotency

External events may be delivered repeatedly.

Therefore:

```text
same provider event received twice
```

SHALL NOT create:

```text
two cargo departures
```

Idempotency SHALL be enforced using:

```text
provider event ID
or
stable canonical idempotency key
```

as appropriate.

---

# 68. Out-of-Order Events

The system SHALL assume provider events can arrive:

```text
late
out of order
duplicated
corrected
```

Example:

```text
ARRIVED
received first

DEPARTED
received five minutes later
but occurred earlier
```

State projection SHALL respect occurrence semantics rather than message-arrival order alone.

---

# 69. Event Correction

Incorrect provider events SHALL not simply disappear.

Correction SHOULD preserve:

```text
original event
correction event
reason
source
time
```

or equivalent audit lineage.

---

# 70. Event History Is Append-Oriented

Operational event history SHOULD be append-oriented where practical.

Derived status MAY be mutable.

Historical facts SHOULD not normally be destructively rewritten.

---

# 71. Status Is Projection

This is a major architectural rule:

> **Shipment status SHALL be treated as a projection of underlying plans, bookings, movements, events and exceptions—not as the primary evidence of what physically happened.**

Therefore:

```text
shipment.status = IN_TRANSIT
```

alone is insufficient historical evidence.

---

# 72. Shipment Status Projection

A simplified shipment lifecycle MAY expose:

```text
DRAFT
PLANNING
PLANNED
BOOKING
BOOKED
READY
IN_EXECUTION
IN_TRANSIT
AT_DESTINATION
DELIVERY_IN_PROGRESS
DELIVERED
CLOSED
CANCELLED
```

These states SHALL remain high-level projections.

---

# 73. Exception Is Not Primary Shipment State

This approach SHOULD be avoided:

```text
Shipment status = DAMAGED
```

as the only representation.

Preferred:

```text
Shipment = IN_TRANSIT

Open Exception:
CARGO_DAMAGE
```

where both states can coexist.

---

# 74. Exception Overlay

A shipment MAY simultaneously be:

```text
IN_TRANSIT
+
DELAY_EXCEPTION
+
TEMPERATURE_EXCEPTION
```

Therefore exception handling SHALL not require replacing every core lifecycle state.

---

# 75. Movement Lifecycle

A Transport Movement SHOULD support:

```text
PLANNED
SCHEDULED
READY
STARTED
IN_PROGRESS
COMPLETED
CANCELLED
```

with exceptions maintained separately where practical.

---

# 76. Leg Lifecycle

A Transport Leg SHOULD support:

```text
PLANNED
ASSIGNED
BOOKED
READY
LOADED
DEPARTED
IN_TRANSIT
ARRIVED
DISCHARGED
COMPLETED
CANCELLED
```

Not all modes require every state.

---

# 77. Consignment Lifecycle

A Consignment SHOULD support a lifecycle such as:

```text
DRAFT
INSTRUCTED
BOOKING
BOOKED
ACCEPTED_FOR_CARRIAGE
IN_CARRIAGE
ARRIVED
DELIVERY_PENDING
DELIVERED
COMPLETED
CANCELLED
```

The exact transport contract semantics MAY differ by mode.

---

# 78. One Canonical State Machine Is Not Required for Every Mode

Road, sea, air and courier transport have different operational details.

Thamani SHALL define:

```text
stable shared semantic spine
+
mode-specific extensions
```

rather than forcing every mode into maritime vocabulary.

---

# 79. Milestone

A Milestone SHALL represent an expected or achieved meaningful logistics checkpoint.

Conceptually:

```text
Milestone
├── type
├── subject
├── expected_at?
├── estimated_at?
├── achieved_at?
├── location?
├── source
├── status
└── evidence_reference?
```

---

# 80. Milestone Is Not Event

A Milestone is a business interpretation/checkpoint.

An Event is something observed or scheduled.

For example:

```text
Events:
Truck gate-in
Cargo unloaded
Receiver signed POD

Milestone:
FINAL_DELIVERY_COMPLETED
```

---

# 81. Planned Milestones

The Transport Plan MAY define expected milestones.

Example:

```text
PICKUP
EXPORT_CLEARANCE
PORT_GATE_IN
VESSEL_DEPARTURE
DESTINATION_PORT_ARRIVAL
IMPORT_CLEARANCE
LAST_MILE_DISPATCH
DELIVERY
```

Not every shipment requires every milestone.

---

# 82. Multimodal Visibility Registry

UN/CEFACT's 2026 multimodal visibility work specifically addresses fragmented events across vessels, barges, trains and trucks and proposes harmonised transport-event semantics.

Thamani SHOULD therefore favour governed multimodal event vocabulary rather than independently invented mode-specific names wherever standards provide suitable semantics.

---

# 83. Tracking Projection

Customer tracking SHALL be a projection of operational data.

Conceptually:

```text
Operational Events
      │
      ▼
Visibility Policy
      │
      ▼
Customer Tracking Projection
```

---

# 84. Customer Tracking Is Not Raw Operations Feed

An internal event such as:

```text
CUSTOMS_SECONDARY_INSPECTION_SELECTED
```

MAY be projected to a customer as:

```text
CUSTOMS PROCESSING
```

if disclosure policy requires that abstraction.

---

# 85. Tracking Visibility Is Authorised

Tracking data can expose commercially and security-sensitive information.

Visibility SHALL be controlled according to:

```text
customer relationship
shipment relationship
provider relationship
user authority
data classification
shipment lifecycle
```

A tracking number alone SHALL NOT automatically grant access to sensitive cargo details.

---

# 86. Movement Access Is Scoped

The emerging UN/CEFACT multimodal visibility model similarly emphasises explicit, scoped and auditable permissions around consignments, equipment and transport means.

Thamani SHOULD preserve that principle.

---

# 87. Custody

Physical custody SHALL remain distinct from:

```text
ownership
title
commercial risk
```

as already established by Baobab inventory architecture.

A logistics event MAY change custody without changing ownership.

---

# 88. Custody Transfer

Examples include:

```text
Supplier
   ↓
Thamani Haulage

Thamani Haulage
   ↓
Port Terminal

Port Terminal
   ↓
Ocean Carrier

Ocean Carrier
   ↓
Destination Terminal

Destination Terminal
   ↓
Thamani Last Mile

Thamani Last Mile
   ↓
Customer
```

Each transition MAY represent a custody handover.

---

# 89. Custody Event

A custody transfer SHOULD identify:

```text
releasing_party
receiving_party
cargo/equipment
location
time
condition
seal state?
evidence?
exceptions?
```

where required.

---

# 90. Ownership Is Not Inferred From Custody

This SHALL be prohibited:

```text
Thamani possesses cargo
    therefore
Thamani owns cargo
```

Thamani may be:

```text
carrier
warehouse operator
bailee
forwarder
custodian
agent
```

without owning the goods.

---

# 91. In-Transit Inventory

Where inventory tracking applies:

```text
Shipment Execution
       │
       ▼
In-Transit Inventory Projection
```

MAY inform ERP/Trade.

The logistics domain SHALL not independently redefine financial inventory ownership.

---

# 92. Loading

Loading SHALL be an operational event/process related to:

```text
cargo
equipment
transport means
transport call
```

It SHALL NOT automatically mean:

```text
shipment departed
```

---

# 93. Departure

Departure SHOULD require a relevant actual movement event.

Example:

```text
Cargo loaded at 08:00
Truck departed 08:47
```

These are separate facts.

---

# 94. Arrival

Arrival at a location SHALL remain separate from:

```text
discharge
customs clearance
availability for collection
delivery
```

Example:

```text
Vessel arrived Durban
```

does not mean:

```text
Cargo available to customer
```

---

# 95. Transshipment

A transshipment SHALL be modelled explicitly where cargo/equipment transfers between movements.

Conceptually:

```text
Movement A
      │
      ▼
Arrival
      │
      ▼
Discharge
      │
      ▼
Intermediate Custody
      │
      ▼
Load
      │
      ▼
Movement B
```

---

# 96. Customs Events Are Separate

Customs state SHALL remain a distinct domain projection.

Examples:

```text
EXPORT_DECLARATION_ACCEPTED
EXPORT_RELEASED
TRANSIT_STARTED
CUSTOMS_HELD
IMPORT_DECLARATION_ACCEPTED
IMPORT_RELEASED
```

Physical arrival alone SHALL not establish customs release.

---

# 97. Customs Release Does Not Mean Delivery

This SHALL remain invariant:

```text
CUSTOMS_RELEASED
    !=
DELIVERED
```

Customs release merely removes or changes a regulatory constraint.

---

# 98. Delivery

Delivery SHALL represent physical handover or completion of the agreed delivery operation.

Conceptually:

```text
Delivery
├── id
├── shipment_id
├── consignment_id?
├── destination
├── recipient?
├── delivered_at
├── delivered_quantity?
├── condition?
├── exceptions[]
├── proof_reference?
└── provider_reference?
```

---

# 99. Delivery May Be Partial

The architecture SHALL support:

```text
FULL_DELIVERY
PARTIAL_DELIVERY
FAILED_DELIVERY
REFUSED_DELIVERY
```

A partial delivery SHALL preserve outstanding cargo.

---

# 100. Delivery Attempt

Last-mile and courier workflows SHALL support repeated delivery attempts.

Example:

```text
Attempt 1
CUSTOMER_UNAVAILABLE

Attempt 2
DELIVERED
```

Attempt history SHALL not be overwritten.

---

# 101. Proof of Delivery

Proof of Delivery SHALL be evidence associated with a delivery fact.

POD MAY contain:

```text
recipient
signature
OTP validation
photo
GPS/location
document
timestamp
driver/provider reference
exception note
```

subject to privacy and evidence policy.

---

# 102. POD Is Not Delivery

This distinction SHALL hold:

```text
Delivery Event
    !=
Proof of Delivery Artifact
```

A delivery may exist before the POD artifact has been synchronised.

Likewise an uploaded image does not automatically prove valid delivery.

---

# 103. POD Verification

Where required:

```text
POD CAPTURED
      │
      ▼
POD VALIDATION
      │
      ├── ACCEPTED
      ├── DISPUTED
      └── REJECTED
```

SHALL remain separate from physical transport execution.

---

# 104. Delivery Is Not Commercial Acceptance

This SHALL remain mandatory:

```text
DELIVERED
    !=
ACCEPTED
```

Customer acceptance MAY require:

```text
quantity verification
quality inspection
damage inspection
temperature review
document review
contractual acceptance
```

---

# 105. Closure

A Shipment SHALL not necessarily close immediately on physical delivery.

Closure MAY require:

```text
delivery complete
POD processed
exceptions resolved or transferred
documents complete
provider milestones reconciled
financial handoff initiated
claims identified
```

depending on policy.

---

# 106. Logistics Closure Is Not Financial Closure

This SHALL remain explicit:

```text
Shipment CLOSED
    !=
Customer Invoice Paid

Shipment CLOSED
    !=
Carrier Invoice Settled
```

ERP/finance lifecycles remain independent.

---

# 107. Cancellation

Cancellation SHALL be phase-aware.

Possible consequences differ between:

```text
DRAFT
BOOKING_REQUESTED
BOOKED
CARGO_PICKED_UP
IN_TRANSIT
CUSTOMS_HELD
OUT_FOR_DELIVERY
```

The system SHALL not allow unrestricted late cancellation.

---

# 108. Cancellation vs Termination

Where physical execution has begun, the correct operation may instead be:

```text
STOP
RECALL
RETURN
REROUTE
ABORT REMAINING LEGS
```

rather than pretending the shipment never existed.

---

# 109. Rerouting

Rerouting SHALL produce a new plan/version or amendment history.

Example:

```text
Original:
Kampala → Mombasa → Durban

Disruption:
Mombasa unavailable

Replanned:
Kampala → Dar es Salaam → Durban
```

Historical planned route SHALL remain visible.

---

# 110. Movement Substitution

A provider MAY substitute:

```text
truck
flight
vessel
train
```

only where:

```text
contract
qualification
capacity
cargo
customer terms
regulation
```

permit.

Material substitutions SHALL be auditable.

---

# 111. Provider Substitution

ADR-THA-0004 remains authoritative.

The system SHALL not permit:

```text
qualified Provider A
        ↓
silent substitution
        ↓
unqualified Provider B
```

for regulated execution.

---

# 112. Split Execution

One consignment MAY be physically split where contract and cargo semantics allow.

Example:

```text
Consignment
      │
      ├── Truck A
      └── Truck B
```

The domain SHALL preserve which cargo quantities travel on each movement.

---

# 113. Merge Execution

Cargo from multiple consignments MAY share transport means/equipment where operationally permitted.

The architecture SHALL preserve consignment boundaries even while capacity is shared.

---

# 114. Equipment Assignment

Equipment assignment MAY occur after booking.

Example:

```text
Booking confirmed
    │
    ▼
Container requirement:
1 × 40HC
    │
    ▼
Container ABCU1234567 allocated
```

Requirement and physical allocation SHALL remain separate.

---

# 115. Means Assignment

Likewise:

```text
Road booking
      │
      ▼
Truck class required
      │
      ▼
Vehicle CA123-456 assigned
```

shall distinguish:

```text
vehicle requirement
```

from:

```text
actual vehicle
```

---

# 116. Seal

Where relevant, Seal SHALL be independently modelled.

Possible facts include:

```text
seal identifier
seal type
sealing party
sealed_at
seal condition
broken_at
replacement seal
```

Seal changes MAY create security events.

---

# 117. Cold-Chain Sensor Events

ADR-THA-0005 SHALL support condition telemetry without owning the detailed cold-chain policy.

The event layer MAY ingest:

```text
temperature
humidity
shock
door state
power state
location
```

GS1 EPCIS 2.0 explicitly supports sensor information as part of visibility events.

Detailed excursion policy belongs to ADR-THA-0011.

---

# 118. Sensor Observation Is Not Exception

This SHALL remain:

```text
Temperature Reading = 9.2°C
        !=
Temperature Excursion Confirmed
```

A domain policy must interpret measurements against the cargo's required condition profile.

---

# 119. Event-to-Exception Flow

Conceptually:

```text
Observation
     │
     ▼
Policy Evaluation
     │
     ├── Within tolerance
     │
     └── Outside tolerance
              │
              ▼
           Exception
```

---

# 120. Exception Domain Boundary

This ADR defines execution interaction with exceptions.

Detailed claims and exception-management architecture SHALL be finalised under ADR-THA-0010.

An execution exception SHOULD reference:

```text
affected shipment
affected consignment
affected movement
affected leg
affected equipment
affected cargo
source event
```

as appropriate.

---

# 121. Project Logistics

Project Logistics MAY group multiple Shipments and movements beneath a Logistics Project.

Conceptually:

```text
Project
   │
   ├── Shipment 1
   │      ├── Consignment A
   │      └── Movements...
   │
   ├── Shipment 2
   └── Shipment N
```

The project SHALL not replace core shipment semantics.

---

# 122. Courier Compatibility

Courier operations MAY simplify the generic model.

For example:

```text
Parcel
  │
  ▼
Shipment
  │
  ▼
Consignment
  │
  ▼
Courier Movement
```

Some objects MAY be created implicitly through application services.

Their conceptual distinctions SHALL remain available where required.

---

# 123. Last-Mile Compatibility

A last-mile operation MAY consist of:

```text
Depot
   ↓
Vehicle Route
   ↓
Stop 1
Stop 2
Stop 3
...
```

The same movement may serve many consignments/shipments.

Therefore one route SHALL not be duplicated per delivery.

---

# 124. Multi-Stop Road Movement

Example:

```text
Truck Movement TG-ROAD-4421
│
├── Call 1 — Cape Town Depot
├── Call 2 — Customer A
├── Call 3 — Customer B
├── Call 4 — Customer C
└── Call 5 — Return Depot
```

Each customer consignment may occupy only part of the route.

---

# 125. Warehouse Integration

Warehouse operations SHALL interact with transport through explicit handoffs.

Example:

```text
Warehouse
    │
    ▼
Cargo Ready
    │
    ▼
Staged
    │
    ▼
Loaded
    │
    ▼
Movement
```

Warehouse internal:

```text
bin
pick
pack
putaway
cycle count
```

SHALL not automatically become transport-domain concerns.

---

# 126. Loading Readiness

A booking being confirmed SHALL not imply cargo is ready.

The architecture SHALL distinguish:

```text
BOOKED
CARGO_READY
EQUIPMENT_READY
DOCUMENTS_READY
CUSTOMS_READY
DISPATCH_READY
```

where relevant.

---

# 127. Readiness Projection

A movement may commence only if applicable policies permit.

Conceptually:

```text
Provider qualified?       YES
Booking confirmed?        YES
Cargo ready?              YES
Equipment ready?          YES
Mandatory docs ready?     YES
Regulatory release?       YES / NOT_REQUIRED
                         ─────
Execution ready            YES
```

---

# 128. No Universal Readiness Boolean as Authority

A derived:

```text
ready_to_dispatch = true
```

MAY be used.

It SHALL remain reproducible from underlying readiness facts.

---

# 129. Mode-Specific Extension

Each mode MAY extend the shared core.

For example:

```text
ROAD
├── driver
├── vehicle
├── trailer
├── road permit
└── border permit

SEA
├── vessel
├── voyage
├── container
├── port calls
└── bill-of-lading refs

AIR
├── flight
├── aircraft
├── ULD
├── air waybill refs
└── ground handler

RAIL
├── train
├── wagon
├── terminal
└── rail consignment refs
```

---

# 130. Shared Core Shall Remain Mode-Neutral

The generic core SHALL NOT contain assumptions such as:

```text
every transport has vessel_name
```

or:

```text
every transport has truck_registration
```

Mode-specific detail belongs in extensions/projections.

---

# 131. External Transport Documents

Transport documents SHALL reference the relevant:

```text
shipment
consignment
booking
movement
parties
equipment
```

as appropriate.

ADR-THA-0014 SHALL define document architecture in detail.

---

# 132. Transport Document Is Not Transport Contract Object

A document may evidence a transport contract.

The domain object and document SHALL remain distinct.

Example:

```text
Consignment
      │
      ▼
Transport Contract
      │
      ▼
Bill of Lading Artifact
```

The PDF/file SHALL not itself become the Consignment.

---

# 133. External References

The model SHALL support multiple external identifiers.

Examples:

```text
customer shipment reference
customer PO
carrier booking number
bill of lading number
air waybill number
road consignment number
container number
tracking number
customs reference
warehouse reference
driver trip number
```

No provider-specific identifier SHALL become universal canonical identity.

---

# 134. Correlation Across Baobab

Cross-engine processing SHALL use:

```text
Canonical IDs
+
ExternalReference
+
Mapping
+
Context
+
Correlation ID
```

as applicable.

Native database IDs SHALL not leak into universal contracts unnecessarily.

---

# 135. Thamani Authority

For a Thamani-managed logistics service, the Thamani Logistics Execution Domain SHALL own the operational semantics of:

```text
Shipment orchestration
Consignment orchestration
Transport Plan
Transport Movement coordination
Transport Leg assignment
Transport Call projection
Provider Booking coordination
Operational event ingestion
Execution status projection
Delivery coordination
```

The concrete runtime implementing this authority remains deferred to ADR-THA-0015.

---

# 136. Baobab Trade Boundary

Existing Baobab Trade ADR-0022 states that Trade owns shipment intent and logistics orchestration in the commerce/trade context.

That decision remains valid for:

```text
Baobab Trade
acting as the originating trade domain
```

until formally amended.

However:

```text
Thamani logistics customer engagement
```

SHALL NOT require Trade to become the operational owner of Thamani's transport network.

The target boundary is:

```text
TRADE
Commercial requirement / fulfilment intent
        │
        ▼
LOGISTICS CONTRACT
        │
        ▼
THAMANI LOGISTICS
Operational transport execution
```

A cross-repository addendum SHALL reconcile ADR-0022 before overlapping runtime authority is implemented.

---

# 137. ZuriBeans Example

Example:

```text
ZuriBeans
     │
     ▼
B2B Sales Order
     │
     ▼
Trade Fulfilment Requirement
     │
     ▼
Shipment Requirement
     │
     ▼
Thamani Logistics Service Order
     │
     ▼
Shipment / Consignment
     │
     ▼
Transport Plan
     │
     ├── Thamani Haulage
     ├── External Shipping Line
     └── Thamani Last Mile
```

ZuriBeans retains its trade.

Thamani owns the contracted logistics execution.

---

# 138. External Customer Example

A mining company may use Thamani without Baobab Trade:

```text
Mining Company
     │
     ▼
Project Logistics RFQ
     │
     ▼
Thamani Service Order
     │
     ▼
Shipment
     │
     ▼
Consignment
     │
     ▼
Transport Plan
     │
     ▼
Heavy-Haul Execution
```

This SHALL be a first-class architecture.

---

# 139. ERP Boundary

ERP SHALL remain authoritative for financial consequences such as:

```text
customer invoice
carrier payable
transport accrual
freight cost
revenue
cost allocation
landed cost
financial inventory consequence
```

The logistics domain SHALL provide operational facts.

---

# 140. Operational Cost vs Financial Posting

This SHALL remain explicit:

```text
Estimated logistics cost
    !=
Provider invoice

Provider invoice
    !=
GL posting
```

ADR-THA-0006 and ERP architecture govern commercial/financial consequences.

---

# 141. Control Plane Boundary

Control Plane SHALL continue to own or resolve:

```text
tenant
legal entity
canonical organisation
market
trade lane
capability grants
provider bindings
context
canonical mapping
```

It SHALL NOT maintain truck-trip or vessel-voyage execution state as its principal responsibility.

---

# 142. IAM Boundary

IAM SHALL own:

```text
human authentication
service identity
sessions
credentials
MFA
membership projection
```

It SHALL NOT determine:

```text
Shipment delivered
Booking confirmed
Cargo loaded
Provider arrived
```

---

# 143. CMS Boundary

CMS SHALL not become the shipment database merely because shipment documents or public tracking content may be displayed through it.

---

# 144. Pulse Boundary

Baobab Pulse MAY calculate:

```text
ETA prediction
delay probability
route risk
congestion prediction
provider performance
exception likelihood
```

But:

```text
AI ETA
    =
prediction
```

not:

```text
actual arrival
```

---

# 145. Estimated Events May Be Machine-Generated

A predicted arrival MAY be produced by:

```text
carrier
Thamani rule engine
external visibility provider
AI model
```

The source SHALL be preserved.

---

# 146. Prediction Does Not Rewrite Plan

This SHALL remain:

```text
Planned Arrival
    !=
Estimated Arrival
```

Both facts are required.

---

# 147. Actual Events Require Evidence/Authority

An `ACTUAL` event SHALL require an authorised source or governed manual process.

The browser SHALL not permit arbitrary customer-controlled setting of:

```text
ACTUAL_DELIVERED
```

---

# 148. Manual Operations

Thamani SHALL support providers with limited technology.

Execution events MAY arrive through:

```text
API
webhook
EDI
provider portal
mobile workflow
controlled operator input
```

The source channel SHALL be recorded.

---

# 149. Human-Entered Event Is Valid but Identified

A manually entered event MAY be legitimate.

It SHALL retain:

```text
entered_by
event_source = MANUAL
event_time
record_time
reason/evidence where required
```

---

# 150. Offline Mobile Operations

Road, last-mile, warehouse and project logistics MAY operate with intermittent connectivity.

Clients SHOULD support:

```text
offline capture
stable local operation ID
original event occurrence time
eventual synchronisation
idempotent submission
```

where business requirements justify it.

---

# 151. No False Real-Time Assumption

The platform SHALL not assume:

```text
physical world
=
always connected
```

A delayed event SHALL not be treated as though the physical action happened only when the API received it.

---

# 152. Reconciliation

Provider and Thamani operational state SHALL support reconciliation.

Example:

```text
Thamani projection:
IN_TRANSIT

Carrier system:
DELIVERED

No POD received:
YES

        │
        ▼
RECONCILIATION REQUIRED
```

The system SHALL not silently choose whichever state arrived last.

---

# 153. Conflict Resolution

Conflicting provider observations SHALL preserve provenance.

Example:

```text
Carrier:
DELIVERED 14:32

Customer:
NOT RECEIVED

Driver:
POD submitted 14:35
```

This should create:

```text
delivery verification / dispute workflow
```

rather than silently overwrite one source.

---

# 154. Audit

Material execution changes SHALL be auditable.

At minimum:

```text
plan created
plan changed
provider assigned
provider substituted
booking confirmed
booking cancelled
movement reassigned
cargo split
cargo consolidated
route changed
manual event inserted
event corrected
delivery recorded
POD overridden
shipment cancelled
shipment closed
```

---

# 155. History Preservation

Operational history SHALL support answering:

```text
What did we originally plan?

What changed?

Who changed it?

Why?

Which provider was involved?

What actually happened?

When did we learn about it?

What did the customer see?
```

---

# 156. Shared Contract Namespace

Cross-repository logistics execution contracts SHOULD eventually live under a governed namespace such as:

```text
baobab-platform/shared/
└── contracts/
    └── logistics/
        └── v1/
```

Potential contracts include:

```text
ShipmentReference
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
Delivery
ProofOfDeliveryReference
ExecutionExceptionReference
```

---

# 157. Shared Does Not Become Runtime

`baobab-platform/shared` SHALL own:

```text
cross-repository contract definitions
vocabulary
schemas
event envelopes
```

It SHALL NOT become the operational transport runtime.

---

# 158. International Standards Mapping

Shared contracts SHOULD provide mappings where practical for:

```text
UN/CEFACT
DCSA
IATA ONE Record
GS1 EPCIS
```

but SHALL retain Baobab canonical semantics.

---

# 159. Standards Versions

External standards SHALL be versioned explicitly.

Examples:

```text
DCSA Track & Trace version X
IATA ONE Record ontology version Y
EPCIS 2.0
UN/CEFACT vocabulary version/date
```

Adapters SHALL not assume external standards remain static.

DCSA's 2026 roadmap itself continues evolving Track & Trace, eBL, VGM, booking and IoT-related standards, illustrating why version independence is necessary.

---

# 160. Current DCSA Blueprint

DCSA currently publishes a 2026.Q1 Industry Blueprint edition, further reinforcing that interoperability references evolve independently from Thamani's internal domain.

---

# 161. Execution Read Model

Thamani MAY maintain efficient projections such as:

```text
CurrentShipmentView
├── current_status
├── current_location?
├── current_provider?
├── current_leg?
├── current_movement?
├── next_milestone?
├── current_eta?
├── open_exceptions[]
└── last_event_at
```

These SHALL be derived operational views rather than the sole source of historical facts.

---

# 162. Customer Read Model

A customer-oriented projection MAY expose:

```text
shipment reference
origin
destination
service level
status
milestones
ETA
documents
open customer-visible exception
delivery status
```

while hiding internal/provider-sensitive information.

---

# 163. Operations Read Model

Internal operations MAY require richer projections:

```text
provider
movement
route
booking
equipment
driver/means
calls
custody
customs
exceptions
cost exposure
qualification
```

Access SHALL remain role-based.

---

# 164. Provider Read Model

A provider SHOULD see only execution assignments relevant to that provider.

Provider A SHALL NOT automatically see:

```text
Provider B rates
customer margins
unrelated shipments
other-provider performance
internal Thamani commercial data
```

---

# 165. Concurrency

Operational logistics involves concurrent changes.

Examples:

```text
carrier submits departure
customs system releases cargo
operator updates ETA
customer changes delivery window
```

The runtime SHALL use appropriate:

```text
versioning
optimistic concurrency
idempotency
event correlation
```

to prevent lost updates.

---

# 166. Distributed Transaction Boundary

Thamani SHALL NOT require one distributed ACID transaction across:

```text
carrier
customs
ERP
warehouse
IAM
Trade
Thamani
```

Instead:

```text
local transaction
+
outbox/event
+
idempotent consumer
+
reconciliation
```

SHOULD be used where asynchronous integration applies.

---

# 167. No Shared Operational Database

This remains prohibited:

```text
Thamani
direct SQL
into
ERP / Trade / Control Plane database
```

and vice versa.

Integration SHALL use governed contracts/APIs/events.

---

# 168. Shipment Deletion

Once a Shipment has material operational history:

```text
physical deletion
```

SHOULD normally be prohibited.

Cancellation or archival SHALL preserve audit/history according to policy.

---

# 169. Draft Cleanup

Uncommitted draft records MAY be deleted under explicit lifecycle policy.

This SHALL not be confused with deleting executed transport history.

---

# 170. Data Retention

Transport records MAY be subject to:

```text
commercial
customs
tax
insurance
claims
contractual
safety
privacy
```

retention requirements.

Retention SHALL be policy-driven and jurisdiction-aware.

---

# 171. Personal Data

Transport execution may involve:

```text
driver identity
recipient identity
phone numbers
delivery addresses
GPS
signatures
photos
```

Only necessary personal information SHALL be processed and exposed.

---

# 172. Security-Sensitive Location Data

Cargo location can create theft/security risk.

Precise real-time movement information SHOULD therefore be access-controlled.

Public tracking SHOULD expose only appropriate granularity.

---

# 173. Dangerous Goods

Transport execution SHALL carry references to dangerous-goods requirements where applicable.

Detailed dangerous-goods architecture belongs to ADR-THA-0011.

The execution engine SHALL nevertheless be able to prevent assignment of incompatible:

```text
provider
mode
equipment
route
facility
```

where policy requires.

---

# 174. Regulatory Hold

A regulatory hold SHALL block affected operational transitions.

Example:

```text
CUSTOMS_HOLD
      │
      ▼
DISPATCH TO FINAL DELIVERY
      │
      X
```

unless an authorised policy permits movement under control.

---

# 175. Physical World Cannot Always Be Rolled Back

Software compensating actions SHALL reflect physical reality.

Example:

```text
Cargo already departed
```

cannot be corrected with:

```text
ROLLBACK SQL TRANSACTION
```

The domain SHALL use operational compensation:

```text
reroute
recall
return
hold
transfer
```

instead.

---

# 176. Shipment Command Model

Commands MAY include:

```text
CreateShipment
PlanShipment
CreateConsignment
AssignShipmentToConsignment
RequestBooking
ConfirmBooking
AssignMovement
RecordEvent
ReplanTransport
CancelBooking
HoldExecution
ResumeExecution
RecordDelivery
CloseShipment
```

Exact APIs remain an implementation decision.

---

# 177. Commands vs Events

This distinction SHALL remain:

```text
COMMAND
"Record pickup"
```

versus:

```text
EVENT
"Cargo picked up"
```

Commands request changes.

Events assert or observe outcomes.

---

# 178. Command Authorization

A provider MAY be authorised to:

```text
ConfirmBooking
RecordPickup
RecordDeparture
UploadPOD
```

without being permitted to:

```text
ChangeCustomer
ChangeContractPrice
ApproveOwnQualification
CloseClaim
```

Authorization SHALL be capability-specific.

---

# 179. Event Source Authority

Not every actor can authoritatively assert every event.

Examples:

```text
Carrier
    may authoritatively report vehicle departure

Customs Authority
    may authoritatively report customs release

Warehouse Operator
    may report cargo handover

Customer
    may dispute delivery
```

Authority SHALL be event-type/context aware.

---

# 180. Cross-Border Example

A Uganda → South Africa shipment might be represented as:

```text
Shipment
Coffee: Kampala → Cape Town
       │
       ▼
Consignment
Thamani door-to-door transport contract
       │
       ▼
Transport Plan v1
       │
       ├── Movement 1
       │     ROAD
       │     Kampala → Mombasa
       │
       ├── Movement 2
       │     SEA
       │     Mombasa → Durban
       │
       └── Movement 3
             ROAD
             Durban → Cape Town
```

Each movement MAY have:

```text
different provider
different booking
different equipment
different events
different regulatory constraints
```

while the customer still experiences:

```text
one Thamani logistics service
```

---

# 181. 4PL Example

Thamani 4PL MAY orchestrate:

```text
Customer Shipment
       │
       ▼
Consignment
       │
       ▼
Plan
       │
       ├── External Carrier A
       ├── External Warehouse B
       ├── External Shipping Line C
       └── Thamani Last Mile
```

The architecture SHALL not require Thamani to physically execute any leg itself.

---

# 182. Internal Execution Example

Alternatively:

```text
Customer Shipment
       │
       ▼
Plan
       │
       ├── Thamani Haulage
       ├── Thamani Warehousing
       └── Thamani Last Mile
```

The same canonical execution model SHALL apply.

---

# 183. Mixed Execution Example

The most common mature model may be:

```text
Thamani Haulage
      +
External Shipping Line
      +
Thamani Customs
      +
External Warehouse
      +
Thamani Last Mile
```

The customer SHALL still receive one coherent shipment view.

---

# 184. Alternatives Considered

## Alternative A — One Shipment Record With One Status

**Rejected.**

It cannot represent multimodal execution, consolidation, replanning, several providers or detailed event history.

---

## Alternative B — Shipment = Consignment

**Rejected.**

Trade delivery and transport-contract semantics differ.

---

## Alternative C — Shipment = Provider Booking

**Rejected.**

Bookings can be cancelled/replaced while the underlying logistics requirement remains.

---

## Alternative D — Shipment = Order

**Rejected.**

A shipment may arise outside commerce and orders may split into several shipments.

---

## Alternative E — One Transport Leg = One Shipment

**Rejected.**

Multimodal shipments routinely contain several physical legs.

---

## Alternative F — Store Current Status Only

**Rejected.**

It destroys operational provenance and prevents reliable reconciliation.

---

## Alternative G — Use DCSA as Universal Canonical Model

**Rejected.**

DCSA is excellent for container shipping but Thamani is multimodal.

---

## Alternative H — Use IATA ONE Record as Universal Model

**Rejected.**

It is specifically designed for air cargo interoperability.

---

## Alternative I — Invent Entirely Proprietary Logistics Semantics

**Rejected.**

Strong international semantic standards already exist.

---

## Alternative J — Put All Logistics Execution in Medusa

**Rejected.**

Commerce fulfilment and logistics execution are different domains.

---

## Alternative K — Put All Logistics Execution in iDempiere

**Rejected.**

ERP is financially authoritative but is not automatically the optimal multimodal execution runtime.

---

# 185. Positive Consequences

This architecture provides:

```text
multimodal transport
trade/transport semantic separation
consolidation
deconsolidation
multi-provider execution
asset-light logistics
owned-asset execution
3PL compatibility
4PL compatibility
cross-border routing
road/sea/air/rail extensibility
standards interoperability
event-driven visibility
planned-vs-actual analysis
provider replacement
shipment replanning
offline-event support
custody tracking
auditability
future control-tower capability
```

---

# 186. Costs and Negative Consequences

The domain becomes more complex than:

```text
shipment
---------
id
status
tracking_number
```

It requires:

```text
shipment
consignment
transport plan
route
movement
leg
call
booking
event
milestone
equipment
means
delivery
```

That complexity is accepted because it represents the real logistics business.

---

# 187. Required Follow-Up Decisions

This ADR creates dependencies on:

```text
ADR-THA-0006
RFQ, Logistics Quotation, Contract,
Rate and Margin Architecture

ADR-THA-0007
Fleet, Equipment, Capacity, Asset Ownership
and Carrier Execution Architecture

ADR-THA-0008
Cross-Border, Customs, Corridor,
Transit and Regulatory Architecture

ADR-THA-0009
Warehousing, 3PL and Inventory-Custody Architecture

ADR-THA-0010
Tracking, Milestones, Telemetry,
Exceptions, POD and Claims Architecture

ADR-THA-0011
Cold Chain, Dangerous Goods
and Special-Cargo Architecture

ADR-THA-0014
Transport Documents, eBL,
Evidence and Records Architecture

ADR-THA-0015
Thamani–Baobab System-of-Record,
Engine and Integration Boundary
```

---

# 188. Implementation Gates

Implementation SHOULD proceed through controlled gates.

## THA-EXE-00 — Existing Logistics Contract Audit

Audit:

```text
Baobab Trade ADR-0016
Baobab Trade ADR-0022
Shared contracts
ERP shipment representations
Control Plane inventory/custody model
Thamani existing code
```

Classify:

```text
REUSE
REMAP
SUPERSEDE
EXTEND
REMOVE
```

No blind duplication.

---

## THA-EXE-01 — Canonical Vocabulary

Establish Shared vocabulary for:

```text
Shipment
Consignment
Movement
Leg
Route
Call
Booking
Event
```

and their relationships.

---

## THA-EXE-02 — Shipment / Consignment Model

Implement:

```text
Shipment
Consignment
ConsignmentItem
associations
external references
```

without provider execution yet.

---

## THA-EXE-03 — Planning Model

Implement:

```text
TransportPlan
TransportRoute
TransportLeg
TransportCall
plan versioning
```

---

## THA-EXE-04 — Booking

Implement provider-neutral:

```text
booking request
confirmation
decline
cancellation
rebooking
```

integrated with ADR-THA-0004 qualification.

---

## THA-EXE-05 — Movement Model

Implement:

```text
TransportMovement
TransportMeans reference
Equipment assignments
Consignment assignments
```

---

## THA-EXE-06 — Event Spine

Implement:

```text
canonical transport events
eventTime
recordTime
source
idempotency
ordering
provenance
correlation
```

---

## THA-EXE-07 — Lifecycle Projection

Implement deterministic projections for:

```text
Shipment
Consignment
Movement
Leg
Booking
```

from authoritative underlying state/events.

---

## THA-EXE-08 — Road Reference Slice

Prove execution using:

```text
road haulage
single-country
one pickup
one delivery
```

before tackling multimodal complexity.

---

## THA-EXE-09 — Cross-Border Road

Extend reference slice to:

```text
border calls
transit
customs events
several jurisdictions
```

---

## THA-EXE-10 — Maritime Multimodal

Add:

```text
road pre-carriage
port call
container/equipment
sea movement
transshipment
road on-carriage
```

and DCSA mappings.

---

## THA-EXE-11 — Air Freight

Add IATA ONE Record mappings where required.

---

## THA-EXE-12 — Consolidation

Prove:

```text
many shipments
    ↓
one consignment / common movement
    ↓
deconsolidation
```

with lineage preserved.

---

## THA-EXE-13 — Customer Tracking Projection

Expose policy-controlled operational visibility.

---

## THA-EXE-14 — Replanning and Exception Resilience

Test:

```text
provider cancellation
route closure
border delay
missed vessel
vehicle breakdown
partial delivery
late event
duplicate event
out-of-order event
```

---

## THA-EXE-15 — Cross-Engine Reconciliation

Verify:

```text
Trade
ERP
Control Plane
providers
Thamani
```

without shared database assumptions.

---

## THA-EXE-16 — Production Hardening

Verify:

```text
tenant isolation
authorization
idempotency
event replay
concurrency
event provenance
provider outage
offline synchronization
audit
backup/recovery
data retention
privacy
observability
performance
```

before production declaration.

---

# 189. Final Architectural Invariants

The following SHALL remain non-negotiable:

```text
Shipment
    != Commercial Order

Shipment
    != Commerce Fulfilment

Shipment
    != Consignment

Shipment
    != Booking

Shipment
    != Movement

Consignment
    != Booking

Consignment
    != Transport Means

Consignment
    != Transport Equipment

Transport Route
    != Trade Lane

Transport Route
    != Transport Movement

Transport Movement
    != Transport Leg

Transport Movement
    != Transport Means

Transport Means
    != Transport Equipment

Transport Call
    != Location

Transport Event
    != Current Status

Milestone
    != Event

Planned
    != Estimated

Estimated
    != Actual

Event Time
    != Record Time

Delivery
    != Customer Acceptance

Delivery
    != POD Artifact

POD Captured
    != POD Verified

Custody
    != Ownership

Custody
    != Risk Transfer

Custody
    != Title Transfer

Customs Release
    != Delivery

Arrival
    != Customs Release

Arrival
    != Cargo Availability

Cargo Loaded
    != Movement Departed

Provider Qualified
    != Provider Booked

Booking Confirmed
    != Cargo Ready

Equipment Required
    != Equipment Assigned

Movement Planned
    != Movement Executed

Provider Status
    != Canonical Shipment Status

External Event
    != Canonical Event until mapped/validated

AI ETA
    != Actual Event

Digital Estate
    != Logistics Runtime

Control Plane
    != TMS

ERP
    != TMS

Trade
    != Thamani operational execution authority by default

External Standard
    != Internal database schema

Physical history
    must preserve provenance

Plan changes
    must preserve version history

External identifiers
    must not replace canonical identity

Provider events
    must tolerate duplication and disorder

Operational facts
    must remain reconstructable
```

---

# 190. Final Decision

Thamani Global SHALL establish its transport execution architecture around independently identifiable:

```text
Shipment
Consignment
Transport Plan
Transport Route
Transport Movement
Transport Leg
Transport Call
Transport Booking
Transport Event
Milestone
Transport Means
Transport Equipment
Delivery
```

The model SHALL support:

```text
ROAD
SEA
AIR
RAIL
INLAND WATERWAY
COURIER
MULTIMODAL
```

without privileging one transport mode.

The canonical execution flow is:

```text
                    CUSTOMER / COMMERCIAL REQUIREMENT
                                  │
                                  ▼
                         LOGISTICS SERVICE ORDER
                                  │
                                  ▼
                              SHIPMENT
                                  │
                      trade / delivery intent
                                  │
                                  ▼
                            CONSIGNMENT
                                  │
                       transport-contract view
                                  │
                                  ▼
                           TRANSPORT PLAN
                                  │
                   ┌──────────────┼──────────────┐
                   ▼              ▼              ▼
                Route         Providers       Bookings
                   │              │              │
                   └──────────────┼──────────────┘
                                  ▼
                        TRANSPORT MOVEMENT
                                  │
                    physical trip / voyage
                                  │
                                  ▼
                           TRANSPORT LEG
                                  │
                    consignment segment
                                  │
                                  ▼
                         TRANSPORT CALLS
                                  │
                                  ▼
                         TRANSPORT EVENTS
                                  │
                  planned / estimated / actual
                                  │
                                  ▼
                    EXECUTION PROJECTIONS
                                  │
             ┌────────────────────┼────────────────────┐
             ▼                    ▼                    ▼
         Tracking            Exceptions           Milestones
             │                    │                    │
             └────────────────────┼────────────────────┘
                                  ▼
                              DELIVERY
                                  │
                                  ▼
                         PROOF / ACCEPTANCE
                                  │
                                  ▼
                               CLOSURE
```

The architectural outcome SHALL be that Thamani can answer, for every logistics engagement:

```text
What commercial goods are moving?

Under which transport arrangement are they moving?

Which cargo belongs to which consignment?

What was the planned route?

Which physical journeys actually carried the cargo?

Which providers performed each part?

Which vehicle, vessel, aircraft or train was involved?

Which equipment held the cargo?

Where was it expected to be?

Where was it actually observed?

What changed from the original plan?

Who reported each operational fact?

What evidence supports delivery?

Which exceptions remain unresolved?

What did the customer see?

What is the complete historical execution record?
```

The defining execution principle is:

> **Thamani shall model logistics as a sequence of contractual, planned and physically observed realities—not as a single mutable shipment status.**

And the defining interoperability principle is:

> **Thamani shall adopt durable multimodal semantics internally, map international mode-specific standards at its boundaries, preserve provenance and history, and keep commercial intent, transport contracts, physical journeys, bookings, events and delivery evidence explicitly separate.**