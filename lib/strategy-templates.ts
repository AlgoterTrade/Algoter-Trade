// Pre-built Strategy Templates

export interface StrategyTemplate {
  id: string
  name: string
  description: string
  downloads?: number
  blocks: Array<{
    id: string
    type: "indicator" | "condition" | "action" | "risk"
    title: string
    color: string
    config?: Record<string, any>
    position?: { x: number; y: number }
  }>
  settings: {
    name: string
    market: string
    timeframe: string
    initialCapital: string
    backtestStart: string
    backtestEnd: string
    commission: string
  }
}

// Helper function to get download count from localStorage
export function getTemplateDownloads(templateId: string): number {
  if (typeof window === 'undefined') return 0
  const downloads = localStorage.getItem(`template_downloads_${templateId}`)
  return downloads ? parseInt(downloads, 10) : 0
}

// Helper function to increment download count
export function incrementTemplateDownload(templateId: string): number {
  if (typeof window === 'undefined') return 0
  const current = getTemplateDownloads(templateId)
  const newCount = current + 1
  localStorage.setItem(`template_downloads_${templateId}`, newCount.toString())
  return newCount
}

export const STRATEGY_TEMPLATES: StrategyTemplate[] = [
  {
    id: "golden-cross",
    name: "Golden Cross Strategy",
    description: "A classic trend-following strategy using moving average crossovers",
    downloads: 0,
    blocks: [
      {
        id: "ma-fast",
        type: "indicator",
        title: "Moving Average",
        color: "#0d9488",
        config: { period: 50, type: "SMA" },
        position: { x: 100, y: 100 },
      },
      {
        id: "ma-slow",
        type: "indicator",
        title: "Moving Average",
        color: "#0d9488",
        config: { period: 200, type: "SMA" },
        position: { x: 100, y: 200 },
      },
      {
        id: "crossover",
        type: "condition",
        title: "Crossover",
        color: "#0891b2",
        config: { indicator1: "ma-fast", indicator2: "ma-slow" },
        position: { x: 300, y: 150 },
      },
      {
        id: "buy",
        type: "action",
        title: "Buy",
        color: "#7c3aed",
        config: { quantity: 1 },
        position: { x: 500, y: 150 },
      },
    ],
    settings: {
      name: "Golden Cross Strategy",
      market: "Crypto",
      timeframe: "1 Day",
      initialCapital: "$10,000",
      backtestStart: "Jan 1, 2024",
      backtestEnd: "Dec 31, 2024",
      commission: "0.1%",
    },
  },
  {
    id: "rsi-oversold",
    name: "RSI Oversold Strategy",
    description: "Buy when RSI indicates oversold conditions",
    downloads: 0,
    blocks: [
      {
        id: "rsi",
        type: "indicator",
        title: "RSI",
        color: "#0d9488",
        config: { period: 14 },
        position: { x: 100, y: 100 },
      },
      {
        id: "condition",
        type: "condition",
        title: "Price Below",
        color: "#0891b2",
        config: { value: 30 },
        position: { x: 300, y: 100 },
      },
      {
        id: "buy",
        type: "action",
        title: "Buy",
        color: "#7c3aed",
        config: { quantity: 1 },
        position: { x: 500, y: 100 },
      },
      {
        id: "stop-loss",
        type: "action",
        title: "Set Stop Loss",
        color: "#7c3aed",
        config: { percentage: 5 },
        position: { x: 500, y: 200 },
      },
    ],
    settings: {
      name: "RSI Oversold Strategy",
      market: "Crypto",
      timeframe: "1 Hour",
      initialCapital: "$10,000",
      backtestStart: "Jan 1, 2024",
      backtestEnd: "Dec 31, 2024",
      commission: "0.1%",
    },
  },
  {
    id: "macd-crossover",
    name: "MACD Crossover Strategy",
    description: "Trade on MACD line crossovers with signal line",
    downloads: 0,
    blocks: [
      {
        id: "macd",
        type: "indicator",
        title: "MACD",
        color: "#0d9488",
        config: { fast: 12, slow: 26, signal: 9 },
        position: { x: 100, y: 100 },
      },
      {
        id: "crossover",
        type: "condition",
        title: "Crossover",
        color: "#0891b2",
        config: { indicator1: "macd", indicator2: "signal" },
        position: { x: 300, y: 100 },
      },
      {
        id: "buy",
        type: "action",
        title: "Buy",
        color: "#7c3aed",
        config: { quantity: 1 },
        position: { x: 500, y: 100 },
      },
      {
        id: "position-size",
        type: "risk",
        title: "Position Size",
        color: "#db2777",
        config: { percentage: 10 },
        position: { x: 500, y: 200 },
      },
    ],
    settings: {
      name: "MACD Crossover Strategy",
      market: "Crypto",
      timeframe: "4 Hours",
      initialCapital: "$10,000",
      backtestStart: "Jan 1, 2024",
      backtestEnd: "Dec 31, 2024",
      commission: "0.1%",
    },
  },
]


