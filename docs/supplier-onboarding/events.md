# Supplier onboarding events

`contracts/supplier-onboarding/v1` (`baobab-platform/shared`) defines six events
(four lifecycle events plus additive KYB evidence and decision events),
all built on the canonical CloudEvents envelope
(`contracts/events/v1/envelope.schema.json`):

- `com.baobab-platform.supplier-onboarding.application.submitted.v1`
- `com.baobab-platform.supplier-onboarding.application.decided.v1`
- `com.baobab-platform.supplier-onboarding.qualification.updated.v1`
- `com.baobab-platform.supplier-onboarding.capability.verified.v1`
- `com.baobab-platform.supplier-onboarding.kyb.evidence-recorded.v1`
- `com.baobab-platform.supplier-onboarding.kyb.decision-recorded.v1`

Thamani does not publish any of these yet. No message broker exists
anywhere in this ecosystem today — the same position `baobab-platform/baobab-erp`'s
own published event contracts are already in, and the same reasoning
`baobab-platform/zuribeans` ADR-0006 gives for not building one: "building a broker
integration with nothing on the other end would be exactly the heavyweight
infrastructure... not justified by current workload."

`SupplierStatusEvent` (Thamani's own audit-trail record, see
`domain-model.md`) is the durable local record a future outbox/publisher can
replay from once a broker exists — the same seam `baobab-platform/zuribeans`
deliberately left for itself.

When Thamani does publish, envelope fields are populated as:

| Field         | Value                                                                                                                                    |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `source`      | `urn:baobab-platform:service:thamani`                                                                                                    |
| `baobabscope` | `tenant`                                                                                                                                 |
| `tenantid`    | The Control Plane tenant context for the request, once Thamani resolves one (it does not today — no `baobab-cp` integration exists yet). |
| `dataschema`  | The matching `contracts/supplier-onboarding/v1/*.schema.json` `$id`.                                                                     |

See `contracts/supplier-onboarding/v1/examples/` in `baobab-platform/shared` for
complete, schema-validated example payloads.
