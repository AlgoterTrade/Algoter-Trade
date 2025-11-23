"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface PerformanceData {
  date: string
  equity: number
  drawdown?: number
  profit?: number
}

interface PerformanceChartProps {
  data: PerformanceData[]
  title?: string
}

export function PerformanceChart({ data, title = "Performance Chart" }: PerformanceChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-400">
        No performance data available
      </div>
    )
  }

  return (
    <div className="w-full">
      <h3 className="text-white font-semibold mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="date"
              stroke="#9CA3AF"
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
              }}
            />
            <YAxis
              stroke="#9CA3AF"
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                border: "1px solid #374151",
                borderRadius: "8px",
                color: "#F3F4F6",
              }}
              formatter={(value: any) => `$${Number(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              labelStyle={{ color: "#9CA3AF" }}
            />
            <Legend
              wrapperStyle={{ color: "#9CA3AF", fontSize: "12px" }}
              iconType="line"
            />
            <Line
              type="linear"
              dataKey="equity"
              stroke="#14b8a6"
              strokeWidth={2.5}
              dot={false}
              name="Equity"
              strokeLinecap="round"
              strokeLinejoin="round"
              activeDot={{ r: 5, fill: "#14b8a6", stroke: "#0d9488", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

