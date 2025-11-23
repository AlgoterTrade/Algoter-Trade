"use client"

const API_URL = "https://api.binance.com"

export interface MarketData {
  symbol: string
  price: string
  volume: string
  change24h: string
}

export interface KlineData {
  openTime: number
  open: string
  high: string
  low: string
  close: string
  volume: string
  closeTime: number
}

export async function getMarketData(symbols: string[] = ["BTCUSDT", "ETHUSDT", "BNBUSDT"]): Promise<MarketData[]> {
  try {
    const responses = await Promise.all(
      symbols.map((symbol) => 
        fetch(`${API_URL}/api/v3/ticker/24hr?symbol=${symbol}`)
          .then((res) => {
            if (!res.ok) {
              throw new Error(`Failed to fetch market data for ${symbol}: ${res.statusText}`)
            }
            return res.json()
          })
      ),
    )

    return responses.map((data) => ({
      symbol: data.symbol,
      price: data.lastPrice,
      volume: data.volume,
      change24h: data.priceChangePercent,
    }))
  } catch (error) {
    console.error("Error fetching market data:", error)
    // Return empty array instead of throwing to prevent crashes
    return []
  }
}

export async function getHistoricalData(symbol: string, interval = "1d", limit = 100): Promise<KlineData[]> {
  try {
    const response = await fetch(`${API_URL}/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch historical data: ${response.statusText}`)
    }

    const data = await response.json()

    if (!Array.isArray(data)) {
      throw new Error("Invalid response format from Binance API")
    }

    return data.map((kline) => ({
      openTime: kline[0],
      open: kline[1],
      high: kline[2],
      low: kline[3],
      close: kline[4],
      volume: kline[5],
      closeTime: kline[6],
    }))
  } catch (error) {
    console.error("Error fetching historical data:", error)
    // Return empty array instead of throwing to prevent crashes
    return []
  }
}

