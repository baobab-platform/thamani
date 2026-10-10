# ADR-THA-0011 — Cold Chain, Dangerous Goods and Special-Cargo Service Boundary

**Status:** Accepted — Foundational Thamani Architecture  
**Date:** 2026-10-03  
**Decision Owners:** Nabhold Group Africa / Thamani Global / Baobab Platform Architecture  
**Primary Repository:** `baobab-platform/thamani`  
**Legal Entity:** `THAMANI-GLOBAL`  
**Business Divisions:** Cold-Chain Logistics / Haulage / Shipping / Freight Forwarding / Warehousing / 3PL / Cross-Border Logistics / 4PL  
**Digital Estate:** Thamani  
**Transport Execution Authority:** bound `logistics.*` provider, initially `baobab-platform/baobab-tms`  
**Warehouse Execution Authority:** bound warehouse-execution provider  
**Trade-Document Authority:** `baobab-platform/baobab-trade-docs`  
**Regulatory Decision Authority:** `baobab-platform/baobab-regulations`  
**Financial Authority:** `baobab-platform/baobab-erp`  
**Intelligence Authority:** `baobab-platform/baobab-pulse` for non-authoritative prediction/analytics  
**Decision Class:** Cold chain / dangerous goods / special cargo / environmental control / telemetry / special handling / regulatory composition / service eligibility

---

# 1. Normative Dependencies

This ADR SHALL be interpreted consistently with:

- ADR-THA-0003 — Thamani Global Integrated Shipping, Transportation and Logistics Enterprise Domain Boundary
- ADR-THA-0004 — Canonical Logistics Counterparty, Carrier, Service-Provider Qualification and Partner Onboarding
- ADR-THA-0006 — RFQ, Logistics Quotation, Contract, Rate and Margin Architecture
- ADR-THA-0008 — Cross-Border, Customs, Corridor, Transit and Regulatory Architecture
- ADR-THA-0009 — Baobab Capability Consumption, Engine Authority and System-of-Record Boundary
- ADR-THA-0010 — Warehousing, 3PL and Inventory-Custody Service Composition Boundary
- ADR-TMS-0001 — Baobab TMS Mission, Authority, Transport Execution Boundary and Platform Capability Role
- ADR-TMS-0002 — Canonical LogisticsShipment, Consignment and Transport Execution Domain Model
- ADR-TDOC-0001 — Baobab Trade Docs Mission, Authority, Executable Trade Document and Customs Workflow Boundary
- ADR-TDOC-0002 — Canonical TradeDocument, Version, Content and Relationship Model
- ADR-BCP-013 — Canonical Inventory Ownership, Custody, Location and In-Transit Model
- ADR-REG-0017 — Regulatory Context and Applicability Resolution
- ADR-REG-0018 — Regulatory Decision and Evaluation Engine
- ADR-REG-0019 — Policy Decision Point and Enforcement Point Separation
- ADR-REG-0027 — Cross-Border Trade Regulatory Profile
- applicable provider-qualification, IAM, ERP, Shared event and evidence decisions.

---

# 2. Executive Decision

Thamani SHALL provide first-class specialised logistics services for cargo whose safe or lawful handling requires constraints beyond ordinary transport and storage.

Initial service families SHALL include:

```text
COLD_CHAIN

DANGEROUS_GOODS

PERISHABLE

PHARMACEUTICAL / HEALTHCARE

HIGH_VALUE / SECURITY_SENSITIVE

FRAGILE

LIVE / BIOLOGICAL where legally supported

CONTROLLED_ENVIRONMENT

OTHER_SPECIAL_HANDLING
```

Heavy, oversized and abnormal project cargo SHALL remain primarily within ADR-THA-0012.

These service families SHALL NOT become separate software engines.

---

# 3. Composition Principle

Specialised logistics SHALL be implemented as:

```text
CUSTOMER SPECIAL-CARGO REQUIREMENT
               │
               ▼
           THAMANI
     service composition
               │
     ┌─────────┼──────────┐
     ▼         ▼          ▼
Regulations   TMS      Trade Docs
 requirements execution  documents
     │         │          │
     └──────┬──┴────┬─────┘
            │       │
            ▼       ▼
       Warehouse   ERP
        provider  finance
            │
            ▼
       TELEMETRY /
     PHYSICAL EVIDENCE
            │
            ▼
         THAMANI
      customer service
```

---

# 4. Governing Principle

> **Special cargo shall be modelled as cargo plus independently sourced operational, contractual and regulatory requirements—not as a collection of hard-coded shipment subclasses.**

This is rejected:

```text
ColdChainShipment extends Shipment

DangerousGoodsShipment extends Shipment

PharmaShipment extends ColdChainShipment

HighValueShipment extends Shipment
```

A single LogisticsShipment may legitimately be:

```text
temperature controlled
+
dangerous goods
+
high value
+
cross-border
```

at the same time.

---

# 5. Standards Context — Dangerous Goods

Dangerous-goods transportation is inherently mode- and jurisdiction-specific.

The UN Model Regulations on the Transport of Dangerous Goods provide a common international model covering matters such as classification, dangerous-goods lists, packaging and consignment procedures, but national and modal regimes implement those principles through their own binding instruments. The current Model Regulations are Revision 24, published in 2025.

For maritime transport, the IMDG Code 2024 Edition incorporating Amendment 42-24 became mandatory from **1 January 2026** for dangerous goods carried in packaged form.

For air cargo, the 2026 IATA Dangerous Goods Regulations are the **67th edition**, effective 1 January 2026, and incorporate the applicable ICAO Technical Instructions plus IATA requirements.

UNECE ADR 2025 separately governs road carriage within its scope and covers classification, packaging, consignment, loading/unloading, crew, vehicle and documentation requirements.

Therefore:

> **The cargo does not have one universal executable dangerous-goods rule set independent of mode, route, jurisdiction and effective date.**

---

# 6. Standards Context — Cold Chain

Cold-chain requirements also vary by cargo and regime.

WHO guidance for time- and temperature-sensitive pharmaceutical products explicitly addresses safe storage and distribution while noting that local legislation and regulation continue to take precedence. WHO maintains additional technical guidance for temperature-controlled storage, vehicles, shipping containers, route qualification and monitoring systems.

IATA CEIV Pharma similarly focuses on quality management, trained personnel, infrastructure, equipment and documented pharmaceutical-handling processes; it is an industry certification framework, not a substitute for applicable law.

The UNECE ATP regime governs international carriage of specified perishable foodstuffs and associated special equipment within its legal scope; its current text incorporates amendments effective 25 August 2026. It SHALL NOT be assumed to apply globally.

---

# 7. No Universal Cold-Chain Temperature

This SHALL be prohibited:

```text
if cold_chain:
    temperature = 2..8°C
```

Cold-chain requirements may instead be:

```text
2°C – 8°C

15°C – 25°C

frozen

deep frozen

controlled ambient

do not freeze

specified humidity

specified light exposure

maximum excursion duration

product/manufacturer-specific range
```

The authoritative requirement SHALL identify its source.

---

# 8. Requirement Sources

A special-cargo requirement MAY originate from:

```text
customer contract

manufacturer specification

product quality specification

regulatory decision

carrier rule

facility rule

insurer requirement

industry standard

authority permit

route constraint
```

The source SHALL remain explicit.

---

# 9. Contractual Requirement ≠ Regulatory Requirement

This distinction is fundamental:

```text
Customer requires 18–22°C
    !=
law requires 18–22°C
```

and:

```text
carrier refuses certain cargo
    !=
cargo is legally prohibited
```

The system SHALL preserve requirement authority.

---

# 10. Special Cargo Service Profile

Thamani MAY maintain a commercial/service-level concept:

```text
SpecialCargoServiceProfile
├── service_profile_id
├── service_classes[]
├── customer_requirement_refs[]
├── regulatory_decision_refs[]
├── transport_requirement_refs[]
├── warehouse_requirement_refs[]
├── documentary_requirement_refs[]
├── monitoring_requirement_refs[]
├── security_requirement_refs[]
├── escalation_policy_ref?
├── SLA_ref?
└── effective_period
```

This is a service-composition object.

It SHALL NOT become the canonical regulatory classification of the cargo.

---

# 11. Cargo Facts vs Service Requirements

The architecture SHALL distinguish:

```text
CARGO FACT
    "contains lithium-ion batteries"

SERVICE REQUIREMENT
    "must use qualified DG carrier"

REGULATORY DECISION
    "classification/provisions X apply"

EXECUTION CONSTRAINT
    "do not dispatch until document Y exists"
```

---

# 12. TMS Requirement Projection

ADR-TMS-0002 already provides:

```text
service_requirements[]

handling_requirements[]

condition_requirements[]
```

on the transport domain.

Thamani SHALL map validated special-service requirements into the bound TMS capability rather than create a parallel Thamani transport model.

---

# 13. Thamani Does Not Classify Dangerous Goods

Thamani's commercial workflow MAY collect declarations such as:

```text
UN number

proper shipping name

hazard class/division

packing group

quantity

packaging type

flash point

marine pollutant claim

battery configuration

radioactive details
```

where applicable.

These SHALL initially be:

```text
DECLARED FACTS
```

until appropriately verified.

---

# 14. Declared ≠ Verified

This remains:

```text
customer says:
"not dangerous goods"

    !=

verified transport classification:
"not regulated as dangerous goods"
```

False declarations SHALL not silently bypass regulatory evaluation.

---

# 15. Dangerous-Goods Classification Authority

Applicable dangerous-goods classification and requirements SHALL be established through:

```text
authoritative source facts
+
verified classification
+
mode
+
jurisdiction
+
route
+
quantity
+
packaging
+
effective date
        │
        ▼
Baobab Regulations
        │
        ▼
RegulatoryDecision
```

where Baobab Regulations provides the covered regulatory capability.

---

# 16. GHS ≠ Transport Classification

The system SHALL not assume that chemical hazard communication and transport dangerous-goods rules are identical.

This is prohibited:

```text
GHS hazard
    therefore
transport classification automatically determined
```

Transport classification SHALL follow the applicable transport regime.

---

# 17. SDS Is Not Transport Decision

A Safety Data Sheet MAY provide evidence relevant to classification.

It SHALL NOT automatically be treated as:

```text
final dangerous-goods transport classification

transport authorisation

dangerous-goods declaration
```

---

# 18. DangerousGoodsProfile

Thamani MAY consume/reference a TMS/regulatory dangerous-goods projection conceptually containing:

```text
DangerousGoodsProfile
├── cargo_ref
├── classification_decision_ref
├── UN_number?
├── proper_shipping_name?
├── hazard_class_or_division?
├── subsidiary_risk?
├── packing_group?
├── quantity_basis?
├── special_provision_refs[]
├── mode_context
├── jurisdiction_context
├── verification_state
├── effective_period
└── evidence_refs[]
```

The authoritative canonical structure SHOULD ultimately belong to TMS/Regulations/Shared architecture, not Thamani.

---

# 19. Modal Re-Evaluation

A mode change SHALL be capable of triggering dangerous-goods re-evaluation.

Example:

```text
ROAD
  ↓
AIR
```

may materially alter:

```text
quantity limits

packing rules

documentation

carrier acceptance

training requirements

equipment constraints
```

Therefore:

```text
TransportPlan changed
        │
        ▼
Regulatory context changed
        │
        ▼
Regulations re-evaluation
```

MAY be mandatory.

---

# 20. Route Re-Evaluation

Likewise:

```text
UG → KE → ZA
```

and:

```text
UG → TZ → ZA
```

MAY involve different road/transit requirements.

TMS SHALL notify/trigger appropriate regulatory reassessment when material transport context changes.

---

# 21. Dangerous-Goods PEP

The TMS/warehouse domain SHALL act as a Policy Enforcement Point.

Conceptually:

```text
Regulations
     │
     ▼
DG RegulatoryDecision
     │
     ▼
TMS / Warehouse PEP
     │
     ├── ALLOW
     ├── BLOCK
     ├── REQUIRE DOCUMENT
     ├── REQUIRE QUALIFIED PROVIDER
     └── REQUIRE REVIEW
```

---

# 22. Regulations Does Not Dispatch Vehicles

This SHALL remain:

```text
Baobab Regulations
    decides

TMS
    enforces transport execution

Warehouse provider
    enforces facility execution
```

---

# 23. Provider Qualification

THA-0004 SHALL govern special-cargo provider qualification.

A carrier MAY be:

```text
qualified for ordinary road freight
```

but:

```text
not qualified for dangerous goods
```

or:

```text
qualified for refrigerated food
but not pharmaceutical cold chain
```

---

# 24. Qualification Is Scoped

Provider eligibility MAY depend on:

```text
cargo class

mode

jurisdiction

route/corridor

equipment type

temperature capability

dangerous-goods class

driver/personnel qualification

insurance

facility

effective date
```

---

# 25. Equipment Suitability

Provider qualification SHALL NOT imply equipment suitability.

This remains:

```text
Carrier qualified
    !=
Vehicle suitable

Vehicle suitable
    !=
Reefer operational

Reefer operational
    !=
Temperature requirement satisfied
```

---

# 26. Condition Requirement

Temperature and environmental requirements SHALL be explicit.

Conceptually:

```text
ConditionRequirement
├── subject_ref
├── parameter
├── target_range?
├── hard_limits?
├── unit
├── maximum_excursion_duration?
├── cumulative_excursion_rule?
├── sampling_requirement?
├── source_type
├── source_ref
├── assessment_policy_ref?
├── effective_from
└── effective_to?
```

This structure is conceptual and SHALL be finalised in the owning operational domain.

---

# 27. Supported Environmental Parameters

The model SHOULD permit more than temperature.

Examples:

```text
temperature

humidity

light exposure

shock

tilt

vibration

pressure

oxygen concentration

door-open state

location/security condition
```

where cargo requirements demand them.

---

# 28. Set Point ≠ Product Temperature

This distinction is mandatory:

```text
Reefer set point
    !=
air temperature

air temperature
    !=
product-core temperature

product-core temperature
    !=
external ambient temperature
```

These SHALL remain independently identifiable measurements.

---

# 29. Sensor Observation

A condition observation SHOULD preserve:

```text
parameter

value

unit

observation time

observation period where applicable

device ID

subject

location?

source

quality metadata

raw-data reference?

calibration/qualification reference?
```

---

# 30. Sensor Time ≠ Logistics Event Time

GS1 EPCIS explicitly separates sensor observation time/period from the surrounding business event time and supports device metadata, raw-data references and processing-method references.

Baobab SHALL preserve the same conceptual distinction.

---

# 31. EPCIS Compatibility

GS1 EPCIS 2.0.x supports sensor data specifically for condition monitoring such as cold-chain transport, together with certification and traceability data.

TMS/warehouse adapters MAY therefore support EPCIS.

EPCIS SHALL NOT become Baobab's mandatory internal persistence model.

---

# 32. Telemetry Source of Truth

The architecture SHALL distinguish:

```text
RAW SENSOR SOURCE
    device / IoT provider

OPERATIONAL TELEMETRY PROJECTION
    TMS or warehouse provider

CONTRACTUAL SERVICE ASSESSMENT
    Thamani / operational policy

REGULATORY COMPLIANCE ASSESSMENT
    Regulations

PREDICTIVE INTELLIGENCE
    Pulse
```

---

# 33. Pulse Is Not Telemetry Authority

Pulse MAY:

```text
predict excursion risk

detect anomaly

forecast reefer failure

predict route exposure

recommend intervention
```

It SHALL NOT rewrite:

```text
actual sensor measurement

regulatory compliance decision

quality disposition
```

---

# 34. Observation ≠ Excursion

This is fundamental:

```text
Temperature = 9°C once
    != automatically
validated product excursion
```

because assessment may depend on:

```text
sensor accuracy

sensor position

duration

product tolerance

measurement uncertainty

sampling policy

manufacturer specification
```

---

# 35. Alarm ≠ Excursion

Similarly:

```text
sensor alarm
    !=
confirmed excursion
```

An alarm is an operational notification.

An excursion is an assessed condition against an applicable requirement.

---

# 36. Excursion ≠ Product Damage

This SHALL remain:

```text
temperature excursion
    !=
product spoiled
```

---

# 37. Excursion ≠ Automatic Disposal

Likewise:

```text
excursion
    !=
destroy cargo
```

The cargo owner/manufacturer/qualified quality authority may need to perform product disposition.

---

# 38. Product Disposition Authority

TMS, Thamani and warehouse systems SHALL NOT automatically declare:

```text
SAFE FOR USE

UNSAFE

RELEASED FOR SALE

DESTROY
```

unless the applicable business/regulatory authority has delegated that responsibility.

---

# 39. ConditionAssessment

The architecture SHOULD distinguish:

```text
ConditionObservation
        │
        ▼
ConditionAssessment
        │
        ├── within requirement
        ├── deviation
        ├── excursion
        ├── unknown
        └── review required
```

The assessor and governing requirement SHALL be explicit.

---

# 40. Cold-Chain Quality Chain

Conceptually:

```text
Requirement
     │
     ▼
Equipment Qualification
     │
     ▼
Preconditioning
     │
     ▼
Loading
     │
     ▼
Monitoring
     │
     ▼
Handover
     │
     ▼
Storage / Transport
     │
     ▼
Delivery
     │
     ▼
Condition Assessment
     │
     ▼
Quality / Customer Disposition
```

---

# 41. Cold-Chain Custody Hand-Off

Every custody transfer SHOULD preserve relevant condition context.

Example:

```text
Warehouse
  releases cargo at 4.1°C
        │
        ▼
TMS carrier accepts custody
        │
        ▼
reefer transport
        │
        ▼
destination warehouse accepts
```

The receiving party SHOULD be able to identify the condition state at hand-off where contractually or regulatorily required.

---

# 42. Handover Condition ≠ Full Journey Compliance

This remains:

```text
temperature acceptable at handover
    !=
temperature acceptable throughout journey
```

Historical monitoring may still reveal an excursion.

---

# 43. Monitoring Requirement

Cold-chain service SHALL be able to distinguish:

```text
NO ACTIVE MONITORING

PERIODIC MONITORING

CONTINUOUS MONITORING

DEVICE LOGGER

REAL-TIME TELEMETRY

MULTI-SENSOR MONITORING
```

according to service requirement.

No universal monitoring method SHALL be assumed.

---

# 44. Device Assignment

Where a sensor/logger matters operationally, the platform SHOULD record:

```text
device

subject

assignment period

placement/position where relevant

activation

deactivation

calibration/qualification references
```

---

# 45. Device ≠ Cargo

This remains:

```text
Data Logger
    !=
CargoItem
```

although the logger may travel with cargo.

---

# 46. Monitoring Device May Itself Be Regulated

IATA specifically publishes guidance concerning battery-powered cargo tracking devices/data loggers used in air cargo, illustrating that monitoring equipment may itself introduce transport constraints.

Therefore telemetry equipment SHALL not be assumed operationally neutral.

---

# 47. Calibration / Qualification

A reading from a device SHALL preserve sufficient context to determine whether the measurement can be relied upon.

Where applicable this may include:

```text
device identity

calibration status

calibration certificate ref

accuracy/tolerance

last calibration

qualification

firmware

measurement method
```

---

# 48. Calibration Certificate

A formal calibration certificate SHALL use TDOC-0002:

```text
TradeDocument
      │
      ▼
DocumentVersion
      │
      ▼
ContentArtifact
```

The certificate SHALL not be stored merely as:

```text
sensor.calibration_pdf_url
```

---

# 49. Cold-Chain Documents

Relevant formal documents MAY include:

```text
temperature report

calibration certificate

equipment qualification certificate

cold-chain handling certificate

quality release

excursion assessment

chain-of-custody document

pharmaceutical handling certificate
```

depending upon context.

Trade Docs owns documentary lifecycle.

---

# 50. Document ≠ Underlying Observation

This remains:

```text
Temperature Report
    !=
raw sensor data
```

and:

```text
Excursion Assessment Document
    !=
ConditionAssessment operational record
```

where the report is merely its documentary representation.

---

# 51. Dangerous-Goods Documents

Depending on mode/jurisdiction, formal documentary requirements MAY include:

```text
dangerous goods declaration

shipper declaration

multimodal dangerous goods form

container/vehicle packing certificate

SDS

permit

approval

exemption

competent-authority certificate

emergency information
```

Trade Docs SHALL govern the documents.

Regulations SHALL determine which are required.

---

# 52. Documentation Rules Are Contextual

This is prohibited:

```text
if dangerous_goods:
    require SDS
    require DG declaration
```

universally.

Requirement resolution SHALL depend on the governing transport context.

---

# 53. IMDG Example

The current IMDG Code covers matters including dangerous-goods classification, packing/tank provisions, consignment procedures, packaging/tank construction/testing and transport operations.

Baobab SHALL therefore avoid reducing maritime dangerous-goods execution to a single:

```text
hazard_class
```

field.

---

# 54. Air Example

The IATA DGR provides mode-specific air-transport rules and operational acceptance checklists, including separate checklists for non-radioactive, radioactive and dry-ice consignments.

Accordingly:

```text
DG accepted for road
```

does not imply:

```text
DG accepted for air
```

---

# 55. Dangerous Goods Transport Readiness

Thamani MAY compose a customer/operations projection:

```text
DangerousGoodsReadiness
├── classification_ready
├── regulatory_ready
├── provider_ready
├── equipment_ready
├── packaging_ready
├── documentation_ready
├── route_ready
├── emergency_information_ready
└── unresolved_conditions[]
```

This is a projection.

It SHALL NOT become regulatory authority.

---

# 56. Cold-Chain Readiness

Likewise:

```text
ColdChainReadiness
├── condition_specification_ready
├── provider_qualified
├── equipment_qualified
├── monitoring_ready
├── warehouse_ready
├── route_assessed
├── documents_ready
└── unresolved_conditions[]
```

---

# 57. Special-Cargo Operational Eligibility

The general eligibility formula SHOULD resemble:

```text
Cargo facts known
        +
service requirements known
        +
regulatory assessment sufficient
        +
provider qualified
        +
equipment suitable
        +
route/mode permitted
        +
documents ready
        +
monitoring ready where required
        =
eligible for execution
```

---

# 58. Unknown Mandatory Condition Fails Closed

For safety- or legally-critical execution:

```text
required classification UNKNOWN

required carrier qualification UNKNOWN

required document UNKNOWN

required temperature capability UNKNOWN
```

SHALL NOT silently produce:

```text
READY
```

---

# 59. Conditional Readiness

The platform SHALL support:

```text
READY

READY_WITH_CONDITIONS

BLOCKED

REVIEW_REQUIRED

UNKNOWN
```

rather than one:

```text
approved = true
```

boolean.

---

# 60. Special Cargo Is Composable

A single cargo movement MAY require:

```text
COLD_CHAIN
+
DANGEROUS_GOODS
+
HIGH_VALUE_SECURITY
```

All applicable constraints SHALL compose.

No one profile SHALL overwrite the others.

---

# 61. Requirement Conflict

Conflicting requirements SHALL create:

```text
CONSTRAINT_CONFLICT
```

or equivalent.

Example:

```text
cargo requires ventilation

but
security packaging requirement prohibits ventilation
```

The platform SHALL not arbitrarily choose one.

---

# 62. Requirement Precedence

Regulatory requirements SHALL not be overridden by ordinary commercial preferences.

However:

```text
more stringent customer requirement
```

MAY apply where lawful and operationally feasible.

The source and precedence policy SHALL remain explicit.

---

# 63. Customer-Supplied Requirement

A customer MAY declare:

```text
keep frozen
```

The system SHOULD capture:

```text
source = CUSTOMER_DECLARED
```

until confirmed against relevant product/service information.

---

# 64. Manufacturer Requirement

Where manufacturer specifications govern product stability or handling, those requirements SHALL retain manufacturer/source provenance.

They SHALL not be misrepresented as legislation.

---

# 65. Regulatory Requirement

Where law/regulation mandates a condition:

```text
source = REGULATORY_DECISION
```

SHALL remain distinguishable.

---

# 66. Special Cargo Routes

TMS SHOULD be able to account for route attributes relevant to specialised cargo, such as:

```text
available reefer facilities

power availability

qualified transfer point

dangerous-goods restrictions

secure parking

special handling facility

border inspection facility

maximum dwell tolerance
```

Detailed routing semantics belong to future TMS planning ADRs.

---

# 67. Route Suitability ≠ Geographic Reachability

This remains:

```text
truck can physically drive route
    !=
route suitable for cargo
```

---

# 68. Cold-Chain Route Qualification

WHO maintains specific technical guidance for route profiling/qualification and temperature-controlled transport for pharmaceutical products.

Baobab SHOULD support references to route qualification where such service or regulatory requirements apply.

It SHALL NOT claim all cold-chain cargo requires WHO pharmaceutical qualification.

---

# 69. Perishable Food Boundary

Perishable food cold chain MAY be governed by:

```text
food safety regulation

commodity rules

customer requirements

facility requirements

ATP where legally applicable

other jurisdictional standards
```

It SHALL not inherit pharmaceutical rules by default.

---

# 70. Pharmaceutical Boundary

Pharmaceutical cold chain MAY require stricter:

```text
quality systems

qualified equipment

temperature mapping

monitoring

documentation

personnel training

deviation investigation
```

depending upon applicable law, product and customer requirements. WHO and IATA industry frameworks reinforce these concerns.

---

# 71. CEIV Pharma Is Qualification Evidence

If a carrier/facility holds:

```text
IATA CEIV Pharma
```

Thamani MAY consider it evidence within provider qualification.

It SHALL NOT automatically mean:

```text
qualified for every pharmaceutical shipment
```

---

# 72. High-Value Cargo

High-value/security-sensitive services MAY add:

```text
route confidentiality

secure facility requirements

approved stopping locations

enhanced tracking

dual control

escort requirements

tamper evidence

restricted data visibility
```

where contractually or regulatorily appropriate.

---

# 73. Security Requirement ≠ Dangerous-Goods Requirement

This remains:

```text
HIGH_VALUE
    !=
DANGEROUS_GOODS
```

although the same shipment may require both.

---

# 74. Special-Cargo Data Minimisation

Sensitive cargo attributes SHALL not be exposed to every participant merely because they participate in transport.

Example:

```text
driver needs:
handling instruction

customer portal may see:
service condition

public tracking must not see:
high-value cargo contents
```

---

# 75. Fragile Cargo

Fragile handling requirements MAY include:

```text
orientation

stacking restrictions

shock limits

vibration limits

manual handling

special packaging
```

according to cargo specification.

---

# 76. Special-Cargo Profiles Are Open-Ended

The architecture SHALL permit additional profiles without changing the LogisticsShipment aggregate type.

Future profiles MAY include:

```text
live animals

biological material

humanitarian cargo

artworks

high-security cargo

controlled substances

sensitive electronics

other regulated/special goods
```

only where Thamani is legally and operationally prepared to offer those services.

---

# 77. Heavy / Abnormal Cargo Boundary

Heavy lift, oversized and abnormal-load architecture SHALL be developed primarily in:

```text
ADR-THA-0012
```

because it introduces distinct concerns around:

```text
route surveys

permits

lifting plans

special equipment

infrastructure clearances

engineering assessment
```

THA-0011 SHALL not absorb those concerns.

---

# 78. Warehouse Boundary

THA-0010 remains authoritative for warehouse execution.

A specialised warehouse MAY need:

```text
cold rooms

freezers

dangerous-goods segregation

fire protection

controlled access

quarantine areas

special ventilation
```

according to requirements.

---

# 79. Facility Qualification

Provider qualification SHALL support facility-specific capability.

Example:

```text
Warehouse Provider
    generally qualified

Facility A
    pharma cold-chain qualified

Facility B
    dry general cargo only
```

---

# 80. Segregation

Dangerous-goods compatibility and segregation SHALL be determined through applicable regulatory/operational requirements.

Warehouse/TMS SHALL enforce those decisions.

Thamani SHALL NOT hard-code universal segregation matrices in its Digital Estate.

---

# 81. Packaging

Packaging suitability MAY be safety-critical.

The architecture SHALL distinguish:

```text
commercial packaging

transport packaging

dangerous-goods approved packaging

thermal packaging

handling unit

transport equipment
```

---

# 82. Packaging ≠ Equipment

Following TMS-0002:

```text
TransportPackage
    !=
HandlingUnit

HandlingUnit
    !=
TransportEquipment
```

Special handling SHALL preserve those distinctions.

---

# 83. Reefer Equipment

A refrigerated container/trailer MAY have operational facts including:

```text
equipment ID

equipment type

set point

vent setting

power state

fuel state

pre-trip inspection

qualification state

sensor assignments

alarm state
```

Detailed equipment authority remains TMS.

---

# 84. Pre-Trip Inspection

A successful reefer pre-trip inspection SHALL mean:

```text
equipment passed defined operational inspection
```

It SHALL NOT automatically mean:

```text
cargo condition guaranteed
```

---

# 85. Equipment Failure

An operational equipment failure SHALL create a transport exception.

Possible response MAY include:

```text
repair

backup equipment

transload

reroute

emergency storage

customer notification

quality review
```

depending on cargo and policy.

---

# 86. Exception ≠ Claim

This remains:

```text
temperature excursion
    !=
customer claim

equipment failure
    !=
financial liability established

DG incident
    !=
carrier automatically liable
```

Claims and service recovery remain for ADR-THA-0015.

---

# 87. Incident

A dangerous-goods incident MAY involve:

```text
spill

leak

fire

package damage

exposure

loss of containment

vehicle incident

misdeclaration
```

The operational system SHALL support incident capture and escalation.

---

# 88. Emergency Response

Applicable dangerous-goods service MAY require access to:

```text
emergency contact

substance information

response instructions

competent authority contact

carrier emergency procedure
```

according to applicable rules.

Those requirements SHALL derive from Regulations/provider policy rather than a universal Thamani template.

---

# 89. Regulatory Reporting

Where an incident is legally reportable:

```text
Regulations
    determines/reporting obligation

Trade Docs
    manages resulting formal reports/documents

Thamani/TMS
    provides operational facts
```

according to authority.

---

# 90. Chain of Evidence

A special-cargo incident SHOULD be reconstructable as:

```text
Requirement
     │
     ▼
Equipment / Provider Assignment
     │
     ▼
Telemetry
     │
     ▼
Operational Event
     │
     ▼
Exception / Incident
     │
     ▼
Assessment
     │
     ▼
TradeDocument / Evidence
     │
     ▼
Decision / Claim / Corrective Action
```

---

# 91. Evidence Must Preserve Provenance

Condition evidence SHOULD identify, as applicable:

```text
source device

source provider

time

location

subject

raw-data reference

transformation

aggregation method

calibration metadata
```

---

# 92. Aggregated Telemetry ≠ Raw Telemetry

This remains:

```text
average temperature
    !=
raw sensor readings
```

Both MAY matter.

The aggregation process SHALL be identifiable where materially used.

---

# 93. Telemetry Gaps

Missing telemetry SHALL be represented as:

```text
DATA_GAP

UNKNOWN
```

not:

```text
within range
```

---

# 94. Sensor Silence ≠ Compliance

This SHALL be non-negotiable:

```text
no alarm received
    !=
no excursion occurred
```

---

# 95. Offline Monitoring

The architecture SHALL support data loggers that upload only after:

```text
arrival

handover

device retrieval
```

Real-time connectivity SHALL not be a prerequisite for all cold-chain services.

---

# 96. Late Data

A LogisticsShipment may be:

```text
DELIVERED
```

before downloaded telemetry reveals:

```text
temperature excursion
```

The system SHALL support this without rewriting transport history.

---

# 97. Special-Cargo Delivery

Physical delivery remains TMS authority.

Specialised cargo MAY still require separate:

```text
quality acceptance

document acceptance

condition review
```

after physical delivery.

---

# 98. Delivered ≠ Quality Released

This remains:

```text
TMS DELIVERED
    !=
QUALITY RELEASED
```

---

# 99. Delivered ≠ Regulatory Accepted

Likewise:

```text
physical delivery
    !=
regulatory compliance concluded
```

---

# 100. Cold-Chain Customer Experience

Thamani MAY present:

```text
Cold Chain:
IN RANGE

Monitoring:
ACTIVE

Last Observation:
4.3°C at 14:05

Open Conditions:
NONE

Delivery:
ETA 16:45
```

provided each displayed value retains authoritative lineage.

---

# 101. Dangerous-Goods Customer Experience

Thamani MAY present:

```text
DG Classification:
VERIFIED

Regulatory Assessment:
READY_WITH_CONDITIONS

Carrier:
QUALIFIED

Documentation:
COMPLETE

Transport:
BOOKED
```

without exposing unnecessary technical regulator/provider details.

---

# 102. Customer-Friendly Status ≠ Authority

A dashboard:

```text
Ready for transport
```

SHALL remain a projection of authoritative conditions.

---

# 103. Commercial Pricing

THA-0006 remains authoritative for customer pricing.

Special-cargo charges MAY include:

```text
temperature-control surcharge

reefer equipment charge

monitoring charge

DG handling surcharge

special packaging

qualified staff

security surcharge

special storage

inspection

permit/document coordination

emergency equipment
```

---

# 104. Operational Cost ≠ Customer Charge

This remains:

```text
carrier reefer surcharge
    !=
Thamani customer cold-chain charge
```

TMS may own operational/provider cost inputs.

Thamani owns customer sell pricing.

ERP owns financial actuals.

---

# 105. SLA

Special-cargo SLA MAY include:

```text
temperature-range performance

monitoring completeness

maximum dwell

maximum handover duration

security events

document readiness

incident response time

exception notification time
```

---

# 106. SLA ≠ Regulatory Compliance

A service may:

```text
meet law
but
breach customer SLA
```

or:

```text
meet customer time SLA
but
fail regulatory requirement
```

Both SHALL remain independently assessable.

---

# 107. Provider Performance

Provider performance MAY measure:

```text
excursion frequency

equipment failures

late handovers

data gaps

DG document defects

special-cargo incident rate
```

These SHALL not be confused with provider qualification.

---

# 108. Qualification ≠ Performance

This remains:

```text
qualified
    !=
performing well
```

and:

```text
poor KPI
    !=
licence invalid
```

unless policy explicitly links them.

---

# 109. Regulatory Change

Dangerous-goods and special-cargo regimes evolve.

The IMDG 42-24 amendments are mandatory from 1 January 2026, while UNECE's dangerous-goods model and road instruments continue their own amendment cycles.

Therefore:

```text
classification

requirements

documents

provider eligibility
```

SHALL be effective-dated.

---

# 110. No Hard-Coded Current Standard Forever

This is prohibited:

```text
IMDG_VERSION = "42-24"
```

as permanent domain semantics.

Standard versions belong to regulatory/adaptor configuration and effective-time evaluation.

---

# 111. Historical Reproducibility

For a completed special-cargo movement, Baobab SHOULD be able to reconstruct:

```text
What cargo facts were declared?

Which were verified?

Which regulatory regime/version applied?

Which route and modes were used?

What requirements were in force?

Which provider was selected?

Why was that provider eligible?

Which equipment was assigned?

Which monitoring devices were used?

What observations occurred?

Which deviations/excursions occurred?

Which documents were issued?

Who assessed the excursion?

What disposition followed?

What customer communication occurred?
```

---

# 112. Data Retention

Cold-chain telemetry, dangerous-goods records and supporting documents MAY have differing retention obligations.

Retention SHALL therefore be:

```text
document-aware

regime-aware

jurisdiction-aware

customer-contract-aware

effective-dated
```

rather than one global retention period.

---

# 113. Multi-Tenancy

Special-cargo data SHALL remain correctly isolated by:

```text
tenant

legal entity

customer relationship

service order

provider relationship
```

---

# 114. Sensitive Cargo

Cargo sensitivity MAY justify stricter controls around:

```text
location

value

material identity

security classification

medical information

route

provider details
```

Thamani SHALL use least-privilege access.

---

# 115. Public Tracking

Public tracking SHALL NOT reveal sensitive special-cargo attributes merely because:

```text
tracking number
```

is known.

---

# 116. Staff Authorization

Special-cargo operations MAY require specific roles such as:

```text
DG reviewer

cold-chain controller

quality reviewer

special-cargo dispatcher

security supervisor
```

IAM authenticates the human.

The relevant business domain authorises the action.

---

# 117. Automation

Automation MAY:

```text
detect threshold breach

prevent dispatch

request missing document

trigger re-evaluation

raise incident

notify operators
```

where the governing policy permits.

---

# 118. AI Boundary

Pulse/AI MAY:

```text
predict excursion risk

predict equipment failure

suggest alternate route

identify anomalous telemetry

extract DG document data

suggest classification candidate
```

It SHALL NOT independently:

```text
invent DG classification

override regulatory block

declare pharmaceutical product safe

approve unsafe equipment

fabricate monitoring data
```

---

# 119. No New Special-Cargo Engine

This ADR explicitly rejects creation of:

```text
baobab-cold-chain

baobab-dangerous-goods

baobab-special-cargo
```

as engines at this stage.

The concerns are compositions across existing domains.

---

# 120. Future Engine Trigger

A dedicated capability would be reconsidered only if a substantial, independently reusable bounded context emerges that cannot reasonably reside in:

```text
TMS

Trade Docs

Regulations

warehouse execution

Pulse
```

without violating their boundaries.

---

# 121. TMS ADR Follow-Up

This ADR establishes requirements for future TMS architecture, especially:

```text
condition requirements

special handling

telemetry association

operational conditions

DG execution constraints

equipment suitability

special-cargo route constraints
```

These SHALL be formalised in the appropriate `ADR-TMS-*` sequence.

THA-0011 SHALL not define their TMS persistence model.

---

# 122. Trade Docs ADR Follow-Up

Future TDOC decisions SHALL formalise:

```text
DG declarations

certificates

condition reports

calibration certificates

quality documents

evidence relationships

regulated document dossiers
```

without THA-0011 defining their internal model.

---

# 123. Regulations Follow-Up

Regulations SHALL eventually support relevant packs/modules for:

```text
dangerous-goods transport

food/perishable requirements

pharmaceutical distribution

jurisdiction-specific cargo restrictions

special permits
```

where Baobab elects to provide those regulatory capabilities.

Absence of such a pack SHALL be surfaced as:

```text
COVERAGE INSUFFICIENT
```

not implied compliance.

---

# 124. Coverage ≠ Compliance

This remains:

```text
Baobab has no rule saying prohibited
    !=
cargo permitted
```

Regulatory coverage must be known.

---

# 125. Service Admission

Before Thamani accepts a special-cargo engagement, it SHOULD determine:

```text
Do we understand the cargo?

Do we understand the requirements?

Do we have regulatory coverage?

Do we have a qualified provider?

Do we have suitable equipment?

Do we have suitable facilities?

Can we monitor the required conditions?

Can we produce/manage required documents?

Can we safely execute the route?

Can we insure/contract the service appropriately?
```

---

# 126. Quotation Before Full Verification

Thamani MAY produce:

```text
INDICATIVE QUOTE
```

before every specialised requirement is fully verified.

It SHALL clearly distinguish:

```text
INDICATIVE
```

from:

```text
EXECUTION_READY
```

---

# 127. Quote Acceptance Does Not Authorise Dispatch

This remains:

```text
Customer accepted quote
    !=
TMS permitted to dispatch
```

Mandatory operational and regulatory gates must still pass.

---

# 128. Dangerous-Goods Misdeclaration

If new information indicates cargo may have been misdeclared:

```text
TMS
    SHALL be capable of blocking affected execution

Regulations
    reassesses

Trade Docs
    reassesses document requirements

Thamani
    manages customer/provider escalation
```

---

# 129. Cold-Chain Requirement Change

If a customer/manufacturer changes a condition requirement before execution:

```text
Service Profile
    revised

TMS
    re-evaluates equipment/route

Warehouse
    re-evaluates storage capability

Commercial
    may reprice
```

The previous requirement SHALL remain historical.

---

# 130. Implementation Gates

Implementation SHOULD proceed in the following sequence.

## THA-SC-00 — Special-Cargo Capability Audit

Audit:

```text
Thamani

TMS

Trade Docs

Regulations

ERP

Shared

warehouse providers

Pulse
```

for existing special-cargo assumptions.

---

## THA-SC-01 — Service Taxonomy

Define Thamani service offerings without creating shipment subclasses:

```text
Cold Chain

Dangerous Goods

Perishable

Pharma / Healthcare

High Value

Fragile

Controlled Environment
```

---

## THA-SC-02 — Requirement Capture

Implement Thamani customer requirement capture with explicit:

```text
source

status

scope

effective time

verification
```

---

## THA-SC-03 — TMS Mapping

Map validated requirements into TMS:

```text
service_requirements

handling_requirements

condition_requirements
```

according to TMS contracts.

---

## THA-SC-04 — Regulatory Decision Integration

Prove:

```text
Cargo Facts
+
Mode
+
Route
+
Jurisdictions
        ↓
Regulations
        ↓
Special-Cargo RegulatoryDecision
```

---

## THA-SC-05 — Provider Qualification

Extend THA-0004 use to:

```text
DG capability

cold-chain capability

special facility qualification

personnel qualification

equipment suitability
```

without universal approval booleans.

---

## THA-SC-06 — Cold-Chain Reference Flow

Implement a non-regulated temperature-controlled reference flow first:

```text
Requirement
→ Equipment
→ Monitoring
→ Execution
→ Observations
→ Delivery
→ Assessment
```

---

## THA-SC-07 — Telemetry Spine

Integrate:

```text
sensor identity

assignment

observation

raw-data reference

time

subject

calibration metadata
```

without prematurely creating a telemetry engine.

---

## THA-SC-08 — Exception Flow

Prove:

```text
Observation
→ Alarm
→ Assessment
→ Excursion
→ Operator Action
→ Customer Notification
```

while preserving distinctions.

---

## THA-SC-09 — Dangerous-Goods Reference Flow

Select one constrained real cargo class and prove:

```text
Declaration
→ Classification
→ Regulations
→ Provider
→ Equipment
→ Documents
→ TMS PEP
→ Execution
```

without attempting all DG classes at once.

---

## THA-SC-10 — Trade Docs Integration

Implement formal:

```text
DG document

temperature report

calibration certificate

special handling evidence
```

against TDOC canonical semantics.

---

## THA-SC-11 — Warehouse Integration

Prove specialised cargo through:

```text
transport custody
→ warehouse custody
→ controlled storage
→ outbound custody
```

with continuous requirement lineage.

---

## THA-SC-12 — Route Re-Evaluation

Prove that:

```text
mode change

route change

jurisdiction change
```

can invalidate prior regulatory/special-cargo readiness.

---

## THA-SC-13 — Commercial Integration

Connect specialised operational requirements to:

```text
THA-0006 rate architecture

surcharges

provider buy cost

Thamani margin
```

without mixing pricing with safety authority.

---

## THA-SC-14 — Control Tower

Expose:

```text
cargo requirements

equipment

provider

condition status

telemetry

documents

regulatory readiness

open exceptions
```

as one composed Thamani view.

---

## THA-SC-15 — Production Hardening

Verify at minimum:

```text
tenant isolation

fail-closed behaviour

regulatory coverage gaps

sensor outage

late telemetry

device replacement

provider substitution

equipment failure

route change

document expiry

DG misdeclaration

data integrity

audit

retention

incident escalation

manual fallback

disaster recovery
```

---

# 131. Alternatives Considered

## Alternative A — Create ColdChainShipment and DGShipment Types

**Rejected.**

Requirements compose and overlap.

---

## Alternative B — Put Dangerous-Goods Law in TMS

**Rejected.**

TMS enforces; Regulations decides.

---

## Alternative C — Put Cold-Chain Compliance in Pulse

**Rejected.**

Pulse provides intelligence, not authoritative compliance.

---

## Alternative D — Assume `2–8°C` Means Cold Chain

**Rejected.**

Requirements vary by product, customer, regime and source.

---

## Alternative E — Treat Sensor Alarm as Product Failure

**Rejected.**

Observation, alarm, excursion and disposition are separate.

---

## Alternative F — Treat Provider Qualification as Equipment Qualification

**Rejected.**

Both must be independently evaluated.

---

## Alternative G — Treat SDS as Dangerous-Goods Clearance

**Rejected.**

An SDS is evidence/information, not universal transport authorisation.

---

## Alternative H — Treat All DG Modal Rules as Equivalent

**Rejected.**

Air, maritime, road and other modes have different regulatory regimes.

---

## Alternative I — Hard-Code IMDG/IATA/ADR in Thamani

**Rejected.**

Rules are versioned regulatory concerns.

---

## Alternative J — Create Dedicated Cold-Chain/DG Engines Immediately

**Rejected.**

No independent bounded context presently justifies them.

---

## Alternative K — Store Temperature Reports as PDFs on Shipment

**Rejected.**

Formal documents belong to Trade Docs; sensor data and transport facts retain their own authority.

---

# 132. Architectural Invariants

The following SHALL remain non-negotiable:

```text
Special Cargo
    != Separate Shipment Type

Cold Chain
    != One Temperature Range

Dangerous Goods
    != One Universal Rule Set

Declared Hazard
    != Verified Classification

GHS Classification
    != Transport Classification automatically

SDS
    != Transport Authorisation

Provider Qualified
    != Equipment Suitable

Equipment Suitable
    != Equipment Available

Equipment Available
    != Requirement Satisfied

Reefer Set Point
    != Product Temperature

Ambient Temperature
    != Product Temperature

Sensor Reading
    != Sensor Alarm

Sensor Alarm
    != Confirmed Excursion

Excursion
    != Product Damage

Excursion
    != Automatic Disposal

Physical Delivery
    != Quality Release

Physical Delivery
    != Regulatory Acceptance

Cold-Chain SLA
    != Regulatory Compliance

DG Documentation
    != DG Classification

Document
    != Operational Fact

Temperature Report
    != Raw Telemetry

Calibration Certificate
    != Device Reading

Pulse Prediction
    != Actual Observation

Pulse Prediction
    != Regulatory Decision

TMS
    executes transport constraints

Warehouse Provider
    executes facility constraints

Trade Docs
    governs formal documents

Regulations
    governs regulatory decisions

ERP
    governs financial consequences

Thamani
    governs customer service composition

Unknown
    != Compliant

No Alarm
    != No Excursion

No Known Prohibition
    != Permission

Route Change
    may invalidate regulatory readiness

Mode Change
    may invalidate dangerous-goods readiness

Historical requirements
    must remain reconstructable
```

---

# 133. Final Architecture

```text
                         CUSTOMER
                            │
                            ▼
                 SPECIAL-CARGO REQUIREMENT
                            │
                            ▼
                         THAMANI
                 commercial/service owner
                            │
          ┌─────────────────┼──────────────────┐
          │                 │                  │
          ▼                 ▼                  ▼
     REGULATIONS           TMS             TRADE DOCS
   applicability /       execution          documents
      requirements          │                  │
          │                 │                  │
          │        ┌────────┼────────┐         │
          │        ▼        ▼        ▼         │
          │     Provider Equipment Route       │
          │        │        │        │         │
          │        └────────┼────────┘         │
          │                 ▼                  │
          │          Physical Execution        │
          │                 │                  │
          │                 ▼                  │
          │         Telemetry / Events         │
          │                 │                  │
          └────────────┬────┴──────┬───────────┘
                       ▼           ▼
                  Warehouse       ERP
                   Provider      finance
                       │
                       ▼
                 THAMANI CONTROL
                    TOWER / SLA
                       │
                       ▼
                    CUSTOMER
```

---

# 134. Final Decision

Thamani SHALL provide Cold Chain, Dangerous Goods and other specialised cargo services through **composable service requirements over the canonical Baobab logistics architecture**.

Thamani SHALL own:

```text
customer special-cargo requirement

service proposition

commercial agreement

customer quote

SLA

service composition

customer visibility

operational escalation

service recovery
```

TMS SHALL own:

```text
LogisticsShipment execution

Consignment execution

special handling requirements in transport

route/mode execution

equipment assignment

transport custody

transport condition observations/projections

operational transport exceptions
```

Warehouse providers SHALL own:

```text
specialised storage execution

facility condition observations

physical warehouse handling

warehouse custody
```

Trade Docs SHALL own:

```text
dangerous-goods documents

condition reports

certificates

calibration documents

formal inspection reports

document versions/content/provenance
```

Baobab Regulations SHALL own:

```text
regulatory applicability

dangerous-goods regulatory classification decisions

mode/jurisdiction requirements

permit/document requirements

regulatory readiness

regulatory change
```

Pulse MAY provide:

```text
anomaly detection

excursion prediction

equipment-failure prediction

route-risk intelligence
```

but SHALL remain non-authoritative.

The defining service principle is:

> **Special cargo shall be represented by composable requirements and controls, not by proliferating shipment subclasses.**

The defining dangerous-goods principle is:

> **Dangerous-goods legality and execution requirements shall always be evaluated in the actual mode, route, jurisdiction, cargo, quantity, packaging and effective-time context.**

The defining cold-chain principle is:

> **A temperature observation is only an observation; compliance requires an authoritative requirement, reliable evidence and an explicit assessment.**

The defining evidence principle is:

> **Telemetry, operational events, assessments and formal documents shall remain separate but traceably related facts.**

The defining safety principle is:

> **When a mandatory special-cargo safety or regulatory condition is unknown, Baobab shall not manufacture readiness from the absence of evidence.**

And the defining platform principle is:

> **Cold chain, dangerous goods and special cargo shall deepen Baobab TMS, Trade Docs, Regulations, warehouse execution and intelligence capabilities without turning Thamani—or any single engine—into a monolithic special-logistics platform.**
