"use client";

import { useEffect, useState, useCallback } from "react";

interface Ticker {
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  fundingRate: number;
}

function fmtVol(n: number) {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(0)}M`;
  return `$${(n / 1_000).toFixed(0)}K`;
}

export default function MarketOverview() {
  const [tickers, setTickers] = useState<Ticker[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTickers = useCallback(async () => {
    try {
      const res = await fetch("/api/ticker");
      const data = await res.json();
      setTickers(data.tickers ?? []);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTickers();
    const interval = setInterval(fetchTickers, 15000);
    return () => clearInterval(interval);
  }, [fetchTickers]);

  return (
    <div className="bg-[#131929] border border-[#1e2d47] rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">📊</span>
          <h2 className="text-base font-bold text-white">Пазарен Обзор</h2>
          <span className="text-xs text-slate-500">Топ 20 по обем</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-slate-500">Live</span>
        </div>
      </div>

      {loading && (
        <div className="text-center py-6 text-slate-500 text-sm">Зареждане...</div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-slate-500 border-b border-slate-800">
              <th className="text-left pb-2 font-medium">Монета</th>
              <th className="text-right pb-2 font-medium">Цена</th>
              <th className="text-right pb-2 font-medium">24h %</th>
              <th className="text-right pb-2 font-medium hidden sm:table-cell">Обем</th>
              <th className="text-right pb-2 font-medium">Funding</th>
            </tr>
          </thead>
          <tbody>
            {tickers.map((t) => (
              <tr
                key={t.symbol}
                className="border-b border-slate-800/50 table-row-hover transition-colors"
              >
                <td className="py-2 font-semibold text-slate-200">
                  {t.symbol.replace("USDT", "")}
                  <span className="text-slate-600 font-normal">/USDT</span>
                </td>
                <td className="text-right text-slate-300 py-2">
                  ${t.price >= 100 ? t.price.toFixed(2) : t.price >= 1 ? t.price.toFixed(3) : t.price.toFixed(5)}
                </td>
                <td
                  className={`text-right py-2 font-semibold ${t.change24h >= 0 ? "text-green-400" : "text-red-400"}`}
                >
                  {t.change24h >= 0 ? "+" : ""}
                  {t.change24h.toFixed(2)}%
                </td>
                <td className="text-right text-slate-400 py-2 hidden sm:table-cell">
                  {fmtVol(t.volume24h)}
                </td>
                <td
                  className={`text-right py-2 font-medium ${t.fundingRate > 0.003 ? "text-red-400" : t.fundingRate > 0.001 ? "text-amber-400" : t.fundingRate < -0.001 ? "text-green-400" : "text-slate-400"}`}
                >
                  {(t.fundingRate * 100).toFixed(4)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
