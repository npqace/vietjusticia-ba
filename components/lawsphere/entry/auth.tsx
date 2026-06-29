"use client"

import { useState } from "react"
import Image from "next/image"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"

type AuthTab = "signup" | "signin"

function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z"
      />
    </svg>
  )
}

function Field({
  icon,
  type,
  placeholder,
  toggleable,
}: {
  icon: React.ReactNode
  type: "email" | "password"
  placeholder: string
  toggleable?: boolean
}) {
  const [visible, setVisible] = useState(false)
  const inputType = toggleable ? (visible ? "text" : "password") : type

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3.5 focus-within:border-[#2854A8] focus-within:ring-2 focus-within:ring-[#2854A8]/15">
      <span className="text-[#82ACDB]">{icon}</span>
      <input
        type={inputType}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-[15px] text-[#1A1A1A] outline-none placeholder:text-slate-500"
      />
      {toggleable && (
        <button
          type="button"
          aria-label={visible ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
          onClick={() => setVisible((v) => !v)}
          className="text-slate-500 transition-colors hover:text-[#2854A8]"
        >
          {visible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      )}
    </div>
  )
}

export function Auth({ onAuthenticated }: { onAuthenticated: () => void }) {
  const [tab, setTab] = useState<AuthTab>("signup")

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-[#F5F5F5]">
      <div className="flex flex-1 flex-col px-4 pb-8 pt-4">
        {/* Brand */}
        <div className="mb-6 flex flex-col items-center">
          <div className="relative h-20 w-20">
            <Image
              src="/images/justice-globe.png"
              alt="VietJusticIA"
              fill
              className="object-contain"
            />
          </div>
          <h1 className="mt-2 text-xl font-extrabold text-[#1A1A1A]">VietJusticIA</h1>
          <p className="text-sm text-[#5E5E5E]">Trợ lý pháp lý của bạn</p>
        </div>

        {/* Segmented tabs */}
        <div className="mb-6 flex rounded-2xl bg-[#E6EBF3] p-1">
          <button
            onClick={() => setTab("signin")}
            className={`flex-1 rounded-xl py-2.5 text-sm font-bold transition-all ${
              tab === "signin" ? "bg-white text-[#2854A8] shadow-sm" : "text-[#5E5E5E]"
            }`}
          >
            Đăng nhập
          </button>
          <button
            onClick={() => setTab("signup")}
            className={`flex-1 rounded-xl py-2.5 text-sm font-bold transition-all ${
              tab === "signup" ? "bg-white text-[#2854A8] shadow-sm" : "text-[#5E5E5E]"
            }`}
          >
            Đăng ký
          </button>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-3">
          <Field icon={<Mail className="h-5 w-5" />} type="email" placeholder="Email của bạn" />
          <Field
            icon={<Lock className="h-5 w-5" />}
            type="password"
            placeholder="Mật khẩu"
            toggleable
          />
          {tab === "signup" && (
            <Field
              icon={<Lock className="h-5 w-5" />}
              type="password"
              placeholder="Xác nhận mật khẩu"
              toggleable
            />
          )}

          {tab === "signin" && (
            <button className="self-end text-sm font-semibold text-[#2854A8]">
              Quên mật khẩu?
            </button>
          )}
        </div>

        {/* Primary action */}
        <button
          onClick={onAuthenticated}
          className="mt-6 w-full rounded-2xl bg-[#2854A8] py-3.5 text-sm font-bold text-white shadow-sm transition-all active:scale-[0.98] hover:bg-[#22478f]"
        >
          {tab === "signup" ? "Đăng ký" : "Đăng nhập"}
        </button>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-zinc-200" />
          <span className="text-xs font-medium text-[#5E5E5E]">hoặc</span>
          <div className="h-px flex-1 bg-zinc-200" />
        </div>

        {/* Google OAuth */}
        <button
          onClick={onAuthenticated}
          className="flex w-full items-center justify-center gap-3 rounded-2xl border border-zinc-200 bg-white py-3.5 text-sm font-bold text-[#1A1A1A] transition-all active:scale-[0.98] hover:bg-zinc-50"
        >
          <GoogleLogo />
          Tiếp tục với Google
        </button>

        {/* Legal */}
        <p className="mt-6 text-center text-xs leading-relaxed text-[#5E5E5E]">
          Bằng cách tiếp tục, bạn đồng ý với{" "}
          <span className="font-semibold text-[#2854A8]">Điều khoản Dịch vụ</span> và{" "}
          <span className="font-semibold text-[#2854A8]">Chính sách Bảo mật</span> của chúng tôi.
        </p>
      </div>
    </div>
  )
}
