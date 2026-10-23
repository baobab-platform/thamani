"use client"

import { useEffect, useRef, useState, type FormEvent } from "react"
import { Tabs } from "@base-ui/react/tabs"
import { StatusLabel } from "@baobab-platform/experience-ui"
import {
  createDemoBooking,
  createDemoQuote,
  initialShipments,
  places,
  type DemoQuote,
  type DemoRequest,
  type DemoShipment,
} from "@/lib/logistics/prototype"
import { Icon } from "./icon"
import { BookingReview, QuoteBuilder } from "./quote-builder"

type Page =
  | "Overview"
  | "Shipments"
  | "Get a quote"
  | "Track a shipment"
  | "Documents"
  | "Help & support"
  | "Booking"
  | "Shipment details"
const navigation = [
  { page: "Overview", icon: "grid" },
  { page: "Shipments", icon: "box" },
  { page: "Get a quote", icon: "quote" },
  { page: "Track a shipment", icon: "track" },
  { page: "Documents", icon: "file" },
] as const
const titles: Record<Page, [string, string]> = {
  Overview: [
    "Your cargo. Connected.",
    "From the first quote to the final mile, keep your business moving.",
  ],
  Shipments: [
    "Every shipment, in view.",
    "Find a reference, follow a movement, or take the next step.",
  ],
  "Get a quote": [
    "Make your next move.",
    "Explore logistics services across our sample African corridors.",
  ],
  "Track a shipment": [
    "Follow the journey.",
    "Look up a demo reference for milestones, route and documents.",
  ],
  Documents: [
    "The details that move cargo.",
    "A single view of your sample shipment document checklists.",
  ],
  "Help & support": [
    "People behind every movement.",
    "Find answers and practise requesting help with your shipment.",
  ],
  Booking: [
    "One step closer to moving.",
    "Review the quote and create a simulated booking request.",
  ],
  "Shipment details": [
    "A clearer view of your shipment.",
    "Milestones, cargo details and the next action, together.",
  ],
}

function ShipmentStatus({ status }: { status: DemoShipment["status"] }) {
  return (
    <StatusLabel
      tone={status === "Attention needed" ? "warning" : status === "Delivered" ? "success" : "info"}
    >
      {status}
    </StatusLabel>
  )
}

/** Illustrative corridor diagram, not geographic evidence or a GPS projection. */
function CorridorMap({
  shipments,
  onSelect,
}: {
  shipments: DemoShipment[]
  onSelect: (shipment: DemoShipment) => void
}) {
  const [active, setActive] = useState(0)
  const shipment = shipments[active] ?? shipments[0]
  return (
    <section className="tg-card tg-map-card">
      <div className="tg-between">
        <div>
          <h2>Across borders. In one view.</h2>
          <p>Sample East & Southern Africa corridor</p>
        </div>
        <span className="tg-map-label">Illustrative route</span>
      </div>
      <div className="tg-map">
        <svg viewBox="0 0 800 300" role="img" aria-labelledby="corridor-title">
          <title id="corridor-title">
            Schematic corridor between Kampala, Nairobi, Dar es Salaam, Johannesburg and Cape Town.
            No live location.
          </title>
          <defs>
            <pattern id="map-dots" width="18" height="18" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#bdc8cd" />
            </pattern>
          </defs>
          <rect width="800" height="300" fill="url(#map-dots)" />
          <path
            d="M345-20 450 20 480 70 532 90 564 134 537 173 527 221 484 285 448 320 416 261 386 230 359 183 317 143 295 82Z"
            fill="#e1e7df"
            stroke="#cbd6cc"
            strokeWidth="1.5"
          />
          <path
            d="m345 30 138 22-48 80 102 41M359 183l168 38M386 230l98 55"
            fill="none"
            stroke="#c4d1c8"
            strokeDasharray="4 5"
          />
          <path
            d="M433 70 Q492 65 512 114 Q566 180 468 233 L428 274"
            fill="none"
            stroke="#bf8b2e"
            strokeWidth="2"
            strokeDasharray="6 5"
          />
          <path d="M433 70 Q492 65 512 114" fill="none" stroke="#172e3f" strokeWidth="3" />
          {[
            [433, 70, "Kampala"],
            [491, 81, "Nairobi"],
            [512, 125, "Dar es Salaam"],
            [468, 233, "Johannesburg"],
            [428, 274, "Cape Town"],
          ].map(([x, y, label]) => (
            <g key={label}>
              <circle cx={x} cy={y} r="5" fill="#fff" stroke="#213f4e" strokeWidth="2" />
              <text
                x={Number(x) + (label === "Kampala" ? -62 : 12)}
                y={Number(y) + (label === "Kampala" ? -10 : 4)}
                fill="#294351"
                fontSize="12"
                fontWeight="600"
              >
                {label}
              </text>
            </g>
          ))}
          <text x="190" y="160" fill="#647c85" fontSize="12" letterSpacing="3">
            ATLANTIC
          </text>
          <text x="640" y="205" fill="#647c85" fontSize="12" letterSpacing="3">
            INDIAN OCEAN
          </text>
        </svg>
        <div className="tg-map-caption">
          <span>
            <i className="tg-dot" /> Planned corridor
          </span>
          <span>Demo scenario · 23 Oct 2026</span>
        </div>
      </div>
      <div className="tg-map-bottom">
        <select
          aria-label="Shipment on corridor"
          value={active}
          onChange={(e) => setActive(Number(e.target.value))}
        >
          {shipments.map((item, index) => (
            <option key={item.id} value={index}>
              {item.id} · {item.origin} → {item.destination}
            </option>
          ))}
        </select>
        <button className="tg-text-button" onClick={() => onSelect(shipment)}>
          View shipment <Icon name="arrow" size={16} />
        </button>
      </div>
      <p className="tg-small tg-map-note">
        Diagram shows the sample corridor, not the selected shipment’s position. Text route details
        are available for every shipment.
      </p>
    </section>
  )
}

function ShipmentTable({
  shipments,
  onSelect,
}: {
  shipments: DemoShipment[]
  onSelect: (shipment: DemoShipment) => void
}) {
  return (
    <div className="tg-table-wrap">
      <table className="tg-table">
        <caption className="tg-sr-only">
          Demo shipments. Open a reference for shipment details.
        </caption>
        <thead>
          <tr>
            <th scope="col">Shipment / Reference</th>
            <th scope="col">Route</th>
            <th scope="col">Status</th>
            <th scope="col">Illustrative arrival</th>
            <th scope="col">
              <span className="tg-sr-only">Action</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((shipment) => (
            <tr key={shipment.id}>
              <td>
                <button className="tg-ref" onClick={() => onSelect(shipment)}>
                  {shipment.id}
                </button>
                <span>{shipment.reference}</span>
              </td>
              <td>
                <div className="tg-route-cell">
                  <Icon name={shipment.mode === "Air" ? "air" : "truck"} size={18} />
                  <div>
                    <strong>{shipment.origin}</strong>
                    <span>→ {shipment.destination}</span>
                  </div>
                </div>
              </td>
              <td>
                <ShipmentStatus status={shipment.status} />
              </td>
              <td>{shipment.eta}</td>
              <td>
                <button
                  className="tg-icon-button"
                  aria-label={`Open ${shipment.id}`}
                  onClick={() => onSelect(shipment)}
                >
                  <Icon name="chevron" size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!shipments.length && (
        <div className="tg-empty">
          <Icon name="search" size={28} />
          <h3>No matching shipments</h3>
          <p>Try another reference, city or status.</p>
        </div>
      )}
    </div>
  )
}

function ShipmentDetail({
  shipment,
  onSupport,
}: {
  shipment: DemoShipment
  onSupport: () => void
}) {
  return (
    <>
      <section className="tg-card tg-detail-heading">
        <div>
          <span className="tg-eyebrow">Demo shipment</span>
          <h2>{shipment.id}</h2>
          <p>{shipment.reference}</p>
        </div>
        <ShipmentStatus status={shipment.status} />
        <button className="tg-secondary" onClick={onSupport}>
          Get help <Icon name="help" size={16} />
        </button>
      </section>
      <div className="tg-detail-grid">
        <section className="tg-card">
          <Tabs.Root defaultValue="milestones">
            <Tabs.List className="tg-tabs" aria-label="Shipment details">
              <Tabs.Tab value="milestones">Milestones</Tabs.Tab>
              <Tabs.Tab value="cargo">Cargo & route</Tabs.Tab>
              <Tabs.Tab value="documents">Documents</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="milestones">
              <h3>From collection to delivery</h3>
              <p className="tg-small">
                Synthetic events · scenario dated 23 Oct 2026 · no live telemetry
              </p>
              <ol className="tg-timeline">
                {["Booking requested", "Collected at origin", "In transit", "Delivered"].map(
                  (label, index) => {
                    const completed =
                      shipment.status === "Delivered" ||
                      (shipment.status !== "Booking requested" &&
                        index <= (shipment.status === "Attention needed" ? 1 : 2))
                    return (
                      <li key={label} className={completed ? "completed" : ""}>
                        <span className="tg-timeline-point">
                          {completed ? (
                            <Icon name="check" size={14} />
                          ) : (
                            <Icon name="clock" size={14} />
                          )}
                        </span>
                        <div>
                          <strong>{label}</strong>
                          <p>
                            {completed
                              ? `Sample milestone · ${index === 0 ? shipment.origin : index === 1 ? "Origin hand-off" : index === 2 ? shipment.location : shipment.destination}`
                              : index === 0
                                ? "Demo request only; awaiting confirmation"
                                : "Planned · no execution evidence"}
                          </p>
                        </div>
                      </li>
                    )
                  },
                )}
              </ol>
            </Tabs.Panel>
            <Tabs.Panel value="cargo">
              <h3>Cargo & route summary</h3>
              <dl className="tg-definition-grid">
                <div>
                  <dt>Cargo</dt>
                  <dd>{shipment.cargo}</dd>
                </div>
                <div>
                  <dt>Transport</dt>
                  <dd>{shipment.mode}</dd>
                </div>
                <div>
                  <dt>Weight</dt>
                  <dd>{shipment.weight.toLocaleString()} kg</dd>
                </div>
                <div>
                  <dt>Pallets</dt>
                  <dd>{shipment.pallets}</dd>
                </div>
                <div>
                  <dt>Origin</dt>
                  <dd>{shipment.origin}</dd>
                </div>
                <div>
                  <dt>Destination</dt>
                  <dd>{shipment.destination}</dd>
                </div>
              </dl>
              <p className="tg-small">
                Text route alternative. No intermediate GPS positions or calculated ETA.
              </p>
            </Tabs.Panel>
            <Tabs.Panel value="documents">
              <h3>Shipment document checklist</h3>
              <DocumentChecklist shipment={shipment} />
            </Tabs.Panel>
          </Tabs.Root>
        </section>
        <aside className="tg-card tg-next-action">
          <span className="tg-eyebrow">Next action</span>
          <Icon name={shipment.status === "Attention needed" ? "alert" : "box"} size={28} />
          <h3>
            {shipment.status === "Attention needed"
              ? "A document needs attention"
              : shipment.status === "Booking requested"
                ? "Request created"
                : "You’re up to date"}
          </h3>
          <p>{shipment.note}</p>
          <button className="tg-text-button" onClick={onSupport}>
            Contact your coordinator <Icon name="arrow" size={16} />
          </button>
          <hr />
          <p className="tg-small">
            Source: Thamani prototype fixture. Live TMS, Trade Docs, CP and IAM are not connected.
          </p>
        </aside>
      </div>
    </>
  )
}

function DocumentChecklist({ shipment }: { shipment: DemoShipment }) {
  return (
    <>
      <ul className="tg-documents">
        {[
          "Commercial invoice",
          "Packing list",
          "Transport document",
          ...(shipment.status === "Delivered" ? ["Proof of delivery"] : []),
        ].map((title, index) => (
          <li key={title}>
            <Icon name="file" />
            <div>
              <strong>{title}</strong>
              <span>{shipment.id} · metadata only</span>
            </div>
            <span
              className={`tg-pill ${shipment.status === "Attention needed" && index === 1 ? "warning" : ""}`}
            >
              {shipment.status === "Booking requested"
                ? "Requested"
                : shipment.status === "Attention needed" && index === 1
                  ? "Missing"
                  : "Sample received"}
            </span>
          </li>
        ))}
      </ul>
      <p className="tg-small">
        Sample checklist only. No document contents, downloads, customs clearance or regulatory
        decisions.
      </p>
    </>
  )
}

function Support({ shipmentId }: { shipmentId: string }) {
  const [sent, setSent] = useState(false)
  return (
    <div className="tg-detail-grid">
      <section className="tg-card">
        <h2>Let’s work through it.</h2>
        <p>Explore the support flow using a fictitious request.</p>
        {sent ? (
          <div className="tg-success" role="status">
            <strong>Demo request DEMO-HELP-001 saved in this session.</strong>
            <p>
              No message was sent. Your shipment reference was {shipmentId || "General enquiry"}.
            </p>
            <button className="tg-secondary" onClick={() => setSent(false)}>
              Try another enquiry
            </button>
          </div>
        ) : (
          <form
            className="tg-form"
            onSubmit={(e) => {
              e.preventDefault()
              setSent(true)
            }}
          >
            <label>
              Related shipment
              <input value={shipmentId || "General enquiry"} readOnly />
            </label>
            <label>
              Topic
              <select>
                <option>Shipment update</option>
                <option>Document query</option>
                <option>Quote or booking</option>
                <option>Claim or service issue</option>
              </select>
            </label>
            <label>
              Test message
              <textarea
                required
                maxLength={400}
                placeholder="Use a fictitious message. Do not enter personal details."
              />
            </label>
            <button className="tg-primary">
              Simulate support request <Icon name="arrow" />
            </button>
          </form>
        )}
      </section>
      <aside className="tg-card">
        <h2>Good to know</h2>
        {[
          [
            "Can I book from a quote?",
            "Yes. Compare demo services, choose Review booking, acknowledge the simulation and create your request. Priority also demonstrates a company approval step.",
          ],
          [
            "Is shipment information live?",
            "No. All references, movements and arrival windows are synthetic. New bookings remain requests and do not create transport milestones.",
          ],
          [
            "Who can access my business shipments?",
            "The live service will require IAM authentication and CP-governed organisation and resource permissions. This demo grants no access.",
          ],
        ].map(([title, text]) => (
          <details key={title}>
            <summary>{title}</summary>
            <p>{text}</p>
          </details>
        ))}
      </aside>
    </div>
  )
}

export function LogisticsPrototype() {
  const [page, setPage] = useState<Page>("Overview")
  const [shipments, setShipments] = useState(initialShipments)
  const [selected, setSelected] = useState<DemoShipment>(initialShipments[0])
  const [quote, setQuote] = useState<DemoQuote | null>(null)
  const [draft, setDraft] = useState<DemoRequest>({
    origin: places[0],
    destination: places[3],
    cargo: "General cargo",
    weight: 1200,
    pallets: 2,
    mode: "Road",
  })
  const [offerId, setOfferId] = useState("standard")
  const [filter, setFilter] = useState("All shipments")
  const [search, setSearch] = useState("")
  const [tracking, setTracking] = useState("")
  const [trackingError, setTrackingError] = useState("")
  const [mobileMenu, setMobileMenu] = useState(false)
  const [notice, setNotice] = useState("")
  const [resetKey, setResetKey] = useState(0)
  const quoteSequence = useRef(1)
  const bookingSequence = useRef(1)
  const heading = useRef<HTMLHeadingElement>(null)
  const bookingLock = useRef(false)
  useEffect(() => {
    heading.current?.focus()
  }, [page])
  function navigate(next: Page) {
    setPage(next)
    setMobileMenu(false)
    setNotice("")
  }
  function openShipment(shipment: DemoShipment) {
    setSelected(shipment)
    navigate("Shipment details")
  }
  function newQuote(request: DemoRequest) {
    setQuote(createDemoQuote(request, Date.now(), quoteSequence.current++))
    bookingLock.current = false
  }
  function confirm(reference: string) {
    if (!quote || bookingLock.current) return
    try {
      const shipment = createDemoBooking(
        quote,
        offerId,
        reference,
        Date.now(),
        bookingSequence.current++,
      )
      bookingLock.current = true
      setShipments((items) => [shipment, ...items])
      setQuote({ ...quote, bookedId: shipment.id })
      openShipment(shipment)
      setNotice(`Demo booking ${shipment.id} created. No carrier booking or collection was made.`)
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Unable to create demo request.")
    }
  }
  function track(event: FormEvent) {
    event.preventDefault()
    const found = shipments.find((item) => item.id.toUpperCase() === tracking.trim().toUpperCase())
    if (found) {
      setTrackingError("")
      openShipment(found)
    } else
      setTrackingError(
        "No matching demo shipment. Try TH-260184 or a demo booking reference created in this session.",
      )
  }
  function reset() {
    setShipments(initialShipments)
    setQuote(null)
    setDraft({
      origin: places[0],
      destination: places[3],
      cargo: "General cargo",
      weight: 1200,
      pallets: 2,
      mode: "Road",
    })
    setSelected(initialShipments[0])
    setTracking("")
    setTrackingError("")
    setFilter("All shipments")
    setSearch("")
    bookingLock.current = false
    setResetKey((key) => key + 1)
    navigate("Overview")
    setNotice("Demo reset. All session requests and drafts were cleared.")
  }
  const filtered = shipments.filter(
    (item) =>
      (filter === "All shipments" || item.status === filter) &&
      `${item.id} ${item.reference} ${item.origin} ${item.destination}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  )
  const active = shipments.filter((item) => item.status !== "Delivered").length
  return (
    <div className="tg-app" key={resetKey}>
      <a className="tg-skip" href="#workspace">
        Skip to workspace
      </a>
      <aside className={`tg-sidebar ${mobileMenu ? "is-open" : ""}`} aria-label="Main navigation">
        <a
          href="#overview"
          className="tg-logo"
          onClick={(e) => {
            e.preventDefault()
            navigate("Overview")
          }}
        >
          <span className="tg-mark">
            t<span>.</span>
          </span>
          <span>
            THAMANI<small>GLOBAL LOGISTICS</small>
          </span>
        </a>
        <div className="tg-sidebar-label">CUSTOMER WORKSPACE</div>
        <nav aria-label="Workspace">
          {navigation.map(({ page: target, icon }) => (
            <button
              key={target}
              className={
                page === target ||
                (target === "Shipments" && page === "Shipment details") ||
                (target === "Get a quote" && page === "Booking")
                  ? "active"
                  : ""
              }
              aria-current={page === target ? "page" : undefined}
              onClick={() => navigate(target)}
            >
              <Icon name={icon} />
              {target}
              {target === "Shipments" && <span className="tg-nav-count">{shipments.length}</span>}
            </button>
          ))}
        </nav>
        <div className="tg-sidebar-bottom">
          <div className="tg-sidebar-promo">
            <Icon name="globe" size={25} />
            <h3>
              Africa connected.
              <br />
              Business moving.
            </h3>
            <p>
              Road, air and ocean.
              <br />
              One logistics partner.
            </p>
          </div>
          <button
            className={page === "Help & support" ? "active" : ""}
            onClick={() => navigate("Help & support")}
          >
            <Icon name="help" /> Help & support
          </button>
          <div className="tg-user">
            <span className="tg-avatar">AE</span>
            <div>
              <strong>Acacia Exports</strong>
              <small>Demo business account</small>
            </div>
          </div>
        </div>
      </aside>
      <div className="tg-body">
        <header className="tg-topbar">
          <div className="tg-topbar-left">
            <button
              className="tg-icon-button tg-menu-button"
              aria-label={mobileMenu ? "Close navigation" : "Open navigation"}
              aria-expanded={mobileMenu}
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              <Icon name={mobileMenu ? "close" : "menu"} />
            </button>
            <span>
              Workspace <span className="tg-breadcrumb">/ {page}</span>
            </span>
          </div>
          <div className="tg-topbar-right">
            <span className="tg-context">
              <Icon name="globe" size={16} /> Acacia Exports · Demo
            </span>
            <button className="tg-icon-button" aria-label="Reset demo" onClick={reset}>
              <Icon name="reset" size={17} />
            </button>
            <span className="tg-avatar small">AE</span>
          </div>
        </header>
        <div className="tg-demo-banner">
          <span>
            <strong>INTERACTIVE PROTOTYPE</strong> · Synthetic data. No live quotes, bookings or
            tracking.
          </span>
          <span>Session only · refresh resets demo</span>
        </div>
        <main id="workspace" className="tg-main">
          <div className="tg-page-heading">
            <div>
              <p className="tg-eyebrow">
                THAMANI GLOBAL / {page === "Overview" ? "BUSINESS LOGISTICS" : page.toUpperCase()}
              </p>
              <h1 ref={heading} tabIndex={-1}>
                {titles[page][0]}
              </h1>
              <p>{titles[page][1]}</p>
            </div>
            {(page === "Overview" || page === "Shipments") && (
              <button className="tg-primary" onClick={() => navigate("Get a quote")}>
                <Icon name="plus" size={18} /> Get a quote
              </button>
            )}
            {page === "Shipment details" && (
              <button className="tg-secondary" onClick={() => navigate("Shipments")}>
                All shipments
              </button>
            )}
          </div>
          {notice && (
            <div role="status" className="tg-notice">
              {notice}
              <button
                className="tg-icon-button"
                aria-label="Dismiss notification"
                onClick={() => setNotice("")}
              >
                <Icon name="close" size={16} />
              </button>
            </div>
          )}
          {page === "Overview" && (
            <>
              <div className="tg-metrics">
                {[
                  {
                    label: "Active shipments",
                    value: active,
                    icon: "box",
                    note: "Across your demo corridors",
                    status: "All shipments",
                  },
                  {
                    label: "Needs attention",
                    value: shipments.filter((item) => item.status === "Attention needed").length,
                    icon: "alert",
                    note: "Document action requested",
                    status: "Attention needed",
                  },
                  {
                    label: "Delivered",
                    value: shipments.filter((item) => item.status === "Delivered").length,
                    icon: "check",
                    note: "Completed sample journeys",
                    status: "Delivered",
                  },
                ].map((metric) => (
                  <button
                    className="tg-card tg-metric"
                    key={metric.label}
                    onClick={() => {
                      setFilter(metric.status)
                      navigate("Shipments")
                    }}
                  >
                    <div className="tg-between">
                      <span>{metric.label}</span>
                      <Icon name={metric.icon as "box"} />
                    </div>
                    <strong>{metric.value.toString().padStart(2, "0")}</strong>
                    <small>
                      {metric.note} <Icon name="arrow" size={14} />
                    </small>
                  </button>
                ))}
              </div>
              <div className="tg-overview-grid">
                <CorridorMap shipments={initialShipments.slice(0, 3)} onSelect={openShipment} />
                <section className="tg-quick-panel">
                  <span className="tg-eyebrow">NEXT MOVE</span>
                  <h2>
                    Where are we
                    <br />
                    taking your business?
                  </h2>
                  <p>Plan a shipment across borders with clarity from the start.</p>
                  <button className="tg-primary" onClick={() => navigate("Get a quote")}>
                    Explore a quote <Icon name="arrow" size={18} />
                  </button>
                  <hr />
                  <h3>Have a shipment reference?</h3>
                  <form onSubmit={track} className="tg-inline-track">
                    <label className="tg-sr-only" htmlFor="overview-track">
                      Tracking reference
                    </label>
                    <input
                      id="overview-track"
                      value={tracking}
                      onChange={(e) => setTracking(e.target.value)}
                      placeholder="e.g. TH-260184"
                      required
                    />
                    <button className="tg-icon-button" aria-label="Track reference">
                      <Icon name="arrow" />
                    </button>
                  </form>
                  {trackingError && (
                    <p role="alert" className="tg-error">
                      {trackingError}
                    </p>
                  )}
                  <p className="tg-small">Try TH-260184 · demo reference</p>
                </section>
              </div>
              <section className="tg-card tg-recent">
                <div className="tg-between">
                  <div>
                    <h2>Your shipments</h2>
                    <p>A little visibility goes a long way.</p>
                  </div>
                  <button
                    className="tg-text-button"
                    onClick={() => {
                      setFilter("All shipments")
                      navigate("Shipments")
                    }}
                  >
                    View all shipments <Icon name="arrow" size={16} />
                  </button>
                </div>
                <ShipmentTable shipments={shipments.slice(0, 4)} onSelect={openShipment} />
              </section>
            </>
          )}
          {page === "Shipments" && (
            <section className="tg-card">
              <div className="tg-filters">
                <label className="tg-search">
                  <Icon name="search" />
                  <input
                    aria-label="Search shipments"
                    placeholder="Search reference, cargo reference or city"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </label>
                <select
                  aria-label="Filter shipments by status"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  {[
                    "All shipments",
                    "In transit",
                    "Attention needed",
                    "Booking requested",
                    "Delivered",
                  ].map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
                <span className="tg-small" role="status">
                  {filtered.length} shipments
                </span>
              </div>
              <ShipmentTable shipments={filtered} onSelect={openShipment} />
            </section>
          )}
          {page === "Get a quote" && (
            <QuoteBuilder
              quote={quote}
              request={draft}
              setRequest={(request) => {
                setDraft(request)
                setQuote(null)
              }}
              onCreate={newQuote}
              onSelect={(id) => {
                setOfferId(id)
                navigate("Booking")
              }}
              onApprove={() => setQuote(quote ? { ...quote, approved: true } : null)}
            />
          )}
          {page === "Booking" && quote && (
            <BookingReview
              key={`${quote.id}-${offerId}`}
              quote={quote}
              offerId={offerId}
              onConfirm={confirm}
              onBack={() => navigate("Get a quote")}
            />
          )}
          {page === "Shipment details" && (
            <ShipmentDetail
              key={selected.id}
              shipment={selected}
              onSupport={() => navigate("Help & support")}
            />
          )}
          {page === "Track a shipment" && (
            <section className="tg-card tg-tracking-card">
              <span className="tg-large-icon">
                <Icon name="track" size={36} />
              </span>
              <h2>One reference. The whole journey.</h2>
              <p>Enter a sample shipment reference to explore its current scenario.</p>
              <form onSubmit={track} className="tg-track-form">
                <label htmlFor="track-reference">Shipment reference</label>
                <div>
                  <input
                    id="track-reference"
                    required
                    autoComplete="off"
                    value={tracking}
                    onChange={(e) => setTracking(e.target.value)}
                    placeholder="TH-260184"
                  />
                  <button className="tg-primary">
                    Track shipment <Icon name="arrow" />
                  </button>
                </div>
              </form>
              {trackingError && (
                <p className="tg-error" role="alert">
                  {trackingError}
                </p>
              )}
              <div className="tg-example-refs">
                Try a scenario:{" "}
                {initialShipments.slice(0, 3).map((item) => (
                  <button
                    className="tg-text-button"
                    key={item.id}
                    onClick={() => {
                      setTracking(item.id)
                      openShipment(item)
                    }}
                  >
                    {item.id}
                  </button>
                ))}
              </div>
              <p className="tg-small">
                Only fixtures and demo requests in this session can be found. This is not a public
                shipment lookup.
              </p>
            </section>
          )}
          {page === "Documents" && (
            <section className="tg-card">
              <label className="tg-form">
                Choose a demo shipment
                <select
                  value={selected.id}
                  onChange={(e) =>
                    setSelected(shipments.find((item) => item.id === e.target.value)!)
                  }
                >
                  {shipments.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.id} · {item.reference}
                    </option>
                  ))}
                </select>
              </label>
              <DocumentChecklist shipment={selected} />
            </section>
          )}
          {page === "Help & support" && <Support shipmentId={selected.id} />}
          <footer className="tg-footer">
            <span>
              © 2026 Thamani Global <span>· A Nabhold Group Africa company</span>
            </span>
            <span>Designed for business. Built around your journey.</span>
          </footer>
        </main>
      </div>
    </div>
  )
}
