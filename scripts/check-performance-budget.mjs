import { mkdir, readdir, stat, writeFile } from "node:fs/promises"
import { join, relative } from "node:path"

const root = process.cwd()
// Public logistics and synthetic-workspace bundles use the same standard as
// ZuriBeans. Do not increase budgets to conceal regressions or import WebGL
// into public routes without a separate capacity decision.
const limits = {
  allClientJavaScript: 800 * 1024,
  largestClientChunk: 250 * 1024,
  allCss: 64 * 1024,
  largestPublicImage: 250 * 1024,
}

async function filesBelow(directory) {
  let entries
  try {
    entries = await readdir(directory, { withFileTypes: true })
  } catch (error) {
    if (error.code === "ENOENT") return []
    throw error
  }
  const nested = await Promise.all(
    entries.map((entry) => {
      const path = join(directory, entry.name)
      return entry.isDirectory() ? filesBelow(path) : [path]
    }),
  )
  return nested.flat()
}

async function measure(paths) {
  return Promise.all(
    paths.map(async (path) => ({
      path: relative(root, path),
      bytes: (await stat(path)).size,
    })),
  )
}

function budget(label, actual, maximum) {
  const message =
    label + ": " + (actual / 1024).toFixed(1) + " KiB / " + (maximum / 1024).toFixed(1) + " KiB"
  console.log(message)
  if (actual > maximum) throw new Error("Frontend budget exceeded: " + message)
}

const chunks = await filesBelow(join(root, ".next", "static", "chunks"))
const js = await measure(chunks.filter((path) => path.endsWith(".js")))
const css = await measure(chunks.filter((path) => path.endsWith(".css")))
if (js.length === 0 || css.length === 0) {
  throw new Error("Missing production client assets: run pnpm build first")
}

const images = await measure(
  (await filesBelow(join(root, "public"))).filter((path) =>
    /\.(?:avif|jpe?g|png|webp)$/i.test(path),
  ),
)
const largest = (items) =>
  items.reduce((best, item) => (item.bytes > best.bytes ? item : best), { path: "none", bytes: 0 })

budget(
  "All emitted client JavaScript",
  js.reduce((sum, item) => sum + item.bytes, 0),
  limits.allClientJavaScript,
)
budget(
  "Largest client chunk (" + largest(js).path + ")",
  largest(js).bytes,
  limits.largestClientChunk,
)
budget(
  "All emitted CSS",
  css.reduce((sum, item) => sum + item.bytes, 0),
  limits.allCss,
)
budget(
  "Largest public image (" + largest(images).path + ")",
  largest(images).bytes,
  limits.largestPublicImage,
)

// Independent DEV-11 custody uses actual production-build byte counts.
// The four existing budget(...) calls above still reject every regression.
await mkdir(join(root, "reports"), { recursive: true })
await writeFile(
  join(root, "reports", "static-budget.json"),
  JSON.stringify(
    {
      profile: "CI_PRODUCTION_BUILD",
      limits,
      measured: {
        allClientJavaScript: js.reduce((sum, item) => sum + item.bytes, 0),
        largestClientChunk: largest(js).bytes,
        allCss: css.reduce((sum, item) => sum + item.bytes, 0),
        largestPublicImage: largest(images).bytes,
      },
      oversized: [],
    },
    null,
    2,
  ) + "\n",
)
