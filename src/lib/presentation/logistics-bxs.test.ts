import { describe, expect, it } from "vitest"
import { approvedWorkerUrl, approvedResourceUrl, type MapProjection } from "@baobab-platform/experience-geo-maplibre/model"
import type { EvidenceProjection } from "@baobab-platform/experience-geo-deckgl"
import type { ChartSeriesProjection } from "@baobab-platform/experience-charts"
import { logisticsEvidenceReadout } from "./logistics-bxs"

const time = "2026-10-21T12:30:00Z"
const observation = {
  kind: "carrier-reported" as const,
  position: [32.58, 0.31] as const,
  source: "synthetic TMS receipt",
  observedAt: time,
}
const chart: ChartSeriesProjection = {
  title: "Sample shipment quantities",
  valueLabel: "Quantity",
  unitLabel: "units",
  availability: "available",
  sourceReference: "synthetic-test-only",
  asOf: time,
  points: [{ id: "reported", label: "Reported", value: 0 }, { id: "unknown", label: "Not reported", value: null }],
}
const map: MapProjection = {
  visibility: "authorised",
  projectionReference: "synthetic-projection",
  points: [{
    id: "one",
    label: "Reported sample milestone",
    evidenceReference: "synthetic-evidence",
    freshness: "unknown",
    observation,
  }],
}
const overlay: EvidenceProjection = {
  visibility: "authorised",
  projectionReference: "synthetic-projection",
  sourceReference: "synthetic-test-only",
  frames: [{ at: time, points: [{ id: "one", label: "Sample point", evidenceReference: "synthetic-evidence", freshness: "unknown", observation }] }],
}
describe("Thamani six-package BXS presentation (not native authority)", () => {
  it("preserves zero versus missing chart values and source time", () => {
    const view = logisticsEvidenceReadout({ chart, map, overlay, frameAt: time })
    expect(view.chart.rows.map((row) => row.displayValue)).toEqual(["0", "Not reported"])
    expect(view.chart.sourceReference).toBe("synthetic-test-only")
    expect(view.map.rows[0].location).toContain("Carrier-reported")
    expect(view.overlay).toHaveLength(1)
    expect(view.executionAuthority).toBe(false)
    expect(view.liveTracking).toBe(false)
  })
  it("denies independent restricted chart, map and overlay with no leaked rows", () => {
    const result = logisticsEvidenceReadout({
      chart: { ...chart, availability: "restricted", points: [], sourceReference: null, asOf: null },
      map: { visibility: "restricted", explanation: "No current CP grant" },
      overlay: { visibility: "restricted", explanation: "No shipment capability" },
      frameAt: time,
    })
    expect(result.chart.rows).toEqual([])
    expect(result.map.rows).toEqual([])
    expect(result.overlay).toEqual([])
  })
  it("rejects restricted projection carrying hidden evidence", () => {
    expect(() => logisticsEvidenceReadout({
      chart,
      map: { visibility: "restricted", explanation: "Denied", points: [{ secret: "tenant-b" }] } as unknown as MapProjection,
      overlay,
      frameAt: time,
    })).toThrow("must not contain any evidence")
  })
  it("rejects missing chart provenance and invalid/estimated GPS positions", () => {
    expect(() => logisticsEvidenceReadout({ chart: { ...chart, sourceReference: null }, map, overlay, frameAt: time })).toThrow()
    const badMap = { ...map, points: [{ ...("points" in map ? map.points[0] : {}), observation: { ...observation, position: [999, 0] } }] } as unknown as MapProjection
    expect(() => logisticsEvidenceReadout({ chart, map: badMap, overlay, frameAt: time })).toThrow()
  })
  it("does not interpolate overlay frames or invent a tracking position", () => {
    const result = logisticsEvidenceReadout({ chart, map, overlay, frameAt: "2026-10-21T12:30:01Z" })
    expect(result.overlay).toEqual([])
  })
  it("refuses third-party tile resources and non-application-owned workers", () => {
    const policy = { allowedOrigins: ["https://approved.example"], attribution: "Licensed source", licenceReference: "approved-owner-record" }
    expect(() => approvedResourceUrl("https://tile.openstreetmap.org/1/2/3.png", policy)).toThrow()
    expect(() => approvedWorkerUrl({ url: "https://outside.example/maplibre-gl-worker.mjs", version: "6.16.0" }, "https://thamani.example", "6.16.0")).toThrow()
  })
})
