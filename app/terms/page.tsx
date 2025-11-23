"use client"

import { useRouter } from "next/navigation"
import { Canvas } from "@react-three/fiber"
import { Environment, Float } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { FileText, ArrowLeft } from "lucide-react"

export default function TermsPage() {
  const router = useRouter()

  return (
    <main className="relative w-full min-h-screen overflow-auto bg-black">
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          <color attach="background" args={["#050505"]} />
          <Environment preset="city" />

          <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5} position={[0, 3, 0]}>
            <group>
              {[...Array(5)].map((_, i) => (
                <mesh key={i} position={[i * 0.7 - 1.4, 0, 0]}>
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
        <div className="w-full max-w-4xl pointer-events-auto">
          {/* Header */}
          <div className="text-center mb-8 mt-8">
            <div className="flex items-center justify-center mb-4">
              <FileText className="h-12 w-12 text-teal-500 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Terms & Conditions
              </h1>
            </div>
            <p className="text-gray-400 mt-4">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <Card className="bg-black/80 border-teal-500/30 backdrop-blur-md mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-white">1. Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">
                By accessing and using Algoter Trading ("the Platform"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/80 border-teal-500/30 backdrop-blur-md mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-white">2. Description of Service</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                Algoter Trading provides a client-side web platform for algorithmic trading strategy development and backtesting. Our services include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Visual drag-and-drop strategy builder (Studio)</li>
                <li>Historical data backtesting engine</li>
                <li>Real-time market data from Binance API</li>
                <li>Technical indicators and analysis tools</li>
                <li>Solana wallet tracking (read-only, public data)</li>
                <li>Strategy templates and code generation</li>
                <li>Local strategy storage and export/import functionality</li>
                <li>AI-powered strategy advisor (requires your own OpenAI API key)</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                <strong className="text-teal-400">Note:</strong> This is a client-side application. All data is stored locally in your browser. We do not host user accounts or store your strategies on our servers.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/80 border-teal-500/30 backdrop-blur-md mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-white">3. User Accounts and Wallet Connection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                Wallet connection is optional and used for display purposes only. If you choose to connect a compatible cryptocurrency wallet (e.g., Phantom wallet), you are responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Maintaining the security of your wallet and private keys</li>
                <li>All activities that occur under your wallet address</li>
                <li>Ensuring your wallet extension is properly installed and secured</li>
                <li>Never sharing your private keys, seed phrases, or wallet credentials</li>
                <li>Understanding that we only access your public wallet address for display</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                <strong className="text-teal-400">Important:</strong> We do not request, store, or have access to your private keys. Wallet connection is handled entirely by your wallet extension. You can disconnect your wallet at any time.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/80 border-teal-500/30 backdrop-blur-md mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-white">4. Trading Risks and Disclaimers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                <strong className="text-red-400">IMPORTANT:</strong> Trading cryptocurrencies and other financial instruments involves substantial risk of loss. You acknowledge and agree that:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Past performance does not guarantee future results</li>
                <li>You may lose all or more than your initial investment</li>
                <li>The Platform does not provide financial, investment, or trading advice</li>
                <li>All trading decisions are your sole responsibility</li>
                <li>Backtest results are hypothetical and may not reflect actual trading results</li>
                <li>Market conditions can change rapidly and unpredictably</li>
                <li>This Platform is for educational and research purposes only</li>
                <li>We do not execute trades on your behalf - this is a strategy development tool</li>
                <li>Real-time market data is provided by third-party APIs (Binance) and may have delays or inaccuracies</li>
                <li>You are solely responsible for any trading decisions you make based on Platform analysis</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-black/80 border-teal-500/30 backdrop-blur-md mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-white">5. Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                The Platform, including its original content, features, and functionality, is owned by Algoter Trading and is protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. The source code is available on GitHub under the MIT License.
              </p>
              <p className="text-gray-300 leading-relaxed">
                You retain full ownership of strategies you create using the Platform. Strategies are stored locally in your browser and are private by default. You can export, share, or delete your strategies at any time. By exporting and sharing strategies, you understand that shared strategies become public information.
              </p>
              <p className="text-gray-300 leading-relaxed mt-4">
                <strong className="text-teal-400">Open Source:</strong> This project is open source. You may use, modify, and distribute the code according to the MIT License terms.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/80 border-teal-500/30 backdrop-blur-md mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-white">6. Prohibited Uses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                You agree not to use the Platform:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                <li>To attempt to access, modify, or interfere with the Platform's source code in malicious ways</li>
                <li>To abuse third-party APIs (Binance, OpenAI) by making excessive requests</li>
                <li>To use the Platform to execute unauthorized trades or financial fraud</li>
                <li>To store or process illegal content through the Platform</li>
                <li>To reverse engineer the Platform for malicious purposes (though open source, respect the license terms)</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                <strong className="text-teal-400">API Usage:</strong> If you use third-party APIs (OpenAI, Binance), you are responsible for complying with their terms of service and usage limits.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/80 border-teal-500/30 backdrop-blur-md mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-white">7. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                In no event shall Algoter Trading, its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Your use or inability to use the Platform</li>
                <li>Loss of data stored in browser localStorage (strategies, preferences)</li>
                <li>Inaccurate or delayed market data from third-party APIs</li>
                <li>Trading losses based on strategies created or backtested on the Platform</li>
                <li>Security breaches affecting your browser or device</li>
                <li>Third-party API failures or rate limiting (Binance, OpenAI)</li>
                <li>Unauthorized access to your browser or localStorage</li>
                <li>Any errors, bugs, or malfunctions in the Platform</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                <strong className="text-red-400">Data Loss Warning:</strong> Since all data is stored locally, clearing browser data will permanently delete your strategies. We are not responsible for data loss. Always export your strategies as backups.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/80 border-teal-500/30 backdrop-blur-md mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-white">8. Termination</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">
                Since this is a client-side application without user accounts, there are no accounts to terminate. However, we reserve the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 mt-2">
                <li>Modify or discontinue the Platform at any time</li>
                <li>Block access to the Platform for users who violate these Terms</li>
                <li>Update or change Platform features without notice</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                If you wish to stop using the Platform, simply discontinue use and clear your browser data. Export your strategies first if you want to keep them.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/80 border-teal-500/30 backdrop-blur-md mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-white">9. Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/80 border-teal-500/30 backdrop-blur-md mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-white">10. Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you have any questions about these Terms & Conditions, please contact us:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li>Email: support@algotertrading.com</li>
                <li>Twitter: <a href="https://x.com/algotertrade" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">@algotertrade</a></li>
                <li>GitHub: <a href="https://github.com/AlgoterTrade/Algoter-Trade" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">AlgoterTrade/Algoter-Trade</a></li>
              </ul>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="flex justify-center gap-4 mb-8">
            <Button
              variant="outline"
              className="border-teal-500 text-teal-500 hover:bg-teal-900/20"
              onClick={() => router.push("/")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            <Button
              variant="outline"
              className="border-teal-500 text-teal-500 hover:bg-teal-900/20"
              onClick={() => router.push("/privacy")}
            >
              Privacy Policy
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}


