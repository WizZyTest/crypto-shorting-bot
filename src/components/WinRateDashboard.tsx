'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { SignalRecord, WinRateStats } from '@/types/signal';

export default function WinRateDashboard() {
  const [stats, setStats] = useState<WinRateStats | null>(null);
  const [signals, setSignals] = useState<SignalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [evaluating, setEvaluating] = useState(false);

  // Хелпър за чист изглед на цените без разтеглени float числа
  const formatPrice = (price?: number) => {
    if (price === undefined || price === null) return '0';
    return price < 1 ? price.toFixed(6) : price.toFixed(2);
  };

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/signals');
      if (!res.ok) return;
      
      const data = await res.json();
      setStats(data.stats || { winRate: 0, totalSignals: 0, wins: 0, losses: 0, avgPnl: 0 });
      setSignals(data.signals || []);
    } catch (err) {
      console.error('Failed to fetch signals:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleEvaluate = async () => {
    setEvaluating(true);
    try {
      const res = await fetch('/api/signals/evaluate', { method: 'POST' });
      if (res.ok) {
        await fetchData();
      }
    } catch (err) {
      console.error('Failed to evaluate signals:', err);
    } finally {
      setEvaluating(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Автоматично преоценяване и синхронизация на всеки 60 секунди
    const interval = setInterval(() => {
      fetchData();
    }, 60000);

    return () => clearInterval(interval);
  }, [fetchData]);

  if (loading) return <div className="p-4 text-gray-400">Loading Win-Rate metrics...</div>;

  return (
    <div className="w-full space-y-6 bg-gray-900 text-white p-6 rounded-xl border border-gray-800">
      {/* Метрики / Статистика */}
      <div className="flex items-center justify-between border-b border-gray-800 pb-4">
        <h2 className="text-xl font-bold text-gray-100">Performance & Win-Rate Tracker</h2>
        <button
          onClick={handleEvaluate}
          disabled={evaluating}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-sm font-semibold rounded-lg transition"
        >
          {evaluating ? 'Evaluating...' : 'Re-Evaluate Signals'}
        </button>
      </div>

      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
            <span className="text-xs text-gray-400">Win Rate</span>
            <p className="text-2xl font-black text-green-400">{stats.winRate}%</p>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
            <span className="text-xs text-gray-400">Total Signals</span>
            <p className="text-2xl font-bold text-gray-200">{stats.totalSignals}</p>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
            <span className="text-xs text-gray-400">Wins / Losses</span>
            <p className="text-2xl font-bold text-gray-200">
              <span className="text-green-400">{stats.wins}</span> / <span className="text-red-400">{stats.losses}</span>
            </p>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
            <span className="text-xs text-gray-400">Avg PnL</span>
            <p className={`text-2xl font-bold ${stats.avgPnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {stats.avgPnl > 0 ? `+${stats.avgPnl}` : stats.avgPnl}%
            </p>
          </div>
        </div>
      )}

      {/* Таблица с история на сигналите */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="bg-gray-800 text-gray-400 uppercase text-xs">
            <tr>
              <th className="py-3 px-4">Symbol</th>
              <th className="py-3 px-4">Entry</th>
              <th className="py-3 px-4">TP / SL</th>
              <th className="py-3 px-4">Score</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">PnL</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {signals.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-4 text-center text-gray-500">No signals tracked yet.</td>
              </tr>
            ) : (
              signals.map((sig) => (
                <tr key={sig.id} className="hover:bg-gray-800/30">
                  <td className="py-3 px-4 font-semibold text-white">{sig.symbol}</td>
                  <td className="py-3 px-4">${formatPrice(sig.entryPrice)}</td>
                  <td className="py-3 px-4 text-xs">
                    <span className="text-green-400">${formatPrice(sig.takeProfit)}</span> / <span className="text-red-400">${formatPrice(sig.stopLoss)}</span>
                  </td>
                  <td className="py-3 px-4 font-mono">{sig.score}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-bold ${
                        sig.status === 'WIN'
                          ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                          : sig.status === 'LOSS'
                          ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                          : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                      }`}
                    >
                      {sig.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold">
                    {sig.pnlPercent !== undefined ? (
                      <span className={sig.pnlPercent >= 0 ? 'text-green-400' : 'text-red-400'}>
                        {sig.pnlPercent > 0 ? `+${sig.pnlPercent}` : sig.pnlPercent}%
                      </span>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
