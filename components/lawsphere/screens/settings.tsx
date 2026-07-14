"use client"

import { useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  KeyRound,
  ShieldCheck,
  Mail,
  Smartphone,
  BellRing,
  Newspaper,
  FileClock,
  History,
  Trash2,
  Languages,
  Type,
  Moon,
  LifeBuoy,
  FileText,
  ScrollText,
  Info,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

type ToggleRow = { kind: "toggle"; icon: LucideIcon; label: string; sub?: string; on: boolean }
type LinkRow = { kind: "link"; icon: LucideIcon; label: string; value?: string; danger?: boolean }
type Row = ToggleRow | LinkRow

type Section = { title: string; rows: Row[] }

const initialSections: Section[] = [
  {
    title: "Tài khoản",
    rows: [
      { kind: "link", icon: KeyRound, label: "Đổi mật khẩu" },
      { kind: "toggle", icon: ShieldCheck, label: "Xác thực 2 lớp", sub: "Bảo vệ tài khoản bằng OTP", on: true },
      { kind: "link", icon: Mail, label: "Email", value: "ace.nguyen@lawsphere.vn" },
      { kind: "link", icon: Smartphone, label: "Số điện thoại", value: "0901 234 567" },
    ],
  },
  {
    title: "Thông báo",
    rows: [
      { kind: "toggle", icon: BellRing, label: "Thông báo đẩy", on: true },
      { kind: "toggle", icon: Mail, label: "Thông báo qua email", on: false },
      { kind: "toggle", icon: FileClock, label: "Cập nhật tiến độ hồ sơ", on: true },
      { kind: "toggle", icon: Newspaper, label: "Tin tức pháp luật", sub: "Nhận bản tin hàng tuần", on: false },
    ],
  },
  {
    title: "Quyền riêng tư & Bảo mật",
    rows: [
      { kind: "link", icon: Smartphone, label: "Quản lý thiết bị", value: "3 thiết bị" },
      { kind: "link", icon: History, label: "Lịch sử đăng nhập" },
      { kind: "link", icon: Trash2, label: "Xóa dữ liệu của tôi", danger: true },
    ],
  },
  {
    title: "Hiển thị",
    rows: [
      { kind: "link", icon: Languages, label: "Ngôn ngữ", value: "Tiếng Việt" },
      { kind: "link", icon: Type, label: "Cỡ chữ", value: "Vừa" },
      { kind: "toggle", icon: Moon, label: "Giao diện tối", on: false },
    ],
  },
  {
    title: "Hỗ trợ & Pháp lý",
    rows: [
      { kind: "link", icon: LifeBuoy, label: "Trung tâm trợ giúp" },
      { kind: "link", icon: FileText, label: "Điều khoản sử dụng" },
      { kind: "link", icon: ScrollText, label: "Chính sách bảo mật" },
      { kind: "link", icon: Info, label: "Phiên bản ứng dụng", value: "v1.0.0" },
    ],
  },
]

export function SettingsScreen({ onBack }: { onBack: () => void }) {
  const [sections, setSections] = useState(initialSections)

  function toggle(sectionIdx: number, rowIdx: number) {
    setSections((prev) =>
      prev.map((section, si) =>
        si !== sectionIdx
          ? section
          : {
              ...section,
              rows: section.rows.map((row, ri) =>
                ri !== rowIdx || row.kind !== "toggle" ? row : { ...row, on: !row.on },
              ),
            },
      ),
    )
  }

  return (
    <div className="flex h-full flex-col bg-[var(--color-neutral-50)]">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-gray-100 bg-white px-3 py-3">
        <button
          type="button"
          onClick={onBack}
          aria-label="Quay lại"
          className="grid h-9 w-9 place-items-center rounded-full text-[var(--color-neutral-950)] transition-colors hover:bg-[var(--color-neutral-50)]"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h1 className="text-base font-bold text-[var(--color-neutral-950)]">Cài đặt</h1>
      </div>

      {/* Sections */}
      <div className="flex-1 space-y-6 overflow-y-auto px-4 py-5 pb-8">
        {sections.map((section, si) => (
          <div key={section.title}>
            <p className="mb-2 px-1 text-xs font-bold uppercase tracking-wide text-[var(--color-neutral-500)]">{section.title}</p>
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              {section.rows.map((row, ri) => {
                const Icon = row.icon
                const isLast = ri === section.rows.length - 1
                const danger = row.kind === "link" && row.danger
                return (
                  <div
                    key={row.label}
                    className={`flex items-center gap-3 px-4 py-3.5 ${isLast ? "" : "border-b border-gray-100"}`}
                  >
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${
                        danger ? "bg-red-50 text-red-600" : "bg-[var(--color-primary-light)] text-[var(--color-primary)]"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="flex-1">
                      <p className={`text-sm font-semibold ${danger ? "text-red-600" : "text-[var(--color-neutral-950)]"}`}>
                        {row.label}
                      </p>
                      {row.kind === "toggle" && row.sub && (
                        <p className="text-xs text-[var(--color-neutral-500)]">{row.sub}</p>
                      )}
                    </div>

                    {row.kind === "toggle" ? (
                      <button
                        type="button"
                        role="switch"
                        aria-checked={row.on}
                        aria-label={row.label}
                        onClick={() => toggle(si, ri)}
                        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                          row.on ? "bg-[var(--color-primary)]" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all ${
                            row.on ? "left-[22px]" : "left-0.5"
                          }`}
                        />
                      </button>
                    ) : (
                      <div className="flex shrink-0 items-center gap-1.5">
                        {row.value && <span className="text-xs text-[var(--color-neutral-500)]">{row.value}</span>}
                        <ChevronRight className={`h-5 w-5 ${danger ? "text-red-300" : "text-[var(--color-neutral-500)]"}`} />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
