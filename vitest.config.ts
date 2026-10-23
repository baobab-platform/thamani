import { configDefaults, defineConfig } from "vitest/config"
import path from "node:path"
export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    exclude: [
      ...configDefaults.exclude,
      "e2e/**",
      "tests/browser/**",
      ".next/**",
      "prototype/.next/**",
      "prototype/out/**",
    ],
  },
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
})
