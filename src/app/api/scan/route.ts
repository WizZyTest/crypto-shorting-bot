import { NextResponse } from "next/server";
import { db } from "@/db";
import { scanResults, scanHistory, alerts } from "@/db/schema";
import { runScan } from "@/lib/scanner";
import { desc } from "drizzle-orm";

export const maxDuration = 60;

export async function POST() {
  try {
    const results = await runScan(100);

    if (results.length === 0) {
      return NextResponse.json({ error: "No data from Binance API" }, { status: 503 });
    }

    // Save scan results to DB (top 50 only)
    const top50 = results.slice(0, 50);

    // Clear old results and insert new ones
    await db.delete(scanResults);

    if (top50.length > 0) {
      await db.insert(scanResults).values(
        top50.map((r) => ({
          symbol: r.symbol,
          price: r.price,
          priceChange24h: r.priceChange24h,
          volume24h: r.volume24h,
          openInterest: r.openInterest,
          openInterestChange: r.openInterestChange,
          fundingRate: r.fundingRate,
          rsiValue: r.rsiValue,
          rsiDivergence: r.rsiDivergence,
          liquiditySweep: r.liquiditySweep,
          marketStructureBreak: r.marketStructureBreak,
          cvdDivergence: r.cvdDivergence,
          oiSpike: r.oiSpike,
          score: r.score,
          entryPrice: r.entryPrice,
          stopLoss: r.stopLoss,
          takeProfit: r.takeProfit,
          conviction: r.conviction,
          signals: r.signals,
        }))
      );
    }

    // Save scan history
    const high = results.filter((r) => r.conviction === "HIGH").length;
    const medium = results.filter((r) => r.conviction === "MEDIUM").length;
    const low = results.filter((r) => r.conviction === "LOW").length;

    await db.insert(scanHistory).values({
      totalScanned: results.length,
      highConviction: high,
      mediumConviction: medium,
      lowConviction: low,
    });

    // Create alerts for HIGH conviction signals
    const highConviction = results.filter((r) => r.conviction === "HIGH");
    if (highConviction.length > 0) {
      await db.insert(alerts).values(
        highConviction.map((r) => ({
          symbol: r.symbol,
          score: r.score,
          conviction: r.conviction,
          entryPrice: r.entryPrice,
          stopLoss: r.stopLoss,
          takeProfit: r.takeProfit,
          signals: r.signals,
        }))
      );
    }

    return NextResponse.json({
      success: true,
      scanned: results.length,
      highConviction: high,
      mediumConviction: medium,
      results: results.slice(0, 20),
    });
  } catch (err) {
    console.error("Scan error:", err);
    return NextResponse.json({ error: "Scan failed" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const results = await db
      .select()
      .from(scanResults)
      .orderBy(desc(scanResults.score))
      .limit(50);

    const history = await db
      .select()
      .from(scanHistory)
      .orderBy(desc(scanHistory.scannedAt))
      .limit(1);

    return NextResponse.json({
      results,
      lastScan: history[0] ?? null,
    });
  } catch (err) {
    console.error("Get scan error:", err);
    return NextResponse.json({ error: "Failed to fetch results" }, { status: 500 });
  }
}
