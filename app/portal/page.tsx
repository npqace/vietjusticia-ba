"use client"

import { useState } from "react"
import { PortalHeader, type PortalView } from "@/components/portal/header"
import { PortalSidebar } from "@/components/portal/sidebar"
import { AdminConsole } from "@/components/portal/admin/admin-console"
import { LawyerDesk } from "@/components/portal/lawyer/lawyer-desk"

export default function PortalPage() {
  const [view, setView] = useState<PortalView>("admin")
  const [adminNav, setAdminNav] = useState("dashboard")
  const [lawyerNav, setLawyerNav] = useState("desk")

  const active = view === "admin" ? adminNav : lawyerNav
  const onSelect = view === "admin" ? setAdminNav : setLawyerNav

  return (
    <div className="flex h-screen flex-col bg-[#F1F5F9] font-sans text-slate-900">
      <PortalHeader view={view} onChangeView={setView} />
      <div className="flex min-h-0 flex-1">
        <PortalSidebar view={view} active={active} onSelect={onSelect} />
        <main className="min-w-0 flex-1 overflow-y-auto">
          {view === "admin" ? <AdminConsole active={adminNav} /> : <LawyerDesk />}
        </main>
      </div>
    </div>
  )
}
