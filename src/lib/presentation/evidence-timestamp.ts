/**
 * ADR-SHARED-040: strict calendar evidence validation comes from the
 * independently published and SHA512-verified Geo Core 0.3.1 contract.
 * Preserve the existing local import seam for Thamani components while
 * avoiding divergent date parsing logic or an estate-owned source of truth.
 */
export { assertEvidenceTimestamp } from "@baobab-platform/experience-geo-core"
