"use client"

import { useRouter } from "next/navigation"
import { Canvas } from "@react-three/fiber"
import { Environment, Float } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Shield, ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
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
              <Shield className="h-12 w-12 text-teal-500 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Privacy Policy
              </h1>
            </div>
            <p className="text-gray-400 mt-4">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <Card className="bg-black/80 border-teal-500/30 backdrop-blur-md mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-white">1. Introduction</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">
                Algoter Trading ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Platform. This is a client-side application that primarily stores data locally in your browser. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the Platform.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/80 border-teal-500/30 backdrop-blur-md mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-white">2. Information We Collect</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-white font-semibold mb-2">2.1 Wallet Information</h3>
                  <p className="text-gray-300 leading-relaxed">
                    When you connect your cryptocurrency wallet (e.g., Phantom wallet) through our Platform:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 mt-2">
                    <li>We only access your public wallet address for display purposes</li>
                    <li>Wallet connection is handled entirely by your wallet extension</li>
                    <li>No wallet data is transmitted to our servers</li>
                    <li>All wallet-related data remains in your browser's local storage</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed mt-2">
                    <strong className="text-teal-400">Important:</strong> We do not collect, store, transmit, or have access to your private keys, seed phrases, or any sensitive wallet information. All wallet interactions are handled directly by your wallet extension. We never request or receive your private keys.
                  </p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">2.2 Usage Data</h3>
                  <p className="text-gray-300 leading-relaxed">
                    As a client-side application, we do not actively collect or transmit usage data to our servers. However, standard web technologies may automatically collect:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 mt-2">
                    <li>Browser type and version (standard HTTP headers)</li>
                    <li>IP address (required for web requests, but not stored by us)</li>
                    <li>Pages visited (stored locally in browser history)</li>
                    <li>Local storage data (strategies, preferences stored in your browser)</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed mt-2">
                    <strong className="text-teal-400">Note:</strong> All user data (strategies, wallet addresses, preferences) is stored locally in your browser's localStorage and is never transmitted to our servers unless you explicitly export and share your strategies.
                  </p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">2.3 Strategy Data</h3>
                  <p className="text-gray-300 leading-relaxed">
                    When you create strategies using our Platform:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 mt-2">
                    <li>Strategy configurations and settings are stored locally in your browser's localStorage</li>
                    <li>Backtest results and performance metrics are calculated and stored locally</li>
                    <li>Strategies are private by default and never shared unless you explicitly export them</li>
                    <li>No strategy data is transmitted to our servers</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed mt-2">
                    You can export your strategies as JSON files, which you can then share or import at your discretion. We do not have access to your strategies unless you explicitly share them.
                  </p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">2.4 Wallet Tracker Data</h3>
                  <p className="text-gray-300 leading-relaxed">
                    When you use the Wallet Tracker feature:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 mt-2">
                    <li>Wallet addresses you choose to track are stored locally in your browser's localStorage</li>
                    <li>Wallet data is fetched directly from public blockchain APIs (Solscan) in real-time</li>
                    <li>No wallet data is stored on our servers</li>
                    <li>All tracked wallet information remains in your browser</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed mt-2">
                    Wallet tracking uses public blockchain data only. We do not have access to private wallet information or transaction details beyond what is publicly available on the blockchain.
                  </p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">2.5 Third-Party API Data</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Our Platform integrates with third-party services:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 mt-2">
                    <li><strong>Binance API:</strong> We fetch real-time market data directly from Binance. No personal data is shared with Binance.</li>
                    <li><strong>OpenAI API (Optional):</strong> If you provide an API key, market conditions are sent to OpenAI for AI analysis. Your API key is stored locally and never shared with us.</li>
                    <li><strong>Solana Blockchain:</strong> We query public blockchain data for wallet tracking. No personal information is collected.</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed mt-2">
                    <strong className="text-teal-400">Important:</strong> API keys (OpenAI, Binance) are stored locally in your browser and are never transmitted to our servers. You are responsible for keeping your API keys secure.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/80 border-teal-500/30 backdrop-blur-md mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-white">3. How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                Since this is a client-side application, we use locally stored information to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Provide and maintain the Platform functionality</li>
                <li>Store your strategies and preferences locally in your browser</li>
                <li>Enable features like strategy saving, loading, and exporting</li>
                <li>Remember your tracked wallets and preferences</li>
                <li>Improve user experience through local caching</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                <strong className="text-teal-400">Note:</strong> We do not process transactions, manage accounts, or send messages as this is a client-side application. All data processing happens locally in your browser.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/80 border-teal-500/30 backdrop-blur-md mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-white">4. Information Sharing and Disclosure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-white font-semibold mb-2">4.1 Data Sharing</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Since all data is stored locally in your browser:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 mt-2">
                    <li>We do not share your data with third parties</li>
                    <li>Strategies are private by default and only shared if you explicitly export and share them</li>
                    <li>No data is transmitted to our servers</li>
                    <li>You have full control over your data through browser localStorage</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">4.2 Third-Party Services</h3>
                  <p className="text-gray-300 leading-relaxed">
                    The Platform makes requests to third-party APIs for functionality:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 mt-2">
                    <li><strong>Binance API:</strong> For real-time market data (no personal data shared)</li>
                    <li><strong>OpenAI API:</strong> Only if you provide your own API key (your key, your data)</li>
                    <li><strong>Solana Blockchain APIs:</strong> For public wallet data (public information only)</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed mt-2">
                    These requests are made directly from your browser. We do not act as an intermediary or store data from these services.
                  </p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">4.3 Legal Requirements</h3>
                  <p className="text-gray-300 leading-relaxed">
                    We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).
                  </p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">4.4 Business Transfers</h3>
                  <p className="text-gray-300 leading-relaxed">
                    If we are involved in a merger, acquisition, or asset sale, your information may be transferred. We will provide notice before your information is transferred and becomes subject to a different privacy policy.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/80 border-teal-500/30 backdrop-blur-md mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-white">5. Data Storage and Security</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-white font-semibold mb-2">5.1 Data Storage</h3>
                  <p className="text-gray-300 leading-relaxed">
                    All your data is stored locally in your browser's localStorage:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 mt-2">
                    <li>Strategies are stored in your browser, not on our servers</li>
                    <li>Tracked wallet addresses are stored locally</li>
                    <li>Preferences and settings are browser-specific</li>
                    <li>Data is tied to your browser and device</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed mt-2">
                    <strong className="text-teal-400">Important:</strong> Clearing your browser data will delete all stored strategies and preferences. We recommend exporting your strategies regularly as backups.
                  </p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">5.2 Security Measures</h3>
                  <p className="text-gray-300 leading-relaxed mb-2">
                    Security considerations for this client-side application:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                    <li>All data remains in your browser - no server-side storage</li>
                    <li>HTTPS encryption for all network requests</li>
                    <li>No sensitive data (private keys, API keys) is transmitted to our servers</li>
                    <li>Open-source codebase allows for security audits</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed mt-2">
                    <strong className="text-red-400">Warning:</strong> Browser localStorage is not encrypted. Do not store sensitive information. Always keep your wallet private keys and API keys secure. We are not responsible for loss of data stored in browser localStorage.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/80 border-teal-500/30 backdrop-blur-md mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-white">6. Your Rights and Choices</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                Since all your data is stored locally in your browser, you have full control:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li><strong>Access:</strong> All your data is accessible through browser localStorage or by exporting strategies</li>
                <li><strong>Deletion:</strong> Clear browser data or delete individual items from localStorage</li>
                <li><strong>Portability:</strong> Export strategies as JSON files to backup or transfer</li>
                <li><strong>Control:</strong> You can disconnect your wallet at any time</li>
                <li><strong>Privacy:</strong> No data is stored on our servers, so there's nothing for us to delete</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                To delete all data: Clear your browser's localStorage or use browser settings to clear site data. For questions, contact us using the information provided in the Contact section.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/80 border-teal-500/30 backdrop-blur-md mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-white">7. Cookies and Tracking Technologies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                We use browser localStorage (not traditional cookies) to store your data locally:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 mt-2">
                <li>Strategy configurations and saved strategies</li>
                <li>Tracked wallet addresses</li>
                <li>User preferences and settings</li>
                <li>Session state (wallet connection status)</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                <strong className="text-teal-400">Note:</strong> We do not use tracking cookies or analytics cookies. All data storage is for functionality only and remains in your browser. You can clear this data at any time through your browser settings.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/80 border-teal-500/30 backdrop-blur-md mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-white">8. Third-Party Links</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">
                Our Platform may contain links to third-party websites or services that are not owned or controlled by Algoter Trading. We have no control over, and assume no responsibility for, the privacy policies or practices of any third-party websites or services. We encourage you to review the privacy policy of every site you visit.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/80 border-teal-500/30 backdrop-blur-md mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-white">9. Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">
                Our Platform is not intended for children under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and believe your child has provided us with personal information, please contact us so we can delete such information.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/80 border-teal-500/30 backdrop-blur-md mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-white">10. Changes to This Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/80 border-teal-500/30 backdrop-blur-md mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-white">11. Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li>Email: privacy@algotertrading.com</li>
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
              onClick={() => router.push("/terms")}
            >
              Terms & Conditions
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}


