import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { LogisticsPrototype } from "../src/components/logistics/prototype/logistics-prototype"
import "@baobab-platform/experience-tokens/base.css"
import "@baobab-platform/experience-ui/styles.css"
import "../src/components/logistics/prototype/prototype.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LogisticsPrototype />
  </StrictMode>,
)
