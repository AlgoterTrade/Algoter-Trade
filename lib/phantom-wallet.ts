// Phantom Wallet Integration

interface PhantomProvider {
  isPhantom?: boolean
  publicKey?: { toBase58(): string }
  isConnected: boolean
  connect(): Promise<{ publicKey: { toBase58(): string } }>
  disconnect(): Promise<void>
  signAndSendTransaction?(transaction: any): Promise<{ signature: string }>
  signTransaction?(transaction: any): Promise<any>
  on(event: string, callback: (args: any) => void): void
  removeListener(event: string, callback: (args: any) => void): void
}

declare global {
  interface Window {
    solana?: PhantomProvider
  }
}

export interface WalletState {
  publicKey: string | null
  isConnected: boolean
  isLoading: boolean
  error: string | null
}

/**
 * Check if Phantom wallet is installed
 */
export function isPhantomInstalled(): boolean {
  if (typeof window === "undefined") return false
  return typeof window.solana !== "undefined" && window.solana.isPhantom
}

/**
 * Connect to Phantom wallet
 */
export async function connectPhantom(): Promise<{ publicKey: string }> {
  if (typeof window === "undefined") {
    throw new Error("Window is not defined")
  }

  if (!window.solana || !window.solana.isPhantom) {
    throw new Error("Phantom wallet is not installed. Please install it from https://phantom.app")
  }

  try {
    const response = await window.solana.connect()
    return {
      publicKey: response.publicKey.toBase58(),
    }
  } catch (error: any) {
    if (error.code === 4001) {
      throw new Error("User rejected the connection request")
    }
    throw new Error(`Failed to connect: ${error.message || "Unknown error"}`)
  }
}

/**
 * Disconnect from Phantom wallet
 */
export async function disconnectPhantom(): Promise<void> {
  if (typeof window === "undefined" || !window.solana) {
    return
  }

  try {
    await window.solana.disconnect()
  } catch (error) {
    console.error("Error disconnecting Phantom:", error)
  }
}

/**
 * Get current wallet connection status
 */
export function getPhantomConnection(): { isConnected: boolean; publicKey: string | null } {
  if (typeof window === "undefined" || !window.solana) {
    return { isConnected: false, publicKey: null }
  }

  const isConnected = window.solana.isConnected || false
  const publicKey = window.solana.publicKey?.toBase58() || null

  return { isConnected, publicKey }
}

/**
 * Format wallet address for display (show first 4 and last 4 characters)
 */
export function formatWalletAddress(address: string): string {
  if (!address) return ""
  if (address.length <= 8) return address
  return `${address.slice(0, 4)}...${address.slice(-4)}`
}

/**
 * Get SOL balance from wallet
 * Uses Next.js API route to avoid CORS issues
 */
export async function getSolBalance(publicKey: string): Promise<number> {
  try {
    // Use Next.js API route to proxy the request (avoids CORS issues)
    const response = await fetch("/api/sol-balance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ publicKey }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    
    if (data.error) {
      throw new Error(data.error)
    }

    return data.balance || 0
  } catch (error: any) {
    console.error("Error fetching SOL balance:", error)
    throw new Error(error.message || "Unable to fetch balance. Please try again later.")
  }
}

/**
 * Request withdrawal from wallet
 * Opens Phantom wallet interface for user to send SOL
 */
export async function requestWithdrawal(publicKey: string, amount: number): Promise<void> {
  if (typeof window === "undefined" || !window.solana) {
    throw new Error("Phantom wallet is not available")
  }

  // For now, we'll guide the user to use Phantom wallet directly
  // In a full implementation, you would create and sign a transaction
  // This requires @solana/web3.js package
  
  // Open Phantom wallet or show instructions
  window.open(`https://phantom.app`, "_blank")
  throw new Error("Please use your Phantom wallet extension to send SOL. Click the Phantom icon in your browser to access your wallet.")
}


