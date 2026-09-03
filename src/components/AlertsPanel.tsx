"use client";

import { useEffect, useState, useCallback } from "react";
import ConvictionBadge from "./ConvictionBadge";

interface Alert {
  id: number;
  symbol: string;
  score: number;
  conviction: string;
  entryPrice: number | null;
  stopLoss: number | null;
  takeProfit: number | null;
  signals: string[];
  isRead: boolean;
  createdAt: string;
}

function fmtPrice(n: number) {
  if (n >= 10000) return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (n >= 100) return n.toFixed(2);
  if (n >= 1) return n.toFixed(3);
  return n.toFixed(5);
}

export default function AlertsPanel() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAlerts = useCallback(async () => {
    try {
      const res = await fetch("/api/alerts");
      const data = await res.json();
      setAlerts(data.alerts ?? []);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 30000);
    return () => clearInterval(interval);
  }, [fetchAlerts]);

  const markRead = async (id: number) => {
    await fetch("/api/alerts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, isRead: true } : a)));
  };

  const unreadCount = alerts.filter((a) => !a.isRead).length;

  return (
    <div className="bg-[#131929] border border-[#1e2d47] rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">🔔</span>
          <h2 className="text-base font-bold text-white">Сигнали</h2>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full animate-pulse">
              {unreadCount}
            </span>
          )}
        </div>
        <button
          onClick={fetchAlerts}
          className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
        >
          ↻ Обнови
        </button>
      </div>

      {loading && (
        <div className="text-center py-8 text-slate-500 text-sm">Зареждане...</div>
      )}

      {!loading && alerts.length === 0 && (
        <div className="text-center py-8">
          <div className="text-3xl mb-2">📭</div>
          <div className="text-slate-500 text-sm">Няма сигнали</div>
          <div className="text-slate-600 text-xs mt-1">Стартирай скан за генериране на сигнали</div>
        </div>
      )}

      <div className="space-y-2 max-h-[600px] overflow-y-auto">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`rounded-lg p-3 transition-all ${
              alert.isRead
                ? "bg-slate-900/40 border border-slate-800/50 opacity-60"
                : "bg-red-500/8 border border-red-500/30"
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">
                    {alert.symbol.replace("USDT", "")}/USDT
                  </span>
                  <ConvictionBadge conviction={alert.conviction} size="sm" />
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Score: <span className="text-slate-300 font-semibold">{alert.score.toFixed(1)}</span>
                  {" · "}
                  {new Date(alert.createdAt).toLocaleTimeString("bg-BG")}
                </div>
              </div>
              {!alert.isRead && (
                <button
                  onClick={() => markRead(alert.id)}
                  className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
                >
                  ✓
                </button>
              )}
            </div>

            {/* Trade levels */}
            {alert.entryPrice && (
              <div className="grid grid-cols-3 gap-1 text-center mb-2">
                <div className="bg-blue-500/10 rounded px-1 py-1">
                  <div className="text-[9px] text-slate-500">Вход</div>
                  <div className="text-[10px] font-bold text-blue-400">
                    ${fmtPrice(alert.entryPrice)}
                  </div>
                </div>
                <div className="bg-red-500/10 rounded px-1 py-1">
                  <div className="text-[9px] text-slate-500">Stop</div>
                  <div className="text-[10px] font-bold text-red-400">
                    ${alert.stopLoss ? fmtPrice(alert.stopLoss) : "—"}
                  </div>
                </div>
                <div className="bg-green-500/10 rounded px-1 py-1">
                  <div className="text-[9px] text-slate-500">TP</div>
                  <div className="text-[10px] font-bold text-green-400">
                    ${alert.takeProfit ? fmtPrice(alert.takeProfit) : "—"}
                  </div>
                </div>
              </div>
            )}

            {/* Signals list */}
            <div className="space-y-0.5">
              {alert.signals.slice(0, 3).map((sig, i) => (
                <div key={i} className="text-[10px] text-slate-400 flex items-start gap-1">
                  <span className="text-red-400 mt-0.5">›</span>
                  <span>{sig}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
