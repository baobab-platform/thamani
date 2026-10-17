# Thamani Base UI Logistics Experience Foundation

**ADR-SHARED-040 §2.4 (Accepted)** / ADR-THA-0014 (Accepted). Initial incremental source, not publicly deployed.

New, private-source LogisticsViewTabs is a Base UI Tabs presentation primitive
for Tracking, Route and Documents sections. Its three sections take pre-authorised
React views; no synthetic shipment is represented as actual, no current ETA is
calculated, and no raw GPS/route or Trade Docs contents are fetched by this
component. This component is intentionally not added to the obsolete retail
homepage or exposed as an unauthenticated preview route.

The legacy storefront is still pending logistics-native replacement under
ADR-THA-0014. Later gated work must integrate controlled customer/partner and
operations experiences through the Thamani BFF, CP, IAM, TMS, Regulations and
Trade Docs; real-service synthetic tests precede protected staging.

Next: approved logistics theme, role-specific information architecture, MapLibre
adapter, verified tracking timeline and non-map alternative. Each needs
keyboard/axe/visual acceptance, provenance, permissions and real provider evidence.
Node 24 and PostgreSQL 17 when a backend needs it remain baobab-dev standards.
