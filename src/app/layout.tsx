import type { Metadata } from "next"
import "./globals.css"
// Neutral namespaced BXS only. Do not import the unapproved legacy retail theme.
import "@baobab-platform/experience-tokens/base.css"
import "@baobab-platform/experience-ui/styles.css"
export const metadata: Metadata = {
  title: { default: "Thamani Global | Integrated logistics", template: "%s | Thamani" },
  description:
    "Integrated logistics for businesses. Explore the Thamani shipping and logistics prototype.",
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
