# Thamani

Thamani Global is a **B2B integrated logistics enterprise**: its primary commercial customers are organisations that buy logistics, transportation, forwarding, warehousing, customs, project-logistics, 3PL and 4PL services. This repository is Thamani's independently deployable **digital estate**. It owns the customer, partner and operations experience, presentation, content, accessibility, SEO and frontend behaviour. It is not a commerce, transport, trade-document or ERP engine.

> **Governing decision:** [ADR-THA-0018](<docs/adr/ADR-THA-0018 — B2B Commercial Model, Legacy Supersession and Platform Engine Responsibility Reallocation.md>) supersedes the original B2C ecommerce model (ADR-0001) and the supplier-portal model (ADR-0002). The product catalogue, cart, checkout and search routes in `src/` are **legacy code** from that model. They are not the target customer experience and a passing legacy check does not authorise any logistics journey. See `docs/compatibility/medusa-2.21.2-consumer-audit.md`.

For the customer-facing logistics service model and comparative lessons from DHL, UPS, DSV and Kuehne+Nagel, see [B2B logistics global benchmark](docs/strategy/b2b-logistics-global-benchmark-2026-10.md). This is implementation guidance, not a new commercial-model decision.

## Ecosystem

Thamani sits in the `baobab-platform` ecosystem. It shares contracts and APIs with these repositories, never their source trees or databases.

| Authority           | Repository                       | Thamani relationship                                                                                                                       |
| ------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Platform context    | `baobab-platform/baobab-cp`      | Control Plane: authoritative tenant, organisation and capability context. Thamani consumes capabilities through it, never around it.       |
| Canonical contracts | `baobab-platform/shared`         | Pin identifiers and organisational standards; do not redefine them. `contracts.lock.yaml` records the exact consumed commit and contracts. |
| Supplier onboarding | `baobab-platform/shared`         | `@baobab-platform/supplier-domain` and `contracts/supplier-onboarding/v1` are legacy reference only (see ADR-0002 and ADR-THA-0004).       |
| Commerce (legacy)   | `baobab-platform/baobab-trade`   | Medusa v2 Store API used only by the superseded storefront; never reproduce or query commerce data directly.                               |
| ERP                 | `baobab-platform/baobab-erp`     | No browser or direct integration; settlement and finance truth are consumed through governed capabilities.                                 |
| Intelligence        | `baobab-platform/baobab-pulse`   | Future explicit recommendation APIs only.                                                                                                  |
| Infrastructure      | `baobab-platform/infrastructure` | Owns cloud, DNS, networks, deployment and observability infrastructure.                                                                    |
| Development image   | `baobab-platform/baobab-dev`     | Supplies the pinned `frontend` and `frontend-e2e` profiles.                                                                                |
| B2B estate          | `baobab-platform/zuribeans`      | Sibling Trade consumer; no source-code dependency.                                                                                         |
| Corporate estate    | `baobab-platform/nabhold`        | Owns corporate and executive presentation.                                                                                                 |
| Property estate     | `baobab-platform/equator-estate` | Independent sibling estate.                                                                                                                |

Per ADR-THA-0018, reusable transport execution (TMS), trade documents (Trade Docs), regulatory decisions and financial truth belong to Baobab engines. Thamani owns the logistics service composition, RFQ, quotation, contract and customer-experience layer over them.

A customer organisation is not automatically a tenant, and legal entity is not synonymous with tenant. The Control Plane decides the canonical organisation and platform relationship.

## Current state

The deployed slice is still the legacy storefront (home, catalogue, product detail, server-side add-to-cart, cart, search, health, SEO controls and a deliberate checkout gate). Checkout is not fabricated. It is retained only until the B2B logistics experience replaces it, and is decommissioned or covered by a time-bounded compatibility smoke test per the audit above.

## Development

```bash
cp .env.example .env.local
pnpm install --frozen-lockfile
pnpm dev
```

Quality gates: `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build`.

See `docs/architecture.md`, `docs/development.md`, `docs/environment.md`, `docs/medusa-integration.md`, `docs/testing.md`, `docs/deployment.md`, and `SECURITY.md`.

## Development environment and CI

Codespaces and CI use `ghcr.io/baobab-platform/baobab-dev:1.4.4-frontend`, declared in `.baobab/environment.yaml` and `.devcontainer/devcontainer.json`. Repository capabilities are declared in `.baobab/repository.yaml`.

Every GitHub Action is pinned to a full commit SHA. Reusable workflows come from `baobab-platform/shared` at the promoted Foundation release **v2.3.0** (`31de2bc3dcd56128c019c640dc7e12c10ae9ca69`); the Foundation gate validates contract compatibility and reproducibility and scans source, dependencies, secrets, configuration and the deployable image.
