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
                Algoter Trading ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Platform. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the Platform.
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
                    When you connect your cryptocurrency wallet (e.g., Phantom wallet), we may collect:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 mt-2">
                    <li>Your public wallet address</li>
                    <li>Transaction history related to Platform usage</li>
                    <li>Network information (e.g., Solana network)</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed mt-2">
                    <strong className="text-teal-400">Important:</strong> We do not collect, store, or have access to your private keys or seed phrases. These remain securely stored in your wallet.
                  </p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">2.2 Usage Data</h3>
                  <p className="text-gray-300 leading-relaxed">
                    We automatically collect information when you use the Platform, including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 mt-2">
                    <li>Browser type and version</li>
                    <li>Device information</li>
                    <li>IP address</li>
                    <li>Pages visited and time spent on pages</li>
                    <li>Features used and interactions with the Platform</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">2.3 Strategy Data</h3>
                  <p className="text-gray-300 leading-relaxed">
                    When you create strategies using our Platform, we may store:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 mt-2">
                    <li>Strategy configurations and settings</li>
                    <li>Backtest results and performance metrics</li>
                    <li>Public strategies you choose to share</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">2.4 Wallet Tracker Data</h3>
                  <p className="text-gray-300 leading-relaxed">
                    When you use the Wallet Tracker feature, we may store:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 mt-2">
                    <li>Wallet addresses you choose to track</li>
                    <li>Cached wallet information for faster loading</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">2.5 Twitter Monitor Data</h3>
                  <p className="text-gray-300 leading-relaxed">
                    When you use the Twitter Monitor feature, we may store:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 mt-2">
                    <li>Twitter usernames you choose to monitor</li>
                    <li>Cached tweet data for analysis</li>
                  </ul>
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
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Provide, maintain, and improve the Platform</li>
                <li>Process transactions and manage your account</li>
                <li>Send you technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Monitor and analyze usage patterns and trends</li>
                <li>Detect, prevent, and address technical issues</li>
                <li>Personalize your experience on the Platform</li>
                <li>Comply with legal obligations</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-black/80 border-teal-500/30 backdrop-blur-md mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-white">4. Information Sharing and Disclosure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-white font-semibold mb-2">4.1 Public Information</h3>
                  <p className="text-gray-300 leading-relaxed">
                    If you choose to share strategies publicly on the Platform, that information will be visible to all users. We are not responsible for the privacy practices of other users who may view your public content.
                  </p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">4.2 Service Providers</h3>
                  <p className="text-gray-300 leading-relaxed">
                    We may share your information with third-party service providers who perform services on our behalf, such as:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 mt-2">
                    <li>Cloud hosting providers</li>
                    <li>Analytics services</li>
                    <li>Payment processors</li>
                    <li>Customer support services</li>
                  </ul>
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
                  <h3 className="text-white font-semibold mb-2">5.1 Storage</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Your information is stored on secure servers and may be processed and stored outside of your country of residence. By using the Platform, you consent to the transfer of your information to facilities located outside your jurisdiction.
                  </p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">5.2 Security Measures</h3>
                  <p className="text-gray-300 leading-relaxed mb-2">
                    We implement appropriate technical and organizational security measures to protect your information, including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                    <li>Encryption of data in transit and at rest</li>
                    <li>Regular security assessments and updates</li>
                    <li>Access controls and authentication</li>
                    <li>Secure coding practices</li>
                  </ul>
                  <p className="text-gray-300 leading-relaxed mt-2">
                    However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee absolute security.
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
                Depending on your location, you may have certain rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li><strong>Access:</strong> Request access to your personal information</li>
                <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your information</li>
                <li><strong>Portability:</strong> Request transfer of your data</li>
                <li><strong>Objection:</strong> Object to processing of your information</li>
                <li><strong>Withdrawal:</strong> Withdraw consent where processing is based on consent</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                To exercise these rights, please contact us using the information provided in the Contact section.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/80 border-teal-500/30 backdrop-blur-md mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-white">7. Cookies and Tracking Technologies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to track activity on our Platform and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Platform.
              </p>
              <p className="text-gray-300 leading-relaxed">
                We use cookies for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4 mt-2">
                <li>Authentication and session management</li>
                <li>Remembering your preferences</li>
                <li>Analyzing Platform usage</li>
                <li>Improving user experience</li>
              </ul>
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


