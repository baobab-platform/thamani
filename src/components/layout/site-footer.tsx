import Link from "next/link"
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>
        Thamani Global
        <br />
        <small>Integrated logistics for businesses · Interactive prototype</small>
      </p>
      <nav aria-label="Footer">
        <Link href="/shipments">Shipments</Link>
        <Link href="/documents">Documents</Link>
        <Link href="/support">Help & support</Link>
      </nav>
    </footer>
  )
}
