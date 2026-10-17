import type { Metadata } from "next"
import "./globals.css"
// Neutral namespaced BXS only. Do not import the unapproved legacy retail theme.
import "@baobab-platform/experience-tokens/base.css"
import "@baobab-platform/experience-ui/styles.css"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
export const metadata: Metadata = {
  title: { default: "Thamani | Everyday value, thoughtfully selected", template: "%s | Thamani" },
  description:
    "A consumer retail destination for considered products across categories and markets.",
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
