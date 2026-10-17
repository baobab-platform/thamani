# Thamani Foundation gates — PR #16 reconciliation

**Date:** 17 October 2026  
**Governing source:** Shared's accepted v2.3.0 Foundation workflow,
commit 31de2bc3dcd56128c019c640dc7e12c10ae9ca69.

This reconciles historic PR #16 with current Thamani main instead of
restoring superseded Foundation preview pins or vulnerable dependencies.
Current main already includes the repository contract, baobab-dev image,
Node 24+ engine baseline, pinned pnpm, supported fallback SAST and active
Foundation and security workflows.

The historic PR's failed 10 October checks include outdated Next.js/sharp
vulnerability findings, Dockerfile validation, formatting and unavailable
private GitHub Advanced Security upload/review features. These findings
must be re-evaluated on current source, not overridden with disabled checks.

The verify-foundation-v2 tests ensure pin concordance, full profile,
dependency-review enablement, required container/runtime metadata, SAST
fallback, dependency audit and Node 24. Negative tests fail on downgrades.
These do NOT waive, replace or alter the authentic Shared Foundation gates.

Merge requires all required checks on the NEW PR head SHA to pass. The PR
is not evidence of TMS, shipment tracking, map activation or production.
