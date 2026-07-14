"use client"

import { useState } from "react"
import { Search, MessageCircle, MessageSquare, Star } from "lucide-react"
import { lawyers, threads, type Lawyer } from "../data"
import { ConversationDetail } from "./conversation-detail"

type View = "browse" | "conversations"

export function LawyersScreen() {
  const [view, setView] = useState<View>("browse")
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState<Lawyer | null>(null)
  const [conversation, setConversation] = useState<typeof threads[0] | null>(null)

  const filteredLawyers = lawyers.filter(
    (l) =>
      l.name.toLowerCase().includes(query.toLowerCase()) ||
      l.specialty.toLowerCase().includes(query.toLowerCase()),
  )

  if (conversation) {
    return <ConversationDetail thread={conversation} onBack={() => setConversation(null)} />
  }

  if (selected) {
    return <LawyerDetail lawyer={selected} onBack={() => setSelected(null)} />
  }

  return (
    <div className="flex h-full flex-col overflow-hidden bg-[var(--color-neutral-50)]">
      {/* Top bar */}
      <div className="shrink-0 border-b border-gray-100 bg-white px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-base font-bold text-[var(--color-neutral-950)]">
            {view === "browse" ? "Luật sư" : "Cuộc trò chuyện"}
          </h1>
          <button
            type="button"
            onClick={() => setView(view === "browse" ? "conversations" : "browse")}
            className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--color-primary-light)] text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary-light)]"
            title={view === "browse" ? "Xem cuộc trò chuyện" : "Xem luật sư"}
          >
            {view === "browse" ? (
              <MessageCircle className="h-4 w-4" />
            ) : (
              <MessageSquare className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Search */}
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-[var(--color-neutral-50)] px-3 py-2">
          <Search className="h-4 w-4 text-[var(--color-neutral-500)]" />
          <input
            type="text"
            placeholder={view === "browse" ? "Tìm luật sư..." : "Tìm cuộc trò chuyện..."}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-[var(--color-neutral-950)] placeholder-[#9E9E9E] outline-none"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        {view === "browse" ? (
          <div className="space-y-3">
            {filteredLawyers.length > 0 ? (
              filteredLawyers.map((lawyer) => (
                <button
                  key={lawyer.id}
                  type="button"
                  onClick={() => setSelected(lawyer)}
                  className="flex w-full items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3 text-left shadow-sm transition-colors hover:bg-[var(--color-primary-light)]/40"
                >
                  <div
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-sm font-bold text-white"
                    style={{ backgroundColor: lawyer.color }}
                  >
                    {lawyer.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-[var(--color-neutral-950)]">{lawyer.name}</h3>
                      {lawyer.online && (
                        <div className="h-2 w-2 rounded-full bg-green-500" title="Đang hoạt động" />
                      )}
                    </div>
                    <p className="text-xs text-[var(--color-neutral-500)]">{lawyer.specialty}</p>
                    <div className="mt-1.5 flex items-center gap-2 text-[10px] text-[var(--color-neutral-700)]">
                      <div className="flex items-center gap-0.5">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{lawyer.rating.toFixed(1)}</span>
                      </div>
                      <span>•</span>
                      <span>{lawyer.cases} hồ sơ</span>
                      <span>•</span>
                      <span>{lawyer.responseTime}</span>
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="flex h-32 items-center justify-center text-center">
                <p className="text-sm text-[var(--color-neutral-500)]">Không tìm thấy luật sư phù hợp</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {threads.length > 0 ? (
              threads.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setConversation(t)}
                  className="flex w-full items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3 text-left shadow-sm transition-colors hover:bg-[var(--color-primary-light)]/40"
                >
                  <div
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-sm font-bold text-white"
                    style={{ backgroundColor: t.color }}
                  >
                    {t.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-[var(--color-neutral-950)]">{t.name}</h3>
                      {t.unread > 0 && (
                        <span className="grid h-5 w-5 place-items-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                          {t.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[var(--color-neutral-500)]">{t.specialty}</p>
                    <p className="mt-1 truncate text-xs text-[var(--color-neutral-700)]">{t.preview}</p>
                  </div>
                  <div className="text-right text-[10px] text-[#9E9E9E]">
                    <p>{t.time}</p>
                  </div>
                </button>
              ))
            ) : (
              <div className="flex h-32 items-center justify-center text-center">
                <p className="text-sm text-[var(--color-neutral-500)]">Chưa có cuộc trò chuyện nào</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function LawyerDetail({
  lawyer,
  onBack,
}: {
  lawyer: Lawyer
  onBack: () => void
}) {
  return (
    <div className="flex h-full flex-col overflow-hidden bg-[var(--color-neutral-50)]">
      {/* Header */}
      <div className="shrink-0 border-b border-gray-100 bg-white px-4 py-3">
        <button
          type="button"
          onClick={onBack}
          className="mb-3 text-sm font-semibold text-[var(--color-primary)] transition-opacity hover:opacity-70"
        >
          ← Quay lại
        </button>
        <div className="flex items-center gap-3">
          <div
            className="grid h-16 w-16 place-items-center rounded-full text-lg font-bold text-white"
            style={{ backgroundColor: lawyer.color }}
          >
            {lawyer.initials}
          </div>
          <div className="flex-1">
            <h1 className="text-base font-bold text-[var(--color-neutral-950)]">{lawyer.name}</h1>
            <p className="text-xs text-[var(--color-neutral-500)]">{lawyer.specialty}</p>
            <div className="mt-2 flex items-center gap-2 text-[11px] text-[var(--color-neutral-700)]">
              <span className="flex items-center gap-0.5">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                {lawyer.rating.toFixed(1)}
              </span>
              <span>•</span>
              <span>{lawyer.cases} hồ sơ</span>
              <span>•</span>
              <span>{lawyer.responseTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-4">
          {/* Bio */}
          <div>
            <p className="text-xs font-semibold text-[var(--color-neutral-500)] uppercase">Giới thiệu</p>
            <p className="mt-2 text-sm text-[#333333] leading-relaxed">{lawyer.bio}</p>
          </div>

          {/* Experience */}
          <div>
            <p className="text-xs font-semibold text-[var(--color-neutral-500)] uppercase">Kinh nghiệm</p>
            <p className="mt-2 text-sm font-semibold text-[var(--color-primary)]">{lawyer.experience} năm</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 rounded-xl bg-white p-3">
            <div className="text-center">
              <p className="text-xl font-bold text-[var(--color-primary)]">{lawyer.cases}</p>
              <p className="mt-0.5 text-[10px] text-[var(--color-neutral-700)]">Hồ sơ</p>
            </div>
            <div className="border-l border-r border-gray-100 text-center">
              <p className="text-xl font-bold text-[var(--color-primary)]">{lawyer.rating}</p>
              <p className="mt-0.5 text-[10px] text-[var(--color-neutral-700)]">Đánh giá</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-[var(--color-primary)]">{lawyer.responseTime}</p>
              <p className="mt-0.5 text-[10px] text-[var(--color-neutral-700)]">Phản hồi</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="shrink-0 border-t border-gray-100 bg-white px-4 py-3 space-y-2">
        <button
          type="button"
          className="w-full rounded-xl py-3 font-semibold text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
          style={{ backgroundColor: lawyer.color }}
        >
          Đặt lịch tư vấn
        </button>
        <button
          type="button"
          className="w-full rounded-xl border border-[var(--color-primary)] py-3 text-sm font-semibold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary-light)]"
        >
          Nhắn tin
        </button>
      </div>
    </div>
  )
}
