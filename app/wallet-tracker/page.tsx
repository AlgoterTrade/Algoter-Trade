"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Canvas } from "@react-three/fiber"
import { Environment, Float } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Navigation } from "@/components/navigation"
import { Wallet, Search, TrendingUp, TrendingDown, Eye, Copy, CheckCircle2, ExternalLink } from "lucide-react"
import { toast } from "sonner"

interface WalletInfo {
  address: string
  balance: number
  tokens: Array<{
    symbol: string
    amount: number
    value: number
    change24h: number
  }>
  transactions: Array<{
    hash: string
    type: "buy" | "sell" | "transfer"
    token: string
    amount: number
    timestamp: number
  }>
  totalValue: number
  change24h: number
}

export default function WalletTrackerPage() {
  const router = useRouter()
  const [walletAddress, setWalletAddress] = useState("")
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [trackedWallets, setTrackedWallets] = useState<string[]>([])

  useEffect(() => {
    if (typeof window === 'undefined') return
    // Load tracked wallets from localStorage
    const saved = localStorage.getItem("tracked_wallets")
    if (saved) {
      try {
        const wallets = JSON.parse(saved)
        setTrackedWallets(wallets)
        if (wallets.length > 0) {
          // Load first wallet by default
          fetchWalletInfo(wallets[0])
        }
      } catch (e) {
        console.error("Error loading tracked wallets:", e)
      }
    }
  }, [])

  const fetchWalletInfo = async (address: string) => {
    if (!address || address.length < 32) {
      toast.error("Invalid wallet address")
      return
    }

    setIsLoading(true)
    try {
      // Mock data - In production, this would call Solana RPC or API
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Mock wallet data
      const mockData: WalletInfo = {
        address,
        balance: Math.random() * 100,
        tokens: [
          { symbol: "SOL", amount: Math.random() * 50, value: Math.random() * 5000, change24h: (Math.random() - 0.5) * 10 },
          { symbol: "USDC", amount: Math.random() * 10000, value: Math.random() * 10000, change24h: 0 },
          { symbol: "BTC", amount: Math.random() * 0.5, value: Math.random() * 15000, change24h: (Math.random() - 0.5) * 8 },
        ],
        transactions: Array.from({ length: 10 }, (_, i) => ({
          hash: `tx${Math.random().toString(36).substr(2, 9)}`,
          type: ["buy", "sell", "transfer"][Math.floor(Math.random() * 3)] as "buy" | "sell" | "transfer",
          token: ["SOL", "USDC", "BTC"][Math.floor(Math.random() * 3)],
          amount: Math.random() * 100,
          timestamp: Date.now() - i * 3600000,
        })),
        totalValue: Math.random() * 50000 + 10000,
        change24h: (Math.random() - 0.5) * 15,
      }

      setWalletInfo(mockData)
      toast.success("Wallet information loaded")
    } catch (error) {
      console.error("Error fetching wallet info:", error)
      toast.error("Failed to fetch wallet information")
    } finally {
      setIsLoading(false)
    }
  }

  const handleTrackWallet = () => {
    if (typeof window === 'undefined') return
    if (!walletAddress.trim()) {
      toast.error("Please enter a wallet address")
      return
    }

    if (trackedWallets.includes(walletAddress)) {
      toast.info("Wallet is already being tracked")
      return
    }

    const updated = [...trackedWallets, walletAddress]
    setTrackedWallets(updated)
    localStorage.setItem("tracked_wallets", JSON.stringify(updated))
    fetchWalletInfo(walletAddress)
    setWalletAddress("")
    toast.success("Wallet added to tracking list")
  }

  const handleRemoveWallet = (address: string) => {
    if (typeof window === 'undefined') return
    const updated = trackedWallets.filter(w => w !== address)
    setTrackedWallets(updated)
    localStorage.setItem("tracked_wallets", JSON.stringify(updated))
    if (walletInfo?.address === address) {
      setWalletInfo(null)
    }
    toast.success("Wallet removed from tracking")
  }

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address)
    toast.success("Address copied to clipboard")
  }

  const formatAddress = (address: string) => {
    if (address.length <= 12) return address
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <main className="relative w-full min-h-screen overflow-auto bg-black">
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          <color attach="background" args={["#050505"]} />
          <Environment preset="city" />

          <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5} position={[0, 3, 0]}>
            <group>
              {[...Array(6)].map((_, i) => (
                <mesh key={i} position={[i * 0.7 - 1.75, 0, 0]}>
                  <boxGeometry args={[0.6, 1, 0.2]} />
                  <meshStandardMaterial color="#14b8a6" metalness={0.8} roughness={0.2} />
                </mesh>
              ))}
            </group>
          </Float>
        </Canvas>
      </div>

      <Navigation />

      <div className="relative z-20 flex flex-col items-center p-8 pointer-events-none">
        <div className="w-full max-w-6xl pointer-events-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
              <Wallet className="mr-3 h-10 w-10 text-teal-500" />
              Wallet Tracker
            </h1>
            <p className="text-gray-400">Monitor wallet addresses and track their holdings</p>
          </div>

          {/* Add Wallet */}
          <Card className="bg-black/80 border-teal-500/30 backdrop-blur-md mb-6">
            <CardHeader>
              <CardTitle className="text-white">Track New Wallet</CardTitle>
              <CardDescription className="text-gray-400">Enter a Solana wallet address to track</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter wallet address (e.g., 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU)"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className="bg-gray-900/50 border-gray-700 text-white"
                />
                <Button
                  onClick={handleTrackWallet}
                  className="bg-teal-500 hover:bg-teal-600 text-black"
                  disabled={isLoading}
                >
                  <Search className="mr-2 h-4 w-4" />
                  Track
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tracked Wallets List */}
          {trackedWallets.length > 0 && (
            <Card className="bg-black/80 border-teal-500/30 backdrop-blur-md mb-6">
              <CardHeader>
                <CardTitle className="text-white">Tracked Wallets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {trackedWallets.map((address) => (
                    <div
                      key={address}
                      className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg hover:bg-gray-900/70 transition-colors cursor-pointer"
                      onClick={() => fetchWalletInfo(address)}
                    >
                      <div className="flex items-center gap-3">
                        <Wallet className="h-4 w-4 text-teal-400" />
                        <span className="text-white font-mono text-sm">{formatAddress(address)}</span>
                        {walletInfo?.address === address && (
                          <CheckCircle2 className="h-4 w-4 text-teal-500" />
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            copyAddress(address)
                          }}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleRemoveWallet(address)
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Wallet Info */}
          {isLoading && (
            <Card className="bg-black/80 border-teal-500/30 backdrop-blur-md mb-6">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 rounded-full border-t-2 border-b-2 border-teal-500 animate-spin mx-auto mb-4"></div>
                <p className="text-gray-400">Loading wallet information...</p>
              </CardContent>
            </Card>
          )}

          {walletInfo && !isLoading && (
            <>
              {/* Summary */}
              <Card className="bg-black/80 border-teal-500/30 backdrop-blur-md mb-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Wallet className="h-5 w-5 text-teal-500" />
                        {formatAddress(walletInfo.address)}
                      </CardTitle>
                      <CardDescription className="text-gray-400 mt-1">
                        Total Portfolio Value
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyAddress(walletInfo.address)}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Total Value</p>
                      <p className="text-2xl font-bold text-white">
                        ${walletInfo.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">24h Change</p>
                      <div className="flex items-center gap-2">
                        {walletInfo.change24h >= 0 ? (
                          <TrendingUp className="h-5 w-5 text-green-500" />
                        ) : (
                          <TrendingDown className="h-5 w-5 text-red-500" />
                        )}
                        <p className={`text-2xl font-bold ${walletInfo.change24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                          {walletInfo.change24h >= 0 ? "+" : ""}{walletInfo.change24h.toFixed(2)}%
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">SOL Balance</p>
                      <p className="text-2xl font-bold text-white">
                        {walletInfo.balance.toFixed(4)} SOL
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tokens */}
              <Card className="bg-black/80 border-teal-500/30 backdrop-blur-md mb-6">
                <CardHeader>
                  <CardTitle className="text-white">Holdings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {walletInfo.tokens.map((token, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg"
                      >
                        <div>
                          <p className="text-white font-semibold">{token.symbol}</p>
                          <p className="text-gray-400 text-sm">{token.amount.toFixed(4)} {token.symbol}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-semibold">
                            ${token.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </p>
                          <p className={`text-sm ${token.change24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                            {token.change24h >= 0 ? "+" : ""}{token.change24h.toFixed(2)}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Transactions */}
              <Card className="bg-black/80 border-teal-500/30 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-white">Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {walletInfo.transactions.map((tx, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              tx.type === "buy"
                                ? "bg-green-500"
                                : tx.type === "sell"
                                ? "bg-red-500"
                                : "bg-gray-500"
                            }`}
                          />
                          <div>
                            <p className="text-white text-sm font-mono">{formatAddress(tx.hash)}</p>
                            <p className="text-gray-400 text-xs">
                              {new Date(tx.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-white font-semibold ${
                            tx.type === "buy" ? "text-green-500" : tx.type === "sell" ? "text-red-500" : ""
                          }`}>
                            {tx.type === "buy" ? "+" : tx.type === "sell" ? "-" : ""}
                            {tx.amount.toFixed(4)} {tx.token}
                          </p>
                          <p className="text-gray-400 text-xs capitalize">{tx.type}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="mt-4 w-full border-teal-500 text-teal-500 hover:bg-teal-900/20"
                    onClick={() => window.open(`https://solscan.io/account/${walletInfo.address}`, "_blank")}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View on Solscan
                  </Button>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </main>
  )
}


