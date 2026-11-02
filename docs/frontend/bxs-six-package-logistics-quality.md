# Thamani BXS-05 consumer and public quality qualification

**Status:** Development source integration, not a provider or production
acceptance receipt. Governing: Shared ADR-SHARED-040; Thamani ADR-THA-0018;
EA-DEV DEV-08/11/14. Brand colours/typography remain undecided.

## Source audit (2026-11-02)

- Nabhold baseline: Shared semantic tokens and geo-core, SSR-first content,
  public route accessibility and Playwright. Nabhold's quality parity is being
  developed separately in Nabhold PR #99; that draft is not merged acceptance.
- ZuriBeans baseline: extensive Figma/public journey, responsive screenshot
  baselines, accessibility, emitted CSS/JS budgets and isolated Lighthouse lab.
  The six-package integration is proposed in ZuriBeans PR #147; do not claim
  its unmerged source is a current main-branch consumer.
- Thamani baseline: published tokens/UI/geo-core v0.3.1, two distinct
  Playwright harnesses, already approved _synthetic_ workspace browser
  snapshots, and functional quote -> booking -> tracking negatives.
  There was no public landing visual matrix, independent Lighthouse
  lab, or explicit emitted-asset size gate.

## Exactly six Shared distributable packages

| Package                 | Release | Thamani use                                                        |
| ----------------------- | ------- | ------------------------------------------------------------------ |
| experience-tokens       | 0.3.1   | Existing neutral namespaced stylesheet                             |
| experience-ui           | 0.3.1   | Existing Disclosure, FeedbackPanel, MilestoneTimeline, StatusLabel |
| experience-geo-core     | 0.3.1   | Existing source-labelled observations                              |
| experience-charts       | 0.1.0   | Null-preserving accessible shipment chart table adapter            |
| experience-geo-maplibre | 0.2.0   | Server-safe validated map data model only                          |
| experience-geo-deckgl   | 0.1.0   | Exact-frame, source-labelled textual overlay evidence only         |

All are exact published registry pins using Shared's publisher run 39073176845
and independent SHA512/export verifier 39073362603. The maplibre runtime
peer enters the immutable dependency graph but is **not bundled into a
public route**: the consumer only imports the `/model` boundary.
`experience-storybook` is Shared's private workspace and is not
a seventh distributed dependency.

No provider keys, approved tiles, WebGL worker, consent mechanism, vehicle
position interpolation, live ETA, booking, price or customs grant is added.
The BFF must already redact data under current IAM/CP/TMS authority before
calling `logisticsEvidenceReadout`. A customer organisation does not inherit
a Nabhold subsidiary permission.

## Quality gates

1. Frozen pnpm install, format, lint, TypeScript, vitest and
   `pnpm bxs:verify` release-contract check.
2. Production Next.js build and offline emitted-asset limits:
   800 KiB total client JS, 250 KiB largest chunk, 64 KiB total CSS,
   250 KiB largest public raster image. **Do not raise without a review.**
3. Existing standalone synthetic logistics-browser Playwright keyboard,
   WCAG/axe, denial negatives and committed pixel-snapshot comparisons.
4. Production landing at 320/390/768/1024/1440px, DOM layout,
   main/CTA/3 cards/no overflow and original screenshot artifacts.
   Screenshots are new review receipts **not approved pixel goldens**.
   They must be visually reviewed before a future approved pixel baseline
   is committed; no automatic snapshot acceptance.
5. Independently executed WCAG 2.2 automated scans and keyboard skip-link
   focus for public home and quote/tracking/shipment details.
6. Separate single-worker throttled Lighthouse lab for the public homepage
   and the non-indexed synthetic quote route. Minimum category scores: 90
   performance and 95 accessibility/best practices on both; SEO >=95 is
   enforced on the indexable homepage only, while the quote route must
   explicitly remain noindex. Transferred scripts <=250 KiB; CLS <=0.1.
   LCP is recorded but is not field p75. A neutral monochrome favicon
   prevents the observed 404 browser-console regression; no unapproved
   Thamani palette or logo design is introduced. The existing quote route
   can still emit a CSP inspector diagnostic; CSP hardening requires a
   separate design/negative qualification and must not relax current policy.
7. Image-build and pre-existing Foundation/Security checks unchanged.

### Non-claims

A passing Lighthouse laboratory score is **not** production Core Web Vitals
field p75 LCP/INP, proof of independent carrier connection, real CP/IAM
buyer grants, shipment custody, or staging authorisation. The separate
Thamani IAM-N07 PR #44 is not incorporated or merged in this scope.
MapLibre/deck.gl activation requires a separately approved origin/licence,
worker/CSP, explicit consent, teardown, data revocation, accessibility
fallback and bounded performance demonstration.

## Reproduction

Run `pnpm install --frozen-lockfile`, `pnpm format:check`,
`pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm bxs:verify`,
`pnpm build`, `pnpm perf:budget` and `pnpm test:logistics:browser`.
With the same production build and CI profile, run `pnpm test:e2e`,
`pnpm test:e2e:visual`, `pnpm test:e2e:a11y` and
`pnpm test:e2e:lighthouse`. Review CI artifacts before merge.
