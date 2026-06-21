"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { caseRequests, caseSteps, type CaseRequest } from "../data"

const categories = ["Dịch vụ", "Tư vấn", "Trợ giúp"] as const

export function DashboardScreen() {
  const [cat, setCat] = useState<(typeof categories)[number]>("Dịch vụ")
  const filtered = caseRequests.filter((c) => c.category === cat)

  return (
    <div className="flex h-full flex-col bg-[#F5F5F5]">
      <header className="border-b border-gray-100 bg-white px-4 pb-3 pt-3">
        <h1 className="mb-3 text-lg font-bold text-[#1A1A1A]">Hoạt Động Của Tôi</h1>
        <div className="grid grid-cols-3 gap-1 rounded-xl bg-[#F5F5F5] p-1">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={`rounded-lg py-2 text-xs font-semibold transition-all ${
                cat === c ? "bg-white text-[#2854A8] shadow-sm" : "text-[#5E5E5E]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
        {filtered.map((req) => (
          <CaseCard key={req.id} req={req} />
        ))}
        {filtered.length === 0 && (
          <p className="pt-10 text-center text-sm text-[#5E5E5E]">Chưa có yêu cầu nào trong mục này.</p>
        )}
      </div>
    </div>
  )
}

function CaseCard({ req }: { req: CaseRequest }) {
  const currentIndex = caseSteps.indexOf(req.status)
  const statusColor =
    req.status === "Hoàn thành"
      ? "bg-green-100 text-green-700"
      : req.status === "Đang chờ"
        ? "bg-gray-100 text-gray-600"
        : "bg-[#E6F0F9] text-[#2854A8]"

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <p className="text-base font-bold leading-snug text-[#1A1A1A]">{req.title}</p>
        <span className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-bold ${statusColor}`}>{req.status}</span>
      </div>
      <p className="mt-1 text-xs text-[#5E5E5E]">{req.date}</p>

      {/* Step progress */}
      <div className="mt-4 flex items-center">
        {caseSteps.map((step, i) => {
          const done = i <= currentIndex
          const active = i === currentIndex
          return (
            <div key={step} className="flex flex-1 flex-col items-center">
              <div className="flex w-full items-center">
                {i > 0 && (
                  <div className={`h-0.5 flex-1 ${i <= currentIndex ? "bg-[#2854A8]" : "bg-gray-200"}`} />
                )}
                <div
                  className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[10px] font-bold transition-colors ${
                    done ? "bg-[#2854A8] text-white" : "bg-gray-200 text-gray-400"
                  } ${active ? "ring-4 ring-[#82ACDB]/40" : ""}`}
                >
                  {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </div>
                {i < caseSteps.length - 1 && (
                  <div className={`h-0.5 flex-1 ${i < currentIndex ? "bg-[#2854A8]" : "bg-gray-200"}`} />
                )}
              </div>
              <span
                className={`mt-1.5 text-center text-[9px] font-semibold leading-tight ${
                  done ? "text-[#2854A8]" : "text-[#5E5E5E]"
                }`}
              >
                {step}
              </span>
            </div>
          )
        })}
      </div>

      <button
        type="button"
        className="mt-4 w-full rounded-xl border border-[#2854A8] py-2.5 text-sm font-bold text-[#2854A8] transition-colors active:scale-[0.98] hover:bg-[#E6F0F9]"
      >
        Xem chi tiết
      </button>
    </div>
  )
}
