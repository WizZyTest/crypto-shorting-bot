import type { Kline } from "./binance";

/**
 * Calculate RSI from close prices
 */
export function calculateRSI(closes: number[], period = 14): number[] {
  if (closes.length < period + 1) return [];
  const rsi: number[] = [];
  let gains = 0;
  let losses = 0;

  for (let i = 1; i <= period; i++) {
    const diff = closes[i] - closes[i - 1];
    if (diff >= 0) gains += diff;
    else losses += Math.abs(diff);
  }

  let avgGain = gains / period;
  let avgLoss = losses / period;

  const firstRS = avgLoss === 0 ? 100 : avgGain / avgLoss;
  rsi.push(100 - 100 / (1 + firstRS));

  for (let i = period + 1; i < closes.length; i++) {
    const diff = closes[i] - closes[i - 1];
    const gain = diff >= 0 ? diff : 0;
    const loss = diff < 0 ? Math.abs(diff) : 0;
    avgGain = (avgGain * (period - 1) + gain) / period;
    avgLoss = (avgLoss * (period - 1) + loss) / period;
    const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
    rsi.push(100 - 100 / (1 + rs));
  }

  return rsi;
}

/**
 * Detect bearish RSI divergence:
 * Price makes new high but RSI makes lower high
 */
export function detectBearishDivergence(klines: Kline[]): boolean {
  if (klines.length < 30) return false;
  const closes = klines.map((k) => parseFloat(k.close));
  const highs = klines.map((k) => parseFloat(k.high));
  const rsi = calculateRSI(closes, 14);

  if (rsi.length < 10) return false;

  const lookback = Math.min(30, rsi.length);
  const recentRSI = rsi.slice(-lookback);
  const recentHighs = highs.slice(-lookback);

  // Find two swing highs
  const swingHighs: Array<{ idx: number; price: number; rsi: number }> = [];

  for (let i = 2; i < recentHighs.length - 2; i++) {
    if (
      recentHighs[i] > recentHighs[i - 1] &&
      recentHighs[i] > recentHighs[i - 2] &&
      recentHighs[i] > recentHighs[i + 1] &&
      recentHighs[i] > recentHighs[i + 2]
    ) {
      swingHighs.push({
        idx: i,
        price: recentHighs[i],
        rsi: recentRSI[i],
      });
    }
  }

  if (swingHighs.length < 2) return false;

  const last = swingHighs[swingHighs.length - 1];
  const prev = swingHighs[swingHighs.length - 2];

  // Price higher high but RSI lower high = bearish divergence
  return last.price > prev.price && last.rsi < prev.rsi;
}

/**
 * Detect liquidity sweep: price breaks above recent highs then quickly closes below
 */
export function detectLiquiditySweep(klines: Kline[]): boolean {
  if (klines.length < 20) return false;

  const recent = klines.slice(-20);
  const lastCandle = recent[recent.length - 1];
  const prevCandles = recent.slice(0, -3);

  // Find recent equal highs / resistance
  const prevHighs = prevCandles.map((k) => parseFloat(k.high));
  const maxPrevHigh = Math.max(...prevHighs);

  const lastHigh = parseFloat(lastCandle.high);
  const lastClose = parseFloat(lastCandle.close);
  const lastOpen = parseFloat(lastCandle.open);

  // Price swept above resistance but closed back below it
  if (lastHigh > maxPrevHigh && lastClose < maxPrevHigh) {
    // Bearish close (close below open)
    if (lastClose < lastOpen) return true;
  }

  // Also check last 2 candles for sweep pattern
  const prevLast = recent[recent.length - 2];
  if (prevLast) {
    const prevLastHigh = parseFloat(prevLast.high);
    const prevLastClose = parseFloat(prevLast.close);
    const prevLastOpen = parseFloat(prevLast.open);
    const prevMaxHigh = Math.max(...prevHighs.slice(0, -1));

    if (
      prevLastHigh > prevMaxHigh &&
      prevLastClose < prevMaxHigh &&
      prevLastClose < prevLastOpen
    ) {
      return true;
    }
  }

  return false;
}

/**
 * Detect market structure break: breaks a recent Higher Low
 */
export function detectMarketStructureBreak(klines: Kline[]): boolean {
  if (klines.length < 15) return false;

  const recent = klines.slice(-15);
  const lows = recent.map((k) => parseFloat(k.low));
  const closes = recent.map((k) => parseFloat(k.close));

  // Find swing lows (Higher Lows)
  const swingLows: number[] = [];
  for (let i = 2; i < lows.length - 2; i++) {
    if (
      lows[i] < lows[i - 1] &&
      lows[i] < lows[i - 2] &&
      lows[i] < lows[i + 1] &&
      lows[i] < lows[i + 2]
    ) {
      swingLows.push(lows[i]);
    }
  }

  if (swingLows.length < 2) return false;

  // Check if swing lows were forming higher lows
  const lastHL = swingLows[swingLows.length - 1];
  const prevHL = swingLows[swingLows.length - 2];
  const isHigherLow = lastHL > prevHL;

  if (!isHigherLow) return false;

  // Check if current price has broken below last Higher Low
  const currentClose = closes[closes.length - 1];
  return currentClose < lastHL;
}

/**
 * Detect CVD divergence: price makes new high but buy volume decreasing
 */
export function detectCVDDivergence(klines: Kline[]): boolean {
  if (klines.length < 20) return false;

  const recent = klines.slice(-20);
  const firstHalf = recent.slice(0, 10);
  const secondHalf = recent.slice(10);

  const avgBuyVol1 =
    firstHalf.reduce((sum, k) => sum + parseFloat(k.takerBuyBaseAssetVolume), 0) /
    firstHalf.length;
  const avgBuyVol2 =
    secondHalf.reduce((sum, k) => sum + parseFloat(k.takerBuyBaseAssetVolume), 0) /
    secondHalf.length;

  const avgClose1 =
    firstHalf.reduce((sum, k) => sum + parseFloat(k.close), 0) / firstHalf.length;
  const avgClose2 =
    secondHalf.reduce((sum, k) => sum + parseFloat(k.close), 0) / secondHalf.length;

  // Price going up but buy volume going down
  return avgClose2 > avgClose1 && avgBuyVol2 < avgBuyVol1 * 0.85;
}

/**
 * Detect OI spike with price stall: OI increased significantly but price didn't follow
 */
export function detectOISpike(
  oiHistory: Array<{ sumOpenInterest: string; timestamp: number }>
): boolean {
  if (oiHistory.length < 3) return false;

  const values = oiHistory.map((o) => parseFloat(o.sumOpenInterest));
  const latest = values[values.length - 1];
  const prev = values[values.length - 2];
  const older = values[values.length - 3];

  if (prev === 0 || older === 0) return false;

  const recentGrowth = (latest - prev) / prev;
  const prevGrowth = (prev - older) / older;

  // OI jumped a lot in last period
  return recentGrowth > 0.03 || (recentGrowth > 0.015 && prevGrowth > 0.01);
}
