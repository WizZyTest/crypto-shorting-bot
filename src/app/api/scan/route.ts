import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const scanFilePath = path.join(process.cwd(), "data", "last_scan.json");

function getLastScanData() {
  try {
    if (!fs.existsSync(scanFilePath)) return null;
    const fileData = fs.readFileSync(scanFilePath, "utf8").trim();
    if (!fileData) return null;
    return JSON.parse(fileData);
  } catch {
    return null;
  }
}

function saveScanData(data: any) {
  try {
    const dir = path.dirname(scanFilePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(scanFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Грешка при запазване на скана във файл:", error);
  }
}

function calculateRSI(prices: number[], period = 14): number {
  if (prices.length < period + 1) return 50;

  let gains = 0;
  let losses = 0;

  for (let i = 1; i <= period; i++) {
    const change = prices[i] - prices[i - 1];
    if (change >= 0) gains += change;
    else losses += Math.abs(change);
  }

  let avgGain = gains / period;
  let avgLoss = losses / period;

  for (let i = period + 1; i < prices.length; i++) {
    const change = prices[i] - prices[i - 1];
    if (change >= 0) {
      avgGain = (avgGain * 13 + change) / 14;
      avgLoss = (avgLoss * 13) / 14;
    } else {
      avgGain = (avgGain * 13) / 14;
      avgLoss = (avgLoss * 13 + Math.abs(change)) / 14;
    }
  }

  if (avgLoss === 0) return 100;
  const rs = avgGain / avgLoss;
  return Math.round((100 - 100 / (1 + rs)) * 10) / 10;
}

async function executeScan() {
  const tickerRes = await fetch("https://fapi.binance.com/fapi/v1/ticker/24hr", {
    cache: "no-store",
  });
  const tickers = await tickerRes.json();

  if (!Array.isArray(tickers)) {
    throw new Error("Невалиден отговор от Binance");
  }

  const usdtTickers = tickers.filter((t: any) => t.symbol.endsWith("USDT"));

  // 1. Топ 20 най-растящи (за SHORT) и Топ 20 най-падащи (за LONG)
  const topGainers = [...usdtTickers]
    .sort((a: any, b: any) => parseFloat(b.priceChangePercent) - parseFloat(a.priceChangePercent))
    .slice(0, 20);

  const topLosers = [...usdtTickers]
    .sort((a: any, b: any) => parseFloat(a.priceChangePercent) - parseFloat(b.priceChangePercent))
    .slice(0, 20);

  const candidates = [...topGainers, ...topLosers];

  // 2. Funding Rates Map
  const premiumRes = await fetch("https://fapi.binance.com/fapi/v1/premiumIndex", {
    cache: "no-store",
  });
  const premiumData = await premiumRes.json();
  const fundingMap = new Map<string, number>();

  if (Array.isArray(premiumData)) {
    premiumData.forEach((p: any) => {
      fundingMap.set(p.symbol, parseFloat(p.lastFundingRate));
    });
  }

  // 3. Анализ с HTF Macro Filter
  const results = await Promise.all(
    candidates.map(async (t: any, index: number) => {
      const symbol = t.symbol;
      const price = parseFloat(t.lastPrice);
      const priceChange24h = parseFloat(t.priceChangePercent);
      const volume24h = parseFloat(t.quoteVolume);
      const fundingRate = fundingMap.get(symbol) || 0;

      let rsiValue = 50;
      let is4hSweep = false;
      let openInterestChange = 0;

      try {
        const klinesRes = await fetch(
          `https://fapi.binance.com/fapi/v1/klines?symbol=${symbol}&interval=4h&limit=30`,
          { cache: "no-store" }
        );
        const klines = await klinesRes.json();
        if (Array.isArray(klines) && klines.length >= 15) {
          const closePrices = klines.map((k: any) => parseFloat(k[4]));
          rsiValue = calculateRSI(closePrices);

          // Проверка за HTF Sweep на 4H свещите
          const recentHighs = klines.slice(-6, -1).map((k: any) => parseFloat(k[2]));
          const recentLows = klines.slice(-6, -1).map((k: any) => parseFloat(k[3]));
          const currentHigh = parseFloat(klines[klines.length - 1][2]);
          const currentLow = parseFloat(klines[klines.length - 1][3]);

          const prevMaxHigh = Math.max(...recentHighs);
          const prevMinLow = Math.min(...recentLows);

          if (currentHigh > prevMaxHigh || currentLow < prevMinLow) {
            is4hSweep = true;
          }
        }

        const oiRes = await fetch(
          `https://fapi.binance.com/fapi/v1/openInterest?symbol=${symbol}`,
          { cache: "no-store" }
        );
        const oiData = await oiRes.json();
        if (oiData && oiData.openInterest) {
          openInterestChange = Math.round(((parseFloat(oiData.openInterest) * price) / volume24h) * 10) / 10;
        }
      } catch {
        // Прескачаме при грешка или API лимит
      }

      // Определяне на посоката (direction)
      let direction: "LONG" | "SHORT" | null = null;
      if (priceChange24h > 0 || rsiValue >= 60) {
        direction = "SHORT";
      } else if (priceChange24h < 0 || rsiValue <= 40) {
        direction = "LONG";
      }

      if (!direction) return null;

      let score = 0;
      const signals: string[] = [];

      if (direction === "SHORT") {
        if (rsiValue >= 65) {
          score += 3.0;
          signals.push(`📉 4H HTF RSI Свръхкупен: ${rsiValue}`);
        }
        if (priceChange24h > 8) {
          score += 2.5;
          signals.push(`🚀 24ч Помпа: +${priceChange24h.toFixed(2)}%`);
        }
        if (fundingRate > 0.0003) {
          score += 2.0;
          signals.push(`🔥 Висок Funding: ${(fundingRate * 100).toFixed(4)}%`);
        }
        if (is4hSweep) {
          score += 2.5;
          signals.push(`🎯 4H HTF Liquidity Sweep (High)`);
        }
      } else {
        if (rsiValue <= 35) {
          score += 3.0;
          signals.push(`📈 4H HTF RSI Свръхпродаден: ${rsiValue}`);
        }
        if (priceChange24h < -8) {
          score += 2.5;
          signals.push(`🩸 24ч Срив: ${priceChange24h.toFixed(2)}%`);
        }
        if (fundingRate < -0.0003) {
          score += 2.0;
          signals.push(`❄️ Отрицателен Funding: ${(fundingRate * 100).toFixed(4)}%`);
        }
        if (is4hSweep) {
          score += 2.5;
          signals.push(`🎯 4H HTF Liquidity Sweep (Low)`);
        }
      }

      // Отсяваме монети без критичен резултат
      if (score < 4.0) return null;

      const conviction = score >= 7.5 ? "HIGH" : "MEDIUM";

      const stopLoss = direction === "SHORT" ? price * 1.03 : price * 0.97;
      const takeProfit = direction === "SHORT" ? price * 0.91 : price * 1.09;

      return {
        id: index + 1,
        symbol,
        direction,
        price,
        priceChange24h,
        volume24h,
        fundingRate,
        openInterestChange,
        rsiValue,
        rsiDivergence: direction === "SHORT" ? rsiValue > 75 : rsiValue < 25,
        liquiditySweep: is4hSweep,
        score,
        entryPrice: price,
        stopLoss,
        takeProfit,
        conviction,
        signals,
        scannedAt: new Date().toLocaleTimeString(),
      };
    })
  );

  const filteredResults = results
    .filter((r): r is NonNullable<typeof r> => r !== null)
    .sort((a, b) => b.score - a.score);

  const responseData = {
    success: true,
    timestamp: new Date().toISOString(),
    results: filteredResults,
  };

  saveScanData(responseData);
  return responseData;
}

export async function GET() {
  try {
    const savedData = getLastScanData();
    if (savedData) {
      return NextResponse.json(savedData);
    }

    const newData = await executeScan();
    return NextResponse.json(newData);
  } catch (error: any) {
    console.error("Грешка при зареждане на скана:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const newData = await executeScan();
    return NextResponse.json(newData);
  } catch (error: any) {
    console.error("Сканирането пропадна:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
