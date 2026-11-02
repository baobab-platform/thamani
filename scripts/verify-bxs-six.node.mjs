import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

// Fail a frozen-lockfile consumer drift without relying on a registry re-resolve.
test("all six verified Shared releases remain exact direct dependencies", async () => {
  const pkg = JSON.parse(await readFile("package.json", "utf8"))
  const lock = await readFile("pnpm-lock.yaml", "utf8")
  const workspace = await readFile("pnpm-workspace.yaml", "utf8")
  const versions = {
    "experience-tokens": "0.3.1",
    "experience-ui": "0.3.1",
    "experience-geo-core": "0.3.1",
    "experience-charts": "0.1.0",
    "experience-geo-maplibre": "0.2.0",
    "experience-geo-deckgl": "0.1.0",
  }
  for (const [shortName, version] of Object.entries(versions)) {
    const name = "@baobab-platform/" + shortName
    assert.equal(pkg.dependencies[name], version)
    assert.match(lock, new RegExp("['\\\"]?" + name.replace("/", "\\/") + "['\\\"]?:\\n\\s+specifier: " + version.replaceAll(".", "\\.")))
    assert.ok(workspace.includes(name + "@" + version), name + " must retain its independently verified registry age exception")
  }
  assert.equal(pkg.dependencies["@baobab-platform/experience-storybook"], undefined)
})
