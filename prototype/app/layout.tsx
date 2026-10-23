import type { Metadata } from "next"
import "@baobab-platform/experience-tokens/base.css"
import "@baobab-platform/experience-ui/styles.css"
import "../../src/components/logistics/prototype/prototype.css"

export const metadata: Metadata = {
  title: "Thamani Global · Logistics workspace prototype",
  description: "Interactive B2B logistics customer workspace. Synthetic scenarios only.",
  robots: { index: false, follow: false },
}

export default function PrototypeLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
