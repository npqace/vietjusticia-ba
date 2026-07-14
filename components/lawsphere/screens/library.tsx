"use client"

import { useState } from "react"
import { Search, SlidersHorizontal, FileText } from "lucide-react"
import { lawDocs, procedures, type LawDoc } from "../data"
import { DocumentDetail } from "./document-detail"

export function LibraryScreen() {
  const [seg, setSeg] = useState<"docs" | "proc">("docs")
  const [query, setQuery] = useState("")
  const [active, setActive] = useState<LawDoc | null>(null)
  const list = seg === "docs" ? lawDocs : procedures
  const filtered = list.filter((d) => d.title.toLowerCase().includes(query.toLowerCase()))

  if (active) {
    return (
      <DocumentDetail
        doc={active}
        onBack={() => setActive(null)}
        onOpenRelated={(id) => {
          const found = [...lawDocs, ...procedures].find((d) => d.id === id)
          if (found) setActive(found)
        }}
      />
    )
  }

  return (
    <div className="flex h-full flex-col bg-[var(--color-neutral-50)] dark:bg-[var(--color-neutral-50)]">
      <header className="border-b border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-200)] bg-white dark:bg-[var(--color-neutral-50)] px-4 pb-3 pt-3">
        <h1 className="mb-3 text-lg font-bold text-[var(--color-neutral-950)] dark:text-[var(--color-neutral-950)]">Thư Viện Pháp Luật</h1>
        {/* Segmented control */}
        <div className="grid grid-cols-2 gap-1 rounded-xl bg-[var(--color-neutral-50)] dark:bg-[var(--color-neutral-50)] p-1">
          <button
            type="button"
            onClick={() => setSeg("docs")}
            className={`rounded-lg py-2 text-xs font-semibold transition-all ${
              seg === "docs" ? "bg-white dark:bg-[var(--color-neutral-50)] text-[var(--color-primary)] shadow-sm" : "text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)]"
            }`}
          >
            Văn bản pháp luật
          </button>
          <button
            type="button"
            onClick={() => setSeg("proc")}
            className={`rounded-lg py-2 text-xs font-semibold transition-all ${
              seg === "proc" ? "bg-white dark:bg-[var(--color-neutral-50)] text-[var(--color-primary)] shadow-sm" : "text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)]"
            }`}
          >
            Thủ tục hành chính
          </button>
        </div>
        {/* Search */}
        <div className="relative mt-3 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tra cứu văn bản, nghị định..."
              className="h-10 w-full rounded-xl border border-gray-200 bg-[var(--color-neutral-50)] dark:bg-[var(--color-neutral-50)] pl-9 pr-3 text-[13px] text-[var(--color-neutral-950)] dark:text-[var(--color-neutral-950)] outline-none focus:border-[var(--color-secondary-mid)] focus:bg-white dark:bg-[var(--color-neutral-50)]"
            />
          </div>
          <button
            type="button"
            aria-label="Bộ lọc"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-gray-200 bg-white dark:bg-[var(--color-neutral-50)] text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary-light)]"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>
      </header>

      <div className="flex-1 space-y-2 overflow-y-auto px-4 py-3">
        {filtered.map((d) => (
          <button
            key={d.id}
            type="button"
            onClick={() => setActive(d)}
            className="flex w-full items-start gap-3 rounded-2xl border border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-200)] bg-white dark:bg-[var(--color-neutral-50)] p-3 text-left shadow-sm transition-colors hover:bg-[var(--color-primary-light)]/40"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--color-primary-light)] text-[var(--color-primary)]">
              <FileText className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-bold leading-snug text-[var(--color-neutral-950)] dark:text-[var(--color-neutral-950)]">{d.title}</p>
              <div className="mt-1.5 flex items-center justify-between gap-2">
                <span className="text-xs text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)]">{d.date}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    d.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                  }`}
                >
                  {d.active ? "Còn hiệu lực" : "Hết hiệu lực"}
                </span>
              </div>
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="pt-10 text-center text-sm text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)]">Không tìm thấy kết quả phù hợp.</p>
        )}
      </div>
    </div>
  )
}
