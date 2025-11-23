"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { ErrorBoundary } from "@/components/error-boundary"

const MainScene = dynamic(() => import("@/components/main-scene").then(mod => ({ default: mod.MainScene })), {
  ssr: false,
  loading: () => null
})

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Minimal loading time
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)

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
          <ErrorBoundary>
            <div className="absolute inset-0 z-10">
              <MainScene />
            </div>
          </ErrorBoundary>

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
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.open("https://x.com/algotertrade", "_blank", "noopener,noreferrer")
                  }
                }}
              >
                <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Follow us on X
              </Button>
              <Button
                variant="link"
                className="text-white hover:text-teal-400 pointer-events-auto"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.open("https://github.com/AlgoterTrade/Algoter-Trade", "_blank", "noopener,noreferrer")
                  }
                }}
              >
                <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                GitHub
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
