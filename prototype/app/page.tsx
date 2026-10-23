import { LogisticsPrototype } from "../../src/components/logistics/prototype/logistics-prototype"

/** Separate Next application: this route never enters src/app's production tree. */
export default function PrototypePage() {
  return <LogisticsPrototype />
}
