import "server-only"
import { assertEvidenceTimestamp } from "@/lib/presentation/evidence-timestamp"

/** Internal verified-adapter projections, NOT Shared/TMS wire contracts.
 * No real adapter or production endpoint is activated by this source boundary.
 */
export type ReadMode = "TRACKING" | "EVENT_PROOF"
type Scope = Readonly<{
  principalId: string
  tenantId: string
  organisationId: string
  legalEntityId: string
  marketId: string
  bindingReference: string
}>
export type IdentityReceipt = Readonly<{
  state: "authenticated"
  principalId: string
  audience: string
  expiresAt: string
}>
export type CpReceipt = Scope &
  Readonly<{
    decision: "allow"
    capability: string
    transportLegalActorApproved: true
    authorityReference: string
    expiresAt: string
  }>
export type AccessReceipt = Scope &
  Readonly<{
    decision: "allow"
    shipmentReference: string
    basis: "owner" | "custodian" | "intended-recipient"
    permissions: readonly ReadMode[]
    sourceReference: string
    expiresAt: string
  }>
export type ShipmentReceipt = Scope &
  Readonly<{
    decision: "allow"
    shipmentReference: string
    sourceReference: string
    asOf: string
    expiresAt: string
    event?: Readonly<{
      reference: string
      sourceReference: string
      occurredAt: string
      assertion: "verified-occurrence"
    }>
  }>
export type BgX03Ports = Readonly<{
  clock(): number
  identity(): Promise<IdentityReceipt | null>
  cp(identity: IdentityReceipt, capability: string): Promise<CpReceipt | null>
  /** Native object policy must verify actual owner/custody/recipient scope.
   * Customer status or a tenant-wide role alone cannot produce this receipt.
   */
  access(context: CpReceipt, reference: string, mode: ReadMode): Promise<AccessReceipt | null>
  shipment(
    context: CpReceipt,
    reference: string,
    mode: ReadMode,
    eventReference?: string,
  ): Promise<ShipmentReceipt | null>
}>
type Input = Readonly<{
  shipmentReference: string
  eventReference?: string
  /** These values are server-owned, never browser authority flags. */
  mode: ReadMode
  capability: string
  expectedAudience: string
  maximumEvidenceAgeMs: number
}>
export type AdmissionResult =
  | Readonly<{ access: "restricted"; explanation: string }>
  | Readonly<{
      access: "authorised"
      shipmentReference: string
      sourceReference: string
      asOf: string
      validUntil: string
      event?: Readonly<{ reference: string; sourceReference: string; occurredAt: string }>
    }>
const DENIED = Object.freeze({
  access: "restricted" as const,
  explanation: "Shipment evidence unavailable or not authorised",
})
const bounded = (value: unknown): value is string =>
  typeof value === "string" &&
  value.length > 0 &&
  value.length <= 256 &&
  value.trim() === value &&
  !/[\u0000-\u001f\u007f]/.test(value)
function instant(value: unknown): number {
  if (typeof value !== "string") return NaN
  try {
    assertEvidenceTimestamp(value)
    return Date.parse(value)
  } catch {
    return NaN
  }
}
const current = (value: unknown, now: number) => instant(value) > now
const scoped = (value: Scope, expected: Scope) =>
  (
    [
      "principalId",
      "tenantId",
      "organisationId",
      "legalEntityId",
      "marketId",
      "bindingReference",
    ] as const
  ).every((key) => bounded(value[key]) && value[key] === expected[key])

/** Admit a minimal read projection. Never execute a booking or manufacture
 * carrier, ETA, custody, GPS, delivery, documentary or regulatory facts.
 * Recheck every lease after awaited calls before disclosing evidence.
 */
export async function admitShipmentEvidence(
  ports: BgX03Ports,
  input: Input,
): Promise<AdmissionResult> {
  try {
    const start = ports.clock()
    let previous = start
    const clock = () => {
      const value = ports.clock()
      if (!Number.isFinite(value) || value < previous) return NaN
      previous = value
      return value
    }
    if (
      !Number.isFinite(start) ||
      !bounded(input.shipmentReference) ||
      !bounded(input.capability) ||
      !bounded(input.expectedAudience) ||
      !Number.isSafeInteger(input.maximumEvidenceAgeMs) ||
      input.maximumEvidenceAgeMs <= 0 ||
      !["TRACKING", "EVENT_PROOF"].includes(input.mode) ||
      (input.mode === "EVENT_PROOF"
        ? !bounded(input.eventReference)
        : input.eventReference !== undefined)
    )
      return DENIED
    const identity = await ports.identity()
    let now = clock()
    if (
      !Number.isFinite(now) ||
      !identity ||
      identity.state !== "authenticated" ||
      !bounded(identity.principalId) ||
      identity.audience !== input.expectedAudience ||
      !current(identity.expiresAt, now)
    )
      return DENIED
    const cp = await ports.cp(identity, input.capability)
    now = clock()
    if (
      !Number.isFinite(now) ||
      !current(identity.expiresAt, now) ||
      !cp ||
      cp.decision !== "allow" ||
      cp.principalId !== identity.principalId ||
      cp.capability !== input.capability ||
      cp.transportLegalActorApproved !== true ||
      !scoped(cp, cp) ||
      !bounded(cp.bindingReference) ||
      !bounded(cp.authorityReference) ||
      !current(cp.expiresAt, now)
    )
      return DENIED
    const access = await ports.access(cp, input.shipmentReference, input.mode)
    now = clock()
    if (
      !Number.isFinite(now) ||
      !current(identity.expiresAt, now) ||
      !current(cp.expiresAt, now) ||
      !access ||
      access.decision !== "allow" ||
      !scoped(access, cp) ||
      access.shipmentReference !== input.shipmentReference ||
      !["owner", "custodian", "intended-recipient"].includes(access.basis) ||
      !Array.isArray(access.permissions) ||
      !access.permissions.includes(input.mode) ||
      !bounded(access.sourceReference) ||
      !current(access.expiresAt, now)
    )
      return DENIED
    const shipment = await ports.shipment(
      cp,
      input.shipmentReference,
      input.mode,
      input.eventReference,
    )
    now = clock()
    if (
      !Number.isFinite(now) ||
      !current(identity.expiresAt, now) ||
      !current(cp.expiresAt, now) ||
      !current(access.expiresAt, now) ||
      !shipment ||
      shipment.decision !== "allow" ||
      !scoped(shipment, cp) ||
      shipment.shipmentReference !== input.shipmentReference ||
      !bounded(shipment.sourceReference) ||
      !current(shipment.expiresAt, now)
    )
      return DENIED
    const asOf = instant(shipment.asOf)
    if (!Number.isFinite(asOf) || asOf > now || now - asOf > input.maximumEvidenceAgeMs)
      return DENIED
    let event: { reference: string; sourceReference: string; occurredAt: string } | undefined
    if (input.mode === "EVENT_PROOF") {
      const source = shipment.event
      if (
        !source ||
        source.assertion !== "verified-occurrence" ||
        source.reference !== input.eventReference ||
        !bounded(source.sourceReference) ||
        !Number.isFinite(instant(source.occurredAt)) ||
        instant(source.occurredAt) > asOf
      )
        return DENIED
      event = Object.freeze({
        reference: source.reference,
        sourceReference: source.sourceReference,
        occurredAt: source.occurredAt,
      })
    }
    return Object.freeze({
      access: "authorised",
      shipmentReference: shipment.shipmentReference,
      sourceReference: shipment.sourceReference,
      asOf: shipment.asOf,
      validUntil: new Date(
        Math.min(...[identity, cp, access, shipment].map((r) => instant(r.expiresAt))),
      ).toISOString(),
      ...(event ? { event } : {}),
    })
  } catch {
    return DENIED
  }
}

/** Absent adapters never fall back to client-side prototype fixtures. */
export const unavailableLogisticsPorts: BgX03Ports = Object.freeze({
  clock: Date.now,
  identity: async () => null,
  cp: async () => null,
  access: async () => null,
  shipment: async () => null,
})
