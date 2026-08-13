"use client"

import { useState } from "react"
import { User, FileText } from "lucide-react"
import { ProfileScreen } from "./profile"
import { DashboardScreen } from "./dashboard"

export function PersonalScreen() {
  const [section, setSection] = useState<"profile" | "requests">("profile")

  return (
    <div className="relative h-full">
      <div className="absolute left-4 right-4 top-3 z-20 grid grid-cols-2 gap-1 rounded-xl border border-[var(--color-neutral-200)] bg-white/95 p-1 shadow-sm backdrop-blur dark:bg-[var(--color-neutral-50)]/95">
        <button
          type="button"
          onClick={() => setSection("profile")}
          className={`flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-bold transition-colors ${section === "profile" ? "bg-[var(--color-primary-light)] text-[var(--color-primary)]" : "text-[var(--color-neutral-500)]"}`}
        >
          <User className="h-4 w-4" /> Cá nhân
        </button>
        <button
          type="button"
          onClick={() => setSection("requests")}
          className={`flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-bold transition-colors ${section === "requests" ? "bg-[var(--color-primary-light)] text-[var(--color-primary)]" : "text-[var(--color-neutral-500)]"}`}
        >
          <FileText className="h-4 w-4" /> Yêu cầu
        </button>
      </div>
      {section === "profile" ? <ProfileScreen /> : <DashboardScreen />}
    </div>
  )
}
