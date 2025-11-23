// Technical Indicators Calculations

export function calculateSMA(data: number[], period: number): number[] {
  const sma: number[] = []
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      sma.push(NaN)
    } else {
      const sum = data.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0)
      sma.push(sum / period)
    }
  }
  return sma
}

export function calculateEMA(data: number[], period: number): number[] {
  const ema: number[] = []
  const multiplier = 2 / (period + 1)

  for (let i = 0; i < data.length; i++) {
    if (i === 0) {
      ema.push(data[i])
    } else {
      ema.push((data[i] - ema[i - 1]) * multiplier + ema[i - 1])
    }
  }
  return ema
}

export function calculateRSI(data: number[], period: number = 14): number[] {
  const rsi: number[] = []
  const changes: number[] = []

  // Calculate price changes
  for (let i = 1; i < data.length; i++) {
    changes.push(data[i] - data[i - 1])
  }

  for (let i = 0; i < data.length; i++) {
    if (i < period) {
      rsi.push(NaN)
    } else {
      const gains = changes.slice(i - period, i).filter((c) => c > 0)
      const losses = changes.slice(i - period, i).filter((c) => c < 0).map((c) => Math.abs(c))

      const avgGain = gains.reduce((a, b) => a + b, 0) / period
      const avgLoss = losses.reduce((a, b) => a + b, 0) / period

      if (avgLoss === 0) {
        rsi.push(100)
      } else {
        const rs = avgGain / avgLoss
        rsi.push(100 - 100 / (1 + rs))
      }
    }
  }
  return rsi
}

export function calculateMACD(
  data: number[],
  fastPeriod: number = 12,
  slowPeriod: number = 26,
  signalPeriod: number = 9,
): { macd: number[]; signal: number[]; histogram: number[] } {
  const fastEMA = calculateEMA(data, fastPeriod)
  const slowEMA = calculateEMA(data, slowPeriod)

  const macd: number[] = []
  for (let i = 0; i < data.length; i++) {
    macd.push(fastEMA[i] - slowEMA[i])
  }

  const signal = calculateEMA(macd.filter((v) => !isNaN(v)), signalPeriod)
  const histogram: number[] = []

  for (let i = 0; i < macd.length; i++) {
    if (isNaN(macd[i]) || isNaN(signal[i])) {
      histogram.push(NaN)
    } else {
      histogram.push(macd[i] - signal[i])
    }
  }

  return { macd, signal, histogram }
}

export function calculateBollingerBands(
  data: number[],
  period: number = 20,
  stdDev: number = 2,
): { upper: number[]; middle: number[]; lower: number[] } {
  const sma = calculateSMA(data, period)
  const upper: number[] = []
  const middle = sma
  const lower: number[] = []

  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      upper.push(NaN)
      lower.push(NaN)
    } else {
      const slice = data.slice(i - period + 1, i + 1)
      const mean = sma[i]
      const variance = slice.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / period
      const standardDeviation = Math.sqrt(variance)

      upper.push(mean + stdDev * standardDeviation)
      lower.push(mean - stdDev * standardDeviation)
    }
  }

  return { upper, middle, lower }
}

export function getLatestValue(values: number[]): number | null {
  const validValues = values.filter((v) => !isNaN(v) && v !== null && v !== undefined)
  if (validValues.length === 0) return null
  return validValues[validValues.length - 1]
}

export function getRSIStatus(rsi: number | null): "overbought" | "oversold" | "neutral" {
  if (rsi === null) return "neutral"
  if (rsi >= 70) return "overbought"
  if (rsi <= 30) return "oversold"
  return "neutral"
}

export function getMACDStatus(macd: number | null, signal: number | null): "bullish" | "bearish" | "neutral" {
  if (macd === null || signal === null) return "neutral"
  if (macd > signal) return "bullish"
  if (macd < signal) return "bearish"
  return "neutral"
}


