# ADR-THA-0004 — Canonical Logistics Counterparty, Carrier, Service-Provider Qualification and Partner Onboarding

**Status:** Accepted — Foundational Thamani Architecture  
**Date:** 2026-09-24  
**Decision Owners:** Nabhold Group Africa / Thamani Global / Baobab Platform Architecture  
**Primary Repository:** `baobab-platform/thamani`  
**Legal Entity:** `THAMANI-GLOBAL`  
**Canonical Organisation Authority:** `baobab-platform/baobab-cp`  
**Canonical Contract Authority:** `baobab-platform/shared`  
**Identity / Authentication Authority:** `baobab-platform/baobab-iam`  
**Financial / Vendor Master Authority:** `baobab-platform/baobab-erp` where applicable  
**Logistics Qualification Authority:** Thamani Logistics Qualification Domain  
**Evidence Architecture:** Baobab Control Plane + approved evidence-storage boundary  
**Digital Experience:** Thamani Partner Portal / Digital Estate  
**Decision Class:** Counterparty / logistics provider / carrier / qualification / evidence / partner onboarding / provider governance

---

# 1. Depends On / Reconciles With

This ADR SHALL be interpreted consistently with:

- ADR-THA-0003 — Thamani Global Integrated Shipping, Transportation and Logistics Enterprise Domain Boundary
- ADR-BCP-004 — Context, Market, Geography, Legal-Entity and Digital Estate Resolution Model
- ADR-BCP-011 — Market Participation, Trade Lanes and Cross-Market Trading Model
- ADR-BCP-014 — Canonical Counterparty Identity, Roles and Relationships Model
- ADR-BCP-017 — Organisation Admission, Subscription Classification and Tenant Onboarding Lifecycle Model
- ADR-BCP-018 — Canonical Organisation, Corporate Group, Platform Account and Tenant Relationship Model
- ADR-BCP-020 — Administrative Authority, Delegated Administration, Privileged Access and Separation-of-Duties Model
- ADR-BCP-021 — Changeset, Impact Analysis, Approval and Controlled Mutation Model
- ADR-BCP-023 — Organisation Evidence, Verification, Trust and Compliance Record Model
- ADR-IAM-0005 — Realm, Organization, Tenant and Legal-Entity Model
- ADR-IAM-0012 — Supplier Identity and Representative Access
- ADR-IAM-0016 — Identity Lifecycle, Revocation and Deprovisioning
- ADR-0022 — Baobab Trade Shipping, Logistics, Freight and Transport Provider Abstraction
- `baobab-platform/shared/docs/adr/ADR-0006-supplier-onboarding-domain-contracts.md`
- applicable Baobab ERP Business Partner and supplier-master decisions
- applicable canonical event, evidence and counterparty contracts in `baobab-platform/shared`

Where older documents still state that canonical Organisation ownership is unassigned, the newer Control Plane organisation architecture SHALL govern implementation.

---

# 2. External Reference Architecture

This decision has been informed by established transport, customs, security and logistics practices including:

- FIATA freight-forwarding and multimodal logistics principles;
- WCO SAFE Framework and Authorised Economic Operator architecture;
- ISO 28000 supply-chain security-management principles;
- IATA specialist cargo and CEIV qualification programmes;
- IMO ISM and maritime safety-management principles;
- national and regional carrier, transport and customs licensing regimes;
- South African SARS customs registration/licensing;
- South African C-BRTA cross-border road-transport permits;
- East African customs-agent licensing requirements.

These references SHALL inform policy architecture.

They SHALL NOT be interpreted as declaring that one certification or licence satisfies every Thamani requirement or every jurisdiction.

ISO 28000:2022, for example, provides a cross-sector security-management framework applicable throughout supply chains, while WCO SAFE treats trusted-trader/AEO status as a structured Customs–business security and facilitation arrangement rather than a generic declaration of company quality.

---

# 3. Executive Decision

Thamani SHALL establish a first-class **Logistics Counterparty and Provider Qualification Architecture** built upon Baobab's canonical Organisation and Counterparty models.

The architecture SHALL explicitly distinguish:

```text
REAL-WORLD ORGANISATION
        │
        ▼
Canonical Organisation
        │
        ▼
Thamani Counterparty Relationship
        │
        ├── Customer Role
        ├── Carrier Role
        ├── Forwarder Role
        ├── Broker Role
        ├── Warehouse Role
        └── Other Logistics Roles
        │
        ▼
Logistics Provider Profile
        │
        ▼
Capability Declarations
        │
        ▼
Evidence + Verification
        │
        ▼
Qualification Assessment
        │
        ▼
Scoped Qualification Decision
        │
        ▼
Operating Eligibility
        │
        ▼
Rate / Procurement / Booking Selection
```

The governing principle is:

> **Canonical identity answers who the organisation is; qualification answers what Thamani is currently permitted to use that organisation for.**

These SHALL remain separate decisions.

---

# 4. Supersession of Legacy Thamani Supplier Onboarding

This ADR supersedes:

```text
ADR-0002 — Supplier Onboarding Portal
```

as the authoritative Thamani onboarding architecture.

The useful mechanisms from the old supplier implementation MAY be reused, including:

```text
application lifecycle
status transitions
organisation contacts
declared capabilities
certifications
audit history
evidence references
```

However, the old model is insufficient because Thamani now interacts with logistics counterparties whose relationships include:

```text
carrier
haulier
shipping line
freight forwarder
customs broker
warehouse operator
3PL
courier
last-mile provider
cold-chain operator
project-logistics contractor
port agent
terminal operator
ground handler
air cargo provider
subcontractor
insurer
equipment provider
```

The domain SHALL therefore no longer be called merely:

```text
Supplier Onboarding
```

for Thamani.

---

# 5. Supplier Domain Is Not Deleted

`@baobab-platform/supplier-domain` and Shared's supplier-onboarding contracts MAY continue serving genuine supplier/procurement use cases elsewhere in Baobab.

This ADR does not redefine:

```text
Supplier
```

globally.

Instead it establishes a broader Thamani-specific domain:

```text
Logistics Partner
```

An organisation MAY simultaneously be:

```text
Supplier
+
Carrier
+
Customer
+
Warehouse Operator
```

without becoming four canonical organisations.

---

# 6. Core Identity Architecture

The canonical relationship SHALL be:

```text
CanonicalEntity
      │
      ▼
Organisation
      │
      ▼
CounterpartyProfile
      │
      ▼
Thamani Logistics Relationship
      │
      ▼
LogisticsProviderProfile
```

No Thamani-native identifier SHALL replace the canonical Organisation identity.

---

# 7. Organisation Authority

The Control Plane SHALL own canonical organisation identity.

Thamani SHALL NOT mint competing universal organisation records.

Conceptually:

```text
CONTROL PLANE
    │
    ▼
Organisation
    │
    ├── legal identity
    ├── canonical identifiers
    ├── verified registration facts
    ├── corporate relationships
    └── canonical evidence provenance
```

Thamani SHALL reference that identity.

---

# 8. Counterparty Relationship Is Tenant / Legal-Entity Contextual

A known organisation does not automatically have a logistics relationship with Thamani.

Example:

```text
Acme Logistics Ltd
       │
       ├── Canonical Organisation
       │
       ├── ZuriBeans Supplier Relationship
       │
       └── Thamani Carrier Relationship
```

Thamani's:

```text
commercial terms
qualification
provider performance
approved capabilities
rates
risk assessments
contracts
operating restrictions
```

SHALL remain Thamani-scoped unless an explicit shared contract says otherwise.

---

# 9. Counterparty Role Is Not Organisation Type

This distinction is mandatory:

```text
Organisation Type
    !=
Counterparty Role
```

For example:

```text
Organisation Type:
COMPANY

Roles:
CARRIER
CUSTOMS_BROKER
WAREHOUSE_OPERATOR
```

is valid.

---

# 10. Multiple Roles

A single organisation MAY have multiple simultaneous roles.

Example:

```text
Africa Logistics Ltd
│
├── FREIGHT_FORWARDER
├── ROAD_CARRIER
├── CUSTOMS_BROKER
├── WAREHOUSE_OPERATOR
└── 3PL
```

No duplicate canonical organisations SHALL be created.

---

# 11. Initial Logistics Counterparty Roles

The canonical vocabulary SHOULD support, at minimum:

```text
CUSTOMER

CARRIER
ROAD_HAULIER
SHIPPING_LINE
AIR_CARRIER
RAIL_OPERATOR
INLAND_WATERWAY_CARRIER

FREIGHT_FORWARDER
MULTIMODAL_OPERATOR
NVOCC

CUSTOMS_BROKER
CLEARING_AGENT

WAREHOUSE_OPERATOR
TERMINAL_OPERATOR
DEPOT_OPERATOR
GROUND_HANDLER

3PL
4PL_PARTNER

COURIER
LAST_MILE_PROVIDER

COLD_CHAIN_PROVIDER
PROJECT_LOGISTICS_PROVIDER
HEAVY_HAUL_PROVIDER

PORT_AGENT
SHIPPING_AGENT

EQUIPMENT_PROVIDER
CONTAINER_PROVIDER
VEHICLE_PROVIDER

INSURER
SURVEYOR
INSPECTION_PROVIDER

SERVICE_PROVIDER
SUBCONTRACTOR
AGENT
OTHER
```

The vocabulary SHALL be extensible.

---

# 12. Role Is Not Capability

This distinction SHALL hold:

```text
CARRIER
    !=
Capability
```

A carrier may be:

```text
Carrier
│
├── ROAD_GENERAL_CARGO
├── REFRIGERATED_ROAD
├── DANGEROUS_GOODS
└── HEAVY_HAUL
```

The role describes the relationship.

The capability describes what service may be performed.

---

# 13. Role Is Not Approval

Likewise:

```text
role = ROAD_HAULIER
```

SHALL NOT imply:

```text
approved_for_use = true
```

A role may exist while qualification is:

```text
PENDING
SUSPENDED
EXPIRED
REJECTED
```

---

# 14. Provider Profile

Thamani SHALL maintain a logistics-provider relationship profile.

Conceptually:

```text
LogisticsProviderProfile
├── id
├── canonical_organisation_id
├── thamani_relationship_id
├── relationship_status
├── provider_roles[]
├── onboarding_state
├── operational_status
├── commercial_status
├── qualification_summary
├── effective_from
├── effective_to?
├── created_at
└── updated_at
```

This SHALL NOT duplicate canonical legal-entity facts.

---

# 15. Provider Profile Is Not ERP Business Partner

An ERP Business Partner is a financial/enterprise projection.

Therefore:

```text
LogisticsProviderProfile
        !=
iDempiere C_BPartner
```

Where required:

```text
Canonical Organisation
        │
        ├── Thamani LogisticsProviderProfile
        └── ERP Business Partner
```

SHALL be connected using explicit mappings.

---

# 16. Qualification Is Multidimensional

Thamani SHALL NOT store:

```text
provider.approved = true
```

as the complete qualification architecture.

Qualification SHALL be multidimensional.

Typical dimensions MAY include:

```text
LEGAL_IDENTITY
CORPORATE_AUTHORITY

REGULATORY_LICENSING
OPERATING_PERMITS

TRANSPORT_CAPABILITY
MODE_CAPABILITY
CORRIDOR_CAPABILITY

EQUIPMENT_CAPABILITY
FACILITY_CAPABILITY

CARGO_CAPABILITY
SPECIAL_CARGO_CAPABILITY

INSURANCE

SAFETY
SECURITY
QUALITY

PERSONNEL_COMPETENCE

CUSTOMS_ELIGIBILITY

FINANCIAL_READINESS

DATA / API READINESS

DOCUMENTATION

ENVIRONMENTAL / CUSTOMER_REQUIREMENTS

PERFORMANCE
```

---

# 17. Qualification Is Scoped

Every material qualification decision SHOULD carry explicit scope.

Conceptually:

```text
QualificationScope
├── role
├── capability
├── transport_mode?
├── market?
├── jurisdiction?
├── trade_lane?
├── logistics_corridor?
├── origin?
├── destination?
├── cargo_class?
├── equipment_class?
├── facility?
├── customer?
├── service_level?
├── effective_from
└── effective_to?
```

---

# 18. Universal Provider Approval Is Prohibited

This SHALL be prohibited:

```text
Acme Logistics = APPROVED
```

without knowing approved for what.

Instead:

```text
Acme Logistics

ROAD_HAULAGE
South Africa
General Cargo
APPROVED

ROAD_HAULAGE
South Africa → Botswana
APPROVED
until 2027-03-31

COLD_CHAIN
NOT APPROVED

DANGEROUS_GOODS
PENDING
```

---

# 19. Capability Declaration

Applicants MAY declare capabilities.

Conceptually:

```text
ProviderCapabilityDeclaration
├── provider_id
├── capability_code
├── scope
├── declared_by
├── declared_at
├── evidence_refs[]
└── declaration_status
```

A declaration SHALL begin as a claim.

Therefore:

```text
Declared Capability
    !=
Verified Capability
```

---

# 20. Claim–Evidence–Verification–Qualification Chain

Thamani SHALL preserve the BCP-023 evidence architecture.

The chain SHALL be:

```text
Provider Claim
      │
      ▼
Evidence
      │
      ▼
Verification
      │
      ▼
Qualification Assessment
      │
      ▼
Qualification Decision
      │
      ▼
Operating Eligibility
```

The following invariants SHALL hold:

```text
Claim
!= Evidence

Evidence
!= Verification

Verification
!= Qualification

Qualification
!= Booking Selection
```

---

# 21. Evidence Reuse

Where the Control Plane has already verified:

```text
legal name
registration number
incorporation
registered address
corporate relationship
authorised representative
```

Thamani SHOULD reference those verified facts rather than require unnecessary duplicate verification.

Thamani SHALL still independently assess domain-specific eligibility.

---

# 22. Domain-Specific Evidence

Thamani MAY require logistics-specific evidence including:

```text
carrier operating licence
cross-border permit
customs-agent licence
warehouse licence
bonded-facility licence
vehicle registration
roadworthiness evidence
driver licence
professional driving permit
dangerous-goods competency
cargo liability insurance
motor insurance
warehouse insurance
professional indemnity
freight-forwarder liability insurance
security certification
AEO status
quality certification
cold-chain certification
facility certification
equipment inspection
maintenance evidence
training records
air-cargo certification
maritime safety certification
```

The exact requirements SHALL be jurisdiction-, mode-, capability- and cargo-specific.

---

# 23. Evidence Requirement Policy

Requirements SHALL be resolved through policy.

Conceptually:

```text
Provider
   +
Capability
   +
Transport Mode
   +
Jurisdiction
   +
Cargo
   +
Route
   +
Customer Requirement
   +
Effective Date
        │
        ▼
Qualification Requirement Set
```

The application SHALL NOT scatter rules through frontend components.

---

# 24. Qualification Requirement Set

Conceptually:

```text
QualificationRequirementSet
├── id
├── capability
├── jurisdiction
├── transport_mode?
├── cargo_class?
├── customer_profile?
├── requirements[]
├── policy_version
├── effective_from
└── effective_to?
```

Historical assessments SHALL retain the policy version used.

---

# 25. Mandatory and Optional Requirements

Requirements MAY be:

```text
MANDATORY
CONDITIONAL
OPTIONAL
INFORMATIONAL
```

A mandatory unsatisfied regulatory requirement SHALL fail closed.

---

# 26. South African Cross-Border Road Example

For South African cross-border road transport, C-BRTA issues permits allowing cross-border operators to conduct road-transport business and supports goods permits among its permit categories. Its Cross-Easy system also integrates checks such as tax compliance, vehicle roadworthiness and registration status.

Accordingly, a Thamani policy MAY require:

```text
provider role = ROAD_HAULIER
jurisdiction = ZA
service = CROSS_BORDER
```

to satisfy appropriate current requirements such as:

```text
organisation identity
applicable C-BRTA authority/permit
eligible vehicles
vehicle registration
roadworthiness
applicable driver authority
insurance
route/corridor scope
```

Actual legal requirements SHALL be sourced from applicable current law/regulator rules rather than frozen into this ADR.

---

# 27. Customs Broker Qualification

Customs brokerage SHALL be separately qualified.

South Africa requires persons performing clearing-agent activities for reward to hold the applicable customs clearing-agent licence under SARS rules, and the licence operates on its regulatory lifecycle.

Similarly, within the East African Community framework, customs agents must be licensed by the Commissioner before undertaking customs-clearance activities.

Therefore:

```text
FREIGHT_FORWARDER
    != automatically
CUSTOMS_BROKER
```

and:

```text
CUSTOMS_BROKER in jurisdiction A
    != automatically
CUSTOMS_BROKER in jurisdiction B
```

---

# 28. Regulatory Credential

Thamani SHALL model regulatory credentials generically.

Conceptually:

```text
RegulatoryCredentialReference
├── subject_id
├── credential_type
├── authority
├── jurisdiction
├── identifier
├── scope
├── issued_at?
├── effective_from
├── expires_at?
├── verification_reference
├── evidence_reference
├── status
└── last_verified_at
```

Thamani SHALL not become the issuing authority.

---

# 29. Regulator Is Source Authority

For a regulator-issued licence:

```text
Regulator
    = source authority

Control Plane / Thamani
    = evidence + verification + policy consumer
```

The provider SHALL NOT be able to set:

```text
licence_verified = true
```

through client-controlled input.

---

# 30. Licence Number Is Not Sufficient

Qualification SHALL not assume:

```text
licence_number_present
=
licence_valid
```

Verification MAY require:

```text
issuer confirmation
status
expiry
scope
jurisdiction
holder identity
conditions
suspension/revocation status
```

where authoritative access is available.

---

# 31. Security Qualification

Supply-chain security MAY be an independent qualification dimension.

ISO 28000:2022 provides a general security-management-system framework relevant to supply-chain activities.

WCO SAFE and AEO frameworks likewise treat security and trusted-trader status as structured programmes involving supply-chain actors.

Therefore:

```text
AEO
ISO 28000
other security certifications
```

MAY contribute evidence.

They SHALL NOT automatically substitute for all Thamani qualification requirements.

---

# 32. AEO Is Not Universal Provider Approval

This SHALL remain explicit:

```text
AEO status
    !=
Thamani universal approval
```

AEO status may be relevant to:

```text
customs security
trusted-trader status
border facilitation
supply-chain controls
```

but does not establish:

```text
commercial rate
equipment suitability
cold-chain capability
customer-specific SLA
vehicle availability
financial terms
```

---

# 33. Insurance Qualification

Insurance SHALL be modelled as scoped evidence.

Conceptually:

```text
InsuranceCoverage
├── provider_id
├── policy_type
├── insurer
├── policy_reference
├── coverage_scope
├── territorial_scope
├── currency
├── coverage_limit?
├── deductible?
├── effective_from
├── expires_at
├── evidence_reference
└── verification_status
```

Thamani policies MAY define minimum requirements according to service risk.

---

# 34. Insurance Is Role-Specific

Applicable coverage MAY differ between:

```text
road carrier
freight forwarder
warehouse operator
customs broker
project-logistics contractor
shipping operator
courier
```

The system SHALL NOT assume one insurance certificate covers every service.

---

# 35. Freight Forwarder Liability

Where a freight forwarder issues instruments that create particular contractual liabilities, the corresponding insurance requirements SHALL be enforced.

For example, FIATA states that forwarders wishing to issue its multimodal FBL/eFBL must possess valid liability insurance in accordance with the applicable FBL terms.

Therefore:

```text
qualified as freight forwarder
```

does not automatically mean:

```text
eligible to issue every transport document
```

---

# 36. Principal vs Agent

The architecture SHALL explicitly distinguish the contractual capacity in which a logistics organisation acts.

Possible capacities include:

```text
AGENT
CONTRACTUAL_CARRIER
ACTUAL_CARRIER
FREIGHT_FORWARDER_AS_AGENT
FREIGHT_FORWARDER_AS_PRINCIPAL
NVOCC
SUBCONTRACTOR
WAREHOUSE_BAILEE
OTHER
```

FIATA's Model Rules recognise that a forwarder may act either as an agent or as a contractual carrier, with differing rights, obligations and liabilities.

This role SHALL be established per applicable service/contract where necessary.

---

# 37. Provider Role Is Contextual Per Shipment

An organisation MAY act as:

```text
Freight Forwarder
```

for Shipment A,

and:

```text
Contractual Carrier
```

for Shipment B.

The organisation master SHALL not hard-code one immutable liability role.

---

# 38. Maritime Operator Qualification

If a provider is selected to perform regulated ship-operation functions, maritime qualification SHALL be capability-specific.

The IMO ISM Code provides an international safety-management standard for safe ship management and operation and pollution prevention.

Accordingly:

```text
Shipping company
```

SHALL NOT automatically imply:

```text
qualified vessel operator
```

where the organisation is merely acting as:

```text
agent
forwarder
charterer
booking intermediary
```

---

# 39. Special Cargo Qualification

Special cargo SHALL introduce additional capability qualification.

Examples:

```text
PHARMACEUTICALS
PERISHABLES
LIVE_ANIMALS
DANGEROUS_GOODS
HIGH_VALUE
TEMPERATURE_CONTROLLED
OVERSIZED
HEAVY_LIFT
```

Eligibility SHALL be scoped accordingly.

---

# 40. Cold-Chain Qualification

Cold-chain qualification MAY require evidence concerning:

```text
temperature-controlled facilities
equipment
temperature mapping
sensor calibration
monitoring
quality systems
training
route risk assessment
supplier management
SOPs
excursion management
```

IATA's CEIV Pharma programme, for example, assesses quality management, personnel, documentation, facilities/equipment, supplier management, transport and operations for pharmaceutical logistics.

This illustrates why:

```text
owns refrigerated truck
```

does not equal:

```text
qualified pharmaceutical cold-chain provider
```

---

# 41. Capability Model

Conceptually:

```text
LogisticsProviderCapability
├── id
├── provider_id
├── capability_code
├── role
├── mode?
├── geographic_scope
├── corridor_scope?
├── cargo_scope?
├── equipment_scope?
├── facility_scope?
├── service_levels[]
├── declared_status
├── qualification_status
├── effective_from
├── effective_to?
└── restrictions[]
```

---

# 42. Suggested Capability Vocabulary

Initial capability vocabulary SHOULD include:

```text
ROAD_HAULAGE_GENERAL
ROAD_HAULAGE_CROSS_BORDER
ROAD_HAULAGE_REFRIGERATED
ROAD_HEAVY_HAUL

SEA_FREIGHT
AIR_FREIGHT
RAIL_FREIGHT
INLAND_WATERWAY

FREIGHT_FORWARDING
MULTIMODAL_FORWARDING
CONSOLIDATION
DECONSOLIDATION

CUSTOMS_BROKERAGE
BORDER_CLEARANCE
TRANSIT_MANAGEMENT

WAREHOUSING
BONDED_WAREHOUSING
CROSS_DOCKING
FULFILMENT

COURIER
LAST_MILE

COLD_CHAIN
DANGEROUS_GOODS
PHARMA_LOGISTICS
PERISHABLE_LOGISTICS

PROJECT_LOGISTICS
HEAVY_LIFT

3PL
4PL_SUPPORT

TRACKING
POD
DOCUMENT_HANDLING
```

This vocabulary SHALL ultimately be governed through Shared where cross-repository consumption requires it.

---

# 43. Capability Is Effective-Dated

Capabilities SHALL support:

```text
effective_from
effective_to
```

A provider SHALL not remain qualified indefinitely simply because it once passed onboarding.

---

# 44. Qualification Assessment

Conceptually:

```text
QualificationAssessment
├── id
├── provider_id
├── capability_id
├── requirement_set_id
├── policy_version
├── assessed_by
├── assessed_at
├── requirements[]
├── discrepancies[]
├── overall_decision
├── conditions[]
├── valid_from
├── valid_until?
└── review_due_at?
```

---

# 45. Requirement Assessment

Each requirement SHOULD produce its own outcome.

Example:

```text
C-BRTA Permit              PASS
Vehicle Registration       PASS
Roadworthiness             PASS
Insurance                  PASS
Dangerous Goods Licence    NOT_APPLICABLE
Security Review            PASS_WITH_CONDITIONS
API Integration            PENDING
```

The decision SHALL remain explainable.

---

# 46. No Opaque Provider Trust Score

Thamani SHALL NOT reduce provider trust to:

```text
trust_score = 82
```

as the authoritative qualification decision.

Quantitative metrics MAY be used operationally.

But the authoritative qualification posture SHALL remain explainable across dimensions.

This aligns with BCP-023's prohibition on universal opaque trust scores.

---

# 47. Qualification Decision States

A qualification decision SHOULD support:

```text
NOT_ASSESSED
DECLARED
EVIDENCE_PENDING
UNDER_REVIEW
MORE_INFORMATION_REQUIRED
VERIFIED
CONDITIONALLY_APPROVED
APPROVED
RESTRICTED
SUSPENDED
EXPIRED
REVOKED
REJECTED
NOT_APPLICABLE
```

Exact workflow may use separate assessment and eligibility state machines.

---

# 48. PARTIALLY APPROVED Is Valid

An organisation may pass some capability assessments and fail others.

Example:

```text
Provider
│
├── General Road Freight        APPROVED
├── Cross-Border Road Freight   APPROVED
├── Cold Chain                  REJECTED
└── Dangerous Goods             PENDING
```

Provider onboarding SHALL support partial qualification.

---

# 49. Relationship Lifecycle

The overall Thamani provider relationship SHOULD support:

```text
PROSPECTIVE
    │
    ▼
ONBOARDING
    │
    ▼
QUALIFIED
    │
    ▼
ACTIVE
    │
    ├────► RESTRICTED
    │
    ├────► SUSPENDED
    │
    └────► OFFBOARDING
              │
              ▼
           OFFBOARDED
```

Overall relationship state SHALL not erase capability-specific states.

---

# 50. Application Lifecycle

A provider application SHOULD support:

```text
DRAFT
  │
  ▼
SUBMITTED
  │
  ▼
IDENTITY_RESOLUTION
  │
  ▼
EVIDENCE_COLLECTION
  │
  ▼
UNDER_REVIEW
  │
  ├──► MORE_INFORMATION_REQUIRED
  │          │
  │          └────► UNDER_REVIEW
  │
  ├──► APPROVED
  ├──► PARTIALLY_APPROVED
  ├──► REJECTED
  └──► WITHDRAWN
```

Application status SHALL not replace ongoing qualification.

---

# 51. Organisation Resolution Before Duplicate Creation

Before creating a new organisation candidate, onboarding SHALL attempt canonical resolution.

Conceptually:

```text
Applicant
   │
   ▼
Organisation Claim
   │
   ▼
Search / Match
   │
   ├── Existing Canonical Organisation
   │        │
   │        ▼
   │   establish Thamani relationship
   │
   └── No reliable match
            │
            ▼
      provisional organisation
            │
            ▼
        verification
```

Duplicate identity creation SHALL be treated as an exception.

---

# 52. Ambiguous Organisation Match

Ambiguous matches SHALL fail safely.

The system SHALL support:

```text
POSSIBLE_MATCH
REVIEW_REQUIRED
DUPLICATE_CONFIRMED
NEW_ORGANISATION_CONFIRMED
```

It SHALL NOT automatically merge organisations based merely on:

```text
similar company name
same email domain
same telephone number
```

---

# 53. Representative Identity

Every human accessing the partner portal SHALL authenticate individually through Baobab IAM.

This pattern is prohibited:

```text
username = acme-logistics
password = shared-password
```

Instead:

```text
Alice ─┐
Bob   ─┼──► Acme Logistics Ltd
Carol ─┘
```

---

# 54. Representative Is Not Organisation

This SHALL remain invariant:

```text
Human Identity
    !=
Organisation Identity
```

An individual authenticates.

The organisation participates commercially.

---

# 55. Representative Authority

A human's ability to represent a logistics organisation SHALL be explicit.

Conceptually:

```text
ProviderRepresentative
├── iam_subject_id
├── organisation_id
├── relationship_id
├── representative_role
├── authority_scope
├── effective_from
├── effective_to?
├── authority_evidence?
└── status
```

---

# 56. Representative Authority Is Not Provider Qualification

This SHALL hold:

```text
Alice is authorised to represent Acme
    !=
Acme is qualified as a carrier
```

and:

```text
Acme is qualified
    !=
Alice may approve every operational action
```

---

# 57. Partner Portal Access

Partner Portal access MAY support:

```text
complete onboarding
upload evidence
maintain contacts
declare capabilities
submit equipment information
submit rates
accept bookings
update milestones
upload POD
submit invoices
respond to exceptions
```

subject to authorisation.

Portal access SHALL not itself establish provider approval.

---

# 58. Provider Does Not Become Tenant Automatically

External logistics providers SHALL NOT automatically become Baobab tenants.

Default:

```text
THAMANI TENANT
      │
      ▼
Logistics Provider Relationship
      │
      ├── Carrier A
      ├── Broker B
      └── Warehouse C
```

A provider becomes a Baobab tenant only if separately onboarded as a platform customer.

---

# 59. IAM Organisation Is Projection Only

A Keycloak Organization MAY represent:

```text
partner membership
partner login context
invitations
identity federation
```

It SHALL NOT become authoritative for:

```text
company registration
carrier role
licensing
qualification
insurance
commercial relationship
```

---

# 60. Commercial Onboarding Is Separate

Provider qualification answers:

> May Thamani operationally use this provider for this capability?

Commercial onboarding answers:

> Under what commercial terms may Thamani transact with the provider?

These SHALL remain separate.

Commercial onboarding MAY include:

```text
contract
rate agreement
payment terms
currency
credit terms
tax treatment
procurement category
commercial contact
```

---

# 61. ERP Vendor Readiness Is Separate

ERP vendor readiness MAY include:

```text
ERP Business Partner
vendor role
banking/payment master
tax information
accounts payable setup
payment terms
financial controls
```

Therefore:

```text
Logistics Qualification
    !=
ERP Vendor Ready
```

A provider may be operationally qualified but not yet financially provisioned.

---

# 62. Bank Detail Control

Sensitive bank-account changes SHALL NOT be treated as ordinary profile edits.

They SHOULD require:

```text
strong authentication
maker/checker control
change evidence
verification
audit
notification
possible payment hold
```

ERP remains authoritative for financial vendor-master consequences.

---

# 63. Operational Readiness Matrix

A provider MAY become bookable only when the required combination is satisfied.

Conceptually:

```text
Organisation Verified        PASS
Provider Capability          APPROVED
Regulatory Requirements      PASS
Insurance                    PASS
Commercial Contract          ACTIVE
ERP Vendor Readiness         READY
System Integration           READY / NOT_REQUIRED
                         ─────────────
Booking Eligibility          ELIGIBLE
```

The exact combination SHALL be policy-driven.

---

# 64. Qualified Is Not Selected

This distinction is mandatory:

```text
QUALIFIED
    !=
SELECTED
```

Qualification establishes eligibility.

Provider selection occurs later based on:

```text
rate
capacity
service level
route
equipment
availability
reliability
customer terms
performance
risk
```

ADR-THA-0006 SHALL govern quotation/rate/commercial selection.

---

# 65. Selected Is Not Booked

Likewise:

```text
SELECTED
    !=
BOOKED
```

A selected provider must still accept or receive the appropriate booking commitment.

---

# 66. No Automatic Internal Preference

External-provider qualification SHALL use the same fundamental eligibility logic required of comparable providers.

Thamani internal divisions MAY use different internal-control mechanisms where appropriate, but 4PL orchestration SHALL not blindly select an internal division simply because it is internal.

---

# 67. Subcontracting

The architecture SHALL explicitly support subcontracting.

Conceptually:

```text
Thamani
   │
   ▼
Primary Provider A
   │
   ▼
Subcontractor B
```

The following SHALL be explicit where material:

```text
subcontracting permitted?
approval required?
subcontractor disclosed?
qualification required?
customer consent required?
regulatory restrictions?
liability retained by whom?
```

---

# 68. Undisclosed Substitution

Provider substitution SHALL NOT silently occur where provider identity affects:

```text
safety
licensing
insurance
customer contract
customs
cargo restrictions
security
cold-chain qualification
```

A carrier SHALL not replace itself with an unqualified carrier simply by changing an external reference.

---

# 69. Flow-Down Requirements

Where appropriate, contract and qualification requirements MAY flow down to subcontractors.

Examples:

```text
security
cargo integrity
dangerous-goods handling
temperature control
driver competence
insurance
data protection
tracking
POD
```

The system SHALL represent whether a requirement applies only to the primary provider or throughout the execution chain.

---

# 70. Equipment Declaration

Providers MAY declare equipment and fleet capability.

Conceptually:

```text
ProviderEquipmentCapability
├── provider_id
├── equipment_class
├── owned_count?
├── leased_count?
├── contracted_count?
├── capacity
├── specifications
├── operating_scope
├── evidence_refs[]
└── verification_state
```

Declared equipment SHALL not automatically imply current availability.

---

# 71. Equipment Identity Is Separate

Capability:

```text
owns / controls 50 refrigerated trailers
```

is different from operational asset identity:

```text
Trailer ABC-123
```

The fleet/asset model belongs to ADR-THA-0007.

---

# 72. Facility Qualification

Warehouse, depot, terminal and cold-chain capabilities MAY require facility-level qualification.

Conceptually:

```text
Provider
   │
   ├── Facility A — APPROVED
   ├── Facility B — RESTRICTED
   └── Facility C — NOT ASSESSED
```

Provider-wide approval SHALL not automatically approve every facility.

---

# 73. Facility Scope

Facility qualification MAY consider:

```text
location
licence
security
capacity
handling equipment
temperature zones
fire protection
bonded status
customs approval
food/pharma suitability
dangerous-goods capability
operating hours
technology
```

according to applicable policy.

---

# 74. Personnel Capability

Some provider capabilities depend upon qualified personnel.

The architecture MAY reference:

```text
driver qualifications
dangerous-goods competence
customs-agent personnel
cold-chain training
equipment operator competence
security training
```

Individual credentials SHALL be handled with appropriate privacy controls.

---

# 75. Provider Performance Is Separate From Qualification

Qualification asks:

> Is this provider eligible?

Performance asks:

> How well has this provider performed?

These SHALL remain separate models.

---

# 76. Provider Performance Profile

A performance projection MAY include:

```text
on-time pickup
on-time delivery
acceptance rate
cancellation rate
damage rate
loss rate
claims frequency
temperature excursions
customs delays
POD timeliness
invoice accuracy
tracking completeness
SLA breaches
```

These metrics MAY contribute to requalification or selection policy.

They SHALL not rewrite historical operational facts.

---

# 77. No Universal Provider Score

A single provider score MAY exist as an analytical convenience.

It SHALL NOT replace the underlying metrics or qualification decisions.

For example:

```text
Provider A
Road freight reliability       HIGH
Cold-chain quality             NOT QUALIFIED
Claims frequency               LOW
Tracking completeness          MEDIUM
Cross-border permits           CURRENT
```

contains more decision value than:

```text
score = 81
```

---

# 78. Customer-Specific Qualification

Some customers MAY impose requirements beyond Thamani baseline.

The architecture SHALL support:

```text
Thamani baseline approval
        +
customer-specific requirements
        =
customer-service eligibility
```

Example:

```text
Provider qualified for:
General pharma logistics

Customer X additionally requires:
CEIV Pharma

Result:
Provider not eligible for Customer X
until requirement satisfied
```

---

# 79. Special Certification Is Evidence, Not Identity

Certifications such as IATA CEIV demonstrate specialised operational capability under defined assessment criteria.

They SHALL therefore be represented as:

```text
certification / qualification evidence
```

not:

```text
organisation identity
```

---

# 80. Credential Expiry

Expiring evidence SHALL be monitored.

Examples:

```text
licence
permit
insurance
certificate
vehicle authority
driver credential
security accreditation
```

The system SHOULD support:

```text
expiry date
review due date
warning period
renewal submitted
renewal verified
expired
```

---

# 81. Expiry Does Not Silently Extend

This SHALL be prohibited:

```text
expiry_date passed
    therefore
keep status APPROVED
```

Mandatory credentials SHALL follow policy-defined expiry behaviour.

---

# 82. Requalification

Qualification SHALL be periodically reassessed where required.

Triggers MAY include:

```text
scheduled review
licence expiry
insurance expiry
new capability request
new market
new trade lane
new cargo class
new facility
ownership change
corporate-control change
material legal change
major safety incident
security incident
fraud concern
significant performance failure
customer complaint
regulatory action
```

---

# 83. Corporate Change

Where Control Plane detects a material canonical organisation change, Thamani MAY receive a requalification trigger.

Examples:

```text
change of legal identity
merger
acquisition
control change
dissolution
regulatory status change
```

Thamani SHALL not independently overwrite canonical organisation identity.

---

# 84. Suspension

Qualification suspension MAY be:

```text
GLOBAL
ROLE_SCOPED
CAPABILITY_SCOPED
MARKET_SCOPED
CORRIDOR_SCOPED
FACILITY_SCOPED
EQUIPMENT_SCOPED
CUSTOMER_SCOPED
```

A problem with one service SHALL not unnecessarily revoke unrelated valid services.

---

# 85. Emergency Hold

Thamani SHALL support emergency restriction where immediate operational risk exists.

Conceptually:

```text
EMERGENCY_HOLD
```

may prevent:

```text
new bookings
new dispatch
new cargo handover
```

while review occurs.

Emergency restriction SHALL be auditable and subject to authorised roles.

---

# 86. Existing Shipments During Suspension

Suspension SHALL NOT blindly cancel every shipment already in progress.

Instead:

```text
Provider Suspended
       │
       ▼
Open Execution Review
       │
       ├── Continue safely
       ├── Stop at safe point
       ├── Reassign future leg
       ├── Recover cargo
       └── Escalate
```

The decision SHALL depend upon safety, legal, contractual and operational context.

---

# 87. Revocation

Revocation SHALL be stronger than ordinary suspension.

Potential reasons include:

```text
licence revoked
fraud confirmed
material misrepresentation
serious safety breach
insurance invalid
regulatory prohibition
persistent non-compliance
security compromise
```

Reason codes SHALL be structured.

---

# 88. Rejection Is Not Deletion

Rejected applications SHALL normally remain retained according to policy for:

```text
audit
fraud prevention
duplicate detection
regulatory defence
appeal/reapplication history
```

subject to privacy and retention requirements.

---

# 89. Appeal / Reconsideration

Where business policy permits, rejected or suspended providers MAY request reconsideration.

The system SHOULD preserve:

```text
decision
reasons
evidence considered
new evidence
reviewer
appeal outcome
```

without rewriting the original decision.

---

# 90. Separation of Duties

High-risk qualification actions SHOULD support maker/checker or equivalent controls.

Examples include:

```text
provider approval
dangerous-goods approval
bank change
regulatory override
insurance waiver
suspension removal
manual verification override
```

One applicant SHALL never approve itself.

---

# 91. Applicant Cannot Verify Own Evidence

This invariant SHALL be mandatory:

```text
Applicant
    may assert

Applicant
    may upload evidence

Applicant
    may not mark
    its own claim VERIFIED
```

---

# 92. Automated Verification

Where authoritative digital verification is available, Thamani/Control Plane MAY verify credentials automatically.

Example:

```text
Submitted permit
      │
      ▼
Authority / approved source
      │
      ▼
Status + scope + expiry
      │
      ▼
Verification Result
```

Automated provider failure SHALL not be treated as verification success.

---

# 93. Manual Verification

Manual review SHALL remain available when:

```text
no API exists
authority is offline
document requires human review
jurisdiction requires physical evidence
source conflict exists
```

Manual verification SHALL record reviewer, method, time and basis.

---

# 94. Evidence Discrepancy

Conflicting evidence SHALL produce a discrepancy, not silent overwrite.

Example:

```text
Provider states:
Licence valid until Dec 2027

Regulator states:
Licence expired Jun 2026
```

The system SHALL preserve both observations and resolve the discrepancy.

---

# 95. Provider Self-Service Changes

Low-risk profile data MAY be self-service.

High-risk changes MAY require review.

Suggested distinction:

```text
LOWER RISK
telephone
ordinary contact
notification preference

HIGHER RISK
legal name
registration
ownership
bank details
licences
insurance
operating authority
approved capability
```

---

# 96. Integration Readiness

Some capabilities MAY require technical readiness.

Examples:

```text
API connectivity
webhook support
EDI
tracking integration
POD integration
e-document support
security credentials
test certification
```

Technical readiness SHALL remain distinct from regulatory qualification.

---

# 97. Manual Providers Remain Possible

A provider SHALL NOT be rejected merely because it lacks sophisticated APIs unless required by service policy.

Thamani MAY support:

```text
API
EDI
portal
structured upload
controlled manual operation
```

according to operating maturity.

Africa's logistics ecosystem SHALL not be architected on the assumption that every qualified SME provider already exposes modern APIs.

---

# 98. Provider Integration Mode

Conceptually:

```text
ProviderIntegrationProfile
├── provider_id
├── API
├── EDI
├── PORTAL
├── EMAIL_ASSISTED
├── MANUAL_CONTROLLED
├── supported_events[]
├── supported_documents[]
└── readiness_status
```

This profile SHALL NOT determine provider identity.

---

# 99. Compliance Is Versioned

A qualification decision SHALL mean:

```text
provider
+
capability
+
scope
+
policy version
+
evidence
+
verification
+
time
```

not:

```text
provider compliant = true
```

---

# 100. Jurisdiction Policy

Qualification policies SHALL be jurisdiction-aware.

The same role MAY have different requirements in:

```text
South Africa
Uganda
Kenya
Tanzania
Rwanda
Botswana
Zimbabwe
Zambia
Mozambique
```

The core domain SHALL not hard-code one jurisdiction's licensing regime as universal.

---

# 101. Effective-Dated Regulation

Policy SHALL support effective dates.

A regulatory change SHALL not silently alter historical assessments.

Conceptually:

```text
QualificationPolicy v3
effective 2026-01-01

QualificationPolicy v4
effective 2027-01-01
```

Assessments retain the policy version under which they were made.

---

# 102. Partner Onboarding Flow

The canonical flow SHALL conceptually be:

```text
Potential Partner
      │
      ▼
Create / Authenticate Representative
      │
      ▼
Resolve Canonical Organisation
      │
      ▼
Establish Thamani Counterparty Relationship
      │
      ▼
Declare Roles / Capabilities
      │
      ▼
Resolve Qualification Requirements
      │
      ▼
Submit Evidence
      │
      ▼
Verify Evidence
      │
      ▼
Assess Capability
      │
      ├── Reject
      ├── Request Information
      ├── Conditionally Approve
      └── Approve
              │
              ▼
      Commercial Onboarding
              │
              ▼
         ERP Readiness
              │
              ▼
      Integration Readiness
              │
              ▼
       Booking Eligibility
```

Not every capability requires every step.

---

# 103. Partner Onboarding Is Not One Transaction

The process SHALL tolerate:

```text
days
weeks
regulatory delays
document expiry
multiple reviewers
partial approvals
resubmissions
```

It SHALL therefore be implemented as durable workflow state rather than a single synchronous HTTP request.

---

# 104. Event Architecture

Cross-repository events SHOULD include concepts such as:

```text
logistics.partner.application.submitted
logistics.partner.organisation.resolved

logistics.partner.role.declared
logistics.partner.capability.declared

logistics.partner.evidence.submitted
logistics.partner.verification.completed

logistics.partner.qualification.approved
logistics.partner.qualification.conditionally_approved
logistics.partner.qualification.restricted
logistics.partner.qualification.suspended
logistics.partner.qualification.expired
logistics.partner.qualification.revoked

logistics.partner.credential.expiring
logistics.partner.credential.expired

logistics.partner.relationship.activated
logistics.partner.relationship.suspended
logistics.partner.relationship.offboarded
```

Exact event names SHALL be defined by Shared contracts.

---

# 105. Shared Contract Requirement

Cross-repository logistics-partner contracts SHOULD be introduced under a namespace such as:

```text
baobab-platform/shared/
└── contracts/
    └── logistics-partner/
        └── v1/
```

Potential canonical schemas include:

```text
LogisticsPartnerReference
ProviderRole
ProviderCapability
QualificationScope
QualificationDecision
RegulatoryCredentialReference
ProviderRelationshipStatus
ProviderQualificationChanged
```

---

# 106. Shared Package Strategy

The existing supplier-domain package MAY provide reusable lifecycle mechanics.

However, Thamani SHOULD NOT distort:

```text
SupplierCapability
```

until it means:

```text
Carrier + Broker + Warehouse + 3PL + Shipping Line
```

A future Shared package MAY extract truly generic mechanisms into something such as:

```text
@baobab-platform/qualification-domain
```

or provide a dedicated:

```text
@baobab-platform/logistics-partner-domain
```

only where reuse justifies it.

---

# 107. No Premature Generic Framework

The platform SHALL NOT build an elaborate universal "anything qualification engine" before Thamani proves the concrete logistics workflows.

Start with explicit logistics semantics.

Generalise only where duplication becomes real.

---

# 108. Persistence Authority

The **Thamani Logistics Qualification Domain** SHALL own:

```text
partner application
Thamani-specific logistics relationship
declared provider capabilities
qualification requirements
qualification assessments
qualification decisions
Thamani-specific restrictions
review lifecycle
operational eligibility
```

It SHALL NOT own:

```text
canonical organisation identity
human authentication
regulator licence truth
ERP financial vendor master
global legal-entity evidence
```

The physical runtime/persistence implementation remains subject to ADR-THA-0015.

---

# 109. Digital Estate Is Not Qualification Authority

The Thamani frontend MAY display and mutate qualification workflows through authorised application APIs.

React/Next.js state SHALL NOT become authoritative qualification state.

The architecture SHALL remain:

```text
Portal
  │
  ▼
Application / Domain API
  │
  ▼
Qualification Domain
```

---

# 110. Document Storage

Qualification artifacts SHALL use an approved evidence/document-storage boundary.

The operational database SHOULD store:

```text
metadata
references
hashes
classification
verification linkage
```

rather than embedding every binary document directly in transactional rows.

---

# 111. Sensitive Evidence

Sensitive provider information MAY include:

```text
identity documents
driver information
bank information
insurance policies
security procedures
beneficial-ownership evidence
licences
contracts
```

Access SHALL follow least privilege.

Partner-portal users SHALL not automatically gain access to every document belonging to their organisation.

---

# 112. Evidence Retention

Retention SHALL be:

```text
purpose-aware
jurisdiction-aware
classification-aware
effective-dated
```

Expired evidence may still require historical retention for audit.

Expiry SHALL not automatically mean immediate deletion.

---

# 113. Audit

The following actions SHALL be auditable:

```text
application submission
organisation resolution
role assignment
capability declaration
evidence upload
verification
qualification approval
conditional approval
restriction
suspension
revocation
manual override
commercial activation
representative changes
bank-detail changes
credential renewal
offboarding
```

---

# 114. Audit Attribution

Every privileged decision SHOULD identify:

```text
actor
authority
time
reason
affected provider
affected capability
scope
previous state
new state
evidence / assessment reference
```

---

# 115. Operational Selection Boundary

Provider qualification SHALL terminate at eligibility.

The subsequent chain is:

```text
QUALIFIED PROVIDERS
       │
       ▼
Rate / Capacity Search
       │
       ▼
Commercial Comparison
       │
       ▼
Provider Selection
       │
       ▼
Booking
       │
       ▼
Physical Execution
```

ADR-THA-0006 and ADR-THA-0005 govern the later stages.

---

# 116. 4PL Implication

Thamani 4PL MAY manage providers that:

```text
compete with Thamani divisions
are larger than Thamani
operate in markets where Thamani has no assets
provide specialist capability Thamani lacks
```

The qualification model SHALL therefore remain provider-neutral.

---

# 117. Internal Provider Representation

Thamani divisions MAY expose operational capabilities through the same conceptual service vocabulary.

For example:

```text
ROAD_HAULAGE
        │
        ├── Thamani Haulage
        ├── External Provider A
        └── External Provider B
```

However, Thamani Global SHALL NOT create itself as a fake external counterparty merely to satisfy a database schema.

Internal capability and external counterparty semantics SHALL remain distinguishable.

---

# 118. Related-Party Providers

Another Nabhold entity MAY legitimately provide a service to Thamani.

Example:

```text
Nabhold Subsidiary X
       │
       ▼
Service Provider to Thamani
```

It SHALL reuse its canonical organisation/legal-entity identity.

It SHALL NOT receive automatic approval merely because it is related to Nabhold.

---

# 119. Offboarding

Provider offboarding SHALL coordinate:

```text
new-booking restriction
open-booking review
portal access
representative membership
contract state
ERP vendor state where appropriate
credential revocation
API credentials
document retention
financial settlement
audit preservation
```

Offboarding SHALL not erase historical shipment relationships.

---

# 120. IAM Revocation Boundary

Suspending a logistics relationship SHALL not necessarily disable a person's global IAM identity.

A person may represent:

```text
multiple organisations
multiple tenants
another valid business relationship
```

The narrowest invalid authority SHALL be revoked first, consistent with IAM lifecycle architecture.

---

# 121. API Credentials

Machine-to-machine provider credentials SHALL be distinct from human identities.

A carrier integration SHOULD use:

```text
workload/service identity
```

rather than:

```text
employee username/password
```

Credentials SHALL support rotation and revocation.

---

# 122. Fraud Controls

Provider onboarding SHOULD anticipate fraud scenarios including:

```text
fake company
identity impersonation
forged licence
altered insurance certificate
bank-detail substitution
fake carrier
cargo-theft setup
account takeover
false capability claims
duplicate provider records
```

Controls SHALL be proportionate to risk.

---

# 123. No Evidence-by-Email as Final Architecture

Email MAY temporarily support operations.

However:

```text
"insurance certificate emailed to operations"
```

SHALL NOT constitute the durable qualification architecture.

Material evidence SHALL eventually enter governed evidence workflows.

---

# 124. Monitoring

The provider-governance architecture SHOULD support ongoing monitoring for:

```text
credential expiry
insurance expiry
regulatory status change
performance deterioration
safety incidents
security incidents
claims
inactive relationship
missing documents
reverification due
```

Onboarding is therefore:

```text
Lifecycle
```

not:

```text
One-time form
```

---

# 125. Readiness Projection

A provider-facing or internal summary MAY show:

```text
Acme Logistics Ltd

Organisation              VERIFIED
Road Haulage               APPROVED
Cross-Border ZA/BW         APPROVED
Cold Chain                 NOT QUALIFIED
Insurance                  CURRENT
C-BRTA Permit              CURRENT
Commercial Contract        ACTIVE
ERP Vendor                 READY
API Integration            OPTIONAL
Overall Bookability        ELIGIBLE
```

This projection SHALL be computed from authoritative underlying states.

---

# 126. No Boolean Readiness Source of Truth

A derived:

```text
bookable = true
```

MAY exist for efficient runtime decisions.

Its derivation SHALL remain reproducible from:

```text
qualification
scope
effective dates
credential status
commercial status
operational policy
```

---

# 127. Fail-Closed Requirements

Mandatory requirements SHALL fail closed.

Example:

```text
Required cross-border permit
       │
       ▼
Cannot establish current validity
       │
       ▼
NOT ELIGIBLE FOR NEW CROSS-BORDER BOOKING
```

The system SHALL not interpret uncertainty as approval.

---

# 128. Conditional Approval

Conditional qualification MAY be supported.

Example:

```text
Provider:
CONDITIONALLY_APPROVED

Conditions:
- maximum 10-tonne loads
- Gauteng only
- no dangerous goods
- daytime operation only
- review after 90 days
```

Conditions SHALL be structured where they affect automated eligibility.

---

# 129. Waivers

Where policy permits a waiver, it SHALL capture:

```text
requirement
reason
approver
legal/policy basis
effective period
scope
compensating controls
```

Mandatory law SHALL not be "waived" merely by software approval.

---

# 130. Provider Performance Feedback Loop

Over time:

```text
Execution Events
      │
      ▼
Provider Performance
      │
      ▼
Threshold / Review Trigger
      │
      ▼
Requalification
```

MAY be implemented.

Performance SHALL trigger review rather than automatically falsifying historical qualifications.

---

# 131. Intelligence Boundary

Baobab Pulse MAY assist with:

```text
risk signals
performance anomaly detection
licence-expiry prioritisation
claims patterns
provider comparison
route risk
fraud indicators
```

AI-generated signals SHALL remain advisory.

This SHALL be prohibited:

```text
AI says provider risky
        therefore
licence = revoked
```

A governed decision is required.

---

# 132. Current Cross-Repo Corrections Required

Implementation of this ADR SHALL trigger review of at least:

```text
baobab-platform/thamani
    docs/adr/0002-supplier-onboarding-portal.md

baobab-platform/shared
    supplier-onboarding assumptions applicable to Thamani

baobab-platform/shared
    contracts/legal-entity/registry.yaml

baobab-platform/baobab-iam
    ADR-0011 Thamani B2C Customer Identity
    ADR-0012 Supplier Identity and Representative Access

baobab-platform/baobab-trade
    Thamani-specific B2C/provider assumptions

baobab-platform/baobab-erp
    supplier/vendor projections where Thamani logistics providers are involved
```

No cross-repository change SHALL be made blindly; each repository's accepted ADRs SHALL be reconciled first.

---

# 133. Implementation Gates

Implementation SHOULD proceed incrementally.

## THA-PQ-00 — Current-State Audit

Inventory:

```text
old Thamani supplier domain
supplier package
IAM supplier identity
canonical organisation model
ERP supplier/vendor mapping
Trade logistics provider model
current Thamani database/state
```

Classify:

```text
KEEP
GENERALISE
SUPERSEDE
MIGRATE
REMOVE
```

---

## THA-PQ-01 — Canonical Role Vocabulary

Define Shared logistics role and capability vocabulary.

Do not duplicate canonical Organisation.

---

## THA-PQ-02 — Logistics Partner Contracts

Create versioned contracts for:

```text
LogisticsPartnerReference
ProviderRole
ProviderCapability
QualificationScope
QualificationDecision
RegulatoryCredentialReference
```

---

## THA-PQ-03 — Organisation Resolution

Integrate Thamani onboarding with Control Plane organisation resolution and evidence architecture.

No estate-minted canonical Organisation IDs.

---

## THA-PQ-04 — Partner Application

Implement:

```text
registration
representative identity
application
role declaration
capability declaration
status workflow
```

---

## THA-PQ-05 — Evidence Integration

Implement secure evidence references and verification linkage.

Do not duplicate BCP evidence storage.

---

## THA-PQ-06 — Qualification Policies

Implement versioned requirement resolution by:

```text
capability
mode
market
jurisdiction
cargo
corridor
```

---

## THA-PQ-07 — Initial Road Carrier Qualification

Prove the architecture with a bounded road-haulage profile.

Suggested initial context:

```text
South Africa
general cargo
domestic + cross-border readiness
```

---

## THA-PQ-08 — Customs Provider Qualification

Add jurisdiction-scoped customs broker/clearing-agent qualification.

---

## THA-PQ-09 — Warehouse / 3PL Qualification

Add facility-level qualification.

---

## THA-PQ-10 — Special Cargo

Add:

```text
cold chain
dangerous goods
project logistics
```

only after the base model is stable.

---

## THA-PQ-11 — IAM Partner Portal

Implement:

```text
representative invitation
organisation membership
role-based access
suspension
offboarding
```

without moving business qualification into IAM.

---

## THA-PQ-12 — ERP Vendor Projection

Implement qualified-provider-to-ERP mapping where financial transactions require it.

---

## THA-PQ-13 — Provider Monitoring

Implement:

```text
expiry alerts
reverification
performance triggers
suspension
review queues
```

---

## THA-PQ-14 — Integration Readiness

Support:

```text
API
EDI
portal
controlled manual provider
```

profiles.

---

## THA-PQ-15 — Production Hardening

Verify:

```text
tenant isolation
evidence access
duplicate organisation handling
fraud scenarios
credential expiry
suspension behaviour
open-shipment impact
IAM revocation
audit completeness
backup/recovery
privacy
regulatory policy versioning
```

before declaring production readiness.

---

# 134. Migration of ADR-0002 Data

Existing Thamani supplier-onboarding data, if present, SHALL NOT be blindly deleted.

Migration SHALL determine whether each record represents:

```text
actual procurement supplier
future logistics provider
customer
test data
obsolete mock
duplicate organisation
```

The correct target SHALL then be chosen.

---

# 135. No Supplier-to-Carrier Rename Migration

This is prohibited:

```text
UPDATE supplier
SET type = 'carrier';
```

as a general migration strategy.

Supplier and logistics-provider relationships have different semantics.

---

# 136. Alternatives Considered

## Alternative A — Continue Using Supplier as Universal Provider

**Rejected.**

A:

```text
carrier
customs broker
warehouse operator
shipping line
```

is not accurately represented merely as a procurement supplier.

---

## Alternative B — Separate Canonical Organisation Per Role

**Rejected.**

It fragments identity.

---

## Alternative C — Make ERP Business Partner Canonical

**Rejected.**

ERP is one projection and financial authority, not the universal platform organisation authority.

---

## Alternative D — Make Keycloak Organisation Canonical

**Rejected.**

IAM organisation represents identity-side membership, not legal/commercial truth.

---

## Alternative E — One Global Provider Approval Boolean

**Rejected.**

Real-world transport eligibility is role-, jurisdiction-, cargo-, permit- and time-dependent.

---

## Alternative F — One Provider Score

**Rejected as authoritative qualification.**

It hides why the provider is or is not eligible.

---

## Alternative G — Separate Provider Database per Thamani Division

**Rejected.**

The same provider may serve multiple divisions.

---

## Alternative H — Require Full Digital Integration Before Approval

**Rejected.**

Operational capability and technical integration maturity are separate concerns.

---

## Alternative I — Trust Provider-Uploaded Licences Without Verification

**Rejected.**

A claim or artifact is not verification.

---

## Alternative J — Duplicate All Control Plane Evidence in Thamani

**Rejected.**

Canonical legal identity and reusable verified evidence belong to the platform evidence architecture.

---

# 137. Positive Consequences

This decision provides:

```text
one canonical organisation identity
multiple logistics roles
scoped qualification
partial approvals
multi-jurisdiction support
licence and permit expiry
provider self-service
representative identity
asset-light scalability
4PL provider neutrality
regulatory traceability
cold-chain extensibility
customs-provider support
safer subcontracting
auditable qualification
clear ERP/IAM/CP boundaries
future automated provider selection
```

---

# 138. Costs and Negative Consequences

This architecture is more complex than:

```text
providers
---------
id
name
approved
```

It requires:

```text
organisation resolution
evidence
verification
qualification policies
capability scopes
effective dates
requalification
partner IAM
regulatory adapters
audit
```

These costs are accepted.

They reflect the actual risk and complexity of using third parties to handle customers' cargo across multiple modes and jurisdictions.

---

# 139. Final Architectural Invariants

The following SHALL remain non-negotiable:

```text
Organisation
    != Counterparty Role

Organisation
    != Provider Profile

Provider
    != Supplier automatically

Provider Role
    != Capability

Provider Role
    != Approval

Claim
    != Evidence

Evidence
    != Verification

Verification
    != Qualification

Qualification
    != Commercial Contract

Qualification
    != ERP Vendor Readiness

Qualification
    != Provider Selection

Qualified
    != Selected

Selected
    != Booked

Portal Access
    != Provider Approval

IAM Organisation
    != Canonical Organisation

ERP Business Partner
    != Canonical Organisation

Licence Submitted
    != Licence Valid

Licence Valid
    != All Services Approved

AEO
    != Universal Provider Approval

Insurance Policy
    != Universal Coverage

One Facility Approved
    != All Facilities Approved

General Cargo Approved
    != Dangerous Goods Approved

Road Haulage Approved
    != Cold Chain Approved

Domestic Road Approved
    != Cross-Border Road Approved

Approval in Jurisdiction A
    != Approval in Jurisdiction B

Organisation Verified
    != Provider Qualified

Provider Qualified
    != Representative Authorised

Representative Authorised
    != Provider Qualified

Provider Suspended
    != Human Identity Deleted

Provider Suspension
    != Automatic Cancellation of Every Open Shipment

Internal Group Relationship
    != Automatic Qualification

Internal Thamani Division
    != Automatically Preferred Provider

Performance Metric
    != Canonical Identity

Performance Score
    != Regulatory Qualification

AI Signal
    != Qualification Decision

Expired Mandatory Credential
    != Current Approval

Applicant
    cannot verify own claim

Historical decision
    must preserve its policy version

Qualification
    must preserve evidence lineage

Regulatory credentials
    must preserve issuer and jurisdiction

Provider eligibility
    must be explainable
```

---

# 140. Final Decision

Thamani Global SHALL establish logistics counterparties as canonical Baobab organisations participating in explicit Thamani-scoped commercial and operational relationships.

A logistics organisation MAY have multiple roles and multiple independently qualified capabilities.

Provider qualification SHALL be:

```text
CAPABILITY-SCOPED
JURISDICTION-SCOPED
CARGO-SCOPED
EVIDENCE-BACKED
VERIFIED
EFFECTIVE-DATED
POLICY-VERSIONED
AUDITABLE
REVOCABLE
```

The authoritative model SHALL be:

```text
                         REAL-WORLD ORGANISATION
                                   │
                                   ▼
                         BAOBAB CONTROL PLANE
                                   │
                         Canonical Organisation
                                   │
                                   ▼
                        Counterparty Relationship
                                   │
                                   ▼
                         THAMANI GLOBAL
                                   │
                       Logistics Provider Profile
                                   │
                  ┌────────────────┼────────────────┐
                  ▼                ▼                ▼
                Roles         Capabilities       Facilities
                  │                │                │
                  └────────────────┼────────────────┘
                                   ▼
                              Claims
                                   │
                                   ▼
                              Evidence
                                   │
                                   ▼
                            Verification
                                   │
                                   ▼
                    Qualification Requirement Set
                                   │
                                   ▼
                        Qualification Assessment
                                   │
                                   ▼
                         Scoped Eligibility
                                   │
                         ┌─────────┴─────────┐
                         ▼                   ▼
                     ELIGIBLE           NOT ELIGIBLE
                         │
                         ▼
                   Commercial Terms
                         │
                         ▼
                    Provider Selection
                         │
                         ▼
                         Booking
                         │
                         ▼
                 Logistics Execution
```

The resulting principle is:

> **Thamani shall know exactly who a logistics partner is, who is authorised to represent it, what capabilities it claims, what evidence supports those claims, what has actually been verified, which services Thamani has approved, in which jurisdictions and operating scopes that approval applies, when the approval expires, and why the provider is—or is not—eligible for a particular shipment.**

And the governing provider principle is:

> **A logistics partner is never simply “approved”; it is qualified for a defined capability, under a defined scope, against a defined policy, supported by current evidence, for a defined period.**
