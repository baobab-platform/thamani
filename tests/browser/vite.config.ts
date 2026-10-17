import { defineConfig } from "vite"
import { resolve } from "node:path"

/** Loopback-only acceptance harness; never part of the production route tree. */
export default defineConfig({
  root: resolve(process.cwd(), "tests/browser"),
  resolve: { alias: { "@": resolve(process.cwd(), "src") } },
  server: { host: "127.0.0.1", port: 4173, strictPort: true, fs: { allow: [process.cwd()] } },
})
