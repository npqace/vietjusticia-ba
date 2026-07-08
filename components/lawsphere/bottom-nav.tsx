"use client"

import { Bot, Users, BookOpen, FileText, User } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export type TabKey = "ai" | "lawyers" | "library" | "requests" | "profile"

const tabs: { key: TabKey; label: string; icon: LucideIcon }[] = [
  { key: "ai", label: "AI Luật Sư", icon: Bot },
  { key: "lawyers", label: "Luật sư", icon: Users },
  { key: "library", label: "Thư Viện", icon: BookOpen },
  { key: "requests", label: "Yêu cầu", icon: FileText },
  { key: "profile", label: "Cá Nhân", icon: User },
]

export function BottomNav({
  active,
  onChange,
}: {
  active: TabKey
  onChange: (key: TabKey) => void
}) {
  return (
    <nav className="shrink-0 border-t border-gray-100 bg-white px-2 pb-6 pt-2">
      <ul className="flex items-stretch justify-between">
        {tabs.map(({ key, label, icon: Icon }) => {
          const isActive = key === active
          return (
            <li key={key} className="flex-1">
              <button
                type="button"
                onClick={() => onChange(key)}
                className="group flex w-full flex-col items-center gap-1 rounded-xl py-1.5 transition-colors"
                aria-current={isActive ? "page" : undefined}
              >
                <Icon
                  className="h-6 w-6 transition-transform duration-200 group-active:scale-90"
                  strokeWidth={isActive ? 2.4 : 2}
                  style={{ color: isActive ? "#2854A8" : "#5E5E5E" }}
                />
                <span
                  className="text-[10px] font-semibold leading-none"
                  style={{ color: isActive ? "#2854A8" : "#5E5E5E" }}
                >
                  {label}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
