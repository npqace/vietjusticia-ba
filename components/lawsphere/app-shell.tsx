"use client"

import { useState } from "react"
import { StatusBar } from "./status-bar"
import { BottomNav, type TabKey } from "./bottom-nav"
import { AiChatScreen } from "./screens/ai-chat"
import { InboxScreen } from "./screens/inbox"
import { LibraryScreen } from "./screens/library"
import { DashboardScreen } from "./screens/dashboard"
import { ProfileScreen } from "./screens/profile"

export function AppShell() {
  const [tab, setTab] = useState<TabKey>("ai")

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F5F5F5] p-4">
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

        <div className="relative flex-1 overflow-hidden">
          {tab === "ai" && <AiChatScreen />}
          {tab === "inbox" && <InboxScreen />}
          {tab === "library" && <LibraryScreen />}
          {tab === "activity" && <DashboardScreen />}
          {tab === "profile" && <ProfileScreen />}
        </div>

        <BottomNav active={tab} onChange={setTab} />

        {/* Home indicator */}
        <div className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center">
          <div className="h-1.5 w-32 rounded-full bg-[#1A1A1A]/70" />
        </div>
      </div>
    </main>
  )
}
