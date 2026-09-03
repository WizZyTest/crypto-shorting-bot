import { NextResponse } from "next/server";
import { getAllTickers, getAllPremiumIndex } from "@/lib/binance";

export async function GET() {
  try {
    const [tickers, premiumIndexes] = await Promise.all([
      getAllTickers(),
      getAllPremiumIndex(),
    ]);

    const fundingMap = new Map<string, number>();
    for (const p of premiumIndexes) {
      fundingMap.set(p.symbol, parseFloat(p.lastFundingRate));
    }

    const top20 = tickers
      .sort((a, b) => parseFloat(b.quoteVolume) - parseFloat(a.quoteVolume))
      .slice(0, 20)
      .map((t) => ({
        symbol: t.symbol,
        price: parseFloat(t.lastPrice),
        change24h: parseFloat(t.priceChangePercent),
        volume24h: parseFloat(t.quoteVolume),
        fundingRate: fundingMap.get(t.symbol) ?? 0,
      }));

    return NextResponse.json({ tickers: top20 });
  } catch (err) {
    console.error("Ticker error:", err);
    return NextResponse.json({ error: "Failed to fetch tickers" }, { status: 500 });
  }
}
