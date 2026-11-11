import { useEffect, useState, type FormEvent } from "react"
import {
  places,
  requestSchema,
  demoMoney,
  quoteBookability,
  type DemoRequest,
  type DemoQuote,
} from "@/lib/logistics/prototype"
import { Icon } from "./icon"

export function QuoteBuilder({
  quote,
  request,
  setRequest,
  onCreate,
  onSelect,
  onApprove,
}: {
  quote: DemoQuote | null
  request: DemoRequest
  setRequest: (request: DemoRequest) => void
  onCreate: (request: DemoRequest) => void
  onSelect: (id: string) => void
  onApprove: () => void
}) {
  const [error, setError] = useState("")
  function submit(event: FormEvent) {
    event.preventDefault()
    const parsed = requestSchema.safeParse(request)
    if (!parsed.success) {
      setError(parsed.error.issues[0].message)
      return
    }
    setError("")
    onCreate(parsed.data)
  }
  return (
    <div className="tg-quote-layout">
      <section className="tg-card">
        <div className="tg-card-heading">
          <span className="tg-step">01</span>
          <div>
            <h2>Tell us what’s moving</h2>
            <p>A few details to explore your options.</p>
          </div>
        </div>
        <form className="tg-form" onSubmit={submit}>
          <div className="tg-field-pair">
            <label>
              Origin
              <select
                value={request.origin}
                onChange={(e) =>
                  setRequest({ ...request, origin: e.target.value as DemoRequest["origin"] })
                }
              >
                {places.map((place) => (
                  <option key={place}>{place}</option>
                ))}
              </select>
            </label>
            <label>
              Destination
              <select
                value={request.destination}
                onChange={(e) =>
                  setRequest({
                    ...request,
                    destination: e.target.value as DemoRequest["destination"],
                  })
                }
              >
                {places.map((place) => (
                  <option key={place}>{place}</option>
                ))}
              </select>
            </label>
          </div>
          <label>
            Cargo type
            <select
              value={request.cargo}
              onChange={(e) =>
                setRequest({ ...request, cargo: e.target.value as DemoRequest["cargo"] })
              }
            >
              {["General cargo", "Agricultural products", "Equipment & machinery"].map((cargo) => (
                <option key={cargo}>{cargo}</option>
              ))}
            </select>
          </label>
          <div className="tg-field-pair">
            <label>
              Total weight (kg)
              <input
                type="number"
                required
                min="1"
                max="24000"
                value={request.weight}
                onChange={(e) => setRequest({ ...request, weight: Number(e.target.value) })}
              />
            </label>
            <label>
              Pallets
              <input
                type="number"
                required
                min="1"
                max="24"
                value={request.pallets}
                onChange={(e) => setRequest({ ...request, pallets: Number(e.target.value) })}
              />
            </label>
          </div>
          <fieldset>
            <legend>Transport mode</legend>
            <div className="tg-modes">
              {(["Road", "Air", "Ocean"] as const).map((mode) => (
                <label key={mode} className={request.mode === mode ? "selected" : ""}>
                  <input
                    type="radio"
                    name="mode"
                    value={mode}
                    checked={request.mode === mode}
                    onChange={() => setRequest({ ...request, mode })}
                  />
                  <Icon name={mode === "Road" ? "truck" : mode === "Air" ? "air" : "globe"} />
                  {mode}
                </label>
              ))}
            </div>
          </fieldset>
          {error && (
            <p role="alert" className="tg-error">
              {error}
            </p>
          )}
          <button className="tg-primary" type="submit">
            Compare demo services <Icon name="arrow" />
          </button>
          <p className="tg-small">
            Scenario rates only. Changing cargo or weight does not price a real shipment. Duties,
            taxes and insurance are excluded.
          </p>
        </form>
      </section>
      <section aria-label="Service comparison" aria-live="polite">
        {quote ? (
          <>
            <div className="tg-comparison-heading">
              <span className="tg-eyebrow">{quote.id} · Version 1</span>
              <h2>Your journey. Your choice.</h2>
              <p>
                {quote.request.origin} → {quote.request.destination} · {quote.request.mode}
              </p>
              <p className="tg-small">
                Demo quote valid for 30 minutes from creation. Transit windows are illustrative.
              </p>
            </div>
            {quote.offers.map((offer) => (
              <article className="tg-card tg-offer" key={offer.id}>
                <div className="tg-between">
                  <h3>{offer.name}</h3>
                  <span className="tg-pill">{offer.days}</span>
                </div>
                <p>
                  {offer.id === "standard"
                    ? "A balanced option for planned replenishment."
                    : "For time-sensitive cargo with company review."}
                </p>
                <strong className="tg-price">
                  {demoMoney(offer.amount)} <span>sample total</span>
                </strong>
                <div className="tg-between">
                  <span className="tg-small">
                    {offer.approvalRequired
                      ? quote.approved
                        ? "Demo approval recorded"
                        : "Company approval scenario"
                      : "Standard service scenario"}
                  </span>
                  <button
                    className="tg-secondary"
                    disabled={Boolean(quote.bookedId)}
                    onClick={() => onSelect(offer.id)}
                  >
                    Review booking <Icon name="arrow" size={16} />
                  </button>
                </div>
              </article>
            ))}
            {!quote.approved && !quote.bookedId && (
              <button className="tg-text-button" onClick={onApprove}>
                <Icon name="check" size={16} /> Simulate company approval for Priority
              </button>
            )}
            {quote.bookedId && (
              <p className="tg-success">
                Request {quote.bookedId} created. Create another quote to start a new request.
              </p>
            )}
          </>
        ) : (
          <div className="tg-empty">
            <span className="tg-large-icon">
              <Icon name="quote" size={36} />
            </span>
            <h2>A clear route starts here.</h2>
            <p>
              Compare two sample service options, explore the approval step, then carry your quote
              into a booking request.
            </p>
            <ol className="tg-simple-steps">
              <li>Describe your cargo</li>
              <li>Compare service options</li>
              <li>Review and request a booking</li>
            </ol>
          </div>
        )}
      </section>
    </div>
  )
}

export function BookingReview({
  quote,
  offerId,
  onConfirm,
  onBack,
}: {
  quote: DemoQuote
  offerId: string
  onConfirm: (reference: string) => void
  onBack: () => void
}) {
  const [reference, setReference] = useState("TEST-PO-045")
  const [accepted, setAccepted] = useState(false)
  const [error, setError] = useState("")
  const offer = quote.offers.find((item) => item.id === offerId)!
  const [now, setNow] = useState(Date.now)
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(timer)
  }, [])
  const blocked = quoteBookability(quote, offerId, now)
  function confirm(event: FormEvent) {
    event.preventDefault()
    const reason = quoteBookability(quote, offerId, Date.now())
    if (reason) {
      setError(reason)
      return
    }
    if (!accepted) {
      setError("Acknowledge the demo request before continuing.")
      return
    }
    onConfirm(reference)
  }
  return (
    <div className="tg-book-layout">
      <section className="tg-card">
        <div className="tg-card-heading">
          <span className="tg-step">02</span>
          <div>
            <h2>Review your booking request</h2>
            <p>Your quote details travel with you.</p>
          </div>
        </div>
        <dl className="tg-definition-grid">
          <div>
            <dt>Customer organisation</dt>
            <dd>Acacia Exports · Demo</dd>
          </div>
          <div>
            <dt>Quote reference</dt>
            <dd>{quote.id} · Version 1</dd>
          </div>
          <div>
            <dt>Collection city</dt>
            <dd>{quote.request.origin}</dd>
          </div>
          <div>
            <dt>Delivery city</dt>
            <dd>{quote.request.destination}</dd>
          </div>
          <div>
            <dt>Cargo</dt>
            <dd>{quote.request.cargo}</dd>
          </div>
          <div>
            <dt>Load</dt>
            <dd>
              {quote.request.weight.toLocaleString()} kg · {quote.request.pallets} pallets
            </dd>
          </div>
        </dl>
        <form className="tg-form" onSubmit={confirm}>
          <label>
            Your test reference
            <input
              value={reference}
              required
              maxLength={60}
              onChange={(e) => setReference(e.target.value)}
              autoComplete="off"
            />
            <span className="tg-small">
              Use fictitious details only. No personal or commercial information.
            </span>
          </label>
          <label className="tg-checkbox">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
            />
            I understand this creates a demo request only. No cargo will be collected.
          </label>
          {(blocked || error) && (
            <p role="alert" className="tg-error">
              {blocked || error}
            </p>
          )}
          <div className="tg-actions">
            <button className="tg-secondary" type="button" onClick={onBack}>
              Back to quote
            </button>
            <button className="tg-primary" disabled={Boolean(blocked) || !accepted} type="submit">
              Create demo booking <Icon name="arrow" />
            </button>
          </div>
        </form>
      </section>
      <aside className="tg-summary">
        <span className="tg-eyebrow">Service summary</span>
        <h2>
          {quote.request.mode} · {offer.name}
        </h2>
        <p>Illustrative transit: {offer.days}</p>
        <strong className="tg-price">{demoMoney(offer.amount)}</strong>
        <p>Sample amount · excludes duties, taxes and insurance.</p>
        <hr />
        <h3>What happens next?</h3>
        <p>
          Your demo request appears in Shipments. In a connected service, Thamani would validate
          authority and contract terms before TMS confirms a booking.
        </p>
        <span className="tg-pill">No payment or carrier reservation</span>
      </aside>
    </div>
  )
}
