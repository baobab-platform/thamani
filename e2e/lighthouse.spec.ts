import { execFile } from "node:child_process"
import { readFile, readdir } from "node:fs/promises"
import { join } from "node:path"
import { promisify } from "node:util"
import { expect, test } from "@playwright/test"

const run = promisify(execFile)

async function findChrome(directory: string): Promise<string | null> {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name)
    if (entry.isFile() && ["chrome", "headless_shell"].includes(entry.name)) return path
    if (entry.isDirectory()) {
      const nested = await findChrome(path)
      if (nested) return nested
    }
  }
  return null
}

test("public homepage and quote experience meet Lighthouse lab budgets", async ({
  page,
}, testInfo) => {
  test.skip(
    !process.env.CI || testInfo.project.name !== "chromium",
    "One isolated production-build Chromium lab owns performance receipts",
  )
  test.setTimeout(200_000)
  await page.goto("/")
  const chrome = await findChrome(
    process.env.PLAYWRIGHT_BROWSERS_PATH || "/root/.cache/ms-playwright",
  )
  expect(chrome).not.toBeNull()

  for (const route of ["/", "/quotes"]) {
    const label = route === "/" ? "home" : "quotes"
    const output = testInfo.outputPath("lighthouse-" + label + ".json")
    await run(
      "lighthouse",
      [
        "http://127.0.0.1:3000" + route,
        "--quiet",
        "--output=json",
        "--output-path=" + output,
        "--chrome-flags=--headless --no-sandbox --disable-dev-shm-usage",
        "--only-categories=performance,accessibility,best-practices,seo",
      ],
      {
        env: { ...process.env, CHROME_PATH: chrome! },
        timeout: 80_000,
        maxBuffer: 4_000_000,
      },
    )
    const report = JSON.parse(await readFile(output, "utf8"))
    await testInfo.attach("thamani-lighthouse-" + label, {
      path: output,
      contentType: "application/json",
    })
    const scores = Object.fromEntries(
      Object.entries(report.categories).map(([name, value]) => [
        name,
        Math.round((value as { score: number }).score * 100),
      ]),
    )
    const scripts = report.audits["resource-summary"].details.items.find(
      (item: { resourceType: string }) => item.resourceType === "script",
    )
    expect(scripts?.transferSize ?? 0, "Transferred scripts (" + route + ")").toBeLessThanOrEqual(
      250 * 1024,
    )
    console.log(
      JSON.stringify({
        route,
        profile: "CI_LAB_PRODUCTION_BUILD",
        scores,
        transferredScriptBytes: scripts?.transferSize ?? null,
        lcp: report.audits["largest-contentful-paint"].numericValue,
        cls: report.audits["cumulative-layout-shift"].numericValue,
      }),
    )
    expect(scores.performance).toBeGreaterThanOrEqual(90)
    for (const category of ["accessibility", "best-practices", "seo"]) {
      expect(scores[category], route + " " + category).toBeGreaterThanOrEqual(95)
    }
    expect(report.audits["cumulative-layout-shift"].numericValue).toBeLessThanOrEqual(
      0.1,
    )
    // LCP is recorded, but one throttled load is NOT field p75 LCP/INP.
  }
})
