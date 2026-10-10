#!/usr/bin/env node
/**
 * ADR-THA-0018: inventory historical retail Medusa consumers ONLY.
 * Passing this gate cannot certify Thamani's target B2B logistics journeys.
 */
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

const load = (name) => readFileSync(new URL("../" + name, import.meta.url), "utf8")
const product = load("src/lib/medusa/products.ts")
const cart = load("src/lib/medusa/cart.ts")
const adr = load(
  "docs/adr/ADR-THA-0018 — B2B Commercial Model, Legacy Supersession and Platform Engine Responsibility Reallocation.md",
)
assert.match(adr, /B2B integrated logistics enterprise/)
assert.match(adr, /SHALL NOT be architected as a consumer ecommerce business/)
assert.equal((product.match(/sdk\.store\.product\.list\(/g) ?? []).length, 2)
assert.equal((cart.match(/sdk\.store\.cart\.create\(/g) ?? []).length, 1)
assert.equal((cart.match(/sdk\.store\.cart\.createLineItem\(/g) ?? []).length, 1)
assert.equal((cart.match(/createMedusaClient\(\)\.store\.cart\.retrieve\(/g) ?? []).length, 1)
assert.doesNotMatch(
  product + cart,
  /\bfields\s*:/,
  "New Store fields need exact-path 2.21.2 security review",
)
assert.doesNotMatch(
  product + cart,
  /\/store\/search(?:\b|[/?#])/,
  "Search index changes require separate review",
)
assert.match(product, /calculated_price/, "Historical product pricing projection changed")
assert.match(
  cart,
  /NEXT_PUBLIC_DEFAULT_REGION_ID/,
  "Historical Medusa cart requires explicit region",
)
console.log(
  "PASS static: exactly five historical Medusa SDK calls and no explicit fields or /store/search",
)
console.log(
  "BLOCKED AS TARGET: ADR-THA-0018 supersedes consumer ecommerce; migrate cart/catalogue to B2B logistics RFQ/booking/capability APIs",
)

if (!process.argv.includes("--live-legacy")) process.exit(0)
assert.equal(
  process.env.MEDUSA_2212_APPROVE_LEGACY_TEST,
  "yes",
  "Historical B2C smoke is only allowed when explicitly designated as legacy",
)
for (const key of [
  "MEDUSA_BACKEND_URL",
  "NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY",
  "MEDUSA_2212_TEST_PRODUCT_HANDLE",
  "NEXT_PUBLIC_DEFAULT_REGION_ID",
  "MEDUSA_2212_RELEASE_ATTESTATION",
]) {
  assert.ok(process.env[key]?.trim(), `Missing ${key}; cannot test historical Medusa projection`)
}
assert.equal(process.env.MEDUSA_2212_RELEASE_ATTESTATION, "2.21.2")
const base = process.env.MEDUSA_BACKEND_URL.replace(/\/$/, "")
assert.match(base, /^https:\/\//)
const headers = {
  "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
  accept: "application/json",
}
async function get(path) {
  const response = await fetch(base + path, {
    headers,
    cache: "no-store",
    signal: AbortSignal.timeout(12000),
  })
  assert.equal(response.status, 200, `Medusa legacy route failed ${path}: ${response.status}`)
  return response.json()
}
const params = new URLSearchParams({
  handle: process.env.MEDUSA_2212_TEST_PRODUCT_HANDLE,
  region_id: process.env.NEXT_PUBLIC_DEFAULT_REGION_ID,
  limit: "1",
})
const detail = await get("/store/products?" + params.toString())
assert.equal(detail.products?.length, 1, "Need a published legacy product fixture")
const p = detail.products[0]
for (const key of ["id", "title", "handle", "description", "variants"]) {
  assert.ok(Object.hasOwn(p, key), `2.21.2 stripped historical ${key}`)
}
assert.ok(Array.isArray(p.variants) && p.variants.length > 0, "Test product must have variants")
assert.ok(
  Object.hasOwn(p.variants[0], "calculated_price"),
  "Legacy UI depends on variant calculated_price; explicit relation contract review needed",
)
const searched = await get(
  "/store/products?" +
    new URLSearchParams({
      q: p.title,
      region_id: process.env.NEXT_PUBLIC_DEFAULT_REGION_ID,
      limit: "24",
    }).toString(),
)
assert.ok(Array.isArray(searched.products), "Legacy q-based product listing failed")
if (process.env.MEDUSA_2212_TEST_CART_ID) {
  const received = await get(
    "/store/carts/" + encodeURIComponent(process.env.MEDUSA_2212_TEST_CART_ID),
  )
  assert.ok(Array.isArray(received.cart?.items), "Legacy cart.items projection missing")
}
console.log(
  "PASS historical retail Store projections; NOT a Thamani B2B logistics readiness approval",
)
