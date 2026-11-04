"use client"

import { useEffect, useState } from "react"

type View =
  | { kind: "checking" }
  | { kind: "signed-out" }
  | { kind: "signed-in"; csrfToken: string }
  | { kind: "unavailable" }

const opaque = /^[A-Za-z0-9_-]{43}$/

export function ConfidentialAuthPanel() {
  const [view, setView] = useState<View>({ kind: "checking" })

  useEffect(() => {
    const controller = new AbortController()
    async function readSession() {
      try {
        const response = await fetch("/api/auth/session", {
          method: "GET",
          credentials: "same-origin",
          cache: "no-store",
          redirect: "error",
          signal: controller.signal,
        })
        if (!response.headers.get("cache-control")?.includes("no-store")) {
          setView({ kind: "unavailable" })
          return
        }
        if (response.status === 401 || response.status === 403) {
          setView({ kind: "signed-out" })
          return
        }
        if (
          response.status !== 200 ||
          !response.headers.get("content-type")?.startsWith("application/json")
        ) {
          setView({ kind: "unavailable" })
          return
        }
        // Only CSRF reaches a form field. Canonical Principal identity, bearer,
        // issuer data, market grants and token contents never enter UI state.
        const data: unknown = await response.json()
        if (
          typeof data !== "object" ||
          data === null ||
          !("principalId" in data) ||
          typeof data.principalId !== "string" ||
          !("expiresAt" in data) ||
          typeof data.expiresAt !== "number" ||
          data.expiresAt <= Date.now() ||
          !("csrfToken" in data) ||
          typeof data.csrfToken !== "string" ||
          !opaque.test(data.csrfToken)
        ) {
          setView({ kind: "unavailable" })
          return
        }
        setView({ kind: "signed-in", csrfToken: data.csrfToken })
      } catch {
        if (!controller.signal.aborted) setView({ kind: "unavailable" })
      }
    }
    void readSession()
    return () => controller.abort()
  }, [])

  if (view.kind === "checking") {
    return <p role="status">Verifying your current business session…</p>
  }
  if (view.kind === "unavailable") {
    return (
      <p role="alert">
        The governed identity provider or session custody is unavailable. No access has been
        granted.
      </p>
    )
  }
  if (view.kind === "signed-in") {
    return (
      <div className="stack">
        <p role="status">
          Your confidential identity session is current. Organisation and logistics permissions are
          checked separately by the Control Plane and owning service.
        </p>
        <form action="/api/auth/logout" method="post">
          <input type="hidden" name="csrfToken" value={view.csrfToken} />
          <button className="button" type="submit" id="thamani-governed-logout">
            End this browser session
          </button>
        </form>
      </div>
    )
  }
  return (
    <form action="/api/auth/login" method="post">
      <button className="button" type="submit" id="thamani-governed-login">
        Continue with governed IAM
      </button>
    </form>
  )
}
