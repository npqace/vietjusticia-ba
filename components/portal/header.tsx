"use client"

import { useState } from "react"
import { Bell, Search, ChevronDown, Scale, LogOut, Settings, User } from "lucide-react"

export type PortalView = "admin" | "lawyer"

export function PortalHeader({
  view,
  onChangeView,
}: {
  view: PortalView
  onChangeView: (v: PortalView) => void
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const roleLabel = view === "admin" ? "Quản trị viên" : "Luật sư"

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-slate-200 bg-white dark:bg-[var(--color-neutral-50)] px-6">
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ backgroundColor: "var(--color-primary)" }}>
          <Scale className="h-5 w-5 text-white" />
        </div>
        <div className="leading-tight">
          <p className="font-heading text-sm font-bold text-slate-900">VietJusticIA</p>
          <p className="text-[11px] text-slate-500">Cổng Thông Tin</p>
        </div>
      </div>

      {/* Global search */}
      <div className="relative ml-4 hidden flex-1 max-w-md md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Tìm kiếm hồ sơ, văn bản, người dùng..."
          className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-[var(--color-primary)] focus:bg-white dark:bg-[var(--color-neutral-50)] focus:ring-2 focus:ring-[var(--color-secondary-mid)]/40"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        {/* View toggle */}
        <div className="flex items-center rounded-lg border border-slate-200 bg-slate-100 p-0.5">
          <button
            onClick={() => onChangeView("admin")}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
              view === "admin" ? "bg-white dark:bg-[var(--color-neutral-50)] text-[var(--color-primary)] shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Admin Console
          </button>
          <button
            onClick={() => onChangeView("lawyer")}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
              view === "lawyer" ? "bg-white dark:bg-[var(--color-neutral-50)] text-[var(--color-primary)] shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Luật sư
          </button>
        </div>

        {/* Notifications */}
        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
            5
          </span>
        </button>

        {/* User dropdown */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center gap-2 rounded-lg py-1 pl-1 pr-2 transition-colors hover:bg-slate-100"
          >
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: "var(--color-secondary-mid)" }}
            >
              {view === "admin" ? "QT" : "LS"}
            </div>
            <span className="hidden text-sm font-medium text-slate-700 sm:block">{roleLabel}</span>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-11 z-20 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white dark:bg-[var(--color-neutral-50)] py-1 shadow-lg">
                <div className="border-b border-slate-100 px-4 py-2.5">
                  <p className="text-sm font-semibold text-slate-900">{roleLabel}</p>
                  <p className="text-xs text-slate-500">admin@lawsphere.vn</p>
                </div>
                <MenuItem icon={<User className="h-4 w-4" />} label="Hồ sơ cá nhân" />
                <MenuItem icon={<Settings className="h-4 w-4" />} label="Cài đặt" />
                <div className="my-1 border-t border-slate-100" />
                <MenuItem icon={<LogOut className="h-4 w-4" />} label="Đăng xuất" danger />
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

function MenuItem({ icon, label, danger }: { icon: React.ReactNode; label: string; danger?: boolean }) {
  return (
    <button
      className={`flex w-full items-center gap-2.5 px-4 py-2 text-sm transition-colors hover:bg-slate-50 ${
        danger ? "text-red-600" : "text-slate-700"
      }`}
    >
      {icon}
      {label}
    </button>
  )
}
