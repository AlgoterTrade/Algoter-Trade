"use client"

import { useRef, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, Html } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LineChart, Play, Download, Upload, Loader2 } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { MarketDataWidget } from "@/components/market-data"
import { runBacktest, exportTradesToCSV } from "@/lib/backtest-engine"
import { PerformanceChart } from "@/components/performance-chart"
import { toast } from "sonner"

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
  trades: Array<{
    date: string
    symbol: string
    type: "BUY" | "SELL"
    price: number
    quantity: number
    result?: number
  }>
}

export default function BacktestPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("performance")
  const [isRunning, setIsRunning] = useState(false)
  const [backtestResult, setBacktestResult] = useState<BacktestResult | null>(null)
  const [showRunDialog, setShowRunDialog] = useState(false)
  const [strategy, setStrategy] = useState<any>(null)
  
  // Backtest parameters
  const getTodayDate = () => {
    const today = new Date()
    return today.toISOString().split("T")[0]
  }
  
  const [startDate, setStartDate] = useState("2025-01-01")
  const [endDate, setEndDate] = useState(getTodayDate())
  const [initialCapital, setInitialCapital] = useState("10000")
  const [commission, setCommission] = useState("0.1")

  // Strategy will only be loaded when user clicks "Load Strategy" button

  const handleRunBacktest = async () => {
    if (!strategy || !strategy.blocks || strategy.blocks.length === 0) {
      toast.error("No strategy loaded! Please go to Studio, add blocks, save, then load the strategy first.")
      return
    }

    setIsRunning(true)
    try {
      const result = await runBacktest({
        strategy,
        startDate,
        endDate,
        initialCapital: parseFloat(initialCapital),
        commission: parseFloat(commission) / 100,
      })
      setBacktestResult(result)
      setShowRunDialog(false)
      toast.success("Backtest completed successfully!")
    } catch (error) {
      console.error("Error running backtest:", error)
      toast.error("Failed to run backtest. Please try again.")
    } finally {
      setIsRunning(false)
    }
  }

  const handleExportCSV = () => {
    if (!backtestResult || !backtestResult.trades.length) {
      toast.error("No trades to export. Run a backtest first.")
      return
    }

    const csv = exportTradesToCSV(backtestResult.trades)
    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `backtest-trades-${new Date().toISOString().split("T")[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
    toast.success("Trade history exported to CSV!")
  }

  const loadStrategyFromStudio = () => {
    const savedStrategy = localStorage.getItem("algoSensei_strategy")
    if (!savedStrategy) {
      toast.error("No strategy found! Please go to Studio, add blocks, and save your strategy first.")
      return
    }

    try {
      const parsed = JSON.parse(savedStrategy)
      
      // Validate that strategy has blocks
      if (!parsed.blocks || !Array.isArray(parsed.blocks) || parsed.blocks.length === 0) {
        toast.error("Strategy has no blocks! Please go to Studio, add blocks to your strategy, and save it first.")
        return
      }

      setStrategy(parsed)
      if (parsed.settings) {
        setInitialCapital(parsed.settings.initialCapital?.replace(/[^0-9.]/g, "") || "10000")
        setCommission(parsed.settings.commission?.replace(/[^0-9.]/g, "") || "0.1")
      }
      toast.success(`Strategy "${parsed.settings?.name || 'Unnamed'}" loaded successfully! (${parsed.blocks.length} blocks)`)
    } catch (e) {
      console.error("Error loading strategy:", e)
      toast.error("Failed to load strategy. Please go to Studio and save your strategy again.")
    }
  }

  const result = backtestResult || {
    netProfit: 12450,
    winRate: 68,
    drawdown: 14,
    sharpeRatio: 1.8,
    totalTrades: 124,
    winLossRatio: 2.1,
    avgHoldingTime: 3.2,
    profitFactor: 1.8,
    volatility: 18,
    sortinoRatio: 1.6,
    calmarRatio: 2.1,
    trades: [],
  }

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          <color attach="background" args={["#050505"]} />
          <Environment preset="city" />

          <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5} position={[0, 3, 0]}>
            {/* Backtesting Engine representation using geometric shapes */}
            <group>
              {[...Array(8)].map((_, i) => (
                <mesh key={i} position={[i * 0.7 - 2.45, 0, 0]}>
                  <boxGeometry args={[0.6, 1, 0.2]} />
              <meshStandardMaterial color="#14b8a6" metalness={0.8} roughness={0.2} />
                </mesh>
              ))}
            </group>
          </Float>

          <BacktestChart activeTab={activeTab} />
        </Canvas>
      </div>

      <Navigation />

      <div className="absolute inset-0 z-20 flex items-center justify-center p-4 pointer-events-none">
        <div className="w-full max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-black/80 border-teal-500/30 backdrop-blur-md pointer-events-auto md:col-span-2">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl text-white flex items-center">
                      <LineChart className="mr-2 h-5 w-5 text-teal-500" />
                      Advanced Backtesting
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Test your strategies against historical data with precision
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-teal-500 text-teal-500 hover:bg-teal-900/20"
                      onClick={loadStrategyFromStudio}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {strategy && strategy.blocks && strategy.blocks.length > 0 ? "Reload Strategy" : "Load Strategy"}
                    </Button>
                    <Dialog open={showRunDialog} onOpenChange={setShowRunDialog}>
                      <DialogTrigger asChild>
                        <Button
                          className={`font-bold ${
                            strategy && strategy.blocks && strategy.blocks.length > 0
                              ? "bg-teal-500 hover:bg-teal-600 text-black"
                              : "bg-gray-600 text-gray-400 cursor-not-allowed opacity-50"
                          }`}
                          disabled={!strategy || !strategy.blocks || strategy.blocks.length === 0}
                          onClick={() => {
                            if (!strategy || !strategy.blocks || strategy.blocks.length === 0) {
                              toast.error("Please load a strategy from Studio first!")
                              return
                            }
                          }}
                        >
                          <Play className="mr-2 h-4 w-4" />
                          Run Backtest
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md">
                        <DialogHeader>
                          <DialogTitle className="text-white">Backtest Configuration</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                          <div>
                            <Label className="text-gray-300">Strategy</Label>
                            {!strategy || !strategy.blocks || strategy.blocks.length === 0 ? (
                              <div className="mt-1">
                                <div className="text-sm text-red-400 mb-2">
                                  No strategy loaded! Please load a strategy first.
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-teal-500 text-teal-500 hover:bg-teal-900/20"
                                  onClick={() => {
                                    loadStrategyFromStudio()
                                    setShowRunDialog(false)
                                  }}
                                >
                                  <Upload className="mr-2 h-4 w-4" />
                                  Load Strategy
                                </Button>
                              </div>
                            ) : (
                              <>
                                <div className="mt-1 text-sm text-gray-400">
                                  {strategy.settings?.name || "Unnamed Strategy"}
                                </div>
                                <div className="mt-1 text-xs text-gray-500">
                                  {strategy.blocks.length} blocks
                                </div>
                              </>
                            )}
                          </div>
                          <div>
                            <Label className="text-gray-300">Start Date</Label>
                            <Input
                              type="date"
                              value={startDate}
                              onChange={(e) => setStartDate(e.target.value)}
                              className="bg-gray-800 border-gray-700 text-white mt-1"
                            />
                          </div>
                          <div>
                            <Label className="text-gray-300">End Date</Label>
                            <Input
                              type="date"
                              value={endDate}
                              onChange={(e) => setEndDate(e.target.value)}
                              className="bg-gray-800 border-gray-700 text-white mt-1"
                            />
                          </div>
                          <div>
                            <Label className="text-gray-300">Initial Capital ($)</Label>
                            <Input
                              type="number"
                              value={initialCapital}
                              onChange={(e) => setInitialCapital(e.target.value)}
                              className="bg-gray-800 border-gray-700 text-white mt-1"
                            />
                          </div>
                          <div>
                            <Label className="text-gray-300">Commission (%)</Label>
                            <Input
                              type="number"
                              step="0.01"
                              value={commission}
                              onChange={(e) => setCommission(e.target.value)}
                              className="bg-gray-800 border-gray-700 text-white mt-1"
                            />
                          </div>
                          <div className="flex justify-end space-x-2 pt-4">
                            <Button
                              variant="outline"
                              onClick={() => setShowRunDialog(false)}
                              className="border-gray-700"
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleRunBacktest}
                              className="bg-teal-500 hover:bg-teal-600 text-black"
                              disabled={isRunning || !strategy || !strategy.blocks || strategy.blocks.length === 0}
                            >
                              {isRunning ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Running...
                                </>
                              ) : (
                                <>
                                  <Play className="mr-2 h-4 w-4" />
                                  Run
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-gray-900/50">
                    <TabsTrigger
                      value="performance"
                      className="data-[state=active]:bg-teal-500 data-[state=active]:text-black"
                    >
                      Performance
                    </TabsTrigger>
                    <TabsTrigger
                      value="trades"
                      className="data-[state=active]:bg-teal-500 data-[state=active]:text-black"
                    >
                      Trades
                    </TabsTrigger>
                    <TabsTrigger
                      value="metrics"
                      className="data-[state=active]:bg-teal-500 data-[state=active]:text-black"
                    >
                      Metrics
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="performance" className="mt-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <MetricCard
                        title="Net Profit"
                        value={`${result.netProfit >= 0 ? "+" : ""}$${result.netProfit.toLocaleString()}`}
                        positive={result.netProfit >= 0}
                      />
                      <MetricCard title="Win Rate" value={`${result.winRate.toFixed(1)}%`} positive={result.winRate >= 50} />
                      <MetricCard title="Drawdown" value={`${result.drawdown.toFixed(1)}%`} positive={false} />
                      <MetricCard title="Sharpe Ratio" value={result.sharpeRatio.toFixed(2)} positive={result.sharpeRatio >= 1} />
                    </div>
                    {/* Performance Chart */}
                    {result.trades.length > 0 && (
                      <div className="mb-4">
                        <PerformanceChart
                          data={generatePerformanceData(result)}
                          title="Equity Curve"
                        />
                      </div>
                    )}
                    <p className="text-gray-300 mb-4">
                      The performance tab shows the overall results of your strategy backtest. Analyze key metrics to
                      understand how your strategy would have performed historically.
                    </p>
                    <Button
                      className="bg-teal-500 hover:bg-teal-600 text-black font-bold"
                      onClick={() => router.push("/studio")}
                    >
                      Optimize Strategy
                    </Button>
                  </TabsContent>

                  <TabsContent value="trades" className="mt-4">
                    {result.trades.length > 0 ? (
                      <>
                        <div className="bg-gray-900/50 rounded-lg p-4 mb-4 max-h-96 overflow-y-auto">
                          <div className="space-y-3">
                            {result.trades.map((trade, idx) => (
                              <TradeRow
                                key={idx}
                                date={trade.date}
                                symbol={trade.symbol}
                                type={trade.type}
                                price={`$${trade.price.toLocaleString()}`}
                                result={`${trade.result && trade.result >= 0 ? "+" : ""}$${trade.result?.toFixed(2) || "0.00"}`}
                                positive={trade.result ? trade.result >= 0 : false}
                              />
                            ))}
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="border-teal-500 text-teal-500 hover:bg-teal-900/20"
                          onClick={handleExportCSV}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Export Trade History
                        </Button>
                      </>
                    ) : (
                      <div className="bg-gray-900/50 rounded-lg p-8 text-center">
                        <p className="text-gray-400 mb-4">No trades yet. Run a backtest to see results.</p>
                        <Button
                          className="bg-teal-500 hover:bg-teal-600 text-black font-bold"
                          onClick={() => setShowRunDialog(true)}
                        >
                          <Play className="mr-2 h-4 w-4" />
                          Run Backtest
                        </Button>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="metrics" className="mt-4">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-900/50 rounded-lg p-4">
                        <h3 className="text-white font-medium mb-2">Risk Metrics</h3>
                        <ul className="space-y-2 text-gray-300 text-sm">
                          <li className="flex justify-between">
                            <span>Max Drawdown</span>
                            <span>{result.drawdown.toFixed(1)}%</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Volatility</span>
                            <span>{result.volatility.toFixed(1)}%</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Sortino Ratio</span>
                            <span>{result.sortinoRatio.toFixed(2)}</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Calmar Ratio</span>
                            <span>{result.calmarRatio.toFixed(2)}</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-gray-900/50 rounded-lg p-4">
                        <h3 className="text-white font-medium mb-2">Performance Metrics</h3>
                        <ul className="space-y-2 text-gray-300 text-sm">
                          <li className="flex justify-between">
                            <span>Total Trades</span>
                            <span>{result.totalTrades}</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Win/Loss Ratio</span>
                            <span>{result.winLossRatio.toFixed(2)}</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Avg. Holding Time</span>
                            <span>{result.avgHoldingTime.toFixed(1)} days</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Profit Factor</span>
                            <span>{result.profitFactor.toFixed(2)}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <Button
                      className="bg-teal-500 hover:bg-teal-600 text-black font-bold"
                      onClick={() => router.push("/community")}
                    >
                      Compare with Community
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <MarketDataWidget />
          </div>
        </div>
      </div>
    </main>
  )
}

// Generate performance data for chart
function generatePerformanceData(result: BacktestResult) {
  const data = []
  const initialCapital = 10000
  let equity = initialCapital
  const startDate = new Date("2025-01-01")
  
  // Generate data points based on trades
  const numPoints = Math.min(30, result.trades.length || 30)
  const daysPerPoint = Math.max(1, Math.floor(365 / numPoints))
  
  for (let i = 0; i < numPoints; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i * daysPerPoint)
    
    // Calculate cumulative profit
    if (i > 0 && result.trades.length > 0) {
      const tradesInPeriod = result.trades.filter((_, idx) => {
        const tradeDate = new Date(result.trades[Math.min(idx, result.trades.length - 1)].date)
        return tradeDate <= date
      })
      const profit = tradesInPeriod.reduce((sum, trade) => sum + (trade.result || 0), 0)
      equity = initialCapital + profit
    }
    
    data.push({
      date: date.toISOString().split("T")[0],
      equity: Math.max(0, equity),
      profit: equity - initialCapital,
    })
  }
  
  return data
}

function MetricCard({ title, value, positive }) {
  return (
    <div className="bg-gray-900/50 rounded-lg p-3">
      <div className="text-gray-400 text-sm mb-1">{title}</div>
      <div className={`text-lg font-bold ${positive ? "text-green-500" : "text-red-500"}`}>{value}</div>
    </div>
  )
}

function TradeRow({ date, symbol, type, price, result, positive }) {
  return (
    <div className="flex items-center justify-between text-sm border-b border-gray-800 pb-2">
      <div className="text-gray-400">{date}</div>
      <div className="text-white font-medium">{symbol}</div>
      <div className={`font-medium ${type === "BUY" ? "text-green-500" : "text-red-500"}`}>{type}</div>
      <div className="text-white">{price}</div>
      <div className={`font-medium ${positive ? "text-green-500" : "text-red-500"}`}>{result}</div>
    </div>
  )
}

function BacktestChart({ activeTab }) {
  const chartRef = useRef()

  useFrame(({ clock }) => {
    if (chartRef.current) {
      chartRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.1
    }
  })

  // Create a 3D chart visualization
  const chartData = []
  const dataPoints = 20

  for (let i = 0; i < dataPoints; i++) {
    let height

    if (activeTab === "performance") {
      // Create an upward trending chart with some volatility
      height = 0.5 + (i / dataPoints) * 3 + (Math.random() - 0.3) * 0.8
    } else if (activeTab === "trades") {
      // Create a more volatile chart with individual spikes
      height = 1 + Math.random() * 2 + (i % 3 === 0 ? 1 : 0)
    } else {
      // Create a smoother chart for metrics
      height = 1 + Math.sin(i * 0.5) * 1.5 + i / dataPoints
    }

    const x = (i - dataPoints / 2) * 0.8

    chartData.push(
      <group key={`bar-${i}`} position={[x, height / 2, 0]}>
        <mesh>
          <boxGeometry args={[0.3, height, 0.3]} />
          <meshStandardMaterial
            color={height > 1.5 ? "#14b8a6" : "#0d9488"}
            emissive={height > 1.5 ? "#14b8a6" : "#0d9488"}
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>,
    )

    // Add connecting line to next point if not the last point
    if (i < dataPoints - 1) {
      const nextHeight = 0.5 + ((i + 1) / dataPoints) * 3 + (Math.random() - 0.3) * 0.8
      const nextX = (i + 1 - dataPoints / 2) * 0.8

      chartData.push(
        <mesh key={`line-${i}`}>
          <cylinderGeometry
            args={[0.05, 0.05, Math.sqrt(Math.pow(nextX - x, 2) + Math.pow(nextHeight - height, 2)), 8]}
            position={[(x + nextX) / 2, (height + nextHeight) / 2, 0]}
            rotation={[0, 0, Math.atan2(nextHeight - height, nextX - x)]}
          />
          <meshStandardMaterial color="#14b8a6" emissive="#14b8a6" emissiveIntensity={0.5} transparent opacity={0.7} />
        </mesh>,
      )
    }
  }

  return (
    <group ref={chartRef} position={[0, -1, 0]}>
      {/* Base platform */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#0f172a" transparent opacity={0.5} />
      </mesh>

      {/* Chart data */}
      {chartData}

      {/* Chart labels */}
      <Html position={[-8, -0.5, 0]} transform>
        <div className="bg-black/70 text-white text-xs px-2 py-1 rounded whitespace-nowrap">Start Date</div>
      </Html>
      <Html position={[8, -0.5, 0]} transform>
        <div className="bg-black/70 text-white text-xs px-2 py-1 rounded whitespace-nowrap">End Date</div>
      </Html>
      <Html position={[-9, 4, 0]} transform>
        <div className="bg-black/70 text-white text-xs px-2 py-1 rounded whitespace-nowrap">Performance</div>
      </Html>
    </group>
  )
}
