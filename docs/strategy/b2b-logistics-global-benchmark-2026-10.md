# Thamani B2B logistics — global capability benchmark and estate experience implications

**Status:** Reference benchmark and execution guidance — NOT an architecture decision, approval, production qualification or provider licence.  
**Assessed:** 2026-10-23  
**Governing authority:** Accepted ADR-THA-0018; Shared EA Implementation Plan v2.3; relevant Shared/CP/IAM/TMS/Trade Docs/Regulations/ERP ADRs.

## 1. Unambiguous commercial model

Thamani Global operates as a **B2B integrated logistics enterprise**. The contracting logistics customer is a **Customer Organisation** purchasing transport, freight forwarding, warehousing, customs-support coordination, 3PL, 4PL and related outcomes. Shipment recipients, individual drivers, contacts and consignees can be natural persons; **that fact alone neither makes the logistics contract B2C nor makes the recipient an authorised purchasing Principal**. Do not infer the model from an API key, sales channel, lack of a buyer Organisation, contact person or delivery destination.

ADR-THA-0018 supersedes the retired B2C product-cart-checkout business model. There is no approval to restore retail Medusa checkout, or to create a CP B2C estate profile for Thamani. Any future direct-to-consumer service would need a **new explicit governance decision**, independent onboarding, proper authority and regression qualification; it cannot arise as a fallback.

## 2. Benchmark: learn the capabilities, not another company's authority model

- **DHL Global Forwarding (myDHLi Quote + Book):** Instant air/ocean freight rates, price/speed/emissions comparisons, save/resume and quote collaboration. For Thamani: versioned shareable RFQs and quotes, with approvals and validity checks before booking.
- **DHL South Africa digital business tools:** Corporate shipment portals for quoting, booking, tracking and Customs, supported by integrations. For Thamani: separate public lead capture from authorised Organisation self-service.
- **UPS Supply Chain Solutions:** Freight forwarding, transportation management, warehousing, distribution and e-commerce fulfilment. For Thamani: sell logistics services and outcomes, not a merchandise catalogue; a consumer delivery recipient remains distinct from the contracting organisation.
- **DSV (myDSV):** Quote, book, track, saved drafts, centralised documents, claims and reporting. For Thamani: make self-service, commercial document custody and exception handling first-class.
- **Kuehne+Nagel (myKN):** Freight quotes, bookings, shipment visibility, documents, schedules and analytics. For Thamani: quote-to-book lineage, milestone tracking, proactive alerts and trustworthy reporting.

**Sources (vendor descriptions, not independent performance verification):**

- DHL: https://www.dhl.com/za-en/home/global-forwarding/mydhli/discover-quote-and-book.html
- DHL South Africa: https://www.dhl.com/za-en/home/dhl-for-your-business/why-partner-with-us/integrations-and-tools.html
- UPS: https://www.ups.com/us/en/ups-supplychain
- DSV: https://www.dsv.com/en/digital-solutions/mydsv
- Kuehne+Nagel: https://www.kuehne-nagel.com/us/digital-services/mykn

Thamani SHOULD test these capabilities against African corridors and constraints (multi-country documentation, customs and tax evidence, mobile connections, language, local settlement, service-provider fragmentation and exceptions) before implementation. Competitor UI is inspiration; Baobab ADRs and contracts remain authoritative.

## 3. Target digital-estate customer journeys

**Public:** services by mode/division, sectors, corridors and Markets, service request/RFQ entry, company details, support, CMS-governed information and narrowly scoped tracking lookup (only where secure and permitted).

**Customer Organisation portal:** governed onboarding and membership; workspace with role/Market scopes; create RFQ; request/compare/approve quotes; service-contract and account-rate visibility; book from a valid quote; shipment dashboard; milestone tracking; alerts and exceptions; documents; invoices/statements; claims; delegated shipment-recipient visibility; audit and reporting.

**Logistics partner portal:** organisation/counterparty qualification, capability/market evidence, offered capacity, tender/assignment response, performance and document exchange where governed. Partners are not automatically platform Tenants.

**Operations and 4PL control tower:** governed service composition and provider orchestration; claims and escalations; a consolidated _view_ of operational evidence from the owning engines, never a rival operational system of record.

The principal commitment journey is **Customer Organisation → authorised human/workload → RFQ → quoted service → approval → B2B booking/service order → transport execution → delivery/exception → financial settlement**. A consignee's tracking rights are scoped and distinct from purchasing powers.

## 4. Keep platform authority boundaries intact

- **Thamani Digital Estate:** Organisation-facing UX, service and offer composition, commercial quotation/account relationship, customer coordination and 4PL experience.
- **Control Plane:** Canonical Organisation, Tenant, Market, Digital Estate, capability and governed resource/workload context, plus independently approved commerce profiles.
- **IAM:** Human/workload authentication, assurance and revocation; never buyer role or purchasing authority merely from authentication.
- **Baobab TMS:** LogisticsShipment, consignment, transport booking/execution, capacity, carrier/equipment assignment, routes and physical milestones.
- **Trade Docs and Regulations:** Trade-document workflow, Customs-support evidence, applicable regulations and decisions; sovereign decisions remain with competent authorities.
- **ERP and governed finance engines:** Invoices, accounting, settlement and financial responsibility.
- **CMS and Pulse:** Editorial content and governed evidence-backed intelligence.

**Important CAA-06b/Decision 9 boundary:** Shared ADR-SHARED-042 requires authenticated, CP-governed provenance on _any_ native Trade commitment path. A Medusa Store API/publishable key or background job is not estate provenance. A BFF may use CP estate-client binding; a non-BFF workload must use CP-governed estate-resource assignment and independently validated buyer/seller commitments. Missing provenance is refused, never classified as B2C. Nothing in this benchmark is a CAA-06b implementation, a live CP commerce-profile registration or requalification of historical TA-08 legacy retail checkout. Logistics booking is not automatically a Medusa order.

## 5. Acceptance and sequencing

1. **P0 architecture correction:** reconcile Shared Decision 8/9, CP profile texts and founding-group onboarding fixtures to Thamani B2B; retain general platform B2C capability for _other_ governed estates.
2. **P0 public estate:** deliver truthful logistics service and corridor discovery, contact/RFQ lead capture through a secure reviewed route, privacy, accessibility, SEO, genuine content and navigation. Public launch does not imply live booking permissions.
3. **P1 authenticated business context:** IAM → CP → approved Customer Organisation membership and Market/service scopes; positive and negative identity tests.
4. **P1 quote/book/track:** quote validity and approvals; versioned service commitment; governed TMS booking and read-only milestones; appropriate document/financial ownership. Define a non-BFF estate assignment where workflows require it.
5. **P1 security/fence:** cross-tenant and wrong-Organisation denial, stale/revoked assignment denial, direct route/callback bypass denial, idempotent/concurrent commitment protections and independent connected acceptance.
6. **P2 richer business experience:** live corridor options, carrier comparison where qualified, exception management, analytics, claims and API/EDI integration.

Do not represent a prototype or historical retail TA-08 evidence as connected logistics acceptance. Governed independent registry allocation and actual runtime qualification remain separate gates.
