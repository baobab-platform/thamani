import assert from "node:assert/strict"
import { spawnSync } from "node:child_process"
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import test from "node:test"

const script = resolve(dirname(fileURLToPath(import.meta.url)), "check-performance-budget.mjs")

test("DEV-11 preserves actual measurements and refuses over-budget CSS", async () => {
  const root = await mkdtemp(join(tmpdir(), "thamani-dev11-budget-"))
  try {
    const chunks = join(root, ".next", "static", "chunks")
    const assets = join(root, "public")
    await mkdir(chunks, { recursive: true })
    await mkdir(assets, { recursive: true })
    await writeFile(join(chunks, "main.js"), Buffer.alloc(1024))
    await writeFile(join(chunks, "main.css"), Buffer.alloc(1024))
    await writeFile(join(assets, "hero.png"), Buffer.alloc(512))

    const run = () => spawnSync(process.execPath, [script], { cwd: root, encoding: "utf8" })
    const passing = run()
    assert.equal(passing.status, 0, passing.stderr)
    const passEvidence = JSON.parse(
      await readFile(join(root, "reports", "static-budget.json"), "utf8"),
    )
    assert.equal(passEvidence.profile, "CI_PRODUCTION_BUILD")
    assert.equal(passEvidence.measured.allCss, 1024)
    assert.deepEqual(passEvidence.oversized, [])

    await writeFile(join(chunks, "main.css"), Buffer.alloc(64 * 1024 + 1))
    const failing = run()
    assert.notEqual(failing.status, 0)
    assert.match(failing.stderr, /Frontend budget exceeded: All emitted CSS/)
    const failureEvidence = JSON.parse(
      await readFile(join(root, "reports", "static-budget.json"), "utf8"),
    )
    assert.equal(failureEvidence.measured.allCss, 64 * 1024 + 1)
    assert.deepEqual(failureEvidence.oversized, [
      { metric: "allCss", actualBytes: 64 * 1024 + 1, limitBytes: 64 * 1024 },
    ])
    assert.equal(failureEvidence.limits.allCss, 64 * 1024)
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})
