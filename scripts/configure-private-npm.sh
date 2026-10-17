#!/usr/bin/env bash
set -euo pipefail

# The GitHub Packages GITHUB_TOKEN must never be made available to an
# untrusted fork. BXS private installs require same-repository PRs.
if [[ "${GITHUB_EVENT_NAME:-}" == "pull_request" && "${PR_HEAD_REPO:-}" != "${GITHUB_REPOSITORY:-}" ]]; then
  echo "::error::Private npm install refused for forked PR" >&2
  exit 1
fi
if [[ -z "${NODE_AUTH_TOKEN:-}" ]]; then
  echo "::error::Missing authorised packages:read token" >&2
  exit 1
fi
# pnpm 11 does not interpolate auth tokens from the project .npmrc.
# Only a temporary runner-home config may contain this credential.
umask 077
printf '//npm.pkg.github.com/:_authToken=%s\n' "$NODE_AUTH_TOKEN" > "$HOME/.npmrc"
