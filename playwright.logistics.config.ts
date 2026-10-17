import { defineConfig } from "@playwright/test"
/** Real components and published packages, isolated from legacy retail routes. */
export default defineConfig({
  testDir: "./tests/browser",
  testMatch: "*.spec.ts",
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: { baseURL: "http://127.0.0.1:4173", trace: "retain-on-failure" },
  projects: [
    { name: "desktop", use: { browserName: "chromium", viewport: { width: 1440, height: 900 } } },
    {
      name: "mobile",
      use: {
        browserName: "chromium",
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
  webServer: {
    command: "pnpm exec vite --config tests/browser/vite.config.ts",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: !process.env.CI,
  },
})
