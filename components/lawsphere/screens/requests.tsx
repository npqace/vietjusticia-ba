"use client"

import { useState } from "react"
import { Plus, Clock, FileText, Zap, CheckCircle } from "lucide-react"
import { requests, type Request } from "../data"

type RequestType = "help" | "consultant" | "service"

export function RequestsScreen() {
  const [showModal, setShowModal] = useState(false)
  const [requestType, setRequestType] = useState<RequestType | null>(null)

  if (showModal && requestType) {
    if (requestType === "help") {
      return <HelpRequestForm onBack={() => { setShowModal(false); setRequestType(null); }} />
    } else if (requestType === "consultant") {
      return <ConsultantRequestForm onBack={() => { setShowModal(false); setRequestType(null); }} />
    } else {
      return <ServiceRequestForm onBack={() => { setShowModal(false); setRequestType(null); }} />
    }
  }

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-[#F5F5F5]">
      {/* Header */}
      <div className="shrink-0 border-b border-gray-100 bg-white px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-base font-bold text-[#1A1A1A]">Yêu cầu của tôi</h1>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="grid h-8 w-8 place-items-center rounded-lg bg-[#2854A8] text-white transition-opacity hover:opacity-90"
            title="Tạo yêu cầu mới"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Request list */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {requests.map((req) => (
          <RequestCard key={req.id} request={req} />
        ))}
      </div>

      {/* Modal overlay */}
      {showModal && (
        <div className="absolute inset-0 flex items-end bg-black/40">
          <div className="w-full rounded-t-3xl bg-white px-4 py-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-bold text-[#1A1A1A]">Loại yêu cầu</h2>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-lg text-[#9E9E9E] transition-opacity hover:opacity-70"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2">
              <ModalOption
                icon={FileText}
                title="Yêu cầu hỗ trợ"
                description="Báo cáo vấn đề với ứng dụng"
                onClick={() => setRequestType("help")}
              />
              <ModalOption
                icon={Zap}
                title="Yêu cầu tư vấn"
                description="Tư vấn trực tiếp từ luật sư"
                onClick={() => setRequestType("consultant")}
              />
              <ModalOption
                icon={Clock}
                title="Yêu cầu dịch vụ"
                description="Hệ thống ghép nối luật sư"
                onClick={() => setRequestType("service")}
              />
            </div>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="mt-4 w-full rounded-xl border border-gray-200 py-3 font-semibold text-[#5E5E5E] transition-colors hover:bg-[#F5F5F5]"
            >
              Hủy
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function ModalOption({
  icon: Icon,
  title,
  description,
  onClick,
}: {
  icon: any
  title: string
  description: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-xl border border-gray-100 bg-[#F9F9F9] p-3 text-left transition-colors hover:bg-[#E6F0F9]/30"
    >
      <Icon className="h-5 w-5 shrink-0 text-[#2854A8]" />
      <div>
        <p className="text-sm font-semibold text-[#1A1A1A]">{title}</p>
        <p className="text-xs text-[#666666]">{description}</p>
      </div>
    </button>
  )
}

function RequestCard({ request }: { request: Request }) {
  const getStatusLabel = (status: string) => {
    const labels: Record<string, { label: string; color: string }> = {
      pending: { label: "Đang chờ", color: "#FFA500" },
      acknowledged: { label: "Đã nhận", color: "#2854A8" },
      accepted: { label: "Chấp nhận", color: "#2854A8" },
      matched: { label: "Đã ghép nối", color: "#4CAF50" },
      "in-progress": { label: "Đang xử lý", color: "#2854A8" },
      completed: { label: "Hoàn thành", color: "#4CAF50" },
      resolved: { label: "Giải quyết", color: "#4CAF50" },
    }
    return labels[status] || labels.pending
  }

  const getTypeIcon = (type: string) => {
    if (type === "help") return FileText
    if (type === "consultant") return Zap
    return Clock
  }

  const status = getStatusLabel(request.status)
  const IconComp = getTypeIcon(request.type)

  return (
    <button
      type="button"
      className="flex w-full items-start gap-3 rounded-2xl border border-gray-100 bg-white p-3 text-left shadow-sm transition-colors hover:bg-[#E6F0F9]/40"
    >
      <div className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#E6F0F9] text-[#2854A8]">
        <IconComp className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-[#1A1A1A]">{request.title}</h3>
            <p className="text-xs text-[#5E5E5E]">
              {request.type === "help" && "Hỗ trợ ứng dụng"}
              {request.type === "consultant" && `Tư vấn với ${request.lawyerName}`}
              {request.type === "service" && "Yêu cầu dịch vụ"}
            </p>
          </div>
          <div
            className="rounded-full px-2 py-1 text-[10px] font-semibold text-white"
            style={{ backgroundColor: status.color }}
          >
            {status.label}
          </div>
        </div>
        <p className="mt-2 text-xs text-[#666666]">{request.date}</p>
      </div>
    </button>
  )
}

/* ----------------------------- Help Request Form ----------------------------- */

function HelpRequestForm({ onBack }: { onBack: () => void }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  return (
    <div className="flex h-full flex-col overflow-hidden bg-[#F5F5F5]">
      <div className="shrink-0 border-b border-gray-100 bg-white px-4 py-3">
        <button
          type="button"
          onClick={onBack}
          className="mb-3 text-sm font-semibold text-[#2854A8]"
        >
          ← Quay lại
        </button>
        <h1 className="text-base font-bold text-[#1A1A1A]">Yêu cầu hỗ trợ</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <div>
          <label className="text-xs font-semibold text-[#5E5E5E]">Tiêu đề *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ví dụ: Không thể upload hồ sơ"
            className="mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-[#1A1A1A] placeholder-[#9E9E9E] outline-none transition-colors focus:border-[#2854A8]"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-[#5E5E5E]">Mô tả vấn đề *</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Mô tả chi tiết vấn đề bạn gặp phải"
            rows={4}
            className="mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-[#1A1A1A] placeholder-[#9E9E9E] outline-none transition-colors focus:border-[#2854A8] resize-none"
          />
        </div>
      </div>

      <div className="shrink-0 border-t border-gray-100 bg-white px-4 py-3 space-y-2">
        <button
          type="button"
          onClick={onBack}
          className="w-full rounded-xl bg-[#2854A8] py-3 font-semibold text-white transition-opacity hover:opacity-90"
        >
          Gửi yêu cầu hỗ trợ
        </button>
      </div>
    </div>
  )
}

/* ----------------------------- Consultant Request Form ----------------------------- */

function ConsultantRequestForm({ onBack }: { onBack: () => void }) {
  const [selectedLawyer, setSelectedLawyer] = useState<string | null>(null)
  const [description, setDescription] = useState("")

  return (
    <div className="flex h-full flex-col overflow-hidden bg-[#F5F5F5]">
      <div className="shrink-0 border-b border-gray-100 bg-white px-4 py-3">
        <button
          type="button"
          onClick={onBack}
          className="mb-3 text-sm font-semibold text-[#2854A8]"
        >
          ← Quay lại
        </button>
        <h1 className="text-base font-bold text-[#1A1A1A]">Yêu cầu tư vấn</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <div>
          <label className="text-xs font-semibold text-[#5E5E5E]">Chọn luật sư *</label>
          <div className="mt-1.5 space-y-2">
            {requests.map(r => r.type === "consultant" && (
              <label key={r.id} className="flex items-center gap-2 rounded-lg border border-gray-200 p-2 cursor-pointer hover:bg-[#F9F9F9]">
                <input
                  type="radio"
                  checked={selectedLawyer === r.lawyerId}
                  onChange={() => setSelectedLawyer(r.lawyerId)}
                  className="rounded"
                />
                <span className="text-sm text-[#1A1A1A]">{r.lawyerName}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-[#5E5E5E]">Mô tả vấn đề *</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Mô tả chi tiết vấn đề cần tư vấn"
            rows={4}
            className="mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-[#1A1A1A] placeholder-[#9E9E9E] outline-none transition-colors focus:border-[#2854A8] resize-none"
          />
        </div>
      </div>

      <div className="shrink-0 border-t border-gray-100 bg-white px-4 py-3 space-y-2">
        <button
          type="button"
          onClick={onBack}
          className="w-full rounded-xl bg-[#2854A8] py-3 font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          disabled={!selectedLawyer || !description.trim()}
        >
          Gửi yêu cầu tư vấn
        </button>
      </div>
    </div>
  )
}

/* ----------------------------- Service Request Form ----------------------------- */

function ServiceRequestForm({ onBack }: { onBack: () => void }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")

  return (
    <div className="flex h-full flex-col overflow-hidden bg-[#F5F5F5]">
      <div className="shrink-0 border-b border-gray-100 bg-white px-4 py-3">
        <button
          type="button"
          onClick={onBack}
          className="mb-3 text-sm font-semibold text-[#2854A8]"
        >
          ← Quay lại
        </button>
        <h1 className="text-base font-bold text-[#1A1A1A]">Yêu cầu dịch vụ</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <div>
          <label className="text-xs font-semibold text-[#5E5E5E]">Loại dịch vụ *</label>
          <div className="mt-1.5 space-y-2">
            {["Soạn thảo hợp đồng", "Tư vấn pháp lý", "Thủ tục hành chính", "Khác"].map((cat) => (
              <label key={cat} className="flex items-center gap-2 rounded-lg border border-gray-200 p-2 cursor-pointer hover:bg-[#F9F9F9]">
                <input
                  type="radio"
                  checked={category === cat}
                  onChange={() => setCategory(cat)}
                  className="rounded"
                />
                <span className="text-sm text-[#1A1A1A]">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-[#5E5E5E]">Tiêu đề *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ví dụ: Soạn thảo hợp đồng thuê nhà"
            className="mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-[#1A1A1A] placeholder-[#9E9E9E] outline-none transition-colors focus:border-[#2854A8]"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-[#5E5E5E]">Mô tả chi tiết *</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Mô tả yêu cầu và các thông tin liên quan"
            rows={4}
            className="mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-[#1A1A1A] placeholder-[#9E9E9E] outline-none transition-colors focus:border-[#2854A8] resize-none"
          />
        </div>
      </div>

      <div className="shrink-0 border-t border-gray-100 bg-white px-4 py-3 space-y-2">
        <button
          type="button"
          onClick={onBack}
          className="w-full rounded-xl bg-[#2854A8] py-3 font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          disabled={!title.trim() || !description.trim() || !category}
        >
          Gửi yêu cầu dịch vụ
        </button>
      </div>
    </div>
  )
}
