/** Presentation routes only; these do not confer organisation or shipment access. */
export const workspacePaths = {
  Overview: "/workspace",
  Shipments: "/shipments",
  "Get a quote": "/quotes",
  "Track a shipment": "/tracking",
  Documents: "/documents",
  "Help & support": "/support",
  Booking: "/bookings",
  "Shipment details": "/shipments",
} as const
export type WorkspacePage = keyof typeof workspacePaths
export function workspacePath(page: WorkspacePage, shipmentId?: string): string {
  return page === "Shipment details" && shipmentId
    ? `/shipments/${encodeURIComponent(shipmentId)}`
    : workspacePaths[page]
}
export function workspaceRoute(
  pathname: string,
): { page: WorkspacePage; shipmentId?: string } | undefined {
  const path = pathname.replace(/\/$/, "")
  const match = /^\/shipments\/([^/]+)$/.exec(path)
  if (match) return { page: "Shipment details", shipmentId: decodeURIComponent(match[1]) }
  const entry = Object.entries(workspacePaths).find(
    ([page, href]) => href === path && page !== "Shipment details",
  )
  return entry ? { page: entry[0] as WorkspacePage } : undefined
}
