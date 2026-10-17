import { createRoot } from "react-dom/client"
import {
  ShipmentWorkspace,
  type ShipmentWorkspaceView,
} from "../../src/components/logistics/shipment-workspace"
import "@baobab-platform/experience-tokens/base.css"
import "@baobab-platform/experience-ui/styles.css"
import "./test.css"

/** Synthetic projection only: this page is excluded from the application routes. */
const view: ShipmentWorkspaceView = new URLSearchParams(location.search).has("restricted")
  ? { access: "restricted", explanation: "Synthetic whole-shipment denial" }
  : {
      access: "authorised",
      tracking: { visibility: "authorised", observation: null, milestones: [] },
      route: {
        state: "available",
        data: {
          source: "Synthetic route fixture",
          stops: [{ id: "origin", label: "Origin hand-off", evidence: "planned", asOf: null }],
        },
      },
      documents: { state: "restricted", explanation: "Synthetic documents capability denial" },
    }
createRoot(document.getElementById("root")!).render(
  <main>
    <h1>Thamani synthetic shipment workspace</h1>
    <p>Browser acceptance fixture. No live shipment, access grant or brand approval.</p>
    <ShipmentWorkspace view={view} />
  </main>,
)
