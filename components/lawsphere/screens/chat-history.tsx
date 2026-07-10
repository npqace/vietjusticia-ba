"use client"

import { ArrowLeft, Plus, MessageSquare } from "lucide-react"
import { chatHistory } from "../data"

export function ChatHistoryScreen({ onClose, onNewChat }: { onClose: () => void; onNewChat: () => void }) {
  return (
    <div className="flex h-full flex-col bg-[#F5F5F5]">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 text-sm font-bold text-[#2854A8] hover:opacity-80"
          >
            <ArrowLeft className="h-5 w-5" />
            Quay lại
          </button>
          <h1 className="text-lg font-bold text-[#1A1A1A]">Lịch sử</h1>
          <button
            type="button"
            onClick={onNewChat}
            aria-label="Tạo cuộc trò chuyện mới"
            className="grid h-9 w-9 place-items-center rounded-full bg-[#2854A8] text-white transition-transform active:scale-95 hover:opacity-90"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* History list */}
      <div className="flex-1 space-y-2 overflow-y-auto px-4 py-4">
        {chatHistory.map((session) => (
          <button
            key={session.id}
            type="button"
            onClick={onNewChat}
            className="flex w-full gap-3 rounded-2xl border border-gray-100 bg-white p-3 text-left shadow-sm transition-colors hover:bg-[#E6F0F9]/40"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#E6F0F9] text-[#2854A8]">
              <MessageSquare className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-[#1A1A1A]">{session.title}</p>
              <p className="mt-0.5 truncate text-xs text-[#5E5E5E]">{session.preview}</p>
              <div className="mt-2 flex items-center justify-between text-[11px] text-[#999999]">
                <span>{session.date}</span>
                <span>{session.messageCount} tin nhắn</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
