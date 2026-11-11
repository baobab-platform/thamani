import type { Metadata } from "next"
import { RoutedWorkspace } from "@/components/logistics/prototype/routed-workspace"
import "@/components/logistics/prototype/prototype.css"
export const metadata: Metadata = {
  title: "Logistics demo workspace",
  robots: { index: false, follow: false },
}
export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RoutedWorkspace />
      {children}
    </>
  )
}
