"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

type Slide = {
  title: string
  highlight: string
  body: string
}

const SLIDES: Slide[] = [
  {
    title: "Chào mừng đến với",
    highlight: "VietJusticIA",
    body: "Trợ lý pháp lý thông minh giúp bạn tra cứu luật, hiểu thủ tục và kết nối luật sư mọi lúc, mọi nơi.",
  },
  {
    title: "AI Luật Sư",
    highlight: "luôn sẵn sàng",
    body: "Đặt câu hỏi bằng ngôn ngữ thường ngày và nhận câu trả lời kèm trích dẫn văn bản pháp luật chính xác.",
  },
  {
    title: "Kết nối với",
    highlight: "Luật sư thật",
    body: "Khi cần hỗ trợ chuyên sâu, dễ dàng gửi yêu cầu và theo dõi tiến độ hồ sơ của bạn theo thời gian thực.",
  },
]

export function Welcome({ onFinish }: { onFinish: () => void }) {
  const [index, setIndex] = useState(0)
  const isLast = index === SLIDES.length - 1

  function next() {
    if (isLast) {
      onFinish()
    } else {
      setIndex((i) => i + 1)
    }
  }

  const slide = SLIDES[index]

  return (
    <div
      className="flex h-full flex-col"
      style={{
        background: "linear-gradient(160deg, #FFFFFF 0%, #E6F0F9 45%, #B0CBE2 100%)",
      }}
    >
      {/* Skip */}
      <div className="flex justify-end px-4 pt-2">
        <button
          onClick={onFinish}
          className="rounded-full px-3 py-1.5 text-sm font-semibold text-[#2854A8] transition-colors hover:bg-white/40"
        >
          Bỏ qua
        </button>
      </div>

      {/* Illustration */}
      <div className="flex flex-1 flex-col items-center justify-center px-6">
        <div className="relative mb-8 h-56 w-56">
          <Image
            src="/images/justice-globe.png"
            alt="Biểu tượng cán cân công lý và quả địa cầu"
            fill
            priority
            className="object-contain drop-shadow-[0_20px_30px_rgba(40,84,168,0.25)]"
          />
        </div>

        <h1 className="max-w-[300px] text-balance text-center text-3xl leading-tight text-[#1A1A1A]">
          <span className="font-medium">{slide.title} </span>
          <span className="font-extrabold text-[#2854A8]">{slide.highlight}</span>
        </h1>

        <p className="mt-5 max-w-[300px] text-pretty text-center text-[15px] leading-relaxed text-[#5E5E5E]">
          {slide.body}
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between px-6 pb-12">
        {/* Dots */}
        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <span
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-[#2854A8]" : "w-2 bg-[#2854A8]/30"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label={isLast ? "Bắt đầu" : "Tiếp theo"}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#2854A8] text-white shadow-lg shadow-[#2854A8]/30 transition-all active:scale-95 hover:bg-[#22478f]"
        >
          <ArrowRight className="h-6 w-6" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  )
}
