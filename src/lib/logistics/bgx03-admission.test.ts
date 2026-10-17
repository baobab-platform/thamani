import { describe, expect, it } from "vitest"
import { admitShipmentEvidence, type BgX03Ports } from "./bgx03-admission"

const now = Date.parse("2026-10-17T10:00:00Z")
const input = {
  shipmentReference: "synthetic-shipment-1",
  capability: "synthetic.capability.not-canonical",
  expectedAudience: "thamani-synthetic-bff",
  now,
}
const identity = {
  state: "authenticated" as const, principalId: "synthetic-principal-1",
  audience: input.expectedAudience, expiresAt: "2026-10-17T10:10:00Z",
}
const cp = {
  decision: "allow" as const, principalId: identity.principalId,
  tenantId: "synthetic-tenant-a", organisationId: "synthetic-org-a",
  capability: input.capability, bindingReference: "synthetic-cp-binding",
  expiresAt: "2026-10-17T10:05:00Z",
}
const shipment = {
  decision: "allow" as const, principalId: identity.principalId,
  tenantId: cp.tenantId, organisationId: cp.organisationId,
  shipmentReference: input.shipmentReference,
  sourceReference: "synthetic-native-evidence",
  asOf: "2026-10-17T09:30:00Z", expiresAt: "2026-10-17T10:03:00Z",
}
function ports(): BgX03Ports {
  return {
    identity: async () => ({ ...identity }),
    cp: async () => ({ ...cp }),
    shipment: async () => ({ ...shipment }),
  }
}
function denied(value: Awaited<ReturnType<typeof admitShipmentEvidence>>) {
  expect(value).toEqual({
    access: "restricted", explanation: "Shipment evidence unavailable or not authorised",
  })
}

describe("BGX-03 preflight (synthetic receipts, NOT real service certification)", () => {
  it("admits only concordant, current IAM/CP/native object receipts", async () => {
    const outcome = await admitShipmentEvidence(ports(), input)
    expect(outcome.access).toBe("authorised")
    if (outcome.access !== "authorised") throw Error("Synthetic proof changed")
    expect(outcome.tenantId).toBe("synthetic-tenant-a")
    expect(outcome.sourceReference).toBe(shipment.sourceReference)
    expect(outcome).not.toHaveProperty("providerCredential")
  })
  it("rejects wrong audience, expired identity and any missing authenticated session", async () => {
    await denied(await admitShipmentEvidence({ ...ports(), identity: async () => null }, input))
    await denied(await admitShipmentEvidence({
      ...ports(), identity: async () => ({ ...identity, audience: "foreign-audience" }),
    }, input))
    await denied(await admitShipmentEvidence({
      ...ports(), identity: async () => ({ ...identity, expiresAt: "2026-10-17T09:59:59Z" }),
    }, input))
    await denied(await admitShipmentEvidence({
      ...ports(), identity: async () => ({ ...identity, expiresAt: "2026-02-30T09:59:59Z" }),
    }, input))
  })
  it("rejects grant revocation, expired CP binding and principal mismatch", async () => {
    await denied(await admitShipmentEvidence({ ...ports(), cp: async () => null }, input))
    await denied(await admitShipmentEvidence({
      ...ports(), cp: async () => ({ ...cp, principalId: "different-principal" }),
    }, input))
    await denied(await admitShipmentEvidence({
      ...ports(), cp: async () => ({ ...cp, expiresAt: "2026-10-17T09:00:00Z" }),
    }, input))
    await denied(await admitShipmentEvidence({
      ...ports(), cp: async () => ({ ...cp, capability: "different-capability" }),
    }, input))
  })
  it("rejects cross-tenant, cross-organisation and wrong-object native TMS answers", async () => {
    for (const changed of [
      { tenantId: "synthetic-tenant-b" },
      { organisationId: "synthetic-org-b" },
      { principalId: "different-principal" },
      { shipmentReference: "other-shipment" },
      { expiresAt: "2026-10-17T09:30:00Z" },
      { sourceReference: "" },
    ]) {
      await denied(await admitShipmentEvidence({
        ...ports(), shipment: async () => ({ ...shipment, ...changed }),
      }, input))
    }
  })
  it("never grants permission when identity, CP or TMS is unavailable", async () => {
    for (const failure of ["identity", "cp", "shipment"] as const) {
      const fixture = ports()
      const unavailable = { ...fixture, [failure]: async () => { throw Error("synthetic outage") } }
      await denied(await admitShipmentEvidence(unavailable, input))
    }
  })
  it("never converts invalid input, missing native evidence or invalid timestamps into permission", async () => {
    await denied(await admitShipmentEvidence(ports(), { ...input, capability: "" }))
    await denied(await admitShipmentEvidence(ports(), { ...input, now: Number.NaN }))
    await denied(await admitShipmentEvidence({
      ...ports(), shipment: async () => ({ ...shipment, asOf: "2026-02-30T12:00:00Z" }),
    }, input))
    await denied(await admitShipmentEvidence({
      ...ports(), shipment: async () => null,
    }, input))
  })
})
