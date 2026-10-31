import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { ConfidentialAuthPanel } from "./confidential-auth-panel"

export const metadata: Metadata = {
  title: "Business identity",
  robots: { index: false, follow: false },
}

export const dynamic = "force-dynamic"

export default function SignInPage() {
  // Real IAM/CP credentials are provisioned by owners. No demo identity,
  // Medusa customer cookie or first-party session impersonation fallback.
  if (
    process.env.THAMANI_OIDC_ENABLED !== "true" ||
    !["development", "integration", "staging"].includes(
      process.env.THAMANI_OIDC_ENVIRONMENT ?? "",
    )
  ) {
    notFound()
  }

  return (
    <>
      <SiteHeader />
      <main id="main" className="container" style={{ paddingBlock: "4rem", maxWidth: "55rem" }}>
        <p className="eyebrow">THAMANI GLOBAL · GOVERNED IDENTITY</p>
        <h1 style={{ fontSize: "clamp(2rem, 6vw, 4rem)", lineHeight: 1.1 }}>
          Business sign-in
        </h1>
        <p style={{ maxWidth: "65ch", color: "var(--color-muted)" }}>
          Authenticate through the Baobab identity provider. Access to a customer organisation,
          market, logistics quote or shipment remains subject to the current Control Plane
          and native service permissions. Signing in does not grant permission to book.
        </p>
        <section aria-label="Private business sign-in" className="stack" style={{ marginTop: "2rem" }}>
          <ConfidentialAuthPanel />
        </section>
        <p style={{ marginTop: "1.5rem" }}>
          <Link href="/workspace">Explore the separate synthetic logistics workspace</Link>
        </p>
        <p className="eyebrow">Private session · No browser-held access tokens</p>
      </main>
      <SiteFooter />
    </>
  )
}
