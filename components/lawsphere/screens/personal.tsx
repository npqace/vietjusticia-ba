"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { ProfileScreen } from "./profile"
import { DashboardScreen } from "./dashboard"

export function PersonalScreen() {
  const [showRequests, setShowRequests] = useState(false)

  if (showRequests) {
    return (
      <div className="flex h-full flex-col bg-[var(--color-neutral-50)] dark:bg-[var(--color-neutral-50)]">
        <header className="flex shrink-0 items-center gap-3 border-b border-[var(--color-neutral-200)] bg-white px-4 py-3 dark:bg-[var(--color-neutral-50)]">
          <button
            type="button"
            onClick={() => setShowRequests(false)}
            aria-label="Quay lại cá nhân"
            className="grid h-9 w-9 place-items-center rounded-full text-[var(--color-primary)] hover:bg-[var(--color-primary-light)]"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-base font-bold text-[var(--color-neutral-950)]">Yêu cầu của tôi</h1>
            <p className="text-xs text-[var(--color-neutral-500)]">Theo dõi các yêu cầu tư vấn và dịch vụ</p>
          </div>
        </header>
        <div className="min-h-0 flex-1">
          <DashboardScreen />
        </div>
      </div>
    )
  }

  return <ProfileScreen onRequestsClick={() => setShowRequests(true)} />
}
