import { expect, test } from "@playwright/test"
import { createRequire } from "node:module"

const require = createRequire(import.meta.url)

test("home is keyboard-readable and has no serious accessibility violations", async ({ page }) => {
  await page.goto("/")
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Africa connected")
  await page.addScriptTag({ path: require.resolve("axe-core/axe.min.js") })
  const violations = await page.evaluate(async () => {
    const axe = (
      window as typeof window & {
        axe: { run: () => Promise<{ violations: Array<{ impact: string | null; id: string }> }> }
      }
    ).axe
    const result = await axe.run()
    return result.violations.filter(({ impact }) => impact === "critical" || impact === "serious")
  })
  expect(violations).toEqual([])
})

test("cart and checkout are not indexable", async ({ page }) => {
  for (const path of ["/cart", "/checkout"]) {
    await page.goto(path)
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/)
  }
})

test("landing links reach logistics routes and preserve quote state with browser history", async ({
  page,
}) => {
  await page.goto("/")
  await page.getByRole("link", { name: "Get a demo quote" }).click()
  await expect(page).toHaveURL(/\/quotes$/)
  await page.getByRole("button", { name: "Compare demo services" }).click()
  await page.getByRole("button", { name: "Review booking" }).first().click()
  await expect(page).toHaveURL(/\/bookings$/)
  await page.goBack()
  await expect(page).toHaveURL(/\/quotes$/)
  await expect(page.getByText("DEMO-Q-001 · Version 1")).toBeVisible()
  await page.goForward()
  await page.getByRole("checkbox").check()
  await page.getByRole("button", { name: "Create demo booking" }).click()
  await expect(page).toHaveURL(/\/shipments\/DEMO-B-001$/)
  await expect(page.getByRole("heading", { name: "DEMO-B-001" })).toBeVisible()
  await page.reload()
  await expect(
    page.getByRole("heading", { name: "Shipment unavailable in this demo session" }),
  ).toBeVisible()
})

test("direct routes, recovery screens and retired retail links", async ({ page }) => {
  await page.goto("/shipments/TH-260184")
  await expect(page.getByRole("heading", { name: "TH-260184" })).toBeVisible()
  await page.goto("/bookings")
  await expect(page.getByRole("heading", { name: "Start with a quote" })).toBeVisible()
  for (const path of ["/workspace", "/shipments", "/tracking", "/documents", "/support"]) {
    await page.goto(path)
    await expect(page.getByRole("main")).toBeVisible()
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/)
  }
  await page.goto("/shop")
  await expect(page).toHaveURL(/\/quotes$/)
})
