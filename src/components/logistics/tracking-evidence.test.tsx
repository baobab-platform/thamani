import axe from "axe-core"
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import { TrackingEvidence } from "./tracking-evidence"

afterEach(() => cleanup())

describe("Thamani BXS source-labelled logistics evidence", () => {
  it("denies data for restricted view models without leaking a timeline", () => {
    const { container } = render(
      <TrackingEvidence
        view={{ visibility: "restricted", explanation: "The BFF has not granted access." }}
      />,
    )
    expect(screen.getByRole("alert").textContent).toContain("Tracking details restricted")
    expect(container.querySelector("time")).toBeNull()
    expect(container.querySelector(".bx-timeline")).toBeNull()
    expect(screen.queryByLabelText("Location evidence provenance")).toBeNull()
  })

  it("labels estimated positions honestly and never displays raw GPS coordinates", async () => {
    const { container } = render(
      <TrackingEvidence
        view={{
          visibility: "authorised",
          observation: {
            kind: "estimated",
            position: [32.5, -1.25],
            source: "Authorised transport projection",
            observedAt: "2026-10-17T08:00:00Z",
          },
          milestones: [
            {
              id: "pending-collection",
              label: "Collection awaiting source confirmation",
              state: "uncertain",
            },
          ],
        }}
      />,
    )
    expect(screen.getByLabelText("Location evidence provenance").textContent).toContain(
      "Estimated position — not observed",
    )
    expect(screen.getByLabelText("Shipment milestones").textContent).toContain("uncertain")
    expect(container.textContent).not.toContain("32.5")
    expect(container.textContent).not.toContain("-1.25")
    const summary = screen.getByText("How are these logistics updates verified?")
    // jsdom does not implement native Enter-on-summary; browser keyboard proof
    // belongs to the real Chromium suite in Shared Storybook.
    fireEvent.click(summary)
    expect(summary.closest("details")?.hasAttribute("open")).toBe(true)
    const result = await axe.run(container, {
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"] },
    })
    expect(result.violations.filter((v) => v.impact === "critical" || v.impact === "serious")).toEqual(
      [],
    )
  })

  it("fails closed if BFF sends malformed source or out-of-range coordinates", () => {
    expect(() =>
      render(
        <TrackingEvidence
          view={{
            visibility: "authorised",
            observation: { kind: "observed-gps", source: "", position: [0, 0], observedAt: null },
            milestones: [],
          }}
        />,
      ),
    ).toThrow(/Missing source/)
    expect(() =>
      render(
        <TrackingEvidence
          view={{
            visibility: "authorised",
            observation: {
              kind: "carrier-reported",
              source: "Carrier",
              position: [181, 0],
              observedAt: null,
            },
            milestones: [],
          }}
        />,
      ),
    ).toThrow(/longitude/)
  })

  it("does not manufacture positions, milestones or live tracking for missing data", () => {
    const { container } = render(
      <TrackingEvidence view={{ visibility: "authorised", observation: null, milestones: [] }} />,
    )
    expect(screen.getByText("Location not available")).toBeTruthy()
    expect(container.textContent).toContain("No authorised transport milestones")
    expect(container.textContent).not.toContain("Live")
  })
})
