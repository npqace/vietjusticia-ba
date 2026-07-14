"use client"

import { useState } from "react"
import Image from "next/image"
import { X, Camera, User, Mail, Phone, MapPin, CalendarDays } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { userProfile } from "../data"

export function EditProfileSheet({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState(userProfile)

  function update(key: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Đóng"
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
      />

      {/* Sheet */}
      <div className="relative flex max-h-[90%] flex-col rounded-t-3xl bg-white dark:bg-[var(--color-neutral-50)] shadow-2xl">
        {/* Grabber + header */}
        <div className="shrink-0 px-4 pb-3 pt-3">
          <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-gray-200" />
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[var(--color-neutral-950)] dark:text-[var(--color-neutral-950)]">Chỉnh sửa thông tin</h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Đóng"
              className="grid h-8 w-8 place-items-center rounded-full text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)] transition-colors hover:bg-[var(--color-neutral-50)] dark:bg-[var(--color-neutral-50)]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-4 pb-2">
          {/* Avatar */}
          <div className="flex flex-col items-center py-2">
            <div className="relative">
              <Image
                src="/images/avatar.png"
                alt="Ảnh đại diện"
                width={80}
                height={80}
                className="h-20 w-20 rounded-full border-4 border-white object-cover shadow-md"
              />
              <button
                type="button"
                aria-label="Đổi ảnh đại diện"
                className="absolute bottom-0 right-0 grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-[var(--color-primary)] text-white shadow-sm"
              >
                <Camera className="h-3.5 w-3.5" />
              </button>
            </div>
            <button type="button" className="mt-2 text-xs font-semibold text-[var(--color-primary)]">
              Thay đổi ảnh đại diện
            </button>
          </div>

          {/* Fields */}
          <div className="space-y-3.5 pt-2">
            <Field icon={User} label="Họ và tên" value={form.name} onChange={(v) => update("name", v)} />
            <Field
              icon={Mail}
              label="Email"
              value={form.email}
              type="email"
              onChange={(v) => update("email", v)}
            />
            <Field
              icon={Phone}
              label="Số điện thoại"
              value={form.phone}
              type="tel"
              onChange={(v) => update("phone", v)}
            />
            <Field icon={CalendarDays} label="Ngày sinh" value={form.dob} onChange={(v) => update("dob", v)} />
            <Field
              icon={MapPin}
              label="Địa chỉ"
              value={form.address}
              onChange={(v) => update("address", v)}
            />
          </div>
        </div>

        {/* Footer actions */}
        <div className="shrink-0 border-t border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-200)] px-4 py-3">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-bold text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)] transition-colors hover:bg-[var(--color-neutral-50)] dark:bg-[var(--color-neutral-50)]"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl bg-[var(--color-primary)] py-3 text-sm font-bold text-white transition-all active:scale-[0.98] hover:opacity-90"
            >
              Lưu thay đổi
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({
  icon: Icon,
  label,
  value,
  onChange,
  type = "text",
}: {
  icon: LucideIcon
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)]">{label}</span>
      <div className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-[var(--color-neutral-50)] dark:bg-[var(--color-neutral-50)] px-3 focus-within:border-[var(--color-secondary-mid)] focus-within:bg-white dark:bg-[var(--color-neutral-50)]">
        <Icon className="h-4 w-4 shrink-0 text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)]" />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 flex-1 bg-transparent text-[13px] text-[var(--color-neutral-950)] dark:text-[var(--color-neutral-950)] outline-none"
        />
      </div>
    </label>
  )
}
