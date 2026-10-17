import { cleanup, render, screen, fireEvent } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import { LogisticsViewTabs } from "./logistics-view-tabs"

afterEach(() => cleanup())

describe("Thamani Base UI logistics view selector", () => {
  it("opens with tracking, without claiming a live TMS connection", () => {
    render(
      <LogisticsViewTabs
        tracking={<p>Last authorised observation unavailable</p>}
        route={<p>Route details require authorised transport data</p>}
        documents={<p>Document access requires Trade Docs permissions</p>}
      />,
    )
    expect(screen.getByRole("tab", { name: "Tracking" }).getAttribute("aria-selected")).toBe("true")
    expect(screen.getByText("Last authorised observation unavailable")).toBeTruthy()
    expect(screen.getByRole("tablist", { name: "Shipment workspace views" })).toBeTruthy()
  })

  it("switches to a separate read-only route projection without creating a plan", () => {
    render(
      <LogisticsViewTabs
        tracking={<p>Tracking view</p>}
        route={<p>Route details require authorised transport data</p>}
        documents={<p>Documents view</p>}
      />,
    )
    fireEvent.click(screen.getByRole("tab", { name: "Route" }))
    expect(screen.getByRole("tab", { name: "Route" }).getAttribute("aria-selected")).toBe("true")
    expect(screen.getByText("Route details require authorised transport data")).toBeTruthy()
  })
})
