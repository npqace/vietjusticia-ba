"use client"

import { useState } from "react"
import { ArrowLeft, FileText } from "lucide-react"
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

  return (
    <div className="flex h-full flex-col bg-[var(--color-neutral-50)] dark:bg-[var(--color-neutral-50)]">
      <div className="shrink-0 border-b border-[var(--color-neutral-200)] bg-white px-4 pb-3 pt-4 dark:bg-[var(--color-neutral-50)]">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-[var(--color-primary)]" />
          <div>
            <h1 className="text-lg font-bold text-[var(--color-neutral-950)]">Cá nhân</h1>
            <p className="text-xs text-[var(--color-neutral-500)]">Hồ sơ, yêu cầu và cài đặt tài khoản</p>
          </div>
        </div>
      </div>
      <div className="min-h-0 flex-1">
        <ProfileScreen onRequestsClick={() => setShowRequests(true)} />
      </div>
    </div>
  )
}
