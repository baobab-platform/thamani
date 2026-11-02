import { defineConfig, devices } from "@playwright/test"
const evidenceGates = new Set(["functional", "accessibility", "visual", "lighthouse"])
const evidenceGate = process.env.CI && evidenceGates.has(process.env.DEV11_EVIDENCE_GATE ?? "")
  ? process.env.DEV11_EVIDENCE_GATE
  : undefined

export default defineConfig({
  reporter: evidenceGate
    ? [
        ["list"],
        ["html", { open: "never", outputFolder: `playwright-report/dev11-${evidenceGate}` }],
        ["json", { outputFile: `reports/dev11-${evidenceGate}-playwright.json` }],
      ]
    : process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  ...(evidenceGate ? { outputDir: `test-results/dev11-${evidenceGate}` } : {}),
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  testDir: "./e2e",
  testIgnore: process.env.THAMANI_LIGHTHOUSE_ONLY === "true" ? [] : ["**/lighthouse.spec.ts"],
  use: { baseURL: "http://127.0.0.1:3000", trace: "on-first-retry" },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: process.env.CI ? "pnpm start" : "pnpm build && pnpm start",
    url: "http://127.0.0.1:3000/api/health",
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
  },
})
