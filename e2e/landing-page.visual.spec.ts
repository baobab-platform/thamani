import { expect, test } from "@playwright/test"

// These are layout assertions plus original screenshot evidence, NOT a newly
// approved brand/golden pixel baseline. The existing synthetic-workspace
// snapshot comparison remains mandatory in the logistics-browser job.
const viewports = [
  { name: "320", width: 320, height: 640 },
  { name: "390", width: 390, height: 844 },
  { name: "768", width: 768, height: 1024 },
  { name: "1024", width: 1024, height: 900 },
  { name: "1440", width: 1440, height: 900 },
] as const

test.describe("Thamani public logistics layout and visual receipts", () => {
  test.setTimeout(60_000)
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== "chromium",
      "One deterministic Chromium profile owns the reference screenshots",
    )
  })

  for (const viewport of viewports) {
    test("public logistics layout at " + viewport.name + "px", async ({ page }, testInfo) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height })
      await page.emulateMedia({ reducedMotion: "reduce" })
      await page.goto("/", { waitUntil: "domcontentloaded" })

      const main = page.getByRole("main")
      const heading = main.getByRole("heading", { level: 1 })
      await expect(main).toHaveCount(1)
      await expect(heading).toBeVisible()
      await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible()
      await expect(page.getByRole("link", { name: "Get a demo quote" })).toBeVisible()
      await expect(page.locator(".landing-grid article")).toHaveCount(3)
      await expect(page.getByText(/No live quotes, bookings or tracking/)).toBeVisible()

      // A missing screenshot, clipped CTA or horizontal overflow fails instead
      // of silently accepting a visually broken but semantically valid page.
      const box = await heading.boundingBox()
      expect(box).not.toBeNull()
      expect(box!.x).toBeGreaterThanOrEqual(0)
      expect(box!.x + box!.width).toBeLessThanOrEqual(viewport.width + 1)
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
      ).toBe(true)

      await page.evaluate(() => document.fonts.ready)
      const png = await page.screenshot({
        fullPage: true,
        animations: "disabled",
        caret: "hide",
        scale: "css",
      })
      await testInfo.attach("thamani-public-landing-" + viewport.name, {
        body: png,
        contentType: "image/png",
      })
    })
  }
})
