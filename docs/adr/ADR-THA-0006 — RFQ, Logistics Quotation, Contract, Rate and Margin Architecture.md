# ADR-THA-0006 — RFQ, Logistics Quotation, Contract, Rate and Margin Architecture

**Status:** Accepted — Foundational Thamani Architecture  
**Date:** 2026-09-25  
**Decision Owners:** Nabhold Group Africa / Thamani Global / Baobab Platform Architecture  
**Primary Repository:** `baobab-platform/thamani`  
**Legal Entity:** `THAMANI-GLOBAL`  
**Commercial Domain Authority:** Thamani Logistics Commercial Domain  
**Canonical Contract Authority:** `baobab-platform/shared`  
**Platform Context Authority:** `baobab-platform/baobab-cp`  
**Counterparty / Provider Qualification:** ADR-THA-0004  
**Logistics Execution:** ADR-THA-0005  
**Financial / Accounting Authority:** `baobab-platform/baobab-erp`  
**Trade / Commerce Authority:** `baobab-platform/baobab-trade` where explicitly applicable  
**Intelligence:** `baobab-platform/baobab-pulse` where explicitly governed  
**Runtime Implementation:** Deferred to ADR-THA-0015  
**Decision Class:** RFQ / freight pricing / logistics quotation / rate / tariff / contract / surcharge / margin / commercial approval / reconciliation

---

# 1. Depends On / Reconciles With

This ADR SHALL be interpreted consistently with:

- ADR-THA-0003 — Thamani Global Integrated Shipping, Transportation and Logistics Enterprise Domain Boundary
- ADR-THA-0004 — Canonical Logistics Counterparty, Carrier, Service-Provider Qualification and Partner Onboarding
- ADR-THA-0005 — Shipment, Consignment, Transport Plan, Movement and Execution Lifecycle Architecture
- ADR-BCP-004 — Context, Market, Geography, Legal-Entity and Digital Estate Resolution Model
- ADR-BCP-011 — Market Participation, Trade Lanes and Cross-Market Trading Model
- ADR-BCP-012 — Intercompany and Inter-Branch Trading Model
- ADR-BCP-014 — Canonical Counterparty Identity, Roles and Relationships Model
- ADR-0012 — MedusaJS Commerce Pricing, Price Lists, Promotions and B2B Commercial Terms
- ADR-0019 — B2B Procurement, Supplier Commercial Workflow and Trade-to-ERP Boundary Model
- ADR-0020 — B2B Landed Cost, Margin and Commercial Price Resolution Model
- ADR-0022 — Shipping, Logistics, Freight and Transport Provider Abstraction
- ADR-0026 — Incoterms, Delivery Obligations, Risk Transfer and Title Transfer Model
- ADR-ERP-008 — ERP Financial, Accounting and Multi-Currency Architecture
- ADR-ERP-015 — ERP Inventory, Warehouse, Procurement and Supply-Chain Architecture
- ADR-ERP-016 — Commerce–ERP Integration and Order-to-Cash Architecture
- applicable Shared pricing, money, events, context, organisation, external-reference and evidence contracts.

---

# 2. Research Basis

This decision is informed by freight-forwarding practice and transport-data standards rather than by ecommerce pricing alone.

UN/CEFACT explicitly models a **Logistics Service Charge** with attributes including service category, tariff class, amount, payment arrangement, paying-party role and calculation basis such as volume or per-unit pricing. This strongly supports modelling charges as structured commercial components rather than one opaque freight total.

IATA likewise demonstrates that transport pricing can depend upon a mode-specific **chargeable quantity** rather than physical quantity alone: air cargo may be charged using actual or volumetric weight, with the applicable chargeable weight driving the freight charge.

DCSA's Booking 2.0 architecture separately models booking request, confirmation, amendment, cancellation and rejection. This supports Thamani's existing decision that **commercial quotation and transport booking are separate lifecycle objects**.

FIATA's freight-forwarding framework also recognises that forwarders may act in different contractual capacities, including agent and contractual carrier, meaning commercial pricing and liability assumptions cannot be inferred merely from an organisation being classified as a freight forwarder.

---

# 3. Executive Decision

Thamani SHALL establish a first-class **Logistics Commercial Domain** capable of transforming a customer requirement into a governed logistics offer.

The canonical commercial flow SHALL be:

```text id="tha6-flow-1"
Customer Requirement
        │
        ▼
Logistics RFQ
        │
        ▼
Pricing Context
        │
        ├── Customer Contract?
        ├── Provider Buy Rates
        ├── Internal Cost Rates
        ├── Standard Tariffs
        ├── Spot Rates
        ├── Surcharges
        ├── Accessorials
        ├── Duties / Taxes Estimates
        ├── FX
        └── Risk / Contingency
        │
        ▼
Estimated Commercial Cost Basis
        │
        ▼
Margin / Pricing Policy
        │
        ▼
Customer Sell Price
        │
        ▼
Logistics Quotation
        │
        ├── Internal Approval
        │
        ▼
Customer Acceptance
        │
        ▼
Logistics Service Order
        │
        ▼
Shipment / Consignment / Booking
        │
        ▼
Execution
        │
        ▼
Actual Costs
        │
        ▼
Quoted vs Actual Margin Reconciliation
```

The governing principle is:

> **Thamani shall distinguish what a customer is quoted, what Thamani expects the service to cost, what providers actually charge, what Thamani ultimately invoices, and what margin is ultimately realised.**

---

# 4. Fundamental Commercial Separation

The following concepts SHALL remain separate:

```text id="tha6-separation"
Customer RFQ
    != Provider RFQ

Provider Rate
    != Customer Rate

Provider Quote
    != Customer Quote

Provider Buy Rate
    != Customer Sell Rate

Rate
    != Charge

Tariff
    != Contract

Rate Card
    != Legal Contract

Quote
    != Service Order

Quote
    != Booking

Service Order
    != Shipment

Estimated Cost
    != Actual Cost

Estimated Margin
    != Realised Margin

Markup
    != Margin

Surcharge
    != Tax

Tax
    != Revenue

Pass-Through Charge
    != Margin-Bearing Charge

Rate Validity
    != Capacity Availability

Price Agreement
    != Provider Qualification

Provider Qualification
    != Provider Selection

Provider Selection
    != Provider Booking
```

---

# 5. Logistics Pricing Is Not Product Pricing

Logistics pricing SHALL NOT be modelled merely as:

```text id="tha6-product-price"
Service SKU
+
Price
```

because the same service can have materially different economics depending upon:

```text id="tha6-price-context"
origin
destination
route
corridor
transport mode
provider
equipment
cargo
weight
volume
dimensions
chargeable weight
distance
service level
pickup window
delivery window
season
capacity
border requirements
customs requirements
special handling
dangerous goods
temperature control
customer contract
currency
effective date
```

---

# 6. Logistics Price Context

Every material logistics-pricing resolution SHALL execute under an explicit context.

Conceptually:

```text id="tha6-price-context-model"
LogisticsPriceContext
├── tenant_id
├── legal_entity_id
├── customer_organisation_id?
├── customer_contract_id?
├── origin
├── destination
├── market_context[]
├── trade_lane_id?
├── logistics_corridor_id?
├── transport_mode?
├── service_type
├── service_level?
├── cargo_profile
├── equipment_requirements[]
├── shipment_metrics
├── pickup_window?
├── delivery_window?
├── incoterm_context?
├── currency_preferences[]
├── effective_at
└── pricing_policy_version
```

Pricing SHALL NOT be resolved from one unqualified:

```text id="tha6-rate-query"
origin + destination
```

pair alone.

---

# 7. Customer RFQ

A Customer Logistics RFQ SHALL represent a request for commercial logistics terms.

Conceptually:

```text id="tha6-rfq"
LogisticsRFQ
├── canonical_id
├── customer_id
├── requester_id?
├── origin
├── destination
├── cargo[]
├── weight
├── volume?
├── dimensions?
├── package_count?
├── mode_preference?
├── equipment_requirements[]
├── ready_date
├── required_delivery_date?
├── service_level?
├── special_handling[]
├── dangerous_goods?
├── temperature_profile?
├── customs_requirements?
├── insurance_requirements?
├── incoterm_context?
├── requested_currency?
├── requested_services[]
├── supporting_documents[]
├── status
├── submitted_at
└── external_references[]
```

---

# 8. RFQ Is Not Quote

This SHALL remain invariant:

```text id="tha6-rfq-not-quote"
RFQ
    !=
Quotation
```

An RFQ contains requirements.

A quotation contains Thamani's commercial offer.

---

# 9. RFQ May Be Incomplete

An RFQ MAY initially lack enough information for binding pricing.

Possible states SHALL support:

```text id="tha6-rfq-lifecycle"
DRAFT
SUBMITTED
INFORMATION_REQUIRED
QUALIFIED
PRICING
QUOTED
CANCELLED
DECLINED
```

Thamani SHALL be able to request clarification before committing price.

---

# 10. Indicative vs Firm Quote

Thamani SHALL distinguish at least:

```text id="tha6-quote-types"
INDICATIVE
BUDGETARY
FIRM
CONTRACTUAL
```

or equivalent semantics.

An indicative amount SHALL NOT masquerade as a firm binding offer.

---

# 11. Provider RFQ

Thamani MAY request pricing from qualified logistics providers.

Conceptually:

```text id="tha6-provider-rfq"
Customer RFQ
      │
      ▼
Thamani Pricing Requirement
      │
      ├── Provider RFQ A
      ├── Provider RFQ B
      └── Provider RFQ C
```

Provider RFQs SHALL remain distinct from the customer RFQ.

---

# 12. Provider Eligibility Precedes Provider Pricing

Before relying on a provider quotation:

```text id="tha6-provider-eligibility"
Provider
   │
   ▼
ADR-THA-0004 Qualification
   │
   ▼
Eligible for requested capability?
   │
   ▼
Provider RFQ / Rate Consideration
```

A cheap rate from an ineligible provider SHALL NOT become a valid pricing basis for execution.

---

# 13. Provider Quote

Conceptually:

```text id="tha6-provider-quote"
ProviderQuote
├── provider_id
├── provider_quote_reference
├── requested_service
├── route
├── mode
├── equipment
├── rate_lines[]
├── included_charges[]
├── excluded_charges[]
├── estimated_charges[]
├── free_time?
├── service_level
├── capacity_condition?
├── currency
├── valid_from
├── valid_until
├── transit_time?
├── terms_reference?
└── source_evidence?
```

---

# 14. Provider Quote Is Not Customer Quote

This is prohibited:

```text id="tha6-direct-pass"
provider quote
    =
customer quote
```

as a universal rule.

Thamani may add:

```text id="tha6-value-layer"
orchestrated services
internal operations
commercial margin
risk allowance
insurance arrangement
documentation
customs coordination
warehousing
customer-specific obligations
service guarantees
```

before issuing a customer offer.

---

# 15. Buy Side vs Sell Side

Thamani SHALL maintain explicit sides of pricing:

```text id="tha6-buy-sell"
BUY SIDE
What Thamani expects to pay

SELL SIDE
What Thamani charges the customer
```

The terms MAY be represented as:

```text id="tha6-buy-sell-terms"
BUY_RATE
SELL_RATE
```

or another controlled vocabulary.

They SHALL never be inferred merely from sign or account.

---

# 16. Internal Division Cost Is Not External Buy Rate

When Thamani itself performs transport:

```text id="tha6-internal-cost"
Thamani Haulage
      │
      ▼
Internal Operational Cost Basis
```

MAY replace an external provider quotation.

That internal cost SHALL remain distinct from:

```text id="tha6-fake-vendor"
fake supplier invoice
```

The system SHALL not create fictitious third-party procurement merely to use the same UI.

---

# 17. Cost Source

Commercial pricing SHOULD identify cost source.

Suggested types:

```text id="tha6-cost-source"
EXTERNAL_PROVIDER_CONTRACT
EXTERNAL_PROVIDER_RATE_CARD
EXTERNAL_PROVIDER_SPOT_QUOTE
INTERNAL_STANDARD_COST
INTERNAL_ESTIMATED_COST
HISTORICAL_ACTUAL_COST
MARKET_BENCHMARK
MANUAL_ESTIMATE
OTHER_GOVERNED_SOURCE
```

---

# 18. Rate

A Rate SHALL represent a commercial amount or formula applicable to a measurable logistics service.

Conceptually:

```text id="tha6-rate"
LogisticsRate
├── id
├── side
├── rate_type
├── service
├── service_category
├── calculation_basis
├── unit
├── unit_rate
├── currency
├── minimum_charge?
├── maximum_charge?
├── quantity_breaks[]
├── scope
├── valid_from
├── valid_to
├── source
├── contract_reference?
├── provider_id?
├── customer_id?
└── version
```

---

# 19. Rate Is Not Charge

A Rate answers:

> **How should an applicable service be priced?**

A Charge answers:

> **What monetary amount results when that rate is applied to this transaction?**

Therefore:

```text id="tha6-rate-charge"
Rate
+
Chargeable Quantity
=
Charge
```

subject to minimums, tiers, caps and other rules.

---

# 20. Structured Logistics Charge

Thamani SHOULD align conceptually with UN/CEFACT's structured Logistics Service Charge model, which supports charge category, tariff class, applied amount, calculation basis, payer and payment arrangement.

Conceptually:

```text id="tha6-charge"
LogisticsCharge
├── id
├── charge_type
├── service_category
├── description
├── side
├── source_rate_id?
├── calculation_basis
├── quantity
├── unit
├── unit_rate?
├── amount
├── currency
├── payer?
├── payment_arrangement?
├── estimated_or_actual
├── included_or_excluded
├── taxable_classification?
├── pass_through_policy?
└── evidence_reference?
```

---

# 21. Calculation Basis

The architecture SHALL support extensible calculation bases.

Examples include:

```text id="tha6-bases"
PER_SHIPMENT
PER_CONSIGNMENT
PER_BOOKING

PER_TRIP
PER_KILOMETRE
PER_TONNE
PER_TONNE_KM
PER_VEHICLE

PER_KILOGRAM
PER_CHARGEABLE_KILOGRAM
PER_CUBIC_METRE
PER_WEIGHT_MEASURE

PER_CONTAINER
PER_TEU
PER_EQUIPMENT_UNIT

PER_PACKAGE
PER_PARCEL

PER_PALLET
PER_PALLET_DAY
PER_CBM_DAY
PER_SQUARE_METRE
PER_STORAGE_DAY

PER_STOP
PER_DELIVERY_ATTEMPT

PER_HOUR
PER_DAY
PER_SHIFT

PER_DECLARATION
PER_CLEARANCE
PER_DOCUMENT

PERCENTAGE
FIXED_AMOUNT

PROJECT_FIXED_PRICE
TIME_AND_MATERIALS
MANAGEMENT_FEE
COST_PLUS
```

The vocabulary SHALL remain governed and extensible.

---

# 22. Mode-Specific Pricing

A universal rate formula SHALL NOT be imposed across all divisions.

---

# 23. Road Haulage Pricing

Road rates MAY depend upon:

```text id="tha6-road"
trip
distance
vehicle type
payload
tonnage
tonne-km
route
tolls
border crossings
waiting time
stops
fuel
return-load assumptions
equipment
driver requirements
```

---

# 24. Maritime Pricing

Sea-freight rates MAY depend upon:

```text id="tha6-sea"
container type
equipment size
TEU/FEU basis
weight/measure
port pair
service
voyage
commodity
dangerous goods
reefer requirements
season
capacity
origin charges
destination charges
free time
```

These SHALL remain structured components where practical.

---

# 25. Air-Freight Pricing

Air cargo SHALL support chargeable-weight calculations.

IATA explains that freight charges may be determined from actual versus volumetric weight, using the applicable chargeable weight, rather than physical weight alone.

Thamani SHALL therefore model:

```text id="tha6-air-weight"
actual_weight
volume
volumetric_weight
chargeable_weight
calculation_rule
rule_source
rule_version
```

rather than persisting only:

```text id="tha6-air-bad"
weight = 250
```

---

# 26. Do Not Hard-Code One Volumetric Divisor Globally

Although IATA material references a commonly used air-freight calculation based on dividing cubic centimetres by 6000, the architecture SHALL NOT assume that one divisor applies to:

```text id="tha6-divisor"
all airlines
all couriers
all modes
all provider contracts
all historical periods
```

The rule SHALL be policy/provider/version specific.

---

# 27. Courier Pricing

Courier rates MAY depend upon:

```text id="tha6-courier"
zone
parcel
actual weight
dimensional weight
service level
remote area
delivery attempt
signature
insurance
COD or special service
```

---

# 28. Warehouse Pricing

Warehouse charges MAY use:

```text id="tha6-warehouse"
pallet/day
CBM/day
square metre/month
tonne/day
handling event
inbound receipt
outbound dispatch
pick
pack
cross-dock
special handling
cold storage
```

---

# 29. Customs Brokerage Pricing

Customs service rates MAY use:

```text id="tha6-customs"
per declaration
per entry
per clearance
per tariff line
per shipment
per hour
fixed service fee
```

They SHALL remain separate from duties and taxes imposed by authorities.

---

# 30. 3PL Pricing

3PL agreements MAY combine:

```text id="tha6-3pl"
management fee
storage
handling
transport
fulfilment
transaction fee
labour
minimum monthly charge
volume bands
SLA adjustments
```

---

# 31. 4PL Pricing

4PL commercial models MAY include:

```text id="tha6-4pl"
management fee
fixed retainer
per-shipment fee
transaction fee
gain-share
cost-plus
project fee
control-tower fee
```

No single revenue model SHALL be hard-coded.

---

# 32. Project Logistics Pricing

Project Logistics MAY use:

```text id="tha6-project"
fixed project price
milestone pricing
time and materials
equipment hire
engineering fee
permit costs
escort costs
crane costs
subcontractor costs
contingency
```

A project price MAY cover several Shipments.

---

# 33. Cold-Chain Pricing

Cold-chain rates MAY add:

```text id="tha6-cold"
reefer equipment
temperature monitoring
data logger
cold storage
special packaging
pre-conditioning
backup power
special handling
quality oversight
```

as distinct charge components.

---

# 34. Charge Taxonomy

An initial Thamani charge vocabulary SHOULD include:

```text id="tha6-charge-taxonomy"
BASE_FREIGHT

ORIGIN_HAULAGE
DESTINATION_HAULAGE

ORIGIN_HANDLING
DESTINATION_HANDLING
TERMINAL_HANDLING

FUEL_SURCHARGE
SECURITY_SURCHARGE
PEAK_SURCHARGE
CONGESTION_SURCHARGE
CURRENCY_SURCHARGE

DOCUMENTATION_FEE
BOOKING_FEE

CUSTOMS_CLEARANCE
CUSTOMS_EXAMINATION
TRANSIT_PROCESSING

DANGEROUS_GOODS_SURCHARGE
REEFER_SURCHARGE
COLD_CHAIN_SURCHARGE

REMOTE_AREA_SURCHARGE
OUT_OF_AREA_SURCHARGE

TOLL
BORDER_FEE
ESCORT_FEE

WAITING_TIME
DRIVER_DETENTION

STORAGE
DEMURRAGE
DETENTION

REWEIGH
REMEASURE
REPACK
REDELIVERY
FAILED_DELIVERY

WAREHOUSE_HANDLING
PICK_PACK
CROSS_DOCK

INSURANCE
INSURANCE_ARRANGEMENT_FEE

PROJECT_MANAGEMENT
4PL_MANAGEMENT

OTHER_GOVERNED_CHARGE
```

The vocabulary SHALL remain extensible.

---

# 35. Base Freight Is Not Total Freight

This SHALL remain explicit:

```text id="tha6-base-total"
BASE_FREIGHT
    !=
TOTAL CUSTOMER PRICE
```

The final price may include several additional services and surcharges.

---

# 36. Included vs Excluded Charges

A quote SHALL identify whether a charge is:

```text id="tha6-inclusion"
INCLUDED
EXCLUDED
OPTIONAL
ESTIMATED
PASS_THROUGH
SUBJECT_TO_ACTUAL
```

or an equivalent controlled state.

---

# 37. Silent Exclusions Are Prohibited

Material exclusions SHALL NOT exist only in sales-person memory.

For example:

```text id="tha6-exclusions"
customs duties excluded
destination storage excluded
demurrage excluded
insurance excluded
```

SHOULD be structurally expressible and displayed according to quotation policy.

---

# 38. Estimated Charges

Certain charges MAY not be determinable when a quote is issued.

Examples include:

```text id="tha6-estimated"
customs examination
unexpected storage
port congestion
detention
demurrage
inspection
certain duties/taxes
emergency handling
```

They MAY therefore be represented as:

```text id="tha6-subject-actual"
ESTIMATED
or
SUBJECT_TO_ACTUAL
```

subject to contractual terms.

---

# 39. Estimated Charge Is Not Unlimited Authority

This SHALL be prohibited:

```text id="tha6-blank-cheque"
Other charges:
whatever Thamani later decides
```

Variable charges SHALL have:

```text id="tha6-variable-control"
defined category
basis
responsibility
evidence/source
contractual basis
```

where practicable.

---

# 40. Surcharge

A Surcharge SHALL be a separately identifiable commercial adjustment associated with a defined cause or pricing policy.

It SHALL retain:

```text id="tha6-surcharge"
type
basis
amount/formula
currency
source
effective period
applicability
```

---

# 41. Indexed Surcharge

Some surcharges MAY be formula-driven.

Conceptually:

```text id="tha6-indexed"
IndexedSurcharge
├── charge_type
├── reference_index
├── index_source
├── baseline_value
├── current_value
├── formula
├── effective_period
├── rounding_policy
└── version
```

---

# 42. Historical Index Reproducibility

A quotation using an indexed surcharge SHALL retain sufficient information to reproduce what was calculated.

This SHALL be avoided:

```text id="tha6-live-index"
quote
  → always read today's index
```

for a historical transaction.

---

# 43. Fuel Surcharge

Fuel surcharge policy MAY use:

```text id="tha6-fuel"
fixed amount
percentage
distance-based amount
index-based table
fuel-band model
```

The actual formula SHALL be effective-dated and governed.

---

# 44. Surcharge Is Not Automatically Margin

Some surcharges may:

```text id="tha6-margin-surcharge"
recover external cost
recover internal operational cost
contain commercial margin
be passed through unchanged
```

The pricing policy SHALL explicitly determine treatment.

---

# 45. Pass-Through Charges

A Pass-Through Charge represents a third-party or authority charge that Thamani commercially passes to the customer according to contract.

Conceptually:

```text id="tha6-pass-through"
PassThroughCharge
├── charge
├── source_party
├── source_reference
├── estimated_or_actual
├── markup_policy
├── customer_visibility
└── evidence_reference?
```

---

# 46. Pass-Through Does Not Mean No Markup Universally

The architecture SHALL allow policy to specify:

```text id="tha6-pass-through-policy"
NO_MARKUP
FIXED_ADMIN_FEE
PERCENTAGE_MARKUP
INCLUDED_IN_PACKAGE
```

where legally and contractually appropriate.

The software SHALL not assume one rule globally.

---

# 47. Duties and Taxes

Customs duties, VAT/GST and similar authority-imposed amounts SHALL remain distinguishable from logistics revenue.

This SHALL remain:

```text id="tha6-tax"
Tax / Duty
    !=
Freight Revenue
```

Actual accounting and tax treatment remains ERP/tax-domain authority.

---

# 48. Quote Display of Duties and Taxes

A quote MAY identify:

```text id="tha6-tax-display"
INCLUDED
EXCLUDED
ESTIMATED
PAYABLE_DIRECTLY_BY_CUSTOMER
SUBJECT_TO_CUSTOMS_ASSESSMENT
```

depending upon the service contract.

---

# 49. Incoterms

Where relevant, ADR-0026 remains authoritative.

An Incoterm MAY influence:

```text id="tha6-incoterm"
who arranges transport
who pays certain transport costs
who handles export formalities
who handles import formalities
```

but SHALL NOT itself calculate a Thamani rate.

---

# 50. Quote Currency

Every quote SHALL have explicit currency.

Example:

```text id="tha6-currency"
Quote:
USD 12,450
```

is valid even if:

```text id="tha6-fx-components"
road carrier buy rate = UGX
ocean carrier buy rate = USD
destination carrier buy rate = ZAR
```

---

# 51. Multi-Currency Cost Composition

Thamani SHALL support a quote containing cost inputs in multiple currencies.

Conceptually:

```text id="tha6-multi-currency"
UGX provider cost
      │
USD ocean cost
      │
ZAR destination cost
      │
      ▼
FX Resolution
      │
      ▼
Commercial Cost Basis
      │
      ▼
Customer Quote Currency
```

---

# 52. FX Context

Where currency conversion contributes to pricing, the calculation SHALL preserve:

```text id="tha6-fx-context"
source_amount
source_currency
target_currency
rate
rate_source
rate_timestamp
rate_type
spread/adjustment?
rounding_policy
```

---

# 53. Pricing FX Is Not Accounting FX

This SHALL remain mandatory:

```text id="tha6-fx-separate"
Quotation FX Rate
    !=
ERP Accounting FX Rate
```

They may coincide.

They serve different decisions.

ERP remains authoritative for financial posting.

---

# 54. FX Buffer

Commercial policy MAY include an FX risk buffer where:

```text id="tha6-fx-risk"
quote valid for several days
+
provider costs in another currency
```

creates risk.

Such buffer SHALL be governed and auditable.

---

# 55. FX Buffer Is Not Hidden Accounting Adjustment

Any commercial FX risk adjustment SHALL remain a pricing-domain fact.

It SHALL not rewrite ERP accounting exchange rates.

---

# 56. Rate Sources

Thamani SHALL support several rate sources:

```text id="tha6-rate-sources"
STANDARD_TARIFF
CUSTOMER_CONTRACT
PROVIDER_CONTRACT
PROVIDER_RATE_CARD
PROVIDER_SPOT_QUOTE
INTERNAL_RATE_CARD
TENDER_RATE
PROMOTIONAL_RATE
PROJECT_RATE
INDEXED_RATE
MANUAL_APPROVED_RATE
```

---

# 57. Standard Tariff

A Standard Tariff MAY define default sell rates for routine services.

It SHALL have explicit scope and effective dates.

---

# 58. Rate Card

A Rate Card SHALL represent a governed collection of rates.

Conceptually:

```text id="tha6-rate-card"
RateCard
├── id
├── side
├── owner/reference_party
├── customer_id?
├── provider_id?
├── contract_id?
├── service_scope
├── geography_scope
├── mode_scope
├── currency
├── rates[]
├── valid_from
├── valid_to
├── status
└── version
```

---

# 59. Rate Card Is Not Contract

This SHALL remain:

```text id="tha6-card-contract"
RateCard
    !=
Contract
```

A contract MAY reference several rate cards.

A rate card MAY implement contractual pricing terms.

---

# 60. Spot Rate

A Spot Rate SHALL represent pricing obtained or offered for a specific requirement or short validity window.

It MAY depend on:

```text id="tha6-spot"
current capacity
specific sailing/flight
specific vehicle
specific route
current market conditions
```

A Spot Rate SHALL normally carry explicit expiry.

---

# 61. Contract Rate

A Contract Rate SHALL be linked to a governed commercial agreement and effective scope.

Contract rate scope MAY include:

```text id="tha6-contract-rate-scope"
customer/provider
service
lane/corridor
origin
destination
mode
equipment
cargo class
volume band
minimum commitment
currency
effective period
```

---

# 62. Tender Rate

A negotiated tender award MAY establish rates across:

```text id="tha6-tender"
many lanes
many services
many volume bands
many equipment types
```

without becoming one unstructured spreadsheet blob.

Import tooling MAY ingest tender spreadsheets, but canonical rate data SHOULD become structured.

---

# 63. Pricing Precedence

Where several rates apply, precedence SHALL be policy-driven.

A possible model MAY resemble:

```text id="tha6-precedence"
Specific Customer Contract
        ↓
Customer/Lane Rate
        ↓
Customer Rate Card
        ↓
Standard Market Tariff
        ↓
Spot Pricing
```

but this SHALL NOT be hard-coded universally.

---

# 64. Rate Resolution Must Be Explainable

For any quoted charge, Thamani SHOULD be able to answer:

```text id="tha6-explain"
Which rate was selected?

Why did it apply?

Which higher/lower precedence rates were ignored?

Which quantity tier applied?

Which surcharge policy applied?

Which FX rate applied?

Which manual override occurred?
```

---

# 65. Quantity Breaks

Rates SHALL support tiering.

Example:

```text id="tha6-tier"
0–999 kg
1000–4999 kg
5000+ kg
```

or:

```text id="tha6-storage-tier"
Days 1–7
Days 8–14
Days 15+
```

The tier policy SHALL identify whether calculation uses:

```text id="tha6-tier-method"
graduated
all-units
threshold
other governed method
```

---

# 66. Minimum Charge

A rate MAY define:

```text id="tha6-min-charge"
minimum_charge
```

Example:

```text id="tha6-min-example"
Calculated amount = ZAR 650
Minimum charge = ZAR 900

Applied charge = ZAR 900
```

---

# 67. Maximum / Capped Charge

Where commercial policy requires, a rate MAY define:

```text id="tha6-cap"
maximum_charge
```

or other cap semantics.

---

# 68. Free Allowance

Certain services MAY include a free allowance.

Examples:

```text id="tha6-free"
free storage days
free waiting period
free detention period
free delivery attempts
included stops
included kilometres
```

The allowance SHALL be explicit.

---

# 69. Demurrage and Detention

Demurrage and detention SHALL be represented as distinct charge concepts where the applicable service uses them.

FIATA has published dedicated best-practice material on container demurrage and detention and has emphasised clarity and accessibility of applicable charging policies.

---

# 70. Demurrage / Detention Model

Conceptually:

```text id="tha6-demurrage"
TimeBasedEquipmentCharge
├── charge_type
├── equipment_id?
├── provider_id
├── location/facility?
├── trigger_event
├── free_time
├── charge_start
├── charge_stop
├── calendar_policy
├── rate_tiers[]
├── currency
├── exclusions[]
├── waiver_reference?
├── dispute_reference?
└── evidence[]
```

---

# 71. Free Time Must Be Reconstructable

The system SHOULD be able to explain:

```text id="tha6-free-time"
When did free time start?

How many free days applied?

Which calendar was used?

When did chargeable time begin?

When did the timer stop?

Which tier applied?
```

---

# 72. Storage Is Not Automatically Demurrage

This SHALL remain:

```text id="tha6-storage-demurrage"
STORAGE
    !=
DEMURRAGE
    !=
DETENTION
```

even where providers use overlapping commercial terminology.

Provider-native names MAY be mapped to canonical charge categories.

---

# 73. Waiting Time

Road-haulage waiting time SHOULD similarly retain:

```text id="tha6-waiting"
arrival event
free waiting period
chargeable start
release/departure event
rate
elapsed chargeable time
```

rather than manual amount-only entry where operational events are available.

---

# 74. Actual Event Can Drive Actual Charge

A mature system MAY derive operational charges from ADR-THA-0005 events.

Example:

```text id="tha6-event-charge"
Truck Arrived
     │
     ▼
Free Waiting Window
     │
     ▼
Truck Released
     │
     ▼
Chargeable Duration
     │
     ▼
Waiting Charge
```

The calculated charge SHALL remain auditable.

---

# 75. Contract

A Logistics Commercial Contract SHALL represent a governed agreement between Thamani and a counterparty.

Possible categories include:

```text id="tha6-contract-types"
MASTER_SERVICE_AGREEMENT
CUSTOMER_LOGISTICS_CONTRACT
PROVIDER_SERVICE_CONTRACT
RATE_AGREEMENT
FRAMEWORK_AGREEMENT
TENDER_AWARD
SERVICE_LEVEL_AGREEMENT
PROJECT_CONTRACT
AGENCY_AGREEMENT
WAREHOUSING_AGREEMENT
3PL_AGREEMENT
4PL_AGREEMENT
```

---

# 76. Contract Identity

Conceptually:

```text id="tha6-contract"
LogisticsContract
├── canonical_id
├── contract_type
├── thamani_legal_entity_id
├── counterparty_id
├── contract_reference
├── effective_from
├── effective_to?
├── renewal_policy?
├── service_scope[]
├── geographic_scope[]
├── rate_schedule_refs[]
├── surcharge_policy_refs[]
├── SLA_refs[]
├── payment_terms_ref?
├── liability_terms_ref?
├── document_reference
├── status
└── version
```

---

# 77. Contract Metadata Is Not Legal Document

This SHALL remain:

```text id="tha6-contract-doc"
Contract Domain Record
    !=
Signed Contract Artifact
```

The operational record references the legally authoritative artifact.

It SHALL not attempt to reproduce every paragraph as database fields.

---

# 78. Important Commercial Terms Should Be Structured

Terms affecting automated pricing or execution SHOULD be structured.

Examples:

```text id="tha6-structured-contract"
effective period
lane
service
currency
rate
volume band
minimum spend
free time
fuel formula
payment terms
SLA targets
customer approval requirements
```

---

# 79. Contract Versioning

Commercial agreements SHALL support amendment/version history.

This SHALL be prohibited:

```text id="tha6-contract-overwrite"
overwrite 2026 rate
with 2027 rate
```

such that historical transactions can no longer be reconstructed.

---

# 80. Contract Effective Dating

The system SHALL support:

```text id="tha6-effective"
future contract
active contract
expired contract
terminated contract
superseded contract
```

A future rate SHALL not apply before its effective date.

---

# 81. Expired Rate

An expired rate SHALL not be used for a new binding quotation unless an authorised override explicitly permits it.

---

# 82. Quote

A Logistics Quotation SHALL represent Thamani's commercial offer to a customer.

Conceptually:

```text id="tha6-quote"
LogisticsQuote
├── canonical_id
├── quote_number
├── rfq_id
├── customer_id
├── legal_entity_id
├── quote_type
├── service_scope
├── route_summary
├── cargo_summary
├── charges[]
├── currency
├── subtotal
├── taxes?
├── total
├── included_services[]
├── exclusions[]
├── assumptions[]
├── validity
├── estimated_transit?
├── service_level?
├── terms_reference?
├── pricing_snapshot
├── approval_state
├── lifecycle_state
├── issued_at?
├── accepted_at?
└── version
```

---

# 83. Quote Snapshot

When issued, a Quote SHALL retain a snapshot sufficient to reconstruct:

```text id="tha6-quote-snapshot"
pricing context
rates applied
charge quantities
FX rates
surcharges
cost basis
margin policy
manual overrides
contract references
assumptions
```

---

# 84. Quote Lifecycle

A quotation SHOULD support:

```text id="tha6-quote-lifecycle"
DRAFT
   │
   ▼
PRICED
   │
   ▼
INTERNAL_REVIEW
   │
   ├──► REJECTED_INTERNAL
   │
   ▼
APPROVED
   │
   ▼
ISSUED
   │
   ├──► REVISED
   ├──► WITHDRAWN
   ├──► EXPIRED
   ├──► CUSTOMER_REJECTED
   └──► CUSTOMER_ACCEPTED
```

---

# 85. Issued Quote Is Immutable in Substance

Once a Quote is externally issued, material changes SHALL create:

```text id="tha6-revision"
Quote Revision
```

rather than silently modifying the original offer.

---

# 86. Quote Revision

Example:

```text id="tha6-quote-revisions"
Q-1042 v1
USD 4,800
Issued

Q-1042 v2
USD 5,050
Reason: customer increased cargo volume
Supersedes v1
```

Both SHALL remain auditable.

---

# 87. Quote Validity

Every firm quote SHOULD define:

```text id="tha6-validity"
valid_from
valid_until
```

unless governed by an active contractual rate arrangement that establishes equivalent rules.

---

# 88. Expired Quote Acceptance

This SHALL normally be prohibited:

```text id="tha6-expired-acceptance"
Customer accepts expired quote
        │
        ▼
automatically create binding service
```

Instead:

```text id="tha6-revalidation"
Expired Quote
     │
     ▼
Revalidation / Repricing
     │
     ▼
New or Reconfirmed Offer
```

---

# 89. Quote Validity Does Not Guarantee Capacity

This distinction SHALL be explicit:

```text id="tha6-validity-capacity"
PRICE VALIDITY
    !=
CAPACITY GUARANTEE
```

unless contract terms explicitly guarantee capacity.

---

# 90. Capacity Is Execution-Side Fact

ADR-THA-0005/0007 SHALL govern physical capacity.

The quote MAY state:

```text id="tha6-capacity-terms"
subject to capacity
capacity reserved
guaranteed capacity
```

but pricing alone SHALL not invent capacity.

---

# 91. Quote Acceptance

Customer acceptance SHALL capture:

```text id="tha6-acceptance"
who accepted
organisation
authority
quote version
accepted_at
acceptance mechanism
terms accepted
customer reference?
```

where required.

---

# 92. Acceptance Must Target a Specific Revision

This SHALL be prohibited:

```text id="tha6-accept-latest"
accept Quote Q-1042
```

without identifying which issued revision was accepted when several exist.

---

# 93. Quote Acceptance Is Not Provider Booking

This remains mandatory:

```text id="tha6-accept-book"
Customer Quote Accepted
    !=
Carrier Booked
```

DCSA's container Booking standard separately models booking request, confirmation, amendment, rejection and cancellation, reinforcing this lifecycle separation.

---

# 94. Accepted Quote Becomes Commercial Commitment

Acceptance SHOULD establish or feed:

```text id="tha6-service-order"
Logistics Service Order
```

according to contractual policy.

---

# 95. Logistics Service Order

Conceptually:

```text id="tha6-service-order-model"
LogisticsServiceOrder
├── canonical_id
├── customer_id
├── accepted_quote_id
├── contract_id?
├── customer_reference?
├── service_scope
├── committed_sell_charges[]
├── commercial_terms_snapshot
├── status
└── external_references[]
```

---

# 96. Service Order Is Pricing Commitment Snapshot

Once committed, the Service Order SHALL preserve the customer commercial terms.

Later tariff changes SHALL not silently reprice the committed service unless the contract explicitly permits adjustment.

---

# 97. Service Order Is Not Invoice

This SHALL remain:

```text id="tha6-order-invoice"
Logistics Service Order
    !=
Customer Invoice
```

The invoice remains ERP/financial-domain authority.

---

# 98. Service Order Is Not Shipment

One Service Order MAY contain:

```text id="tha6-order-shipment"
one shipment
many shipments
recurring logistics services
warehousing services
4PL management services
```

depending on the customer contract.

---

# 99. Quote to Execution

The canonical transition is:

```text id="tha6-quote-exec"
Quote Accepted
       │
       ▼
Service Order
       │
       ▼
Shipment / Consignment Requirement
       │
       ▼
Provider Selection
       │
       ▼
Provider Booking
       │
       ▼
Execution
```

---

# 100. Customer Sell Price

The Customer Sell Price SHALL represent Thamani's committed commercial charge.

It may originate from:

```text id="tha6-sell-price"
contract rate
standard tariff
spot calculation
project pricing
negotiated override
package price
cost-plus formula
```

---

# 101. Commercial Cost Basis

Thamani SHALL maintain an explicit **Estimated Commercial Cost Basis** during quotation.

Conceptually:

```text id="tha6-cost-basis"
CommercialCostBasis
├── quote_id
├── cost_components[]
├── base_currency
├── source
├── estimated_total
├── risk_allowance?
├── operational_allocation?
├── pricing_date
└── version
```

---

# 102. Cost Components

Initial logistics cost categories SHOULD include:

```text id="tha6-cost-components"
EXTERNAL_FREIGHT
INTERNAL_TRANSPORT_COST
WAREHOUSE_COST
TERMINAL_COST
CUSTOMS_BROKER_COST
DOCUMENT_COST
PORT_COST
AIRPORT_COST
TOLL_COST
BORDER_COST
FUEL_COST
INSURANCE_COST
EQUIPMENT_COST
LABOUR_COST
SUBCONTRACTOR_COST
HANDLING_COST
STORAGE_COST
EXPECTED_DEMURRAGE
EXPECTED_DETENTION
SPECIAL_CARGO_COST
SECURITY_COST
TECHNOLOGY_COST
ALLOCATED_OPERATING_COST
FINANCING_COST
FX_RISK_ALLOWANCE
CONTINGENCY
OTHER_APPROVED_COST
```

---

# 103. Cost Classification

Every cost component SHOULD identify:

```text id="tha6-cost-class"
ESTIMATED
ACTUAL
STANDARD
ALLOCATED
CONTINGENT
```

as appropriate.

---

# 104. Estimated Cost Is Not ERP Actual Cost

This SHALL remain:

```text id="tha6-est-actual"
Estimated Commercial Cost
    !=
ERP Actual Cost
```

The former supports quoting.

The latter supports financial truth.

---

# 105. Actual Provider Costs

After execution, actual provider costs may arrive as:

```text id="tha6-actual"
provider invoice
debit note
credit note
approved accrual
settlement statement
```

ERP SHALL remain authoritative for financial consequences.

---

# 106. Operational Cost Projection

The Thamani commercial domain MAY consume actual/approved cost projections from ERP to calculate commercial performance.

It SHALL not maintain a shadow AP ledger.

---

# 107. Margin

The system SHALL explicitly distinguish:

```text id="tha6-margin-terms"
markup
gross profit
gross margin
contribution margin
net margin
```

where used.

No ambiguous field named only:

```text id="tha6-margin-bad"
margin
```

SHOULD be used without a defined formula.

---

# 108. Gross Profit

A basic direct-service gross-profit calculation MAY be:

```text id="tha6-gp"
Gross Profit
=
Net Sell Revenue
-
Direct Service Cost
```

The precise cost/revenue basis SHALL be governed.

---

# 109. Markup

Markup percentage SHALL conceptually mean:

```text id="tha6-markup-formula"
Markup %
=
(Sell Price - Cost Basis)
/
Cost Basis
× 100
```

---

# 110. Gross Margin

Gross-margin percentage SHALL conceptually mean:

```text id="tha6-margin-formula"
Gross Margin %
=
(Sell Price - Cost Basis)
/
Sell Price
× 100
```

---

# 111. Markup and Margin Are Not Interchangeable

Example:

```text id="tha6-markup-example"
Cost = 100
Sell = 125

Markup = 25%
Gross Margin = 20%
```

The system SHALL not treat both values as `25%`.

---

# 112. Margin Basis

Pricing policy SHALL define which amounts participate in margin.

For example:

```text id="tha6-margin-basis"
customer freight revenue
less
direct external carrier cost
```

may differ from a management view including:

```text id="tha6-margin-full"
internal labour
technology allocation
overheads
finance costs
```

---

# 113. Taxes Normally Excluded From Margin Basis

Tax amounts collected on behalf of tax authorities SHOULD NOT ordinarily inflate commercial margin calculations.

Exact accounting classification remains ERP authority.

---

# 114. Pass-Through Treatment in Margin

Pricing policy SHALL specify whether pass-through charges are:

```text id="tha6-pass-margin"
excluded from margin calculation
included at zero margin
marked up
bundled
```

rather than applying one universal rule.

---

# 115. Target Margin

Thamani MAY establish target margin by:

```text id="tha6-target"
division
service
customer
contract
mode
corridor
market
risk class
project
```

---

# 116. Minimum Margin

A Minimum Margin MAY establish a commercial floor.

Conceptually:

```text id="tha6-floor"
Estimated Cost Basis
       │
       ▼
Minimum Margin Policy
       │
       ▼
Minimum Acceptable Sell Price
```

---

# 117. Hard Floor vs Soft Floor

Thamani SHALL support:

```text id="tha6-floor-types"
HARD_FLOOR
    price below threshold → BLOCK

SOFT_FLOOR
    price below threshold → APPROVAL REQUIRED
```

This aligns with the established Baobab commercial-pricing architecture.

---

# 118. Margin Floor Can Be Contextual

A margin floor MAY vary by:

```text id="tha6-floor-context"
customer
contract
division
service
lane
project
volume commitment
risk
market
```

It SHALL not automatically be one universal percentage.

---

# 119. Zero-Margin / Loss-Leader Transactions

A transaction MAY legitimately have:

```text id="tha6-loss"
zero margin
negative margin
```

for an explicitly approved commercial reason.

Examples MAY include:

```text id="tha6-loss-reasons"
strategic customer
contractual obligation
service recovery
market entry
bundle economics
group-approved exception
```

Such transactions SHALL require appropriate authority.

---

# 120. Margin Override

Overrides SHALL record:

```text id="tha6-override"
requested_by
original sell price
proposed sell price
cost basis
original margin
new margin
reason
approval
effective quote revision
timestamp
```

---

# 121. No Silent Sales Discount

This SHALL be prohibited:

```text id="tha6-discount-bad"
sales user edits total
```

without creating a structured discount/override and preserving margin impact.

---

# 122. Discount

A customer discount SHALL be independently representable.

Examples:

```text id="tha6-discount"
CONTRACT_DISCOUNT
VOLUME_DISCOUNT
NEGOTIATED_DISCOUNT
SERVICE_RECOVERY
PROMOTIONAL_DISCOUNT
MANUAL_APPROVED_DISCOUNT
```

---

# 123. Discount Is Not Cost Reduction

This SHALL remain:

```text id="tha6-discount-cost"
Customer Discount
    !=
Lower Provider Cost
```

The two affect margin differently.

---

# 124. Cost-Plus Pricing

A contract MAY define:

```text id="tha6-cost-plus"
Actual/Approved Cost
+
Contractual Fee/Markup
=
Customer Charge
```

The applicable cost categories and allowable markup SHALL be explicit.

---

# 125. Cost-Plus Requires Evidence

If customer charges depend upon provider actuals, the system SHALL preserve source evidence and reconciliation.

---

# 126. Fixed Price

A Fixed Price SHALL mean customer price is committed independently of later cost variance, subject to explicit contractual adjustments.

Therefore:

```text id="tha6-fixed"
Provider cost increases
    != automatically
Customer price increases
```

---

# 127. Quote Risk

A fixed customer price against variable provider costs creates commercial risk.

Thamani SHOULD therefore surface exposure during pricing.

---

# 128. Risk Allowance

Pricing MAY include a governed risk allowance for:

```text id="tha6-risk"
FX
capacity
fuel
congestion
border uncertainty
seasonality
project uncertainty
special cargo
```

The allowance SHALL be explicit internally.

---

# 129. Risk Allowance Is Not Fake Provider Cost

This SHALL remain:

```text id="tha6-risk-cost"
Risk Adjustment
    !=
Provider Cost
```

---

# 130. Contingency

Project/complex logistics MAY include contingency.

A contingency SHOULD identify:

```text id="tha6-contingency"
basis
amount/percentage
reason
approval
scope
```

---

# 131. Customer Visibility of Margin

Provider buy rates, internal costs and margin SHALL be commercially sensitive.

Customer-facing quotes SHALL expose only information permitted by the applicable commercial policy.

---

# 132. Provider Confidentiality

Provider A SHALL NOT gain access to:

```text id="tha6-confidential"
Provider B rates
Thamani customer price
Thamani margin
other-provider quotations
```

unless contractually authorised.

---

# 133. Internal Access to Margin

Margin information SHOULD be limited according to role.

For example:

```text id="tha6-margin-access"
sales
pricing
commercial management
finance
executives
```

may have different visibility.

---

# 134. Contracted Customer Rate Privacy

Private customer contract pricing SHALL not be discoverable by another customer.

---

# 135. Approval Authority

Commercial approval SHALL be explicit.

A policy MAY consider:

```text id="tha6-approval"
quote value
margin
discount
customer credit status
contract deviation
currency exposure
special risk
project size
manual rate
negative margin
```

---

# 136. Approval Matrix

Conceptually:

```text id="tha6-approval-matrix"
ApprovalPolicy
├── division
├── transaction_value_band
├── margin_band
├── discount_band
├── risk_class
├── approver_role
├── number_of_approvers
└── effective_period
```

---

# 137. Separation of Duties

Where appropriate:

```text id="tha6-sod"
preparer
    !=
final approver
```

particularly for:

```text id="tha6-high-risk"
negative-margin quote
large manual discount
exceptional FX
manual provider cost
contract deviation
```

---

# 138. Quote Approval Does Not Approve Customer Credit

Commercial pricing approval SHALL remain distinct from:

```text id="tha6-credit"
credit approval
payment terms
credit limit
```

ERP/finance authority governs those concerns.

---

# 139. Customer Credit Can Block Commitment

A commercially valid quote MAY nevertheless fail order commitment if financial policy requires credit approval.

---

# 140. Quoted Margin

At quote time:

```text id="tha6-quoted-margin"
Quoted Margin
=
Committed Sell Basis
-
Estimated Cost Basis
```

using the configured margin formula.

---

# 141. Expected Margin

After provider bookings are confirmed:

```text id="tha6-expected-margin"
Expected Margin
=
Committed Sell Basis
-
Latest Expected Cost
```

MAY differ from quoted margin.

---

# 142. Realised Margin

After sufficiently complete actual costing:

```text id="tha6-realized-margin"
Realised Margin
=
Recognised/Actual Sell Basis
-
Actual Direct Cost Basis
```

subject to ERP/management accounting definitions.

---

# 143. Margin States

The system SHOULD distinguish:

```text id="tha6-margin-states"
QUOTED_MARGIN
EXPECTED_MARGIN
REALIZED_MARGIN
```

rather than continuously rewriting one margin field.

---

# 144. Cost Variance

The system SHOULD calculate:

```text id="tha6-cost-variance"
Actual Cost
-
Quoted Estimated Cost
=
Cost Variance
```

---

# 145. Revenue Variance

Where customer final billing legitimately differs from quote:

```text id="tha6-revenue-variance"
Actual Revenue
-
Originally Quoted Revenue
=
Revenue Variance
```

---

# 146. Margin Variance

Conceptually:

```text id="tha6-margin-variance"
Realised Margin
-
Quoted Margin
=
Margin Variance
```

This SHALL support commercial performance analysis.

---

# 147. Variance Attribution

Where possible, margin variance SHOULD be attributable to factors such as:

```text id="tha6-variance-causes"
FX
provider cost
fuel
capacity
route change
waiting time
demurrage
detention
storage
customs
customer amendment
weight/volume variance
equipment change
exception
sales discount
```

---

# 148. Quote vs Actual Weight

Cargo data may change after:

```text id="tha6-reweigh"
weighing
measurement
packing
containerisation
```

The architecture SHALL preserve:

```text id="tha6-weight-types"
declared_weight
verified_weight
chargeable_weight
actual_measured_weight
```

where relevant.

---

# 149. Re-Rate Trigger

A material change MAY trigger repricing where the commercial terms permit.

Potential triggers include:

```text id="tha6-rerate"
weight changed
volume changed
dimensions changed
dangerous-goods declaration changed
pickup location changed
destination changed
equipment changed
service level changed
customer delayed cargo readiness
```

---

# 150. Re-Rate Does Not Automatically Alter Accepted Price

An accepted fixed-price quote SHALL not be silently repriced because a cost input changed.

The contract determines whether customer repricing is allowed.

---

# 151. Customer Amendment

Where customer changes the service requirement:

```text id="tha6-customer-amend"
Accepted Service
      │
      ▼
Customer Amendment
      │
      ▼
Commercial Impact Assessment
      │
      ├── No Price Change
      └── Revised Commercial Terms
```

The history SHALL remain auditable.

---

# 152. Provider Price Change

A provider's post-booking surcharge or price change SHALL create a cost event/reconciliation issue.

It SHALL not automatically alter customer price.

---

# 153. Accessorial Trigger

An Accessorial Charge MAY be triggered by an operational event.

Example:

```text id="tha6-accessorial"
Delivery Attempt Failed
      │
      ▼
Contract Rule
      │
      ▼
Redelivery Charge Applicable?
```

---

# 154. Commercial Event Provenance

A rate or charge derived from an operational event SHOULD link to that event where possible.

---

# 155. Cancellation Charge

Cancellation MAY incur a charge depending on:

```text id="tha6-cancel-charge"
booking state
provider terms
notice period
capacity commitment
mode
customer contract
```

Cancellation charges SHALL be structured rather than manually hidden in final invoices.

---

# 156. No-Show Charge

Where applicable, customer/provider no-show charges SHOULD use explicit trigger and policy semantics.

---

# 157. Price Precision and Rounding

Money calculations SHALL define:

```text id="tha6-rounding"
currency precision
calculation precision
rounding mode
line rounding policy
total rounding policy
tax rounding relationship
```

No pricing engine SHALL rely accidentally on binary floating-point behaviour for authoritative monetary amounts.

---

# 158. Money Representation

Canonical monetary contracts SHOULD use decimal-safe representations.

Implementation SHALL avoid:

```text id="tha6-float"
float price = 0.1
```

for authoritative financial calculations.

---

# 159. Unit of Measure

Quantities SHALL use explicit unit of measure.

Example:

```text id="tha6-uom"
weight = 1200 kg
distance = 450 km
volume = 12.4 m³
storage = 8 pallet-days
```

not unqualified:

```text id="tha6-bad-uom"
quantity = 1200
```

---

# 160. Unit Conversion

Where units require conversion, the conversion rule/version SHALL be governed.

---

# 161. Rate Scope

A rate MAY be scoped by:

```text id="tha6-rate-scope"
legal entity
division
provider/customer
market
origin
destination
corridor
trade lane
mode
equipment
cargo
service level
quantity band
currency
contract
effective period
```

---

# 162. Specificity

More-specific rates MAY take precedence over generic rates according to pricing policy.

The resolution algorithm SHALL remain deterministic and testable.

---

# 163. Ambiguous Pricing

If two equally applicable contractual rates conflict:

```text id="tha6-ambiguity"
Rate A
and
Rate B
```

the system SHOULD:

```text id="tha6-fail"
fail closed / require resolution
```

rather than choose arbitrarily.

---

# 164. Missing Buy Rate

A missing provider cost SHALL not automatically produce:

```text id="tha6-zero-cost"
cost = 0
```

A zero amount is materially different from an unknown cost.

---

# 165. Unknown Cost

The pricing system SHALL support:

```text id="tha6-unknown"
UNKNOWN
ESTIMATE_REQUIRED
MANUAL_REVIEW
```

or equivalent states.

---

# 166. Quote With Unknown Cost

Policy MAY permit an indicative quote based on estimates.

Firm pricing SHOULD require sufficient validated cost basis according to commercial policy.

---

# 167. Pulse / Intelligence

Baobab Pulse MAY supply advisory data such as:

```text id="tha6-pulse"
historical freight trends
market benchmarks
capacity signals
FX intelligence
congestion indicators
expected transit
risk indicators
```

Pulse SHALL not become the authoritative customer price unless a governed pricing policy explicitly consumes its output.

---

# 168. AI Pricing

AI MAY assist:

```text id="tha6-ai"
rate recommendation
margin recommendation
anomaly detection
quote probability
benchmarking
risk estimation
```

but:

```text id="tha6-ai-rule"
AI Recommendation
    !=
Committed Customer Price
```

until a governed pricing workflow accepts it.

---

# 169. Explainability

Any automated pricing recommendation used for a material quote SHOULD retain:

```text id="tha6-ai-provenance"
model/version
inputs
recommendation
human/automated approval path
final applied value
```

according to applicable governance.

---

# 170. Dynamic Pricing

Thamani MAY eventually implement dynamic pricing.

Dynamic pricing SHALL still respect:

```text id="tha6-dynamic-controls"
contract rates
margin floors
customer eligibility
currency rules
approval limits
quote snapshots
historical reproducibility
```

---

# 171. Market Benchmark Is Not Provider Rate

This SHALL remain:

```text id="tha6-benchmark"
Market Benchmark
    !=
Executable Provider Rate
```

A benchmark informs a decision.

A provider rate represents a commercial input.

---

# 172. Pricing Domain Authority

The Thamani Logistics Commercial Domain SHALL own:

```text id="tha6-authority"
customer RFQ
provider pricing interaction for logistics
rate/tariff commercial semantics
quote calculation
quote lifecycle
customer sell-price commitment
pricing approval
commercial cost projection
margin policy application
commercial variance projection
```

subject to final runtime assignment in ADR-THA-0015.

---

# 173. ERP Authority

ERP SHALL remain authoritative for:

```text id="tha6-erp"
customer invoice
accounts receivable
provider invoice
accounts payable
financial cost
general ledger
accounting FX
tax accounting
payment
financial settlement
```

---

# 174. Commercial Price Is Not Recalculated by ERP

Once Thamani has committed a customer commercial price, ERP SHOULD receive the agreed commercial fact necessary for financial execution.

ERP SHALL not independently invent a different customer price merely because its cost changed.

---

# 175. Invoice Reconciliation

The ERP customer invoice SHOULD reconcile to:

```text id="tha6-invoice-reconcile"
Service Order
+
Approved Additional Charges
+
Applicable Taxes
+
Credits / Adjustments
```

according to contract.

---

# 176. Provider Invoice Reconciliation

Provider invoice reconciliation SHOULD compare:

```text id="tha6-provider-reconcile"
Provider Contract / Quote
+
Booking
+
Execution Events
+
Approved Accessorials
+
Actual Provider Invoice
```

where feasible.

---

# 177. Unexpected Provider Charge

An unexpected provider charge SHOULD enter:

```text id="tha6-unexpected"
Cost Review
```

rather than immediately becoming an accepted payable/customer charge.

---

# 178. Customer Invoice Is Not Quote

This SHALL remain:

```text id="tha6-quote-invoice"
Quote
    !=
Invoice
```

The Quote is an offer.

The invoice is a financial demand/document.

---

# 179. Customer Quote Number Is Not ERP Invoice Number

Identifiers SHALL remain domain-specific and explicitly mapped.

---

# 180. Trade Boundary

Baobab Trade ADR-0012 and ADR-0020 remain authoritative for commerce pricing within the Baobab Trade domain.

Thamani logistics pricing SHALL reuse:

```text id="tha6-reuse"
effective dating
cost-vs-price separation
margin-vs-markup distinction
hard/soft floors
currency discipline
commercial override audit
```

but SHALL NOT require logistics quotes to be Medusa Product/Variant price lists.

---

# 181. Logistics Service Is Not Medusa Product by Default

This SHALL be prohibited as a foundational assumption:

```text id="tha6-medusa-product"
Road freight Kampala → Cape Town
=
Medusa Product Variant
```

A projection MAY later exist if useful.

It SHALL not define the canonical logistics commercial model.

---

# 182. Control Plane Boundary

Control Plane SHALL provide/resolve:

```text id="tha6-cp"
tenant
legal entity
organisation
market
trade lane
capability entitlement
provider binding where applicable
context
```

It SHALL not calculate freight rates or margin.

---

# 183. IAM Boundary

IAM SHALL govern who may:

```text id="tha6-iam"
request quote
prepare quote
approve quote
view cost
view margin
accept quote
administer rates
```

It SHALL not own quote/rate state.

---

# 184. CMS Boundary

CMS MAY own public content such as:

```text id="tha6-cms"
service descriptions
pricing explanations
public tariff notices
terms content
```

where appropriate.

It SHALL not own transactional rate calculation.

---

# 185. Sensitive Pricing Data

At minimum, the following SHOULD be treated as commercially sensitive:

```text id="tha6-sensitive"
provider buy rates
customer contract rates
internal cost rates
margin floors
margin
pricing formulas
discount authorities
strategic customer terms
```

---

# 186. Public Pricing

Thamani MAY publish selected:

```text id="tha6-public"
starting prices
standard courier tariffs
standard local-delivery rates
public service fees
```

where commercially appropriate.

Public rates SHALL not imply all logistics can be priced without context.

---

# 187. Quote Audit

Every issued/revised quotation SHOULD allow reconstruction of:

```text id="tha6-audit"
RFQ
pricing context
provider inputs
internal cost inputs
rates selected
charge calculations
FX
margin
overrides
approvals
quote version
customer acceptance
```

---

# 188. Rate Audit

Material rate changes SHALL preserve:

```text id="tha6-rate-audit"
old rate
new rate
actor
reason
effective date
approval
contract reference
```

---

# 189. No Historical Mutation

An updated rate card SHALL not rewrite historical quotes.

---

# 190. Shared Contract Namespace

Cross-repository commercial logistics contracts SHOULD eventually be governed under a namespace such as:

```text id="tha6-shared"
baobab-platform/shared/
└── contracts/
    └── logistics-commercial/
        └── v1/
```

Potential contracts:

```text id="tha6-contracts"
LogisticsRFQ
LogisticsQuoteReference
LogisticsServiceOrderReference
LogisticsCharge
LogisticsRateReference
RateScope
Money
ChargeableQuantity
PricingSnapshot
CommercialCostProjection
MarginProjection
PriceOverride
```

---

# 191. Shared Does Not Own Pricing Runtime

`baobab-platform/shared` SHALL define contracts and canonical vocabulary.

It SHALL NOT perform quote calculation.

---

# 192. Rate Import

The system MAY support controlled import from:

```text id="tha6-import"
CSV
XLSX
EDI
provider API
carrier portal export
manual administration
```

Provider-native representations SHALL be validated and converted into governed canonical rate structures.

---

# 193. Spreadsheet Is Not System of Record

This SHALL remain:

```text id="tha6-spreadsheet"
uploaded tariff.xlsx
    != automatically
approved active RateCard
```

Import requires validation and governance.

---

# 194. Provider API Rate

A live provider API response MAY serve as a:

```text id="tha6-live-rate"
SPOT_RATE
```

with appropriate:

```text id="tha6-live-context"
provider
request
timestamp
validity
service
currency
source response
```

---

# 195. API Failure

Provider rate API failure SHALL not be interpreted as:

```text id="tha6-api-zero"
rate = 0
```

The appropriate outcome is:

```text id="tha6-api-fail"
RATE_UNAVAILABLE
ESTIMATE_REQUIRED
ALTERNATIVE_PROVIDER
MANUAL_REVIEW
```

---

# 196. Cached Rates

Rates MAY be cached for performance where policy permits.

Cache validity SHALL not exceed contractual/effective validity without explicit rules.

---

# 197. Booking vs Pricing Interoperability

External standards such as DCSA Booking SHOULD be used for provider booking interoperability where appropriate.

Pricing semantics SHALL remain separately governed because DCSA Booking primarily standardises booking information exchange rather than Thamani's proprietary buy/sell margin architecture.

---

# 198. UN/CEFACT Interoperability

Where external trade/transport messages represent logistics charges, Thamani SHOULD map relevant concepts including:

```text id="tha6-uncefact"
charge category
calculation basis
tariff class
payment arrangement
paying party
applied amount
```

from/to its canonical charge model.

---

# 199. Implementation Gates

Implementation SHOULD proceed through controlled gates.

## THA-COM-00 — Existing Pricing Audit

Audit:

```text id="tha6-gate0"
Thamani legacy ecommerce pricing
Baobab Trade pricing
ADR-0020 margin model
ERP pricing/costing
Thamani inventory/payment legacy code
Shared money/contracts
```

Classify:

```text id="tha6-gate0-class"
REUSE
GENERALISE
SUPERSEDE
REMOVE
```

---

## THA-COM-01 — Canonical Money / Charge Vocabulary

Establish:

```text id="tha6-gate1"
Money
Rate
Charge
CalculationBasis
ChargeCategory
Quantity
UnitOfMeasure
```

---

## THA-COM-02 — RFQ Domain

Implement customer RFQ lifecycle.

---

## THA-COM-03 — Provider Pricing Intake

Implement:

```text id="tha6-gate3"
provider rate card
provider spot quote
rate validity
rate import
```

using ADR-THA-0004 providers.

---

## THA-COM-04 — Rate Resolution

Implement deterministic contextual rate selection.

---

## THA-COM-05 — Charge Calculation

Implement:

```text id="tha6-gate5"
quantity
rate
tier
minimum
allowance
surcharge
```

calculation.

---

## THA-COM-06 — Multi-Currency

Implement governed FX context and snapshots.

---

## THA-COM-07 — Margin Policy

Implement:

```text id="tha6-gate7"
cost basis
markup
gross margin
target margin
hard floor
soft floor
```

---

## THA-COM-08 — Quote Lifecycle

Implement:

```text id="tha6-gate8"
draft
approval
issue
revision
expiry
acceptance
```

---

## THA-COM-09 — Service Order

Implement accepted-quote commitment snapshot.

---

## THA-COM-10 — Road Pricing Reference Slice

Prove:

```text id="tha6-gate10"
road haulage
per trip / distance
fuel
toll
waiting time
```

---

## THA-COM-11 — Cross-Border Pricing

Add:

```text id="tha6-gate11"
border
customs
corridor
multi-currency
```

---

## THA-COM-12 — Maritime Pricing

Add:

```text id="tha6-gate12"
container/equipment
origin/destination charges
free time
demurrage
detention
```

---

## THA-COM-13 — Air Freight Pricing

Add:

```text id="tha6-gate13"
chargeable weight
air-specific rate structures
```

---

## THA-COM-14 — Warehouse / 3PL / 4PL Pricing

Add recurring and activity-based charging.

---

## THA-COM-15 — Actual Cost Reconciliation

Integrate ERP/provider actual costs and calculate:

```text id="tha6-gate15"
quoted margin
expected margin
realised margin
variance
```

---

## THA-COM-16 — Production Hardening

Verify:

```text id="tha6-gate16"
tenant isolation
pricing privacy
rounding
currency
concurrency
quote immutability
rate precedence
contract versioning
approval controls
idempotency
ERP reconciliation
audit
backup/recovery
```

---

# 200. Alternatives Considered

## Alternative A — Reuse Medusa Product Pricing for Everything

**Rejected.**

Thamani logistics pricing is not fundamentally catalogue-product pricing.

---

## Alternative B — One Rate Per Origin/Destination

**Rejected.**

It ignores mode, cargo, equipment, customer, contract, capacity and numerous other factors.

---

## Alternative C — Provider Rate + Fixed Markup

**Rejected as universal architecture.**

Different services require different commercial strategies and cost composition.

---

## Alternative D — Customer Price Equals Provider Rate

**Rejected.**

Thamani provides orchestration and may incur many additional costs.

---

## Alternative E — Put Pricing in ERP

**Rejected as the customer-commercial authority.**

ERP remains authoritative for financial/accounting consequences, not logistics quote orchestration.

---

## Alternative F — One Margin Percentage Everywhere

**Rejected.**

Margin policy varies by service, customer, lane, contract and risk.

---

## Alternative G — One `amount` Field

**Rejected.**

It cannot distinguish rate, charge, cost, price, tax, surcharge or actuals.

---

## Alternative H — Spreadsheet Tariffs as Permanent Architecture

**Rejected.**

Spreadsheets may be ingestion tools, not canonical transactional pricing authority.

---

## Alternative I — Recalculate Old Quotes Using Current Rates

**Rejected.**

Historical commercial commitments must remain reproducible.

---

## Alternative J — Automatically Pass Every Cost Increase to Customer

**Rejected.**

Price adjustment is governed by customer contract, not internal cost movement alone.

---

# 201. Positive Consequences

This architecture provides:

```text id="tha6-benefits"
multi-division pricing
buy/sell separation
spot pricing
contract pricing
multi-provider composition
multi-currency support
structured surcharges
mode-specific rating
rate versioning
margin protection
quote approvals
contract terms
event-driven accessorials
actual cost reconciliation
commercial performance analytics
provider confidentiality
customer pricing privacy
future dynamic pricing
```

---

# 202. Costs and Negative Consequences

The architecture is materially more complex than:

```text id="tha6-simple-bad"
price = 100
```

It requires:

```text id="tha6-complexity"
rate cards
scope
units
tiers
cost components
surcharges
FX
contracts
quote versions
approval
margin policy
actual cost reconciliation
```

This complexity is accepted because it represents the actual economics of a logistics enterprise.

---

# 203. Final Architectural Invariants

The following SHALL remain non-negotiable:

```text id="tha6-final-invariants"
RFQ
    != Quote

Customer RFQ
    != Provider RFQ

Provider Quote
    != Customer Quote

Rate
    != Charge

Rate
    != Contract

Rate Card
    != Contract

Provider Buy Rate
    != Customer Sell Rate

Internal Cost
    != External Provider Cost

Estimated Cost
    != Actual Cost

Operational Cost
    != Accounting Cost automatically

Customer Price
    != ERP Cost

Quote
    != Service Order

Quote
    != Booking

Service Order
    != Shipment

Service Order
    != Invoice

Quote Validity
    != Capacity Guarantee

Booking Confirmation
    != Price Commitment

Base Freight
    != Total Price

Surcharge
    != Tax

Tax
    != Freight Revenue

Storage
    != Demurrage

Demurrage
    != Detention

Actual Weight
    != Chargeable Weight

Cost Basis
    != Selling Price

Markup
    != Gross Margin

Quoted Margin
    != Expected Margin

Expected Margin
    != Realised Margin

Discount
    != Cost Reduction

Risk Allowance
    != Provider Cost

Pass-Through
    != Automatically No-Margin

Rate Expiry
    != Contract Expiry

Pricing FX
    != Accounting FX

Provider Rate API Failure
    != Zero Rate

Unknown Cost
    != Zero Cost

Customer Price Change
    requires contractual/commercial authority

Provider Cost Change
    != automatic customer repricing

Issued Quote
    must preserve its pricing snapshot

Quote Revision
    must preserve historical versions

Rate changes
    must not rewrite historical transactions

Private customer rates
    must remain isolated

Provider buy rates
    must remain commercially protected

Margin overrides
    must remain auditable

Money
    must use decimal-safe calculation

Every quantity
    must carry a unit

Every monetary amount
    must carry a currency

Every effective rate
    must have determinable scope

Every pricing decision
    should be explainable
```

---

# 204. Final Decision

Thamani Global SHALL implement a logistics-commercial architecture capable of determining and governing the relationship between:

```text id="tha6-final-model"
CUSTOMER REQUIREMENT
        │
        ▼
       RFQ
        │
        ▼
PRICING CONTEXT
        │
        ├────────────────────────────────┐
        │                                │
        ▼                                ▼
PROVIDER / INTERNAL                 CUSTOMER CONTRACT
    COST SOURCES                         │
        │                                │
        ├── Buy Rates                    │
        ├── Spot Quotes                  │
        ├── Rate Cards                   │
        ├── Internal Costs               │
        ├── Surcharges                   │
        ├── Accessorials                 │
        └── FX                           │
        │                                │
        └──────────────┬─────────────────┘
                       ▼
             COMMERCIAL COST BASIS
                       │
                       ▼
                MARGIN POLICY
                       │
             ┌─────────┼──────────┐
             ▼         ▼          ▼
          Target     Floor     Approval
          Margin     Rules      Rules
             │         │          │
             └─────────┼──────────┘
                       ▼
                CUSTOMER PRICE
                       │
                       ▼
               LOGISTICS QUOTE
                       │
                 Approval/Issue
                       │
                       ▼
              CUSTOMER ACCEPTANCE
                       │
                       ▼
              LOGISTICS SERVICE ORDER
                       │
                       ▼
               EXECUTION / BOOKING
                       │
                       ▼
                 ACTUAL COSTS
                       │
                       ▼
           COMMERCIAL RECONCILIATION
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
   Quoted Margin   Expected Margin  Realised Margin
```

For every material logistics transaction, Thamani SHALL ultimately be able to answer:

```text id="tha6-questions"
What exactly did the customer request?

Which contractual terms applied?

Which buy-side rates were available?

Which providers supplied those rates?

Which rate was selected and why?

What internal services contributed cost?

Which calculation basis applied?

Which units and quantities were chargeable?

Which surcharges applied?

Which charges were included or excluded?

Which amounts were estimates?

Which amounts were pass-through?

Which currency and FX rate were used?

What did Thamani expect the service to cost?

What margin was targeted?

What minimum price policy applied?

Were any overrides approved?

Which quote revision did the customer accept?

What price was commercially committed?

What did providers actually charge?

What did Thamani finally invoice?

What margin was ultimately realised?

Why did actual margin differ from quoted margin?
```

The defining commercial principle is:

> **Thamani shall never confuse provider cost with customer price, estimated economics with realised economics, or a rate with the contractual charge ultimately earned or incurred.**

The defining pricing principle is:

> **Every logistics price shall be contextual, scoped, effective-dated, currency-aware, reproducible and explainable.**

And the defining profitability principle is:

> **Thamani shall preserve the complete lineage from buy-side cost through sell-side quotation to realised margin, without turning the commercial domain into a shadow accounting ledger.**