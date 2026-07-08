"use client"

import { useState } from "react"
import { ArrowLeft, Phone, CalendarPlus, Star, Briefcase, Clock, Paperclip, Send, MoreVertical } from "lucide-react"
import { threadMessages, lawyerInfo, type Thread } from "../data"

export function ConversationDetail({ thread, onBack }: { thread: Thread; onBack: () => void }) {
  const info = lawyerInfo[thread.id]
  const [messages, setMessages] = useState(threadMessages[thread.id] ?? [])
  const [draft, setDraft] = useState("")

  function send() {
    const text = draft.trim()
    if (!text) return
    setMessages((prev) => [
      ...prev,
      { id: `local-${prev.length}`, from: "user", text, time: "Bây giờ" },
    ])
    setDraft("")
  }

  return (
    <div className="flex h-full flex-col bg-[#F5F5F5]">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white px-3 pb-3 pt-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            aria-label="Quay lại"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[#1A1A1A] transition-colors hover:bg-[#F5F5F5]"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div className="relative shrink-0">
            <span
              className="grid h-10 w-10 place-items-center rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: thread.color }}
            >
              {thread.initials}
            </span>
            {info?.online && (
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-[#1A1A1A]">{thread.name}</p>
            <p className="text-[11px] text-[#5E5E5E]">
              {info?.online ? "Đang hoạt động" : "Hoạt động gần đây"} · {thread.specialty}
            </p>
          </div>

          <button
            type="button"
            aria-label="Gọi điện"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[#2854A8] transition-colors hover:bg-[#E6F0F9]"
          >
            <Phone className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Tùy chọn"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[#5E5E5E] transition-colors hover:bg-[#F5F5F5]"
          >
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>

        {/* Lawyer quick stats */}
        {info && (
          <div className="mt-3 flex items-center justify-around rounded-xl bg-[#F5F5F5] py-2">
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-[#F5A623] text-[#F5A623]" />
              <span className="text-xs font-semibold text-[#1A1A1A]">{info.rating}</span>
            </div>
            <div className="h-4 w-px bg-gray-200" />
            <div className="flex items-center gap-1.5">
              <Briefcase className="h-4 w-4 text-[#2854A8]" />
              <span className="text-xs font-semibold text-[#1A1A1A]">{info.cases} hồ sơ</span>
            </div>
            <div className="h-4 w-px bg-gray-200" />
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-[#2854A8]" />
              <span className="text-xs font-semibold text-[#1A1A1A]">{info.responseTime}</span>
            </div>
          </div>
        )}
      </header>

      {/* Messages */}
      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        <p className="text-center text-[11px] text-[#9A9A9A]">Hôm nay</p>
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed shadow-sm ${
                m.from === "user"
                  ? "rounded-br-md bg-[#2854A8] text-white"
                  : "rounded-bl-md border border-gray-100 bg-white text-[#1A1A1A]"
              }`}
            >
              <p>{m.text}</p>
              <p className={`mt-1 text-[10px] ${m.from === "user" ? "text-white/70" : "text-[#9A9A9A]"}`}>
                {m.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Book service CTA */}
      <div className="border-t border-gray-100 bg-white px-4 pt-3">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#E6F0F9] py-2.5 text-xs font-bold text-[#2854A8] transition-colors hover:bg-[#D4E4F0]"
        >
          <CalendarPlus className="h-4 w-4" />
          Đặt lịch tư vấn với luật sư
        </button>

        {/* Input bar */}
        <div className="flex items-center gap-2 py-3">
          <button
            type="button"
            aria-label="Đính kèm tệp"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-[#5E5E5E] transition-colors hover:bg-[#F5F5F5]"
          >
            <Paperclip className="h-5 w-5" />
          </button>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.nativeEvent.isComposing && e.keyCode !== 229) send()
            }}
            placeholder="Nhập tin nhắn..."
            className="h-10 flex-1 rounded-full border border-gray-200 bg-[#F5F5F5] px-4 text-[13px] text-[#1A1A1A] outline-none focus:border-[#82ACDB] focus:bg-white"
          />
          <button
            type="button"
            onClick={send}
            aria-label="Gửi"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#2854A8] text-white transition-transform active:scale-95"
          >
            <Send className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
