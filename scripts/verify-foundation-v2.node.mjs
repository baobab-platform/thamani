import assert from "node:assert/strict"
import test from "node:test"
import { readFoundationInputs, verifyFoundationInputs } from "./verify-foundation-v2.mjs"

const valid = readFoundationInputs()

test("current Foundation metadata, action pins and security remain coherent", () => {
  const receipt = verifyFoundationInputs(valid)
  assert.match(receipt.foundationRef, /^[0-9a-f]{40}$/)
  assert.ok(receipt.nodeMajorMinimum >= 24)
})

test("reject mismatched caller and verifier commits", () => {
  const modified = {
    ...valid,
    foundation: valid.foundation.replace(
      /foundation_ref:\s*["']?[a-f0-9]{40}/,
      'foundation_ref: "0000000000000000000000000000000000000000"',
    ),
  }
  assert.throws(() => verifyFoundationInputs(modified), /must agree/)
})

test("reject disabled Foundation dependency review", () => {
  const modified = {
    ...valid,
    foundation: valid.foundation.replace(
      "dependency_review_enabled: true",
      "dependency_review_enabled: false",
    ),
  }
  assert.throws(() => verifyFoundationInputs(modified), /dependency_review_enabled/)
})

test("reject removal of private-repository SAST fallback", () => {
  const modified = {
    ...valid,
    repository: valid.repository.replace("sast_provider: fallback", "sast_provider: unavailable"),
  }
  assert.throws(() => verifyFoundationInputs(modified), /sast_provider: fallback/)
})

test("reject Node.js runtimes older than the baobab-dev standard", () => {
  const modified = { ...valid, pkg: { ...valid.pkg, engines: { node: ">=22 <23" } } }
  assert.throws(() => verifyFoundationInputs(modified), /Node 24/)
})
