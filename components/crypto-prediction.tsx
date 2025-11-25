"use client"

import { useState, useEffect } from "react"
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, Coins, Clock, CheckCircle2, XCircle, Wallet, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getMarketData } from "@/lib/binance-client"
import { connectPhantom, disconnectPhantom, isPhantomInstalled, formatWalletAddress, getPhantomConnection, getSolBalance } from "@/lib/phantom-wallet"
import { toast } from "sonner"

interface MarketData {
  symbol: string
  price: string
  volume: string
  change24h: string
}

interface Prediction {
  id: string
  symbol: string
  currentPrice: number
  targetPrice: number
  direction: "up" | "down"
  amount: number
  timestamp: number
  expiryTime: number
  status: "active" | "won" | "lost"
  result?: {
    finalPrice: number
    profit: number
  }
}

export function CryptoPrediction() {
  const [marketData, setMarketData] = useState<MarketData[]>([])
  const [selectedSymbol, setSelectedSymbol] = useState("BTCUSDT")
  const [targetPrice, setTargetPrice] = useState("")
  const [direction, setDirection] = useState<"up" | "down">("up")
  const [predictionAmount, setPredictionAmount] = useState("")
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [solBalance, setSolBalance] = useState<number | null>(null)
  const [isLoadingBalance, setIsLoadingBalance] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)

  const availableCoins = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT", "ADAUSDT"]

  useEffect(() => {
    fetchMarketData()
    const interval = setInterval(fetchMarketData, 10000) // Update every 10 seconds
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Check wallet connection
    if (typeof window !== "undefined") {
      const connection = getPhantomConnection()
      if (connection.isConnected && connection.publicKey) {
        setWalletAddress(connection.publicKey)
        fetchSolBalance(connection.publicKey)
      } else {
        const savedAddress = localStorage.getItem("phantom_wallet_address")
        if (savedAddress) {
          setWalletAddress(savedAddress)
          fetchSolBalance(savedAddress)
        }
      }

      // Listen for wallet events
      if (window.solana) {
        const handleAccountChange = (publicKey: any) => {
          if (publicKey) {
            const address = publicKey.toBase58()
            setWalletAddress(address)
            fetchSolBalance(address)
          } else {
            setWalletAddress(null)
            setSolBalance(null)
          }
        }

        window.solana.on("accountChanged", handleAccountChange)
        window.solana.on("connect", handleAccountChange)
        window.solana.on("disconnect", () => {
          setWalletAddress(null)
          setSolBalance(null)
        })

        return () => {
          if (window.solana) {
            window.solana.removeListener("accountChanged", handleAccountChange)
            window.solana.removeListener("connect", handleAccountChange)
            window.solana.removeListener("disconnect", () => {})
          }
        }
      }
    }
  }, [])

  const fetchSolBalance = async (address: string) => {
    setIsLoadingBalance(true)
    try {
      const balance = await getSolBalance(address)
      setSolBalance(balance)
    } catch (error: any) {
      console.error("Error fetching SOL balance:", error)
      setSolBalance(null)
    } finally {
      setIsLoadingBalance(false)
    }
  }

  const handleConnectWallet = async () => {
    if (!isPhantomInstalled()) {
      toast.error("Phantom wallet is not installed. Please install it from https://phantom.app")
      window.open("https://phantom.app", "_blank")
      return
    }

    setIsConnecting(true)
    try {
      const { publicKey } = await connectPhantom()
      setWalletAddress(publicKey)
      localStorage.setItem("phantom_wallet_address", publicKey)
      await fetchSolBalance(publicKey)
      toast.success("Wallet connected successfully!")
    } catch (error: any) {
      console.error("Error connecting wallet:", error)
      toast.error(error.message || "Failed to connect wallet")
    } finally {
      setIsConnecting(false)
    }
  }

  useEffect(() => {
    // Check and update prediction statuses
    const checkPredictions = setInterval(() => {
      updatePredictionStatuses()
    }, 5000) // Check every 5 seconds
    return () => clearInterval(checkPredictions)
  }, [predictions])

  const fetchMarketData = async () => {
    try {
      const data = await getMarketData(availableCoins)
      if (data && data.length > 0) {
        setMarketData(data)
        setIsLoading(false)
      }
    } catch (error) {
      console.error("Error fetching market data:", error)
    }
  }

  const updatePredictionStatuses = async () => {
    const now = Date.now()
    const updatedPredictions = await Promise.all(
      predictions.map(async (prediction) => {
        if (prediction.status !== "active" || now < prediction.expiryTime) {
          return prediction
        }

        // Prediction has expired, check result
        try {
          const currentData = await getMarketData([prediction.symbol])
          if (currentData && currentData.length > 0) {
            const finalPrice = Number.parseFloat(currentData[0].price)
            const won =
              (prediction.direction === "up" && finalPrice >= prediction.targetPrice) ||
              (prediction.direction === "down" && finalPrice <= prediction.targetPrice)

            const profit = won ? prediction.amount * 1.8 : -prediction.amount // 80% return if win

            return {
              ...prediction,
              status: won ? "won" : "lost",
              result: {
                finalPrice,
                profit,
              },
            }
          }
        } catch (error) {
          console.error("Error checking prediction result:", error)
        }
        return prediction
      })
    )

    setPredictions(updatedPredictions)
  }

  const handlePlacePrediction = () => {
    // Check wallet connection first
    if (!walletAddress) {
      toast.error("Please connect your wallet first to place a prediction")
      return
    }

    if (!targetPrice || !predictionAmount) {
      toast.error("Please enter target price and prediction amount")
      return
    }

    const target = Number.parseFloat(targetPrice)
    const amount = Number.parseFloat(predictionAmount)
    const currentData = marketData.find((d) => d.symbol === selectedSymbol)

    if (!currentData) {
      toast.error("Unable to fetch current price data")
      return
    }

    const currentPrice = Number.parseFloat(currentData.price)

    if (isNaN(target) || isNaN(amount) || target <= 0 || amount <= 0) {
      toast.error("Target price and prediction amount must be positive numbers")
      return
    }

    // Check if user has enough SOL balance
    // Convert USD amount to SOL (approximate, using current SOL price)
    // For simplicity, we'll assume 1 SOL = $150 (you can fetch real price)
    const solPrice = 150 // Approximate SOL price in USD
    const requiredSol = amount / solPrice

    if (solBalance === null || solBalance < requiredSol) {
      toast.error(`Insufficient balance. You need at least ${requiredSol.toFixed(4)} SOL (approximately $${amount.toFixed(2)})`)
      return
    }

    // Calculate minimum 5% difference
    const minTargetUp = currentPrice * 1.05 // 5% higher
    const maxTargetDown = currentPrice * 0.95 // 5% lower

    if (direction === "up") {
      if (target <= currentPrice) {
        toast.error("When predicting up, target price must be higher than current price")
        return
      }
      if (target < minTargetUp) {
        toast.error(`Target price must be at least 5% higher than current price (minimum: $${minTargetUp.toFixed(2)})`)
        return
      }
    }

    if (direction === "down") {
      if (target >= currentPrice) {
        toast.error("When predicting down, target price must be lower than current price")
        return
      }
      if (target > maxTargetDown) {
        toast.error(`Target price must be at least 5% lower than current price (maximum: $${maxTargetDown.toFixed(2)})`)
        return
      }
    }

    const newPrediction: Prediction = {
      id: `prediction-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      symbol: selectedSymbol,
      currentPrice,
      targetPrice: target,
      direction,
      amount,
      timestamp: Date.now(),
      expiryTime: Date.now() + 60 * 60 * 1000, // 1 hour expiry
      status: "active",
    }

    setPredictions([newPrediction, ...predictions])
    
    // Update balance (subtract the amount)
    if (solBalance !== null) {
      setSolBalance(solBalance - requiredSol)
    }
    
    toast.success("Prediction placed successfully!")
    setTargetPrice("")
    setPredictionAmount("")
  }

  const selectedCoinData = marketData.find((d) => d.symbol === selectedSymbol)
  const currentPrice = selectedCoinData ? Number.parseFloat(selectedCoinData.price) : 0
  const activePredictions = predictions.filter((p) => p.status === "active")
  const completedPredictions = predictions.filter((p) => p.status !== "active")

  const totalProfit = completedPredictions.reduce((sum, prediction) => sum + (prediction.result?.profit || 0), 0)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Prediction Form */}
        <Card className="bg-black/80 border-teal-500/30 backdrop-blur-md lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center">
              <Coins className="mr-2 h-5 w-5 text-teal-500" />
              Cryptocurrency Prediction
            </CardTitle>
            <CardDescription className="text-gray-400">
              Predict whether the coin price will go up or down at a specific price point
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Wallet Connection Status */}
            {!walletAddress ? (
              <Alert className="bg-yellow-900/20 border-yellow-800 text-yellow-400">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Wallet Not Connected</AlertTitle>
                <AlertDescription className="mt-2">
                  <p className="mb-3">You need to connect your Phantom wallet to place predictions.</p>
                  <Button
                    onClick={handleConnectWallet}
                    disabled={isConnecting}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    <Wallet className="mr-2 h-4 w-4" />
                    {isConnecting ? "Connecting..." : "Connect Phantom Wallet"}
                  </Button>
                </AlertDescription>
              </Alert>
            ) : (
              <div className="bg-teal-900/20 border border-teal-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-teal-500" />
                    <div>
                      <div className="text-sm font-medium text-teal-400">Wallet Connected</div>
                      <div className="text-xs text-gray-400 font-mono">{formatWalletAddress(walletAddress)}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400 mb-1">Balance</div>
                    <div className="text-lg font-bold text-white">
                      {isLoadingBalance ? (
                        <span className="text-gray-400">Loading...</span>
                      ) : solBalance !== null ? (
                        `${solBalance.toFixed(4)} SOL`
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Coin Selection */}
            <div className="space-y-2">
              <Label className="text-white">Select Coin</Label>
              <Select value={selectedSymbol} onValueChange={setSelectedSymbol} disabled={!walletAddress}>
                <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white" disabled={!walletAddress}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  {availableCoins.map((coin) => {
                    const coinData = marketData.find((d) => d.symbol === coin)
                    return (
                      <SelectItem key={coin} value={coin} className="text-white">
                        {coin.replace("USDT", "")} - ${coinData ? Number.parseFloat(coinData.price).toLocaleString() : "..."}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>

            {/* Current Price Display */}
            {selectedCoinData && (
              <div className="bg-gray-900/50 rounded-lg p-4 border border-teal-500/30">
                <div className="text-gray-400 text-sm mb-1">Current Price</div>
                <div className="text-3xl font-bold text-white">
                  ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className={`text-sm mt-1 flex items-center ${
                  Number.parseFloat(selectedCoinData.change24h) >= 0 ? "text-green-500" : "text-red-500"
                }`}>
                  {Number.parseFloat(selectedCoinData.change24h) >= 0 ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  {Number.parseFloat(selectedCoinData.change24h).toFixed(2)}% (24h)
                </div>
              </div>
            )}

            {/* Direction Selection */}
            <div className="space-y-2">
              <Label className="text-white">Prediction Direction</Label>
              <RadioGroup value={direction} onValueChange={(value) => setDirection(value as "up" | "down")} disabled={!walletAddress}>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label
                      className={`flex items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        direction === "up"
                          ? "border-green-500 bg-green-500/10"
                          : "border-gray-700 bg-gray-900/50 hover:border-gray-600"
                      }`}
                    >
                      <RadioGroupItem value="up" id="up" className="mr-2" />
                      <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
                      <span className="text-white font-medium">Predict Up</span>
                    </label>
                  </div>
                  <div className="flex-1">
                    <label
                      className={`flex items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        direction === "down"
                          ? "border-red-500 bg-red-500/10"
                          : "border-gray-700 bg-gray-900/50 hover:border-gray-600"
                      }`}
                    >
                      <RadioGroupItem value="down" id="down" className="mr-2" />
                      <TrendingDown className="h-5 w-5 mr-2 text-red-500" />
                      <span className="text-white font-medium">Predict Down</span>
                    </label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Target Price */}
            <div className="space-y-2">
              <Label className="text-white">
                Target Price (USD)
                {currentPrice > 0 && (
                  <span className="text-gray-400 text-sm ml-2">
                    {direction === "up" 
                      ? `Must be ≥ ${(currentPrice * 1.05).toFixed(2)} (+5%)` 
                      : `Must be ≤ ${(currentPrice * 0.95).toFixed(2)} (-5%)`}
                  </span>
                )}
              </Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Enter target price"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(e.target.value)}
                  className="bg-gray-900/50 border-gray-700 text-white flex-1"
                  step="0.01"
                  min="0"
                  disabled={!walletAddress}
                />
                {currentPrice > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    className="border-teal-500/50 text-teal-400 hover:bg-teal-900/20 whitespace-nowrap"
                    onClick={() => {
                      if (direction === "up") {
                        setTargetPrice((currentPrice * 1.05).toFixed(2))
                      } else {
                        setTargetPrice((currentPrice * 0.95).toFixed(2))
                      }
                    }}
                  >
                    Set {direction === "up" ? "+5%" : "-5%"}
                  </Button>
                )}
              </div>
            </div>

            {/* Prediction Amount */}
            <div className="space-y-2">
              <Label className="text-white">Prediction Amount (USD)</Label>
              <Input
                type="number"
                placeholder="Enter prediction amount"
                value={predictionAmount}
                onChange={(e) => setPredictionAmount(e.target.value)}
                className="bg-gray-900/50 border-gray-700 text-white"
                step="0.01"
                min="0"
                disabled={!walletAddress}
              />
              <div className="space-y-1">
                <div className="text-sm text-gray-400">
                  If correct: +{(Number.parseFloat(predictionAmount) || 0) * 0.8} USD (80% profit)
                </div>
                {predictionAmount && walletAddress && (
                  <div className="text-sm">
                    <span className="text-gray-400">Required: </span>
                    <span className={`font-medium ${
                      solBalance !== null && solBalance >= (Number.parseFloat(predictionAmount) || 0) / 150
                        ? "text-green-500"
                        : "text-red-500"
                    }`}>
                      {((Number.parseFloat(predictionAmount) || 0) / 150).toFixed(4)} SOL
                    </span>
                    {solBalance !== null && solBalance < (Number.parseFloat(predictionAmount) || 0) / 150 && (
                      <span className="text-red-500 text-xs ml-2">(Insufficient balance)</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Place Prediction Button */}
            <Button
              className="w-full bg-teal-500 hover:bg-teal-600 text-black font-bold py-6 text-lg"
              onClick={handlePlacePrediction}
              disabled={!walletAddress || !targetPrice || !predictionAmount || isLoading || isLoadingBalance}
            >
              {!walletAddress ? "Connect Wallet to Place Prediction" : "Place Prediction"}
            </Button>
          </CardContent>
        </Card>

        {/* Stats Card */}
        <Card className="bg-black/80 border-teal-500/30 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-xl text-white">Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="text-gray-400 text-sm mb-1">Active Predictions</div>
              <div className="text-2xl font-bold text-white">{activePredictions.length}</div>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="text-gray-400 text-sm mb-1">Total Profit</div>
              <div className={`text-2xl font-bold ${totalProfit >= 0 ? "text-green-500" : "text-red-500"}`}>
                ${totalProfit.toFixed(2)}
              </div>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="text-gray-400 text-sm mb-1">Completed Predictions</div>
              <div className="text-2xl font-bold text-white">{completedPredictions.length}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Predictions */}
      {activePredictions.length > 0 && (
        <Card className="bg-black/80 border-teal-500/30 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center">
              <Clock className="mr-2 h-5 w-5 text-teal-500" />
              Active Predictions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activePredictions.map((prediction) => {
                const timeRemaining = Math.max(0, prediction.expiryTime - Date.now())
                const minutes = Math.floor(timeRemaining / 60000)
                const seconds = Math.floor((timeRemaining % 60000) / 1000)

                return (
                  <div key={prediction.id} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="bg-teal-900/30 text-teal-400 border-teal-800">
                            {prediction.symbol.replace("USDT", "")}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={
                              prediction.direction === "up"
                                ? "bg-green-900/30 text-green-400 border-green-800"
                                : "bg-red-900/30 text-red-400 border-red-800"
                            }
                          >
                            {prediction.direction === "up" ? "Up" : "Down"}
                          </Badge>
                        </div>
                        <div className="text-white font-medium">
                          Current: ${prediction.currentPrice.toFixed(2)} → Target: ${prediction.targetPrice.toFixed(2)}
                        </div>
                        <div className="text-gray-400 text-sm mt-1">Amount: ${prediction.amount.toFixed(2)}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-teal-400 font-bold text-lg">
                          {minutes}:{seconds.toString().padStart(2, "0")}
                        </div>
                        <div className="text-gray-400 text-xs">Remaining</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Completed Predictions */}
      {completedPredictions.length > 0 && (
        <Card className="bg-black/80 border-teal-500/30 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-teal-500" />
              Prediction History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {completedPredictions.slice(0, 10).map((prediction) => (
                <div key={prediction.id} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="bg-teal-900/30 text-teal-400 border-teal-800">
                          {prediction.symbol.replace("USDT", "")}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={
                            prediction.direction === "up"
                              ? "bg-green-900/30 text-green-400 border-green-800"
                              : "bg-red-900/30 text-red-400 border-red-800"
                          }
                        >
                          {prediction.direction === "up" ? "Up" : "Down"}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={
                            prediction.status === "won"
                              ? "bg-green-900/30 text-green-400 border-green-800"
                              : "bg-red-900/30 text-red-400 border-red-800"
                          }
                        >
                          {prediction.status === "won" ? (
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                          ) : (
                            <XCircle className="h-3 w-3 mr-1" />
                          )}
                          {prediction.status === "won" ? "Won" : "Lost"}
                        </Badge>
                      </div>
                      <div className="text-white text-sm">
                        Initial: ${prediction.currentPrice.toFixed(2)} → Target: ${prediction.targetPrice.toFixed(2)} → Final: ${prediction.result?.finalPrice.toFixed(2)}
                      </div>
                      <div className="text-gray-400 text-xs mt-1">
                        {new Date(prediction.timestamp).toLocaleString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold text-lg ${prediction.result && prediction.result.profit >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {prediction.result && prediction.result.profit >= 0 ? "+" : ""}
                        {prediction.result?.profit.toFixed(2)} USD
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

