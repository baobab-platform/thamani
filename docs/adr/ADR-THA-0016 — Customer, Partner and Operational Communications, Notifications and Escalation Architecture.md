# ADR-THA-0016 — Customer, Partner and Operational Communications, Notifications and Escalation Architecture

**Status:** Accepted — Foundational Thamani Architecture  
**Date:** 2026-10-03  
**Decision Owners:** Nabhold Group Africa / Thamani Global / Baobab Platform Architecture  
**Primary Repository:** `baobab-platform/thamani`  
**Legal Entity:** `THAMANI-GLOBAL`  
**Digital Estate:** Thamani  
**Primary Domain:** Communications / notifications / action centre / recipient policy / escalation / delivery coordination  
**Identity / Authentication Authority:** `baobab-platform/baobab-iam`  
**Canonical Context / Organisation Authority:** `baobab-platform/baobab-cp`  
**Canonical Event Authority:** `baobab-platform/shared`  
**Transport Facts:** `baobab-platform/baobab-tms`  
**Trade Documents / Customs:** `baobab-platform/baobab-trade-docs`  
**Financial Facts:** `baobab-platform/baobab-erp`  
**Regulatory Decisions:** `baobab-platform/baobab-regulations`  
**Managed Editorial Content:** `baobab-platform/baobab-cms` where appropriate  
**Intelligence:** `baobab-platform/baobab-pulse` where explicitly non-authoritative  
**Decision Class:** Communication intent / notification / messaging / channel delivery / preferences / consent / escalation / acknowledgement / webhook / communication audit

---

# 1. Normative Dependencies

This ADR SHALL be interpreted consistently with:

- ADR-THA-0003 — Thamani Global Integrated Shipping, Transportation and Logistics Enterprise Domain Boundary
- ADR-THA-0004 — Logistics Counterparty, Carrier, Service-Provider Qualification and Partner Onboarding
- ADR-THA-0006 — RFQ, Logistics Quotation, Contract, Rate and Margin Architecture
- ADR-THA-0008 — Cross-Border, Customs, Corridor, Transit and Regulatory Architecture
- ADR-THA-0009 — Capability Consumption, Engine Authority and System-of-Record Boundary
- ADR-THA-0010 — Warehousing, 3PL and Inventory-Custody Service Composition Boundary
- ADR-THA-0011 — Cold Chain, Dangerous Goods and Special-Cargo Service Boundary
- ADR-THA-0012 — Project Logistics and Heavy / Abnormal Cargo Service Architecture
- ADR-THA-0013 — 4PL Control Tower, Provider Selection and Multi-Provider Orchestration Architecture
- ADR-THA-0014 — Thamani Digital Estate, Customer, Partner and Operations Experience Architecture
- ADR-THA-0015 — Claims, Liability, Service Recovery and Insurance Coordination Architecture
- ADR-IAM-0023 — Digital Estate Authentication UX, Browser Session and BFF Security Boundary
- ADR-IAM-0024 — Authentication Assurance, MFA, Passkeys, Step-Up and Risk-Based Authentication Policy
- ADR-SHARED-018 — Canonical Event Context Registry, Event-Type Ownership and Legacy Event Migration
- applicable Control Plane, ERP, CMS, TMS, Trade Docs, Regulations and Shared decisions.

---

# 2. Executive Decision

Thamani SHALL establish a first-class **Communication and Notification Orchestration boundary** responsible for transforming authoritative business facts and authorised human actions into appropriately targeted communications.

The canonical flow SHALL be:

```text id="pj841m"
AUTHORITATIVE BUSINESS FACT
          │
          ▼
Canonical Domain Event
          │
          ▼
Communication Policy
          │
          ▼
Communication Intent
          │
          ├── Why?
          ├── To whom?
          ├── Required?
          ├── Urgency?
          ├── Which channels?
          ├── Which content/template?
          ├── Which language?
          └── Acknowledgement required?
          │
          ▼
Recipient Resolution
          │
          ▼
Preference / Consent / Policy Evaluation
          │
          ▼
Delivery Plan
          │
   ┌──────┼───────┬─────────┬─────────┐
   ▼      ▼       ▼         ▼         ▼
 IN-APP  EMAIL    SMS      PUSH     WEBHOOK
   │      │       │         │         │
   └──────┴───────┴─────────┴─────────┘
                  │
                  ▼
             Delivery State
                  │
                  ▼
         Ack / Reply / Escalation
                  │
                  ▼
             Owning Workflow
```

---

# 3. Governing Principle

> **A communication tells somebody about a business fact or asks somebody to act; it never becomes the authoritative business fact itself.**

---

# 4. Fundamental Separations

The following SHALL remain non-negotiable:

```text id="1f9rn7"
Domain Event
    != Notification

Notification
    != Communication Intent

Communication Intent
    != Delivery Attempt

Delivery Attempt
    != Delivery Confirmation

Delivery Confirmation
    != Human Read

Human Read
    != Acknowledgement

Acknowledgement
    != Required Action Completed

Email Sent
    != Shipment Departed

SMS Delivered
    != Customs Released

Push Notification
    != Regulatory Decision

Webhook Delivered
    != Consumer Processed Successfully automatically

Customer Message
    != Customer Approval

Reply
    != Domain Command automatically

Notification Preference
    != Legal Consent automatically

Consent
    != Contractual Obligation

Marketing Communication
    != Operational Communication

Operational Communication
    != Security Communication

Notification
    != Audit Record

Template
    != Message

Message
    != TradeDocument

Attachment
    != TradeDocument identity

Communication Provider
    != Communication Domain

Channel Provider Failover
    != Business Provider Substitution
```

---

# 5. Why This ADR Is Required

THA-0014 establishes:

```text id="vk1y46"
in-app notifications

email

SMS

push

webhook

Action Centre

critical operational alerts
```

as Digital Estate concerns.

THA-0015 additionally requires communication for:

```text id="g9g27j"
claim receipt

information requests

survey scheduling

settlement offers

claims closure
```

Without a single governing architecture, every domain could independently:

```text id="w21eu6"
send email

send SMS

choose recipients

apply preferences

retry failures

format messages

maintain templates

track delivery

escalate failures
```

creating duplicated policy and inconsistent customer treatment.

This ADR prevents that fragmentation.

---

# 6. Canonical Event Integration

Baobab Shared already governs canonical business events through:

```text id="khm0e0"
com.baobab-platform.<context>.<aggregate>.<fact>.v<N>
```

with producer authority assigned per canonical event type.

THA-0016 SHALL consume those facts.

It SHALL NOT require source engines to emit Thamani-specific commands.

---

# 7. No Estate-Named Event Revival

ADR-SHARED-018 explicitly retired historical:

```text id="kkhrwr"
thamani-*
```

event types because they encoded a Digital Estate and target consumer into canonical platform events.

THA-0016 SHALL preserve that decision.

This SHALL remain prohibited:

```text id="fh11qc"
com.baobab-platform.trade.thamani-send-customer-email.v1
```

The source domain SHOULD emit:

```text id="lbv2vr"
what happened
```

not:

```text id="6g5g3z"
who must be emailed about it
```

---

# 8. Example

Preferred:

```text id="m72qud"
TMS
  │
  ▼
logistics.movement.delayed
  │
  ▼
Thamani Communications Policy
  │
  ├── Customer affected?
  ├── SLA risk?
  ├── Critical?
  └── Notify which contacts?
```

Rejected:

```text id="g8c1oz"
TMS
  │
  ▼
send-customer-delay-sms
```

---

# 9. Source Domain Owns Business Fact

Examples:

| Fact | Authority |
|---|---|
| Movement delayed | TMS |
| Delivery completed | TMS |
| Warehouse discrepancy | Warehouse provider |
| Customs hold | Trade Docs / external authority |
| Regulatory block | Regulations |
| Quote issued | Thamani commercial domain |
| Claim received | Thamani Claims |
| Invoice posted | ERP |
| Provider qualification expired | Thamani qualification domain |
| Network disruption identified | Thamani 4PL management domain |

Communications SHALL consume these facts.

---

# 10. Communications Does Not Reinterpret Authority

If Trade Docs reports:

```text id="rs8680"
DECLARATION_SUBMITTED
```

the communication layer SHALL NOT send:

```text id="pd5p4d"
Your goods have cleared Customs.
```

Communication semantics SHALL remain faithful to the source state.

---

# 11. CommunicationIntent

Thamani SHALL model the decision to communicate independently from transport/channel delivery.

Conceptually:

```text id="wyraaz"
CommunicationIntent
├── communication_intent_id
├── tenant_context
├── legal_entity_context
├── source_fact_ref?
├── source_action_ref?
├── purpose
├── communication_class
├── urgency
├── mandatory_policy
├── audience_specification
├── channel_policy
├── template_ref?
├── locale_policy
├── acknowledgement_policy?
├── escalation_policy_ref?
├── schedule?
├── expires_at?
├── correlation_id
├── lifecycle_state
├── created_at
└── policy_version
```

---

# 12. Communication Intent Answers Why

The intent SHALL answer:

> **Why is Thamani communicating?**

Examples:

```text id="d9iqim"
inform customer of delay

request missing Customs information

ask provider to accept assignment

notify staff of cold-chain excursion

send invoice availability notice

request customer quote approval

inform claimant that evidence is missing

escalate unacknowledged critical incident
```

---

# 13. CommunicationIntent ≠ Message

One intent may generate:

```text id="2bn62n"
one in-app notification

one email

one SMS fallback
```

to one recipient.

Or:

```text id="v68xch"
several messages
```

to several authorised recipients.

---

# 14. Communication Classes

Thamani SHALL classify communications at least conceptually as:

```text id="lcxw2e"
SECURITY

SAFETY_CRITICAL

REGULATORY_OR_LEGAL

ACTION_REQUIRED

OPERATIONAL

TRANSACTIONAL

FINANCIAL

CLAIMS

SERVICE_INFORMATION

PARTNER_OPERATIONAL

INTERNAL_OPERATIONAL

DIRECT_MARKETING
```

The exact enum MAY be refined.

---

# 15. Class ≠ Urgency

This remains:

```text id="exxuhv"
communication class
    !=
urgency
```

An invoice notification may be:

```text id="0ynxhe"
FINANCIAL + NORMAL
```

while a dangerous-goods incident may be:

```text id="ob1qwg"
SAFETY_CRITICAL + CRITICAL
```

---

# 16. Urgency

A canonical urgency vocabulary SHOULD support:

```text id="0zt0aa"
CRITICAL

HIGH

NORMAL

LOW
```

or equivalent.

---

# 17. Urgency ≠ Severity of Source Event

A severe operational event does not automatically require every recipient to receive a CRITICAL notification.

Communication policy SHALL consider:

```text id="wc9ecw"
recipient role

required action

customer impact

time sensitivity

SLA

safety

regulatory significance
```

---

# 18. Mandatory Policy

Communications SHALL also distinguish:

```text id="ffpzdj"
MANDATORY

CONDITIONALLY_MANDATORY

OPTIONAL

MARKETING_OPT_IN
```

or equivalent policy.

---

# 19. Mandatory ≠ Every Channel Mandatory

Example:

```text id="4p1ga9"
Customs information required:
MANDATORY communication

Preferred channels:
in-app + email

SMS:
fallback only
```

---

# 20. Operational vs Marketing Communication

Transactional and operational communications SHALL remain structurally separate from direct marketing.

Examples of operational communications:

```text id="mlvpy6"
Your shipment is delayed.

A Customs document is required.

Your quote expires tomorrow.

Provider assignment requires acceptance.

Your claim needs additional evidence.
```

Examples of marketing:

```text id="jwbrv4"
Try our new cold-chain service.

Book freight this month and receive a discount.

Read about our new route.
```

---

# 21. No Marketing Hidden Inside Operational Messages

This SHALL be prohibited as a deliberate policy:

```text id="aa0pht"
"Your shipment is delivered.
By the way, book our new service today!"
```

where promotional content would circumvent applicable marketing preference/consent controls.

---

# 22. POPIA — South African Initial Market

South Africa's Information Regulator specifically treats unsolicited electronic direct marketing under POPIA section 69 and identifies channels including email, SMS, telephone, push notifications and certain direct messaging. Its guidance states that unsolicited electronic marketing to a non-customer requires prior consent, with separate conditions applying to existing customers.

Therefore:

> **Thamani SHALL treat direct-marketing consent as a separately governed purpose and SHALL NOT assume that permission to send operational logistics communications creates permission to send marketing.**

---

# 23. Cross-Market Compliance

South African POPIA SHALL NOT be encoded as a universal global communications law.

As Thamani enters additional markets:

```text id="v8szuu"
South Africa

Uganda

future jurisdictions
```

the applicable:

```text id="irjd2g"
consent

privacy

direct-marketing

retention

communication
```

requirements SHALL be resolved according to jurisdiction and regulatory architecture.

---

# 24. Preference ≠ Legal Permission

This remains:

```text id="82xai4"
user prefers SMS
    !=
Thamani legally permitted to send every SMS purpose
```

---

# 25. Legal Permission ≠ Preference

Likewise:

```text id="2tx0tz"
Thamani legally permitted to send email
    !=
user wants email as preferred channel
```

---

# 26. CommunicationPreference

Thamani MAY maintain:

```text id="fwyirw"
CommunicationPreference
├── principal_ref
├── organisation_context?
├── communication_class
├── allowed_channels[]
├── preferred_channel?
├── fallback_channels[]
├── language?
├── timezone?
├── quiet_hours?
├── digest_preference?
├── updated_at
└── source
```

subject to applicable consent/policy.

---

# 27. Preferences Can Be Contextual

A person MAY prefer:

```text id="gbd7bi"
shipment updates
    → email

critical exceptions
    → SMS + push

finance
    → email

marketing
    → disabled
```

---

# 28. Organisation Policy May Override Personal Defaults

A customer organisation MAY require:

```text id="2k4nk5"
all Customs alerts
    → customs-team role

invoice notifications
    → finance role

critical logistics incidents
    → operations manager
```

Organisation policy SHALL not casually bypass legal consent requirements where those apply.

---

# 29. Mandatory Communications

Users SHALL NOT be permitted to suppress communications that are contractually, legally, security- or safety-critical where policy requires delivery.

Examples MAY include:

```text id="so5izn"
security alert

dangerous-goods incident

critical cargo safety instruction

legal notice

required Customs action

claim limitation warning

account-security event
```

depending upon applicable policy.

---

# 30. Mandatory Does Not Mean Spam Every Channel

For mandatory messages the system SHOULD still determine:

```text id="h19c5q"
minimum required delivery policy

primary channel

fallback channel

acknowledgement

escalation
```

rather than broadcasting through every channel indiscriminately.

---

# 31. Recipient Resolution

Communications SHALL target canonical relationships rather than hard-coded addresses where possible.

Conceptually:

```text id="boi0u2"
RecipientSpecification
├── explicit_principal_ref?
├── organisation_ref?
├── relationship_role?
├── operational_role?
├── resource_relationship?
├── case_participant?
├── provider_assignment_ref?
└── recipient_policy
```

---

# 32. Role-Based Recipient Example

Instead of:

```text id="pcsdpt"
send to customs@customer.com
```

prefer conceptually:

```text id="pvi7o2"
Customer Organisation
    +
CUSTOMS_CONTACT role
```

then resolve the authorised current contacts.

---

# 33. Recipient ≠ Endpoint

This is mandatory:

```text id="6mgll2"
Jane
    != jane@example.com
```

Jane is the person/principal.

The email address is one communication endpoint.

---

# 34. CommunicationEndpoint

Conceptually:

```text id="qf19qm"
CommunicationEndpoint
├── endpoint_id
├── principal_or_org_ref
├── channel
├── address_or_endpoint
├── verification_state
├── ownership/source
├── effective_from
├── effective_to?
├── status
└── classification
```

---

# 35. Canonical Contact Authority

Thamani SHALL consume authoritative identity/organisation contact information where available.

It SHALL not create an uncontrolled parallel universal contact master merely for notifications.

---

# 36. Case-Specific Contacts

Operational logistics may legitimately require temporary contacts such as:

```text id="z1py0k"
site receiver

driver contact

project coordinator

temporary broker contact

emergency contact
```

These MAY be relationship/case scoped.

They SHALL not automatically become canonical organisation master data.

---

# 37. Endpoint Verification

Where communication security matters, the system SHOULD distinguish:

```text id="iyjfgb"
DECLARED

VERIFIED

UNVERIFIED

INVALID

BOUNCED

REVOKED
```

or equivalent.

---

# 38. Sensitive Communications

Sensitive information SHOULD NOT be delivered to an unverified endpoint merely because:

```text id="goe9zf"
the user typed it once
```

where risk policy requires verification.

---

# 39. Recipient Snapshot

For legally or operationally significant messages, the delivery record SHOULD preserve:

```text id="8lzc0g"
who was resolved

which endpoint was used

which role justified receipt

which policy/version resolved them
```

so historical delivery can be explained even if contact data later changes.

---

# 40. DeliveryPlan

A CommunicationIntent SHALL resolve into a delivery plan.

Conceptually:

```text id="0dzvct"
DeliveryPlan
├── communication_intent_id
├── recipient_ref
├── resolved_endpoints[]
├── selected_channels[]
├── order/fallback policy
├── schedule
├── quiet-hours handling
├── acknowledgement_requirement
├── escalation_policy
└── expires_at?
```

---

# 41. Multi-Channel Does Not Mean Broadcast

The preferred model SHOULD support:

```text id="9rizxx"
email first
    │
    ▼
await acknowledgement
    │
    ├── acknowledged → stop
    │
    └── timeout
          │
          ▼
         SMS
```

where policy calls for fallback.

---

# 42. Channel Ordering

Channel choice MAY depend on:

```text id="sbp3fz"
urgency

recipient preference

cost

delivery reliability

security

message size

required acknowledgement

jurisdiction

business role
```

---

# 43. In-App Notifications

In-app notifications SHOULD be the canonical Thamani Digital Estate surface for ordinary authenticated communications where appropriate.

They MAY power:

```text id="bckm1c"
notification centre

Action Centre

badge counts

task links

operational alerts
```

---

# 44. Notification Centre ≠ Action Centre

Following THA-0014:

```text id="45nzy0"
Notification Centre
    something happened

Action Centre
    user must do something
```

These SHALL remain distinguishable.

---

# 45. Action Required

A CommunicationIntent MAY reference a domain action.

Example:

```text id="9ob4tp"
Customs information required
        │
        ▼
Action Centre Item
        │
        ▼
Open Customs Case
```

The action's lifecycle belongs to the owning domain.

---

# 46. Completing Action Resolves Action Item

This remains:

```text id="hbeewl"
Customer uploaded required document
    → source workflow evaluates completion
```

not:

```text id="96qc51"
Customer clicked notification
    → requirement completed
```

---

# 47. Email

Email SHALL remain a provider-neutral delivery channel.

The communication domain SHALL not encode:

```text id="eg2nnd"
SendGrid-specific fields

Amazon SES-specific fields

Mailgun-specific fields

Microsoft-specific fields
```

into canonical business models.

---

# 48. Email Authentication

Production Thamani sending domains SHOULD implement appropriate email-domain authentication.

SPF provides a mechanism for a domain to authorise sending hosts, while DKIM cryptographically associates a signing domain with a message.

The current DMARC standard is **RFC 9989**, published in May 2026, which supersedes RFC 7489 and combines SPF/DKIM authentication results with Author Domain alignment and domain-owner policy.

Therefore production email infrastructure SHOULD support:

```text id="nik4y4"
SPF

DKIM

DMARC
```

appropriately.

---

# 49. Email Authentication ≠ Message Truth

This remains:

```text id="rqia9x"
DMARC passes
    !=
business content is correct
```

Email authentication protects sender/domain authenticity.

The source business domain still owns message truth.

---

# 50. Sender Identities

Thamani SHOULD use purpose-appropriate sending identities.

Examples MAY include:

```text id="y1l06x"
operations@

documents@

claims@

billing@

security@
```

subject to communication policy.

These SHALL not imply separate legal entities.

---

# 51. Reply Handling

A sender MAY be:

```text id="komikl"
no-reply
```

only when replies genuinely cannot be meaningfully handled.

Where communication requires dialogue, a controlled reply path SHOULD be provided.

---

# 52. SMS

SMS SHALL remain a provider-neutral channel suitable for:

```text id="rm9zyi"
time-sensitive short alerts

fallback notifications

authentication-related delivery where IAM policy permits

critical operational notices
```

subject to legal/policy constraints.

---

# 53. SMS Shall Not Carry Excessive Sensitive Data

Prefer:

```text id="a7xjyy"
Shipment ZB-123 requires your attention.
Sign in to Thamani for details.
```

over:

```text id="q2f1oa"
full commercial invoice

cargo value

dangerous-goods details

sensitive claim information
```

---

# 54. SMS Delivery ≠ Human Receipt

Provider/network delivery confirmation SHALL NOT automatically mean:

```text id="b8b5hg"
recipient read or understood message
```

---

# 55. Push Notification

Browser/mobile push MAY be supported.

Web Push is standardised by RFC 8030, while RFC 8292 defines VAPID application-server identification and permits a push subscription to be restricted to an identified application server.

---

# 56. Push Subscription Security

Push subscription endpoints SHALL be treated as sensitive capability-like values.

They SHALL not be exposed publicly or used as canonical identity.

---

# 57. Push Payload Minimisation

Push payloads SHOULD minimise sensitive information.

Prefer:

```text id="ghmr9s"
Critical shipment exception.
Open Thamani.
```

over exposing:

```text id="c39vql"
customer

cargo

route

claim value

dangerous-goods classification
```

on a locked device screen.

---

# 58. Push Permission

Browser push permission SHALL be requested contextually.

Thamani SHOULD NOT immediately request notification permission from every anonymous visitor without clear value.

---

# 59. Webhooks

Authenticated business customers/partners MAY consume outbound webhooks for machine-to-machine communication.

Example uses:

```text id="knarcz"
shipment milestone

delivery

document availability

exception opened

claim status

provider assignment
```

subject to customer entitlement.

---

# 60. Webhook ≠ Domain Event Bus

The public/customer webhook boundary SHALL not expose internal event infrastructure indiscriminately.

It SHOULD publish:

```text id="7r3f73"
stable

documented

authorised

customer-safe
```

event contracts.

---

# 61. CloudEvents Alignment

Baobab Shared already uses CloudEvents 1.0 semantics for canonical events.

The CloudEvents project currently identifies **1.0.2** as its compatible 1.0 specification release.

Where practical, external webhook envelopes MAY reuse CloudEvents-compatible semantics while retaining a separately governed customer-facing contract.

---

# 62. Internal Event ≠ External Webhook Contract

This remains:

```text id="dylv9x"
canonical internal event
    !=
public webhook necessarily
```

An internal event may contain semantics unsuitable for direct external exposure.

---

# 63. Webhook Subscription

Conceptually:

```text id="s4e29d"
WebhookSubscription
├── subscription_id
├── organisation_ref
├── endpoint
├── allowed_event_types[]
├── scope
├── secret/key_ref
├── status
├── created_at
├── last_verified_at?
└── policy_ref
```

---

# 64. Webhook Security

Outbound webhooks SHOULD use:

```text id="ve36gm"
TLS

signed payload/request

timestamp

unique delivery ID

replay protection

secret/key rotation

endpoint verification
```

according to security architecture.

---

# 65. Webhook Endpoint Is Not Trusted Forever

An endpoint SHALL be:

```text id="jv13er"
verified

monitored

revocable
```

and SHOULD be suspended after repeated security/availability failures according to policy.

---

# 66. Webhook Delivery Semantics

The system SHALL distinguish:

```text id="xjlikn"
request sent

HTTP response received

consumer accepted transport-level request

consumer business workflow completed
```

The final state cannot generally be inferred from HTTP 2xx alone.

---

# 67. Webhook Idempotency

Every webhook delivery SHOULD have a stable delivery/event identifier so consumers can deduplicate retries.

---

# 68. Webhook Retry

Retries SHOULD use:

```text id="uxve1h"
bounded exponential backoff

jitter

maximum attempts

dead-letter / manual review
```

or equivalent resilient policy.

Retries SHALL not create new logical notifications.

---

# 69. Communication Providers

Channel transport MAY use third-party providers.

Examples:

```text id="5x7ej6"
email delivery provider

SMS aggregator

push service

messaging gateway
```

These are technical delivery providers.

They SHALL NOT become communication-domain authority.

---

# 70. Provider Abstraction

The intended architecture is:

```text id="ld3ely"
Communication Intent
       │
       ▼
Canonical Channel Adapter
       │
       ▼
Delivery Provider
```

not:

```text id="bqmjgs"
Business Workflow
       │
       ▼
Vendor SDK
```

---

# 71. No Vendor SDKs in Domain Logic

Business code SHALL NOT directly call:

```text id="ba0bgn"
twilio.send(...)

sendgrid.send(...)

providerX.push(...)
```

inside TMS, Claims, Trade Docs or commercial aggregates.

---

# 72. Channel Provider Failover

Technical delivery provider failover MAY occur:

```text id="mxb6rm"
SMS Provider A
    ↓
SMS Provider B
```

without changing:

```text id="qnpe9a"
CommunicationIntent

recipient

business meaning
```

---

# 73. Provider Failover Must Avoid Duplicate Messages

If provider outcome is unknown:

```text id="4hl351"
timeout
```

SHALL NOT immediately imply:

```text id="4vmq47"
definitely not delivered
```

Reconciliation/idempotency policy is required before failover.

---

# 74. DeliveryAttempt

Each channel attempt SHALL be independently recorded.

Conceptually:

```text id="8fmx02"
DeliveryAttempt
├── delivery_attempt_id
├── communication_intent_id
├── recipient_ref
├── endpoint_snapshot
├── channel
├── provider_ref
├── rendered_message_ref
├── idempotency_key
├── attempt_number
├── state
├── provider_message_ref?
├── submitted_at?
├── provider_accepted_at?
├── delivered_at?
├── failed_at?
├── failure_reason?
└── next_retry_at?
```

---

# 75. Delivery States

A canonical delivery-state vocabulary SHOULD distinguish:

```text id="x0e1pc"
PLANNED

QUEUED

DISPATCHING

PROVIDER_ACCEPTED

DELIVERED

FAILED

BOUNCED

REJECTED

EXPIRED

CANCELLED

UNKNOWN
```

as applicable.

---

# 76. Provider Accepted ≠ Delivered

This remains:

```text id="xj4xh2"
provider accepted API request
    !=
recipient channel accepted message
```

---

# 77. Delivered ≠ Read

This remains:

```text id="1n9nfg"
email server accepted
    !=
person read email
```

and:

```text id="n7s5wa"
push delivered
    !=
person saw notification
```

---

# 78. Read Tracking

Read/open tracking SHALL be:

```text id="jpb24u"
purpose-limited

privacy-aware

optional where appropriate
```

and SHALL NOT be treated as a reliable universal acknowledgement mechanism.

---

# 79. Acknowledgement

Where operationally material, Thamani SHALL use an explicit:

```text id="rhgfpl"
Acknowledgement
```

rather than infer acknowledgement from email opens.

---

# 80. Acknowledgement Model

Conceptually:

```text id="xxf1kr"
Acknowledgement
├── acknowledgement_id
├── communication_intent_id
├── recipient_ref
├── acknowledgement_type
├── acknowledged_at
├── actor_ref
├── channel/source
└── context
```

---

# 81. Acknowledgement Types

Possible semantics include:

```text id="qfjbc8"
RECEIVED

READ_AND_ACKNOWLEDGED

ACTION_ACCEPTED

ACTION_REJECTED

ESCALATION_ACKNOWLEDGED
```

Exact types SHALL match workflow requirements.

---

# 82. Acknowledgement ≠ Business Action Completion

This remains:

```text id="emftud"
"I acknowledge your Customs request"
    !=
required Customs information submitted
```

---

# 83. Reply

Inbound communication MAY include:

```text id="gt7bi6"
email reply

SMS reply

portal response

webhook callback
```

A reply SHALL be recorded as communication input.

---

# 84. Reply Does Not Mutate Domain State Automatically

This SHALL be prohibited:

```text id="3cvaxm"
Customer replies:
"approved"

    ↓

Quote magically approved
```

unless a separately authenticated, authorised and explicitly designed command protocol supports that action.

---

# 85. Free-Text Replies

A free-text reply SHOULD:

```text id="69vhzs"
join communication thread

create task

notify responsible operator

or trigger controlled interpretation
```

rather than directly execute high-impact business commands.

---

# 86. CommunicationThread

Where dialogue is required, Thamani MAY maintain:

```text id="qzhqaf"
CommunicationThread
├── thread_id
├── purpose
├── participant_refs[]
├── related_domain_refs[]
├── messages[]
├── status
└── visibility_policy
```

---

# 87. Thread ≠ Claims Case

A claim may have a communication thread.

The thread SHALL not replace:

```text id="ewpg0e"
ClaimCase
```

---

# 88. Thread ≠ Customs Case

Likewise:

```text id="ure5kf"
conversation about Customs case
    !=
CustomsCase
```

---

# 89. Message

Conceptually:

```text id="3ip5ay"
CommunicationMessage
├── message_id
├── communication_intent_id?
├── thread_id?
├── direction
├── sender_ref
├── recipient_refs[]
├── content_ref
├── rendered_content_snapshot?
├── channel
├── created_at
└── classification
```

---

# 90. Message Content

Message content SHOULD be generated from:

```text id="z41gqq"
source facts
+
approved template/version
+
locale
+
recipient context
```

rather than arbitrary domain-specific strings embedded throughout code.

---

# 91. CommunicationTemplate

Conceptually:

```text id="bzayx7"
CommunicationTemplate
├── template_id
├── purpose
├── communication_class
├── channel
├── locale
├── subject_template?
├── body_template
├── variable_contract
├── security_classification
├── effective_from
├── effective_to?
├── version
└── approval_state
```

---

# 92. Template Versioning

Messages with material operational/legal significance SHOULD record which template version produced them.

This supports later questions such as:

```text id="zfpixg"
What exactly did we tell the customer?
```

---

# 93. Template ≠ Rendered Message

This remains:

```text id="unj17x"
Template
    !=
actual content sent
```

The rendered message MAY contain:

```text id="3a0no6"
specific amount

shipment reference

deadline

customer name

action link
```

---

# 94. Rendered Snapshot

For materially significant communications, the exact rendered content SHOULD be retained according to policy.

Examples:

```text id="onacvx"
claim settlement offer

formal information request

permit expiry alert

high-value commercial approval request
```

---

# 95. CMS Boundary

Baobab CMS MAY support:

```text id="108ndg"
editorial copy

help content

general wording

branding content
```

but transactional communication templates SHALL require controlled versioning and release governance.

A CMS publication SHALL NOT silently change legal/operational message semantics in-flight.

---

# 96. Template Variables

Templates SHALL declare expected variables.

Example:

```text id="qajpca"
shipment_reference

new_eta

exception_reason

action_deadline

portal_link
```

Missing required variables SHOULD fail rendering rather than produce malformed communication.

---

# 97. No Sensitive Template Logging

Rendering/logging SHALL avoid leaking sensitive values into technical logs.

---

# 98. Localisation

Communication templates SHALL support:

```text id="fo7xq9"
language

locale

market-aware formatting

time zone

currency formatting
```

as applicable.

---

# 99. Language ≠ Market

This remains:

```text id="glsn1z"
language
    !=
market
```

A South African customer may prefer any supported language.

---

# 100. Locale Fallback

If requested locale is unavailable:

```text id="30egga"
recipient preference
    ↓
organisation default
    ↓
market default
    ↓
Thamani default
```

MAY be used according to policy.

Critical communication SHALL NOT disappear because a translation is unavailable.

---

# 101. Translation Integrity

For legally or operationally sensitive messages:

```text id="uv22en"
translation
```

SHOULD be governed.

AI-generated translations SHALL not automatically become authoritative legal text where certified/approved translation is required.

---

# 102. Quiet Hours

Preferences MAY include:

```text id="5x2h8k"
quiet hours
```

for non-critical communications.

---

# 103. Critical Override

Safety/security/regulatory communication MAY override quiet hours where policy requires.

That override SHALL be deliberate and auditable.

---

# 104. Recipient Time Zone

Scheduling SHALL use the recipient's applicable time zone where known.

A global:

```text id="xg8gfq"
send at 08:00
```

without zone is insufficient.

---

# 105. Scheduled Communication

Some communications MAY be scheduled:

```text id="bmy4wc"
quote expires tomorrow

permit expires in 7 days

insurance certificate expires in 30 days

claim response deadline approaching
```

---

# 106. Scheduled Reminder ≠ New Business Event

A reminder is derived communication activity.

It SHALL NOT invent:

```text id="xqfc8u"
quote-expired
```

before the actual domain state changes.

---

# 107. Communication Expiry

A message requiring action MAY become obsolete.

Example:

```text id="7vlisb"
Approve Provider A
```

SHALL expire if Provider A's assignment is cancelled.

---

# 108. Obsolete Action Notification

The Action Centre SHOULD show:

```text id="wj1i05"
No longer applicable
```

rather than allowing execution of a stale action.

---

# 109. Escalation

An `EscalationPolicy` SHALL define what happens when communication or required action does not receive the required response.

Conceptually:

```text id="1i7eyc"
EscalationPolicy
├── policy_id
├── trigger
├── acknowledgement_deadline?
├── action_deadline?
├── steps[]
├── maximum_escalation_level
├── business-hours policy?
├── terminal_action?
└── version
```

---

# 110. Escalation Step

A step MAY define:

```text id="4jdoet"
after 15 minutes
    → SMS same recipient

after 30 minutes
    → notify alternate operations contact

after 60 minutes
    → create critical operations exception

after 90 minutes
    → notify manager
```

according to policy.

---

# 111. Escalation ≠ Broadcast

Escalation SHALL expand communication deliberately.

It SHALL not indiscriminately:

```text id="v1pjq2"
email everyone in the company
```

---

# 112. Escalation Recipient

Recipients may be resolved by:

```text id="nh2lfr"
manager relationship

organisation role

operations on-call role

account owner

case owner

provider supervisor
```

instead of hard-coded addresses.

---

# 113. Escalation Stops

Escalation SHALL stop when its defined terminal condition occurs.

Examples:

```text id="bpvex5"
acknowledged

required action completed

source condition resolved

case cancelled

maximum level reached
```

---

# 114. Resolved Source Condition

If TMS resolves a delay before an escalation fires:

```text id="wnc13v"
scheduled escalation
```

SHOULD be cancelled where no longer relevant.

---

# 115. Communication Storm Prevention

The architecture SHALL include controls for:

```text id="dhgvxb"
deduplication

coalescing

rate limiting

cool-down periods

escalation caps

incident grouping
```

---

# 116. Example — Repeated Tracking Events

This is undesirable:

```text id="brbntx"
ETA changed by 1 minute
→ email

ETA changed by 1 minute
→ SMS

ETA changed by 1 minute
→ push
```

repeatedly.

Policy MAY coalesce minor changes.

---

# 117. Materiality

A communication rule MAY define:

```text id="id684v"
notify only if ETA shift > 30 minutes
```

or:

```text id="c5227x"
notify only when SLA at risk
```

where appropriate.

The threshold SHALL be policy, not hidden frontend logic.

---

# 118. Deduplication

Repeated consumption of the same canonical event SHALL not generate duplicate logical communications.

A stable key SHOULD incorporate:

```text id="i31w5d"
source event ID

communication purpose

recipient scope

policy version
```

as appropriate.

---

# 119. Retry ≠ New Intent

This remains:

```text id="d7r8dg"
delivery failed
    → retry DeliveryAttempt
```

not:

```text id="zplm12"
delivery failed
    → create a new customer alert every time
```

---

# 120. Event Replay Safety

Canonical event replay SHALL not flood recipients with historical notifications.

Consumers SHALL distinguish:

```text id="yu3kac"
live event processing
```

from:

```text id="d10j35"
replay / projection rebuild
```

where necessary.

---

# 121. Inbox / Idempotent Consumer

The communications consumer SHOULD persist consumed event IDs or equivalent deduplication state so repeated delivery of source events is safe.

---

# 122. Durable Delivery

Once a mandatory CommunicationIntent is committed, provider outages SHALL not cause the intent to disappear.

The system SHALL support:

```text id="du1h16"
durable queue/outbox

retry

dead-letter handling

reconciliation
```

---

# 123. Unknown Provider Outcome

A timeout SHALL produce:

```text id="40p1ch"
UNKNOWN
```

when outcome cannot be determined.

It SHALL not be converted immediately to:

```text id="x1z2yv"
FAILED
```

if the provider may have accepted the message.

---

# 124. Reconciliation

The communications layer SHOULD reconcile uncertain provider states where provider APIs support status lookup.

---

# 125. Dead Letter

Repeatedly undeliverable mandatory communication SHOULD produce an operational work item or exception.

It SHALL not disappear silently into a technical dead-letter queue.

---

# 126. Bounce Handling

Permanent email bounce SHOULD:

```text id="ec876k"
mark endpoint unhealthy

stop futile retry

trigger fallback channel where permitted

potentially request contact-data correction
```

---

# 127. Temporary Failure

A temporary provider/mailbox/network failure SHALL be distinguished from permanent invalidity.

---

# 128. Suppression

Communication MAY be suppressed because of:

```text id="kgzwyg"
user preference

legal marketing opt-out

duplicate/coalesced event

expired intent

invalid endpoint

recipient no longer authorised

source condition resolved

policy
```

The suppression reason SHALL be explicit.

---

# 129. Suppressed ≠ Delivered

This remains:

```text id="oxqpfo"
SUPPRESSED
    !=
SUCCESS
```

---

# 130. ConsentRecord

Where consent is legally relevant, Thamani SHOULD preserve or reference:

```text id="btjrrp"
ConsentRecord
├── data_subject/principal_ref
├── purpose
├── channel/scope
├── consent_state
├── captured_at
├── source
├── notice/version
├── withdrawn_at?
└── evidence_ref?
```

subject to platform/privacy architecture.

---

# 131. Consent Shall Be Purpose-Specific

This is prohibited:

```text id="ibft6v"
consented to email
    =
consented to everything forever
```

---

# 132. Marketing Opt-Out

A valid marketing opt-out SHALL be honoured across relevant marketing delivery providers and applications.

---

# 133. Operational Contact Cannot Be Silently Reused for Marketing

This remains:

```text id="1hi7l6"
phone number supplied for shipment coordination
    !=
automatic marketing consent
```

---

# 134. Contact Withdrawal vs Contractual Communication

If a person withdraws optional communication preference while a contractual logistics service remains active:

```text id="xr7rh8"
mandatory operational communication
```

may still need a valid authorised contact.

Thamani may need the customer organisation to nominate another contact.

---

# 135. Security Communications Boundary

IAM owns authentication/security mechanics such as:

```text id="6ec9wm"
verification

recovery

MFA challenge

passkey lifecycle

security event semantics
```

THA-0016 SHALL NOT independently generate security tokens.

---

# 136. IAM Security Message

A Thamani-branded email may be rendered/delivered through shared communication infrastructure if architecture permits.

But:

```text id="4esv0i"
password reset token

verification token

OAuth state

MFA challenge
```

remain IAM/provider authority.

---

# 137. Security Notifications May Bypass Ordinary Preference

Examples:

```text id="p8k69i"
password changed

new authenticator added

account recovery

suspicious login

privileged role change
```

MAY be mandatory according to IAM security policy.

---

# 138. High-Risk Links

Sensitive actions SHOULD generally lead users to an authenticated Thamani experience.

Example:

```text id="ac1h3z"
Email:
"Your settlement offer is ready"

        ↓

Sign in to Thamani
        ↓

step-up if required
        ↓

Review and accept
```

---

# 139. Bearer Links

Long-lived bearer URLs granting privileged access SHOULD be avoided.

Where secure magic/action links are intentionally used, they SHALL be:

```text id="zwpo2x"
purpose-bound

short-lived

single-use where appropriate

auditable

revocable
```

and governed by IAM/security architecture.

---

# 140. Attachments

Sensitive documents SHOULD generally be accessed through authenticated Trade Docs/Thamani routes rather than broadly attached to messages.

---

# 141. Attachment ≠ Document Authority

If an invoice PDF is attached to email:

```text id="nsby81"
email attachment
```

is still only a representation of the ERP/Trade Docs document.

The email does not become document authority.

---

# 142. Links to Documents

Document links SHALL enforce current authorisation when accessed.

Possession of an emailed URL SHALL not automatically grant indefinite document access.

---

# 143. Claims Communications

THA-0015 communication examples include:

```text id="0itpng"
Claim received

Evidence required

Survey scheduled

Liability response

Settlement proposed

Claim closed
```

THA-0016 governs delivery.

THA-0015 governs claim meaning/state.

---

# 144. Claims Communication ≠ Claim Decision

This remains:

```text id="l3ta5b"
settlement email sent
    !=
settlement accepted
```

---

# 145. Financial Communications

ERP may emit authoritative facts such as:

```text id="jch38m"
invoice posted

payment received

credit issued
```

Thamani MAY produce customer communication.

It SHALL not generate competing financial truth.

---

# 146. Invoice Notice ≠ Invoice

This remains:

```text id="uq3pvy"
"Your invoice is ready"
    !=
Invoice
```

---

# 147. Regulatory Communications

Regulations MAY produce:

```text id="wedvmc"
requirement/decision
```

which causes Thamani to communicate.

The communication SHALL not masquerade as the regulator's own notice unless it actually is one.

---

# 148. External Authority Message

Where Trade Docs receives an actual:

```text id="a8ky54"
Customs authority message
```

Thamani MAY present or summarise it.

The UI/message SHALL preserve distinction between:

```text id="iyb5uc"
Authority says X
```

and:

```text id="eqf1f0"
Thamani explains X
```

---

# 149. Provider Communications

THA-0013 may require communication for:

```text id="mb1fr6"
RFQ opportunity

provider selection

assignment

booking request

exception

performance review

qualification expiry
```

Recipient scope SHALL follow the actual provider relationship.

---

# 150. Provider A Must Not See Provider B

A notification SHALL never leak:

```text id="6m0mo2"
Provider B rate

Provider B selection status

customer margin

other provider performance
```

to Provider A without explicit policy.

---

# 151. Internal Operations Communications

Staff communications MAY include:

```text id="he5a0t"
exception assignment

escalation

incident alert

provider failure

claim task

project blocker

Customs hold

special-cargo alert
```

---

# 152. Internal Notification ≠ Customer Notification

The communication policy SHALL intentionally determine:

```text id="9u47qc"
who internally knows
```

and separately:

```text id="mipcp7"
what the customer is told
```

---

# 153. Customer Notification Timing

Some exceptions require:

```text id="yyanyh"
immediate customer alert
```

while others require:

```text id="w8rqdv"
internal investigation first
```

Policy SHALL define this deliberately.

---

# 154. Accuracy Before Automation

This SHALL be preferred:

```text id="77zwgn"
verified meaningful update
```

over:

```text id="kwij8a"
instant but misleading notification
```

where the source fact is uncertain.

---

# 155. Communication Freshness

A delayed notification SHOULD preserve the source fact's time.

Example:

```text id="ewcxkv"
Delay occurred:
14:02

Notification delivered:
14:09
```

---

# 156. Communication Time ≠ Event Time

This remains:

```text id="p2kjql"
notification sent at 14:09
    !=
event occurred at 14:09
```

---

# 157. Communication History

Users MAY see a history such as:

```text id="zcq9gf"
14:05 — Shipment delayed

14:20 — Revised ETA received

15:10 — Customs information requested

15:40 — Document uploaded
```

The communication history SHALL not replace the operational timeline.

---

# 158. Audit

Material communication actions SHALL be auditable.

At minimum:

```text id="0qxkiu"
intent created

recipient resolved

policy evaluated

message rendered

delivery attempted

provider accepted

delivery failed/bounced

preference applied

message suppressed

acknowledged

escalated

reply received

manual resend

manual recipient change
```

---

# 159. Audit ≠ Content Retention

An audit entry may need long retention.

Full message content may require a different privacy/retention period.

These policies SHALL be separable.

---

# 160. Retention

Communication retention SHALL consider:

```text id="bmj25m"
communication class

customer contract

legal requirement

privacy requirement

claim relevance

security relevance

financial relevance

jurisdiction
```

---

# 161. Marketing Data Minimisation

Marketing systems SHALL not receive:

```text id="um70n9"
shipment details

claims information

Customs data

provider confidential data
```

merely because the same person is a marketing contact.

---

# 162. Sensitive Operational Data

Communications MAY contain personal or commercially sensitive information.

Data minimisation SHALL apply by channel.

---

# 163. Channel Classification

Policy SHOULD recognise that channels have different disclosure risk.

For example:

```text id="5ch2uf"
in-app authenticated view
    higher detail

email
    moderate detail

SMS / push lock screen
    minimal detail
```

subject to security policy.

---

# 164. Multi-Tenancy

All communication configuration, intents, preferences, subscriptions and delivery history SHALL remain correctly isolated by:

```text id="c502z7"
tenant

legal entity

organisation relationship

resource scope
```

---

# 165. Cross-Customer Leakage Is Critical

This SHALL be tested explicitly:

```text id="frn2q9"
Customer A's notification
    must never resolve
Customer B recipient
```

---

# 166. Provider Isolation

Likewise:

```text id="hbr1pn"
Provider A
    must not receive
Provider B assignment communication
```

---

# 167. Observability

Technical communication observability SHOULD capture:

```text id="at6spg"
queue depth

send latency

provider latency

success/failure

bounce rate

retry volume

provider health

dead-letter volume

escalation volume
```

without logging unnecessary message content.

---

# 168. Business Metrics

Thamani MAY measure:

```text id="xa6l27"
time from domain event to communication

acknowledgement rate

action completion after notification

critical escalation rate

communication failure by channel

invalid contact rate

opt-out rate

webhook success rate
```

---

# 169. Delivery Metrics ≠ Business Success

This remains:

```text id="nc457n"
99.9% email delivery
    !=
99.9% logistics service success
```

---

# 170. Provider Health

A communications provider may become:

```text id="a63o6y"
HEALTHY

DEGRADED

UNAVAILABLE
```

through technical health policy.

This is unrelated to logistics provider qualification.

---

# 171. No Dedicated Baobab Communications Engine Yet

This ADR SHALL **not** immediately create:

```text id="0kpu9g"
baobab-communications
```

or:

```text id="uk4nt6"
baobab-notifications
```

as a new platform engine.

Initially, Thamani MAY implement the communication orchestration boundary within its application architecture behind clear ports/interfaces.

---

# 172. Why Not Extract Immediately

At present the confirmed requirement is:

```text id="1m8n13"
Thamani Digital Estate
```

and its customer/partner/operations workflows.

A reusable platform engine SHOULD be extracted only when:

```text id="7lf91x"
multiple Digital Estates
need the same capability

provider abstraction becomes broadly reusable

preferences/consent model stabilises

canonical contracts stabilise

operational ownership becomes clear
```

---

# 173. Extraction Seam

Even while local to Thamani, implementation SHALL preserve an extraction seam:

```text id="a0iiuq"
Thamani Domain
      │
      ▼
Communication Port
      │
      ▼
Communication Orchestrator
      │
      ├── Email Adapter
      ├── SMS Adapter
      ├── Push Adapter
      └── Webhook Adapter
```

---

# 174. No Domain-to-Vendor Coupling

This extraction seam SHALL exist from the start.

---

# 175. Future Shared Capability

If communication becomes a reusable Baobab capability, exact capability keys MUST be registered through Shared governance.

Potential conceptual capability:

```text id="r2b39d"
communications.notification.deliver
```

is illustrative only.

This ADR SHALL not mint the canonical namespace/key.

---

# 176. Event Context

Similarly, Thamani SHALL not unilaterally register:

```text id="x821dp"
communications.*
```

canonical platform events.

If reusable communication facts later need canonical publication, Shared ADR/event governance SHALL decide.

---

# 177. Internal Communication Events

Thamani MAY use internal application events such as:

```text id="wr6r9v"
communication.intent-created

delivery.failed

communication.acknowledged
```

provided they are not falsely published as canonical Baobab events without Shared registration.

---

# 178. API Surfaces

Conceptual private application surfaces MAY include:

```text id="mzpgml"
/notifications

/notifications/preferences

/actions

/communication-threads

/webhook-subscriptions
```

Exact API design remains implementation-specific.

---

# 179. Public Unsubscribe Surface

Marketing opt-out MAY require an unauthenticated secure route where legally appropriate.

Such routes SHALL be:

```text id="p2nl86"
purpose-specific

privacy-safe

tamper-resistant

non-enumerable
```

---

# 180. Notification API ≠ Provider API

The frontend SHALL interact with Thamani's application contract.

It SHALL not call SMS/email providers directly.

---

# 181. Action Centre Integration

THA-0014's Action Centre SHALL be driven by:

```text id="l9tavb"
domain action requirement
+
recipient/authorisation
+
communication/action projection
```

---

# 182. ActionItem

Conceptually:

```text id="g72c91"
ActionItem
├── action_item_id
├── source_domain
├── source_resource_ref
├── action_type
├── actor_scope
├── due_at?
├── priority
├── status
└── deep_link
```

This is an experience/orchestration projection.

---

# 183. ActionItem ≠ Domain Task Authority

If the underlying requirement is removed:

```text id="vknjd8"
ActionItem
```

SHALL update/close accordingly.

---

# 184. Communication Policy

Rules SHOULD be expressed as governed policy.

Example:

```text id="1r5fux"
WHEN:
    logistics shipment ETA shifts > 2 hours

AND:
    customer-facing delivery SLA affected

THEN:
    create OPERATIONAL/HIGH communication

TO:
    customer shipment contacts

CHANNEL:
    in-app + email

IF:
    no acknowledgement within 60 min
AND:
    customer action required

THEN:
    SMS fallback
```

---

# 185. Policy Versioning

Communication rules SHALL be versioned where materially significant.

Historical message generation SHOULD remain explainable.

---

# 186. Policy Change Does Not Rewrite History

Changing tomorrow's policy SHALL NOT make yesterday's communication retrospectively:

```text id="63aeqj"
wrongly sent

or
never sent
```

in historical records.

---

# 187. Human-Initiated Communication

Staff MAY initiate messages manually from authorised workflows.

Manual communication SHALL still pass:

```text id="gkrwcf"
authorisation

recipient scope

data classification

channel policy

audit
```

---

# 188. Manual Send Is Not Policy Bypass

This SHALL be prohibited:

```text id="t64eqt"
operator manually types customer phone
and bypasses privacy/role controls
```

for governed communication.

---

# 189. Ad Hoc Communication

Where legitimate ad hoc communication is required, it SHOULD still attach to:

```text id="luswyt"
customer

shipment

claim

project

provider

case
```

for context/audit.

---

# 190. Emergency Communication

Safety-critical incidents may require communication even when normal infrastructure is degraded.

The architecture SHOULD permit:

```text id="93azq1"
alternate provider

alternate channel

manual emergency workflow
```

subject to security and policy.

---

# 191. Emergency Fallback

An emergency manual phone call MAY be necessary.

The system SHOULD allow staff to record:

```text id="xkl00y"
who called

whom

when

purpose

outcome
```

without pretending the telephony system automatically captured it.

---

# 192. Phone Calls

Voice calls MAY be part of escalation.

They SHALL remain a communication channel/outcome, not automatic domain mutation.

---

# 193. Critical Incident Example

```text id="ywjnh0"
TMS / Telemetry
    │
    ▼
Dangerous-goods / safety incident
    │
    ▼
Communication Intent
    class = SAFETY_CRITICAL
    urgency = CRITICAL
    │
    ├── In-app
    ├── SMS
    ├── Push
    └── Operations escalation
    │
    ▼
Acknowledgement required
    │
    ├── received
    │     → stop recipient escalation
    │
    └── timeout
          → supervisor / alternate contact
```

---

# 194. Customs Example

```text id="ou4loe"
Trade Docs:
INFORMATION_REQUIRED
      │
      ▼
Thamani:
CommunicationIntent
      │
      ▼
Customer Customs Contact
      │
      ├── in-app action
      └── email
      │
      ▼
Customer uploads information
      │
      ▼
Trade Docs evaluates requirement
```

The email itself SHALL not mark the requirement complete.

---

# 195. Provider Assignment Example

```text id="i2c2yd"
THA-0013
ProviderAssignment created
      │
      ▼
Partner communication
      │
      ├── portal
      └── email
      │
      ▼
Provider opens assignment
      │
      ▼
Provider explicitly ACCEPTS
      │
      ▼
ProviderAssignment state changes
```

Opening the email is not acceptance.

---

# 196. Claim Example

```text id="8c9e1j"
THA-0015:
ClaimCase opened
      │
      ▼
Claim acknowledgement intent
      │
      ▼
Customer email + in-app
```

Later:

```text id="bcs2vz"
Claims:
EVIDENCE_REQUIRED
      │
      ▼
Action Centre item
      │
      ▼
Customer submits evidence
      │
      ▼
Claims domain validates
```

---

# 197. Quote Example

```text id="lyefco"
THA-0006:
Quote issued
      │
      ▼
Communication:
Quote available
Expires 14 October
      │
      ▼
Customer signs in
      │
      ▼
Reviews quote
      │
      ▼
Explicitly accepts
```

Email click alone SHALL not bind the commercial agreement.

---

# 198. Invoice Example

```text id="bhdmns"
ERP:
Invoice posted
      │
      ▼
Communication:
Invoice available
      │
      ▼
Customer Portal
      │
      ▼
ERP-backed invoice view
```

---

# 199. Webhook Example

```text id="e2shfm"
TMS:
delivery completed
      │
      ▼
Thamani external event policy
      │
      ▼
Customer webhook subscription
      │
      ▼
Signed webhook delivery
      │
      ▼
HTTP 200
```

The HTTP 200 proves:

```text id="7ddpqu"
endpoint accepted request
```

not:

```text id="j7a8hg"
customer ERP completed downstream processing
```

unless a separate acknowledgement protocol exists.

---

# 200. Implementation Gates

## THA-COM-00 — Current-State Audit

Audit:

```text id="fcl1sa"
Thamani

IAM

Shared events

Control Plane

TMS

Trade Docs

ERP

CMS

existing email/SMS integrations
```

for communication assumptions.

---

## THA-COM-01 — Communication Taxonomy

Implement:

```text id="yhdn6e"
CommunicationIntent

CommunicationClass

Urgency

MandatoryPolicy

RecipientSpecification
```

---

## THA-COM-02 — Recipient Resolution

Implement:

```text id="41q8bn"
principal

organisation

role

relationship

endpoint resolution
```

without duplicate identity masters.

---

## THA-COM-03 — Preference / Consent Model

Implement:

```text id="52pd0p"
channel preference

category preference

quiet hours

marketing consent/opt-out references

mandatory-policy handling
```

---

## THA-COM-04 — Template Registry

Implement:

```text id="4hu1lg"
versioned templates

locale

variable contracts

classification

approval state
```

---

## THA-COM-05 — In-App Notification Foundation

Implement authenticated:

```text id="gpmhfn"
notification centre

read/unread

source links

freshness
```

---

## THA-COM-06 — Action Centre

Implement THA-0014 action projections with explicit domain ownership.

---

## THA-COM-07 — Email Adapter

Implement provider-neutral email delivery with:

```text id="vb3ggo"
SPF

DKIM

DMARC

bounce handling

delivery reconciliation
```

appropriate to production infrastructure.

---

## THA-COM-08 — SMS Adapter

Implement:

```text id="91xbsh"
provider abstraction

minimal payload

delivery state

fallback
```

---

## THA-COM-09 — Push Adapter

Implement Web Push where product demand justifies it, using proper subscription/security handling.

---

## THA-COM-10 — Webhook Delivery

Implement:

```text id="ldpjhh"
subscriptions

event filtering

signed requests

idempotency

retry

replay protection
```

---

## THA-COM-11 — Durable Delivery

Implement:

```text id="djv581"
queue/outbox

idempotent consumer

retry

dead letter

reconciliation
```

---

## THA-COM-12 — Escalation

Implement:

```text id="4t7b7s"
acknowledgement deadlines

fallback channel

alternate recipient

operations escalation
```

---

## THA-COM-13 — Communication Threads / Replies

Implement controlled inbound replies where workflows require dialogue.

---

## THA-COM-14 — Domain Integration

Reference slices SHOULD include:

```text id="zlgjoj"
TMS delay

Trade Docs information request

Provider assignment

Quote issued

ERP invoice

Claim evidence request
```

---

## THA-COM-15 — Privacy / Marketing Compliance

Verify:

```text id="j7e5i1"
purpose separation

consent

opt-out

contact provenance

data minimisation

retention
```

for initial markets.

---

## THA-COM-16 — Security Hardening

Verify:

```text id="2g2eqd"
cross-tenant isolation

endpoint verification

signed webhooks

link security

attachment security

provider credentials

PII logging

rate limits

abuse prevention
```

---

## THA-COM-17 — Reliability Hardening

Test:

```text id="9vl3pp"
provider timeout

provider accepted but response lost

duplicate events

event replay

bounce

invalid number

provider outage

channel failover

network outage

stale escalation

high-volume incident
```

---

## THA-COM-18 — Production Readiness

Verify:

```text id="71qyfl"
deliverability

observability

suppression

preferences

mandatory alerts

marketing compliance

templates

audit

localisation

reconciliation

disaster recovery
```

---

# 201. Alternatives Considered

## Alternative A — Each Domain Sends Its Own Emails

**Rejected.**

It duplicates recipient, privacy, delivery, template and retry policy.

---

## Alternative B — Send Notifications Directly From Event Producers

**Rejected as the default.**

Source domains should publish business facts, not know Digital Estate communication policy.

---

## Alternative C — Encode Notification Commands as Canonical Events

**Rejected.**

Canonical events state business facts rather than target-consumer commands.

---

## Alternative D — Use Email as the Workflow State

**Rejected.**

Message delivery is not domain-state authority.

---

## Alternative E — Treat Email Open as Acknowledgement

**Rejected.**

Open tracking is unreliable and privacy-sensitive.

---

## Alternative F — Treat Provider HTTP Success as End-User Delivery

**Rejected.**

Provider acceptance and recipient delivery are different states.

---

## Alternative G — One Global Notification Preference

**Rejected.**

Preferences differ by purpose/channel/urgency.

---

## Alternative H — Let Users Disable Every Message

**Rejected.**

Some contractual, security, safety or regulatory communications may be mandatory.

---

## Alternative I — Mandatory Means Send Every Channel

**Rejected.**

Mandatory communication still requires sensible delivery policy.

---

## Alternative J — Put Marketing Into Transactional Messages

**Rejected.**

Marketing requires separate purpose/consent governance.

---

## Alternative K — Store Email Address as Recipient Identity

**Rejected.**

Recipient identity and communication endpoint are distinct.

---

## Alternative L — Attach Sensitive Documents to Every Email

**Rejected.**

Authenticated access is generally safer and preserves current authorisation.

---

## Alternative M — Replies Directly Execute Business Commands

**Rejected by default.**

Free-text communication is not an authenticated domain command.

---

## Alternative N — Create `baobab-notifications` Immediately

**Rejected at this stage.**

Reusable platform demand has not yet been established sufficiently.

---

## Alternative O — Hard-Code One Delivery Vendor

**Rejected.**

Channel/provider portability and resilience are required.

---

# 202. Architectural Invariants

```text id="wjj1da"
Domain Event
    != Notification

Notification
    != Business Fact

CommunicationIntent
    != DeliveryAttempt

Recipient
    != Endpoint

Template
    != Rendered Message

Message
    != TradeDocument

Delivery Provider
    != Communication Authority

Provider Accepted
    != Delivered

Delivered
    != Read

Read
    != Acknowledged

Acknowledged
    != Action Completed

Reply
    != Domain Command

Notification Preference
    != Legal Consent

Consent
    must be purpose-aware

Operational Communication
    != Direct Marketing

Security Communication
    != Marketing

Marketing consent
    must not be inferred from logistics relationship automatically

Mandatory
    != Broadcast Every Channel

Quiet Hours
    may be overridden only by governed policy

Domain replay
    must not cause notification storms

Retry
    != New CommunicationIntent

Provider failover
    must not duplicate delivery blindly

TMS
    must not know who Thamani emails

Trade Docs
    must not send customer SMS directly by default

ERP
    must not own Thamani notification policy

CMS
    must not silently alter transactional semantics

IAM
    owns security tokens

Thamani communications
    does not mint recovery/MFA tokens

Action Centre
    != Domain Task Authority

Public URL possession
    != Authorisation

Attachment
    != Canonical Document

Webhook 2xx
    != Downstream Business Completion

Webhook
    != Internal Event Bus

No response
    != Recipient refusal

No delivery receipt
    != Definitely undelivered

UNKNOWN
    must remain UNKNOWN

Historical rendered content
    must remain explainable where material

Cross-tenant communication leakage
    is prohibited

Provider A
    must not receive Provider B information
```

---

# 203. Final Architecture

```text id="oucknp"
                     AUTHORITATIVE DOMAINS
                              │
     ┌───────────┬────────────┼────────────┬───────────┐
     ▼           ▼            ▼            ▼           ▼
    TMS      TRADE DOCS      ERP      REGULATIONS    THAMANI
     │           │            │            │           │
     └───────────┴────────────┼────────────┴───────────┘
                              ▼
                     CANONICAL BUSINESS EVENT
                              │
                              ▼
                    COMMUNICATION POLICY
                              │
                              ▼
                    COMMUNICATION INTENT
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
          RECIPIENT        PREFERENCE       CONTENT
          RESOLUTION       / CONSENT        / TEMPLATE
              │               │               │
              └───────────────┼───────────────┘
                              ▼
                        DELIVERY PLAN
                              │
      ┌──────────┬────────────┼───────────┬───────────┐
      ▼          ▼            ▼           ▼           ▼
   IN-APP      EMAIL         SMS         PUSH       WEBHOOK
      │          │            │           │           │
      └──────────┴────────────┼───────────┴───────────┘
                              ▼
                       DELIVERY STATE
                              │
                      ┌───────┴────────┐
                      ▼                ▼
               ACK / REPLY        NO RESPONSE
                      │                │
                      ▼                ▼
                DOMAIN ACTION      ESCALATION
                      │                │
                      └───────┬────────┘
                              ▼
                       SOURCE WORKFLOW
```

---

# 204. Final Decision

Thamani SHALL establish a unified communications architecture that converts authoritative business events and authorised workflow actions into secure, recipient-aware, purpose-aware and channel-appropriate communications.

Thamani SHALL own:

```text id="7y4if5"
CommunicationIntent

communication classification

recipient policy

communication preferences

customer/partner communication policy

templates

channel planning

in-app notifications

Action Centre projection

delivery orchestration

delivery history

acknowledgement

communication escalation

communication threads

external webhook subscriptions
```

Canonical source domains SHALL continue to own:

```text id="fjlol8"
the business facts being communicated
```

IAM SHALL continue to own:

```text id="i87flg"
authentication

security tokens

recovery mechanics

MFA / verification mechanics
```

Control Plane SHALL continue to own:

```text id="ni7trg"
canonical organisations

platform context

capability resolution
```

and external communication providers SHALL remain merely:

```text id="30gzdb"
technical delivery providers
```

rather than business authorities.

The defining event principle is:

> **Domain systems shall publish what happened; Thamani communication policy shall decide whether, how and to whom that fact should be communicated.**

The defining recipient principle is:

> **A recipient is a person or organisation in a governed business relationship; an email address, telephone number, push subscription or webhook endpoint is only a delivery endpoint.**

The defining delivery principle is:

> **Provider acceptance, channel delivery, human reading, acknowledgement and business-action completion are distinct states and shall never be conflated.**

The defining escalation principle is:

> **Escalation shall progressively seek the required response through governed recipients and channels rather than amplify uncontrolled notification noise.**

The defining privacy principle is:

> **Operational authority to contact somebody shall not silently become permission to market to them; communication purpose, consent and preference must remain distinct.**

The defining security principle is:

> **Sensitive communications shall reveal only what the chosen channel requires, with privileged actions completed through authenticated and authorised Thamani workflows rather than through insecure message content.**

The defining reliability principle is:

> **A committed mandatory communication shall survive delivery-provider failure through durable queues, idempotency, reconciliation, retries and governed fallback without creating duplicate logical messages.**

The defining platform principle is:

> **Thamani shall build the communication boundary behind provider-neutral interfaces now, but shall not create a new Baobab communications engine until cross-estate reuse and stable platform contracts justify extraction.**

And the defining human-experience principle is:

> **The customer, partner or operator should receive the right information, through the right channel, at the right time, with a clear next action—without needing to know which Baobab engine produced the underlying fact.**