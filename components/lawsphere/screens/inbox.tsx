"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { threads } from "../data"

export function InboxScreen() {
  const [query, setQuery] = useState("")
  const filtered = threads.filter(
    (t) =>
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.specialty.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div className="flex h-full flex-col bg-[#F5F5F5]">
      <header className="border-b border-gray-100 bg-white px-4 pb-3 pt-3">
        <h1 className="text-lg font-bold text-[#1A1A1A]">Danh Sách Hội Thoại</h1>
        <div className="relative mt-3">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5E5E5E]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm kiếm luật sư hoặc cuộc trò chuyện..."
            className="h-10 w-full rounded-xl border border-gray-200 bg-[#F5F5F5] pl-9 pr-3 text-[13px] text-[#1A1A1A] outline-none focus:border-[#82ACDB] focus:bg-white"
          />
        </div>
      </header>

      <div className="flex-1 space-y-2 overflow-y-auto px-4 py-3">
        {filtered.map((t) => (
          <button
            key={t.id}
            type="button"
            className="flex w-full items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3 text-left shadow-sm transition-colors hover:bg-[#E6F0F9]/40"
          >
            <span
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-sm font-bold text-white"
              style={{ backgroundColor: t.color }}
            >
              {t.initials}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-bold text-[#1A1A1A]">{t.name}</p>
                <span className="shrink-0 text-[11px] text-[#5E5E5E]">{t.time}</span>
              </div>
              <span className="mt-0.5 inline-block rounded-md bg-[#E6F0F9] px-2 py-0.5 text-[10px] font-semibold text-[#2854A8]">
                {t.specialty}
              </span>
              <div className="mt-1 flex items-center justify-between gap-2">
                <p className="truncate text-xs text-[#5E5E5E]">{t.preview}</p>
                {t.unread > 0 && (
                  <span className="grid h-5 min-w-5 shrink-0 place-items-center rounded-full bg-[#2854A8] px-1.5 text-[10px] font-bold text-white">
                    {t.unread}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="pt-10 text-center text-sm text-[#5E5E5E]">Không tìm thấy cuộc trò chuyện nào.</p>
        )}
      </div>
    </div>
  )
}
