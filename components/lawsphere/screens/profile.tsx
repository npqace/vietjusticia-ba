"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Pencil,
  UserCog,
  Settings,
  ShieldOff,
  LogOut,
  ChevronRight,
  Clock,
  Users,
  Crown,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { SettingsScreen } from "./settings"
import { EditProfileSheet } from "./edit-profile-sheet"

const quickItems: { icon: LucideIcon; label: string; sub: string }[] = [
  { icon: UserCog, label: "Thông tin cá nhân", sub: "Họ tên, ảnh đại diện, liên hệ" },
]

export function ProfileScreen({ onRequestsClick }: { onRequestsClick?: () => void }) {
  const [view, setView] = useState<"profile" | "settings">("profile")
  const [editing, setEditing] = useState(false)

  if (view === "settings") {
    return <SettingsScreen onBack={() => setView("profile")} />
  }

  return (
    <div className="relative h-full">
    <div className="flex h-full flex-col overflow-y-auto bg-[var(--color-neutral-50)] dark:bg-[var(--color-neutral-50)]">
      {/* Gradient header */}
      <div
        className="px-4 pb-20 pt-6"
        style={{ background: "linear-gradient(135deg, #FFFFFF 0%, var(--color-primary-light) 50%, var(--color-primary-mid) 100%)" }}
      >
        <h1 className="text-lg font-bold text-[var(--color-neutral-950)] dark:text-[var(--color-neutral-950)]">Cá Nhân</h1>
        <div className="mt-4 flex flex-col items-center">
          <div className="relative">
            <Image
              src="/images/avatar.png"
              alt="Ảnh đại diện của Ace Nguyen"
              width={88}
              height={88}
              className="h-22 w-22 rounded-full border-4 border-white object-cover shadow-md"
            />
            <button
              type="button"
              onClick={() => setEditing(true)}
              aria-label="Sửa ảnh đại diện"
              className="absolute bottom-0 right-0 grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-[var(--color-primary)] text-white shadow-sm"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="mt-3 text-lg font-bold text-[var(--color-neutral-950)] dark:text-[var(--color-neutral-950)]">Ace Nguyen</p>
          <p className="text-xs text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)]">ace.nguyen@lawsphere.vn</p>
        </div>
      </div>

      <div className="-mt-12 flex-1 px-4 pb-4">
        <div className="mb-3 rounded-xl border border-[var(--color-neutral-200)] bg-white p-1 dark:bg-[var(--color-neutral-50)]">
          <div className="rounded-lg bg-[var(--color-primary-light)] px-3 py-2 text-center text-xs font-bold text-[var(--color-primary)]">
            Thông tin cá nhân
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-3 overflow-hidden rounded-2xl border border-[var(--color-primary-light)] bg-white dark:bg-[var(--color-neutral-50)] shadow-sm">
          {/* Pending requests */}
          <button
            type="button"
            onClick={onRequestsClick}
            className="flex flex-col items-center gap-2 px-3 py-4 text-center transition-colors hover:bg-[var(--color-primary-light)]/40"
            aria-label="Xem 3 yêu cầu đang chờ"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--color-primary-light)] text-[var(--color-primary)]">
              <Clock className="h-5 w-5" />
            </span>
            <p className="text-base font-bold text-[var(--color-neutral-950)] dark:text-[var(--color-neutral-950)]">3</p>
            <p className="text-center text-[10px] font-medium leading-tight text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)]">Yêu cầu đang chờ</p>
          </button>

          {/* Matched lawyers */}
          <div className="flex flex-col items-center gap-2 px-3 py-4 border-l border-r border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-200)]">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--color-primary-light)] text-[var(--color-primary)]">
              <Users className="h-5 w-5" />
            </span>
            <p className="text-base font-bold text-[var(--color-neutral-950)] dark:text-[var(--color-neutral-950)]">5</p>
            <p className="text-center text-[10px] font-medium leading-tight text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)]">Luật sư hợp tác</p>
          </div>

          {/* Plan tier */}
          <div className="flex flex-col items-center gap-2 px-3 py-4">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--color-primary-light)] text-[var(--color-primary)]">
              <Crown className="h-5 w-5" />
            </span>
            <p className="text-base font-bold text-[var(--color-primary)]">Pro</p>
            <p className="text-center text-[10px] font-medium leading-tight text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)]">Gói hiện tại</p>
          </div>
        </div>

        {/* Quick account items */}
        <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-200)] bg-white dark:bg-[var(--color-neutral-50)] shadow-sm">
          {quickItems.map(({ icon: Icon, label, sub }, i) => (
            <button
              key={label}
              type="button"
              onClick={() => setEditing(true)}
              className={`flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-[var(--color-neutral-50)] dark:bg-[var(--color-neutral-50)] ${
                i !== quickItems.length - 1 ? "border-b border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-200)]" : ""
              }`}
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[var(--color-primary-light)] text-[var(--color-primary)]">
                <Icon className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[var(--color-neutral-950)] dark:text-[var(--color-neutral-950)]">{label}</p>
                <p className="text-xs text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)]">{sub}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)]" />
            </button>
          ))}
        </div>

        {/* Settings entry */}
        <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-200)] bg-white dark:bg-[var(--color-neutral-50)] shadow-sm">
          <button
            type="button"
            onClick={() => setView("settings")}
            className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-[var(--color-neutral-50)] dark:bg-[var(--color-neutral-50)]"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[var(--color-primary-light)] text-[var(--color-primary)]">
              <Settings className="h-5 w-5" />
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-[var(--color-neutral-950)] dark:text-[var(--color-neutral-950)]">Cài đặt</p>
              <p className="text-xs text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)]">Thông báo, bảo mật, hiển thị, hỗ trợ</p>
            </div>
            <ChevronRight className="h-5 w-5 text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)]" />
          </button>
        </div>

        {/* Destructive action */}
        <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-200)] bg-white dark:bg-[var(--color-neutral-50)] shadow-sm">
          <button
            type="button"
            className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-red-50"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-red-50 text-red-600">
              <ShieldOff className="h-5 w-5" />
            </span>
            <span className="flex-1 text-sm font-semibold text-red-600">Vô hiệu hóa tài khoản</span>
            <ChevronRight className="h-5 w-5 text-red-300" />
          </button>
        </div>

        {/* Logout */}
        <button
          type="button"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-[var(--color-primary)] bg-white dark:bg-[var(--color-neutral-50)] py-3.5 text-sm font-bold text-[var(--color-primary)] transition-all active:scale-[0.98] hover:bg-[var(--color-primary-light)]"
        >
          <LogOut className="h-4 w-4" />
          Đăng xuất
        </button>
      </div>
    </div>

      {editing && <EditProfileSheet onClose={() => setEditing(false)} />}
    </div>
  )
}
