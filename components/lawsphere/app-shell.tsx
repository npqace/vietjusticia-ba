"use client"

import { useState } from "react"
import { StatusBar } from "./status-bar"
import { BottomNav, type TabKey } from "./bottom-nav"
import { AiChatScreen } from "./screens/ai-chat"
import { LawyersScreen } from "./screens/lawyers"
import { LibraryScreen } from "./screens/library"
import { DashboardScreen } from "./screens/dashboard"
import { ProfileScreen } from "./screens/profile"
import { Welcome } from "./entry/welcome"
import { Auth } from "./entry/auth"

type Phase = "welcome" | "auth" | "app"

export function AppShell() {
  const [phase, setPhase] = useState<Phase>("welcome")
  const [tab, setTab] = useState<TabKey>("ai")

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--color-neutral-50)] p-4">
      {/* Phone frame */}
      <div
        className="relative flex flex-col overflow-hidden rounded-[44px] bg-white"
        style={{
          width: 393,
          height: 852,
          boxShadow: "0 30px 80px -20px rgba(40,84,168,0.35), 0 10px 30px -10px rgba(0,0,0,0.25)",
        }}
      >
        <StatusBar />

        {phase === "welcome" && (
          <div className="relative flex-1 overflow-hidden">
            <Welcome onFinish={() => setPhase("auth")} />
          </div>
        )}

        {phase === "auth" && (
          <div className="relative flex-1 overflow-hidden">
            <Auth onAuthenticated={() => setPhase("app")} />
          </div>
        )}

        {phase === "app" && (
          <>
            <div className="relative flex-1 overflow-hidden">
              {tab === "ai" && <AiChatScreen />}
              {tab === "lawyers" && <LawyersScreen />}
              {tab === "library" && <LibraryScreen />}
              {tab === "requests" && <DashboardScreen />}
              {tab === "profile" && <ProfileScreen />}
            </div>

            <BottomNav active={tab} onChange={setTab} />
          </>
        )}

        {/* Home indicator */}
        <div className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center">
          <div className="h-1.5 w-32 rounded-full bg-[var(--color-neutral-950)]/70" />
        </div>
      </div>
    </main>
  )
}
