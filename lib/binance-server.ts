"use server"

import { createHmac } from "crypto"

const API_URL = "https://api.binance.com"

// This function requires authentication and should only be used server-side
export async function executeTrade(symbol: string, side: "BUY" | "SELL", quantity: string, price?: string) {
  try {
    const timestamp = Date.now()
    const apiKey = process.env.BINANCE_API_KEY
    const apiSecret = process.env.BINANCE_API_SECRET

    if (!apiKey || !apiSecret) {
      throw new Error("Binance API credentials not configured")
    }

    const params = new URLSearchParams({
      symbol,
      side,
      type: price ? "LIMIT" : "MARKET",
      quantity,
      timestamp: timestamp.toString(),
      ...(price && { price }),
    })

    const signature = createHmac("sha256", apiSecret).update(params.toString()).digest("hex")

    params.append("signature", signature)

    const response = await fetch(`${API_URL}/api/v3/order`, {
      method: "POST",
      headers: {
        "X-MBX-APIKEY": apiKey,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(`Failed to execute trade: ${response.statusText} - ${JSON.stringify(errorData)}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error executing trade:", error)
    throw new Error("Failed to execute trade")
  }
}

