import { createRequire } from "node:module"
import { resolve } from "node:path"
import { expect, test, type Page } from "@playwright/test"
import type { AxeResults } from "axe-core"

const require = createRequire(resolve(process.cwd(), "package.json"))

async function noViolations(page: Page) {
  await page.addScriptTag({ path: require.resolve("axe-core/axe.min.js") })
  const result = await page.evaluate(async () => {
    const axe = (
      window as unknown as {
        axe: { run: (target: Element, options: unknown) => Promise<AxeResults> }
      }
    ).axe
    return axe.run(document.body, {
      runOnly: {
        type: "tag",
        values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"],
      },
    })
  })
  const details = result.violations.flatMap((issue) =>
    issue.nodes.map((node) => issue.id + ": " + node.target.join(" ")),
  )
  expect(details, details.join("\n")).toEqual([])
}

test("desktop and mobile logistics landing are keyboard-accessible", async ({ page }) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto("/")
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
    await noViolations(page)
    await page.keyboard.press("Tab")
    await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused()
    await page.keyboard.press("Enter")
    await expect(page).toHaveURL(/#main$/)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(
      true,
    )
  }
})

test("quote, tracking and shipment details never claim live execution", async ({ page }) => {
  for (const route of ["/quotes", "/tracking", "/shipments/TH-260184"]) {
    await page.goto(route)
    await expect(page.getByRole("main")).toBeVisible()
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/)
    await noViolations(page)
  }
})

test("public favicon is an actual icon, not a 404 browser-console regression", async ({ page }) => {
  const response = await page.request.get("/favicon.ico")
  expect(response.status()).toBe(200)
  expect(response.headers()["content-type"]).toMatch(/image\/(?:x-icon|vnd\.microsoft\.icon)/)
  expect((await response.body()).byteLength).toBeGreaterThan(100)
})
