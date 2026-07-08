"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Bookmark,
  Share2,
  Building2,
  CalendarDays,
  Tag,
  FileText,
  ChevronRight,
  Workflow,
  ListChecks,
} from "lucide-react"
import { docDetails, fallbackDoc, type LawDoc } from "../data"

export function DocumentDetail({
  doc,
  onBack,
  onOpenRelated,
}: {
  doc: LawDoc
  onBack: () => void
  onOpenRelated: (id: string) => void
}) {
  const detail = docDetails[doc.id] ?? { ...fallbackDoc, id: doc.id }
  const [tab, setTab] = useState<"original" | "overview">("overview")

  return (
    <div className="flex h-full flex-col bg-[#F5F5F5]">
      {/* Header */}
      <header className="flex items-center gap-2 border-b border-gray-100 bg-white px-3 py-2">
        <button
          type="button"
          onClick={onBack}
          aria-label="Quay lại"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[#1A1A1A] transition-colors hover:bg-[#F5F5F5]"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <p className="flex-1 truncate text-sm font-bold text-[#1A1A1A]">Chi tiết văn bản</p>
        <button
          type="button"
          aria-label="Lưu"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[#2854A8] transition-colors hover:bg-[#E6F0F9]"
        >
          <Bookmark className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Chia sẻ"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[#2854A8] transition-colors hover:bg-[#E6F0F9]"
        >
          <Share2 className="h-5 w-5" />
        </button>
      </header>

      {/* Title block (always visible) */}
      <div className="bg-white px-4 pb-3 pt-4">
        <div className="flex items-center gap-2">
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
              doc.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
            }`}
          >
            {doc.active ? "Còn hiệu lực" : "Hết hiệu lực"}
          </span>
          <span className="rounded-full bg-[#E6F0F9] px-2 py-0.5 text-[10px] font-bold text-[#2854A8]">
            {detail.field}
          </span>
        </div>
        <h1 className="mt-2 text-lg font-bold leading-snug text-[#1A1A1A] text-balance">{doc.title}</h1>

        {/* Tabs */}
        <div className="mt-4 grid grid-cols-2 gap-1 rounded-xl bg-[#F5F5F5] p-1">
          <TabBtn active={tab === "overview"} onClick={() => setTab("overview")} icon={Workflow} label="Lược đồ & Tóm tắt" />
          <TabBtn active={tab === "original"} onClick={() => setTab("original")} icon={FileText} label="Nội dung gốc" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {tab === "overview" ? (
          <>
            {/* Metadata */}
            <div className="mt-2 bg-white px-4 py-4">
              <h2 className="text-sm font-bold text-[#1A1A1A]">Thông tin văn bản</h2>
              <div className="mt-3 space-y-2 rounded-2xl bg-[#F5F5F5] p-3">
                <MetaRow icon={Tag} label="Số hiệu" value={detail.number} />
                <MetaRow icon={Building2} label="Cơ quan ban hành" value={detail.issuer} />
                <MetaRow icon={CalendarDays} label="Ngày hiệu lực" value={detail.effectiveDate} />
              </div>
            </div>

            {/* Summary */}
            <div className="mt-2 bg-white px-4 py-4">
              <h2 className="text-sm font-bold text-[#1A1A1A]">Tóm tắt nội dung</h2>
              <p className="mt-2 text-[13px] leading-relaxed text-[#5E5E5E]">{detail.summary}</p>
            </div>

            {/* Key points */}
            {detail.keyPoints.length > 0 && (
              <div className="mt-2 bg-white px-4 py-4">
                <h2 className="flex items-center gap-2 text-sm font-bold text-[#1A1A1A]">
                  <ListChecks className="h-4 w-4 text-[#2854A8]" />
                  Điểm chính
                </h2>
                <ul className="mt-3 space-y-2.5">
                  {detail.keyPoints.map((point, i) => (
                    <li key={i} className="flex gap-2.5">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#E6F0F9] text-[11px] font-bold text-[#2854A8]">
                        {i + 1}
                      </span>
                      <span className="text-[13px] leading-relaxed text-[#3A3A3A]">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Process diagram */}
            {detail.flow.length > 0 && (
              <div className="mt-2 bg-white px-4 py-4">
                <h2 className="flex items-center gap-2 text-sm font-bold text-[#1A1A1A]">
                  <Workflow className="h-4 w-4 text-[#2854A8]" />
                  Lược đồ áp dụng
                </h2>
                <div className="mt-3 flex items-stretch gap-2 overflow-x-auto pb-2">
                  {detail.flow.map((node, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="flex w-28 shrink-0 flex-col items-center rounded-xl border border-[#82ACDB]/40 bg-[#E6F0F9] px-3 py-3 text-center">
                        <span className="grid h-6 w-6 place-items-center rounded-full bg-[#2854A8] text-[11px] font-bold text-white">
                          {i + 1}
                        </span>
                        <span className="mt-2 text-xs font-bold text-[#2854A8]">{node.step}</span>
                        <span className="mt-1 text-[10px] leading-tight text-[#5E5E5E]">{node.note}</span>
                      </div>
                      {i < detail.flow.length - 1 && (
                        <ChevronRight className="h-5 w-5 shrink-0 text-[#82ACDB]" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related documents */}
            {detail.related.length > 0 && (
              <div className="mt-2 bg-white px-4 py-4">
                <h2 className="text-sm font-bold text-[#1A1A1A]">Văn bản liên quan</h2>
                <div className="mt-3 space-y-2">
                  {detail.related.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => onOpenRelated(r.id)}
                      className="flex w-full items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3 text-left transition-colors hover:bg-[#E6F0F9]/40"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#E6F0F9] text-[#2854A8]">
                        <FileText className="h-[18px] w-[18px]" />
                      </span>
                      <span className="min-w-0 flex-1 truncate text-[13px] font-semibold text-[#1A1A1A]">
                        {r.title}
                      </span>
                      <ChevronRight className="h-5 w-5 shrink-0 text-[#5E5E5E]" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          /* Original formatted content */
          <div className="mt-2 bg-white px-4 py-4">
            <h2 className="text-sm font-bold text-[#1A1A1A]">Nội dung chi tiết</h2>
            <div className="mt-3 space-y-4">
              {detail.articles.map((a) => (
                <div key={a.heading}>
                  <h3 className="text-[13px] font-bold text-[#2854A8]">{a.heading}</h3>
                  <div className="mt-1.5 space-y-1.5">
                    {a.body.map((p, i) => (
                      <p key={i} className="text-[13px] leading-relaxed text-[#3A3A3A]">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="h-4" />
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
        active ? "bg-white text-[#2854A8] shadow-sm" : "text-[#5E5E5E]"
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  )
}

function MetaRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Tag
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-2.5">
      <Icon className="h-4 w-4 shrink-0 text-[#5E5E5E]" />
      <span className="w-32 shrink-0 text-xs text-[#5E5E5E]">{label}</span>
      <span className="flex-1 text-right text-xs font-semibold text-[#1A1A1A]">{value}</span>
    </div>
  )
}
