import { test, expect, type Page } from "@playwright/test"
import { createRequire } from "node:module"
import { resolve } from "node:path"
import type { AxeResults } from "axe-core"

const require = createRequire(resolve(process.cwd(), "package.json"))
// The complete multi-screen journey includes several independent axe scans.
test.setTimeout(90_000)
async function navigate(page: Page, name: string) {
  const menu = page.getByRole("button", { name: "Open navigation" })
  if (await menu.isVisible()) await menu.click()
  await page
    .getByRole("navigation", { name: "Workspace" })
    .getByRole("button", { name, exact: true })
    .click()
}
async function checkAccessibility(page: Page) {
  await page.addScriptTag({ path: require.resolve("axe-core/axe.min.js") })
  const result = await page.evaluate(async () => {
    const axe = (
      window as unknown as {
        axe: { run: (target: Element, options: unknown) => Promise<AxeResults> }
      }
    ).axe
    return axe.run(document.body, {
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"] },
    })
  })
  expect(result.violations).toEqual([])
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
}

test("customer quote → booking request → track, on desktop and mobile", async ({
  page,
}, testInfo) => {
  await page.goto("/prototype.html")
  await checkAccessibility(page)
  await page.screenshot({ path: testInfo.outputPath("prototype-overview.png"), timeout: 10_000 })
  await navigate(page, "Get a quote")
  await page.getByRole("combobox", { name: "Destination", exact: true }).selectOption("Kampala, UG")
  await page.getByRole("button", { name: "Compare demo services" }).click()
  await expect(page.getByRole("alert")).toContainText("different origin")
  await page
    .getByRole("combobox", { name: "Destination", exact: true })
    .selectOption("Johannesburg, ZA")
  await page.getByRole("button", { name: "Compare demo services" }).click()
  await expect(page.getByText("DEMO-Q-001 · Version 1")).toBeVisible()
  await checkAccessibility(page)
  await page.getByRole("button", { name: "Review booking" }).nth(1).click()
  await expect(page.getByRole("alert")).toContainText("Simulate company approval")
  await page.getByRole("button", { name: "Back to quote" }).click()
  await page.getByRole("button", { name: "Simulate company approval for Priority" }).click()
  await page.getByRole("button", { name: "Review booking" }).nth(1).click()
  await expect(page.getByRole("button", { name: "Create demo booking" })).toBeDisabled()
  await page.getByRole("checkbox").check()
  await checkAccessibility(page)
  await page.getByRole("button", { name: "Create demo booking" }).click()
  await expect(page.getByRole("status")).toContainText("DEMO-B-001 created")
  await expect(page.getByRole("heading", { name: "DEMO-B-001" })).toBeVisible()
  await expect(page.getByText(/Sample milestone/)).toHaveCount(0)
  await checkAccessibility(page)
  await page.getByRole("tab", { name: "Milestones" }).focus()
  await page.keyboard.press("ArrowRight")
  await expect(page.getByRole("tab", { name: "Cargo & route" })).toBeFocused()
  await page.keyboard.press("Enter")
  await expect(page.getByRole("tabpanel")).toContainText("1,200 kg")
  await page.screenshot({
    path: testInfo.outputPath("prototype-booking-details.png"),
    timeout: 10_000,
  })
  await navigate(page, "Track a shipment")
  await page.getByLabel("Shipment reference").fill("UNKNOWN")
  await page.getByRole("button", { name: "Track shipment" }).click()
  await expect(page.getByRole("alert")).toContainText("No matching demo shipment")
  await page.getByLabel("Shipment reference").fill("demo-b-001")
  await page.getByRole("button", { name: "Track shipment" }).click()
  await expect(page.getByRole("heading", { name: "DEMO-B-001" })).toBeVisible()
  await navigate(page, "Get a quote")
  await expect(page.getByRole("button", { name: "Review booking" }).first()).toBeDisabled()
  await page.getByRole("button", { name: "Reset demo" }).click()
  await expect(page.getByRole("heading", { name: "Your cargo. Connected." })).toBeVisible()
})

test("shipment filtering, document checklist and support remain useful", async ({ page }) => {
  await page.goto("/prototype.html")
  await navigate(page, "Shipments 4")
  await page.getByLabel("Search shipments").fill("TH-260183")
  await expect(page.getByRole("rowgroup").nth(1).getByRole("row")).toHaveCount(1)
  await page.getByRole("button", { name: "TH-260183", exact: true }).click()
  await page.getByRole("tab", { name: "Documents", exact: true }).click()
  await expect(page.getByRole("tabpanel")).toContainText("Missing")
  await checkAccessibility(page)
  await page.getByRole("button", { name: "Contact your coordinator" }).click()
  await page.getByLabel("Test message").fill("Fictitious packing list question.")
  await page.getByRole("button", { name: "Simulate support request" }).click()
  await expect(page.getByRole("status")).toContainText("No message was sent")
})
