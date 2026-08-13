"use client"

import { Bot, MessageCircle, Users, BookOpen, User } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export type TabKey = "ai" | "conversations" | "lawyers" | "library" | "personal"

const tabs: { key: TabKey; label: string; icon: LucideIcon }[] = [
  { key: "ai", label: "AI Luật Sư", icon: Bot },
  { key: "conversations", label: "Cuộc trò chuyện", icon: MessageCircle },
  { key: "lawyers", label: "Luật sư", icon: Users },
  { key: "library", label: "Thư Viện", icon: BookOpen },
  { key: "personal", label: "Cá nhân", icon: User },
]

export function BottomNav({
  active,
  onChange,
}: {
  active: TabKey
  onChange: (key: TabKey) => void
}) {
  return (
    <nav className="shrink-0 border-t border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-200)] bg-white dark:bg-[var(--color-neutral-50)] px-2 pb-6 pt-2">
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
                  style={{ color: isActive ? "var(--color-primary)" : "var(--color-neutral-500)" }}
                />
                <span
                  className="text-[10px] font-semibold leading-none"
                  style={{ color: isActive ? "var(--color-primary)" : "var(--color-neutral-500)" }}
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
