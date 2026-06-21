"use client"

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Activity, Cpu, Timer } from "lucide-react"
import { requestSeries, indexingLoadSeries } from "../data"

function ChartCard({
  title,
  value,
  unit,
  icon,
  children,
}: {
  title: string
  value: string
  unit: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-500">
          {icon}
          <span className="text-sm font-medium">{title}</span>
        </div>
      </div>
      <p className="mt-2 font-heading text-2xl font-bold text-slate-900">
        {value}
        <span className="ml-1 text-sm font-medium text-slate-400">{unit}</span>
      </p>
      <div className="mt-3 h-28">
        <ResponsiveContainer width="100%" height="100%">
          {children as React.ReactElement}
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export function MetricsWidget() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <ChartCard
        title="Yêu cầu nền tảng"
        value="4,820"
        unit="req/ngày"
        icon={<Activity className="h-4 w-4" />}
      >
        <AreaChart data={requestSeries} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
          <defs>
            <linearGradient id="gradReq" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2854A8" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#2854A8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="time" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }}
            labelStyle={{ color: "#475569" }}
          />
          <Area type="monotone" dataKey="requests" stroke="#2854A8" strokeWidth={2} fill="url(#gradReq)" />
        </AreaChart>
      </ChartCard>

      <ChartCard title="Tải lập chỉ mục" value="74" unit="%" icon={<Cpu className="h-4 w-4" />}>
        <BarChart data={indexingLoadSeries} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
          <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
          <Tooltip
            cursor={{ fill: "#f1f5f9" }}
            contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }}
          />
          <Bar dataKey="load" fill="#82ACDB" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ChartCard>

      <ChartCard title="Độ trễ phản hồi AI" value="438" unit="ms" icon={<Timer className="h-4 w-4" />}>
        <LineChart data={requestSeries} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
          <XAxis dataKey="time" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
          <YAxis hide domain={["dataMin - 50", "dataMax + 50"]} />
          <Tooltip
            contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }}
          />
          <Line type="monotone" dataKey="latency" stroke="#2854A8" strokeWidth={2} dot={{ r: 3, fill: "#2854A8" }} />
        </LineChart>
      </ChartCard>
    </div>
  )
}
