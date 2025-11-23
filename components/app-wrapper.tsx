"use client"

import { ErrorBoundary } from "@/components/error-boundary"

export function AppWrapper({ children }: { children: React.ReactNode }) {
  return <ErrorBoundary>{children}</ErrorBoundary>
}

