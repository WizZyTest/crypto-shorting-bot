"use client";

import { useState, Fragment } from "react";

interface ScanResult {
  id: number;
  symbol: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  fundingRate: number;
  openInterestChange: number;
  rsiValue: number | null;
  rsiDivergence: boolean;
  liquiditySweep: boolean;
  marketStructureBreak: boolean;
  cvdDivergence: boolean;
  oiSpike: boolean;
  score: number;
  entryPrice: number | null;
  stopLoss: number | null;
  takeProfit: number | null;
  conviction: string;
  signals: string[];
  scannedAt: string;
}

interface ResultsTableProps {
  results: ScanResult[];
  filter: "ALL" | "HIGH" | "MEDIUM";
}

function fmtPrice(n: number) {
  if (n >= 10000) return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (n >= 100) return n.toFixed(2);
  if (n >= 1) return n.toFixed(3);
  return n.toFixed(5);
}

export default function ResultsTable({ results, filter }: ResultsTableProps) {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const filtered = results.filter((r) => {
    if (filter === "HIGH") return r.conviction === "HIGH";
    if (filter === "MEDIUM") return r.conviction === "HIGH" || r.conviction === "MEDIUM";
    return true;
  });

  if (filtered.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-3xl mb-2">🔍</div>
        <div className="text-slate-400 font-medium">Няма намерени монети</div>
      </div>
    );
  }

  const displayed = showAll ? filtered : filtered.slice(0, 4);

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-slate-500 border-b border-slate-800 text-left">
              <th className="pb-3 pr-3 font-medium">Монета</th>
              <th className="pb-3 pr-3 font-medium text-right">Цена</th>
              <th className="pb-3 pr-3 font-medium text-right">Score</th>
              <th className="pb-3 pr-3 font-medium">Conviction</th>
              <th className="pb-3 pr-3 font-medium text-right">Funding</th>
              <th className="pb-3 pr-3 font-medium text-right hidden md:table-cell">OI Δ</th>
              <th className="pb-3 pr-3 font-medium text-right hidden lg:table-cell">RSI 4h</th>
              <th className="pb-3 font-medium text-center">Сигнали</th>
            </tr>
          </thead>
          <tbody>
            {displayed.map((r, index) => {
              const itemKey = r.id ?? index;
              const isExpanded = expanded === itemKey;

              return (
                <Fragment key={itemKey}>
                  <tr
                    className={`border-b border-slate-800/50 cursor-pointer transition-colors hover:bg-slate-800/50 ${
                      isExpanded ? "bg-slate-800/30" : ""
                    }`}
                    onClick={() => setExpanded(isExpanded ? null : itemKey)}
                  >
                    <td className="py-3 pr-3">
                      <div className="font-bold text-slate-200">
                        {r.symbol.replace("USDT", "")}
                        <span className="text-slate-600 font-normal">/USDT</span>
                      </div>
                      <div
                        className={`text-[10px] ${
                          r.priceChange24h >= 0 ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {r.priceChange24h >= 0 ? "+" : ""}
                        {r.priceChange24h.toFixed(2)}%
                      </div>
                    </td>
                    <td className="py-3 pr-3 text-right text-slate-200 font-mono">
                      ${fmtPrice(r.price)}
                    </td>
                    <td className="py-3 pr-3 text-right">
                      <div
                        className={`text-sm font-bold ${
                          r.score >= 7
                            ? "text-red-400"
                            : r.score >= 4
                            ? "text-amber-400"
                            : "text-slate-400"
                        }`}
                      >
                        {r.score.toFixed(0)}
                      </div>
                    </td>
                    <td className="py-3 pr-3">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                          r.conviction === "HIGH"
                            ? "bg-red-500/20 text-red-400 border border-red-500/30"
                            : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        }`}
                      >
                        {r.conviction}
                      </span>
                    </td>
                    <td
                      className={`py-3 pr-3 text-right font-medium ${
                        r.fundingRate > 0.0005
                          ? "text-red-400"
                          : r.fundingRate > 0.0002
                          ? "text-amber-400"
                          : "text-slate-400"
                      }`}
                    >
                      {(r.fundingRate * 100).toFixed(4)}%
                    </td>
                    <td
                      className={`py-3 pr-3 text-right hidden md:table-cell ${
                        r.openInterestChange > 10
                          ? "text-red-400"
                          : r.openInterestChange > 5
                          ? "text-amber-400"
                          : "text-slate-400"
                      }`}
                    >
                      {r.openInterestChange > 0 ? "+" : ""}
                      {r.openInterestChange.toFixed(1)}%
                    </td>
                    <td
                      className={`py-3 pr-3 text-right hidden lg:table-cell ${
                        r.rsiValue && r.rsiValue > 70
                          ? "text-red-400"
                          : r.rsiValue && r.rsiValue > 60
                          ? "text-amber-400"
                          : "text-slate-400"
                      }`}
                    >
                      {r.rsiValue ? r.rsiValue.toFixed(1) : "—"}
                    </td>
                    <td className="py-3 text-center">
                      <div className="flex items-center justify-center gap-1 flex-wrap">
                        {r.liquiditySweep && <span title="Liquidity Sweep">⚡</span>}
                        {r.rsiDivergence && <span title="RSI Bearish Div">📉</span>}
                        {r.marketStructureBreak && <span title="MSB">🔻</span>}
                        {r.cvdDivergence && <span title="CVD Div">📊</span>}
                        {r.oiSpike && <span title="OI Spike">⚠️</span>}
                        {r.fundingRate > 0.0005 && <span title="High Funding">🔥</span>}
                      </div>
                    </td>
                  </tr>

                  {isExpanded && (
                    <tr className="bg-slate-900/80 border-b border-slate-800">
                      <td colSpan={8} className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div className="text-xs font-semibold text-slate-400 mb-2">
                              Открити Сигнали:
                            </div>
                            <ul className="space-y-1">
                              {r.signals.map((sig, idx) => (
                                <li key={idx} className="text-xs text-slate-300">
                                  {sig}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                            <div className="text-xs font-semibold text-slate-400 mb-2">
                              Търговски Нива (ATR):
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-center text-xs">
                              <div className="bg-slate-900 p-2 rounded">
                                <div className="text-slate-500">Entry</div>
                                <div className="font-mono font-bold text-slate-200">
                                  ${fmtPrice(r.entryPrice ?? r.price)}
                                </div>
                              </div>
                              <div className="bg-red-500/10 p-2 rounded border border-red-500/20">
                                <div className="text-red-400">Stop Loss</div>
                                <div className="font-mono font-bold text-red-400">
                                  ${fmtPrice(r.stopLoss ?? 0)}
                                </div>
                              </div>
                              <div className="bg-green-500/10 p-2 rounded border border-green-500/20">
                                <div className="text-green-400">Take Profit</div>
                                <div className="font-mono font-bold text-green-400">
                                  ${fmtPrice(r.takeProfit ?? 0)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {filtered.length > 4 && (
        <div className="text-center pt-2 border-t border-slate-800/60">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700"
          >
            {showAll
              ? "Скрий монетите"
              : `Покажи всички (${filtered.length - 4} още)`}
          </button>
        </div>
      )}
    </div>
  );
}
