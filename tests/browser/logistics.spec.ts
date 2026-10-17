import { test, expect } from "@playwright/test"
import { createRequire } from "node:module"
import type { AxeResults } from "axe-core"
const require = createRequire(import.meta.url)

test("logistics tabs work with keyboard and preserve independent denials", async ({ page }) => {
  await page.goto("/")
  await page.getByRole("tab", { name: "Tracking", exact: true }).focus()
  await page.keyboard.press("ArrowRight")
  await expect(page.getByRole("tab", { name: "Route", exact: true })).toBeFocused()
  await expect(page.getByRole("tabpanel")).toContainText("Planned, not executed")
  await page.keyboard.press("End")
  await expect(page.getByRole("tab", { name: "Documents", exact: true })).toBeFocused()
  await expect(page.getByRole("alert")).toContainText("Documents access restricted")
  await page.keyboard.press("Home")
  await expect(page.getByRole("tab", { name: "Tracking", exact: true })).toBeFocused()
  await expect(page.getByText("Location not available")).toBeVisible()
  await page.addScriptTag({ path: require.resolve("axe-core/axe.min.js") })
  const report = await page.evaluate(async () => {
    const axe = (
      window as unknown as {
        axe: { run: (target: Element, options: unknown) => Promise<AxeResults> }
      }
    ).axe
    return axe.run(document.body, {
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"] },
    })
  })
  expect(report.violations).toEqual([])
  await page.emulateMedia({ reducedMotion: "reduce" })
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})

test("whole-shipment denial exposes no tabs or route data", async ({ page }) => {
  await page.goto("/?restricted=1")
  await expect(page.getByRole("tablist")).toHaveCount(0)
  await expect(page.getByRole("alert")).toContainText("Shipment workspace restricted")
  await expect(page.getByText("Origin hand-off")).toHaveCount(0)
})
