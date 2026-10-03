# ADR-THA-0013 — 4PL Control Tower, Provider Selection and Multi-Provider Orchestration Architecture

**Status:** Accepted — Foundational Thamani Architecture  
**Date:** 2026-10-03  
**Decision Owners:** Nabhold Group Africa / Thamani Global / Baobab Platform Architecture  
**Primary Repository:** `baobab-platform/thamani`  
**Legal Entity:** `THAMANI-GLOBAL`  
**Primary Business Division:** 4PL  
**Participating Divisions:** Haulage / Shipping / Freight Forwarding / Customs Brokerage / Warehousing / 3PL / Courier / Last Mile / Cold Chain / Project Logistics / Cross-Border Logistics  
**Digital Estate:** Thamani  
**Capability Resolution Authority:** `baobab-platform/baobab-cp`  
**Transport Execution Authority:** bound `logistics.*` provider, initially `baobab-platform/baobab-tms`  
**Warehouse Execution Authority:** bound warehouse capability/provider  
**Trade-Document / Customs Workflow Authority:** `baobab-platform/baobab-trade-docs`  
**Regulatory Decision Authority:** `baobab-platform/baobab-regulations`  
**Financial Authority:** `baobab-platform/baobab-erp`  
**Identity Authority:** `baobab-platform/baobab-iam`  
**Intelligence:** `baobab-platform/baobab-pulse` for non-authoritative decision support  
**Decision Class:** 4PL / control tower / provider selection / sourcing / orchestration / visibility / workflow / exception management / provider substitution / lead logistics governance

---

# 1. Normative Dependencies

This ADR SHALL be interpreted consistently with:

- ADR-THA-0003 — Thamani Global Integrated Shipping, Transportation and Logistics Enterprise Domain Boundary
- ADR-THA-0004 — Canonical Logistics Counterparty, Carrier, Service-Provider Qualification and Partner Onboarding
- ADR-THA-0005 — historical transport-domain decision, superseded in part by TMS architecture
- ADR-THA-0006 — RFQ, Logistics Quotation, Contract, Rate and Margin Architecture
- ADR-THA-0008 — Cross-Border, Customs, Corridor, Transit and Regulatory Architecture
- ADR-THA-0009 — Baobab Capability Consumption, Engine Authority and System-of-Record Boundary
- ADR-THA-0010 — Warehousing, 3PL and Inventory-Custody Service Composition Boundary
- ADR-THA-0011 — Cold Chain, Dangerous Goods and Special-Cargo Service Boundary
- ADR-THA-0012 — Project Logistics and Heavy / Abnormal Cargo Service Architecture
- ADR-TMS-0001 — Baobab TMS Mission and Authority
- ADR-TMS-0002 — Canonical LogisticsShipment, Consignment and Transport Execution Domain Model
- ADR-TDOC-0001 — Trade Docs Mission and Authority
- ADR-TDOC-0002 — Canonical TradeDocument, Version, Content and Relationship Model
- ADR-BCP-003 — Capability Registry, Grants, Scopes, Bindings and Deterministic Resolution Model
- ADR-BCP-006 — Capability Provider Lifecycle, Engine Topology, Health, Failover and Migration Model
- ADR-SHARED-017 — Canonical Capability Catalogue, Provider Declaration, Engine Registry and Runtime Capability Convergence
- ADR-SHARED-018 — Canonical Event Context Registry and Event-Type Ownership
- applicable ERP, IAM, Regulations, evidence and counterparty decisions.

---

# 2. Executive Decision

Thamani SHALL provide a first-class **Fourth-Party Logistics / Lead Logistics Orchestration service** capable of coordinating:

```text
internal Thamani divisions

external carriers

shipping lines

air carriers

rail operators

warehouse operators

3PL providers

customs brokers

freight forwarders

courier providers

last-mile providers

special-cargo providers

engineering providers

terminals

ports

other logistics counterparties
```

into a single customer-facing managed logistics service.

The 4PL capability SHALL NOT become:

```text
a universal TMS

a universal WMS

an ERP

a document engine

a regulatory engine

a duplicate provider registry

a duplicate Control Plane

or
the source of truth for every underlying logistics fact
```

---

# 3. Industry Context

The current CSCMP-sponsored Third-Party Logistics Study describes a 4PL provider as one that may manage multiple logistics providers or orchestrate broader aspects of a customer's supply chain.

Real-world 4PL operating models commonly combine orchestration and control-tower functions across multiple logistics providers rather than requiring the 4PL itself to own every execution asset. Accenture's published Syngenta case, for example, describes a 4PL operating model built around global and regional control towers coordinating transport performed through external providers.

CSCMP's broader logistics definition likewise characterises logistics management as an integrating function spanning transportation, warehousing, inventory, fulfilment and management of third-party logistics providers.

Therefore:

> **Thamani's 4PL architecture shall be an orchestration architecture over independently authoritative logistics capabilities—not another execution monolith.**

---

# 4. Information Interoperability

4PL orchestration depends upon combining information from different transport, supply-chain and regulatory domains.

UN/CEFACT's reference-data-model architecture is explicitly designed to provide interoperable business semantics across supply-chain and multimodal transport processes, while its Cross-Border Management model links supply-chain, transport and regulatory information domains.

Thamani SHALL therefore favour:

```text
canonical references

provider-neutral events

typed relationships

explicit authority

semantic mappings
```

over one giant Thamani-owned logistics schema.

---

# 5. Governing Principle

> **The Thamani 4PL controls the customer logistics outcome without claiming ownership of every operational fact used to achieve that outcome.**

---

# 6. 4PL ≠ TMS

This SHALL remain:

```text
4PL
    !=
TMS
```

TMS answers:

> How is transportation planned and executed?

4PL answers:

> Which combination of capabilities and providers should deliver the customer's broader logistics outcome, and how should those providers be coordinated?

---

# 7. 4PL ≠ 3PL

This SHALL remain:

```text
3PL
    !=
4PL
```

A 3PL engagement may execute:

```text
warehousing

transport

fulfilment

distribution
```

for a customer.

A 4PL may orchestrate:

```text
several 3PLs

several carriers

customer-owned operations

Thamani divisions

specialist providers

platform capabilities
```

as one managed network.

---

# 8. Asset Ownership Is Independent

Thamani MAY act as 4PL while also owning:

```text
trucks

warehouses

equipment

other logistics assets
```

in some services.

This does not invalidate the 4PL model.

However:

```text
4PL provider selection
```

SHALL NOT automatically favour:

```text
Thamani-owned asset
```

unless customer contract or policy explicitly permits such preference.

---

# 9. Internal Provider ≠ Automatically Preferred Provider

This SHALL be explicit.

Example:

```text
Thamani Haulage Division
```

MAY compete with:

```text
External Carrier A
External Carrier B
```

for a movement where the 4PL contract requires objective sourcing.

---

# 10. Conflict-of-Interest Policy

Where Thamani is simultaneously:

```text
4PL orchestrator
+
candidate execution provider
```

the system SHALL support explicit conflict-of-interest policy.

The customer contract MAY specify:

```text
BEST_AVAILABLE_PROVIDER

THAMANI_FIRST

EXTERNAL_ONLY

CUSTOMER_NOMINATED

FRAMEWORK_ONLY

SPOT_COMPETITION

HYBRID_POLICY
```

or another governed sourcing strategy.

---

# 11. Customer Contract Governs Orchestration

A 4PL engagement SHALL begin from an explicit:

```text
4PL Agreement

Master Logistics Services Agreement

Statement of Work

Customer Logistics Policy

Service-Level Agreement
```

or equivalent commercial authority.

Thamani SHALL not infer unlimited authority merely because a customer uses the control tower.

---

# 12. 4PLMandate

Thamani SHOULD represent the scope of delegated logistics authority explicitly.

Conceptually:

```text
FourPLMandate
├── mandate_id
├── customer_ref
├── contract_ref
├── effective_period
├── service_scope[]
├── geographic_scope[]
├── market_scope[]
├── provider_selection_policy
├── financial_authority_limits
├── substitution_authority
├── customer_approval_thresholds
├── exception_escalation_policy
├── data_access_scope
├── KPI/SLA_ref
└── status
```

---

# 13. Mandate Is Not Customer Identity

This remains:

```text
Customer
    !=
4PLMandate
```

The same customer MAY have several mandates for:

```text
different regions

business units

product families

projects

transport modes

time periods
```

---

# 14. Mandate Scope

Examples:

```text
Thamani may choose road carrier.

Thamani may negotiate spot freight below ZAR X.

Thamani must ask customer before changing ocean carrier.

Thamani may reroute cargo in disruption.

Thamani may not change delivery destination.

Thamani may select warehouse from approved framework.
```

Such authority SHALL be machine-readable where possible.

---

# 15. Customer Approval Is Not Provider Selection

A provider may be:

```text
operationally best candidate
```

while customer policy still requires:

```text
CUSTOMER_APPROVAL
```

before booking.

---

# 16. FourPLServiceOrder

A 4PL engagement MAY produce a customer-facing orchestration aggregate:

```text
FourPLServiceOrder
├── service_order_id
├── mandate_id
├── customer_ref
├── requested_outcome
├── source_requirements[]
├── service_components[]
├── provider_assignments[]
├── logistics_shipment_refs[]
├── warehouse_refs[]
├── customs_case_refs[]
├── trade_document_refs[]
├── financial_refs[]
├── SLA_ref
├── lifecycle_state
├── exception_refs[]
└── version
```

---

# 17. FourPLServiceOrder ≠ LogisticsShipment

This SHALL remain:

```text
FourPLServiceOrder
    !=
LogisticsShipment
```

One 4PL service order may involve:

```text
many shipments

many warehouses

many providers

many invoices

many customs cases
```

---

# 18. FourPLServiceOrder ≠ Customer Order

Likewise:

```text
FourPLServiceOrder
    !=
Commerce Order
```

The 4PL may serve manufacturers or organisations with no Baobab commerce relationship.

---

# 19. Service Composition

A 4PL service may conceptually decompose into:

```text
CUSTOMER OUTCOME
       │
       ▼
4PL SERVICE ORDER
       │
       ├── Origin collection
       │      └── Carrier A
       │
       ├── Origin warehousing
       │      └── Warehouse B
       │
       ├── Customs brokerage
       │      └── Broker C
       │
       ├── Ocean transport
       │      └── Carrier D
       │
       ├── Destination customs
       │      └── Broker E
       │
       ├── Destination warehousing
       │      └── Warehouse F
       │
       └── Last mile
              └── Carrier G
```

---

# 20. Service Component

Thamani MAY maintain:

```text
ServiceComponent
├── component_id
├── service_order_id
├── required_capability
├── execution_scope
├── timing_requirement
├── geographic_scope
├── service_requirements[]
├── candidate_provider_refs[]
├── selected_provider_ref?
├── authoritative_domain_ref?
├── status_projection
└── dependency_refs[]
```

---

# 21. Service Component ≠ Capability

This remains:

```text
ServiceComponent
    customer workflow requirement

Capability
    canonical platform ability
```

For example:

```text
"Move container from Kampala to Mombasa"
```

is a service component.

```text
logistics.transport.execute
```

would be a capability concept.

---

# 22. Platform Provider vs Logistics Provider

The architecture SHALL distinguish:

```text
Capability Provider
```

from:

```text
Logistics Service Provider
```

Example:

```text
baobab-tms
    capability provider

Road Haulier XYZ
    logistics execution provider
```

They are not the same abstraction.

---

# 23. Control Plane Selects Platform Provider

The Control Plane SHALL continue resolving:

```text
Which Baobab capability provider / engine instance
serves this operation?
```

Thamani 4PL SHALL NOT duplicate this resolution.

---

# 24. 4PL Selects Logistics Counterparty

Thamani 4PL answers:

```text
Which qualified carrier,
warehouse,
broker,
forwarder,
3PL,
or specialist contractor
should physically/commercially execute this service?
```

That is a different decision.

---

# 25. Two-Layer Resolution

The target architecture is therefore:

```text
Customer Requirement
       │
       ▼
Thamani 4PL
       │
       │ selects business/logistics provider
       ▼
Logistics Provider
       │
       │ execution managed through
       ▼
Canonical Baobab Capability
       │
       ▼
Control Plane
       │
       │ resolves technical capability provider
       ▼
Baobab Engine
```

---

# 26. Example

```text
Customer wants road transport
       │
       ▼
Thamani selects:
ABC Haulage Ltd
       │
       ▼
TMS transport execution capability
       │
       ▼
Control Plane resolves:
baobab-tms
```

---

# 27. Provider Selection Starts With Qualification

THA-0004 remains authoritative.

The canonical sequence is:

```text
Canonical Organisation
       │
       ▼
Provider Profile
       │
       ▼
Capability Declaration
       │
       ▼
Evidence
       │
       ▼
Qualification
       │
       ▼
Eligibility
       │
       ▼
Selection
```

This remains:

```text
Qualified
    !=
Selected
```

---

# 28. ProviderSelectionCase

Thamani SHOULD represent a provider-selection decision explicitly.

Conceptually:

```text
ProviderSelectionCase
├── selection_case_id
├── service_component_id
├── customer_ref
├── candidate_providers[]
├── qualification_context
├── commercial_context
├── operational_context
├── regulatory_context
├── scoring_inputs[]
├── policy_ref
├── decision
├── decision_reason
├── decided_by
├── decided_at
└── version
```

---

# 29. Candidate Eligibility

A provider SHALL enter candidate selection only if applicable minimum conditions pass.

Examples:

```text
qualification valid

capability valid

jurisdiction eligible

required licence valid

insurance valid

route coverage valid

equipment capability valid

capacity potentially available

customer framework eligibility satisfied
```

---

# 30. Eligibility ≠ Suitability

This remains:

```text
provider legally eligible
    !=
provider suitable for this movement
```

Suitability may depend on:

```text
service

route

cargo

equipment

capacity

time

performance

risk

customer policy
```

---

# 31. Suitability ≠ Selection

Likewise:

```text
provider suitable
    !=
provider selected
```

Commercial and strategic factors may still determine selection.

---

# 32. Selection Shall Be Explainable

The system SHALL be able to explain:

```text
Why was Provider A selected?

Why was Provider B rejected?

Was Provider C disqualified?

Did customer policy force Provider D?

Was Provider A cheapest?

Was Provider A selected for capacity?

Was provider selection manually overridden?
```

---

# 33. No Opaque “AI Picked It”

This SHALL be prohibited:

```text
selected_provider = AI
```

without explainable underlying decision inputs and applicable human/policy authority.

---

# 34. Provider Selection Criteria

Possible criteria include:

```text
qualification

capacity

price

service availability

route coverage

mode capability

equipment suitability

on-time performance

damage performance

claims history

data-quality performance

sustainability requirements

security capability

cold-chain capability

DG capability

customer preference

contract commitment

relationship policy

risk

lead time
```

---

# 35. Selection Criteria Are Contextual

No universal provider score SHALL govern every movement.

Example:

```text
Provider A:
best price

Provider B:
best cold-chain capability

Provider C:
best project-cargo capability
```

Each service has a different decision context.

---

# 36. Customer Policy Can Restrict Candidate Pool

Examples:

```text
APPROVED_CARRIERS_ONLY

NO_SUBCONTRACTING

LOCAL_PROVIDER_PREFERENCE

BEE_POLICY

SUSTAINABILITY_THRESHOLD

CUSTOMER_NOMINATED_CARRIER

EXCLUDE_PROVIDER_X
```

where lawful and contractually authorised.

---

# 37. Provider Preference ≠ Qualification

This remains:

```text
preferred
    !=
qualified
```

A preferred provider whose qualification has expired SHALL not remain eligible merely because of preference.

---

# 38. Rate ≠ Final Provider Choice

The lowest rate SHALL NOT automatically win.

Selection MAY account for:

```text
capacity certainty

service reliability

risk

cargo suitability

schedule

contract terms

customer SLA
```

---

# 39. Expected Cost

The applicable operational domain may provide:

```text
expected carrier cost

expected warehouse cost

expected accessorial cost
```

Thamani MAY use these in selection.

ERP remains authority for actual financial posting.

---

# 40. Sell Price Must Not Bias Hidden Selection

Where customer pricing is fixed independently, provider-selection decisions SHOULD remain separately auditable from:

```text
customer sell price

Thamani margin
```

especially where Thamani internal divisions are candidates.

---

# 41. Internal Provider Selection

If:

```text
Thamani Haulage
```

is selected, the selection SHALL still identify:

```text
why

under which policy

for which scope

at what internal/transfer cost basis
```

where financial governance requires it.

---

# 42. No Fake Vendor for Internal Division

THA-0004/0006 remain authoritative:

```text
Thamani Haulage Division
    !=
fake external vendor
```

Internal execution and external provider procurement SHALL remain semantically distinct.

---

# 43. ProviderAssignment

Following selection:

```text
ProviderAssignment
├── assignment_id
├── service_component_id
├── provider_org_ref
├── provider_role
├── scope
├── effective_period
├── contract/rate_ref
├── selected_from_case_ref
├── subcontracting_policy
├── status
└── external_refs[]
```

MAY establish the expected executor.

---

# 44. Selected ≠ Booked

This remains:

```text
Selected Provider
    !=
Confirmed Booking
```

TMS or the relevant operational domain owns actual booking/execution.

---

# 45. Booking Failure

If:

```text
Provider A selected
       │
       ▼
booking rejected
```

the 4PL MAY reopen provider selection.

It SHALL not pretend Provider A remains confirmed.

---

# 46. Provider Substitution

A selected provider MAY need replacement due to:

```text
capacity failure

operational disruption

qualification expiry

carrier cancellation

equipment failure

route restriction

service deterioration

customer instruction

regulatory change

commercial failure
```

---

# 47. Substitution Authority

Before substitution the 4PL SHALL evaluate:

```text
Is Thamani authorised to substitute?

Does customer approval apply?

Does contract permit substitute?

Does regulatory re-evaluation apply?

Does document reissue apply?

Does price change require approval?
```

---

# 48. Substitution ≠ Simple Foreign-Key Change

This SHALL be prohibited:

```text
shipment.provider_id = ProviderB
```

with no history.

The system SHALL preserve:

```text
Provider A assignment

replacement reason

replacement decision

Provider B assignment

effective time
```

---

# 49. Replanning

Provider substitution MAY trigger:

```text
TMS transport-plan revision

booking change

route change

Regulations re-evaluation

Trade Docs document revision

customer ETA change

commercial cost change
```

The 4PL SHALL coordinate these consequences.

---

# 50. Orchestration

The 4PL orchestration layer SHALL coordinate processes across authoritative domains.

Example:

```text
Customer Requirement
       │
       ▼
Select Carrier
       │
       ▼
TMS Booking
       │
       ▼
Regulations Assessment
       │
       ▼
Trade Docs Preparation
       │
       ▼
Warehouse Release
       │
       ▼
TMS Movement
       │
       ▼
Delivery
       │
       ▼
ERP Settlement
```

---

# 51. Orchestration ≠ System of Record

A workflow engine coordinating these steps MAY store:

```text
workflow state

step state

correlation

retry state

compensation state
```

It SHALL NOT become authoritative for:

```text
Shipment

CustomsCase

Invoice

TradeDocument

RegulatoryDecision
```

---

# 52. Process Instance

Thamani MAY maintain a durable:

```text
OrchestrationInstance
├── orchestration_id
├── service_order_id
├── workflow_definition_ref
├── workflow_version
├── current_phase
├── participating_domain_refs[]
├── pending_actions[]
├── exception_refs[]
├── correlation_id
├── started_at
├── completed_at?
└── status
```

---

# 53. Workflow Definition Version

A running 4PL workflow SHALL identify:

```text
workflow version
```

so later process changes do not silently rewrite historical execution logic.

---

# 54. Orchestration Uses Commands and Events

Preferred pattern:

```text
Thamani
     │
     │ command
     ▼
Owning Domain
     │
     │ event
     ▼
Thamani Orchestrator
```

not:

```text
Thamani
     │
     ▼
updates every domain database
```

---

# 55. No Distributed Database Transaction

The 4PL SHALL NOT require one ACID transaction spanning:

```text
TMS

WMS

Trade Docs

ERP

Regulations

external provider
```

Use:

```text
local transactions

durable orchestration

idempotency

events

reconciliation

compensation
```

instead.

---

# 56. Partial Progress Is Normal

Example:

```text
Carrier selected              YES

TMS booking                   YES

Warehouse appointment         YES

Customs documents             PENDING

Regulatory assessment         YES
```

The 4PL SHALL represent this accurately.

---

# 57. Compensation

If downstream execution fails, possible compensations MAY include:

```text
cancel carrier booking

cancel warehouse reservation

release reserved capacity

revoke instruction

request document correction

notify customer

restart provider selection
```

Compensation SHALL use owning-domain operations.

---

# 58. Workflow Retry

Retries SHALL be:

```text
idempotent

bounded

observable

domain-aware
```

Retry SHALL not accidentally create:

```text
two bookings

two shipments

two Customs declarations

two invoices
```

---

# 59. Long-Running Process

4PL orchestration SHALL assume processes may run for:

```text
hours

days

weeks

months
```

especially in project, cross-border and maritime logistics.

Therefore in-memory-only orchestration SHALL not be sufficient.

---

# 60. Human Tasks

A 4PL workflow MAY pause for:

```text
customer approval

operations review

document review

rate approval

provider negotiation

exception decision

compliance review
```

Human intervention SHALL be first-class.

---

# 61. Human Task ≠ Manual Chaos

Manual steps SHOULD remain:

```text
assigned

authorised

deadline-bound

audited

correlated to workflow
```

---

# 62. Control Tower

The Thamani Control Tower SHALL be:

> **A cross-domain visibility, coordination, decision-support and workflow-management layer over authoritative operational systems.**

---

# 63. Control Tower Is Not Database of Truth

This SHALL remain:

```text
Control Tower
    !=
Universal System of Record
```

---

# 64. Control Tower Projection

The Control Tower MAY project:

```text
orders

service orders

LogisticsShipments

Consignments

movements

warehouse inventory

customs cases

regulatory blocks

documents

provider performance

costs

invoices

exceptions

predictions
```

into one view.

---

# 65. Control Tower Architecture

```text
                AUTHORITATIVE DOMAINS
                         │
      ┌──────────────────┼──────────────────┐
      ▼                  ▼                  ▼
     TMS            Warehouse           Trade Docs
      │                  │                  │
      ├──────────┬───────┴───────┬──────────┤
      ▼          ▼               ▼          ▼
Regulations     ERP            Pulse      Providers
      │          │               │          │
      └──────────┴───────┬───────┴──────────┘
                         ▼
                 EVENT / API LAYER
                         │
                         ▼
                  CONTROL TOWER
                         │
           ┌─────────────┼─────────────┐
           ▼             ▼             ▼
        Customer      Operations    Management
         Views          Views        Analytics
```

---

# 66. Control Tower Read Model

A read model MAY materialise data required for:

```text
fast dashboards

search

exception queues

customer visibility

KPIs

operational planning
```

It SHALL retain source lineage.

---

# 67. Every Projected Fact Needs Provenance

Where materially important, the Control Tower SHOULD know:

```text
source domain

source object

source version

observed/occurred time

projection time

freshness
```

---

# 68. Freshness

Control Tower facts SHOULD distinguish:

```text
CURRENT

STALE

LAST_KNOWN

UNKNOWN

RECONCILIATION_REQUIRED
```

where stale data affects operations.

---

# 69. Unknown ≠ Normal

This SHALL remain:

```text
provider status unavailable
    !=
provider operating normally
```

and:

```text
tracking unavailable
    !=
shipment on time
```

---

# 70. Customer-Friendly Projection

A customer may see:

```text
IN TRANSIT

CUSTOMS PROCESSING

AT RISK

DELIVERED
```

while internal domains contain more granular facts.

These statuses SHALL remain projections.

---

# 71. Exception-Centric Operations

The control tower SHOULD emphasise:

```text
What requires attention?
```

rather than requiring operators to inspect every healthy shipment.

---

# 72. Exception

A 4PL exception MAY be triggered by:

```text
delay

provider rejection

capacity failure

customs hold

missing document

regulatory block

warehouse shortage

temperature excursion

route disruption

invoice discrepancy

data gap

customer change
```

---

# 73. Exception ≠ Source Event

This remains:

```text
TMS MovementDelayed event
        │
        ▼
4PL Exception
```

The exception is a workflow/management object responding to the underlying fact.

---

# 74. FourPLException

Conceptually:

```text
FourPLException
├── exception_id
├── service_order_ref
├── source_domain
├── source_fact_ref
├── exception_type
├── severity
├── customer_impact
├── SLA_impact
├── owner
├── opened_at
├── due_at?
├── recommended_actions[]
├── resolution
├── resolved_at?
└── audit
```

---

# 75. Exception Ownership

An operational exception MAY be owned for resolution by Thamani while the source domain remains elsewhere.

Example:

```text
Source:
Customs Hold
    → Trade Docs

Customer management:
4PL Exception
    → Thamani
```

---

# 76. Exception Resolution ≠ Source-State Mutation

Closing the Thamani exception SHALL NOT automatically clear:

```text
CUSTOMS_HOLD
```

in Trade Docs.

The source domain must first change authoritatively.

---

# 77. Escalation

Exceptions SHOULD support escalation by:

```text
severity

SLA risk

financial exposure

customer importance

safety

regulatory risk

duration
```

---

# 78. Incident ≠ Exception

This remains:

```text
Exception
    service deviation

Incident
    operational/safety/security occurrence
```

An incident may create one or several exceptions.

---

# 79. SLA Management

4PL engagements MAY include composite SLA measurements such as:

```text
OTIF

pickup performance

delivery performance

customs-cycle time

warehouse turnaround

inventory accuracy

exception response

document completeness

provider acceptance time
```

---

# 80. SLA Metrics Need Defined Formulae

This SHALL be prohibited:

```text
provider_score = 94%
```

without:

```text
metric definition

time window

scope

numerator

denominator

exclusions

source facts
```

---

# 81. Provider Performance

Thamani MAY maintain provider-performance projections derived from authoritative facts.

Potential metrics include:

```text
on-time pickup

on-time delivery

booking acceptance

cancellation

damage

claims

data timeliness

tracking quality

invoice accuracy

exception response

capacity reliability
```

---

# 82. Performance ≠ Qualification

This remains:

```text
Provider Qualified
    !=
Provider Performing Well
```

Poor performance MAY affect selection policy.

It SHALL not automatically invent regulatory disqualification.

---

# 83. Qualification Expiry

If a mandatory qualification expires:

```text
provider selection eligibility
```

SHALL be re-evaluated independently of historical performance.

---

# 84. Provider Scorecard

A scorecard MAY aggregate multiple metrics.

It SHALL remain:

```text
decision support
```

unless the customer/provider policy explicitly assigns threshold consequences.

---

# 85. Customer-Specific Performance

Provider performance MAY legitimately differ by:

```text
customer

lane

mode

cargo

facility

time period
```

A universal provider score MAY obscure meaningful context.

---

# 86. Lane-Specific Selection

Provider A may perform well:

```text
Kampala → Nairobi
```

and poorly:

```text
Durban → Lusaka
```

Selection SHALL support contextual history.

---

# 87. Capability-Specific Selection

Likewise:

```text
Provider A
    excellent reefer carrier

Provider A
    not qualified for dangerous goods
```

The decision model SHALL preserve scope.

---

# 88. Capacity

Provider selection SHALL eventually integrate actual or declared:

```text
capacity

capacity availability

booking availability

warehouse availability
```

without treating static provider qualification as capacity proof.

---

# 89. Capacity Claim ≠ Capacity Reservation

This remains:

```text
provider says capacity available
    !=
capacity reserved
```

The owning operational domain records reservation/booking.

---

# 90. Provider Network

The 4PL SHALL support both:

```text
DIRECT PROVIDER
```

and:

```text
PROVIDER → SUBCONTRACTOR
```

execution where contractually permitted.

---

# 91. Subcontracting Is Explicit

This SHALL be prohibited:

```text
selected Provider A

actual Carrier B

but Baobab records only Provider A
```

when actual execution is materially relevant.

---

# 92. Contractual Provider vs Actual Executor

The architecture SHALL distinguish:

```text
Contracted Provider

Actual Executor

Carrier

Warehouse Operator

Broker
```

where applicable.

---

# 93. Subcontracting Policy

Customer/provider policy MAY specify:

```text
NO_SUBCONTRACTING

PRE_APPROVED_ONLY

DISCLOSURE_REQUIRED

UNRESTRICTED_WITHIN_QUALIFIED_NETWORK
```

or other governed rules.

---

# 94. Actual Executor Qualification

Where policy or law requires it:

```text
actual subcontractor
```

SHALL itself pass qualification.

Qualification SHALL not be inherited merely from the prime provider.

---

# 95. Data Visibility Across Providers

Provider A SHALL see only information required to execute its scope.

It SHALL not automatically gain access to:

```text
Provider B rates

customer margin

full customer supply chain

unrelated shipments

other providers' contracts
```

---

# 96. Customer Visibility

Customers MAY receive broader control-tower visibility than individual providers.

Access SHALL remain policy-driven.

---

# 97. Provider Collaboration

Thamani MAY provide controlled workflows for:

```text
accepting assignments

providing booking references

updating capacity

submitting documents

reporting exceptions

confirming milestones
```

without giving external providers direct access to internal engine databases.

---

# 98. Provider Portal ≠ TMS

A provider-facing Thamani interface SHALL be an experience/application layer.

TMS remains execution authority.

---

# 99. Event-Driven Visibility

Control Tower projections SHOULD consume canonical events where available.

Examples:

```text
logistics.movement.departed

documents.trade-document.issued

customs.declaration.submitted

finance.invoice.posted
```

according to Shared event governance.

---

# 100. Polling Is a Compatibility Mechanism

Where external providers cannot emit events:

```text
polling

scheduled reconciliation

file exchange

manual confirmation
```

MAY be used through adapters.

These SHALL not redefine canonical event semantics.

---

# 101. Cross-Domain Correlation

A 4PL workflow SHOULD be traceable through:

```text
customer_ref

4pl_service_order_id

service_component_id

logistics_shipment_id

consignment_id

provider_assignment_id

customs_case_id

trade_document_id

financial_reference

correlation_id
```

---

# 102. No Mega ID

This SHALL be rejected:

```text
one universal logistics_transaction_id
```

as replacement for all domain identity.

Correlation joins identities.

It does not erase them.

---

# 103. Provider Selection Audit

The audit trail SHOULD capture:

```text
candidate set

eligibility decisions

policy applied

rate inputs

performance inputs

risk inputs

manual overrides

selected provider

decision actor

decision timestamp
```

---

# 104. Manual Override

An authorised person MAY override an automated recommendation where policy permits.

The override SHALL preserve:

```text
original recommendation

override actor

reason

new selection

time
```

---

# 105. Separation of Duties

Depending on customer policy:

```text
provider recommender
    !=
provider approver
```

and:

```text
rate negotiator
    !=
final commercial approver
```

MAY be required.

---

# 106. Automated Provider Selection

Automation MAY select a provider without human review only where:

```text
customer mandate allows

policy allows

qualification valid

selection criteria deterministic

financial authority within limits

risk threshold satisfied
```

---

# 107. AI Role

Pulse/AI MAY assist by:

```text
predicting provider reliability

forecasting delays

recommending provider candidates

detecting anomalous rates

predicting capacity risk

suggesting alternative routes

summarising exceptions

identifying recurring root causes
```

---

# 108. AI Is Advisory Unless Explicitly Delegated

This remains:

```text
AI recommendation
    !=
provider assignment
```

unless a governed automation policy explicitly authorises automatic selection.

---

# 109. AI Shall Not Override Hard Gates

AI SHALL NOT override:

```text
expired qualification

regulatory prohibition

customer exclusion

mandatory licence failure

capacity unavailability

security restriction
```

---

# 110. Explainability

Automated recommendations SHOULD provide:

```text
candidate providers

material selection factors

constraints

risk indicators

reason for recommendation
```

rather than only a score.

---

# 111. Control Tower Intelligence

Pulse MAY generate:

```text
ETA risk

capacity risk

cost anomaly

provider risk

route risk

warehouse congestion

customs-delay prediction
```

as non-authoritative intelligence.

---

# 112. Prediction ≠ Operational Fact

This remains:

```text
Pulse predicts delay
    !=
TMS movement delayed
```

---

# 113. Predictive Exception

Thamani MAY open:

```text
AT_RISK
```

exceptions from predictive intelligence.

It SHALL distinguish these from actual exceptions.

---

# 114. Scenario Analysis

4PL operators MAY compare:

```text
Provider A + Route X

Provider B + Route Y

Air vs Sea

Direct vs Consolidated

Internal vs External Carrier
```

before committing execution.

Scenario objects SHALL not become operational authority until selected and committed.

---

# 115. Scenario ≠ Plan

This remains:

```text
Candidate Scenario
    !=
TMS Active TransportPlan
```

---

# 116. Provider Substitution During Execution

If a provider fails mid-process, the 4PL MAY coordinate:

```text
remaining transport

recovery carrier

transload

warehouse diversion

document correction

customer communication
```

while preserving historical executor lineage.

---

# 117. Mid-Execution Provider Change

This SHALL NOT rewrite history so the replacement appears to have executed prior legs.

Example:

```text
Leg 1:
Carrier A

Leg 2:
Carrier B
```

must remain reconstructable.

---

# 118. Network Disruption

A major disruption MAY require orchestration across many customer service orders simultaneously.

Examples:

```text
port closure

border closure

carrier failure

warehouse outage

weather

strike

regulatory change
```

---

# 119. Disruption Case

Thamani MAY maintain:

```text
NetworkDisruption
├── disruption_id
├── disruption_type
├── affected_geography
├── affected_providers[]
├── affected_service_orders[]
├── affected_shipments[]
├── started_at
├── status
├── response_plan
└── resolution
```

as a 4PL management object.

---

# 120. Disruption ≠ Source Authority

Weather, port closure or border restriction SHALL retain its authoritative external/domain source.

Thamani's NetworkDisruption is the management projection.

---

# 121. Bulk Replanning

Network disruption MAY require TMS to replan many LogisticsShipments.

4PL SHALL coordinate customer priorities and business decisions.

TMS owns individual transport-plan execution.

---

# 122. Customer Priority

A customer MAY declare:

```text
critical orders

critical products

production-line stops

high-priority deliveries
```

Thamani MAY use this in disruption prioritisation subject to contract.

---

# 123. Priority ≠ Regulatory Exemption

This remains:

```text
Customer says CRITICAL
    !=
regulatory restriction waived
```

---

# 124. Inventory Visibility

4PL MAY incorporate:

```text
warehouse physical position

in-transit inventory

commercial availability

customer-owned inventory
```

into the control tower.

Authority remains distributed according to THA-0010/BCP-013.

---

# 125. Control Tower Inventory ≠ Inventory Ledger

This remains:

```text
Control Tower Inventory View
    !=
ERP Financial Inventory

Control Tower Inventory View
    !=
Warehouse Physical Inventory
```

---

# 126. Financial Visibility

Control Tower MAY display:

```text
expected cost

committed cost

provider invoice status

customer invoice status

variance
```

from authoritative commercial/ERP sources.

---

# 127. Control Tower ≠ Ledger

It SHALL not post accounting entries itself.

---

# 128. Freight Audit / Invoice Verification

A 4PL MAY provide:

```text
freight audit

invoice matching

charge verification

rate validation

exception identification
```

as a managed service.

---

# 129. Invoice Verification ≠ Accounting Posting

Thamani MAY determine:

```text
provider invoice matches contracted operational charges
```

while ERP remains authoritative for:

```text
AP approval/posting/payment
```

---

# 130. Three-Way / Multi-Way Matching

Provider cost verification MAY compare:

```text
contract/rate

booking

movement execution

accessorial events

provider invoice
```

before ERP settlement.

---

# 131. Accessorial Charges

Charges such as:

```text
demurrage

detention

waiting

storage

redelivery

special handling

standby
```

SHOULD reference the operational event/evidence that triggered them.

---

# 132. Cost Dispute

A charge dispute MAY become a Thamani commercial workflow without rewriting the operational event.

---

# 133. Sustainability

Where required, provider selection MAY consider:

```text
emissions data

route efficiency

modal shift

customer sustainability policy
```

provided methodology and source are explicit.

---

# 134. Sustainability Score ≠ Operational Qualification

An environmental preference SHALL not override mandatory safety/regulatory eligibility.

---

# 135. Provider Data Quality

4PL provider-performance evaluation SHOULD also consider:

```text
event timeliness

event completeness

tracking accuracy

document completeness

reference quality
```

because poor information quality directly degrades control-tower effectiveness.

---

# 136. No Data ≠ Good Performance

This SHALL remain:

```text
provider sent no exception events
    !=
provider had no exceptions
```

Data completeness SHALL be measurable independently.

---

# 137. Customer KPI

Customer performance MAY be calculated across multiple providers.

Example:

```text
Customer OTIF
```

may depend on:

```text
carrier

warehouse

customs

last mile
```

No single provider should automatically own the entire KPI result.

---

# 138. Root-Cause Attribution

Thamani SHOULD distinguish:

```text
service failure occurred
```

from:

```text
provider responsible
```

Root-cause assessment may require evidence.

---

# 139. Blame Shall Not Be Inferred From Last Touch

This is prohibited:

```text
late delivery
    therefore
last-mile carrier responsible
```

without causal evidence.

---

# 140. Orchestration Policy

Thamani SHOULD version:

```text
provider selection policy

exception policy

substitution policy

approval thresholds

escalation policy

customer SLA policy
```

so historical decisions can be reproduced.

---

# 141. Policy Change Is Temporal

A new provider-selection policy SHALL NOT retroactively change why Provider A was selected six months earlier.

---

# 142. Provider Framework Agreements

Thamani MAY maintain commercial frameworks with providers containing:

```text
eligible services

rates

volume commitments

capacity commitments

priority rights

notice periods

performance clauses

subcontracting rules
```

These remain distinct from actual provider assignments.

---

# 143. Framework ≠ Assignment

This remains:

```text
Provider Framework Contract
    !=
Movement Booking
```

---

# 144. Spot Sourcing

Where contracted:

```text
spot RFQ

spot quote

spot selection
```

MAY be initiated by the 4PL.

THA-0006's separation between customer sell-side pricing and provider buy-side cost SHALL remain.

---

# 145. Buy-Side ≠ Sell-Side

This remains:

```text
Provider Quote
    !=
Customer Quote
```

The 4PL may procure one while selling another.

---

# 146. Provider Switching and Customer Price

A provider substitution does not automatically change the customer price.

Contract terms determine whether cost differences:

```text
remain Thamani risk

pass through

require variation order
```

---

# 147. Customer Variation

If substitution requires a material service/price change:

```text
CustomerVariation
```

or equivalent commercial approval SHALL precede the change where contractually required.

---

# 148. Operational Change ≠ Commercial Change Automatically

This remains:

```text
carrier changed
    !=
customer contract changed
```

---

# 149. Customer Data Ownership

The 4PL model SHALL not imply that Thamani owns all customer supply-chain master data.

Customer-supplied:

```text
orders

forecasts

inventory information

production schedules

delivery priorities
```

remain governed by applicable data/contract authority.

---

# 150. Master Data References

Thamani SHOULD reference:

```text
canonical organisations

locations

products

service references
```

rather than create uncontrolled copies.

---

# 151. Provider Master

Control Plane owns canonical organisation identity.

Thamani owns:

```text
relationship

qualification

performance

rates

contracts

operating policy
```

specific to its provider relationship.

---

# 152. Provider Deactivation

If Thamani suspends a provider:

```text
Thamani qualification
```

changes.

The provider's canonical organisation identity remains.

---

# 153. Platform Provider vs Business Provider Deactivation

Likewise:

```text
Control Plane engine provider suspended
```

is unrelated to:

```text
Road Carrier ABC suspended
```

unless an explicit dependency exists.

---

# 154. Control Plane Failover

Technical engine-instance failover remains a Control Plane concern.

Thamani SHALL not interpret:

```text
baobab-tms instance switched
```

as:

```text
physical carrier changed
```

---

# 155. Two Different Failovers

This distinction is crucial:

```text
TECHNICAL FAILOVER
baobab-tms instance A
    ↓
baobab-tms instance B

BUSINESS SUBSTITUTION
Carrier A
    ↓
Carrier B
```

They belong to different architectural layers.

---

# 156. Business Provider Health

A physical provider MAY have business-health indicators:

```text
capacity crisis

operational suspension

strike

licence issue

financial risk

network outage
```

These SHALL remain separate from Baobab engine health.

---

# 157. Control Tower Command Boundary

Operators MAY initiate commands such as:

```text
request provider substitution

request shipment hold

request document review

request customer approval
```

from the Control Tower.

The authoritative engine/domain performs the mutation.

---

# 158. Optimistic UI ≠ Domain Success

This remains:

```text
operator clicked "reroute"
    !=
TMS route changed
```

Authoritative confirmation is required.

---

# 159. Workflow State ≠ Business State

Example:

```text
Orchestration:
WAITING_FOR_CUSTOMER_APPROVAL

TMS:
BOOKING_CONFIRMED
```

Both can simultaneously be true.

---

# 160. Security

4PL operations are highly privileged because they may expose:

```text
customer networks

provider rates

shipment details

route data

commercial margins

documents

invoices
```

Access SHALL follow least privilege.

---

# 161. Commercial Data Segregation

External Provider A SHALL never automatically see:

```text
Provider B bid

Provider B contract

Thamani margin

customer sell price
```

---

# 162. Internal Separation

Within Thamani:

```text
operations

procurement

commercial

finance

customer service
```

MAY require different views of the same service order.

---

# 163. Approval Authorities

High-value provider selection or substitutions MAY require delegated financial/operational approval according to authority limits.

---

# 164. IAM Boundary

IAM owns:

```text
authentication

sessions

MFA

workload identity
```

Thamani owns:

```text
may approve provider selection

may override sourcing recommendation

may view buy rates

may approve emergency substitution
```

domain authorisation.

---

# 165. Audit

Material 4PL decisions SHALL be auditable.

At minimum:

```text
service order created

candidate providers evaluated

provider selected

manual override

provider assigned

provider substituted

customer approval

workflow transition

exception opened

exception escalated

exception closed

commercial variation

provider score updated
```

---

# 166. Historical Reproducibility

The platform SHOULD eventually answer:

```text
Why did Thamani select Provider A?

Which providers were eligible?

Which were disqualified?

Which rates were compared?

Which customer policy applied?

Who approved the selection?

Which TMS plan resulted?

Was the provider later substituted?

Why?

Which operational exceptions occurred?

What customer SLA was affected?

What actual cost resulted?
```

---

# 167. No Rewriting Selection History

If Provider B later becomes preferred:

```text
historical assignment to Provider A
```

SHALL not be rewritten.

---

# 168. Control Tower Search

Search MAY index:

```text
customer

service order

shipment

consignment

provider

document

customs case

invoice

exception
```

but search remains a projection.

---

# 169. Cross-Repository Authority Matrix

| Concern | Authority |
|---|---|
| 4PL customer relationship | Thamani |
| 4PL mandate | Thamani |
| 4PL service order | Thamani |
| Service composition | Thamani |
| Logistics provider qualification | Thamani under THA-0004 |
| Logistics provider selection | Thamani |
| Provider assignment | Thamani |
| Customer approval | Thamani/customer workflow |
| Capability provider resolution | Control Plane |
| Platform engine health/failover | Control Plane |
| LogisticsShipment | TMS |
| Consignment | TMS |
| TransportPlan | TMS |
| TransportMovement | TMS |
| Carrier booking | TMS |
| Warehouse physical execution | bound warehouse provider |
| TradeDocument | Trade Docs |
| CustomsCase | Trade Docs |
| RegulatoryDecision | Regulations |
| Financial posting | ERP |
| Authentication | IAM |
| Predictive recommendation | Pulse |
| Control-tower projection | Thamani |

---

# 170. Example — Simple 4PL Flow

```text
Customer
   │
   ▼
Thamani 4PL Service Order
   │
   ▼
Provider Selection
   │
   ├── Carrier A
   ├── Carrier B
   └── Thamani Haulage
   │
   ▼
Carrier B selected
   │
   ▼
TMS LogisticsShipment
   │
   ▼
Carrier Booking
   │
   ▼
Movement
   │
   ▼
Delivery
   │
   ▼
ERP Settlement
```

---

# 171. Example — Multi-Provider Flow

```text
Customer Requirement
       │
       ▼
Thamani 4PL
       │
       ├── Warehouse A
       │
       ├── Road Carrier B
       │
       ├── Customs Broker C
       │
       ├── Shipping Line D
       │
       ├── Warehouse E
       │
       └── Last-Mile Carrier F
       │
       ▼
One customer control-tower view
```

---

# 172. Example — Internal + External Composition

```text
Thamani 4PL
      │
      ├── Thamani Haulage Division
      ├── External Warehouse
      ├── External Shipping Line
      └── External Customs Broker
```

Internal division and external provider SHALL be represented honestly.

---

# 173. Example — Provider Failure

```text
Carrier A selected
       │
       ▼
Booking confirmed
       │
       ▼
Carrier cancels
       │
       ▼
4PL Exception
       │
       ▼
Selection reopened
       │
       ├── Carrier B
       └── Carrier C
       │
       ▼
Carrier B selected
       │
       ▼
TMS plan revised
       │
       ▼
Customer ETA updated
```

Historical Carrier A involvement remains.

---

# 174. Example — Control Tower Does Not Own Customs

```text
Trade Docs:
CUSTOMS HOLD
      │
      ▼
Thamani Control Tower:
Cross-Border Shipment AT RISK
      │
      ▼
Operator:
coordinates customer/broker response
```

Closing the Thamani exception does not itself release Customs.

---

# 175. Example — Engine Failover Is Invisible to 4PL Logic

```text
Control Plane:
baobab-tms instance 1 unhealthy
      │
      ▼
baobab-tms instance 2 resolved
```

The Thamani service order and physical carrier remain unchanged.

---

# 176. Example — Provider Selection vs Platform Resolution

```text
Business layer:

ABC Haulage
selected to carry cargo

Technical layer:

logistics capability
resolved to baobab-tms
```

These SHALL remain independent.

---

# 177. Example — Project Logistics

THA-0012 may create:

```text
Project Logistics Project
```

whose actual services are orchestrated by the 4PL control tower across:

```text
engineering provider

heavy-haul provider

port

shipping line

escort provider

warehouse

crane contractor
```

Project Logistics owns project-specific service semantics.

4PL supplies broader provider/network orchestration.

---

# 178. Project Logistics ≠ 4PL

This remains:

```text
Project Logistics
    !=
4PL
```

A project-logistics job may be managed without a formal 4PL customer mandate.

A 4PL mandate may govern ordinary supply-chain flows with no project cargo.

---

# 179. 4PL as Lead Logistics Orchestrator

Where the customer mandate grants appropriate authority:

```text
Thamani
```

acts as the customer's operational lead logistics orchestrator.

It SHALL still preserve:

```text
customer authority

provider authority

regulatory authority

engine authority

financial authority
```

at their correct boundaries.

---

# 180. Control Tower Scope

The control tower SHOULD eventually support four operational horizons:

```text
MONITOR
    what is happening?

ALERT
    what requires attention?

DECIDE
    what options exist?

ORCHESTRATE
    what authorised action should occur?
```

---

# 181. Monitor ≠ Decide

This remains:

```text
visibility
    !=
authority to mutate
```

---

# 182. Recommendation ≠ Decision

This remains:

```text
recommended carrier
    !=
selected carrier
```

---

# 183. Decision ≠ Execution

This remains:

```text
carrier selected
    !=
carrier booked
```

---

# 184. Execution ≠ Settlement

This remains:

```text
transport delivered
    !=
provider paid
```

---

# 185. Implementation Gates

Implementation SHOULD proceed in the following sequence.

## THA-4PL-00 — Cross-Repository Audit

Audit:

```text
Thamani

Control Plane

TMS

Trade Docs

ERP

Regulations

Shared

Pulse
```

for existing orchestration/provider-selection assumptions.

---

## THA-4PL-01 — 4PL Mandate

Implement:

```text
FourPLMandate

authority limits

scope

selection policy

substitution authority

customer approvals
```

---

## THA-4PL-02 — FourPL Service Order

Implement the customer-facing orchestration aggregate without embedding TMS/WMS/ERP state.

---

## THA-4PL-03 — Service Decomposition

Implement:

```text
ServiceComponent
```

with capability/provider requirements.

---

## THA-4PL-04 — Provider Qualification Integration

Consume THA-0004 qualification decisions.

No duplicate provider qualification engine.

---

## THA-4PL-05 — Provider Selection

Implement:

```text
ProviderSelectionCase

candidate eligibility

selection policy

decision reason

manual override
```

---

## THA-4PL-06 — Internal / External Provider Parity

Prove that:

```text
Thamani division

external provider
```

can both be candidate executors without fake-vendor modelling.

---

## THA-4PL-07 — TMS Assignment Flow

Prove:

```text
Provider selected
→ TMS booking
→ execution
```

without provider selection becoming TMS authority.

---

## THA-4PL-08 — Warehouse Composition

Prove one service order with:

```text
transport
+
warehouse
```

across separately authoritative providers.

---

## THA-4PL-09 — Trade Docs / Customs Composition

Add:

```text
documents

Customs cases

regulatory blocks
```

to the orchestration workflow without copying their state.

---

## THA-4PL-10 — Durable Orchestration

Implement:

```text
workflow state

idempotency

retry

human tasks

compensation

partial progress
```

for long-running logistics flows.

---

## THA-4PL-11 — Control Tower Projection

Build a read model with:

```text
source lineage

freshness

cross-domain correlation

exception projection
```

---

## THA-4PL-12 — Exception Management

Implement:

```text
FourPLException

ownership

severity

escalation

resolution
```

without changing source-domain facts.

---

## THA-4PL-13 — Provider Substitution

Prove:

```text
selected
→ booked
→ provider fails
→ substitution
→ TMS replan
→ customer notification
```

with complete history.

---

## THA-4PL-14 — Provider Performance

Implement contextual performance metrics derived from authoritative facts.

---

## THA-4PL-15 — Commercial / Freight Audit

Reconcile:

```text
rate

booking

execution

provider invoice

ERP posting
```

without turning control tower into ledger.

---

## THA-4PL-16 — Pulse Decision Support

Add non-authoritative:

```text
delay prediction

provider recommendation

capacity risk

cost anomaly
```

with explainability.

---

## THA-4PL-17 — Network Disruption

Prove multi-order disruption management for:

```text
provider outage

port closure

border closure

network disruption
```

---

## THA-4PL-18 — Customer Portal

Expose appropriately scoped:

```text
status

exceptions

SLA

documents

tracking

provider/service visibility
```

without exposing internal commercial secrets.

---

## THA-4PL-19 — Production Hardening

Verify:

```text
tenant isolation

provider-data isolation

authority limits

selection explainability

manual overrides

idempotency

workflow recovery

duplicate-event handling

projection rebuild

stale data

provider substitution

engine failover

customer approval

audit

security

DR
```

---

# 186. Alternatives Considered

## Alternative A — Build a New 4PL Engine

**Rejected at this stage.**

The 4PL is primarily a Thamani business/orchestration domain over reusable platform capabilities.

A future dedicated orchestration capability could be extracted only if it becomes genuinely reusable across tenants.

---

## Alternative B — Make TMS the 4PL Control Tower

**Rejected.**

TMS is authoritative for transport execution, not customer-wide warehousing, customs, financial and provider orchestration.

---

## Alternative C — Make Control Tower the Universal SOR

**Rejected.**

It would duplicate every underlying domain.

---

## Alternative D — Let Control Plane Select Physical Carriers

**Rejected.**

Control Plane resolves platform capability providers, not Thamani's physical business counterparties.

---

## Alternative E — Let Thamani Select Engine Instances

**Rejected.**

Technical provider resolution remains Control Plane authority.

---

## Alternative F — Lowest Price Always Wins

**Rejected.**

Suitability, capacity, qualification, risk and customer policy are material.

---

## Alternative G — Automatically Prefer Internal Thamani Divisions

**Rejected as universal policy.**

The applicable 4PL mandate governs provider-selection preference.

---

## Alternative H — One Global Provider Score

**Rejected.**

Provider performance is context-sensitive.

---

## Alternative I — Rewrite Provider Assignment on Substitution

**Rejected.**

Historical assignment/execution lineage must survive.

---

## Alternative J — Close Source Exceptions From the Control Tower

**Rejected.**

The source authoritative domain must change first.

---

## Alternative K — Use AI as Unconstrained Provider Selector

**Rejected.**

Mandatory eligibility, regulatory, financial and contractual gates cannot be overridden by AI recommendation.

---

## Alternative L — One Giant 4PL Transaction

**Rejected.**

Long-running, independently authoritative operations require distributed workflow semantics.

---

# 187. Architectural Invariants

The following SHALL remain non-negotiable:

```text
4PL
    != TMS

4PL
    != WMS

4PL
    != ERP

4PL
    != Control Plane

4PL
    != Provider Registry

Control Tower
    != System of Record

Control Tower Projection
    != Authoritative Fact

FourPLServiceOrder
    != LogisticsShipment

FourPLServiceOrder
    != Commerce Order

ServiceComponent
    != Capability

Capability Provider
    != Logistics Service Provider

Control Plane Provider Resolution
    != Logistics Provider Selection

Qualified
    != Eligible automatically

Eligible
    != Suitable

Suitable
    != Selected

Selected
    != Assigned

Assigned
    != Booked

Booked
    != Executed

Executed
    != Settled

Preferred Provider
    != Qualified Provider

Internal Thamani Division
    != External Vendor

Internal Provider
    != Automatically Preferred Provider

Provider Selection
    must remain explainable

Manual Override
    must remain auditable

AI Recommendation
    != Selection

Prediction
    != Operational Fact

Scenario
    != Active Plan

Substitution
    != History Rewrite

Technical Engine Failover
    != Physical Provider Substitution

Provider Performance
    != Qualification

Provider Qualification
    != Capacity

Capacity Available
    != Capacity Reserved

Prime Provider
    != Actual Executor automatically

Exception
    != Source Event

Closing 4PL Exception
    != Clearing Source Condition

SLA Result
    != Regulatory Compliance

Control Tower Inventory
    != Financial Inventory

Control Tower Cost
    != Accounting Ledger

Workflow State
    != Domain State

Customer Priority
    != Regulatory Exemption

Correlation ID
    != Universal Domain Identity

Provider Data Missing
    != Provider Performing Normally

No Exception Reported
    != No Exception Occurred

Historical provider selection
    must remain reconstructable

Historical orchestration policy
    must remain versioned
```

---

# 188. Final Architecture

```text
                             CUSTOMER
                                │
                                ▼
                         4PL MANDATE
                                │
                                ▼
                     THAMANI 4PL SERVICE
                                │
                     Service Decomposition
                                │
       ┌────────────────────────┼────────────────────────┐
       ▼                        ▼                        ▼
 Provider Selection        Orchestration             Control Tower
       │                        │                        │
       ▼                        ▼                        │
Business Providers         Domain Commands             │
       │                        │                        │
 ┌─────┼─────┐       ┌─────────┼──────────────┐         │
 ▼     ▼     ▼       ▼         ▼              ▼         │
Carrier W/H  Broker  TMS    Trade Docs    Regulations   │
                  │          │              │            │
                  └─────┬────┴───────┬──────┘            │
                        ▼            ▼                   │
                       ERP         Pulse                 │
                    financial    intelligence            │
                        │            │                   │
                        └─────┬──────┘                   │
                              ▼                          │
                       Authoritative Facts ──────────────┘
                              │
                              ▼
                       THAMANI PROJECTION
                              │
                   ┌──────────┼──────────┐
                   ▼          ▼          ▼
                Customer   Operations  Management
```

---

# 189. Final Decision

Thamani SHALL operate its 4PL division as a **lead logistics orchestration and control-tower capability** that manages customer outcomes across internal and external logistics providers without becoming the authoritative execution system for every participating domain.

Thamani SHALL own:

```text
4PL mandate

customer orchestration contract

service decomposition

business-provider selection

provider assignment

customer approvals

provider-substitution coordination

control-tower projection

cross-domain exception management

customer SLA orchestration

provider-performance governance

customer communication
```

Control Plane SHALL continue to own:

```text
capability grants

capability bindings

technical provider resolution

engine topology

engine health

technical failover
```

TMS SHALL own:

```text
LogisticsShipment

Consignment

TransportPlan

carrier booking

TransportMovement

transport events

physical delivery
```

Warehouse providers SHALL own:

```text
warehouse execution

physical warehouse inventory

warehouse custody
```

Trade Docs SHALL own:

```text
TradeDocuments

document versions

CustomsCase

Customs declarations

documentary workflow
```

Regulations SHALL own:

```text
regulatory applicability

regulatory decisions

requirements

restrictions
```

ERP SHALL own:

```text
financial posting

AR/AP

provider invoice

customer invoice

financial actual cost
```

Pulse MAY provide:

```text
provider recommendation

risk prediction

delay prediction

anomaly detection

network intelligence
```

but SHALL remain non-authoritative.

The defining 4PL principle is:

> **Thamani shall control the customer logistics outcome without pretending to own every operational fact underneath that outcome.**

The defining provider-selection principle is:

> **Provider selection shall begin with qualification and eligibility, incorporate contextual commercial and operational evidence, respect customer mandate, and remain explainable and auditable.**

The defining orchestration principle is:

> **A 4PL workflow coordinates independently authoritative systems through commands, events, durable workflow and reconciliation—not through shared databases or one distributed transaction.**

The defining control-tower principle is:

> **The Control Tower is a decision and coordination surface over authoritative logistics systems; it is deliberately not the universal source of truth.**

The defining provider-neutrality principle is:

> **Thamani's business decision about which carrier or logistics company performs work shall remain independent from the Control Plane's technical decision about which Baobab capability provider or engine instance serves the software operation.**

The defining resilience principle is:

> **Provider substitution shall preserve history, trigger appropriate replanning and reassessment, and never masquerade as if the replacement provider had always been the executor.**

And the defining strategic principle is:

> **Thamani's 4PL advantage shall come from its ability to assemble, govern, observe and continuously improve a logistics network—not from forcing the entire network into one software system or one asset base.**