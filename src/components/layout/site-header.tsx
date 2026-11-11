import Link from "next/link"
export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Thamani Global home">
        THAMANI<small>GLOBAL LOGISTICS</small>
      </Link>
      <nav aria-label="Primary">
        <Link href="/#services">Services</Link>
        <Link href="/quotes">Get a quote</Link>
        <Link href="/tracking">Track shipment</Link>
        <Link href="/workspace">Workspace →</Link>
      </nav>
    </header>
  )
}
