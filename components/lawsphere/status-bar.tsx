import { Wifi, BatteryFull, SignalHigh } from "lucide-react"

export function StatusBar({ dark = false }: { dark?: boolean }) {
  const tone = dark ? "text-white" : "text-[var(--color-neutral-950)]"
  return (
    <div className={`flex h-11 shrink-0 items-center justify-between px-6 pt-1 ${tone}`}>
      <span className="text-sm font-semibold tracking-tight">9:41</span>
      <div className="flex items-center gap-1.5">
        <SignalHigh className="h-4 w-4" strokeWidth={2.5} />
        <Wifi className="h-4 w-4" strokeWidth={2.5} />
        <BatteryFull className="h-5 w-5" strokeWidth={2} />
      </div>
    </div>
  )
}
