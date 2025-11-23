import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster as Sonner } from "@/components/ui/sonner"

export const metadata = {
  title: "Algoter Trading - No-Code Trading Strategy Builder",
  description:
    "Build, backtest, and deploy algorithmic trading strategies with AI-powered simplicity. No coding required.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-black">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Sonner />
        </ThemeProvider>
      </body>
    </html>
  )
}
