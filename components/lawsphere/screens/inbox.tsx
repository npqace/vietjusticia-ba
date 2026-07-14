"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { threads, type Thread } from "../data"
import { ConversationDetail } from "./conversation-detail"

export function InboxScreen() {
  const [query, setQuery] = useState("")
  const [active, setActive] = useState<Thread | null>(null)
  const filtered = threads.filter(
    (t) =>
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.specialty.toLowerCase().includes(query.toLowerCase()),
  )

  if (active) {
    return <ConversationDetail thread={active} onBack={() => setActive(null)} />
  }

  return (
    <div className="flex h-full flex-col bg-[var(--color-neutral-50)] dark:bg-[var(--color-neutral-50)]">
      <header className="border-b border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-200)] bg-white dark:bg-[var(--color-neutral-50)] px-4 pb-3 pt-3">
        <h1 className="text-lg font-bold text-[var(--color-neutral-950)] dark:text-[var(--color-neutral-950)]">Danh Sách Hội Thoại</h1>
        <div className="relative mt-3">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm kiếm luật sư hoặc cuộc trò chuyện..."
            className="h-10 w-full rounded-xl border border-gray-200 bg-[var(--color-neutral-50)] dark:bg-[var(--color-neutral-50)] pl-9 pr-3 text-[13px] text-[var(--color-neutral-950)] dark:text-[var(--color-neutral-950)] outline-none focus:border-[var(--color-secondary-mid)] focus:bg-white dark:bg-[var(--color-neutral-50)]"
          />
        </div>
      </header>

      <div className="flex-1 space-y-2 overflow-y-auto px-4 py-3">
        {filtered.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActive(t)}
            className="flex w-full items-center gap-3 rounded-2xl border border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-200)] bg-white dark:bg-[var(--color-neutral-50)] p-3 text-left shadow-sm transition-colors hover:bg-[var(--color-primary-light)]/40"
          >
            <span
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-sm font-bold text-white"
              style={{ backgroundColor: t.color }}
            >
              {t.initials}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-bold text-[var(--color-neutral-950)] dark:text-[var(--color-neutral-950)]">{t.name}</p>
                <span className="shrink-0 text-[11px] text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)]">{t.time}</span>
              </div>
              <span className="mt-0.5 inline-block rounded-md bg-[var(--color-primary-light)] px-2 py-0.5 text-[10px] font-semibold text-[var(--color-primary)]">
                {t.specialty}
              </span>
              <div className="mt-1 flex items-center justify-between gap-2">
                <p className="truncate text-xs text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)]">{t.preview}</p>
                {t.unread > 0 && (
                  <span className="grid h-5 min-w-5 shrink-0 place-items-center rounded-full bg-[var(--color-primary)] px-1.5 text-[10px] font-bold text-white">
                    {t.unread}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="pt-10 text-center text-sm text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)]">Không tìm thấy cuộc trò chuyện nào.</p>
        )}
      </div>
    </div>
  )
}
