"use client"

import { useState } from "react"
import { UploadCloud, Search, FileCheck2, FileX2, ChevronLeft, ChevronRight } from "lucide-react"
import { documents, categories, validityFilters, type LawDoc } from "../data"

const requiredFiles = [
  { name: "metadata.json", required: true },
  { name: "cleaned_content.txt", required: true },
  { name: "page_content.html", required: false },
]

const pipelineOptions = [
  "Tạo sơ đồ ASCII",
  "Lập chỉ mục Qdrant",
  "Lập chỉ mục MongoDB",
  "Xây dựng chỉ mục BM25",
]

function IndexDot({ on, label }: { on: boolean; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-semibold ${
        on ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${on ? "bg-emerald-500" : "bg-slate-300"}`} />
      {label}
    </span>
  )
}

export function CmsUpload({
  selectedId,
  onSelect,
}: {
  selectedId: string
  onSelect: (doc: LawDoc) => void
}) {
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [pipeline, setPipeline] = useState<string[]>([pipelineOptions[0], pipelineOptions[1]])
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("Tất cả")

  function simulateUpload() {
    setUploading(true)
    setProgress(0)
    const t = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(t)
          setUploading(false)
          return 100
        }
        return p + 10
      })
    }, 180)
  }

  function togglePipeline(opt: string) {
    setPipeline((prev) => (prev.includes(opt) ? prev.filter((p) => p !== opt) : [...prev, opt]))
  }

  const filtered = documents.filter(
    (d) =>
      (category === "Tất cả" || d.category === category) &&
      d.title.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto p-4">
      {/* Upload zone */}
      <div>
        <button
          onClick={simulateUpload}
          className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center transition-colors hover:border-[var(--color-secondary-mid)] hover:bg-[var(--color-secondary-mid)]/5"
        >
          <UploadCloud className="h-7 w-7 text-[var(--color-primary)]" />
          <p className="text-sm font-semibold text-slate-700">Chọn thư mục văn bản</p>
          <p className="text-xs text-slate-400">Hỗ trợ tải lên cả thư mục (webkitdirectory)</p>
        </button>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {requiredFiles.map((f) => (
            <span
              key={f.name}
              className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium ${
                f.required ? "bg-blue-50 text-[var(--color-primary)]" : "bg-slate-100 text-slate-500"
              }`}
            >
              {f.required ? <FileCheck2 className="h-3 w-3" /> : <FileX2 className="h-3 w-3" />}
              {f.name}
            </span>
          ))}
        </div>
      </div>

      {/* Pipeline options */}
      <div className="rounded-lg border border-slate-200 bg-white dark:bg-[var(--color-neutral-50)] p-3">
        <p className="mb-2 text-xs font-semibold text-slate-600">Tùy chọn xử lý</p>
        <div className="grid grid-cols-2 gap-2">
          {pipelineOptions.map((opt) => (
            <label key={opt} className="flex cursor-pointer items-center gap-2 text-xs text-slate-600">
              <input
                type="checkbox"
                checked={pipeline.includes(opt)}
                onChange={() => togglePipeline(opt)}
                className="h-4 w-4 rounded border-slate-300 text-[var(--color-primary)] focus:ring-[var(--color-secondary-mid)]"
              />
              {opt}
            </label>
          ))}
        </div>
        {(uploading || progress > 0) && (
          <div className="mt-3">
            <div className="mb-1 flex justify-between text-[11px] text-slate-500">
              <span>{uploading ? "Đang tải lên..." : "Hoàn thành"}</span>
              <span>{progress}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full transition-all duration-200"
                style={{ width: `${progress}%`, backgroundColor: "var(--color-primary)" }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Search & filters */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm văn bản..."
            className="h-9 w-full rounded-lg border border-slate-200 bg-white dark:bg-[var(--color-neutral-50)] pl-8 pr-3 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-secondary-mid)]/40"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-9 rounded-lg border border-slate-200 bg-white dark:bg-[var(--color-neutral-50)] px-2 text-xs text-slate-600 outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-secondary-mid)]/40"
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <select className="h-9 rounded-lg border border-slate-200 bg-white dark:bg-[var(--color-neutral-50)] px-2 text-xs text-slate-600 outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-secondary-mid)]/40">
            {validityFilters.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Document list */}
      <div className="flex flex-col gap-2">
        {filtered.map((doc) => {
          const isSel = doc.id === selectedId
          return (
            <button
              key={doc.id}
              onClick={() => onSelect(doc)}
              className={`rounded-lg border p-3 text-left transition-all ${
                isSel
                  ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 ring-1 ring-[var(--color-primary)]/30"
                  : "border-slate-200 bg-white dark:bg-[var(--color-neutral-50)] hover:border-[var(--color-secondary-mid)]"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold text-slate-800">{doc.title}</p>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    doc.status === "valid"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {doc.status === "valid" ? "Còn hiệu lực" : "Hết hiệu lực"}
                </span>
              </div>
              <div className="mt-1.5 flex items-center gap-2 text-[11px] text-slate-400">
                <span className="rounded bg-slate-100 px-1.5 py-0.5 font-medium text-slate-500">{doc.category}</span>
                <span>{doc.uploadedAt}</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <IndexDot on={doc.indexing.mongo} label="MongoDB" />
                <IndexDot on={doc.indexing.qdrant} label="Qdrant" />
                <IndexDot on={doc.indexing.bm25} label="BM25" />
              </div>
            </button>
          )
        })}
      </div>

      {/* Pagination */}
      <div className="mt-auto flex items-center justify-between pt-2 text-xs text-slate-500">
        <button className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white dark:bg-[var(--color-neutral-50)] px-3 py-1.5 font-medium transition-colors hover:bg-slate-50">
          <ChevronLeft className="h-3.5 w-3.5" />
          Trước
        </button>
        <span>Trang 1 / 4</span>
        <button className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white dark:bg-[var(--color-neutral-50)] px-3 py-1.5 font-medium transition-colors hover:bg-slate-50">
          Sau
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}
