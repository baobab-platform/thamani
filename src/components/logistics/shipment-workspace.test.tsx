import axe from "axe-core"
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import {
  DocumentEvidence,
  RouteEvidence,
  ShipmentWorkspace,
  type ShipmentWorkspaceView,
} from "./shipment-workspace"

afterEach(() => cleanup())

const restricted = {
  access: "restricted",
  explanation: "Organisation access must be checked at the BFF.",
} as const

function authorised(): ShipmentWorkspaceView {
  return {
    access: "authorised",
    tracking: {
      visibility: "authorised",
      observation: null,
      milestones: [],
    },
    route: {
      state: "available",
      data: {
        source: "Synthetic authorised route projection",
        stops: [
          {
            id: "start",
            label: "Origin hand-off",
            evidence: "planned",
            asOf: null,
          },
          {
            id: "report",
            label: "Carrier reported movement",
            evidence: "carrier-reported",
            asOf: "2026-10-17T06:30:00Z",
          },
        ],
      },
    },
    documents: {
      state: "available",
      data: {
        source: "Synthetic authorised document metadata",
        records: [
          { id: "document-1", title: "Consignment document", state: "received" },
        ],
      },
    },
  }
}

describe("BXS-05G per-capability shipment presentation", () => {
  it("suppresses tabs and all private projections for restricted shipment access", () => {
    const { container } = render(<ShipmentWorkspace view={restricted} />)
    expect(screen.getByRole("alert").textContent).toContain("Shipment workspace restricted")
    expect(screen.queryByRole("tablist")).toBeNull()
    expect(container.textContent).not.toContain("Origin hand-off")
  })

  it("defaults to source-labelled tracking without claiming a location or delivery", () => {
    render(<ShipmentWorkspace view={authorised()} />)
    expect(screen.getByRole("tab", { name: "Tracking" }).getAttribute("aria-selected")).toBe(
      "true",
    )
    expect(screen.getByText("Location not available")).toBeTruthy()
    expect(screen.getByText("No authorised transport milestones have been provided.")).toBeTruthy()
  })

  it("allows keyboard-oriented Base UI tabs without equating visibility to domain action", async () => {
    const { container } = render(<ShipmentWorkspace view={authorised()} />)
    fireEvent.click(screen.getByRole("tab", { name: "Route" }))
    expect(screen.getByRole("tab", { name: "Route" }).getAttribute("aria-selected")).toBe("true")
    expect(screen.getByRole("region", { name: "Authorised route evidence" }).textContent).toContain(
      "Planned, not executed",
    )
    expect(container.textContent).not.toContain("Live GPS")
    fireEvent.click(screen.getByRole("tab", { name: "Documents" }))
    expect(
      screen.getByRole("region", { name: "Authorised document metadata" }).textContent,
    ).toContain("Metadata only — not customs approval")
    expect(screen.queryByRole("link", { name: "Consignment document" })).toBeNull()
    const report = await axe.run(container, {
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"] },
    })
    expect(report.violations.filter((v) => v.impact === "critical" || v.impact === "serious")).toEqual(
      [],
    )
  })

  it("keeps restricted or unavailable individual capabilities isolated", () => {
    const view: ShipmentWorkspaceView = {
      access: "authorised",
      tracking: {
        visibility: "restricted",
        explanation: "Tracking denied by transport policy",
      },
      route: { state: "restricted", explanation: "No route grant" },
      documents: { state: "unavailable", explanation: "Trade Docs unavailable" },
    }
    const { container } = render(<ShipmentWorkspace view={view} />)
    expect(screen.getByText("Tracking details restricted")).toBeTruthy()
    fireEvent.click(screen.getByRole("tab", { name: "Route" }))
    expect(screen.getByText("Route access restricted")).toBeTruthy()
    expect(container.textContent).not.toContain("Origin hand-off")
    fireEvent.click(screen.getByRole("tab", { name: "Documents" }))
    expect(screen.getByText("Documents unavailable")).toBeTruthy()
  })

  it("rejects missing source, duplicate stops and invalid reported timestamps", () => {
    expect(() =>
      render(<RouteEvidence access={{ state: "available", data: { source: "", stops: [] } }} />),
    ).toThrow(/source/)
    expect(() =>
      render(
        <RouteEvidence
          access={{
            state: "available",
            data: {
              source: "Transport",
              stops: [
                { id: "same", label: "First", evidence: "planned", asOf: null },
                { id: "same", label: "Second", evidence: "planned", asOf: null },
              ],
            },
          }}
        />,
      ),
    ).toThrow(/unique/)
    expect(() =>
      render(
        <RouteEvidence
          access={{
            state: "available",
            data: {
              source: "Transport",
              stops: [
                { id: "valid", label: "Time unknown", evidence: "carrier-reported", asOf: "today" },
              ],
            },
          }}
        />,
      ),
    ).toThrow(/ISO/)
  })

  it("rejects duplicate document metadata and never invents download links", () => {
    expect(() =>
      render(
        <DocumentEvidence
          access={{
            state: "available",
            data: {
              source: "Documents",
              records: [
                { id: "duplicate", title: "A", state: "received" },
                { id: "duplicate", title: "B", state: "reviewing" },
              ],
            },
          }}
        />,
      ),
    ).toThrow(/unique/)
    const { container } = render(
      <DocumentEvidence access={{ state: "available", data: { source: "Documents", records: [] } }} />,
    )
    expect(container.textContent).toContain("No documents are present")
    expect(container.querySelector("a")).toBeNull()
  })
})
