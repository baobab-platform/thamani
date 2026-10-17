# Deployment contract

This repository produces a non-root standalone Next.js image on port 3000 and exposes `/api/health`. `runtime/requirements.yaml` is the hand-off to `baobab-platform/infrastructure`, which owns runtime environment injection, domains, certificates, networks, scaling, observability and rollback.

No Terraform, Kubernetes manifest or cloud credential belongs here.
