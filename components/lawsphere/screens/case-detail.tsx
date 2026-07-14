"use client"

import { ArrowLeft, FileText, Download, MessageSquare, Check, UserPlus } from "lucide-react"
import { caseDetails, caseSteps, type CaseRequest } from "../data"

export function CaseDetail({ req, onBack }: { req: CaseRequest; onBack: () => void }) {
  const detail = caseDetails[req.id]
  const currentIndex = caseSteps.indexOf(req.status)
  const statusColor =
    req.status === "Hoàn thành"
      ? "bg-green-100 text-green-700"
      : req.status === "Đang chờ"
        ? "bg-gray-100 text-gray-600"
        : "bg-[var(--color-primary-light)] text-[var(--color-primary)]"

  return (
    <div className="flex h-full flex-col bg-[var(--color-neutral-50)] dark:bg-[var(--color-neutral-50)]">
      {/* Header */}
      <header className="flex items-center gap-2 border-b border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-200)] bg-white dark:bg-[var(--color-neutral-50)] px-3 py-2">
        <button
          type="button"
          onClick={onBack}
          aria-label="Quay lại"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[var(--color-neutral-950)] dark:text-[var(--color-neutral-950)] transition-colors hover:bg-[var(--color-neutral-50)] dark:bg-[var(--color-neutral-50)]"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <p className="flex-1 truncate text-sm font-bold text-[var(--color-neutral-950)] dark:text-[var(--color-neutral-950)]">Chi tiết yêu cầu</p>
      </header>

      <div className="flex-1 overflow-y-auto">
        {/* Title */}
        <div className="bg-white dark:bg-[var(--color-neutral-50)] px-4 pb-4 pt-4">
          <div className="flex items-start justify-between gap-2">
            <h1 className="text-lg font-bold leading-snug text-[var(--color-neutral-950)] dark:text-[var(--color-neutral-950)] text-balance">{req.title}</h1>
            <span className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-bold ${statusColor}`}>
              {req.status}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <span className="rounded-md bg-[var(--color-primary-light)] px-2 py-0.5 text-[10px] font-semibold text-[var(--color-primary)]">
              {req.category}
            </span>
            <span className="text-xs text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)]">{req.date}</span>
          </div>
          {detail && <p className="mt-3 text-[13px] leading-relaxed text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)]">{detail.description}</p>}
        </div>

        {/* Assigned lawyer */}
        <div className="mt-2 bg-white dark:bg-[var(--color-neutral-50)] px-4 py-4">
          <h2 className="text-sm font-bold text-[var(--color-neutral-950)] dark:text-[var(--color-neutral-950)]">Luật sư phụ trách</h2>
          {detail?.lawyer ? (
            <div className="mt-3 flex items-center gap-3 rounded-2xl border border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-200)] bg-white dark:bg-[var(--color-neutral-50)] p-3">
              <span
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-bold text-white"
                style={{ backgroundColor: detail.lawyer.color }}
              >
                {detail.lawyer.initials}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-[var(--color-neutral-950)] dark:text-[var(--color-neutral-950)]">{detail.lawyer.name}</p>
                <p className="text-xs text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)]">{detail.lawyer.specialty}</p>
              </div>
              <button
                type="button"
                aria-label="Nhắn tin"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary-light)]"
              >
                <MessageSquare className="h-4.5 w-4.5" />
              </button>
            </div>
          ) : (
            <div className="mt-3 flex flex-col items-center gap-2 rounded-2xl border border-dashed border-gray-200 bg-[var(--color-neutral-50)] dark:bg-[var(--color-neutral-50)] px-4 py-6 text-center">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white dark:bg-[var(--color-neutral-50)] text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)]">
                <UserPlus className="h-5 w-5" />
              </span>
              <p className="text-xs text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)]">Đang chờ hệ thống ghép nối luật sư phù hợp...</p>
            </div>
          )}
        </div>

        {/* Timeline */}
        <div className="mt-2 bg-white dark:bg-[var(--color-neutral-50)] px-4 py-4">
          <h2 className="text-sm font-bold text-[var(--color-neutral-950)] dark:text-[var(--color-neutral-950)]">Tiến trình xử lý</h2>
          <div className="mt-4">
            {detail?.timeline.map((ev, i) => {
              const last = i === detail.timeline.length - 1
              return (
                <div key={ev.title} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-[10px] font-bold ${
                        ev.done ? "bg-[var(--color-primary)] text-white" : "border-2 border-gray-200 bg-white dark:bg-[var(--color-neutral-50)] text-gray-300"
                      }`}
                    >
                      {ev.done ? <Check className="h-3.5 w-3.5" /> : i + 1}
                    </div>
                    {!last && <div className={`w-0.5 flex-1 ${ev.done ? "bg-[var(--color-primary)]" : "bg-gray-200"}`} />}
                  </div>
                  <div className={`pb-5 ${last ? "" : ""}`}>
                    <p className={`text-[13px] font-semibold ${ev.done ? "text-[var(--color-neutral-950)] dark:text-[var(--color-neutral-950)]" : "text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)]"}`}>
                      {ev.title}
                    </p>
                    <p className="text-xs text-[#9A9A9A]">{ev.date}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Documents */}
        {detail && detail.documents.length > 0 && (
          <div className="mt-2 bg-white dark:bg-[var(--color-neutral-50)] px-4 py-4">
            <h2 className="text-sm font-bold text-[var(--color-neutral-950)] dark:text-[var(--color-neutral-950)]">Tài liệu đính kèm</h2>
            <div className="mt-3 space-y-2">
              {detail.documents.map((d) => (
                <div
                  key={d.name}
                  className="flex items-center gap-3 rounded-2xl border border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-200)] bg-white dark:bg-[var(--color-neutral-50)] p-3"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[var(--color-primary-light)] text-[var(--color-primary)]">
                    <FileText className="h-4.5 w-4.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-semibold text-[var(--color-neutral-950)] dark:text-[var(--color-neutral-950)]">{d.name}</p>
                    <p className="text-xs text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)]">{d.size}</p>
                  </div>
                  <button
                    type="button"
                    aria-label="Tải xuống"
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary-light)]"
                  >
                    <Download className="h-4.5 w-4.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="h-4" />
      </div>

      {/* Bottom action */}
      <div className="border-t border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-200)] bg-white dark:bg-[var(--color-neutral-50)] px-4 py-3">
        <button
          type="button"
          className="w-full rounded-xl bg-[var(--color-primary)] py-3 text-sm font-bold text-white transition-all active:scale-[0.98] hover:opacity-90"
        >
          {req.status === "Hoàn thành" ? "Đánh giá dịch vụ" : "Liên hệ luật sư"}
        </button>
      </div>
    </div>
  )
}
