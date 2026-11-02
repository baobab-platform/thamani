import {
  toAccessibleChartTable,
  type ChartSeriesProjection,
} from "@baobab-platform/experience-charts"
import { locationLabel, validateLocationObservation } from "@baobab-platform/experience-geo-core"
import {
  validatePoints,
  type MapProjection,
} from "@baobab-platform/experience-geo-maplibre/model"
import {
  toEvidenceRows,
  validateEvidenceProjection,
  type EvidenceProjection,
} from "@baobab-platform/experience-geo-deckgl"

/**
 * A presentation-only BXS adapter for an ALREADY IAM/CP/TMS-authorised and
 * redacted Thamani BFF response. It is not a provider, permission engine,
 * GPS tracker, shipment/route engine or quotation/commitment authority.
 *
 * MapLibre and deck.gl WebGL runtimes are deliberately not loaded here:
 * their activation needs a separate reviewed provider, CSP, consent and
 * performance grant. Only source-labelled textual alternatives are created.
 */
export function logisticsEvidenceReadout(input: Readonly<{
  chart: ChartSeriesProjection
  map: MapProjection
  overlay: EvidenceProjection
  frameAt: string
}>) {
  const chart = toAccessibleChartTable(input.chart)
  let map: Readonly<{ restricted: boolean; explanation: string | null; rows: readonly Readonly<{
    id: string; label: string; evidenceReference: string; freshness: string; location: string
  }>[] }>
  if (input.map.visibility === "restricted") {
    // Do not accept hidden points on a restricted projection, even if a
    // downstream presenter would omit the canvas.
    if (Object.keys(input.map).some((key) => !["visibility", "explanation"].includes(key))) {
      throw new TypeError("Restricted map projection must not contain any evidence")
    }
    map = { restricted: true, explanation: input.map.explanation, rows: [] }
  } else if (input.map.visibility === "authorised") {
    validatePoints(input.map.points)
    map = {
      restricted: false,
      explanation: null,
      rows: input.map.points.map((point) => ({
        id: point.id,
        label: point.label,
        evidenceReference: point.evidenceReference,
        freshness: point.freshness,
        location: locationLabel(validateLocationObservation(point.observation)),
      })),
    }
  } else {
    throw new TypeError("Unknown map projection visibility")
  }
  const validatedOverlay = validateEvidenceProjection(input.overlay)
  const overlay = validatedOverlay.visibility === "restricted"
    ? []
    : toEvidenceRows(validatedOverlay, input.frameAt)
  return Object.freeze({
    chart,
    map: Object.freeze({ ...map, rows: Object.freeze(map.rows) }),
    overlay: Object.freeze(overlay),
    // No automatic inference of ETA, customs, booking, carrier or execution.
    liveTracking: false as const,
    executionAuthority: false as const,
  })
}
