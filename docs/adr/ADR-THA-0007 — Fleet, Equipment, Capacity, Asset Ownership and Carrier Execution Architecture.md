# ADR-THA-0007 — Fleet, Equipment, Capacity, Asset Ownership and Carrier Execution Architecture

**Status:** Accepted — Foundational Thamani Architecture  
**Date:** 2026-09-26  
**Decision Owners:** Nabhold Group Africa / Thamani Global / Baobab Platform Architecture  
**Primary Repository:** `baobab-platform/thamani`  
**Legal Entity:** `THAMANI-GLOBAL`  
**Fleet / Capacity Domain Authority:** Thamani Logistics Resource & Capacity Domain  
**Logistics Execution Authority:** Thamani Logistics Execution Domain  
**Provider Qualification:** ADR-THA-0004  
**Shipment / Movement Architecture:** ADR-THA-0005  
**Commercial Architecture:** ADR-THA-0006  
**Financial Asset Authority:** `baobab-platform/baobab-erp` / iDempiere where applicable  
**Canonical Contract Authority:** `baobab-platform/shared`  
**Platform Context Authority:** `baobab-platform/baobab-cp`  
**Identity Authority:** `baobab-platform/baobab-iam`  
**Intelligence:** `baobab-platform/baobab-pulse` where applicable  
**Operational Runtime:** Deferred to ADR-THA-0015  
**Decision Class:** Fleet / transport means / transport equipment / capacity / asset lifecycle / dispatch / assignment / maintenance / availability / carrier execution

---

# 1. Depends On / Reconciles With

This ADR SHALL be interpreted consistently with:

- ADR-THA-0003 — Thamani Global Integrated Shipping, Transportation and Logistics Enterprise Domain Boundary
- ADR-THA-0004 — Canonical Logistics Counterparty, Carrier, Service-Provider Qualification and Partner Onboarding
- ADR-THA-0005 — Shipment, Consignment, Transport Plan, Movement and Execution Lifecycle Architecture
- ADR-THA-0006 — RFQ, Logistics Quotation, Contract, Rate and Margin Architecture
- ADR-BCP-004 — Context, Market, Geography, Legal-Entity and Digital Estate Resolution Model
- ADR-BCP-011 — Market Participation, Trade Lanes and Cross-Market Trading Model
- ADR-BCP-013 — Canonical Inventory Ownership, Custody, Location and In-Transit Model
- ADR-BCP-014 — Canonical Counterparty Identity, Roles and Relationships Model
- ADR-0022 — Shipping, Logistics, Freight and Transport Provider Abstraction
- ADR-ERP-008 — ERP Financial, Accounting and Multi-Currency Architecture
- ADR-ERP-014 — ERP Master Data Ownership, Synchronisation and Reference Data Architecture
- ADR-ERP-015 — ERP Inventory, Warehouse, Procurement and Supply-Chain Architecture
- applicable Baobab IAM, evidence, mapping, event and security decisions
- applicable contracts in `baobab-platform/shared`.

---

# 2. External Reference Architecture

This ADR is informed by:

```text
UN/CEFACT multimodal transport semantics
ISO 55000 / ISO 55001 asset-management principles
ISO 39001 road-traffic safety management
IMO vessel identification architecture
IATA ULD operational and maintenance requirements
international container/equipment identification practices
mode-specific regulatory and safety regimes
```

ISO 55000:2024 establishes asset management around systematic lifecycle management and value realisation rather than merely maintaining a register of things owned. This is directly relevant to Thamani as it progressively acquires fleet, warehouse and logistics assets.

ISO 39001 remains the published road-traffic safety management standard and focuses on organisational management of road-safety risks and reduction of deaths and serious injuries.

UN/CEFACT explicitly distinguishes **Transport Means**—the device conveying goods—from **Transport Equipment**, which includes cargo-holding or securing equipment such as containers, ULDs and trailers.

These distinctions SHALL become part of the Thamani canonical logistics model.

---

# 3. Executive Decision

Thamani SHALL support three capacity models simultaneously:

```text
ASSET-OWNING
+
ASSET-LIGHT
+
HYBRID
```

The architecture SHALL therefore support transport execution using:

```text
Thamani-owned assets

Thamani-leased assets

Thamani-chartered capacity

Dedicated contracted capacity

Spot-hired capacity

Partner capacity

Subcontracted capacity

Customer-supplied assets/equipment

Provider-owned assets
```

without changing the canonical Shipment, Consignment or Transport Movement models.

The governing principle is:

> **The party owning an asset, the party controlling its capacity, the party operating it, the party maintaining it, the party financially accounting for it, and the party responsible for a particular transport movement may all be different.**

These relationships SHALL be modelled explicitly.

---

# 4. Fundamental Separation

The following concepts SHALL remain distinct:

```text
Asset
    !=
Transport Means

Asset
    !=
Transport Equipment

Transport Means
    !=
Transport Equipment

Asset Owner
    !=
Asset Operator

Asset Owner
    !=
Carrier

Carrier
    !=
Driver

Carrier
    !=
Transport Means

Fleet
    !=
Provider

Fleet
    !=
Legal Entity

Asset Ownership
    !=
Capacity Control

Capacity
    !=
Availability

Availability
    !=
Suitability

Suitability
    !=
Regulatory Eligibility

Regulatory Eligibility
    !=
Serviceability

Serviceability
    !=
Booking

Capacity Reservation
    !=
Movement Assignment

Movement Assignment
    !=
Physical Dispatch

Maintenance State
    !=
Operational State

ERP Fixed Asset
    !=
Canonical Logistics Resource

Vehicle Registration
    !=
Canonical Asset ID

IMO Number
    !=
Canonical Asset ID

Container Number
    !=
Canonical Asset ID

Provider Asset ID
    !=
Canonical Asset ID

Asset Cost
    !=
Logistics Sell Price
```

---

# 5. Transport Resource

Thamani SHALL use the general concept:

```text
TransportResource
```

for a resource capable of contributing to logistics execution.

Conceptually:

```text
TransportResource
├── canonical_resource_id
├── resource_class
├── resource_type
├── owner_id?
├── operator_id?
├── controller_id?
├── provider_id?
├── capacity_source
├── identifiers[]
├── characteristics
├── operational_status
├── maintenance_status?
├── compliance_status?
├── current_location?
├── home_location?
├── effective_from
├── effective_to?
└── external_references[]
```

This is a semantic model.

It SHALL NOT prescribe one persistence implementation.

---

# 6. Resource Classes

Initial high-level resource classes SHOULD include:

```text
TRANSPORT_MEANS

TRANSPORT_EQUIPMENT

HANDLING_EQUIPMENT

FACILITY_RESOURCE

SPECIALIST_EQUIPMENT

HUMAN_EXECUTION_RESOURCE
```

Human resources SHALL nevertheless retain independent identity and employment/contract semantics.

---

# 7. Transport Means

Thamani SHALL align `TransportMeans` with the UN/CEFACT concept:

> the device conveying goods.

Examples:

```text
truck
tractor unit
van
motorcycle
vessel
aircraft
train
locomotive
barge
```

---

# 8. Transport Equipment

Thamani SHALL align `TransportEquipment` with the distinct cargo-holding/securing concept.

Examples include:

```text
container
trailer
semi-trailer
reefer container
tank container
ULD
aircraft pallet/net
swap body
special project frame
```

UN/CEFACT explicitly lists container, ULD and trailer within the transport-equipment family.

---

# 9. Means and Equipment Relationship

Example:

```text
Truck Tractor
      │
      ▼
Semi-Trailer
      │
      ▼
Cargo
```

Therefore:

```text
Truck Tractor
    = Transport Means

Trailer
    = Transport Equipment
```

Likewise:

```text
Vessel
      │
      ▼
Container
      │
      ▼
Cargo
```

and:

```text
Aircraft
      │
      ▼
ULD
      │
      ▼
Cargo
```

---

# 10. Attached Equipment

The model SHALL support:

```text
TransportMeans
     │
     └── attached TransportEquipment[]
```

consistent with UN/CEFACT's transport-means semantics.

---

# 11. Resource Is Not Necessarily Owned

A `TransportResource` MAY represent:

```text
owned
leased
chartered
contracted
partner-controlled
provider-owned
customer-owned
```

capacity.

Canonical operational identity SHALL therefore not imply financial ownership.

---

# 12. Capacity Source

ADR-THA-0003's `CapacitySource` SHALL be formalised.

Initial vocabulary:

```text
OWNED
LEASED
FINANCE_LEASED
SHORT_TERM_RENTAL
CHARTERED
DEDICATED_CONTRACT
SPOT_CONTRACT
PARTNER
SUBCONTRACTED
CUSTOMER_PROVIDED
POOL_SHARED
OTHER
```

---

# 13. Capacity Source Is Effective-Dated

An asset may transition:

```text
Lease
    ↓
Purchase
```

or:

```text
Dedicated Contract
    ↓
Spot Arrangement
```

without requiring a new physical asset identity.

Therefore CapacitySource SHALL be effective-dated.

---

# 14. Ownership

Conceptually:

```text
AssetOwnership
├── resource_id
├── owner_party_id
├── ownership_type
├── ownership_percentage?
├── effective_from
├── effective_to?
├── evidence_reference?
└── external_financial_asset_reference?
```

---

# 15. Ownership Is Not Operational Control

Example:

```text
Finance Company
    │
    │ owns
    ▼
Truck
    ▲
    │ leases
    │
Thamani Global
```

Thamani may control and operate the truck without legally owning it.

---

# 16. Operator

A resource operator answers:

> **Who is responsible for operating this resource during the applicable period or movement?**

Examples:

```text
Thamani Haulage

External Carrier A

Shipping Line B

Airline C
```

---

# 17. Controller

Capacity control answers:

> **Who has the right to allocate or schedule this resource/capacity?**

This MAY differ from operator.

Example:

```text
Shipping Line
    owns/operates vessel

Thamani
    controls contracted container slots
```

---

# 18. Carrier

Carrier remains a counterparty role governed by ADR-THA-0004.

Therefore:

```text
Carrier
    !=
Asset
```

A carrier may control:

```text
1 vehicle
100 vehicles
no owned vehicles
chartered vessels
subcontracted capacity
```

---

# 19. Asset-Light Carrier

The model SHALL permit:

```text
Thamani
   acts as contractual logistics provider
        │
        ▼
External Carrier
        │
        ▼
Provider-owned Truck
```

without falsely representing the truck as a Thamani asset.

---

# 20. Internal Carrier Execution

Likewise:

```text
Thamani Haulage
       │
       ▼
Thamani-controlled Truck
       │
       ▼
Transport Movement
```

SHALL use the same execution model.

---

# 21. Hybrid Execution

A transport plan MAY contain:

```text
Movement 1
Thamani-owned truck

Movement 2
External vessel

Movement 3
Leased truck

Movement 4
Partner last-mile vehicle
```

under one customer logistics service.

---

# 22. Canonical Resource Identity

Every individually tracked resource requiring cross-system identity SHOULD receive a durable Thamani/Baobab resource identity.

Conceptually:

```text
CanonicalResourceID
      │
      ├── vehicle registration
      ├── VIN
      ├── provider fleet ID
      ├── ERP asset reference
      ├── telematics device ID
      └── external regulatory identifiers
```

External identifiers SHALL remain mappings.

---

# 23. External Identifier Is Not Identity

This SHALL be mandatory:

```text
Canonical Resource
    !=
Registration Number
```

because registrations may change.

Likewise:

```text
Canonical Vessel
    !=
Vessel Name
```

because vessel names may change.

---

# 24. Maritime Identity

Where applicable, maritime resources SHOULD preserve IMO identifiers as external regulatory identifiers.

The IMO ship identification scheme assigns a permanent ship number intended to remain unchanged through changes in flag, name, ownership or ship type.

Therefore:

```text
Canonical Vessel ID
      │
      └── IMO Number
```

is preferable to:

```text
Canonical ID = Vessel Name
```

---

# 25. Road Vehicle Identity

A road vehicle MAY retain:

```text
VIN/chassis number
registration number
fleet number
country of registration
vehicle type
gross vehicle mass
```

as appropriate.

UN/CEFACT's current Truck model likewise distinguishes truck identity and vehicle-registration identifiers and supports gross vehicle mass.

---

# 26. Vehicle Registration Can Change

Changing:

```text
registration plate
```

SHALL NOT create a new canonical vehicle where the physical vehicle remains the same.

Identifier history SHOULD be preserved.

---

# 27. Container Identity

Containers SHALL support standards-aligned external identifiers where applicable.

Container identity SHALL remain separate from:

```text
container ownership
container operator
shipment
booking
cargo
```

---

# 28. ULD Identity

Air-cargo Unit Load Devices SHALL be treated as specialised Transport Equipment.

IATA defines a ULD as an aircraft container or aircraft pallet/net combination and treats ULD safety, serviceability, repair, identification and handling as regulated operational concerns.

Therefore:

```text
ULD
    !=
ordinary generic pallet
```

where aviation requirements apply.

---

# 29. Rail Equipment

Rail execution MAY distinguish:

```text
locomotive
wagon
container
rail service
train movement
```

according to the operating model.

A wagon SHOULD not automatically be treated as a locomotive/Transport Means where domain semantics distinguish them.

---

# 30. Inland Waterway Equipment

The architecture SHALL permit:

```text
barge
tow
pusher/tug
container
tank
```

without requiring maritime-vessel assumptions everywhere.

---

# 31. Asset Type

Thamani SHOULD maintain governed resource types.

Examples:

```text
ROAD_TRACTOR
RIGID_TRUCK
VAN
MOTORCYCLE

FLATBED_TRAILER
CURTAINSIDER_TRAILER
BOX_TRAILER
REEFER_TRAILER
TANKER_TRAILER
LOWBED_TRAILER

DRY_CONTAINER
REEFER_CONTAINER
TANK_CONTAINER

VESSEL
BARGE

AIRCRAFT
ULD

LOCOMOTIVE
RAIL_WAGON

FORKLIFT
CRANE
REACH_STACKER
```

The vocabulary SHALL be extensible.

---

# 32. Asset Type Is Not Capability

This SHALL remain:

```text
REEFER_TRAILER
    !=
PHARMACEUTICAL_COLD_CHAIN_CAPABILITY
```

The first describes equipment.

The second describes an approved service capability.

ADR-THA-0004 governs provider qualification.

ADR-THA-0011 will govern specialised cargo eligibility.

---

# 33. Physical Characteristics

Resources MAY expose characteristics including:

```text
length
width
height
tare weight
gross mass
payload
volume
axle configuration
temperature range
power capability
door configuration
tank capacity
lifting capacity
hazard compatibility
```

according to resource type.

---

# 34. Characteristics Are Versioned Where Mutable

If a resource is materially modified:

```text
reefer unit added
capacity modified
body converted
```

the architecture SHOULD preserve effective-dated technical characteristics.

---

# 35. Capacity

Capacity SHALL represent what a resource or contracted service can potentially accommodate.

Capacity MAY be expressed in several dimensions simultaneously.

Examples:

```text
mass
volume
pallet positions
container slots
TEU
passenger-like courier stops where relevant
equipment count
lane slots
tonnage
vehicle count
warehouse positions
```

---

# 36. Capacity Is Multidimensional

This is prohibited:

```text
capacity = 20
```

without unit and dimension.

Preferred:

```text
payload_mass = 28,000 kg

volume = 86 m³

pallet_positions = 34
```

---

# 37. Physical Capacity vs Commercial Capacity

The architecture SHALL distinguish:

```text
Physical Capacity
```

from:

```text
Commercially Available Capacity
```

A vessel may physically have space that Thamani has no right to sell.

---

# 38. Contracted Capacity

Conceptually:

```text
CapacityEntitlement
├── id
├── controlling_party
├── provider_id?
├── service/corridor
├── resource_id?
├── capacity_dimension
├── committed_capacity
├── available_period
├── contract_reference
├── restrictions[]
└── effective_period
```

---

# 39. Asset Capacity vs Service Capacity

Example:

```text
Truck
Payload = 30 tonnes
```

is physical resource capacity.

Whereas:

```text
Carrier Contract
Johannesburg → Cape Town
10 trucks/day
```

is service/network capacity.

They SHALL remain separate.

---

# 40. Capacity Pool

Thamani MAY maintain logical capacity pools.

Example:

```text
Cape Town Refrigerated Fleet
│
├── Truck A
├── Truck B
├── Truck C
└── contracted reefer capacity
```

A pool SHALL not erase individual asset identity where individual assignment matters.

---

# 41. Fleet

A Fleet SHALL represent an operational grouping.

Conceptually:

```text
Fleet
├── id
├── name
├── operator_id
├── home_location?
├── resource_scope[]
├── service_scope[]
├── status
└── effective_period
```

A Fleet SHALL NOT automatically represent:

```text
legal entity
provider
ERP asset class
tenant
```

---

# 42. Fleet Membership

A resource MAY change fleet membership over time.

History SHALL be retained where operational reporting requires it.

---

# 43. Home Base vs Current Location

This SHALL remain:

```text
Home Location
    !=
Current Location
```

A truck based in Johannesburg may currently be in Kampala.

---

# 44. Current Location Is Observed State

Current location SHOULD derive from:

```text
latest trustworthy operational event
telematics
manual operational update
facility gate event
```

with provenance.

---

# 45. Availability

Availability answers:

> **Can this resource/capacity potentially be allocated during the requested period?**

Conceptually:

```text
ResourceAvailability
├── resource_id
├── available_from
├── available_until
├── availability_status
├── location
├── source
└── restrictions[]
```

---

# 46. Availability State

Initial states MAY include:

```text
AVAILABLE
RESERVED
ASSIGNED
IN_USE
MAINTENANCE
OUT_OF_SERVICE
QUARANTINED
UNKNOWN
```

These are operational availability concepts.

---

# 47. Availability Is Not Serviceability

Example:

```text
Truck is physically idle
```

does not mean:

```text
Truck is roadworthy
```

Therefore:

```text
AVAILABLE
    !=
SERVICEABLE
```

---

# 48. Serviceability

Serviceability answers:

> **Is this resource technically fit to perform the intended class of operation?**

It MAY depend on:

```text
inspection
maintenance
defects
technical condition
equipment certification
```

---

# 49. Regulatory Eligibility

A technically serviceable asset may nevertheless be ineligible because:

```text
registration expired
roadworthiness expired
permit missing
inspection expired
insurance unavailable
route restriction
weight restriction
```

Therefore:

```text
SERVICEABLE
    !=
REGULATORILY_ELIGIBLE
```

---

# 50. Suitability

Suitability answers:

> **Is this resource appropriate for this particular cargo and transport requirement?**

Inputs MAY include:

```text
capacity
cargo weight
cargo dimensions
temperature requirements
dangerous-goods classification
road/route restrictions
equipment type
security level
customer requirements
loading method
```

---

# 51. Suitability Is Contextual

A truck MAY be suitable for:

```text
general dry cargo
```

but unsuitable for:

```text
frozen pharmaceuticals
```

without changing its identity.

---

# 52. Readiness

Execution readiness SHALL be a derived condition.

Conceptually:

```text
AVAILABLE
+
SERVICEABLE
+
REGULATORILY ELIGIBLE
+
SUITABLE
+
PROVIDER QUALIFIED
+
DRIVER / CREW READY
+
CAPACITY AVAILABLE
        │
        ▼
READY FOR ASSIGNMENT
```

---

# 53. Readiness Is Reproducible

A derived:

```text
ready = true
```

MAY exist.

The authoritative underlying reasons SHALL remain inspectable.

---

# 54. Capacity Reservation

A capacity reservation SHALL temporarily protect capacity for intended work.

Conceptually:

```text
CapacityReservation
├── id
├── capacity_source
├── resource_id?
├── provider_capacity_id?
├── requirement_reference
├── reserved_quantity
├── unit
├── reserved_from
├── reserved_until
├── status
└── expiry_policy
```

---

# 55. Reservation Is Not Assignment

This SHALL remain:

```text
Capacity Reserved
    !=
Specific Resource Assigned
```

Example:

```text
Reserve:
1 × refrigerated truck

Later assign:
Vehicle TG-REEFER-007
```

---

# 56. Resource Assignment

Conceptually:

```text
ResourceAssignment
├── id
├── movement_id
├── transport_leg_id?
├── resource_id
├── assignment_role
├── assigned_from
├── assigned_until?
├── assigned_by
├── status
├── suitability_snapshot
└── external_references[]
```

---

# 57. Movement Assignment

ADR-THA-0005's Transport Movement SHALL reference the applicable execution resource(s).

Example:

```text
Movement TG-MOV-441
│
├── Tractor TG-TR-008
├── Trailer TG-TRL-031
└── Driver D-992
```

---

# 58. Resource Assignment Is Temporal

One truck may perform:

```text
Movement A
08:00–12:00

Movement B
14:00–19:00
```

The model SHALL support temporal scheduling rather than permanent shipment ownership.

---

# 59. Double Booking

The allocation service SHALL detect incompatible overlapping assignments.

This SHALL normally be prohibited:

```text
Truck TG-008

Movement A
10:00–15:00

Movement B
12:00–18:00
```

unless a domain rule demonstrates the assignments are non-conflicting.

---

# 60. Overbooking

Capacity overbooking MAY be legitimate for abstract/network capacity where commercial policy permits.

It SHALL NOT be silently applied to an individually assigned physical vehicle.

---

# 61. Capacity Expiry

Temporary reservations SHOULD expire or require confirmation according to policy.

Unbounded tentative reservations SHALL not permanently lock fleet capacity.

---

# 62. Assignment Precondition

A resource assignment SHOULD evaluate:

```text
provider qualification
resource availability
serviceability
regulatory validity
cargo suitability
capacity
location
timing
driver/crew readiness
```

before commitment.

---

# 63. Dispatch

Dispatch SHALL represent operational release of an assigned movement for execution.

Therefore:

```text
ASSIGNED
    !=
DISPATCHED
```

A resource can be assigned hours or days before dispatch.

---

# 64. Dispatch Preconditions

Dispatch policy MAY require:

```text
cargo ready
documents ready
vehicle ready
driver ready
route authorised
booking confirmed
customs preconditions satisfied
equipment attached
inspection completed
```

depending on service.

---

# 65. Dispatch Is Not Departure

This SHALL remain:

```text
DISPATCHED
    !=
DEPARTED
```

Departure is a physical Transport Event under ADR-THA-0005.

---

# 66. Driver

A Driver SHALL be an operational person/resource associated with execution.

It SHALL remain distinct from:

```text
IAM user
employee record
carrier organisation
vehicle
```

---

# 67. Driver Identity

Conceptually:

```text
DriverProfile
├── person_reference
├── employer/provider_reference
├── licence_references[]
├── competency_references[]
├── qualification_state
├── current_status
└── effective_period
```

The actual identity authority SHALL follow IAM/canonical-person architecture.

---

# 68. Driver Is Not IAM Account

A driver MAY possess an IAM identity for:

```text
mobile application
POD capture
movement updates
```

but:

```text
DriverProfile
    !=
IAM Subject
```

---

# 69. Driver Eligibility

Driver assignment MAY require:

```text
licence class
professional permit
medical qualification where required
dangerous-goods competency
vehicle/equipment competency
jurisdiction
route
working-time availability
provider relationship
```

according to applicable policy.

---

# 70. Driver Eligibility Is Effective-Dated

An expired credential SHALL affect future assignment according to policy.

Historical trips SHALL retain the qualification context under which they occurred.

---

# 71. Crew

Non-road modes MAY require:

```text
crew
master
pilot
rail operator
equipment operator
```

The generic architecture SHALL permit qualified execution personnel without forcing all roles into `Driver`.

---

# 72. Human Resource Availability

Human resource availability MAY consider:

```text
shift
leave
work assignment
qualification
fatigue/rest policy
jurisdiction requirements
```

without making the logistics runtime an HR payroll system.

---

# 73. Road-Safety Governance

Thamani SHOULD structure road operations so safety policy can align with ISO 39001 principles.

ISO 39001 addresses organisational road-traffic safety management, including policy, objectives, action plans and legal/other requirements relevant to factors an organisation can control or influence.

Therefore:

```text
fastest dispatch
```

SHALL NOT automatically override:

```text
safety
roadworthiness
driver eligibility
route restrictions
```

---

# 74. Maintenance Domain

Thamani SHALL distinguish:

```text
Asset Lifecycle Management
```

from:

```text
Transport Execution
```

Maintenance SHALL affect operational availability but SHALL not be represented merely as a Shipment exception.

---

# 75. Maintenance Programme

Owned/controlled physical assets MAY have:

```text
preventive maintenance
scheduled maintenance
condition-based maintenance
corrective maintenance
statutory inspection
manufacturer-required maintenance
```

according to resource type.

---

# 76. Maintenance Schedule

Conceptually:

```text
MaintenanceSchedule
├── resource_id
├── maintenance_type
├── trigger_type
├── due_date?
├── due_odometer?
├── due_engine_hours?
├── tolerance?
├── provider?
└── policy_reference
```

---

# 77. Maintenance Trigger

Triggers MAY include:

```text
calendar interval
distance
engine hours
flight cycles
operating hours
condition monitoring
inspection result
defect
regulatory requirement
```

---

# 78. Maintenance Event

Conceptually:

```text
MaintenanceEvent
├── resource_id
├── maintenance_type
├── started_at
├── completed_at?
├── provider
├── work_reference
├── findings[]
├── parts/cost_reference?
├── serviceability_result
├── evidence_reference?
└── next_due?
```

---

# 79. Maintenance Is Not Accounting Depreciation

This SHALL remain:

```text
Maintenance Event
    !=
Depreciation Entry
```

One is operational.

The other is financial/accounting.

---

# 80. Defect

A Defect SHALL be independently representable.

Conceptually:

```text
ResourceDefect
├── resource_id
├── defect_type
├── severity
├── detected_at
├── source
├── operational_restriction
├── resolution_state
└── evidence[]
```

---

# 81. Defect May Restrict Rather Than Disable

Example:

```text
Minor defect
    ↓
may operate locally

Major safety defect
    ↓
OUT_OF_SERVICE
```

Policy determines consequences.

---

# 82. Breakdown

A breakdown occurring during movement SHALL connect:

```text
Resource
+
Movement
+
Location
+
Incident/Exception
```

without rewriting resource history.

---

# 83. Breakdown Recovery

Conceptually:

```text
Vehicle Breakdown
        │
        ▼
Movement Exception
        │
        ├── Repair in place
        ├── Replacement vehicle
        ├── Transload cargo
        ├── Tow / recovery
        └── Cancel remaining movement
```

---

# 84. Replacement Resource

A replacement assignment SHALL preserve both:

```text
original resource
replacement resource
```

and the time of substitution.

---

# 85. Asset History

For individually tracked resources, Thamani SHOULD be able to reconstruct:

```text
ownership
control
fleet membership
maintenance
inspections
assignments
movements
incidents
location history where retained
identifier changes
status changes
```

subject to retention policy.

---

# 86. Asset Lifecycle

A physical asset lifecycle MAY resemble:

```text
PROPOSED
   │
   ▼
ACQUIRED / CONTRACTED
   │
   ▼
COMMISSIONING
   │
   ▼
IN_SERVICE
   │
   ├────► SUSPENDED
   │
   ├────► MAINTENANCE
   │
   └────► IN_SERVICE
   │
   ▼
RETIRED
   │
   ▼
DISPOSED / RETURNED
```

This lifecycle SHALL be independent of day-to-day availability.

---

# 87. Operational Status vs Lifecycle Status

An asset may be:

```text
Lifecycle:
IN_SERVICE

Operational:
AVAILABLE
```

or:

```text
Lifecycle:
IN_SERVICE

Operational:
MAINTENANCE
```

Therefore one `status` field is insufficient.

---

# 88. Financial Asset

ERP SHALL remain authoritative for financial fixed-asset consequences where applicable.

iDempiere supports fixed-asset concepts including asset cost, useful life and depreciation, and current accounting functionality also includes Asset as an accounting dimension.

Therefore:

```text
Thamani Logistics Resource
       │
       ▼
ExternalReference / Mapping
       │
       ▼
iDempiere Financial Asset
```

SHALL be preferred to making the ERP asset ID the logistics identity.

---

# 89. ERP Fixed Asset Is Not Operational Fleet Object

ERP may need:

```text
purchase value
depreciation
asset class
useful life
disposal
accounting dimensions
```

while the logistics domain needs:

```text
current location
availability
roadworthiness
assigned movement
capacity
serviceability
```

These domains overlap on identity but not authority.

---

# 90. Financial Ownership vs Operating Control

Example:

```text
ERP:
Thamani owns Truck TG-001

Logistics:
Truck TG-001 leased temporarily
to another operator
and unavailable to Thamani
```

Both may be true simultaneously.

---

# 91. Asset Acquisition

The acquisition process MAY originate in ERP/procurement.

Once a physical asset becomes operationally relevant:

```text
ERP Acquisition
      │
      ▼
Financial Asset
      │
      ▼
Canonical Mapping
      │
      ▼
Logistics Resource Commissioning
```

SHALL be a valid flow.

---

# 92. Asset Disposal

Disposal in ERP SHALL trigger appropriate logistics lifecycle reconciliation.

A financially disposed vehicle SHALL not remain indefinitely:

```text
AVAILABLE
```

for dispatch.

---

# 93. Asset Cost Is Not Commercial Rate

This SHALL remain mandatory:

```text
Truck Book Value
    !=
Road Freight Sell Rate
```

Likewise:

```text
Depreciation Expense
    !=
Customer Freight Charge
```

Commercial pricing is governed by ADR-THA-0006.

---

# 94. Internal Cost Allocation

Commercial pricing MAY consume governed internal cost projections such as:

```text
fuel
maintenance
driver
lease cost
depreciation allocation
insurance
tolls
```

where pricing policy requires them.

The commercial domain SHALL not independently post those costs to the ledger.

---

# 95. Leased Resource

A leased resource SHALL preserve:

```text
lessor
lessee/control party
lease agreement
effective period
asset identity
operating responsibility
maintenance responsibility
insurance responsibility
```

where required.

---

# 96. Charter

Maritime and aviation capacity MAY use charter arrangements.

The architecture SHALL permit:

```text
resource-specific charter
capacity-only charter
time-based capacity
voyage/service-based capacity
```

without assuming Thamani owns the vessel/aircraft.

---

# 97. Charter Is Not Ownership

This SHALL remain:

```text
Thamani chartered vessel capacity
    !=
Thamani owns vessel
```

---

# 98. Contracted External Capacity

A provider contract MAY provide capacity without identifying individual resources until execution.

Example:

```text
Contract:
20 reefer loads/week
Cape Town ↔ Johannesburg
```

Specific trucks may be assigned later.

---

# 99. Capacity Requirement

A Transport Plan SHOULD be able to express:

```text
CapacityRequirement
├── resource_class
├── equipment_type?
├── quantity
├── payload
├── volume
├── special requirements
├── origin
├── destination
├── available_from
├── required_until
└── restrictions[]
```

without prematurely selecting a specific asset.

---

# 100. Requirement → Reservation → Assignment

Preferred sequence:

```text
Transport Plan
      │
      ▼
Capacity Requirement
      │
      ▼
Capacity Search
      │
      ▼
Capacity Reservation
      │
      ▼
Specific Resource Assignment
      │
      ▼
Dispatch
      │
      ▼
Movement
```

Not every workflow requires every step.

---

# 101. Resource Search

Resource search MAY consider:

```text
resource type
capacity
current/prospective location
availability
provider
qualification
maintenance
compliance
cargo compatibility
route eligibility
service level
cost
```

---

# 102. Resource Search Is Not Final Selection

The candidate set SHALL distinguish:

```text
candidate
eligible
reserved
assigned
```

states.

---

# 103. Provider-Owned Asset Verification

For external provider-owned resources, Thamani MAY not maintain the same maintenance depth as for owned assets.

The system SHOULD support graduated governance:

```text
IDENTITY_ONLY
BASIC_COMPLIANCE
EXECUTION_ELIGIBILITY
DETAILED_TELEMATICS
FULL_FLEET_MANAGEMENT
```

depending on relationship.

---

# 104. Do Not Rebuild Provider Fleet Systems

Thamani SHALL NOT require mirroring every external carrier's:

```text
maintenance records
workshop records
fuel transactions
tyre inventory
full telematics history
```

unless Thamani genuinely needs that data.

---

# 105. External Resource Projection

For third-party assets, Thamani MAY retain only:

```text
provider
asset/reference identity
resource type
regulatory evidence
assignment
execution events
serviceability declaration
```

as required.

---

# 106. Evidence Depth Is Risk-Based

A high-risk:

```text
dangerous-goods tanker
```

may require deeper verification than:

```text
ordinary document courier
```

according to policy.

---

# 107. Insurance

Insurance evidence MAY be associated with:

```text
provider
asset
fleet
cargo
movement
```

depending on policy.

The system SHALL not assume organisation-level insurance covers every asset and operation.

---

# 108. Asset Insurance vs Carrier Liability

These SHALL remain distinct:

```text
Vehicle Insurance
    !=
Carrier Liability Insurance

Carrier Liability Insurance
    !=
Cargo Insurance
```

---

# 109. Incident

Operational incidents SHALL be associated explicitly with affected resources and movements.

Conceptually:

```text
OperationalIncident
├── id
├── resource_ids[]
├── movement_id?
├── provider_id?
├── incident_type
├── occurred_at
├── location
├── severity
├── injuries/damage classification?
├── authorities_notified?
├── evidence[]
└── status
```

Detailed claims architecture belongs to ADR-THA-0010.

---

# 110. Accident Does Not Automatically Mean Claim

This SHALL remain:

```text
Incident
    !=
Claim
```

although a claim MAY result.

---

# 111. Cargo Securement

Resource suitability SHALL support cargo-securement requirements.

Regulatory specifics are jurisdiction-dependent, but transport regulations commonly impose requirements preventing cargo from shifting or falling during movement; for example, US FMCSA rules explicitly establish performance requirements for commercial-vehicle cargo securement.

Thamani SHALL model such requirements through applicable policies rather than a universal US-specific rule set.

---

# 112. Load Plan

Where necessary, road, air, maritime and project logistics MAY require explicit:

```text
LoadPlan
```

covering:

```text
cargo placement
weight distribution
equipment assignment
securement
segregation
loading sequence
```

The exact implementation depends on mode.

---

# 113. Payload Constraint

Assignment SHALL prevent:

```text
cargo weight
>
approved resource payload
```

unless the domain explicitly represents specialised regulated arrangements.

---

# 114. Dimensional Constraint

Resource suitability MAY consider:

```text
length
width
height
door aperture
container dimensions
clearance
route constraints
```

especially for project logistics.

---

# 115. Cold-Chain Resource

A cold-chain resource MAY expose:

```text
temperature operating range
temperature set point capability
power source
backup capability
sensor support
calibration status
```

Detailed cold-chain policy belongs to ADR-THA-0011.

---

# 116. Temperature Capability Is Not Actual Condition

This SHALL remain:

```text
Reefer can maintain 2–8°C
    !=
Cargo actually remained 2–8°C
```

Actual conditions come from execution telemetry/events.

---

# 117. Dangerous-Goods Equipment

Special cargo MAY restrict allowed:

```text
vehicle
container
tank
trailer
aircraft position
facility
```

according to applicable law and policy.

The resource model SHALL support such eligibility rules.

---

# 118. Heavy / Project Logistics

Project-logistics resources MAY include:

```text
lowbed trailer
modular trailer
SPMT
crane
escort vehicle
lifting equipment
special frame
```

and may require coordinated combinations rather than one transport asset.

---

# 119. Composite Resource Configuration

Thamani SHALL support configurations such as:

```text
Tractor
+
Lowbed Trailer
+
Escort Vehicle
+
Crane
```

as one project execution arrangement while preserving each resource identity.

---

# 120. Resource Combination Validation

Not every tractor/trailer/equipment combination is compatible.

Compatibility SHALL be validated where operationally important.

---

# 121. ULD Serviceability

Because IATA treats ULDs as aircraft parts subject to technical, handling, serviceability, maintenance and continuing-airworthiness requirements, Thamani SHALL not model air ULDs as unrestricted generic containers.

---

# 122. Maritime Vessel State

A Vessel projection MAY include:

```text
IMO identifier
flag
vessel type
operator
capacity characteristics
service references
qualification/compliance references
```

where necessary.

Thamani SHALL not duplicate an entire maritime fleet registry without operational need.

---

# 123. Vessel Name Is Presentation Data

Because IMO identifiers are intended to survive changes in vessel name and ownership, vessel names SHALL not serve as durable canonical keys.

---

# 124. Telemetry

Resources MAY emit telemetry such as:

```text
position
speed
heading
fuel level
battery state
temperature
door state
engine status
odometer
engine hours
fault codes
```

depending on resource.

---

# 125. Telemetry Is Observation

This SHALL remain:

```text
Telemetry Observation
    !=
Business Decision
```

For example:

```text
engine fault code
```

may trigger:

```text
maintenance assessment
```

but does not itself constitute:

```text
asset condemned
```

---

# 126. Telemetry Source

Each material telemetry observation SHOULD preserve:

```text
device
resource
source provider
observed_at
received_at
quality/confidence where relevant
```

---

# 127. Device Identity

A telematics device SHALL remain separate from the physical resource.

Example:

```text
Truck
    │
    └── Telematics Device
```

The device may be replaced without changing vehicle identity.

---

# 128. IoT Binding

Conceptually:

```text
TelemetryDeviceAssignment
├── device_id
├── resource_id
├── installed_at
├── removed_at?
└── source
```

---

# 129. Location Privacy

Detailed resource location MAY be commercially and security sensitive.

Access SHALL be restricted by:

```text
role
movement relationship
provider relationship
customer visibility policy
security classification
```

---

# 130. Driver Location Privacy

Thamani SHALL not collect or expose driver/person location beyond what is necessary and lawful for operational purposes.

---

# 131. Fuel / Energy

Thamani MAY record operational energy consumption including:

```text
diesel
petrol
electricity
LNG
other fuels/energy
```

where operational or sustainability needs justify it.

---

# 132. Fuel Transaction Is Not Financial Posting

Operational fuel usage MAY be recorded in logistics/fleet systems.

ERP remains authoritative for corresponding accounting consequences.

---

# 133. Odometer / Utilisation Meter

Resources MAY expose:

```text
odometer
engine hours
operating hours
flight cycles
other usage metrics
```

as appropriate.

These MAY drive maintenance policy.

---

# 134. Meter Reading Provenance

A meter reading SHOULD preserve its source:

```text
telematics
manual
workshop
provider API
inspection
```

---

# 135. Utilisation

Thamani SHOULD distinguish:

```text
AVAILABLE TIME
ASSIGNED TIME
ACTIVE MOVEMENT TIME
IDLE TIME
MAINTENANCE TIME
```

where useful.

---

# 136. Fleet Utilisation KPIs

Potential metrics include:

```text
asset utilisation
loaded kilometres
empty kilometres
payload utilisation
capacity utilisation
idle time
maintenance downtime
on-time availability
breakdown frequency
cost per kilometre
cost per tonne-km
```

Exact KPI definitions SHALL be versioned.

---

# 137. Empty Movement

Repositioning without customer cargo SHALL be representable.

Examples:

```text
empty truck repositioning
empty container return
ULD repositioning
vessel repositioning
```

The system SHALL not create fake customer cargo to model this.

---

# 138. Deadhead / Empty-Mile Economics

Commercial intelligence MAY analyse:

```text
loaded distance
vs
empty distance
```

to improve network economics.

It SHALL not change historical execution events.

---

# 139. Capacity Forecast

Thamani MAY maintain future capacity projections.

Inputs MAY include:

```text
known fleet
maintenance plans
bookings
contracted provider capacity
historical demand
seasonality
expected repositioning
```

---

# 140. Capacity Forecast Is Not Capacity Commitment

This SHALL remain:

```text
Forecast Capacity
    !=
Guaranteed Capacity
```

---

# 141. Pulse Boundary

Baobab Pulse MAY provide:

```text
maintenance risk
capacity forecasting
utilisation insights
route optimisation
breakdown prediction
fuel anomaly detection
provider capacity signals
```

Such intelligence SHALL remain advisory unless a governed automation rule consumes it.

---

# 142. AI Maintenance Prediction

This SHALL remain:

```text
Predictive maintenance alert
    !=
Confirmed defect
```

until appropriately assessed.

---

# 143. Route Optimisation

A route optimisation system MAY recommend:

```text
resource
route
departure time
load consolidation
```

but mandatory:

```text
regulatory
cargo
qualification
safety
```

constraints SHALL remain authoritative.

---

# 144. Dispatch Optimisation

Automatic dispatch MAY be introduced only if it respects:

```text
provider qualification
resource eligibility
driver eligibility
maintenance state
customer constraints
cargo requirements
capacity
regulatory policy
```

---

# 145. Internal vs External Capacity Selection

The candidate capacity set MAY conceptually be:

```text
Required Capability
       │
       ├── Thamani-owned Fleet
       ├── Thamani-leased Fleet
       ├── Dedicated Provider Capacity
       ├── Spot Provider Capacity
       └── Partner Capacity
```

The system SHALL not structurally privilege one category.

---

# 146. Commercial Selection

ADR-THA-0006 MAY evaluate:

```text
cost
margin
```

while this ADR supplies:

```text
availability
capacity
suitability
resource constraints
```

The two SHALL remain separate responsibilities.

---

# 147. Lowest Cost Is Not Automatically Best Asset

Provider/resource selection MAY consider:

```text
cost
availability
location
serviceability
safety
qualification
capacity
customer SLA
reliability
utilisation
route suitability
```

---

# 148. Capacity Assignment Snapshot

When a movement is committed, the assignment SHOULD preserve sufficient context to explain why the resource was eligible at that time.

Possible snapshot:

```text
resource
provider
qualification ref
capacity
serviceability
regulatory evidence
assignment time
```

---

# 149. Later Expiry Does Not Rewrite History

If a permit expires after a completed movement:

```text
historical movement
```

SHALL not become retrospectively represented as if no valid assignment ever existed.

Historical effective dates matter.

---

# 150. Active Movement and Credential Expiry

If a mandatory credential expires during an active journey, policy SHALL determine:

```text
continue to safe completion
stop at safe point
substitute resource
regulatory escalation
```

rather than applying a universal rule.

---

# 151. Resource Event Architecture

Events MAY include:

```text
resource.registered
resource.commissioned
resource.available
resource.reserved
resource.assigned
resource.dispatched
resource.released

resource.maintenance.due
resource.maintenance.started
resource.maintenance.completed

resource.defect.reported
resource.out_of_service
resource.returned_to_service

resource.location.observed
resource.telemetry.received

resource.retired
resource.disposed
```

Canonical event naming SHALL ultimately be governed by Shared contracts.

---

# 152. Capacity Events

Potential events:

```text
capacity.published
capacity.reserved
capacity.released
capacity.exhausted
capacity.restored
```

depending on implementation.

---

# 153. Assignment Event

A Resource Assignment SHALL correlate with the Transport Movement under ADR-THA-0005.

---

# 154. Event Idempotency

Duplicate provider or telematics events SHALL not create duplicate:

```text
resource assignments
maintenance records
capacity reductions
```

without valid semantics.

---

# 155. Out-of-Order Events

Resource state processing SHALL tolerate delayed telemetry and provider updates.

`observed_at` and `received_at` SHALL remain distinct where appropriate.

---

# 156. Resource Concurrency

Assignment SHALL use appropriate concurrency controls.

Example:

```text
Dispatcher A
selects Truck 007

Dispatcher B
selects Truck 007
```

Only compatible assignments SHALL be committed.

---

# 157. Optimistic Reservation

The platform MAY use temporary reservation/lease semantics while dispatchers complete a scheduling workflow.

Reservation expiry SHALL be explicit.

---

# 158. Control Plane Boundary

Control Plane SHALL continue to own/resolve:

```text
tenant
legal entity
canonical organisation
market
provider capability binding
platform context
```

It SHALL NOT become the fleet scheduling runtime.

---

# 159. ERP Boundary

ERP SHALL own financial consequences including:

```text
fixed asset accounting
asset acquisition
depreciation
financial disposal
lease/payment accounting where configured
maintenance supplier invoices
fuel/operating costs
GL consequences
```

The Thamani fleet domain SHALL own operational fleet state.

---

# 160. No Shadow Fixed-Asset Ledger

This SHALL be prohibited:

```text
Thamani Fleet Database
reimplementing
asset depreciation ledger
```

when ERP is authoritative.

---

# 161. ERP Does Not Own Dispatch

Likewise, the presence of an ERP Asset record SHALL NOT make iDempiere the automatic authority for:

```text
current vehicle assignment
live capacity
driver dispatch
telemetry
roadworthiness projection
```

---

# 162. iDempiere Mapping

Conceptually:

```text
Thamani Resource
       │
       ▼
Canonical / External Mapping
       │
       ├── iDempiere A_Asset
       ├── Telematics Resource
       ├── Provider Resource ID
       └── Regulatory Identifier
```

iDempiere's fixed-asset facilities support asset cost, depreciation and useful-life concepts, making it suitable for the financial projection without requiring it to become the operational fleet engine.

---

# 163. Trade Boundary

Baobab Trade MAY consume:

```text
shipping availability
logistics capability
estimated service
```

where commerce needs those facts.

It SHALL NOT become the Thamani fleet registry.

---

# 164. IAM Boundary

IAM SHALL authenticate:

```text
dispatchers
drivers
fleet managers
maintenance personnel
provider users
```

where applicable.

IAM SHALL not own:

```text
vehicle
container
vessel
capacity
maintenance status
```

---

# 165. CMS Boundary

CMS SHALL not be used as the transport asset register.

---

# 166. Shared Contract Namespace

Canonical cross-repository contracts SHOULD eventually live under a namespace such as:

```text
baobab-platform/shared/
└── contracts/
    └── logistics-resource/
        └── v1/
```

Potential schemas:

```text
TransportResourceReference
TransportMeansReference
TransportEquipmentReference
CapacitySource
ResourceCharacteristics
ResourceAvailability
ResourceServiceability
CapacityRequirement
CapacityReservation
ResourceAssignment
MaintenanceStatus
ResourceExternalIdentifier
```

---

# 167. Shared Is Not Fleet Runtime

`shared` SHALL govern schemas and vocabulary.

It SHALL not maintain live resource availability.

---

# 168. Operational Runtime Decision Remains Deferred

This ADR does not decide whether fleet/capacity management executes within:

```text
dedicated Baobab Logistics engine
specialised TMS
specialised fleet-management system
composed logistics platform
```

That implementation authority remains subject to ADR-THA-0015.

---

# 169. Specialised Fleet System Is Permitted

Thamani MAY later integrate a specialist:

```text
fleet management
telematics
maintenance
dispatch
```

system.

Such a system SHALL integrate through canonical contracts.

It SHALL not become the universal Baobab organisation, shipment or financial authority.

---

# 170. No Premature Fleet Monolith

The Thamani digital-estate repository SHALL NOT evolve into:

```text
frontend
+
TMS
+
fleet-management system
+
telematics platform
+
maintenance ERP
+
accounting system
```

inside one application merely for convenience.

---

# 171. No Need to Own Assets Before Modelling Capacity

The domain architecture SHALL function even when:

```text
owned fleet = 0
```

This is crucial to the initial asset-light business posture.

---

# 172. Future Asset Ownership Requires No Domain Rewrite

If Thamani later purchases:

```text
10 trucks
2 warehouses
50 containers
cold-chain equipment
```

the same Shipment/Movement/Capacity model SHALL continue to function.

---

# 173. Maritime Expansion Requires No Ownership Shortcut

Similarly, if Thamani eventually acquires or operates vessels:

```text
Shipping Division
```

SHALL extend its resource projections rather than redefining what a Shipment or Consignment is.

---

# 174. Road Reference Example

A customer requires:

```text
28 tonnes
Johannesburg → Lusaka
curtainsider
```

The resolution MAY be:

```text
Transport Requirement
      │
      ▼
Capacity Search
      │
      ├── Thamani Truck A
      │      AVAILABLE
      │      capacity 30t
      │      but permit unsuitable
      │
      ├── Thamani Truck B
      │      MAINTENANCE
      │
      └── Provider C
             qualified
             32t capacity
             compliant route
             available
             │
             ▼
       Capacity Reserved
             │
             ▼
       Vehicle Assigned
             │
             ▼
          Dispatch
```

Lowest ownership preference does not override eligibility.

---

# 175. Reefer Example

A pharmaceutical customer requires:

```text
2–8°C
Cape Town → Johannesburg
```

A resource may satisfy:

```text
payload
volume
availability
```

but fail:

```text
temperature qualification
calibration
provider cold-chain qualification
```

and SHALL therefore remain ineligible.

---

# 176. Maritime Example

Thamani may sell:

```text
1 × 40HC
Mombasa → Durban
```

while execution uses:

```text
External Shipping Line
        │
        ▼
Contracted Slot Capacity
        │
        ▼
Container ABCU...
        │
        ▼
Vessel IMO...
```

Thamani need own neither container nor vessel.

---

# 177. Air Example

An air-freight execution MAY use:

```text
Airline
   │
   ▼
Flight / Aircraft
   │
   ▼
ULD
   │
   ▼
Consignment
```

ULD eligibility/serviceability SHALL remain independently governable because aviation ULDs are safety-significant equipment.

---

# 178. 4PL Example

Thamani 4PL may have:

```text
no physical asset
```

in a movement while retaining orchestration responsibility.

Example:

```text
Thamani 4PL
     │
     ├── Carrier A truck
     ├── Warehouse B
     ├── Shipping Line C vessel
     └── Last Mile Provider D
```

The domain SHALL therefore never require:

```text
Movement has Thamani-owned asset
```

---

# 179. Utilisation Does Not Apply Universally

Metrics such as:

```text
vehicle utilisation
```

make sense for owned/controlled physical assets.

They SHALL not be forced onto:

```text
abstract charter capacity
spot carrier quote
4PL provider relationship
```

where other measures are appropriate.

---

# 180. Sustainability Data

The resource model SHOULD preserve sufficient physical execution data to support future transport-emissions accounting.

Possible inputs include:

```text
mode
resource type
distance
payload
fuel/energy
capacity utilisation
```

Detailed emissions methodology remains outside this ADR.

---

# 181. Security

Fleet/resource security SHOULD consider:

```text
resource theft
cargo theft
telematics compromise
location-data disclosure
credential abuse
unauthorised dispatch
false vehicle substitution
device tampering
```

---

# 182. Unauthorised Resource Substitution

This SHALL be prohibited:

```text
Movement assigned:
Truck A

Provider silently executes:
Truck B
```

where resource identity affects:

```text
qualification
insurance
safety
cargo compatibility
customer terms
regulation
```

---

# 183. Substitution Workflow

Valid substitution SHOULD follow:

```text
Original Resource
      │
      ▼
Substitution Request / Event
      │
      ▼
Eligibility Validation
      │
      ▼
Replacement Resource
      │
      ▼
Assignment Update
      │
      ▼
Audit + Customer visibility if required
```

---

# 184. Audit

Material actions SHALL be auditable.

At minimum:

```text
resource registered
resource identity changed
ownership changed
capacity source changed
resource commissioned
availability changed
resource reserved
resource assigned
resource substituted
maintenance started/completed
defect raised/closed
serviceability override
compliance override
resource retired/disposed
```

---

# 185. Manual Override

A manual asset/readiness override SHOULD capture:

```text
actor
reason
old state
new state
scope
duration
approval
evidence
```

where material.

---

# 186. Safety Override

Mandatory legal or safety requirements SHALL NOT be bypassable merely by commercial approval.

---

# 187. Data Retention

Resource records MAY need retention for:

```text
accounting
maintenance
regulatory
insurance
claims
safety
contractual
audit
```

reasons.

Operational history SHALL not be deleted merely because the asset is disposed.

---

# 188. Asset Disposal Does Not Delete Movement History

This SHALL remain:

```text
Vehicle sold
    !=
Delete previous movements
```

Historical shipment/resource associations SHALL remain referentially stable.

---

# 189. Alternatives Considered

## Alternative A — Treat Every Resource as an ERP Fixed Asset

**Rejected.**

External, leased, contracted and partner resources are not necessarily Thamani financial assets.

---

## Alternative B — Treat Every Resource as a Provider Record

**Rejected.**

Organisation identity and physical resource identity are different.

---

## Alternative C — Track Only Owned Fleet

**Rejected.**

Thamani's initial operating model must support asset-light logistics.

---

## Alternative D — Do Not Track Third-Party Assets

**Rejected as universal policy.**

Some regulated/high-risk executions require knowing the actual transport means/equipment.

---

## Alternative E — Make Vehicle Registration the Primary Key

**Rejected.**

Registrations can change and vary by jurisdiction.

---

## Alternative F — One `AssetStatus` Field

**Rejected.**

Lifecycle, availability, serviceability, maintenance and compliance states are independent.

---

## Alternative G — Availability Means Qualified

**Rejected.**

An idle vehicle may still be unsafe, unsuitable or legally ineligible.

---

## Alternative H — Booking Equals Resource Assignment

**Rejected.**

Capacity may be booked before a physical resource is known.

---

## Alternative I — Assignment Equals Dispatch

**Rejected.**

Planning and actual execution are temporally distinct.

---

## Alternative J — Internal Fleet Always Preferred

**Rejected.**

Commercial and operational selection must remain policy-driven.

---

## Alternative K — Thamani Must Own Vessels to Have a Shipping Division

**Rejected.**

Shipping services may initially use chartered and third-party carrier capacity.

---

## Alternative L — Build a Full Fleet-Management System Immediately

**Rejected.**

The ADR defines domain boundaries; technology selection remains later.

---

# 190. Positive Consequences

This decision provides:

```text
asset-light operations
owned-fleet operations
hybrid capacity
provider-neutral dispatch
multimodal support
fleet expansion without redesign
resource identity
capacity planning
resource reservations
safe assignment
maintenance separation
ERP fixed-asset separation
external-provider compatibility
road/sea/air/rail support
cold-chain extensibility
project-logistics extensibility
4PL compatibility
auditable substitutions
capacity analytics
future telematics integration
```

---

# 191. Costs and Negative Consequences

The architecture requires more than:

```text
vehicle
---------
id
registration
available
```

It introduces:

```text
resource identity
ownership
capacity control
resource characteristics
availability
serviceability
qualification
maintenance
reservations
assignment
dispatch
telemetry
external mappings
```

This complexity is accepted because it represents the real distinction between owning transport assets and operating a multimodal logistics network.

---

# 192. Implementation Gates

Implementation SHOULD proceed through controlled gates.

## THA-FLEET-00 — Current-State Audit

Inspect:

```text
Thamani code
Baobab ERP fixed-asset capabilities
Trade logistics provider abstractions
Shared contracts
Control Plane providers
existing transport integrations
```

Classify:

```text
REUSE
EXTEND
REMAP
SUPERSEDE
REMOVE
```

---

## THA-FLEET-01 — Resource Vocabulary

Define canonical:

```text
TransportResource
TransportMeans
TransportEquipment
CapacitySource
ResourceType
```

---

## THA-FLEET-02 — Resource Identity

Implement:

```text
canonical resource ID
external identifiers
identifier history
provider resource mapping
```

---

## THA-FLEET-03 — Ownership and Control

Implement:

```text
owner
operator
controller
capacity source
effective periods
```

---

## THA-FLEET-04 — Resource Characteristics

Implement mode-neutral characteristics and extensible type-specific attributes.

---

## THA-FLEET-05 — Availability

Implement:

```text
availability
reservation
assignment
release
```

with concurrency protection.

---

## THA-FLEET-06 — Suitability / Readiness

Resolve:

```text
capacity
serviceability
qualification
compliance
cargo suitability
```

before assignment.

---

## THA-FLEET-07 — Road Reference Slice

Implement:

```text
tractor
trailer
driver
registration
payload
assignment
dispatch
```

as the first operational slice.

---

## THA-FLEET-08 — Maintenance Boundary

Implement operational:

```text
maintenance schedule
defect
out-of-service
return-to-service
```

without duplicating ERP accounting.

---

## THA-FLEET-09 — External Carrier Assets

Support provider-owned vehicles/resources using lighter projections.

---

## THA-FLEET-10 — Telematics

Add:

```text
device mapping
location
odometer
telemetry
event provenance
```

where justified.

---

## THA-FLEET-11 — Container / Maritime Equipment

Add:

```text
container
vessel reference
IMO mapping
chartered capacity
```

without vessel-ownership assumptions.

---

## THA-FLEET-12 — Air Equipment

Add:

```text
aircraft reference
ULD
ULD serviceability
air-capacity projection
```

where Thamani begins air operations.

---

## THA-FLEET-13 — Rail / Inland Waterway

Extend canonical resource model without redesigning the core.

---

## THA-FLEET-14 — Capacity Planning

Implement:

```text
capacity pools
future reservations
forecast projections
utilisation
```

---

## THA-FLEET-15 — ERP Asset Integration

Map applicable owned resources to iDempiere financial asset representations.

---

## THA-FLEET-16 — Production Hardening

Verify:

```text
double-booking prevention
resource substitution
provider isolation
identity history
maintenance blocking
qualification expiry
telemetry security
offline events
resource disposal
ERP reconciliation
audit
backup/recovery
performance
```

---

# 193. Required Follow-Up ADRs

This decision directly informs:

```text
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

ADR-THA-0015
Thamani–Baobab System-of-Record,
Engine and Integration Boundary
```

---

# 194. Final Architectural Invariants

The following SHALL remain non-negotiable:

```text
Transport Means
    != Transport Equipment

Asset
    != Provider

Asset
    != Carrier

Carrier
    != Driver

Asset Owner
    != Asset Operator

Asset Owner
    != Capacity Controller

Asset Ownership
    != Capacity Availability

Capacity
    != Availability

Availability
    != Serviceability

Serviceability
    != Regulatory Eligibility

Regulatory Eligibility
    != Cargo Suitability

Suitability
    != Resource Assignment

Capacity Reservation
    != Physical Resource Assignment

Resource Assignment
    != Dispatch

Dispatch
    != Departure

Fleet
    != Legal Entity

Fleet
    != Provider

Lifecycle State
    != Operational Availability

Maintenance State
    != Movement State

Defect
    != Breakdown

Breakdown
    != Claim

Resource Identity
    != Registration Number

Resource Identity
    != Provider Asset ID

Vessel Identity
    != Vessel Name

Canonical Resource ID
    != IMO Number

Canonical Resource ID
    != VIN

Canonical Resource ID
    != Container Number

ERP Fixed Asset
    != Logistics Resource

Asset Book Value
    != Freight Price

Depreciation
    != Customer Charge

Maintenance
    != Accounting Depreciation

Telemetry
    != Operational Decision

Telemetry Device
    != Physical Asset

Forecast Capacity
    != Guaranteed Capacity

Physical Capacity
    != Commercially Available Capacity

Contracted Capacity
    != Asset Ownership

Chartered Capacity
    != Asset Ownership

Provider-owned Resource
    != Thamani Asset

Customer-provided Resource
    != Thamani Asset

Internal Resource
    != Automatically Preferred Resource

Qualified Provider
    != Qualified Resource automatically

Qualified Resource
    != Available Resource automatically

Available Resource
    != Safe Resource automatically

Resource substitution
    must be validated where material

Mandatory safety constraints
    must fail closed

Historical assignments
    must preserve resource identity

External identifiers
    must preserve scheme and provenance

Resource state
    must be effective-dated where temporal

Operational asset history
    must survive asset disposal
```

---

# 195. Final Decision

Thamani Global SHALL establish a provider-neutral, ownership-neutral and mode-neutral resource architecture built around:

```text
                           LOGISTICS REQUIREMENT
                                   │
                                   ▼
                          CAPACITY REQUIREMENT
                                   │
                    ┌──────────────┼──────────────┐
                    ▼              ▼              ▼
                OWNED          CONTRACTED       PARTNER
               CAPACITY         CAPACITY        CAPACITY
                    │              │              │
                    └──────────────┼──────────────┘
                                   ▼
                            CAPACITY SEARCH
                                   │
                 ┌─────────────────┼─────────────────┐
                 ▼                 ▼                 ▼
             Available         Suitable          Qualified
                 │                 │                 │
                 └─────────────────┼─────────────────┘
                                   ▼
                           CAPACITY RESERVATION
                                   │
                                   ▼
                         RESOURCE ASSIGNMENT
                                   │
                  ┌────────────────┼────────────────┐
                  ▼                ▼                ▼
            Transport Means  Transport Equipment  Crew
                  │                │                │
                  └────────────────┼────────────────┘
                                   ▼
                               DISPATCH
                                   │
                                   ▼
                         TRANSPORT MOVEMENT
                                   │
                                   ▼
                         OPERATIONAL EVENTS
                                   │
                   ┌───────────────┼───────────────┐
                   ▼               ▼               ▼
               Utilisation     Maintenance      Exceptions
                   │               │               │
                   └───────────────┼───────────────┘
                                   ▼
                             RESOURCE HISTORY
```

The same architecture SHALL support:

```text
one Thamani-owned truck

one leased reefer trailer

one provider-owned vehicle

one chartered vessel slot

one third-party shipping line

one air-cargo ULD

one contracted rail wagon

one project-logistics crane

or an entirely asset-light 4PL movement
```

without changing the Shipment or Consignment model.

The defining resource principle is:

> **Thamani shall model access to transport capacity independently from ownership of transport assets.**

The defining execution principle is:

> **A physical resource may be assigned only when the relevant provider, resource, capacity, serviceability, regulatory and cargo-suitability conditions permit the intended movement.**

The defining asset-management principle is:

> **Operational fleet state shall remain separate from ERP financial-asset state, while durable mappings allow owned assets to participate coherently in both domains.**

And the defining strategic principle is:

> **Thamani shall be able to grow from an asset-light logistics orchestrator into a selectively asset-owning integrated logistics enterprise without redesigning its core digital architecture.**
