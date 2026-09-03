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

  // Funding Rate scoring
  if (result.fundingRate > 0.001) {
    score += 1;
    signals.push(`Funding Rate: ${(result.fundingRate * 100).toFixed(4)}% (Elevated)`);
  }
  if (result.fundingRate > 0.003) {
    score += 1;
    signals.push("Funding Rate: Очень висок (>0.3%)");
  }
  if (result.fundingRate > 0.005) {
    score += 1;
    signals.push("Funding Rate: ЕКСТРЕМНО ВИСОК (>0.5%) 🔥");
  }

  // OI Change scoring
  if (result.openInterestChange > 5) {
    score += 1;
    signals.push(`OI промяна: +${result.openInterestChange.toFixed(1)}% (Нарастване)`);
  }
  if (result.openInterestChange > 15) {
    score += 1;
    signals.push("OI промяна: РЯЗЪК СКОК >15% 🔥");
  }

  // OI Spike detection
  if (result.oiSpike) {
    score += 2;
    signals.push("OI Spike: Рязко нарастване на Open Interest ⚡");
  }

  // RSI Divergence
  if (result.rsiDivergence) {
    score += 2;
    signals.push("RSI Bearish Дивергенция: Нов ценови връх при по-нисък RSI 📉");
  }

  // RSI overbought
  if (result.rsiValue !== null && result.rsiValue > 70) {
    score += 1;
    signals.push(`RSI Пренакупен: ${result.rsiValue.toFixed(1)} (>70)`);
  }
  if (result.rsiValue !== null && result.rsiValue > 80) {
    score += 1;
    signals.push(`RSI Екстремно: ${result.rsiValue.toFixed(1)} (>80) 🔥`);
  }

  // Liquidity Sweep
  if (result.liquiditySweep) {
    score += 3;
    signals.push("Liquidity Sweep: Пробив над равни върхове + затваряне обратно ⚡");
  }

  // Market Structure Break
  if (result.marketStructureBreak) {
    score += 2;
    signals.push("MSB: Пробив на Higher Low структура 🔻");
  }

  // CVD Divergence
  if (result.cvdDivergence) {
    score += 2;
    signals.push("CVD Дивергенция: Цена нагоре, обем купувачи надолу 📊");
  }

  return { score, signals };
}

function calcTradeLevels(
  price: number,
  klines: Array<{ high: string; low: string }>,
  hasSweep: boolean
): { entryPrice: number; stopLoss: number; takeProfit: number } {
  const highs = klines.slice(-20).map((k) => parseFloat(k.high));
  const lows = klines.slice(-20).map((k) => parseFloat(k.low));
  const maxHigh = Math.max(...highs);
  const minLow = Math.min(...lows);

  // Entry at current price
  const entryPrice = price;

  // Stop loss: above the sweep / recent high (0.3% buffer)
  const stopLoss = hasSweep ? maxHigh * 1.003 : price * 1.015;

  // Take profit: next liquidity level below (nearest significant low)
  const sortedLows = [...lows].sort((a, b) => b - a);
  const midLow = sortedLows[Math.floor(sortedLows.length / 2)];
  const takeProfit = Math.max(minLow, midLow * 0.995);

  return { entryPrice, stopLoss, takeProfit };
}

export async function runScan(topN = 100): Promise<ScanResult[]> {
  // Fetch all tickers and premium index in parallel
  const [tickers, premiumIndexes] = await Promise.all([
    getAllTickers(),
    getAllPremiumIndex(),
  ]);

  if (tickers.length === 0) return [];

  // Sort by volume and take top N
  const topTickers = tickers
    .sort((a, b) => parseFloat(b.quoteVolume) - parseFloat(a.quoteVolume))
    .slice(0, topN);

  // Build funding rate map
  const fundingMap = new Map<string, number>();
  for (const p of premiumIndexes) {
    fundingMap.set(p.symbol, parseFloat(p.lastFundingRate));
  }

  const results: ScanResult[] = [];
  const BATCH_SIZE = 10;

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

          // Fetch OI and klines in parallel
          const [oiData, oiHist, klines1h, klines4h] = await Promise.all([
            getOpenInterest(symbol),
            getOpenInterestHist(symbol, "1h", 5),
            getKlines(symbol, "1h", 50),
            getKlines(symbol, "4h", 50),
          ]);

          const openInterest = oiData ? parseFloat(oiData.openInterest) : 0;

          // OI change %
          let openInterestChange = 0;
          if (oiHist.length >= 2) {
            const latest = parseFloat(oiHist[oiHist.length - 1].sumOpenInterest);
            const oldest = parseFloat(oiHist[0].sumOpenInterest);
            if (oldest > 0) {
              openInterestChange = ((latest - oldest) / oldest) * 100;
            }
          }

          // Technical indicators
          const rsiDivergence = detectBearishDivergence(klines4h.length >= 30 ? klines4h : klines1h);
          const liquiditySweep = detectLiquiditySweep(klines1h);
          const marketStructureBreak = detectMarketStructureBreak(klines1h);
          const cvdDivergence = detectCVDDivergence(klines1h);
          const oiSpike = detectOISpike(oiHist);

          // RSI value (last)
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

  // Sort by score descending
  return results.sort((a, b) => b.score - a.score);
}
