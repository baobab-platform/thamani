import { describe, expect, it } from "vitest"
import {
  createDemoBooking,
  createDemoQuote,
  places,
  quoteBookability,
  requestSchema,
  type DemoRequest,
} from "./prototype"

const request: DemoRequest = {
  origin: places[0],
  destination: places[3],
  weight: 1200,
  pallets: 2,
  mode: "Road",
  cargo: "General cargo",
}
describe("Synthetic logistics journey", () => {
  it("rejects invalid corridors and unrealistic demo loads", () => {
    expect(requestSchema.safeParse({ ...request, destination: request.origin }).success).toBe(false)
    for (const weight of [0, -1, 24001, NaN])
      expect(requestSchema.safeParse({ ...request, weight }).success).toBe(false)
    expect(requestSchema.safeParse({ ...request, pallets: 1.5 }).success).toBe(false)
  })
  it("requires explicit simulated approval for priority and rejects stale/reused quotes", () => {
    const quote = createDemoQuote(request, 1000, 1)
    expect(quoteBookability(quote, "priority", 1000)).toMatch(/approval/)
    expect(quoteBookability({ ...quote, approved: true }, "priority", 1000)).toBeNull()
    expect(quoteBookability(quote, "standard", quote.expiresAt)).toMatch(/expired/)
    expect(quoteBookability({ ...quote, bookedId: "DEMO-B-001" }, "standard", 1000)).toMatch(
      /already/,
    )
    expect(quoteBookability(quote, "unknown", 1000)).toMatch(/Choose/)
  })
  it("preserves quote lineage and never turns a request into transport execution", () => {
    const quote = createDemoQuote(request, 1000, 2)
    const booking = createDemoBooking(quote, "standard", "  TEST-PO  ", 1001, 1)
    expect(booking).toMatchObject({
      id: "DEMO-B-001",
      reference: "TEST-PO",
      status: "Booking requested",
      eta: "Not assigned",
      progress: 0,
      origin: request.origin,
      destination: request.destination,
    })
    expect(booking.note).toContain(quote.id)
    expect(() => createDemoBooking(quote, "priority", "TEST", 1001, 2)).toThrow(/approval/)
    expect(() => createDemoBooking(quote, "standard", "TEST", quote.expiresAt, 2)).toThrow(
      /expired/,
    )
    expect(() => createDemoBooking(quote, "standard", " ", 1001, 2)).toThrow(/reference/)
  })
})
