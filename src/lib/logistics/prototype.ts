import { z } from "zod"

/** Demo projections only. Never serialize these into CP, TMS or commercial commands. */
export const places = [
  "Kampala, UG",
  "Nairobi, KE",
  "Dar es Salaam, TZ",
  "Johannesburg, ZA",
  "Cape Town, ZA",
] as const
export const requestSchema = z
  .object({
    origin: z.enum(places),
    destination: z.enum(places),
    cargo: z.enum(["General cargo", "Agricultural products", "Equipment & machinery"]),
    weight: z.coerce.number().positive().max(24000),
    pallets: z.coerce.number().int().min(1).max(24),
    mode: z.enum(["Road", "Air", "Ocean"]),
  })
  .refine((value) => value.origin !== value.destination, {
    message: "Choose different origin and destination cities.",
    path: ["destination"],
  })
export type DemoRequest = z.infer<typeof requestSchema>
export type DemoOffer = {
  id: string
  name: string
  days: string
  amount: number
  approvalRequired: boolean
}
export type DemoQuote = {
  id: string
  request: DemoRequest
  offers: DemoOffer[]
  createdAt: number
  expiresAt: number
  approved: boolean
  bookedId?: string
}
export type DemoShipment = {
  id: string
  reference: string
  origin: string
  destination: string
  mode: string
  cargo: string
  weight: number
  pallets: number
  status: "In transit" | "Attention needed" | "Delivered" | "Booking requested"
  eta: string
  progress: number
  location: string
  note: string
}

export const initialShipments: DemoShipment[] = [
  {
    id: "TH-260184",
    reference: "Coffee / PO-042",
    origin: places[0],
    destination: places[3],
    mode: "Road",
    cargo: "Green coffee",
    weight: 2400,
    pallets: 4,
    status: "In transit",
    eta: "27 Oct 2026",
    progress: 60,
    location: "Dar es Salaam, TZ",
    note: "Scheduled onward movement. No action required in this scenario.",
  },
  {
    id: "TH-260183",
    reference: "Equipment / PO-038",
    origin: places[3],
    destination: places[1],
    mode: "Road",
    cargo: "Processing equipment",
    weight: 1800,
    pallets: 3,
    status: "Attention needed",
    eta: "Awaiting update",
    progress: 35,
    location: "Beitbridge border",
    note: "Packing list is missing in this scenario. Review the document checklist before contacting your coordinator.",
  },
  {
    id: "TH-260181",
    reference: "Textiles / PO-036",
    origin: places[1],
    destination: places[4],
    mode: "Air",
    cargo: "Textiles",
    weight: 420,
    pallets: 1,
    status: "In transit",
    eta: "25 Oct 2026",
    progress: 75,
    location: "Johannesburg, ZA",
    note: "Destination handling planned in this scenario.",
  },
  {
    id: "TH-260176",
    reference: "Packaging / PO-031",
    origin: places[2],
    destination: places[0],
    mode: "Road",
    cargo: "Packaging materials",
    weight: 900,
    pallets: 2,
    status: "Delivered",
    eta: "21 Oct 2026",
    progress: 100,
    location: "Kampala, UG",
    note: "Delivery scenario complete. Proof-of-delivery metadata is available in Documents.",
  },
]

/** Deliberately artificial scenario amounts, not a rate engine, tax or provider estimate. */
export function createDemoQuote(request: DemoRequest, now: number, sequence: number): DemoQuote {
  const base = { Road: 12400, Air: 24800, Ocean: 18600 }[request.mode]
  return {
    id: `DEMO-Q-${String(sequence).padStart(3, "0")}`,
    request,
    createdAt: now,
    expiresAt: now + 30 * 60 * 1000,
    approved: false,
    offers: [
      {
        id: "standard",
        name: "Standard",
        days: request.mode === "Air" ? "3–5 days" : "8–12 days",
        amount: base,
        approvalRequired: false,
      },
      {
        id: "priority",
        name: "Priority",
        days: request.mode === "Air" ? "2–3 days" : "6–8 days",
        amount: base + 6200,
        approvalRequired: true,
      },
    ],
  }
}

export function quoteBookability(quote: DemoQuote, offerId: string, now: number): string | null {
  const offer = quote.offers.find((item) => item.id === offerId)
  if (!offer) return "Choose a service option."
  if (quote.bookedId) return "This demo quote already has a booking request."
  if (now >= quote.expiresAt) return "This demo quote has expired. Create a new quote."
  if (offer.approvalRequired && !quote.approved)
    return "Simulate company approval before continuing."
  return null
}

export function createDemoBooking(
  quote: DemoQuote,
  offerId: string,
  reference: string,
  now: number,
  sequence: number,
): DemoShipment {
  const blocked = quoteBookability(quote, offerId, now)
  if (blocked) throw new Error(blocked)
  if (!reference.trim() || reference.trim().length > 60)
    throw new Error("Enter a test reference of 1–60 characters.")
  return {
    id: `DEMO-B-${String(sequence).padStart(3, "0")}`,
    reference: reference.trim(),
    ...quote.request,
    status: "Booking requested",
    eta: "Not assigned",
    progress: 0,
    location: quote.request.origin,
    note: `Demo request from ${quote.id}. No carrier, collection, capacity, contract or payment has been confirmed.`,
  }
}

export const demoMoney = (amount: number) =>
  new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0,
  }).format(amount)
