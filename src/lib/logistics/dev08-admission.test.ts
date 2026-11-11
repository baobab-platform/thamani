import { describe, expect, it, vi } from "vitest"
import {
  admitShipmentEvidence,
  unavailableLogisticsPorts,
  type BgX03Ports,
  type CpReceipt,
  type AccessReceipt,
  type ShipmentReceipt,
} from "./dev08-admission"
vi.mock("server-only", () => ({}))

const time = Date.parse("2026-10-25T10:00:00Z")
const input = {
  shipmentReference: "synthetic-shipment",
  mode: "TRACKING" as const,
  capability: "synthetic.unregistered-capability",
  expectedAudience: "synthetic-estate",
  maximumEvidenceAgeMs: 60_000,
}
const identity = {
  state: "authenticated" as const,
  principalId: "synthetic-human",
  audience: input.expectedAudience,
  expiresAt: "2026-10-25T10:10:00Z",
}
const cp: CpReceipt = {
  decision: "allow",
  principalId: identity.principalId,
  tenantId: "synthetic-tenant",
  organisationId: "synthetic-organisation",
  legalEntityId: "synthetic-legal-actor",
  marketId: "synthetic-market-ug",
  transportLegalActorApproved: true,
  authorityReference: "synthetic-authority",
  capability: input.capability,
  bindingReference: "synthetic-binding",
  expiresAt: "2026-10-25T10:05:00Z",
}
const access: AccessReceipt = {
  ...cp,
  shipmentReference: input.shipmentReference,
  basis: "owner",
  permissions: ["TRACKING"],
  sourceReference: "synthetic-native-object-policy",
  expiresAt: "2026-10-25T10:04:00Z",
}
const shipment: ShipmentReceipt = {
  ...cp,
  shipmentReference: input.shipmentReference,
  sourceReference: "synthetic-tms-observation",
  asOf: "2026-10-25T09:59:30Z",
  expiresAt: "2026-10-25T10:03:00Z",
}
const restricted = {
  access: "restricted",
  explanation: "Shipment evidence unavailable or not authorised",
}
function fixture(): BgX03Ports {
  return {
    clock: () => time,
    identity: async () => ({ ...identity }),
    cp: async () => ({ ...cp }),
    access: async () => ({ ...access }),
    shipment: async () => ({ ...shipment }),
  }
}

describe("DEV-08 source boundary — synthetic receipts, no provider qualification", () => {
  it("fails closed with the actual unconfigured adapter set", async () => {
    expect(await admitShipmentEvidence(unavailableLogisticsPorts, input)).toEqual(restricted)
  })
  it.each(["owner", "custodian", "intended-recipient"] as const)(
    "requires explicit %s object permission",
    async (basis) => {
      const value = await admitShipmentEvidence(
        { ...fixture(), access: async () => ({ ...access, basis }) },
        input,
      )
      expect(value.access).toBe("authorised")
      expect(value).toHaveProperty("validUntil", "2026-10-25T10:03:00.000Z")
    },
  )
  it("does not call the native reader when object policy is absent", async () => {
    const read = vi.fn(async () => shipment)
    expect(
      await admitShipmentEvidence(
        { ...fixture(), access: async () => null, shipment: read },
        input,
      ),
    ).toEqual(restricted)
    expect(read).not.toHaveBeenCalled()
  })
  it.each([
    "principalId",
    "tenantId",
    "organisationId",
    "legalEntityId",
    "marketId",
    "bindingReference",
  ] as const)("rejects unrelated %s in both object policy and data", async (field) => {
    expect(
      await admitShipmentEvidence(
        { ...fixture(), access: async () => ({ ...access, [field]: "unrelated" }) },
        input,
      ),
    ).toEqual(restricted)
    expect(
      await admitShipmentEvidence(
        { ...fixture(), shipment: async () => ({ ...shipment, [field]: "unrelated" }) },
        input,
      ),
    ).toEqual(restricted)
  })
  it("refuses an unapproved or unsourced transport legal actor before object access", async () => {
    for (const change of [
      { transportLegalActorApproved: false },
      { authorityReference: "" },
      { legalEntityId: "" },
      { marketId: "" },
    ]) {
      const object = vi.fn(async () => access)
      expect(
        await admitShipmentEvidence(
          { ...fixture(), cp: async () => ({ ...cp, ...change }) as CpReceipt, access: object },
          input,
        ),
      ).toEqual(restricted)
      expect(object).not.toHaveBeenCalled()
    }
  })
  it("customer status and unrestricted recipient status grant no object permission", async () => {
    for (const change of [
      { basis: "customer" },
      { permissions: [] },
      { shipmentReference: "unrelated-shipment" },
      { sourceReference: "" },
    ]) {
      expect(
        await admitShipmentEvidence(
          { ...fixture(), access: async () => ({ ...access, ...change }) as AccessReceipt },
          input,
        ),
      ).toEqual(restricted)
    }
  })
  it.each(["2026-10-25T10:00:01Z", "2026-10-25T09:58:59Z", "2026-02-30T09:59:30Z"])(
    "rejects future, stale or impossible evidence: %s",
    async (asOf) => {
      expect(
        await admitShipmentEvidence(
          { ...fixture(), shipment: async () => ({ ...shipment, asOf }) },
          input,
        ),
      ).toEqual(restricted)
    },
  )
  it("strips invented carrier, ETA, custody, coordinates and credentials from the display projection", async () => {
    const value = await admitShipmentEvidence(
      {
        ...fixture(),
        shipment: async () => ({
          ...shipment,
          carrier: "invented",
          eta: "tomorrow",
          custody: "assumed",
          coordinates: [1, 2],
          credential: "synthetic-private",
        }),
      },
      input,
    )
    expect(value).toEqual({
      access: "authorised",
      shipmentReference: shipment.shipmentReference,
      sourceReference: shipment.sourceReference,
      asOf: shipment.asOf,
      validUntil: "2026-10-25T10:03:00.000Z",
    })
    expect(Object.isFrozen(value)).toBe(true)
  })
  it("rejects leases that expire during an awaited native read", async () => {
    let clock = time
    const value = await admitShipmentEvidence(
      {
        ...fixture(),
        clock: () => clock,
        shipment: async () => {
          clock += 10 * 60_000
          return shipment
        },
      },
      input,
    )
    expect(value).toEqual(restricted)
  })
  it("stops before the native read when authority expires during object-policy resolution", async () => {
    let clock = time
    const read = vi.fn(async () => shipment)
    expect(
      await admitShipmentEvidence(
        {
          ...fixture(),
          clock: () => clock,
          access: async () => {
            clock += 10 * 60_000
            return access
          },
          shipment: read,
        },
        input,
      ),
    ).toEqual(restricted)
    expect(read).not.toHaveBeenCalled()
  })
  it("rejects a backwards clock and invalid freshness policy", async () => {
    let calls = 0
    expect(
      await admitShipmentEvidence({ ...fixture(), clock: () => time - calls++ }, input),
    ).toEqual(restricted)
    for (const maximumEvidenceAgeMs of [0, -1, NaN, Infinity, 1.5])
      expect(await admitShipmentEvidence(fixture(), { ...input, maximumEvidenceAgeMs })).toEqual(
        restricted,
      )
  })
  it("tracking permission does not confer event-proof access", async () => {
    const read = vi.fn(async () => shipment)
    expect(
      await admitShipmentEvidence(
        { ...fixture(), shipment: read },
        { ...input, mode: "EVENT_PROOF", eventReference: "synthetic-event" },
      ),
    ).toEqual(restricted)
    expect(read).not.toHaveBeenCalled()
  })
  it("rejects rollback after an intermediate reading, even when still after the start", async () => {
    const offsets = [0, 1000, 2000, 50_000, 10_000]
    let index = 0
    expect(
      await admitShipmentEvidence(
        {
          ...fixture(),
          clock: () => time + offsets[index++],
          shipment: async () => ({ ...shipment, asOf: "2026-10-25T10:00:00Z" }),
        },
        { ...input, maximumEvidenceAgeMs: 20_000 },
      ),
    ).toEqual(restricted)
  })
  it("admits only a separately permitted, exactly matched sourced event occurrence", async () => {
    const source = {
      reference: "synthetic-event",
      sourceReference: "synthetic-native-event-source",
      occurredAt: "2026-10-25T09:55:00Z",
      assertion: "verified-occurrence" as const,
    }
    const ports = {
      ...fixture(),
      access: async () => ({ ...access, permissions: ["EVENT_PROOF"] as const }),
      shipment: async () => ({ ...shipment, event: source }),
    }
    const request = { ...input, mode: "EVENT_PROOF" as const, eventReference: source.reference }
    expect(await admitShipmentEvidence(ports, request)).toMatchObject({
      access: "authorised",
      event: {
        reference: source.reference,
        sourceReference: source.sourceReference,
        occurredAt: source.occurredAt,
      },
    })
    for (const change of [
      { reference: "unrelated-event" },
      { sourceReference: "" },
      { occurredAt: "2026-10-25T10:00:00Z" },
      { assertion: "predicted" },
    ]) {
      expect(
        await admitShipmentEvidence(
          {
            ...ports,
            shipment: async () =>
              ({ ...shipment, event: { ...source, ...change } }) as ShipmentReceipt,
          },
          request,
        ),
      ).toEqual(restricted)
    }
  })
  it.each(["identity", "cp", "access", "shipment"] as const)(
    "returns the same non-enumerating refusal on %s outage",
    async (stage) => {
      expect(
        await admitShipmentEvidence(
          {
            ...fixture(),
            [stage]: async () => {
              throw Error("synthetic outage")
            },
          },
          input,
        ),
      ).toEqual(restricted)
    },
  )
})
