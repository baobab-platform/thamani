# Thamani Global — IAM-N07 B2B confidential identity and CP integration

**31 October 2026 — DRAFT / SOURCE IMPLEMENTED / CONNECTED ACCEPTANCE HELD**

Governing EA v2.3, EA-DEV DEV-03/04/07/08/11/14, EA-XB v1.1,
IAM ADR-IAM-0023/0024/0025/0033, Shared ADR-SHARED-042/043,
and Thamani ADR-THA-0018 remain controlling. The legacy Medusa B2C
storefront cannot mint, inherit, or exercise a logistics buyer mandate.
A synthetic booking, quote, transport plan or checkout is never a
genuine TMS/ERP/Trade Docs commitment.

## Installed estate-owned components

- `/sign-in` is first-party and noindex, disabled unless the
  deployment explicitly enables `THAMANI_OIDC_ENABLED=true`.
  The HTML form POST initiates OIDC code/PKCE login; no browser
  script supplies OAuth audience, client secret, issuer or Tenant.
- `POST /api/auth/login`, `GET /api/auth/callback`,
  `GET /api/auth/session`, `POST /api/auth/logout` and
  `GET /api/auth/context` are Node-only dynamic routes.
  Callback consumes state exactly once, performs signed ID-token
  validation, checks active issuer token and current CP Principal,
  then establishes a short-lived encrypted server-side session.
  Only a 32-byte random opaque `__Host-` session handle is in
  the browser cookie. No localStorage/Medusa token fallback.
- Redis backend: real verified TLS, bounded no-retry single
  transactions, GETDEL-once browser binding, authenticated encryption
  of each retained session, absolute TTL, key rotation and epoch
  invalidation; no in-process fallback if unavailable.
  Operator must provision an ACL limited to `thamani:bff:v1:<epoch>:*`.
- `GET /api/auth/session` rechecks current Hydra introspection,
  exact OAuth client/audience, and CP `authority:self` Principal
  resolution. It returns the token-free principal identifier and
  CSRF only for the signed-in browser; no grants or business
  permission. Stale, unknown, revoked or cross-issuer status denies.
- `GET /api/auth/context` reads current CP human
  `/v1/admin/effective-authority`, canonical Organisation overview
  and Tenant/Market resources. Its exact server-selected
  Organisation/Tenant/Market and current `organisation.view`,
  `tenant.view`, `market.view` grants must match on both sides of
  the bounded CP read. Missing, expired, foreign, stale or changed
  authority denies. Output is `LOGISTICS_NAVIGATION` with
  `executionAuthority:false`. It is **not** a workload
  PlatformContext, buyer commitment, TMS reservation, freight
  booking, invoice posting or transport provider authorization.
- `POST /api/auth/logout` requires a current browser-bound
  session and constant-time CSRF verification; it revokes local
  server-held custody, but does NOT claim Kratos/Hydra/Keycloak
  issuer-wide SLO, revocation of other browsers, or any A3/A4
  assurance.

Everything remains independently disabled until actual owners
provision the required first-party HTTPS ingress, OIDC client,
Kratos/Hydra user, CP synthetic Principal, reviewed client scopes,
one canonical Organisation and active Tenant/Market grants, private
TLS Redis credentials, and separate CP authorization. This PR does
**not** create them.

## Configuration authority

All `THAMANI_OIDC_*`, `THAMANI_BFF_*` and
`THAMANI_LOGISTICS_*` variables are shown in
`.env.example`, with provider access and store disabled.
They must be supplied only by Infrastructure's private
development lease, not a GitHub PR or browser form.

This BFF's exact *human* token audience is
`baobab-control-plane`, with OIDC `openid` and CP
`authority:self` as required by the existing Nabhold
integration pattern. A separate **workload** client and
resource-side native TMS/Trade Docs binding are necessary
before any logistics command. Do not recycle this human
session, its OIDC client or its bearer as a server-to-server
resource administrator credential.

Per ADR-THA-0018, independent customer organisations are
not automatically subsidiaries, tenants or approved buyers.
The deployment's CP read model selects only a pre-configured
Organisation/Tenant/Market; a future multi-customer selector
must use a new explicit per-actor CP-granted scope decision,
not `organisationId`/Tenant/Market passed by a browser.

## Tests and real execution

The initial source and unit suites under
`src/lib/auth/{oidc,store,authorisation}/*.test.ts` use
actual maintained OIDC verifier code with signed synthetic
JWT/JWKS, a deterministic Redis transport double and exact
CP HTTP fixtures. They exercise invalid issuer/audience,
signature, replay, expired grants, foreign Tenant, wrong
organisation, stale current state, cross-replica logout
custody and no-approval claims. They are not a live connected
Hydra/Kratos/CP/TMS runtime.

Owner-supervised *development* acceptance, with source-pinned
synthetic principals and **real** disposable services, requires:

1. Existing IAM-N02 real browser 7 cases and Infrastructure
   DEV-04 INT-03C seven cases in one immutable-source run,
   including real recovery, enrolled AAL2, issuer and CP
   withdrawal, and independent teardown.
2. Thamani's first-party UI real Chromium login and logout
   with real Kratos UI / Hydra code+PKCE and real CP
   Principal, plus current denied foreign Tenant/Organisation
   readbacks and correct Market. The first-party session
   is distinct from legacy Medusa customer authentication.
3. An actual TMS-native owner endpoint with a separate
   registered workload audience, current CP authority,
   and real transport/booking native veto, repeatable
   negatives and complete independent provider teardown.
   A demo `/bookings` route is not a substitute.
4. An independent same-run legal-actor, spend/approval,
   market/currency, cross-border and issuer revocation
   witness as appropriate to the logistics operation.
5. Real TLS Redis private dev lease, original custody and
   teardown evidence; owner reads back all original source
   pins and refuses a stale or re-labeled fixture.

Provider support remains PARTIAL; no protected staging
or production activation is authorized by this source.
**Do not merge until final-head CI, reviewer assessment and
actual connected development evidence satisfy their
respective acceptance gates.**
