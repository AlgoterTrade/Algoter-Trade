import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { publicKey } = await request.json()

    if (!publicKey) {
      return NextResponse.json({ error: "Public key is required" }, { status: 400 })
    }

    // List of public RPC endpoints to try
    const rpcEndpoints = [
      "https://api.mainnet-beta.solana.com",
      "https://rpc.ankr.com/solana",
      "https://solana-api.projectserum.com",
      "https://solana.public-rpc.com",
    ]

    const requestBody = {
      jsonrpc: "2.0",
      id: 1,
      method: "getBalance",
      params: [publicKey],
    }

    // Try each endpoint until one works
    for (const endpoint of rpcEndpoints) {
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        })

        if (!response.ok) {
          continue // Try next endpoint
        }

        const data = await response.json()

        if (data.error) {
          // If it's a rate limit or forbidden error, try next endpoint
          if (data.error.message?.includes("forbidden") || data.error.message?.includes("rate limit")) {
            continue
          }
          return NextResponse.json({ error: data.error.message }, { status: 400 })
        }

        // Balance is in lamports, convert to SOL (1 SOL = 1,000,000,000 lamports)
        const lamports = data.result?.value || 0
        const solBalance = lamports / 1_000_000_000

        return NextResponse.json({ balance: solBalance })
      } catch (error: any) {
        // If it's the last endpoint, return error
        if (endpoint === rpcEndpoints[rpcEndpoints.length - 1]) {
          console.error("Error fetching SOL balance:", error)
          return NextResponse.json(
            { error: "Unable to fetch balance from Solana network" },
            { status: 500 }
          )
        }
        // Otherwise, try next endpoint
        continue
      }
    }

    // If all endpoints failed
    return NextResponse.json(
      { error: "All RPC endpoints are unavailable" },
      { status: 500 }
    )
  } catch (error: any) {
    console.error("Error in sol-balance API:", error)
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    )
  }
}




