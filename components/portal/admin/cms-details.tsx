"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import type { LawDoc } from "../data"

type Tab = "info" | "chunks" | "stats"

function SyncBadge({ on, label }: { on: boolean; label: string }) {
  return (
    <span
      className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${
        on ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400"
      }`}
    >
      {label}
    </span>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-slate-50 py-2 last:border-0">
      <span className="text-xs text-slate-400">{label}</span>
      <span className="text-right text-xs font-medium text-slate-700">{value}</span>
    </div>
  )
}

export function CmsDetails({
  doc,
  highlightedChunk,
  tab,
  onTabChange,
}: {
  doc: LawDoc
  highlightedChunk: string | null
  tab: Tab
  onTabChange: (t: Tab) => void
}) {
  const [openChunk, setOpenChunk] = useState<string | null>(highlightedChunk)

  const tabs: { id: Tab; label: string }[] = [
    { id: "info", label: "Thông tin" },
    { id: "chunks", label: "Đoạn văn" },
    { id: "stats", label: "Thống kê" },
  ]

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="border-b border-slate-100 px-4 pt-4">
        <h3 className="font-heading text-sm font-bold text-slate-900">{doc.title}</h3>
        <div className="mt-3 flex gap-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => onTabChange(t.id)}
              className={`relative px-3 py-2 text-xs font-semibold transition-colors ${
                tab === t.id ? "text-[var(--color-primary)]" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {t.label}
              {tab === t.id && (
                <span className="absolute inset-x-1 -bottom-px h-0.5 rounded-full" style={{ backgroundColor: "var(--color-primary)" }} />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {tab === "info" && (
          <div className="space-y-4">
            <div className="rounded-lg border border-slate-200 bg-white p-3">
              <InfoRow label="Số hiệu" value={doc.meta.number} />
              <InfoRow label="Cơ quan ban hành" value={doc.meta.issuer} />
              <InfoRow label="Người ký" value={doc.meta.signatory} />
              <InfoRow label="Ngày ban hành" value={doc.meta.issuedDate} />
              <InfoRow label="Ngày hiệu lực" value={doc.meta.effectiveDate} />
              <InfoRow label="Tình trạng" value={doc.status === "valid" ? "Còn hiệu lực" : "Hết hiệu lực"} />
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold text-slate-600">Sơ đồ ASCII tự động</p>
              <pre className="overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-[11px] leading-relaxed text-emerald-300">
                {doc.ascii}
              </pre>
            </div>
          </div>
        )}

        {tab === "chunks" && (
          <div className="flex flex-col gap-2">
            {doc.chunks.map((ch) => {
              const isOpen = openChunk === ch.id
              const isHi = highlightedChunk === ch.id
              return (
                <div
                  key={ch.id}
                  className={`overflow-hidden rounded-lg border transition-all ${
                    isHi ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 ring-1 ring-[var(--color-primary)]/30" : "border-slate-200 bg-white"
                  }`}
                >
                  <button
                    onClick={() => setOpenChunk(isOpen ? null : ch.id)}
                    className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-semibold text-[var(--color-primary)]">{ch.id}</span>
                      <span className="text-[10px] text-slate-400">{ch.chars} ký tự</span>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="border-t border-slate-100 px-3 py-2.5">
                      <p className="text-xs leading-relaxed text-slate-600">{ch.content}</p>
                      <div className="mt-2 flex gap-1.5">
                        <SyncBadge on={ch.qdrant} label="Qdrant" />
                        <SyncBadge on={ch.bm25} label="BM25" />
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {tab === "stats" && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <StatCard label="Tổng truy vấn RAG" value={doc.stats.totalQueries.toLocaleString("vi-VN")} />
              <StatCard label="Truy vấn / tuần" value={doc.stats.weeklyQueries.toLocaleString("vi-VN")} />
              <StatCard label="Lượt truy xuất" value={doc.stats.retrievals.toLocaleString("vi-VN")} />
              <StatCard label="Độ trễ TB" value={`${doc.stats.avgLatency} ms`} />
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-3">
              <p className="mb-2 text-xs font-semibold text-slate-600">Chi tiết hệ thống tệp</p>
              <InfoRow label="Thư mục gốc" value={doc.stats.folderPath} />
              <InfoRow label="Tốc độ xử lý" value={doc.stats.processSpeed} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <p className="text-[11px] text-slate-400">{label}</p>
      <p className="mt-1 font-heading text-lg font-bold text-slate-900">{value}</p>
    </div>
  )
}
