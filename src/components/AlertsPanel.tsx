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

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const now = new Date();

  const isToday =
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear();

  const timeStr = d.toLocaleTimeString("bg-BG", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  if (isToday) {
    return `Днес, ${timeStr} ч.`;
  }

  const dateFormatted = d.toLocaleDateString("bg-BG", {
    day: "2-digit",
    month: "short",
  });

  return `${dateFormatted}, ${timeStr} ч.`;
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

  const handleClearAll = async () => {
    if (!confirm("Сигурни ли сте, че искате да изтриете всички известия?")) return;
    try {
      const res = await fetch("/api/alerts", { method: "DELETE" });
      if (res.ok) {
        setAlerts([]);
      }
    } catch (err) {
      console.error("Failed to clear alerts", err);
    }
  };

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 30000);
    return () => clearInterval(interval);
  }, [fetchAlerts]);

  return (
    <div className="bg-[#121722] rounded-xl border border-gray-800 p-4 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">🔔</span>
          <h2 className="font-bold text-white text-base">Сигнали</h2>
          <span className="bg-red-500/20 text-red-400 text-xs px-2 py-0.5 rounded-full font-bold">
            {alerts.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {alerts.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-xs text-gray-400 hover:text-red-400 transition-colors px-2 py-1 bg-gray-800/60 hover:bg-red-500/10 rounded border border-gray-700/50"
              title="Изчисти всички известия"
            >
              🗑️ Изчисти
            </button>
          )}
          <button
            onClick={fetchAlerts}
            className="text-xs text-gray-400 hover:text-white transition-colors"
          >
            🔄 Обнови
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
        {loading ? (
          <div className="text-center text-gray-500 py-8 text-sm">Зареждане...</div>
        ) : alerts.length === 0 ? (
          <div className="text-center text-gray-500 py-8 text-sm">
            Няма активни сигнали
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className="bg-[#1a2130] rounded-lg p-3 border border-gray-800/80 hover:border-gray-700 transition-all"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{alert.symbol}</span>
                  <ConvictionBadge conviction={alert.conviction} />
                </div>
                <span className="text-[11px] text-gray-400 font-mono">
                  Score: <span className="text-yellow-400 font-bold">{alert.score}</span>
                </span>
              </div>

              <div className="text-[11px] text-gray-400 mb-2 font-mono">
                📅 {formatDate(alert.createdAt)}
              </div>

              {alert.entryPrice && alert.stopLoss && alert.takeProfit && (
                <div className="grid grid-cols-3 gap-1 bg-[#121722] p-2 rounded text-center mb-2 font-mono text-[11px]">
                  <div>
                    <div className="text-gray-500 text-[9px]">Вход</div>
                    <div className="text-blue-400 font-semibold">${fmtPrice(alert.entryPrice)}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-[9px]">Stop</div>
                    <div className="text-red-400 font-semibold">${fmtPrice(alert.stopLoss)}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-[9px]">TP</div>
                    <div className="text-green-400 font-semibold">${fmtPrice(alert.takeProfit)}</div>
                  </div>
                </div>
              )}

              {alert.signals && alert.signals.length > 0 && (
                <div className="space-y-1">
                  {alert.signals.map((sig, idx) => (
                    <div key={idx} className="text-[11px] text-gray-300 flex items-start gap-1">
                      <span className="text-gray-500 text-[10px]">›</span>
                      <span>{sig}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
