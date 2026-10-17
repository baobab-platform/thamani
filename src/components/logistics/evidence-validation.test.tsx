import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { assertEvidenceTimestamp } from "@/lib/presentation/evidence-timestamp"
import {
  RouteEvidence,
  DocumentEvidence,
  type RouteProjection,
  type DocumentProjection,
} from "./shipment-workspace"

describe("untrusted logistics evidence boundary", () => {
  it.each([
    "2026-02-30T12:00:00Z",
    "2026-04-31T12:00:00Z",
    "1900-02-29T00:00:00Z",
    "2026-10-17T24:00:00Z",
  ])("rejects impossible calendar evidence %s", (value) => {
    expect(() => assertEvidenceTimestamp(value)).toThrow(/ISO/)
  })
  it("preserves valid leap-day and explicit-offset evidence", () => {
    expect(() => assertEvidenceTimestamp("2000-02-29T23:59:59+02:00")).not.toThrow()
  })
  it("rejects unknown classification rather than calling a route milestone verified", () => {
    const data = {
      source: "Synthetic boundary test",
      stops: [{ id: "one", label: "Untrusted report", evidence: "unknown", asOf: null }],
    } as unknown as RouteProjection
    expect(() => render(<RouteEvidence access={{ state: "available", data }} />)).toThrow(
      /classification/,
    )
  })
  it("rejects unknown document states", () => {
    const data = {
      source: "Synthetic boundary test",
      records: [{ id: "one", title: "Metadata", state: "customs-approved" }],
    } as unknown as DocumentProjection
    expect(() => render(<DocumentEvidence access={{ state: "available", data }} />)).toThrow(
      /document evidence state/,
    )
  })
})
