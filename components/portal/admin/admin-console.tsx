"use client"

import { useState } from "react"
import { RefreshCw, Database } from "lucide-react"
import { VettingTable } from "./vetting-table"
import { MetricsWidget } from "./metrics"
import { DocumentCms } from "./document-cms"

type RebuildState = "idle" | "starting" | "rebuilding" | "done"

const rebuildLabels: Record<RebuildState, string> = {
  idle: "Sẵn sàng",
  starting: "Đang bắt đầu...",
  rebuilding: "Đang Rebuild...",
  done: "Hoàn thành trong 4.2s (1420 chunks)",
}

function ControlBar() {
  const [state, setState] = useState<RebuildState>("idle")
  const busy = state === "starting" || state === "rebuilding"

  function rebuild() {
    setState("starting")
    setTimeout(() => setState("rebuilding"), 700)
    setTimeout(() => setState("done"), 2600)
  }

  const chipClass =
    state === "done"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
      : busy
        ? "bg-amber-50 text-amber-700 ring-amber-200"
        : "bg-slate-100 text-slate-500 ring-slate-200"

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="font-heading text-lg font-bold text-slate-900">Bảng điều khiển quản trị</h1>
        <p className="text-sm text-slate-500">Giám sát chỉ mục, RAG và duyệt người dùng nền tảng.</p>
      </div>
      <div className="flex items-center gap-3">
        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ${chipClass}`}>
          <Database className="h-3.5 w-3.5" />
          {rebuildLabels[state]}
        </span>
        <button
          onClick={rebuild}
          disabled={busy}
          className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-all active:scale-95 disabled:opacity-70"
          style={{ backgroundColor: "#2854A8" }}
        >
          <RefreshCw className={`h-4 w-4 ${busy ? "animate-spin" : ""}`} />
          Rebuild BM25
        </button>
      </div>
    </div>
  )
}

export function AdminConsole({ active }: { active: string }) {
  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-6 p-6">
      <ControlBar />

      {(active === "dashboard" || active === "metrics") && <MetricsWidget />}

      {(active === "dashboard" || active === "vetting" || active === "users") && <VettingTable />}

      {(active === "dashboard" || active === "documents") && <DocumentCms />}
    </div>
  )
}
