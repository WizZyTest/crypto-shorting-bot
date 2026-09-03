import { NextResponse } from "next/server";
import { db } from "@/db";
import { scanHistory } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const history = await db
      .select()
      .from(scanHistory)
      .orderBy(desc(scanHistory.scannedAt))
      .limit(20);

    return NextResponse.json({ history });
  } catch (err) {
    console.error("History error:", err);
    return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 });
  }
}
