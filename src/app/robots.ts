import type { MetadataRoute } from "next"
import { getPublicEnvironment } from "@/lib/configuration/environment"
export default function robots(): MetadataRoute.Robots {
  const { NEXT_PUBLIC_SITE_URL } = getPublicEnvironment()
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/workspace",
          "/quotes",
          "/bookings",
          "/tracking",
          "/shipments",
          "/documents",
          "/support",
          "/account/",
          "/cart",
          "/checkout",
          "/order-confirmation",
        ],
      },
    ],
    sitemap: `${NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  }
}
