import { cleanup, fireEvent, render, screen, within } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import { LogisticsPrototype } from "./logistics-prototype"

afterEach(cleanup)

describe("Customer logistics prototype", () => {
  it("resolves shipment URLs and recovers from missing session state", () => {
    const { rerender } = render(<LogisticsPrototype pathname="/shipments/TH-260184" />)
    expect(screen.getByRole("heading", { name: "TH-260184" })).toBeInTheDocument()
    rerender(<LogisticsPrototype pathname="/shipments/UNKNOWN" />)
    expect(screen.getByText("Shipment unavailable in this demo session")).toBeInTheDocument()
    expect(screen.queryByRole("heading", { name: "TH-260184" })).not.toBeInTheDocument()
    rerender(<LogisticsPrototype pathname="/bookings" />)
    expect(screen.getByRole("heading", { name: "Start with a quote" })).toBeInTheDocument()
  })
  it("carries a quote into a demo request, exposes it in tracking, and resets the session", () => {
    render(<LogisticsPrototype />)
    fireEvent.click(
      within(screen.getByRole("navigation", { name: "Workspace" })).getByRole("button", {
        name: "Get a quote",
      }),
    )
    fireEvent.click(screen.getByRole("button", { name: "Compare demo services" }))
    fireEvent.click(screen.getAllByRole("button", { name: "Review booking" })[0])
    expect(screen.getByText("DEMO-Q-001 · Version 1")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Create demo booking" })).toBeDisabled()
    fireEvent.click(screen.getByRole("checkbox"))
    fireEvent.click(screen.getByRole("button", { name: "Create demo booking" }))
    expect(screen.getByRole("status")).toHaveTextContent("DEMO-B-001 created")
    expect(screen.getByText("Booking requested", { selector: ".bx-status" })).toBeInTheDocument()
    expect(screen.queryByText(/Sample milestone/)).not.toBeInTheDocument()
    fireEvent.click(
      within(screen.getByRole("navigation", { name: "Workspace" })).getByRole("button", {
        name: "Track a shipment",
      }),
    )
    fireEvent.change(screen.getByLabelText("Shipment reference"), {
      target: { value: "demo-b-001" },
    })
    fireEvent.click(screen.getByRole("button", { name: "Track shipment" }))
    expect(screen.getByRole("heading", { name: "DEMO-B-001" })).toBeInTheDocument()
    fireEvent.click(screen.getByRole("button", { name: "Reset demo" }))
    fireEvent.click(
      within(screen.getByRole("navigation", { name: "Workspace" })).getByRole("button", {
        name: "Track a shipment",
      }),
    )
    fireEvent.change(screen.getByLabelText("Shipment reference"), {
      target: { value: "DEMO-B-001" },
    })
    fireEvent.click(screen.getByRole("button", { name: "Track shipment" }))
    expect(screen.getByRole("alert")).toHaveTextContent("No matching demo shipment")
  })
  it("keeps the quote draft across navigation and makes priority approval explicit", () => {
    render(<LogisticsPrototype />)
    const nav = screen.getByRole("navigation", { name: "Workspace" })
    fireEvent.click(within(nav).getByRole("button", { name: "Get a quote" }))
    fireEvent.change(screen.getByLabelText("Total weight (kg)"), { target: { value: "2000" } })
    fireEvent.click(screen.getByRole("button", { name: "Compare demo services" }))
    fireEvent.click(screen.getAllByRole("button", { name: "Review booking" })[1])
    expect(screen.getByRole("alert")).toHaveTextContent("Simulate company approval")
    fireEvent.click(screen.getByRole("button", { name: "Back to quote" }))
    expect(screen.getByLabelText("Total weight (kg)")).toHaveValue(2000)
    fireEvent.click(screen.getByRole("button", { name: "Simulate company approval for Priority" }))
    fireEvent.click(screen.getAllByRole("button", { name: "Review booking" })[1])
    expect(screen.queryByRole("alert")).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole("checkbox"))
    expect(screen.getByRole("button", { name: "Create demo booking" })).toBeEnabled()
  })
})
