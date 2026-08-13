"use client"

import { useState } from "react"
import { MessageCircle, Search } from "lucide-react"
import { threads, type Thread } from "../data"
import { ConversationDetail } from "./conversation-detail"

export function ConversationsScreen() {
  const [active, setActive] = useState<Thread | null>(null)
  const [query, setQuery] = useState("")
  const filtered = threads.filter((thread) =>
    `${thread.name} ${thread.specialty} ${thread.preview}`.toLowerCase().includes(query.toLowerCase()),
  )

  if (active) {
    return <ConversationDetail thread={active} onBack={() => setActive(null)} />
  }

  return (
    <div className="flex h-full flex-col bg-[var(--color-neutral-50)] dark:bg-[var(--color-neutral-50)]">
      <header className="border-b border-[var(--color-neutral-200)] bg-white px-4 pb-3 pt-4 dark:bg-[var(--color-neutral-50)]">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-[var(--color-primary)]" />
          <div>
            <h1 className="text-lg font-bold text-[var(--color-neutral-950)]">Cuộc trò chuyện</h1>
            <p className="text-xs text-[var(--color-neutral-500)]">Trao đổi trực tiếp với luật sư</p>
          </div>
        </div>
        <label className="mt-3 flex h-10 items-center gap-2 rounded-xl bg-[var(--color-neutral-50)] px-3 text-[var(--color-neutral-500)]">
          <Search className="h-4 w-4" />
          <span className="sr-only">Tìm kiếm cuộc trò chuyện</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Tìm luật sư hoặc cuộc trò chuyện"
            className="min-w-0 flex-1 bg-transparent text-sm text-[var(--color-neutral-950)] outline-none placeholder:text-[var(--color-neutral-500)]"
          />
        </label>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-3">
        {filtered.length > 0 ? (
          <div className="overflow-hidden rounded-2xl border border-[var(--color-neutral-200)] bg-white dark:bg-[var(--color-neutral-50)]">
            {filtered.map((thread, index) => (
              <button
                key={thread.id}
                type="button"
                onClick={() => setActive(thread)}
                className={`flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-[var(--color-primary-light)]/40 ${index > 0 ? "border-t border-[var(--color-neutral-200)]" : ""}`}
              >
                <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full text-sm font-bold text-white" style={{ backgroundColor: thread.color }}>
                  {thread.initials}
                  {thread.unread > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--color-error)] px-1 text-[10px] font-bold text-white">{thread.unread}</span>}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-bold text-[var(--color-neutral-950)]">{thread.name}</span>
                    <span className="shrink-0 text-[10px] text-[var(--color-neutral-500)]">{thread.time}</span>
                  </span>
                  <span className="mt-1 block text-xs font-medium text-[var(--color-primary)]">{thread.specialty}</span>
                  <span className="mt-1 block truncate text-xs text-[var(--color-neutral-500)]">{thread.preview}</span>
                </span>
              </button>
            ))}
          </div>
        ) : (
          <p className="pt-10 text-center text-sm text-[var(--color-neutral-500)]">Không tìm thấy cuộc trò chuyện.</p>
        )}
      </div>
    </div>
  )
}
