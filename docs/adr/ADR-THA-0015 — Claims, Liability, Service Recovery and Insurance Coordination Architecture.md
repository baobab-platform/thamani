# ADR-THA-0015 — Claims, Liability, Service Recovery and Insurance Coordination Architecture

**Status:** Accepted — Foundational Thamani Architecture  
**Date:** 2026-10-03  
**Decision Owners:** Nabhold Group Africa / Thamani Global / Baobab Platform Architecture  
**Primary Repository:** `baobab-platform/thamani`  
**Legal Entity:** `THAMANI-GLOBAL`  
**Primary Domain:** Claims / liability / service recovery / insurance coordination / recourse  
**Transport Execution Authority:** `baobab-platform/baobab-tms`  
**Warehouse Execution Authority:** bound warehouse provider  
**Trade-Document / Evidence Authority:** `baobab-platform/baobab-trade-docs`  
**Regulatory Decision Authority:** `baobab-platform/baobab-regulations`  
**Financial Authority:** `baobab-platform/baobab-erp`  
**Identity / Authentication Authority:** `baobab-platform/baobab-iam`  
**Decision Class:** Claims / cargo loss / damage / delay / liability / insurance / settlement / recourse / service recovery / evidence

---

# 1. Normative Dependencies

This ADR SHALL be interpreted consistently with:

- ADR-THA-0003 — Thamani Integrated Logistics Enterprise Domain Boundary
- ADR-THA-0004 — Logistics Counterparty and Provider Qualification
- ADR-THA-0006 — RFQ, Logistics Quotation, Contract, Rate and Margin Architecture
- ADR-THA-0008 — Cross-Border, Customs, Corridor, Transit and Regulatory Architecture
- ADR-THA-0009 — Capability Consumption, Engine Authority and System-of-Record Boundary
- ADR-THA-0010 — Warehousing, 3PL and Inventory-Custody Service Composition Boundary
- ADR-THA-0011 — Cold Chain, Dangerous Goods and Special-Cargo Service Boundary
- ADR-THA-0012 — Project Logistics and Heavy / Abnormal Cargo Service Architecture
- ADR-THA-0013 — 4PL Control Tower, Provider Selection and Multi-Provider Orchestration Architecture
- ADR-THA-0014 — Digital Estate, Customer, Partner and Operations Experience Architecture
- ADR-TMS-0001 / ADR-TMS-0002
- ADR-TDOC-0001 / ADR-TDOC-0002
- applicable ERP, Regulations, IAM, Control Plane and Shared contracts.

---

# 2. Numbering Reconciliation

ADR-THA-0006 currently contains the historical statement:

```text
Runtime Implementation:
Deferred to ADR-THA-0015
```

That statement predates the subsequent decomposition of Thamani's architecture.

It SHALL now be regarded as **superseded**.

The responsibilities originally envisaged as a single commercial runtime decision have subsequently been distributed across:

```text
THA-0009
    system-of-record / capability boundary

TMS ADRs
    transport execution

THA-0010
    warehousing / 3PL

THA-0013
    4PL orchestration

ERP
    financial authority

Control Plane
    capability/provider resolution
```

Therefore:

> **ADR-THA-0015 now normatively means Claims, Liability, Service Recovery and Insurance Coordination Architecture.**

The obsolete forward-reference in ADR-THA-0006 SHOULD be amended when the repository ADR set is reconciled.

---

# 3. Executive Decision

Thamani SHALL establish a first-class **Claims and Service Recovery Domain** for managing logistics losses, damage, delay, shortages, service failures, claims, recourse and insurance coordination.

It SHALL preserve strict separation between:

```text
What happened

What loss occurred

Who is claiming

Who may be responsible

What contract applies

What liability regime applies

What insurance applies

What amount is claimed

What amount is legally owed

What amount an insurer covers

What Thamani commercially offers

What amount is ultimately paid
```

These are different questions.

---

# 4. Governing Principle

> **Operational facts establish what happened; claims assert loss; liability determines legal or contractual responsibility; insurance determines coverage; service recovery determines the commercial response. None of these shall be collapsed into one “claim status.”**

---

# 5. Research Basis — Liability Is Contextual

Transport liability cannot be represented by one universal Baobab formula.

For example, the Montreal Convention 1999 provides a specific international-air-carriage liability regime. ICAO's most recent revision increased the Article 22(3) cargo liability limit to **26 SDR per kilogram**, effective 28 December 2024.

South Africa separately gives the Hague-Visby Rules force of law through the Carriage of Goods by Sea Act for carriage falling within its statutory scope.

The architecture SHALL therefore treat:

```text
mode
jurisdiction
contractual role
contract
route
place of loss
applicable convention/statute
effective date
```

as potentially material to liability.

---

# 6. Sale Risk Is Not Carrier Liability

Incoterms® 2020 allocate specified obligations, costs and risk between buyer and seller, but they do not determine title/ownership and do not themselves resolve all breach, remedies or governing-law questions.

Therefore:

```text
Incoterms Risk Transfer
    != Carrier Liability

Incoterms Risk Transfer
    != Ownership Transfer

Cargo Owner
    != Party Liable for Damage
```

---

# 7. Cargo Insurance Is Not Carrier Liability Insurance

Cargo insurance and logistics-operator liability insurance protect different interests.

Cargo insurance generally protects the cargo interest against insured loss or damage, while liability insurance protects the transport/logistics operator against covered legal liabilities, often subject to contractual or convention-based limits.

Therefore:

```text
Cargo Insurance
    != Carrier Liability Insurance

Insured Value
    != Carrier Liability Limit

Cargo Insurance Payment
    != Admission of Carrier Liability
```

---

# 8. Commercial Dissatisfaction Is Not Necessarily Legal Liability

A customer may suffer poor service without necessarily having a legally compensable loss.

Industry claims guidance explicitly distinguishes commercial dissatisfaction from demonstrable financial loss and notes that commercial settlements may occur even where legal liability is not established.

This distinction SHALL underpin Thamani service recovery.

---

# 9. Core Domain Separation

The following SHALL remain separate:

```text
Operational Event
    != Incident

Incident
    != Exception

Exception
    != Damage

Damage
    != Loss

Loss
    != Claim

Claim Notice
    != Admitted Claim

Claim
    != Liability

Liability
    != Insurance Coverage

Insurance Coverage
    != Insurance Payment

Insurance Payment
    != Customer Settlement

Customer Settlement
    != Provider Recourse

Provider Recourse
    != Insurer Subrogation

Service Recovery
    != Admission of Liability

Credit Note
    != Claim Settlement automatically

Custody
    != Liability

Fault
    != Liability automatically

Delay
    != Compensable Loss automatically
```

---

# 10. Operational Fact Authority

The source domain SHALL remain authoritative for operational facts.

Examples:

| Fact                         | Authority                               |
| ---------------------------- | --------------------------------------- |
| Movement departed            | TMS                                     |
| Movement arrived             | TMS                                     |
| Delivery completed           | TMS                                     |
| Transport custody            | TMS                                     |
| Warehouse receipt            | Warehouse provider                      |
| Warehouse damage observation | Warehouse provider                      |
| Temperature observation      | telemetry source / operational provider |
| Customs hold                 | Trade Docs / external authority         |
| Document issued              | Trade Docs                              |
| Invoice posted               | ERP                                     |

Claims SHALL reference these facts.

Claims SHALL not rewrite them.

---

# 11. Incident

An `Incident` SHALL represent:

> **An operational occurrence that may have caused or contributed to loss, damage, delay, safety impact, regulatory impact or service failure.**

Examples:

```text
vehicle collision

cargo dropped

container damaged

seal broken

temperature-control failure

warehouse fire

theft

short delivery

misdelivery

cargo contamination

reefer failure

missed connection

incorrect routing

water ingress

handling damage
```

---

# 12. Incident Is Not Claim

This remains:

```text
Incident occurred
    !=
Claim exists
```

An incident may produce:

```text
no loss

one claim

several claims
```

---

# 13. Claim Can Exist Without Recorded Incident Initially

A customer may first report:

```text
5 cartons missing
```

before Thamani knows:

```text
where

when

how
```

the loss occurred.

Therefore:

```text
Claim
```

SHALL not require a fully resolved Incident before creation.

---

# 14. Incident Authority

Where the incident is a transport event:

```text
TMS
```

retains the operational source facts.

Where it occurred in warehouse execution:

```text
warehouse provider
```

retains the physical operational facts.

Thamani MAY create a claims-facing incident projection/reference.

---

# 15. FourPLException vs Incident

Following THA-0013:

```text
FourPLException
    operational/customer-management workflow

Incident
    occurrence that may cause harm/loss
```

They MAY be related.

They SHALL not be treated as the same object.

---

# 16. Damage

`Damage` SHALL represent a physical or measurable detrimental change affecting cargo, equipment or other property.

Examples:

```text
crushed cargo

broken packaging

water damage

temperature damage

contamination

impact damage

scratching

structural damage
```

---

# 17. Damage Observation ≠ Cause

This remains:

```text
Cargo damaged
    !=
Carrier caused damage
```

---

# 18. Damage ≠ Financial Loss

A physical defect may:

```text
have no financial consequence

be repairable

reduce value

cause total loss

cause consequential loss
```

Financial loss requires separate assessment.

---

# 19. Loss

A `Loss` SHALL describe the economic or legally relevant harm claimed.

Potential categories include:

```text
TOTAL_CARGO_LOSS

PARTIAL_CARGO_LOSS

PHYSICAL_DAMAGE

SHORTAGE

THEFT

DELAY

MISDELIVERY

CONTAMINATION

TEMPERATURE_EXCURSION_LOSS

REWORK

REPLACEMENT_COST

SALVAGE_LOSS

DISPOSAL_COST

ADDITIONAL_FREIGHT

STORAGE_COST

MITIGATION_COST

CONSEQUENTIAL_LOSS

OTHER
```

The existence of a category SHALL NOT mean it is recoverable.

---

# 20. Claimed Loss ≠ Proven Loss

This is mandatory:

```text
Claimed:
ZAR 1,000,000

    !=

Verified Loss:
ZAR 1,000,000
```

Evidence and applicable law/contract determine what is substantiated.

---

# 21. Claim

A `ClaimCase` SHALL represent a party's assertion that Thamani or another relevant party should provide a remedy for a loss or service failure.

Conceptually:

```text
ClaimCase
├── claim_id
├── tenant_context
├── claimant_ref
├── respondent_refs[]
├── customer_ref?
├── service_order_ref?
├── logistics_shipment_refs[]
├── consignment_refs[]
├── incident_refs[]
├── loss_items[]
├── claimed_amounts[]
├── currencies[]
├── contract_refs[]
├── documentary_refs[]
├── evidence_refs[]
├── liability_assessments[]
├── insurance_case_refs[]
├── recourse_case_refs[]
├── service_recovery_ref?
├── lifecycle_state
├── opened_at
├── limitation/deadline_refs[]
└── version
```

---

# 22. Claimant

The claimant MAY be:

```text
customer

cargo owner

consignee

shipper

insurer/subrogated insurer

provider

third party

another authorised party
```

depending on the legal/commercial relationship.

---

# 23. Respondent

The party against whom the claim is asserted SHALL remain explicit.

Possible respondents include:

```text
Thamani

external carrier

warehouse operator

freight forwarder

subcontractor

other provider
```

---

# 24. Customer Claim ≠ Provider Claim

This relationship may occur:

```text
Customer
    │
    ▼
Claim against Thamani
    │
    ▼
Thamani Recourse
    │
    ▼
Claim against Carrier
```

These SHALL be separate cases.

---

# 25. Back-to-Back Claims Must Not Be Collapsed

A customer may claim:

```text
ZAR 500,000
```

against Thamani.

Thamani may have only:

```text
ZAR 200,000
```

recoverable from a provider.

The architecture SHALL preserve both.

---

# 26. Claim Notice

`ClaimNotice` SHALL represent notification that a claim may or does exist.

It SHALL remain distinct from final substantiation.

Examples:

```text
preliminary notice

formal claim

notice of intent

survey notification

insurance notification
```

---

# 27. Notice Deadline

Many contracts/liability regimes contain:

```text
notice periods

time bars

limitation periods
```

The system SHALL be capable of recording them.

It SHALL NOT assume one universal deadline.

---

# 28. Deadline Source

A deadline SHALL identify its source:

```text
CONTRACT

LAW

CONVENTION

INSURANCE_POLICY

PROVIDER_TERMS

INTERNAL_POLICY
```

---

# 29. Deadline Calculation Is Contextual

This is prohibited:

```text
all cargo claims expire in 30 days
```

The applicable period SHALL be derived from the actual legal/contractual context.

---

# 30. Claim Lifecycle

A canonical Thamani claim workflow SHOULD support:

```text
DRAFT

NOTICE_RECEIVED

ACKNOWLEDGED

INFORMATION_REQUIRED

FACT_GATHERING

ASSESSMENT

NEGOTIATION

SETTLEMENT_PROPOSED

SETTLEMENT_PENDING

SETTLED

REJECTED

WITHDRAWN

DISPUTED

LITIGATION_OR_ARBITRATION

CLOSED
```

Not every case needs every state.

---

# 31. Claim Lifecycle ≠ Liability Position

A case may simultaneously be:

```text
Claim Lifecycle:
ASSESSMENT

Liability Position:
DENIED
```

or:

```text
Claim Lifecycle:
NEGOTIATION

Liability Position:
PARTIALLY_ADMITTED
```

These SHALL be independent.

---

# 32. Liability Position

A separate `LiabilityPosition` MAY include:

```text
NOT_ASSESSED

UNDER_REVIEW

DENIED

PARTIALLY_ADMITTED

ADMITTED

RESERVED

DISPUTED

UNKNOWN
```

---

# 33. “Reserved” Is Not Admission

A party MAY preserve rights while investigating.

Therefore:

```text
RESERVED
    !=
ADMITTED
```

---

# 34. Liability Assessment

Conceptually:

```text
LiabilityAssessment
├── assessment_id
├── claim_id
├── assessing_party
├── contractual_role
├── applicable_contract_refs[]
├── applicable_regime_refs[]
├── incident_facts[]
├── custody_facts[]
├── causation_analysis
├── exclusions_considered[]
├── defences_considered[]
├── liability_limit_basis?
├── limitation_amount?
├── currency?
├── position
├── legal_review_ref?
├── reasoning
├── effective_at
└── version
```

---

# 35. Liability Is Role-Dependent

Thamani may act as:

```text
contractual carrier

freight forwarder

agent

warehouse operator

3PL

4PL

customs broker

principal contracting party
```

depending upon the transaction.

Liability SHALL NOT be inferred simply from:

```text
Thamani participated
```

---

# 36. Freight Forwarder Role Matters

A freight forwarder acting:

```text
as agent
```

may have materially different obligations from one acting:

```text
as contractual carrier/principal
```

The applicable contractual capacity SHALL be explicit.

---

# 37. Custody ≠ Liability

This remains:

```text
Thamani had custody
    !=
Thamani automatically liable
```

and:

```text
External carrier had custody
    !=
External carrier automatically liable
```

Custody is evidence/context.

Liability requires applicable legal/contractual analysis.

---

# 38. Fault ≠ Liability Automatically

Some liability regimes may:

```text
depend on fault

presume liability subject to defences

apply strict/statutory liability

apply contractual caps
```

Therefore one universal:

```text
fault_percentage
```

SHALL not determine legal responsibility.

---

# 39. Causation

Claims SHOULD distinguish:

```text
incident occurred

damage occurred

incident caused damage

damage caused claimed loss
```

These are separate propositions.

---

# 40. Multiple Causes

The model SHALL support:

```text
concurrent causes

successive causes

unknown cause

contributory acts

pre-existing damage
```

without forcing one simplistic cause.

---

# 41. Multiple Responsible Parties

One claim may involve:

```text
carrier

warehouse

packer

customer

manufacturer

terminal
```

in different proportions or legal positions.

The data model SHALL support multiple respondents/recourse parties.

---

# 42. Liability Limit

A liability regime MAY cap recoverable amounts.

The system MAY calculate:

```text
candidate liability limit
```

when rules and facts are sufficiently known.

It SHALL preserve:

```text
legal basis

version/effective date

measurement basis

currency/SDR conversion source

calculation
```

---

# 43. Liability Limit ≠ Claim Value

Example:

```text
Claimed loss:
USD 100,000

Potential legal liability limit:
USD 25,000 equivalent
```

Both SHALL remain visible.

---

# 44. Liability Limit ≠ Settlement Amount

Parties MAY settle:

```text
above

below

or independently of
```

a preliminary liability-limit calculation for lawful commercial reasons.

---

# 45. SDR-Based Limits

Where liability is denominated in:

```text
Special Drawing Rights
```

the architecture SHALL preserve:

```text
SDR amount

conversion date

conversion rate source

resulting currency amount
```

rather than storing only a converted figure.

---

# 46. Regulations Role

Baobab Regulations MAY help determine:

```text
applicable liability regime

statutory/convention requirements

mandatory notice provisions

potential liability limits

jurisdiction-specific restrictions

mandatory insurance requirements
```

where verified regulatory coverage exists.

---

# 47. Regulations Is Not Court or Arbitrator

This SHALL remain:

```text
Regulatory rule evaluation
    !=
binding legal adjudication
```

unless a specific statutory decision can genuinely be deterministically resolved.

Disputed causation, contractual interpretation and negligence MAY require:

```text
legal counsel

arbitration

court

insurer claims specialists

expert assessment
```

---

# 48. Legal Opinion

Where legal advice is obtained, Trade Docs MAY store/reference the formal opinion as a restricted document.

The claims domain SHALL reference it.

---

# 49. External Adjudication

The architecture SHALL accommodate:

```text
court judgment

arbitration award

mediated settlement

regulator decision
```

as external authoritative outcomes.

---

# 50. InsuranceCase

Insurance SHALL be represented separately.

Conceptually:

```text
InsuranceCase
├── insurance_case_id
├── related_claim_refs[]
├── policy_ref
├── insurer_ref
├── insured_party_ref
├── broker_ref?
├── coverage_type
├── notified_at?
├── insurer_claim_ref?
├── claimed_amount
├── coverage_state
├── deductible/excess?
├── insurer_reserve?
├── insurer_payment?
├── subrogation_status?
├── documentary_refs[]
└── status
```

---

# 51. Insurance Policy ≠ Claim

This remains:

```text
Insurance Policy
    !=
Insurance Claim
```

---

# 52. Coverage State

A separate state SHOULD support:

```text
NOT_NOTIFIED

NOTIFIED

COVERAGE_REVIEW

COVERAGE_CONFIRMED

PARTIAL_COVERAGE

COVERAGE_DENIED

SETTLEMENT_PENDING

PAID

CLOSED
```

---

# 53. Insurance Coverage ≠ Liability

This remains:

```text
Thamani legally liable
    !=
Insurer must necessarily cover

Insurer covers claim
    !=
Thamani necessarily admitted liability
```

Policy exclusions, deductibles and other insurance terms may affect coverage independently.

---

# 54. Cargo Insurance

Cargo insurance MAY protect:

```text
cargo owner

shipper

buyer

seller

other cargo interest
```

according to policy.

Thamani SHALL not imply every shipment is automatically insured.

---

# 55. Carrier / Logistics Liability Insurance

Thamani or providers MAY maintain liability coverage for their own operational liabilities.

Such insurance SHALL not be presented to customers as:

```text
your cargo is fully insured
```

unless that is actually true under a separate cargo policy.

---

# 56. Insurance Declaration

Where Thamani arranges cargo insurance for a customer:

```text
insurance offer

insured value

policy/cover note

coverage terms

premium

exclusions
```

SHALL be explicit.

---

# 57. Insurance Requirement ≠ Insurance Placement

This remains:

```text
RFQ says "insurance required"
    !=
insurance successfully bound
```

---

# 58. Policy Evidence

Formal:

```text
insurance certificate

policy

cover note

insurer correspondence
```

SHALL use Trade Docs where treated as governed documents.

---

# 59. Claim Evidence

Claim evidence MAY include:

```text
POD

photos

video

surveyor report

temperature data

packing list

commercial invoice

replacement invoice

repair estimate

warehouse receipt

carrier document

Customs records

police report

incident report

telemetry

witness statement

correspondence
```

---

# 60. Evidence ≠ Document Automatically

Following TDOC-0002:

```text
TradeDocument
    != Evidence
```

A document may serve as evidence.

Raw telemetry may also serve as evidence without becoming a TradeDocument.

---

# 61. Evidence Provenance

Material evidence SHOULD retain:

```text
source

actor/device

time

location where relevant

integrity information

chain of custody where relevant

transformations

document version
```

---

# 62. Original Evidence Must Be Preserved

This SHALL be prohibited:

```text
crop / edit photo
and replace original
```

where evidentiary integrity matters.

Derived/annotated evidence SHALL retain reference to the original.

---

# 63. Survey

A surveyor MAY inspect:

```text
cargo condition

packaging

cause indicators

extent of damage

salvage

repair feasibility
```

A formal survey report SHALL be a TradeDocument.

The surveyor remains the source/author of the expert observations.

---

# 64. Survey Opinion ≠ Liability Decision

This remains:

```text
surveyor believes damage occurred during carriage
    !=
binding liability determination
```

---

# 65. Preservation of Damaged Cargo

Claims workflow MAY require:

```text
hold cargo

preserve packaging

prevent disposal

arrange survey

segregate damaged stock

preserve telemetry
```

according to policy.

---

# 66. Mitigation

Parties may have obligations or commercial incentives to mitigate loss.

Actions MAY include:

```text
salvage

repack

repair

recondition

expedite replacement

reroute

cold storage

emergency delivery

sale of damaged goods
```

---

# 67. Mitigation ≠ Admission

This remains:

```text
Thamani pays for emergency cold store
    !=
Thamani admits legal liability
```

unless expressly stated.

---

# 68. Mitigation Cost

Mitigation costs SHOULD be tracked separately from:

```text
cargo value

claim settlement

service recovery

provider recourse
```

---

# 69. Salvage

The architecture SHOULD support:

```text
salvage value

salvage purchaser

salvage costs

disposal decision

ownership/right to salvage
```

where applicable.

---

# 70. Disposal

Cargo disposal MAY require:

```text
owner approval

insurer approval

regulatory approval

environmental compliance

documentary evidence
```

depending on cargo/context.

Thamani SHALL not assume operational control automatically permits disposal.

---

# 71. Dangerous Goods / Contaminated Cargo

THA-0011 and Regulations SHALL govern applicable safety/regulatory requirements.

Claims urgency SHALL NOT override:

```text
dangerous-goods rules

environmental law

food/pharma controls
```

---

# 72. Temperature Excursion Claim

A cold-chain claim SHALL preserve the distinction:

```text
sensor observation
    ↓
condition assessment
    ↓
excursion
    ↓
product disposition
    ↓
claimed economic loss
```

No step SHALL be inferred solely from the previous one.

---

# 73. Excursion ≠ Damage

This remains:

```text
Temperature excursion
    !=
Cargo destroyed
```

The appropriate qualified authority may determine product disposition.

---

# 74. Delay Claim

A TMS:

```text
late delivery
```

does not automatically establish compensable:

```text
delay damages
```

The claim SHALL consider:

```text
contract

liability regime

causation

claimed loss

exclusions

limits
```

---

# 75. Service-Level Credit

A contract MAY grant:

```text
SLA credit
```

for delay independently of a legal damages claim.

Therefore:

```text
SLA Credit
    !=
Liability Settlement
```

---

# 76. ServiceRecoveryCase

Thamani SHALL model commercial service recovery separately.

Conceptually:

```text
ServiceRecoveryCase
├── recovery_id
├── customer_ref
├── service_order_ref
├── trigger_ref
├── customer_impact
├── proposed_actions[]
├── goodwill_amount?
├── credit_amount?
├── replacement_service?
├── approval_ref?
├── liability_admission_flag
├── communication_refs[]
├── status
└── audit
```

---

# 77. Service Recovery Objectives

Service recovery MAY include:

```text
expedited replacement

free redelivery

fee waiver

service credit

goodwill credit

discount

replacement service

priority handling

account-management intervention
```

---

# 78. Service Recovery ≠ Claim Admission

This SHALL be non-negotiable:

```text
Thamani gives goodwill credit
    !=
Thamani admits legal liability
```

unless explicitly authorised and recorded as such.

---

# 79. Claim Settlement vs Goodwill Settlement

The system SHALL distinguish:

```text
LEGAL / CONTRACTUAL SETTLEMENT
```

from:

```text
COMMERCIAL GOODWILL
```

and:

```text
SLA CREDIT
```

---

# 80. Customer Communication

Customer-facing language SHALL avoid accidental legal admissions.

Communication templates MAY require:

```text
claims/legal approval

insurance approval

management approval
```

for sensitive cases.

---

# 81. Communication Is Not Claim State

Following the planned THA-0016 boundary:

```text
email sent
    !=
claim resolved
```

---

# 82. Provider Recourse

Where Thamani compensates a customer or suffers a loss potentially attributable to a provider, it MAY pursue:

```text
RecourseCase
```

against that provider.

---

# 83. RecourseCase

Conceptually:

```text
RecourseCase
├── recourse_id
├── originating_claim_ref
├── pursuing_party
├── target_provider_ref
├── incident_refs[]
├── contract_refs[]
├── claimed_recovery_amount
├── liability_basis
├── documentary_refs[]
├── status
├── recovered_amount?
└── settlement_ref?
```

---

# 84. Customer Settlement ≠ Recourse Outcome

This remains:

```text
Thamani pays customer today
    !=
Carrier has paid Thamani
```

---

# 85. Recourse May Exceed or Differ From Customer Settlement

Amounts MAY differ because of:

```text
different contractual relationships

different liability limits

deductibles

commercial settlement

currency

legal costs

recoverable heads of loss
```

---

# 86. Subrogation

If an insurer compensates an insured party and obtains recovery rights under applicable policy/law:

```text
subrogation
```

SHALL be represented explicitly.

---

# 87. Subrogated Party

This SHALL be supported:

```text
Original Cargo Interest
        │
        ▼
Insurer Pays
        │
        ▼
Insurer / Subrogated Party
        │
        ▼
Recovery Against Carrier
```

---

# 88. Subrogation ≠ Assignment Automatically

Exact legal effect depends on policy/law.

The platform SHALL preserve the legal basis rather than assume one universal transfer-of-rights model.

---

# 89. Claim Settlement

Conceptually:

```text
ClaimSettlement
├── settlement_id
├── claim_id
├── settlement_type
├── settling_parties[]
├── agreed_amounts[]
├── currency
├── allocation[]
├── tax treatment?
├── release_terms_ref?
├── admission_status
├── approved_by
├── settlement_date
├── financial_refs[]
└── document_refs[]
```

---

# 90. Settlement Type

Potential types:

```text
FULL_AND_FINAL

PARTIAL

INTERIM

WITHOUT_ADMISSION

GOODWILL

SLA_CREDIT

COURT_AWARD

ARBITRAL_AWARD

INSURER_PAYMENT
```

Exact legal language SHALL be reviewed where needed.

---

# 91. Settlement Agreement

A formal settlement/release SHALL be a TradeDocument where appropriate.

---

# 92. Settlement ≠ Payment

This remains:

```text
Settlement agreed
    !=
Settlement paid
```

ERP owns the financial consequence.

---

# 93. ERP Financial Authority

ERP SHALL own:

```text
credit note

payment

receivable adjustment

payable adjustment

claim expense

insurance receivable

provider recovery receivable

financial reserve/provision

write-off

recovery income
```

according to accounting policy.

---

# 94. Claims Domain May Propose, ERP Posts

Thamani Claims MAY calculate/propose:

```text
expected settlement

reserve recommendation

expected recovery

deductible exposure
```

but SHALL not become the financial ledger.

---

# 95. Claim Reserve

This remains:

```text
Claim Reserve Estimate
    !=
Admitted Liability

Claim Reserve Estimate
    !=
Settlement Amount
```

---

# 96. Financial Reserve Versioning

Reserve estimates MAY change as evidence evolves.

ERP SHALL preserve proper accounting/audit treatment.

Claims SHOULD preserve the basis for material reserve changes.

---

# 97. Multi-Currency Claims

Claims MAY involve:

```text
cargo invoice currency

claim currency

liability-limit currency

SDR

settlement currency

accounting currency
```

These SHALL remain distinguishable.

---

# 98. FX Conversion

Every material conversion SHOULD preserve:

```text
source amount

source currency

target currency

rate

rate source

conversion date

purpose
```

---

# 99. Customer Claim vs Insurance Receivable

This accounting distinction SHALL remain visible:

```text
Customer payable/credit
    !=
Insurance recovery receivable
```

---

# 100. Provider Recovery vs Insurance Recovery

Likewise:

```text
Recovery from carrier
    !=
Recovery from insurer
```

---

# 101. Double Recovery Controls

The architecture SHOULD detect/prevent inappropriate duplicate recovery across:

```text
provider

insurer

customer credit

third party
```

subject to legal/accounting policy.

---

# 102. Claims and Incoterms

Where relevant, the claims workflow MAY reference the sale contract's Incoterms® rule to understand risk allocation between seller and buyer.

It SHALL not infer:

```text
Incoterms rule
    =
carrier liability outcome
```

ICC expressly distinguishes the Incoterms allocation of delivery/risk from matters such as ownership and broader remedies.

---

# 103. Claims and TMS

TMS SHALL provide authoritative references for:

```text
LogisticsShipment

Consignment

Movement

Leg

Call

TransportEvent

Delivery

Transport custody
```

Claims SHALL not duplicate those histories.

---

# 104. Claims and Warehouse

Warehouse provider facts MAY establish:

```text
received quantity

condition on receipt

storage history

pick/release quantity

condition on release

warehouse custody
```

These SHALL be referenced, not rewritten.

---

# 105. Claims and Trade Docs

Trade Docs SHALL own formal:

```text
claim notice documents

survey reports

damage reports

insurance certificates

settlement agreements

legal opinions where stored

carrier correspondence where governed

release/discharge documents
```

according to TDOC architecture.

---

# 106. Claims and Regulations

Regulations MAY determine or assist with:

```text
applicable liability conventions

mandatory limits

statutory requirements

claim deadlines

mandatory documentation
```

where supported by verified packs.

Coverage gaps SHALL be explicit.

---

# 107. Claims and 4PL

A THA-0013 `FourPLException` MAY escalate into:

```text
ClaimCase
```

if an actual loss is alleged.

Closing the exception SHALL not close the claim automatically.

---

# 108. Claims and Provider Performance

A substantiated claim MAY contribute to:

```text
provider performance
```

but SHALL NOT automatically alter:

```text
provider qualification
```

unless policy says the event requires qualification review.

---

# 109. Serious Incident May Trigger Qualification Review

Examples:

```text
repeated cargo theft

licence breach

dangerous-goods violation

systemic temperature failures

fraud

material safety breach
```

MAY trigger THA-0004 reassessment.

---

# 110. Claim ≠ Provider Guilt

A provider SHALL not receive an adverse performance result merely because:

```text
claim was submitted
```

without a governed metric/assessment policy.

---

# 111. Fraud / Suspicious Claims

Claims workflow SHOULD support:

```text
suspected fraud

inconsistent evidence

duplicate claim

fabricated invoice

altered document

duplicate recovery
```

as investigation conditions.

---

# 112. Suspected Fraud ≠ Fraud Proven

This remains:

```text
SUSPECTED
    !=
PROVEN
```

---

# 113. Claims Access Control

Claims data may contain:

```text
customer financial loss

insurance policies

legal advice

settlement strategy

personal information

medical/safety information

commercially privileged information
```

Access SHALL be tightly scoped.

---

# 114. Legal Privilege / Restricted Documents

The architecture SHOULD permit special restrictions for:

```text
legal advice

litigation strategy

privileged correspondence
```

without relying merely on normal document visibility.

---

# 115. Partner Visibility

A provider SHALL generally see only:

```text
claim allegations relevant to it

evidence it is permitted to receive

requests for information

its own response

agreed settlement
```

—not Thamani's internal legal/commercial strategy.

---

# 116. Customer Visibility

The customer MAY see:

```text
claim reference

status

requested information

submitted evidence

communications

settlement progress
```

while internal:

```text
provider recourse

reserve

legal opinion

internal assessment
```

may remain restricted.

---

# 117. Claims Portal

THA-0014 Customer Experience MAY provide:

```text
Report Loss / Damage

Submit Claim

Upload Evidence

Track Claim

Respond to Information Request

View Settlement
```

without giving the frontend authority over claim adjudication.

---

# 118. Initial Claim Intake

The UX SHOULD capture:

```text
what happened?

what goods?

which shipment?

when discovered?

where discovered?

quantity affected?

type of damage/loss?

claimed amount?

supporting evidence?

urgent mitigation needed?
```

---

# 119. Claim Intake Should Not Demand Legal Expertise

Customers SHOULD not have to determine:

```text
which convention applies

who is legally liable

which limitation clause applies
```

before reporting a loss.

Those are assessment-stage questions.

---

# 120. Claim Number ≠ Shipment Number

Claim identity SHALL remain separate:

```text
ClaimCase
    !=
LogisticsShipment
```

One Shipment may have several claims.

One claim MAY potentially involve several related movements/service components.

---

# 121. Claim Against Multiple Service Components

In 4PL:

```text
origin warehouse
    +
road carrier
    +
ocean carrier
```

may all be relevant to one customer claim.

The Thamani claim SHALL preserve underlying service-component references.

---

# 122. Unknown Cause

The architecture SHALL support:

```text
cause = UNKNOWN
```

without blocking initial claim intake.

Unknown SHALL not be replaced with the most convenient provider.

---

# 123. Chain of Custody

Custody history SHALL be particularly important when investigating:

```text
loss

shortage

damage

tampering

theft
```

but custody alone SHALL not determine liability.

---

# 124. Seal Evidence

Where containers/trailers use seals, the claim MAY reference:

```text
seal ID

seal application

seal inspection

seal break event

replacement seal
```

from authoritative operational evidence.

---

# 125. Security / Theft Incident

Theft claims MAY involve:

```text
police report

security report

tracking data

driver report

seal evidence

warehouse logs

CCTV references
```

according to availability and law.

---

# 126. Police Report ≠ Liability Decision

This remains:

```text
police incident record
    !=
carrier liability determination
```

---

# 127. General Average

Marine logistics MAY generate specialised insurance/recovery events such as:

```text
general average
```

The architecture SHALL permit specialist case/document references without forcing general-average accounting into the generic claim aggregate.

---

# 128. Project Cargo Claims

THA-0012 claims MAY involve:

```text
cargo damage

lifting damage

engineering failure allegation

delay in start-up

site damage

heavy-haul incident
```

and potentially substantial consequential exposures.

Project claims SHALL reference project and engineering evidence.

---

# 129. Engineering Conclusion ≠ Claims Conclusion

This remains:

```text
Engineer determines lifting point failed
    !=
contractual liability finally determined
```

---

# 130. Claims Legal Regime Profile

Conceptually:

```text
ClaimLegalContext
├── claim_id
├── relevant contracts[]
├── contractual capacities[]
├── transport modes[]
├── jurisdictions[]
├── places of receipt/delivery/loss?
├── applicable law candidates[]
├── convention/statute candidates[]
├── limitation/deadline refs[]
├── dispute forum refs[]
└── assessment_status
```

---

# 131. Governing Law ≠ Jurisdiction

This distinction SHALL remain:

```text
governing law
    !=
court jurisdiction

jurisdiction
    !=
arbitration seat

place of incident
    !=
applicable law automatically
```

---

# 132. Contract Terms

Claims assessment MAY need:

```text
service contract

carrier terms

warehouse terms

bill of lading

air waybill conditions

freight-forwarding terms

insurance policy

customer SLA
```

The exact version applicable at execution time SHALL be preserved.

---

# 133. Current Terms Must Not Rewrite Historical Claims

This SHALL be prohibited:

```text
apply today's carrier terms
to a shipment executed last year
```

if a different version governed the shipment.

---

# 134. Terms Versioning

Material contract terms SHOULD have:

```text
effective_from

effective_to

version
```

and historical references.

---

# 135. Claim Decision

Thamani MAY issue a commercial claim decision such as:

```text
ACCEPT

PARTIALLY_ACCEPT

REJECT

REQUEST_INFORMATION

PROPOSE_SETTLEMENT
```

according to delegated authority.

---

# 136. Claim Decision ≠ Court Judgment

A Thamani internal/customer-facing claims decision remains a contractual/commercial position unless legally binding settlement/adjudication follows.

---

# 137. Approval Thresholds

Claims and settlements SHOULD observe delegated authority based on:

```text
amount

customer

claim type

risk

legal exposure

admission of liability

insurance involvement
```

---

# 138. Separation of Duties

For significant claims:

```text
claims investigator
    !=
settlement approver
```

MAY be required.

Similarly:

```text
provider relationship manager
    !=
sole liability assessor
```

where conflicts exist.

---

# 139. High-Value Claims

High-value claims MAY require:

```text
legal review

insurer notification

executive approval

independent survey

finance reserve

external counsel
```

according to policy.

---

# 140. AI / Pulse Role

Pulse MAY assist with:

```text
claim classification

duplicate detection

document summarisation

timeline reconstruction

missing evidence identification

similar-case retrieval

reserve prediction

fraud anomaly detection

provider-loss trend analysis
```

---

# 141. AI Is Non-Authoritative

AI SHALL NOT independently:

```text
admit liability

deny liability

determine legal regime conclusively

approve settlement

declare fraud proven

alter incident facts
```

---

# 142. AI Recommendation Must Preserve Evidence

If AI suggests:

```text
Likely carrier-caused damage
```

the recommendation SHALL be traceable to evidence and visibly non-authoritative.

---

# 143. Claim Timeline

A claims timeline MAY compose:

```text
shipment departed

incident reported

delivery occurred

damage discovered

claim received

surveyor appointed

insurer notified

liability assessment completed

settlement offered

settlement accepted

payment made

recourse opened

recovery received

case closed
```

with authority retained per event.

---

# 144. Claim Closure

A claim SHOULD not be considered fully closed until applicable:

```text
customer settlement complete

financial posting complete

documents retained

provider recourse disposition known

insurance disposition known

required regulatory reporting complete
```

or explicit policy permits earlier closure with linked residual cases.

---

# 145. Customer Claim Can Close While Recourse Remains Open

Example:

```text
Customer Claim:
CLOSED — PAID

Carrier Recourse:
OPEN
```

This SHALL be supported.

---

# 146. Insurance Case Can Remain Open

Likewise:

```text
Customer Claim:
SETTLED

Insurance Case:
UNDER REVIEW
```

is valid.

---

# 147. Case Linking

The system SHALL preserve relationships among:

```text
Incident

FourPLException

ClaimCase

InsuranceCase

RecourseCase

ServiceRecoveryCase

TradeDocuments

ERP financial entries
```

without collapsing them.

---

# 148. Claim Correlation

A high-level correlation ID MAY assist tracing.

It SHALL NOT replace canonical IDs of each case/domain object.

---

# 149. Notifications

THA-0016 SHALL govern notification mechanics.

Claims SHALL emit/request communication events such as:

```text
Claim received

Information required

Survey scheduled

Settlement offered

Claim closed
```

without embedding email/SMS delivery logic into the claim aggregate.

---

# 150. Claims Metrics

Thamani MAY measure:

```text
claim frequency

claim severity

average settlement

time to acknowledge

time to resolve

recovery rate

insurance recovery rate

service-recovery cost

claims by provider

claims by lane

claims by service

claims by cause
```

---

# 151. Claim Frequency Needs Denominator

This is prohibited:

```text
Carrier A has 20 claims,
therefore worst carrier.
```

Metrics SHOULD normalise against appropriate exposure such as:

```text
shipments

tonnage

revenue

kilometres

handling units

insured value
```

where useful.

---

# 152. Claim Frequency ≠ Liability Rate

Likewise:

```text
claims submitted
    !=
claims upheld
```

Both SHALL be measurable separately.

---

# 153. Claims Analytics ≠ Provider Qualification Automatically

Analytics may trigger review.

It SHALL not silently change qualification state without THA-0004 governance.

---

# 154. Root Cause

Root-cause categories MAY include:

```text
packing

loading

securing

driving

vehicle/equipment

warehouse handling

temperature control

route planning

provider capacity

documentation

customs

customer information

force majeure/external event

unknown
```

subject to evidence.

---

# 155. Root Cause ≠ Legal Liability

This remains one of the most important distinctions:

```text
Operational root cause
    !=
Legal responsibility
```

---

# 156. Corrective Action

A confirmed root cause MAY generate:

```text
provider corrective action

process change

qualification review

training

equipment change

contract amendment

control change
```

outside the claim settlement itself.

---

# 157. Claims as Learning Input

Claims SHOULD contribute to:

```text
provider performance

risk models

service design

route risk

packaging guidance

cold-chain improvement

project-logistics lessons
```

without rewriting historical transactions.

---

# 158. Security and Privacy

Claims data SHALL be classified appropriately and access-controlled.

Particularly sensitive categories include:

```text
legal advice

insurance coverage

reserve amount

settlement authority

customer financial loss

provider liability analysis

personal injury information

fraud suspicion
```

---

# 159. Audit

Material actions SHALL be auditable, including:

```text
claim opened

claim edited

evidence added

liability position changed

insurer notified

reserve recommended

settlement proposed

settlement approved

settlement rejected

payment requested

recourse opened

case closed

case reopened
```

---

# 160. Reopening

A closed case MAY be reopened where:

```text
new evidence

recovery issue

legal dispute

payment failure

fraud concern

court/arbitration development
```

justifies it.

Closure SHALL therefore not mean deletion.

---

# 161. Historical Integrity

Claims SHALL remain reconstructable after:

```text
provider termination

customer exit

shipment archival

document supersession

policy expiry

employee departure
```

according to retention policy.

---

# 162. Implementation Gates

## THA-CLM-00 — Current-State Audit

Audit:

```text
Thamani

TMS

Trade Docs

ERP

Regulations

Shared

provider contracts

current incident/exception handling
```

for existing claims assumptions.

---

## THA-CLM-01 — Claims Taxonomy

Establish:

```text
Incident

Loss

ClaimCase

InsuranceCase

RecourseCase

ServiceRecoveryCase
```

without collapsing them.

---

## THA-CLM-02 — Claim Intake

Implement:

```text
claim notice

claimant

shipment/service references

loss allegation

claimed amount

evidence intake
```

---

## THA-CLM-03 — Operational Evidence Integration

Reference authoritative:

```text
TMS events

warehouse events

custody history

delivery facts

telemetry
```

without duplication.

---

## THA-CLM-04 — Trade Docs Integration

Use TDOC canonical semantics for:

```text
claim notices

surveys

damage reports

insurance documents

settlements

legal documents
```

---

## THA-CLM-05 — Liability Assessment

Implement:

```text
contractual role

legal context

liability position

candidate limits

reasoning

review
```

with no automatic judicial authority.

---

## THA-CLM-06 — Insurance Coordination

Implement separate:

```text
policy reference

coverage case

insurer notification

coverage outcome

payment
```

---

## THA-CLM-07 — Customer Service Recovery

Implement:

```text
goodwill

service credit

redelivery

replacement service

commercial approval
```

separately from legal settlement.

---

## THA-CLM-08 — Provider Recourse

Implement:

```text
customer claim
→ recourse case
→ provider response
→ settlement/recovery
```

without collapsing customer and provider claims.

---

## THA-CLM-09 — ERP Integration

Prove:

```text
settlement approved
        ↓
ERP
credit / payment / reserve
```

and:

```text
provider recovery
        ↓
ERP
recovery receivable / posting
```

---

## THA-CLM-10 — Cold-Chain Reference Claim

Prove:

```text
telemetry
→ excursion
→ assessment
→ product disposition
→ claim
→ liability / insurance
```

without treating excursion as automatic damage.

---

## THA-CLM-11 — Cargo Damage Reference Claim

Prove:

```text
delivery damage
→ incident
→ survey
→ claim
→ assessment
→ settlement
→ provider recourse
```

---

## THA-CLM-12 — Delay Claim

Prove separation between:

```text
TMS lateness

SLA credit

claimed consequential loss

legal liability
```

---

## THA-CLM-13 — Multi-Provider 4PL Claim

Prove one customer claim involving:

```text
warehouse

road carrier

ocean carrier
```

with uncertain causation.

---

## THA-CLM-14 — Security and Privilege

Implement restricted access for:

```text
legal

insurance

reserve

settlement

fraud
```

information.

---

## THA-CLM-15 — Production Hardening

Verify:

```text
tenant isolation

customer/provider data segregation

evidence integrity

version history

deadline handling

currency/SDR calculations

manual review

settlement approvals

ERP reconciliation

duplicate claims

double recovery

audit

retention

backup/recovery
```

---

# 163. Alternatives Considered

## Alternative A — Treat Every Exception as a Claim

**Rejected.**

Many operational exceptions create no loss or claim.

---

## Alternative B — Treat Every Damage Report as Liability Admission

**Rejected.**

Observation and legal responsibility are separate.

---

## Alternative C — Put Claims Inside TMS

**Rejected.**

TMS owns transport execution, not cross-provider claims, insurance and commercial service recovery.

---

## Alternative D — Put Claims Entirely in ERP

**Rejected.**

ERP owns financial consequences, not operational investigation or liability workflow.

---

## Alternative E — Use Trade Docs as Claims Engine

**Rejected.**

Trade Docs governs documents/evidence, not claim adjudication.

---

## Alternative F — Let Regulations Determine Final Liability Automatically

**Rejected.**

Applicable rules may be machine-resolvable; disputed legal liability often is not.

---

## Alternative G — One Status Field for Claim, Liability and Insurance

**Rejected.**

The dimensions evolve independently.

---

## Alternative H — Customer Settlement Automatically Closes Recourse

**Rejected.**

Thamani may still pursue provider/insurer recovery.

---

## Alternative I — Insurer Payment Proves Provider Liability

**Rejected.**

Insurance coverage and legal liability are different.

---

## Alternative J — Goodwill Credit Is Liability Admission

**Rejected.**

Commercial service recovery may occur without admission.

---

## Alternative K — Custody Determines Liability Automatically

**Rejected.**

Custody is relevant evidence but not a universal liability rule.

---

## Alternative L — Hard-Code One Cargo Liability Limit

**Rejected.**

Liability regimes vary by mode, jurisdiction, role, contract and effective date.

---

# 164. Architectural Invariants

```text
Operational Event
    != Incident

Incident
    != Exception

Incident
    != Claim

Damage
    != Liability

Damage
    != Financial Loss automatically

Loss
    != Recoverable Loss automatically

Claim
    != Proven Claim

Claim
    != Liability

Liability
    != Insurance Coverage

Insurance Coverage
    != Settlement

Insurer Payment
    != Admission of Liability

Customer Settlement
    != Provider Recovery

Customer Claim
    != Provider Recourse

Provider Recourse
    != Insurer Subrogation

Service Recovery
    != Liability Settlement

Goodwill Credit
    != Admission

SLA Credit
    != Damages

Custody
    != Liability

Root Cause
    != Legal Liability

Fault
    != Liability automatically

Incoterms Risk
    != Carrier Liability

Ownership
    != Risk of Loss

Cargo Insurance
    != Carrier Liability Insurance

Insured Value
    != Liability Limit

Claim Value
    != Liability Limit

Liability Limit
    != Settlement Amount

Reserve
    != Admission

Claim Closed
    != Recourse Closed

Claim Closed
    != Insurance Case Closed

Survey Opinion
    != Legal Judgment

Regulatory Evaluation
    != Court Judgment

AI Recommendation
    != Liability Decision

TMS Fact
    must not be rewritten by Claims

Warehouse Fact
    must not be rewritten by Claims

TradeDocument
    != Evidence

Evidence
    must retain provenance

Current Contract Terms
    must not rewrite historical terms

Provider Claim Count
    != Provider Guilt

Unknown Cause
    must remain UNKNOWN

Unknown Liability
    must not become DENIED or ADMITTED

Settlement Agreement
    != Financial Payment

ERP
    owns financial posting

Thamani
    owns claims and service-recovery workflow
```

---

# 165. Authority Architecture

```text
                       OPERATION OCCURS
                              │
          ┌───────────────────┼─────────────────────┐
          ▼                   ▼                     ▼
         TMS             WAREHOUSE              TRADE DOCS
 transport facts       physical facts          documents
          │                   │                     │
          └───────────────────┼─────────────────────┘
                              ▼
                           INCIDENT
                              │
                              ▼
                           CLAIM CASE
                              │
             ┌────────────────┼────────────────┐
             ▼                ▼                ▼
       REGULATIONS        LEGAL / EXPERT    INSURANCE
      applicable rules      assessment       coverage
             │                │                │
             └────────────────┼────────────────┘
                              ▼
                      LIABILITY POSITION
                              │
             ┌────────────────┼────────────────┐
             ▼                ▼                ▼
        SETTLEMENT         RECOURSE       SERVICE RECOVERY
             │                │                │
             └────────────────┼────────────────┘
                              ▼
                             ERP
                       financial consequence
                              │
                              ▼
                          CUSTOMER /
                           PROVIDER
```

---

# 166. Example — Damaged Cargo

```text
TMS:
Shipment delivered

Customer:
Cargo visibly damaged
        │
        ▼
ClaimCase opened
        │
        ▼
TMS / Warehouse:
custody + handling history
        │
        ▼
Trade Docs:
POD + photos + survey
        │
        ▼
Claims:
cause / liability assessment
        │
        ├── Customer settlement
        │
        ├── Carrier recourse
        │
        └── Insurance case
        │
        ▼
ERP:
financial postings
```

---

# 167. Example — Cold-Chain Excursion

```text
Telemetry:
9.5°C recorded
      │
      ▼
Condition Assessment:
EXCURSION
      │
      ▼
Qualified Product Assessment:
product unusable
      │
      ▼
Customer:
claims value of product
      │
      ▼
Claims:
investigates custody / equipment / requirements
      │
      ├── Liability
      ├── Insurance
      └── Service Recovery
```

The architecture SHALL NOT jump directly:

```text
9.5°C
→ pay claim
```

---

# 168. Example — Customer Goodwill Without Liability

```text
Shipment delayed
      │
      ▼
Customer dissatisfied
      │
      ▼
No proven compensable financial loss
      │
      ▼
Thamani offers
10% service credit
      │
      ▼
ServiceRecoveryCase
```

No legal-liability admission is implied.

---

# 169. Example — 4PL Multi-Provider Loss

```text
Customer cargo
    │
    ▼
Warehouse A
    │
    ▼
Carrier B
    │
    ▼
Port C
    │
    ▼
Carrier D
    │
    ▼
Shortage discovered
```

Thamani SHALL be able to open:

```text
one customer ClaimCase
```

while separately investigating:

```text
several incidents / custody periods
```

and, if appropriate:

```text
several recourse cases
```

---

# 170. Example — Insurance and Liability Diverge

```text
Customer cargo loss:
ZAR 1,000,000

Thamani liability assessment:
ZAR 300,000 maximum exposure

Cargo insurer:
pays cargo owner ZAR 900,000

Insurer:
pursues subrogated recovery

Thamani:
negotiates carrier recourse
```

The platform SHALL preserve every amount and legal relationship separately.

---

# 171. Final Decision

Thamani SHALL operate a dedicated **Claims, Liability and Service Recovery Domain** that coordinates post-incident customer, provider, insurer and financial workflows while preserving the authority of the systems that recorded the underlying operation.

Thamani SHALL own:

```text
ClaimCase

claims workflow

customer claim intake

claims investigation coordination

liability position

commercial settlement workflow

ServiceRecoveryCase

provider RecourseCase

insurance coordination

customer/provider claims communication

claim analytics
```

TMS SHALL remain authoritative for:

```text
transport events

movement history

transport custody

delivery facts
```

Warehouse providers SHALL remain authoritative for:

```text
warehouse receipt

warehouse condition

physical storage/handling

warehouse custody
```

Trade Docs SHALL remain authoritative for:

```text
formal claim documents

survey reports

insurance documents

settlement documents

document versions

document provenance
```

Regulations SHALL provide, where supported:

```text
applicable legal/regulatory regimes

mandatory requirements

liability-rule context

time-bar / limitation-rule context
```

without becoming a court or arbitrator.

ERP SHALL own:

```text
claim reserves/provisions

credits

payments

receivables

recoveries

insurance receivables

financial settlement
```

Insurers SHALL remain authoritative for their own:

```text
coverage decisions

insurance settlement decisions

subrogation actions
```

and courts, arbitrators, competent authorities and authorised legal decision-makers SHALL remain authoritative for binding external legal determinations.

The defining claims principle is:

> **A claim is an assertion of loss, not proof of liability.**

The defining liability principle is:

> **Liability shall be determined in the actual contractual, modal, jurisdictional and factual context rather than inferred from custody, incident occurrence or customer dissatisfaction.**

The defining insurance principle is:

> **Cargo insurance, liability insurance and legal liability are separate domains whose values, decisions and recoveries must never be conflated.**

The defining service-recovery principle is:

> **Thamani may protect a customer relationship through credits, replacement services or goodwill without manufacturing a legal admission of liability.**

The defining recourse principle is:

> **Customer settlement, provider recovery and insurer recovery shall remain independently traceable cases even when they arise from the same physical incident.**

The defining evidence principle is:

> **Claims shall consume authoritative operational facts and preserved evidence; they shall not rewrite history to fit the eventual commercial or legal outcome.**

And the defining business principle is:

> **When logistics fails, Thamani's value is not only in deciding who may owe what—it is in preserving evidence, protecting the cargo and customer, coordinating recovery, resolving the dispute transparently, and learning from the event without corrupting the underlying operational truth.**
