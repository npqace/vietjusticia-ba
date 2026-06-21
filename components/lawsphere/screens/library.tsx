"use client"

import { useState } from "react"
import { Search, SlidersHorizontal, FileText } from "lucide-react"
import { lawDocs, procedures } from "../data"

export function LibraryScreen() {
  const [seg, setSeg] = useState<"docs" | "proc">("docs")
  const [query, setQuery] = useState("")
  const list = seg === "docs" ? lawDocs : procedures
  const filtered = list.filter((d) => d.title.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="flex h-full flex-col bg-[#F5F5F5]">
      <header className="border-b border-gray-100 bg-white px-4 pb-3 pt-3">
        <h1 className="mb-3 text-lg font-bold text-[#1A1A1A]">Thư Viện Pháp Luật</h1>
        {/* Segmented control */}
        <div className="grid grid-cols-2 gap-1 rounded-xl bg-[#F5F5F5] p-1">
          <button
            type="button"
            onClick={() => setSeg("docs")}
            className={`rounded-lg py-2 text-xs font-semibold transition-all ${
              seg === "docs" ? "bg-white text-[#2854A8] shadow-sm" : "text-[#5E5E5E]"
            }`}
          >
            Văn bản pháp luật
          </button>
          <button
            type="button"
            onClick={() => setSeg("proc")}
            className={`rounded-lg py-2 text-xs font-semibold transition-all ${
              seg === "proc" ? "bg-white text-[#2854A8] shadow-sm" : "text-[#5E5E5E]"
            }`}
          >
            Thủ tục hành chính
          </button>
        </div>
        {/* Search */}
        <div className="relative mt-3 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5E5E5E]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tra cứu văn bản, nghị định..."
              className="h-10 w-full rounded-xl border border-gray-200 bg-[#F5F5F5] pl-9 pr-3 text-[13px] text-[#1A1A1A] outline-none focus:border-[#82ACDB] focus:bg-white"
            />
          </div>
          <button
            type="button"
            aria-label="Bộ lọc"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-gray-200 bg-white text-[#2854A8] transition-colors hover:bg-[#E6F0F9]"
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
            className="flex w-full items-start gap-3 rounded-2xl border border-gray-100 bg-white p-3 text-left shadow-sm transition-colors hover:bg-[#E6F0F9]/40"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#E6F0F9] text-[#2854A8]">
              <FileText className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-bold leading-snug text-[#1A1A1A]">{d.title}</p>
              <div className="mt-1.5 flex items-center justify-between gap-2">
                <span className="text-xs text-[#5E5E5E]">{d.date}</span>
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
          <p className="pt-10 text-center text-sm text-[#5E5E5E]">Không tìm thấy kết quả phù hợp.</p>
        )}
      </div>
    </div>
  )
}
