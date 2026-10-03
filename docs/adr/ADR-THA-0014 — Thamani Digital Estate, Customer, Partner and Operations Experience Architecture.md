# ADR-THA-0014 — Thamani Digital Estate, Customer, Partner and Operations Experience Architecture

**Status:** Accepted — Foundational Thamani Digital Experience Architecture  
**Date:** 2026-10-03  
**Decision Owners:** Nabhold Group Africa / Thamani Global / Baobab Platform Architecture  
**Primary Repository:** `baobab-platform/thamani`  
**Legal Entity:** `THAMANI-GLOBAL`  
**Digital Estate:** Thamani  
**Frontend Runtime:** Next.js / React / TypeScript  
**Identity Authority:** `baobab-platform/baobab-iam`  
**Context / Capability Authority:** `baobab-platform/baobab-cp`  
**Content Authority:** `baobab-platform/baobab-cms` where managed content applies  
**Transport Authority:** `baobab-platform/baobab-tms`  
**Trade-Document / Customs Workflow Authority:** `baobab-platform/baobab-trade-docs`  
**Financial Authority:** `baobab-platform/baobab-erp`  
**Regulatory Decision Authority:** `baobab-platform/baobab-regulations`  
**Intelligence:** `baobab-platform/baobab-pulse` for non-authoritative intelligence  
**Decision Class:** Digital estate / UX / frontend / portals / control tower / customer experience / partner experience / staff operations / executive intelligence

---

# 1. Normative Dependencies

This ADR SHALL be interpreted consistently with:

- ADR-THA-0003 — Integrated Shipping, Transportation and Logistics Enterprise Domain Boundary
- ADR-THA-0004 — Logistics Counterparty, Carrier, Service-Provider Qualification and Partner Onboarding
- ADR-THA-0006 — RFQ, Logistics Quotation, Contract, Rate and Margin Architecture
- ADR-THA-0008 — Cross-Border, Customs, Corridor, Transit and Regulatory Architecture
- ADR-THA-0009 — Baobab Capability Consumption, Engine Authority and System-of-Record Boundary
- ADR-THA-0010 — Warehousing, 3PL and Inventory-Custody Service Composition Boundary
- ADR-THA-0011 — Cold Chain, Dangerous Goods and Special-Cargo Service Boundary
- ADR-THA-0012 — Project Logistics and Heavy / Abnormal Cargo Service Architecture
- ADR-THA-0013 — 4PL Control Tower, Provider Selection and Multi-Provider Orchestration Architecture
- ADR-TMS-0001 / ADR-TMS-0002
- ADR-TDOC-0001 / ADR-TDOC-0002
- applicable Control Plane capability/context ADRs
- applicable IAM browser-session, BFF, MFA, authorisation and organisation ADRs
- applicable Shared capability/event contracts
- applicable ERP, CMS, Pulse and Regulations architecture.

---

# 2. Executive Decision

Thamani SHALL operate **one coherent Digital Estate** serving several distinct user experiences:

```text
THAMANI DIGITAL ESTATE
│
├── Public Estate
│
├── Customer Experience
│
├── Partner / Provider Experience
│
├── Operations Workspace
│
├── Field / Execution Experience
│
└── Executive / Management Experience
```

These SHALL be experiences of the same Thamani legal entity.

They SHALL NOT automatically become:

```text
separate tenants

separate legal entities

separate product companies

separate canonical organisations

separate backend platforms

separate copies of logistics data
```

---

# 3. Governing Experience Principle

> **Users interact with Thamani services and logistics outcomes—not with Baobab engine topology.**

A customer SHOULD see:

```text
Shipment

Tracking

Documents

Warehouse Inventory

Quote

Invoice

Exception
```

rather than:

```text
baobab-tms

baobab-erp

baobab-trade-docs

baobab-regulations

Control Plane
```

Engine boundaries SHALL remain architectural boundaries, not customer navigation.

---

# 4. Experience ≠ Authority

The Thamani frontend MAY display and compose data from many authoritative systems.

It SHALL NOT become authoritative merely because it displays that data.

This SHALL remain:

```text
UI
    != System of Record

Dashboard
    != Ledger

Control Tower
    != TMS

Customer Portal
    != Trade Docs

Partner Portal
    != Provider Registry

Executive Dashboard
    != ERP
```

---

# 5. Current Repository Baseline

The current `thamani` repository retains its previous B2C storefront implementation.

Current routes include:

```text
/

/shop

/search

/products/[handle]

/cart

/checkout
```

and the existing shell still describes Thamani as:

```text
consumer retail
```

This implementation predates ADR-THA-0003.

It is no longer aligned with the accepted Thamani business architecture.

---

# 6. Legacy Retail UX Superseded

The following UX assumptions are formally superseded:

```text
product catalogue as primary navigation

retail product discovery

shopping cart

consumer checkout

merchandising-first homepage

retail search

storefront product detail

commerce-first customer journey
```

The legacy routes SHALL be removed, redirected, repurposed or retired through a controlled migration.

---

# 7. Frontend Engineering Foundation Retained

The business model change SHALL NOT cause unnecessary abandonment of the existing technical foundation.

The audited repository currently uses:

```text
Next.js 16.3.3

React 19.2

TypeScript 6

Node 24

Tailwind CSS 4

Zod 4

Vitest

Playwright

axe-core
```

These MAY remain subject to normal dependency governance.

---

# 8. Retained Frontend Principles

The following existing principles remain appropriate:

```text
Next.js App Router

React server-first rendering

strict TypeScript

server-side data access where appropriate

progressive streaming

accessibility

SEO

responsive design

performance discipline

contract validation

independently deployable Digital Estate

no direct database coupling
```

---

# 9. No Engine SDK Leakage Into Leaf UI

Leaf presentation components SHALL NOT know:

```text
which TMS implementation exists

which ERP implementation exists

which Customs provider exists

which engine instance was resolved
```

The intended dependency is:

```text
UI
 ↓
Thamani Application / BFF
 ↓
Canonical Capability Adapter
 ↓
Control Plane Resolution
 ↓
Engine / Provider
```

---

# 10. Experience Surfaces

The target experience architecture SHALL be:

```text
                         THAMANI
                            │
      ┌────────────┬────────┼────────┬─────────────┐
      ▼            ▼        ▼        ▼             ▼
   PUBLIC       CUSTOMER   PARTNER  OPERATIONS   EXECUTIVE
   ESTATE       PORTAL     PORTAL   WORKSPACE    EXPERIENCE
      │            │        │        │             │
      └────────────┴────────┼────────┴─────────────┘
                            ▼
                    THAMANI APP LAYER
                            │
                            ▼
                       BFF / APIs
                            │
       ┌────────────┬───────┼───────┬────────────┐
       ▼            ▼       ▼       ▼            ▼
      TMS       TRADE DOCS  ERP REGULATIONS    CMS/PULSE
```

---

# 11. Public Estate

The Public Estate SHALL support unauthenticated discovery of Thamani as an integrated logistics provider.

Its primary purpose is:

```text
explain

establish trust

generate qualified demand

enable tracking where safely possible

enable quotation requests

enable contact

publish logistics insight
```

---

# 12. Public Information Architecture

Initial public information architecture SHOULD include:

```text
/

Services

Solutions

Industries

Network / Markets

Tracking

Request a Quote

About

Insights

Contact

Partner With Us
```

---

# 13. Service Navigation

Public services SHOULD expose customer outcomes rather than internal software architecture.

Example:

```text
Services
│
├── Road Freight
├── Ocean Shipping
├── Freight Forwarding
├── Customs Brokerage
├── Warehousing
├── 3PL
├── Courier
├── Last Mile
├── Cold Chain
├── Project Logistics
├── Cross-Border Logistics
└── 4PL
```

These align with the business divisions established by THA-0003.

---

# 14. Divisions Need Not Be Separate Sites

This SHALL be avoided:

```text
haulage.thamani...

shipping.thamani...

warehouse.thamani...
```

solely because divisions exist.

The customer SHOULD perceive one integrated Thamani.

---

# 15. Solutions Navigation

The site MAY additionally organise services by customer problem.

Examples:

```text
Move goods across borders

Manage regional distribution

Store and fulfil inventory

Move temperature-sensitive cargo

Move oversized equipment

Outsource logistics operations

Manage end-to-end supply chain

Deliver parcels

Import into South Africa

Export from Uganda
```

---

# 16. Problem-Oriented UX Preferred

Where useful:

```text
customer problem
    → recommended service composition
```

SHOULD be preferred over forcing users to know:

```text
which Thamani division they need
```

---

# 17. Public Tracking

Thamani MAY provide unauthenticated tracking.

It SHALL reveal only deliberately public/scoped information.

Example:

```text
Tracking reference
+
secondary verification / secure tracking token
        ↓
Customer-safe shipment status
```

---

# 18. Public Tracking Must Not Leak Sensitive Data

Public tracking SHALL NOT expose by default:

```text
customer commercial terms

cargo value

full cargo description

dangerous-goods detail

exact high-value cargo route

provider buy rate

internal exceptions

private documents

driver personal information

other consignments

warehouse inventory
```

---

# 19. Public Quote Experience

A public customer MAY initiate:

```text
Request a Quote
```

without first creating a full account.

The request MAY collect:

```text
origin

destination

cargo type

weight

volume

dimensions

service type

timing

special requirements

contact details
```

---

# 20. Quote Form Is Intake, Not Contract

This remains:

```text
Web Quote Request
    !=
accepted logistics contract

Quote Estimate
    !=
confirmed execution price
```

THA-0006 remains authoritative.

---

# 21. Progressive Quote Intake

Quotation forms SHOULD progressively reveal complexity.

Example:

```text
Where from?
        ↓
Where to?
        ↓
What are you moving?
        ↓
How much?
        ↓
When?
        ↓
Special conditions?
```

rather than presenting a freight-forwarding data dictionary immediately.

---

# 22. Complex Cargo Escalation

For:

```text
dangerous goods

project cargo

abnormal loads

cold-chain cargo

complex cross-border cases
```

the UX SHOULD transition from simple quote intake to a specialist workflow.

---

# 23. Customer Experience

Authenticated customers SHALL receive a unified logistics portal.

The portal SHALL support both:

```text
individual customers where Thamani offers relevant services
```

and:

```text
organisation customers
```

without equating customer identity with one specific account model.

---

# 24. Customer Organisation Context

An authenticated individual MAY act:

```text
for self

for Organisation A

for Organisation B
```

where authorised.

The current active context SHALL be explicit.

---

# 25. Organisation Switching

Where a user belongs to several organisations:

```text
Current Organisation:
Acme Manufacturing ZA
      ▼
switch
      ▼
Acme Manufacturing UG
```

MAY be supported.

Changing organisation SHALL change authorisation/context, not merely visual branding.

---

# 26. Customer Portal Navigation

The target portal SHOULD expose concepts such as:

```text
Dashboard

Quotes

Service Orders / Bookings

Shipments

Tracking

Warehousing & Inventory

Documents & Customs

Projects

Exceptions

Invoices & Payments

Reports

Organisation

Team & Access

Settings
```

subject to customer entitlement.

---

# 27. Dashboard

A customer dashboard SHOULD answer quickly:

```text
What is moving?

What requires my attention?

What is delayed?

What is awaiting approval?

What documents are missing?

What inventory do I have?

What invoices require attention?
```

---

# 28. Dashboard ≠ Everything

The customer homepage SHALL not attempt to display every possible logistics fact.

Priority SHOULD be:

```text
exceptions

approvals

important movements

recent activity

operational summaries
```

---

# 29. Customer Shipment Experience

The customer-facing LogisticsShipment view SHOULD compose:

```text
current status

origin/destination

important milestones

ETA

Consignment summary

transport mode

documents

Customs status

exceptions

delivery state
```

according to customer visibility policy.

---

# 30. Shipment View Is Projection

Canonical authority remains TMS and other contributing domains.

The UI SHALL retain source/correlation information internally.

---

# 31. Tracking Timeline

A customer-friendly timeline MAY show:

```text
Booked

Collected

Departed origin

At port

In ocean transit

Arrived destination

Customs processing

Out for delivery

Delivered
```

while underlying TMS events remain more granular.

---

# 32. Projection Language Must Be Honest

This is prohibited:

```text
Customs Cleared
```

when Trade Docs only knows:

```text
Declaration Submitted
```

Customer-friendly language may simplify terminology but SHALL NOT invent an authoritative outcome.

---

# 33. LogisticsShipment vs TradeShipment

The UI SHALL use customer-appropriate terminology such as:

```text
Shipment
```

where ambiguity is harmless.

Internally it SHALL preserve whether the reference is:

```text
LogisticsShipment

TradeShipment

Fulfilment
```

according to canonical architecture.

---

# 34. Quote Experience

Customers SHALL be able to:

```text
submit RFQ

view quote

compare alternatives where offered

request revision

approve / reject quote

view validity

view assumptions

view surcharges

provide additional information
```

according to THA-0006.

---

# 35. Quote ≠ Booking

This distinction SHALL be visually clear:

```text
QUOTED
    !=
BOOKED
```

---

# 36. Approval UX

Customer approvals SHOULD clearly show:

```text
What am I approving?

What changed?

What does it cost?

What operational effect follows?

When does the approval expire?
```

---

# 37. Warehousing Customer Experience

Following THA-0010, customers MAY view:

```text
physical inventory

inventory by facility

lots/batches

holds

receipts

dispatches

warehouse activities

associated shipments

warehouse documents
```

subject to authority and entitlement.

---

# 38. Warehouse View ≠ ERP Ledger

Customer warehouse UI SHALL not present financial inventory and warehouse physical inventory as identical unless the authoritative data confirms that relationship.

---

# 39. Inventory Conditions

Customer UI SHOULD distinguish, when relevant:

```text
Physical

Available

Reserved

Quality Hold

Customs Hold

In Transit
```

rather than one unexplained quantity.

---

# 40. Documents & Customs Experience

Following TDOC-0002, customers SHALL interact with:

```text
TradeDocument
```

semantics rather than raw storage files.

A document view MAY expose:

```text
document type

document number

issuer

version

issue date

status

verification

related shipment

related Customs case

download/rendering
```

according to authorisation.

---

# 41. Document Download ≠ Document Identity

The UI SHALL NOT make:

```text
Download PDF
```

the only representation of a document.

Structured status and relationships SHOULD remain visible.

---

# 42. Version Visibility

Where materially relevant:

```text
Current Version

Previous Versions

Superseded

Amended
```

SHOULD be understandable to the user.

---

# 43. Customs Customer UX

The customer SHOULD see meaningful workflow stages such as:

```text
Information Required

Preparing Declaration

Submitted

Authority Review

Inspection Required

Hold

Released
```

only when those states are supported by authoritative facts.

---

# 44. Customs UX Shall Preserve Sovereign Authority

This SHALL never imply:

```text
Thamani approved Customs release
```

where the external Customs authority actually issued the decision.

---

# 45. Project Logistics Experience

Following THA-0012, project customers MAY receive:

```text
project dashboard

cargo units

project milestones

engineering readiness

permit readiness

shipments

site readiness

documents

exceptions

schedule risk
```

---

# 46. Project View ≠ Shipment View

A project MAY contain:

```text
many LogisticsShipments

many providers

many permits

many engineering work packages
```

and SHALL therefore receive a dedicated project-level view.

---

# 47. 4PL Customer Experience

Following THA-0013, 4PL customers MAY receive an expanded supply-chain control-tower view including:

```text
orders / service requests

inventory

shipments

warehouses

providers

exceptions

SLA

documents

cost/financial projections where authorised

network risks
```

---

# 48. Customer 4PL View ≠ Internal Operations View

Internal Thamani information such as:

```text
provider buy rates

margin

candidate provider bids

internal performance notes

internal escalation
```

SHALL not be visible unless contract/policy explicitly permits it.

---

# 49. Partner / Provider Experience

The Partner Portal SHALL support logistics counterparties such as:

```text
carriers

hauliers

warehouse operators

freight forwarders

customs brokers

courier providers

special-cargo providers

engineering providers

other subcontractors
```

---

# 50. Partner Portal Navigation

Potential information architecture:

```text
Dashboard

Company Profile

Qualification

Capabilities

Facilities / Resources

Opportunities / RFQs

Quotes / Rates

Assignments

Bookings

Shipments / Jobs

Documents

Invoices

Performance

Notifications

Team & Access

Settings
```

depending on partner role.

---

# 51. One Partner Organisation, Multiple Roles

A partner may simultaneously be:

```text
Carrier

Warehouse Operator

Freight Forwarder
```

The portal SHALL not require separate organisations/accounts for each role.

---

# 52. Partner Profile ≠ Canonical Organisation

The partner experience edits Thamani relationship/provider data where authorised.

It SHALL not let partners arbitrarily rewrite canonical legal identity controlled elsewhere.

---

# 53. Qualification Experience

Following THA-0004, partners MAY:

```text
declare capabilities

submit evidence

submit licences

submit insurance

submit certifications

provide facilities

provide equipment

respond to information requests

view qualification status
```

---

# 54. Applicant Cannot Self-Approve

This remains:

```text
Partner uploads certificate
    !=
Qualification approved
```

---

# 55. Scoped Qualification UX

The portal SHOULD explain qualification context.

Example:

```text
Road Freight
South Africa
APPROVED

Cross-Border Road
South Africa → Zimbabwe
PENDING

Dangerous Goods
NOT APPROVED
```

rather than:

```text
Provider: APPROVED
```

globally.

---

# 56. Provider Opportunities

Eligible partners MAY receive:

```text
RFQs

tenders

spot opportunities

capacity requests
```

appropriate to their qualification and commercial relationship.

---

# 57. Provider Bid Privacy

Provider A SHALL never see:

```text
Provider B's bid

Provider B's rate

Thamani margin
```

unless an explicit auction model says otherwise.

---

# 58. Assignment Experience

A partner SHOULD be able to see only work assigned or legitimately offered to it.

Potential actions include:

```text
accept

reject

request clarification

provide booking reference

update capacity

confirm milestone

report exception

upload/document evidence
```

---

# 59. Partner Portal Does Not Own Execution

A provider clicking:

```text
Departed
```

MAY submit an operational assertion.

The authoritative operational domain SHALL validate and record the corresponding transport event.

---

# 60. Provider Performance Experience

Partners MAY see selected performance metrics such as:

```text
on-time pickup

on-time delivery

booking acceptance

data completeness

document quality

exception performance
```

according to Thamani policy.

---

# 61. Performance Score Must Be Explainable

No unexplained:

```text
Score: 83
```

SHALL be the sole provider-performance UX.

Metrics and period SHOULD be visible.

---

# 62. Operations Workspace

Thamani staff SHALL receive an operations-oriented workspace that differs fundamentally from the customer portal.

The primary operational question is:

> **What needs attention now?**

---

# 63. Operations Navigation

Potential top-level operations IA:

```text
Control Tower

Service Orders

Shipments

Provider Sourcing

Bookings

Warehousing

Customs & Documents

Special Cargo

Projects

4PL

Exceptions

Network

Customers

Partners

Reports
```

according to staff permissions.

---

# 64. Exception-First Design

Operations SHOULD prioritise:

```text
blocked

late

at risk

awaiting approval

missing documentation

provider failure

capacity failure

regulatory issue

data gap
```

before healthy transactions.

---

# 65. Healthy Operations Should Recede

Operators SHALL not be forced to manually inspect thousands of healthy movements.

Control-tower design SHOULD support:

```text
manage by exception
```

while preserving drill-down to normal operations.

---

# 66. Control Tower Homepage

An internal operations landing view MAY show:

```text
Open critical exceptions

Shipments at risk

Departures today

Arrivals today

Customs holds

Missing documents

Provider failures

Cold-chain excursions

Project blockers

Network disruptions
```

---

# 67. Control Tower ≠ Command Centre Database

All underlying facts remain authoritative in their respective systems.

The control tower MAY initiate commands.

It SHALL wait for authoritative confirmation.

---

# 68. Operational Action Pattern

Example:

```text
Operator clicks:
Hold Shipment
       │
       ▼
Thamani BFF
       │
       ▼
TMS command
       │
       ▼
TMS validates / persists
       │
       ▼
event / response
       │
       ▼
UI confirms
```

---

# 69. Click ≠ Success

This remains:

```text
button clicked
    !=
business action succeeded
```

---

# 70. Pending Actions

The UI SHALL visibly support:

```text
SUBMITTING

PENDING

CONFIRMED

FAILED

REQUIRES_REVIEW
```

for asynchronous business commands.

---

# 71. Optimistic UI Restrictions

Optimistic UI MAY be used for low-risk presentation changes.

It SHOULD NOT falsely indicate completion of:

```text
Customs release

carrier booking

financial posting

regulatory approval

shipment hold

document issuance
```

before authoritative confirmation.

---

# 72. Provider Sourcing Workspace

Following THA-0013, internal staff MAY require:

```text
candidate providers

qualification

availability

rates

performance

risk

selection reason

customer constraints

manual override
```

---

# 73. Selection Explainability

The UI SHOULD answer:

```text
Why is this provider recommended?

Which candidates were excluded?

What policy applied?

Does customer approval apply?
```

---

# 74. Special-Cargo Workspace

Following THA-0011, specialist staff MAY need views for:

```text
cold-chain requirements

condition monitoring

dangerous-goods readiness

equipment suitability

regulatory requirements

missing documents

open excursions
```

---

# 75. Project Logistics Workspace

Following THA-0012, project staff MAY need:

```text
project milestones

engineering packages

permits

route readiness

resource readiness

shipments

lifting dependencies

site readiness

exceptions
```

---

# 76. Customs / Documents Workspace

Specialised users MAY require:

```text
Customs cases

declarations

missing data

documents

authority messages

holds

inspections

releases

document versions
```

within their authority.

---

# 77. Field / Execution Experience

Some operational roles require mobile-first execution interfaces.

Potential users include:

```text
drivers

yard staff

warehouse staff

delivery personnel

surveyors

site coordinators

partner operators
```

---

# 78. Field UX Is Task-Oriented

Field users SHOULD not receive the full control tower.

Typical field flows include:

```text
Today's jobs

Navigate / location

Arrive

Load

Scan / confirm cargo

Capture condition

Depart

Report exception

Deliver

Capture evidence
```

---

# 79. Field Experience Need Not Be Separate Native App Initially

Initial implementation MAY use:

```text
responsive web

PWA-capable web
```

where operationally sufficient.

Native applications SHALL require demonstrated device/offline/hardware requirements.

---

# 80. Offline Capability

Field operations MAY require offline-aware workflows.

Examples:

```text
remote site

border crossing

warehouse dead zone

cross-border road corridor
```

The architecture SHOULD permit:

```text
local pending action
→ later synchronisation
```

for operations where domain policy allows it.

---

# 81. Offline Does Not Mean Uncontrolled

Offline submissions SHALL preserve:

```text
actor

device

occurred_at

recorded_at

idempotency key

evidence

sync state
```

where applicable.

---

# 82. Executive Experience

Executives SHALL receive a management/decision-support experience distinct from operational dispatch screens.

Questions include:

```text
How is the business performing?

Where are margins deteriorating?

Which services are growing?

Which customers are at risk?

Which providers are underperforming?

Where are operational bottlenecks?

What risks require management action?
```

---

# 83. Executive Navigation

Potential areas:

```text
Executive Overview

Revenue & Margin

Customers

Service Lines

Operations

Providers

Network

Risk & Exceptions

Projects

4PL

Cash / Financial Indicators

Forecasts & Intelligence
```

---

# 84. Executive Dashboard Is Projection

Financial numbers SHALL originate from ERP/commercial authorities.

Operational KPIs SHALL derive from authoritative operational facts.

Pulse MAY contribute predictions.

---

# 85. Prediction Must Be Labelled

Executive UX SHALL distinguish:

```text
ACTUAL

FORECAST

PREDICTION

TARGET

PLAN
```

---

# 86. Pulse Must Not Masquerade as Fact

This is prohibited:

```text
Expected revenue = 10m
```

without indicating whether it is:

```text
actual

budget

forecast

AI prediction
```

---

# 87. Personas

The Digital Estate SHOULD recognise experience personas including:

```text
Anonymous Visitor

Prospective Customer

Individual Customer

Customer Organisation Member

Customer Organisation Administrator

Customer Approver

Customer Finance User

Partner Applicant

Partner Administrator

Partner Dispatcher / Operator

Partner Finance User

Thamani Customer Service

Thamani Dispatcher

Thamani Freight Forwarder

Thamani Customs Specialist

Thamani Warehouse Coordinator

Thamani Special-Cargo Specialist

Thamani Project Logistics Manager

Thamani 4PL Operator

Thamani Commercial User

Thamani Finance User

Thamani Manager

Thamani Executive

Platform / Support Administrator
```

Roles SHALL remain composable.

---

# 88. Persona ≠ IAM Role Automatically

A UX persona is a design concept.

Canonical authorisation may use several:

```text
roles

permissions

relationship scopes

organisation context

resource scope
```

under IAM/application policy.

---

# 89. Authentication States

The estate SHALL distinguish at least:

```text
ANONYMOUS

AUTHENTICATED

AUTHENTICATED_WITH_ORGANISATION_CONTEXT

AUTHENTICATED_WITH_TRADING_RELATIONSHIP

AUTHENTICATED_STAFF

AUTHENTICATED_PARTNER
```

where appropriate.

---

# 90. Authentication ≠ Authorisation

This remains:

```text
logged in
    !=
allowed to see shipment X
```

---

# 91. Authorisation Context

Access MAY depend on:

```text
principal

organisation

legal entity

relationship

role

resource

market

service order

provider assignment

customer mandate

data classification
```

---

# 92. Object-Level Authorisation

Every private resource SHALL enforce object-level authorisation.

This is mandatory for:

```text
shipments

documents

quotes

invoices

provider bids

warehouse inventory

projects

customer organisations
```

---

# 93. URL Knowledge Is Not Permission

This SHALL remain:

```text
knows /shipments/123
    !=
may read shipment 123
```

---

# 94. BFF Security Boundary

The browser SHALL NOT directly orchestrate privileged engine calls.

Preferred architecture:

```text
Browser
   │
   ▼
Thamani Server / BFF
   │
   ├── session/context
   ├── authorisation
   ├── canonical contract validation
   ├── capability resolution
   ├── data composition
   └── response shaping
   │
   ▼
Baobab capabilities
```

---

# 95. Browser Credentials

Privileged engine/service credentials SHALL NOT be exposed to browser JavaScript.

---

# 96. Server-First Rendering

Public and appropriate authenticated surfaces SHOULD remain server-first.

Benefits include:

```text
reduced client JavaScript

SEO

controlled data access

session-aware rendering

faster meaningful content

clearer security boundary
```

---

# 97. Client Components Are Selective

Client-side rendering/interactivity SHOULD be reserved for genuine interaction such as:

```text
maps

live tracking

complex filters

interactive timelines

drag/drop planning

real-time notifications

charts

form state
```

rather than making the entire application client-rendered.

---

# 98. No Giant SPA Requirement

Thamani SHALL NOT default to:

```text
entire portal = client-side SPA
```

merely because the application is operationally complex.

---

# 99. Data Composition

Pages MAY require data from several domains.

Example:

```text
Shipment Detail
       │
       ├── TMS
       ├── Trade Docs
       ├── Regulations
       ├── ERP
       └── Pulse
```

The frontend SHOULD consume a purpose-built composition layer rather than orchestrating all services from client code.

---

# 100. BFF Composition Is Not New Authority

A composed response:

```text
ShipmentDetailView
```

is a view model.

It SHALL NOT become another canonical Shipment aggregate.

---

# 101. View Models

The estate MAY define frontend-specific types such as:

```text
CustomerShipmentView

CustomerInventoryView

OperationsExceptionView

ProviderAssignmentView

ExecutiveServiceLineView
```

These SHALL be explicitly classified as projections.

---

# 102. Domain Contracts Remain Canonical

Frontend view models SHALL map from canonical contracts.

They SHALL not redefine canonical:

```text
LogisticsShipment

TradeDocument

Organisation

RegulatoryDecision
```

semantics.

---

# 103. Market Context

The estate SHALL initially support Thamani operations in:

```text
South Africa
```

and future:

```text
Uganda
```

with architecture extensible to additional markets.

---

# 104. Market Context ≠ Locale

This remains:

```text
Market
    !=
Language

Market
    !=
Currency

Market
    !=
Jurisdiction automatically
```

---

# 105. Market Resolution

Market/context selection SHALL come from Control Plane/application context architecture rather than leaf components.

---

# 106. Currency

The UI SHALL display currency explicitly.

This is prohibited:

```text
1,500
```

where the relevant currency is ambiguous.

Prefer:

```text
ZAR 1,500

UGX 1,500,000
```

or appropriate localised rendering.

---

# 107. Time Zones

Logistics is inherently multi-zone.

Operational timestamps SHOULD make relevant zone/location context understandable.

The UI SHALL avoid ambiguous:

```text
Arrives at 08:00
```

for cross-border/multizone operations.

---

# 108. Local and Reference Time

Where useful:

```text
08:00 SAST
```

or:

```text
08:00 local time — Cape Town
```

SHOULD be displayed.

---

# 109. Responsive Architecture

The estate SHALL support:

```text
desktop

tablet

mobile
```

but individual surfaces may optimise differently.

---

# 110. Operational Desktop Density

Operations and executive workspaces MAY use higher information density appropriate for:

```text
dispatch

control tower

tables

multi-column monitoring
```

while remaining usable.

---

# 111. Customer Mobile Experience

Customer tracking and approval flows SHOULD be highly usable on mobile devices.

---

# 112. Accessibility

The estate SHALL target **WCAG 2.2 AA**.

WCAG 2.2 is a W3C Recommendation and is the current WCAG 2 standard W3C encourages organisations to use.

---

# 113. Accessibility Is a Release Requirement

Accessibility SHALL include:

```text
keyboard operation

focus visibility

semantic markup

form labels

error identification

contrast

touch targets

screen-reader semantics

reduced-motion consideration

accessible data tables

accessible modal/dialog behaviour
```

---

# 114. Maps Require Non-Map Alternatives

Where live maps are used for tracking:

```text
map
+
textual location/status representation
```

SHALL be available.

Map visualisation SHALL not be the only way to understand shipment status.

---

# 115. Charts Require Accessible Representation

Executive charts SHOULD provide:

```text
accessible labels

underlying values

table or textual equivalent
```

where necessary.

---

# 116. Performance Budget

The public estate and principal portal journeys SHOULD target the current Core Web Vitals “good” thresholds at the 75th percentile:

```text
LCP <= 2.5 s

INP <= 200 ms

CLS <= 0.1
```

Google's current Core Web Vitals guidance continues to use these thresholds.

---

# 117. Performance Is Contextual

An internal dense control-tower application MAY not share identical loading characteristics with the marketing homepage.

However:

```text
slow because enterprise app
```

SHALL not be accepted as architectural justification.

---

# 118. Route-Level Performance Budgets

Performance SHOULD be measured separately for:

```text
public pages

tracking

customer dashboard

shipment details

control tower

executive analytics
```

---

# 119. Streaming

Slow independent data sections SHOULD support streaming/Suspense where appropriate.

Example:

```text
Shipment header       fast
Tracking timeline     fast
Financial summary     streams later
Documents             streams later
AI risk prediction    streams independently
```

---

# 120. Intelligence Must Not Block Core UX

Pulse being unavailable SHALL NOT prevent:

```text
customer shipment page

tracking

booking details

document access
```

from loading where authoritative systems are healthy.

---

# 121. Graceful Degradation

Example:

```text
Shipment status:
IN TRANSIT

AI delay prediction:
Temporarily unavailable
```

is preferable to failure of the entire page.

---

# 122. CMS Boundary

CMS SHOULD own managed public editorial content such as:

```text
service pages

industry pages

insights

articles

corporate content

campaign landing pages

FAQs
```

where applicable.

---

# 123. CMS Shall Not Own Transaction Truth

This remains:

```text
CMS
    !=
Shipment database

CMS
    !=
provider qualification

CMS
    !=
quote authority
```

---

# 124. SEO

The Public Estate SHALL be search-engine accessible.

Public service/industry/market content SHOULD have:

```text
metadata

canonical URLs

structured headings

sitemaps

robots policy

structured data where appropriate
```

---

# 125. Private Portal SEO

Authenticated operational/customer pages SHOULD generally not be indexed.

---

# 126. Global Navigation

The public header SHOULD emphasise:

```text
Services

Solutions

Industries

Network

Insights

About
```

plus clear actions:

```text
Track

Request a Quote

Sign In
```

---

# 127. Mega Menu

A mega menu MAY organise the twelve service families without overwhelming the header.

Potential organisation:

```text
Transport
    Road Freight
    Shipping
    Courier
    Last Mile

Supply Chain
    Freight Forwarding
    Warehousing
    3PL
    4PL

Specialised
    Cold Chain
    Project Logistics
    Cross-Border Logistics
    Customs Brokerage
```

---

# 128. Portal Navigation Shall Differ

Authenticated navigation SHALL reflect user tasks, not the public marketing taxonomy.

---

# 129. Search

Public search MAY search:

```text
services

insights

help content
```

Authenticated search MAY additionally search authorised:

```text
shipments

service orders

documents

projects

invoices

provider assignments
```

---

# 130. Search Is Security-Sensitive

Search results SHALL enforce the same resource authorisation as direct access.

---

# 131. Global Command / Search

Internal operations MAY eventually support a command/search interface such as:

```text
Search shipment, customer, provider, booking...
```

This is a projection/navigation facility.

---

# 132. Notifications

The estate SHOULD support a unified notification experience.

Potential channels:

```text
in-app

email

SMS

push

webhook
```

according to preference and event criticality.

---

# 133. Notification ≠ Event

This remains:

```text
Domain Event
    !=
Customer Notification
```

Notifications are derived communication actions.

---

# 134. Notification Preferences

Users MAY configure preferences subject to mandatory operational/legal notifications.

---

# 135. Critical Alerts

Critical operational notifications MAY override ordinary marketing/preferences where contract/law permits.

Examples:

```text
Customs hold

delivery failure

cold-chain excursion

dangerous-goods incident

project movement blocked
```

---

# 136. Real-Time Updates

Real-time UI MAY use:

```text
SSE

WebSocket

subscription gateway
```

where justified.

Polling MAY remain acceptable for lower-frequency data.

---

# 137. Real-Time UI Does Not Require Real-Time Everything

Financial settlement or historical documents do not necessarily require streaming updates.

Use the appropriate freshness model per domain.

---

# 138. Freshness Indicators

Where stale information matters, the UI SHOULD show:

```text
Updated 2 min ago

Last provider update 45 min ago

Live tracking unavailable
```

rather than silently presenting stale information as current.

---

# 139. Error Model

Frontend errors SHOULD distinguish:

```text
VALIDATION_ERROR

NOT_AUTHORISED

NOT_FOUND

BUSINESS_BLOCK

REGULATORY_BLOCK

PROVIDER_UNAVAILABLE

STALE_DATA

CONFLICT

UNKNOWN
```

rather than:

```text
Something went wrong
```

for every failure.

---

# 140. Human-Friendly Errors

Internal error codes may be precise.

Customer-facing wording SHOULD be understandable.

Example:

```text
This shipment cannot be booked yet because a required customs document is missing.
```

rather than:

```text
ERR_TDOC_409
```

---

# 141. Error Detail Security

Technical stack traces, provider credentials and internal topology SHALL never leak into customer-facing errors.

---

# 142. Empty States

Empty states SHOULD be intentional.

Example:

```text
No active shipments
```

SHALL be distinguishable from:

```text
Shipments could not be loaded
```

---

# 143. Unknown ≠ Empty

This distinction is critical.

```text
[]
```

SHALL not be used when authoritative data is unavailable if it would imply “none”.

---

# 144. Audit-Aware UX

For high-risk actions, users SHOULD be able to understand:

```text
who performed action

when

what changed

previous state

approval trail
```

according to authorisation.

---

# 145. Dangerous Actions

Actions such as:

```text
cancel shipment

replace provider

submit Customs declaration

approve rate

void document

release hold

approve project variation
```

SHOULD receive suitable confirmation and authorisation UX.

---

# 146. Confirmation Should Describe Consequence

Prefer:

```text
Replace Carrier A with Carrier B?
This will cancel the current booking and may change ETA.
```

rather than:

```text
Are you sure?
```

---

# 147. Unsaved Forms

Long logistics forms SHOULD support:

```text
draft saving

validation

recovery

clear completion progress
```

where appropriate.

---

# 148. Multi-Step Forms

Complex workflows SHOULD use progressive steps.

Examples:

```text
Provider Application

Special Cargo Intake

Project Logistics RFQ

Customs Information Request
```

---

# 149. Evidence Before UI

The existing repository's useful “evidence-before-UI” principle SHALL remain.

Thamani SHALL NOT expose:

```text
Pay Invoice button

Cancel Booking button

Customs Released status

Provider Approved status
```

unless the corresponding backend contract and authority actually exist.

---

# 150. No Fabricated Backend

A beautiful interface SHALL NOT be used to simulate platform capabilities that have not been implemented.

---

# 151. Feature Capability Gating

UI availability SHOULD be based on:

```text
entitlement

capability availability

user authorisation

market

relationship

workflow state
```

rather than hard-coded assumptions.

---

# 152. Capability Unavailable

If a capability is unavailable:

```text
feature hidden
```

or:

```text
feature shown unavailable with explanation
```

MAY be appropriate depending on product intent.

---

# 153. Engine Failure ≠ UI Navigation Change

The estate SHALL not suddenly expose:

```text
Use ERP instead
```

because a provider failed.

Technical failover remains Control Plane responsibility.

---

# 154. Design System

Thamani SHALL own its design system within the Digital Estate.

It MAY use:

```text
Radix-style primitives

shadcn-style component ownership

accessible headless UI primitives
```

provided components are owned/versioned in the repository.

---

# 155. Design Tokens

The design system SHOULD govern:

```text
colour

typography

spacing

radius

elevation

motion

breakpoints

data visualisation

status semantics
```

---

# 156. Status Colours Are Insufficient Alone

Status SHALL never be represented only by colour.

Use:

```text
icon

label

shape

text
```

as appropriate.

---

# 157. Domain Status Components

Reusable components MAY include:

```text
ShipmentStatus

DocumentStatus

QualificationStatus

ExceptionSeverity

CustomsStatus

InventoryCondition

ProviderStatus
```

but SHALL map to canonical/domain semantics.

---

# 158. Do Not Flatten Domain Semantics

This is discouraged:

```text
everything
    → green / amber / red
```

when meaningful domain states matter.

---

# 159. Brand Architecture

Thamani SHALL present one coherent visual identity across:

```text
public

customer

partner

operations

executive
```

while allowing density/layout variations by experience.

---

# 160. Operational UI Is Still Brand UI

Internal tools SHOULD not degrade into an unrelated generic admin panel merely because customers do not see them.

Consistency reduces training and operational mistakes.

---

# 161. Route Architecture

The target route taxonomy SHOULD evolve conceptually toward:

```text
/

/services/*
/solutions/*
/industries/*
/network/*
/insights/*
/tracking
/quote
/about
/contact

/portal/*
/partner/*
/ops/*
/executive/*
```

Exact route names may evolve during implementation.

---

# 162. Customer Portal Route Candidates

```text
/portal
/portal/quotes
/portal/orders
/portal/shipments
/portal/shipments/[id]
/portal/inventory
/portal/documents
/portal/customs
/portal/projects
/portal/exceptions
/portal/invoices
/portal/reports
/portal/organisation
/portal/team
/settings
```

---

# 163. Partner Route Candidates

```text
/partner
/partner/profile
/partner/qualification
/partner/capabilities
/partner/opportunities
/partner/quotes
/partner/assignments
/partner/shipments
/partner/documents
/partner/invoices
/partner/performance
/partner/team
```

---

# 164. Operations Route Candidates

```text
/ops
/ops/control-tower
/ops/service-orders
/ops/shipments
/ops/sourcing
/ops/bookings
/ops/warehousing
/ops/customs
/ops/documents
/ops/special-cargo
/ops/projects
/ops/4pl
/ops/exceptions
/ops/network
/ops/customers
/ops/partners
```

---

# 165. Executive Route Candidates

```text
/executive
/executive/financial
/executive/customers
/executive/services
/executive/operations
/executive/providers
/executive/network
/executive/risk
/executive/projects
/executive/4pl
```

---

# 166. Route ≠ Authorisation Boundary Alone

Creating:

```text
/ops
```

does not secure operations functionality.

Server-side authorisation SHALL protect every sensitive request/resource.

---

# 167. Legacy Route Migration

Current:

```text
/shop

/products/[handle]

/cart

/checkout
```

SHALL be classified:

```text
REMOVE

REDIRECT

REPURPOSE
```

during migration.

They SHALL NOT remain indefinitely as hidden remnants of the obsolete retail model.

---

# 168. Legacy Search

The current retail:

```text
/search
```

MAY be replaced by:

```text
public content search
```

or contextual authenticated search.

It SHALL not retain ecommerce catalogue assumptions.

---

# 169. Legacy Medusa SDK

The currently installed:

```text
@medusajs/js-sdk
```

SHALL be reviewed.

It SHALL remain only if Thamani has a genuine accepted use case for a Baobab Trade capability.

Thamani's new logistics architecture SHALL NOT depend on Medusa merely because the dependency currently exists.

---

# 170. No Browser-to-Medusa Default

The old architecture's browser/storefront Commerce relationship SHALL not survive by inertia.

All engine access SHALL conform to THA-0009 and capability-resolution boundaries.

---

# 171. State Management

Global client state SHALL be introduced only where required.

Preferred sources are:

```text
server state

URL state

form state

small local interaction state
```

before adopting broad client-side application stores.

---

# 172. URL as Useful State

Filters such as:

```text
shipment status

date range

provider

exception severity
```

SHOULD use shareable URL state where appropriate.

---

# 173. Tables

Enterprise tables SHOULD support:

```text
sorting

filtering

pagination

column control

keyboard use

responsive alternatives

export where authorised
```

without requiring every table feature on every screen.

---

# 174. Large Datasets

Large shipment/operations datasets SHALL use:

```text
server filtering

server pagination / cursoring

bounded result sets
```

rather than loading thousands of records into the browser.

---

# 175. Maps

Map views MAY support:

```text
fleet visibility

shipment location

route

network disruption

warehouse/terminal network
```

but SHALL remain supplemental to canonical status.

---

# 176. Location Accuracy

The UI SHALL distinguish:

```text
GPS location

provider-reported location

milestone-derived location

estimated location
```

where the distinction matters.

---

# 177. Estimated Location ≠ Observed Location

This remains:

```text
estimated vessel position
    !=
observed cargo location
```

---

# 178. Document Rendering

Trade Docs MAY supply renderings.

Thamani SHOULD not independently regenerate formal documents from partial UI data unless authorised by Trade Docs architecture.

---

# 179. Downloads

Download actions SHALL use:

```text
authorised

time-bounded

secure
```

access patterns rather than permanently public object URLs for restricted documents.

---

# 180. Content Security

The estate SHOULD enforce modern browser security controls including appropriate:

```text
CSP

secure cookies

CSRF protections

same-site policy

frame restrictions

content-type protections
```

according to IAM/security ADRs.

---

# 181. Session Boundary

Session/authentication implementation SHALL align with the accepted IAM browser-session/BFF architecture.

The frontend SHALL not become an identity provider.

---

# 182. Login Experience

The user SHOULD experience:

```text
Sign In
```

to Thamani.

They SHOULD NOT need to understand which IAM implementation supplies authentication.

---

# 183. Step-Up Authentication

High-risk actions MAY require step-up authentication.

Examples:

```text
submitting Customs declaration

approving high-value provider selection

changing bank details

exporting sensitive customer data

privileged administration
```

according to IAM policy.

---

# 184. Executive Login

Executives SHALL have an explicit authenticated route to executive intelligence.

This experience SHALL NOT be hidden inside generic staff navigation if the executive workflow requires a distinct information hierarchy.

---

# 185. Impersonation / Support Access

Any future support/impersonation capability SHALL require explicit IAM/governance architecture and audit.

It SHALL not be implemented as an informal “view as customer” client-side feature.

---

# 186. Internationalisation

The architecture SHALL permit future:

```text
languages

regional formats

units

currencies
```

without embedding English strings throughout domain logic.

---

# 187. Units

Logistics quantities SHALL always display relevant units.

Examples:

```text
1,250 kg

22.5 m³

4 pallets

18°C
```

---

# 188. Unit Conversion

Conversion MAY be provided as presentation convenience.

Canonical operational values SHALL remain traceable to their source unit/value.

---

# 189. Customer Help

Contextual help SHOULD be available for complex logistics concepts.

Examples:

```text
What is a Consignment?

What does Customs Hold mean?

Why is my quote indicative?

What documents are missing?
```

---

# 190. Domain Language Should Be Accurate But Usable

Customer UX SHOULD simplify terminology without corrupting meaning.

Internal specialists MAY see richer domain vocabulary.

---

# 191. Notifications and Action Centre

Authenticated experiences SHOULD provide a coherent:

```text
Action Centre
```

for items requiring user intervention.

Potential items:

```text
Approve quote

Upload document

Provide Customs information

Approve provider variation

Review exception

Pay invoice

Update qualification evidence
```

---

# 192. Action Centre ≠ Notification Feed

Notifications say:

```text
something happened
```

Actions say:

```text
you need to do something
```

These SHALL remain distinguishable.

---

# 193. Saved Views

Operations and executive users MAY save:

```text
filters

table views

dashboard configurations
```

as personal or team preferences.

These SHALL not alter domain truth.

---

# 194. Auditability of UX-Originated Commands

Every material command initiated from the Digital Estate SHOULD retain:

```text
actor

organisation context

route/surface

correlation ID

request time

authorisation decision

result
```

where appropriate.

---

# 195. Observability

The frontend SHALL emit operational telemetry for:

```text
errors

latency

Web Vitals

route performance

failed backend calls

authentication failures

client exceptions
```

without leaking sensitive business data into logs.

---

# 196. Frontend Observability ≠ Business Audit

This remains:

```text
technical telemetry
    !=
business audit trail
```

---

# 197. Test Strategy

The Digital Estate SHALL maintain:

```text
unit tests

component tests

contract tests

accessibility tests

integration tests

E2E tests

critical-path smoke tests
```

appropriate to each surface.

---

# 198. Critical E2E Journeys

Initial critical journeys SHOULD include:

```text
public quote request

public tracking

customer sign-in

customer shipment tracking

quote approval

document upload/access

partner onboarding

partner assignment response

operations exception handling

provider selection

project-logistics visibility

4PL control-tower flow
```

---

# 199. Authorisation Tests

E2E/security testing SHALL prove:

```text
Customer A cannot access Customer B shipment.

Provider A cannot access Provider B bid.

Customer cannot access internal margin.

Partner cannot access internal control tower.

Unauthorised staff cannot perform privileged action.
```

---

# 200. Accessibility Tests

Automated accessibility tests SHALL supplement, not replace, manual accessibility evaluation.

---

# 201. Migration Principle

The Digital Estate SHALL migrate from:

```text
RETAIL STOREFRONT
```

to:

```text
INTEGRATED LOGISTICS ESTATE
```

through explicit gates rather than ad-hoc route replacement.

---

# 202. Implementation Gates

## THA-UX-00 — Legacy Estate Audit

Classify all current:

```text
routes

components

Medusa integrations

schemas

styles

tests

content

environment variables
```

as:

```text
KEEP

REUSE

REWRITE

REMOVE

REDIRECT
```

---

## THA-UX-01 — Experience Architecture

Establish:

```text
Public

Customer

Partner

Operations

Executive
```

route and layout boundaries.

---

## THA-UX-02 — Design System

Create/refresh:

```text
tokens

typography

navigation

forms

tables

statuses

alerts

cards

timelines

dialogs

charts
```

for logistics use cases.

---

## THA-UX-03 — Global Shell

Implement:

```text
public header

mega menu

footer

tracking CTA

quote CTA

sign-in
```

and authenticated shell patterns.

---

## THA-UX-04 — Public Estate

Implement:

```text
homepage

services

solutions

industries

network

about

contact
```

with CMS integration where appropriate.

---

## THA-UX-05 — Quote Intake

Implement progressive customer logistics RFQ intake.

---

## THA-UX-06 — Public Tracking

Implement privacy-safe tracking.

---

## THA-UX-07 — IAM / BFF Boundary

Implement accepted:

```text
session

organisation context

authorisation

server-side capability access
```

before private portal expansion.

---

## THA-UX-08 — Customer Portal Foundation

Implement:

```text
dashboard

organisation context

action centre

basic service orders
```

---

## THA-UX-09 — Customer Shipment Experience

Implement:

```text
LogisticsShipment

timeline

Consignment summary

exceptions

ETA

documents
```

from canonical providers.

---

## THA-UX-10 — Documents / Customs

Implement TDOC-backed:

```text
document library

versions

Customs workflow

missing requirements
```

---

## THA-UX-11 — Warehousing & Inventory

Implement THA-0010 customer projections.

---

## THA-UX-12 — Partner Portal Foundation

Implement:

```text
organisation profile

qualification

evidence

capabilities

team
```

---

## THA-UX-13 — Partner Execution

Implement:

```text
opportunities

assignments

bookings

shipment/job updates

documents
```

---

## THA-UX-14 — Operations Workspace

Implement:

```text
control tower

service orders

shipments

exceptions

provider coordination
```

---

## THA-UX-15 — Provider Selection UX

Implement THA-0013 sourcing/selection explainability.

---

## THA-UX-16 — Special Cargo

Implement THA-0011 cold-chain/DG operational views.

---

## THA-UX-17 — Project Logistics

Implement THA-0012 project-control views.

---

## THA-UX-18 — 4PL Control Tower

Implement cross-domain orchestration projections, exception management and customer mandate workflows.

---

## THA-UX-19 — Executive Experience

Implement executive scorecards from authoritative ERP/operational/Pulse sources.

---

## THA-UX-20 — Field Experience

Implement mobile-responsive field operations where demonstrated requirements justify it.

---

## THA-UX-21 — Accessibility Hardening

Verify WCAG 2.2 AA across critical journeys.

---

## THA-UX-22 — Performance Hardening

Verify route-specific performance and Core Web Vitals budgets.

---

## THA-UX-23 — Security Hardening

Verify:

```text
object authorisation

session security

CSRF

CSP

sensitive download handling

error leakage

role isolation

organisation isolation
```

---

## THA-UX-24 — Legacy Retirement

Remove/redirect:

```text
/shop

/products/*

/cart

/checkout
```

and retire obsolete retail integrations.

---

## THA-UX-25 — Production Readiness

Verify:

```text
functional E2E

accessibility

performance

security

observability

failover behaviour

stale-data handling

graceful degradation

SEO

analytics

disaster recovery
```

---

# 203. Alternatives Considered

## Alternative A — Keep the Existing Retail Storefront and Add Logistics Pages

**Rejected.**

The primary information architecture would remain fundamentally wrong.

---

## Alternative B — Build a Separate Site for Every Thamani Division

**Rejected.**

The divisions belong to one integrated logistics enterprise.

---

## Alternative C — Build One Generic Portal for Everyone

**Rejected.**

Customers, providers, operators and executives have materially different jobs, permissions and information density.

---

## Alternative D — Expose Baobab Engines in Navigation

**Rejected.**

Users consume Thamani services, not engine topology.

---

## Alternative E — Make the Browser Call Every Engine Directly

**Rejected.**

It weakens security, context resolution, composition and provider neutrality.

---

## Alternative F — Build Entire Estate as Client-Side SPA

**Rejected as the default.**

The server-first foundation remains better aligned with security, performance and SEO.

---

## Alternative G — Use the Control Tower as Universal Database

**Rejected.**

It is a projection/orchestration surface.

---

## Alternative H — Create Separate Customer Apps for Every Service

**Rejected.**

Customers often consume composite logistics services.

---

## Alternative I — Create Separate Accounts for Every Provider Role

**Rejected.**

One organisation may perform several logistics roles.

---

## Alternative J — Keep Medusa as Thamani's Primary Backend Because It Already Exists

**Rejected.**

Current dependency does not establish future business authority.

---

## Alternative K — Hide Backend Gaps Behind Mock UI

**Rejected.**

Evidence-before-UI remains an architectural rule.

---

# 204. Architectural Invariants

```text
Thamani Digital Estate
    != Baobab Platform

Digital Estate
    != System of Record

Public Estate
    != Customer Portal

Customer Portal
    != Partner Portal

Partner Portal
    != Operations Workspace

Operations Workspace
    != Executive Dashboard

Business Division
    != Separate Website automatically

Customer
    should not need engine knowledge

Browser
    must not orchestrate privileged engines directly

BFF
    != New System of Record

View Model
    != Canonical Entity

Customer Shipment View
    != LogisticsShipment authority

Control Tower
    != TMS

Control Tower
    != ERP

Control Tower
    != Trade Docs

Executive Dashboard
    != Ledger

Partner Portal
    != Provider Qualification Authority by itself

Uploaded Evidence
    != Qualification Approval

Quote
    != Booking

Booking
    != Movement

Movement
    != Delivery

Delivery
    != Customer Acceptance

Document Download
    != Document Identity

Customs Submitted
    != Customs Released

Prediction
    != Fact

Recommendation
    != Decision

Button Click
    != Domain Success

Unknown
    != Empty

Unavailable
    != Zero

Stale
    != Current

Public Tracking
    must not leak sensitive data

Route
    != Authorisation boundary

Login
    != Resource permission

Organisation membership
    != universal access

Engine failure
    != business-provider substitution

Field app
    != TMS

CMS
    != transaction store

Pulse
    != operational authority

Visual status colour
    must not be sole status indicator

Legacy retail routes
    must not survive by inertia
```

---

# 205. Target Experience Architecture

```text
                              PUBLIC
                     ┌──────────┴──────────┐
                     │    thamani.*        │
                     │                    │
                     │ Services           │
                     │ Solutions          │
                     │ Tracking           │
                     │ Quote              │
                     └──────────┬──────────┘
                                │
                           SIGN IN / CONTEXT
                                │
        ┌───────────────────────┼────────────────────────┐
        ▼                       ▼                        ▼
    CUSTOMER                 PARTNER                 THAMANI STAFF
     PORTAL                   PORTAL                      │
        │                       │             ┌───────────┴───────────┐
        │                       │             ▼                       ▼
        │                       │        OPERATIONS               EXECUTIVE
        │                       │        WORKSPACE                 EXPERIENCE
        │                       │             │                       │
        └───────────────────────┴─────────────┼───────────────────────┘
                                              ▼
                                      THAMANI APP / BFF
                                              │
                          canonical contracts / capability calls
                                              │
        ┌─────────────┬─────────────┬─────────┼─────────┬──────────────┐
        ▼             ▼             ▼         ▼         ▼              ▼
       TMS         TRADE DOCS      ERP    REGULATIONS  CMS           PULSE
        │             │             │         │         │              │
        └─────────────┴─────────────┴─────────┼─────────┴──────────────┘
                                              │
                                              ▼
                                      CONTROL PLANE
                                context / entitlement / resolution
                                              │
                                              ▼
                                      CAPABILITY PROVIDERS
```

---

# 206. Customer Mental Model

The customer SHOULD experience:

```text
I need a logistics service.
        │
        ▼
I request a quote.
        │
        ▼
I approve the service.
        │
        ▼
Thamani coordinates execution.
        │
        ▼
I track progress.
        │
        ▼
I respond when action is required.
        │
        ▼
I receive my cargo.
        │
        ▼
I access documents and invoices.
```

The customer SHOULD NOT experience:

```text
I need to know whether
TMS, ERP, Trade Docs or Medusa
owns the next screen.
```

---

# 207. Partner Mental Model

A logistics partner SHOULD experience:

```text
My company works with Thamani.
        │
        ▼
I maintain our qualification.
        │
        ▼
We receive appropriate opportunities.
        │
        ▼
We accept assigned work.
        │
        ▼
We report execution.
        │
        ▼
We provide required evidence.
        │
        ▼
We resolve exceptions.
        │
        ▼
We reconcile payment/performance.
```

---

# 208. Operations Mental Model

A Thamani operator SHOULD experience:

```text
What needs attention?
        │
        ▼
What is the authoritative problem?
        │
        ▼
What action am I authorised to take?
        │
        ▼
Which domain/provider executes it?
        │
        ▼
Has that action actually succeeded?
        │
        ▼
What changed for the customer?
```

---

# 209. Executive Mental Model

An executive SHOULD experience:

```text
What is happening?
        │
        ▼
Why is it happening?
        │
        ▼
What is at risk?
        │
        ▼
Where are we making / losing money?
        │
        ▼
Which customers/providers/services need intervention?
        │
        ▼
What is actual vs forecast?
```

---

# 210. Final Decision

Thamani SHALL operate one integrated logistics Digital Estate that provides differentiated experiences for:

```text
public visitors

customers

logistics partners

field personnel

operations teams

management

executives
```

without fragmenting the enterprise or exposing Baobab's engine architecture to those users.

The Digital Estate SHALL remain an **experience, orchestration and projection layer**, while:

```text
Control Plane
    owns context and capability resolution

IAM
    owns authentication/session mechanisms

TMS
    owns transport execution

Warehouse providers
    own warehouse execution

Trade Docs
    owns documentary and Customs workflow state

Regulations
    owns regulatory decisions

ERP
    owns financial truth

CMS
    owns managed editorial content

Pulse
    owns non-authoritative intelligence
```

The defining customer principle is:

> **Customers shall experience one Thamani service even when that service is fulfilled by several divisions, external providers and Baobab engines.**

The defining partner principle is:

> **Partners shall interact through the scope of their real commercial and operational relationship with Thamani without gaining visibility into unrelated providers, customers or internal commercial information.**

The defining operations principle is:

> **Operations shall be exception-led and action-oriented, with every material action executed by the authoritative domain rather than simulated by the frontend.**

The defining executive principle is:

> **Executive views shall compose operational, financial and predictive information while visibly preserving the distinction between actual fact, target, forecast and intelligence.**

The defining frontend principle is:

> **Thamani shall retain its modern server-first Next.js foundation but replace the obsolete retail-storefront information architecture with a logistics-native, capability-driven Digital Estate.**

The defining security principle is:

> **Authentication, organisation context and object-level authorisation shall be enforced at the server/application boundary; knowledge of a route, identifier or tracking reference shall never itself establish permission.**

The defining accessibility principle is:

> **The Digital Estate shall target WCAG 2.2 AA across public, customer, partner and operational experiences.**

The defining performance principle is:

> **Public and core portal experiences shall be engineered against real-user performance budgets, with LCP ≤ 2.5 seconds, INP ≤ 200 ms and CLS ≤ 0.1 as the current Core Web Vitals “good” targets at the 75th percentile.**

And the defining product principle is:

> **The Thamani UI shall make sophisticated logistics feel coherent without making sophisticated architecture disappear internally: complexity is composed behind the experience, not duplicated inside it.**