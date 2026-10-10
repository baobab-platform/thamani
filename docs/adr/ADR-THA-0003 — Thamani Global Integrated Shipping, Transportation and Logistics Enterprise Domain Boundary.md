# ADR-THA-0003 — Thamani Global Integrated Shipping, Transportation and Logistics Enterprise Domain Boundary

**Status:** Accepted — Foundational Thamani Architecture  
**Date:** 2026-09-24  
**Decision Owners:** Nabhold Group Africa / Thamani Global / Baobab Platform Architecture  
**Primary Repository:** `baobab-platform/thamani`  
**Legal Entity:** `THAMANI-GLOBAL`  
**Platform:** Baobab Platform  
**Canonical Contract Authority:** `baobab-platform/shared`  
**Platform Context Authority:** `baobab-platform/baobab-cp`  
**Identity Authority:** `baobab-platform/baobab-iam`  
**ERP Authority:** `baobab-platform/baobab-erp`  
**Commerce/Trade Engine:** `baobab-platform/baobab-trade`, only where explicitly applicable  
**Intelligence:** `baobab-platform/baobab-pulse`  
**Content Authority:** `baobab-platform/baobab-cms` where applicable  
**Decision Class:** Foundational business-domain, logistics, transport, shipping, digital-estate and platform-boundary architecture

---

## 1. Decision

Thamani Global SHALL be repurposed from a consumer-first B2C ecommerce enterprise into an integrated **shipping, transportation, freight and logistics enterprise**.

Thamani Global SHALL operate the following twelve business divisions:

|   # | Business division      | Primary mandate                                                                |
| --: | ---------------------- | ------------------------------------------------------------------------------ |
|   1 | Haulage                | Road freight and physical cargo transportation                                 |
|   2 | Shipping               | Maritime freight, shipping services and containerised/bulk carriage capability |
|   3 | Freight Forwarding     | Multimodal transport arrangement and freight orchestration                     |
|   4 | Customs Brokerage      | Customs clearance and regulatory border-service execution                      |
|   5 | Warehousing            | Storage, handling, cross-docking and distribution-centre services              |
|   6 | 3PL                    | Outsourced execution of one or more customer logistics functions               |
|   7 | Courier                | Parcel, document and express movement                                          |
|   8 | Last Mile              | Final-leg collection and delivery                                              |
|   9 | Cold Chain             | Temperature- and condition-controlled logistics                                |
|  10 | Project Logistics      | Heavy, oversized, abnormal and complex cargo projects                          |
|  11 | Cross-Border Logistics | International and regional corridor logistics                                  |
|  12 | 4PL                    | Multi-provider supply-chain orchestration and logistics control-tower services |

These divisions SHALL be represented as **business capabilities and operating divisions of the same legal entity**.

They SHALL NOT automatically become:

```text
separate legal entities
separate Baobab tenants
separate canonical organisations
separate digital estates
separate databases
separate logistics platforms
```

A future decision to incorporate or dispose of a division as a separate legal entity SHALL require a separate ADR and corresponding Control Plane canonical-organisation changes.

---

# 2. Supersession of the Previous Thamani Model

This ADR supersedes the business architecture established by legacy:

```text
ADR-0001 — Next.js B2C Digital Estate
```

Specifically superseded are the assumptions that Thamani Global is fundamentally:

```text
B2C
retail
catalogue-centric
cart-centric
checkout-centric
consumer-commerce-centric
Medusa-storefront-centric
```

The following technology decisions from ADR-0001 MAY survive temporarily:

```text
Next.js
React
strict TypeScript
server-first rendering
independently deployable digital estate
adapter-oriented backend access
accessibility
SEO
performance discipline
```

Those technology choices SHALL be revalidated independently from the obsolete B2C business model.

Legacy:

```text
ADR-0002 — Supplier Onboarding Portal
```

is superseded wherever it assumes:

```text
THAMANI-GLOBAL = B2C
```

Its reusable supplier-qualification mechanisms MAY remain transitional inputs to a future logistics-counterparty ADR.

ADR-0002 SHALL NOT be interpreted as the final architecture for:

```text
carrier onboarding
haulier onboarding
broker onboarding
warehouse-provider onboarding
logistics-partner onboarding
```

Those concerns require a broader counterparty-capability model.

---

# 3. ADR Naming Convention

From this decision onward, Thamani ADRs SHALL use:

```text
ADR-THA-NNNN — Title
```

and filenames SHOULD follow:

```text
ADR-THA-NNNN-short-kebab-case-title.md
```

Therefore this decision is:

```text
ADR-THA-0003
```

The legacy filenames for ADR-0001 and ADR-0002 SHOULD remain in Git history rather than being silently erased.

---

# 4. Research Basis

This decision has been informed by the operating models and standards of:

```text
FIATA
CSCMP
UN/CEFACT
WCO
WTO
IMO
IATA
DCSA
GS1
ICC
UNCITRAL
ISO
WHO
COMESA
SADC
SARS
Uganda Revenue Authority
```

FIATA's freight-forwarding definition encompasses carriage, multimodal transport, consolidation, storage, handling, packing, distribution, customs/fiscal services, insurance/document services and modern ICT-supported supply-chain management.

CSCMP distinguishes logistics from the broader supply chain and includes transportation management, fleet management, warehousing, materials handling, network design and management of third-party logistics providers within logistics management.

The architecture SHALL therefore treat logistics as a first-class enterprise domain rather than as a narrow delivery function attached to ecommerce.

---

# 5. Fundamental Business Model

Thamani SHALL support three operating models simultaneously:

```text
ASSET-OWNING
     +
ASSET-LIGHT
     +
HYBRID
```

Thamani SHALL therefore be capable of:

```text
owning assets
leasing assets
chartering capacity
contracting carriers
subcontracting providers
acting as freight forwarder
acting as logistics principal
acting as logistics agent
operating customer-owned facilities
orchestrating several providers
```

without changing the canonical shipment model.

The architecture SHALL NOT equate:

```text
provides transport
=
owns transport asset
```

or:

```text
Shipping Division
=
owns vessels
```

or:

```text
Haulage Division
=
owns every truck used
```

---

# 6. Capacity Source Is Explicit

Every execution resource SHOULD expose its capacity source.

Conceptually:

```text
CapacitySource

OWNED
LEASED
CHARTERED
DEDICATED_CONTRACT
SPOT_CONTRACT
PARTNER
SUBCONTRACTED
CUSTOMER_PROVIDED
OTHER
```

Asset ownership and service responsibility SHALL remain different concepts.

This permits Thamani to begin asset-light and progressively acquire strategic assets without redesigning the logistics domain.

---

# 7. Business Divisions Are Capability Boundaries

A division SHALL represent:

```text
commercial responsibility
operating expertise
P&L / management reporting dimension
service capability
policy boundary where necessary
```

It SHALL NOT necessarily represent a software bounded context.

For example, one shipment may involve:

```text
Thamani Cross-Border
        │
        ├── Thamani Haulage
        ├── Thamani Customs
        ├── Thamani Warehousing
        └── Thamani Last Mile
```

The customer SHALL NOT need four unrelated transactions merely because four divisions participate.

---

# 8. One Thamani — Composite Service Delivery

The governing commercial principle SHALL be:

> **Customers buy logistics outcomes from Thamani Global; Thamani internally composes the divisions and providers needed to deliver those outcomes.**

A customer requirement may therefore be:

```text
Move 20 tonnes of coffee
from Kampala
to Cape Town
door-to-door
temperature monitored
customs cleared
by 15 November
```

The internal composition could be:

```text
CUSTOMER REQUIREMENT
        │
        ▼
CROSS-BORDER LOGISTICS
        │
        ├── Haulage
        │
        ├── Freight Forwarding
        │
        ├── Customs Brokerage
        │
        ├── Shipping
        │
        ├── Warehousing
        │
        └── Last Mile
        │
        ▼
ONE CUSTOMER LOGISTICS OUTCOME
```

---

# 9. Logistics Is Not Commerce Fulfilment

Baobab Trade ADR-0016 already distinguishes commerce fulfilment from physical logistics.

That distinction becomes mandatory for Thamani:

```text
Commerce Fulfilment
        !=
Shipment
        !=
Consignment
        !=
Transport Movement
        !=
Freight Booking
        !=
Delivery
```

Thamani's principal product is physical-logistics execution and orchestration.

Consequently:

> **Medusa commerce fulfilment SHALL NOT become Thamani's logistics domain merely because Baobab Trade already contains shipping abstractions.**

Baobab Trade MAY consume or invoke Thamani logistics capabilities.

Thamani SHALL NOT be reduced to a Medusa Fulfilment Provider.

---

# 10. Existing Baobab Logistics Semantics Are Reused

Baobab Trade ADR-0022 already establishes valuable canonical distinctions including:

```text
Shipment
Consignment
Transport Leg
Freight Booking
Carrier
Freight Forwarder
Customs Broker
Warehouse / 3PL
Tracking Event
Delivery
```

Thamani SHALL align with those semantics wherever applicable.

However, ADR-0022 was designed primarily to allow a trading enterprise such as ZuriBeans to consume logistics providers.

Thamani is different:

```text
ZuriBeans
    consumes logistics

Thamani
    provides and orchestrates logistics
```

Therefore a subsequent ADR SHALL determine whether Thamani's operational domain is supplied by:

```text
an extended Baobab Trade capability

or

a dedicated Baobab Logistics capability/engine

or

an approved external logistics/TMS capability
```

This ADR deliberately does **not** prejudge that implementation decision.

---

# 11. Thamani Repository Is a Digital Estate, Not Automatically the Logistics System of Record

`baobab-platform/thamani` SHALL remain the independently deployable Thamani digital estate unless superseded by another decision.

It MAY host:

```text
public website
customer portal
partner portal
operational user interfaces
tracking experience
quotation experience
document experience
service dashboards
```

It SHALL NOT silently become authoritative persistence for all logistics transactions simply because the user interfaces reside there.

The architectural relationship is:

```text
                   THAMANI DIGITAL ESTATE
                           │
               ┌───────────┼───────────┐
               │           │           │
               ▼           ▼           ▼
           Customer     Partner     Operations
            Portal       Portal        UI
               │           │           │
               └───────────┼───────────┘
                           │
                           ▼
                  DOMAIN CAPABILITIES
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
      Logistics          ERP            Control
      Execution                        Plane/IAM
```

---

# 12. Core Operational Hierarchy

Thamani SHALL use an explicit hierarchy rather than one overloaded `shipment` object.

Conceptually:

```text
Customer Requirement
        │
        ▼
Logistics RFQ
        │
        ▼
Logistics Quote
        │
        ▼
Service Order / Booking
        │
        ▼
Shipment
        │
        ├── Consignment(s)
        │
        └── Transport Plan
                │
                ├── Leg / Movement 1
                ├── Leg / Movement 2
                └── Leg / Movement N
                         │
                         ▼
                Provider Booking(s)
                         │
                         ▼
                   Execution Events
                         │
                         ▼
                     Delivery
                         │
                         ▼
                  Proof / Closure
```

---

# 13. Customer Requirement

A Customer Requirement captures desired logistics outcome.

It MAY include:

```text
origin
destination
cargo
quantity
weight
volume
dimensions
ready date
required delivery date
service level
transport preferences
special handling
temperature profile
dangerous-goods status
insurance requirements
customs requirements
delivery requirements
```

It SHALL NOT itself mean transport has been booked.

---

# 14. Logistics RFQ

A Logistics RFQ represents a commercial request for logistics pricing and service.

It MAY request:

```text
one division
multiple divisions
door-to-door service
port-to-port service
warehouse-to-warehouse service
one transport mode
multimodal transport
project logistics
4PL management
```

---

# 15. Logistics Quote

A Logistics Quote SHALL distinguish:

```text
customer sell price
provider buy rates
estimated pass-through charges
surcharges
duties/taxes where appropriate
insurance
handling
storage assumptions
validity
service commitments
exclusions
currency
```

The architecture SHALL preserve:

```text
CUSTOMER SELL RATE
        !=
PROVIDER BUY RATE
        !=
ESTIMATED COST
        !=
ACTUAL COST
        !=
INVOICE
```

This distinction is essential to logistics margin control.

---

# 16. Logistics Service Order

Acceptance of a quotation MAY create a Logistics Service Order.

The Service Order represents the customer's contractual service instruction.

It SHALL remain distinct from:

```text
Shipment
Carrier Booking
ERP Sales Order
Customer Invoice
Transport Document
```

---

# 17. Shipment

A Shipment SHALL represent a logical Thamani-managed movement or movement requirement.

Conceptually:

```text
Shipment
├── canonical_id
├── tenant_context
├── legal_entity_id
├── customer_relationship_id
├── service_order_id?
├── origin
├── destination
├── shipment_type
├── cargo_profile
├── service_level
├── trade_lane_id?
├── logistics_corridor_id?
├── planned_start
├── required_delivery
├── status
├── consignments[]
├── transport_plan_id
├── references[]
└── evidence_refs[]
```

A Shipment SHALL NOT be equated with a customer order.

---

# 18. Consignment

Thamani SHALL align its consignment semantics with recognised multimodal transport principles.

UN/CEFACT describes a consignment as an identifiable collection of consignment items moving from a consignor to a consignee under a transport contract.

Conceptually:

```text
Consignment
├── consignor
├── consignee
├── transport_contract_reference
├── cargo_items[]
├── packages[]
├── gross_weight
├── volume
├── handling_requirements
├── dangerous_goods?
├── temperature_profile?
├── transport_document_refs[]
└── status
```

---

# 19. Shipment Is Not Consignment

The relationship MAY be:

```text
Shipment
   ├── Consignment A
   ├── Consignment B
   └── Consignment C
```

or, where appropriate:

```text
Consignment
   participates in
   multiple operational movements
```

Implementations SHALL preserve explicit identifiers and lineage rather than depending on one ambiguous `shipment_number`.

---

# 20. Transport Plan

A Transport Plan describes the intended physical execution.

Conceptually:

```text
TransportPlan
├── shipment_id
├── route
├── legs[]
├── transshipment_points[]
├── facilities[]
├── service providers[]
├── planned milestones[]
├── fallback options[]
└── plan_version
```

Transport plans SHALL be versioned.

Replanning SHALL NOT destroy historical plans.

---

# 21. Transport Leg / Movement

A physical movement SHALL be explicitly represented.

Conceptually:

```text
TransportLeg
├── id
├── sequence
├── origin
├── destination
├── mode
├── carrier/provider
├── means_of_transport?
├── equipment[]
├── booking_reference?
├── planned_departure
├── estimated_departure?
├── actual_departure?
├── planned_arrival
├── estimated_arrival?
├── actual_arrival?
└── status
```

Canonical modes SHALL support at least:

```text
ROAD
SEA
AIR
RAIL
INLAND_WATERWAY
COURIER
MULTIMODAL
OTHER
```

---

# 22. Trade Lane Is Not Transport Route

This distinction is mandatory.

Baobab Control Plane ADR-BCP-011 defines a Trade Lane as an authorised directional market relationship.

Thamani SHALL separately model the physical logistics route/corridor.

Therefore:

```text
TRADE LANE
Uganda → South Africa
```

may be executed through:

```text
ROUTE A

Kampala
  ↓ road
Mombasa
  ↓ sea
Durban
  ↓ road
Cape Town
```

or:

```text
ROUTE B

Kampala
  ↓ road
Dar es Salaam
  ↓ sea
Cape Town
```

or another lawful route.

Thus:

```text
TradeLane
!=
TransportRoute
!=
TransportCorridor
!=
TransportLeg
```

---

# 23. Transit Jurisdictions Are First-Class

A cross-border shipment MAY transit countries where neither customer nor Thamani has a permanent commercial market presence.

The transport model SHALL therefore support:

```text
origin jurisdiction
destination jurisdiction
zero or more transit jurisdictions
border crossings
ports
airports
inland terminals
customs territories
free zones
bonded facilities
```

without inventing those transit states as customer markets.

---

# 24. Standard Location Identification

Where an appropriate international trade/transport location exists, Thamani SHOULD support UN/LOCODE alongside local/internal identifiers.

UN/LOCODE is specifically intended to identify ports, airports, freight terminals, clearance locations and other trade/transport places unambiguously.

The canonical location model SHALL still allow:

```text
street address
GPS coordinates
warehouse locator
customer site
construction site
farm
mine
temporary project site
unnamed roadside location
```

where no appropriate UN/LOCODE exists.

---

# 25. Counterparty Architecture

Thamani SHALL reuse the Baobab canonical Organisation and Counterparty model.

The same organisation MAY simultaneously hold several logistics relationships:

```text
Organisation
     │
     ├── CUSTOMER
     ├── CARRIER
     ├── HAULIER
     ├── FREIGHT_FORWARDER
     ├── CUSTOMS_BROKER
     ├── WAREHOUSE_OPERATOR
     ├── COURIER
     ├── LAST_MILE_PROVIDER
     ├── SHIPPING_LINE
     ├── PORT_AGENT
     ├── GROUND_HANDLER
     ├── INSURER
     └── SUBCONTRACTOR
```

These SHALL be roles/capabilities.

They SHALL NOT become duplicate organisation identities.

---

# 26. Organisation Is Not Approval

Canonical Organisation identity answers:

```text
Who is this organisation?
```

Thamani provider qualification answers:

```text
May Thamani use this organisation
for this logistics capability
in this jurisdiction
for this cargo/service class
during this effective period?
```

Therefore:

```text
Organisation exists
!=
Provider approved
```

and:

```text
Provider approved for road haulage
!=
Provider approved for dangerous goods
!=
Provider approved for cold-chain pharma
```

---

# 27. Provider Capability

A logistics provider SHALL expose explicit capabilities.

Conceptually:

```text
ProviderCapability
├── organisation_id
├── capability
├── market/jurisdiction scope
├── corridor scope?
├── cargo classes[]
├── equipment classes[]
├── service levels[]
├── licences/evidence[]
├── insurance evidence[]
├── qualification_state
├── effective_from
├── effective_to?
└── restrictions[]
```

This allows one organisation to perform several roles without identity duplication.

---

# 28. Provider Qualification and Organisation Verification Are Different

Baobab Control Plane SHALL remain authoritative for platform-level organisation identity, evidence and verification.

Thamani SHALL own logistics-specific qualification.

For example:

```text
CONTROL PLANE

legal organisation exists
registration evidence
canonical organisation identity
corporate relationships
platform admission

              │

              ▼

THAMANI

carrier qualification
operating licence evidence
vehicle/fleet capability
cargo capability
insurance suitability
route/corridor eligibility
cold-chain capability
dangerous-goods capability
service performance
commercial terms
```

Generic organisation evidence SHALL not be reimplemented in the Thamani estate.

---

# 29. Haulage Division

The Haulage division SHALL support:

```text
owned fleet
leased fleet
dedicated contracted fleet
spot subcontractors
owner-drivers
third-party hauliers
```

Operational concepts MAY include:

```text
vehicle
trailer
driver
tractor
equipment class
load
trip
route
stop
dispatch
proof of pickup
proof of delivery
fuel/energy usage
odometer/distance
permit
incident
maintenance reference
```

Fleet-management depth SHALL be determined by a later ADR.

---

# 30. Shipping Division

The Shipping division SHALL represent maritime logistics capability.

It SHALL support progressive maturity.

Initially Thamani MAY act as:

```text
booking intermediary
freight forwarder
shipping agent where authorised
multimodal contracting party where authorised
capacity buyer
consolidator
```

Later, subject to business case and regulatory approval, Thamani MAY become an asset-owning or vessel-operating carrier.

The software architecture SHALL NOT require vessel ownership merely for the division to exist.

Likewise it SHALL NOT represent Thamani as vessel-operating carrier when it is actually acting as agent or forwarder.

The role for each contract SHALL be explicit.

---

# 31. Maritime Container Safety

Where Thamani acts in the relevant shipper role for containerised maritime carriage, the system SHALL be able to retain Verified Gross Mass information and evidence.

SOLAS requires verified gross mass as a condition for loading packed containers and places responsibility for providing that VGM on the shipper identified under the applicable transport documentation.

VGM SHALL therefore be an explicit transport fact/evidence item where applicable, not a free-text note.

---

# 32. Container Identity

Thamani SHOULD support standards-aligned container identifiers.

ISO 6346 defines the international system for identification and marking of freight containers and explicitly supports documentation and electronic data interchange use.

The implementation SHALL version its external-standard references rather than assuming one ISO edition forever.

---

# 33. Freight Forwarding Division

Freight Forwarding SHALL own customer-facing arrangement and coordination of multimodal freight where Thamani acts as forwarder.

Its workflow MAY compose:

```text
carrier procurement
consolidation
deconsolidation
warehouse handling
customs brokerage
cargo insurance arrangement
document coordination
multimodal routing
delivery coordination
```

without requiring Thamani to physically perform every leg.

This reflects the internationally recognised breadth of freight-forwarding services.

---

# 34. Customs Brokerage Division

Customs Brokerage SHALL be a regulated capability.

It SHALL NOT be implemented as generic shipment status manipulation.

Conceptually:

```text
Shipment
    │
    ▼
Customs Case
    │
    ├── jurisdiction
    ├── procedure
    ├── declaration references
    ├── declarant
    ├── broker
    ├── supporting documents
    ├── duties/taxes references
    ├── regulatory decisions
    ├── inspections
    ├── holds
    └── releases
```

Baobab Trade ADR-0021 SHALL remain authoritative for general trade-compliance provider separation.

Thamani SHALL not duplicate complete customs legislation in application code.

---

# 35. Regulatory Adapter Principle

Jurisdiction-specific customs, border and transport rules SHALL enter through:

```text
versioned rules
configuration
provider adapters
regulatory integrations
evidence
effective-dated policies
```

rather than hard-coded country branches scattered across application logic.

This is particularly important because South African cargo reporting is already electronic across air, sea and road, while Uganda participates in regional electronic transit monitoring through RECTS.

---

# 36. Regional Transit Architecture

Thamani's African cross-border architecture SHALL support regional transit regimes without coupling the core domain to one bloc.

COMESA's Regional Customs Transit Guarantee scheme supports customs-security guarantees for transit movement across participating states, while SADC explicitly treats corridor and border facilitation as a regional transport concern.

The architecture SHALL therefore permit:

```text
regional transit guarantee references
electronic cargo tracking references
corridor identifiers
border events
bond references
transit declarations
seal references
```

where applicable.

---

# 37. Warehousing Division

Warehousing SHALL distinguish:

```text
facility
warehouse
zone
locator/bin
storage unit
handling unit
inventory custody
inventory ownership
inventory accounting
```

Thamani MAY physically possess goods without owning them.

Therefore:

```text
CUSTODY
!=
OWNERSHIP
```

This aligns with the existing ERP and Control Plane inventory architecture.

---

# 38. Warehouse Operator Is Not Inventory Owner

Examples:

```text
Customer-owned cargo
stored by Thamani

ZuriBeans-owned cargo
stored by Thamani

Thamani-owned consumables
stored by Thamani
```

are legally and financially different.

The logistics domain SHALL preserve:

```text
owner
custodian
facility operator
consignor
consignee
beneficial commercial party
```

where relevant.

---

# 39. 3PL Division

For Thamani, 3PL means providing or managing one or more logistics execution services for a customer.

CSCMP's industry study distinguishes 3PL providers from 4PL providers by treating 3PLs as providers/managers of logistics services while 4PLs may orchestrate multiple logistics providers or broader portions of the supply chain.

Thamani 3PL MAY therefore combine:

```text
warehouse operation
inventory handling
transport
fulfilment
distribution
returns
value-added logistics services
```

under a customer SLA.

---

# 40. 4PL Division

Thamani 4PL SHALL be an orchestration capability rather than merely another carrier.

Conceptually:

```text
CUSTOMER
   │
   ▼
THAMANI 4PL CONTROL TOWER
   │
   ├── Thamani Haulage
   ├── Thamani Warehousing
   ├── Thamani Customs
   ├── External Carrier A
   ├── External 3PL B
   ├── Shipping Line C
   ├── Airline D
   └── Warehouse E
```

A 4PL arrangement MAY manage providers Thamani neither owns nor directly operates.

Provider neutrality is therefore mandatory.

---

# 41. No Self-Preference Assumption

A Thamani 4PL solution SHALL NOT automatically choose a Thamani internal division merely because it belongs to the same legal entity.

Selection MAY consider:

```text
customer contract
price
capacity
service level
route
reliability
risk
equipment
regulatory eligibility
customer preference
performance
sustainability
availability
```

subject to commercial policy.

---

# 42. Courier Division

Courier operations MAY introduce parcel-oriented concepts including:

```text
parcel
piece
label
manifest
pickup
hub
sortation
route
stop
delivery attempt
recipient
proof
return-to-sender
```

Courier SHALL remain compatible with the wider Shipment/Consignment model rather than creating an unrelated logistics universe.

---

# 43. Last-Mile Division

Last Mile SHALL represent final collection/delivery execution.

It SHALL support:

```text
business deliveries
residential deliveries
scheduled deliveries
time windows
multi-stop routes
delivery attempts
failed delivery
redelivery
proof of delivery
customer collection points
returns
```

without assuming every last-mile job originated from ecommerce.

---

# 44. Cold-Chain Division

Cold Chain SHALL be modelled as logistics plus explicit condition-control requirements.

Conceptually:

```text
ColdChainProfile
├── required_temperature_min
├── required_temperature_max
├── humidity_constraints?
├── excursion_tolerance?
├── monitoring_required
├── sensor_requirements[]
├── packaging_requirements[]
├── equipment_requirements[]
└── evidence_requirements[]
```

GS1 EPCIS 2.0 explicitly supports sensor data in supply-chain visibility events, including condition-monitoring scenarios such as cold chains.

ISO 23412 specifies operational requirements for certain temperature-controlled parcel land-delivery services, while WHO guidance requires strong monitoring/evidence practices for temperature-sensitive medical products.

Commodity-specific regulations SHALL be policy-driven and jurisdiction-sensitive.

---

# 45. Condition Excursion

A condition excursion SHALL be a first-class operational event.

For example:

```text
TEMPERATURE_EXCURSION
HUMIDITY_EXCURSION
SEAL_BREACH
DOOR_OPEN
SHOCK_THRESHOLD_EXCEEDED
ROUTE_DEVIATION
POWER_FAILURE
```

The raw sensor observation SHALL remain distinct from the business conclusion.

Therefore:

```text
SensorReading
!=
ExcursionAssessment
!=
CargoDamageDecision
```

---

# 46. Project Logistics Division

Project Logistics SHALL support work that cannot be adequately represented as ordinary parcel or routine freight.

Examples include:

```text
industrial machinery
construction equipment
mining equipment
transformers
generators
oversized cargo
abnormal loads
heavy-lift cargo
plant relocation
infrastructure-project cargo
```

A Logistics Project MAY contain:

```text
Project
├── surveys
├── permits
├── engineering studies
├── lift plans
├── route plans
├── escorts
├── shipments[]
├── equipment[]
├── subcontractors[]
├── milestones[]
├── risks[]
└── documents[]
```

A project SHALL not be collapsed into one oversized Shipment object.

---

# 47. Cross-Border Logistics Division

Cross-Border Logistics SHALL own customer-facing corridor orchestration.

It MAY compose:

```text
road
rail
sea
air
customs
transit
warehousing
border handling
document management
last mile
```

Cross-Border SHALL NOT duplicate the execution functions of each division.

It is primarily an orchestration/service capability.

---

# 48. Dangerous Goods

Dangerous-goods handling SHALL be a specialised capability, not a boolean decoration.

Where applicable, the domain SHALL retain:

```text
classification
UN number
proper shipping name
hazard class
packing group
quantity
packaging
labels/marks
handling requirements
documentation
mode-specific restrictions
emergency information
```

For maritime transport, SOLAS and the IMDG Code govern packaged dangerous goods; air transport uses mode-specific dangerous-goods requirements such as IATA DGR.

The platform SHALL resolve the applicable rule set by:

```text
mode
jurisdiction
cargo
date
provider
```

rather than assuming one universal dangerous-goods rule.

---

# 49. Freight Booking

A provider booking is an execution contract/reference.

Conceptually:

```text
FreightBooking
├── shipment_id
├── leg_id?
├── provider_id
├── provider_service
├── quote_reference?
├── provider_booking_reference
├── capacity
├── equipment
├── scheduled_dates
├── terms
├── status
└── external_references[]
```

A booking SHALL NOT become the canonical Shipment identity.

---

# 50. Equipment

Transport equipment SHALL be explicit.

Examples:

```text
container
trailer
reefer
tank
ULD
pallet
swap body
special project equipment
```

Equipment SHALL remain distinct from the means of transport.

For example:

```text
Container
   carried by
Vessel
```

and:

```text
Trailer
   moved by
Truck tractor
```

---

# 51. Transport Means

TransportMeans MAY represent:

```text
truck
tractor
vessel
aircraft
train
rail wagon
barge
motorcycle
van
other vehicle
```

The architecture SHALL NOT use `vehicle` as a universal term for every mode.

---

# 52. Event Architecture

Thamani SHALL use event-oriented logistics visibility.

An event SHOULD identify:

```text
what happened
when it happened
where it happened
which object was affected
who/source reported it
whether it is planned, estimated or actual
provenance
correlation identifiers
```

DCSA uses standardised shipment, transport and equipment tracking events for container shipping, while GS1 EPCIS standardises interoperable visibility information around what, when, where, why and how.

---

# 53. Planned, Estimated and Actual Time

The system SHALL distinguish:

```text
PLANNED
ESTIMATED
ACTUAL
```

times.

It SHALL NOT overwrite:

```text
planned_arrival
```

with:

```text
actual_arrival
```

or lose the historical ETA sequence.

This supports schedule-performance measurement and explainable exceptions.

---

# 54. Event Provenance

Every externally sourced operational event SHOULD retain:

```text
source organisation
source system
provider reference
received_at
occurred_at
original event identifier
confidence/verification state where appropriate
raw evidence reference where required
```

External provider data SHALL not silently become internally asserted fact without provenance.

---

# 55. Event History and Projection

Where practical:

```text
Event History
      │
      ▼
Operational Projection
```

SHOULD be preferred to repeatedly overwriting all logistics history.

Corrections MAY occur, but correction lineage SHALL be auditable.

---

# 56. Shipment Tracking

Customer tracking SHALL be a projection of authoritative operational events.

The public/customer tracking interface SHALL NOT expose every internal event automatically.

It SHALL support policy-based mapping such as:

```text
Internal event
CUSTOMS_DOCUMENT_QUERY

Customer projection
CUSTOMS PROCESSING
```

where disclosure policy requires abstraction.

---

# 57. Digital Shipping Standards

Thamani SHALL prefer standards-based external adapters rather than inventing provider-specific semantics as its canonical model.

Important reference standards include:

```text
UN/CEFACT MMT RDM
UN/CEFACT Buy-Ship-Pay
UN/EDIFACT
DCSA Track & Trace
DCSA Bill of Lading
IATA ONE Record
GS1 EPCIS
WCO Data Model
IMO Compendium
FIATA transport documents/eFBL
```

UN/CEFACT deliberately structures its multimodal reference model to support interoperable data exchange across modes and supply-chain/regulatory domains.

---

# 58. Canonical Model Is Not Any One External Standard

Thamani SHALL NOT make:

```text
DCSA object
IATA object
GS1 event
WCO declaration
EDI message
```

its universal internal model.

Instead:

```text
External Standard
       │
       ▼
Adapter / Mapping
       │
       ▼
Baobab / Thamani Canonical Contract
```

This protects Thamani from mode-specific and provider-specific lock-in.

---

# 59. Air Cargo Interoperability

Where Thamani handles air freight, its integration architecture SHOULD accommodate IATA ONE Record.

ONE Record provides a common air-cargo data model plus API and security specifications for information exchange among airlines, forwarders, handlers and other stakeholders.

Thamani SHALL not invent an incompatible air-cargo information island where standards-based mapping is practical.

---

# 60. Ocean Visibility Interoperability

Where ocean carriers expose DCSA-compatible interfaces, Thamani SHOULD prefer those standard semantics before building carrier-specific event vocabularies.

DCSA's Track & Trace model is intended to make tracking data interoperable across shipping lines and parties.

Carrier-specific adapters MAY still be necessary.

---

# 61. Electronic Transport Documents

Thamani SHALL be designed for both:

```text
paper
and
electronic
```

transport documents.

It SHALL NOT assume paper remains mandatory forever.

DCSA and FIATA provide digital bill-of-lading standards, while UNCITRAL's MLETR provides a technology-neutral legal model for electronic transferable records such as bills of lading and warehouse receipts where adopted by applicable law.

---

# 62. Document Is Not File

The domain SHALL distinguish:

```text
Business Document
       │
       ├── identity
       ├── type
       ├── issuer
       ├── lifecycle
       ├── legal/commercial semantics
       └── versions
              │
              ▼
        Artifact / File
```

Uploading a PDF SHALL NOT by itself create a valid bill of lading, customs declaration or warehouse receipt.

---

# 63. Transport Document Types

Thamani SHALL support extensible transport document classification.

Examples include:

```text
bill of lading
sea waybill
air waybill
road consignment note
rail consignment note
multimodal transport document
warehouse receipt
packing list
commercial invoice reference
certificate of origin reference
customs declaration
dangerous-goods declaration
proof of delivery
inspection certificate
insurance certificate
```

Authority SHALL be document-specific.

---

# 64. Incoterms Boundary

Thamani SHALL consume explicit Incoterms context where a commercial goods contract uses Incoterms.

ICC states that Incoterms allocate important seller/buyer responsibilities, costs and risk around delivery, carriage and import/export formalities.

Baobab Trade ADR-0026 SHALL remain authoritative for the distinction:

```text
Incoterm
!=
title transfer
!=
payment terms
!=
tax decision
!=
customs eligibility
```

Thamani SHALL not independently infer those consequences from an Incoterm code.

---

# 65. Customs Single-Window Compatibility

Thamani integration architecture SHALL support digital regulatory exchange.

The WTO Trade Facilitation Agreement encourages Single Window arrangements, while IMO requires Maritime Single Window use for ship/port regulatory information exchange in IMO Member States from 1 January 2024.

The architecture SHALL therefore avoid workflows that inherently require re-keying the same data into every external authority.

---

# 66. Customer, Provider and Government Data Are Different

The canonical model SHALL distinguish:

```text
customer-provided data
provider-provided data
Thamani operational data
regulatory declarations
government decisions
sensor observations
financial records
```

A government release status SHALL not be editable as if it were an ordinary internal shipment status.

---

# 67. Logistics Exception Model

Exceptions SHALL be first-class.

Examples:

```text
DELAY
MISROUTE
CAPACITY_FAILURE
CARRIER_NO_SHOW
CUSTOMS_HOLD
DOCUMENT_MISSING
DOCUMENT_REJECTED
BORDER_DELAY
PORT_CONGESTION
DAMAGE
LOSS
SHORTAGE
OVERAGE
TEMPERATURE_EXCURSION
SEAL_BREACH
FAILED_DELIVERY
EQUIPMENT_FAILURE
SECURITY_INCIDENT
```

An exception SHALL preserve:

```text
severity
source
affected object
detected time
responsible party?
resolution owner
SLA impact
financial impact?
evidence
resolution
```

---

# 68. Claims

Claims SHALL remain distinct from exceptions.

An operational exception MAY cause:

```text
no claim
customer claim
carrier claim
insurance claim
supplier claim
internal loss
```

Conceptually:

```text
Exception
    │
    ▼
Investigation
    │
    ├── no liability
    └── Claim
           │
           ▼
      Resolution
```

---

# 69. Proof of Delivery

Proof of Delivery SHALL be evidence associated with delivery.

POD MAY include:

```text
recipient identity/reference
time
location
signature
photo
OTP/verification
document
device information
exception notes
```

subject to privacy and evidence policy.

`DELIVERED` SHALL not necessarily mean `POD_VERIFIED`.

---

# 70. Reverse Logistics

The architecture SHALL support reverse movement.

Examples:

```text
customer return
failed delivery return
reusable packaging return
equipment repositioning
container return
damaged cargo return
recall
repair movement
```

Reverse logistics SHALL not require inventing a fake outbound order.

---

# 71. 3PL Inventory Boundary

Where Thamani operates customer inventory under 3PL arrangements:

```text
customer inventory ownership
       !=
Thamani warehouse custody
       !=
Thamani financial inventory
```

The ERP/WMS/logistics boundary SHALL preserve those distinctions.

---

# 72. ERP Authority

Baobab ERP SHALL remain authoritative for financially consequential records assigned to ERP.

These MAY include:

```text
customer invoices
supplier/carrier invoices
accounts receivable
accounts payable
general ledger
freight accruals
cost centres
financial asset records
financial inventory where applicable
landed-cost accounting
revenue recognition inputs
```

The logistics domain SHALL provide operational facts.

ERP SHALL provide financial consequences.

---

# 73. Division Financial Reporting

The twelve divisions MAY be represented in ERP using appropriate:

```text
cost centres
profit centres
organisational dimensions
projects
activity dimensions
```

depending on accepted ERP architecture.

Such ERP representations SHALL NOT turn divisions into separate Baobab LegalEntity identities.

---

# 74. Customer Revenue Model

The platform SHALL support multiple logistics charging models.

Examples:

```text
per shipment
per trip
per kilometre
per tonne
per tonne-km
per pallet
per parcel
per container
per TEU
per handling event
per storage day
per square metre
per cubic metre
per stop
per customs entry
per project
fixed monthly management fee
cost-plus
contract tariff
spot rate
surcharge
commission
margin
```

The price model SHALL be extensible.

---

# 75. Surcharges

Surcharges SHALL be structured rather than hidden in unparseable quote notes where possible.

Examples MAY include:

```text
fuel
security
peak season
remote area
port congestion
demurrage
detention
storage
waiting time
toll
border
documentation
handling
dangerous goods
temperature control
oversize
escort
```

Applicability, payer and authority SHALL be explicit.

---

# 76. Demurrage and Detention

Where applicable, the architecture SHALL distinguish charge concepts rather than collapsing everything into `penalty_fee`.

Charge semantics MAY differ by:

```text
equipment
carrier
terminal
location
free time
contract
jurisdiction
```

These SHALL be modelled as contractual/provider charge rules.

---

# 77. Currency

Every monetary amount SHALL carry explicit currency.

The platform SHALL NOT infer currency solely from:

```text
country
customer
provider
```

Cross-border logistics routinely combines several currencies in one service.

---

# 78. Rate Validity

Logistics rates SHALL support:

```text
effective_from
effective_to
quote_valid_until
market
corridor
mode
equipment
service level
cargo class
customer contract
provider contract
```

Historical bookings SHALL retain the rate/contract context under which they were committed.

---

# 79. Tracking and Operational KPIs

Thamani SHOULD measure operational performance including:

```text
on-time pickup
on-time departure
on-time delivery
transit-time variance
customs-clearance duration
dwell time
exception rate
damage rate
loss rate
first-attempt delivery
cold-chain excursions
provider reliability
capacity acceptance
quote-to-book conversion
planned-vs-actual cost
gross margin
claims frequency
```

The World Bank's Logistics Performance Index similarly treats customs efficiency, transport infrastructure, shipment arrangement, logistics competence, tracking/tracing and timeliness as major logistics-performance dimensions.

---

# 80. Security

Thamani SHALL treat supply-chain security as an enterprise concern.

The architecture SHALL support:

```text
provider verification
cargo integrity
seal integrity
chain of custody
access controls
document integrity
fraud detection
tamper evidence
cybersecurity
privileged-action audit
incident management
```

ISO 28000 provides a general security-management framework applicable to supply chains.

---

# 81. Audit

Material changes SHALL be auditable.

At minimum:

```text
quote changes
provider selection
route change
booking change
cargo detail change
dangerous-goods change
customs status change
document replacement
temperature excursion assessment
delivery confirmation
claim decision
manual status override
```

SHOULD identify actor, time, reason and previous/new state.

---

# 82. No Silent Operational Overrides

The system SHALL prohibit patterns equivalent to:

```text
shipment.status = "DELIVERED"
```

without appropriate evidence, transition validation or authorised override semantics.

External facts and internal projections SHALL remain distinguishable.

---

# 83. Identity and Access

Baobab IAM SHALL remain the authentication authority.

Thamani MAY have user personas including:

```text
customer administrator
customer shipper
customer finance user
carrier administrator
driver
warehouse operator
customs operator
Thamani operations
Thamani finance
Thamani customer service
Thamani compliance
Thamani management
```

Authentication identity SHALL remain separate from logistics-party identity.

---

# 84. Driver Is Not User Account

A driver may have:

```text
operational Driver identity
```

and optionally:

```text
IAM user identity
```

Those are related but not identical.

The same principle applies to:

```text
broker agent
warehouse worker
recipient
shipper contact
consignee contact
```

---

# 85. Digital Estate Experiences

The Thamani digital estate SHOULD eventually provide three primary experiences:

```text
PUBLIC ESTATE
CUSTOMER PORTAL
PARTNER / OPERATIONS PORTAL
```

The exact IA requires a later ADR/design decision.

---

# 86. Public Estate

The public estate SHOULD focus on:

```text
services
divisions
industries
corridors
capabilities
request a quote
tracking entry
company
compliance/safety information
contact
```

It SHALL NOT retain ecommerce catalogue/cart metaphors merely because the repository previously contained them.

---

# 87. Customer Portal

The customer experience SHOULD eventually support:

```text
dashboard
RFQs
quotes
bookings
shipments
tracking
documents
customs visibility
warehouse visibility
invoices
claims
reports
notifications
account/team management
```

subject to capability availability.

---

# 88. Partner Portal

The partner/provider experience MAY support:

```text
onboarding
qualification
service capabilities
fleet/equipment declarations
lane capability
rate submission
booking acceptance
dispatch
tracking events
documents
POD
invoice submission
performance
compliance evidence
```

subject to later ADRs.

---

# 89. 4PL Control Tower

A mature 4PL experience MAY expose a logistics control tower.

Conceptually:

```text
                    CUSTOMER SUPPLY CHAIN
                            │
                            ▼
                   THAMANI CONTROL TOWER
                            │
             ┌──────────────┼──────────────┐
             ▼              ▼              ▼
          Orders        Shipments       Inventory
             │              │              │
             └──────────────┼──────────────┘
                            ▼
                       Logistics Plan
                            │
            ┌───────────────┼────────────────┐
            ▼               ▼                ▼
       Thamani Divisions External 3PLs   Carriers
            │               │                │
            └───────────────┼────────────────┘
                            ▼
                     Visibility Events
                            │
                            ▼
                      Exceptions / SLA
```

---

# 90. Control Plane Boundary

Baobab Control Plane SHALL continue to own platform concerns such as:

```text
canonical organisation
legal entity
tenant
market participation
trade lane
capability grants
capability bindings
provider/engine resolution
context
canonical mapping
platform admission
```

It SHALL NOT become a TMS.

---

# 91. Trade Lane and Capability Resolution

A logistics operation MAY consume CP context including:

```text
tenant
legal entity
market
trade lane
service entitlement
provider binding
jurisdiction
```

But routing optimisation and transport execution SHALL remain logistics-domain concerns.

---

# 92. Baobab Trade Boundary

Baobab Trade SHALL remain authoritative for commerce/trade concerns assigned to it.

Examples include:

```text
commerce order
commercial procurement workflows
commerce fulfilment
commerce price
trade compliance orchestration where assigned
commercial trade documents where assigned
Incoterm context
```

Thamani logistics SHALL neither duplicate nor depend upon Medusa concepts where no commerce transaction exists.

A customer SHALL be able to purchase a logistics service without purchasing goods from a Baobab Commerce storefront.

---

# 93. ZuriBeans as a Customer

ZuriBeans MAY consume Thamani services through the same logistics contracts available to other eligible customers.

Conceptually:

```text
ZURIBEANS
    │
    ▼
Commercial Trade Requirement
    │
    ▼
THAMANI LOGISTICS SERVICE
    │
    ├── Freight Forwarding
    ├── Haulage
    ├── Customs
    ├── Shipping
    └── Delivery
```

Thamani SHALL not gain ownership of ZuriBeans' trade transaction merely because it provides logistics.

---

# 94. Group Companies Are Not Privileged Canonical Shortcuts

Nabhold subsidiaries MAY be customers of one another under appropriate governance.

The architecture SHALL not bypass:

```text
counterparty identity
contracts
authorisation
financial controls
intercompany rules
audit
```

merely because both entities share the same parent group.

---

# 95. ERP and Logistics Order Are Different

A Logistics Service Order MAY project into ERP as financially necessary.

It SHALL not simply reuse an ERP identifier as its canonical logistics identity.

Conceptually:

```text
Canonical Logistics Service Order
        │
        ├── Logistics Runtime Representation
        └── ERP Sales/Project/Financial Representation
```

Mappings SHALL remain explicit.

---

# 96. CMS Boundary

CMS MAY own:

```text
service marketing content
division pages
corridor editorial content
guides
FAQs
news
public compliance information
```

CMS SHALL NOT become authoritative for:

```text
shipments
carrier bookings
customs decisions
financial invoices
tracking events
```

simply because those records contain documents or text.

---

# 97. Pulse Boundary

Baobab Pulse MAY provide intelligence including:

```text
ETA risk
route risk
provider performance insights
capacity trends
freight-market signals
port congestion
exception prediction
cost anomalies
demand forecasting
corridor intelligence
```

Pulse output SHALL remain advisory unless an explicitly governed automation policy promotes it into an operational decision.

AI inference SHALL NOT become a customs release, delivery confirmation or regulatory fact.

---

# 98. Sustainability and Emissions

Thamani SHOULD design for transport-emissions reporting.

ISO 14083 establishes a common methodology for quantifying and reporting greenhouse-gas emissions from passenger and freight transport-chain operations.

The logistics model SHOULD therefore preserve enough facts eventually to support calculations involving:

```text
mode
distance
mass
equipment
energy/fuel
load factor where available
transport legs
provider emissions data
```

The exact methodology SHALL be specified by a later sustainability decision.

---

# 99. Maritime Environmental Compliance

Where Thamani eventually operates vessels or assumes regulated maritime responsibilities, applicable maritime environmental obligations SHALL be implemented through specialised compliance capability.

MARPOL is the principal international convention covering prevention of pollution from ships from operational and accidental causes.

The current digital estate SHALL NOT pretend to provide vessel-compliance functionality that Thamani does not operationally require.

---

# 100. Data Residency and Privacy

Logistics data MAY contain:

```text
personal information
driver information
customer addresses
precise locations
commercially sensitive rates
customs data
cargo values
identity evidence
security-sensitive route information
```

Data classification, residency, access and retention SHALL follow Baobab security and privacy architecture.

Public tracking SHALL expose the minimum information appropriate to the requesting party.

---

# 101. Event and Integration Reliability

Cross-system commands/events SHALL support as appropriate:

```text
idempotency
correlation IDs
causation IDs
versioning
retry
dead-letter handling
outbox/inbox patterns
reconciliation
audit
```

Physical logistics frequently continues while software or providers are temporarily unavailable.

The architecture SHALL therefore support later reconciliation rather than assuming every external provider responds synchronously.

---

# 102. Provider Outage

A provider outage SHALL NOT be interpreted as a successful logistics state.

For example:

```text
Carrier API unavailable
        !=
Shipment delivered
```

The system SHALL represent:

```text
UNKNOWN
PENDING_RECONCILIATION
PROVIDER_UNAVAILABLE
```

where appropriate.

---

# 103. Offline and Delayed Events

Thamani SHALL expect delayed operational information.

A driver or warehouse operator may report an event after it physically occurred.

Therefore:

```text
occurred_at
!=
received_at
```

and both SHOULD be retained.

---

# 104. Canonical Time

All operational timestamps SHALL preserve unambiguous timezone/offset information.

Cross-border journeys SHALL NOT rely on timezone-naive timestamps.

---

# 105. External References

Each domain object MAY carry external references without adopting the external identifier as the canonical ID.

Examples:

```text
carrier booking number
container number
air waybill number
bill of lading number
customs entry number
seal number
warehouse receipt
customer PO
provider invoice
tracking number
```

Canonical identity and external reference SHALL remain separate.

---

# 106. Internal and External Provider Composition

The orchestration model SHALL treat internal divisions and qualified external providers through compatible capability semantics where practical.

Conceptually:

```text
Required Capability
ROAD_HAULAGE
       │
       ├── Thamani Haulage
       ├── External Carrier A
       └── External Carrier B
```

Commercial policy decides eligibility and selection.

The domain model SHALL not hard-code the winner.

---

# 107. Service Capability Vocabulary

An extensible capability vocabulary SHOULD eventually include concepts such as:

```text
ROAD_HAULAGE
SEA_FREIGHT
AIR_FREIGHT
RAIL_FREIGHT
FREIGHT_FORWARDING
CUSTOMS_BROKERAGE
WAREHOUSING
CROSS_DOCKING
CONSOLIDATION
DECONSOLIDATION
FULFILMENT
COURIER
LAST_MILE
COLD_CHAIN
DANGEROUS_GOODS
PROJECT_LOGISTICS
HEAVY_HAUL
3PL
4PL
CROSS_BORDER
TRACKING
DOCUMENT_HANDLING
CARGO_INSURANCE_ARRANGEMENT
```

Vocabulary governance SHOULD ultimately live in the appropriate shared canonical contract.

---

# 108. Industry Standards Are Adapters and Reference Semantics

The following principle SHALL be non-negotiable:

> **Standardise Baobab/Thamani contracts around durable logistics semantics while supporting established external standards through versioned mappings and adapters.**

Therefore Thamani SHALL neither:

```text
invent every logistics vocabulary itself
```

nor:

```text
copy one external standard wholesale
and make it the internal database schema
```

---

# 109. System-of-Record Decision Deferred

This ADR intentionally establishes the **domain architecture before implementation authority**.

A subsequent ADR SHALL decide whether the operational logistics authority is:

```text
Option A
Baobab Trade extension

Option B
Dedicated Baobab Logistics Engine

Option C
Third-party/headless TMS/logistics engine
behind Baobab contracts

Option D
A composed model using specialised engines
```

No implementation team SHALL infer a decision merely from existing Medusa code.

---

# 110. No Premature Logistics Monolith

Until the system-of-record ADR is accepted, the project SHALL NOT build one giant Thamani backend containing:

```text
TMS
WMS
fleet management
customs
courier
4PL
ERP
billing
identity
CMS
```

inside the digital-estate repository.

The present decision defines business semantics, not permission for uncontrolled implementation.

---

# 111. No Twelve Platforms

Conversely, Thamani SHALL NOT create:

```text
12 divisions
=
12 applications
=
12 databases
=
12 customer identities
=
12 shipment models
```

Shared logistics primitives SHALL be reused.

Specialised operational modules may exist where justified.

---

# 112. Target Conceptual Architecture

```text
                         THAMANI GLOBAL
                               │
            ┌──────────────────┼──────────────────┐
            │                  │                  │
            ▼                  ▼                  ▼
        CUSTOMERS          PARTNERS          OPERATIONS
            │                  │                  │
            └──────────────────┼──────────────────┘
                               ▼
                     THAMANI DIGITAL ESTATE
                               │
                               ▼
                    LOGISTICS SERVICE LAYER
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
          COMMERCIAL       ORCHESTRATION      EXECUTION
              │                │                │
         RFQ / Quote        Shipment         Transport
         Contract           Consignment      Warehouse
         Service Order      Plan / Legs      Customs
              │                │             Delivery
              └────────────────┼────────────────┘
                               │
                               ▼
                       BAOBAB PLATFORM
                               │
          ┌────────────┬───────┼───────┬────────────┐
          ▼            ▼       ▼       ▼            ▼
     Control Plane    IAM     ERP     Pulse         CMS
          │
          └──────────────────────────────┐
                                         │
                                         ▼
                              Logistics Runtime
                             [Decision Deferred]
                                         │
                    ┌────────────────────┼────────────────────┐
                    ▼                    ▼                    ▼
              Thamani Assets       External Providers     Authorities
                    │                    │                    │
             Trucks/Warehouses      Carriers/3PLs       Customs/Ports
             Future vessels         Agents/Brokers      Regulators
```

---

# 113. Operating-Division Architecture

```text
THAMANI GLOBAL
│
├── TRANSPORT EXECUTION
│   ├── Haulage
│   ├── Shipping
│   ├── Courier
│   └── Last Mile
│
├── FREIGHT & BORDER SERVICES
│   ├── Freight Forwarding
│   ├── Customs Brokerage
│   └── Cross-Border Logistics
│
├── LOGISTICS INFRASTRUCTURE
│   └── Warehousing
│
├── SPECIALISED LOGISTICS
│   ├── Cold Chain
│   └── Project Logistics
│
└── OUTSOURCED / ORCHESTRATED LOGISTICS
    ├── 3PL
    └── 4PL
```

This grouping is organisationally useful but SHALL NOT constrain the canonical domain model.

---

# 114. Initial Strategic Operating Posture

The architecture SHALL support an initial posture that is predominantly:

```text
ASSET-LIGHT
+
PARTNER-ENABLED
+
DIGITALLY ORCHESTRATED
```

while permitting selective investment in:

```text
fleet
warehouses
cold-chain equipment
handling equipment
depots
containers
specialist transport assets
and eventually maritime assets
```

where economics justify ownership.

The architecture SHALL not force either strategy.

---

# 115. Migration From the B2C Estate

A formal migration programme SHALL classify existing Thamani assets into:

```text
KEEP
REPURPOSE
ARCHIVE
REMOVE
```

Likely candidates for removal or substantial repurposing include:

```text
product catalogue
consumer merchandising
cart
retail checkout
wishlist
consumer promotions
retail recommendations
Medusa storefront assumptions
B2C-only navigation
```

Likely reusable assets include:

```text
Next.js shell
design system
SEO foundation
accessibility infrastructure
testing
CI/CD
security headers
deployment
observability
shared contract tooling
authentication-ready boundaries
supplier/onboarding mechanics where generalisable
```

No feature SHALL be retained merely because engineering effort has already been spent on it.

---

# 116. Canonical Registry Correction Required

`baobab-platform/shared/contracts/legal-entity/registry.yaml` currently classifies:

```text
THAMANI-GLOBAL
business_model: B2C
```

That classification conflicts with this accepted decision and SHALL be corrected through the Shared governance process.

The replacement SHALL NOT casually hard-code `B2B` if the registry's current model cannot express the actual operating model.

Thamani primarily targets commercial logistics relationships but MAY support services to individuals where commercially appropriate.

The Shared model therefore requires either:

```text
a richer business-model taxonomy
```

or:

```text
removal of operational channel classification
from canonical legal-entity identity
```

through the appropriate Shared ADR/change.

---

# 117. Baobab Trade Entitlement Must Be Re-evaluated

The current Shared registry also declares confirmed Thamani consumption of:

```text
baobab-trade
```

That SHALL be audited.

This ADR does not revoke Baobab Trade.

It establishes that:

> **Baobab Trade is no longer presumed to be Thamani's primary operational engine merely because the former Thamani business was an ecommerce enterprise.**

Entitlements SHALL follow demonstrated capabilities.

---

# 118. Alternatives Considered

## Alternative A — Keep Thamani as B2C Ecommerce and Add Logistics

**Rejected.**

The newly approved business purpose is logistics, shipping and transportation.

Maintaining B2C retail as the primary architecture would make the digital model contradict the enterprise.

---

## Alternative B — Build Twelve Independent Businesses and Applications

**Rejected.**

The divisions share customers, shipments, counterparties, documents, assets, events and financial controls.

Independent platforms would create duplication and fragmented visibility.

---

## Alternative C — Make Baobab Trade/Medusa the Logistics System Automatically

**Rejected.**

Medusa is a commerce engine.

Its fulfilment boundary is useful but does not establish that it should own a logistics enterprise's entire operational domain.

A separate implementation ADR is required.

---

## Alternative D — Build a Dedicated Baobab Logistics Engine Immediately

**Deferred.**

A dedicated engine may prove correct.

However, selecting technology before the domain and system-of-record boundaries are formally mapped risks building another unnecessary platform.

---

## Alternative E — Buy Everything and Become Asset-Heavy Immediately

**Rejected as an architectural requirement.**

Asset ownership is a commercial/capital-allocation decision.

The platform must support owned and contracted capacity simultaneously.

---

## Alternative F — Remain Entirely Asset-Light Forever

**Rejected as an architectural constraint.**

Strategic ownership of fleet, warehouse, cold-chain, project or maritime assets may later become commercially justified.

---

## Alternative G — One Generic `Shipment` Table for Everything

**Rejected.**

International logistics requires meaningful distinction between:

```text
service order
shipment
consignment
movement
leg
booking
equipment
event
document
delivery
```

Collapsing these concepts produces brittle integrations and ambiguous authority.

---

# 119. Positive Consequences

This decision provides:

```text
clear Thamani corporate identity
support for all twelve divisions
asset-light and asset-owning flexibility
multimodal transport support
cross-border extensibility
provider neutrality
standards interoperability
clean Baobab boundaries
future 3PL/4PL support
cold-chain readiness
project-logistics readiness
paperless-document readiness
proper transport-event modelling
reusable customer experience
future external-customer scalability
```

---

# 120. Costs and Negative Consequences

The new model requires substantial repurposing of existing Thamani work.

It introduces genuine logistics complexity including:

```text
multimodal movements
provider qualification
tracking
documents
regulatory integrations
customs
capacity
warehouse custody
cold-chain telemetry
exceptions
claims
rates
contracts
route/corridor modelling
```

These costs are accepted because they arise from the actual business.

Pretending Thamani remains an ecommerce store would hide the complexity rather than remove it.

---

# 121. Required Follow-Up ADRs

The following ADR sequence SHOULD follow this foundational decision:

```text
ADR-THA-0004
Canonical Logistics Counterparty, Carrier,
Service-Provider Qualification and Partner Onboarding

ADR-THA-0005
Shipment, Consignment, Transport Plan,
Movement and Execution Lifecycle

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

ADR-THA-0012
Project Logistics and Heavy/Abnormal Cargo Architecture

ADR-THA-0013
4PL Control Tower, Provider Selection
and Supply-Chain Orchestration Architecture

ADR-THA-0014
Transport Documents, eBL,
Evidence and Records Architecture

ADR-THA-0015
Thamani–Baobab System-of-Record,
Engine and Integration Boundary

ADR-THA-0016
Thamani Digital Estate,
Customer/Partner Portal and Experience Architecture
```

The sequence MAY be adjusted where dependencies justify it, but the engine decision SHOULD follow sufficient domain modelling.

---

# 122. Final Architectural Invariants

The following SHALL remain non-negotiable:

```text
Thamani Global
    = one legal entity unless formally changed

Business Division
    != Legal Entity

Business Division
    != Tenant

Business Division
    != automatically a separate application

Logistics
    != Ecommerce Shipping

Commerce Fulfilment
    != Logistics Execution

Shipment
    != Order

Shipment
    != Consignment

Shipment
    != Provider Booking

Consignment
    != Transport Movement

Transport Leg
    != Trade Lane

Transport Route
    != Market

Transit Country
    != automatically a Thamani Market

Provider
    != Provider Role

Organisation Exists
    != Provider Approved

Asset Ownership
    != Service Responsibility

Custody
    != Ownership

Warehouse Operator
    != Inventory Owner

Carrier Cost
    != Customer Charge

Estimated Cost
    != Actual Cost

Quote
    != Booking

Booking
    != Shipment

Planned Time
    != Estimated Time
    != Actual Time

Sensor Reading
    != Compliance Decision

Tracking Event
    != Customer-visible Status

Exception
    != Claim

Document
    != File

Incoterm
    != Title Transfer

Customs Provider
    != Customs Authority

Digital Estate
    != Logistics System of Record

Baobab Control Plane
    != TMS

Baobab ERP
    != TMS

Baobab Trade
    != automatically Thamani Logistics

AI Prediction
    != Operational Fact

External Standard
    != Internal Database Schema

Thamani internal division
    != automatically preferred provider

Physical event history
    must preserve provenance

Cross-border operation
    must support transit jurisdictions

Regulatory rule
    must be jurisdictional and effective-dated

Canonical identity
    must remain distinct from native/provider identifiers
```

---

# 123. Final Decision

Thamani Global SHALL become a unified shipping, freight, transportation and logistics enterprise capable of providing and orchestrating:

```text
road haulage
maritime shipping
freight forwarding
customs brokerage
warehousing
3PL
courier
last-mile
cold-chain
project logistics
cross-border logistics
4PL
```

through one coherent logistics operating model.

The architecture SHALL be:

```text
MULTIMODAL
PROVIDER-NEUTRAL
ASSET-MODEL-NEUTRAL
COUNTERPARTY-CENTRIC
EVENT-DRIVEN
STANDARDS-AWARE
CROSS-BORDER
MULTI-MARKET
AUDITABLE
INTEROPERABLE
BAOBAB-COMPATIBLE
```

Thamani's digital estate SHALL provide customer, partner and operational experiences but SHALL not silently become the logistics system of record.

The existing Baobab Control Plane, IAM, ERP, Trade, CMS, Pulse and Shared-contract boundaries SHALL be preserved.

A subsequent ADR SHALL determine the implementation authority for logistics only after the domain model has been sufficiently decomposed.

The strategic architecture is therefore:

```text
                         THAMANI GLOBAL
                               │
                   Logistics Services Enterprise
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
    TRANSPORT              LOGISTICS             ORCHESTRATION
        │                      │                      │
   Haulage                Warehousing                 4PL
   Shipping                   3PL                Cross-Border
   Courier               Cold Chain          Freight Forwarding
   Last Mile          Project Logistics          Customs
        │                      │                      │
        └──────────────────────┼──────────────────────┘
                               │
                               ▼
                      SHARED LOGISTICS DOMAIN
                               │
       RFQ → Quote → Service Order → Shipment
                               │
                  Consignment → Plan → Legs
                               │
                 Booking → Execution → Events
                               │
                Delivery → POD → Invoice/Claim
                               │
                               ▼
                         BAOBAB PLATFORM
```

The defining principle is:

> **Thamani shall sell and manage logistics outcomes, not merely transport capacity; divisions shall compose into one service; physical execution may use Thamani or external assets; and the digital architecture shall preserve the distinction between commercial commitment, shipment orchestration, physical movement, regulatory authority, financial consequence and customer visibility.**
