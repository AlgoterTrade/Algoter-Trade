"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Canvas } from "@react-three/fiber"
import { Environment, Float } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LoginBackground } from "@/components/login-background"
import { ArrowLeft, Wallet, Check } from "lucide-react"
import { connectPhantom, disconnectPhantom, isPhantomInstalled, formatWalletAddress, getPhantomConnection } from "@/lib/phantom-wallet"
import { toast } from "sonner"

export default function LoginPage() {
  const router = useRouter()
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [phantomInstalled, setPhantomInstalled] = useState(false)

  // Check if Phantom is installed
  useEffect(() => {
    if (typeof window !== "undefined") {
      setPhantomInstalled(isPhantomInstalled())
      
      // Check existing connection
      const connection = getPhantomConnection()
      if (connection.isConnected && connection.publicKey) {
        setWalletAddress(connection.publicKey)
        localStorage.setItem("phantom_wallet_address", connection.publicKey)
      } else {
        const savedAddress = localStorage.getItem("phantom_wallet_address")
        if (savedAddress) {
          setWalletAddress(savedAddress)
        }
      }

      // Listen for wallet events
      if (window.solana) {
        const handleAccountChange = (publicKey: any) => {
          if (publicKey) {
            const address = publicKey.toBase58()
            setWalletAddress(address)
            localStorage.setItem("phantom_wallet_address", address)
            toast.success("Wallet connected!")
          } else {
            setWalletAddress(null)
            localStorage.removeItem("phantom_wallet_address")
            toast.info("Wallet disconnected")
          }
        }

        window.solana.on("accountChanged", handleAccountChange)
        window.solana.on("connect", handleAccountChange)
        window.solana.on("disconnect", () => {
          setWalletAddress(null)
          localStorage.removeItem("phantom_wallet_address")
          toast.info("Wallet disconnected")
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

  const handleConnectWallet = async () => {
    if (!phantomInstalled) {
      toast.error("Phantom wallet is not installed. Please install it from https://phantom.app")
      window.open("https://phantom.app", "_blank")
      return
    }

    setIsConnecting(true)
    try {
      const { publicKey } = await connectPhantom()
      setWalletAddress(publicKey)
      localStorage.setItem("phantom_wallet_address", publicKey)
      toast.success("Wallet connected successfully!")
      setTimeout(() => {
        router.push("/studio")
      }, 1000)
    } catch (error: any) {
      console.error("Error connecting wallet:", error)
      toast.error(error.message || "Failed to connect wallet")
    } finally {
      setIsConnecting(false)
    }
  }

  const handleDisconnectWallet = async () => {
    try {
      await disconnectPhantom()
      setWalletAddress(null)
      localStorage.removeItem("phantom_wallet_address")
      toast.success("Wallet disconnected")
    } catch (error: any) {
      console.error("Error disconnecting wallet:", error)
      toast.error("Failed to disconnect wallet")
    }
  }

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          <color attach="background" args={["#050505"]} />
          <Environment preset="city" />
          <LoginBackground />

          <Float speed={2} rotationIntensity={0.5} floatIntensity={1} position={[0, 3, 0]}>
            {/* Welcome text representation using geometric shapes */}
            <group>
              {[...Array(8)].map((_, i) => (
                <mesh key={i} position={[i * 0.7 - 2.45, 0, 0]}>
                  <boxGeometry args={[0.6, 1, 0.2]} />
                  <meshStandardMaterial color="#14b8a6" metalness={0.8} roughness={0.2} />
                </mesh>
              ))}
            </group>
          </Float>
        </Canvas>
      </div>

      <Button
        variant="ghost"
        className="absolute top-4 left-4 z-30 text-white hover:text-teal-400 hover:bg-transparent pointer-events-auto"
        onClick={() => router.push("/")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Button>

      <div className="absolute inset-0 z-20 flex items-center justify-center p-4 pointer-events-none">
        <Card className="w-full max-w-md bg-black/80 border-teal-500/30 backdrop-blur-md pointer-events-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-white text-center">
              Connect to Algoter Trading
            </CardTitle>
            <CardDescription className="text-center text-gray-400">
              Connect your Phantom wallet to access your algorithmic trading strategies
            </CardDescription>
          </CardHeader>
          <CardContent>
            {walletAddress ? (
              <div className="bg-teal-900/20 border border-teal-500/30 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Check className="h-5 w-5 text-teal-500" />
                    <span className="text-sm font-medium text-teal-400">Wallet Connected</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-gray-400 hover:text-red-400"
                    onClick={handleDisconnectWallet}
                  >
                    Disconnect
                  </Button>
                </div>
                <div className="text-sm text-gray-300 font-mono mb-4 text-center">
                  {formatWalletAddress(walletAddress)}
                </div>
                <Button
                  type="button"
                  className="w-full bg-teal-500 hover:bg-teal-600 text-black font-bold"
                  onClick={() => router.push("/studio")}
                >
                  Continue to Studio
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <Button
                  type="button"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-6 text-lg"
                  onClick={handleConnectWallet}
                  disabled={isConnecting || !phantomInstalled}
                >
                  <Wallet className="mr-2 h-5 w-5" />
                  {isConnecting
                    ? "Connecting..."
                    : phantomInstalled
                      ? "Connect Phantom Wallet"
                      : "Install Phantom Wallet"}
                </Button>
                {!phantomInstalled && (
                  <p className="text-xs text-gray-400 text-center">
                    Don't have Phantom?{" "}
                    <a
                      href="https://phantom.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-400 hover:underline"
                    >
                      Install it here
                    </a>
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
