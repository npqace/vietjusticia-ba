"use client"

import { useState } from "react"
import { Sparkles, Play, FileText } from "lucide-react"
import { ragCitations, documents, type LawDoc } from "../data"

export function CmsRag({
  onCitationClick,
}: {
  onCitationClick: (doc: LawDoc, chunkId: string) => void
}) {
  const [query, setQuery] = useState("Quy định học phí 2024")
  const [running, setRunning] = useState(false)
  const [answered, setAnswered] = useState(true)

  function runTest() {
    setRunning(true)
    setAnswered(false)
    setTimeout(() => {
      setRunning(false)
      setAnswered(true)
    }, 900)
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) runTest()
  }

  return (
    <div className="flex h-full flex-col gap-3 overflow-y-auto p-4">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-[var(--color-primary)]" />
        <h3 className="font-heading text-sm font-bold text-slate-900">Bộ kiểm thử RAG</h3>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white dark:bg-[var(--color-neutral-50)] p-3">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKey}
          rows={3}
          placeholder="Nhập câu hỏi kiểm thử..."
          className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-[var(--color-primary)] focus:bg-white dark:bg-[var(--color-neutral-50)] focus:ring-2 focus:ring-[var(--color-secondary-mid)]/40"
        />
        <div className="mt-2 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">Ctrl + Enter để chạy</span>
          <button
            onClick={runTest}
            disabled={running}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-white transition-all active:scale-95 disabled:opacity-60"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            <Play className={`h-3.5 w-3.5 ${running ? "animate-pulse" : ""}`} />
            {running ? "Đang truy vấn..." : "Chạy truy vấn"}
          </button>
        </div>
      </div>

      {answered && (
        <>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-600">Phản hồi AI</span>
              <span className="rounded bg-white dark:bg-[var(--color-neutral-50)] px-2 py-0.5 text-[10px] font-semibold text-emerald-600 ring-1 ring-emerald-100">
                450 ms
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-700">
              Theo Nghị định 81/2021/NĐ-CP, mức trần học phí năm học 2024 đối với cơ sở giáo dục đại học công lập
              chưa tự bảo đảm chi thường xuyên được áp dụng theo lộ trình tăng quy định tại Điều 9 và Điều 10, không
              vượt quá tỷ lệ trần hằng năm.
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold text-slate-600">
              Nguồn trích dẫn ({ragCitations.length})
            </p>
            <div className="flex flex-col gap-2">
              {ragCitations.map((c, i) => {
                const doc = documents.find((d) => d.id === c.docId)!
                return (
                  <button
                    key={i}
                    onClick={() => onCitationClick(doc, c.chunkId)}
                    className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white dark:bg-[var(--color-neutral-50)] p-2.5 text-left transition-all hover:border-[var(--color-secondary-mid)] hover:shadow-sm"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                      <FileText className="h-4 w-4 text-[var(--color-primary)]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold text-slate-700">{c.title}</p>
                      <p className="truncate font-mono text-[10px] text-slate-400">{c.chunkId}</p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        c.score >= 0.85
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      Điểm: {c.score.toFixed(2)}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
