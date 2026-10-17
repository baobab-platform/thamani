# ADR-THA-0012 — Project Logistics and Heavy / Abnormal Cargo Service Architecture

**Status:** Accepted — Foundational Thamani Architecture  
**Date:** 2026-10-03  
**Decision Owners:** Nabhold Group Africa / Thamani Global / Baobab Platform Architecture  
**Primary Repository:** `baobab-platform/thamani`  
**Legal Entity:** `THAMANI-GLOBAL`  
**Primary Business Division:** Project Logistics  
**Participating Divisions:** Haulage / Shipping / Freight Forwarding / Warehousing / Cross-Border Logistics / 3PL / 4PL  
**Transport Execution Authority:** bound `logistics.*` provider, initially `baobab-platform/baobab-tms`  
**Regulatory Decision Authority:** `baobab-platform/baobab-regulations`  
**Trade-Document Authority:** `baobab-platform/baobab-trade-docs`  
**Financial Authority:** `baobab-platform/baobab-erp`  
**Engineering Authority:** appropriately qualified internal or external engineering professionals and competent infrastructure authorities  
**Decision Class:** Project logistics / abnormal load / heavy haul / oversized cargo / route engineering / lifting / project orchestration / permits / multimodal execution

---

# 1. Normative Dependencies

This ADR SHALL remain consistent with:

- ADR-THA-0003 — Integrated Shipping, Transportation and Logistics Enterprise Domain Boundary
- ADR-THA-0004 — Counterparty, Carrier and Service-Provider Qualification
- ADR-THA-0006 — RFQ, Logistics Quotation, Contract, Rate and Margin Architecture
- ADR-THA-0008 — Cross-Border, Customs, Corridor, Transit and Regulatory Architecture
- ADR-THA-0009 — Capability Consumption, Engine Authority and System-of-Record Boundary
- ADR-THA-0010 — Warehousing, 3PL and Inventory-Custody Service Composition Boundary
- ADR-THA-0011 — Cold Chain, Dangerous Goods and Special-Cargo Service Boundary
- ADR-TMS-0001 — Baobab TMS Mission and Authority
- ADR-TMS-0002 — Canonical LogisticsShipment, Consignment and Transport Execution Domain Model
- ADR-TDOC-0001 — Trade Docs Mission and Authority
- ADR-TDOC-0002 — Canonical TradeDocument, Version, Content and Relationship Model
- applicable Control Plane, Shared, ERP, IAM and Regulations decisions.

---

# 2. Executive Decision

Thamani SHALL provide **Project Logistics** as a first-class service for customer projects involving complex, heavy, oversized, abnormal, indivisible or otherwise engineering-sensitive cargo.

Project Logistics SHALL be modelled as a **customer project and orchestration domain**, not as a replacement transport engine.

Thamani SHALL own:

```text
customer project relationship

project-logistics scope

commercial proposal and contract

project execution programme

customer milestones

provider coordination

engineering-work coordination

permit coordination

customer reporting

project control tower

commercial risk

service recovery
```

while specialised authorities retain responsibility for their own facts.

---

# 3. Core Architecture

```text
                         CUSTOMER PROJECT
                               │
                               ▼
                      THAMANI PROJECT LOGISTICS
                               │
                 Project / Contract / Programme
                               │
       ┌───────────────────────┼──────────────────────┐
       ▼                       ▼                      ▼
  ENGINEERING               REGULATIONS              TMS
 route / lifting /          requirements          transport execution
 structural studies             │                      │
       │                        ▼                      ▼
       │                    TRADE DOCS           LogisticsShipments
       │                 permits / documents     Movements / Resources
       │                        │                      │
       └──────────────┬─────────┴───────────┬──────────┘
                      ▼                     ▼
                   ERP                EXTERNAL AUTHORITIES
               financial truth       road / port / utility /
                                     police / customs etc.
```

---

# 4. Governing Principle

> **Project Logistics is the coordinated delivery of a project outcome across engineering, permitting, specialised transport, lifting, handling, storage and customer milestones; it is not merely a “large shipment.”**

---

# 5. Project Logistics ≠ Heavy Haul Only

A project-logistics engagement MAY include:

```text
ordinary cargo

heavy cargo

oversized cargo

containerised equipment

breakbulk cargo

abnormal road movements

heavy lifting

temporary storage

port handling

cross-border movements

customs

site delivery

installation sequencing
```

within one customer project.

Therefore:

```text
Project Logistics
    !=
Abnormal Load Transport
```

---

# 6. Heavy / Abnormal Is Contextual

The platform SHALL NOT define:

```text
cargo.abnormal = true
```

as an eternal intrinsic property of a cargo item.

Whether a load is abnormal depends on:

```text
cargo dimensions

cargo mass

transport means

axle configuration

route

road geometry

bridge capacity

mode

jurisdiction

legal limits

permit regime

effective date
```

---

# 7. Same Cargo, Different Classification

Example:

```text
Wind turbine nacelle
       │
       ├── Sea movement
       │     ordinary project cargo
       │
       └── Road movement
             abnormal / permit-controlled
```

Accordingly:

> **Abnormality is an execution-context determination, not merely a product classification.**

---

# 8. Indivisibility Matters

Road permit regimes may distinguish loads that cannot reasonably be divided into smaller compliant loads.

The system SHALL therefore capture:

```text
is_indivisible claim

basis for indivisibility

verification state

jurisdictional relevance
```

without assuming the same concept applies identically in every jurisdiction.

---

# 9. Initial-Market Regulatory Reality

South Africa's Department of Transport continues to publish TRH 11 for abnormal-load vehicles. Its route engineering framework explicitly considers axle loads, bridge and culvert structural capacity, and requires route-specific assessment for abnormal combinations; it also identifies special investigation requirements for very heavy combinations.

Uganda's current national-road permit framework separately requires a Special Load Permit for specified special loads, including abnormal, awkward, hazardous, unstable and super loads, with applications processed through the road authority and permit issuance by the competent ministry.

Therefore Baobab SHALL NOT implement one global:

```text
abnormal_load_threshold
```

and assume it governs all markets.

---

# 10. ProjectLogisticsProject

Thamani SHALL own a durable commercial/orchestration aggregate:

```text
ProjectLogisticsProject
├── project_id
├── tenant_context
├── customer_ref
├── contract_ref
├── project_name
├── project_sites[]
├── project_scope
├── cargo_unit_refs[]
├── logistics_shipment_refs[]
├── engineering_work_refs[]
├── regulatory_assessment_refs[]
├── permit_refs[]
├── trade_document_refs[]
├── provider_assignments[]
├── milestone_plan
├── risk_register_ref?
├── commercial_status
├── operational_summary
├── customer_status
├── start_date?
├── target_completion_date?
└── version
```

---

# 11. ProjectLogisticsProject Is Not LogisticsShipment

This SHALL remain:

```text
ProjectLogisticsProject
    !=
LogisticsShipment
```

A single project may contain dozens or hundreds of LogisticsShipments.

---

# 12. Example

```text
Wind Farm Project
      │
      ├── LogisticsShipment 001
      │      turbine blade
      │
      ├── LogisticsShipment 002
      │      nacelle
      │
      ├── LogisticsShipment 003
      │      tower sections
      │
      ├── LogisticsShipment 004
      │      transformers
      │
      └── LogisticsShipment 005...
```

The customer experiences one project.

TMS executes many logistics movements.

---

# 13. Project Milestone ≠ Transport Milestone

Thamani MAY define:

```text
Engineering complete

Permits secured

Port discharge complete

First turbine delivered

50% site delivery complete

Mechanical installation ready
```

as customer/project milestones.

These SHALL remain separate from TMS operational milestones such as:

```text
Movement departed

Movement arrived

Cargo discharged

Delivery completed
```

---

# 14. Project Cargo Unit

Thamani MAY maintain a project-facing reference to significant cargo units.

Conceptually:

```text
ProjectCargoUnit
├── project_cargo_unit_id
├── customer_ref
├── source_asset_ref?
├── cargo_item_ref?
├── description
├── dimensions
├── mass
├── centre_of_gravity_data?
├── lifting_points?
├── support_points?
├── handling_constraints[]
├── sensitivity_profile?
├── indivisibility_claim?
├── engineering_refs[]
└── transport_refs[]
```

This SHALL not replace TMS `CargoItem`.

---

# 15. Engineering Data ≠ Product Master

Dimensions and mass used for project execution MAY differ from generic product data because execution requires:

```text
transport configuration

packaging

shipping frame

temporary supports

lifting gear

fluid condition

assembled/disassembled state
```

The project SHALL preserve the execution-specific engineering basis.

---

# 16. Declared Dimensions ≠ Verified Dimensions

This remains:

```text
customer says:
12.8 m × 4.2 m × 4.7 m
        !=
surveyed / verified transport dimensions
```

Execution-critical dimensions SHOULD carry a verification state.

---

# 17. Mass Verification

Likewise:

```text
design mass
    !=
shipping mass
    !=
verified transport mass
```

where project engineering requires the distinction.

---

# 18. Centre of Gravity

Project cargo MAY require explicit:

```text
centre of gravity

support point

lifting point

load distribution
```

information.

TMS SHALL consume the execution constraints.

Thamani SHALL not invent engineering values.

---

# 19. Engineering Authority

Where route, structural, lifting or load-securing analysis requires professional engineering judgment, the authoritative technical conclusion SHALL come from an appropriately competent engineering party.

Possible parties include:

```text
professional engineer

structural engineer

transport engineer

heavy-lift engineer

naval architect

marine surveyor

specialist lifting contractor

road authority engineer
```

according to applicable law and task.

---

# 20. Baobab Does Not Become the Engineer of Record

This SHALL be prohibited:

```text
Baobab calculated route
    therefore
Baobab certifies bridge safe
```

unless an explicitly authorised professional/authority has assumed that responsibility.

---

# 21. EngineeringAssessment

Thamani MAY coordinate/reference:

```text
EngineeringAssessment
├── assessment_ref
├── assessment_type
├── subject_refs[]
├── engineering_provider_ref
├── responsible_professional_ref?
├── assumptions[]
├── input_refs[]
├── conclusions[]
├── limitations[]
├── validity_period?
├── signature/document_ref?
└── status
```

The detailed engineering model need not become a generic Baobab platform aggregate unless reuse justifies it.

---

# 22. Engineering Assessment Types

Examples include:

```text
route feasibility

bridge loading assessment

pavement assessment

turning simulation

swept-path analysis

gradient assessment

ground-bearing assessment

lifting study

rigging study

load-securing calculation

temporary works design

jetty/quay load assessment

crane outrigger assessment

transport-frame design
```

---

# 23. Route Survey

A project movement MAY require a physical or digital route survey addressing:

```text
road width

turning geometry

vertical clearance

bridge geometry

bridge load

culverts

road surface

gradient

overhead utilities

street furniture

rail crossings

traffic constraints

construction works

security

staging areas

safe stopping areas
```

---

# 24. RouteSurvey ≠ TransportRoute

This SHALL remain:

```text
RouteSurvey
    engineering/evidence artefact

TransportRoute
    TMS planned itinerary
```

The first may constrain the second.

---

# 25. Route Engineering → TMS

Conceptually:

```text
Candidate Route
      │
      ▼
Engineering Survey
      │
      ▼
Constraint Set
      │
      ▼
Regulatory / Permit Assessment
      │
      ▼
TMS TransportRoute
```

---

# 26. TMS Owns Operational Route

ADR-TMS-0002 remains authoritative for:

```text
TransportPlan

TransportRoute

TransportMovement

TransportLeg

TransportCall
```

Project Logistics SHALL not create parallel canonical route execution.

---

# 27. Route Feasibility ≠ Route Approval

This remains:

```text
Engineer says technically feasible
        !=
Road authority issued permit
```

---

# 28. Permit ≠ Engineering Approval

Likewise:

```text
Permit issued
    !=
all engineering risks eliminated
```

Permit conditions and engineering requirements SHALL remain separately traceable.

---

# 29. Regulations Role

Baobab Regulations SHALL determine, within its verified coverage:

```text
whether abnormal-load rules apply

which jurisdiction applies

which permits are required

which escort requirements apply

which time restrictions apply

which road restrictions apply

which documents are required

which authority has jurisdiction
```

It SHALL not issue governmental permits.

---

# 30. External Authority Remains Sovereign

The competent:

```text
road authority

transport ministry

police authority

port authority

utility authority

rail authority

customs authority
```

retains legal decision authority where applicable.

---

# 31. Permit Workflow

Conceptually:

```text
Cargo + Vehicle + Route
         │
         ▼
Regulations Assessment
         │
         ▼
Permit Requirement
         │
         ▼
Trade Docs Permit Case
         │
         ▼
External Authority
         │
         ▼
Permit / Conditions
         │
         ▼
TMS Enforcement
```

---

# 32. Permit Belongs to Trade Docs

A formal abnormal-load permit SHALL be represented using canonical Trade Docs semantics:

```text
TradeDocument
      │
      ▼
DocumentVersion
      │
      ▼
ContentArtifact
```

with issuer and validity preserved.

---

# 33. Permit Is Not Boolean

This SHALL be rejected:

```text
permit_ok = true
```

Canonical permit context SHOULD preserve:

```text
issuer

permit number

vehicle / combination scope

cargo scope

route scope

validity dates

time windows

escort requirements

speed restrictions

special conditions

document version
```

---

# 34. Permit Conditions Are Operational Constraints

TMS SHALL consume relevant permit conditions.

Examples:

```text
specific route

specific vehicle

maximum speed

daylight movement only

night movement only

police escort

private escort

bridge-centreline tracking

temporary road closure

weather restriction

specific travel dates
```

---

# 35. Route Change May Invalidate Permit

This SHALL remain:

```text
Permit for Route A
    !=
Permit for Route B
```

unless the issuing authority explicitly allows both.

---

# 36. Vehicle Substitution May Invalidate Permit

Likewise:

```text
Truck / trailer combination changed
        │
        ▼
permit validity must be re-evaluated
```

---

# 37. Axle Configuration Is Execution-Critical

For heavy road movements, the system SHALL be able to retain:

```text
axle count

axle grouping

axle spacing

axle loads

vehicle combination

trailer configuration
```

where required.

South Africa's TRH 11 explicitly treats bridge/culvert capacity as dependent on axle loads and spacing, reinforcing that total cargo mass alone is insufficient.

---

# 38. Gross Mass ≠ Infrastructure Effect

This remains:

```text
same total mass
    !=
same road/bridge loading
```

because axle distribution and configuration matter.

---

# 39. BridgeAssessment

A heavy movement MAY require an engineering/authority assessment of structures along the route.

Conceptually:

```text
BridgeAssessment
├── structure_ref
├── route_ref
├── vehicle_configuration_ref
├── axle_configuration_ref
├── load_case
├── engineering_provider_ref
├── result
├── restrictions[]
├── validity?
└── document_ref
```

---

# 40. BridgeAssessment Is Not TMS Routing Algorithm

TMS may consume:

```text
bridge permitted

bridge excluded

centreline tracking required

maximum configuration
```

It SHALL not claim structural engineering authority.

---

# 41. Utility Clearance

Oversized cargo MAY require coordination for:

```text
power lines

telecommunications

traffic signals

street lighting

overhead structures

temporary utility isolation
```

These SHALL be represented as project dependencies.

---

# 42. Utility Work Is Not Transport Event

This remains:

```text
power line lifted
    project/utility activity

truck departed
    TMS transport event
```

---

# 43. Infrastructure Modification

Some projects MAY require:

```text
temporary sign removal

traffic-island modification

road widening

bridge strengthening

temporary ramps

ground improvement
```

These activities SHALL require explicit customer/project governance and authority approvals.

They SHALL not be hidden inside a route record.

---

# 44. Temporary Works

Temporary works MAY require:

```text
design

review

approval

construction

inspection

removal/restoration
```

with appropriate engineering responsibility.

---

# 45. Lifting Operations

Project Logistics often includes:

```text
loading lift

port lift

transshipment lift

site offload

tandem lift

tailing operation

jack-and-slide

skidding

gantry operation
```

These SHALL be project operations, not automatically TMS TransportMovements.

---

# 46. LiftPlan

A significant lift SHOULD reference:

```text
LiftPlan
├── operation_ref
├── cargo_ref
├── lifting_method
├── crane/equipment_refs[]
├── rigging_refs[]
├── lift_points[]
├── centre_of_gravity_ref
├── load cases
├── ground-bearing requirements
├── exclusion-zone requirements
├── environmental limits
├── responsible_party
├── engineering_approval_ref
├── method_statement_ref
└── status
```

---

# 47. Lift Plan ≠ LogisticsShipment

This remains:

```text
LiftPlan
    !=
LogisticsShipment
```

The lift enables part of logistics execution.

---

# 48. TMS Resource Boundary

TMS SHALL eventually model relevant:

```text
TransportMeans

TransportEquipment

specialised trailers

SPMTs

lowbeds

modular trailers

prime movers
```

according to its fleet/resource ADRs.

---

# 49. Lifting Equipment Boundary

Equipment such as:

```text
mobile crane

crawler crane

gantry system

strand jack

forklift

hydraulic gantry
```

may not be transport means in the TMS sense.

The architecture SHALL not force every project resource into `TransportMeans`.

---

# 50. ProjectResourceRequirement

Thamani MAY coordinate:

```text
ProjectResourceRequirement
├── resource_category
├── capability_required
├── quantity
├── time_window
├── site
├── certification_requirements[]
├── operator_requirements[]
└── source_requirement
```

without becoming canonical fleet authority.

---

# 51. Resource Selection

Project resources SHALL be selected based on:

```text
capability

engineering suitability

provider qualification

availability

regulatory suitability

site constraints

commercial terms
```

—not merely lowest rate.

---

# 52. Provider Qualification

THA-0004 SHALL apply to:

```text
heavy-haul carriers

crane providers

marine contractors

rigging companies

survey providers

engineering consultants

escort providers

warehouse operators

port service providers
```

---

# 53. Qualification Scope

A provider MAY be qualified for:

```text
80-tonne machinery movement
```

but not:

```text
300-tonne transformer movement
```

or:

```text
marine heavy lift
```

Qualification SHALL remain scope-specific.

---

# 54. Professional Credential ≠ Organisation Qualification

This remains:

```text
Engineering firm qualified
    !=
Named engineer professionally authorised

Named engineer authorised
    !=
every engineering discipline covered
```

---

# 55. Personnel Qualification

Project operations MAY require:

```text
licensed drivers

experienced heavy-haul operators

riggers

signalers

crane operators

engineers

surveyors

escort personnel
```

according to applicable context.

IAM SHALL authenticate people where Baobab identity applies.

It SHALL not become professional-license authority.

---

# 56. Maritime Project Cargo

For maritime execution, cargo stowage and securing SHALL remain a vessel/carrier safety responsibility under applicable maritime rules.

IMO's CSS Code establishes international principles for safe cargo stowage and securing and emphasises suitability of the ship, proper securing means, planning, supervision and qualified personnel.

---

# 57. Cargo Securing

Heavy cargo SHALL NOT be assumed safe merely because of its mass.

The IMO/ILO/UNECE CTU Code explicitly warns that heavy cargo can slide or tip under transport accelerations and calls for appropriate blocking, lashing or other securing measures.

---

# 58. CTU Code Boundary

The CTU Code provides global non-mandatory guidance for packing and securing cargo transport units across land and sea, including large/bulky project cargo, while not replacing binding national or modal regulations.

Baobab SHALL therefore treat it as:

```text
engineering / operational reference
```

not:

```text
universal law
```

---

# 59. Securing Plan

Project cargo MAY require a formal:

```text
CargoSecuringPlan
```

including:

```text
support arrangement

blocking

bracing

lashing

friction assumptions

securing points

load distribution

inspection requirements
```

where appropriate.

---

# 60. Securing Plan Authority

Engineering/provider specialists SHALL own the technical securing determination.

TMS MAY consume constraints and confirmation.

Trade Docs MAY govern the formal plan/document.

---

# 61. Packing ≠ Securing

This SHALL remain:

```text
cargo packaged
    !=
cargo secured for transport
```

---

# 62. Loading ≠ Securing Complete

Likewise:

```text
cargo positioned on trailer
    !=
ready to move
```

A separate readiness/inspection gate MAY be required.

---

# 63. Movement Readiness

A heavy/abnormal movement SHOULD be dispatchable only when applicable readiness conditions are satisfied:

```text
cargo verified

route approved

engineering complete

permit valid

vehicle/equipment suitable

carrier qualified

driver/personnel eligible

load secured

escort ready

utility clearances ready

weather conditions acceptable

documents available
```

---

# 64. Ready Is a Projection

A Thamani control tower MAY display:

```text
MOVEMENT READY
```

as a projection.

It SHALL remain explainable through its underlying conditions.

---

# 65. Project Readiness ≠ Movement Readiness

A project may be:

```text
IN EXECUTION
```

while one specific movement is:

```text
BLOCKED
```

---

# 66. Gate Architecture

Project operations SHOULD support explicit gates such as:

```text
ENGINEERING_READY

REGULATORY_READY

PERMIT_READY

RESOURCE_READY

SITE_READY

LIFT_READY

TRANSPORT_READY

DELIVERY_READY
```

where appropriate.

---

# 67. Gate ≠ Lifecycle State

A readiness gate is a condition.

It SHALL not replace the underlying project or LogisticsShipment lifecycle.

---

# 68. Site Readiness

Delivery may depend on:

```text
access road

ground bearing

crane pad

laydown area

foundation/site readiness

receiving team

utility isolation

security

traffic management
```

---

# 69. Delivery Site ≠ Merely Address

Project logistics destinations MAY require rich operational context beyond:

```text
street address
```

including:

```text
site gate

internal haul route

turning area

ground conditions

offload location

crane position

laydown zone
```

---

# 70. Project Site

Thamani MAY maintain:

```text
ProjectSite
├── canonical_location_ref
├── site_role
├── access_constraints[]
├── operating_hours
├── security_requirements[]
├── site-readiness_refs[]
├── contact_refs[]
└── external_refs[]
```

as project orchestration context.

---

# 71. Site Internal Movement

A movement within a construction or industrial site MAY still require TMS execution where it is genuine transport.

Not every:

```text
crane slew

skid movement

lifting operation
```

is a TransportMovement.

---

# 72. Multi-Modal Project Logistics

A project may follow:

```text
Factory
   │
   ▼
Heavy Road Haul
   │
   ▼
Port
   │
   ▼
Ocean Heavy-Lift / RoRo / Breakbulk
   │
   ▼
Destination Port
   │
   ▼
Abnormal Road Haul
   │
   ▼
Project Site
   │
   ▼
Heavy Lift / Placement
```

One customer project SHALL be able to compose all stages.

---

# 73. One Project, Many Consignments

A single project MAY use:

```text
multiple LogisticsShipments

multiple Consignments

multiple carriers

multiple vessels

multiple road permits

multiple engineering studies
```

without fragmenting the customer project identity.

---

# 74. Consolidation

Project Logistics MAY consolidate supporting equipment or smaller cargo into ordinary Consignments while major pieces remain individually planned.

The architecture SHALL not require identical execution patterns for every cargo unit.

---

# 75. Sequence Dependency

Project cargo may have strict delivery sequence:

```text
Foundation component
      before
Tower section
      before
Nacelle
      before
Blade
```

or other installation dependencies.

---

# 76. Delivery Sequence ≠ TMS Route Sequence

This remains:

```text
ProjectInstallationSequence
    !=
TransportCall sequence
```

though one may constrain the other.

---

# 77. ProjectSchedule

Thamani SHALL own the customer/project schedule projection.

TMS owns operational transport schedules.

External contractors may own construction/installation schedules.

---

# 78. Schedule Dependency

Thamani SHOULD support dependencies such as:

```text
permit issuance

port availability

vessel arrival

crane mobilisation

road closure

customer site readiness

weather window
```

---

# 79. Weather

Some project movements/lifts MAY be restricted by:

```text
wind

rain

visibility

sea state

temperature

light conditions
```

according to engineering, permit or operating requirements.

---

# 80. Weather Observation ≠ Permission

This remains:

```text
wind = 8 m/s
    !=
lift approved
```

The operation's governing engineering criterion determines readiness.

---

# 81. Traffic Management

Abnormal road movements MAY require:

```text
escort vehicles

traffic officers

temporary closures

intersection control

contraflow

lane occupation

signage removal
```

according to permit/authority requirements.

---

# 82. Escort Requirement

Escort need SHALL derive from:

```text
regulatory decision

permit condition

risk assessment

contractual operating policy
```

rather than a universal size threshold inside Thamani.

---

# 83. Escort Provider

Escort providers SHALL be modelled as qualified service providers, not as transport means.

---

# 84. Permit Conditions Must Reach Operations

This architecture is prohibited:

```text
Permit PDF stored
     but
dispatcher never sees conditions
```

Relevant permit constraints SHALL be available as structured operational constraints where feasible.

---

# 85. Document Extraction ≠ Authority

AI/OCR MAY assist in extracting:

```text
permit route

validity

escort requirement

speed limit
```

from a permit.

Extracted values SHALL not become authoritative without the required verification.

---

# 86. Project Document Dossier

A project MAY require a Trade Docs dossier containing:

```text
route surveys

engineering assessments

abnormal-load permits

lifting plans

method statements

cargo drawings

packing lists

transport documents

Customs documents

insurance certificates

inspection reports

delivery documents
```

---

# 87. Dossier ≠ Project

This remains:

```text
DocumentDossier
    !=
ProjectLogisticsProject
```

Trade Docs owns the documentary view.

Thamani owns the project.

---

# 88. Engineering Model ≠ Document

The calculations/model underlying:

```text
bridge assessment
```

or:

```text
lifting analysis
```

may exist outside Trade Docs.

The formally issued assessment/report is a TradeDocument.

---

# 89. Versioning Matters

If a route changes:

```text
Route Survey v1
    may become obsolete

Engineering Assessment v1
    may become obsolete

Permit v1
    may remain route-specific
```

New documents SHALL not silently overwrite the historical versions.

TDOC-0002 governs.

---

# 90. Method Statement

High-risk activities MAY require:

```text
MethodStatement
```

describing execution method and responsibilities.

It SHALL be governed as a formal document where materially relied upon.

---

# 91. Risk Register

Thamani SHOULD maintain a project risk register distinct from engineering calculations.

Possible risks:

```text
permit delay

road damage

bridge restriction

port delay

equipment failure

site not ready

weather

utility conflict

Customs delay

provider failure

security incident

cargo damage
```

---

# 92. Risk ≠ Exception

This remains:

```text
Risk
    future uncertainty

Exception
    actual operational deviation
```

---

# 93. Risk ≠ Regulatory Decision

Likewise:

```text
possible permit refusal
    project risk

permit legally required
    regulatory decision
```

---

# 94. Pulse Role

Pulse MAY assist with:

```text
route-risk intelligence

delay prediction

provider-performance analysis

weather-risk prediction

permit lead-time analytics

project schedule risk

anomaly detection
```

It SHALL remain advisory.

---

# 95. AI Shall Not Certify Engineering

This SHALL be non-negotiable:

```text
LLM generated lifting plan
    !=
approved engineering lifting plan
```

and:

```text
AI route recommendation
    !=
bridge engineering approval
```

---

# 96. AI May Assist Engineering Workflow

AI MAY assist with:

```text
document extraction

checklist completion

constraint summarisation

historical route retrieval

permit-condition extraction

risk identification

draft planning
```

subject to human verification.

---

# 97. Commercial Quotation

THA-0006 remains authoritative for pricing.

Project Logistics quotations MAY include:

```text
engineering

route survey

permit fees

escort

road modification

utilities

heavy-haul equipment

port charges

crane mobilisation

rigging

storage

marine freight

insurance

security

project management

contingency
```

---

# 98. Estimated Cost ≠ Actual Cost

Project logistics frequently contains:

```text
provisional sums

contingency

estimated authority charges

estimated infrastructure work

weather risk

standby
```

These SHALL remain explicit.

---

# 99. Contingency ≠ Hidden Margin

This remains:

```text
contingency
    !=
margin
```

Both SHALL be independently visible to authorised commercial users.

---

# 100. Engineering Cost ≠ Permit Fee

Likewise:

```text
route engineering fee
    !=
government permit fee
```

even where invoiced together.

---

# 101. Pass-Through Costs

Project logistics commonly includes customer pass-through charges.

THA-0006 pass-through policy SHALL apply.

---

# 102. Change Management

Project changes MAY include:

```text
cargo dimensions changed

mass changed

site moved

route changed

delivery sequence changed

transport date changed

vehicle configuration changed

permit expired

customer scope changed
```

Material changes SHALL trigger reassessment of dependent plans.

---

# 103. Change Impact Graph

Conceptually:

```text
Cargo Mass Changed
       │
       ├── Engineering
       ├── Vehicle Configuration
       ├── Route
       ├── Bridge Assessment
       ├── Permit
       ├── Price
       └── Schedule
```

The platform SHALL not treat project data as independent fields.

---

# 104. No Silent Replanning

A material project change SHALL preserve:

```text
old plan

new plan

reason

actor

time

affected permits/documents

commercial effect
```

---

# 105. Execution Hold

TMS SHALL support a project-driven operational block where:

```text
permit expired

route no longer valid

engineering approval withdrawn

site unavailable

equipment unavailable

weather limit exceeded
```

according to authoritative source.

---

# 106. Thamani Cannot Fabricate Permit Readiness

This SHALL remain:

```text
customer urgently needs delivery
    !=
permit optional
```

---

# 107. Cross-Border Project Logistics

Cross-border project cargo MAY involve:

```text
multiple abnormal-load permit regimes

Customs transit

temporary importation

bonding

escort changes

vehicle changes

border handling

document changes
```

THA-0008 remains authoritative for the cross-border composition.

---

# 108. Border Permit ≠ Road Permit

This remains:

```text
Customs clearance
    !=
abnormal road-load permission
```

A cargo may have Customs release and still be prohibited from road movement until a transport permit is valid.

---

# 109. Cross-Border Carrier Permit ≠ Abnormal-Load Permit

Likewise, a general cross-border road-transport authorisation SHALL not automatically be treated as a special-load permit.

---

# 110. Uganda Example

Uganda's current permit system explicitly requires a separate Special Load Permit for qualifying national-road movements and treats permit compliance as a condition of lawful execution.

Therefore Thamani SHALL represent road-authority permissions separately from ordinary carrier/provider qualification.

---

# 111. South Africa Example

South African abnormal-load guidance makes route and infrastructure effects central to allowable execution, including bridge and culvert capacity and axle configuration.

This validates the separation:

```text
Cargo
+
Vehicle
+
Route
+
Infrastructure
+
Permit
```

rather than:

```text
Cargo weight alone
```

---

# 112. Port Operations

Project cargo may require:

```text
special berth

heavy-lift crane

mobile harbour crane

RoRo ramp

SPMT movement

quay load assessment

laydown area

temporary storage

stevedoring plan
```

These SHALL be represented as project dependencies/provider capabilities.

---

# 113. Port Authority

The port/terminal remains authoritative for:

```text
berth availability

terminal operating permission

quay restrictions

terminal handling approval
```

where applicable.

---

# 114. Marine Carrier

The vessel carrier/master retains applicable vessel-safety authority.

Thamani SHALL not override:

```text
stowage

securing

vessel safety
```

decisions legally belonging to the carrier/master.

IMO's CSS framework explicitly places emphasis on vessel suitability, securing and the master's responsibility for the voyage.

---

# 115. Delivery ≠ Installation

TMS delivery SHALL mean the applicable physical delivery/handover occurred.

It SHALL NOT automatically mean:

```text
equipment installed

commissioned

accepted by EPC contractor

construction milestone complete
```

---

# 116. Site Acceptance

Customer/EPC/site operators MAY own:

```text
site receipt

installation acceptance

commissioning acceptance
```

separately.

---

# 117. Proof of Delivery

TDOC-0002 remains authoritative for formal POD documentary representation.

TMS remains authoritative for the physical delivery fact.

---

# 118. Damage

Project cargo damage MAY occur during:

```text
lifting

transport

storage

port handling

offloading
```

Incident source and custody state SHALL be preserved.

---

# 119. Damage ≠ Liability

This remains:

```text
cargo damaged
    !=
carrier legally liable
```

Liability may depend on contract, custody, causation, insurance and law.

---

# 120. Survey Evidence

A marine/cargo survey report MAY be a formal TradeDocument.

The underlying observation remains attributable to the surveyor.

---

# 121. Claims Boundary

Detailed:

```text
claims

insurance recovery

customer compensation

service recovery
```

remains for THA-0015.

---

# 122. Project Control Tower

Thamani MAY present:

```text
PROJECT: WIND FARM PHASE 1

Engineering:
READY

Permits:
8 / 9 APPROVED

Port Cargo:
ARRIVED

Road Movement 01:
DELIVERED

Road Movement 02:
AWAITING PERMIT

Road Movement 03:
ROUTE SURVEY REVIEW

Site:
READY

Overall:
AT RISK — 3 DAYS
```

as a composed customer/operations view.

---

# 123. Control Tower Is Projection

Each component SHALL retain authority lineage.

Example:

```text
Movement
    → TMS

Permit
    → Trade Docs / issuing authority

Regulatory requirement
    → Regulations

Engineering approval
    → Engineering provider

Invoice
    → ERP

Project summary
    → Thamani
```

---

# 124. Project Progress

Project completion SHALL NOT be derived only from:

```text
number of shipments delivered
```

because contractual scope may include:

```text
engineering

permitting

storage

lifting

documentation

handover

closeout
```

---

# 125. Project Closeout

A Project Logistics Project MAY close only when applicable:

```text
movements complete

customer deliverables complete

documents complete

permit obligations closed

temporary works restored

customer handover complete

commercial closeout initiated
```

according to project scope.

---

# 126. Financial Closure Is Separate

This remains:

```text
Project Completed
    !=
All invoices settled
```

ERP retains financial authority.

---

# 127. Project Documentation Retention

Project engineering and permit records MAY require longer retention than ordinary transport tracking.

Retention policy SHALL consider:

```text
law

permit conditions

engineering liability

contract

insurance

customer requirements
```

---

# 128. Security

Project logistics data may expose:

```text
critical infrastructure

high-value cargo

route plans

movement times

utility arrangements

industrial sites
```

Access SHALL follow least privilege.

---

# 129. Public Tracking Restrictions

Public customer links SHALL not automatically reveal:

```text
exact abnormal-load route

escort plan

security stops

infrastructure vulnerabilities

high-value cargo detail
```

---

# 130. Implementation Sequence

## THA-PRJ-00 — Current-State Audit

Audit:

```text
Thamani

TMS

Trade Docs

Regulations

ERP

Shared

provider qualification
```

for project-logistics assumptions.

---

## THA-PRJ-01 — Project Commercial Model

Implement only Thamani-owned:

```text
ProjectLogisticsProject

customer scope

project milestones

commercial status

service composition
```

---

## THA-PRJ-02 — Project Cargo References

Establish project-facing cargo references mapped to canonical TMS CargoItems without duplicating TMS authority.

---

## THA-PRJ-03 — Engineering Work Registry

Implement provider-neutral references to:

```text
route surveys

bridge assessments

lifting studies

securing studies

ground assessments
```

with responsible-party provenance.

---

## THA-PRJ-04 — Regulations Integration

Prove:

```text
Cargo
+
Vehicle
+
Route
+
Jurisdiction
+
Date
        ↓
Regulations
        ↓
Permit / restriction requirements
```

---

## THA-PRJ-05 — Trade Docs Integration

Represent:

```text
permits

engineering reports

method statements

survey reports

formal lift plans
```

through TDOC canonical semantics.

---

## THA-PRJ-06 — TMS Route Constraints

Feed verified engineering and permit constraints into TMS planning/execution without making TMS the engineering authority.

---

## THA-PRJ-07 — Heavy Road Reference Slice

Implement one realistic abnormal-road movement:

```text
Cargo verified
→ route surveyed
→ engineering
→ permit
→ specialised trailer
→ escort
→ TMS movement
→ delivery
```

---

## THA-PRJ-08 — Multimodal Reference Slice

Prove:

```text
factory
→ road
→ port
→ sea
→ port
→ abnormal road
→ site
```

under one Thamani project.

---

## THA-PRJ-09 — Lift Reference Slice

Implement:

```text
cargo
→ lift plan reference
→ crane/provider readiness
→ operational lift
→ offload confirmation
```

without treating the lift as a TMS Movement automatically.

---

## THA-PRJ-10 — Change Impact

Prove a cargo-dimension or route change invalidates dependent:

```text
engineering

permit

resource

schedule

price
```

as applicable.

---

## THA-PRJ-11 — Project Control Tower

Compose project milestones from authoritative engine/provider facts.

---

## THA-PRJ-12 — Commercial Integration

Integrate:

```text
engineering costs

permit charges

special-resource costs

standby

contingency

customer pricing

margin
```

through THA-0006.

---

## THA-PRJ-13 — Cross-Border Reference Slice

Prove a heavy project movement across at least two jurisdictions with independent permit and Customs requirements.

---

## THA-PRJ-14 — Failure and Recovery

Test:

```text
permit delayed

route rejected

bridge unavailable

vehicle failure

crane failure

port delay

weather hold

site not ready

cargo dimensions changed
```

---

## THA-PRJ-15 — Production Hardening

Verify:

```text
tenant isolation

engineering provenance

document version integrity

permit validity

route constraint enforcement

provider substitution

resource conflicts

idempotency

audit

change history

security

recovery
```

---

# 131. Alternatives Considered

## A. Model Project Logistics as One Large Shipment

**Rejected.**

A project may comprise many independent transport executions, engineering work packages and permits.

---

## B. Create `ProjectShipment`

**Rejected.**

`LogisticsShipment` remains the canonical TMS transport aggregate.

---

## C. Put Route Engineering Inside TMS

**Rejected.**

TMS consumes engineering constraints but SHALL not become the engineer of record.

---

## D. Put Permitting Inside Thamani

**Rejected.**

Thamani coordinates the process; Regulations determines requirement; Trade Docs manages documentary workflow; external authorities issue permits.

---

## E. Put Engineering Reports Directly on Shipment Rows

**Rejected.**

Formal engineering reports belong in Trade Docs and reference transport/project objects.

---

## F. Assume Heavy Cargo Is Abnormal Everywhere

**Rejected.**

Abnormality is mode-, equipment-, route- and jurisdiction-dependent.

---

## G. Determine Feasibility From Gross Weight Alone

**Rejected.**

Dimensions, axle configuration, route geometry and infrastructure capacity may all be material.

---

## H. Treat Permit as `true/false`

**Rejected.**

Permit scope, validity and conditions matter operationally.

---

## I. Allow AI to Approve Engineering

**Rejected.**

AI may assist but not replace qualified professional or authority decisions.

---

## J. Create a Dedicated Project-Logistics Engine

**Rejected at this stage.**

The business capability is currently a composition of Thamani, TMS, Trade Docs, Regulations and external engineering/provider capabilities.

---

# 132. Architectural Invariants

```text
Project Logistics
    != One Shipment

ProjectLogisticsProject
    != LogisticsShipment

Project Milestone
    != Transport Milestone

Project Cargo Unit
    != Product Master

Project Cargo Unit
    != TMS CargoItem

Heavy
    != Abnormal automatically

Oversized
    != Illegal automatically

Abnormal
    is context-dependent

Route Survey
    != TransportRoute

Engineering Feasible
    != Permit Approved

Permit Approved
    != Engineering Risk Eliminated

Customs Release
    != Road Permit

Cross-Border Permit
    != Abnormal-Load Permit

Cargo Mass
    != Infrastructure Effect

Total Mass
    != Axle Load Distribution

Engineering Assessment
    != TMS Route Algorithm

LiftPlan
    != LogisticsShipment

Lift Operation
    != TransportMovement automatically

Crane
    != TransportMeans automatically

Permit Document
    belongs to Trade Docs

Permit Legal Authority
    remains external

Regulatory Requirement
    belongs to Regulations

Physical Transport
    belongs to TMS

Commercial Project
    belongs to Thamani

Financial Actual
    belongs to ERP

AI Recommendation
    != Engineering Approval

AI Extraction
    != Verified Permit Condition

Delivery
    != Installation

Delivery
    != Commissioning

Damage
    != Liability

Project Completion
    != Financial Closure

Provider Qualification
    != Engineering Competence automatically

Engineering Firm Qualification
    != Named Professional Authority

Route Change
    may invalidate permit

Vehicle Change
    may invalidate permit

Cargo Change
    may invalidate engineering

Historical engineering
    must remain reconstructable
```

---

# 133. Final Architecture

```text
                    CUSTOMER / EPC / PROJECT OWNER
                               │
                               ▼
                    THAMANI PROJECT LOGISTICS
                               │
                  Project / Contract / Programme
                               │
        ┌──────────────────────┼──────────────────────┐
        ▼                      ▼                      ▼
   ENGINEERING             REGULATIONS               TMS
 surveys / load            applicability       LogisticsShipment
 studies / lifts          permits / rules       transport plan
        │                      │                movements/resources
        │                      ▼                      │
        │                 TRADE DOCS                 │
        │           permits / reports / plans        │
        │                      │                      │
        └───────────────┬──────┴──────────────┬───────┘
                        ▼                     ▼
                    PROVIDERS             AUTHORITIES
                haulage / crane /     road / port / police /
                 port / survey          utility / customs
                        │                     │
                        └──────────┬──────────┘
                                   ▼
                             PHYSICAL PROJECT
                                   │
                    ┌──────────────┼──────────────┐
                    ▼              ▼              ▼
                  PORT           TRANSIT          SITE
                                   │
                                   ▼
                          THAMANI CONTROL TOWER
                                   │
                                   ▼
                               CUSTOMER
```

---

# 134. Final Decision

Thamani SHALL operate Project Logistics as a **project-oriented, engineering-aware, multi-provider logistics service** capable of coordinating cargo from factory or origin through ports, borders, specialised transport and final site delivery.

Thamani SHALL own:

```text
customer project

commercial scope

project programme

customer milestones

service composition

provider coordination

permit coordination

customer reporting

commercial risk

project control tower
```

Baobab TMS SHALL own:

```text
LogisticsShipment

Consignment

TransportPlan

TransportRoute

TransportMovement

TransportLeg

TransportCall

transport resources

transport custody

transport execution
```

Baobab Regulations SHALL own:

```text
regulatory applicability

permit requirement determination

route/jurisdiction restrictions

regulatory conditions

effective-time rules
```

Baobab Trade Docs SHALL own:

```text
permit documents

route-survey reports

engineering reports

method statements

lift-plan documents

transport documents

document versions

documentary provenance
```

Qualified engineering parties SHALL remain authoritative for:

```text
route engineering

structural calculations

bridge assessments

lifting engineering

ground-bearing analysis

cargo-securing calculations

other professional engineering conclusions
```

and competent external authorities SHALL remain authoritative for:

```text
permits

road-use permissions

road closures

police/escort requirements

port permissions

utility permissions

other sovereign approvals
```

The defining project principle is:

> **A project is a commercial and operational programme containing many logistics executions; it is not one oversized Shipment aggregate.**

The defining abnormal-load principle is:

> **A cargo becomes abnormal only in an execution context involving a particular cargo configuration, transport means, route, infrastructure, jurisdiction and legal regime.**

The defining engineering principle is:

> **Baobab may capture, coordinate, validate and enforce engineering conclusions, but it shall not manufacture professional engineering authority.**

The defining permit principle is:

> **A permit is a scoped, versioned external-authority decision whose conditions must reach physical execution—not merely a PDF stored for audit.**

The defining TMS principle is:

> **TMS owns the transport plan and execution; engineering and regulatory domains constrain what plans TMS may lawfully and safely execute.**

And the defining Thamani principle is:

> **Thamani shall make an extremely complex chain of engineering, permits, carriers, ports, specialised equipment, documents and movements appear to the customer as one governed Project Logistics service without collapsing their independent authorities.**
