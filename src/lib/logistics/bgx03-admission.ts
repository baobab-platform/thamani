/**
 * BGX-03 — server-side, fail-closed shipment evidence admission boundary.
 *
 * This source-only gate expects receipts obtained from real, independently
 * verified IAM, CP and TMS adapters; it does NOT verify a JWT, act as a PEP,
 * manufacture a capability, select a provider or query transport telemetry.
 * Keep it out of client bundles and do not expose it as a production route
 * until accepted native TMS contracts and real-provider tests exist.
 */
import { assertEvidenceTimestamp } from "@/lib/presentation/evidence-timestamp"

type IdentityReceipt = Readonly<{
  state: "authenticated"
  principalId: string
  audience: string
  expiresAt: string
}>
type CpReceipt = Readonly<{
  decision: "allow"
  principalId: string
  tenantId: string
  organisationId: string
  capability: string
  bindingReference: string
  expiresAt: string
}>
type ShipmentReceipt = Readonly<{
  decision: "allow"
  principalId: string
  tenantId: string
  organisationId: string
  shipmentReference: string
  sourceReference: string
  asOf: string
  expiresAt: string
}>
export type BgX03Ports = Readonly<{
  /** Must validate the actual IAM issuer, signature, assurance and audience. */
  identity(): Promise<IdentityReceipt | null>
  /** Must obtain a *current* CP context/capability resolution, not a browser ACL. */
  cp(principal: IdentityReceipt, capability: string): Promise<CpReceipt | null>
  /** Must call a native TMS object PEP using the CP-authorised context. */
  shipment(context: CpReceipt, shipmentReference: string): Promise<ShipmentReceipt | null>
}>
export type AdmissionResult =
  | Readonly<{ access: "restricted"; explanation: string }>
  | Readonly<{
      access: "authorised"
      shipmentReference: string
      sourceReference: string
      asOf: string
    }>

function bounded(value: unknown): value is string {
  return typeof value === "string" && value.length > 0 && value.length <= 256 && !!value.trim()
}
function future(value: unknown, now: number): boolean {
  if (typeof value !== "string") return false
  try {
    // A strict calendar guard prevents Date.parse's permissive rollover from
    // converting impossible source dates into apparently valid permissions.
    assertEvidenceTimestamp(value)
    return Date.parse(value) > now
  } catch {
    return false
  }
}
const DENIED = Object.freeze({
  access: "restricted" as const,
  explanation: "Shipment evidence unavailable or not authorised",
})

/**
 * Fail closed on every missing, expired, mismatched or erroring authority.
 * No receipt contains raw coordinates, provider URLs or secret credentials.
 * This function only admits a subsequent protected read; it cannot itself
 * certify location accuracy, execute transport actions or promise live GPS.
 */
export async function admitShipmentEvidence(
  ports: BgX03Ports,
  input: Readonly<{
    /** An opaque browser-supplied lookup key, never evidence of access. */
    shipmentReference: string
    /** Exact, accepted capability key supplied by the server application. */
    capability: string
    expectedAudience: string
    now: number
  }>,
): Promise<AdmissionResult> {
  if (
    !bounded(input.shipmentReference) ||
    !bounded(input.capability) ||
    !bounded(input.expectedAudience) ||
    !Number.isFinite(input.now)
  )
    return DENIED
  try {
    const identity = await ports.identity()
    if (
      !identity ||
      identity.state !== "authenticated" ||
      !bounded(identity.principalId) ||
      identity.audience !== input.expectedAudience ||
      !future(identity.expiresAt, input.now)
    )
      return DENIED

    const cp = await ports.cp(identity, input.capability)
    if (
      !cp ||
      cp.decision !== "allow" ||
      cp.principalId !== identity.principalId ||
      cp.capability !== input.capability ||
      !bounded(cp.tenantId) ||
      !bounded(cp.organisationId) ||
      !bounded(cp.bindingReference) ||
      !future(cp.expiresAt, input.now)
    )
      return DENIED

    const shipment = await ports.shipment(cp, input.shipmentReference)
    if (
      !shipment ||
      shipment.decision !== "allow" ||
      shipment.principalId !== identity.principalId ||
      shipment.tenantId !== cp.tenantId ||
      shipment.organisationId !== cp.organisationId ||
      shipment.shipmentReference !== input.shipmentReference ||
      !bounded(shipment.sourceReference) ||
      !future(shipment.expiresAt, input.now)
    )
      return DENIED
    try {
      assertEvidenceTimestamp(shipment.asOf)
    } catch {
      return DENIED
    }
    // Copy only display-safe reference fields. Never return the native receipt
    // by spreading its unknown transport/provider metadata into the browser.
    return Object.freeze({
      access: "authorised",
      shipmentReference: shipment.shipmentReference,
      sourceReference: shipment.sourceReference,
      asOf: shipment.asOf,
    })
  } catch {
    // Includes actual IAM, CP or TMS service outages and malformed transport.
    // A public client receives no detail that would enumerate an object.
    return DENIED
  }
}
