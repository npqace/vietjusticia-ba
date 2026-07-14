"use client"

import { useState } from "react"
import {
  AlertTriangle,
  Clock,
  Send,
  Paperclip,
  Mail,
  Phone,
  MapPin,
  FileText,
  Download,
  Check,
  CheckCircle2,
  FileSearch,
} from "lucide-react"
import { urgentRequests, conversation, activeCase, type Urgent } from "../data"

const urgentMeta: Record<Urgent["status"], string> = {
  "Khẩn cấp": "bg-red-50 text-red-700 ring-red-200",
  "Mới": "bg-blue-50 text-[var(--color-primary)] ring-blue-200",
  "Chờ phản hồi": "bg-amber-50 text-amber-700 ring-amber-200",
}

function UrgentStack({ activeId, onSelect }: { activeId: string; onSelect: (id: string) => void }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-red-500" />
        <h2 className="font-heading text-sm font-bold text-slate-900">Yêu cầu cần xử lý</h2>
        <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
          {urgentRequests.length}
        </span>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {urgentRequests.map((r) => (
          <button
            key={r.id}
            onClick={() => onSelect(r.id)}
            className={`rounded-xl border bg-white dark:bg-[var(--color-neutral-50)] p-4 text-left transition-all hover:shadow-sm ${
              activeId === r.id ? "border-[var(--color-primary)] ring-1 ring-[var(--color-primary)]/30" : "border-slate-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${urgentMeta[r.status]}`}>
                {r.status}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400">
                <Clock className="h-3 w-3" />
                {r.expiresIn}
              </span>
            </div>
            <p className="mt-2.5 text-sm font-semibold text-slate-800">{r.subject}</p>
            <p className="mt-0.5 text-xs text-slate-500">
              {r.client} · {r.id}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}

function ChatPane() {
  const [draft, setDraft] = useState("")
  return (
    <div className="flex h-full min-h-0 flex-col rounded-xl border border-slate-200 bg-white dark:bg-[var(--color-neutral-50)]">
      <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3">
        <div className="relative">
          <div className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white" style={{ backgroundColor: "var(--color-secondary-mid)" }}>
            HN
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">{activeCase.client.name}</p>
          <p className="text-xs text-emerald-600">Đang trực tuyến</p>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {conversation.map((m) => {
          const isLawyer = m.from === "lawyer"
          return (
            <div key={m.id} className={`flex ${isLawyer ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                  isLawyer ? "rounded-br-sm text-white" : "rounded-bl-sm bg-slate-100 text-slate-700"
                }`}
                style={isLawyer ? { backgroundColor: "var(--color-primary)" } : undefined}
              >
                {m.text}
                <span className={`mt-1 block text-[10px] ${isLawyer ? "text-white/70" : "text-slate-400"}`}>
                  {m.time}
                </span>
              </div>
            </div>
          )
        })}
        {/* Typing indicator */}
        <div className="flex justify-start">
          <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-slate-100 px-3.5 py-3">
            <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 p-3">
        <div className="flex items-center gap-2">
          <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100">
            <Paperclip className="h-5 w-5" />
          </button>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Nhập tin nhắn tư vấn..."
            className="h-10 flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-[var(--color-primary)] focus:bg-white dark:bg-[var(--color-neutral-50)] focus:ring-2 focus:ring-[var(--color-secondary-mid)]/40"
          />
          <button
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white transition-all active:scale-95"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

function CasePane() {
  const c = activeCase
  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto rounded-xl border border-slate-200 bg-white dark:bg-[var(--color-neutral-50)] p-4">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-sm font-bold text-slate-900">Chi tiết hồ sơ</h3>
          <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[11px] text-slate-500">{c.requestId}</span>
        </div>
      </div>

      {/* Client info */}
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
        <p className="mb-2 text-xs font-semibold text-slate-600">Thông tin khách hàng</p>
        <div className="space-y-1.5 text-xs text-slate-600">
          <p className="flex items-center gap-2"><span className="font-semibold text-slate-800">{c.client.name}</span></p>
          <p className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-slate-400" />{c.client.email}</p>
          <p className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-slate-400" />{c.client.phone}</p>
          <p className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-slate-400" />{c.client.location}</p>
        </div>
      </div>

      {/* Documents */}
      <div>
        <p className="mb-2 text-xs font-semibold text-slate-600">Tài liệu đính kèm</p>
        <div className="flex flex-col gap-2">
          {c.documents.map((d) => (
            <div key={d.name} className="flex items-center gap-2 rounded-lg border border-slate-200 p-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50">
                <FileText className="h-4 w-4 text-red-500" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-slate-700">{d.name}</p>
                <p className="text-[10px] text-slate-400">{d.size}</p>
              </div>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-[var(--color-primary)]">
                <Download className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Milestones */}
      <div>
        <p className="mb-3 text-xs font-semibold text-slate-600">Tiến trình hồ sơ</p>
        <div className="space-y-0">
          {c.milestones.map((m, i) => {
            const isLast = i === c.milestones.length - 1
            return (
              <div key={m.label} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full ${
                      m.done ? "text-white" : "border-2 border-slate-200 bg-white dark:bg-[var(--color-neutral-50)] text-slate-300"
                    }`}
                    style={m.done ? { backgroundColor: "var(--color-primary)" } : undefined}
                  >
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  {!isLast && <div className={`h-7 w-0.5 ${m.done ? "bg-[var(--color-primary)]" : "bg-slate-200"}`} />}
                </div>
                <p className={`pt-0.5 text-xs ${m.done ? "font-semibold text-slate-800" : "text-slate-400"}`}>
                  {m.label}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* CTAs */}
      <div className="mt-auto flex flex-col gap-2 border-t border-slate-100 pt-4">
        <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white dark:bg-[var(--color-neutral-50)] px-3 py-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50">
          <FileSearch className="h-4 w-4" />
          Yêu cầu cung cấp thêm thông tin
        </button>
        <button
          className="inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-white transition-all active:scale-95"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          <Send className="h-4 w-4" />
          Gửi phản hồi pháp lý
        </button>
        <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-emerald-700">
          <CheckCircle2 className="h-4 w-4" />
          Hoàn thành &amp; Đóng hồ sơ
        </button>
      </div>
    </div>
  )
}

export function LawyerDesk() {
  const [activeId, setActiveId] = useState(urgentRequests[0].id)
  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-6 p-6">
      <div>
        <h1 className="font-heading text-lg font-bold text-slate-900">Bàn làm việc luật sư</h1>
        <p className="text-sm text-slate-500">Quản lý yêu cầu tư vấn và trao đổi trực tiếp với khách hàng.</p>
      </div>

      <UrgentStack activeId={activeId} onSelect={setActiveId} />

      <div className="grid min-h-0 grid-cols-1 gap-6 lg:grid-cols-[60%_40%]" style={{ height: "640px" }}>
        <ChatPane />
        <CasePane />
      </div>
    </div>
  )
}
