"use client"

import { useState } from "react"
import { Plus, Bell, Send, FileText, Scale, Clock } from "lucide-react"
import { initialMessages, type ChatMessage, type Citation } from "../data"
import { CitationDrawer } from "../citation-drawer"
import { ChatHistoryScreen } from "./chat-history"

export function AiChatScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [draft, setDraft] = useState("")
  const [activeCitation, setActiveCitation] = useState<Citation | null>(null)
  const [showHistory, setShowHistory] = useState(false)

  const send = () => {
    if (!draft.trim()) return
    setMessages((m) => [...m, { id: `u-${Date.now()}`, role: "user", text: draft.trim() }])
    setDraft("")
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: `b-${Date.now()}`,
          role: "bot",
          text: "Cảm ơn câu hỏi của bạn. Tôi đang đối chiếu với cơ sở dữ liệu văn bản pháp luật để đưa ra câu trả lời chính xác kèm trích dẫn nguồn.",
        },
      ])
    }, 600)
  }

  const restart = () => setMessages([initialMessages[0]])

  if (showHistory) {
    return (
      <ChatHistoryScreen
        onClose={() => setShowHistory(false)}
        onNewChat={() => {
          setShowHistory(false)
          restart()
        }}
      />
    )
  }

  return (
    <div className="relative flex h-full flex-col bg-[var(--color-neutral-50)]">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-100 bg-white px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--color-primary)]">
            <Scale className="h-5 w-5 text-white" />
          </span>
          <div>
            <p className="text-sm font-bold leading-tight text-[var(--color-neutral-950)]">AI Luật Sư</p>
            <p className="text-[11px] text-[var(--color-neutral-500)]">Trợ lý pháp lý thông minh</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setShowHistory(true)}
            aria-label="Lịch sử"
            className="grid h-9 w-9 place-items-center rounded-full bg-[var(--color-neutral-50)] text-[var(--color-neutral-500)] transition-colors hover:bg-gray-200"
          >
            <Clock className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={restart}
            aria-label="Bắt đầu lại"
            className="grid h-9 w-9 place-items-center rounded-full bg-[var(--color-neutral-50)] text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary-light)]"
          >
            <Plus className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Thông báo"
            className="relative grid h-9 w-9 place-items-center rounded-full bg-[var(--color-neutral-50)] text-[var(--color-neutral-500)] transition-colors hover:bg-gray-200"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
        {messages.map((msg) =>
          msg.role === "user" ? (
            <div key={msg.id} className="flex justify-end">
              <div className="max-w-[80%] rounded-2xl rounded-br-md bg-[var(--color-primary)] px-4 py-2.5 text-[13px] leading-relaxed text-white shadow-sm">
                {msg.text}
              </div>
            </div>
          ) : (
            <div key={msg.id} className="flex flex-col items-start">
              <div className="max-w-[85%] rounded-2xl rounded-bl-md border border-gray-100 bg-white px-4 py-2.5 text-[13px] leading-relaxed text-[var(--color-neutral-950)] shadow-sm">
                {msg.text}
              </div>
              {msg.citations && (
                <div className="mt-2 flex flex-wrap gap-2 pl-1">
                  {msg.citations.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setActiveCitation(c)}
                      className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-[11px] font-medium text-[var(--color-neutral-500)] transition-colors hover:border-[var(--color-secondary-mid)] hover:bg-[var(--color-primary-light)] hover:text-[var(--color-primary)]"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      Nguồn: {c.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ),
        )}
      </div>

      {/* Input */}
      <div className="shrink-0 border-t border-gray-100 bg-white px-4 py-3">
        <div className="flex items-center gap-2">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Nhập câu hỏi của bạn tại đây..."
            className="h-11 flex-1 rounded-full border border-gray-200 bg-[var(--color-neutral-50)] px-4 text-[13px] text-[var(--color-neutral-950)] outline-none transition-colors focus:border-[var(--color-secondary-mid)] focus:bg-white"
          />
          <button
            type="button"
            onClick={send}
            aria-label="Gửi"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--color-primary)] text-white shadow-sm transition-all active:scale-90 hover:opacity-90"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>

      <CitationDrawer citation={activeCitation} onClose={() => setActiveCitation(null)} />
    </div>
  )
}
