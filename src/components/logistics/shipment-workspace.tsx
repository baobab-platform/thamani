import { FeedbackPanel, StatusLabel } from "@baobab-platform/experience-ui"
import { LogisticsViewTabs } from "./logistics-view-tabs"
import { TrackingEvidence, type TrackingEvidenceView } from "./tracking-evidence"

/**
 * ADR-THA-0014 §§29–32, 175–177 / ADR-SHARED-040:
 * presentation-only shipment workspace, never a transport source of truth.
 *
 * A caller behind the Thamani IAM/CP-authorised BFF must decide both
 * object-level shipment access AND per-capability visibility before constructing
 * this view model. Rendering a tab must never stand in for those checks.
 */
export type EvidenceAccess<T> =
  | Readonly<{ state: "restricted"; explanation: string }>
  | Readonly<{ state: "unavailable"; explanation: string }>
  | Readonly<{ state: "available"; data: T }>

/** Route stops are reported facts from a redacted source, never calculated ETA. */
export type RouteStop = Readonly<{
  id: string
  label: string
  evidence: "planned" | "carrier-reported" | "verified-milestone"
  asOf: string | null
}>
export type RouteProjection = Readonly<{
  source: string
  stops: readonly RouteStop[]
}>

/**
 * Only previously-authorised document metadata is displayable in this phase.
 * A document being "received" is NOT customs release or regulatory approval.
 * No unscoped download URL, blob, content or capability is accepted.
 */
export type DocumentRecord = Readonly<{
  id: string
  title: string
  state: "requested" | "received" | "reviewing"
}>
export type DocumentProjection = Readonly<{
  source: string
  records: readonly DocumentRecord[]
}>

export type ShipmentWorkspaceView =
  | Readonly<{ access: "restricted"; explanation: string }>
  | Readonly<{
      access: "authorised"
      tracking: TrackingEvidenceView
      route: EvidenceAccess<RouteProjection>
      documents: EvidenceAccess<DocumentProjection>
    }>

/** A bad source projection should fail closed, not be silently corrected. */
function requireSource(source: string) {
  if (!source.trim()) throw new TypeError("Missing authorised source attribution")
}

function validateIds<T extends { id: string }>(items: readonly T[]) {
  const unique = new Set<string>()
  for (const item of items) {
    if (!item.id.trim() || unique.has(item.id)) {
      throw new TypeError("Source item IDs must be unique and nonempty")
    }
    unique.add(item.id)
  }
}

function verifyTimestamp(value: string | null) {
  if (
    value !== null &&
    (!/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d+)?(?:Z|[+-]\d\d:\d\d)$/.test(value) ||
      !Number.isFinite(Date.parse(value)))
  ) {
    throw new TypeError("Expected an ISO timestamp with timezone")
  }
}

function EvidenceUnavailable({
  title,
  state,
  explanation,
}: {
  title: string
  state: "restricted" | "unavailable"
  explanation: string
}) {
  return <FeedbackPanel state={state} title={title} description={explanation} />
}

/**
 * Non-map, keyboard-readable alternative. Visualising these labels never
 * grants route authority or estimates the position between milestones.
 */
export function RouteEvidence({ access }: { access: EvidenceAccess<RouteProjection> }) {
  if (access.state !== "available") {
    return (
      <EvidenceUnavailable
        state={access.state}
        title={access.state === "restricted" ? "Route access restricted" : "Route unavailable"}
        explanation={access.explanation}
      />
    )
  }
  const { source, stops } = access.data
  requireSource(source)
  validateIds(stops)
  for (const stop of stops) {
    if (!stop.label.trim()) throw new TypeError("Missing route stop label")
    verifyTimestamp(stop.asOf)
  }
  return (
    <section aria-label="Authorised route evidence">
      <StatusLabel tone="info">Non-map route evidence — no live position</StatusLabel>
      <p>Source: {source}</p>
      {stops.length ? (
        <ol>
          {stops.map((stop) => (
            <li key={stop.id}>
              <strong>{stop.label}</strong>{" "}
              <span>
                {stop.evidence === "planned"
                  ? "Planned, not executed"
                  : stop.evidence === "carrier-reported"
                    ? "Carrier-reported, not independently verified"
                    : "Source-verified transport milestone"}
              </span>
              {stop.asOf && <time dateTime={stop.asOf}> — As of {stop.asOf}</time>}
            </li>
          ))}
        </ol>
      ) : (
        <p>No route stops are present in the authorised projection.</p>
      )}
    </section>
  )
}

export function DocumentEvidence({ access }: { access: EvidenceAccess<DocumentProjection> }) {
  if (access.state !== "available") {
    return (
      <EvidenceUnavailable
        state={access.state}
        title={
          access.state === "restricted" ? "Documents access restricted" : "Documents unavailable"
        }
        explanation={access.explanation}
      />
    )
  }
  const { source, records } = access.data
  requireSource(source)
  validateIds(records)
  for (const record of records) {
    if (!record.title.trim()) throw new TypeError("Missing document title")
  }
  return (
    <section aria-label="Authorised document metadata">
      <StatusLabel tone="warning">Metadata only — not customs approval</StatusLabel>
      <p>Source: {source}</p>
      {records.length ? (
        <ul>
          {records.map((record) => (
            <li key={record.id}>
              {record.title} — {record.state.replace("-", " ")}
            </li>
          ))}
        </ul>
      ) : (
        <p>No documents are present in the authorised projection.</p>
      )}
    </section>
  )
}

/**
 * Restricted shipment context renders NO tabs, so hidden panel rendering
 * cannot accidentally leak private data from other customer organisations.
 */
export function ShipmentWorkspace({ view }: { view: ShipmentWorkspaceView }) {
  if (view.access === "restricted") {
    return (
      <FeedbackPanel
        state="restricted"
        title="Shipment workspace restricted"
        description={view.explanation}
      />
    )
  }
  return (
    <section aria-label="Shipment workspace" data-bx-consumer="thamani-logistics">
      <LogisticsViewTabs
        tracking={<TrackingEvidence view={view.tracking} />}
        route={<RouteEvidence access={view.route} />}
        documents={<DocumentEvidence access={view.documents} />}
      />
    </section>
  )
}
