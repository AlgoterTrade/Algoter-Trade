"use client"

import { useRouter } from "next/navigation"
import { Canvas } from "@react-three/fiber"
import { Environment, Float } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Book, Code, BarChart2, TrendingUp, Settings, Zap, ArrowRight, CheckCircle2 } from "lucide-react"

export default function DocsPage() {
  const router = useRouter()

  const sections = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: <Zap className="h-5 w-5 text-teal-500" />,
      description: "Learn the basics of Algoter Trading platform",
      items: [
        "Connect your Phantom wallet",
        "Create your first strategy",
        "Run your first backtest",
        "Deploy to live trading"
      ]
    },
    {
      id: "strategy-builder",
      title: "Strategy Builder",
      icon: <Code className="h-5 w-5 text-teal-500" />,
      description: "Build trading strategies using visual blocks",
      items: [
        "Drag and drop indicators",
        "Configure conditions",
        "Set up actions",
        "Manage risk parameters"
      ]
    },
    {
      id: "backtesting",
      title: "Backtesting",
      icon: <BarChart2 className="h-5 w-5 text-teal-500" />,
      description: "Test your strategies against historical data",
      items: [
        "Configure backtest parameters",
        "Analyze performance metrics",
        "Review trade history",
        "Optimize strategies"
      ]
    },
    {
      id: "trading-dashboard",
      title: "Trading Dashboard",
      icon: <TrendingUp className="h-5 w-5 text-teal-500" />,
      description: "Monitor real-time market data and signals",
      items: [
        "View live market prices",
        "Track technical indicators",
        "Get AI strategy advice",
        "Monitor portfolio performance"
      ]
    },
    {
      id: "wallet-tracker",
      title: "Wallet Tracker",
      icon: <Settings className="h-5 w-5 text-teal-500" />,
      description: "Monitor wallet addresses and track holdings",
      items: [
        "Track multiple wallets",
        "View portfolio value",
        "Monitor transactions",
        "Analyze holdings"
      ]
    },
    {
      id: "twitter-monitor",
      title: "Twitter Monitor",
      icon: <CheckCircle2 className="h-5 w-5 text-teal-500" />,
      description: "Track Twitter accounts and analyze sentiment",
      items: [
        "Search Twitter accounts",
        "Monitor multiple accounts",
        "Analyze tweet sentiment",
        "Track engagement metrics"
      ]
    }
  ]

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
          <div className="text-center mb-12 mt-8">
            <div className="flex items-center justify-center mb-4">
              <Book className="h-12 w-12 text-teal-500 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Documentation
              </h1>
            </div>
            <p className="text-xl text-gray-400 mt-4">
              Complete guide to using Algoter Trading platform
            </p>
          </div>

          {/* Quick Start */}
          <Card className="bg-black/80 border-teal-500/30 backdrop-blur-md mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center">
                <Zap className="mr-2 h-6 w-6 text-teal-500" />
                Quick Start
              </CardTitle>
              <CardDescription className="text-gray-400">
                Get up and running in minutes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Connect Your Wallet</h3>
                    <p className="text-gray-400 text-sm">
                      Install and connect your Phantom wallet to get started with Algoter Trading.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 border-teal-500 text-teal-500 hover:bg-teal-900/20"
                      onClick={() => router.push("/login")}
                    >
                      Go to Login <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Build Your Strategy</h3>
                    <p className="text-gray-400 text-sm">
                      Use the visual Strategy Builder to create your first trading strategy with drag-and-drop blocks.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 border-teal-500 text-teal-500 hover:bg-teal-900/20"
                      onClick={() => router.push("/studio")}
                    >
                      Open Studio <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Backtest Your Strategy</h3>
                    <p className="text-gray-400 text-sm">
                      Test your strategy against historical data to see how it would have performed.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 border-teal-500 text-teal-500 hover:bg-teal-900/20"
                      onClick={() => router.push("/backtest")}
                    >
                      Run Backtest <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Monitor & Trade</h3>
                    <p className="text-gray-400 text-sm">
                      Use the Trading Dashboard to monitor markets and execute your strategies.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 border-teal-500 text-teal-500 hover:bg-teal-900/20"
                      onClick={() => router.push("/trading")}
                    >
                      View Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documentation Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {sections.map((section) => (
              <Card
                key={section.id}
                className="bg-black/80 border-teal-500/30 backdrop-blur-md hover:border-teal-500 transition-colors cursor-pointer"
                onClick={() => {
                  const element = document.getElementById(section.id)
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" })
                  }
                }}
              >
                <CardHeader>
                  <div className="flex items-center mb-2">
                    {section.icon}
                    <CardTitle className="text-xl text-white ml-2">{section.title}</CardTitle>
                  </div>
                  <CardDescription className="text-gray-400">{section.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-300">
                        <CheckCircle2 className="h-4 w-4 text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed Sections */}
          <div className="space-y-8 mb-12">
            {/* Strategy Builder Details */}
            <Card id="strategy-builder" className="bg-black/80 border-teal-500/30 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <Code className="mr-2 h-6 w-6 text-teal-500" />
                  Strategy Builder Guide
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-white font-semibold mb-2">Creating Blocks</h3>
                  <p className="text-gray-400 text-sm mb-3">
                    Drag blocks from the sidebar onto the canvas to build your strategy. Each block type serves a specific purpose:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-300 ml-4">
                    <li className="flex items-start">
                      <span className="text-teal-400 mr-2">•</span>
                      <span><strong>Indicators:</strong> Calculate technical indicators like Moving Averages, RSI, MACD</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-400 mr-2">•</span>
                      <span><strong>Conditions:</strong> Define when to trigger actions based on price or indicator values</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-400 mr-2">•</span>
                      <span><strong>Actions:</strong> Execute trades (Buy/Sell) or set stop loss/take profit levels</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-400 mr-2">•</span>
                      <span><strong>Risk Management:</strong> Control position sizing and portfolio allocation</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Configuring Blocks</h3>
                  <p className="text-gray-400 text-sm">
                    Click on any block to configure its parameters. Each indicator has specific settings like periods, thresholds, and calculation methods.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Wallet Tracker Details */}
            <Card id="wallet-tracker" className="bg-black/80 border-teal-500/30 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <Settings className="mr-2 h-6 w-6 text-teal-500" />
                  Wallet Tracker Guide
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-white font-semibold mb-2">Tracking Wallets</h3>
                  <p className="text-gray-400 text-sm mb-3">
                    Monitor any Solana wallet address to track:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-300 ml-4">
                    <li className="flex items-start">
                      <span className="text-teal-400 mr-2">•</span>
                      <span>Portfolio value and 24h changes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-400 mr-2">•</span>
                      <span>Token holdings and balances</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-400 mr-2">•</span>
                      <span>Recent transactions history</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-400 mr-2">•</span>
                      <span>Link to Solscan for detailed view</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Twitter Monitor Details */}
            <Card id="twitter-monitor" className="bg-black/80 border-teal-500/30 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <CheckCircle2 className="mr-2 h-6 w-6 text-teal-500" />
                  Twitter Monitor Guide
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-white font-semibold mb-2">Monitoring Twitter Accounts</h3>
                  <p className="text-gray-400 text-sm mb-3">
                    Track Twitter accounts to analyze:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-300 ml-4">
                    <li className="flex items-start">
                      <span className="text-teal-400 mr-2">•</span>
                      <span>Recent tweets and engagement metrics</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-400 mr-2">•</span>
                      <span>Sentiment analysis (positive/negative/neutral)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-400 mr-2">•</span>
                      <span>Hashtags and mentions tracking</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-400 mr-2">•</span>
                      <span>Multiple account monitoring</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Footer */}
          <div className="text-center text-gray-400 text-sm mb-8">
            <p>Need more help? Join our community or follow us on social media.</p>
            <div className="flex justify-center gap-4 mt-4">
              <Button
                variant="outline"
                size="sm"
                className="border-teal-500 text-teal-500 hover:bg-teal-900/20"
                onClick={() => router.push("/community")}
              >
                Community
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-teal-500 text-teal-500 hover:bg-teal-900/20"
                onClick={() => window.open("https://x.com/algotertrading", "_blank", "noopener,noreferrer")}
              >
                <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Follow on X
              </Button>
            </div>
            <div className="flex justify-center gap-4 mt-6 text-xs">
              <Button
                variant="link"
                className="text-gray-500 hover:text-teal-400 p-0 h-auto"
                onClick={() => router.push("/terms")}
              >
                Terms & Conditions
              </Button>
              <span className="text-gray-600">•</span>
              <Button
                variant="link"
                className="text-gray-500 hover:text-teal-400 p-0 h-auto"
                onClick={() => router.push("/privacy")}
              >
                Privacy Policy
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}


