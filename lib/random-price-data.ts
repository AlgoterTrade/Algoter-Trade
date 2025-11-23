// Random Price Data Generator for Demo Purposes

interface PriceDataPoint {
  time: number
  price: number
  volume: number
}

/**
 * Generate random price data starting from a current price
 * @param currentPrice - The starting price
 * @param days - Number of days of historical data
 * @param volatility - Price volatility (0-1)
 * @returns Array of price data points
 */
export function generateRandomPriceData(
  currentPrice: number,
  days: number = 30,
  volatility: number = 0.02,
): PriceDataPoint[] {
  const data: PriceDataPoint[] = []
  const now = Date.now()
  const oneDay = 24 * 60 * 60 * 1000

  let price = currentPrice

  // Generate data backwards from current time
  for (let i = days; i >= 0; i--) {
    const time = now - i * oneDay

    // Random walk with slight upward bias
    const change = (Math.random() - 0.45) * volatility * price
    price = Math.max(price + change, currentPrice * 0.5) // Prevent price from going too low

    // Generate random volume
    const volume = Math.random() * 1000000 + 100000

    data.push({
      time,
      price: Number(price.toFixed(2)),
      volume: Number(volume.toFixed(2)),
    })
  }

  return data
}

/**
 * Generate random price data with trend
 * @param startPrice - Starting price
 * @param endPrice - Ending price
 * @param days - Number of days
 * @param volatility - Price volatility
 * @returns Array of price data points
 */
export function generateTrendingPriceData(
  startPrice: number,
  endPrice: number,
  days: number = 30,
  volatility: number = 0.02,
): PriceDataPoint[] {
  const data: PriceDataPoint[] = []
  const now = Date.now()
  const oneDay = 24 * 60 * 60 * 1000
  const priceChange = (endPrice - startPrice) / days

  let price = startPrice

  for (let i = 0; i <= days; i++) {
    const time = now - (days - i) * oneDay

    // Add trend
    price += priceChange

    // Add random volatility
    const change = (Math.random() - 0.5) * volatility * price
    price = Math.max(price + change, startPrice * 0.3)

    // Generate random volume
    const volume = Math.random() * 1000000 + 100000

    data.push({
      time,
      price: Number(price.toFixed(2)),
      volume: Number(volume.toFixed(2)),
    })
  }

  return data
}

/**
 * Generate random OHLC (Open, High, Low, Close) data
 */
export interface OHLCData {
  time: number
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export function generateRandomOHLCData(
  currentPrice: number,
  days: number = 30,
  volatility: number = 0.02,
): OHLCData[] {
  const data: OHLCData[] = []
  const now = Date.now()
  const oneDay = 24 * 60 * 60 * 1000

  let close = currentPrice

  for (let i = days; i >= 0; i--) {
    const time = now - i * oneDay

    // Generate OHLC from close price
    const change = (Math.random() - 0.45) * volatility * close
    const open = close
    close = Math.max(close + change, currentPrice * 0.5)

    const high = Math.max(open, close) * (1 + Math.random() * 0.01)
    const low = Math.min(open, close) * (1 - Math.random() * 0.01)

    const volume = Math.random() * 1000000 + 100000

    data.push({
      time,
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume: Number(volume.toFixed(2)),
    })
  }

  return data
}


