"use client"

import { useState } from "react"
import { X, FileText, Scale, ChevronRight } from "lucide-react"
import type { Citation } from "./data"

export function CitationDrawer({
  citation,
  onClose,
}: {
  citation: Citation | null
  onClose: () => void
}) {
  const [tab, setTab] = useState<"content" | "flow">("content")
  const open = citation !== null

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
        className={`absolute inset-x-0 bottom-0 flex h-[70%] flex-col rounded-t-3xl bg-white shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex flex-col px-5 pt-3">
          <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-gray-200" />
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[15px] font-bold leading-snug text-[var(--color-neutral-950)]">{citation?.title}</p>
              <p className="mt-1 text-xs text-[var(--color-neutral-500)]">{citation?.issuer}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--color-neutral-50)] text-[var(--color-neutral-500)] transition-colors hover:bg-gray-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Tabs */}
          <div className="mt-4 grid grid-cols-2 gap-1 rounded-xl bg-[var(--color-neutral-50)] p-1">
            <TabBtn active={tab === "content"} onClick={() => setTab("content")} icon={FileText} label="Nội dung" />
            <TabBtn active={tab === "flow"} onClick={() => setTab("flow")} icon={Scale} label="Lược đồ" />
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {tab === "content" ? (
            <article className="space-y-3 text-[13px] leading-relaxed text-[#333]">
              {citation?.content.map((line, i) => (
                <p key={i} className={i === 0 ? "font-bold text-[var(--color-primary)]" : ""}>
                  {line}
                </p>
              ))}
            </article>
          ) : (
            <div className="flex items-stretch gap-2 overflow-x-auto pb-2">
              {citation?.flow.map((node, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="flex w-28 shrink-0 flex-col items-center rounded-xl border border-[var(--color-secondary-mid)]/40 bg-[var(--color-primary-light)] px-3 py-3 text-center">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-[var(--color-primary)] text-[11px] font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="mt-2 text-xs font-bold text-[var(--color-primary)]">{node.step}</span>
                    <span className="mt-1 text-[10px] leading-tight text-[var(--color-neutral-500)]">{node.note}</span>
                  </div>
                  {i < (citation?.flow.length ?? 0) - 1 && (
                    <ChevronRight className="h-5 w-5 shrink-0 text-[var(--color-secondary-mid)]" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="border-t border-gray-100 px-5 py-3 pb-5">
          <button
            type="button"
            className="w-full rounded-2xl py-3.5 text-sm font-bold text-white shadow-sm transition-all active:scale-[0.98] hover:opacity-90"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            Yêu cầu tư vấn với Luật sư
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
        active ? "bg-white text-[var(--color-primary)] shadow-sm" : "text-[var(--color-neutral-500)]"
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  )
}
