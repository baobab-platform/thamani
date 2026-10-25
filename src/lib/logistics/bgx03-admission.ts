/** BGX-03 uses DEV-08's server-only, object-scoped read admission boundary.
 * Internal adapter projections are tightened before any real provider is wired.
 * This exports no production route or canonical TMS contract.
 */
export { admitShipmentEvidence, type BgX03Ports, type AdmissionResult } from "./dev08-admission"
