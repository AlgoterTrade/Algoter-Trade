// Simple backtest engine for demo purposes
// In production, this would use actual historical data and strategy execution

interface BacktestConfig {
  strategy: {
    blocks: any[]
    settings: any
  }
  startDate: string
  endDate: string
  initialCapital: number
  commission: number
}

interface Trade {
  date: string
  symbol: string
  type: "BUY" | "SELL"
  price: number
  quantity: number
  result?: number
}

interface BacktestResult {
  netProfit: number
  winRate: number
  drawdown: number
  sharpeRatio: number
  totalTrades: number
  winLossRatio: number
  avgHoldingTime: number
  profitFactor: number
  volatility: number
  sortinoRatio: number
  calmarRatio: number
  trades: Trade[]
}

export async function runBacktest(config: BacktestConfig): Promise<BacktestResult> {
  // Simulate backtest execution
  // In production, this would:
  // 1. Load historical data for the date range
  // 2. Execute strategy logic on each bar
  // 3. Track positions and P&L
  // 4. Calculate metrics

  const { strategy, startDate, endDate, initialCapital, commission } = config

  // Generate mock trades based on strategy blocks
  const trades: Trade[] = []
  const numTrades = Math.floor(Math.random() * 50) + 50 // 50-100 trades

  let currentCapital = initialCapital
  let wins = 0
  let losses = 0
  let totalProfit = 0
  let totalLoss = 0
  let maxDrawdown = 0
  let peakCapital = initialCapital

  const symbols = ["BTC/USDT", "ETH/USDT", "BNB/USDT", "SOL/USDT", "ADA/USDT"]
  const basePrices: Record<string, number> = {
    "BTC/USDT": 45000,
    "ETH/USDT": 2500,
    "BNB/USDT": 300,
    "SOL/USDT": 100,
    "ADA/USDT": 0.5,
  }
  const startDateObj = new Date(startDate)
  const endDateObj = new Date(endDate)
  // Ensure endDate is not in the future
  const today = new Date()
  const actualEndDate = endDateObj > today ? today : endDateObj
  const daysDiff = Math.max(1, Math.floor((actualEndDate.getTime() - startDateObj.getTime()) / (1000 * 60 * 60 * 24)))

  for (let i = 0; i < numTrades; i++) {
    const tradeDate = new Date(startDateObj)
    const daysToAdd = Math.floor((daysDiff / numTrades) * i)
    tradeDate.setDate(tradeDate.getDate() + daysToAdd)
    
    // Don't generate trades in the future
    if (tradeDate > today) {
      tradeDate.setTime(today.getTime())
    }

    const symbol = symbols[Math.floor(Math.random() * symbols.length)]
    const type = Math.random() > 0.5 ? "BUY" : "SELL"
    const basePrice = basePrices[symbol] || 100
    const price = basePrice + (Math.random() - 0.5) * basePrice * 0.2
    const quantity = Math.floor(Math.random() * 10) + 1

    // Simulate trade result
    const isWin = Math.random() > 0.32 // 68% win rate
    const profitPercent = (Math.random() * 0.15 + 0.02) * (isWin ? 1 : -1) // 2-17% profit or loss
    const result = price * quantity * profitPercent

    if (isWin) {
      wins++
      totalProfit += Math.abs(result)
    } else {
      losses++
      totalLoss += Math.abs(result)
    }

    currentCapital += result
    if (currentCapital > peakCapital) {
      peakCapital = currentCapital
    }
    const currentDrawdown = ((peakCapital - currentCapital) / peakCapital) * 100
    if (currentDrawdown > maxDrawdown) {
      maxDrawdown = currentDrawdown
    }

    trades.push({
      date: tradeDate.toISOString().split("T")[0],
      symbol,
      type,
      price: Math.round(price * 100) / 100,
      quantity,
      result: Math.round(result * 100) / 100,
    })
  }

  // Calculate metrics
  const netProfit = currentCapital - initialCapital
  const winRate = (wins / numTrades) * 100
  const winLossRatio = losses > 0 ? totalProfit / totalLoss : totalProfit
  const profitFactor = totalLoss > 0 ? totalProfit / totalLoss : totalProfit
  const avgHoldingTime = 3.2 // days (mock)
  const volatility = 18 // % (mock)
  const sharpeRatio = 1.8 // (mock, calculated from returns and volatility)
  const sortinoRatio = 1.6 // (mock)
  const calmarRatio = maxDrawdown > 0 ? (netProfit / initialCapital) / (maxDrawdown / 100) : 0

  return {
    netProfit: Math.round(netProfit * 100) / 100,
    winRate: Math.round(winRate * 10) / 10,
    drawdown: Math.round(maxDrawdown * 10) / 10,
    sharpeRatio: Math.round(sharpeRatio * 10) / 10,
    totalTrades: numTrades,
    winLossRatio: Math.round(winLossRatio * 10) / 10,
    avgHoldingTime,
    profitFactor: Math.round(profitFactor * 10) / 10,
    volatility,
    sortinoRatio,
    calmarRatio,
    trades: trades.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
  }
}

export function exportTradesToCSV(trades: Trade[]): string {
  const headers = "Date,Symbol,Type,Price,Quantity,Result\n"
  const rows = trades
    .map((trade) => {
      return `${trade.date},${trade.symbol},${trade.type},${trade.price},${trade.quantity},${trade.result || 0}`
    })
    .join("\n")
  return headers + rows
}

