import { NextResponse } from "next/server";
import { db } from "@/db";
import { alerts } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  try {
    const data = await db
      .select()
      .from(alerts)
      .orderBy(desc(alerts.createdAt))
      .limit(50);

    return NextResponse.json({ alerts: data });
  } catch (err) {
    console.error("Get alerts error:", err);
    return NextResponse.json({ error: "Failed to fetch alerts" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    await db.update(alerts).set({ isRead: true }).where(eq(alerts.id, id));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Update alert error:", err);
    return NextResponse.json({ error: "Failed to update alert" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    await db.delete(alerts);
    return NextResponse.json({ success: true, message: "All alerts cleared" });
  } catch (err) {
    console.error("Delete alerts error:", err);
    return NextResponse.json({ error: "Failed to clear alerts" }, { status: 500 });
  }
}
