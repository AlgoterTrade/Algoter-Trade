"use client"

import { useState, useEffect } from "react"
import { ArrowUpRight, ArrowDownRight, RefreshCw, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { getMarketData, getHistoricalData } from "@/lib/binance-client"
import { getAiStrategyAdvice, getMockStrategyAdvice } from "@/lib/openai"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { PriceChart } from "@/components/price-chart"
import { calculateSMA, calculateRSI, calculateMACD, getRSIStatus, getMACDStatus, getLatestValue } from "@/lib/indicators"

interface MarketData {
  symbol: string
  price: string
  volume: string
  change24h: string
}

interface KlineData {
  openTime: number
  open: string
  high: string
  low: string
  close: string
  volume: string
  closeTime: number
}

export function TradingDashboard() {
  const [marketData, setMarketData] = useState<MarketData[]>([])
  const [historicalData, setHistoricalData] = useState<KlineData[]>([])
  const [selectedSymbol, setSelectedSymbol] = useState("BTCUSDT")
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [aiAdvice, setAiAdvice] = useState("")
  const [aiLoading, setAiLoading] = useState(false)
  const [marketCondition, setMarketCondition] = useState("")
  const [error, setError] = useState("")

  const fetchMarketData = async () => {
    try {
      setRefreshing(true)
      setError("")
      const data = await getMarketData(["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT", "ADAUSDT"])
      if (data && data.length > 0) {
        setMarketData(data)
        setError("")
      } else {
        setError("Failed to fetch market data. Please check your connection and try again.")
        setMarketData([])
      }
    } catch (error) {
      console.error("Error fetching market data:", error)
      setError("Failed to fetch market data. Please check your connection and try again.")
      setMarketData([])
    } finally {
      setIsLoading(false)
      setRefreshing(false)
    }
  }

  const fetchHistoricalData = async (symbol: string) => {
    try {
      const data = await getHistoricalData(symbol, "1d", 30)
      if (data && data.length > 0) {
        setHistoricalData(data)
        setError("")
      } else {
        setError("No historical data available. Please try again later.")
        setHistoricalData([])
      }
    } catch (error) {
      console.error("Error fetching historical data:", error)
      setError("Failed to fetch historical data. Please check your connection and try again.")
      setHistoricalData([])
    }
  }

  const getAiAdvice = async () => {
    if (!marketCondition.trim()) return

    setAiLoading(true)
    setError("")
    try {
      const advice = await getAiStrategyAdvice(marketCondition)

      // Check if the response indicates a missing API key
      if (advice.includes("API key")) {
        setError("OpenAI API key is missing. Using mock responses instead.")
        // Use mock advice as fallback
        const mockAdvice = await getMockStrategyAdvice(marketCondition)
        setAiAdvice(mockAdvice)
      } else {
        setAiAdvice(advice)
      }
    } catch (error) {
      console.error("Error getting AI advice:", error)
      setError("Error connecting to AI service. Using mock responses instead.")
      // Use mock advice as fallback
      const mockAdvice = await getMockStrategyAdvice(marketCondition)
      setAiAdvice(mockAdvice)
    } finally {
      setAiLoading(false)
    }
  }

  useEffect(() => {
    fetchMarketData()
    fetchHistoricalData(selectedSymbol)

    // Set up polling for real-time updates
    const interval = setInterval(fetchMarketData, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    fetchHistoricalData(selectedSymbol)
  }, [selectedSymbol])

  // Calculate some basic stats for the selected symbol
  const selectedData = marketData.find((data) => data.symbol === selectedSymbol)
  const priceChange = selectedData ? Number.parseFloat(selectedData.change24h) : 0
  const priceChangeColor = priceChange >= 0 ? "text-green-500" : "text-red-500"

  // Calculate SMAs using the indicators library
  const closePrices = historicalData.length > 0 
    ? historicalData.map((d) => Number.parseFloat(d.close))
    : []
  const sma7Values = calculateSMA(closePrices, 7)
  const sma25Values = calculateSMA(closePrices, 25)
  
  // Calculate RSI and MACD
  const rsiValues = calculateRSI(closePrices, 14)
  const macdData = calculateMACD(closePrices, 12, 26, 9)
  
  // Get latest values
  const latestRSI = getLatestValue(rsiValues)
  const latestMACD = getLatestValue(macdData.macd)
  const latestSignal = getLatestValue(macdData.signal)
  const rsiStatus = getRSIStatus(latestRSI)
  const macdStatus = getMACDStatus(latestMACD, latestSignal)
  
  // Prepare chart data
  const chartData = historicalData.map((d, idx) => ({
    time: new Date(d.openTime).toISOString(),
    price: Number.parseFloat(d.close),
    sma7: sma7Values[idx] || null,
    sma25: sma25Values[idx] || null,
  }))

  const sma7 = sma7Values.length > 0 && !isNaN(sma7Values[sma7Values.length - 1]) 
    ? sma7Values[sma7Values.length - 1].toFixed(2) 
    : "N/A"
  const sma25 = sma25Values.length > 0 && !isNaN(sma25Values[sma25Values.length - 1]) 
    ? sma25Values[sma25Values.length - 1].toFixed(2) 
    : "N/A"
  
  // Calculate volume status
  const volumes = historicalData.length > 0 
    ? historicalData.map((d) => Number.parseFloat(d.volume))
    : []
  const avgVolume = volumes.length > 0 ? volumes.reduce((a, b) => a + b, 0) / volumes.length : 0
  const currentVolume = volumes.length > 0 ? volumes[volumes.length - 1] : 0
  const volumeStatus = volumes.length > 0 
    ? (currentVolume > avgVolume * 1.2 ? "High" : currentVolume < avgVolume * 0.8 ? "Low" : "Normal")
    : "N/A"
  
  // Calculate volatility
  const priceChanges = closePrices.length > 1
    ? closePrices.slice(1).map((price, idx) => Math.abs(price - closePrices[idx]) / closePrices[idx])
    : []
  const avgVolatility = priceChanges.length > 0 
    ? priceChanges.reduce((a, b) => a + b, 0) / priceChanges.length 
    : 0
  const volatilityStatus = priceChanges.length > 0
    ? (avgVolatility > 0.03 ? "High" : avgVolatility < 0.01 ? "Low" : "Normal")
    : "N/A"

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-black/80 border-teal-500/30 backdrop-blur-md md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-xl text-white flex items-center">
                <Zap className="mr-2 h-5 w-5 text-teal-500" />
                Trading Dashboard
              </CardTitle>
              <CardDescription className="text-gray-400">
                Real-time market data and AI-powered strategy suggestions
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-8 border-teal-500/50 text-teal-400 hover:bg-teal-900/20"
              onClick={fetchMarketData}
              disabled={refreshing}
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            </Button>
          </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-4 bg-yellow-900/20 border-yellow-800 text-yellow-400">
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {marketData.length === 0 && !isLoading && (
            <Alert className="mb-4 bg-red-900/20 border-red-800 text-red-400">
              <AlertTitle>No Data Available</AlertTitle>
              <AlertDescription>
                Unable to fetch market data. Please check your internet connection and try refreshing.
              </AlertDescription>
            </Alert>
          )}
          <Tabs defaultValue={selectedSymbol} onValueChange={setSelectedSymbol} className="w-full">
            {marketData.length > 0 ? (
              <TabsList className="grid grid-cols-5 bg-gray-900/50">
                {marketData.map((data) => (
                  <TabsTrigger
                    key={data.symbol}
                    value={data.symbol}
                    className="data-[state=active]:bg-teal-500 data-[state=active]:text-black"
                  >
                    {data.symbol.replace("USDT", "")}
                  </TabsTrigger>
                ))}
              </TabsList>
            ) : (
              <div className="text-gray-400 text-sm mb-4 p-2">Loading market data...</div>
            )}

            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-900/50 rounded-lg p-3">
                <div className="text-gray-400 text-sm mb-1">Current Price</div>
                <div className="text-xl font-bold text-white">
                  ${selectedData ? Number.parseFloat(selectedData.price).toLocaleString() : "Loading..."}
                </div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3">
                <div className="text-gray-400 text-sm mb-1">24h Change</div>
                <div className={`text-xl font-bold flex items-center ${priceChangeColor}`}>
                  {priceChange >= 0 ? (
                    <ArrowUpRight className="mr-1 h-5 w-5" />
                  ) : (
                    <ArrowDownRight className="mr-1 h-5 w-5" />
                  )}
                  {selectedData ? `${Number.parseFloat(selectedData.change24h).toFixed(2)}%` : "Loading..."}
                </div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3">
                <div className="text-gray-400 text-sm mb-1">SMA (7)</div>
                <div className="text-xl font-bold text-white">${sma7}</div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3">
                <div className="text-gray-400 text-sm mb-1">SMA (25)</div>
                <div className="text-xl font-bold text-white">${sma25}</div>
              </div>
            </div>

            {/* Price Chart */}
            {chartData.length > 0 && (
              <div className="mt-6">
                <PriceChart 
                  key={selectedSymbol}
                  data={chartData} 
                  title={`${selectedSymbol.replace("USDT", "")} Price Chart`} 
                />
              </div>
            )}

            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-medium">Technical Analysis</h3>
                <Badge variant="outline" className="bg-teal-900/30 text-teal-400 border-teal-800">
                  Powered by AI
                </Badge>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  <SignalIndicator
                    title="Trend"
                    value={priceChange >= 0 ? "Bullish" : "Bearish"}
                    status={priceChange >= 0 ? "positive" : "negative"}
                  />
                  <SignalIndicator
                    title="RSI"
                    value={latestRSI !== null ? Math.round(latestRSI).toString() : "N/A"}
                    status={rsiStatus === "overbought" ? "negative" : rsiStatus === "oversold" ? "positive" : "neutral"}
                  />
                  <SignalIndicator
                    title="MACD"
                    value={macdStatus === "bullish" ? "Bullish" : macdStatus === "bearish" ? "Bearish" : "Neutral"}
                    status={macdStatus === "bullish" ? "positive" : macdStatus === "bearish" ? "negative" : "neutral"}
                  />
                  <SignalIndicator
                    title="Volume"
                    value={volumeStatus}
                    status={volumeStatus === "High" ? "positive" : volumeStatus === "Low" ? "neutral" : "neutral"}
                  />
                  <SignalIndicator
                    title="Volatility"
                    value={volatilityStatus}
                    status={volatilityStatus === "High" ? "negative" : volatilityStatus === "Low" ? "positive" : "neutral"}
                  />
                  <SignalIndicator title="Support/Resistance" value="Near Support" status="positive" />
                </div>
              </div>
            </div>
          </Tabs>
        </CardContent>
        </Card>

        <Card className="bg-black/80 border-teal-500/30 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center">
              <Zap className="mr-2 h-5 w-5 text-teal-500" />
              AI Strategy Advisor
            </CardTitle>
            <CardDescription className="text-gray-400">Get AI-powered trading strategy suggestions</CardDescription>
          </CardHeader>
          <CardContent>
          {error && (
            <Alert className="mb-4 bg-yellow-900/20 border-yellow-800 text-yellow-400">
              <AlertTitle>API Key Missing</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-300 block mb-2">
                Describe market conditions or ask for strategy advice
              </label>
              <Textarea
                placeholder="E.g., Bitcoin is showing high volatility with a bullish trend. RSI is at 65. What strategy would work best?"
                className="bg-gray-900/50 border-gray-700 text-white resize-none"
                rows={4}
                value={marketCondition}
                onChange={(e) => setMarketCondition(e.target.value)}
              />
            </div>

            <Button
              className="w-full bg-teal-500 hover:bg-teal-600 text-black font-bold"
              onClick={getAiAdvice}
              disabled={aiLoading || !marketCondition.trim()}
            >
              {aiLoading ? "Generating Advice..." : "Get AI Strategy Advice"}
            </Button>

            {aiAdvice && (
              <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-teal-900/50 text-white text-sm max-h-60 overflow-y-auto">
                <h4 className="font-medium text-teal-400 mb-2">Strategy Recommendation:</h4>
                <div className="whitespace-pre-line">{aiAdvice}</div>
              </div>
            )}
          </div>
          </CardContent>
        </Card>
      </div>

    </div>
  )
}

function SignalIndicator({
  title,
  value,
  status,
}: { title: string; value: string; status: "positive" | "negative" | "neutral" }) {
  return (
    <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
      <div className="text-gray-400 text-sm mb-1">{title}</div>
      <div className="flex items-center justify-between">
        <div
          className={`font-bold ${
            status === "positive" ? "text-green-500" : status === "negative" ? "text-red-500" : "text-gray-300"
          }`}
        >
          {value}
        </div>
        <div
          className={`w-3 h-3 rounded-full ${
            status === "positive" ? "bg-green-500" : status === "negative" ? "bg-red-500" : "bg-gray-500"
          }`}
        ></div>
      </div>
    </div>
  )
}
