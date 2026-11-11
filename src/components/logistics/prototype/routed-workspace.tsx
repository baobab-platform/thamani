"use client"
import { usePathname, useRouter } from "next/navigation"
import { LogisticsPrototype } from "./logistics-prototype"
export function RoutedWorkspace() {
  const pathname = usePathname()
  const router = useRouter()
  return <LogisticsPrototype pathname={pathname} onNavigate={(href) => router.push(href)} />
}
