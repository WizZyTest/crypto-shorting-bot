"use client";

import { useState } from "react";

interface AlertItem {
  alertId?: string;
  id?: number;
  symbol: string;
  conviction: string;
  score: number;
  price: number;
  stopLoss: number | null;
  takeProfit: number | null;
  signals: string[];
  scannedAt?: string;
}

interface AlertsPanelProps {
  results: AlertItem[];
  onDeleteAlert?: (alertId: string) => void;
}

function fmtPrice(n: number) {
  if (n >= 10000) return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (n >= 100) return n.toFixed(2);
  if (n >= 1) return n.toFixed(3);
  return n.toFixed(5);
}

export default function AlertsPanel({ results, onDeleteAlert }: AlertsPanelProps) {
  const [showAll, setShowAll] = useState(false);
  const hasAlerts = results && results.length > 0;
  const displayedAlerts = hasAlerts ? (showAll ? results : results.slice(0, 3)) : [];

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col h-full space-y-4">
      {/* Заглавна част */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">🔔</span>
          <h3 className="font-bold text-slate-200 text-sm">Сигнали</h3>
          <span className="bg-red-500/20 text-red-400 text-xs font-bold px-2 py-0.5 rounded-full border border-red-500/30">
            {results ? results.length : 0}
          </span>
        </div>
      </div>

      {/* Списък с известия */}
      <div className="space-y-3 overflow-y-auto max-h-[720px] pr-1 custom-scrollbar">
        {!hasAlerts ? (
          <div className="text-center py-12 text-slate-500 text-xs">
            Няма активни известия. Стартирай скан за нови сигнали.
          </div>
        ) : (
          displayedAlerts.map((alert, idx) => {
            const keyId = alert.alertId || `${alert.symbol}-${idx}`;

            return (
              <div
                key={keyId}
                className="relative bg-slate-950/70 border border-slate-800 rounded-xl p-3 space-y-2 hover:border-slate-700 transition-colors group"
              >
                {/* Бутон за изтриване */}
                {onDeleteAlert && alert.alertId && (
                  <button
                    onClick={() => onDeleteAlert(alert.alertId!)}
                    className="absolute top-2.5 right-2.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 w-5 h-5 rounded-md flex items-center justify-center transition-colors text-xs font-bold"
                    title="Изтрий сигнала"
                  >
                    ✕
                  </button>
                )}

                <div className="flex items-center justify-between pr-6">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-100 text-sm">
                      {alert.symbol}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        alert.conviction === "HIGH"
                          ? "bg-red-500/20 text-red-400 border border-red-500/30"
                          : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                      }`}
                    >
                      {alert.conviction}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-400">
                    Score: <span className="text-red-400">{alert.score}</span>
                  </div>
                </div>

                <div className="text-[10px] text-slate-500 flex items-center justify-between">
                  <span>🕒 {alert.scannedAt || new Date().toLocaleTimeString()}</span>
                </div>

                {/* Търговски нива */}
                <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] bg-slate-900/80 p-2 rounded-lg font-mono">
                  <div>
                    <div className="text-slate-500 text-[9px]">Вход</div>
                    <div className="text-slate-200 font-bold">${fmtPrice(alert.price)}</div>
                  </div>
                  <div>
                    <div className="text-red-400 text-[9px]">Stop</div>
                    <div className="text-red-400 font-bold">${fmtPrice(alert.stopLoss ?? 0)}</div>
                  </div>
                  <div>
                    <div className="text-green-400 text-[9px]">TP</div>
                    <div className="text-green-400 font-bold">${fmtPrice(alert.takeProfit ?? 0)}</div>
                  </div>
                </div>

                {/* Сигнали */}
                {alert.signals && alert.signals.length > 0 && (
                  <div className="space-y-1 pt-1">
                    {alert.signals.map((sig, sIdx) => (
                      <div key={sIdx} className="text-[11px] text-slate-300 flex items-center gap-1.5">
                        <span>•</span>
                        <span>{sig}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {hasAlerts && results.length > 3 && (
        <div className="text-center pt-2 border-t border-slate-800/60">
          <button
            onClick={() => setShowAll(!showAll)}
            className="w-full py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700"
          >
            {showAll
              ? "Скрий сигналите"
              : `Покажи всички (${results.length - 3} още)`}
          </button>
        </div>
      )}
    </div>
  );
}
