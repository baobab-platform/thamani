import Link from "next/link"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import "./logistics-landing.css"

const journeys = [
  [
    "01",
    "Plan your shipment",
    "Compare sample road, air and ocean offers, then review a simulated booking request.",
    "/quotes",
    "Explore quotes",
  ],
  [
    "02",
    "Follow the movement",
    "Look up a sample reference and explore shipment milestones, cargo and next actions.",
    "/tracking",
    "Track a shipment",
  ],
  [
    "03",
    "Keep the details together",
    "Browse your demo shipment portfolio and document checklists in one workspace.",
    "/workspace",
    "Open workspace",
  ],
] as const
export default function HomePage() {
  return (
    <div className="logistics-landing">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <section className="logistics-hero container">
          <div>
            <p className="eyebrow">THAMANI GLOBAL · BUSINESS LOGISTICS</p>
            <h1>
              Africa connected.
              <br />
              Business moving.
            </h1>
            <p>
              From the first quote to the final mile. Explore a connected shipping experience for
              businesses moving cargo across borders.
            </p>
            <div className="landing-actions">
              <Link className="button" href="/quotes">
                Get a demo quote →
              </Link>
              <Link className="landing-secondary" href="/tracking">
                Track a shipment
              </Link>
            </div>
            <p className="landing-disclosure">
              Interactive prototype · Synthetic data · No live quotes, bookings or tracking
            </p>
          </div>
          <aside className="landing-journey" aria-label="Example shipment journey">
            <p className="eyebrow">A CLEARER VIEW OF EVERY MOVE</p>
            <h2>Nairobi → Kampala</h2>
            <p>Sample road freight corridor</p>
            <ol>
              <li>
                Plan your route <span>Compare demo services</span>
              </li>
              <li>
                Review your request <span>See costs and approval steps</span>
              </li>
              <li>
                Follow the journey <span>Explore synthetic milestones</span>
              </li>
            </ol>
            <Link href="/shipments/TH-260184">Explore a sample shipment →</Link>
          </aside>
        </section>
        <section className="container landing-section" id="services">
          <p className="eyebrow">ONE CONNECTED CUSTOMER EXPERIENCE</p>
          <h2>Your next move starts here.</h2>
          <div className="landing-grid">
            {journeys.map(([number, title, description, href, label]) => (
              <article key={number}>
                <span className="landing-number">{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <Link href={href}>{label} →</Link>
              </article>
            ))}
          </div>
        </section>
        <section className="container landing-section landing-services">
          <div>
            <p className="eyebrow">BUILT AROUND BUSINESS CARGO</p>
            <h2>
              Road. Air. Ocean.
              <br />A connected perspective.
            </h2>
          </div>
          <div>
            <p>
              Try the logistics journey with a sample business account. Compare transport options,
              practise a company approval and inspect shipment document requirements.
            </p>
            <p>
              All changes stay in your current demo session. Refreshing clears quotes and simulated
              requests. No transport, document submission or support message is executed.
            </p>
            <div className="landing-actions">
              <Link href="/documents">Document checklists →</Link>
              <Link href="/support">Help & support →</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
