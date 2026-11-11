import type { NextConfig } from "next"
import { resolve } from "node:path"

const config: NextConfig = {
  output: "export",
  poweredByHeader: false,
  reactStrictMode: true,
  outputFileTracingRoot: resolve(import.meta.dirname, ".."),
}
export default config
