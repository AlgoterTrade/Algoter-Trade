"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface PriceChartData {
  time: string
  price: number
  sma7?: number | null
  sma25?: number | null
  volume?: number
}

interface PriceChartProps {
  data: PriceChartData[]
  title?: string
  key?: string | number
}

export function PriceChart({ data, title = "Price Chart" }: PriceChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-400">
        No data available
      </div>
    )
  }

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="time"
            stroke="#9CA3AF"
            tick={{ fill: "#9CA3AF", fontSize: 12 }}
            tickFormatter={(value) => {
              // Handle both string and number timestamps
              const date = typeof value === "number" ? new Date(value) : new Date(value)
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
            type="natural"
            dataKey="price"
            stroke="#14b8a6"
            strokeWidth={2.5}
            dot={false}
            name="Price"
            strokeLinecap="round"
            strokeLinejoin="round"
            activeDot={{ r: 5, fill: "#14b8a6", stroke: "#0d9488", strokeWidth: 2 }}
            animationDuration={4000}
            animationBegin={0}
            isAnimationActive={true}
            animationEasing="ease-in-out"
          />
          {data.some((d) => d.sma7 !== null && d.sma7 !== undefined) && (
            <Line
              type="natural"
              dataKey="sma7"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={false}
              name="SMA 7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="5 5"
              activeDot={{ r: 4, fill: "#3B82F6", stroke: "#2563EB", strokeWidth: 2 }}
              animationDuration={4000}
              animationBegin={800}
              isAnimationActive={true}
              animationEasing="ease-in-out"
            />
          )}
          {data.some((d) => d.sma25 !== null && d.sma25 !== undefined) && (
            <Line
              type="natural"
              dataKey="sma25"
              stroke="#F59E0B"
              strokeWidth={2}
              dot={false}
              name="SMA 25"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="8 4"
              activeDot={{ r: 4, fill: "#F59E0B", stroke: "#D97706", strokeWidth: 2 }}
              animationDuration={4000}
              animationBegin={1600}
              isAnimationActive={true}
              animationEasing="ease-in-out"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

