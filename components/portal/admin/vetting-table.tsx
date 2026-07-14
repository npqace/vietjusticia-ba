"use client"

import { useState } from "react"
import { Check, X } from "lucide-react"
import { lawyers as initialLawyers, vettingStatusMeta, type Lawyer, type VettingStatus } from "../data"
import { RejectModal } from "./reject-modal"

export function VettingTable() {
  const [rows, setRows] = useState<Lawyer[]>(initialLawyers)
  const [rejecting, setRejecting] = useState<Lawyer | null>(null)

  function setStatus(id: string, status: VettingStatus) {
    setRows((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)))
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white dark:bg-[var(--color-neutral-50)]">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div>
          <h2 className="font-heading text-base font-bold text-slate-900">Hàng đợi duyệt luật sư</h2>
          <p className="text-xs text-slate-500">Luật sư mới đăng ký cần xác minh giấy phép hành nghề.</p>
        </div>
        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-200">
          {rows.filter((r) => r.status === "pending").length} chờ duyệt
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
              <th className="px-5 py-3 font-semibold">ID</th>
              <th className="px-5 py-3 font-semibold">Họ tên</th>
              <th className="px-5 py-3 font-semibold">Email</th>
              <th className="px-5 py-3 font-semibold">Số cấp phép</th>
              <th className="px-5 py-3 font-semibold">Trạng thái</th>
              <th className="px-5 py-3 text-right font-semibold">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((l) => {
              const meta = vettingStatusMeta[l.status]
              return (
                <tr key={l.id} className="border-b border-slate-50 transition-colors hover:bg-slate-50/60 last:border-0">
                  <td className="px-5 py-3 font-mono text-xs text-slate-500">{l.id}</td>
                  <td className="px-5 py-3 font-medium text-slate-800">{l.name}</td>
                  <td className="px-5 py-3 text-slate-500">{l.email}</td>
                  <td className="px-5 py-3 font-mono text-xs text-slate-600">{l.license}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${meta.className}`}>
                      {meta.label}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setStatus(l.id, "active")}
                        disabled={l.status === "active"}
                        className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Check className="h-3.5 w-3.5" />
                        Phê duyệt
                      </button>
                      <button
                        onClick={() => setRejecting(l)}
                        className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-white dark:bg-[var(--color-neutral-50)] px-2.5 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50"
                      >
                        <X className="h-3.5 w-3.5" />
                        Từ chối
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {rejecting && (
        <RejectModal
          lawyer={rejecting}
          onClose={() => setRejecting(null)}
          onConfirm={() => {
            setStatus(rejecting.id, "locked")
            setRejecting(null)
          }}
        />
      )}
    </div>
  )
}
