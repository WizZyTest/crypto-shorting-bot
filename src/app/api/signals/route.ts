import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { SignalRecord, WinRateStats } from '@/types/signal';

const filePath = path.join(process.cwd(), 'data', 'signals.json');

function getSignals(): SignalRecord[] {
  try {
    if (!fs.existsSync(filePath)) return [];
    const fileData = fs.readFileSync(filePath, 'utf8').trim();
    if (!fileData) return [];
    return JSON.parse(fileData);
  } catch {
    return [];
  }
}

function saveSignals(signals: SignalRecord[]) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(signals, null, 2));
}

function calculateStats(signals: SignalRecord[]): WinRateStats {
  const totalSignals = signals.length;
  if (totalSignals === 0) {
    return { winRate: 0, totalSignals: 0, wins: 0, losses: 0, avgPnl: 0 };
  }

  const closedSignals = signals.filter((s) => s.status === 'WIN' || s.status === 'LOSS');
  const wins = closedSignals.filter((s) => s.status === 'WIN').length;
  const losses = closedSignals.filter((s) => s.status === 'LOSS').length;

  const winRate = closedSignals.length > 0 ? Number(((wins / closedSignals.length) * 100).toFixed(1)) : 0;

  const totalPnl = signals.reduce((acc, curr) => acc + (curr.pnlPercent || 0), 0);
  const avgPnl = Number((totalPnl / totalSignals).toFixed(2));

  return { winRate, totalSignals, wins, losses, avgPnl };
}

export async function GET() {
  const signals = getSignals();
  const stats = calculateStats(signals);
  return NextResponse.json({ signals, stats });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { symbol, entryPrice, takeProfit, stopLoss, score, conviction } = body;

    const signals = getSignals();

    const existingIndex = signals.findIndex((s) => s.symbol === symbol && s.status === 'PENDING');

    const newSignal: SignalRecord = {
      id: `${symbol}-${Date.now()}`,
      symbol,
      entryPrice: Number(entryPrice),
      takeProfit: Number(takeProfit),
      stopLoss: Number(stopLoss),
      score: Number(score),
      conviction: conviction || 'HIGH',
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      pnlPercent: 0,
    };

    if (existingIndex !== -1) {
      signals[existingIndex] = newSignal;
    } else {
      signals.unshift(newSignal);
    }

    saveSignals(signals);
    const stats = calculateStats(signals);

    return NextResponse.json({ success: true, signal: newSignal, stats });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to save signal' }, { status: 500 });
  }
}
