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

const quickItems: { icon: LucideIcon; label: string; sub: string }[] = [
  { icon: UserCog, label: "Thông tin cá nhân", sub: "Họ tên, ảnh đại diện, liên hệ" },
]

export function ProfileScreen() {
  const [view, setView] = useState<"profile" | "settings">("profile")

  if (view === "settings") {
    return <SettingsScreen onBack={() => setView("profile")} />
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-[#F5F5F5]">
      {/* Gradient header */}
      <div
        className="px-4 pb-20 pt-6"
        style={{ background: "linear-gradient(135deg, #FFFFFF 0%, #E6F0F9 50%, #B0CBE2 100%)" }}
      >
        <h1 className="text-lg font-bold text-[#1A1A1A]">Cá Nhân</h1>
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
              aria-label="Sửa ảnh đại diện"
              className="absolute bottom-0 right-0 grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-[#2854A8] text-white shadow-sm"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="mt-3 text-lg font-bold text-[#1A1A1A]">Ace Nguyen</p>
          <p className="text-xs text-[#5E5E5E]">ace.nguyen@lawsphere.vn</p>
        </div>
      </div>

      <div className="-mt-12 flex-1 px-4 pb-4">
        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-3 overflow-hidden rounded-2xl border border-[#D4E4F0] bg-white shadow-sm">
          {/* Pending requests */}
          <div className="flex flex-col items-center gap-2 px-3 py-4">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#E6F0F9] text-[#2854A8]">
              <Clock className="h-5 w-5" />
            </span>
            <p className="text-base font-bold text-[#1A1A1A]">3</p>
            <p className="text-center text-[10px] font-medium leading-tight text-[#5E5E5E]">Yêu cầu đang chờ</p>
          </div>

          {/* Matched lawyers */}
          <div className="flex flex-col items-center gap-2 px-3 py-4 border-l border-r border-[#E0E0E0]">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#E6F0F9] text-[#2854A8]">
              <Users className="h-5 w-5" />
            </span>
            <p className="text-base font-bold text-[#1A1A1A]">5</p>
            <p className="text-center text-[10px] font-medium leading-tight text-[#5E5E5E]">Luật sư hợp tác</p>
          </div>

          {/* Plan tier */}
          <div className="flex flex-col items-center gap-2 px-3 py-4">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#E6F0F9] text-[#2854A8]">
              <Crown className="h-5 w-5" />
            </span>
            <p className="text-base font-bold text-[#2854A8]">Pro</p>
            <p className="text-center text-[10px] font-medium leading-tight text-[#5E5E5E]">Gói hiện tại</p>
          </div>
        </div>

        {/* Quick account items */}
        <div className="mt-4 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          {quickItems.map(({ icon: Icon, label, sub }, i) => (
            <button
              key={label}
              type="button"
              className={`flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-[#F5F5F5] ${
                i !== quickItems.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#E6F0F9] text-[#2854A8]">
                <Icon className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#1A1A1A]">{label}</p>
                <p className="text-xs text-[#5E5E5E]">{sub}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-[#5E5E5E]" />
            </button>
          ))}
        </div>

        {/* Settings entry */}
        <div className="mt-4 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <button
            type="button"
            onClick={() => setView("settings")}
            className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-[#F5F5F5]"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#E6F0F9] text-[#2854A8]">
              <Settings className="h-5 w-5" />
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#1A1A1A]">Cài đặt</p>
              <p className="text-xs text-[#5E5E5E]">Thông báo, bảo mật, hiển thị, hỗ trợ</p>
            </div>
            <ChevronRight className="h-5 w-5 text-[#5E5E5E]" />
          </button>
        </div>

        {/* Destructive action */}
        <div className="mt-4 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
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
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-[#2854A8] bg-white py-3.5 text-sm font-bold text-[#2854A8] transition-all active:scale-[0.98] hover:bg-[#E6F0F9]"
        >
          <LogOut className="h-4 w-4" />
          Đăng xuất
        </button>
      </div>
    </div>
  )
}
