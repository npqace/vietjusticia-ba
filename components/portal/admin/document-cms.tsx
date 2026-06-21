"use client"

import { useState } from "react"
import { documents, type LawDoc } from "../data"
import { CmsUpload } from "./cms-upload"
import { CmsRag } from "./cms-rag"
import { CmsDetails } from "./cms-details"

type Tab = "info" | "chunks" | "stats"

export function DocumentCms() {
  const [selected, setSelected] = useState<LawDoc>(documents[0])
  const [highlightedChunk, setHighlightedChunk] = useState<string | null>(null)
  const [tab, setTab] = useState<Tab>("info")

  function handleCitation(doc: LawDoc, chunkId: string) {
    setSelected(doc)
    setHighlightedChunk(chunkId)
    setTab("chunks")
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-100 px-5 py-4">
        <h2 className="font-heading text-base font-bold text-slate-900">Quản lý văn bản</h2>
        <p className="text-xs text-slate-500">Tải lên, kiểm thử RAG và xem chi tiết tài liệu pháp luật.</p>
      </div>
      <div className="grid grid-cols-1 divide-y divide-slate-100 lg:grid-cols-[30%_35%_35%] lg:divide-x lg:divide-y-0">
        <div className="min-h-[640px]">
          <CmsUpload
            selectedId={selected.id}
            onSelect={(d) => {
              setSelected(d)
              setHighlightedChunk(null)
            }}
          />
        </div>
        <div className="min-h-[640px] bg-slate-50/40">
          <CmsRag onCitationClick={handleCitation} />
        </div>
        <div className="min-h-[640px]">
          <CmsDetails doc={selected} highlightedChunk={highlightedChunk} tab={tab} onTabChange={setTab} />
        </div>
      </div>
    </div>
  )
}
