"use client"

import { useState } from "react"
import { X, AlertTriangle } from "lucide-react"
import type { Lawyer } from "../data"

const reasons = [
  "Số giấy phép không hợp lệ",
  "Thông tin chưa đầy đủ",
  "Nghi ngờ giả mạo hồ sơ",
  "Lý do khác",
]

export function RejectModal({
  lawyer,
  onClose,
  onConfirm,
}: {
  lawyer: Lawyer
  onClose: () => void
  onConfirm: (reason: string, note: string) => void
}) {
  const [reason, setReason] = useState(reasons[0])
  const [note, setNote] = useState("")

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="flex items-start justify-between border-b border-slate-100 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-heading text-base font-bold text-slate-900">Từ chối hồ sơ</h3>
              <p className="text-xs text-slate-500">
                {lawyer.name} · {lawyer.id}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100"
            aria-label="Đóng"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 p-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Lý do từ chối</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition-colors focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-secondary-mid)]/40"
            >
              {reasons.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Ghi chú gửi luật sư</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="Nhập nội dung phản hồi chi tiết..."
              className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-secondary-mid)]/40"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-slate-100 bg-slate-50 p-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100"
          >
            Hủy
          </button>
          <button
            onClick={() => onConfirm(reason, note)}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
          >
            Xác nhận từ chối
          </button>
        </div>
      </div>
    </div>
  )
}
