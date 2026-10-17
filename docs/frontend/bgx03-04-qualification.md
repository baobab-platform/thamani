# BGX-03 / BGX-04 — real-service qualification prerequisites

**Status:** Synthetic source preflight only. Not a deployed BFF, live TMS,
production customer route, tracking capability or protected staging receipt.
**Governed by:** ADR-SHARED-040, ADR-THA-0009/-0014/-0017, Accepted
ADR-TMS-0001/-0002 and Nabhold Go-Live v2.0 autonomy/tenant rules.

## Engineering increment

`src/lib/logistics/bgx03-admission.ts` is a server-side admission seam to
check independent, *trusted* IAM authentication, current CP tenant/Organisation
and canonical capability authority, and TMS's **object-level** shipment decision
before a protected BFF releases any shipment evidence.

A browser-supplied shipment reference is only a lookup key. The seam neither
verifies its own JWT nor creates permissions. Authorised transports are still
responsible for endpoint authentication, current binding resolution, native
policy enforcement, provider trust, revocation and rate/response limits. Do
not wire test receipts or fixture capability names into a runtime route.

The accepted TMS 0001/0002 engine remains Foundation-0 in source. Tracking
ADR-TMS-0007 and ETA/optimisation ADR-TMS-0016/0019 are **Proposed**, so no
tracking capability, provider publication or transport truth is asserted.

## Acceptance matrix

| Case | Synthetic source preflight | Required real service acceptance |
|---|---|---|
| Valid IAM + CP + TMS | Three concordant, unexpired synthetic receipts | IAM issuer/signature/audience/assurance and live CP binding + native TMS object PEP |
| Wrong audience | Denied | IAM token issued for another audience denied at actual BFF |
| Revocation/expiry | Denied for absent/expired receipt | Current CP entitlement revocation and expiry fail without frontend redeploy |
| Cross-tenant and Organisation | Denied for mismatching IDs | Real independent tenants with object isolation at TMS query and cache boundary |
| Provider unavailable | Denied on exception/absence | Authenticated real transport error, no fallback to direct provider |
| Evidence freshness | Strict source timestamp accepted, bad calendar denied | Last observed vs estimated; source, model, scope, accuracy, and retention qualified |
| Geospatial overlays | Text-first source model in Shared BGX-02 | Published deck.gl package + real MapLibre/browser/axe/keyboard/CSP and tenant-safe tile policy |
| Protected staging | Not exercised | Credible AWS account/IAM roles, secrets custody, cross-region/legal review, active provider |

The test suite deliberately labels its `synthetic.capability.not-canonical`
placeholder. **No new canonical logistics capability key is registered.**

## Next runtime sequence

1. TMS architecture and transport tracking contracts accepted and implemented.
2. Shared canonical capability contract and CP provider registration/binding
   qualified; IAM protected principal and confidential session established.
3. Implement authenticated Thamani BFF adapters behind the admission seam,
   including short-lived, redacted projection receipts and no browser engine URLs.
4. Exercise real IAM → CP → TMS with granted, denied, revoked, expired,
   cross-tenant and provider-unavailable scenarios in Infrastructure INT lanes.
5. Consume verified, immutable Shared MapLibre/deck.gl packages only in a
   consented client entry; test laptop/mobile WebGL-failure text equivalents.
6. Obtain BGX-04 real staging/account, provider certification, legal location
   basis, licence, egress/CSP, privacy and independent go-live sign-off.

An accepted frontend ADR or a green synthetic CI pipeline is not any of these
later acceptance decisions.
