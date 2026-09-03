"use client";

import { useState } from "react";
import ConvictionBadge from "./ConvictionBadge";
import ScoreBar from "./ScoreBar";

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

function fmtVol(n: number) {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(0)}M`;
  return `$${(n / 1_000).toFixed(0)}K`;
}

export default function ResultsTable({ results, filter }: ResultsTableProps) {
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = results.filter((r) => {
    if (filter === "HIGH") return r.conviction === "HIGH";
    if (filter === "MEDIUM") return r.conviction === "HIGH" || r.conviction === "MEDIUM";
    return true;
  });

  if (filtered.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-3">🔍</div>
        <div className="text-slate-400 font-medium">Няма резултати</div>
        <div className="text-slate-600 text-sm mt-1">Стартирай скан за да видиш резултати</div>
      </div>
    );
  }

  return (
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
          {filtered.map((r) => (
            <>
              <tr
                key={r.id}
                className={`border-b border-slate-800/50 table-row-hover cursor-pointer transition-colors ${expanded === r.id ? "bg-slate-800/30" : ""}`}
                onClick={() => setExpanded(expanded === r.id ? null : r.id)}
              >
                <td className="py-3 pr-3">
                  <div className="font-bold text-slate-200">
                    {r.symbol.replace("USDT", "")}
                    <span className="text-slate-600 font-normal">/USDT</span>
                  </div>
                  <div
                    className={`text-[10px] ${r.priceChange24h >= 0 ? "text-green-400" : "text-red-400"}`}
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
                    className={`text-sm font-bold ${r.score >= 7 ? "text-red-400" : r.score >= 4 ? "text-amber-400" : "text-slate-400"}`}
                  >
                    {r.score.toFixed(0)}
                  </div>
                </td>
                <td className="py-3 pr-3">
                  <ConvictionBadge conviction={r.conviction} size="sm" />
                </td>
                <td
                  className={`py-3 pr-3 text-right font-medium ${r.fundingRate > 0.003 ? "text-red-400" : r.fundingRate > 0.001 ? "text-amber-400" : "text-slate-400"}`}
                >
                  {(r.fundingRate * 100).toFixed(4)}%
                </td>
                <td
                  className={`py-3 pr-3 text-right hidden md:table-cell ${r.openInterestChange > 10 ? "text-red-400" : r.openInterestChange > 5 ? "text-amber-400" : "text-slate-400"}`}
                >
                  {r.openInterestChange > 0 ? "+" : ""}
                  {r.openInterestChange.toFixed(1)}%
                </td>
                <td
                  className={`py-3 pr-3 text-right hidden lg:table-cell ${r.rsiValue && r.rsiValue > 70 ? "text-red-400" : r.rsiValue && r.rsiValue > 60 ? "text-amber-400" : "text-slate-400"}`}
                >
                  {r.rsiValue ? r.rsiValue.toFixed(1) : "—"}
                </td>
                <td className="py-3 text-center">
                  <div className="flex items-center justify-center gap-0.5 flex-wrap">
                    {r.liquiditySweep && (
                      <span title="Liquidity Sweep" className="text-sm">⚡</span>
                    )}
                    {r.rsiDivergence && (
                      <span title="RSI Divergence" className="text-sm">📉</span>
                    )}
                    {r.marketStructureBreak && (
                      <span title="Market Structure Break" className="text-sm">🔻</span>
                    )}
                    {r.cvdDivergence && (
                      <span title="CVD Divergence" className="text-sm">📊</span>
                    )}
                    {r.oiSpike && (
                      <span title="OI Spike" className="text-sm">⚠️</span>
                    )}
                  </div>
                </td>
              </tr>

              {/* Expanded detail row */}
              {expanded === r.id && (
                <tr key={`${r.id}-expanded`} className="bg-slate-900/60">
                  <td colSpan={8} className="px-4 py-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Score bar */}
                      <div>
                        <ScoreBar score={r.score} />
                      </div>

                      {/* Trade levels */}
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-blue-500/10 rounded-lg p-2">
                          <div className="text-[10px] text-slate-500 uppercase">Вход</div>
                          <div className="text-xs font-bold text-blue-400 mt-0.5">
                            {r.entryPrice ? `$${fmtPrice(r.entryPrice)}` : "—"}
                          </div>
                        </div>
                        <div className="bg-red-500/10 rounded-lg p-2">
                          <div className="text-[10px] text-slate-500 uppercase">Stop</div>
                          <div className="text-xs font-bold text-red-400 mt-0.5">
                            {r.stopLoss ? `$${fmtPrice(r.stopLoss)}` : "—"}
                          </div>
                        </div>
                        <div className="bg-green-500/10 rounded-lg p-2">
                          <div className="text-[10px] text-slate-500 uppercase">TP</div>
                          <div className="text-xs font-bold text-green-400 mt-0.5">
                            {r.takeProfit ? `$${fmtPrice(r.takeProfit)}` : "—"}
                          </div>
                        </div>
                      </div>

                      {/* Signals */}
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase mb-1">Сигнали</div>
                        <div className="space-y-0.5">
                          {r.signals.map((sig, i) => (
                            <div
                              key={i}
                              className="text-[10px] text-slate-300 flex items-start gap-1"
                            >
                              <span className="text-red-400">›</span>
                              <span>{sig}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
