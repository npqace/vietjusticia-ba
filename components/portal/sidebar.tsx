"use client"

import {
  LayoutDashboard,
  Users,
  FileText,
  Activity,
  ShieldCheck,
  MessagesSquare,
  Briefcase,
  CalendarClock,
  Wallet,
  type LucideIcon,
} from "lucide-react"
import type { PortalView } from "./header"

type NavItem = { id: string; label: string; icon: LucideIcon }

const adminNav: NavItem[] = [
  { id: "dashboard", label: "Tổng quan", icon: LayoutDashboard },
  { id: "vetting", label: "Duyệt luật sư", icon: ShieldCheck },
  { id: "documents", label: "Quản lý văn bản", icon: FileText },
  { id: "users", label: "Người dùng", icon: Users },
  { id: "metrics", label: "Giám sát hệ thống", icon: Activity },
]

const lawyerNav: NavItem[] = [
  { id: "desk", label: "Bàn làm việc", icon: Briefcase },
  { id: "chats", label: "Hội thoại", icon: MessagesSquare },
  { id: "schedule", label: "Lịch hẹn", icon: CalendarClock },
  { id: "earnings", label: "Thu nhập", icon: Wallet },
]

export function PortalSidebar({
  view,
  active,
  onSelect,
}: {
  view: PortalView
  active: string
  onSelect: (id: string) => void
}) {
  const nav = view === "admin" ? adminNav : lawyerNav

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-slate-200 bg-[#F8FAFC] px-3 py-4 lg:flex">
      <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        {view === "admin" ? "Quản trị" : "Vận hành"}
      </p>
      <nav className="flex flex-col gap-1">
        {nav.map((item) => {
          const Icon = item.icon
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? "bg-[var(--color-primary)] text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-200/60 hover:text-slate-900"
              }`}
            >
              <Icon className="h-[18px] w-[18px]" />
              {item.label}
            </button>
          )
        })}
      </nav>

      <div className="mt-auto rounded-xl border border-slate-200 bg-white p-3">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
          <p className="text-xs font-semibold text-slate-700">Hệ thống ổn định</p>
        </div>
        <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
          Tất cả dịch vụ RAG &amp; chỉ mục đang hoạt động.
        </p>
      </div>
    </aside>
  )
}
