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
                Algoter Trading provides a platform for algorithmic trading strategy development, backtesting, and execution. Our services include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Strategy builder with visual drag-and-drop interface</li>
                <li>Historical data backtesting capabilities</li>
                <li>Real-time market data and technical analysis</li>
                <li>Strategy sharing and community features</li>
                <li>Integration with cryptocurrency exchanges</li>
                <li>Wallet tracking and Twitter monitoring tools</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-black/80 border-teal-500/30 backdrop-blur-md mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-white">3. User Accounts and Wallet Connection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                To use certain features of the Platform, you must connect a compatible cryptocurrency wallet (e.g., Phantom wallet). You are responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Maintaining the security of your wallet and private keys</li>
                <li>All activities that occur under your wallet address</li>
                <li>Ensuring your wallet is compatible with the Platform</li>
                <li>Not sharing your wallet credentials with anyone</li>
              </ul>
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
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-black/80 border-teal-500/30 backdrop-blur-md mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-white">5. Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                The Platform, including its original content, features, and functionality, is owned by Algoter Trading and is protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
              <p className="text-gray-300 leading-relaxed">
                You retain ownership of strategies you create using the Platform. By sharing strategies publicly, you grant Algoter Trading a non-exclusive license to display, distribute, and use your strategies for Platform purposes.
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
                <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>To submit false or misleading information</li>
                <li>To upload or transmit viruses or any other type of malicious code</li>
                <li>To collect or track the personal information of others</li>
                <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
              </ul>
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
                <li>Any conduct or content of third parties on the Platform</li>
                <li>Any content obtained from the Platform</li>
                <li>Unauthorized access, use, or alteration of your transmissions or content</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-black/80 border-teal-500/30 backdrop-blur-md mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-white">8. Termination</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">
                We may terminate or suspend your account and bar access to the Platform immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms. If you wish to terminate your account, you may simply discontinue using the Platform.
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
                <li>Twitter: <a href="https://x.com/algotertrading" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">@algotertrading</a></li>
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


