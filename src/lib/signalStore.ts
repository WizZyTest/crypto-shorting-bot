import fs from 'fs';
import path from 'path';
import { SignalRecord, WinRateStats } from '@/types/signal';

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE_PATH = path.join(DATA_DIR, 'signals.json');

function ensureDirectoryExists() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, JSON.stringify([]), 'utf-8');
  }
}

export function getSignals(): SignalRecord[] {
  ensureDirectoryExists();
  try {
    const rawData = fs.readFileSync(FILE_PATH, 'utf-8');
    return JSON.parse(rawData);
  } catch {
    return [];
  }
}

export function saveSignals(signals: SignalRecord[]): void {
  ensureDirectoryExists();
  fs.writeFileSync(FILE_PATH, JSON.stringify(signals, null, 2), 'utf-8');
}

export function addSignal(signal: Omit<SignalRecord, 'id' | 'timestamp' | 'status'>): SignalRecord {
  const signals = getSignals();
  
  // Избягваме дублиране на активен сигнал за същия символ в рамките на 1 час
  const existingPending = signals.find(
    (s) => s.symbol === signal.symbol && s.status === 'PENDING'
  );
  if (existingPending) return existingPending;

  const newSignal: SignalRecord = {
    ...signal,
    id: `${signal.symbol}-${Date.now()}`,
    timestamp: Date.now(),
    status: 'PENDING',
  };

  signals.unshift(newSignal);
  saveSignals(signals);
  return newSignal;
}

export function calculateStats(signals: SignalRecord[]): WinRateStats {
  const totalClosed = signals.filter((s) => s.status === 'WIN' || s.status === 'LOSS');
  const wins = signals.filter((s) => s.status === 'WIN').length;
  const losses = signals.filter((s) => s.status === 'LOSS').length;
  const pending = signals.filter((s) => s.status === 'PENDING').length;
  const expired = signals.filter((s) => s.status === 'EXPIRED').length;

  const totalClosedCount = totalClosed.length;
  const winRate = totalClosedCount > 0 ? (wins / totalClosedCount) * 100 : 0;
  
  const totalPnl = totalClosed.reduce((sum, s) => sum + (s.pnlPercent || 0), 0);
  const avgPnl = totalClosedCount > 0 ? totalPnl / totalClosedCount : 0;

  return {
    totalSignals: signals.length,
    wins,
    losses,
    pending,
    expired,
    winRate: Number(winRate.toFixed(2)),
    avgPnl: Number(avgPnl.toFixed(2)),
  };
}
