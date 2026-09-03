import {
  getAllTickers,
  getAllPremiumIndex,
  getOpenInterest,
  getOpenInterestHist,
  getKlines,
} from "./binance";
import {
  detectBearishDivergence,
  detectLiquiditySweep,
  detectMarketStructureBreak,
  detectCVDDivergence,
  detectOISpike,
  calculateRSI,
} from "./indicators";

export interface ScanResult {
  symbol: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  openInterest: number;
  openInterestChange: number;
  fundingRate: number;
  rsiValue: number | null;
  rsiDivergence: boolean;
  liquiditySweep: boolean;
  marketStructureBreak: boolean;
  cvdDivergence: boolean;
  oiSpike: boolean;
  score: number;
  entryPrice: number | null;
  stopLoss: number | null;
  takeProfit: number | null;
  conviction: "HIGH" | "MEDIUM" | "LOW";
  signals: string[];
}

function scoreResult(result: Omit<ScanResult, "score" | "conviction" | "signals" | "entryPrice" | "stopLoss" | "takeProfit">): {
  score: number;
  signals: string[];
} {
  let score = 0;
  const signals: string[] = [];

  // 1. Primary Market Action (High Conviction Signals)
  if (result.liquiditySweep) {
    score += 3;
    signals.push("Liquidity Sweep: Пробив над равен връх + затваряне под него ⚡");
  }

  if (result.fundingRate > 0.0003) {
    score += 2;
    signals.push(`Funding Rate: +${(result.fundingRate * 100).toFixed(3)}% (Скъп Long)`);
  }
  if (result.fundingRate > 0.0008) {
    score += 1;
    signals.push("Funding Rate: ЕКСТРЕМНО ВЕЛИК (>0.08%) 🔥");
  }

  if (result.cvdDivergence) {
    score += 2;
    signals.push("CVD Дивергенция: Ценови нов връх при спадащ Spot CVD 📊");
  }

  if (result.oiSpike) {
    score += 2;
    signals.push("OI Spike & Stall: Рязък скок на OI + спиране на импулса ⚡");
  } else if (result.openInterestChange > 8) {
    score += 1;
    signals.push(`OI Промяна: +${result.openInterestChange.toFixed(1)}%`);
  }

  // 2. Technical Structure Confirmations
  if (result.marketStructureBreak) {
    score += 1.5;
    signals.push("MSB: Пробив на 15m/1h Higher Low подкрепа 🔻");
  }

  if (result.rsiDivergence) {
    score += 1.5;
    signals.push("RSI Bearish Дивергенция: Нов връх на цената при по-нисък RSI 📉");
  }

  if (result.rsiValue !== null && result.rsiValue > 75) {
    score += 1;
    signals.push(`RSI Пренакупен: ${result.rsiValue.toFixed(1)}`);
  }

  // 3. Synergistic Combination Bonus (High Precision Short Setup)
  if (result.liquiditySweep && result.cvdDivergence) {
    score += 1.5;
    signals.push("COMBO: Liquidity Sweep + CVD Divergence 🔥");
  }

  return { score: Math.round(score * 10) / 10, signals };
}

function calcTradeLevels(
  price: number,
  klines: Array<{ high: string; low: string; close: string }>,
  hasSweep: boolean
): { entryPrice: number; stopLoss: number; takeProfit: number } {
  const highs = klines.slice(-20).map((k) => parseFloat(k.high));
  const lows = klines.slice(-20).map((k) => parseFloat(k.low));
  const maxHigh = Math.max(...highs);
  const minLow = Math.min(...lows);

  // Approximate ATR(14) for volatility buffer
  let trSum = 0;
  const recent = klines.slice(-15);
  for (let i = 1; i < recent.length; i++) {
    const h = parseFloat(recent[i].high);
    const l = parseFloat(recent[i].low);
    const prevC = parseFloat(recent[i - 1].close);
    const tr = Math.max(h - l, Math.abs(h - prevC), Math.abs(l - prevC));
    trSum += tr;
  }
  const atr = trSum / (recent.length - 1 || 1);

  const entryPrice = price;

  // Stop Loss: Above Liquidity Sweep high with ATR buffer (minimum 0.8%)
  const rawSL = hasSweep ? maxHigh + atr * 0.5 : price + atr * 1.5;
  const stopLoss = Math.max(rawSL, price * 1.008);

  // Take Profit: Targeting lowest pool of liquidity with R:R >= 1:2.5
  const risk = stopLoss - entryPrice;
  const minTarget = entryPrice - risk * 2.5;
  const takeProfit = Math.min(minLow, minTarget);

  return {
    entryPrice: Number(entryPrice.toFixed(6)),
    stopLoss: Number(stopLoss.toFixed(6)),
    takeProfit: Number(takeProfit.toFixed(6)),
  };
}

export async function runScan(topN = 100): Promise<ScanResult[]> {
  const [tickers, premiumIndexes] = await Promise.all([
    getAllTickers(),
    getAllPremiumIndex(),
  ]);

  if (!tickers || tickers.length === 0) return [];

  const topTickers = tickers
    .sort((a, b) => parseFloat(b.quoteVolume) - parseFloat(a.quoteVolume))
    .slice(0, topN);

  const fundingMap = new Map<string, number>();
  for (const p of premiumIndexes) {
    fundingMap.set(p.symbol, parseFloat(p.lastFundingRate));
  }

  const results: ScanResult[] = [];
  const BATCH_SIZE = 20;

  for (let i = 0; i < topTickers.length; i += BATCH_SIZE) {
    const batch = topTickers.slice(i, i + BATCH_SIZE);

    const batchResults = await Promise.all(
      batch.map(async (ticker) => {
        try {
          const symbol = ticker.symbol;
          const price = parseFloat(ticker.lastPrice);
          const priceChange24h = parseFloat(ticker.priceChangePercent);
          const volume24h = parseFloat(ticker.quoteVolume);

          const fundingRate = fundingMap.get(symbol) ?? 0;

          const [oiData, oiHist, klines1h, klines4h] = await Promise.all([
            getOpenInterest(symbol),
            getOpenInterestHist(symbol, "1h", 5),
            getKlines(symbol, "1h", 50),
            getKlines(symbol, "4h", 50),
          ]);

          const openInterest = oiData ? parseFloat(oiData.openInterest) : 0;

          let openInterestChange = 0;
          if (oiHist.length >= 2) {
            const latest = parseFloat(oiHist[oiHist.length - 1].sumOpenInterest);
            const oldest = parseFloat(oiHist[0].sumOpenInterest);
            if (oldest > 0) {
              openInterestChange = ((latest - oldest) / oldest) * 100;
            }
          }

          const rsiDivergence = detectBearishDivergence(klines4h.length >= 30 ? klines4h : klines1h);
          const liquiditySweep = detectLiquiditySweep(klines1h);
          const marketStructureBreak = detectMarketStructureBreak(klines1h);
          const cvdDivergence = detectCVDDivergence(klines1h);
          const oiSpike = detectOISpike(oiHist);

          let rsiValue: number | null = null;
          if (klines4h.length >= 15) {
            const closes = klines4h.map((k) => parseFloat(k.close));
            const rsiArr = calculateRSI(closes, 14);
            if (rsiArr.length > 0) {
              rsiValue = rsiArr[rsiArr.length - 1];
            }
          }

          const base = {
            symbol,
            price,
            priceChange24h,
            volume24h,
            openInterest,
            openInterestChange,
            fundingRate,
            rsiValue,
            rsiDivergence,
            liquiditySweep,
            marketStructureBreak,
            cvdDivergence,
            oiSpike,
          };

          const { score, signals } = scoreResult(base);

          const conviction: "HIGH" | "MEDIUM" | "LOW" =
            score >= 7 ? "HIGH" : score >= 4 ? "MEDIUM" : "LOW";

          const { entryPrice, stopLoss, takeProfit } = calcTradeLevels(
            price,
            klines1h,
            liquiditySweep
          );

          return {
            ...base,
            score,
            entryPrice,
            stopLoss,
            takeProfit,
            conviction,
            signals,
          } as ScanResult;
        } catch {
          return null;
        }
      })
    );

    for (const r of batchResults) {
      if (r) results.push(r);
    }
  }

  return results.sort((a, b) => b.score - a.score);
}
