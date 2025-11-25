"use client"

import { useRouter } from "next/navigation"
import { Canvas } from "@react-three/fiber"
import { Environment, Float } from "@react-three/drei"
import { Navigation } from "@/components/navigation"
import { CryptoPrediction } from "@/components/crypto-prediction"

export default function PredictionPage() {
  const router = useRouter()

  return (
    <main className="relative w-full min-h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          <color attach="background" args={["#050505"]} />
          <Environment preset="city" />

          <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5} position={[0, 3, 0]}>
            {/* Prediction representation using geometric shapes */}
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

      <div className="absolute inset-0 z-20 flex items-start justify-center p-4 pt-20 pointer-events-none">
        <div className="w-full max-w-7xl pointer-events-auto">
          <CryptoPrediction />
        </div>
      </div>
    </main>
  )
}




