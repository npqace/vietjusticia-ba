"use client"

import { useState } from "react"
import { Check, Plus } from "lucide-react"
import { caseRequests, caseSteps, type CaseRequest } from "../data"
import { CaseDetail } from "./case-detail"

const categories = ["Dịch vụ", "Tư vấn", "Trợ giúp"] as const

type RequestType = "help" | "appointment" | "service" | null

export function DashboardScreen() {
  const [cat, setCat] = useState<(typeof categories)[number]>("Dịch vụ")
  const [active, setActive] = useState<CaseRequest | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [requestForm, setRequestForm] = useState<RequestType>(null)
  const filtered = caseRequests.filter((c) => c.category === cat)

  if (active) {
    return <CaseDetail req={active} onBack={() => setActive(null)} />
  }

  if (requestForm) {
    return <RequestForm type={requestForm} onClose={() => setRequestForm(null)} />
  }

  return (
    <div className="flex h-full flex-col bg-[var(--color-neutral-50)] dark:bg-[var(--color-neutral-50)]">
      <header className="border-b border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-200)] bg-white dark:bg-[var(--color-neutral-50)] px-4 pb-3 pt-3">
        <div className="mb-3 flex items-center justify-between">
          <h1 className="text-lg font-bold text-[var(--color-neutral-950)] dark:text-[var(--color-neutral-950)]">Yêu Cầu Của Tôi</h1>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="grid h-9 w-9 place-items-center rounded-full bg-[var(--color-primary)] text-white transition-transform active:scale-95 hover:bg-[#1f4080]"
            aria-label="Tạo yêu cầu mới"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-1 rounded-xl bg-[var(--color-neutral-50)] dark:bg-[var(--color-neutral-50)] p-1">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={`rounded-lg py-2 text-xs font-semibold transition-all ${
                cat === c ? "bg-white dark:bg-[var(--color-neutral-50)] text-[var(--color-primary)] shadow-sm" : "text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
        {filtered.map((req) => (
          <CaseCard key={req.id} req={req} onOpen={() => setActive(req)} />
        ))}
        {filtered.length === 0 && (
          <p className="pt-10 text-center text-sm text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)]">Chưa có yêu cầu nào trong mục này.</p>
        )}
      </div>

      {/* Request creation modal */}
      {showModal && (
        <div className="absolute inset-0 z-50 flex items-end bg-black/30">
          <div className="w-full rounded-t-3xl bg-white dark:bg-[var(--color-neutral-50)] p-4 pb-6">
            <div className="mb-4 flex justify-center">
              <div className="h-1 w-12 rounded-full bg-gray-300" />
            </div>
            <h2 className="mb-4 text-center text-lg font-bold text-[var(--color-neutral-950)] dark:text-[var(--color-neutral-950)]">Chọn loại yêu cầu</h2>
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => {
                  setShowModal(false)
                  setRequestForm("help")
                }}
                className="flex w-full flex-col rounded-2xl border border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-200)] bg-white dark:bg-[var(--color-neutral-50)] p-4 text-left transition-colors hover:bg-[var(--color-primary-light)]/40"
              >
                <p className="font-bold text-[var(--color-neutral-950)] dark:text-[var(--color-neutral-950)]">Yêu cầu hỗ trợ</p>
                <p className="mt-1 text-xs text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)]">Báo cáo sự cố hoặc yêu cầu hỗ trợ từ quản trị viên</p>
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowModal(false)
                  setRequestForm("appointment")
                }}
                className="flex w-full flex-col rounded-2xl border border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-200)] bg-white dark:bg-[var(--color-neutral-50)] p-4 text-left transition-colors hover:bg-[var(--color-primary-light)]/40"
              >
                <p className="font-bold text-[var(--color-neutral-950)] dark:text-[var(--color-neutral-950)]">Đặt lịch tư vấn với luật sư</p>
                <p className="mt-1 text-xs text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)]">Chọn luật sư và đặt lịch tư vấn trực tiếp</p>
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowModal(false)
                  setRequestForm("service")
                }}
                className="flex w-full flex-col rounded-2xl border border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-200)] bg-white dark:bg-[var(--color-neutral-50)] p-4 text-left transition-colors hover:bg-[var(--color-primary-light)]/40"
              >
                <p className="font-bold text-[var(--color-neutral-950)] dark:text-[var(--color-neutral-950)]">Yêu cầu dịch vụ</p>
                <p className="mt-1 text-xs text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)]">Hệ thống sẽ ghép nối bạn với luật sư phù hợp</p>
              </button>
            </div>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="mt-4 w-full rounded-xl border border-gray-200 py-3 text-center text-sm font-semibold text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)] transition-colors active:scale-[0.98] hover:bg-gray-50"
            >
              Hủy
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function RequestForm({ type, onClose }: { type: RequestType; onClose: () => void }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [selectedLawyer, setSelectedLawyer] = useState("")
  const [category, setCategory] = useState("Lao động")

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) return
    onClose()
  }

  return (
    <div className="flex h-full flex-col bg-[var(--color-neutral-50)] dark:bg-[var(--color-neutral-50)]">
      <header className="border-b border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-200)] bg-white dark:bg-[var(--color-neutral-50)] px-4 py-3">
        <button
          type="button"
          onClick={onClose}
          className="text-sm font-bold text-[var(--color-primary)] hover:text-[#1f4080]"
        >
          ← Quay lại
        </button>
      </header>

      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
        {type === "help" && (
          <>
            <div>
              <label className="text-xs font-semibold text-[var(--color-neutral-950)] dark:text-[var(--color-neutral-950)]">Tiêu đề</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Mô tả sự cố hoặc vấn đề gặp phải"
                className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm placeholder-gray-400 outline-none transition-colors focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-secondary-mid)]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[var(--color-neutral-950)] dark:text-[var(--color-neutral-950)]">Chi tiết</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Mô tả chi tiết vấn đề để chúng tôi hỗ trợ tốt hơn"
                className="mt-2 h-32 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm placeholder-gray-400 outline-none transition-colors focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-secondary-mid)]"
              />
            </div>
          </>
        )}

        {type === "appointment" && (
          <>
            <div>
              <label className="text-xs font-semibold text-[var(--color-neutral-950)] dark:text-[var(--color-neutral-950)]">Chọn luật sư</label>
              <select
                value={selectedLawyer}
                onChange={(e) => setSelectedLawyer(e.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none transition-colors focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-secondary-mid)]"
              >
                <option value="">Chọn một luật sư...</option>
                <option value="l1">Trần Minh Khoa - Luật sư Đất đai</option>
                <option value="l2">Nguyễn Thị Hương - Luật sư Hôn nhân</option>
                <option value="l3">Lê Công Dương - Luật sư Doanh nghiệp</option>
                <option value="l4">Phạm Quốc Bảo - Luật sư Lao động</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-[var(--color-neutral-950)] dark:text-[var(--color-neutral-950)]">Mô tả vấn đề</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Mô tả vấn đề pháp lý cần tư vấn"
                className="mt-2 h-32 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm placeholder-gray-400 outline-none transition-colors focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-secondary-mid)]"
              />
            </div>
          </>
        )}

        {type === "service" && (
          <>
            <div>
              <label className="text-xs font-semibold text-[var(--color-neutral-950)] dark:text-[var(--color-neutral-950)]">Danh mục dịch vụ</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none transition-colors focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-secondary-mid)]"
              >
                <option value="Lao động">Lao động</option>
                <option value="Đất đai">Đất đai & BĐS</option>
                <option value="Hôn nhân">Hôn nhân & Gia đình</option>
                <option value="Doanh nghiệp">Doanh nghiệp & Thương mại</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-[var(--color-neutral-950)] dark:text-[var(--color-neutral-950)]">Tiêu đề</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nhập tiêu đề yêu cầu dịch vụ"
                className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm placeholder-gray-400 outline-none transition-colors focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-secondary-mid)]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[var(--color-neutral-950)] dark:text-[var(--color-neutral-950)]">Mô tả chi tiết</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Mô tả chi tiết nhu cầu để chúng tôi tìm luật sư phù hợp"
                className="mt-2 h-32 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm placeholder-gray-400 outline-none transition-colors focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-secondary-mid)]"
              />
            </div>
          </>
        )}
      </div>

      <div className="border-t border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-200)] bg-white dark:bg-[var(--color-neutral-50)] px-4 py-3 space-y-2">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!title.trim() || !description.trim() || (type === "appointment" && !selectedLawyer)}
          className="w-full rounded-xl bg-[var(--color-primary)] py-3 text-sm font-bold text-white transition-all active:scale-[0.98] hover:bg-[#1f4080] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Gửi yêu cầu
        </button>
        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-xl border border-gray-200 py-3 text-sm font-bold text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)] transition-colors active:scale-[0.98] hover:bg-gray-50"
        >
          Hủy
        </button>
      </div>
    </div>
  )
}

function CaseCard({ req, onOpen }: { req: CaseRequest; onOpen: () => void }) {
  const currentIndex = caseSteps.indexOf(req.status)
  const statusColor =
    req.status === "Hoàn thành"
      ? "bg-green-100 text-green-700"
      : req.status === "Đang chờ"
        ? "bg-gray-100 text-gray-600"
        : "bg-[var(--color-primary-light)] text-[var(--color-primary)]"

  return (
    <div className="rounded-2xl border border-[var(--color-neutral-200)] dark:border-[var(--color-neutral-200)] bg-white dark:bg-[var(--color-neutral-50)] p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <p className="text-base font-bold leading-snug text-[var(--color-neutral-950)] dark:text-[var(--color-neutral-950)]">{req.title}</p>
        <span className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-bold ${statusColor}`}>{req.status}</span>
      </div>
      <p className="mt-1 text-xs text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)]">{req.date}</p>

      {/* Step progress */}
      <div className="mt-4 flex items-center">
        {caseSteps.map((step, i) => {
          const done = i <= currentIndex
          const active = i === currentIndex
          return (
            <div key={step} className="flex flex-1 flex-col items-center">
              <div className="flex w-full items-center">
                {i > 0 && (
                  <div className={`h-0.5 flex-1 ${i <= currentIndex ? "bg-[var(--color-primary)]" : "bg-gray-200"}`} />
                )}
                <div
                  className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[10px] font-bold transition-colors ${
                    done ? "bg-[var(--color-primary)] text-white" : "bg-gray-200 text-gray-400"
                  } ${active ? "ring-4 ring-[var(--color-secondary-mid)]/40" : ""}`}
                >
                  {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </div>
                {i < caseSteps.length - 1 && (
                  <div className={`h-0.5 flex-1 ${i < currentIndex ? "bg-[var(--color-primary)]" : "bg-gray-200"}`} />
                )}
              </div>
              <span
                className={`mt-1.5 text-center text-[9px] font-semibold leading-tight ${
                  done ? "text-[var(--color-primary)]" : "text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-500)]"
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
        onClick={onOpen}
        className="mt-4 w-full rounded-xl border border-[var(--color-primary)] py-2.5 text-sm font-bold text-[var(--color-primary)] transition-colors active:scale-[0.98] hover:bg-[var(--color-primary-light)]"
      >
        Xem chi tiết
      </button>
    </div>
  )
}
