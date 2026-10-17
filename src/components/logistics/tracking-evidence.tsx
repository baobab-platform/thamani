import {
  Disclosure,
  FeedbackPanel,
  MilestoneTimeline,
  StatusLabel,
  type MilestoneItem,
} from "@baobab-platform/experience-ui"
import {
  locationLabel,
  validateLocationObservation,
  type LocationObservation,
} from "@baobab-platform/experience-geo-core"

/**
 * BXS-05F / ADR-THA-0014 — presentation of a caller-authorised TMS projection.
 *
 * A Thamani BFF with CP/IAM grants must redact private shipment data before
 * creating this view model. No engine SDK, fetch, GPS coordinates, ETA,
 * price, customs decision or tenant grant is created by this component.
 */
export type TrackingEvidenceView =
  | Readonly<{ visibility: "restricted"; explanation: string }>
  | Readonly<{
      visibility: "authorised"
      observation: LocationObservation | null
      milestones: readonly MilestoneItem[]
    }>

/** An estimate or carrier report never becomes verified arrival or live GPS. */
export function TrackingEvidence({ view }: { view: TrackingEvidenceView }) {
  if (view.visibility === "restricted") {
    return (
      <div className="bx-logistics-evidence" data-bx-consumer="thamani-logistics">
        <FeedbackPanel
          state="restricted"
          title="Tracking details restricted"
          description={view.explanation}
        />
      </div>
    )
  }

  // Fail closed on malformed source, coordinates, timestamp or confidence.
  const attribution = view.observation
    ? locationLabel(validateLocationObservation(view.observation))
    : null

  return (
    <section
      className="bx-logistics-evidence"
      data-bx-consumer="thamani-logistics"
      aria-label="Shipment tracking evidence"
    >
      <StatusLabel tone="info">Read-only source-labelled tracking</StatusLabel>
      {attribution ? (
        <p aria-label="Location evidence provenance">{attribution}</p>
      ) : (
        <FeedbackPanel
          state="unavailable"
          title="Location not available"
          description="An authorised position observation has not been provided."
        />
      )}
      {view.milestones.length ? (
        <MilestoneTimeline items={view.milestones} label="Shipment milestones" />
      ) : (
        <p>No authorised transport milestones have been provided.</p>
      )}
      <Disclosure summary="How are these logistics updates verified?">
        This view only presents a redacted projection supplied by Thamani.
        Transport milestones remain governed by TMS, legal and customs
        outcomes by their respective authorities, and access by IAM and the
        Control Plane. A reported or estimated position is not live tracking.
      </Disclosure>
    </section>
  )
}
