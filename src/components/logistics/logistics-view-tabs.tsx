"use client"

import { Tabs } from "@base-ui/react/tabs"
import type { ReactNode } from "react"

/**
 * ADR-THA-0014 and ADR-SHARED-040: a client-only, source-agnostic
 * logistics workspace view selector. It owns no shipment data, routing,
 * customs decision, ETA computation or tenant permissions.
 *
 * The parent Thamani BFF must authorise, redact and label every view model.
 * Never substitute this selector's active tab for a CP grant.
 */
export function LogisticsViewTabs({
  tracking,
  route,
  documents,
}: {
  tracking: ReactNode
  route: ReactNode
  documents: ReactNode
}) {
  return (
    <Tabs.Root defaultValue="tracking" className="rounded-lg border border-[var(--color-border)]">
      <Tabs.List
        activateOnFocus
        aria-label="Shipment workspace views"
        className="flex flex-wrap gap-2 p-3"
      >
        <Tabs.Tab value="tracking" className="button focus-visible:outline-offset-2">
          Tracking
        </Tabs.Tab>
        <Tabs.Tab value="route" className="button focus-visible:outline-offset-2">
          Route
        </Tabs.Tab>
        <Tabs.Tab value="documents" className="button focus-visible:outline-offset-2">
          Documents
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="tracking" className="p-4">
        {tracking}
      </Tabs.Panel>
      <Tabs.Panel value="route" className="p-4">
        {route}
      </Tabs.Panel>
      <Tabs.Panel value="documents" className="p-4">
        {documents}
      </Tabs.Panel>
    </Tabs.Root>
  )
}
