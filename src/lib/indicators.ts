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
  if (klines.length < 35) return false;
  
  const closes = klines.map((k) => parseFloat(k.close));
  const rsi = calculateRSI(closes, 14);

  if (rsi.length < 15) return false;

  // ПОДРАВНЯВАНЕ: Вземаме само онези klines, за които имаме пресметнат RSI
  const offset = klines.length - rsi.length;
  const alignedHighs = klines.slice(offset).map((k) => parseFloat(k.high));

  const lookback = Math.min(30, rsi.length);
  const recentRSI = rsi.slice(-lookback);
  const recentHighs = alignedHighs.slice(-lookback);

  // Намиране на Swing Highs
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

  // Цената прави по-висок връх, но RSI прави по-нисък връх = Bearish Divergence
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

  const prevHighs = prevCandles.map((k) => parseFloat(k.high));
  const maxPrevHigh = Math.max(...prevHighs);

  const lastHigh = parseFloat(lastCandle.high);
  const lastClose = parseFloat(lastCandle.close);
  const lastOpen = parseFloat(lastCandle.open);

  if (lastHigh > maxPrevHigh && lastClose < maxPrevHigh && lastClose < lastOpen) {
    return true;
  }

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

  const lastHL = swingLows[swingLows.length - 1];
  const prevHL = swingLows[swingLows.length - 2];

  if (lastHL <= prevHL) return false;

  const currentClose = closes[closes.length - 1];
  return currentClose < lastHL;
}

/**
 * Detect CVD divergence: price makes new high but Net Volume Delta (Buy - Sell) is decreasing
 */
export function detectCVDDivergence(klines: Kline[]): boolean {
  if (klines.length < 20) return false;

  const recent = klines.slice(-20);
  const firstHalf = recent.slice(0, 10);
  const secondHalf = recent.slice(10);

  const calcNetDeltaSum = (arr: Kline[]) =>
    arr.reduce((sum, k) => {
      const totalVol = parseFloat(k.volume);
      const buyVol = parseFloat(k.takerBuyBaseAssetVolume);
      const sellVol = Math.max(0, totalVol - buyVol);
      return sum + (buyVol - sellVol);
    }, 0);

  const delta1 = calcNetDeltaSum(firstHalf);
  const delta2 = calcNetDeltaSum(secondHalf);

  const avgClose1 =
    firstHalf.reduce((sum, k) => sum + parseFloat(k.close), 0) / firstHalf.length;
  const avgClose2 =
    secondHalf.reduce((sum, k) => sum + parseFloat(k.close), 0) / secondHalf.length;

  return avgClose2 > avgClose1 && delta2 < delta1;
}

/**
 * Detect OI spike with price stall: OI increased significantly
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

  return recentGrowth > 0.03 || (recentGrowth > 0.015 && prevGrowth > 0.01);
}
