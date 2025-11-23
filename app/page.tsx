"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { MainScene } from "@/components/main-scene"

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black">
      {loading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-black">
          <div className="w-12 h-12 rounded-full border-t-2 border-b-2 border-teal-500 animate-spin mb-4"></div>
          <h1 className="text-2xl font-bold text-white">
            Loading Algoter<span className="animate-pulse">...</span>
          </h1>
        </div>
      ) : (
        <>
          <div className="absolute inset-0 z-10">
            <MainScene />
          </div>

          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 pointer-events-none">
            <div className="max-w-3xl text-center mb-8">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                <span className="text-teal-500">Algoter</span>Trading
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8">
                Build, backtest, and deploy algorithmic trading strategies with AI-powered simplicity
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto">
                <Button
                  className="bg-teal-500 hover:bg-teal-600 text-black font-bold px-8 py-6 text-lg"
                  onClick={() => router.push("/login")}
                >
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  className="border-teal-500 text-teal-500 hover:bg-teal-900/20 px-8 py-6 text-lg"
                  onClick={() => router.push("/trading")}
                >
                  Try Trading Dashboard
                </Button>
              </div>
            </div>

            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-8 text-white flex-wrap">
              <Button
                variant="link"
                className="text-white hover:text-teal-400 pointer-events-auto"
                onClick={() => router.push("/login")}
              >
                Login
              </Button>
              <Button
                variant="link"
                className="text-white hover:text-teal-400 pointer-events-auto"
                onClick={() => router.push("/strategy")}
              >
                Strategy
              </Button>
              <Button
                variant="link"
                className="text-white hover:text-teal-400 pointer-events-auto"
                onClick={() => router.push("/backtest")}
              >
                Backtest
              </Button>
              <Button
                variant="link"
                className="text-white hover:text-teal-400 pointer-events-auto"
                onClick={() => router.push("/trading")}
              >
                Trading
              </Button>
              <Button
                variant="link"
                className="text-white hover:text-teal-400 pointer-events-auto"
                onClick={() => router.push("/community")}
              >
                Community
              </Button>
              <Button
                variant="link"
                className="text-white hover:text-teal-400 pointer-events-auto"
                onClick={() => router.push("/studio")}
              >
                Studio
              </Button>
              <Button
                variant="link"
                className="text-white hover:text-teal-400 pointer-events-auto"
                onClick={() => router.push("/docs")}
              >
                Docs
              </Button>
              <Button
                variant="link"
                className="text-white hover:text-teal-400 pointer-events-auto"
                onClick={() => window.open("https://x.com/algotertrading", "_blank", "noopener,noreferrer")}
              >
                <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Follow us on X
              </Button>
            </div>
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-4 text-gray-400 text-sm">
              <Button
                variant="link"
                className="text-gray-400 hover:text-teal-400 pointer-events-auto p-0 h-auto"
                onClick={() => router.push("/terms")}
              >
                Terms & Conditions
              </Button>
              <span className="text-gray-600">•</span>
              <Button
                variant="link"
                className="text-gray-400 hover:text-teal-400 pointer-events-auto p-0 h-auto"
                onClick={() => router.push("/privacy")}
              >
                Privacy Policy
              </Button>
            </div>
          </div>
        </>
      )}
    </main>
  )
}
