"use client"

import { useState } from "react"
import { X, FileText, Scale, ChevronRight, Tag, Building2, CalendarDays, Workflow, ListChecks } from "lucide-react"
import type { Citation } from "./data"

export function CitationDrawer({
  citation,
  onClose,
}: {
  citation: Citation | null
  onClose: () => void
}) {
  const [tab, setTab] = useState<"content" | "flow">("content")
  const [showAppointmentForm, setShowAppointmentForm] = useState(false)
  const [selectedLawyer, setSelectedLawyer] = useState("")
  const [description, setDescription] = useState("")
  const open = citation !== null

  const handleBookAppointment = () => {
    if (!selectedLawyer.trim() || !description.trim()) return
    // Handle appointment submission here
    console.log("[v0] Appointment booked:", { selectedLawyer, description, citation: citation?.id })
    setShowAppointmentForm(false)
    setSelectedLawyer("")
    setDescription("")
    onClose()
  }

  if (showAppointmentForm) {
    return (
      <div className="absolute inset-0 z-30 pointer-events-auto">
        {/* Backdrop */}
        <button
          type="button"
          aria-label="Đóng"
          onClick={() => setShowAppointmentForm(false)}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />

        {/* Appointment Form Sheet */}
        <div className="absolute inset-x-0 bottom-0 flex h-[75%] flex-col rounded-t-3xl bg-white dark:bg-[var(--color-neutral-50)] shadow-2xl">
          <div className="flex flex-col px-5 pt-3">
            <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-gray-200" />
            <button
              type="button"
              onClick={() => setShowAppointmentForm(false)}
              className="text-sm font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
            >
              ← Quay lại
            </button>
            <h2 className="mt-4 text-lg font-bold text-[var(--color-neutral-950)] dark:text-[var(--color-neutral-950)]">Đặt lịch tư vấn</h2>
            <p className="mt-1 text-sm text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)]">Về {citation?.title}</p>
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto space-y-4 px-5 py-4">
            <div>
              <label className="text-xs font-semibold text-[var(--color-neutral-950)] dark:text-[var(--color-neutral-950)]">Chọn luật sư</label>
              <select
                value={selectedLawyer}
                onChange={(e) => setSelectedLawyer(e.target.value)}
                className="mt-2 w-full rounded-xl border border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-200)] px-3 py-2.5 text-sm outline-none transition-colors focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary-light)]"
              >
                <option value="">Chọn một luật sư...</option>
                <option value="l1">Trần Minh Khoa - Luật sư Lao động</option>
                <option value="l2">Nguyễn Thị Hương - Luật sư Hôn nhân</option>
                <option value="l3">Lê Công Dương - Luật sư Doanh nghiệp</option>
                <option value="l4">Phạm Quốc Bảo - Luật sư Lao động</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-[var(--color-neutral-950)] dark:text-[var(--color-neutral-950)]">Mô tả vấn đề cần tư vấn</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Mô tả chi tiết vấn đề của bạn..."
                className="mt-2 h-32 w-full rounded-xl border border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-200)] px-3 py-2.5 text-sm placeholder-gray-400 outline-none transition-colors focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary-light)]"
              />
            </div>

            <div className="rounded-2xl bg-[var(--color-primary-light)] p-3">
              <p className="text-xs text-[var(--color-neutral-950)] dark:text-[var(--color-neutral-950)]">
                <span className="font-semibold">Tài liệu liên quan:</span> {citation?.title}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="border-t border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-200)] px-5 py-3 space-y-2 pb-5">
            <button
              type="button"
              onClick={handleBookAppointment}
              disabled={!selectedLawyer.trim() || !description.trim()}
              className="w-full rounded-xl bg-[var(--color-primary)] py-3 text-sm font-bold text-white transition-all active:scale-[0.98] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Gửi yêu cầu đặt lịch
            </button>
            <button
              type="button"
              onClick={() => setShowAppointmentForm(false)}
              className="w-full rounded-xl border border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-200)] py-3 text-sm font-bold text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)] transition-colors active:scale-[0.98] hover:bg-[var(--color-neutral-50)]"
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`absolute inset-0 z-30 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Đóng"
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Sheet */}
      <div
        className={`absolute inset-x-0 bottom-0 flex h-[70%] flex-col rounded-t-3xl bg-white dark:bg-[var(--color-neutral-50)] shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex flex-col px-5 pt-3">
          <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-gray-200" />
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[15px] font-bold leading-snug text-[var(--color-neutral-950)] dark:text-[var(--color-neutral-950)]">{citation?.title}</p>
              <p className="mt-1 text-xs text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)]">{citation?.issuer}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--color-neutral-50)] dark:bg-[var(--color-neutral-50)] text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)] transition-colors hover:bg-gray-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Tabs */}
          <div className="mt-4 grid grid-cols-2 gap-1 rounded-xl bg-[var(--color-neutral-50)] dark:bg-[var(--color-neutral-50)] p-1">
            <TabBtn active={tab === "content"} onClick={() => setTab("content")} icon={FileText} label="Nội dung" />
            <TabBtn active={tab === "flow"} onClick={() => setTab("flow")} icon={Scale} label="Lược đồ" />
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {tab === "content" ? (
            /* Content tab - Show full original article content */
            <article className="space-y-4 text-[13px] leading-relaxed">
              {Array.isArray(citation?.content) && citation.content.length > 0 ? (
                citation.content.map((line, i) => (
                  <p key={i} className={i === 0 ? "font-bold text-[var(--color-primary)]" : "text-[#3A3A3A]"}>
                    {line}
                  </p>
                ))
              ) : (
                <p className="text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)]">Không có nội dung</p>
              )}
            </article>
          ) : (
            /* Flow tab - Show metadata, summary, key points, and diagram */
            <div className="space-y-4">
              {/* Metadata */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wide text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)]">Thông tin văn bản</h3>
                <div className="mt-2 space-y-1.5 rounded-xl bg-[var(--color-neutral-50)] dark:bg-[var(--color-neutral-50)] p-2 text-[12px]">
                  <p className="flex items-center gap-2">
                    <Tag className="h-3.5 w-3.5 text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)]" />
                    <span className="font-semibold text-[var(--color-neutral-950)] dark:text-[var(--color-neutral-950)]">Số hiệu:</span>
                    <span className="text-[var(--color-neutral-700)] dark:text-[var(--color-neutral-700)]">{citation?.number}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Building2 className="h-3.5 w-3.5 text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)]" />
                    <span className="font-semibold text-[var(--color-neutral-950)] dark:text-[var(--color-neutral-950)]">Cơ quan:</span>
                    <span className="text-[var(--color-neutral-700)] dark:text-[var(--color-neutral-700)]">{citation?.issuer}</span>
                  </p>
                  {citation?.effectiveDate && (
                    <p className="flex items-center gap-2">
                      <CalendarDays className="h-3.5 w-3.5 text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)]" />
                      <span className="font-semibold text-[var(--color-neutral-950)] dark:text-[var(--color-neutral-950)]">Ngày hiệu lực:</span>
                      <span className="text-[var(--color-neutral-700)] dark:text-[var(--color-neutral-700)]">{citation.effectiveDate}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Summary if available */}
              {citation?.summary && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wide text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)]">Tóm tắt</h3>
                  <p className="mt-2 text-[12px] leading-relaxed text-[var(--color-neutral-700)] dark:text-[var(--color-neutral-700)]">{citation.summary}</p>
                </div>
              )}

              {/* Key points if available */}
              {citation?.keyPoints && citation.keyPoints.length > 0 && (
                <div>
                  <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)]">
                    <ListChecks className="h-4 w-4" />
                    Điểm chính
                  </h3>
                  <ul className="mt-2 space-y-1.5">
                    {citation.keyPoints.map((point, i) => (
                      <li key={i} className="flex gap-2 text-[11px]">
                        <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[var(--color-primary-light)] text-[8px] font-bold text-[var(--color-primary)]">
                          {i + 1}
                        </span>
                        <span className="leading-snug text-[#3A3A3A]">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Flow diagram */}
              {citation?.flow && citation.flow.length > 0 && (
                <div>
                  <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)]">
                    <Workflow className="h-4 w-4" />
                    Lược đồ áp dụng
                  </h3>
                  <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
                    {citation.flow.map((node, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="flex w-28 shrink-0 flex-col items-center rounded-xl border border-[var(--color-secondary-mid)]/40 bg-[var(--color-primary-light)] px-3 py-3 text-center">
                          <span className="grid h-6 w-6 place-items-center rounded-full bg-[var(--color-primary)] text-[11px] font-bold text-white">
                            {i + 1}
                          </span>
                          <span className="mt-2 text-xs font-bold text-[var(--color-primary)]">{node.step}</span>
                          <span className="mt-1 text-[10px] leading-tight text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)]">{node.note}</span>
                        </div>
                        {i < citation.flow.length - 1 && (
                          <ChevronRight className="h-5 w-5 shrink-0 text-[var(--color-secondary-mid)]" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="border-t border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-200)] px-5 py-3 pb-5">
          <button
            type="button"
            onClick={() => setShowAppointmentForm(true)}
            className="w-full rounded-2xl py-3.5 text-sm font-bold text-white shadow-sm transition-all active:scale-[0.98] hover:opacity-90"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            Đặt lịch tư vấn với Luật sư
          </button>
        </div>
      </div>
    </div>
  )
}

function TabBtn({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean
  onClick: () => void
  icon: typeof FileText
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition-all ${
        active ? "bg-white dark:bg-[var(--color-neutral-50)] text-[var(--color-primary)] shadow-sm" : "text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)]"
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  )
}
