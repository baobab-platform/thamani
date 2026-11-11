import type { MetadataRoute } from "next"
import { getPublicEnvironment } from "@/lib/configuration/environment"
export default function sitemap(): MetadataRoute.Sitemap {
  const { NEXT_PUBLIC_SITE_URL } = getPublicEnvironment()
  return [""].map((path) => ({
    url: `${NEXT_PUBLIC_SITE_URL}${path}`,
    changeFrequency: path === "" ? "weekly" : "daily",
  }))
}
