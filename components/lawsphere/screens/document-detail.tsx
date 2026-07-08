"use client"

import { ArrowLeft, Bookmark, Share2, Building2, CalendarDays, Tag, FileText, ChevronRight } from "lucide-react"
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

      <div className="flex-1 overflow-y-auto">
        {/* Title block */}
        <div className="bg-white px-4 pb-4 pt-4">
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

          {/* Metadata */}
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

        {/* Articles */}
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
                    <FileText className="h-4.5 w-4.5" />
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

        <div className="h-4" />
      </div>
    </div>
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
