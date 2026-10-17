import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

/**
 * PR #16 reconciliation: fail closed on Foundation pin or policy drift.
 * This supplements Shared Foundation gates and does not waive security.
 */
const root = join(dirname(fileURLToPath(import.meta.url)), "..")

export function readFoundationInputs() {
  const read = (path) => readFileSync(join(root, path), "utf8")
  return {
    repository: read(".baobab/repository.yaml"),
    foundation: read(".github/workflows/foundation.yml"),
    pinning: read(".github/workflows/enforce-action-pinning.yml"),
    dependabot: read(".github/workflows/enforce-dependabot-config.yml"),
    security: read(".github/workflows/security.yml"),
    ci: read(".github/workflows/ci.yml"),
    pkg: JSON.parse(read("package.json")),
  }
}

function pinnedWorkflow(source, workflow) {
  const pattern = new RegExp(
    "uses:\\s*baobab-platform/shared/\\.github/workflows/" + workflow + "\\.yml@([a-f0-9]{40})",
  )
  const match = source.match(pattern)
  assert.ok(match, "Missing immutable Shared " + workflow + " workflow reference")
  return match[1]
}

export function verifyFoundationInputs(inputs) {
  const { repository, foundation, pinning, dependabot, security, ci, pkg } = inputs
  const selected = pinnedWorkflow(foundation, "foundation-repository-gates")
  const declared = foundation.match(/^\s*foundation_ref:\s*["']?([a-f0-9]{40})/m)
  assert.ok(declared, "Foundation caller must pass a full immutable foundation_ref")
  assert.equal(declared[1], selected, "Foundation callable and verifier pins must agree")

  for (const [source, workflow] of [
    [pinning, "enforce-action-pinning"],
    [dependabot, "enforce-dependabot-config"],
    [security, "security-codeql"],
  ]) {
    assert.equal(
      pinnedWorkflow(source, workflow),
      selected,
      "Shared " + workflow + " pin diverges from approved Foundation baseline",
    )
  }

  // The full profile activates rather than hides security and artifact gates.
  assert.match(foundation, /^\s*profile:\s*full\s*$/m)
  assert.match(foundation, /^\s*dependency_review_enabled:\s*true\s*$/m)
  for (const required of [
    "schema_version: 1",
    "  - node",
    "  - container",
    "  - digital-estate",
    "    required: true",
    "    profile: frontend",
    "    enabled: true",
    "    dockerfile: Dockerfile",
    "    runtime: true",
    "  sast_provider: fallback",
  ]) {
    assert.ok(repository.includes(required), "Missing repository declaration: " + required)
  }

  // Fallback SAST replaces unavailable private-GHAS upload, never the audit.
  assert.match(security, /pnpm audit --prod --audit-level high/)
  assert.match(security, /baobab-platform\/baobab-dev:1\.4\.4-frontend/)
  assert.match(ci, /baobab-platform\/baobab-dev:1\.4\.4-frontend/)
  assert.match(ci, /pnpm install --frozen-lockfile/)
  assert.equal(pkg.packageManager, "pnpm@11.24.0")

  const minMajor = Number(pkg.engines?.node?.match(/>=\s*(\d+)/)?.[1])
  assert.ok(Number.isFinite(minMajor) && minMajor >= 24, "Node 24+ is mandatory")
  return { foundationRef: selected, nodeMajorMinimum: minMajor }
}
