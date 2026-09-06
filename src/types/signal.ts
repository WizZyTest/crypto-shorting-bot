export type SignalStatus = 'PENDING' | 'WIN' | 'LOSS' | 'EXPIRED';

export interface SignalRecord {
  id: string;
  symbol: string;
  entryPrice: number;
  takeProfit: number;
  stopLoss: number;
  score: number;
  conviction: 'HIGH' | 'MEDIUM' | 'LOW';
  timestamp: number;
  status: SignalStatus;
  closedPrice?: number;
  closedAt?: number;
  pnlPercent?: number;
}

export interface WinRateStats {
  totalSignals: number;
  wins: number;
  losses: number;
  pending: number;
  expired: number;
  winRate: number; // percentage
  avgPnl: number;
}
